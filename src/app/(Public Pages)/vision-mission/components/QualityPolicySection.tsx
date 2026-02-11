'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Star } from 'lucide-react';
import type { QualityPolicyData } from '@/app/(Private Pages)/actions/vision-mission';
import PageHero from './PageHero';
import QuoteSection from './QuoteSection';
import FeatureCard from './FeatureCard';
import ProcessSteps from './ProcessSteps';

const iconMap = {
	Award: Award,
	Shield: Shield,
	Star: Star
};

interface QualityPolicySectionProps {
	data: QualityPolicyData;
}

export default function QualityPolicySection({ data }: QualityPolicySectionProps) {
	return (
		<div className='space-y-8'>
			<QualityPolicyHeroBlock data={data} />
			<QualityPolicyStatementBlock data={data} />
			<QualityCommitmentsBlock data={data} />
			<QualityFrameworkBlock data={data} />
			<QualityAssuranceBodiesBlock data={data} />
		</div>
	);
}

export function QualityPolicyHeroBlock({ data }: QualityPolicySectionProps) {
	return <PageHero {...data.hero} />;
}

export function QualityPolicyStatementBlock({ data }: QualityPolicySectionProps) {
	return <QuoteSection {...data.policyStatement} />;
}

export function QualityCommitmentsBlock({ data }: QualityPolicySectionProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.3 }}
			className='space-y-6'>
			<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
				Our Quality Commitments
			</h3>

			<div className='grid md:grid-cols-2 gap-6'>
				{data.commitments.map((commitment, index) => (
					<FeatureCard
						key={index}
						{...commitment}
						index={index}
						variant='commitment'
					/>
				))}
			</div>
		</motion.div>
	);
}

export function QualityFrameworkBlock({ data }: QualityPolicySectionProps) {
	return (
		<ProcessSteps
			title={data.framework.title}
			titleIcon={data.framework.icon}
			titleGradient={data.framework.gradient}
			steps={data.framework.steps}
			delay={0.4}
		/>
	);
}

export function QualityAssuranceBodiesBlock({ data }: QualityPolicySectionProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.5 }}
			className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
			<h3 className='text-2xl font-bold text-gray-900 text-center mb-6'>
				{data.assuranceBodies.title}
			</h3>

			<div className='grid md:grid-cols-3 gap-6'>
				{data.assuranceBodies.items.map((body, index) => {
					const IconComponent = iconMap[body.icon as keyof typeof iconMap];
					return (
						<div
							key={index}
							className={`text-center p-4 bg-gradient-to-br ${body.gradient || 'from-gray-50 to-gray-100'} rounded-xl`}>
							<div
								className={`w-12 h-12 ${body.iconBg || 'bg-gray-600'} rounded-lg flex items-center justify-center mx-auto mb-3`}>
								{IconComponent && <IconComponent className='w-6 h-6 text-white' />}
							</div>
							<h4 className='font-bold text-gray-900 mb-2'>{body.title}</h4>
							<p className='text-gray-700 text-sm'>{body.description}</p>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
}
