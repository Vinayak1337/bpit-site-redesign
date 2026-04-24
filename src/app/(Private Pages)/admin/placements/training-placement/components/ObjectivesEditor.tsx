'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import ObjectivesForm from './ObjectivesForm';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

const iconMap: Record<string, React.ComponentType<any>> = {
	CheckCircle
};

interface ObjectivesEditorProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
}

export default function ObjectivesEditor({ initialData, pageSlug }: ObjectivesEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<TrainingPlacementData>(initial);

	const formContent = useMemo(
		() => (
			<ObjectivesForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	const getIcon = (iconName: string) => iconMap[iconName] || CheckCircle;

	return (
		<Editable label="T&P Cell Objectives" presentation="dialog" formContent={formContent}>
			{currentData.objectives && currentData.objectives.length > 0 ? (
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							{currentData.objectivesTitle || 'T&P Cell Objectives'}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{currentData.objectivesDescription || 'Our core objectives'}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{currentData.objectives.map((objective, index) => {
							const ObjectiveIcon = getIcon(objective.icon);
							return (
								<motion.div
									key={objective.id || index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center shadow-lg'>
									<div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white'>
										<ObjectiveIcon className='w-8 h-8' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-4'>
										{objective.title}
									</h3>
									<p className='text-gray-600 leading-relaxed'>
										{objective.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>
			) : (
				<div className='py-20 bg-white text-center text-gray-500'>
					No objectives added. Click to add objectives.
				</div>
			)}
		</Editable>
	);
}
