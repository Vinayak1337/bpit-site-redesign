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
		<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
			<h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
				<IconComponent className={`w-6 h-6 ${data.iconColor}`} />
				{data.title}
			</h3>
			<p className='text-gray-700 mb-4'>{data.description}</p>

			{data.cards && (
				<div
					className={`grid ${
						data.cards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
					} gap-4`}>
					{data.cards.map((card, index) => (
						<div key={index} className={`${card.bgColor} rounded-lg p-4`}>
							<h4 className={`font-semibold ${card.textColor} mb-2`}>
								{card.title}
							</h4>
							<ul className={`text-sm ${card.listColor} space-y-1`}>
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
