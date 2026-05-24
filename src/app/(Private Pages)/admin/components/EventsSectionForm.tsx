'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { updateEventsSection } from '@/app/(Private Pages)/actions/events';
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
	AdminToggle,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

type EventFormValue = {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	date: string;
	time: string;
	location: string;
	category: string;
	attendees: string;
	featured: boolean;
	status: string;
	tags: string;
	organizer: string;
	registrationOpen: boolean;
	price: string;
	highlights: string;
	ctaLabel: string;
	ctaLink: string;
};

type FormValues = {
	events: EventFormValue[];
};

type EventsSectionFormProps = {
	initialValues: FormValues;
	pageSlug: string;
	onChange?: (data: EventsSectionData) => void;
};

const createEmptyEvent = (): EventFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	subtitle: '',
	description: '',
	image: '',
	date: new Date().toISOString().slice(0, 10),
	time: '',
	location: '',
	category: 'General',
	attendees: '0',
	featured: false,
	status: 'upcoming',
	tags: '',
	organizer: '',
	registrationOpen: true,
	price: '',
	highlights: '',
	ctaLabel: 'Register Now',
	ctaLink: '/'
});

const toEvent = (value: EventFormValue): EventItem | null => {
	const title = value.title.trim();
	const description = value.description.trim();
	if (title.length === 0 && description.length === 0) return null;

	const parsedId = Number(value.id);
	const id = Number.isFinite(parsedId) ? parsedId : Date.now();
	const attendees = Number(value.attendees);
	const tags = value.tags
		.split(',')
		.map(t => t.trim())
		.filter(Boolean);
	const highlights = value.highlights
		.split(',')
		.map(t => t.trim())
		.filter(Boolean);

	return {
		id,
		title,
		subtitle: value.subtitle.trim(),
		description,
		image: value.image.trim(),
		date: value.date,
		time: value.time.trim(),
		location: value.location.trim(),
		category: value.category.trim() || 'General',
		attendees: Number.isFinite(attendees) ? attendees : 0,
		featured: value.featured,
		status: value.status.trim() || 'upcoming',
		tags,
		organizer: value.organizer.trim(),
		registrationOpen: value.registrationOpen,
		price: value.price.trim(),
		highlights,
		ctaLabel:
			value.ctaLabel.trim().length > 0 ? value.ctaLabel.trim() : 'Register Now',
		ctaLink: value.ctaLink.trim().length > 0 ? value.ctaLink.trim() : '/'
	};
};

const normalizeFormValues = (
	values: Partial<FormValues>
): EventsSectionData => ({
	events:
		values.events
			?.map(toEvent)
			.filter((e): e is EventItem => e !== null) ?? []
});

const toFormValue = (event: EventItem): EventFormValue => ({
	id: event.id.toString(),
	title: event.title,
	subtitle: event.subtitle,
	description: event.description,
	image: event.image,
	date: event.date,
	time: event.time,
	location: event.location,
	category: event.category,
	attendees: event.attendees.toString(),
	featured: Boolean(event.featured),
	status: event.status,
	tags: event.tags.join(', '),
	organizer: event.organizer,
	registrationOpen: Boolean(event.registrationOpen),
	price: event.price,
	highlights: event.highlights.join(', '),
	ctaLabel: event.ctaLabel,
	ctaLink: event.ctaLink
});

export default function EventsSectionForm({
	initialValues,
	pageSlug,
	onChange
}: EventsSectionFormProps) {
	const defaults = useMemo<FormValues>(
		() => ({
			events:
				initialValues.events.length > 0
					? initialValues.events
					: [createEmptyEvent()]
		}),
		[initialValues]
	);
	const form = useForm<FormValues>({ defaultValues: defaults });
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const arr = useFieldArray({ control: form.control, name: 'events' });

	useEffect(() => {
		onChange?.(normalizeFormValues(form.getValues()));
		const sub = form.watch(v => {
			onChange?.(normalizeFormValues(v as FormValues));
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
		const payload = normalizeFormValues(values);
		startTransition(async () => {
			const result = await updateEventsSection(pageSlug, payload);
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
				title='Events'
				description='Featured events shown on the homepage.'>
				<AdminItemList>
					{arr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={arr.fields.length}
							title={form.watch(`events.${index}.title`) || `Event ${index + 1}`}
							subtitle={form.watch(`events.${index}.location`) || undefined}
							onMove={d => arr.move(index, index + d)}
							onRemove={
								arr.fields.length > 1 ? () => arr.remove(index) : undefined
							}>
							<AdminFieldGrid>
								<AdminField
									label='Title'
									error={
										form.formState.errors.events?.[index]?.title?.message
									}>
									<Input
										placeholder='TechFest 2024'
										{...form.register(`events.${index}.title` as const, {
											required: 'Title is required'
										})}
									/>
								</AdminField>
								<AdminField label='Subtitle'>
									<Input
										placeholder='Innovation Summit'
										{...form.register(`events.${index}.subtitle` as const)}
									/>
								</AdminField>
								<AdminField
									label='Date'
									error={form.formState.errors.events?.[index]?.date?.message}>
									<Input
										type='date'
										{...form.register(`events.${index}.date` as const, {
											required: 'Date is required'
										})}
									/>
								</AdminField>
								<AdminField label='Time'>
									<Input
										placeholder='9:00 AM - 8:00 PM'
										{...form.register(`events.${index}.time` as const)}
									/>
								</AdminField>
								<AdminField label='Location'>
									<Input
										placeholder='BPIT Main Auditorium'
										{...form.register(`events.${index}.location` as const)}
									/>
								</AdminField>
								<AdminField label='Category'>
									<Input
										placeholder='Technology'
										{...form.register(`events.${index}.category` as const)}
									/>
								</AdminField>
								<AdminField label='Attendees'>
									<Input
										type='number'
										min={0}
										{...form.register(`events.${index}.attendees` as const)}
									/>
								</AdminField>
								<AdminField label='Status'>
									<Input
										placeholder='upcoming'
										{...form.register(`events.${index}.status` as const)}
									/>
								</AdminField>
								<AdminField label='Tags (comma separated)'>
									<Input
										placeholder='AI/ML, Robotics'
										{...form.register(`events.${index}.tags` as const)}
									/>
								</AdminField>
								<AdminField label='Organizer'>
									<Input
										placeholder='Training & Placement Cell'
										{...form.register(`events.${index}.organizer` as const)}
									/>
								</AdminField>
								<AdminField label='Price'>
									<Input
										placeholder='Free'
										{...form.register(`events.${index}.price` as const)}
									/>
								</AdminField>
								<AdminField label='Highlights (comma separated)'>
									<Input
										placeholder='Industry Leaders, Workshops'
										{...form.register(`events.${index}.highlights` as const)}
									/>
								</AdminField>
								<AdminField
									label='CTA label'
									error={
										form.formState.errors.events?.[index]?.ctaLabel?.message
									}>
									<Input
										placeholder='Register Now'
										{...form.register(`events.${index}.ctaLabel` as const, {
											required: 'CTA label is required'
										})}
									/>
								</AdminField>
								<AdminField
									label='CTA link'
									error={
										form.formState.errors.events?.[index]?.ctaLink?.message
									}>
									<Input
										placeholder='/events/register'
										{...form.register(`events.${index}.ctaLink` as const, {
											required: 'CTA link is required',
											validate: value =>
												value.startsWith('/') ||
												value.startsWith('http://') ||
												value.startsWith('https://')
													? true
													: 'Link must start with "/" or "http(s)://"'
										})}
									/>
								</AdminField>
							</AdminFieldGrid>

							<AdminField label='Description'>
								<Textarea
									rows={4}
									placeholder='Tell attendees what to expect'
									{...form.register(`events.${index}.description` as const)}
								/>
							</AdminField>

							<AdminField label='Image URL'>
								<Input
									placeholder='https://…'
									{...form.register(`events.${index}.image` as const)}
								/>
								<div className='mt-2 flex flex-wrap gap-2'>
									<CloudinaryUploadButton
										buttonText='Upload image'
										onUpload={url =>
											form.setValue(`events.${index}.image` as const, url, {
												shouldDirty: true
											})
										}
									/>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() =>
											form.setValue(`events.${index}.image` as const, '', {
												shouldDirty: true
											})
										}>
										Clear
									</Button>
								</div>
							</AdminField>

							<AdminToggle
								label='Featured'
								description='Featured events appear with a special badge.'
								checked={form.watch(`events.${index}.featured`) ?? false}
								onChange={v =>
									form.setValue(`events.${index}.featured` as const, v, {
										shouldDirty: true
									})
								}
							/>
							<AdminToggle
								label='Registration open'
								checked={
									form.watch(`events.${index}.registrationOpen`) ?? false
								}
								onChange={v =>
									form.setValue(
										`events.${index}.registrationOpen` as const,
										v,
										{ shouldDirty: true }
									)
								}
							/>
						</AdminItemCard>
					))}
				</AdminItemList>
				{arr.fields.length === 0 && <AdminEmptyState title='No events yet' />}
				<AddRowButton onClick={() => arr.append(createEmptyEvent())}>
					Add event
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}

export const toFormValuesFromEventsSection = (
	section: EventsSectionData
): FormValues => ({
	events: section.events.map(toFormValue)
});
