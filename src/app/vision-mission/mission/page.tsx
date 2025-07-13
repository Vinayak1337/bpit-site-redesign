'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { missionPageData } from '@/data/vision-mission';
import PageHero from '../components/PageHero';
import QuoteSection from '../components/QuoteSection';
import FeatureCard from '../components/FeatureCard';
import StatsSection from '../components/StatsSection';

const MissionPage = () => {
	const { hero, missionStatement, objectives, impact } = missionPageData;

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<PageHero {...hero} />

			{/* Mission Statement */}
			<QuoteSection {...missionStatement} />

			{/* Mission Objectives */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='space-y-6'>
				<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
					Mission Objectives
				</h3>

				<div className='space-y-4'>
					{objectives.map((objective, index) => (
						<FeatureCard
							key={index}
							{...objective}
							index={index}
							variant='objective'
						/>
					))}
				</div>
			</motion.div>

			{/* Mission Impact */}
			<StatsSection {...impact} />
		</div>
	);
};

export default MissionPage;
