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
			className={`bg-gradient-to-r ${gradient} rounded-2xl p-8 border ${borderColor}`}>
			<div className='text-center mb-8'>
				<div
					className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
					<IconComponent className='w-8 h-8 text-white' />
				</div>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>{title}</h1>
				<p className='text-gray-600 font-medium'>{subtitle}</p>
			</div>
		</motion.div>
	);
};

export default PageHero;
