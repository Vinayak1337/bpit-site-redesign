'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { heroCarouselSchema, type HeroCarousel } from '@/lib/schemas/home';
import { z } from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

async function signCloudinary() {
	const res = await fetch('/api/cloudinary/sign', { method: 'POST', body: JSON.stringify({ timestamp: Math.floor(Date.now() / 1000) }) });
	if (!res.ok) throw new Error('Failed to sign Cloudinary');
	return res.json() as Promise<{ cloudName: string; apiKey: string; signature: string; timestamp: number }>;
}

async function uploadToCloudinary(file: File): Promise<string> {
	const { cloudName, apiKey, signature, timestamp } = await signCloudinary();
	const form = new FormData();
	form.append('file', file);
	form.append('api_key', apiKey);
	form.append('timestamp', String(timestamp));
	form.append('signature', signature);
	const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: 'POST', body: form });
	if (!res.ok) throw new Error('Cloudinary upload failed');
	const json = (await res.json()) as { secure_url: string };
	return json.secure_url;
}

type HeroCarouselInput = z.input<typeof heroCarouselSchema>;
const ICONS = ['BookOpen','Users','Trophy','Building','Award'];

export function HeroCarouselForm({ initial, onSave, onClose }: { initial: HeroCarousel; onSave: (v: HeroCarousel) => Promise<void>; onClose: () => void }) {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { isSubmitting }
    } = useForm<HeroCarouselInput>({ defaultValues: initial as unknown as HeroCarouselInput, resolver: zodResolver(heroCarouselSchema) });

    const { fields, append, remove } = useFieldArray({ control, name: 'slides' });
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

    const onSubmit = handleSubmit(async values => {
        const parsed = heroCarouselSchema.parse(values);
        await onSave(parsed as HeroCarousel);
        router.refresh();
    });

    return (
		<div className='fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center p-4' onClick={onClose}>
			<div className='bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-auto' onClick={e => e.stopPropagation()}>
				<div className='p-4 border-b flex items-center justify-between'>
					<h3 className='font-semibold'>Edit Hero Carousel</h3>
					<button onClick={onClose} className='text-sm text-gray-600 hover:text-gray-900'>Close</button>
				</div>
				<form onSubmit={onSubmit} className='p-4 space-y-4'>
					<div className='flex justify-between items-center'>
						<h4 className='font-medium'>Slides</h4>
						<button
							type='button'
							onClick={() => append({ title: '', subtitle: '', description: '', image: '', icon: '', stats: '', cta: undefined, secondary_cta: undefined })}
							className='px-3 py-1.5 bg-blue-600 text-white rounded'>
							Add Slide
						</button>
					</div>
					{fields.map((field, index) => (
						<div key={field.id} className='border rounded p-3 space-y-3'>
							<div className='flex items-center justify-between'>
								<div className='text-sm font-medium'>Slide {index + 1}</div>
								<button type='button' className='text-red-600 text-sm' onClick={() => remove(index)}>Remove</button>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
								<label className='block'>
									<span className='text-sm'>Title</span>
									<input className='input input-bordered w-full border rounded px-2 py-1.5' {...register(`slides.${index}.title` as const)} />
								</label>
								<label className='block'>
									<span className='text-sm'>Subtitle</span>
									<input className='input input-bordered w-full border rounded px-2 py-1.5' {...register(`slides.${index}.subtitle` as const)} />
								</label>
								<label className='block md:col-span-2'>
									<span className='text-sm'>Description</span>
									<textarea className='w-full border rounded px-2 py-1.5' rows={3} {...register(`slides.${index}.description` as const)} />
								</label>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:col-span-2'>
									<div>
										<span className='text-sm block mb-1'>Image</span>
										<div className='flex items-center gap-3'>
											<input className='flex-1 border rounded px-2 py-1.5' {...register(`slides.${index}.image` as const)} />
											<label className='px-3 py-1.5 bg-gray-100 border rounded cursor-pointer'>
												<span>Upload</span>
												<input
													className='hidden'
													type='file'
													accept='image/*'
													onChange={async e => {
														const file = e.target.files?.[0];
														if (!file) return;
														try {
															setUploadingIndex(index);
															const url = await uploadToCloudinary(file);
															setValue(`slides.${index}.image` as const, url, { shouldDirty: true });
														} finally {
															setUploadingIndex(null);
														}
													}}
												/>
											</label>
										</div>
										{uploadingIndex === index && <div className='text-xs text-gray-500'>Uploading...</div>}
									</div>
									<div className='relative w-28 h-16 border rounded overflow-hidden'>
										{(watch(`slides.${index}.image` as const) || '') && (
											<Image src={(watch(`slides.${index}.image` as const) as string) || ''} alt='' fill className='object-cover' />
										)}
									</div>
								</div>
								<label className='block'>
									<span className='text-sm'>Icon (name)</span>
									<input className='w-full border rounded px-2 py-1.5 mb-2' {...register(`slides.${index}.icon` as const)} />
									<div className='flex flex-wrap gap-2'>
										{ICONS.map(icon => (
											<button key={icon} type='button' onClick={() => setValue(`slides.${index}.icon` as const, icon, { shouldDirty: true })} className={`px-2 py-1 text-xs rounded border ${watch(`slides.${index}.icon` as const)===icon?'bg-blue-600 text-white':'bg-white'}`}>
												{icon}
											</button>
										))}
									</div>
								</label>
								<label className='block'>
									<span className='text-sm'>Stats</span>
									<input className='w-full border rounded px-2 py-1.5' {...register(`slides.${index}.stats` as const)} />
								</label>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
								<div className='border rounded p-2'>
									<div className='font-medium text-sm mb-2'>Primary CTA</div>
									<label className='block mb-2'>
										<span className='text-sm'>Label</span>
										<input className='w-full border rounded px-2 py-1.5' {...register(`slides.${index}.cta.label` as const)} />
									</label>
									<label className='block mb-2'>
										<span className='text-sm'>Href</span>
										<input className='w-full border rounded px-2 py-1.5' {...register(`slides.${index}.cta.href` as const)} />
									</label>
									<label className='inline-flex items-center gap-2'>
										<input type='checkbox' {...register(`slides.${index}.cta.isEnquiry` as const)} />
										<span className='text-sm'>Is Enquiry</span>
									</label>
								</div>
								<div className='border rounded p-2'>
									<div className='font-medium text-sm mb-2'>Secondary CTA</div>
									<label className='block mb-2'>
										<span className='text-sm'>Label</span>
										<input className='w-full border rounded px-2 py-1.5' {...register(`slides.${index}.secondary_cta.label` as const)} />
									</label>
									<label className='block mb-2'>
										<span className='text-sm'>Href</span>
										<input className='w-full border rounded px-2 py-1.5' {...register(`slides.${index}.secondary_cta.href` as const)} />
									</label>
									<label className='inline-flex items-center gap-2'>
										<input type='checkbox' {...register(`slides.${index}.secondary_cta.isEnquiry` as const)} />
										<span className='text-sm'>Is Enquiry</span>
									</label>
								</div>
							</div>
						</div>
					))}
					<div className='flex justify-end gap-2 pt-2 border-t'>
						<button type='button' className='px-3 py-1.5 rounded border' onClick={onClose}>Cancel</button>
						<button type='submit' disabled={isSubmitting} className='px-3 py-1.5 rounded bg-blue-600 text-white'>Save</button>
					</div>
				</form>
			</div>
		</div>
	);
}


