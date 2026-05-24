'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateStudentLifeOverview,
	type StudentLifeOverviewData
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
	initialData: StudentLifeOverviewData;
	onChange?: (data: StudentLifeOverviewData) => void;
	visibleSections?: Array<'header' | 'highlights'>;
}

export default function OverviewForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<StudentLifeOverviewData>({ defaultValues: initialData });
	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'highlights'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange?.(values as StudentLifeOverviewData);
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
			const result = await updateStudentLifeOverview('student-life', values);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: result.error ?? 'Save failed' }
			);
		});
	});

	const showSection = (section: 'header' | 'highlights') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('header') && (
				<AdminFormSection
					title='Overview'
					description='Headline and intro for the student life landing page.'>
					<AdminField label='Main title' htmlFor='sl-ov-title'>
						<Input id='sl-ov-title' {...form.register('title')} />
					</AdminField>
					<AdminField label='Introduction description' htmlFor='sl-ov-desc'>
						<Textarea id='sl-ov-desc' rows={4} {...form.register('description')} />
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('highlights') && (
				<AdminFormSection title='Highlight cards'>
					<AdminItemList>
						{fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fields.length}
								title={form.watch(`highlights.${index}.title`) || `Card ${index + 1}`}
								subtitle={form.watch(`highlights.${index}.href`) || undefined}
								onMove={d => move(index, index + d)}
								onRemove={() => remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Title'>
										<Input
											{...form.register(`highlights.${index}.title` as const)}
										/>
									</AdminField>
									<AdminField label='Icon name (Lucide)'>
										<Input
											placeholder='e.g. Building2, Users'
											{...form.register(`highlights.${index}.icon` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Link href'>
									<Input
										{...form.register(`highlights.${index}.href` as const)}
									/>
								</AdminField>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										{...form.register(`highlights.${index}.description` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{fields.length === 0 && <AdminEmptyState title='No highlights yet' />}
					<AddRowButton
						onClick={() =>
							append({
								title: '',
								description: '',
								icon: 'Building2',
								href: '/student-life/'
							})
						}>
						Add card
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
