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
			className={`bg-gradient-to-r ${data.gradient} rounded-2xl p-8 border border-opacity-20 border-gray-400`}>
			<div className='text-center mb-8'>
				<div
					className={`w-24 h-24 ${data.iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
					<IconComponent className='w-12 h-12 text-white' />
				</div>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>{data.title}</h1>
				<p className={`${data.textColor} font-medium`}>{data.subtitle}</p>
			</div>
		</div>
	);
};

export default PageHero;
