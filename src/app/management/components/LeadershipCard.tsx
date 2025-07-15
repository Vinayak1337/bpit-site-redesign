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
			className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
			<div className='flex items-center gap-4 mb-4'>
				<div
					className={`w-16 h-16 ${data.iconColor} rounded-full flex items-center justify-center`}>
					<MainIconComponent className={`w-8 h-8 ${data.iconTextColor}`} />
				</div>
				<div>
					<h3 className='text-xl font-bold text-gray-900'>{data.name}</h3>
					<p className={`${data.textColor} font-medium`}>{data.position}</p>
				</div>
			</div>
			<div className='space-y-2 text-sm text-gray-600'>
				{data.details.map((detail, index) => {
					const DetailIconComponent =
						iconMap[detail.icon as keyof typeof iconMap];
					return (
						<div key={index} className='flex items-center gap-2'>
							<DetailIconComponent className='w-4 h-4' />
							<span>{detail.text}</span>
						</div>
					);
				})}
			</div>
			<p className='text-gray-700 mt-4 text-sm'>{data.description}</p>
		</motion.div>
	);
};

export default LeadershipCard;
