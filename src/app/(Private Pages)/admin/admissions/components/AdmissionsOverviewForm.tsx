'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import {
	type AdmissionsOverviewPageData,
	type AdmissionsOverviewStatsSection,
	updateAdmissionsOverviewDepartments,
	updateAdmissionsOverviewHero,
	updateAdmissionsOverviewLinks,
	updateAdmissionsOverviewNotes,
	updateAdmissionsOverviewStats
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

type Props = {
	initialData: AdmissionsOverviewPageData;
	onChange?: (data: AdmissionsOverviewPageData) => void;
	visibleSections?: Array<'intro' | 'stats' | 'links' | 'departments' | 'notes'>;
};

type FormValues = {
	heroTitle: string;
	heroSubtitle: string;
	heroDescription: string;
	programCountLabel: string;
	statsEyebrow: string;
	statsTitle: string;
	statsDescription: string;
	stats: Array<{ id: string; value: string; label: string; icon: string }>;
	linksEyebrow: string;
	linksTitle: string;
	linksDescription: string;
	links: Array<{ id: string; title: string; description: string; href: string; icon: string }>;
	departmentsEyebrow: string;
	departmentsTitle: string;
	departmentsDescription: string;
	departments: Array<{ id: string; name: string }>;
	notesEyebrow: string;
	notesTitle: string;
	notesDescription: string;
	notes: Array<{ id: string; value: string }>;
};

const createStat = () => ({ id: createClientId('admissions-overview-stat'), value: '', label: '', icon: 'Building2' });
const createLink = () => ({
	id: createClientId('admissions-overview-link'),
	title: '',
	description: '',
	href: '',
	icon: 'FileText'
});
const createDepartment = () => ({ id: createClientId('admissions-overview-department'), name: '' });
const createNote = () => ({ id: createClientId('admissions-overview-note'), value: '' });

const normalizeData = (values: FormValues): AdmissionsOverviewPageData => ({
	hero: {
		title: values.heroTitle.trim(),
		subtitle: values.heroSubtitle.trim(),
		description: values.heroDescription.trim(),
		programCountLabel: values.programCountLabel.trim()
	},
	stats: {
		eyebrow: values.statsEyebrow.trim(),
		title: values.statsTitle.trim(),
		description: values.statsDescription.trim(),
		items: values.stats
			.map(item => ({
				value: item.value.trim(),
				label: item.label.trim(),
				icon: item.icon.trim()
			}))
			.filter(item => item.value && item.label)
	},
	links: {
		eyebrow: values.linksEyebrow.trim(),
		title: values.linksTitle.trim(),
		description: values.linksDescription.trim(),
		items: values.links
			.map(item => ({
				title: item.title.trim(),
				description: item.description.trim(),
				href: item.href.trim(),
				icon: item.icon.trim()
			}))
			.filter(item => item.title && item.description && item.href)
	},
	departments: {
		eyebrow: values.departmentsEyebrow.trim(),
		title: values.departmentsTitle.trim(),
		description: values.departmentsDescription.trim(),
		items: values.departments
			.map(item => ({ name: item.name.trim() }))
			.filter(item => item.name)
	},
	notes: {
		eyebrow: values.notesEyebrow.trim(),
		title: values.notesTitle.trim(),
		description: values.notesDescription.trim(),
		items: values.notes.map(item => item.value.trim()).filter(Boolean)
	}
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

export default function AdmissionsOverviewForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const defaults = useMemo<FormValues>(
		() => ({
			heroTitle: initialData.hero.title,
			heroSubtitle: initialData.hero.subtitle,
			heroDescription: initialData.hero.description,
			programCountLabel: initialData.hero.programCountLabel,
			statsEyebrow: initialData.stats.eyebrow,
			statsTitle: initialData.stats.title,
			statsDescription: initialData.stats.description,
			stats:
				initialData.stats.items.length > 0
					? initialData.stats.items.map((item, index) => ({
					id: `overview-stat-${index}`,
					value: item.value,
					label: item.label,
					icon: item.icon ?? 'Building2'
				}))
					: [createStat()],
			linksEyebrow: initialData.links.eyebrow,
			linksTitle: initialData.links.title,
			linksDescription: initialData.links.description,
			links:
				initialData.links.items.length > 0
					? initialData.links.items.map((item, index) => ({
					id: `overview-link-${index}`,
					title: item.title,
					description: item.description,
					href: item.href,
					icon: item.icon
				}))
					: [createLink()],
			departmentsEyebrow: initialData.departments.eyebrow,
			departmentsTitle: initialData.departments.title,
			departmentsDescription: initialData.departments.description,
			departments:
				initialData.departments.items.length > 0
					? initialData.departments.items.map((item, index) => ({
					id: `overview-department-${index}`,
					name: item.name
				}))
					: [createDepartment()],
			notesEyebrow: initialData.notes.eyebrow,
			notesTitle: initialData.notes.title,
			notesDescription: initialData.notes.description,
			notes:
				initialData.notes.items.length > 0
					? initialData.notes.items.map((item, index) => ({
					id: `overview-note-${index}`,
					value: item
				}))
					: [createNote()]
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const statsArray = useFieldArray({ control: form.control, name: 'stats' });
	const linksArray = useFieldArray({ control: form.control, name: 'links' });
	const departmentsArray = useFieldArray({ control: form.control, name: 'departments' });
	const notesArray = useFieldArray({ control: form.control, name: 'notes' });

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
			if (includes(visibleSections, 'intro')) tasks.push(updateAdmissionsOverviewHero(payload.hero));
			if (includes(visibleSections, 'stats')) tasks.push(updateAdmissionsOverviewStats(payload.stats));
			if (includes(visibleSections, 'links')) tasks.push(updateAdmissionsOverviewLinks(payload.links));
			if (includes(visibleSections, 'departments'))
				tasks.push(updateAdmissionsOverviewDepartments(payload.departments));
			if (includes(visibleSections, 'notes')) tasks.push(updateAdmissionsOverviewNotes(payload.notes));
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
						<h3 className='text-lg font-semibold text-slate-900'>Admissions Overview</h3>
						<p className='text-sm text-slate-500'>
							Edit the overview sections that introduce the admissions journey.
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

				{includes(visibleSections, 'intro') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Intro</h4>
						<FormField
							control={form.control}
							name='heroTitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='heroSubtitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Eyebrow</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='heroDescription'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea rows={4} className='resize-none' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='programCountLabel'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Program count label</FormLabel>
									<FormControl>
										<Input placeholder='Programs available' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</section>
				) : null}

				{includes(visibleSections, 'stats') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Stats</h4>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField control={form.control} name='statsEyebrow' render={({ field }) => <FormItem><FormLabel>Eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='statsTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						</div>
						<FormField control={form.control} name='statsDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>Stat items</p>
							<Button type='button' variant='outline' size='sm' onClick={() => statsArray.append(createStat())}>Add stat</Button>
						</div>
						<div className='space-y-4'>
							{statsArray.fields.map((field, index) => (
								<div key={field.id} className='rounded-xl border border-slate-200 bg-white p-4'>
									<div className='mb-4 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>Stat {index + 1}</span>
										<Button type='button' variant='ghost' size='sm' onClick={() => statsArray.remove(index)}>
											Remove
										</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<FormField control={form.control} name={`stats.${index}.value`} render={({ field }) => <FormItem><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`stats.${index}.label`} render={({ field }) => <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField
											control={form.control}
											name={`stats.${index}.icon`}
											render={({ field }) => (
												<FormItem className='sm:col-span-2'>
													<FormLabel>Icon</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='Select icon' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{ADMISSIONS_ICON_NAMES.map(icon => (
																<SelectItem key={icon} value={icon}>{icon}</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'links') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Quick links</h4>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField control={form.control} name='linksEyebrow' render={({ field }) => <FormItem><FormLabel>Eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='linksTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						</div>
						<FormField control={form.control} name='linksDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>Link cards</p>
							<Button type='button' variant='outline' size='sm' onClick={() => linksArray.append(createLink())}>Add link</Button>
						</div>
						<div className='space-y-4'>
							{linksArray.fields.map((field, index) => (
								<div key={field.id} className='rounded-xl border border-slate-200 bg-white p-4'>
									<div className='mb-4 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>Link {index + 1}</span>
										<Button type='button' variant='ghost' size='sm' onClick={() => linksArray.remove(index)}>
											Remove
										</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<FormField control={form.control} name={`links.${index}.title`} render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`links.${index}.href`} render={({ field }) => <FormItem><FormLabel>Href</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`links.${index}.description`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
										<FormField
											control={form.control}
											name={`links.${index}.icon`}
											render={({ field }) => (
												<FormItem className='sm:col-span-2'>
													<FormLabel>Icon</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='Select icon' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{ADMISSIONS_ICON_NAMES.map(icon => (
																<SelectItem key={icon} value={icon}>{icon}</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'departments') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Departments</h4>
						<FormField control={form.control} name='departmentsEyebrow' render={({ field }) => <FormItem><FormLabel>Eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='departmentsTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='departmentsDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>Department items</p>
							<Button type='button' variant='outline' size='sm' onClick={() => departmentsArray.append(createDepartment())}>Add department</Button>
						</div>
						<div className='space-y-3'>
							{departmentsArray.fields.map((field, index) => (
								<div key={field.id} className='flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4'>
									<FormField control={form.control} name={`departments.${index}.name`} render={({ field }) => <FormItem className='flex-1'><FormLabel>Department name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
									<Button type='button' variant='ghost' size='sm' onClick={() => departmentsArray.remove(index)}>Remove</Button>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'notes') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Notes</h4>
						<FormField control={form.control} name='notesEyebrow' render={({ field }) => <FormItem><FormLabel>Eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='notesTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='notesDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>Note items</p>
							<Button type='button' variant='outline' size='sm' onClick={() => notesArray.append(createNote())}>Add note</Button>
						</div>
						<div className='space-y-3'>
							{notesArray.fields.map((field, index) => (
								<div key={field.id} className='flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4'>
									<FormField control={form.control} name={`notes.${index}.value`} render={({ field }) => <FormItem className='flex-1'><FormLabel>Note</FormLabel><FormControl><Textarea rows={2} className='resize-none' {...field} /></FormControl></FormItem>} />
									<Button type='button' variant='ghost' size='sm' onClick={() => notesArray.remove(index)}>Remove</Button>
								</div>
							))}
						</div>
					</section>
				) : null}
			</form>
		</Form>
	);
}
