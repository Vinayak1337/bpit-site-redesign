'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Star } from 'lucide-react';
import { visionMissionHeroData } from '@/data/vision-mission';

const iconMap = {
	Compass: Compass,
	Star: Star
};

const VisionMissionHero = () => {
	const { title, subtitle, gradient, tags } = visionMissionHeroData;
	const resolvedGradient =
		!gradient || gradient.includes('purple')
			? 'from-blue-700 via-blue-800 to-slate-900'
			: gradient;

	return (
		<section
			className={`relative overflow-hidden bg-gradient-to-br ${resolvedGradient} text-white`}>
			<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_58%)]' />
			<div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent' />

			<div className='relative z-10 container mx-auto px-4 py-24'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='mx-auto max-w-4xl text-center'>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm'>
						<Compass className='w-10 h-10 text-white' />
					</motion.div>

					<h1 className='mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-5xl font-bold text-transparent md:text-6xl'>
						{title}
					</h1>

					<p className='mb-8 text-xl leading-relaxed text-slate-200 md:text-2xl'>
						{subtitle}
					</p>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='flex flex-wrap justify-center gap-4 text-sm'>
						{tags.map((tag, index) => {
							const IconComponent = iconMap[tag.icon as keyof typeof iconMap];
							return (
								<div
									key={index}
									className='flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm'>
									<IconComponent className='w-4 h-4 text-yellow-300' />
									<span>{tag.text}</span>
								</div>
							);
						})}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default VisionMissionHero;
