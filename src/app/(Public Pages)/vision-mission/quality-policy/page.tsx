'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { qualityPolicyData } from '@/data/vision-mission';
import PageHero from '../components/PageHero';
import QuoteSection from '../components/QuoteSection';
import FeatureCard from '../components/FeatureCard';
import ProcessSteps from '../components/ProcessSteps';
import { Award, Shield, Star } from 'lucide-react';

const iconMap = {
	Award: Award,
	Shield: Shield,
	Star: Star
};

const QualityPolicyPage = () => {
	const { hero, policyStatement, commitments, framework, assuranceBodies } =
		qualityPolicyData;

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<PageHero {...hero} />

			{/* Quality Policy Statement */}
			<QuoteSection {...policyStatement} />

			{/* Quality Commitments */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='space-y-6'>
				<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
					Our Quality Commitments
				</h3>

				<div className='grid md:grid-cols-2 gap-6'>
					{commitments.map((commitment, index) => (
						<FeatureCard
							key={index}
							{...commitment}
							index={index}
							variant='commitment'
						/>
					))}
				</div>
			</motion.div>

			{/* Quality Framework */}
			<ProcessSteps
				title={framework.title}
				titleIcon={framework.icon}
				titleGradient={framework.gradient}
				steps={framework.steps}
				delay={0.4}
			/>

			{/* Quality Assurance Bodies */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.5 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<h3 className='text-2xl font-bold text-gray-900 text-center mb-6'>
					{assuranceBodies.title}
				</h3>

				<div className='grid md:grid-cols-3 gap-6'>
					{assuranceBodies.items.map((body, index) => {
						const IconComponent = iconMap[body.icon as keyof typeof iconMap];
						return (
							<div
								key={index}
								className={`text-center p-4 bg-gradient-to-br ${body.gradient} rounded-xl`}>
								<div
									className={`w-12 h-12 ${body.iconBg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
									<IconComponent className='w-6 h-6 text-white' />
								</div>
								<h4 className='font-bold text-gray-900 mb-2'>{body.title}</h4>
								<p className='text-gray-700 text-sm'>{body.description}</p>
							</div>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
};

export default QualityPolicyPage;
