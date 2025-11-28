'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Editable from '@/components/ui/Editable';
import MetricsForm from './MetricsForm';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

interface MetricsEditorProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
}

export default function MetricsEditor({ initialData, pageSlug }: MetricsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<TrainingPlacementData>(initial);

	const formContent = useMemo(
		() => (
			<MetricsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Metrics & Statistics" formContent={formContent}>
			{currentData.statistics && currentData.statistics.length > 0 ? (
			<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							{currentData.statisticsTitle || 'Our Impact in Numbers'}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{currentData.statisticsDescription || 'Key metrics and achievements'}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						{currentData.statistics.map((stat, index) => (
							<motion.div
								key={stat.id || index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='bg-white rounded-2xl p-8 text-center shadow-lg'>
								<div className='text-4xl font-bold text-blue-600 mb-2'>
									{stat.number}
								</div>
								<div className='text-xl font-semibold text-gray-900 mb-1'>
									{stat.label}
								</div>
								<div className='text-sm text-gray-600'>{stat.sublabel}</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
			) : (
				<div className='py-20 bg-gradient-to-br from-gray-50 to-blue-50 text-center text-gray-500'>
					No statistics added. Click to add metrics.
				</div>
			)}
		</Editable>
	);
}
