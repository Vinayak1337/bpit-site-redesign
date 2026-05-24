'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import {
	updateTrainingPlacement,
	type TrainingPlacementData
} from '@/app/(Private Pages)/actions/training-placement';
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

interface ObjectivesFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function ObjectivesForm({
	initialData,
	onChange
}: ObjectivesFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			objectivesTitle: initialData.objectivesTitle || '',
			objectivesDescription: initialData.objectivesDescription || '',
			objectives: initialData.objectives || []
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'objectives'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					objectivesTitle: values.objectivesTitle || '',
					objectivesDescription: values.objectivesDescription || '',
					objectives: (values.objectives || []).filter(
						Boolean
					) as TrainingPlacementData['objectives']
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
				const updatedData: TrainingPlacementData = {
					...initialData,
					objectivesTitle: values.objectivesTitle,
					objectivesDescription: values.objectivesDescription,
					objectives: values.objectives
				};
				await updateTrainingPlacement(updatedData);
				onChange?.(updatedData);
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
				title='Section heading'
				description='Copy shown above the objectives list.'>
				<AdminField label='Section title' htmlFor='obj-title'>
					<Input
						id='obj-title'
						placeholder='T&P Cell Objectives'
						{...form.register('objectivesTitle')}
					/>
				</AdminField>
				<AdminField label='Section description' htmlFor='obj-desc'>
					<Textarea
						id='obj-desc'
						rows={3}
						placeholder='Description…'
						{...form.register('objectivesDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Objectives'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`objectives.${index}.title`) ||
								`Objective ${index + 1}`
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										placeholder='Objective title'
										{...form.register(`objectives.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`objectives.${index}.icon`) || 'CheckCircle'}
										onValueChange={v =>
											form.setValue(`objectives.${index}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{SUPPORTED_ICON_NAMES.slice(0, 20).map(icon => (
												<SelectItem key={icon} value={icon}>
													{icon}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									placeholder='Objective description…'
									{...form.register(`objectives.${index}.description` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No objectives yet' />}
				<AddRowButton
					onClick={() =>
						append({
							id: Date.now().toString(),
							title: '',
							description: '',
							icon: 'CheckCircle'
						})
					}>
					Add objective
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
