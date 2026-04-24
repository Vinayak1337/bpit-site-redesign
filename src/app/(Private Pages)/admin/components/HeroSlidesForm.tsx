'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Plus, Save, Trash2 } from 'lucide-react';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	updateHeroSlides,
	type HeroSlide
} from '@/app/(Private Pages)/actions/hero';

export type HeroSlideFormValue = {
	title: string;
	subtitle: string;
	description: string;
	stats: string;
	image: string;
	icon: string;
	ctaLabel: string;
	ctaLink: string;
	ctaType: 'link' | 'enquiry';
	secondaryLabel: string;
	secondaryLink: string;
	secondaryType: 'link' | 'enquiry';
};

type FormValues = {
	slides: HeroSlideFormValue[];
};

type Props = {
	initialSlides: HeroSlideFormValue[];
	pageSlug: string;
	onChange?: (slides: HeroSlideFormValue[]) => void;
};

const ICON_OPTIONS = ['Award', 'BookOpen', 'Users', 'Trophy', 'Building'];

export default function HeroSlidesForm({
	initialSlides,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			slides:
				initialSlides.length > 0 ? initialSlides : [createEmptyHeroSlide()]
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'slides'
	});

	useEffect(() => {
		onChange?.(normalizeSlides(form.getValues('slides')));
		const subscription = form.watch(value => {
			const nextSlides = (value as Partial<FormValues>)?.slides ?? [];
			onChange?.(normalizeSlides(nextSlides));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	function onSubmit(values: FormValues): void {
		setMessage(null);
		startTransition(async () => {
			const payload = values.slides.map(formSlideToHeroSlide).filter(slide => {
				const hasBaseContent =
					slide.title.length > 0 ||
					slide.subtitle.length > 0 ||
					slide.description.length > 0 ||
					slide.image.length > 0 ||
					slide.stats.length > 0;
				const hasCta = Boolean(slide.cta) || Boolean(slide.secondary_cta);
				return hasBaseContent || hasCta;
			});
			const result = await updateHeroSlides(pageSlug, payload);
			if (!result.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved');
		});
	}

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'
				onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Hero Slides
						</h3>
						<p className='text-sm text-slate-500'>
							Edit the carousel content that appears at the top of the homepage.
						</p>
					</div>
					{message && (
						<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
							{message}
						</span>
					)}
				</div>

				<div className='grid gap-5 pr-1'>
					{fields.map((field, idx) => (
						<div
							key={field.id}
							className='rounded-lg border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:border-slate-300 hover:shadow'>
							<div className='flex items-start justify-between gap-4'>
								<h4 className='text-sm font-semibold text-slate-700'>
									Slide {idx + 1}
								</h4>
								<Button
									type='button'
									variant='ghost'
									size='sm'
									className='rounded-full border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600'
									onClick={() => remove(idx)}
									disabled={fields.length === 1}>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>

							<div className='grid gap-4 md:grid-cols-2'>
								<FormField
									control={form.control}
									name={`slides.${idx}.title`}
									rules={{ required: 'Title is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder='Engineering Excellence'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.subtitle`}
									rules={{ required: 'Subtitle is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subtitle</FormLabel>
											<FormControl>
												<Input
													placeholder="Shaping Tomorrow's Innovators"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.stats`}
									rules={{ required: 'Stats badge is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Stats badge</FormLabel>
											<FormControl>
												<Input
													placeholder='NBA Accredited Institution'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.icon`}
									rules={{ required: 'Icon is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<SelectTrigger
														size='sm'
														className='w-full justify-between'>
														<SelectValue placeholder='Select icon' />
													</SelectTrigger>
													<SelectContent>
														{ICON_OPTIONS.map(option => (
															<SelectItem key={option} value={option}>
																{option}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.image`}
									rules={{ required: 'Background image URL is required' }}
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Background image URL</FormLabel>
											<FormControl>
												<div className='flex flex-col gap-2 sm:flex-row'>
													<Input
														placeholder='https://res.cloudinary.com/...'
														{...field}
													/>
													<CloudinaryUploadButton
														onUpload={(url: string) =>
															form.setValue(`slides.${idx}.image`, url, {
																shouldDirty: true
															})
														}
														buttonText='Upload image'
														className='sm:w-auto'
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.description`}
									rules={{ required: 'Description is required' }}
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													rows={4}
													placeholder='Short paragraph describing the slide highlight.'
													className='resize-none'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='grid gap-4 md:grid-cols-2'>
								<FormField
									control={form.control}
									name={`slides.${idx}.ctaType`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Primary CTA</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<SelectTrigger
														size='sm'
														className='w-full justify-between'>
														<SelectValue placeholder='Type' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='link'>Open link</SelectItem>
														<SelectItem value='enquiry'>
															Open enquiry modal
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.ctaLabel`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Primary CTA label</FormLabel>
											<FormControl>
												<Input placeholder='Apply Now' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.ctaLink`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Primary CTA link</FormLabel>
											<FormControl>
												<Input
													placeholder='https://example.com/apply'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.secondaryType`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Secondary CTA</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<SelectTrigger
														size='sm'
														className='w-full justify-between'>
														<SelectValue placeholder='Type' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='link'>Open link</SelectItem>
														<SelectItem value='enquiry'>
															Open enquiry modal
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.secondaryLabel`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Secondary CTA label</FormLabel>
											<FormControl>
												<Input placeholder='Explore Programs' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`slides.${idx}.secondaryLink`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Secondary CTA link</FormLabel>
											<FormControl>
												<Input
													placeholder='https://example.com/programs'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					))}
				</div>

				<div className='flex flex-col gap-3'>
					<div className='flex flex-wrap gap-2'>
						<Button
							type='button'
							variant='outline'
							onClick={() => append(createEmptyHeroSlide())}
							className='border-slate-200 bg-white text-slate-700 hover:bg-slate-50'>
							<Plus className='mr-2 h-4 w-4' /> Add slide
						</Button>
						<Button
							type='submit'
							disabled={isPending}
							className='bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-lg hover:from-sky-400 hover:via-blue-400 hover:to-indigo-400'>
							{isPending ? (
								<span className='flex items-center gap-2'>Saving...</span>
							) : (
								<span className='flex items-center gap-2'>
									<Save className='h-4 w-4' /> Save changes
								</span>
							)}
						</Button>
					</div>
					<p className='text-xs text-slate-500'>
						Images should be publicly accessible URLs. CTA links support
						absolute URLs or internal paths (starting with /). Choose 'Open
						enquiry modal' to trigger the enquiry popup.
					</p>
				</div>
			</form>
		</Form>
	);
}

export function createEmptyHeroSlide(): HeroSlideFormValue {
	return {
		title: '',
		subtitle: '',
		description: '',
		stats: '',
		image: '',
		icon: 'BookOpen',
		ctaLabel: '',
		ctaLink: '',
		ctaType: 'link',
		secondaryLabel: '',
		secondaryLink: '',
		secondaryType: 'link'
	};
}

function normalizeSlides(input: unknown): HeroSlideFormValue[] {
	if (!Array.isArray(input)) return [];
	return input.map(slide => {
		const base = createEmptyHeroSlide();
		return {
			...base,
			title: typeof slide?.title === 'string' ? slide.title : base.title,
			subtitle:
				typeof slide?.subtitle === 'string' ? slide.subtitle : base.subtitle,
			description:
				typeof slide?.description === 'string'
					? slide.description
					: base.description,
			stats: typeof slide?.stats === 'string' ? slide.stats : base.stats,
			image: typeof slide?.image === 'string' ? slide.image : base.image,
			icon:
				typeof slide?.icon === 'string' && slide.icon.trim().length > 0
					? slide.icon
					: base.icon,
			ctaLabel:
				typeof slide?.ctaLabel === 'string' ? slide.ctaLabel : base.ctaLabel,
			ctaLink:
				typeof slide?.ctaLink === 'string' ? slide.ctaLink : base.ctaLink,
			ctaType: slide?.ctaType === 'enquiry' ? 'enquiry' : 'link',
			secondaryLabel:
				typeof slide?.secondaryLabel === 'string'
					? slide.secondaryLabel
					: base.secondaryLabel,
			secondaryLink:
				typeof slide?.secondaryLink === 'string'
					? slide.secondaryLink
					: base.secondaryLink,
			secondaryType: slide?.secondaryType === 'enquiry' ? 'enquiry' : 'link'
		};
	});
}

function formSlideToHeroSlide(slide: HeroSlideFormValue): HeroSlide {
	const icon = slide.icon.trim() || 'BookOpen';
	const title = slide.title.trim();
	const subtitle = slide.subtitle.trim();
	const description = slide.description.trim();
	const image = slide.image.trim();
	const stats = slide.stats.trim();
	const primaryLabel = slide.ctaLabel.trim();
	const primaryLink = slide.ctaLink.trim();
	const secondaryLabel = slide.secondaryLabel.trim();
	const secondaryLink = slide.secondaryLink.trim();

	const payload: HeroSlide = {
		title,
		subtitle,
		description,
		image,
		icon,
		stats
	};

	if (primaryLabel.length > 0) {
		payload.cta = {
			label: primaryLabel,
			...(slide.ctaType === 'enquiry'
				? { isEnquiry: true }
				: primaryLink.length > 0
				? { href: primaryLink }
				: {})
		};
	}

	if (secondaryLabel.length > 0) {
		payload.secondary_cta = {
			label: secondaryLabel,
			...(slide.secondaryType === 'enquiry'
				? { isEnquiry: true }
				: secondaryLink.length > 0
				? { href: secondaryLink }
				: {})
		};
	}

	return payload;
}
