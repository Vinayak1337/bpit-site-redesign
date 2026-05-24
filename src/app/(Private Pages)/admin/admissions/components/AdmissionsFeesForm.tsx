'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
	type AdmissionsFeeProgram,
	type AdmissionsFeesMeta,
	updateAdmissionsFeePrograms,
	updateAdmissionsFeesMeta
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_ICON_NAMES } from '@/lib/admissions-icons';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { createClientId } from '@/lib/utils';
import {
	AddRowButton,
	AdminEmptyState,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	AdminReorderControls,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

type FeesPageData = {
	meta: AdmissionsFeesMeta;
	programs: AdmissionsFeeProgram[];
};

type Props = {
	initialData: FeesPageData;
	onChange?: (data: FeesPageData) => void;
	visibleSections?: Array<'meta' | 'programs'>;
};

type FeeComponentFormValue = {
	id: string;
	name: string;
	amount: number;
	description: string;
};
type FeeBreakdownFormValue = {
	id: string;
	title: string;
	shortLabel: string;
	description: string;
	components: FeeComponentFormValue[];
};
type FeeYearFormValue = {
	id: string;
	year: number;
	title: string;
	note: string;
	breakdowns: FeeBreakdownFormValue[];
};
type FeeProgramFormValue = {
	id: string;
	name: string;
	shortName: string;
	duration: string;
	icon: string;
	color: string;
	description: string;
	paymentNote: string;
	years: FeeYearFormValue[];
};

type FormValues = {
	title: string;
	subtitle: string;
	description: string;
	academicSession: string;
	billingNote: string;
	selectorEyebrow: string;
	selectorTitle: string;
	selectorDescription: string;
	overviewEyebrow: string;
	programTotalLabel: string;
	annualViewsLabel: string;
	breakdownPanelsLabel: string;
	paymentNoteTitle: string;
	snapshotEyebrow: string;
	snapshotTitle: string;
	snapshotDescription: string;
	yearSectionsLabel: string;
	yearTotalLabel: string;
	breakdownEyebrow: string;
	breakdownTitle: string;
	breakdownDescription: string;
	annualHeadsEyebrow: string;
	annualHeadsTitle: string;
	annualHeadsDescription: string;
	importantNotesEyebrow: string;
	importantNotesTitle: string;
	importantNotesText: string;
	supportEyebrow: string;
	supportTitle: string;
	supportMessage: string;
	supportEmail: string;
	supportPhone: string;
	supportCardTitle: string;
	supportCardDescription: string;
	programs: FeeProgramFormValue[];
};

const splitLines = (value: string) =>
	value.split('\n').map(i => i.trim()).filter(Boolean);
const sumAmounts = (a: number[]) => a.reduce((s, n) => s + n, 0);

const createFeeComponent = () => ({
	id: createClientId('admissions-fees-component'),
	name: '',
	amount: 0,
	description: ''
});
const createFeeBreakdown = () => ({
	id: createClientId('admissions-fees-breakdown'),
	title: '',
	shortLabel: '',
	description: '',
	components: [createFeeComponent()]
});
const createFeeYear = () => ({
	id: createClientId('admissions-fees-year'),
	year: 1,
	title: '',
	note: '',
	breakdowns: [createFeeBreakdown()]
});
const createFeeProgram = (): FeeProgramFormValue => ({
	id: '',
	name: '',
	shortName: '',
	duration: '',
	icon: 'GraduationCap',
	color: '',
	description: '',
	paymentNote: '',
	years: [createFeeYear()]
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

function normalizePrograms(
	programs: FeeProgramFormValue[]
): AdmissionsFeeProgram[] {
	return programs
		.map(program => {
			const years = program.years
				.map(year => {
					const breakdowns = year.breakdowns
						.map(b => {
							const components = b.components
								.map(c => ({
									name: c.name.trim(),
									amount: Number(c.amount) || 0,
									description: c.description.trim()
								}))
								.filter(c => c.name);
							return {
								id: b.id.trim(),
								title: b.title.trim(),
								shortLabel: b.shortLabel.trim(),
								description: b.description.trim(),
								totalAmount: sumAmounts(components.map(c => c.amount)),
								components
							};
						})
						.filter(b => b.title && b.components.length > 0);
					return {
						year: Number(year.year) || 1,
						title: year.title.trim(),
						note: year.note.trim(),
						breakdowns,
						feeGroups: [],
						totalYearFee: sumAmounts(breakdowns.map(b => b.totalAmount))
					};
				})
				.filter(y => y.title || y.breakdowns.length > 0);

			return {
				id: program.id.trim(),
				name: program.name.trim(),
				shortName: program.shortName.trim(),
				duration: program.duration.trim(),
				icon: program.icon.trim(),
				color: program.color.trim(),
				description: program.description.trim(),
				paymentNote: program.paymentNote.trim(),
				years,
				totalProgramFee: sumAmounts(years.map(y => y.totalYearFee))
			};
		})
		.filter(p => p.id && p.name && p.duration && p.years.length > 0);
}

function normalizeData(values: FormValues): FeesPageData {
	return {
		meta: {
			title: values.title.trim(),
			subtitle: values.subtitle.trim(),
			description: values.description.trim(),
			academicSession: values.academicSession.trim(),
			billingNote: values.billingNote.trim(),
			importantNotes: splitLines(values.importantNotesText),
			supportMessage: values.supportMessage.trim(),
			supportEmail: values.supportEmail.trim(),
			supportPhone: values.supportPhone.trim(),
			selectorEyebrow: values.selectorEyebrow.trim(),
			selectorTitle: values.selectorTitle.trim(),
			selectorDescription: values.selectorDescription.trim(),
			overviewEyebrow: values.overviewEyebrow.trim(),
			programTotalLabel: values.programTotalLabel.trim(),
			annualViewsLabel: values.annualViewsLabel.trim(),
			breakdownPanelsLabel: values.breakdownPanelsLabel.trim(),
			paymentNoteTitle: values.paymentNoteTitle.trim(),
			snapshotEyebrow: values.snapshotEyebrow.trim(),
			snapshotTitle: values.snapshotTitle.trim(),
			snapshotDescription: values.snapshotDescription.trim(),
			yearSectionsLabel: values.yearSectionsLabel.trim(),
			yearTotalLabel: values.yearTotalLabel.trim(),
			breakdownEyebrow: values.breakdownEyebrow.trim(),
			breakdownTitle: values.breakdownTitle.trim(),
			breakdownDescription: values.breakdownDescription.trim(),
			annualHeadsEyebrow: values.annualHeadsEyebrow.trim(),
			annualHeadsTitle: values.annualHeadsTitle.trim(),
			annualHeadsDescription: values.annualHeadsDescription.trim(),
			importantNotesEyebrow: values.importantNotesEyebrow.trim(),
			importantNotesTitle: values.importantNotesTitle.trim(),
			supportEyebrow: values.supportEyebrow.trim(),
			supportTitle: values.supportTitle.trim(),
			supportCardTitle: values.supportCardTitle.trim(),
			supportCardDescription: values.supportCardDescription.trim()
		},
		programs: normalizePrograms(values.programs)
	};
}

/* ------------------------------------------------------------------ */
/*  Nested sub-sections — flat, no bordered cards (one-container rule) */
/* ------------------------------------------------------------------ */

function ComponentsList({
	form,
	programIndex,
	yearIndex,
	breakdownIndex
}: {
	form: UseFormReturn<FormValues>;
	programIndex: number;
	yearIndex: number;
	breakdownIndex: number;
}) {
	const componentsArray = useFieldArray({
		control: form.control,
		name: `programs.${programIndex}.years.${yearIndex}.breakdowns.${breakdownIndex}.components`
	});
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xs font-medium text-slate-500'>Fee components</p>
			{componentsArray.fields.map((field, ci) => (
				<div
					key={field.id}
					className='grid grid-cols-12 items-start gap-2'>
					<div className='col-span-12 sm:col-span-5'>
						<Input
							placeholder='Tuition fee'
							{...form.register(
								`programs.${programIndex}.years.${yearIndex}.breakdowns.${breakdownIndex}.components.${ci}.name` as const
							)}
						/>
					</div>
					<div className='col-span-6 sm:col-span-2'>
						<Input
							type='number'
							placeholder='0'
							{...form.register(
								`programs.${programIndex}.years.${yearIndex}.breakdowns.${breakdownIndex}.components.${ci}.amount` as const,
								{ valueAsNumber: true }
							)}
						/>
					</div>
					<div className='col-span-5 sm:col-span-4'>
						<Input
							placeholder='Description'
							{...form.register(
								`programs.${programIndex}.years.${yearIndex}.breakdowns.${breakdownIndex}.components.${ci}.description` as const
							)}
						/>
					</div>
					<div className='col-span-1 flex justify-end'>
						<Button
							type='button'
							variant='ghost'
							size='icon'
							className='h-9 w-9 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
							onClick={() => componentsArray.remove(ci)}
							aria-label='Remove component'>
							<Trash2 className='h-4 w-4' />
						</Button>
					</div>
				</div>
			))}
			<AddRowButton onClick={() => componentsArray.append(createFeeComponent())}>
				Add component
			</AddRowButton>
		</div>
	);
}

function BreakdownsList({
	form,
	programIndex,
	yearIndex
}: {
	form: UseFormReturn<FormValues>;
	programIndex: number;
	yearIndex: number;
}) {
	const breakdownsArray = useFieldArray({
		control: form.control,
		name: `programs.${programIndex}.years.${yearIndex}.breakdowns`
	});
	return (
		<div className='flex flex-col gap-4'>
			<p className='text-xs font-medium uppercase tracking-wide text-slate-500'>
				Breakdowns
			</p>
			{breakdownsArray.fields.map((field, bi) => (
				<div
					key={field.id}
					className='flex flex-col gap-3 border-l-2 border-slate-200 pl-4'>
					<div className='flex items-center justify-between gap-2'>
						<p className='text-sm font-semibold text-slate-800'>
							{form.watch(
								`programs.${programIndex}.years.${yearIndex}.breakdowns.${bi}.title`
							) || `Breakdown ${bi + 1}`}
						</p>
						<div className='flex items-center gap-1'>
							<AdminReorderControls
								onUp={() => breakdownsArray.move(bi, bi - 1)}
								onDown={() => breakdownsArray.move(bi, bi + 1)}
								disableUp={bi === 0}
								disableDown={bi === breakdownsArray.fields.length - 1}
							/>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='h-8 w-8 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
								onClick={() => breakdownsArray.remove(bi)}
								aria-label='Remove breakdown'>
								<Trash2 className='h-4 w-4' />
							</Button>
						</div>
					</div>
					<AdminFieldGrid>
						<AdminField label='Breakdown ID'>
							<Input
								{...form.register(
									`programs.${programIndex}.years.${yearIndex}.breakdowns.${bi}.id` as const
								)}
							/>
						</AdminField>
						<AdminField label='Short label'>
							<Input
								placeholder='Sem 1'
								{...form.register(
									`programs.${programIndex}.years.${yearIndex}.breakdowns.${bi}.shortLabel` as const
								)}
							/>
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Title'>
						<Input
							{...form.register(
								`programs.${programIndex}.years.${yearIndex}.breakdowns.${bi}.title` as const
							)}
						/>
					</AdminField>
					<AdminField label='Description'>
						<Textarea
							rows={2}
							className='resize-none'
							{...form.register(
								`programs.${programIndex}.years.${yearIndex}.breakdowns.${bi}.description` as const
							)}
						/>
					</AdminField>
					<ComponentsList
						form={form}
						programIndex={programIndex}
						yearIndex={yearIndex}
						breakdownIndex={bi}
					/>
				</div>
			))}
			<AddRowButton onClick={() => breakdownsArray.append(createFeeBreakdown())}>
				Add breakdown
			</AddRowButton>
		</div>
	);
}

function YearsList({
	form,
	programIndex
}: {
	form: UseFormReturn<FormValues>;
	programIndex: number;
}) {
	const yearsArray = useFieldArray({
		control: form.control,
		name: `programs.${programIndex}.years`
	});
	return (
		<div className='flex flex-col gap-5'>
			<p className='text-xs font-medium uppercase tracking-wide text-slate-500'>
				Annual cards
			</p>
			{yearsArray.fields.map((field, yi) => (
				<div key={field.id} className='flex flex-col gap-3'>
					<div className='flex items-center justify-between gap-2'>
						<p className='text-sm font-semibold text-slate-800'>
							{form.watch(`programs.${programIndex}.years.${yi}.title`) ||
								`Year ${yi + 1}`}
						</p>
						<div className='flex items-center gap-1'>
							<AdminReorderControls
								onUp={() => yearsArray.move(yi, yi - 1)}
								onDown={() => yearsArray.move(yi, yi + 1)}
								disableUp={yi === 0}
								disableDown={yi === yearsArray.fields.length - 1}
							/>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='h-8 w-8 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
								onClick={() => yearsArray.remove(yi)}
								aria-label='Remove year'>
								<Trash2 className='h-4 w-4' />
							</Button>
						</div>
					</div>
					<AdminFieldGrid>
						<AdminField label='Year number'>
							<Input
								type='number'
								{...form.register(
									`programs.${programIndex}.years.${yi}.year` as const,
									{ valueAsNumber: true }
								)}
							/>
						</AdminField>
						<AdminField label='Title'>
							<Input
								placeholder='First Year'
								{...form.register(
									`programs.${programIndex}.years.${yi}.title` as const
								)}
							/>
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Note'>
						<Textarea
							rows={2}
							className='resize-none'
							{...form.register(
								`programs.${programIndex}.years.${yi}.note` as const
							)}
						/>
					</AdminField>
					<BreakdownsList
						form={form}
						programIndex={programIndex}
						yearIndex={yi}
					/>
				</div>
			))}
			<AddRowButton onClick={() => yearsArray.append(createFeeYear())}>
				Add year
			</AddRowButton>
		</div>
	);
}

export default function AdmissionsFeesForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const defaults = useMemo<FormValues>(
		() => ({
			title: initialData.meta.title,
			subtitle: initialData.meta.subtitle,
			description: initialData.meta.description,
			academicSession: initialData.meta.academicSession,
			billingNote: initialData.meta.billingNote,
			selectorEyebrow: initialData.meta.selectorEyebrow,
			selectorTitle: initialData.meta.selectorTitle,
			selectorDescription: initialData.meta.selectorDescription,
			overviewEyebrow: initialData.meta.overviewEyebrow,
			programTotalLabel: initialData.meta.programTotalLabel,
			annualViewsLabel: initialData.meta.annualViewsLabel,
			breakdownPanelsLabel: initialData.meta.breakdownPanelsLabel,
			paymentNoteTitle: initialData.meta.paymentNoteTitle,
			snapshotEyebrow: initialData.meta.snapshotEyebrow,
			snapshotTitle: initialData.meta.snapshotTitle,
			snapshotDescription: initialData.meta.snapshotDescription,
			yearSectionsLabel: initialData.meta.yearSectionsLabel,
			yearTotalLabel: initialData.meta.yearTotalLabel,
			breakdownEyebrow: initialData.meta.breakdownEyebrow,
			breakdownTitle: initialData.meta.breakdownTitle,
			breakdownDescription: initialData.meta.breakdownDescription,
			annualHeadsEyebrow: initialData.meta.annualHeadsEyebrow,
			annualHeadsTitle: initialData.meta.annualHeadsTitle,
			annualHeadsDescription: initialData.meta.annualHeadsDescription,
			importantNotesEyebrow: initialData.meta.importantNotesEyebrow,
			importantNotesTitle: initialData.meta.importantNotesTitle,
			importantNotesText: initialData.meta.importantNotes.join('\n'),
			supportEyebrow: initialData.meta.supportEyebrow,
			supportTitle: initialData.meta.supportTitle,
			supportMessage: initialData.meta.supportMessage,
			supportEmail: initialData.meta.supportEmail,
			supportPhone: initialData.meta.supportPhone,
			supportCardTitle: initialData.meta.supportCardTitle,
			supportCardDescription: initialData.meta.supportCardDescription,
			programs: initialData.programs.map(program => ({
				id: program.id,
				name: program.name,
				shortName: program.shortName ?? '',
				duration: program.duration,
				icon: program.icon,
				color: program.color ?? '',
				description: program.description ?? '',
				paymentNote: program.paymentNote ?? '',
				years: program.years.map((year, yi) => ({
					id: `${program.id}-year-${year.year}-${yi}`,
					year: year.year,
					title: year.title,
					note: year.note ?? '',
					breakdowns: (year.breakdowns ?? []).map((b, bi) => ({
						id:
							b.id ??
							`${program.id}-year-${year.year}-breakdown-${bi}`,
						title: b.title,
						shortLabel: b.shortLabel ?? '',
						description: b.description ?? '',
						components: b.components.map((c, ci) => ({
							id: `${program.id}-year-${year.year}-breakdown-${bi}-component-${ci}`,
							name: c.name,
							amount: c.amount,
							description: c.description ?? ''
						}))
					}))
				}))
			}))
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const programsArray = useFieldArray({
		control: form.control,
		name: 'programs'
	});

	useEffect(() => {
		form.reset(defaults);
	}, [defaults, form]);

	useEffect(() => {
		onChange?.(normalizeData(form.getValues()));
		const sub = form.watch(v => {
			onChange?.(normalizeData(v as FormValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const payload = normalizeData(values);
		startTransition(async () => {
			const tasks: Promise<{ ok: boolean }>[] = [];
			if (includes(visibleSections, 'meta'))
				tasks.push(updateAdmissionsFeesMeta(payload.meta));
			if (includes(visibleSections, 'programs'))
				tasks.push(updateAdmissionsFeePrograms(payload.programs));
			const results = await Promise.all(tasks);
			setStatus(
				results.every(r => r.ok)
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			{includes(visibleSections, 'meta') && (
				<>
					<AdminFormSection
						title='Hero and program selector'
						description='Top-of-page messaging and the program-picker copy.'>
						<AdminField label='Title'>
							<Input {...form.register('title')} />
						</AdminField>
						<AdminField label='Subtitle'>
							<Input {...form.register('subtitle')} />
						</AdminField>
						<AdminField label='Description'>
							<Textarea
								rows={3}
								className='resize-none'
								{...form.register('description')}
							/>
						</AdminField>
						<AdminFieldGrid>
							<AdminField label='Academic session'>
								<Input {...form.register('academicSession')} />
							</AdminField>
							<AdminField label='Billing note'>
								<Input {...form.register('billingNote')} />
							</AdminField>
							<AdminField label='Selector eyebrow'>
								<Input {...form.register('selectorEyebrow')} />
							</AdminField>
							<AdminField label='Selector title'>
								<Input {...form.register('selectorTitle')} />
							</AdminField>
						</AdminFieldGrid>
						<AdminField label='Selector description'>
							<Textarea
								rows={3}
								className='resize-none'
								{...form.register('selectorDescription')}
							/>
						</AdminField>
						<AdminFieldGrid>
							<AdminField label='Overview eyebrow'>
								<Input {...form.register('overviewEyebrow')} />
							</AdminField>
							<AdminField label='Program total label'>
								<Input {...form.register('programTotalLabel')} />
							</AdminField>
							<AdminField label='Annual views label'>
								<Input {...form.register('annualViewsLabel')} />
							</AdminField>
							<AdminField label='Breakdown panels label'>
								<Input {...form.register('breakdownPanelsLabel')} />
							</AdminField>
							<AdminField label='Payment note title'>
								<Input {...form.register('paymentNoteTitle')} />
							</AdminField>
						</AdminFieldGrid>
					</AdminFormSection>

					<AdminFormSection title='Annual sections and notes'>
						<AdminFieldGrid>
							<AdminField label='Snapshot eyebrow'>
								<Input {...form.register('snapshotEyebrow')} />
							</AdminField>
							<AdminField label='Snapshot title'>
								<Input {...form.register('snapshotTitle')} />
							</AdminField>
						</AdminFieldGrid>
						<AdminField label='Snapshot description'>
							<Textarea
								rows={3}
								className='resize-none'
								{...form.register('snapshotDescription')}
							/>
						</AdminField>
						<AdminFieldGrid>
							<AdminField label='Year sections label'>
								<Input {...form.register('yearSectionsLabel')} />
							</AdminField>
							<AdminField label='Year total label'>
								<Input {...form.register('yearTotalLabel')} />
							</AdminField>
							<AdminField label='Breakdown eyebrow'>
								<Input {...form.register('breakdownEyebrow')} />
							</AdminField>
							<AdminField label='Breakdown title'>
								<Input {...form.register('breakdownTitle')} />
							</AdminField>
						</AdminFieldGrid>
						<AdminField label='Breakdown description'>
							<Textarea
								rows={3}
								className='resize-none'
								{...form.register('breakdownDescription')}
							/>
						</AdminField>
						<AdminFieldGrid>
							<AdminField label='Annual heads eyebrow'>
								<Input {...form.register('annualHeadsEyebrow')} />
							</AdminField>
							<AdminField label='Annual heads title'>
								<Input {...form.register('annualHeadsTitle')} />
							</AdminField>
						</AdminFieldGrid>
						<AdminField label='Annual heads description'>
							<Textarea
								rows={3}
								className='resize-none'
								{...form.register('annualHeadsDescription')}
							/>
						</AdminField>
						<AdminFieldGrid>
							<AdminField label='Important notes eyebrow'>
								<Input {...form.register('importantNotesEyebrow')} />
							</AdminField>
							<AdminField label='Important notes title'>
								<Input {...form.register('importantNotesTitle')} />
							</AdminField>
						</AdminFieldGrid>
						<AdminField
							label='Important notes'
							hint='One note per line.'>
							<Textarea
								rows={5}
								className='resize-none'
								placeholder='One note per line'
								{...form.register('importantNotesText')}
							/>
						</AdminField>
					</AdminFormSection>

					<AdminFormSection title='Support'>
						<AdminFieldGrid>
							<AdminField label='Support eyebrow'>
								<Input {...form.register('supportEyebrow')} />
							</AdminField>
							<AdminField label='Support title'>
								<Input {...form.register('supportTitle')} />
							</AdminField>
						</AdminFieldGrid>
						<AdminField label='Support message'>
							<Textarea
								rows={3}
								className='resize-none'
								{...form.register('supportMessage')}
							/>
						</AdminField>
						<AdminFieldGrid>
							<AdminField label='Support email'>
								<Input {...form.register('supportEmail')} />
							</AdminField>
							<AdminField label='Support phone'>
								<Input {...form.register('supportPhone')} />
							</AdminField>
							<AdminField label='Support card title'>
								<Input {...form.register('supportCardTitle')} />
							</AdminField>
						</AdminFieldGrid>
						<AdminField label='Support card description'>
							<Textarea
								rows={3}
								className='resize-none'
								{...form.register('supportCardDescription')}
							/>
						</AdminField>
					</AdminFormSection>
				</>
			)}

			{includes(visibleSections, 'programs') && (
				<AdminFormSection title='Program fee ledgers'>
					<AdminItemList>
						{programsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={programsArray.fields.length}
								title={
									form.watch(`programs.${index}.name`) || `Program ${index + 1}`
								}
								subtitle={
									form.watch(`programs.${index}.duration`) || undefined
								}
								onMove={d => programsArray.move(index, index + d)}
								onRemove={() => programsArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Program ID'>
										<Input
											{...form.register(`programs.${index}.id` as const)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										<Select
											value={
												form.watch(`programs.${index}.icon`) || 'GraduationCap'
											}
											onValueChange={v =>
												form.setValue(`programs.${index}.icon`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select icon' />
											</SelectTrigger>
											<SelectContent>
												{ADMISSIONS_ICON_NAMES.map(icon => (
													<SelectItem key={icon} value={icon}>
														{icon}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Name'>
									<Input
										{...form.register(`programs.${index}.name` as const)}
									/>
								</AdminField>
								<AdminFieldGrid>
									<AdminField label='Short name'>
										<Input
											{...form.register(`programs.${index}.shortName` as const)}
										/>
									</AdminField>
									<AdminField label='Duration'>
										<Input
											placeholder='4 Years'
											{...form.register(`programs.${index}.duration` as const)}
										/>
									</AdminField>
									<AdminField label='Color hint'>
										<Input
											placeholder='blue'
											{...form.register(`programs.${index}.color` as const)}
										/>
									</AdminField>
									<AdminField label='Payment note'>
										<Input
											{...form.register(
												`programs.${index}.paymentNote` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={3}
										className='resize-none'
										{...form.register(
											`programs.${index}.description` as const
										)}
									/>
								</AdminField>
								<YearsList form={form} programIndex={index} />
							</AdminItemCard>
						))}
					</AdminItemList>
					{programsArray.fields.length === 0 && (
						<AdminEmptyState title='No programs yet' />
					)}
					<AddRowButton
						onClick={() => programsArray.append(createFeeProgram())}>
						Add program
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
