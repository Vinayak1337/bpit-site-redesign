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
import { updateFounderTribute } from '@/app/(Private Pages)/actions/about';
import type { FounderTributeData } from '@/app/(Private Pages)/actions/about';

type StringFormValue = { id: string; value: string };

type FormValues = {
	headerTitle: string;
	headerSubtitle: string;
	paragraphs: StringFormValue[];
	quote: string;
	more: StringFormValue[];
	coreValues: StringFormValue[];
	commitments: StringFormValue[];
};

type Props = {
	initialData: FounderTributeData;
	pageSlug: string;
	onChange?: (data: FounderTributeData) => void;
};

const createStringValue = (value = ''): StringFormValue => ({
	id: crypto.randomUUID(),
	value
});

const normalizeFounderTribute = (values: Partial<FormValues>): FounderTributeData => {
	const paragraphs = (values.paragraphs ?? [])
		.map(item => (item.value ?? '').trim())
		.filter(Boolean);

	const more = (values.more ?? [])
		.map(item => (item.value ?? '').trim())
		.filter(Boolean);

	const coreValues = (values.coreValues ?? [])
		.map(item => (item.value ?? '').trim())
		.filter(Boolean);

	const commitments = (values.commitments ?? [])
		.map(item => (item.value ?? '').trim())
		.filter(Boolean);

	return {
		header: {
			title: (values.headerTitle ?? '').trim() || 'In Memory of Our Visionary Founder',
			subtitle: (values.headerSubtitle ?? '').trim() || 'Bhagwan Parshuram - The Divine Inspiration'
		},
		paragraphs,
		quote: (values.quote ?? '').trim() || '"Education is the most powerful weapon which you can use to change the world."',
		more,
		coreValues,
		commitments
	};
};

export default function FounderTributeForm({
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
			paragraphs:
				initialData.paragraphs.length > 0
					? initialData.paragraphs.map(value => createStringValue(value))
					: [createStringValue()],
			quote: initialData.quote,
			more:
				initialData.more.length > 0
					? initialData.more.map(value => createStringValue(value))
					: [createStringValue()],
			coreValues:
				initialData.coreValues.length > 0
					? initialData.coreValues.map(value => createStringValue(value))
					: [createStringValue()],
			commitments:
				initialData.commitments.length > 0
					? initialData.commitments.map(value => createStringValue(value))
					: [createStringValue()]
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

	const coreValuesArray = useFieldArray({
		control: form.control,
		name: 'coreValues'
	});

	const commitmentsArray = useFieldArray({
		control: form.control,
		name: 'commitments'
	});

	useEffect(() => {
		onChange?.(normalizeFounderTribute(form.getValues()));
		const subscription = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				paragraphs: values.paragraphs?.filter(Boolean) as StringFormValue[],
				more: values.more?.filter(Boolean) as StringFormValue[],
				coreValues: values.coreValues?.filter(Boolean) as StringFormValue[],
				commitments: values.commitments?.filter(Boolean) as StringFormValue[]
			};
			onChange?.(normalizeFounderTribute(formValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeFounderTribute(values);
		startTransition(async () => {
			const result = await updateFounderTribute(pageSlug, payload);
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
						<h3 className='text-lg font-semibold text-slate-900'>Founder Tribute</h3>
						<p className='text-sm text-slate-500'>
							Manage the founder tribute content and values.
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
									<Input placeholder='In Memory of Our Visionary Founder' {...field} />
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
									<Input placeholder='Bhagwan Parshuram - The Divine Inspiration' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Introduction Paragraphs
						</h4>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => paragraphsArray.append(createStringValue())}>
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

				<FormField
					control={form.control}
					name='quote'
					rules={{ required: 'Quote is required' }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Inspirational Quote</FormLabel>
							<FormControl>
								<Textarea
									placeholder='"Education is the most powerful weapon which you can use to change the world."'
									className='min-h-[80px]'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Additional Content
						</h4>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => moreArray.append(createStringValue())}>
							Add content
						</Button>
					</div>
					<div className='space-y-4'>
						{moreArray.fields.map((field, index) => (
							<div key={field.id} className='flex gap-3'>
								<div className='flex-1'>
									<FormField
										control={form.control}
										name={`more.${index}.value`}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Textarea
														placeholder='Enter additional content...'
														className='min-h-[80px]'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								{moreArray.fields.length > 1 && (
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() => moreArray.remove(index)}
										className='mt-2 text-red-600 hover:text-red-700'>
										Remove
									</Button>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
					<div className='space-y-3'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-semibold text-slate-700'>
								Core Values
							</h4>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => coreValuesArray.append(createStringValue())}>
								Add value
							</Button>
						</div>
						<div className='space-y-3'>
							{coreValuesArray.fields.map((field, index) => (
								<div key={field.id} className='flex gap-3'>
									<div className='flex-1'>
										<FormField
											control={form.control}
											name={`coreValues.${index}.value`}
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input placeholder='Core value...' {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									{coreValuesArray.fields.length > 1 && (
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => coreValuesArray.remove(index)}
											className='text-red-600 hover:text-red-700'>
											Remove
										</Button>
									)}
								</div>
							))}
						</div>
					</div>

					<div className='space-y-3'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-semibold text-slate-700'>
								Commitments
							</h4>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => commitmentsArray.append(createStringValue())}>
								Add commitment
							</Button>
						</div>
						<div className='space-y-3'>
							{commitmentsArray.fields.map((field, index) => (
								<div key={field.id} className='flex gap-3'>
									<div className='flex-1'>
										<FormField
											control={form.control}
											name={`commitments.${index}.value`}
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input placeholder='Commitment...' {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									{commitmentsArray.fields.length > 1 && (
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => commitmentsArray.remove(index)}
											className='text-red-600 hover:text-red-700'>
											Remove
										</Button>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}