'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
		.filter(
			feature => feature.title.length > 0 && feature.description.length > 0
		);

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
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

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
			setStatus(current => (current.kind === 'idle' ? current : { kind: 'idle' }));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const payload = normalizeLegacy(values);
		startTransition(async () => {
			const result = await updateAboutLegacy(pageSlug, payload);
			if (!result.ok) {
				setStatus({ kind: 'error', message: 'Save failed' });
				return;
			}
			setStatus({ kind: 'success', message: 'Saved' });
		});
	});

	const iconOptions = useMemo(
		() => Array.from(new Set(SUPPORTED_ICON_NAMES)),
		[]
	);

	const titleError = form.formState.errors.title?.message;

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Legacy'
				description='Story content and highlight cards shown on the About page.'>
				<AdminField
					label='Section title'
					htmlFor='about-legacy-title'
					error={titleError}>
					<Input
						id='about-legacy-title'
						placeholder='Our Legacy'
						{...form.register('title', { required: 'Title is required' })}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Paragraphs'>
				<AdminItemList>
					{paragraphsArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={paragraphsArray.fields.length}
							title={`Paragraph ${index + 1}`}
							onMove={dir =>
								paragraphsArray.move(index, index + dir)
							}
							onRemove={() => paragraphsArray.remove(index)}>
							<AdminField label={`Paragraph ${index + 1}`} className='[&_label]:sr-only'>
								<Textarea
									rows={4}
									placeholder='Write a paragraph about BPIT legacy…'
									{...form.register(`paragraphs.${index}.value` as const, {
										required: 'Paragraph cannot be empty'
									})}
								/>
								{form.formState.errors.paragraphs?.[index]?.value?.message && (
									<p className='mt-1 text-xs text-rose-600'>
										{form.formState.errors.paragraphs[index]?.value?.message as string}
									</p>
								)}
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{paragraphsArray.fields.length === 0 && (
					<AdminEmptyState
						title='No paragraphs yet'
						description='Add at least one paragraph to describe BPIT legacy.'
					/>
				)}
				<AddRowButton onClick={() => paragraphsArray.append(createParagraph())}>
					Add paragraph
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Features'>
				<AdminItemList>
					{featuresArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={featuresArray.fields.length}
							title={`Feature ${index + 1}`}
							onMove={dir => featuresArray.move(index, index + dir)}
							onRemove={() => featuresArray.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										placeholder='Academic Excellence'
										{...form.register(`features.${index}.title` as const, {
											required: 'Title is required'
										})}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`features.${index}.icon`) || DEFAULT_ICON}
										onValueChange={value =>
											form.setValue(`features.${index}.icon`, value, {
												shouldDirty: true
											})
										}>
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
								</AdminField>
								<AdminField label='Color'>
									<Select
										value={form.watch(`features.${index}.color`) || 'blue'}
										onValueChange={value =>
											form.setValue(
												`features.${index}.color`,
												value as FeatureFormValue['color'],
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select color' />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(color => (
												<SelectItem key={color} value={color}>
													{color.charAt(0).toUpperCase() + color.slice(1)}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									placeholder='Describe the highlight…'
									{...form.register(
										`features.${index}.description` as const,
										{ required: 'Description is required' }
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{featuresArray.fields.length === 0 && (
					<AdminEmptyState
						title='No features yet'
						description='Add feature cards to showcase BPIT strengths.'
					/>
				)}
				<AddRowButton onClick={() => featuresArray.append(createFeature())}>
					Add feature
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
