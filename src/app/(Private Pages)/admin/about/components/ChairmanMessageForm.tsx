'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { updateChairmanMessage } from '@/app/(Private Pages)/actions/about';
import type { ChairmanMessageData } from '@/app/(Private Pages)/actions/about';

type ParagraphFormValue = { id: string; value: string };

type FormValues = {
	headerTitle: string;
	headerSubtitle: string;
	quote: string;
	paragraphs: ParagraphFormValue[];
	more: ParagraphFormValue[];
};

type Props = {
	initialData: ChairmanMessageData;
	pageSlug: string;
	onChange?: (data: ChairmanMessageData) => void;
};

const createParagraph = (value = ''): ParagraphFormValue => ({
	id: crypto.randomUUID(),
	value
});

const normalizeChairmanMessage = (values: Partial<FormValues>): ChairmanMessageData => {
	const paragraphs = (values.paragraphs ?? [])
		.map(paragraph => (paragraph.value ?? '').trim())
		.filter(Boolean);
	
	const more = (values.more ?? [])
		.map(paragraph => (paragraph.value ?? '').trim())
		.filter(Boolean);

	return {
		header: {
			title: (values.headerTitle ?? '').trim() || "Chairman's Message",
			subtitle: (values.headerSubtitle ?? '').trim() || 'A Vision for Excellence'
		},
		quote: (values.quote ?? '').trim() || undefined,
		paragraphs,
		more
	};
};

export default function ChairmanMessageForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			headerTitle: initialData.header.title,
			headerSubtitle: initialData.header.subtitle,
			quote: initialData.quote || '',
			paragraphs:
				initialData.paragraphs.length > 0
					? initialData.paragraphs.map(value => createParagraph(value))
					: [createParagraph()],
			more:
				initialData.more.length > 0
					? initialData.more.map(value => createParagraph(value))
					: [createParagraph()]
		}
	});

	const paragraphsArray = useFieldArray({
		control: form.control,
		name: 'paragraphs'
	});

	const moreArray = useFieldArray({
		control: form.control,
		name: 'more'
	});

	useEffect(() => {
		onChange?.(normalizeChairmanMessage(form.getValues()));
		const subscription = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				paragraphs: values.paragraphs?.filter(Boolean) as ParagraphFormValue[],
				more: values.more?.filter(Boolean) as ParagraphFormValue[]
			};
			onChange?.(normalizeChairmanMessage(formValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeChairmanMessage(values);
		startTransition(async () => {
			const result = await updateChairmanMessage(pageSlug, payload);
			if (!result.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved');
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>Chairman's Message</h3>
						<p className='text-sm text-slate-500'>
							Manage the chairman's message content displayed on the page.
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

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='headerTitle'
						rules={{ required: 'Title is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Chairman's Message" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='headerSubtitle'
						rules={{ required: 'Subtitle is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subtitle</FormLabel>
								<FormControl>
									<Input placeholder='A Vision for Excellence' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='quote'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quote</FormLabel>
							<FormControl>
								<Input placeholder='"Dear Students, Faculty, and Stakeholders,"' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Message Paragraphs
						</h4>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => paragraphsArray.append(createParagraph())}>
							Add paragraph
						</Button>
					</div>
					<div className='space-y-4'>
						{paragraphsArray.fields.map((field, index) => (
							<div key={field.id} className='flex gap-3'>
								<div className='flex-1'>
									<FormField
										control={form.control}
										name={`paragraphs.${index}.value`}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Textarea
														placeholder='Enter paragraph content...'
														className='min-h-[100px]'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								{paragraphsArray.fields.length > 1 && (
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() => paragraphsArray.remove(index)}
										className='mt-2 text-red-600 hover:text-red-700'>
										Remove
									</Button>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<FormLabel>Additional Content</FormLabel>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() =>
								moreArray.append(createParagraph())
							}>
							Add More Content
						</Button>
					</div>
					<div className='space-y-2'>
						{moreArray.fields.map((field, index) => (
							<div key={field.id} className='flex gap-2'>
								<FormField
									control={form.control}
									name={`more.${index}.value`}
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormControl>
												<Textarea
													placeholder='Additional content paragraph...'
													className='min-h-[80px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{moreArray.fields.length > 1 && (
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() => moreArray.remove(index)}>
										Remove
									</Button>
								)}
							</div>
						))}
					</div>
				</div>
			</form>
		</Form>
	);
}