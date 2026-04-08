'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import MissionForm from './MissionForm';
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';

interface MissionEditorProps {
	initialData: PlacementOverviewData;
	pageSlug: string;
}

export default function MissionEditor({ initialData, pageSlug }: MissionEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementOverviewData>(initial);

	const formContent = useMemo(
		() => (
			<MissionForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label="Mission Section"
			formContent={formContent}
		>
			{/* Mission Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							{currentData.missionTitle}
						</h2>
						<p className="text-xl text-gray-600 leading-relaxed">
							{currentData.missionDescription}
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="space-y-6"
						>
							<div className="prose prose-lg text-gray-700">
								<p className="text-lg leading-relaxed">
									{currentData.missionContent.paragraph1}
								</p>
								<p className="text-lg leading-relaxed">
									{currentData.missionContent.paragraph2}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								{currentData.missionContent.features.map((feature, index) => (
									<div key={index} className="flex items-center space-x-3">
										<CheckCircle className="w-6 h-6 text-green-500" />
										<span className="text-gray-700 font-medium">{feature}</span>
									</div>
								))}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="relative"
						>
							<div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-1">
								<div className="bg-white rounded-2xl p-8 h-full">
									<h3 className="text-2xl font-bold text-gray-900 mb-6">Key Objectives</h3>
									<ul className="space-y-4">
										{currentData.missionContent.objectives.map((objective, index) => (
											<motion.li
												key={index}
												initial={{ opacity: 0, x: 20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 }}
												className="flex items-center space-x-3"
											>
												<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full" />
												<span className="text-gray-700">{objective}</span>
											</motion.li>
										))}
									</ul>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</Editable>
	);
}
