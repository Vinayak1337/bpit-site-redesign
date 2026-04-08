'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	type AdmissionsHeroData,
	updateAdmissionsHero
} from '@/app/(Private Pages)/actions/admissions';

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
	const [message, setMessage] = useState<string | null>(null);
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
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		startTransition(async () => {
			const result = await updateAdmissionsHero(pageSlug, normalizeHero(values));
			setMessage(result.ok ? 'Saved' : 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>Admissions Page Hero</h3>
						<p className='text-sm text-slate-500'>
							Edit the shared banner shown above this admissions page.
						</p>
					</div>
					<div className='flex items-center gap-2'>
						{message ? (
							<span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						) : null}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving...' : 'Save changes'}
						</Button>
					</div>
				</div>

				<FormField
					control={form.control}
					name='title'
					rules={{ required: 'Title is required' }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Admissions' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='subtitle'
					rules={{ required: 'Subtitle is required' }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subtitle</FormLabel>
							<FormControl>
								<Textarea
									rows={4}
									placeholder='Join BPIT to begin your academic journey.'
									className='resize-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='backgroundImage'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Background image</FormLabel>
							<FormControl>
								<Input placeholder='https://...' {...field} />
							</FormControl>
							<div className='flex flex-wrap gap-2 pt-2'>
								<CloudinaryUploadButton
									buttonText='Upload image'
									folder='admissions'
									onUpload={url =>
										form.setValue('backgroundImage', url, {
											shouldDirty: true,
											shouldTouch: true
										})
									}
									onError={setMessage}
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
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
