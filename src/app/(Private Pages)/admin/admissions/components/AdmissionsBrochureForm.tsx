'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
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
	type AdmissionsBrochureConfig,
	type AdmissionsBrochureItem,
	updateAdmissionsBrochureConfig,
	updateAdmissionsBrochureItems
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

type BrochurePageData = {
	config: AdmissionsBrochureConfig;
	items: AdmissionsBrochureItem[];
};

type Props = {
	initialData: BrochurePageData;
	onChange?: (data: BrochurePageData) => void;
	visibleSections?: Array<'config' | 'items'>;
};

type FormValues = {
	heroBadge: string;
	heroTitle: string;
	heroSubtitle: string;
	autoDetectEnabled: 'true' | 'false';
	emptyStateTitle: string;
	emptyStateDescription: string;
	items: Array<{
		id: string;
		title: string;
		description: string;
		icon: string;
		url: string;
		lastUpdated: string;
	}>;
};

const createItem = () => ({
	id: createClientId('admissions-brochure-item'),
	title: '',
	description: '',
	icon: 'FileText',
	url: '',
	lastUpdated: ''
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

const normalizeData = (values: FormValues): BrochurePageData => ({
	config: {
		heroBadge: values.heroBadge.trim(),
		heroTitle: values.heroTitle.trim(),
		heroSubtitle: values.heroSubtitle.trim(),
		autoDetectEnabled: values.autoDetectEnabled === 'true',
		emptyStateTitle: values.emptyStateTitle.trim(),
		emptyStateDescription: values.emptyStateDescription.trim()
	},
	items: values.items
		.map(item => ({
			id: item.id.trim(),
			title: item.title.trim(),
			description: item.description.trim(),
			icon: item.icon.trim(),
			url: item.url.trim(),
			lastUpdated: item.lastUpdated.trim()
		}))
		.filter(item => item.id && item.title && item.description && item.url)
});

export default function AdmissionsBrochureForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const defaults = useMemo<FormValues>(
		() => ({
			heroBadge: initialData.config.heroBadge,
			heroTitle: initialData.config.heroTitle,
			heroSubtitle: initialData.config.heroSubtitle,
			autoDetectEnabled: initialData.config.autoDetectEnabled ? 'true' : 'false',
			emptyStateTitle: initialData.config.emptyStateTitle,
			emptyStateDescription: initialData.config.emptyStateDescription,
			items:
				initialData.items.length > 0
					? initialData.items.map((item, index) => ({
					id: item.id,
					title: item.title,
					description: item.description,
					icon: item.icon,
					url: item.url,
					lastUpdated: item.lastUpdated ?? ''
				}))
					: [createItem()]
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const itemsArray = useFieldArray({ control: form.control, name: 'items' });

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
			if (includes(visibleSections, 'config')) {
				tasks.push(updateAdmissionsBrochureConfig(payload.config));
			}
			if (includes(visibleSections, 'items')) {
				tasks.push(updateAdmissionsBrochureItems(payload.items));
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
						<h3 className='text-lg font-semibold text-slate-900'>Brochure Page</h3>
						<p className='text-sm text-slate-500'>
							Manage brochure messaging, auto-detect behavior, and brochure links.
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

				{includes(visibleSections, 'config') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Page config</h4>
						<FormField control={form.control} name='heroBadge' render={({ field }) => <FormItem><FormLabel>Hero badge</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='heroTitle' render={({ field }) => <FormItem><FormLabel>Hero title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='heroSubtitle' render={({ field }) => <FormItem><FormLabel>Hero subtitle</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<FormField
							control={form.control}
							name='autoDetectEnabled'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Auto-detect brochure links</FormLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select mode' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='true'>Enabled</SelectItem>
											<SelectItem value='false'>Disabled</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField control={form.control} name='emptyStateTitle' render={({ field }) => <FormItem><FormLabel>Empty state title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='emptyStateDescription' render={({ field }) => <FormItem><FormLabel>Empty state description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
					</section>
				) : null}

				{includes(visibleSections, 'items') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Brochure items</h4>
							<Button type='button' variant='outline' size='sm' onClick={() => itemsArray.append(createItem())}>
								Add item
							</Button>
						</div>
						<div className='space-y-4'>
							{itemsArray.fields.map((field, index) => (
								<div key={field.id} className='space-y-4 rounded-xl border border-slate-200 bg-white p-4'>
									<div className='flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>Brochure {index + 1}</span>
										<Button type='button' variant='ghost' size='sm' onClick={() => itemsArray.remove(index)}>
											Remove
										</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<FormField control={form.control} name={`items.${index}.id`} render={({ field }) => <FormItem><FormLabel>Item ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField
											control={form.control}
											name={`items.${index}.icon`}
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
										<FormField control={form.control} name={`items.${index}.title`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`items.${index}.description`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`items.${index}.url`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Brochure URL</FormLabel><FormControl><Input placeholder='https://...' {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`items.${index}.lastUpdated`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Last updated text</FormLabel><FormControl><Input placeholder='Updated January 2026' {...field} /></FormControl></FormItem>} />
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
