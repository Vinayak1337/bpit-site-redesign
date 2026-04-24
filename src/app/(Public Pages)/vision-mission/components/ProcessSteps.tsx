'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Eye, TrendingUp, Shield } from 'lucide-react';

const iconMap = {
	Target: Target,
	Zap: Zap,
	Eye: Eye,
	TrendingUp: TrendingUp,
	Shield: Shield
};

interface ProcessStep {
	icon: string;
	title: string;
	description: string;
	iconColor: string;
	bgColor: string;
}

interface ProcessStepsProps {
	title: string;
	titleIcon: string;
	titleGradient: string;
	steps: ProcessStep[];
	delay?: number;
}

const ProcessSteps = ({
	title,
	titleIcon,
	titleGradient,
	steps,
	delay = 0.4
}: ProcessStepsProps) => {
	const TitleIconComponent = iconMap[titleIcon as keyof typeof iconMap];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay }}
			className='bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200'>
			<div className='text-center mb-8'>
				<div
					className={`w-12 h-12 bg-gradient-to-r ${titleGradient} rounded-lg flex items-center justify-center mx-auto mb-4`}>
					<TitleIconComponent className='w-6 h-6 text-white' />
				</div>
				<h3 className='text-2xl font-bold text-gray-900 mb-6'>{title}</h3>
			</div>

			<div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
				{steps.map((step, index) => {
					const StepIconComponent = iconMap[step.icon as keyof typeof iconMap];
					return (
						<div key={index} className='text-center'>
							<div
								className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
								<StepIconComponent className={`w-8 h-8 ${step.iconColor}`} />
							</div>
							<h4 className='font-bold text-gray-900 mb-2'>{step.title}</h4>
							<p className='text-gray-700 text-sm'>{step.description}</p>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
};

export default ProcessSteps;
