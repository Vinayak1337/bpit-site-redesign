'use client';

import React, { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import Hero2 from '@/components/hero/hero2';
import HeroSlidesForm, {
	HeroSlideFormValue,
	createEmptyHeroSlide
} from '@/app/(Private Pages)/admin/components/HeroSlidesForm';
import type { HeroSlide } from '@/app/(Private Pages)/actions/hero';

type HeroCarouselSlide = {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	icon: string;
	stats: string;
	cta?: {
		label: string;
		href?: string;
		isEnquiry?: boolean;
	};
	secondary_cta?: {
		label: string;
		href?: string;
		isEnquiry?: boolean;
	};
};

type Props = {
	initialSlides: HeroSlide[];
	pageSlug: string;
};

const toFormValues = (slides: HeroSlide[]): HeroSlideFormValue[] =>
	slides.map(slide => ({
		title: slide.title,
		subtitle: slide.subtitle,
		description: slide.description,
		stats: slide.stats,
		image: slide.image,
		icon: slide.icon ?? 'BookOpen',
		ctaLabel: slide.cta?.label ?? '',
		ctaLink: slide.cta?.href ?? '',
		ctaType: slide.cta?.isEnquiry ? 'enquiry' : 'link',
		secondaryLabel: slide.secondary_cta?.label ?? '',
		secondaryLink: slide.secondary_cta?.href ?? '',
		secondaryType: slide.secondary_cta?.isEnquiry ? 'enquiry' : 'link'
	}));

const toHeroData = (slides: HeroSlideFormValue[]): HeroCarouselSlide[] =>
	slides.map(slide => {
		const primaryLabel = slide.ctaLabel.trim();
		const secondaryLabel = slide.secondaryLabel.trim();
		const primaryLink = slide.ctaLink.trim();
		const secondaryLink = slide.secondaryLink.trim();

		return {
			icon: slide.icon,
			image: slide.image,
			title: slide.title,
			subtitle: slide.subtitle,
			description: slide.description,
			stats: slide.stats,
			cta:
				primaryLabel.length > 0
					? {
							label: primaryLabel,
							...(slide.ctaType === 'enquiry'
								? { isEnquiry: true }
								: primaryLink.length > 0
								? { href: primaryLink }
								: {})
					  }
					: undefined,
			secondary_cta:
				secondaryLabel.length > 0
					? {
							label: secondaryLabel,
							...(slide.secondaryType === 'enquiry'
								? { isEnquiry: true }
								: secondaryLink.length > 0
								? { href: secondaryLink }
								: {})
					  }
					: undefined
		};
	});

export default function HeroSlidesEditor({ initialSlides, pageSlug }: Props) {
	const initialFormSlides = useMemo(() => {
		const converted = toFormValues(initialSlides);
		return converted.length > 0 ? converted : [createEmptyHeroSlide()];
	}, [initialSlides]);
	const [slides, setSlides] = useState<HeroSlideFormValue[]>(initialFormSlides);

	const heroPreviewSlides = useMemo(() => toHeroData(slides), [slides]);
	const validSlides = useMemo(
		() =>
			heroPreviewSlides.filter(slide => {
				const hasText =
					slide.title.trim().length > 0 || slide.subtitle.trim().length > 0;
				const hasImage = slide.image.trim().length > 0;
				return hasText || hasImage;
			}),
		[heroPreviewSlides]
	);
	const hasPreview = validSlides.length > 0;

	return (
		<Editable
			label='Hero'
			formContent={
				<HeroSlidesForm
					initialSlides={initialFormSlides}
					onChange={setSlides}
					pageSlug={pageSlug}
				/>
			}>
			{hasPreview ? (
				<Hero2 data={{ slides: validSlides }} />
			) : (
				<div className='flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500'>
					Add content and a background image to preview the hero section.
				</div>
			)}
		</Editable>
	);
}
