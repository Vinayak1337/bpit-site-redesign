'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { MissionData } from '@/app/(Private Pages)/actions/vision-mission';

interface MissionSectionProps {
	data: MissionData;
}

const getIcon = (iconName: string) => {
	const IconComponent = (Icons as any)[iconName];
	return IconComponent || Icons.Target;
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

const MissionSection: React.FC<MissionSectionProps> = ({ data }) => {
	if (!data || !data.hero) {
		return (
			<div className='flex items-center justify-center p-8 text-gray-500'>
				<div className='text-center'>
					<div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
						<svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
						</svg>
					</div>
					<p>Loading mission content...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-6 sm:space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className={`bg-gradient-to-r ${data.hero.gradient} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border ${data.hero.borderColor}`}>
				<div className='text-center mb-6 sm:mb-8'>
					<div
						className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${data.hero.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square`}>
						{React.createElement(getIcon(data.hero.icon), {
							className: 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white'
						})}
					</div>
					<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
						{data.hero.title}
					</h1>
					<p className='text-gray-600 font-medium text-sm sm:text-base'>
						{data.hero.subtitle}
					</p>
				</div>
			</motion.div>

			{/* Mission Statement */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-6 sm:mb-8'>
					<div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
						{React.createElement(getIcon(data.missionStatement.icon), {
							className: 'w-5 h-5 sm:w-6 sm:h-6 text-white'
						})}
					</div>
					<h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6'>
						{data.missionStatement.title}
					</h2>
					<div
						className={`bg-gradient-to-r ${data.missionStatement.gradient} rounded-lg sm:rounded-xl p-4 sm:p-6 border ${data.missionStatement.borderColor}`}>
						<p className='text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed font-medium italic'>
							&ldquo;{data.missionStatement.quote}&rdquo;
						</p>
					</div>
				</div>
			</motion.div>

			{/* Mission Objectives */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='space-y-4 sm:space-y-6'>
				<h3 className='text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8'>
					Mission Objectives
				</h3>

				<div className='space-y-3 sm:space-y-4'>
					{data.objectives.map((objective, index) => {
						const cls = getColorClasses(objective.color || 'blue');
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
								className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'>
								<div className='flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4'>
									<div className={`w-10 h-10 sm:w-12 sm:h-12 ${cls.bg} rounded-lg flex items-center justify-center shrink-0`}>
										{React.createElement(getIcon(objective.icon), {
											className: `w-5 h-5 sm:w-6 sm:h-6 ${cls.icon}`
										})}
									</div>
									<div className='flex-1'>
										<h4 className='text-base sm:text-lg font-semibold text-gray-900 mb-2'>
											{objective.title}
										</h4>
										<p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
											{objective.description}
										</p>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			{/* Mission Impact */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-4 sm:mb-6'>
					<div
						className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${data.impact.gradient} rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square`}>
						{React.createElement(getIcon(data.impact.icon), {
							className: 'w-5 h-5 sm:w-6 sm:h-6 text-white'
						})}
					</div>
					<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
						{data.impact.title}
					</h3>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'>
					{data.impact.stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
							className='text-center p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-300'>
							<div className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}>
								{stat.number}
							</div>
							<div className='text-xs sm:text-sm text-gray-600 font-medium'>
								{stat.label}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default MissionSection;