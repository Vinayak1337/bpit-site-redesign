'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';
import { updatePlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';
import {
	AddRowButton,
	AdminEmptyState,
	AdminField,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

type FormValues = {
	missionTitle: string;
	missionDescription: string;
	missionContent: {
		paragraph1: string;
		paragraph2: string;
		features: { value: string }[];
		objectives: { value: string }[];
	};
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

export default function MissionForm({ initialData, pageSlug, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			missionTitle: initialData.missionTitle || '',
			missionDescription: initialData.missionDescription || '',
			missionContent: {
				paragraph1: initialData.missionContent?.paragraph1 || '',
				paragraph2: initialData.missionContent?.paragraph2 || '',
				features: (initialData.missionContent?.features || ['']).map(f => ({
					value: f
				})),
				objectives: (initialData.missionContent?.objectives || ['']).map(o => ({
					value: o
				}))
			}
		}
	});

	const features = useFieldArray({
		control: form.control,
		name: 'missionContent.features'
	});
	const objectives = useFieldArray({
		control: form.control,
		name: 'missionContent.objectives'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					missionTitle: values.missionTitle || '',
					missionDescription: values.missionDescription || '',
					missionContent: {
						paragraph1: values.missionContent?.paragraph1 || '',
						paragraph2: values.missionContent?.paragraph2 || '',
						features: (values.missionContent?.features || [])
							.map(f => f?.value || '')
							.filter(f => f.trim().length > 0),
						objectives: (values.missionContent?.objectives || [])
							.map(o => o?.value || '')
							.filter(o => o.trim().length > 0)
					}
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
					missionTitle: values.missionTitle,
					missionDescription: values.missionDescription,
					missionContent: {
						paragraph1: values.missionContent.paragraph1,
						paragraph2: values.missionContent.paragraph2,
						features: values.missionContent.features
							.map(f => f.value)
							.filter(f => f.trim().length > 0),
						objectives: values.missionContent.objectives
							.map(o => o.value)
							.filter(o => o.trim().length > 0)
					}
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
				title='Mission section'
				description='Headline copy and the two mission paragraphs.'>
				<AdminField label='Mission title' htmlFor='mi-title'>
					<Input
						id='mi-title'
						placeholder='Our Mission'
						{...form.register('missionTitle')}
					/>
				</AdminField>
				<AdminField label='Mission description' htmlFor='mi-desc'>
					<Textarea
						id='mi-desc'
						rows={3}
						placeholder='Brief description of the mission'
						{...form.register('missionDescription')}
					/>
				</AdminField>
				<AdminField label='Paragraph 1' htmlFor='mi-p1'>
					<Textarea
						id='mi-p1'
						rows={4}
						{...form.register('missionContent.paragraph1')}
					/>
				</AdminField>
				<AdminField label='Paragraph 2' htmlFor='mi-p2'>
					<Textarea
						id='mi-p2'
						rows={4}
						{...form.register('missionContent.paragraph2')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Features'>
				<AdminItemList>
					{features.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={features.fields.length}
							title={`Feature ${index + 1}`}
							onMove={d => features.move(index, index + d)}
							onRemove={() => features.remove(index)}>
							<AdminField label={`Feature ${index + 1}`} className='[&_label]:sr-only'>
								<Input
									placeholder='Feature text'
									{...form.register(
										`missionContent.features.${index}.value` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{features.fields.length === 0 && (
					<AdminEmptyState title='No features yet' />
				)}
				<AddRowButton onClick={() => features.append({ value: '' })}>
					Add feature
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Key objectives'>
				<AdminItemList>
					{objectives.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={objectives.fields.length}
							title={`Objective ${index + 1}`}
							onMove={d => objectives.move(index, index + d)}
							onRemove={() => objectives.remove(index)}>
							<AdminField
								label={`Objective ${index + 1}`}
								className='[&_label]:sr-only'>
								<Input
									placeholder='Objective text'
									{...form.register(
										`missionContent.objectives.${index}.value` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{objectives.fields.length === 0 && (
					<AdminEmptyState title='No objectives yet' />
				)}
				<AddRowButton onClick={() => objectives.append({ value: '' })}>
					Add objective
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
