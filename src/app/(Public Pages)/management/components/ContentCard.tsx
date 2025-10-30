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

interface ContentCardData {
	title: string;
	icon: string;
	iconColor: string;
	description: string;
	cards?: Array<{
		title: string;
		bgColor: string;
		textColor: string;
		listColor: string;
		items: string[];
	}>;
}

interface ContentCardProps {
	data: ContentCardData;
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

const ContentCard: React.FC<ContentCardProps> = ({ data }) => {
	const IconComponent = iconMap[data.icon as keyof typeof iconMap];

	return (
		<div className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
			<h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3'>
				<IconComponent
					className={`w-5 h-5 sm:w-6 sm:h-6 ${data.iconColor} flex-shrink-0`}
				/>
				{data.title}
			</h3>
			<p className='text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed'>
				{data.description}
			</p>

			{data.cards && (
				<div
					className={`grid grid-cols-1 ${
						data.cards.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'
					} gap-3 sm:gap-4`}>
					{data.cards.map((card, index) => (
						<div
							key={index}
							className={`${card.bgColor} rounded-lg p-3 sm:p-4`}>
							<h4
								className={`font-semibold ${card.textColor} mb-2 text-sm sm:text-base`}>
								{card.title}
							</h4>
							<ul className={`text-xs sm:text-sm ${card.listColor} space-y-1`}>
								{card.items.map((item, itemIndex) => (
									<li key={itemIndex}>• {item}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ContentCard;
