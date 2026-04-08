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
import AchievementsHighlightsForm from './AchievementsHighlightsForm';
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

interface AchievementsHighlightsEditorProps {
	initialData: PlacementOverviewData;
	pageSlug: string;
}

export default function AchievementsHighlightsEditor({ initialData, pageSlug }: AchievementsHighlightsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementOverviewData>(initial);

	const formContent = useMemo(
		() => (
			<AchievementsHighlightsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label="Achievements & Highlights Section"
			formContent={formContent}
		>
			<div>
				{/* Achievements Section */}
				<section className="py-20 bg-white">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								{currentData.achievementsTitle}
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								{currentData.achievementsDescription}
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{currentData.achievements.map((achievement, index) => {
								const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award;
								return (
									<motion.div
										key={achievement.id}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center"
									>
										<div className={`w-16 h-16 bg-gradient-to-r ${achievement.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
											<IconComponent className="w-8 h-8" />
										</div>
										<div className="mb-4">
											<span className={`inline-block px-3 py-1 ${achievement.categoryColor} text-xs font-semibold rounded-full mb-3`}>
												{achievement.category}
											</span>
											<h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
											<div className={`text-2xl font-bold ${achievement.highlightColor} mb-2`}>{achievement.highlight}</div>
											<p className="text-sm text-gray-500 mb-2">{achievement.department}</p>
										</div>
										<p className="text-gray-600 leading-relaxed text-sm">{achievement.description}</p>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Placement Highlights */}
				<section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								{currentData.highlightsTitle}
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								{currentData.highlightsDescription}
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{currentData.highlights.map((dept, index) => (
								<motion.div
									key={dept.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="bg-white rounded-2xl p-6 shadow-lg text-center"
								>
									<div className={`w-12 h-12 bg-gradient-to-r ${dept.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}>
										{dept.initials}
									</div>
									<h3 className="text-lg font-bold text-gray-900 mb-4">{dept.department}</h3>
									<div className="space-y-2">
										<div>
											<p className="text-xs text-gray-500">Highest Package</p>
											<p className="text-lg font-bold text-green-600">{dept.maxPackage}</p>
										</div>
										<div>
											<p className="text-xs text-gray-500">Average Package</p>
											<p className="text-lg font-bold text-blue-600">{dept.avgPackage}</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</div>
		</Editable>
	);
}
