'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Rocket } from 'lucide-react';

const iconMap = {
	Zap: Zap,
	Rocket: Rocket
};

interface StatItem {
	number: string;
	label: string;
	color: string;
}

interface StatsSectionProps {
	title: string;
	icon: string;
	gradient: string;
	stats: StatItem[];
	delay?: number;
}

const StatsSection = ({
	title,
	icon,
	gradient,
	stats,
	delay = 0.4
}: StatsSectionProps) => {
	const IconComponent = iconMap[icon as keyof typeof iconMap];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay }}
			className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200'>
			<div className='text-center mb-4 sm:mb-6'>
				<div
					className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square`}>
					<IconComponent className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
				</div>
				<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
					{title}
				</h3>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'>
				{stats.map((stat, index) => (
					<div key={index} className='text-center'>
						<div
							className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-2`}>
							{stat.number}
						</div>
						<p className='text-gray-700 font-medium text-sm sm:text-base'>
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default StatsSection;
