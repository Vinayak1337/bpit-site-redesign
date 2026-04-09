'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Editable from '@/components/ui/Editable';
import TrendsForm from './TrendsForm';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface TrendsEditorProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
}

export default function TrendsEditor({ initialData, pageSlug }: TrendsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementStatisticsData>(initial);

	const formContent = useMemo(
		() => (
			<TrendsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Yearly Trends Section" presentation="dialog" formContent={formContent}>
			<section className='py-16 bg-white'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-12'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							Yearly Trends
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Track our placement performance over the years
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className='max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
						<div className='space-y-6'>
							{(currentData.yearlyTrends || []).map((trend, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='flex items-center space-x-6'>
									<div className='w-16 text-lg font-bold text-gray-900'>
										{trend.year}
									</div>
									<div className='flex-1 space-y-2'>
										<div className='flex justify-between text-sm'>
											<span className='text-gray-600'>Placement Rate</span>
											<span className='font-semibold'>{trend.rate}%</span>
										</div>
										<div className='bg-gray-200 rounded-full h-2'>
											<motion.div
												initial={{ width: 0 }}
												whileInView={{ width: `${trend.rate}%` }}
												transition={{ duration: 1, delay: index * 0.1 }}
												className='bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full'
											/>
										</div>
										<div className='flex justify-between text-xs text-gray-500'>
											<span>Avg: ₹{trend.avg} LPA</span>
											<span>{trend.companies} companies</span>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>
		</Editable>
	);
}
