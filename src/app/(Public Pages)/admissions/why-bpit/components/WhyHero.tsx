'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WhyBpitHeroData } from '@/app/(Private Pages)/actions/admissions';

const EMPTY_DATA: WhyBpitHeroData = {
	badgeText: '',
	title: '',
	description: '',
	quickPointsTitle: '',
	quickPoints: [],
	primaryCta: { label: '', href: '' },
	secondaryCta: { label: '', href: '' }
};

const WhyHero = ({ data }: { data?: WhyBpitHeroData | null }) => {
	const safeData = data ?? EMPTY_DATA;
	const hasPrimaryCta = Boolean(safeData.primaryCta.label && safeData.primaryCta.href);
	const hasSecondaryCta = Boolean(safeData.secondaryCta.label && safeData.secondaryCta.href);

	if (!safeData.title && !safeData.description && safeData.quickPoints.length === 0) {
		return null;
	}

	return (
		<section className='relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 text-white shadow-xl'>
			<div className='absolute inset-0 opacity-80'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_48%)]' />
				<div className='absolute -top-20 left-1/3 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl' />
				<div className='absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl' />
			</div>

			<div className='relative grid gap-8 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[1.35fr_1fr] lg:items-center'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='max-w-2xl'>
					{safeData.badgeText ? (
						<div className='mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm'>
							<GraduationCap className='h-4 w-4 text-cyan-200' />
							<span className='text-xs font-medium tracking-wide text-blue-100 md:text-sm'>
								{safeData.badgeText}
							</span>
						</div>
					) : null}

					<h1 className='text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl'>
						{safeData.title}
					</h1>
					<p className='mt-4 text-sm leading-relaxed text-blue-100 sm:text-base md:text-lg'>
						{safeData.description}
					</p>

					{hasPrimaryCta || hasSecondaryCta ? (
						<div className='mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
							{hasPrimaryCta ? (
								<Button
									asChild
									size='lg'
									className='h-11 rounded-xl bg-white px-5 font-semibold text-blue-900 hover:bg-blue-50'
									trackingEvent='why_bpit_hero_primary_cta'
									trackingData={{
										label: safeData.primaryCta.label,
										href: safeData.primaryCta.href
									}}>
									<Link href={safeData.primaryCta.href} className='inline-flex items-center gap-2'>
										{safeData.primaryCta.label}
										<ArrowRight className='h-4 w-4' />
									</Link>
								</Button>
							) : null}

							{hasSecondaryCta ? (
								<Button
									asChild
									variant='outline'
									size='lg'
									className='h-11 rounded-xl border-white/35 bg-white/10 px-5 font-semibold text-white hover:bg-white/20'
									trackingEvent='why_bpit_hero_secondary_cta'
									trackingData={{
										label: safeData.secondaryCta.label,
										href: safeData.secondaryCta.href
									}}>
									<Link href={safeData.secondaryCta.href}>{safeData.secondaryCta.label}</Link>
								</Button>
							) : null}
						</div>
					) : null}
				</motion.div>

				{safeData.quickPoints.length > 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className='rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm md:p-6'>
						{safeData.quickPointsTitle ? (
							<p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-100'>
								{safeData.quickPointsTitle}
							</p>
						) : null}
						<ul className='mt-4 space-y-3'>
							{safeData.quickPoints.map(point => (
								<li key={point} className='flex items-start gap-3 text-sm leading-relaxed text-blue-50 md:text-base'>
									<CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-cyan-200' />
									<span>{point}</span>
								</li>
							))}
						</ul>
					</motion.div>
				) : null}
			</div>
		</section>
	);
};

export default WhyHero;
