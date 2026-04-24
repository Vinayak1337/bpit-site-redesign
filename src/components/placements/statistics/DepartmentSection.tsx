'use client';

import { motion } from 'framer-motion';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface DepartmentSectionProps {
	data: PlacementStatisticsData;
	selectedYear: string;
}

const DEPT_GRADIENTS = [
	'from-blue-500 to-cyan-600',
	'from-green-500 to-emerald-600',
	'from-purple-500 to-violet-600',
	'from-orange-500 to-red-600',
	'from-pink-500 to-rose-600',
	'from-cyan-500 to-teal-600'
];

export default function DepartmentSection({ data, selectedYear }: DepartmentSectionProps) {
	const deptData = data.departmentStats?.[selectedYear];
	if (!deptData || Object.keys(deptData).length === 0) return null;

	return (
		<section className='py-16 md:py-24 bg-white'>
			<div className='container mx-auto px-4 sm:px-6'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
						Department-wise Performance
					</h2>
					<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
						Detailed breakdown of placement statistics by department
					</p>
				</motion.div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' role='list'>
					{Object.entries(deptData).map(([dept, stats], index) => {
						const gradient = DEPT_GRADIENTS[index % DEPT_GRADIENTS.length];
						const placementRate = stats.total > 0 ? Math.round((stats.placed / stats.total) * 100) : 0;

						return (
							<motion.div
								key={dept}
								role='listitem'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.08 }}
								className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
								<div className='flex items-center justify-between mb-5'>
									<div
										className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-r ${gradient}`}>
										{dept}
									</div>
									<div className='text-right'>
										<p className='text-2xl font-bold text-gray-900'>{placementRate}%</p>
										<p className='text-xs text-gray-500'>Placement Rate</p>
									</div>
								</div>

								<div className='mb-4'>
									<div className='bg-white/60 rounded-full h-2 overflow-hidden'>
										<motion.div
											initial={{ width: 0 }}
											whileInView={{ width: `${placementRate}%` }}
											transition={{ duration: 1, delay: index * 0.1 }}
											className={`bg-gradient-to-r ${gradient} h-full rounded-full`}
										/>
									</div>
								</div>

								<div className='space-y-2.5'>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>Students Placed</span>
										<span className='font-semibold'>{stats.placed}/{stats.total}</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>Avg Package</span>
										<span className='font-semibold text-green-600'>₹{stats.avgPackage} LPA</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>Highest Package</span>
										<span className='font-semibold text-blue-600'>₹{stats.highest} LPA</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>Companies</span>
										<span className='font-semibold'>{stats.companies}</span>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
