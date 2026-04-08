'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
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
	value
		.split('\n')
		.map(item => item.trim())
		.filter(Boolean);

const sumAmounts = (amounts: number[]) => amounts.reduce((sum, amount) => sum + amount, 0);

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

function normalizePrograms(programs: FeeProgramFormValue[]): AdmissionsFeeProgram[] {
	return programs
		.map(program => {
			const years = program.years
				.map(year => {
					const breakdowns = year.breakdowns
						.map(breakdown => {
							const components = breakdown.components
								.map(component => ({
									name: component.name.trim(),
									amount: Number(component.amount) || 0,
									description: component.description.trim()
								}))
								.filter(component => component.name);
							return {
								id: breakdown.id.trim(),
								title: breakdown.title.trim(),
								shortLabel: breakdown.shortLabel.trim(),
								description: breakdown.description.trim(),
								totalAmount: sumAmounts(components.map(component => component.amount)),
								components
							};
						})
						.filter(breakdown => breakdown.title && breakdown.components.length > 0);
					return {
						year: Number(year.year) || 1,
						title: year.title.trim(),
						note: year.note.trim(),
						breakdowns,
						feeGroups: [],
						totalYearFee: sumAmounts(
							breakdowns.map(breakdown => breakdown.totalAmount)
						)
					};
				})
				.filter(year => year.title || year.breakdowns.length > 0);

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
				totalProgramFee: sumAmounts(years.map(year => year.totalYearFee))
			};
		})
		.filter(program => program.id && program.name && program.duration && program.years.length > 0);
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

function FeeBreakdownFields({
	form,
	programIndex,
	yearIndex,
	index,
	onRemove
}: {
	form: UseFormReturn<FormValues>;
	programIndex: number;
	yearIndex: number;
	index: number;
	onRemove: () => void;
}) {
	const componentsArray = useFieldArray({
		control: form.control,
		name: `programs.${programIndex}.years.${yearIndex}.breakdowns.${index}.components`
	});

	return (
		<div className='space-y-4 rounded-xl border border-slate-200 bg-white p-4'>
			<div className='flex items-center justify-between'>
				<span className='text-sm font-medium text-slate-700'>Breakdown {index + 1}</span>
				<Button type='button' variant='ghost' size='sm' onClick={onRemove}>
					Remove
				</Button>
			</div>
			<div className='grid gap-4 sm:grid-cols-2'>
				<FormField control={form.control} name={`programs.${programIndex}.years.${yearIndex}.breakdowns.${index}.id`} render={({ field }) => <FormItem><FormLabel>Breakdown ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${programIndex}.years.${yearIndex}.breakdowns.${index}.shortLabel`} render={({ field }) => <FormItem><FormLabel>Short label</FormLabel><FormControl><Input placeholder='Sem 1' {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${programIndex}.years.${yearIndex}.breakdowns.${index}.title`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${programIndex}.years.${yearIndex}.breakdowns.${index}.description`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Description</FormLabel><FormControl><Textarea rows={2} className='resize-none' {...field} /></FormControl></FormItem>} />
			</div>

			<div className='space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4'>
				<div className='flex items-center justify-between'>
					<h6 className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-600'>Fee components</h6>
					<Button type='button' variant='outline' size='sm' onClick={() => componentsArray.append(createFeeComponent())}>
						Add component
					</Button>
				</div>
				{componentsArray.fields.map((field, componentIndex) => (
					<div key={field.id} className='space-y-4 rounded-xl border border-slate-200 bg-white p-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm font-medium text-slate-700'>Component {componentIndex + 1}</span>
							<Button type='button' variant='ghost' size='sm' onClick={() => componentsArray.remove(componentIndex)}>
								Remove
							</Button>
						</div>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField control={form.control} name={`programs.${programIndex}.years.${yearIndex}.breakdowns.${index}.components.${componentIndex}.name`} render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name={`programs.${programIndex}.years.${yearIndex}.breakdowns.${index}.components.${componentIndex}.amount`} render={({ field }) => <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type='number' {...field} onChange={event => field.onChange(Number(event.target.value))} /></FormControl></FormItem>} />
							<FormField control={form.control} name={`programs.${programIndex}.years.${yearIndex}.breakdowns.${index}.components.${componentIndex}.description`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function FeeYearFields({
	form,
	programIndex,
	index,
	onRemove
}: {
	form: UseFormReturn<FormValues>;
	programIndex: number;
	index: number;
	onRemove: () => void;
}) {
	const breakdownsArray = useFieldArray({
		control: form.control,
		name: `programs.${programIndex}.years.${index}.breakdowns`
	});

	return (
		<div className='space-y-4 rounded-xl border border-slate-200 bg-white p-4'>
			<div className='flex items-center justify-between'>
				<span className='text-sm font-medium text-slate-700'>Year {index + 1}</span>
				<Button type='button' variant='ghost' size='sm' onClick={onRemove}>
					Remove
				</Button>
			</div>
			<div className='grid gap-4 sm:grid-cols-2'>
				<FormField control={form.control} name={`programs.${programIndex}.years.${index}.year`} render={({ field }) => <FormItem><FormLabel>Year number</FormLabel><FormControl><Input type='number' {...field} onChange={event => field.onChange(Number(event.target.value))} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${programIndex}.years.${index}.title`} render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder='First Year' {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${programIndex}.years.${index}.note`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Note</FormLabel><FormControl><Textarea rows={2} className='resize-none' {...field} /></FormControl></FormItem>} />
			</div>

			<div className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4'>
				<div className='flex items-center justify-between'>
					<h6 className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-600'>Breakdowns</h6>
					<Button type='button' variant='outline' size='sm' onClick={() => breakdownsArray.append(createFeeBreakdown())}>
						Add breakdown
					</Button>
				</div>
				<div className='space-y-4'>
					{breakdownsArray.fields.map((field, breakdownIndex) => (
						<FeeBreakdownFields
							key={field.id}
							form={form}
							programIndex={programIndex}
							yearIndex={index}
							index={breakdownIndex}
							onRemove={() => breakdownsArray.remove(breakdownIndex)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function FeeProgramFields({
	form,
	index,
	onRemove
}: {
	form: UseFormReturn<FormValues>;
	index: number;
	onRemove: () => void;
}) {
	const yearsArray = useFieldArray({
		control: form.control,
		name: `programs.${index}.years`
	});

	return (
		<div className='space-y-5 rounded-2xl border border-slate-200 bg-white p-5'>
			<div className='flex items-center justify-between'>
				<h5 className='text-sm font-semibold text-slate-800'>Program {index + 1}</h5>
				<Button type='button' variant='ghost' size='sm' onClick={onRemove}>
					Remove
				</Button>
			</div>
			<div className='grid gap-4 sm:grid-cols-2'>
				<FormField control={form.control} name={`programs.${index}.id`} render={({ field }) => <FormItem><FormLabel>Program ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
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
				<FormField control={form.control} name={`programs.${index}.name`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${index}.shortName`} render={({ field }) => <FormItem><FormLabel>Short name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${index}.duration`} render={({ field }) => <FormItem><FormLabel>Duration</FormLabel><FormControl><Input placeholder='4 Years' {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${index}.color`} render={({ field }) => <FormItem><FormLabel>Color hint</FormLabel><FormControl><Input placeholder='blue' {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${index}.paymentNote`} render={({ field }) => <FormItem><FormLabel>Payment note</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
				<FormField control={form.control} name={`programs.${index}.description`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
			</div>

			<div className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4'>
				<div className='flex items-center justify-between'>
					<h6 className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-600'>Annual cards</h6>
					<Button type='button' variant='outline' size='sm' onClick={() => yearsArray.append(createFeeYear())}>
						Add year
					</Button>
				</div>
				<div className='space-y-4'>
					{yearsArray.fields.map((field, yearIndex) => (
						<FeeYearFields
							key={field.id}
							form={form}
							programIndex={index}
							index={yearIndex}
							onRemove={() => yearsArray.remove(yearIndex)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default function AdmissionsFeesForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

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
				years: program.years.map((year, yearIndex) => ({
					id: `${program.id}-year-${year.year}-${yearIndex}`,
					year: year.year,
					title: year.title,
					note: year.note ?? '',
					breakdowns: (year.breakdowns ?? []).map((breakdown, breakdownIndex) => ({
						id: breakdown.id ?? `${program.id}-year-${year.year}-breakdown-${breakdownIndex}`,
						title: breakdown.title,
						shortLabel: breakdown.shortLabel ?? '',
						description: breakdown.description ?? '',
						components: breakdown.components.map((component, componentIndex) => ({
							id: `${program.id}-year-${year.year}-breakdown-${breakdownIndex}-component-${componentIndex}`,
							name: component.name,
							amount: component.amount,
							description: component.description ?? ''
						}))
					}))
				}))
			}))
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
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
		startTransition(async () => {
			const tasks = [];
			if (includes(visibleSections, 'meta')) {
				tasks.push(updateAdmissionsFeesMeta(payload.meta));
			}
			if (includes(visibleSections, 'programs')) {
				tasks.push(updateAdmissionsFeePrograms(payload.programs));
			}
			const results = await Promise.all(tasks);
			setMessage(results.every(result => result.ok) ? 'Saved' : 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>Fee Structure</h3>
						<p className='text-sm text-slate-500'>
							Manage fee page copy, support messaging, and complete program breakdowns.
						</p>
					</div>
					<div className='flex items-center gap-2'>
						{message ? (
							<span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						) : null}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving...' : 'Save changes'}
						</Button>
					</div>
				</div>

				{includes(visibleSections, 'meta') ? (
					<>
						<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
							<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Hero and program selector</h4>
							<FormField control={form.control} name='title' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='subtitle' render={({ field }) => <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='description' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
							<div className='grid gap-4 sm:grid-cols-2'>
								<FormField control={form.control} name='academicSession' render={({ field }) => <FormItem><FormLabel>Academic session</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='billingNote' render={({ field }) => <FormItem><FormLabel>Billing note</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='selectorEyebrow' render={({ field }) => <FormItem><FormLabel>Selector eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='selectorTitle' render={({ field }) => <FormItem><FormLabel>Selector title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='selectorDescription' render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Selector description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='overviewEyebrow' render={({ field }) => <FormItem><FormLabel>Overview eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='programTotalLabel' render={({ field }) => <FormItem><FormLabel>Program total label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='annualViewsLabel' render={({ field }) => <FormItem><FormLabel>Annual views label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='breakdownPanelsLabel' render={({ field }) => <FormItem><FormLabel>Breakdown panels label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='paymentNoteTitle' render={({ field }) => <FormItem><FormLabel>Payment note title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							</div>
						</section>

						<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
							<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Annual sections and notes</h4>
							<div className='grid gap-4 sm:grid-cols-2'>
								<FormField control={form.control} name='snapshotEyebrow' render={({ field }) => <FormItem><FormLabel>Snapshot eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='snapshotTitle' render={({ field }) => <FormItem><FormLabel>Snapshot title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='snapshotDescription' render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Snapshot description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='yearSectionsLabel' render={({ field }) => <FormItem><FormLabel>Year sections label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='yearTotalLabel' render={({ field }) => <FormItem><FormLabel>Year total label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='breakdownEyebrow' render={({ field }) => <FormItem><FormLabel>Breakdown eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='breakdownTitle' render={({ field }) => <FormItem><FormLabel>Breakdown title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='breakdownDescription' render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Breakdown description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='annualHeadsEyebrow' render={({ field }) => <FormItem><FormLabel>Annual heads eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='annualHeadsTitle' render={({ field }) => <FormItem><FormLabel>Annual heads title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='annualHeadsDescription' render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Annual heads description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='importantNotesEyebrow' render={({ field }) => <FormItem><FormLabel>Important notes eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='importantNotesTitle' render={({ field }) => <FormItem><FormLabel>Important notes title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='importantNotesText' render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Important notes</FormLabel><FormControl><Textarea rows={5} className='resize-none' placeholder='One note per line' {...field} /></FormControl></FormItem>} />
							</div>
						</section>

						<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
							<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Support</h4>
							<div className='grid gap-4 sm:grid-cols-2'>
								<FormField control={form.control} name='supportEyebrow' render={({ field }) => <FormItem><FormLabel>Support eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportTitle' render={({ field }) => <FormItem><FormLabel>Support title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportMessage' render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Support message</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportEmail' render={({ field }) => <FormItem><FormLabel>Support email</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportPhone' render={({ field }) => <FormItem><FormLabel>Support phone</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportCardTitle' render={({ field }) => <FormItem><FormLabel>Support card title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
								<FormField control={form.control} name='supportCardDescription' render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Support card description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
							</div>
						</section>
					</>
				) : null}

				{includes(visibleSections, 'programs') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Program fee ledgers</h4>
							<Button type='button' variant='outline' size='sm' onClick={() => programsArray.append(createFeeProgram())}>
								Add program
							</Button>
						</div>
						<div className='space-y-5'>
							{programsArray.fields.map((field, index) => (
								<FeeProgramFields
									key={field.id}
									form={form}
									index={index}
									onRemove={() => programsArray.remove(index)}
								/>
							))}
						</div>
					</section>
				) : null}
			</form>
		</Form>
	);
}
