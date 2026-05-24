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

const COLOR_OPTIONS = ['blue', 'green', 'purple', 'orange'];

interface ProgramsFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function ProgramsForm({
	initialData,
	onChange
}: ProgramsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			trainingTitle: initialData.trainingTitle || '',
			trainingDescription: initialData.trainingDescription || '',
			trainingPrograms: initialData.trainingPrograms || []
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'trainingPrograms'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					trainingTitle: values.trainingTitle || '',
					trainingDescription: values.trainingDescription || '',
					trainingPrograms: (values.trainingPrograms || []).filter(
						Boolean
					) as TrainingPlacementData['trainingPrograms']
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
					trainingTitle: values.trainingTitle,
					trainingDescription: values.trainingDescription,
					trainingPrograms: values.trainingPrograms
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
				description='Copy shown above the programs grid.'>
				<AdminField label='Section title' htmlFor='tp-prog-title'>
					<Input
						id='tp-prog-title'
						placeholder='Training Programs'
						{...form.register('trainingTitle')}
					/>
				</AdminField>
				<AdminField label='Section description' htmlFor='tp-prog-desc'>
					<Textarea
						id='tp-prog-desc'
						rows={3}
						placeholder='Description…'
						{...form.register('trainingDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Programs'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`trainingPrograms.${index}.title`) ||
								`Program ${index + 1}`
							}
							subtitle={
								form.watch(`trainingPrograms.${index}.duration`) || undefined
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										placeholder='Aptitude Training'
										{...form.register(
											`trainingPrograms.${index}.title` as const
										)}
									/>
								</AdminField>
								<AdminField label='Duration'>
									<Input
										placeholder='3 months'
										{...form.register(
											`trainingPrograms.${index}.duration` as const
										)}
									/>
								</AdminField>
								<AdminField label='Participants'>
									<Input
										placeholder='500+ students'
										{...form.register(
											`trainingPrograms.${index}.participants` as const
										)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={
											form.watch(`trainingPrograms.${index}.icon`) || 'Users'
										}
										onValueChange={v =>
											form.setValue(`trainingPrograms.${index}.icon`, v, {
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
								<AdminField label='Color'>
									<Select
										value={
											form.watch(`trainingPrograms.${index}.color`) || 'blue'
										}
										onValueChange={v =>
											form.setValue(`trainingPrograms.${index}.color`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(color => (
												<SelectItem key={color} value={color}>
													{color}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									placeholder='Program description…'
									{...form.register(
										`trainingPrograms.${index}.description` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No programs yet' />}
				<AddRowButton
					onClick={() =>
						append({
							id: Date.now().toString(),
							title: '',
							description: '',
							duration: '',
							participants: '',
							icon: 'Users',
							color: 'blue'
						})
					}>
					Add program
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
