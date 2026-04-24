'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription
} from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import Editable from '@/components/ui/Editable';
import SimpleSubHero from '@/app/(Public Pages)/(library layout)/academia/library/_shared/SimpleSubHero';
import type { SubHeroData } from '@/app/(Private Pages)/actions/_library-subpage-shared';

type HeroValues = {
	eyebrow: string;
	title: string;
	subtitle: string;
	backgroundImage: string;
	gradient: string;
};

function normalize(v: Partial<HeroValues>): SubHeroData {
	const bg = (v.backgroundImage ?? '').trim();
	return {
		eyebrow: (v.eyebrow ?? '').trim(),
		title: (v.title ?? '').trim(),
		subtitle: (v.subtitle ?? '').trim(),
		backgroundImage: bg.length > 0 ? bg : null,
		gradient: (v.gradient ?? '').trim() || 'from-blue-50 to-indigo-100'
	};
}

function HeroForm({
	initialData,
	slug,
	updateAction,
	onChange
}: {
	initialData: SubHeroData;
	slug: string;
	updateAction: (
		data: SubHeroData
	) => Promise<{ ok: boolean; error?: string }>;
	onChange?: (d: SubHeroData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<HeroValues>({
		defaultValues: {
			eyebrow: initialData.eyebrow,
			title: initialData.title,
			subtitle: initialData.subtitle,
			backgroundImage: initialData.backgroundImage ?? '',
			gradient: initialData.gradient
		}
	});
	useEffect(() => {
		onChange?.(normalize(form.getValues()));
		const sub = form.watch(v => onChange?.(normalize(v)));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					const payload = normalize(v);
					startTransition(async () => {
						const r = await updateAction(payload);
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-6'>
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
									<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...
								</>
							) : (
								<>
									<Save className='mr-2 h-4 w-4' /> Save
								</>
							)}
						</Button>
					</div>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Header</CardTitle>
						<CardDescription>
							Eyebrow badge, title, subtitle, and optional background image.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='eyebrow'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Eyebrow</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='subtitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Textarea rows={3} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='gradient'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gradient classes</FormLabel>
									<FormControl>
										<Input
											placeholder='from-blue-50 to-indigo-100'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='backgroundImage'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Background Image (optional)</FormLabel>
									<FormControl>
										<Input placeholder='https://...' {...field} />
									</FormControl>
									<div className='flex flex-wrap gap-2 pt-2'>
										<CloudinaryUploadButton
											buttonText='Upload Image'
											folder={`academia/library/${slug}`}
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
										<div className='mt-3 rounded-lg overflow-hidden border h-32 relative'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={field.value}
												alt='Background'
												className='w-full h-full object-cover'
											/>
										</div>
									) : null}
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}

export default function SubHeroEditor({
	initialData,
	slug,
	updateAction
}: {
	initialData: SubHeroData;
	slug: string;
	updateAction: (
		data: SubHeroData
	) => Promise<{ ok: boolean; error?: string }>;
}) {
	const [data, setData] = useState<SubHeroData>(initialData);
	return (
		<Editable
			label='Hero'
			presentation='dialog'
			formContent={
				<HeroForm
					initialData={initialData}
					slug={slug}
					updateAction={updateAction}
					onChange={setData}
				/>
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<SimpleSubHero data={data} />
			</div>
		</Editable>
	);
}
