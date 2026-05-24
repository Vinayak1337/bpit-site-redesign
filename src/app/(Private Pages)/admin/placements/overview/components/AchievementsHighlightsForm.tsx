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

type AchievementFormValue = {
	id: string;
	title: string;
	description: string;
	icon: string;
	highlight: string;
	category: string;
	department: string;
	iconColor: string;
	categoryColor: string;
	highlightColor: string;
};

type HighlightFormValue = {
	id: string;
	department: string;
	maxPackage: string;
	avgPackage: string;
	color: string;
	initials: string;
};

type FormValues = {
	achievementsTitle: string;
	achievementsDescription: string;
	achievements: AchievementFormValue[];
	highlightsTitle: string;
	highlightsDescription: string;
	highlights: HighlightFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const FALLBACK_ICON = 'GraduationCap';

const createEmptyAchievement = (): AchievementFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	description: '',
	icon: FALLBACK_ICON,
	highlight: '',
	category: '',
	department: '',
	iconColor: 'blue',
	categoryColor: 'blue',
	highlightColor: 'blue'
});

const createEmptyHighlight = (): HighlightFormValue => ({
	id: crypto.randomUUID(),
	department: '',
	maxPackage: '',
	avgPackage: '',
	color: 'blue',
	initials: ''
});

export default function AchievementsHighlightsForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			achievementsTitle: initialData.achievementsTitle || '',
			achievementsDescription: initialData.achievementsDescription || '',
			achievements:
				initialData.achievements.length > 0
					? initialData.achievements
					: [createEmptyAchievement()],
			highlightsTitle: initialData.highlightsTitle || '',
			highlightsDescription: initialData.highlightsDescription || '',
			highlights:
				initialData.highlights.length > 0
					? initialData.highlights
					: [createEmptyHighlight()]
		}
	});

	const achievements = useFieldArray({
		control: form.control,
		name: 'achievements'
	});
	const highlights = useFieldArray({
		control: form.control,
		name: 'highlights'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					achievementsTitle: values.achievementsTitle || '',
					achievementsDescription: values.achievementsDescription || '',
					achievements: (values.achievements || [])
						.map(a => ({
							id: a?.id || crypto.randomUUID(),
							title: (a?.title ?? '').trim(),
							description: (a?.description ?? '').trim(),
							icon: a?.icon?.trim().length ? a.icon.trim() : FALLBACK_ICON,
							highlight: (a?.highlight ?? '').trim(),
							category: (a?.category ?? '').trim(),
							department: (a?.department ?? '').trim(),
							iconColor: a?.iconColor ?? 'blue',
							categoryColor: a?.categoryColor ?? 'blue',
							highlightColor: a?.highlightColor ?? 'blue'
						}))
						.filter(a => a.title.length > 0),
					highlightsTitle: values.highlightsTitle || '',
					highlightsDescription: values.highlightsDescription || '',
					highlights: (values.highlights || [])
						.map(h => ({
							id: h?.id || crypto.randomUUID(),
							department: (h?.department ?? '').trim(),
							maxPackage: (h?.maxPackage ?? '').trim(),
							avgPackage: (h?.avgPackage ?? '').trim(),
							color: h?.color ?? 'blue',
							initials: (h?.initials ?? '').trim()
						}))
						.filter(h => h.department.length > 0)
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
					achievementsTitle: values.achievementsTitle,
					achievementsDescription: values.achievementsDescription,
					achievements: values.achievements
						.map(a => ({
							id: a.id,
							title: (a.title ?? '').trim(),
							description: (a.description ?? '').trim(),
							icon: a.icon?.trim().length ? a.icon.trim() : FALLBACK_ICON,
							highlight: (a.highlight ?? '').trim(),
							category: (a.category ?? '').trim(),
							department: (a.department ?? '').trim(),
							iconColor: a.iconColor ?? 'blue',
							categoryColor: a.categoryColor ?? 'blue',
							highlightColor: a.highlightColor ?? 'blue'
						}))
						.filter(a => a.title.length > 0),
					highlightsTitle: values.highlightsTitle,
					highlightsDescription: values.highlightsDescription,
					highlights: values.highlights
						.map(h => ({
							id: h.id,
							department: (h.department ?? '').trim(),
							maxPackage: (h.maxPackage ?? '').trim(),
							avgPackage: (h.avgPackage ?? '').trim(),
							color: h.color ?? 'blue',
							initials: (h.initials ?? '').trim()
						}))
						.filter(h => h.department.length > 0)
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
				title='Achievements section'
				description='Headline copy shown above the achievements list.'>
				<AdminField label='Title' htmlFor='ah-title'>
					<Input
						id='ah-title'
						placeholder='Notable Achievements'
						{...form.register('achievementsTitle')}
					/>
				</AdminField>
				<AdminField label='Description' htmlFor='ah-desc'>
					<Textarea
						id='ah-desc'
						rows={3}
						placeholder='Brief description of achievements'
						{...form.register('achievementsDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Achievements'>
				<AdminItemList>
					{achievements.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={achievements.fields.length}
							title={
								form.watch(`achievements.${index}.title`) ||
								`Achievement ${index + 1}`
							}
							subtitle={
								form.watch(`achievements.${index}.category`) || undefined
							}
							onMove={d => achievements.move(index, index + d)}
							onRemove={() => achievements.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										placeholder='Achievement title'
										{...form.register(
											`achievements.${index}.title` as const,
											{ required: true }
										)}
									/>
								</AdminField>
								<AdminField label='Category'>
									<Input
										placeholder='e.g. Placement Record'
										{...form.register(
											`achievements.${index}.category` as const
										)}
									/>
								</AdminField>
								<AdminField label='Highlight'>
									<Input
										placeholder='e.g. 95% Success Rate'
										{...form.register(
											`achievements.${index}.highlight` as const
										)}
									/>
								</AdminField>
								<AdminField label='Department'>
									<Input
										placeholder='Department name'
										{...form.register(
											`achievements.${index}.department` as const
										)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={
											form.watch(`achievements.${index}.icon`) || FALLBACK_ICON
										}
										onValueChange={v =>
											form.setValue(`achievements.${index}.icon`, v, {
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
										placeholder='from-blue-500 to-blue-700'
										{...form.register(
											`achievements.${index}.iconColor` as const
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={2}
									placeholder='Achievement description'
									{...form.register(
										`achievements.${index}.description` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{achievements.fields.length === 0 && (
					<AdminEmptyState title='No achievements yet' />
				)}
				<AddRowButton
					onClick={() => achievements.append(createEmptyAchievement())}>
					Add achievement
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection
				title='Highlights section'
				description='Headline copy shown above the department highlight cards.'>
				<AdminField label='Highlights title' htmlFor='hl-title'>
					<Input
						id='hl-title'
						placeholder='Placement Highlights'
						{...form.register('highlightsTitle')}
					/>
				</AdminField>
				<AdminField label='Highlights description' htmlFor='hl-desc'>
					<Textarea
						id='hl-desc'
						rows={3}
						placeholder='Brief description of highlights'
						{...form.register('highlightsDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Department highlights'>
				<AdminItemList>
					{highlights.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={highlights.fields.length}
							title={
								form.watch(`highlights.${index}.department`) ||
								`Highlight ${index + 1}`
							}
							subtitle={form.watch(`highlights.${index}.initials`) || undefined}
							onMove={d => highlights.move(index, index + d)}
							onRemove={() => highlights.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Department'>
									<Input
										placeholder='e.g. Computer Science'
										{...form.register(
											`highlights.${index}.department` as const,
											{ required: true }
										)}
									/>
								</AdminField>
								<AdminField label='Initials'>
									<Input
										placeholder='CSE'
										{...form.register(`highlights.${index}.initials` as const)}
									/>
								</AdminField>
								<AdminField label='Max package'>
									<Input
										placeholder='₹45 LPA'
										{...form.register(
											`highlights.${index}.maxPackage` as const
										)}
									/>
								</AdminField>
								<AdminField label='Average package'>
									<Input
										placeholder='₹8.5 LPA'
										{...form.register(
											`highlights.${index}.avgPackage` as const
										)}
									/>
								</AdminField>
								<AdminField label='Color'>
									<Input
										placeholder='from-blue-500 to-blue-700'
										{...form.register(`highlights.${index}.color` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{highlights.fields.length === 0 && (
					<AdminEmptyState title='No highlights yet' />
				)}
				<AddRowButton
					onClick={() => highlights.append(createEmptyHighlight())}>
					Add highlight
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
