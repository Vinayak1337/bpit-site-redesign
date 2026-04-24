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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	updateExaminationHero,
	type ExaminationHeroData
} from '@/app/(Private Pages)/actions/academia-examination';

type FormValues = {
	title: string;
	subtitle: string;
	backgroundImage: string;
	gradient: string;
};

type Props = {
	initialData: ExaminationHeroData;
	onChange?: (data: ExaminationHeroData) => void;
};

const normalize = (values: Partial<FormValues>): ExaminationHeroData => ({
	title: (values.title ?? '').trim(),
	subtitle: (values.subtitle ?? '').trim(),
	gradient: (values.gradient ?? '').trim() || 'from-blue-600 to-blue-700',
	backgroundImage:
		(values.backgroundImage ?? '').trim().length > 0
			? (values.backgroundImage ?? '').trim()
			: null
});

export default function ExaminationHeroForm({ initialData, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<FormValues>({
		defaultValues: {
			title: initialData.title,
			subtitle: initialData.subtitle,
			backgroundImage: initialData.backgroundImage ?? '',
			gradient: initialData.gradient ?? 'from-blue-600 to-blue-700'
		}
	});

	useEffect(() => {
		onChange?.(normalize(form.getValues()));
		const sub = form.watch(values => onChange?.(normalize(values)));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalize(values);
		startTransition(async () => {
			const result = await updateExaminationHero(payload);
			setMessage(result.ok ? 'Saved successfully' : result.error ?? 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Hero</h3>
					<div className='flex items-center gap-3'>
						{message ? (
							<span
								className={`text-sm font-medium ${
									message.toLowerCase().includes('fail')
										? 'text-red-600'
										: 'text-emerald-600'
								}`}>
								{message}
							</span>
						) : null}
						<Button type='submit' disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Saving...
								</>
							) : (
								<>
									<Save className='mr-2 h-4 w-4' />
									Save
								</>
							)}
						</Button>
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Hero Content</CardTitle>
						<CardDescription>
							Headline, subtitle, gradient and optional background image for the
							Examination page banner.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='title'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Examination' {...field} />
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
										<Textarea rows={3} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='gradient'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gradient (Tailwind classes)</FormLabel>
									<FormControl>
										<Input placeholder='from-blue-600 to-blue-700' {...field} />
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
									<FormLabel>Background Image</FormLabel>
									<FormControl>
										<Input placeholder='https://...' {...field} />
									</FormControl>
									<div className='flex flex-wrap gap-2 pt-2'>
										<CloudinaryUploadButton
											buttonText='Upload Image'
											folder='academia/examination'
											onUpload={url =>
												form.setValue('backgroundImage', url, {
													shouldDirty: true,
													shouldTouch: true
												})
											}
											onError={msg => setMessage(msg)}
										/>
										<Button
											type='button'
											variant='outline'
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
									{field.value ? (
										<div className='mt-4 rounded-lg overflow-hidden border h-40 w-full relative'>
											<img
												src={field.value}
												alt='Background preview'
												className='w-full h-full object-cover'
											/>
										</div>
									) : null}
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
