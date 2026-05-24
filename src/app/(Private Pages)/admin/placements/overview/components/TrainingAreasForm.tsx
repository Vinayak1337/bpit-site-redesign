'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
import { Plus, X } from 'lucide-react';
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

type TrainingAreaFormValue = {
	id: string;
	title: string;
	skills: string[];
	icon: string;
	iconColor: string;
	textColor: string;
};

type FormValues = {
	trainingTitle: string;
	trainingDescription: string;
	trainingAreas: TrainingAreaFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const FALLBACK_ICON = 'GraduationCap';

const createEmptyTrainingArea = (): TrainingAreaFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	skills: [''],
	icon: FALLBACK_ICON,
	iconColor: 'blue',
	textColor: 'black'
});

export default function TrainingAreasForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			trainingTitle: initialData.trainingTitle || '',
			trainingDescription: initialData.trainingDescription || '',
			trainingAreas:
				initialData.trainingAreas.length > 0
					? initialData.trainingAreas
					: [createEmptyTrainingArea()]
		}
	});

	const trainingAreas = useFieldArray({
		control: form.control,
		name: 'trainingAreas'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					trainingTitle: values.trainingTitle || '',
					trainingDescription: values.trainingDescription || '',
					trainingAreas: (values.trainingAreas || [])
						.map(area => ({
							id: area?.id || crypto.randomUUID(),
							title: (area?.title ?? '').trim(),
							skills: (area?.skills ?? []).filter(
								(skill): skill is string =>
									typeof skill === 'string' && skill.trim().length > 0
							),
							icon: area?.icon?.trim().length
								? area.icon.trim()
								: FALLBACK_ICON,
							iconColor: area?.iconColor ?? 'blue',
							textColor: area?.textColor ?? 'black'
						}))
						.filter(area => area.title.length > 0 && area.skills.length > 0)
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
					trainingTitle: values.trainingTitle,
					trainingDescription: values.trainingDescription,
					trainingAreas: values.trainingAreas
						.map(area => ({
							id: area.id,
							title: (area.title ?? '').trim(),
							skills: (area.skills ?? []).filter(
								skill => skill.trim().length > 0
							),
							icon: area.icon?.trim().length ? area.icon.trim() : FALLBACK_ICON,
							iconColor: area.iconColor ?? 'blue',
							textColor: area.textColor ?? 'black'
						}))
						.filter(area => area.title.length > 0 && area.skills.length > 0)
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
				title='Training section'
				description='Headline copy shown above the training areas grid.'>
				<AdminField label='Training title' htmlFor='ta-title'>
					<Input
						id='ta-title'
						placeholder='Technical Training Areas'
						{...form.register('trainingTitle')}
					/>
				</AdminField>
				<AdminField label='Training description' htmlFor='ta-desc'>
					<Textarea
						id='ta-desc'
						rows={3}
						placeholder='Brief description of training programs'
						{...form.register('trainingDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Training areas'>
				<AdminItemList>
					{trainingAreas.fields.map((field, index) => {
						const skills = form.watch(`trainingAreas.${index}.skills`) || [''];
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={trainingAreas.fields.length}
								title={
									form.watch(`trainingAreas.${index}.title`) ||
									`Training area ${index + 1}`
								}
								onMove={d => trainingAreas.move(index, index + d)}
								onRemove={() => trainingAreas.remove(index)}>
								<AdminField label='Title'>
									<Input
										placeholder='e.g. Core Technologies'
										{...form.register(
											`trainingAreas.${index}.title` as const,
											{ required: true }
										)}
									/>
								</AdminField>
								<AdminFieldGrid>
									<AdminField label='Icon'>
										<Select
											value={
												form.watch(`trainingAreas.${index}.icon`) ||
												FALLBACK_ICON
											}
											onValueChange={v =>
												form.setValue(`trainingAreas.${index}.icon`, v, {
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
												`trainingAreas.${index}.iconColor` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Skills'>
									<div className='flex flex-col gap-2'>
										{skills.map((_, skillIndex) => (
											<div key={skillIndex} className='flex gap-2'>
												<Input
													placeholder='Skill name'
													{...form.register(
														`trainingAreas.${index}.skills.${skillIndex}` as const
													)}
												/>
												<Button
													type='button'
													variant='ghost'
													size='icon'
													onClick={() => {
														const current =
															form.getValues(
																`trainingAreas.${index}.skills`
															) || [];
														form.setValue(
															`trainingAreas.${index}.skills`,
															current.filter((_, i) => i !== skillIndex),
															{ shouldDirty: true }
														);
													}}
													className='text-slate-500 hover:bg-rose-50 hover:text-rose-600'
													aria-label='Remove skill'>
													<X className='h-4 w-4' />
												</Button>
											</div>
										))}
									</div>
									<Button
										type='button'
										variant='outline'
										onClick={() => {
											const current =
												form.getValues(`trainingAreas.${index}.skills`) || [];
											form.setValue(`trainingAreas.${index}.skills`, [
												...current,
												''
											], { shouldDirty: true });
										}}
										className='mt-2'>
										<Plus className='mr-2 h-4 w-4' />
										Add skill
									</Button>
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{trainingAreas.fields.length === 0 && (
					<AdminEmptyState title='No training areas yet' />
				)}
				<AddRowButton
					onClick={() => trainingAreas.append(createEmptyTrainingArea())}>
					Add training area
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
