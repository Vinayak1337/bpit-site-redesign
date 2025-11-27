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
import TrainingAreasForm from './TrainingAreasForm';
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

interface TrainingAreasEditorProps {
	initialData: PlacementOverviewData;
	pageSlug: string;
}

export default function TrainingAreasEditor({ initialData, pageSlug }: TrainingAreasEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementOverviewData>(initial);

	const formContent = useMemo(
		() => (
			<TrainingAreasForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label="Training Areas Section"
			formContent={formContent}
		>
			{/* Technical Training Section */}
			<section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							{currentData.trainingTitle}
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							{currentData.trainingDescription}
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{currentData.trainingAreas.map((area, index) => {
							const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Users;
							return (
								<motion.div
									key={area.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="bg-white rounded-2xl p-8 shadow-lg"
								>
									<div className={`w-16 h-16 bg-gradient-to-r ${area.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
										<IconComponent className="w-8 h-8" />
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{area.title}</h3>
									<ul className="space-y-2">
										{area.skills.map((skill, skillIndex) => (
											<li key={skillIndex} className="flex items-center space-x-2">
												<CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
												<span className="text-sm text-gray-700">{skill}</span>
											</li>
										))}
									</ul>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>
		</Editable>
	);
}
