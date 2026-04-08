'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { StudentLifeHeroData } from '@/app/(Private Pages)/actions/student-life';

interface StudentLifeHeroProps {
	data: StudentLifeHeroData;
}

const StudentLifeHero = ({ data }: StudentLifeHeroProps) => {
	const resolvedGradient =
		!data.gradient || data.gradient.trim() === 'from-blue-600 to-purple-600'
			? 'from-blue-700 via-blue-800 to-slate-900'
			: data.gradient;

	const backgroundStyles =
		data.backgroundImage && data.backgroundImage.length > 0
			? {
					backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.76), rgba(15, 23, 42, 0.62)), url(${data.backgroundImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
			  }
			: undefined;

	return (
		<section
			className={`relative overflow-hidden bg-gradient-to-br ${resolvedGradient} py-20 text-white md:py-24`}
			style={backgroundStyles}>
			<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_58%)]' />
			<div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent' />

			<div className='container relative z-10 mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className='mx-auto max-w-5xl text-center'>
					<div className='mb-6 inline-flex items-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur'>
						<span className='text-sm font-medium text-blue-100'>Student Life at BPIT</span>
					</div>

					<h1 className='text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>{data.title}</h1>

					<p className='mx-auto mt-5 max-w-3xl text-lg text-slate-200 md:text-xl'>
						{data.subtitle}
					</p>

					<div className='mt-10 grid grid-cols-2 gap-3 md:grid-cols-4'>
						<div className='rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur'>
							<div className='text-xl font-semibold'>Campus</div>
							<div className='text-xs text-blue-100/85'>Facilities</div>
						</div>
						<div className='rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur'>
							<div className='text-xl font-semibold'>Clubs</div>
							<div className='text-xs text-blue-100/85'>Communities</div>
						</div>
						<div className='rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur'>
							<div className='text-xl font-semibold'>Events</div>
							<div className='text-xs text-blue-100/85'>Festivals</div>
						</div>
						<div className='rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur'>
							<div className='text-xl font-semibold'>Support</div>
							<div className='text-xs text-blue-100/85'>Student Services</div>
						</div>
					</div>
				</motion.div>
			</div>
			{backgroundStyles ? (
				<div className='pointer-events-none absolute inset-0 bg-slate-900/25' />
			) : null}
		</section>
	);
};

export default StudentLifeHero;








