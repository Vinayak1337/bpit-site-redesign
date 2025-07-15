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
							<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
							<span className='text-sm'>{item}</span>
						</li>
					))}
				</ul>
			);
		}
		return <p className='text-gray-700 leading-relaxed'>{description}</p>;
	};

	if (variant === 'objective') {
		return (
			<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
				<div className='flex items-start gap-4'>
					<div
						className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
						<IconComponent className={`w-5 h-5 ${iconColor}`} />
					</div>
					<div>
						<h4 className='text-lg font-bold text-gray-900 mb-2'>{title}</h4>
						{renderDescription()}
					</div>
				</div>
			</div>
		);
	}

	if (variant === 'commitment') {
		return (
			<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
				<div className='flex items-start gap-4'>
					<div
						className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
						<IconComponent className={`w-6 h-6 ${iconColor}`} />
					</div>
					<div>
						<h4 className='text-lg font-bold text-gray-900 mb-3'>{title}</h4>
						{renderDescription()}
					</div>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.1 * index }}
			className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
			<div className='flex items-center gap-4 mb-4'>
				<div
					className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
					<IconComponent className={`w-6 h-6 ${iconColor}`} />
				</div>
				<h4 className='text-xl font-bold text-gray-900'>{title}</h4>
			</div>
			{renderDescription()}
		</motion.div>
	);
};

export default FeatureCard;
