'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Editable from '@/components/ui/Editable';
import DepartmentForm from './DepartmentForm';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface DepartmentEditorProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	selectedYear: string;
}

export default function DepartmentEditor({
	initialData,
	pageSlug,
	selectedYear
}: DepartmentEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementStatisticsData>(initial);

	const formContent = useMemo(
		() => (
			<DepartmentForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	const departmentStats = currentData.departmentStats?.[selectedYear] || {};

	return (
		<Editable label="Department-wise Statistics Section" formContent={formContent}>
			<section className='py-16 bg-white'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-12'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							Department-wise Performance
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Detailed breakdown of placement statistics by department
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Object.entries(departmentStats).map(([dept, stats], index) => (
							<motion.div
								key={dept}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border border-gray-100'>
								<div className='flex items-center justify-between mb-6'>
									<div
										className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
											dept === 'CSE'
												? 'bg-gradient-to-r from-blue-500 to-cyan-600'
												: dept === 'IT'
													? 'bg-gradient-to-r from-green-500 to-emerald-600'
													: dept === 'ECE'
														? 'bg-gradient-to-r from-purple-500 to-violet-600'
														: dept === 'EEE'
															? 'bg-gradient-to-r from-orange-500 to-red-600'
															: 'bg-gradient-to-r from-pink-500 to-rose-600'
										}`}>
										{dept}
									</div>
									<div className='text-right'>
										<p className='text-2xl font-bold text-gray-900'>
											{Math.round((stats.placed / stats.total) * 100)}%
										</p>
										<p className='text-sm text-gray-600'>Placement Rate</p>
									</div>
								</div>

								<div className='space-y-4'>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Students Placed</span>
										<span className='font-semibold'>
											{stats.placed}/{stats.total}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Avg Package</span>
										<span className='font-semibold text-green-600'>
											₹{stats.avgPackage} LPA
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Highest Package</span>
										<span className='font-semibold text-blue-600'>
											₹{stats.highest} LPA
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Companies</span>
										<span className='font-semibold'>{stats.companies}</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</Editable>
	);
}
