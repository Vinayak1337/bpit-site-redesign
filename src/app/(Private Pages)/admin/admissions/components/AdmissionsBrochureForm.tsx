'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	type AdmissionsBrochureConfig,
	type AdmissionsBrochureItem,
	updateAdmissionsBrochureConfig,
	updateAdmissionsBrochureItems
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
	AdminToggle,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

type BrochurePageData = {
	config: AdmissionsBrochureConfig;
	items: AdmissionsBrochureItem[];
};

type Props = {
	initialData: BrochurePageData;
	onChange?: (data: BrochurePageData) => void;
	visibleSections?: Array<'config' | 'items'>;
};

type FormValues = {
	heroBadge: string;
	heroTitle: string;
	heroSubtitle: string;
	autoDetectEnabled: boolean;
	emptyStateTitle: string;
	emptyStateDescription: string;
	items: Array<{
		id: string;
		title: string;
		description: string;
		icon: string;
		url: string;
		lastUpdated: string;
	}>;
};

const createItem = () => ({
	id: createClientId('admissions-brochure-item'),
	title: '',
	description: '',
	icon: 'FileText',
	url: '',
	lastUpdated: ''
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

const normalizeData = (values: FormValues): BrochurePageData => ({
	config: {
		heroBadge: values.heroBadge.trim(),
		heroTitle: values.heroTitle.trim(),
		heroSubtitle: values.heroSubtitle.trim(),
		autoDetectEnabled: values.autoDetectEnabled,
		emptyStateTitle: values.emptyStateTitle.trim(),
		emptyStateDescription: values.emptyStateDescription.trim()
	},
	items: values.items
		.map(item => ({
			id: item.id.trim(),
			title: item.title.trim(),
			description: item.description.trim(),
			icon: item.icon.trim(),
			url: item.url.trim(),
			lastUpdated: item.lastUpdated.trim()
		}))
		.filter(item => item.id && item.title && item.description && item.url)
});

export default function AdmissionsBrochureForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const defaults = useMemo<FormValues>(
		() => ({
			heroBadge: initialData.config.heroBadge,
			heroTitle: initialData.config.heroTitle,
			heroSubtitle: initialData.config.heroSubtitle,
			autoDetectEnabled: initialData.config.autoDetectEnabled,
			emptyStateTitle: initialData.config.emptyStateTitle,
			emptyStateDescription: initialData.config.emptyStateDescription,
			items:
				initialData.items.length > 0
					? initialData.items.map(item => ({
							id: item.id,
							title: item.title,
							description: item.description,
							icon: item.icon,
							url: item.url,
							lastUpdated: item.lastUpdated ?? ''
						}))
					: [createItem()]
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const itemsArray = useFieldArray({ control: form.control, name: 'items' });

	useEffect(() => {
		form.reset(defaults);
	}, [defaults, form]);

	useEffect(() => {
		onChange?.(normalizeData(form.getValues()));
		const sub = form.watch(values => {
			onChange?.(normalizeData(values as FormValues));
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
			if (includes(visibleSections, 'config'))
				tasks.push(updateAdmissionsBrochureConfig(payload.config));
			if (includes(visibleSections, 'items'))
				tasks.push(updateAdmissionsBrochureItems(payload.items));
			const results = await Promise.all(tasks);
			setStatus(
				results.every(r => r.ok)
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	const autoDetect = form.watch('autoDetectEnabled');

	return (
		<AdminForm onSubmit={handleSubmit}>
			{includes(visibleSections, 'config') && (
				<AdminFormSection
					title='Page config'
					description='Hero messaging, auto-detect behavior, and empty-state copy.'>
					<AdminField label='Hero badge' htmlFor='br-badge'>
						<Input id='br-badge' {...form.register('heroBadge')} />
					</AdminField>
					<AdminField label='Hero title' htmlFor='br-title'>
						<Input id='br-title' {...form.register('heroTitle')} />
					</AdminField>
					<AdminField label='Hero subtitle' htmlFor='br-sub'>
						<Textarea
							id='br-sub'
							rows={3}
							className='resize-none'
							{...form.register('heroSubtitle')}
						/>
					</AdminField>
					<AdminToggle
						label='Auto-detect brochure links'
						description='If enabled, brochure links are auto-discovered from public pages.'
						checked={autoDetect}
						onChange={v =>
							form.setValue('autoDetectEnabled', v, { shouldDirty: true })
						}
					/>
					<AdminField label='Empty state title' htmlFor='br-empty-title'>
						<Input id='br-empty-title' {...form.register('emptyStateTitle')} />
					</AdminField>
					<AdminField label='Empty state description' htmlFor='br-empty-desc'>
						<Textarea
							id='br-empty-desc'
							rows={3}
							className='resize-none'
							{...form.register('emptyStateDescription')}
						/>
					</AdminField>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'items') && (
				<AdminFormSection title='Brochure items'>
					<AdminItemList>
						{itemsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={itemsArray.fields.length}
								title={form.watch(`items.${index}.title`) || `Brochure ${index + 1}`}
								subtitle={form.watch(`items.${index}.url`) || undefined}
								onMove={d => itemsArray.move(index, index + d)}
								onRemove={() => itemsArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Item ID'>
										<Input {...form.register(`items.${index}.id` as const)} />
									</AdminField>
									<AdminField label='Icon'>
										<Select
											value={form.watch(`items.${index}.icon`) || 'FileText'}
											onValueChange={v =>
												form.setValue(`items.${index}.icon`, v, {
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
								</AdminFieldGrid>
								<AdminField label='Title'>
									<Input {...form.register(`items.${index}.title` as const)} />
								</AdminField>
								<AdminField label='Description'>
									<Textarea
										rows={3}
										className='resize-none'
										{...form.register(`items.${index}.description` as const)}
									/>
								</AdminField>
								<AdminField label='Brochure URL'>
									<Input
										placeholder='https://…'
										{...form.register(`items.${index}.url` as const)}
									/>
								</AdminField>
								<AdminField label='Last updated text'>
									<Input
										placeholder='Updated January 2026'
										{...form.register(`items.${index}.lastUpdated` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{itemsArray.fields.length === 0 && (
						<AdminEmptyState title='No brochures yet' />
					)}
					<AddRowButton onClick={() => itemsArray.append(createItem())}>
						Add brochure
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
