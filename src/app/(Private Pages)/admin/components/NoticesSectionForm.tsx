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
import { updateNoticesSection } from '@/app/(Private Pages)/actions/notices';

const CATEGORY_OPTIONS = [
	'Academic',
	'Financial Aid',
	'Admission',
	'Innovation',
	'Sports',
	'Library',
	'General'
] as const;

const PRIORITY_OPTIONS = ['high', 'medium', 'low'] as const;

type CategoryOption = (typeof CATEGORY_OPTIONS)[number];
type PriorityOption = (typeof PRIORITY_OPTIONS)[number];

type NoticeFormValue = {
	id: string;
	category: CategoryOption;
	title: string;
	subtitle: string;
	date: string;
	time: string;
	image: string;
	priority: PriorityOption;
	tags: string;
	description: string;
	pinned: 'true' | 'false';
	urgent: 'true' | 'false';
};

type FormValues = {
	notices: NoticeFormValue[];
	announcements: NoticeFormValue[];
};

type NoticesSectionFormProps = {
	initialValues: FormValues;
	pageSlug: string;
	onChange?: (data: NoticesSectionData) => void;
};

const createEmptyNotice = (): NoticeFormValue => ({
	id: crypto.randomUUID(),
	category: 'General',
	title: '',
	subtitle: '',
	date: new Date().toISOString().slice(0, 10),
	time: '',
	image: '',
	priority: 'medium',
	tags: '',
	description: '',
	pinned: 'false',
	urgent: 'false'
});

const toNotice = (value: NoticeFormValue): Notice | null => {
	const title = value.title.trim();
	const description = value.description.trim();
	const hasContent = title.length > 0 || description.length > 0;
	if (!hasContent) {
		return null;
	}

	const parsedId = Number(value.id);
	const id = Number.isFinite(parsedId) ? parsedId : Date.now();
	const tags = value.tags
		.split(',')
		.map(tag => tag.trim())
		.filter(tag => tag.length > 0);

	return {
		id,
		category: value.category,
		title,
		subtitle: value.subtitle.trim(),
		date: value.date,
		time: value.time.trim(),
		image: value.image.trim(),
		priority: value.priority,
		tags,
		description,
		pinned: value.pinned === 'true',
		urgent: value.urgent === 'true'
	};
};

const normalizeFormValues = (
	values: Partial<FormValues>
): NoticesSectionData => {
	const mapArray = (items: NoticeFormValue[] | undefined): Notice[] => {
		if (!items) return [];
		return items
			.map(toNotice)
			.filter((notice): notice is Notice => notice !== null);
	};

	return {
		notices: mapArray(values.notices),
		announcements: mapArray(values.announcements)
	};
};

const toTagsString = (tags: string[]): string => tags.join(', ');

const toFormValue = (notice: Notice): NoticeFormValue => ({
	id: notice.id.toString(),
	category: CATEGORY_OPTIONS.includes(notice.category as CategoryOption)
		? (notice.category as CategoryOption)
		: 'General',
	title: notice.title,
	subtitle: notice.subtitle,
	date: notice.date,
	time: notice.time,
	image: notice.image,
	priority: PRIORITY_OPTIONS.includes(notice.priority as PriorityOption)
		? (notice.priority as PriorityOption)
		: 'medium',
	tags: toTagsString(notice.tags),
	description: notice.description,
	pinned: notice.pinned ? 'true' : 'false',
	urgent: notice.urgent ? 'true' : 'false'
});

const ensureMinimumItems = (values: FormValues): FormValues => ({
	notices: values.notices.length > 0 ? values.notices : [createEmptyNotice()],
	announcements:
		values.announcements.length > 0
			? values.announcements
			: [createEmptyNotice()]
});

export default function NoticesSectionForm({
	initialValues,
	pageSlug,
	onChange
}: NoticesSectionFormProps) {
	const defaults = useMemo(
		() => ensureMinimumItems(initialValues),
		[initialValues]
	);
	const form = useForm<FormValues>({
		defaultValues: defaults
	});
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const noticesFieldArray = useFieldArray({
		control: form.control,
		name: 'notices'
	});
	const announcementsFieldArray = useFieldArray({
		control: form.control,
		name: 'announcements'
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
			const result = await updateNoticesSection(pageSlug, payload);
			if (!result.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved');
		});
	};

	const renderNoticeFields = (
		index: number,
		remove: (index: number) => void,
		arrayName: 'notices' | 'announcements',
		fieldId: string
	) => {
		return (
			<div
				key={fieldId}
				className='rounded-lg border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:border-slate-300 hover:shadow'>
				<div className='flex items-start justify-between gap-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						{arrayName === 'notices' ? 'Notice' : 'Announcement'} {index + 1}
					</h4>
					<Button
						type='button'
						variant='ghost'
						size='sm'
						className='rounded-full border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600'
						onClick={() => remove(index)}
						disabled={
							arrayName === 'notices'
								? noticesFieldArray.fields.length === 1
								: announcementsFieldArray.fields.length === 1
						}>
						Remove
					</Button>
				</div>

				<div className='grid gap-4 md:grid-cols-2'>
					<FormField
						control={form.control}
						name={`${arrayName}.${index}.title` as const}
						rules={{ required: 'Title is required' }}
						render={({ field: titleField }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder='Enter title' {...titleField} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={`${arrayName}.${index}.subtitle` as const}
						render={({ field: subtitleField }) => (
							<FormItem>
								<FormLabel>Subtitle</FormLabel>
								<FormControl>
									<Input placeholder='Enter subtitle' {...subtitleField} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={`${arrayName}.${index}.date` as const}
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
						name={`${arrayName}.${index}.time` as const}
						render={({ field: timeField }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<FormControl>
									<Input placeholder='10:00 AM' {...timeField} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={`${arrayName}.${index}.category` as const}
						render={({ field: categoryField }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select
									value={categoryField.value}
									onValueChange={categoryField.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select category' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{CATEGORY_OPTIONS.map(option => (
											<SelectItem key={option} value={option}>
												{option}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={`${arrayName}.${index}.priority` as const}
						render={({ field: priorityField }) => (
							<FormItem>
								<FormLabel>Priority</FormLabel>
								<Select
									value={priorityField.value}
									onValueChange={priorityField.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select priority' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{PRIORITY_OPTIONS.map(option => (
											<SelectItem key={option} value={option}>
												{option}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={`${arrayName}.${index}.pinned` as const}
						render={({ field: pinnedField }) => (
							<FormItem>
								<FormLabel>Pinned</FormLabel>
								<Select
									value={pinnedField.value}
									onValueChange={pinnedField.onChange}>
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
						name={`${arrayName}.${index}.urgent` as const}
						render={({ field: urgentField }) => (
							<FormItem>
								<FormLabel>Urgent</FormLabel>
								<Select
									value={urgentField.value}
									onValueChange={urgentField.onChange}>
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
				</div>

				<FormField
					control={form.control}
					name={`${arrayName}.${index}.description` as const}
					render={({ field: descriptionField }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									rows={4}
									placeholder='Add a short description'
									{...descriptionField}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name={`${arrayName}.${index}.tags` as const}
					render={({ field: tagsField }) => (
						<FormItem>
							<FormLabel>Tags (comma separated)</FormLabel>
							<FormControl>
								<Input placeholder='Exam, Important' {...tagsField} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name={`${arrayName}.${index}.image` as const}
					rules={{ required: 'Image URL is required' }}
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
										form.setValue(`${arrayName}.${index}.image` as const, url, {
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
		);
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Notices & Announcements
						</h3>
						<p className='text-sm text-slate-500'>
							Manage homepage notices and announcements.
						</p>
					</div>
					<div className='flex items-center gap-2'>
						{message && (
							<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						)}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving…' : 'Save changes'}
						</Button>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-semibold text-slate-700'>Notices</h4>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => noticesFieldArray.append(createEmptyNotice())}>
								Add notice
							</Button>
						</div>
						<div className='space-y-4'>
							{noticesFieldArray.fields.map((field, index) =>
								renderNoticeFields(
									index,
									noticesFieldArray.remove,
									'notices',
									field.id
								)
							)}
						</div>
					</div>

					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-semibold text-slate-700'>
								Announcements
							</h4>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() =>
									announcementsFieldArray.append(createEmptyNotice())
								}>
								Add announcement
							</Button>
						</div>
						<div className='space-y-4'>
							{announcementsFieldArray.fields.map((field, index) =>
								renderNoticeFields(
									index,
									announcementsFieldArray.remove,
									'announcements',
									field.id
								)
							)}
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}

export const toFormValuesFromSection = (
	section: NoticesSectionData
): FormValues => ({
	notices: section.notices.map(toFormValue),
	announcements: section.announcements.map(toFormValue)
});
