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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { updateEventsSection } from '@/app/(Private Pages)/actions/events';

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
	featured: 'true' | 'false';
	status: string;
	tags: string;
	organizer: string;
	registrationOpen: 'true' | 'false';
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
	featured: 'false',
	status: 'upcoming',
	tags: '',
	organizer: '',
	registrationOpen: 'true',
	price: '',
	highlights: '',
	ctaLabel: 'Register Now',
	ctaLink: '/'
});

const toEvent = (value: EventFormValue): EventItem | null => {
	const title = value.title.trim();
	const description = value.description.trim();
	if (title.length === 0 && description.length === 0) {
		return null;
	}

	const parsedId = Number(value.id);
	const id = Number.isFinite(parsedId) ? parsedId : Date.now();
	const attendees = Number(value.attendees);
	const tags = value.tags
		.split(',')
		.map(tag => tag.trim())
		.filter(tag => tag.length > 0);
	const highlights = value.highlights
		.split(',')
		.map(item => item.trim())
		.filter(item => item.length > 0);

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
		featured: value.featured === 'true',
		status: value.status.trim() || 'upcoming',
		tags,
		organizer: value.organizer.trim(),
		registrationOpen: value.registrationOpen === 'true',
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
			.filter((event): event is EventItem => event !== null) ?? []
});

const toCsv = (items: string[]): string => items.join(', ');

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
	featured: event.featured ? 'true' : 'false',
	status: event.status,
	tags: toCsv(event.tags),
	organizer: event.organizer,
	registrationOpen: event.registrationOpen ? 'true' : 'false',
	price: event.price,
	highlights: toCsv(event.highlights),
	ctaLabel: event.ctaLabel,
	ctaLink: event.ctaLink
});

const ensureMinimumEvents = (values: FormValues): FormValues => ({
	events: values.events.length > 0 ? values.events : [createEmptyEvent()]
});

export default function EventsSectionForm({
	initialValues,
	pageSlug,
	onChange
}: EventsSectionFormProps) {
	const defaults = useMemo(
		() => ensureMinimumEvents(initialValues),
		[initialValues]
	);
	const form = useForm<FormValues>({ defaultValues: defaults });
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const eventsFieldArray = useFieldArray({
		control: form.control,
		name: 'events'
	});

	useEffect(() => {
		onChange?.(normalizeFormValues(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(normalizeFormValues(values as FormValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeFormValues(values);
		startTransition(async () => {
			const result = await updateEventsSection(pageSlug, payload);
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
						<h3 className='text-lg font-semibold text-slate-900'>Events</h3>
						<p className='text-sm text-slate-500'>
							Curate the featured events appearing on the homepage.
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

				<div className='flex items-center justify-between'>
					<h4 className='text-sm font-semibold text-slate-700'>Event cards</h4>
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={() => eventsFieldArray.append(createEmptyEvent())}>
						Add event
					</Button>
				</div>

				<div className='space-y-4'>
					{eventsFieldArray.fields.map((field, index) => (
						<div
							key={field.id}
							className='rounded-lg border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:border-slate-300 hover:shadow'>
							<div className='flex items-start justify-between gap-4'>
								<h4 className='text-sm font-semibold text-slate-700'>
									Event {index + 1}
								</h4>
								<Button
									type='button'
									variant='ghost'
									size='sm'
									className='rounded-full border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600'
									onClick={() => eventsFieldArray.remove(index)}
									disabled={eventsFieldArray.fields.length === 1}>
									Remove
								</Button>
							</div>

							<div className='grid gap-4 md:grid-cols-2'>
								<FormField
									control={form.control}
									name={`events.${index}.title` as const}
									rules={{ required: 'Title is required' }}
									render={({ field: titleField }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder='TechFest 2024' {...titleField} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.subtitle` as const}
									render={({ field: subtitleField }) => (
										<FormItem>
											<FormLabel>Subtitle</FormLabel>
											<FormControl>
												<Input
													placeholder='Innovation Summit'
													{...subtitleField}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.date` as const}
									rules={{ required: 'Date is required' }}
									render={({ field: dateField }) => (
										<FormItem>
											<FormLabel>Date</FormLabel>
											<FormControl>
												<Input type='date' {...dateField} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.time` as const}
									render={({ field: timeField }) => (
										<FormItem>
											<FormLabel>Time</FormLabel>
											<FormControl>
												<Input placeholder='9:00 AM - 8:00 PM' {...timeField} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.location` as const}
									render={({ field: locationField }) => (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<Input
													placeholder='BPIT Main Auditorium'
													{...locationField}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.category` as const}
									render={({ field: categoryField }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<FormControl>
												<Input placeholder='Technology' {...categoryField} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.attendees` as const}
									render={({ field: attendeesField }) => (
										<FormItem>
											<FormLabel>Attendees</FormLabel>
											<FormControl>
												<Input type='number' min={0} {...attendeesField} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.featured` as const}
									render={({ field: featuredField }) => (
										<FormItem>
											<FormLabel>Featured</FormLabel>
											<Select
												value={featuredField.value}
												onValueChange={featuredField.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='true'>Yes</SelectItem>
													<SelectItem value='false'>No</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.status` as const}
									render={({ field: statusField }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<FormControl>
												<Input placeholder='upcoming' {...statusField} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.tags` as const}
									render={({ field: tagsField }) => (
										<FormItem>
											<FormLabel>Tags (comma separated)</FormLabel>
											<FormControl>
												<Input placeholder='AI/ML, Robotics' {...tagsField} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.organizer` as const}
									render={({ field: organizerField }) => (
										<FormItem>
											<FormLabel>Organizer</FormLabel>
											<FormControl>
												<Input
													placeholder='Training & Placement Cell'
													{...organizerField}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.registrationOpen` as const}
									render={({ field: registrationField }) => (
										<FormItem>
											<FormLabel>Registration Open</FormLabel>
											<Select
												value={registrationField.value}
												onValueChange={registrationField.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='true'>Yes</SelectItem>
													<SelectItem value='false'>No</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.price` as const}
									render={({ field: priceField }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input placeholder='Free' {...priceField} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.ctaLabel` as const}
									rules={{ required: 'CTA label is required' }}
									render={({ field: ctaLabelField }) => (
										<FormItem>
											<FormLabel>CTA Button Label</FormLabel>
											<FormControl>
												<Input placeholder='Register Now' {...ctaLabelField} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.ctaLink` as const}
									rules={{
										required: 'CTA link is required',
										validate: value =>
											value.startsWith('/') ||
											value.startsWith('http://') ||
											value.startsWith('https://')
												? true
												: 'Link must start with "/" or "http(s)://"'
									}}
									render={({ field: ctaLinkField }) => (
										<FormItem>
											<FormLabel>CTA Link</FormLabel>
											<FormControl>
												<Input
													placeholder='/events/register'
													{...ctaLinkField}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`events.${index}.highlights` as const}
									render={({ field: highlightsField }) => (
										<FormItem>
											<FormLabel>Highlights (comma separated)</FormLabel>
											<FormControl>
												<Input
													placeholder='Industry Leaders, Workshops'
													{...highlightsField}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name={`events.${index}.description` as const}
								render={({ field: descriptionField }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												rows={4}
												placeholder='Tell attendees what to expect'
												{...descriptionField}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`events.${index}.image` as const}
								render={({ field: imageField }) => (
									<FormItem>
										<FormLabel>Image URL</FormLabel>
										<FormControl>
											<Input placeholder='https://...' {...imageField} />
										</FormControl>
										<div className='flex gap-2 pt-2'>
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
												onClick={() => imageField.onChange('')}>
												Clear
											</Button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					))}
				</div>
			</form>
		</Form>
	);
}

export const toFormValuesFromEventsSection = (
	section: EventsSectionData
): FormValues => ({
	events: section.events.map(toFormValue)
});

