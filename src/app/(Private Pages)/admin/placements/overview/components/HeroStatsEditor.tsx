'use client';

import React, { useState, useMemo } from 'react';
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
import Editable from '@/components/ui/Editable';
import HeroStatsForm from './HeroStatsForm';
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';

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

interface HeroStatsEditorProps {
	initialData: PlacementOverviewData;
	pageSlug: string;
}

export default function HeroStatsEditor({ initialData, pageSlug }: HeroStatsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementOverviewData>(initial);

	const formContent = useMemo(
		() => (
			<HeroStatsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label="Hero & Stats Section"
			formContent={formContent}
		>
			<div>
				{/* Hero Section */}
				<section className={`relative py-20 bg-gradient-to-r ${currentData.hero.gradient}`}>
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
								<div className={`p-4 ${currentData.hero.iconColor} backdrop-blur-sm rounded-2xl border border-white/20`}>
									{React.createElement(iconMap[currentData.hero.icon as keyof typeof iconMap] || Briefcase, { className: "w-12 h-12" })}
								</div>
							</motion.div>
							
							<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
								{currentData.hero.title}
							</h1>
							<p className={`text-xl md:text-2xl ${currentData.hero.textColor} mb-8 leading-relaxed`}>
								{currentData.hero.subtitle}
							</p>
							<div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
						</motion.div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-16 -mt-10 relative z-20">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{currentData.stats.map((stat, index) => {
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
			</div>
		</Editable>
	);
}
