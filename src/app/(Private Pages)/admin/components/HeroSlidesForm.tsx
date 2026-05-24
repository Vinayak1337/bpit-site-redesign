'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	updateHeroSlides,
	type HeroSlide
} from '@/app/(Private Pages)/actions/hero';
import {
	AddRowButton,
	AdminEmptyState,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

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
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			slides:
				initialSlides.length > 0 ? initialSlides : [createEmptyHeroSlide()]
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'slides'
	});

	useEffect(() => {
		onChange?.(normalizeSlides(form.getValues('slides')));
		const sub = form.watch(value => {
			const next = (value as Partial<FormValues>)?.slides ?? [];
			onChange?.(normalizeSlides(next));
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
			const payload = values.slides
				.map(formSlideToHeroSlide)
				.filter(slide => {
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
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Hero slides'
				description='Carousel content that appears at the top of the homepage. Images must be publicly accessible URLs; CTA links accept absolute URLs or internal paths beginning with /. Set the type to "enquiry modal" to trigger the popup instead.'>
				<AdminItemList>
					{fields.map((field, idx) => (
						<AdminItemCard
							key={field.id}
							index={idx}
							total={fields.length}
							title={form.watch(`slides.${idx}.title`) || `Slide ${idx + 1}`}
							subtitle={form.watch(`slides.${idx}.subtitle`) || undefined}
							onMove={d => move(idx, idx + d)}
							onRemove={fields.length > 1 ? () => remove(idx) : undefined}>
							<AdminFieldGrid>
								<AdminField
									label='Title'
									error={
										form.formState.errors.slides?.[idx]?.title?.message
									}>
									<Input
										placeholder='Engineering Excellence'
										{...form.register(`slides.${idx}.title` as const, {
											required: 'Title is required'
										})}
									/>
								</AdminField>
								<AdminField
									label='Subtitle'
									error={
										form.formState.errors.slides?.[idx]?.subtitle?.message
									}>
									<Input
										placeholder="Shaping Tomorrow's Innovators"
										{...form.register(`slides.${idx}.subtitle` as const, {
											required: 'Subtitle is required'
										})}
									/>
								</AdminField>
								<AdminField
									label='Stats badge'
									error={form.formState.errors.slides?.[idx]?.stats?.message}>
									<Input
										placeholder='NBA Accredited Institution'
										{...form.register(`slides.${idx}.stats` as const, {
											required: 'Stats badge is required'
										})}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`slides.${idx}.icon`) || 'BookOpen'}
										onValueChange={v =>
											form.setValue(`slides.${idx}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
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
								</AdminField>
							</AdminFieldGrid>

							<AdminField
								label='Background image URL'
								error={form.formState.errors.slides?.[idx]?.image?.message}>
								<div className='flex flex-col gap-2 sm:flex-row'>
									<Input
										placeholder='https://res.cloudinary.com/…'
										{...form.register(`slides.${idx}.image` as const, {
											required: 'Background image URL is required'
										})}
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
							</AdminField>

							<AdminField
								label='Description'
								error={
									form.formState.errors.slides?.[idx]?.description?.message
								}>
								<Textarea
									rows={4}
									placeholder='Short paragraph describing the slide highlight.'
									className='resize-none'
									{...form.register(`slides.${idx}.description` as const, {
										required: 'Description is required'
									})}
								/>
							</AdminField>

							<AdminFieldGrid>
								<AdminField label='Primary CTA type'>
									<Select
										value={form.watch(`slides.${idx}.ctaType`) || 'link'}
										onValueChange={v =>
											form.setValue(
												`slides.${idx}.ctaType`,
												v as 'link' | 'enquiry',
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue placeholder='Type' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='link'>Open link</SelectItem>
											<SelectItem value='enquiry'>Open enquiry modal</SelectItem>
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Primary CTA label'>
									<Input
										placeholder='Apply Now'
										{...form.register(`slides.${idx}.ctaLabel` as const)}
									/>
								</AdminField>
								<AdminField label='Primary CTA link'>
									<Input
										placeholder='https://example.com/apply'
										{...form.register(`slides.${idx}.ctaLink` as const)}
									/>
								</AdminField>
								<AdminField label='Secondary CTA type'>
									<Select
										value={form.watch(`slides.${idx}.secondaryType`) || 'link'}
										onValueChange={v =>
											form.setValue(
												`slides.${idx}.secondaryType`,
												v as 'link' | 'enquiry',
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue placeholder='Type' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='link'>Open link</SelectItem>
											<SelectItem value='enquiry'>Open enquiry modal</SelectItem>
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Secondary CTA label'>
									<Input
										placeholder='Explore Programs'
										{...form.register(`slides.${idx}.secondaryLabel` as const)}
									/>
								</AdminField>
								<AdminField label='Secondary CTA link'>
									<Input
										placeholder='https://example.com/programs'
										{...form.register(`slides.${idx}.secondaryLink` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No slides yet' />}
				<AddRowButton onClick={() => append(createEmptyHeroSlide())}>
					Add slide
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
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
