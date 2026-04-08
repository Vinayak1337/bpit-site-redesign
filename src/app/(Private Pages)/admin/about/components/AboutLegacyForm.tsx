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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import type { AboutLegacyData } from '@/app/(Private Pages)/actions/about';
import { updateAboutLegacy } from '@/app/(Private Pages)/actions/about';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';

type ParagraphFormValue = { id: string; value: string };
type FeatureFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: AboutLegacyData['features'][number]['color'];
};

type FormValues = {
	title: string;
	paragraphs: ParagraphFormValue[];
	features: FeatureFormValue[];
};

type Props = {
	initialData: AboutLegacyData;
	pageSlug: string;
	onChange?: (data: AboutLegacyData) => void;
};

const COLOR_OPTIONS: AboutLegacyData['features'][number]['color'][] = [
	'blue',
	'green',
	'purple'
];
const DEFAULT_ICON = 'Trophy';

const createParagraph = (value = ''): ParagraphFormValue => ({
	id: crypto.randomUUID(),
	value
});

const createFeature = (): FeatureFormValue => ({
	id: crypto.randomUUID(),
	icon: DEFAULT_ICON,
	title: '',
	description: '',
	color: 'blue'
});

const normalizeLegacy = (values: Partial<FormValues>): AboutLegacyData => {
	const paragraphs = (values.paragraphs ?? [])
		.map(paragraph => (paragraph.value ?? '').trim())
		.filter(Boolean);

	const features = (values.features ?? [])
		.map(feature => ({
			icon: feature.icon?.trim().length ? feature.icon.trim() : DEFAULT_ICON,
			title: (feature.title ?? '').trim(),
			description: (feature.description ?? '').trim(),
			color: COLOR_OPTIONS.includes(feature.color ?? 'blue')
				? feature.color ?? 'blue'
				: 'blue'
		}))
		.filter(feature => feature.title.length > 0 && feature.description.length > 0);

	return {
		title: (values.title ?? '').trim() || 'Our Legacy',
		paragraphs,
		features
	};
};

export default function AboutLegacyForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			title: initialData.title,
			paragraphs:
				initialData.paragraphs.length > 0
					? initialData.paragraphs.map(value => createParagraph(value))
					: [createParagraph()],
			features:
				initialData.features.length > 0
					? initialData.features.map(feature => ({
							id: crypto.randomUUID(),
							icon: feature.icon,
							title: feature.title,
							description: feature.description,
							color: feature.color
					  }))
					: [createFeature()]
		}
	});

	const paragraphsArray = useFieldArray({
		control: form.control,
		name: 'paragraphs'
	});

	const featuresArray = useFieldArray({
		control: form.control,
		name: 'features'
	});

	useEffect(() => {
		onChange?.(normalizeLegacy(form.getValues()));
		const subscription = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				paragraphs: values.paragraphs?.filter(Boolean) as ParagraphFormValue[],
				features: values.features?.filter(Boolean) as FeatureFormValue[]
			};
			onChange?.(normalizeLegacy(formValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeLegacy(values);
		startTransition(async () => {
			const result = await updateAboutLegacy(pageSlug, payload);
			if (!result.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved');
		});
	};

	const iconOptions = useMemo(
		() => Array.from(new Set(SUPPORTED_ICON_NAMES)),
		[]
	);

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>Legacy</h3>
						<p className='text-sm text-slate-500'>
							Manage the story content and highlight cards displayed on the About page.
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

				<FormField
					control={form.control}
					name='title'
					rules={{ required: 'Title is required' }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Section title</FormLabel>
							<FormControl>
								<Input placeholder='Our Legacy' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Paragraphs
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
							<div
								key={field.id}
								className='rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-3'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-slate-700'>
										Paragraph {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() =>
											paragraphsArray.remove(index < 0 ? 0 : index)
										}>
										Remove
									</Button>
								</div>
								<FormField
									control={form.control}
									name={`paragraphs.${index}.value`}
									rules={{ required: 'Paragraph cannot be empty' }}
									render={({ field: paragraphField }) => (
										<FormItem>
											<FormLabel className='sr-only'>{`Paragraph ${index + 1}`}</FormLabel>
											<FormControl>
												<Textarea
													rows={4}
													placeholder='Write a paragraph about BPIT legacy...'
													{...paragraphField}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						))}
						{paragraphsArray.fields.length === 0 ? (
							<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
								Add at least one paragraph to describe BPIT legacy.
							</div>
						) : null}
					</div>
				</div>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Features
						</h4>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => featuresArray.append(createFeature())}>
							Add feature
						</Button>
					</div>
					<div className='space-y-4'>
						{featuresArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-4'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-slate-700'>
										Feature {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() =>
											featuresArray.remove(index < 0 ? 0 : index)
										}>
										Remove
									</Button>
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name={`features.${index}.title`}
										rules={{ required: 'Title is required' }}
										render={({ field: titleField }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input
														placeholder='Academic Excellence'
														{...titleField}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`features.${index}.icon`}
										render={({ field: iconField }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
												<FormControl>
													<Select
														onValueChange={iconField.onChange}
														value={iconField.value}>
														<SelectTrigger>
															<SelectValue placeholder='Select icon' />
														</SelectTrigger>
														<SelectContent>
															{iconOptions.map(option => (
																<SelectItem key={option} value={option}>
																	{option}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`features.${index}.color`}
										render={({ field: colorField }) => (
											<FormItem>
												<FormLabel>Color</FormLabel>
												<FormControl>
													<Select
														onValueChange={colorField.onChange}
														value={colorField.value}>
														<SelectTrigger>
															<SelectValue placeholder='Select color' />
														</SelectTrigger>
														<SelectContent>
															{COLOR_OPTIONS.map(color => (
																<SelectItem key={color} value={color}>
																	{color.charAt(0).toUpperCase() +
																		color.slice(1)}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name={`features.${index}.description`}
									rules={{ required: 'Description is required' }}
									render={({ field: descriptionField }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													rows={3}
													placeholder='Describe the highlight...'
													{...descriptionField}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						))}
						{featuresArray.fields.length === 0 ? (
							<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
								Add feature cards to showcase BPIT strengths.
							</div>
						) : null}
					</div>
				</div>
			</form>
		</Form>
	);
}
