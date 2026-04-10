'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Building2, DollarSign } from 'lucide-react';
import AnimatedNumber from '@/components/placements/AnimatedNumber';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface KeyMetricsSectionProps {
	data: PlacementStatisticsData;
	selectedYear: string;
}

export default function KeyMetricsSection({ data, selectedYear }: KeyMetricsSectionProps) {
	const [animated, setAnimated] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setAnimated(true), 800);
		return () => clearTimeout(timer);
	}, []);

	const currentStats = data.overallStats?.[selectedYear];
	if (!currentStats) return null;

	const metrics = [
		{
			icon: Target,
			label: 'Placement Rate',
			value: currentStats.placementRate,
			suffix: '%',
			color: 'from-green-500 to-emerald-600'
		},
		{
			icon: Users,
			label: 'Students Placed',
			value: currentStats.studentsPlaced,
			suffix: '',
			color: 'from-blue-500 to-cyan-600'
		},
		{
			icon: Building2,
			label: 'Companies Visited',
			value: currentStats.companiesVisited,
			suffix: '',
			color: 'from-purple-500 to-violet-600'
		},
		{
			icon: DollarSign,
			label: 'Highest Package',
			value: currentStats.highestPackage,
			suffix: ' LPA',
			color: 'from-orange-500 to-red-600'
		}
	];

	return (
		<section className='py-16 md:py-24'>
			<div className='container mx-auto px-4 sm:px-6'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
						Key Metrics for {selectedYear}
					</h2>
					<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
						Comprehensive overview of our placement performance
					</p>
				</motion.div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12'>
					{metrics.map((metric, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
							<div className='flex items-center justify-between mb-5'>
								<div
									className={`w-14 h-14 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center text-white`}>
									<metric.icon className='w-7 h-7' />
								</div>
							</div>
							<h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-1'>
								<AnimatedNumber value={metric.value} suffix={metric.suffix} animated={animated} />
							</h3>
							<p className='text-gray-500 font-medium text-sm'>{metric.label}</p>
						</motion.div>
					))}
				</div>

				{/* Package Statistics */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
						<h3 className='text-xl font-bold text-gray-900 mb-5'>Package Statistics</h3>
						<div className='space-y-4'>
							<div className='flex justify-between items-center'>
								<span className='text-gray-500 text-sm'>Average Package</span>
								<span className='text-xl font-bold text-blue-600'>₹{currentStats.averagePackage} LPA</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='text-gray-500 text-sm'>Median Package</span>
								<span className='text-lg font-semibold text-green-600'>₹{currentStats.medianPackage} LPA</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='text-gray-500 text-sm'>Total Students</span>
								<span className='text-lg font-semibold text-gray-900'>{currentStats.totalStudents}</span>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
						<h3 className='text-xl font-bold text-gray-900 mb-5'>Package Distribution</h3>
						<div className='space-y-3'>
							{(data.packageDistribution || []).map((item, index) => (
								<div key={index} className='flex items-center gap-3'>
									<div className='w-20 text-sm font-medium text-gray-600 flex-shrink-0'>{item.range}</div>
									<div className='flex-1'>
										<div className='bg-gray-100 rounded-full h-2.5 relative overflow-hidden'>
											<motion.div
												initial={{ width: 0 }}
												whileInView={{ width: `${item.percentage}%` }}
												transition={{ duration: 1, delay: index * 0.08 }}
												className='bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full'
											/>
										</div>
									</div>
									<div className='w-10 text-sm font-semibold text-gray-800 text-right flex-shrink-0'>{item.count}</div>
									<div className='w-10 text-sm text-gray-500 text-right flex-shrink-0'>{item.percentage}%</div>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
