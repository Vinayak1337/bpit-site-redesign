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

interface CoordinatorsFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function CoordinatorsForm({
	initialData,
	onChange
}: CoordinatorsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			departmentsTitle: initialData.departmentsTitle || '',
			departmentsDescription: initialData.departmentsDescription || '',
			departments: initialData.departments || []
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'departments'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					departmentsTitle: values.departmentsTitle || '',
					departmentsDescription: values.departmentsDescription || '',
					departments: (values.departments || []).filter(
						Boolean
					) as TrainingPlacementData['departments']
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
					departmentsTitle: values.departmentsTitle,
					departmentsDescription: values.departmentsDescription,
					departments: values.departments
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
				description='Copy shown above the department coordinator list.'>
				<AdminField label='Section title' htmlFor='dep-title'>
					<Input
						id='dep-title'
						placeholder='Department-wise Placement Coordinators'
						{...form.register('departmentsTitle')}
					/>
				</AdminField>
				<AdminField label='Section description' htmlFor='dep-desc'>
					<Textarea
						id='dep-desc'
						rows={3}
						placeholder='Description…'
						{...form.register('departmentsDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Departments'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`departments.${index}.name`) ||
								`Department ${index + 1}`
							}
							subtitle={form.watch(`departments.${index}.code`) || undefined}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Department name'>
									<Input
										placeholder='Computer Science'
										{...form.register(`departments.${index}.name` as const)}
									/>
								</AdminField>
								<AdminField label='Code'>
									<Input
										placeholder='CSE'
										{...form.register(`departments.${index}.code` as const)}
									/>
								</AdminField>
								<AdminField label='Coordinator'>
									<Input
										placeholder='Dr. John Doe'
										{...form.register(`departments.${index}.coordinator` as const)}
									/>
								</AdminField>
								<AdminField label='Companies'>
									<Input
										placeholder='150+'
										{...form.register(`departments.${index}.companies` as const)}
									/>
								</AdminField>
								<AdminField label='Avg package'>
									<Input
										placeholder='8.5 LPA'
										{...form.register(`departments.${index}.avgPackage` as const)}
									/>
								</AdminField>
								<AdminField label='Placement rate'>
									<Input
										placeholder='95%'
										{...form.register(`departments.${index}.placementRate` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No departments yet' />}
				<AddRowButton
					onClick={() =>
						append({
							id: Date.now().toString(),
							name: '',
							code: '',
							coordinator: '',
							companies: '',
							avgPackage: '',
							placementRate: ''
						})
					}>
					Add department
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
