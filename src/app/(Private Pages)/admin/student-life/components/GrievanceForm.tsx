'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateGrievanceCell,
	type GrievanceCellData
} from '@/app/(Private Pages)/actions/student-life';
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

interface Props {
	initialData: GrievanceCellData;
	onChange?: (data: GrievanceCellData) => void;
	visibleSections?: Array<'header' | 'contacts' | 'process'>;
}

export default function GrievanceForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<GrievanceCellData>({ defaultValues: initialData });

	const contacts = useFieldArray({
		control: form.control,
		name: 'contactInfo'
	});
	const steps = useFieldArray({
		control: form.control,
		name: 'processSteps'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange?.(values as GrievanceCellData);
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
			const result = await updateGrievanceCell(
				'student-life-student-grievance-cell',
				values
			);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: result.error ?? 'Save failed' }
			);
		});
	});

	const showSection = (section: 'header' | 'contacts' | 'process') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('header') && (
				<AdminFormSection
					title='Page header'
					description='Title and intro for the grievance cell page.'>
					<AdminField label='Page title' htmlFor='gr-title'>
						<Input id='gr-title' {...form.register('title')} />
					</AdminField>
					<AdminField label='Description' htmlFor='gr-desc'>
						<Textarea id='gr-desc' rows={3} {...form.register('description')} />
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('contacts') && (
				<AdminFormSection title='Contact information'>
					<AdminItemList>
						{contacts.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={contacts.fields.length}
								title={
									form.watch(`contactInfo.${index}.title`) ||
									`Contact ${index + 1}`
								}
								onMove={d => contacts.move(index, index + d)}
								onRemove={() => contacts.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Title'>
										<Input
											{...form.register(
												`contactInfo.${index}.title` as const
											)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										<Input
											{...form.register(`contactInfo.${index}.icon` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Details' hint='Comma separated.'>
									<Input
										value={
											(
												form.watch(`contactInfo.${index}.details`) as
													| string[]
													| undefined
											)?.join(', ') || ''
										}
										onChange={event =>
											form.setValue(
												`contactInfo.${index}.details`,
												event.target.value
													.split(',')
													.map(s => s.trim())
													.filter(Boolean),
												{ shouldDirty: true }
											)
										}
									/>
								</AdminField>
								<AdminField label='Subtitle / timing'>
									<Input
										{...form.register(`contactInfo.${index}.sub` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{contacts.fields.length === 0 && (
						<AdminEmptyState title='No contacts yet' />
					)}
					<AddRowButton
						onClick={() =>
							contacts.append({
								title: 'New Contact',
								icon: 'Phone',
								details: [],
								sub: ''
							})
						}>
						Add contact
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('process') && (
				<AdminFormSection title='Process steps'>
					<AdminItemList>
						{steps.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={steps.fields.length}
								title={
									form.watch(`processSteps.${index}.title`) ||
									`Step ${index + 1}`
								}
								onMove={d => steps.move(index, index + d)}
								onRemove={() => steps.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Step number'>
										<Input
											type='number'
											{...form.register(`processSteps.${index}.step` as const, {
												valueAsNumber: true
											})}
										/>
									</AdminField>
									<AdminField label='Title'>
										<Input
											{...form.register(`processSteps.${index}.title` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										{...form.register(
											`processSteps.${index}.description` as const
										)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{steps.fields.length === 0 && <AdminEmptyState title='No steps yet' />}
					<AddRowButton
						onClick={() =>
							steps.append({
								step: steps.fields.length + 1,
								title: 'New Step',
								description: ''
							})
						}>
						Add step
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
