'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Heart, Shield } from 'lucide-react';

const iconMap = {
	Compass: Compass,
	Heart: Heart,
	Shield: Shield
};

interface QuoteSectionProps {
	title: string;
	icon: string;
	gradient: string;
	borderColor: string;
	quote: string;
	delay?: number;
}

const QuoteSection = ({
	title,
	icon,
	gradient,
	borderColor,
	quote,
	delay = 0.2
}: QuoteSectionProps) => {
	const IconComponent = iconMap[icon as keyof typeof iconMap];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay }}
			className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
			<div className='text-center mb-8'>
				<div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
					<IconComponent className='w-6 h-6 text-white' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>{title}</h2>
				<div
					className={`bg-gradient-to-r ${gradient} rounded-xl p-6 border ${borderColor}`}>
					<p className='text-lg text-gray-800 leading-relaxed font-medium italic'>
						&ldquo;{quote}&rdquo;
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default QuoteSection;
