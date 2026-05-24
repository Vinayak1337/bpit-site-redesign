'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form';
import { updateHeaderAnnouncements } from '@/app/(Private Pages)/actions/announcements';
import {
	AddRowButton,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

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
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

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

	useEffect(() => {
		if (status.kind !== 'success') return;
		const id = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(id);
	}, [status]);

	function onSubmit(values: FormValues): void {
		startTransition(async () => {
			setStatus({ kind: 'saving' });
			const res = await updateHeaderAnnouncements(pageSlug, values.items);
			if (!res.ok) {
				setStatus({ kind: 'error', message: 'Save failed.' });
				return;
			}
			setStatus({ kind: 'success' });
		});
	}

	return (
		<Form {...form}>
			<AdminForm onSubmit={form.handleSubmit(onSubmit)}>
				<AdminFormSection
					title='Header announcements'
					description='Update the marquee that appears above the navigation.'>
					<AdminItemList>
						{fields.map((field, idx) => (
							<AdminItemCard
								key={field.id}
								index={idx}
								total={fields.length}
								onRemove={
									fields.length > 1 ? () => remove(idx) : undefined
								}>
								<AdminFieldGrid cols={2}>
									<FormField
										control={form.control}
										name={`items.${idx}.title`}
										render={({ field, fieldState }) => (
											<FormItem className='space-y-1.5'>
												<AdminField
													label='Headline'
													error={fieldState.error?.message}>
													<FormControl>
														<Input
															placeholder='Admission window closes this week'
															{...field}
														/>
													</FormControl>
												</AdminField>
												<FormMessage className='hidden' />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${idx}.href`}
										render={({ field, fieldState }) => (
											<FormItem className='space-y-1.5'>
												<AdminField
													label='Destination URL'
													error={fieldState.error?.message}>
													<FormControl>
														<Input
															placeholder='https://example.com/admissions/apply'
															{...field}
														/>
													</FormControl>
												</AdminField>
												<FormMessage className='hidden' />
											</FormItem>
										)}
									/>
								</AdminFieldGrid>
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton onClick={() => append({ title: '', href: '' })}>
						Add announcement
					</AddRowButton>
					<p className='text-xs text-slate-500'>
						Links should start with http(s):// or with / for site-relative routes.
					</p>
				</AdminFormSection>

				<AdminFormFooter status={status} saving={isPending} />
			</AdminForm>
		</Form>
	);
}
