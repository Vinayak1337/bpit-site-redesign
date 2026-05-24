'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadButton from '@/components/cloudinary/upload-button';
import {
	updateTrainingPlacement,
	type TrainingPlacementData
} from '@/app/(Private Pages)/actions/training-placement';
import {
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

const DEFAULT_GRADIENT = 'from-blue-500 to-blue-700';

interface DirectorMessageFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function DirectorMessageForm({
	initialData,
	onChange
}: DirectorMessageFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			name: initialData.directorMessage?.name || '',
			position: initialData.directorMessage?.position || '',
			initials: initialData.directorMessage?.initials || '',
			gradientColor:
				initialData.directorMessage?.gradientColor || DEFAULT_GRADIENT,
			message1: initialData.directorMessage?.message1 || '',
			message2: initialData.directorMessage?.message2 || '',
			image: initialData.directorMessage?.image || ''
		}
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					directorMessage: {
						name: values.name || '',
						position: values.position || '',
						initials: values.initials || '',
						gradientColor: values.gradientColor || DEFAULT_GRADIENT,
						message1: values.message1 || '',
						message2: values.message2 || '',
						image: values.image || ''
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
				const updatedData: TrainingPlacementData = {
					...initialData,
					directorMessage: {
						name: values.name,
						position: values.position,
						initials: values.initials,
						gradientColor: values.gradientColor,
						message1: values.message1,
						message2: values.message2,
						image: values.image
					}
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

	const image = form.watch('image');

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title="Director's message"
				description="Identity and message paragraphs shown alongside the director's photo.">
				<AdminFieldGrid>
					<AdminField label='Name' htmlFor='dm-name'>
						<Input
							id='dm-name'
							placeholder='Prof. Name'
							{...form.register('name')}
						/>
					</AdminField>
					<AdminField label='Position' htmlFor='dm-pos'>
						<Input
							id='dm-pos'
							placeholder='Director T&P'
							{...form.register('position')}
						/>
					</AdminField>
					<AdminField label='Initials' htmlFor='dm-init'>
						<Input
							id='dm-init'
							placeholder='AK'
							{...form.register('initials')}
						/>
					</AdminField>
				</AdminFieldGrid>

				<AdminField
					label='Director image'
					htmlFor='dm-img'
					hint='Optional. If empty, initials show on a colored avatar.'>
					<Input
						id='dm-img'
						placeholder='Image URL'
						{...form.register('image')}
					/>
					<div className='mt-2'>
						<UploadButton
							onUpload={url =>
								form.setValue('image', url, { shouldDirty: true })
							}
							buttonText='Upload image'
						/>
					</div>
					{image && (
						<div className='mt-3'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={image}
								alt='Director preview'
								className='h-20 w-20 rounded-full border border-slate-200 object-cover'
							/>
						</div>
					)}
				</AdminField>

				<AdminField label='Message paragraph 1' htmlFor='dm-msg1'>
					<Textarea
						id='dm-msg1'
						rows={4}
						placeholder='First message paragraph…'
						{...form.register('message1')}
					/>
				</AdminField>
				<AdminField label='Message paragraph 2' htmlFor='dm-msg2'>
					<Textarea
						id='dm-msg2'
						rows={4}
						placeholder='Second message paragraph…'
						{...form.register('message2')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
