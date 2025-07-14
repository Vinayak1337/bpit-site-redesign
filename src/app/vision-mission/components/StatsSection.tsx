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
			className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
			<div className='text-center mb-6'>
				<div
					className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mx-auto mb-4`}>
					<IconComponent className='w-6 h-6 text-white' />
				</div>
				<h3 className='text-2xl font-bold text-gray-900 mb-4'>{title}</h3>
			</div>

			<div className='grid md:grid-cols-3 gap-6'>
				{stats.map((stat, index) => (
					<div key={index} className='text-center'>
						<div className={`text-3xl font-bold ${stat.color} mb-2`}>
							{stat.number}
						</div>
						<p className='text-gray-700 font-medium'>{stat.label}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default StatsSection;
