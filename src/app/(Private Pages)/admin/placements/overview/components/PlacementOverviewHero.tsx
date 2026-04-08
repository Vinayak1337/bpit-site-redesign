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

interface PlacementOverviewHeroProps {
	data: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
		iconColor: string;
		textColor: string;
	};
}

export default function PlacementOverviewHero({ data }: PlacementOverviewHeroProps) {
	const IconComponent = iconMap[data.icon as keyof typeof iconMap] || Briefcase;

	return (
		<section className={`relative py-20 bg-gradient-to-r ${data.gradient}`}>
			<div className="relative z-10 container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center text-white max-w-4xl mx-auto"
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
						className="flex justify-center mb-6"
					>
						<div className={`p-4 ${data.iconColor} backdrop-blur-sm rounded-2xl border border-white/20`}>
							<IconComponent className="w-12 h-12" />
						</div>
					</motion.div>
					
					<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
						{data.title}
					</h1>
					<p className={`text-xl md:text-2xl ${data.textColor} mb-8 leading-relaxed`}>
						{data.subtitle}
					</p>
					<div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
				</motion.div>
			</div>
		</section>
	);
}