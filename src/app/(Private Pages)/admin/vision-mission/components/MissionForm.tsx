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
import type { MissionData } from '@/app/(Private Pages)/actions/vision-mission';
import { updateMission } from '@/app/(Private Pages)/actions/vision-mission';
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

type ObjectiveFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: MissionData['objectives'][number]['color'];
};

type ImpactStatFormValue = {
	id: string;
	number: string;
	label: string;
	color: string;
};

type FormValues = {
	heroTitle: string;
	heroSubtitle: string;
	heroIcon: string;
	missionTitle: string;
	missionIcon: string;
	missionQuote: string;
	objectives: ObjectiveFormValue[];
	impactTitle: string;
	impactIcon: string;
	impactStats: ImpactStatFormValue[];
};

type Props = {
	initialData: MissionData;
	pageSlug: string;
	onChange?: (data: MissionData) => void;
	visibleSections?: Array<
		'hero' | 'missionStatement' | 'objectives' | 'impact'
	>;
};

const COLOR_OPTIONS: MissionData['objectives'][number]['color'][] = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'indigo'
];

const createEmptyObjective = (): ObjectiveFormValue => ({
	id: crypto.randomUUID(),
	icon: 'BookOpen',
	title: '',
	description: '',
	color: 'blue'
});
const createEmptyImpactStat = (): ImpactStatFormValue => ({
	id: crypto.randomUUID(),
	number: '',
	label: '',
	color: 'text-green-600'
});

const normalizeMission = (values: Partial<FormValues>): MissionData => {
	const objectives = (values.objectives ?? [])
		.map(o => ({
			icon: o.icon?.trim().length ? o.icon.trim() : 'BookOpen',
			title: (o.title ?? '').trim(),
			description: (o.description ?? '').trim(),
			color: COLOR_OPTIONS.includes(o.color ?? 'blue')
				? o.color ?? 'blue'
				: 'blue'
		}))
		.filter(o => o.title.length > 0 && o.description.length > 0);

	const impactStats = (values.impactStats ?? [])
		.map(s => ({
			number: (s.number ?? '').trim(),
			label: (s.label ?? '').trim(),
			color: (s.color ?? '').trim() || 'text-green-600'
		}))
		.filter(s => s.number.length > 0 && s.label.length > 0);

	return {
		hero: {
			title: (values.heroTitle ?? '').trim() || 'Our Mission',
			subtitle:
				(values.heroSubtitle ?? '').trim() ||
				'Empowering Minds, Building Futures',
			icon: (values.heroIcon ?? '').trim() || 'Target',
			gradient: 'from-green-50 to-emerald-100',
			borderColor: 'border-green-200',
			iconBg: 'bg-green-600'
		},
		missionStatement: {
			title: (values.missionTitle ?? '').trim() || 'Mission Statement',
			icon: (values.missionIcon ?? '').trim() || 'Heart',
			gradient: 'from-green-50 to-emerald-50',
			borderColor: 'border-green-100',
			quote: (values.missionQuote ?? '').trim() || ''
		},
		objectives,
		impact: {
			title: (values.impactTitle ?? '').trim() || 'Mission Impact',
			icon: (values.impactIcon ?? '').trim() || 'Zap',
			gradient: 'from-green-500 to-teal-600',
			stats: impactStats
		}
	};
};

export default function MissionForm({
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
			missionTitle: initialData.missionStatement.title,
			missionIcon: initialData.missionStatement.icon,
			missionQuote: initialData.missionStatement.quote,
			objectives:
				initialData.objectives.length > 0
					? initialData.objectives.map(o => ({
							id: crypto.randomUUID(),
							icon: o.icon,
							title: o.title,
							description: o.description,
							color: o.color
						}))
					: [createEmptyObjective()],
			impactTitle: initialData.impact.title,
			impactIcon: initialData.impact.icon,
			impactStats:
				initialData.impact.stats.length > 0
					? initialData.impact.stats.map(s => ({
							id: crypto.randomUUID(),
							number: s.number,
							label: s.label,
							color: s.color
						}))
					: [createEmptyImpactStat()]
		}
	});

	const objectivesArr = useFieldArray({
		control: form.control,
		name: 'objectives'
	});
	const statsArr = useFieldArray({
		control: form.control,
		name: 'impactStats'
	});

	useEffect(() => {
		onChange?.(normalizeMission(form.getValues()));
		const sub = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				objectives: values.objectives?.filter(Boolean) as ObjectiveFormValue[],
				impactStats: values.impactStats?.filter(
					Boolean
				) as ImpactStatFormValue[]
			};
			onChange?.(normalizeMission(formValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateMission(pageSlug, normalizeMission(values));
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Error updating mission:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const showSection = (
		s: 'hero' | 'missionStatement' | 'objectives' | 'impact'
	) => !visibleSections || visibleSections.includes(s);

	return (
		<AdminForm onSubmit={onSubmit}>
			{showSection('hero') && (
				<AdminFormSection title='Hero section'>
					<AdminFieldGrid>
						<AdminField label='Title'>
							<Input
								placeholder='Our Mission'
								{...form.register('heroTitle')}
							/>
						</AdminField>
						<AdminField label='Subtitle'>
							<Input
								placeholder='Empowering Minds, Building Futures'
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

			{showSection('missionStatement') && (
				<AdminFormSection title='Mission statement'>
					<AdminFieldGrid>
						<AdminField label='Title'>
							<Input
								placeholder='Mission Statement'
								{...form.register('missionTitle')}
							/>
						</AdminField>
						<AdminField label='Icon'>
							<Select
								value={form.watch('missionIcon') || ''}
								onValueChange={v =>
									form.setValue('missionIcon', v, { shouldDirty: true })
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
							placeholder='Mission statement content…'
							{...form.register('missionQuote')}
						/>
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('objectives') && (
				<AdminFormSection title='Mission objectives'>
					<AdminItemList>
						{objectivesArr.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={objectivesArr.fields.length}
								title={
									form.watch(`objectives.${index}.title`) ||
									`Objective ${index + 1}`
								}
								onMove={d => objectivesArr.move(index, index + d)}
								onRemove={
									objectivesArr.fields.length > 1
										? () => objectivesArr.remove(index)
										: undefined
								}>
								<AdminFieldGrid>
									<AdminField label='Icon'>
										<Select
											value={form.watch(`objectives.${index}.icon`) || ''}
											onValueChange={v =>
												form.setValue(`objectives.${index}.icon`, v, {
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
											value={form.watch(`objectives.${index}.color`) || 'blue'}
											onValueChange={v =>
												form.setValue(
													`objectives.${index}.color`,
													v as ObjectiveFormValue['color'],
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
										placeholder='Objective title'
										{...form.register(`objectives.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Description'>
									<Textarea
										rows={3}
										placeholder='Objective description'
										{...form.register(
											`objectives.${index}.description` as const
										)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton
						onClick={() => objectivesArr.append(createEmptyObjective())}>
						Add objective
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('impact') && (
				<AdminFormSection title='Mission impact'>
					<AdminFieldGrid>
						<AdminField label='Title'>
							<Input
								placeholder='Mission Impact'
								{...form.register('impactTitle')}
							/>
						</AdminField>
						<AdminField label='Icon'>
							<Select
								value={form.watch('impactIcon') || ''}
								onValueChange={v =>
									form.setValue('impactIcon', v, { shouldDirty: true })
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
					<AdminItemList>
						{statsArr.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={statsArr.fields.length}
								title={
									form.watch(`impactStats.${index}.label`) ||
									`Statistic ${index + 1}`
								}
								onMove={d => statsArr.move(index, index + d)}
								onRemove={
									statsArr.fields.length > 1
										? () => statsArr.remove(index)
										: undefined
								}>
								<AdminFieldGrid cols={3}>
									<AdminField label='Number'>
										<Input
											placeholder='5000+'
											{...form.register(`impactStats.${index}.number` as const)}
										/>
									</AdminField>
									<AdminField label='Label'>
										<Input
											placeholder='Alumni Making Impact'
											{...form.register(`impactStats.${index}.label` as const)}
										/>
									</AdminField>
									<AdminField label='Color (Tailwind class)'>
										<Input
											placeholder='text-green-600'
											{...form.register(`impactStats.${index}.color` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton
						onClick={() => statsArr.append(createEmptyImpactStat())}>
						Add statistic
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
