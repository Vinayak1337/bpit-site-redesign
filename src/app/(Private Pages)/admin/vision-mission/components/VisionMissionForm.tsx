'use client';

import { useEffect, useState, useTransition } from 'react';
import type { UseFieldArrayReturn } from 'react-hook-form';
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
import type { VisionMissionData } from '@/app/(Private Pages)/actions/vision-mission';
import { updateVisionMission } from '@/app/(Private Pages)/actions/vision-mission';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import {
	AddRowButton,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

type PillarFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: VisionMissionData['pillars'][number]['color'];
};
type AspirationFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: VisionMissionData['aspirations'][number]['color'];
};

type FormValues = {
	heroTitle: string;
	heroSubtitle: string;
	heroIcon: string;
	visionTitle: string;
	visionIcon: string;
	visionQuote: string;
	pillars: PillarFormValue[];
	aspirations: AspirationFormValue[];
};

type Props = {
	initialData: VisionMissionData;
	pageSlug: string;
	onChange?: (data: VisionMissionData) => void;
	visibleSections?: Array<
		'hero' | 'visionStatement' | 'pillars' | 'aspirations'
	>;
};

const COLOR_OPTIONS: VisionMissionData['pillars'][number]['color'][] = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'indigo'
];

const createEmptyPillar = (): PillarFormValue => ({
	id: crypto.randomUUID(),
	icon: 'Eye',
	title: '',
	description: '',
	color: 'blue'
});
const createEmptyAspiration = (): AspirationFormValue => ({
	id: crypto.randomUUID(),
	icon: 'TrendingUp',
	title: '',
	description: '',
	color: 'blue'
});

const normalizeVisionMission = (
	values: Partial<FormValues>
): VisionMissionData => {
	const mapItems = <T extends PillarFormValue | AspirationFormValue>(
		list: T[] | undefined,
		fallbackIcon: string
	) =>
		(list ?? [])
			.map(i => ({
				icon: i.icon?.trim().length ? i.icon.trim() : fallbackIcon,
				title: (i.title ?? '').trim(),
				description: (i.description ?? '').trim(),
				color: COLOR_OPTIONS.includes(i.color ?? 'blue')
					? i.color ?? 'blue'
					: 'blue'
			}))
			.filter(i => i.title.length > 0 && i.description.length > 0);

	return {
		hero: {
			title: (values.heroTitle ?? '').trim() || 'Our Vision',
			subtitle:
				(values.heroSubtitle ?? '').trim() ||
				'Inspiring Excellence, Shaping Tomorrow',
			icon: (values.heroIcon ?? '').trim() || 'Eye',
			gradient: 'from-blue-50 to-indigo-100',
			borderColor: 'border-blue-200',
			iconBg: 'bg-blue-600'
		},
		visionStatement: {
			title: (values.visionTitle ?? '').trim() || 'Vision Statement',
			icon: (values.visionIcon ?? '').trim() || 'Compass',
			gradient: 'from-blue-50 to-indigo-50',
			borderColor: 'border-blue-100',
			quote: (values.visionQuote ?? '').trim() || ''
		},
		pillars: mapItems(values.pillars, 'Eye'),
		aspirations: mapItems(values.aspirations, 'TrendingUp')
	};
};

function ItemListSection({
	title,
	addLabel,
	fieldName,
	array,
	form,
	defaultIcon,
	createEmpty
}: {
	title: string;
	addLabel: string;
	fieldName: 'pillars' | 'aspirations';
	array: UseFieldArrayReturn<FormValues, 'pillars' | 'aspirations', 'id'>;
	form: ReturnType<typeof useForm<FormValues>>;
	defaultIcon: string;
	createEmpty: () => PillarFormValue | AspirationFormValue;
}) {
	return (
		<AdminFormSection title={title}>
			<AdminItemList>
				{array.fields.map((field, index) => (
					<AdminItemCard
						key={field.id}
						index={index}
						total={array.fields.length}
						title={
							form.watch(`${fieldName}.${index}.title`) || `Item ${index + 1}`
						}
						onMove={d => array.move(index, index + d)}
						onRemove={
							array.fields.length > 1 ? () => array.remove(index) : undefined
						}>
						<AdminFieldGrid>
							<AdminField label='Icon'>
								<Select
									value={form.watch(`${fieldName}.${index}.icon`) || defaultIcon}
									onValueChange={v =>
										form.setValue(`${fieldName}.${index}.icon`, v, {
											shouldDirty: true
										})
									}>
									<SelectTrigger>
										<SelectValue placeholder='Select an icon' />
									</SelectTrigger>
									<SelectContent>
										{SUPPORTED_ICON_NAMES.map(icon => (
											<SelectItem key={icon} value={icon}>
												{icon}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</AdminField>
							<AdminField label='Color'>
								<Select
									value={form.watch(`${fieldName}.${index}.color`) || 'blue'}
									onValueChange={v =>
										form.setValue(
											`${fieldName}.${index}.color`,
											v as PillarFormValue['color'],
											{ shouldDirty: true }
										)
									}>
									<SelectTrigger>
										<SelectValue placeholder='Select a color' />
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
						<AdminField label='Title'>
							<Input
								placeholder='Item title'
								{...form.register(`${fieldName}.${index}.title` as const)}
							/>
						</AdminField>
						<AdminField label='Description'>
							<Textarea
								rows={3}
								placeholder='Item description'
								{...form.register(`${fieldName}.${index}.description` as const)}
							/>
						</AdminField>
					</AdminItemCard>
				))}
			</AdminItemList>
			<AddRowButton onClick={() => array.append(createEmpty())}>
				{addLabel}
			</AddRowButton>
		</AdminFormSection>
	);
}

export default function VisionMissionForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			heroTitle: initialData.hero.title,
			heroSubtitle: initialData.hero.subtitle,
			heroIcon: initialData.hero.icon,
			visionTitle: initialData.visionStatement.title,
			visionIcon: initialData.visionStatement.icon,
			visionQuote: initialData.visionStatement.quote,
			pillars:
				initialData.pillars.length > 0
					? initialData.pillars.map(p => ({
							id: crypto.randomUUID(),
							icon: p.icon,
							title: p.title,
							description: p.description,
							color: p.color
						}))
					: [createEmptyPillar()],
			aspirations:
				initialData.aspirations.length > 0
					? initialData.aspirations.map(a => ({
							id: crypto.randomUUID(),
							icon: a.icon,
							title: a.title,
							description: a.description,
							color: a.color
						}))
					: [createEmptyAspiration()]
		}
	});

	const pillarsArr = useFieldArray({ control: form.control, name: 'pillars' });
	const aspirationsArr = useFieldArray({
		control: form.control,
		name: 'aspirations'
	});

	useEffect(() => {
		onChange?.(normalizeVisionMission(form.getValues()));
		const sub = form.watch(values => {
			onChange?.(
				normalizeVisionMission({
					...values,
					pillars: values.pillars?.filter(Boolean) as PillarFormValue[],
					aspirations: values.aspirations?.filter(
						Boolean
					) as AspirationFormValue[]
				})
			);
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
			try {
				await updateVisionMission(pageSlug, normalizeVisionMission(values));
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Error updating vision-mission:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const showSection = (
		s: 'hero' | 'visionStatement' | 'pillars' | 'aspirations'
	) => !visibleSections || visibleSections.includes(s);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('hero') && (
				<AdminFormSection title='Hero section'>
					<AdminFieldGrid>
						<AdminField label='Title'>
							<Input
								placeholder='Our Vision'
								{...form.register('heroTitle')}
							/>
						</AdminField>
						<AdminField label='Subtitle'>
							<Input
								placeholder='Inspiring Excellence, Shaping Tomorrow'
								{...form.register('heroSubtitle')}
							/>
						</AdminField>
						<AdminField label='Icon'>
							<Select
								value={form.watch('heroIcon') || ''}
								onValueChange={v =>
									form.setValue('heroIcon', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select an icon' />
								</SelectTrigger>
								<SelectContent>
									{SUPPORTED_ICON_NAMES.map(icon => (
										<SelectItem key={icon} value={icon}>
											{icon}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
					</AdminFieldGrid>
				</AdminFormSection>
			)}

			{showSection('visionStatement') && (
				<AdminFormSection title='Vision statement'>
					<AdminFieldGrid>
						<AdminField label='Title'>
							<Input
								placeholder='Vision Statement'
								{...form.register('visionTitle')}
							/>
						</AdminField>
						<AdminField label='Icon'>
							<Select
								value={form.watch('visionIcon') || ''}
								onValueChange={v =>
									form.setValue('visionIcon', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select an icon' />
								</SelectTrigger>
								<SelectContent>
									{SUPPORTED_ICON_NAMES.map(icon => (
										<SelectItem key={icon} value={icon}>
											{icon}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Quote'>
						<Textarea
							rows={4}
							placeholder='Vision statement content…'
							{...form.register('visionQuote')}
						/>
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('pillars') && (
				<ItemListSection
					title='Pillars'
					addLabel='Add pillar'
					fieldName='pillars'
					array={pillarsArr}
					form={form}
					defaultIcon='Eye'
					createEmpty={createEmptyPillar}
				/>
			)}

			{showSection('aspirations') && (
				<ItemListSection
					title='Aspirations'
					addLabel='Add aspiration'
					fieldName='aspirations'
					array={aspirationsArr}
					form={form}
					defaultIcon='TrendingUp'
					createEmpty={createEmptyAspiration}
				/>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
