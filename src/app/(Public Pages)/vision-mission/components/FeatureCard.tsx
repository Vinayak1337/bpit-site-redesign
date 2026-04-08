'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	BookOpen,
	Lightbulb,
	Globe,
	Users,
	Heart,
	Target,
	TrendingUp,
	Star,
	Award,
	Eye,
	Zap,
	CheckCircle
} from 'lucide-react';

const iconMap = {
	BookOpen: BookOpen,
	Lightbulb: Lightbulb,
	Globe: Globe,
	Users: Users,
	Heart: Heart,
	Target: Target,
	TrendingUp: TrendingUp,
	Star: Star,
	Award: Award,
	Eye: Eye,
	Zap: Zap,
	CheckCircle: CheckCircle
};

interface FeatureCardProps {
	icon: string;
	title: string;
	description: string | string[];
	iconColor: string;
	bgColor: string;
	index: number;
	variant?: 'default' | 'objective' | 'commitment';
}

const FeatureCard = ({
	icon,
	title,
	description,
	iconColor,
	bgColor,
	index,
	variant = 'default'
}: FeatureCardProps) => {
	const IconComponent = iconMap[icon as keyof typeof iconMap];

	const renderDescription = () => {
		if (Array.isArray(description)) {
			return (
				<ul className='space-y-2 text-gray-700'>
					{description.map((item, idx) => (
						<li key={idx} className='flex items-start gap-2'>
							<CheckCircle className='w-3 h-3 sm:w-4 sm:h-4 text-green-600 mt-1 flex-shrink-0' />
							<span className='text-xs sm:text-sm leading-relaxed'>{item}</span>
						</li>
					))}
				</ul>
			);
		}
		return (
			<p className='text-gray-700 leading-relaxed text-xs sm:text-sm'>
				{description}
			</p>
		);
	};

	if (variant === 'objective') {
		return (
			<div className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
				<div className='flex items-start gap-3 sm:gap-4'>
					<div
						className={`w-8 h-8 sm:w-10 sm:h-10 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1 aspect-square`}>
						<IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
					</div>
					<div className='flex-1'>
						<h4 className='text-base sm:text-lg font-bold text-gray-900 mb-2'>
							{title}
						</h4>
						{renderDescription()}
					</div>
				</div>
			</div>
		);
	}

	if (variant === 'commitment') {
		return (
			<div className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
				<div className='flex items-start gap-3 sm:gap-4'>
					<div
						className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0 aspect-square`}>
						<IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
					</div>
					<div className='flex-1'>
						<h4 className='text-base sm:text-lg font-bold text-gray-900 mb-3'>
							{title}
						</h4>
						{renderDescription()}
					</div>
				</div>
			</div>
		);
	}

	// Default variant
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ scale: 1.02 }}
			className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'>
			<div className='flex flex-col items-center text-center space-y-3 sm:space-y-4'>
				<div
					className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center aspect-square`}>
					<IconComponent
						className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${iconColor}`}
					/>
				</div>
				<h4 className='text-base sm:text-lg md:text-xl font-bold text-gray-900'>
					{title}
				</h4>
				{renderDescription()}
			</div>
		</motion.div>
	);
};

export default FeatureCard;
