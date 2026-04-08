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
	type AdmissionsWhyBpitPageData,
	updateWhyBpitAccreditations,
	updateWhyBpitFinalCta,
	updateWhyBpitHero,
	updateWhyBpitHighlights,
	updateWhyBpitStats
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
	initialData: AdmissionsWhyBpitPageData;
	onChange?: (data: AdmissionsWhyBpitPageData) => void;
	visibleSections?: Array<'hero' | 'stats' | 'highlights' | 'accreditations' | 'finalCta'>;
};

type FormValues = {
	heroBadgeText: string;
	heroTitle: string;
	heroDescription: string;
	quickPointsTitle: string;
	quickPoints: Array<{ id: string; value: string }>;
	primaryCtaLabel: string;
	primaryCtaHref: string;
	secondaryCtaLabel: string;
	secondaryCtaHref: string;
	statsEyebrow: string;
	statsTitle: string;
	statsDescription: string;
	stats: Array<{ id: string; value: string; label: string; icon: string }>;
	highlightsEyebrow: string;
	highlightsTitle: string;
	highlightsDescription: string;
	highlights: Array<{ id: string; icon: string; title: string; description: string }>;
	accreditationsEyebrow: string;
	accreditationsTitle: string;
	accreditationsDescription: string;
	accreditations: Array<{ id: string; icon: string; title: string; subtitle: string }>;
	finalCtaTitle: string;
	finalCtaSubtitle: string;
	finalCtas: Array<{ id: string; label: string; href: string; icon: 'target' | 'map' | 'phone' }>;
};

const createStringRow = () => ({ id: createClientId('admissions-why-string'), value: '' });
const createStat = () => ({ id: createClientId('admissions-why-stat'), value: '', label: '', icon: 'Building2' });
const createHighlight = () => ({
	id: createClientId('admissions-why-highlight'),
	icon: 'BookOpen',
	title: '',
	description: ''
});
const createAccreditation = () => ({
	id: createClientId('admissions-why-accreditation'),
	icon: 'Award',
	title: '',
	subtitle: ''
});
const createCta = () => ({
	id: createClientId('admissions-why-cta'),
	label: '',
	href: '',
	icon: 'target' as const
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

const normalizeData = (values: FormValues): AdmissionsWhyBpitPageData => ({
	hero: {
		badgeText: values.heroBadgeText.trim(),
		title: values.heroTitle.trim(),
		description: values.heroDescription.trim(),
		quickPointsTitle: values.quickPointsTitle.trim(),
		quickPoints: values.quickPoints.map(item => item.value.trim()).filter(Boolean),
		primaryCta: {
			label: values.primaryCtaLabel.trim(),
			href: values.primaryCtaHref.trim()
		},
		secondaryCta: {
			label: values.secondaryCtaLabel.trim(),
			href: values.secondaryCtaHref.trim()
		}
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
	highlights: {
		eyebrow: values.highlightsEyebrow.trim(),
		title: values.highlightsTitle.trim(),
		description: values.highlightsDescription.trim(),
		items: values.highlights
			.map(item => ({
				icon: item.icon.trim(),
				title: item.title.trim(),
				description: item.description.trim()
			}))
			.filter(item => item.title && item.description)
	},
	accreditations: {
		eyebrow: values.accreditationsEyebrow.trim(),
		title: values.accreditationsTitle.trim(),
		description: values.accreditationsDescription.trim(),
		items: values.accreditations
			.map(item => ({
				icon: item.icon.trim(),
				title: item.title.trim(),
				subtitle: item.subtitle.trim()
			}))
			.filter(item => item.title && item.subtitle)
	},
	finalCta: {
		title: values.finalCtaTitle.trim(),
		subtitle: values.finalCtaSubtitle.trim(),
		ctas: values.finalCtas
			.map(item => ({
				label: item.label.trim(),
				href: item.href.trim(),
				icon: item.icon
			}))
			.filter(item => item.label && item.href)
	}
});

export default function AdmissionsWhyBpitForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const defaults = useMemo<FormValues>(
		() => ({
			heroBadgeText: initialData.hero.badgeText,
			heroTitle: initialData.hero.title,
			heroDescription: initialData.hero.description,
			quickPointsTitle: initialData.hero.quickPointsTitle,
			quickPoints:
				initialData.hero.quickPoints.length > 0
					? initialData.hero.quickPoints.map((item, index) => ({
				id: `why-quick-point-${index}`,
				value: item
			}))
					: [createStringRow()],
			primaryCtaLabel: initialData.hero.primaryCta.label,
			primaryCtaHref: initialData.hero.primaryCta.href,
			secondaryCtaLabel: initialData.hero.secondaryCta.label,
			secondaryCtaHref: initialData.hero.secondaryCta.href,
			statsEyebrow: initialData.stats.eyebrow,
			statsTitle: initialData.stats.title,
			statsDescription: initialData.stats.description,
			stats:
				initialData.stats.items.length > 0
					? initialData.stats.items.map((item, index) => ({
				id: `why-stat-${index}`,
				value: item.value,
				label: item.label,
				icon: item.icon ?? 'Building2'
			}))
					: [createStat()],
			highlightsEyebrow: initialData.highlights.eyebrow,
			highlightsTitle: initialData.highlights.title,
			highlightsDescription: initialData.highlights.description,
			highlights:
				initialData.highlights.items.length > 0
					? initialData.highlights.items.map((item, index) => ({
				id: `why-highlight-${index}`,
				icon: item.icon,
				title: item.title,
				description: item.description
			}))
					: [createHighlight()],
			accreditationsEyebrow: initialData.accreditations.eyebrow,
			accreditationsTitle: initialData.accreditations.title,
			accreditationsDescription: initialData.accreditations.description,
			accreditations:
				initialData.accreditations.items.length > 0
					? initialData.accreditations.items.map((item, index) => ({
				id: `why-accreditation-${index}`,
				icon: item.icon,
				title: item.title,
				subtitle: item.subtitle
			}))
					: [createAccreditation()],
			finalCtaTitle: initialData.finalCta.title,
			finalCtaSubtitle: initialData.finalCta.subtitle,
			finalCtas:
				initialData.finalCta.ctas.length > 0
					? initialData.finalCta.ctas.map((item, index) => ({
				id: `why-final-cta-${index}`,
				label: item.label,
				href: item.href,
				icon: item.icon ?? 'target'
			}))
					: [createCta()]
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const quickPointsArray = useFieldArray({ control: form.control, name: 'quickPoints' });
	const statsArray = useFieldArray({ control: form.control, name: 'stats' });
	const highlightsArray = useFieldArray({ control: form.control, name: 'highlights' });
	const accreditationsArray = useFieldArray({ control: form.control, name: 'accreditations' });
	const finalCtasArray = useFieldArray({ control: form.control, name: 'finalCtas' });

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
			if (includes(visibleSections, 'hero')) tasks.push(updateWhyBpitHero(payload.hero));
			if (includes(visibleSections, 'stats')) tasks.push(updateWhyBpitStats(payload.stats));
			if (includes(visibleSections, 'highlights'))
				tasks.push(updateWhyBpitHighlights(payload.highlights));
			if (includes(visibleSections, 'accreditations'))
				tasks.push(updateWhyBpitAccreditations(payload.accreditations));
			if (includes(visibleSections, 'finalCta'))
				tasks.push(updateWhyBpitFinalCta(payload.finalCta));
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
						<h3 className='text-lg font-semibold text-slate-900'>Why BPIT</h3>
						<p className='text-sm text-slate-500'>
							Edit the message, proof points, and CTA flow for this page.
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

				{includes(visibleSections, 'hero') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Hero</h4>
						<FormField control={form.control} name='heroBadgeText' render={({ field }) => <FormItem><FormLabel>Badge</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='heroTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='heroDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={4} className='resize-none' {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='quickPointsTitle' render={({ field }) => <FormItem><FormLabel>Quick points title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>Quick points</p>
							<Button type='button' variant='outline' size='sm' onClick={() => quickPointsArray.append(createStringRow())}>Add point</Button>
						</div>
						<div className='space-y-3'>
							{quickPointsArray.fields.map((field, index) => (
								<div key={field.id} className='flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4'>
									<FormField control={form.control} name={`quickPoints.${index}.value`} render={({ field }) => <FormItem className='flex-1'><FormLabel>Point</FormLabel><FormControl><Textarea rows={2} className='resize-none' {...field} /></FormControl></FormItem>} />
									<Button type='button' variant='ghost' size='sm' onClick={() => quickPointsArray.remove(index)}>Remove</Button>
								</div>
							))}
						</div>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField control={form.control} name='primaryCtaLabel' render={({ field }) => <FormItem><FormLabel>Primary CTA label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='primaryCtaHref' render={({ field }) => <FormItem><FormLabel>Primary CTA href</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='secondaryCtaLabel' render={({ field }) => <FormItem><FormLabel>Secondary CTA label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='secondaryCtaHref' render={({ field }) => <FormItem><FormLabel>Secondary CTA href</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						</div>
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
										<Button type='button' variant='ghost' size='sm' onClick={() => statsArray.remove(index)}>Remove</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<FormField control={form.control} name={`stats.${index}.value`} render={({ field }) => <FormItem><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`stats.${index}.label`} render={({ field }) => <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`stats.${index}.icon`} render={({ field }) => (
											<FormItem className='sm:col-span-2'>
												<FormLabel>Icon</FormLabel>
												<Select onValueChange={field.onChange} value={field.value}>
													<FormControl><SelectTrigger><SelectValue placeholder='Select icon' /></SelectTrigger></FormControl>
													<SelectContent>
														{ADMISSIONS_ICON_NAMES.map(icon => <SelectItem key={icon} value={icon}>{icon}</SelectItem>)}
													</SelectContent>
												</Select>
											</FormItem>
										)} />
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'highlights') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Highlights</h4>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField control={form.control} name='highlightsEyebrow' render={({ field }) => <FormItem><FormLabel>Eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='highlightsTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						</div>
						<FormField control={form.control} name='highlightsDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>Highlight cards</p>
							<Button type='button' variant='outline' size='sm' onClick={() => highlightsArray.append(createHighlight())}>Add highlight</Button>
						</div>
						<div className='space-y-4'>
							{highlightsArray.fields.map((field, index) => (
								<div key={field.id} className='rounded-xl border border-slate-200 bg-white p-4'>
									<div className='mb-4 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>Highlight {index + 1}</span>
										<Button type='button' variant='ghost' size='sm' onClick={() => highlightsArray.remove(index)}>Remove</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<FormField control={form.control} name={`highlights.${index}.title`} render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`highlights.${index}.icon`} render={({ field }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
												<Select onValueChange={field.onChange} value={field.value}>
													<FormControl><SelectTrigger><SelectValue placeholder='Select icon' /></SelectTrigger></FormControl>
													<SelectContent>{ADMISSIONS_ICON_NAMES.map(icon => <SelectItem key={icon} value={icon}>{icon}</SelectItem>)}</SelectContent>
												</Select>
											</FormItem>
										)} />
										<FormField control={form.control} name={`highlights.${index}.description`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'accreditations') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Accreditations</h4>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField control={form.control} name='accreditationsEyebrow' render={({ field }) => <FormItem><FormLabel>Eyebrow</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='accreditationsTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						</div>
						<FormField control={form.control} name='accreditationsDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>Accreditation cards</p>
							<Button type='button' variant='outline' size='sm' onClick={() => accreditationsArray.append(createAccreditation())}>Add card</Button>
						</div>
						<div className='space-y-4'>
							{accreditationsArray.fields.map((field, index) => (
								<div key={field.id} className='rounded-xl border border-slate-200 bg-white p-4'>
									<div className='mb-4 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>Card {index + 1}</span>
										<Button type='button' variant='ghost' size='sm' onClick={() => accreditationsArray.remove(index)}>Remove</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<FormField control={form.control} name={`accreditations.${index}.title`} render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`accreditations.${index}.icon`} render={({ field }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
												<Select onValueChange={field.onChange} value={field.value}>
													<FormControl><SelectTrigger><SelectValue placeholder='Select icon' /></SelectTrigger></FormControl>
													<SelectContent>{ADMISSIONS_ICON_NAMES.map(icon => <SelectItem key={icon} value={icon}>{icon}</SelectItem>)}</SelectContent>
												</Select>
											</FormItem>
										)} />
										<FormField control={form.control} name={`accreditations.${index}.subtitle`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Subtitle</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'finalCta') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Final CTA</h4>
						<FormField control={form.control} name='finalCtaTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='finalCtaSubtitle' render={({ field }) => <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>CTA buttons</p>
							<Button type='button' variant='outline' size='sm' onClick={() => finalCtasArray.append(createCta())}>Add CTA</Button>
						</div>
						<div className='space-y-4'>
							{finalCtasArray.fields.map((field, index) => (
								<div key={field.id} className='rounded-xl border border-slate-200 bg-white p-4'>
									<div className='mb-4 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>CTA {index + 1}</span>
										<Button type='button' variant='ghost' size='sm' onClick={() => finalCtasArray.remove(index)}>Remove</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<FormField control={form.control} name={`finalCtas.${index}.label`} render={({ field }) => <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`finalCtas.${index}.href`} render={({ field }) => <FormItem><FormLabel>Href</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`finalCtas.${index}.icon`} render={({ field }) => (
											<FormItem className='sm:col-span-2'>
												<FormLabel>Icon</FormLabel>
												<Select onValueChange={field.onChange} value={field.value}>
													<FormControl><SelectTrigger><SelectValue placeholder='Select icon' /></SelectTrigger></FormControl>
													<SelectContent>
														<SelectItem value='target'>target</SelectItem>
														<SelectItem value='map'>map</SelectItem>
														<SelectItem value='phone'>phone</SelectItem>
													</SelectContent>
												</Select>
											</FormItem>
										)} />
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}
			</form>
		</Form>
	);
}
