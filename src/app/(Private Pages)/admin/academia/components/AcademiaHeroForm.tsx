'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	updateAcademiaHero,
	type AcademiaHeroData
} from '@/app/(Private Pages)/actions/academia';
import {
	AdminField,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

type FormValues = {
	title: string;
	subtitle: string;
	backgroundImage: string;
	gradient: string;
};

type Props = {
	initialData: AcademiaHeroData;
	pageSlug: string;
	onChange?: (data: AcademiaHeroData) => void;
};

const normalizeHero = (values: Partial<FormValues>): AcademiaHeroData => ({
	title: (values.title ?? '').trim(),
	subtitle: (values.subtitle ?? '').trim(),
	gradient: (values.gradient ?? '').trim() || 'from-blue-600 to-blue-700',
	backgroundImage:
		(values.backgroundImage ?? '').trim().length > 0
			? (values.backgroundImage ?? '').trim()
			: null
});

export default function AcademiaHeroForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const form = useForm<FormValues>({
		defaultValues: {
			title: initialData.title,
			subtitle: initialData.subtitle,
			backgroundImage: initialData.backgroundImage ?? '',
			gradient: initialData.gradient ?? 'from-blue-600 to-blue-700'
		}
	});

	useEffect(() => {
		onChange?.(normalizeHero(form.getValues()));
		const sub = form.watch(v => {
			onChange?.(normalizeHero(v));
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
			const result = await updateAcademiaHero(pageSlug, normalizeHero(values));
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: result.error ?? 'Save failed' }
			);
		});
	});

	const backgroundImage = form.watch('backgroundImage');

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Academia hero'
				description='Headline, description, gradient, and background image for the Academia section.'>
				<AdminField
					label='Title'
					htmlFor='aca-title'
					error={form.formState.errors.title?.message}>
					<Input
						id='aca-title'
						placeholder='Academia'
						{...form.register('title', { required: 'Title is required' })}
					/>
				</AdminField>
				<AdminField
					label='Subtitle'
					htmlFor='aca-sub'
					error={form.formState.errors.subtitle?.message}>
					<Textarea
						id='aca-sub'
						rows={3}
						placeholder='Explore our academic resources…'
						{...form.register('subtitle', { required: 'Subtitle is required' })}
					/>
				</AdminField>
				<AdminField
					label='Gradient'
					htmlFor='aca-grad'
					hint='Tailwind classes, e.g. from-blue-600 to-blue-700.'>
					<Input
						id='aca-grad'
						placeholder='from-blue-600 to-blue-700'
						{...form.register('gradient')}
					/>
				</AdminField>
				<AdminField label='Background image' htmlFor='aca-bg'>
					<Input
						id='aca-bg'
						placeholder='https://…'
						{...form.register('backgroundImage')}
					/>
					<div className='mt-2 flex flex-wrap gap-2'>
						<CloudinaryUploadButton
							buttonText='Upload image'
							onUpload={url =>
								form.setValue('backgroundImage', url, {
									shouldDirty: true,
									shouldTouch: true
								})
							}
							onError={message => setStatus({ kind: 'error', message })}
						/>
						<Button
							type='button'
							variant='outline'
							onClick={() =>
								form.setValue('backgroundImage', '', {
									shouldDirty: true,
									shouldTouch: true
								})
							}>
							Clear
						</Button>
					</div>
					{backgroundImage && (
						<div className='mt-3 h-40 w-full overflow-hidden rounded-md border border-slate-200'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={backgroundImage}
								alt='Background preview'
								className='h-full w-full object-cover'
							/>
						</div>
					)}
				</AdminField>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
