'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Editable from '@/components/ui/Editable';
import SectorForm from './SectorForm';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface SectorEditorProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
}

export default function SectorEditor({ initialData, pageSlug }: SectorEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementStatisticsData>(initial);

	const formContent = useMemo(
		() => (
			<SectorForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Sector-wise Distribution Section" formContent={formContent}>
			<section className='py-16 bg-gradient-to-br from-gray-50 to-blue-50'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-12'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							Sector-wise Distribution
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Industry sectors where our students are making their mark
						</p>
					</motion.div>

					<div className='space-y-6'>
						{(currentData.sectorWiseData || []).map((sector, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								className='bg-white rounded-xl p-6 shadow-lg'>
								<div className='flex items-center justify-between mb-4'>
									<h3 className='text-lg font-bold text-gray-900'>
										{sector.sector}
									</h3>
									<span className='text-2xl font-bold text-gray-900'>
										{sector.percentage}%
									</span>
								</div>
								<div className='bg-gray-200 rounded-full h-4 mb-3 overflow-hidden'>
									<motion.div
										initial={{ width: 0 }}
										whileInView={{ width: `${sector.percentage}%` }}
										transition={{ duration: 1, delay: index * 0.1 }}
										className={`bg-gradient-to-r ${sector.color} h-full rounded-full`}
									/>
								</div>
								<div className='flex flex-wrap gap-2'>
									{sector.companies.map((company, idx) => (
										<span
											key={idx}
											className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'>
											{company}
										</span>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</Editable>
	);
}
