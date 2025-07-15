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

interface StepsFrameworkData {
	title: string;
	steps: Array<{
		id: string;
		title: string;
		description: string;
		icon: string;
		iconColor: string;
		iconTextColor: string;
	}>;
}

interface StepsFrameworkProps {
	data: StepsFrameworkData;
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

const StepsFramework: React.FC<StepsFrameworkProps> = ({ data }) => {
	return (
		<div className='mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
			<h3 className='text-lg font-bold text-gray-900 mb-4 text-center'>
				{data.title}
			</h3>
			<div className='grid md:grid-cols-4 gap-4'>
				{data.steps.map(step => {
					const IconComponent = iconMap[step.icon as keyof typeof iconMap];
					return (
						<div key={step.id} className='text-center'>
							<div
								className={`w-12 h-12 ${step.iconColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
								<IconComponent className={`w-6 h-6 ${step.iconTextColor}`} />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>{step.title}</h4>
							<p className='text-sm text-gray-600'>{step.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default StepsFramework;
