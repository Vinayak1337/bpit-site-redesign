'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Building2,
	UserCheck,
	Shield,
	BookOpen,
	Users,
	Award,
	Briefcase,
	Eye,
	Target,
	GraduationCap,
	Calendar,
	Mail
} from 'lucide-react';

interface LeadershipCardData {
	id: string;
	name: string;
	position: string;
	icon: string;
	iconColor: string;
	iconTextColor: string;
	textColor: string;
	details: Array<{
		icon: string;
		text: string;
	}>;
	description: string;
}

interface LeadershipCardProps {
	data: LeadershipCardData;
}

const iconMap = {
	Building2,
	UserCheck,
	Shield,
	BookOpen,
	Users,
	Award,
	Briefcase,
	Eye,
	Target,
	GraduationCap,
	Calendar,
	Mail
};

const LeadershipCard: React.FC<LeadershipCardProps> = ({ data }) => {
	const MainIconComponent = iconMap[data.icon as keyof typeof iconMap];

	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
			<div className='flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4'>
				<div
					className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${data.iconColor} rounded-full flex items-center justify-center aspect-square flex-shrink-0`}>
					<MainIconComponent
						className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${data.iconTextColor}`}
					/>
				</div>
				<div className='text-center sm:text-left'>
					<h3 className='text-lg sm:text-xl font-bold text-gray-900'>
						{data.name}
					</h3>
					<p className={`${data.textColor} font-medium text-sm sm:text-base`}>
						{data.position}
					</p>
				</div>
			</div>
			<div className='space-y-2 text-xs sm:text-sm text-gray-600'>
				{data.details.map((detail, index) => {
					const DetailIconComponent =
						iconMap[detail.icon as keyof typeof iconMap];
					return (
						<div key={index} className='flex items-center gap-2'>
							<DetailIconComponent className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
							<span>{detail.text}</span>
						</div>
					);
				})}
			</div>
			<p className='text-gray-700 mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed'>
				{data.description}
			</p>
		</motion.div>
	);
};

export default LeadershipCard;
