'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray, type FieldArrayPath } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateCodeOfConduct,
	type CodeOfConductData
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
	initialData: CodeOfConductData;
	onChange?: (data: CodeOfConductData) => void;
	visibleSections?: Array<'header' | 'rules' | 'note'>;
}

export default function ConductForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<CodeOfConductData>({ defaultValues: initialData });
	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'sections' as FieldArrayPath<CodeOfConductData>
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange?.(values as CodeOfConductData);
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
			const result = await updateCodeOfConduct(
				'student-life-code-of-conduct',
				values
			);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: result.error ?? 'Save failed' }
			);
		});
	});

	const showSection = (section: 'header' | 'rules' | 'note') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('header') && (
				<AdminFormSection
					title='Page header'
					description='Title and intro for the code of conduct page.'>
					<AdminField label='Page title' htmlFor='cc-title'>
						<Input id='cc-title' {...form.register('title')} />
					</AdminField>
					<AdminField label='Description' htmlFor='cc-desc'>
						<Textarea id='cc-desc' rows={3} {...form.register('description')} />
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('rules') && (
				<AdminFormSection title='Rule sections'>
					<AdminItemList>
						{fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fields.length}
								title={
									form.watch(`sections.${index}.category`) ||
									`Section ${index + 1}`
								}
								onMove={d => move(index, index + d)}
								onRemove={() => remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Category name'>
										<Input
											{...form.register(`sections.${index}.category` as const)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										<Input
											placeholder='e.g. Shield, BookOpen'
											{...form.register(`sections.${index}.icon` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField
									label='Rules (one per line)'
									hint='Each line becomes one rule bullet.'>
									<Textarea
										rows={5}
										value={
											(form.watch(`sections.${index}.rules`) as string[] | undefined)?.join('\n') || ''
										}
										onChange={event =>
											form.setValue(
												`sections.${index}.rules`,
												event.target.value.split('\n').filter(Boolean),
												{ shouldDirty: true }
											)
										}
										placeholder='Enter each rule on a new line…'
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{fields.length === 0 && <AdminEmptyState title='No rule sections yet' />}
					<AddRowButton
						onClick={() =>
							append({ category: 'New Category', icon: 'BookOpen', rules: [] })
						}>
						Add section
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('note') && (
				<AdminFormSection title='Static note'>
					<p className='text-sm text-slate-500'>
						The note card on this page is static and has no editable fields.
					</p>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
