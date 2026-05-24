'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	type AdmissionsProcessMeta,
	type AdmissionsProgramCatalogItem,
	updateAdmissionsProcessMeta,
	updateAdmissionsProgramCatalog
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_ICON_NAMES } from '@/lib/admissions-icons';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { cn, createClientId } from '@/lib/utils';
import {
	AdminForm,
	AdminFormFooter,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

type ProcessPageData = {
	meta: AdmissionsProcessMeta;
	programs: AdmissionsProgramCatalogItem[];
};

type Props = {
	initialData: ProcessPageData;
	onChange?: (data: ProcessPageData) => void;
	visibleSections?: Array<'meta' | 'programs'>;
};

type FacultyFormValue = {
	id: string;
	name: string;
	designation: string;
	specialization: string;
	experience: string;
	linkedin: string;
	photo: string;
};

type SemesterFormValue = {
	id: string;
	semester: number;
	title: string;
	subjectsText: string;
};

type SubcategoryFormValue = {
	id: string;
	title: string;
	description: string;
	breadcrumbLabel: string;
};

type CategoryFormValue = {
	id: string;
	title: string;
	description: string;
	subcategories: SubcategoryFormValue[];
};

type ProgramFormValue = {
	id: string;
	categoryId: string;
	subcategoryId: string;
	title: string;
	duration: string;
	intake: string;
	icon: string;
	description: string;
	highlightsText: string;
	contentOfferingStatement: string;
	keyAreasText: string;
	academic: string;
	minimumMarks: string;
	entranceExam: string;
	selectionProcessText: string;
	semesters: number;
	totalCredits: number;
	semesterDetails: SemesterFormValue[];
	careersText: string;
	faculty: FacultyFormValue[];
};

type FormValues = {
	headerTitle: string;
	headerSubtitle: string;
	emptyStateTitle: string;
	defaultCategoryDescription: string;
	emptyStateDescription: string;
	listSidebarTitle: string;
	listMobileBackLabel: string;
	listBreadcrumbRootLabel: string;
	listNoProgramsMessage: string;
	listDurationLabel: string;
	listIntakeLabel: string;
	listCardCtaLabel: string;
	detailBackButtonLabel: string;
	detailSidebarTitle: string;
	tabOffering: string;
	tabEligibility: string;
	tabStructure: string;
	tabCareers: string;
	tabFaculty: string;
	detailDurationLabel: string;
	detailIntakeLabel: string;
	offeringTitle: string;
	keyAreasTitle: string;
	eligibilityTitle: string;
	academicQualificationTitle: string;
	minimumMarksTitle: string;
	entranceExamTitle: string;
	selectionProcessTitle: string;
	structureTitle: string;
	totalSemestersLabel: string;
	totalCreditsLabel: string;
	durationCardLabel: string;
	semesterCurriculumTitle: string;
	subjectsLabelSuffix: string;
	careersTitle: string;
	facultyTitle: string;
	categories: CategoryFormValue[];
	supportTitle: string;
	supportDescription: string;
	supportPrimaryCtaLabel: string;
	supportPrimaryCtaHref: string;
	supportSecondaryCtaLabel: string;
	supportSecondaryCtaHref: string;
	programs: ProgramFormValue[];
};

const splitLines = (value: string) =>
	value
		.split('\n')
		.map(item => item.trim())
		.filter(Boolean);

const createSubcategory = (): SubcategoryFormValue => ({
	id: createClientId('admissions-process-subcategory'),
	title: '',
	description: '',
	breadcrumbLabel: ''
});

const createCategory = (): CategoryFormValue => ({
	id: createClientId('admissions-process-category'),
	title: '',
	description: '',
	subcategories: [createSubcategory()]
});

const createSemester = (): SemesterFormValue => ({
	id: createClientId('admissions-process-semester'),
	semester: 1,
	title: '',
	subjectsText: ''
});

const createFaculty = (): FacultyFormValue => ({
	id: createClientId('admissions-process-faculty'),
	name: '',
	designation: '',
	specialization: '',
	experience: '',
	linkedin: '',
	photo: ''
});

const createProgram = (): ProgramFormValue => ({
	id: '',
	categoryId: '',
	subcategoryId: '',
	title: '',
	duration: '',
	intake: '',
	icon: 'GraduationCap',
	description: '',
	highlightsText: '',
	contentOfferingStatement: '',
	keyAreasText: '',
	academic: '',
	minimumMarks: '',
	entranceExam: '',
	selectionProcessText: '',
	semesters: 1,
	totalCredits: 1,
	semesterDetails: [createSemester()],
	careersText: '',
	faculty: [createFaculty()]
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

const getSubcategoryOptions = (categories: CategoryFormValue[], categoryId: string) => {
	return categories.find(category => category.id === categoryId)?.subcategories ?? [];
};

function FormSection({
	title,
	description,
	action,
	children,
	className
}: {
	title: string;
	description?: string;
	action?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<section className={cn('flex flex-col gap-4', className)}>
			<div className='flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4'>
				<div className='min-w-0'>
					<h3 className='text-base font-semibold text-slate-900'>{title}</h3>
					{description ? (
						<p className='mt-0.5 text-sm text-slate-500'>{description}</p>
					) : null}
				</div>
				{action ? <div className='flex-shrink-0'>{action}</div> : null}
			</div>
			<div className='flex flex-col gap-4'>{children}</div>
		</section>
	);
}

function Subsection({
	title,
	action,
	children,
	className
}: {
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn('flex flex-col gap-3', className)}>
			<div className='flex items-center justify-between gap-3'>
				<p className='text-sm font-semibold text-slate-800'>{title}</p>
				{action}
			</div>
			{children}
		</div>
	);
}

function NestedItem({
	title,
	action,
	children,
	collapsible = false
}: {
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
	collapsible?: boolean;
}) {
	const [collapsed, setCollapsed] = useState(collapsible);

	return (
		<div className='rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'>
			<div className='flex items-center justify-between gap-3'>
				{collapsible ? (
					<button
						type='button'
						onClick={() => setCollapsed(c => !c)}
						className='flex flex-1 items-center gap-1.5 text-left'>
						<span className='text-sm font-semibold text-slate-900'>{title}</span>
						{collapsed ? (
							<ChevronDown className='h-3.5 w-3.5 text-slate-400' />
						) : (
							<ChevronUp className='h-3.5 w-3.5 text-slate-400' />
						)}
					</button>
				) : (
					<span className='text-sm font-semibold text-slate-900'>{title}</span>
				)}
				{action}
			</div>
			{collapsed ? null : (
				<div className='mt-3 flex flex-col gap-3'>{children}</div>
			)}
		</div>
	);
}

function normalizePrograms(
	programs: ProgramFormValue[],
	categories: CategoryFormValue[]
): AdmissionsProgramCatalogItem[] {
	const validPairs = new Set(
		categories.flatMap(category =>
			category.subcategories.map(subcategory => `${category.id}::${subcategory.id}`)
		)
	);

	return programs
		.map(program => ({
			id: program.id.trim(),
			categoryId: program.categoryId.trim(),
			subcategoryId: program.subcategoryId.trim(),
			title: program.title.trim(),
			duration: program.duration.trim(),
			intake: program.intake.trim(),
			icon: program.icon.trim(),
			description: program.description.trim(),
			highlights: splitLines(program.highlightsText),
			details: {
				contentOffering: {
					statement: program.contentOfferingStatement.trim(),
					keyAreas: splitLines(program.keyAreasText)
				},
				eligibilityAndSelection: {
					academic: program.academic.trim(),
					minimumMarks: program.minimumMarks.trim(),
					entranceExam: program.entranceExam.trim(),
					selectionProcess: splitLines(program.selectionProcessText)
				},
				programStructure: {
					semesters: Number(program.semesters) || 1,
					totalCredits: Number(program.totalCredits) || 1,
					semesterDetails: program.semesterDetails
						.map((semester, si) => ({
							semester: si + 1,
							title: `Semester ${si + 1}`,
							subjects: splitLines(semester.subjectsText)
						}))
				},
				careerOpportunities: splitLines(program.careersText),
				faculty: program.faculty
					.map(member => ({
						name: member.name.trim(),
						designation: member.designation.trim(),
						specialization: member.specialization.trim(),
						experience: member.experience.trim(),
						linkedin: member.linkedin.trim(),
						photo: member.photo.trim()
					}))
					.filter(member => member.name && member.designation && member.specialization && member.experience)
			}
		}))
		.filter(
			program =>
				program.id &&
				program.categoryId &&
				program.subcategoryId &&
				validPairs.has(`${program.categoryId}::${program.subcategoryId}`) &&
				program.title &&
				program.duration &&
				program.intake &&
				program.description &&
				program.details.contentOffering.statement &&
				program.details.eligibilityAndSelection.academic &&
				program.details.eligibilityAndSelection.minimumMarks &&
				program.details.eligibilityAndSelection.entranceExam
		);
}

function normalizeData(values: FormValues): ProcessPageData {
	const categories = values.categories
		.map(category => ({
			id: category.id.trim(),
			title: category.title.trim(),
			description: category.description.trim(),
			subcategories: category.subcategories
				.map(subcategory => ({
					id: subcategory.id.trim(),
					title: subcategory.title.trim(),
					description: subcategory.description.trim(),
					breadcrumbLabel: subcategory.breadcrumbLabel.trim()
				}))
				.filter(subcategory => subcategory.id && subcategory.title)
		}))
		.filter(category => category.id && category.title && category.subcategories.length > 0);

	return {
		meta: {
			headerTitle: values.headerTitle.trim(),
			headerSubtitle: values.headerSubtitle.trim(),
			emptyStateTitle: values.emptyStateTitle.trim(),
			defaultCategoryDescription: values.defaultCategoryDescription.trim(),
			emptyStateDescription: values.emptyStateDescription.trim(),
			listCopy: {
				sidebarTitle: values.listSidebarTitle.trim(),
				mobileBackLabel: values.listMobileBackLabel.trim(),
				breadcrumbRootLabel: values.listBreadcrumbRootLabel.trim(),
				noProgramsMessage: values.listNoProgramsMessage.trim(),
				durationLabel: values.listDurationLabel.trim(),
				intakeLabel: values.listIntakeLabel.trim(),
				cardCtaLabel: values.listCardCtaLabel.trim()
			},
			detailCopy: {
				backButtonLabel: values.detailBackButtonLabel.trim(),
				sidebarTitle: values.detailSidebarTitle.trim(),
				tabLabels: {
					offering: values.tabOffering.trim(),
					eligibility: values.tabEligibility.trim(),
					structure: values.tabStructure.trim(),
					careers: values.tabCareers.trim(),
					faculty: values.tabFaculty.trim()
				},
				durationLabel: values.detailDurationLabel.trim(),
				intakeLabel: values.detailIntakeLabel.trim(),
				offeringTitle: values.offeringTitle.trim(),
				keyAreasTitle: values.keyAreasTitle.trim(),
				eligibilityTitle: values.eligibilityTitle.trim(),
				academicQualificationTitle: values.academicQualificationTitle.trim(),
				minimumMarksTitle: values.minimumMarksTitle.trim(),
				entranceExamTitle: values.entranceExamTitle.trim(),
				selectionProcessTitle: values.selectionProcessTitle.trim(),
				structureTitle: values.structureTitle.trim(),
				totalSemestersLabel: values.totalSemestersLabel.trim(),
				totalCreditsLabel: values.totalCreditsLabel.trim(),
				durationCardLabel: values.durationCardLabel.trim(),
				semesterCurriculumTitle: values.semesterCurriculumTitle.trim(),
				subjectsLabelSuffix: values.subjectsLabelSuffix.trim(),
				careersTitle: values.careersTitle.trim(),
				facultyTitle: values.facultyTitle.trim()
			},
			categories,
			supportCard: {
				title: values.supportTitle.trim(),
				description: values.supportDescription.trim(),
				primaryCtaLabel: values.supportPrimaryCtaLabel.trim(),
				primaryCtaHref: values.supportPrimaryCtaHref.trim(),
				secondaryCtaLabel: values.supportSecondaryCtaLabel.trim(),
				secondaryCtaHref: values.supportSecondaryCtaHref.trim()
			}
		},
		programs: normalizePrograms(values.programs, values.categories)
	};
}

function CategoryFields({
	form,
	index,
	onRemove
}: {
	form: UseFormReturn<FormValues>;
	index: number;
	onRemove: () => void;
}) {
	const subcategoriesArray = useFieldArray({
		control: form.control,
		name: `categories.${index}.subcategories`
	});

	return (
		<div className='flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'>
			<div className='flex items-center justify-between'>
				<span className='text-sm font-semibold text-slate-900'>Category {index + 1}</span>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					className='text-rose-600 hover:bg-rose-50 hover:text-rose-700'
					onClick={onRemove}>
					Remove
				</Button>
			</div>

			<div className='grid gap-4 sm:grid-cols-2'>
				<FormField
					control={form.control}
					name={`categories.${index}.id`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category ID</FormLabel>
							<FormControl>
								<Input placeholder='undergraduate' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`categories.${index}.title`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category title</FormLabel>
							<FormControl>
								<Input placeholder='Undergraduate' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`categories.${index}.description`}
					render={({ field }) => (
						<FormItem className='sm:col-span-2'>
							<FormLabel>Category description</FormLabel>
							<FormControl>
								<Textarea rows={3} className='resize-none' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</div>

			<Subsection
				title='Subcategories'
				action={
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={() => subcategoriesArray.append(createSubcategory())}>
						Add subcategory
					</Button>
				}>
				<div className='space-y-3'>
					{subcategoriesArray.fields.map((field, subcategoryIndex) => (
						<NestedItem
							key={field.id}
							title={`Subcategory ${subcategoryIndex + 1}`}
							action={
								<Button
									type='button'
									variant='ghost'
									size='sm'
									onClick={() => subcategoriesArray.remove(subcategoryIndex)}>
									Remove
								</Button>
							}>
							<div className='grid gap-4 sm:grid-cols-2'>
								<FormField
									control={form.control}
									name={`categories.${index}.subcategories.${subcategoryIndex}.id`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subcategory ID</FormLabel>
											<FormControl>
												<Input placeholder='engineering' {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`categories.${index}.subcategories.${subcategoryIndex}.title`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subcategory title</FormLabel>
											<FormControl>
												<Input placeholder='Engineering and Technology' {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`categories.${index}.subcategories.${subcategoryIndex}.breadcrumbLabel`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Breadcrumb label</FormLabel>
											<FormControl>
												<Input placeholder='Engineering & Technology' {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`categories.${index}.subcategories.${subcategoryIndex}.description`}
									render={({ field }) => (
										<FormItem className='sm:col-span-2'>
											<FormLabel>Subcategory description</FormLabel>
											<FormControl>
												<Textarea rows={3} className='resize-none' {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</NestedItem>
					))}
				</div>
			</Subsection>
		</div>
	);
}

function ProgramFields({
	form,
	index,
	onRemove
}: {
	form: UseFormReturn<FormValues>;
	index: number;
	onRemove: () => void;
}) {
	const [collapsed, setCollapsed] = useState(true);
	const semesterArray = useFieldArray({
		control: form.control,
		name: `programs.${index}.semesterDetails`
	});
	const facultyArray = useFieldArray({
		control: form.control,
		name: `programs.${index}.faculty`
	});
	const categories = form.watch('categories');
	const selectedCategoryId = form.watch(`programs.${index}.categoryId`);
	const selectedSubcategoryId = form.watch(`programs.${index}.subcategoryId`);
	const programTitle = form.watch(`programs.${index}.title`);
	const subcategoryOptions = getSubcategoryOptions(categories, selectedCategoryId);

	useEffect(() => {
		const hasCurrentSubcategory = subcategoryOptions.some(
			subcategory => subcategory.id === selectedSubcategoryId
		);
		if (selectedSubcategoryId && !hasCurrentSubcategory) {
			form.setValue(`programs.${index}.subcategoryId`, '', {
				shouldDirty: true,
				shouldTouch: true
			});
		}
	}, [form, index, selectedSubcategoryId, subcategoryOptions]);

	const headerLabel = programTitle ? 'Program ' + (index + 1) + ' \u2014 ' + programTitle : 'Program ' + (index + 1);

	return (
		<div className='rounded-xl border border-slate-200 bg-white'>
			<div className='flex items-center justify-between px-4 py-3 sm:px-5'>
				<button
					type='button'
					onClick={() => setCollapsed(c => !c)}
					className='flex flex-1 items-center gap-2 text-left'>
					<h5 className='text-sm font-semibold text-slate-800'>{headerLabel}</h5>
					{collapsed ? (
						<ChevronDown className='h-4 w-4 text-slate-500' />
					) : (
						<ChevronUp className='h-4 w-4 text-slate-500' />
					)}
				</button>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					onClick={onRemove}>
					Remove
				</Button>
			</div>
			{collapsed ? null : (
			<div className='space-y-4 border-t border-slate-100 p-4 sm:p-5'>

			<div className='grid gap-4 sm:grid-cols-2'>
				<FormField
					control={form.control}
					name={`programs.${index}.id`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Program ID</FormLabel>
							<FormControl>
								<Input placeholder='cse' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.categoryId`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<Select
								value={field.value}
								onValueChange={value => {
									field.onChange(value);
									form.setValue(`programs.${index}.subcategoryId`, '', {
										shouldDirty: true,
										shouldTouch: true
									});
								}}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select category' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories
										.filter(category => category.id && category.title)
										.map(category => (
											<SelectItem key={category.id} value={category.id}>
												{category.title}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.subcategoryId`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subcategory</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select subcategory' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{subcategoryOptions
										.filter(subcategory => subcategory.id && subcategory.title)
										.map(subcategory => (
											<SelectItem key={subcategory.id} value={subcategory.id}>
												{subcategory.title}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.title`}
					render={({ field }) => (
						<FormItem className='sm:col-span-2'>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.duration`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Duration</FormLabel>
							<FormControl>
								<Input placeholder='4 Years' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.intake`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Intake</FormLabel>
							<FormControl>
								<Input placeholder='180' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.icon`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Icon</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select icon' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ADMISSIONS_ICON_NAMES.map(icon => (
										<SelectItem key={icon} value={icon}>
											{icon}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.description`}
					render={({ field }) => (
						<FormItem className='sm:col-span-2'>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea rows={3} className='resize-none' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</div>

			<Subsection title='Highlights'>
				<FormField
					control={form.control}
					name={`programs.${index}.highlightsText`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Highlights</FormLabel>
							<FormControl>
								<Textarea
									rows={4}
									className='resize-none'
									placeholder='One highlight per line'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</Subsection>

			<Subsection title='Content offering'>
				<FormField
					control={form.control}
					name={`programs.${index}.contentOfferingStatement`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Statement</FormLabel>
							<FormControl>
								<Textarea rows={4} className='resize-none' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.keyAreasText`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Key areas</FormLabel>
							<FormControl>
								<Textarea rows={5} className='resize-none' placeholder='One key area per line' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</Subsection>

			<Subsection title='Eligibility and selection'>
				<FormField
					control={form.control}
					name={`programs.${index}.academic`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Academic qualification</FormLabel>
							<FormControl>
								<Textarea rows={3} className='resize-none' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.minimumMarks`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Minimum marks</FormLabel>
							<FormControl>
								<Textarea rows={2} className='resize-none' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.entranceExam`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Entrance exam</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`programs.${index}.selectionProcessText`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Selection process steps</FormLabel>
							<FormControl>
								<Textarea rows={4} className='resize-none' placeholder='One step per line' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</Subsection>

			<Subsection
				title='Programme structure'
				action={
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={() => semesterArray.append(createSemester())}>
						Add semester
					</Button>
				}>
				<div className='grid gap-4 sm:grid-cols-2'>
					<FormField
						control={form.control}
						name={`programs.${index}.semesters`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Total semesters</FormLabel>
								<FormControl>
									<Input type='number' {...field} onChange={event => field.onChange(Number(event.target.value))} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`programs.${index}.totalCredits`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Total credits</FormLabel>
								<FormControl>
									<Input type='number' {...field} onChange={event => field.onChange(Number(event.target.value))} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className='space-y-3'>
					{semesterArray.fields.map((field, semesterIndex) => (
						<NestedItem
							key={field.id}
							collapsible
							title={`Semester ${semesterIndex + 1}`}
							action={
								<Button
									type='button'
									variant='ghost'
									size='sm'
									onClick={() => semesterArray.remove(semesterIndex)}>
									Remove
								</Button>
							}>
								<FormField
								control={form.control}
								name={`programs.${index}.semesterDetails.${semesterIndex}.subjectsText`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Subjects</FormLabel>
										<FormControl>
											<Textarea rows={5} className='resize-none' placeholder='One subject per line' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</NestedItem>
					))}
				</div>
			</Subsection>

			<Subsection title='Career opportunities'>
				<FormField
					control={form.control}
					name={`programs.${index}.careersText`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Career opportunities</FormLabel>
							<FormControl>
								<Textarea
									rows={5}
									className='resize-none'
									placeholder='One opportunity per line'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</Subsection>

			<Subsection
				title='Faculty'
				action={
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={() => facultyArray.append(createFaculty())}>
						Add faculty member
					</Button>
				}>
				<div className='space-y-3'>
					{facultyArray.fields.map((field, facultyIndex) => (
						<NestedItem
							key={field.id}
							title={`Faculty ${facultyIndex + 1}`}
							action={
								<Button
									type='button'
									variant='ghost'
									size='sm'
									onClick={() => facultyArray.remove(facultyIndex)}>
									Remove
								</Button>
							}>
							<div className='grid gap-4 sm:grid-cols-2'>
								<FormField
									control={form.control}
									name={`programs.${index}.faculty.${facultyIndex}.name`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`programs.${index}.faculty.${facultyIndex}.designation`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Designation</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`programs.${index}.faculty.${facultyIndex}.specialization`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Specialization</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`programs.${index}.faculty.${facultyIndex}.experience`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Experience</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`programs.${index}.faculty.${facultyIndex}.linkedin`}
									render={({ field }) => (
										<FormItem className='sm:col-span-2'>
											<FormLabel>LinkedIn URL</FormLabel>
											<FormControl>
												<Input placeholder='https://...' {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`programs.${index}.faculty.${facultyIndex}.photo`}
									render={({ field }) => (
										<FormItem className='sm:col-span-2'>
											<FormLabel>Photo URL</FormLabel>
											<FormControl>
												<Input placeholder='https://...' {...field} />
											</FormControl>
											<div className='flex flex-wrap gap-2 pt-2'>
												<CloudinaryUploadButton
													buttonText='Upload photo'
													folder='admissions/faculty'
													onUpload={url =>
														form.setValue(
															`programs.${index}.faculty.${facultyIndex}.photo`,
															url,
															{ shouldDirty: true, shouldTouch: true }
														)
													}
												/>
												<Button
													type='button'
													variant='outline'
													onClick={() =>
														form.setValue(
															`programs.${index}.faculty.${facultyIndex}.photo`,
															'',
															{ shouldDirty: true, shouldTouch: true }
														)
													}>
													Clear
												</Button>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</NestedItem>
					))}
				</div>
			</Subsection>
		</div>
			)}
		</div>
	);
}

export default function AdmissionsProcessForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const safeCategories = initialData.meta.categories ?? [];
	const isImmersiveProgramEditor =
		visibleSections?.length === 1 && visibleSections[0] === 'programs';

	const defaults = useMemo<FormValues>(
		() => ({
			headerTitle: initialData.meta.headerTitle,
			headerSubtitle: initialData.meta.headerSubtitle,
			emptyStateTitle: initialData.meta.emptyStateTitle,
			defaultCategoryDescription: initialData.meta.defaultCategoryDescription,
			emptyStateDescription: initialData.meta.emptyStateDescription,
			listSidebarTitle: initialData.meta.listCopy.sidebarTitle,
			listMobileBackLabel: initialData.meta.listCopy.mobileBackLabel,
			listBreadcrumbRootLabel: initialData.meta.listCopy.breadcrumbRootLabel,
			listNoProgramsMessage: initialData.meta.listCopy.noProgramsMessage,
			listDurationLabel: initialData.meta.listCopy.durationLabel,
			listIntakeLabel: initialData.meta.listCopy.intakeLabel,
			listCardCtaLabel: initialData.meta.listCopy.cardCtaLabel,
			detailBackButtonLabel: initialData.meta.detailCopy.backButtonLabel,
			detailSidebarTitle: initialData.meta.detailCopy.sidebarTitle,
			tabOffering: initialData.meta.detailCopy.tabLabels.offering,
			tabEligibility: initialData.meta.detailCopy.tabLabels.eligibility,
			tabStructure: initialData.meta.detailCopy.tabLabels.structure,
			tabCareers: initialData.meta.detailCopy.tabLabels.careers,
			tabFaculty: initialData.meta.detailCopy.tabLabels.faculty,
			detailDurationLabel: initialData.meta.detailCopy.durationLabel,
			detailIntakeLabel: initialData.meta.detailCopy.intakeLabel,
			offeringTitle: initialData.meta.detailCopy.offeringTitle,
			keyAreasTitle: initialData.meta.detailCopy.keyAreasTitle,
			eligibilityTitle: initialData.meta.detailCopy.eligibilityTitle,
			academicQualificationTitle: initialData.meta.detailCopy.academicQualificationTitle,
			minimumMarksTitle: initialData.meta.detailCopy.minimumMarksTitle,
			entranceExamTitle: initialData.meta.detailCopy.entranceExamTitle,
			selectionProcessTitle: initialData.meta.detailCopy.selectionProcessTitle,
			structureTitle: initialData.meta.detailCopy.structureTitle,
			totalSemestersLabel: initialData.meta.detailCopy.totalSemestersLabel,
			totalCreditsLabel: initialData.meta.detailCopy.totalCreditsLabel,
			durationCardLabel: initialData.meta.detailCopy.durationCardLabel,
			semesterCurriculumTitle: initialData.meta.detailCopy.semesterCurriculumTitle,
			subjectsLabelSuffix: initialData.meta.detailCopy.subjectsLabelSuffix,
			careersTitle: initialData.meta.detailCopy.careersTitle,
			facultyTitle: initialData.meta.detailCopy.facultyTitle,
			categories:
				safeCategories.length > 0
					? safeCategories.map(category => ({
							id: category.id,
							title: category.title,
							description: category.description ?? '',
							subcategories: category.subcategories.map(subcategory => ({
								id: subcategory.id,
								title: subcategory.title,
								description: subcategory.description ?? '',
								breadcrumbLabel: subcategory.breadcrumbLabel ?? ''
							}))
					  }))
					: [createCategory()],
			supportTitle: initialData.meta.supportCard.title,
			supportDescription: initialData.meta.supportCard.description,
			supportPrimaryCtaLabel: initialData.meta.supportCard.primaryCtaLabel,
			supportPrimaryCtaHref: initialData.meta.supportCard.primaryCtaHref,
			supportSecondaryCtaLabel: initialData.meta.supportCard.secondaryCtaLabel,
			supportSecondaryCtaHref: initialData.meta.supportCard.secondaryCtaHref,
			programs: initialData.programs.map(program => ({
				id: program.id,
				categoryId: program.categoryId,
				subcategoryId: program.subcategoryId,
				title: program.title,
				duration: program.duration,
				intake: program.intake,
				icon: program.icon,
				description: program.description,
				highlightsText: program.highlights.join('\n'),
				contentOfferingStatement: program.details.contentOffering.statement,
				keyAreasText: program.details.contentOffering.keyAreas.join('\n'),
				academic: program.details.eligibilityAndSelection.academic,
				minimumMarks: program.details.eligibilityAndSelection.minimumMarks,
				entranceExam: program.details.eligibilityAndSelection.entranceExam,
				selectionProcessText: program.details.eligibilityAndSelection.selectionProcess.join('\n'),
				semesters: program.details.programStructure.semesters,
				totalCredits: program.details.programStructure.totalCredits,
				semesterDetails: program.details.programStructure.semesterDetails.map((semester, semesterIndex) => ({
					id: `${program.id}-semester-${semester.semester}-${semesterIndex}`,
					semester: semester.semester,
					title: semester.title,
					subjectsText: semester.subjects.join('\n')
				})),
				careersText: program.details.careerOpportunities.join('\n'),
				faculty: program.details.faculty.map((member, facultyIndex) => ({
					id: `${program.id}-faculty-${facultyIndex}`,
					name: member.name,
					designation: member.designation,
					specialization: member.specialization,
					experience: member.experience,
					linkedin: member.linkedin ?? '',
					photo: member.photo ?? ''
				}))
			}))
		}),
		[initialData, safeCategories]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const categoriesArray = useFieldArray({ control: form.control, name: 'categories' });
	const programsArray = useFieldArray({ control: form.control, name: 'programs' });

	useEffect(() => {
		form.reset(defaults);
	}, [defaults, form]);

	useEffect(() => {
		onChange?.(normalizeData(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(normalizeData(values as FormValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeData(values);
		const validPairs = new Set(
			payload.meta.categories.flatMap(category =>
				category.subcategories.map(subcategory => `${category.id}::${subcategory.id}`)
			)
		);
		const hasInvalidProgramAssignment = payload.programs.some(
			program => !validPairs.has(`${program.categoryId}::${program.subcategoryId}`)
		);

		if (hasInvalidProgramAssignment) {
			setMessage('Fix invalid category or subcategory assignments before saving.');
			return;
		}

		startTransition(async () => {
			const tasks = [];
			if (includes(visibleSections, 'meta')) {
				tasks.push(updateAdmissionsProcessMeta(payload.meta));
			}
			if (includes(visibleSections, 'programs')) {
				tasks.push(updateAdmissionsProgramCatalog(payload.programs));
			}
			const results = await Promise.all(tasks);
			setMessage(results.every(result => result.ok) ? 'Saved' : 'Save failed');
		});
	};

	const status: AdminFormStatus = isPending
		? { kind: 'saving' }
		: message === 'Saved'
			? { kind: 'success', message: 'Saved' }
			: message === 'Save failed'
				? { kind: 'error', message: 'Save failed' }
				: { kind: 'idle' };

	return (
		<Form {...form}>
			<AdminForm onSubmit={form.handleSubmit(handleSubmit)}>

				{includes(visibleSections, 'meta') ? (
					<>
						<FormSection title='List page copy'>
							<FormField control={form.control} name='headerTitle' render={({ field }) => <FormItem><FormLabel>Header title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='headerSubtitle' render={({ field }) => <FormItem><FormLabel>Header subtitle</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='emptyStateTitle' render={({ field }) => <FormItem><FormLabel>Empty state title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='defaultCategoryDescription' render={({ field }) => <FormItem><FormLabel>Default category description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='emptyStateDescription' render={({ field }) => <FormItem><FormLabel>Empty state description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
							<div className='grid gap-4 sm:grid-cols-2'>
								<FormField control={form.control} name='listSidebarTitle' render={({ field }) => <FormItem><FormLabel>Sidebar title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='listMobileBackLabel' render={({ field }) => <FormItem><FormLabel>Mobile back label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='listBreadcrumbRootLabel' render={({ field }) => <FormItem><FormLabel>Breadcrumb root label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='listNoProgramsMessage' render={({ field }) => <FormItem><FormLabel>No programs message</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='listDurationLabel' render={({ field }) => <FormItem><FormLabel>Duration label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='listIntakeLabel' render={({ field }) => <FormItem><FormLabel>Intake label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='listCardCtaLabel' render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Card CTA label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							</div>
						</FormSection>

						<FormSection title='Detail page copy'>
							<div className='grid gap-4 sm:grid-cols-2'>
								<FormField control={form.control} name='detailBackButtonLabel' render={({ field }) => <FormItem><FormLabel>Back button label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='detailSidebarTitle' render={({ field }) => <FormItem><FormLabel>Detail sidebar title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='tabOffering' render={({ field }) => <FormItem><FormLabel>Offering tab</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='tabEligibility' render={({ field }) => <FormItem><FormLabel>Eligibility tab</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='tabStructure' render={({ field }) => <FormItem><FormLabel>Structure tab</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='tabCareers' render={({ field }) => <FormItem><FormLabel>Careers tab</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='tabFaculty' render={({ field }) => <FormItem><FormLabel>Faculty tab</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='detailDurationLabel' render={({ field }) => <FormItem><FormLabel>Detail duration label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='detailIntakeLabel' render={({ field }) => <FormItem><FormLabel>Detail intake label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='offeringTitle' render={({ field }) => <FormItem><FormLabel>Offering title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='keyAreasTitle' render={({ field }) => <FormItem><FormLabel>Key areas title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='eligibilityTitle' render={({ field }) => <FormItem><FormLabel>Eligibility title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='academicQualificationTitle' render={({ field }) => <FormItem><FormLabel>Academic qualification title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='minimumMarksTitle' render={({ field }) => <FormItem><FormLabel>Minimum marks title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='entranceExamTitle' render={({ field }) => <FormItem><FormLabel>Entrance exam title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='selectionProcessTitle' render={({ field }) => <FormItem><FormLabel>Selection process title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='structureTitle' render={({ field }) => <FormItem><FormLabel>Structure title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='totalSemestersLabel' render={({ field }) => <FormItem><FormLabel>Total semesters label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='totalCreditsLabel' render={({ field }) => <FormItem><FormLabel>Total credits label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='durationCardLabel' render={({ field }) => <FormItem><FormLabel>Duration card label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='semesterCurriculumTitle' render={({ field }) => <FormItem><FormLabel>Semester curriculum title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='subjectsLabelSuffix' render={({ field }) => <FormItem><FormLabel>Subjects label suffix</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='careersTitle' render={({ field }) => <FormItem><FormLabel>Careers title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='facultyTitle' render={({ field }) => <FormItem><FormLabel>Faculty title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							</div>
						</FormSection>

						<FormSection
							title='Categories and subcategories'
							description='Define the formal process taxonomy here. Programs can only be assigned to subcategories created in this section.'
							action={
								<Button type='button' variant='outline' size='sm' onClick={() => categoriesArray.append(createCategory())}>
									Add category
								</Button>
							}>
							<div className='space-y-4'>
								{categoriesArray.fields.map((field, index) => (
									<CategoryFields
										key={field.id}
										form={form}
										index={index}
										onRemove={() => categoriesArray.remove(index)}
									/>
								))}
							</div>
						</FormSection>

						<FormSection title='Support card'>
							<FormField control={form.control} name='supportTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='supportDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
							<div className='grid gap-4 sm:grid-cols-2'>
								<FormField control={form.control} name='supportPrimaryCtaLabel' render={({ field }) => <FormItem><FormLabel>Primary CTA label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportPrimaryCtaHref' render={({ field }) => <FormItem><FormLabel>Primary CTA href</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportSecondaryCtaLabel' render={({ field }) => <FormItem><FormLabel>Secondary CTA label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportSecondaryCtaHref' render={({ field }) => <FormItem><FormLabel>Secondary CTA href</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							</div>
						</FormSection>
					</>
				) : null}

				{includes(visibleSections, 'programs') ? (
					<FormSection
						title='Program catalog'
						description='Assign every program to exactly one category and one subcategory from the taxonomy.'
						action={
							<Button type='button' variant='outline' size='sm' onClick={() => programsArray.append(createProgram())}>
								Add program
							</Button>
						}
						className={isImmersiveProgramEditor ? 'border-0 bg-transparent p-0' : undefined}>
						<div className='space-y-4'>
							{programsArray.fields.map((field, index) => (
								<ProgramFields
									key={field.id}
									form={form}
									index={index}
									onRemove={() => programsArray.remove(index)}
								/>
							))}
						</div>
					</FormSection>
				) : null}
				<AdminFormFooter status={status} saving={isPending} />
			</AdminForm>
		</Form>
	);
}
