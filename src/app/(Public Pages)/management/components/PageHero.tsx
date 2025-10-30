'use client';

import React from 'react';
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

interface PageHeroData {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
	iconColor: string;
	textColor: string;
}

interface PageHeroProps {
	data: PageHeroData;
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

const PageHero: React.FC<PageHeroProps> = ({ data }) => {
	const IconComponent = iconMap[data.icon as keyof typeof iconMap];

	return (
		<div
			className={`bg-gradient-to-r ${data.gradient} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-opacity-20 border-gray-400`}>
			<div className='text-center mb-6 sm:mb-8'>
				<div
					className={`w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 ${data.iconColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square`}>
					<IconComponent className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-white' />
				</div>
				<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
					{data.title}
				</h1>
				<p className={`${data.textColor} font-medium text-sm sm:text-base`}>
					{data.subtitle}
				</p>
			</div>
		</div>
	);
};

export default PageHero;
