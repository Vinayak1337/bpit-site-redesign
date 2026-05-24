'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	type AdmissionsScholarshipCategory,
	type AdmissionsScholarshipIntro,
	type AdmissionsScholarshipNotesSection,
	type AdmissionsScholarshipSupport,
	updateAdmissionsScholarshipCategories,
	updateAdmissionsScholarshipIntro,
	updateAdmissionsScholarshipNotes,
	updateAdmissionsScholarshipSupport
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_ICON_NAMES } from '@/lib/admissions-icons';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { createClientId } from '@/lib/utils';
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

type ScholarshipPageData = {
	intro: AdmissionsScholarshipIntro;
	categories: AdmissionsScholarshipCategory[];
	notes: AdmissionsScholarshipNotesSection;
	support: AdmissionsScholarshipSupport;
};

type Props = {
	initialData: ScholarshipPageData;
	onChange?: (data: ScholarshipPageData) => void;
	visibleSections?: Array<'intro' | 'categories' | 'notes' | 'support'>;
};

type FormValues = {
	introBadge: string;
	introTitle: string;
	introSubtitle: string;
	beforeApplyTitle: string;
	beforeApplyDescription: string;
	categories: Array<{
		id: string;
		title: string;
		icon: string;
		badge: string;
		accent: string;
		scholarshipsText: string;
		portal: string;
		portalUrl: string;
	}>;
	notesTitle: string;
	notesDescription: string;
	notesItems: Array<{ id: string; value: string }>;
	supportTitle: string;
	supportDescription: string;
	supportEmail: string;
	supportPhone: string;
};

const createCategory = () => ({
	id: createClientId('admissions-scholarship-category'),
	title: '',
	icon: 'Award',
	badge: '',
	accent: 'text-blue-700 bg-blue-100',
	scholarshipsText: '',
	portal: '',
	portalUrl: ''
});

const createNote = () => ({
	id: createClientId('admissions-scholarship-note'),
	value: ''
});

const splitLines = (value: string) =>
	value.split('\n').map(i => i.trim()).filter(Boolean);

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

const normalizeData = (values: FormValues): ScholarshipPageData => ({
	intro: {
		badge: values.introBadge.trim(),
		title: values.introTitle.trim(),
		subtitle: values.introSubtitle.trim(),
		beforeApplyTitle: values.beforeApplyTitle.trim(),
		beforeApplyDescription: values.beforeApplyDescription.trim()
	},
	categories: values.categories
		.map(c => ({
			title: c.title.trim(),
			icon: c.icon.trim(),
			badge: c.badge.trim(),
			accent: c.accent.trim(),
			scholarships: splitLines(c.scholarshipsText),
			portal: c.portal.trim(),
			portalUrl: c.portalUrl.trim()
		}))
		.filter(c => c.title && c.badge),
	notes: {
		eyebrow: '',
		title: values.notesTitle.trim(),
		description: values.notesDescription.trim(),
		items: values.notesItems.map(i => i.value.trim()).filter(Boolean)
	},
	support: {
		title: values.supportTitle.trim(),
		description: values.supportDescription.trim(),
		email: values.supportEmail.trim(),
		phone: values.supportPhone.trim()
	}
});

export default function AdmissionsScholarshipForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const defaults = useMemo<FormValues>(
		() => ({
			introBadge: initialData.intro.badge,
			introTitle: initialData.intro.title,
			introSubtitle: initialData.intro.subtitle,
			beforeApplyTitle: initialData.intro.beforeApplyTitle,
			beforeApplyDescription: initialData.intro.beforeApplyDescription,
			categories:
				initialData.categories.length > 0
					? initialData.categories.map((c, i) => ({
							id: `scholarship-category-${i}`,
							title: c.title,
							icon: c.icon,
							badge: c.badge,
							accent: c.accent,
							scholarshipsText: c.scholarships.join('\n'),
							portal: c.portal ?? '',
							portalUrl: c.portalUrl ?? ''
						}))
					: [createCategory()],
			notesTitle: initialData.notes.title,
			notesDescription: initialData.notes.description,
			notesItems:
				initialData.notes.items.length > 0
					? initialData.notes.items.map((item, i) => ({
							id: `scholarship-note-${i}`,
							value: item
						}))
					: [createNote()],
			supportTitle: initialData.support.title,
			supportDescription: initialData.support.description,
			supportEmail: initialData.support.email,
			supportPhone: initialData.support.phone
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const categoriesArray = useFieldArray({
		control: form.control,
		name: 'categories'
	});
	const notesArray = useFieldArray({
		control: form.control,
		name: 'notesItems'
	});

	useEffect(() => {
		form.reset(defaults);
	}, [defaults, form]);

	useEffect(() => {
		onChange?.(normalizeData(form.getValues()));
		const sub = form.watch(v => {
			onChange?.(normalizeData(v as FormValues));
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
		const payload = normalizeData(values);
		startTransition(async () => {
			const tasks: Promise<{ ok: boolean }>[] = [];
			if (includes(visibleSections, 'intro'))
				tasks.push(updateAdmissionsScholarshipIntro(payload.intro));
			if (includes(visibleSections, 'categories'))
				tasks.push(
					updateAdmissionsScholarshipCategories(payload.categories)
				);
			if (includes(visibleSections, 'notes'))
				tasks.push(updateAdmissionsScholarshipNotes(payload.notes));
			if (includes(visibleSections, 'support'))
				tasks.push(updateAdmissionsScholarshipSupport(payload.support));
			const results = await Promise.all(tasks);
			setStatus(
				results.every(r => r.ok)
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			{includes(visibleSections, 'intro') && (
				<AdminFormSection title='Intro'>
					<AdminField label='Badge'>
						<Input {...form.register('introBadge')} />
					</AdminField>
					<AdminField label='Title'>
						<Input {...form.register('introTitle')} />
					</AdminField>
					<AdminField label='Subtitle'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('introSubtitle')}
						/>
					</AdminField>
					<AdminField label='Before apply title'>
						<Input {...form.register('beforeApplyTitle')} />
					</AdminField>
					<AdminField label='Before apply description'>
						<Textarea
							rows={4}
							className='resize-none'
							{...form.register('beforeApplyDescription')}
						/>
					</AdminField>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'categories') && (
				<AdminFormSection title='Portal categories'>
					<AdminItemList>
						{categoriesArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={categoriesArray.fields.length}
								title={
									form.watch(`categories.${index}.title`) ||
									`Category ${index + 1}`
								}
								subtitle={form.watch(`categories.${index}.badge`) || undefined}
								onMove={d => categoriesArray.move(index, index + d)}
								onRemove={() => categoriesArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Title'>
										<Input
											{...form.register(`categories.${index}.title` as const)}
										/>
									</AdminField>
									<AdminField label='Badge'>
										<Input
											{...form.register(`categories.${index}.badge` as const)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										<Select
											value={form.watch(`categories.${index}.icon`) || 'Award'}
											onValueChange={v =>
												form.setValue(`categories.${index}.icon`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select icon' />
											</SelectTrigger>
											<SelectContent>
												{ADMISSIONS_ICON_NAMES.map(icon => (
													<SelectItem key={icon} value={icon}>
														{icon}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Accent classes'>
										<Input
											{...form.register(`categories.${index}.accent` as const)}
										/>
									</AdminField>
									<AdminField label='Portal label'>
										<Input
											{...form.register(`categories.${index}.portal` as const)}
										/>
									</AdminField>
									<AdminField label='Portal URL'>
										<Input
											placeholder='https://…'
											{...form.register(
												`categories.${index}.portalUrl` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField
									label='Scholarships'
									hint='Use one line per scholarship.'>
									<Textarea
										rows={5}
										className='resize-none'
										placeholder='One scholarship per line'
										{...form.register(
											`categories.${index}.scholarshipsText` as const
										)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{categoriesArray.fields.length === 0 && (
						<AdminEmptyState title='No categories yet' />
					)}
					<AddRowButton
						onClick={() => categoriesArray.append(createCategory())}>
						Add category
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'notes') && (
				<AdminFormSection title='Notes'>
					<AdminField label='Title'>
						<Input {...form.register('notesTitle')} />
					</AdminField>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('notesDescription')}
						/>
					</AdminField>
					<AdminItemList>
						{notesArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={notesArray.fields.length}
								title={`Note ${index + 1}`}
								onMove={d => notesArray.move(index, index + d)}
								onRemove={() => notesArray.remove(index)}>
								<AdminField label='Note'>
									<Textarea
										rows={2}
										className='resize-none'
										{...form.register(`notesItems.${index}.value` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{notesArray.fields.length === 0 && (
						<AdminEmptyState title='No notes yet' />
					)}
					<AddRowButton onClick={() => notesArray.append(createNote())}>
						Add note
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'support') && (
				<AdminFormSection title='Support'>
					<AdminField label='Title'>
						<Input {...form.register('supportTitle')} />
					</AdminField>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('supportDescription')}
						/>
					</AdminField>
					<AdminFieldGrid>
						<AdminField label='Email'>
							<Input {...form.register('supportEmail')} />
						</AdminField>
						<AdminField label='Phone'>
							<Input {...form.register('supportPhone')} />
						</AdminField>
					</AdminFieldGrid>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
