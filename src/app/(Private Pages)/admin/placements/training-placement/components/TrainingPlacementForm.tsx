'use client';

import { useEffect, useState, useMemo, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';
import { updateTrainingPlacement } from '@/app/(Private Pages)/actions/training-placement';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

interface TrainingPlacementFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

// Form value types
interface HeroFormValue {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
	iconColor: string;
	textColor: string;
}

interface DirectorMessageFormValue {
	name: string;
	position: string;
	initials: string;
	gradientColor: string;
	message1: string;
	message2: string;
}

interface TeamMemberFormValue {
	id: string;
	name: string;
	position: string;
	qualifications: string;
	specialization: string;
}

interface DepartmentFormValue {
	id: string;
	name: string;
	code: string;
	coordinator: string;
	companies: string;
	avgPackage: string;
	placementRate: string;
}

interface TrainingProgramFormValue {
	id: string;
	title: string;
	description: string;
	duration: string;
	participants: string;
	icon: string;
	color: string;
}

interface ObjectiveFormValue {
	id: string;
	title: string;
	description: string;
	icon: string;
}

interface StatisticFormValue {
	id: string;
	number: string;
	label: string;
	sublabel: string;
}

interface FormValues {
	hero: HeroFormValue;
	directorMessage: DirectorMessageFormValue;
	teamTitle: string;
	teamDescription: string;
	teamMembers: TeamMemberFormValue[];
	departmentsTitle: string;
	departmentsDescription: string;
	departments: DepartmentFormValue[];
	trainingTitle: string;
	trainingDescription: string;
	trainingPrograms: TrainingProgramFormValue[];
	objectivesTitle: string;
	objectivesDescription: string;
	objectives: ObjectiveFormValue[];
	statisticsTitle: string;
	statisticsDescription: string;
	statistics: StatisticFormValue[];
}

const SUPPORTED_ICON_NAMES = [
	'Users',
	'Target',
	'Award',
	'BookOpen',
	'Lightbulb',
	'CheckCircle',
	'Quote',
	'MessageCircle',
	'Calendar',
	'TrendingUp',
	'Star'
] as const;

const GRADIENT_OPTIONS = [
	'from-blue-900 via-blue-800 to-blue-900',
	'from-purple-900 via-purple-800 to-purple-900',
	'from-green-900 via-green-800 to-green-900',
	'from-red-900 via-red-800 to-red-900',
	'from-orange-900 via-orange-800 to-orange-900'
] as const;

const COLOR_OPTIONS = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'yellow',
	'pink',
	'indigo'
] as const;

const ICON_COLOR_OPTIONS = [
	'white',
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'yellow'
] as const;

const TEXT_COLOR_OPTIONS = ['white', 'black', 'gray'] as const;

const FALLBACK_ICON = 'Users';

// Helper functions to create empty form items
const createEmptyTeamMember = (): TeamMemberFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	position: '',
	qualifications: '',
	specialization: ''
});

const createEmptyDepartment = (): DepartmentFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	code: '',
	coordinator: '',
	companies: '',
	avgPackage: '',
	placementRate: ''
});

const createEmptyTrainingProgram = (): TrainingProgramFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	description: '',
	duration: '',
	participants: '',
	icon: 'BookOpen',
	color: 'blue'
});

const createEmptyObjective = (): ObjectiveFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	description: '',
	icon: 'Target'
});

const createEmptyStatistic = (): StatisticFormValue => ({
	id: crypto.randomUUID(),
	number: '',
	label: '',
	sublabel: ''
});

// Function to create updated data preserving existing fields
function createUpdatedData(
	currentData: TrainingPlacementData,
	formValues: Partial<FormValues>
): TrainingPlacementData {
	return {
		...currentData,
		hero: formValues.hero
			? {
					icon: formValues.hero.icon,
					title: formValues.hero.title,
					subtitle: formValues.hero.subtitle,
					gradient: formValues.hero.gradient,
					iconColor: formValues.hero.iconColor,
					textColor: formValues.hero.textColor
			  }
			: currentData.hero,
		directorMessage: formValues.directorMessage
			? {
					name: formValues.directorMessage.name,
					position: formValues.directorMessage.position,
					initials: formValues.directorMessage.initials,
					gradientColor: formValues.directorMessage.gradientColor,
					message1: formValues.directorMessage.message1,
					message2: formValues.directorMessage.message2
			  }
			: currentData.directorMessage,
		teamTitle: formValues.teamTitle ?? currentData.teamTitle,
		teamDescription: formValues.teamDescription ?? currentData.teamDescription,
		teamMembers:
			formValues.teamMembers && formValues.teamMembers.length > 0
				? formValues.teamMembers
						.filter(member => member.name && member.position)
						.map(member => ({
							id: member.id,
							name: member.name,
							position: member.position,
							qualifications: member.qualifications,
							specialization: member.specialization
						}))
				: currentData.teamMembers,
		departmentsTitle: formValues.departmentsTitle ?? currentData.departmentsTitle,
		departmentsDescription:
			formValues.departmentsDescription ?? currentData.departmentsDescription,
		departments:
			formValues.departments && formValues.departments.length > 0
				? formValues.departments
						.filter(dept => dept.name && dept.code)
						.map(dept => ({
							id: dept.id,
							name: dept.name,
							code: dept.code,
							coordinator: dept.coordinator,
							companies: dept.companies,
							avgPackage: dept.avgPackage,
							placementRate: dept.placementRate
						}))
				: currentData.departments,
		trainingTitle: formValues.trainingTitle ?? currentData.trainingTitle,
		trainingDescription:
			formValues.trainingDescription ?? currentData.trainingDescription,
		trainingPrograms:
			formValues.trainingPrograms && formValues.trainingPrograms.length > 0
				? formValues.trainingPrograms
						.filter(program => program.title && program.description)
						.map(program => ({
							id: program.id,
							title: program.title,
							description: program.description,
							duration: program.duration,
							participants: program.participants,
							icon: program.icon,
							color: program.color
						}))
				: currentData.trainingPrograms,
		objectivesTitle: formValues.objectivesTitle ?? currentData.objectivesTitle,
		objectivesDescription:
			formValues.objectivesDescription ?? currentData.objectivesDescription,
		objectives:
			formValues.objectives && formValues.objectives.length > 0
				? formValues.objectives
						.filter(obj => obj.title && obj.description)
						.map(obj => ({
							id: obj.id,
							title: obj.title,
							description: obj.description,
							icon: obj.icon
						}))
				: currentData.objectives,
		statisticsTitle: formValues.statisticsTitle ?? currentData.statisticsTitle,
		statisticsDescription:
			formValues.statisticsDescription ?? currentData.statisticsDescription,
		statistics:
			formValues.statistics && formValues.statistics.length > 0
				? formValues.statistics
						.filter(stat => stat.number && stat.label)
						.map(stat => ({
							id: stat.id,
							number: stat.number,
							label: stat.label,
							sublabel: stat.sublabel
						}))
				: currentData.statistics
	};
}

export default function TrainingPlacementForm({
	initialData,
	pageSlug,
	onChange
}: TrainingPlacementFormProps) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string>('');
	const [currentData, setCurrentData] =
		useState<TrainingPlacementData>(initialData);

	const form = useForm<FormValues>({
		defaultValues: {
			hero: {
				icon: initialData.hero?.icon ?? FALLBACK_ICON,
				title: initialData.hero?.title ?? 'About Training & Placement',
				subtitle:
					initialData.hero?.subtitle ??
					'Empowering students with industry-ready skills',
				gradient: initialData.hero?.gradient ?? GRADIENT_OPTIONS[0],
				iconColor: initialData.hero?.iconColor ?? 'white',
				textColor: initialData.hero?.textColor ?? 'white'
			},
			directorMessage: {
				name: initialData.directorMessage?.name ?? 'Prof. Achal Kausik',
				position:
					initialData.directorMessage?.position ??
					'Dean of Academics, Head of CSE, Head of T&P',
				initials: initialData.directorMessage?.initials ?? 'AK',
				gradientColor:
					initialData.directorMessage?.gradientColor ??
					'from-blue-500 to-blue-700',
				message1:
					initialData.directorMessage?.message1 ?? 'Message from director',
				message2: initialData.directorMessage?.message2 ?? 'Additional message'
			},
			teamTitle: initialData.teamTitle ?? 'Our Dedicated Team',
			teamDescription:
				initialData.teamDescription ??
				'Meet the professionals who make career dreams a reality',
			teamMembers:
				initialData.teamMembers && initialData.teamMembers.length > 0
					? initialData.teamMembers.map(member => ({
							id: member.id || crypto.randomUUID(),
							name: member.name,
							position: member.position,
							qualifications: member.qualifications,
							specialization: member.specialization
					  }))
					: [createEmptyTeamMember()],
			departmentsTitle:
				initialData.departmentsTitle ??
				'Department-wise Placement Coordinators',
			departmentsDescription:
				initialData.departmentsDescription ??
				"Specialized support for each department's unique placement needs",
			departments:
				initialData.departments && initialData.departments.length > 0
					? initialData.departments.map(dept => ({
							id: dept.id || crypto.randomUUID(),
							name: dept.name,
							code: dept.code,
							coordinator: dept.coordinator,
							companies: dept.companies,
							avgPackage: dept.avgPackage,
							placementRate: dept.placementRate
					  }))
					: [createEmptyDepartment()],
			trainingTitle: initialData.trainingTitle ?? 'Training Programs',
			trainingDescription:
				initialData.trainingDescription ??
				'Comprehensive training modules to enhance student employability',
			trainingPrograms:
				initialData.trainingPrograms && initialData.trainingPrograms.length > 0
					? initialData.trainingPrograms.map(program => ({
							id: program.id || crypto.randomUUID(),
							title: program.title,
							description: program.description,
							duration: program.duration,
							participants: program.participants,
							icon: program.icon,
							color: program.color
					  }))
					: [createEmptyTrainingProgram()],
			objectivesTitle: initialData.objectivesTitle ?? 'T&P Cell Objectives',
			objectivesDescription:
				initialData.objectivesDescription ??
				'Our primary focus areas for student development and placement success',
			objectives:
				initialData.objectives && initialData.objectives.length > 0
					? initialData.objectives.map(obj => ({
							id: obj.id || crypto.randomUUID(),
							title: obj.title,
							description: obj.description,
							icon: obj.icon
					  }))
					: [createEmptyObjective()],
			statisticsTitle: initialData.statisticsTitle ?? 'Our Success Metrics',
			statisticsDescription:
				initialData.statisticsDescription ??
				'Placement statistics that showcase our commitment to student success',
			statistics:
				initialData.statistics && initialData.statistics.length > 0
					? initialData.statistics.map(stat => ({
							id: stat.id || crypto.randomUUID(),
							number: stat.number,
							label: stat.label,
							sublabel: stat.sublabel
					  }))
					: [createEmptyStatistic()]
		}
	});

	const teamMembersArray = useFieldArray({
		control: form.control,
		name: 'teamMembers'
	});

	const departmentsArray = useFieldArray({
		control: form.control,
		name: 'departments'
	});

	const trainingProgramsArray = useFieldArray({
		control: form.control,
		name: 'trainingPrograms'
	});

	const objectivesArray = useFieldArray({
		control: form.control,
		name: 'objectives'
	});

	const statisticsArray = useFieldArray({
		control: form.control,
		name: 'statistics'
	});

	useEffect(() => {
		const updatedData = createUpdatedData(currentData, form.getValues());
		onChange?.(updatedData);
		const subscription = form.watch(values => {
			const formValues = {
				...values,
				teamMembers: values.teamMembers?.filter(Boolean) as TeamMemberFormValue[],
				departments: values.departments?.filter(Boolean) as DepartmentFormValue[],
				trainingPrograms: values.trainingPrograms?.filter(
					Boolean
				) as TrainingProgramFormValue[],
				objectives: values.objectives?.filter(Boolean) as ObjectiveFormValue[],
				statistics: values.statistics?.filter(Boolean) as StatisticFormValue[]
			} as Partial<FormValues>;
			const updatedData = createUpdatedData(currentData, formValues);
			onChange?.(updatedData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange, currentData]);

	const handleSubmit = (values: FormValues) => {
		setMessage('');
		const payload = createUpdatedData(currentData, values);
		startTransition(async () => {
			try {
				await updateTrainingPlacement(payload);
				setCurrentData(payload); // Update current data after successful save
				setMessage('Saved');
			} catch (error) {
				console.error('Save error:', error);
				setMessage('Save failed');
			}
		});
	};

	const iconOptions = useMemo(() => {
		const unique = new Set(SUPPORTED_ICON_NAMES);
		return Array.from(unique);
	}, []);

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Training & Placement
						</h3>
						<p className='text-sm text-slate-500'>
							Edit training and placement content and sections.
						</p>
					</div>
					<div className='flex items-center gap-2'>
						{message && (
							<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						)}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving...' : 'Save changes'}
						</Button>
					</div>
				</div>

				{/* Hero Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Hero Section</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='hero.title'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='About Training & Placement' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hero.subtitle'
							rules={{ required: 'Subtitle is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Textarea placeholder='Subtitle' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hero.icon'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger>
												<SelectValue placeholder='Select icon' />
											</SelectTrigger>
											<SelectContent>
												{iconOptions.map(option => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hero.gradient'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gradient</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger>
												<SelectValue placeholder='Select gradient' />
											</SelectTrigger>
											<SelectContent>
												{GRADIENT_OPTIONS.map(option => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Director's Message Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Director's Message
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='directorMessage.name'
							rules={{ required: 'Name is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='Prof. Achal Kausik' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='directorMessage.position'
							rules={{ required: 'Position is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Position</FormLabel>
									<FormControl>
										<Input placeholder='Dean of Academics' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='directorMessage.initials'
							rules={{ required: 'Initials are required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Initials</FormLabel>
									<FormControl>
										<Input placeholder='AK' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='directorMessage.gradientColor'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gradient Color</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger>
												<SelectValue placeholder='Select gradient' />
											</SelectTrigger>
											<SelectContent>
												{GRADIENT_OPTIONS.map(option => (
													<SelectItem key={option} value={option}>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='directorMessage.message1'
							rules={{ required: 'Message 1 is required' }}
							render={({ field }) => (
								<FormItem className='sm:col-span-2'>
									<FormLabel>Message 1</FormLabel>
									<FormControl>
										<Textarea
											placeholder='First message paragraph'
											{...field}
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='directorMessage.message2'
							rules={{ required: 'Message 2 is required' }}
							render={({ field }) => (
								<FormItem className='sm:col-span-2'>
									<FormLabel>Message 2</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Second message paragraph'
											{...field}
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Team Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Team Section</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='teamTitle'
							rules={{ required: 'Team title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Title</FormLabel>
									<FormControl>
										<Input placeholder='Our Dedicated Team' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='teamDescription'
							rules={{ required: 'Team description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Team description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>Manage team members</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => teamMembersArray.append(createEmptyTeamMember())}>
								Add Team Member
							</Button>
						</div>
						<div className='space-y-4'>
							{teamMembersArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Team Member {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => teamMembersArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.name`}
											rules={{ required: 'Name is required' }}
											render={({ field: nameField }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input placeholder='Member name' {...nameField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.position`}
											rules={{ required: 'Position is required' }}
											render={({ field: posField }) => (
												<FormItem>
													<FormLabel>Position</FormLabel>
													<FormControl>
														<Input placeholder='Position' {...posField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.qualifications`}
											rules={{ required: 'Qualifications are required' }}
											render={({ field: qualField }) => (
												<FormItem>
													<FormLabel>Qualifications</FormLabel>
													<FormControl>
														<Input placeholder='Qualifications' {...qualField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.specialization`}
											rules={{ required: 'Specialization is required' }}
											render={({ field: specField }) => (
												<FormItem>
													<FormLabel>Specialization</FormLabel>
													<FormControl>
														<Input placeholder='Specialization' {...specField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{teamMembersArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one team member to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Departments Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Departments Section
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='departmentsTitle'
							rules={{ required: 'Departments title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Departments Title</FormLabel>
									<FormControl>
										<Input
											placeholder='Department-wise Placement Coordinators'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='departmentsDescription'
							rules={{ required: 'Departments description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Departments Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Departments description'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>Manage departments</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => departmentsArray.append(createEmptyDepartment())}>
								Add Department
							</Button>
						</div>
						<div className='space-y-4'>
							{departmentsArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Department {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => departmentsArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`departments.${index}.name`}
											rules={{ required: 'Name is required' }}
											render={({ field: nameField }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input placeholder='Department name' {...nameField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`departments.${index}.code`}
											rules={{ required: 'Code is required' }}
											render={({ field: codeField }) => (
												<FormItem>
													<FormLabel>Code</FormLabel>
													<FormControl>
														<Input placeholder='CSE' {...codeField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`departments.${index}.coordinator`}
											rules={{ required: 'Coordinator is required' }}
											render={({ field: coordField }) => (
												<FormItem>
													<FormLabel>Coordinator</FormLabel>
													<FormControl>
														<Input placeholder='Coordinator name' {...coordField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`departments.${index}.companies`}
											rules={{ required: 'Companies are required' }}
											render={({ field: compField }) => (
												<FormItem>
													<FormLabel>Companies</FormLabel>
													<FormControl>
														<Input
															placeholder='Company 1, Company 2'
															{...compField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`departments.${index}.avgPackage`}
											rules={{ required: 'Average package is required' }}
											render={({ field: avgField }) => (
												<FormItem>
													<FormLabel>Avg Package</FormLabel>
													<FormControl>
														<Input placeholder='₹9.07 LPA' {...avgField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`departments.${index}.placementRate`}
											rules={{ required: 'Placement rate is required' }}
											render={({ field: rateField }) => (
												<FormItem>
													<FormLabel>Placement Rate</FormLabel>
													<FormControl>
														<Input placeholder='96%' {...rateField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{departmentsArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one department to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Training Programs Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Training Programs
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='trainingTitle'
							rules={{ required: 'Training title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Training Title</FormLabel>
									<FormControl>
										<Input placeholder='Training Programs' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='trainingDescription'
							rules={{ required: 'Training description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Training Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Training description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>
								Manage training programs
							</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() =>
									trainingProgramsArray.append(createEmptyTrainingProgram())
								}>
								Add Training Program
							</Button>
						</div>
						<div className='space-y-4'>
							{trainingProgramsArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Training Program {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => trainingProgramsArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`trainingPrograms.${index}.title`}
											rules={{ required: 'Title is required' }}
											render={({ field: titleField }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input placeholder='Program title' {...titleField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`trainingPrograms.${index}.description`}
											rules={{ required: 'Description is required' }}
											render={({ field: descField }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea
															placeholder='Program description'
															{...descField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`trainingPrograms.${index}.duration`}
											rules={{ required: 'Duration is required' }}
											render={({ field: durField }) => (
												<FormItem>
													<FormLabel>Duration</FormLabel>
													<FormControl>
														<Input placeholder='2 weeks' {...durField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`trainingPrograms.${index}.participants`}
											rules={{ required: 'Participants are required' }}
											render={({ field: partField }) => (
												<FormItem>
													<FormLabel>Participants</FormLabel>
													<FormControl>
														<Input placeholder='500+ students' {...partField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`trainingPrograms.${index}.icon`}
											render={({ field: iconField }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
													<FormControl>
														<Select
															onValueChange={iconField.onChange}
															value={iconField.value}>
															<SelectTrigger>
																<SelectValue placeholder='Select icon' />
															</SelectTrigger>
															<SelectContent>
																{iconOptions.map(option => (
																	<SelectItem key={option} value={option}>
																		{option}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`trainingPrograms.${index}.color`}
											render={({ field: colorField }) => (
												<FormItem>
													<FormLabel>Color</FormLabel>
													<FormControl>
														<Select
															onValueChange={colorField.onChange}
															value={colorField.value}>
															<SelectTrigger>
																<SelectValue placeholder='Select color' />
															</SelectTrigger>
															<SelectContent>
																{COLOR_OPTIONS.map(option => (
																	<SelectItem key={option} value={option}>
																		{option}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{trainingProgramsArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one training program to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Objectives Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Objectives Section
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='objectivesTitle'
							rules={{ required: 'Objectives title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Objectives Title</FormLabel>
									<FormControl>
										<Input placeholder='T&P Cell Objectives' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='objectivesDescription'
							rules={{ required: 'Objectives description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Objectives Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Objectives description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>Manage objectives</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => objectivesArray.append(createEmptyObjective())}>
								Add Objective
							</Button>
						</div>
						<div className='space-y-4'>
							{objectivesArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Objective {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => objectivesArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`objectives.${index}.title`}
											rules={{ required: 'Title is required' }}
											render={({ field: titleField }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input
															placeholder='Objective title'
															{...titleField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`objectives.${index}.description`}
											rules={{ required: 'Description is required' }}
											render={({ field: descField }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea
															placeholder='Objective description'
															{...descField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`objectives.${index}.icon`}
											render={({ field: iconField }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
													<FormControl>
														<Select
															onValueChange={iconField.onChange}
															value={iconField.value}>
															<SelectTrigger>
																<SelectValue placeholder='Select icon' />
															</SelectTrigger>
															<SelectContent>
																{iconOptions.map(option => (
																	<SelectItem key={option} value={option}>
																		{option}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{objectivesArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one objective to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Statistics Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Statistics Section
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='statisticsTitle'
							rules={{ required: 'Statistics title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Statistics Title</FormLabel>
									<FormControl>
										<Input placeholder='Our Success Metrics' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='statisticsDescription'
							rules={{ required: 'Statistics description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Statistics Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Statistics description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>Manage statistics</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => statisticsArray.append(createEmptyStatistic())}>
								Add Statistic
							</Button>
						</div>
						<div className='space-y-4'>
							{statisticsArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Statistic {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => statisticsArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`statistics.${index}.number`}
											rules={{ required: 'Number is required' }}
											render={({ field: numField }) => (
												<FormItem>
													<FormLabel>Number</FormLabel>
													<FormControl>
														<Input placeholder='₹9.07' {...numField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`statistics.${index}.label`}
											rules={{ required: 'Label is required' }}
											render={({ field: labelField }) => (
												<FormItem>
													<FormLabel>Label</FormLabel>
													<FormControl>
														<Input placeholder='Average Package' {...labelField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`statistics.${index}.sublabel`}
											rules={{ required: 'Sublabel is required' }}
											render={({ field: subField }) => (
												<FormItem>
													<FormLabel>Sublabel</FormLabel>
													<FormControl>
														<Input placeholder='LPA for 2022 batch' {...subField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{statisticsArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one statistic to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
