'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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
type NoticeListMode = 'notices' | 'announcements';

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
	pinned: boolean;
	urgent: boolean;
	link: string;
};

type FormValues = {
	items: NoticeFormValue[];
};

type NoticesSectionFormProps = {
	mode: NoticeListMode;
	initialItems: Notice[];
	otherItems: Notice[];
	pageSlug: string;
	onSaved?: (section: NoticesSectionData) => void;
};

const FORM_META: Record<
	NoticeListMode,
	{ title: string; description: string; singular: string }
> = {
	notices: {
		title: 'Notices',
		description: 'Manage homepage notices.',
		singular: 'Notice'
	},
	announcements: {
		title: 'Announcements',
		description: 'Manage homepage announcements.',
		singular: 'Announcement'
	}
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
	pinned: false,
	urgent: false,
	link: '/'
});

const toNotice = (value: NoticeFormValue): Notice | null => {
	const title = value.title.trim();
	const description = value.description.trim();
	if (title.length === 0 && description.length === 0) return null;

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
		pinned: value.pinned,
		urgent: value.urgent,
		link: value.link.trim().length > 0 ? value.link.trim() : '/'
	};
};

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
	tags: notice.tags.join(', '),
	description: notice.description,
	pinned: Boolean(notice.pinned),
	urgent: Boolean(notice.urgent),
	link: notice.link
});

const normalizeFormValues = (values: Partial<FormValues>): Notice[] =>
	(values.items ?? [])
		.map(toNotice)
		.filter((n): n is Notice => n !== null);

const buildSectionPayload = (
	mode: NoticeListMode,
	currentItems: Notice[],
	otherItems: Notice[]
): NoticesSectionData =>
	mode === 'notices'
		? { notices: currentItems, announcements: otherItems }
		: { notices: otherItems, announcements: currentItems };

export default function NoticesSectionForm({
	mode,
	initialItems,
	otherItems,
	pageSlug,
	onSaved
}: NoticesSectionFormProps) {
	const defaults = useMemo<FormValues>(
		() => ({
			items:
				initialItems.length > 0
					? initialItems.map(toFormValue)
					: [createEmptyNotice()]
		}),
		[initialItems]
	);
	const form = useForm<FormValues>({ defaultValues: defaults });
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const meta = FORM_META[mode];

	const fieldArray = useFieldArray({ control: form.control, name: 'items' });

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const currentItems = normalizeFormValues(values);
		const payload = buildSectionPayload(mode, currentItems, otherItems);
		startTransition(async () => {
			const result = await updateNoticesSection(pageSlug, payload);
			if (!result.ok) {
				setStatus({ kind: 'error', message: 'Save failed' });
				return;
			}
			setStatus({ kind: 'success', message: 'Saved' });
			onSaved?.(payload);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection title={meta.title} description={meta.description}>
				<AdminItemList>
					{fieldArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fieldArray.fields.length}
							title={
								form.watch(`items.${index}.title`) ||
								`${meta.singular} ${index + 1}`
							}
							subtitle={form.watch(`items.${index}.subtitle`) || undefined}
							onMove={d => fieldArray.move(index, index + d)}
							onRemove={
								fieldArray.fields.length > 1
									? () => fieldArray.remove(index)
									: undefined
							}>
							<AdminFieldGrid>
								<AdminField
									label='Title'
									error={
										form.formState.errors.items?.[index]?.title?.message
									}>
									<Input
										placeholder='Enter title'
										{...form.register(`items.${index}.title` as const, {
											required: 'Title is required'
										})}
									/>
								</AdminField>
								<AdminField label='Subtitle'>
									<Input
										placeholder='Enter subtitle'
										{...form.register(`items.${index}.subtitle` as const)}
									/>
								</AdminField>
								<AdminField
									label='Date'
									error={
										form.formState.errors.items?.[index]?.date?.message
									}>
									<Input
										type='date'
										{...form.register(`items.${index}.date` as const, {
											required: 'Date is required'
										})}
									/>
								</AdminField>
								<AdminField label='Time'>
									<Input
										placeholder='10:00 AM'
										{...form.register(`items.${index}.time` as const)}
									/>
								</AdminField>
								<AdminField label='Category'>
									<Select
										value={form.watch(`items.${index}.category`) || 'General'}
										onValueChange={v =>
											form.setValue(
												`items.${index}.category`,
												v as CategoryOption,
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select category' />
										</SelectTrigger>
										<SelectContent>
											{CATEGORY_OPTIONS.map(option => (
												<SelectItem key={option} value={option}>
													{option}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Priority'>
									<Select
										value={form.watch(`items.${index}.priority`) || 'medium'}
										onValueChange={v =>
											form.setValue(
												`items.${index}.priority`,
												v as PriorityOption,
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select priority' />
										</SelectTrigger>
										<SelectContent>
											{PRIORITY_OPTIONS.map(option => (
												<SelectItem key={option} value={option}>
													{option}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField
									label='Link'
									error={
										form.formState.errors.items?.[index]?.link?.message
									}>
									<Input
										placeholder='/'
										{...form.register(`items.${index}.link` as const, {
											required: 'Link is required',
											validate: value =>
												value.startsWith('/') ||
												value.startsWith('http://') ||
												value.startsWith('https://')
													? true
													: 'Link must start with "/" or "http(s)://"'
										})}
									/>
								</AdminField>
								<AdminField label='Tags (comma separated)'>
									<Input
										placeholder='Exam, Important'
										{...form.register(`items.${index}.tags` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>

							<AdminField label='Description'>
								<Textarea
									rows={4}
									placeholder='Add a short description'
									{...form.register(`items.${index}.description` as const)}
								/>
							</AdminField>

							<AdminField label='Image URL'>
								<Input
									placeholder='https://…'
									{...form.register(`items.${index}.image` as const)}
								/>
								<div className='mt-2 flex flex-wrap gap-2'>
									<CloudinaryUploadButton
										buttonText='Upload image'
										onUpload={url =>
											form.setValue(`items.${index}.image` as const, url, {
												shouldDirty: true
											})
										}
									/>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() =>
											form.setValue(`items.${index}.image` as const, '', {
												shouldDirty: true
											})
										}>
										Clear
									</Button>
								</div>
							</AdminField>

							<AdminToggle
								label='Pinned'
								description='Pinned items rise to the top of the list.'
								checked={form.watch(`items.${index}.pinned`) ?? false}
								onChange={v =>
									form.setValue(`items.${index}.pinned` as const, v, {
										shouldDirty: true
									})
								}
							/>
							<AdminToggle
								label='Urgent'
								description='Urgent items show the urgent indicator on the homepage.'
								checked={form.watch(`items.${index}.urgent`) ?? false}
								onChange={v =>
									form.setValue(`items.${index}.urgent` as const, v, {
										shouldDirty: true
									})
								}
							/>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fieldArray.fields.length === 0 && (
					<AdminEmptyState title={`No ${meta.singular.toLowerCase()}s yet`} />
				)}
				<AddRowButton onClick={() => fieldArray.append(createEmptyNotice())}>
					Add {meta.singular.toLowerCase()}
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
