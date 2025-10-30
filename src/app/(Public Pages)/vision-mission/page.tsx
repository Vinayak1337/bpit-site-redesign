'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { visionPageData } from '@/data/vision-mission';
import PageHero from './components/PageHero';
import QuoteSection from './components/QuoteSection';
import FeatureCard from './components/FeatureCard';

const VisionPage = () => {
	const { hero, visionStatement, pillars, aspirations } = visionPageData;

	return (
		<div className='space-y-6 sm:space-y-8'>
			{/* Hero Section */}
			<PageHero {...hero} />

			{/* Vision Statement */}
			<QuoteSection {...visionStatement} />

			{/* Vision Pillars */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='space-y-4 sm:space-y-6'>
				<h3 className='text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8'>
					Vision Pillars
				</h3>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
					{pillars.map((pillar, index) => (
						<FeatureCard
							key={index}
							{...pillar}
							index={index}
							variant='default'
						/>
					))}
				</div>
			</motion.div>

			{/* Future Aspirations */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.5 }}
				className='space-y-4 sm:space-y-6'>
				<h3 className='text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8'>
					Future Aspirations
				</h3>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
					{aspirations.items.map((aspiration, index) => (
						<FeatureCard
							key={index}
							{...aspiration}
							index={index}
							variant='default'
						/>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default VisionPage;
