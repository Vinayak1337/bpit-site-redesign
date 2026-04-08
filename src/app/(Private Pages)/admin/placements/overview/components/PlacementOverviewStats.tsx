'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	TrendingUp,
	Users,
	Building2,
	Award,
	Target,
	Briefcase,
	Star,
	CheckCircle,
	ArrowRight,
	Phone,
	Mail,
	MapPin,
	Lightbulb
} from 'lucide-react';

const iconMap = {
	TrendingUp,
	Users,
	Building2,
	Award,
	Target,
	Briefcase,
	Star,
	CheckCircle,
	ArrowRight,
	Phone,
	Mail,
	MapPin,
	Lightbulb
};

interface PlacementOverviewStatsProps {
	data: Array<{
		icon: string;
		value: string;
		label: string;
		iconColor: string;
		textColor: string;
	}>;
}

export default function PlacementOverviewStats({ data }: PlacementOverviewStatsProps) {
	return (
		<section className="py-16 -mt-10 relative z-20">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{data.map((stat, index) => {
						const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Target;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
							>
								<div className={`w-16 h-16 ${stat.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
									<IconComponent className="w-8 h-8" />
								</div>
								<h3 className={`text-3xl font-bold ${stat.textColor} mb-2 text-center`}>{stat.value}</h3>
								<p className="text-gray-600 text-center font-medium">{stat.label}</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}