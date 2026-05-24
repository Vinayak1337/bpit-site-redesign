'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

interface MetricsFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function MetricsForm({ initialData, onChange }: MetricsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			statisticsTitle: initialData.statisticsTitle || '',
			statisticsDescription: initialData.statisticsDescription || '',
			statistics: initialData.statistics || []
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'statistics'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					statisticsTitle: values.statisticsTitle || '',
					statisticsDescription: values.statisticsDescription || '',
					statistics: (values.statistics || []).filter(
						Boolean
					) as TrainingPlacementData['statistics']
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
					statisticsTitle: values.statisticsTitle,
					statisticsDescription: values.statisticsDescription,
					statistics: values.statistics
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
				description='Copy shown above the statistics grid.'>
				<AdminField label='Section title' htmlFor='tp-stats-title'>
					<Input
						id='tp-stats-title'
						placeholder='Our Impact in Numbers'
						{...form.register('statisticsTitle')}
					/>
				</AdminField>
				<AdminField label='Section description' htmlFor='tp-stats-desc'>
					<Textarea
						id='tp-stats-desc'
						rows={3}
						placeholder='Description…'
						{...form.register('statisticsDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Statistics'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`statistics.${index}.label`) ||
								`Statistic ${index + 1}`
							}
							subtitle={form.watch(`statistics.${index}.number`) || undefined}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid cols={3}>
								<AdminField label='Number'>
									<Input
										placeholder='95%'
										{...form.register(`statistics.${index}.number` as const)}
									/>
								</AdminField>
								<AdminField label='Label'>
									<Input
										placeholder='Placement Rate'
										{...form.register(`statistics.${index}.label` as const)}
									/>
								</AdminField>
								<AdminField label='Sublabel'>
									<Input
										placeholder='Academic Year 2024'
										{...form.register(`statistics.${index}.sublabel` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No statistics yet' />}
				<AddRowButton
					onClick={() =>
						append({
							id: Date.now().toString(),
							number: '',
							label: '',
							sublabel: ''
						})
					}>
					Add statistic
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
