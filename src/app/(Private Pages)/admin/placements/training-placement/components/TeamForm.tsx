'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadButton from '@/components/cloudinary/upload-button';
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

interface TeamFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function TeamForm({ initialData, onChange }: TeamFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			teamTitle: initialData.teamTitle || '',
			teamDescription: initialData.teamDescription || '',
			teamMembers: initialData.teamMembers || []
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'teamMembers'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					teamTitle: values.teamTitle || '',
					teamDescription: values.teamDescription || '',
					teamMembers: (values.teamMembers || []).filter(
						Boolean
					) as TrainingPlacementData['teamMembers']
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
					teamTitle: values.teamTitle,
					teamDescription: values.teamDescription,
					teamMembers: values.teamMembers
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
				description='Copy shown above the team grid.'>
				<AdminField label='Section title' htmlFor='tm-title'>
					<Input
						id='tm-title'
						placeholder='Our Dedicated Team'
						{...form.register('teamTitle')}
					/>
				</AdminField>
				<AdminField label='Section description' htmlFor='tm-desc'>
					<Textarea
						id='tm-desc'
						rows={3}
						placeholder='Meet our team…'
						{...form.register('teamDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Team members'>
				<AdminItemList>
					{fields.map((field, index) => {
						const image = form.watch(`teamMembers.${index}.image`);
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fields.length}
								title={
									form.watch(`teamMembers.${index}.name`) ||
									`Member ${index + 1}`
								}
								subtitle={
									form.watch(`teamMembers.${index}.position`) || undefined
								}
								onMove={d => move(index, index + d)}
								onRemove={() => remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Name'>
										<Input
											placeholder='Dr. John Doe'
											{...form.register(`teamMembers.${index}.name` as const)}
										/>
									</AdminField>
									<AdminField label='Position'>
										<Input
											placeholder='Training Coordinator'
											{...form.register(`teamMembers.${index}.position` as const)}
										/>
									</AdminField>
									<AdminField label='Qualifications'>
										<Input
											placeholder='Ph.D., M.Tech'
											{...form.register(
												`teamMembers.${index}.qualifications` as const
											)}
										/>
									</AdminField>
									<AdminField label='Specialization'>
										<Input
											placeholder='Career Development'
											{...form.register(
												`teamMembers.${index}.specialization` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Profile image'>
									<Input
										placeholder='Image URL'
										{...form.register(`teamMembers.${index}.image` as const)}
									/>
									<div className='mt-2'>
										<UploadButton
											onUpload={url =>
												form.setValue(`teamMembers.${index}.image`, url, {
													shouldDirty: true
												})
											}
											buttonText='Upload image'
										/>
									</div>
									{image && (
										<div className='mt-3'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={image}
												alt='Preview'
												className='h-20 w-20 rounded-full border border-slate-200 object-cover'
											/>
										</div>
									)}
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No team members yet' />}
				<AddRowButton
					onClick={() =>
						append({
							id: Date.now().toString(),
							name: '',
							position: '',
							qualifications: '',
							specialization: '',
							image: ''
						})
					}>
					Add member
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
