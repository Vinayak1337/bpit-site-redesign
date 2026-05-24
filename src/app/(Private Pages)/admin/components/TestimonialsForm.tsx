'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { updateTestimonials } from '@/app/(Private Pages)/actions/testimonials';
import {
	AddRowButton,
	AdminEmptyState,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

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
	tags.split(',').map(t => t.trim()).filter(Boolean);

const toTestimonialsData = (
	values: TestimonialsFormValues
): TestimonialsData => {
	const testimonials = values.testimonials
		.map((item, index): TestimonialItem | null => {
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
			if (
				testimonial.name.length === 0 ||
				testimonial.testimonial.length === 0
			) {
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
	const defaults = useMemo<TestimonialsFormValues>(
		() => ({
			title: initialValues.title,
			subtitle: initialValues.subtitle,
			testimonials:
				initialValues.testimonials.length > 0
					? initialValues.testimonials
					: [createEmptyTestimonial()]
		}),
		[initialValues]
	);
	const form = useForm<TestimonialsFormValues>({ defaultValues: defaults });
	const arr = useFieldArray({ control: form.control, name: 'testimonials' });
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	useEffect(() => {
		onChange?.(toTestimonialsData(form.getValues()));
		const sub = form.watch(v => {
			onChange?.(toTestimonialsData(v as TestimonialsFormValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			const result = await updateTestimonials(
				pageSlug,
				toTestimonialsData(values)
			);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Testimonials header'
				description='Headline copy for the testimonials section on the homepage.'>
				<AdminFieldGrid>
					<AdminField
						label='Section title'
						htmlFor='test-title'
						error={form.formState.errors.title?.message}>
						<Input
							id='test-title'
							placeholder='Voices of Excellence'
							{...form.register('title', { required: 'Title is required' })}
						/>
					</AdminField>
					<AdminField label='Subtitle' htmlFor='test-sub'>
						<Textarea
							id='test-sub'
							rows={3}
							placeholder='Highlight the impact of BPIT through student stories.'
							className='resize-none'
							{...form.register('subtitle')}
						/>
					</AdminField>
				</AdminFieldGrid>
			</AdminFormSection>

			<AdminFormSection title='Stories'>
				<AdminItemList>
					{arr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={arr.fields.length}
							title={
								form.watch(`testimonials.${index}.name`) ||
								`Story ${index + 1}`
							}
							subtitle={
								form.watch(`testimonials.${index}.company`) || undefined
							}
							onMove={d => arr.move(index, index + d)}
							onRemove={
								arr.fields.length > 1 ? () => arr.remove(index) : undefined
							}>
							<AdminFieldGrid cols={3}>
								<AdminField
									label='Name'
									error={
										form.formState.errors.testimonials?.[index]?.name?.message
									}>
									<Input
										placeholder='Student name'
										{...form.register(`testimonials.${index}.name` as const, {
											required: 'Name is required'
										})}
									/>
								</AdminField>
								<AdminField label='Batch'>
									<Input
										placeholder='B.Tech CSE 2024'
										{...form.register(`testimonials.${index}.batch` as const)}
									/>
								</AdminField>
								<AdminField label='Company'>
									<Input
										placeholder='Employer'
										{...form.register(`testimonials.${index}.company` as const)}
									/>
								</AdminField>
								<AdminField label='Position'>
									<Input
										placeholder='Job title'
										{...form.register(`testimonials.${index}.position` as const)}
									/>
								</AdminField>
								<AdminField label='Achievement'>
									<Input
										placeholder='Highlight accomplishment'
										{...form.register(
											`testimonials.${index}.achievement` as const
										)}
									/>
								</AdminField>
								<AdminField
									label='Rating (1-5)'
									error={
										form.formState.errors.testimonials?.[index]?.rating?.message
									}>
									<Input
										type='number'
										min={1}
										max={5}
										step={1}
										{...form.register(`testimonials.${index}.rating` as const, {
											required: 'Rating is required'
										})}
									/>
								</AdminField>
							</AdminFieldGrid>

							<AdminFieldGrid>
								<AdminField label='Profile image URL'>
									<Input
										placeholder='https://…'
										{...form.register(`testimonials.${index}.image` as const)}
									/>
									<div className='mt-2 flex flex-wrap gap-2'>
										<CloudinaryUploadButton
											buttonText='Upload image'
											onUpload={url =>
												form.setValue(
													`testimonials.${index}.image` as const,
													url,
													{ shouldDirty: true }
												)
											}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() =>
												form.setValue(
													`testimonials.${index}.image` as const,
													'',
													{ shouldDirty: true }
												)
											}>
											Clear
										</Button>
									</div>
								</AdminField>
								<AdminField label='Video URL'>
									<Input
										placeholder='https://…'
										{...form.register(`testimonials.${index}.video` as const)}
									/>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										className='mt-2 self-start'
										onClick={() =>
											form.setValue(
												`testimonials.${index}.video` as const,
												'',
												{ shouldDirty: true }
											)
										}>
										Clear
									</Button>
								</AdminField>
							</AdminFieldGrid>

							<AdminField label='Story'>
								<Textarea
									rows={5}
									placeholder='Describe the experience or quote to highlight.'
									{...form.register(
										`testimonials.${index}.testimonial` as const
									)}
								/>
							</AdminField>
							<AdminField label='Tags (comma separated)'>
								<Input
									placeholder='Placements, Innovation, Faculty'
									{...form.register(`testimonials.${index}.tags` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{arr.fields.length === 0 && (
					<AdminEmptyState title='No testimonials yet' />
				)}
				<AddRowButton onClick={() => arr.append(createEmptyTestimonial())}>
					Add testimonial
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
