'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	type AdmissionsHeroData,
	updateAdmissionsHero
} from '@/app/(Private Pages)/actions/admissions';
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
	initialData: AdmissionsHeroData;
	pageSlug: Parameters<typeof updateAdmissionsHero>[0];
	onChange?: (data: AdmissionsHeroData) => void;
};

const HERO_GRADIENT = 'from-blue-600 to-blue-800';

const normalizeHero = (values: Partial<FormValues>): AdmissionsHeroData => ({
	title: (values.title ?? '').trim(),
	subtitle: (values.subtitle ?? '').trim(),
	backgroundImage: (values.backgroundImage ?? '').trim() || null,
	gradient: HERO_GRADIENT
});

export default function AdmissionsHeroBannerForm({
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
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			const result = await updateAdmissionsHero(pageSlug, normalizeHero(values));
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	const backgroundImage = form.watch('backgroundImage');

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Admissions page hero'
				description='Shared banner shown above this admissions page.'>
				<AdminField
					label='Title'
					htmlFor='adm-hero-title'
					error={form.formState.errors.title?.message}>
					<Input
						id='adm-hero-title'
						placeholder='Admissions'
						{...form.register('title', { required: 'Title is required' })}
					/>
				</AdminField>

				<AdminField
					label='Subtitle'
					htmlFor='adm-hero-subtitle'
					error={form.formState.errors.subtitle?.message}>
					<Textarea
						id='adm-hero-subtitle'
						rows={4}
						placeholder='Join BPIT to begin your academic journey.'
						className='resize-none'
						{...form.register('subtitle', { required: 'Subtitle is required' })}
					/>
				</AdminField>

				<AdminField label='Background image' htmlFor='adm-hero-bg'>
					<Input
						id='adm-hero-bg'
						placeholder='https://…'
						{...form.register('backgroundImage')}
					/>
					<div className='mt-2 flex flex-wrap gap-2'>
						<CloudinaryUploadButton
							buttonText='Upload image'
							folder='admissions'
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
						<div className='mt-3 h-32 w-full overflow-hidden rounded-md border border-slate-200'>
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
