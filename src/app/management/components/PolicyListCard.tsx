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

interface PolicyListCardData {
	title: string;
	icon: string;
	iconColor: string;
	bulletColor: string;
	policies: string[];
}

interface PolicyListCardProps {
	data: PolicyListCardData;
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

const PolicyListCard: React.FC<PolicyListCardProps> = ({ data }) => {
	const IconComponent = iconMap[data.icon as keyof typeof iconMap];

	return (
		<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
			<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
				<IconComponent className={`w-5 h-5 ${data.iconColor}`} />
				{data.title}
			</h3>
			<ul className='space-y-2 text-gray-700'>
				{data.policies.map((policy, index) => (
					<li key={index} className='flex items-start gap-2'>
						<div
							className={`w-2 h-2 ${data.bulletColor} rounded-full mt-2 flex-shrink-0`}></div>
						<span>{policy}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PolicyListCard;
