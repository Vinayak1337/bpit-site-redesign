'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Award, Rocket } from 'lucide-react';
import { visionPageData } from '@/data/vision-mission';
import PageHero from './components/PageHero';
import QuoteSection from './components/QuoteSection';
import FeatureCard from './components/FeatureCard';

const iconMap = {
	TrendingUp: TrendingUp,
	Globe: Globe,
	Award: Award,
	Rocket: Rocket
};

const VisionPage = () => {
	const { hero, visionStatement, pillars, aspirations } = visionPageData;

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<PageHero {...hero} />

			{/* Vision Statement */}
			<QuoteSection {...visionStatement} />

			{/* Vision Pillars */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='space-y-6'>
				<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
					Vision Pillars
				</h3>

				<div className='grid md:grid-cols-2 gap-6'>
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
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-6'>
					<div
						className={`w-12 h-12 bg-gradient-to-r ${aspirations.gradient} rounded-lg flex items-center justify-center mx-auto mb-4`}>
						<Rocket className='w-6 h-6 text-white' />
					</div>
					<h3 className='text-2xl font-bold text-gray-900 mb-4'>
						{aspirations.title}
					</h3>
				</div>

				<div className='grid md:grid-cols-3 gap-6'>
					{aspirations.items.map((aspiration, index) => {
						const IconComponent = iconMap[aspiration.icon as keyof typeof iconMap];
						return (
							<div key={index} className='text-center'>
								<div
									className={`w-16 h-16 ${aspiration.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
									<IconComponent className={`w-8 h-8 ${aspiration.iconColor}`} />
								</div>
								<h4 className='font-bold text-gray-900 mb-2'>
									{aspiration.title}
								</h4>
								<p className='text-gray-700 text-sm'>{aspiration.description}</p>
							</div>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
};

export default VisionPage;
