'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	updateAboutHero,
	type AboutHeroData
} from '@/app/(Private Pages)/actions/about';
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
};

type Props = {
	initialData: AboutHeroData;
	pageSlug: string;
	onChange?: (data: AboutHeroData) => void;
};

const HERO_GRADIENT = 'from-blue-600 to-blue-700';

const normalizeHero = (values: Partial<FormValues>): AboutHeroData => ({
	title: (values.title ?? '').trim(),
	subtitle: (values.subtitle ?? '').trim(),
	gradient: HERO_GRADIENT,
	backgroundImage:
		(values.backgroundImage ?? '').trim().length > 0
			? (values.backgroundImage ?? '').trim()
			: null
});

export default function AboutHeroForm({
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
			backgroundImage: initialData.backgroundImage ?? ''
		}
	});

	useEffect(() => {
		onChange?.(normalizeHero(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(normalizeHero(values));
			setStatus(current => (current.kind === 'idle' ? current : { kind: 'idle' }));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		const payload = normalizeHero(values);
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			const result = await updateAboutHero(pageSlug, payload);
			if (!result.ok) {
				setStatus({ kind: 'error', message: 'Save failed' });
				return;
			}
			setStatus({ kind: 'success', message: 'Saved' });
		});
	});

	const titleError = form.formState.errors.title?.message;
	const subtitleError = form.formState.errors.subtitle?.message;
	const backgroundImage = form.watch('backgroundImage');

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Hero content'
				description='Headline, description, and background image shown at the top of the About page.'>
				<AdminField label='Title' htmlFor='about-hero-title' error={titleError}>
					<Input
						id='about-hero-title'
						placeholder='About BPIT'
						{...form.register('title', { required: 'Title is required' })}
					/>
				</AdminField>

				<AdminField
					label='Subtitle'
					htmlFor='about-hero-subtitle'
					error={subtitleError}>
					<Textarea
						id='about-hero-subtitle'
						rows={3}
						placeholder='Discover our journey of excellence…'
						{...form.register('subtitle', { required: 'Subtitle is required' })}
					/>
				</AdminField>

				<AdminField label='Background image' htmlFor='about-hero-bg'>
					<Input
						id='about-hero-bg'
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
							onError={message =>
								setStatus({ kind: 'error', message })
							}
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
