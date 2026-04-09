'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import CoordinatorsForm from './CoordinatorsForm';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

interface CoordinatorsEditorProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
}

export default function CoordinatorsEditor({ initialData, pageSlug }: CoordinatorsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<TrainingPlacementData>(initial);

	const formContent = useMemo(
		() => (
			<CoordinatorsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Placement Coordinators" presentation="dialog" formContent={formContent}>
			{currentData.departments && currentData.departments.length > 0 ? (
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
						{currentData.departmentsTitle ||
							'Department-wise Placement Coordinators'}
					</h2>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentData.departmentsDescription ||
								'Dedicated coordinators ensuring excellent placement opportunities'}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{currentData.departments.map((dept, index) => (
							<motion.div
								key={dept.id || index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-100'>
								<div className='flex items-start justify-between mb-6'>
									<div>
										<div className='inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-sm font-bold mb-3'>
											{dept.code}
										</div>
										<h3 className='text-2xl font-bold text-gray-900 mb-2'>
											{dept.name}
										</h3>
										<p className='text-blue-600 font-semibold'>
											Coordinator: {dept.coordinator}
										</p>
									</div>
									<div className='text-right'>
										<p className='text-2xl font-bold text-gray-900'>
											{dept.avgPackage}
										</p>
										<p className='text-sm text-gray-600'>Avg. Package</p>
									</div>
								</div>

								<div className='space-y-4'>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>
											Top Recruiters:
										</h4>
										<p className='text-gray-600 text-sm'>{dept.companies}</p>
									</div>

									<div className='pt-4 border-t border-gray-200'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center space-x-2'>
												<TrendingUp className='w-5 h-5 text-green-500' />
												<span className='text-sm font-medium text-gray-700'>
													Placement Rate
												</span>
											</div>
											<span className='text-lg font-bold text-green-600'>
												{dept.placementRate}
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
			) : (
				<div className='py-20 bg-white text-center text-gray-500'>
					No departments added. Click to add placement coordinators.
				</div>
			)}
		</Editable>
	);
}
