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
import ServicesTeamForm from './ServicesTeamForm';
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

interface ServicesTeamEditorProps {
	initialData: PlacementOverviewData;
	pageSlug: string;
}

export default function ServicesTeamEditor({ initialData, pageSlug }: ServicesTeamEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementOverviewData>(initial);

	const formContent = useMemo(
		() => (
			<ServicesTeamForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label="Services & Team Section"
			formContent={formContent}
		>
			<div>
				{/* Features Section */}
				<section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								{currentData.servicesTitle}
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								{currentData.servicesDescription}
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{currentData.features.map((feature, index) => {
								const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Target;
								return (
									<motion.div
										key={feature.id}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										className="bg-white rounded-2xl p-8 shadow-lg"
									>
										<div className={`w-16 h-16 bg-gradient-to-r ${feature.iconColor} rounded-2xl flex items-center justify-center mb-6 text-white`}>
											<IconComponent className="w-8 h-8" />
										</div>
										<h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
										<p className="text-gray-600 leading-relaxed">{feature.description}</p>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Team Section */}
				<section className="py-20 bg-white">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								{currentData.teamTitle}
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								{currentData.teamDescription}
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
							{currentData.teamMembers.map((member, index) => (
								<motion.div
									key={member.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center shadow-lg"
								>
									<img
										src='/avatar-default.svg'
										alt={member.name}
										className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-blue-500 mx-auto mb-6'
									/>
									<h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
									<p className="text-blue-600 font-semibold mb-4">{member.position}</p>
									<div className="flex items-center justify-center space-x-2 text-gray-600">
										<Mail className="w-4 h-4" />
										<span className="text-sm">{member.email}</span>
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
