'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateHeaderAnnouncements } from '@/app/(Private Pages)/actions/announcements';
import { Plus, Save, Trash2 } from 'lucide-react';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from '@/components/ui/form';

const itemSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	href: z.string().min(1, 'Link is required')
});

const formSchema = z.object({
	items: z.array(itemSchema).min(1, 'Add at least one announcement')
});

type FormValues = z.infer<typeof formSchema>;

type AnnouncementItem = { title: string; href: string };

export default function HeaderAnnouncementsForm({
	initialItems,
	pageSlug,
	onChange
}: {
	initialItems: AnnouncementItem[];
	pageSlug: string;
	onChange?: (items: AnnouncementItem[]) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: initialItems.length > 0 ? initialItems : [{ title: '', href: '' }]
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	});

	useEffect(() => {
		const normalize = (items: unknown): AnnouncementItem[] =>
			(Array.isArray(items) ? items : []).map(item => ({
				title: typeof item?.title === 'string' ? item.title : '',
				href: typeof item?.href === 'string' ? item.href : ''
			}));

		onChange?.(normalize(form.getValues('items')));
		const subscription = form.watch(value => {
			onChange?.(normalize(value.items));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	function onSubmit(values: FormValues): void {
		setMessage(null);
		startTransition(async () => {
			const res = await updateHeaderAnnouncements(pageSlug, values.items);
			if (!res.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved');
		});
	}

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'
				onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Header Announcements
						</h3>
						<p className='text-sm text-slate-500'>
							Update the marquee that appears above the navigation.
						</p>
					</div>
					{message && (
						<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
							{message}
						</span>
					)}
				</div>

				<div className='grid gap-4 pr-1'>
					{fields.map((field, idx) => (
						<div
							key={field.id}
							className='rounded-lg border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md'>
							<div className='grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-start'>
								<FormField
									control={form.control}
									name={`items.${idx}.title`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-slate-700'>Headline</FormLabel>
											<FormControl>
												<Input
													placeholder='Admission window closes this week - apply now'
													className='border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/40'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-rose-500' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`items.${idx}.href`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-slate-700'>
												Destination URL
											</FormLabel>
											<FormControl>
												<Input
													placeholder='https://example.com/admissions/apply'
													className='border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/40'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-rose-500' />
										</FormItem>
									)}
								/>

								<Button
									type='button'
									variant='ghost'
									className='md:mt-1 h-9 w-9 justify-self-end rounded-full border border-slate-200 bg-white text-slate-500 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600'
									onClick={() => remove(idx)}
									disabled={fields.length === 1}>
									<Trash2 className='mx-auto h-4 w-4' />
								</Button>
							</div>
						</div>
					))}
				</div>

				<div className='flex flex-col gap-3'>
					<div className='flex gap-2'>
						<Button
							type='button'
							variant='outline'
							onClick={() => append({ title: '', href: '' })}
							className='border-slate-200 bg-white text-slate-700 hover:bg-slate-50'>
							<Plus className='mr-2 h-4 w-4' /> Add announcement
						</Button>
						<Button
							type='submit'
							disabled={isPending}
							className='bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-lg hover:from-sky-400 hover:via-blue-400 hover:to-indigo-400'>
							{isPending ? (
								<span className='flex items-center gap-2'>Saving...</span>
							) : (
								<span className='flex items-center gap-2'>
									<Save className='h-4 w-4' /> Save changes
								</span>
							)}
						</Button>
					</div>
					<p className='text-xs text-slate-500'>
						Links should start with http(s):// and point to live site routes.
						Links starting with / will be prefixed with the base URL.
					</p>
				</div>
			</form>
		</Form>
	);
}








