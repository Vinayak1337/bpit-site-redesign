'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Target, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type CTAButton = { label: string; href: string; icon?: 'target' | 'map' | 'phone' };
type FinalCTAData = { title: string; subtitle: string; ctas: ReadonlyArray<CTAButton> };

const EMPTY_DATA: FinalCTAData = {
	title: '',
	subtitle: '',
	ctas: []
};

const iconFor = (icon?: CTAButton['icon']) => {
	switch (icon) {
		case 'target':
			return <Target className='h-5 w-5' />;
		case 'map':
			return <MapPin className='h-5 w-5' />;
		case 'phone':
			return <Phone className='h-5 w-5' />;
		default:
			return null;
	}
};

const FinalCTA = ({ data }: { data?: FinalCTAData | null }) => {
	const safeData = data ?? EMPTY_DATA;

	if (!safeData.title && !safeData.subtitle && safeData.ctas.length === 0) {
		return null;
	}

	return (
		<section className='relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 px-6 py-10 text-white shadow-xl md:px-10 md:py-12'>
			<div className='absolute inset-0 opacity-60'>
				<div className='absolute -left-16 top-6 h-44 w-44 rounded-full bg-white/10 blur-2xl' />
				<div className='absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl' />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.55 }}
				viewport={{ once: true }}
				className='relative text-center'>
				<div className='mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-sm'>
					<GraduationCap className='h-7 w-7' />
				</div>

				{safeData.title ? (
					<h2 className='text-2xl font-semibold leading-tight md:text-4xl'>{safeData.title}</h2>
				) : null}
				{safeData.subtitle ? (
					<p className='mx-auto mt-3 max-w-3xl text-sm text-blue-100 md:text-lg'>
						{safeData.subtitle}
					</p>
				) : null}

				{safeData.ctas.length > 0 ? (
					<div className='mt-7 grid grid-cols-1 gap-3 md:grid-cols-3'>
						{safeData.ctas.map((cta, idx) => (
							<Button
								key={`${cta.label}-${idx}`}
								asChild
								variant={idx === 0 ? 'default' : 'outline'}
								size='lg'
								className={
									idx === 0
										? 'h-11 rounded-xl border border-white/30 bg-white px-5 font-semibold text-blue-900 hover:bg-blue-50'
										: 'h-11 rounded-xl border border-white/35 bg-white/10 px-5 font-semibold text-white hover:bg-white/20'
								}
								trackingEvent='admissions_cta_clicked'
								trackingData={{ label: cta.label, href: cta.href, position: idx }}>
								<Link href={cta.href} className='inline-flex items-center justify-center gap-2'>
									{iconFor(cta.icon)}
									{cta.label}
								</Link>
							</Button>
						))}
					</div>
				) : null}
			</motion.div>
		</section>
	);
};

export default FinalCTA;
