'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { updateTestimonials } from '@/app/(Private Pages)/actions/testimonials';

import { Plus, Trash2 } from 'lucide-react';

export type TestimonialFormValue = {
	id: string;
	name: string;
	batch: string;
	company: string;
	position: string;
	image: string;
	video: string;
	testimonial: string;
	rating: string;
	achievement: string;
	tags: string;
};

export type TestimonialsFormValues = {
	title: string;
	subtitle: string;
	testimonials: TestimonialFormValue[];
};

const createEmptyTestimonial = (): TestimonialFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	batch: '',
	company: '',
	position: '',
	image: '',
	video: '',
	testimonial: '',
	rating: '5',
	achievement: '',
	tags: ''
});

const parseTags = (tags: string): string[] =>
	tags
		.split(',')
		.map(tag => tag.trim())
		.filter(tag => tag.length > 0);

const toTestimonialsData = (values: TestimonialsFormValues): TestimonialsData => {
	const testimonials = values.testimonials
		.map((item, index) => {
			const ratingValue = Number.parseInt(item.rating, 10);
			const parsedRating = Number.isFinite(ratingValue)
				? Math.min(5, Math.max(1, ratingValue))
				: 5;
			const testimonial: TestimonialItem = {
				id: index + 1,
				name: item.name.trim(),
				batch: item.batch.trim(),
				company: item.company.trim(),
				position: item.position.trim(),
				image: item.image.trim(),
				video: item.video.trim(),
				testimonial: item.testimonial.trim(),
				rating: parsedRating,
				achievement: item.achievement.trim(),
				tags: parseTags(item.tags)
			};
			if (testimonial.name.length === 0 || testimonial.testimonial.length === 0) {
				return null;
			}
			return testimonial;
		})
		.filter((item): item is TestimonialItem => item !== null);

	return {
		title: values.title.trim(),
		subtitle: values.subtitle.trim(),
		testimonials
	};
};

const ensureMinimumItems = (
	values: TestimonialsFormValues
): TestimonialsFormValues => ({
	title: values.title,
	subtitle: values.subtitle,
	testimonials:
		values.testimonials.length > 0
			? values.testimonials
			: [createEmptyTestimonial()]
});

type TestimonialsFormProps = {
	initialValues: TestimonialsFormValues;
	pageSlug: string;
	onChange?: (data: TestimonialsData) => void;
};

export default function TestimonialsForm({
	initialValues,
	pageSlug,
	onChange
}: TestimonialsFormProps) {
	const defaults = useMemo(
		() => ensureMinimumItems(initialValues),
		[initialValues]
	);
	const form = useForm<TestimonialsFormValues>({
		defaultValues: defaults
	});
	const testimonialsFieldArray = useFieldArray({
		control: form.control,
		name: 'testimonials'
	});
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		onChange?.(toTestimonialsData(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(toTestimonialsData(values as TestimonialsFormValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: TestimonialsFormValues) => {
		setMessage(null);
		const payload = toTestimonialsData(values);
		startTransition(async () => {
			const result = await updateTestimonials(pageSlug, payload);
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
				className='space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<div className='space-y-1.5'>
						<h3 className='text-lg font-semibold text-slate-900'>Testimonials</h3>
						<p className='text-sm text-slate-500'>Manage headline stories and supporting media shown on the homepage.</p>
					</div>
					<div className='flex items-center gap-2 sm:shrink-0'>
						{message && (
							<span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						)}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving…' : 'Save changes'}
						</Button>
					</div>
				</div>

				<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5'>
					<div className='grid gap-4 sm:grid-cols-2'>
						<FormField
							control={form.control}
							name='title'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
							<FormItem>
								<FormLabel>Section title</FormLabel>
								<FormControl>
									<Input placeholder='Voices of Excellence' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						/>
						<FormField
							control={form.control}
							name='subtitle'
							render={({ field }) => (
							<FormItem>
								<FormLabel>Subtitle</FormLabel>
								<FormControl>
									<Textarea
										rows={3}
										placeholder='Highlight the impact of BPIT through student stories.'
										className='resize-none'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						/>
					</div>
				</section>

				<section className='space-y-4'>
					<div className='flex items-center justify-between gap-3'>
						<div className='text-sm font-semibold text-slate-700 uppercase tracking-wide'>Stories</div>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => testimonialsFieldArray.append(createEmptyTestimonial())}
							className='gap-1'>
							<Plus className='h-4 w-4' />
							Add testimonial
						</Button>
					</div>

					<div className='grid gap-4'>
						{testimonialsFieldArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 shadow-sm transition hover:border-slate-300 hover:shadow'>
								<div className='flex items-start justify-between gap-4'>
									<div className='font-semibold text-slate-700'>Story {index + 1}</div>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='rounded-full border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600'
										onClick={() => testimonialsFieldArray.remove(index)}
										disabled={testimonialsFieldArray.fields.length === 1}>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>

								<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
									<FormField
										control={form.control}
										name={`testimonials.${index}.name` as const}
										rules={{ required: 'Name is required' }}
										render={({ field: nameField }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input placeholder='Student name' {...nameField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`testimonials.${index}.batch` as const}
										render={({ field: batchField }) => (
											<FormItem>
												<FormLabel>Batch</FormLabel>
												<FormControl>
													<Input placeholder='B.Tech CSE 2024' {...batchField} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`testimonials.${index}.company` as const}
										render={({ field: companyField }) => (
											<FormItem>
												<FormLabel>Company</FormLabel>
												<FormControl>
													<Input placeholder='Employer' {...companyField} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
									<FormField
										control={form.control}
										name={`testimonials.${index}.position` as const}
										render={({ field: positionField }) => (
											<FormItem>
												<FormLabel>Position</FormLabel>
												<FormControl>
													<Input placeholder='Job title' {...positionField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`testimonials.${index}.achievement` as const}
										render={({ field: achievementField }) => (
											<FormItem>
												<FormLabel>Achievement</FormLabel>
												<FormControl>
													<Input placeholder='Highlight accomplishment' {...achievementField} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`testimonials.${index}.rating` as const}
										rules={{ required: 'Rating is required' }}
										render={({ field: ratingField }) => (
											<FormItem>
												<FormLabel>Rating (1-5)</FormLabel>
												<FormControl>
													<Input
														type='number'
														min={1}
														max={5}
														step={1}
														{...ratingField}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='grid gap-4 sm:grid-cols-2'>
									<FormField
										control={form.control}
										name={`testimonials.${index}.image` as const}
										render={({ field: imageField }) => (
											<FormItem>
												<FormLabel>Profile image URL</FormLabel>
												<FormControl>
													<Input placeholder='https://...' {...imageField} />
												</FormControl>
												<div className='flex flex-wrap gap-2 pt-2'>
													<CloudinaryUploadButton
														buttonText='Upload image'
														onUpload={url =>
															form.setValue(`testimonials.${index}.image` as const, url, {
																shouldDirty: true
															})
													}
													/>
													<Button
														type='button'
														variant='ghost'
														size='sm'
														className='text-slate-500 hover:text-slate-700'
														onClick={() => imageField.onChange('')}>
														Clear
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`testimonials.${index}.video` as const}
										render={({ field: videoField }) => (
											<FormItem>
												<FormLabel>Video URL</FormLabel>
												<FormControl>
													<Input placeholder='https://...' {...videoField} />
												</FormControl>
												<Button
													type='button'
													variant='ghost'
													size='sm'
													className='mt-2 text-slate-500 hover:text-slate-700'
													onClick={() => videoField.onChange('')}>
													Clear
												</Button>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name={`testimonials.${index}.testimonial` as const}
									render={({ field: testimonialField }) => (
										<FormItem>
											<FormLabel>Story</FormLabel>
											<FormControl>
												<Textarea
													rows={5}
													placeholder='Describe the experience or quote to highlight.'
													{...testimonialField}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`testimonials.${index}.tags` as const}
									render={({ field: tagsField }) => (
										<FormItem>
											<FormLabel>Tags (comma separated)</FormLabel>
											<FormControl>
												<Input placeholder='Placements, Innovation, Faculty' {...tagsField} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						))}
					</div>
				</section>
			</form>
		</Form>
	);
}


