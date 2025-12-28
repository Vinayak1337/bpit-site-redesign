'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { VisionMissionData } from '@/app/(Private Pages)/actions/vision-mission';

type Props = {
	data: VisionMissionData;
};

const getIcon = (iconName: string) => {
	const IconComponent = (Icons as any)[iconName];
	return IconComponent || Icons.Eye;
};

const getColorClasses = (color: string) => {
	switch (color) {
		case 'green':
			return { bg: 'bg-green-100', icon: 'text-green-600' };
		case 'purple':
			return { bg: 'bg-purple-100', icon: 'text-purple-600' };
		case 'orange':
			return { bg: 'bg-orange-100', icon: 'text-orange-600' };
		case 'red':
			return { bg: 'bg-red-100', icon: 'text-red-600' };
		case 'indigo':
			return { bg: 'bg-indigo-100', icon: 'text-indigo-600' };
		case 'blue':
		default:
			return { bg: 'bg-blue-100', icon: 'text-blue-600' };
	}
};

export default function VisionMissionSection({ data }: Props) {
	return (
		<div className='space-y-6 sm:space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className={`text-center p-6 sm:p-8 rounded-xl bg-gradient-to-br ${data.hero.gradient} border ${data.hero.borderColor} backdrop-blur-sm`}>
				<div className={`w-12 h-12 sm:w-16 sm:h-16 ${data.hero.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
					{React.createElement(getIcon(data.hero.icon), {
						className: 'w-6 h-6 sm:w-8 sm:h-8 text-white'
					})}
				</div>
				<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
					{data.hero.title}
				</h1>
				<p className='text-base sm:text-lg text-gray-700 font-medium'>
					{data.hero.subtitle}
				</p>
			</motion.div>

			{/* Vision Statement */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className={`p-6 sm:p-8 rounded-xl bg-gradient-to-br ${data.visionStatement.gradient} border ${data.visionStatement.borderColor} backdrop-blur-sm`}>
				<div className='flex items-center gap-3 mb-4'>
					{React.createElement(getIcon(data.visionStatement.icon), {
						className: 'w-6 h-6 text-blue-600'
					})}
					<h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
						{data.visionStatement.title}
					</h2>
				</div>
				<blockquote className='text-sm sm:text-base text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-4'>
					{data.visionStatement.quote}
				</blockquote>
			</motion.div>

			{/* Vision Pillars */}
			{data.pillars.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className='space-y-4 sm:space-y-6'>
					<h3 className='text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8'>
						Vision Pillars
					</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
						{data.pillars.map((pillar, index) => {
							const cls = getColorClasses(pillar.color || 'blue');
							return (
								<motion.div
									key={index}
									whileHover={{ scale: 1.02 }}
									className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
									<div className={`w-10 h-10 sm:w-12 sm:h-12 ${cls.bg} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
										{React.createElement(getIcon(pillar.icon), {
											className: `w-5 h-5 sm:w-6 sm:h-6 ${cls.icon}`
										})}
									</div>
									<h4 className='font-semibold text-gray-900 mb-2 text-sm sm:text-base'>
										{pillar.title}
									</h4>
									<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
										{pillar.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			)}

			{/* Future Aspirations */}
			{data.aspirations.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className='space-y-4 sm:space-y-6'>
					<h3 className='text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8'>
						Future Aspirations
					</h3>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
						{data.aspirations.map((aspiration, index) => {
							const cls = getColorClasses(aspiration.color || 'blue');
							return (
								<motion.div
									key={index}
									whileHover={{ scale: 1.02 }}
									className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
									<div className={`w-10 h-10 sm:w-12 sm:h-12 ${cls.bg} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
										{React.createElement(getIcon(aspiration.icon), {
											className: `w-5 h-5 sm:w-6 sm:h-6 ${cls.icon}`
										})}
									</div>
									<h4 className='font-semibold text-gray-900 mb-2 text-sm sm:text-base'>
										{aspiration.title}
									</h4>
									<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
										{aspiration.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			)}
		</div>
	);
}