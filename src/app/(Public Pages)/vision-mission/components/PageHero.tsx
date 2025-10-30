'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Award, Compass, Star } from 'lucide-react';

const iconMap = {
	Eye: Eye,
	Target: Target,
	Award: Award,
	Compass: Compass,
	Star: Star
};

interface PageHeroProps {
	title: string;
	subtitle: string;
	icon: string;
	gradient: string;
	borderColor: string;
	iconBg: string;
}

const PageHero = ({
	title,
	subtitle,
	icon,
	gradient,
	borderColor,
	iconBg
}: PageHeroProps) => {
	const IconComponent = iconMap[icon as keyof typeof iconMap];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className={`bg-gradient-to-r ${gradient} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border ${borderColor}`}>
			<div className='text-center mb-6 sm:mb-8'>
				<div
					className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square`}>
					<IconComponent className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
				</div>
				<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
					{title}
				</h1>
				<p className='text-gray-600 font-medium text-sm sm:text-base'>
					{subtitle}
				</p>
			</div>
		</motion.div>
	);
};

export default PageHero;
