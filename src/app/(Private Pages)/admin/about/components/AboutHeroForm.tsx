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
	updateAboutHero,
	type AboutHeroData
} from '@/app/(Private Pages)/actions/about';

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

const normalizeHero = (values: Partial<FormValues>): AboutHeroData => {
	return {
		title: (values.title ?? '').trim(),
		subtitle: (values.subtitle ?? '').trim(),
		gradient: HERO_GRADIENT,
		backgroundImage:
			(values.backgroundImage ?? '').trim().length > 0
				? (values.backgroundImage ?? '').trim()
				: null
	};
};

export default function AboutHeroForm({
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
		const payload = normalizeHero(values);
		startTransition(async () => {
			const result = await updateAboutHero(pageSlug, payload);
			if (!result.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved');
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>Hero</h3>
						<p className='text-sm text-slate-500'>
							Update the headline, description, and optional background image.
						</p>
					</div>
					<div className='flex items-center gap-2'>
						{message && (
							<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						)}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving...' : 'Save changes'}
						</Button>
					</div>
				</div>

				<div className='space-y-4'>
					<FormField
						control={form.control}
						name='title'
						rules={{ required: 'Title is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder='About BPIT' {...field} />
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
										rows={3}
										placeholder='Discover our journey of excellence...'
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
								<FormLabel>Background image URL (optional)</FormLabel>
								<FormControl>
									<Input placeholder='https://...' {...field} />
								</FormControl>
								<div className='flex gap-2 pt-2'>
									<CloudinaryUploadButton
										buttonText='Upload background'
										onUpload={url =>
											form.setValue('backgroundImage', url, {
												shouldDirty: true,
												shouldTouch: true
											})
										}
										onError={message => setMessage(message)}
									/>
									<Button
										type='button'
										variant='ghost'
										size='sm'
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
				</div>
			</form>
		</Form>
	);
}
