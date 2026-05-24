'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	updateStudentLifeHero,
	type StudentLifeHeroData
} from '@/app/(Private Pages)/actions/student-life';
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
	initialData: StudentLifeHeroData;
	pageSlug: string;
	onChange?: (data: StudentLifeHeroData) => void;
};

const normalizeHero = (values: Partial<FormValues>): StudentLifeHeroData => ({
	title: (values.title ?? '').trim(),
	subtitle: (values.subtitle ?? '').trim(),
	gradient: (values.gradient ?? '').trim() || 'from-blue-600 to-purple-600',
	backgroundImage:
		(values.backgroundImage ?? '').trim().length > 0
			? (values.backgroundImage ?? '').trim()
			: null
});

export default function StudentLifeHeroForm({
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
			gradient: initialData.gradient ?? 'from-blue-600 to-purple-600'
		}
	});

	useEffect(() => {
		onChange?.(normalizeHero(form.getValues()));
		const sub = form.watch(values => {
			onChange?.(normalizeHero(values));
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
			const result = await updateStudentLifeHero(pageSlug, normalizeHero(values));
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
				title='Student life hero'
				description='Headline, description, gradient, and background image for the section.'>
				<AdminField
					label='Title'
					htmlFor='sl-hero-title'
					error={form.formState.errors.title?.message}>
					<Input
						id='sl-hero-title'
						placeholder='Student Life'
						{...form.register('title', { required: 'Title is required' })}
					/>
				</AdminField>
				<AdminField
					label='Subtitle'
					htmlFor='sl-hero-sub'
					error={form.formState.errors.subtitle?.message}>
					<Textarea
						id='sl-hero-sub'
						rows={3}
						placeholder='Experience a vibrant campus life…'
						{...form.register('subtitle', { required: 'Subtitle is required' })}
					/>
				</AdminField>
				<AdminField
					label='Gradient (Tailwind classes)'
					htmlFor='sl-hero-grad'>
					<Input
						id='sl-hero-grad'
						placeholder='from-blue-600 to-purple-600'
						{...form.register('gradient')}
					/>
				</AdminField>
				<AdminField label='Background image' htmlFor='sl-hero-bg'>
					<Input
						id='sl-hero-bg'
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
