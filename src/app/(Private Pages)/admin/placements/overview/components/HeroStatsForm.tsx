'use client';

import { useEffect, useState, useTransition } from 'react';
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
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';
import { updatePlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';
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

type HeroFormValue = {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
	iconColor: string;
	textColor: string;
};

type StatFormValue = {
	id: string;
	icon: string;
	value: string;
	label: string;
	iconColor: string;
	textColor: string;
};

type FormValues = {
	hero: HeroFormValue;
	stats: StatFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const GRADIENT_OPTIONS: string[] = [
	'bg-gradient-to-br from-blue-600 to-purple-600',
	'bg-gradient-to-br from-green-600 to-blue-600',
	'bg-gradient-to-br from-purple-600 to-pink-600',
	'bg-gradient-to-br from-orange-600 to-red-600',
	'bg-gradient-to-br from-indigo-600 to-purple-600'
];

const FALLBACK_ICON = 'GraduationCap';

const createEmptyStat = (): StatFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	value: '',
	label: '',
	iconColor: 'blue',
	textColor: 'black'
});

export default function HeroStatsForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			hero: initialData.hero || {
				icon: FALLBACK_ICON,
				title: '',
				subtitle: '',
				gradient: GRADIENT_OPTIONS[0],
				iconColor: 'bg-blue-500',
				textColor: 'text-white'
			},
			stats:
				initialData.stats.length > 0 ? initialData.stats : [createEmptyStat()]
		}
	});

	const stats = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					hero: {
						icon: values.hero?.icon || initialData.hero.icon,
						title: values.hero?.title || initialData.hero.title,
						subtitle: values.hero?.subtitle || initialData.hero.subtitle,
						gradient: values.hero?.gradient || initialData.hero.gradient,
						iconColor: values.hero?.iconColor || initialData.hero.iconColor,
						textColor: values.hero?.textColor || initialData.hero.textColor
					},
					stats: (values.stats || [])
						.map(stat => ({
							icon: stat?.icon?.trim().length
								? stat.icon.trim()
								: FALLBACK_ICON,
							value: (stat?.value ?? '').trim(),
							label: (stat?.label ?? '').trim(),
							iconColor: stat?.iconColor ?? 'blue',
							textColor: stat?.textColor ?? 'black'
						}))
						.filter(stat => stat.value.length > 0 && stat.label.length > 0)
				});
				setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
			}
		});
		return () => sub.unsubscribe();
	}, [form, onChange, initialData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				const updatedData: PlacementOverviewData = {
					...initialData,
					hero: values.hero,
					stats: values.stats
						.map(stat => ({
							icon: stat.icon?.trim().length ? stat.icon.trim() : FALLBACK_ICON,
							value: (stat.value ?? '').trim(),
							label: (stat.label ?? '').trim(),
							iconColor: stat.iconColor ?? 'blue',
							textColor: stat.textColor ?? 'black'
						}))
						.filter(stat => stat.value.length > 0 && stat.label.length > 0)
				};
				await updatePlacementOverview(pageSlug, updatedData);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Failed to save:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Hero section'
				description='Headline copy, icon, and gradient for the page hero.'>
				<AdminField label='Title' htmlFor='hs-title'>
					<Input
						id='hs-title'
						placeholder='Training & Placement Cell'
						{...form.register('hero.title')}
					/>
				</AdminField>
				<AdminField label='Subtitle' htmlFor='hs-sub'>
					<Textarea
						id='hs-sub'
						rows={3}
						placeholder='Bridging Academia and Industry Excellence'
						{...form.register('hero.subtitle')}
					/>
				</AdminField>
				<AdminFieldGrid>
					<AdminField label='Icon'>
						<Select
							value={form.watch('hero.icon') || FALLBACK_ICON}
							onValueChange={v =>
								form.setValue('hero.icon', v, { shouldDirty: true })
							}>
							<SelectTrigger>
								<SelectValue placeholder='Select icon' />
							</SelectTrigger>
							<SelectContent>
								{SUPPORTED_ICON_NAMES.map(option => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</AdminField>
					<AdminField label='Gradient'>
						<Select
							value={form.watch('hero.gradient') || GRADIENT_OPTIONS[0]}
							onValueChange={v =>
								form.setValue('hero.gradient', v, { shouldDirty: true })
							}>
							<SelectTrigger>
								<SelectValue placeholder='Select gradient' />
							</SelectTrigger>
							<SelectContent>
								{GRADIENT_OPTIONS.map(option => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</AdminField>
				</AdminFieldGrid>
				<AdminFieldGrid>
					<AdminField label='Icon background color'>
						<Input
							placeholder='bg-blue-500'
							{...form.register('hero.iconColor')}
						/>
					</AdminField>
					<AdminField label='Text color'>
						<Input
							placeholder='text-white'
							{...form.register('hero.textColor')}
						/>
					</AdminField>
				</AdminFieldGrid>
			</AdminFormSection>

			<AdminFormSection title='Statistics'>
				<AdminItemList>
					{stats.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={stats.fields.length}
							title={
								form.watch(`stats.${index}.label`) || `Stat ${index + 1}`
							}
							subtitle={form.watch(`stats.${index}.value`) || undefined}
							onMove={d => stats.move(index, index + d)}
							onRemove={() => stats.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Value'>
									<Input
										placeholder='500+'
										{...form.register(`stats.${index}.value` as const, {
											required: true
										})}
									/>
								</AdminField>
								<AdminField label='Label'>
									<Input
										placeholder='Companies Visited'
										{...form.register(`stats.${index}.label` as const, {
											required: true
										})}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`stats.${index}.icon`) || FALLBACK_ICON}
										onValueChange={v =>
											form.setValue(`stats.${index}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select icon' />
										</SelectTrigger>
										<SelectContent>
											{SUPPORTED_ICON_NAMES.map(option => (
												<SelectItem key={option} value={option}>
													{option}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Icon color'>
									<Input
										placeholder='bg-blue-500'
										{...form.register(`stats.${index}.iconColor` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{stats.fields.length === 0 && <AdminEmptyState title='No stats yet' />}
				<AddRowButton onClick={() => stats.append(createEmptyStat())}>
					Add stat
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
