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
	type AdmissionsScholarshipCategory,
	type AdmissionsScholarshipIntro,
	type AdmissionsScholarshipNotesSection,
	type AdmissionsScholarshipSupport,
	updateAdmissionsScholarshipCategories,
	updateAdmissionsScholarshipIntro,
	updateAdmissionsScholarshipNotes,
	updateAdmissionsScholarshipSupport
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

type ScholarshipPageData = {
	intro: AdmissionsScholarshipIntro;
	categories: AdmissionsScholarshipCategory[];
	notes: AdmissionsScholarshipNotesSection;
	support: AdmissionsScholarshipSupport;
};

type Props = {
	initialData: ScholarshipPageData;
	onChange?: (data: ScholarshipPageData) => void;
	visibleSections?: Array<'intro' | 'categories' | 'notes' | 'support'>;
};

type FormValues = {
	introBadge: string;
	introTitle: string;
	introSubtitle: string;
	beforeApplyTitle: string;
	beforeApplyDescription: string;
	categories: Array<{
		id: string;
		title: string;
		icon: string;
		badge: string;
		accent: string;
		scholarshipsText: string;
		portal: string;
		portalUrl: string;
	}>;
	notesTitle: string;
	notesDescription: string;
	notesItems: Array<{ id: string; value: string }>;
	supportTitle: string;
	supportDescription: string;
	supportEmail: string;
	supportPhone: string;
};

const createCategory = () => ({
	id: createClientId('admissions-scholarship-category'),
	title: '',
	icon: 'Award',
	badge: '',
	accent: 'text-blue-700 bg-blue-100',
	scholarshipsText: '',
	portal: '',
	portalUrl: ''
});

const createNote = () => ({ id: createClientId('admissions-scholarship-note'), value: '' });

const splitLines = (value: string) =>
	value
		.split('\n')
		.map(item => item.trim())
		.filter(Boolean);

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

const normalizeData = (values: FormValues): ScholarshipPageData => ({
	intro: {
		badge: values.introBadge.trim(),
		title: values.introTitle.trim(),
		subtitle: values.introSubtitle.trim(),
		beforeApplyTitle: values.beforeApplyTitle.trim(),
		beforeApplyDescription: values.beforeApplyDescription.trim()
	},
	categories: values.categories
		.map(category => ({
			title: category.title.trim(),
			icon: category.icon.trim(),
			badge: category.badge.trim(),
			accent: category.accent.trim(),
			scholarships: splitLines(category.scholarshipsText),
			portal: category.portal.trim(),
			portalUrl: category.portalUrl.trim()
		}))
		.filter(category => category.title && category.badge),
	notes: {
		eyebrow: '',
		title: values.notesTitle.trim(),
		description: values.notesDescription.trim(),
		items: values.notesItems.map(item => item.value.trim()).filter(Boolean)
	},
	support: {
		title: values.supportTitle.trim(),
		description: values.supportDescription.trim(),
		email: values.supportEmail.trim(),
		phone: values.supportPhone.trim()
	}
});

export default function AdmissionsScholarshipForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const defaults = useMemo<FormValues>(
		() => ({
			introBadge: initialData.intro.badge,
			introTitle: initialData.intro.title,
			introSubtitle: initialData.intro.subtitle,
			beforeApplyTitle: initialData.intro.beforeApplyTitle,
			beforeApplyDescription: initialData.intro.beforeApplyDescription,
			categories:
				initialData.categories.length > 0
					? initialData.categories.map((category, index) => ({
					id: `scholarship-category-${index}`,
					title: category.title,
					icon: category.icon,
					badge: category.badge,
					accent: category.accent,
					scholarshipsText: category.scholarships.join('\n'),
					portal: category.portal ?? '',
					portalUrl: category.portalUrl ?? ''
				}))
					: [createCategory()],
			notesTitle: initialData.notes.title,
			notesDescription: initialData.notes.description,
			notesItems:
				initialData.notes.items.length > 0
					? initialData.notes.items.map((item, index) => ({
					id: `scholarship-note-${index}`,
					value: item
				}))
					: [createNote()],
			supportTitle: initialData.support.title,
			supportDescription: initialData.support.description,
			supportEmail: initialData.support.email,
			supportPhone: initialData.support.phone
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const categoriesArray = useFieldArray({
		control: form.control,
		name: 'categories'
	});
	const notesArray = useFieldArray({ control: form.control, name: 'notesItems' });

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
			if (includes(visibleSections, 'intro')) {
				tasks.push(updateAdmissionsScholarshipIntro(payload.intro));
			}
			if (includes(visibleSections, 'categories')) {
				tasks.push(updateAdmissionsScholarshipCategories(payload.categories));
			}
			if (includes(visibleSections, 'notes')) {
				tasks.push(updateAdmissionsScholarshipNotes(payload.notes));
			}
			if (includes(visibleSections, 'support')) {
				tasks.push(updateAdmissionsScholarshipSupport(payload.support));
			}
			const results = await Promise.all(tasks);
			setMessage(results.every(result => result.ok) ? 'Saved' : 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>Scholarships</h3>
						<p className='text-sm text-slate-500'>
							Manage scholarship copy, portal cards, notes, and support details.
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
						<FormField control={form.control} name='introBadge' render={({ field }) => <FormItem><FormLabel>Badge</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
						<FormField control={form.control} name='introTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
						<FormField control={form.control} name='introSubtitle' render={({ field }) => <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl><FormMessage /></FormItem>} />
						<FormField control={form.control} name='beforeApplyTitle' render={({ field }) => <FormItem><FormLabel>Before apply title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
						<FormField control={form.control} name='beforeApplyDescription' render={({ field }) => <FormItem><FormLabel>Before apply description</FormLabel><FormControl><Textarea rows={4} className='resize-none' {...field} /></FormControl><FormMessage /></FormItem>} />
					</section>
				) : null}

				{includes(visibleSections, 'categories') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>
								Portal categories
							</h4>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => categoriesArray.append(createCategory())}>
								Add category
							</Button>
						</div>
						<div className='space-y-4'>
							{categoriesArray.fields.map((field, index) => (
								<div key={field.id} className='space-y-4 rounded-xl border border-slate-200 bg-white p-4'>
									<div className='flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>Category {index + 1}</span>
										<Button type='button' variant='ghost' size='sm' onClick={() => categoriesArray.remove(index)}>
											Remove
										</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<FormField control={form.control} name={`categories.${index}.title`} render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`categories.${index}.badge`} render={({ field }) => <FormItem><FormLabel>Badge</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField
											control={form.control}
											name={`categories.${index}.icon`}
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
										<FormField control={form.control} name={`categories.${index}.accent`} render={({ field }) => <FormItem><FormLabel>Accent classes</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`categories.${index}.portal`} render={({ field }) => <FormItem><FormLabel>Portal label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`categories.${index}.portalUrl`} render={({ field }) => <FormItem><FormLabel>Portal URL</FormLabel><FormControl><Input placeholder='https://...' {...field} /></FormControl></FormItem>} />
									</div>
									<FormField
										control={form.control}
										name={`categories.${index}.scholarshipsText`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Scholarships</FormLabel>
												<FormControl>
													<Textarea
														rows={5}
														className='resize-none'
														placeholder='One scholarship per line'
														{...field}
													/>
												</FormControl>
												<p className='text-xs text-slate-500'>Use one line per scholarship.</p>
											</FormItem>
										)}
									/>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'notes') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Notes</h4>
						<FormField control={form.control} name='notesTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='notesDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium text-slate-700'>Note items</p>
							<Button type='button' variant='outline' size='sm' onClick={() => notesArray.append(createNote())}>
								Add note
							</Button>
						</div>
						<div className='space-y-3'>
							{notesArray.fields.map((field, index) => (
								<div key={field.id} className='flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4'>
									<FormField control={form.control} name={`notesItems.${index}.value`} render={({ field }) => <FormItem className='flex-1'><FormLabel>Note</FormLabel><FormControl><Textarea rows={2} className='resize-none' {...field} /></FormControl></FormItem>} />
									<Button type='button' variant='ghost' size='sm' onClick={() => notesArray.remove(index)}>
										Remove
									</Button>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'support') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Support</h4>
						<FormField control={form.control} name='supportTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='supportDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField control={form.control} name='supportEmail' render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='supportPhone' render={({ field }) => <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						</div>
					</section>
				) : null}
			</form>
		</Form>
	);
}
