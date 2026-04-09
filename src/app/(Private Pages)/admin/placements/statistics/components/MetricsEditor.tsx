'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	Target,
	Users,
	Building2,
	DollarSign,
	ArrowUp,
	ArrowDown,
	Download,
	Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import Editable from '@/components/ui/Editable';
import MetricsForm from './MetricsForm';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface MetricsEditorProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
}

export default function MetricsEditor({ initialData, pageSlug }: MetricsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementStatisticsData>(initial);

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

	const [selectedYear, setSelectedYear] = useState(currentData.years?.[0] || '2024');
	const [animatedStats, setAnimatedStats] = useState(false);
	const currentStats = currentData.overallStats?.[selectedYear];

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimatedStats(true);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	const AnimatedNumber = ({
		value,
		suffix = '',
		duration = 2000
	}: {
		value: number;
		suffix?: string;
		duration?: number;
	}) => {
		const [displayValue, setDisplayValue] = useState(0);

		useEffect(() => {
			if (!animatedStats) return;

			let start = 0;
			const end = value;
			const increment = end / (duration / 16);

			const timer = setInterval(() => {
				start += increment;
				if (start >= end) {
					setDisplayValue(end);
					clearInterval(timer);
				} else {
					setDisplayValue(Math.floor(start));
				}
			}, 16);

			return () => clearInterval(timer);
		}, [value, duration, animatedStats]);

		return (
			<span>
				{displayValue}
				{suffix}
			</span>
		);
	};

	return (
		<Editable label="Key Metrics Section" presentation="dialog" formContent={formContent}>
			<section className='py-16'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-12'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							Key Metrics for {selectedYear}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Comprehensive overview of our placement performance
						</p>
					</motion.div>

					{/* Year Selector */}
					<div className='flex justify-center mb-12'>
						<div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200 inline-flex items-center space-x-4'>
							<Calendar className='w-5 h-5 text-blue-600' />
							<span className='font-semibold text-gray-700'>Academic Year:</span>
							<Select value={selectedYear} onValueChange={setSelectedYear}>
								<SelectTrigger className='w-32 border-gray-300 focus:border-blue-500'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{(currentData.years || []).map(year => (
										<SelectItem key={year} value={year}>
											{year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300'>
								<Download className='w-4 h-4 mr-2' />
								Download Report
							</Button>
						</div>
					</div>

					{currentStats && (
						<>
							{/* Main Metrics Cards */}
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
								{[
									{
										icon: Target,
										label: 'Placement Rate',
										value: currentStats.placementRate,
										suffix: '%',
										color: 'from-green-500 to-emerald-600',
										trend: 'up'
									},
									{
										icon: Users,
										label: 'Students Placed',
										value: currentStats.studentsPlaced,
										suffix: '',
										color: 'from-blue-500 to-cyan-600',
										trend: 'up'
									},
									{
										icon: Building2,
										label: 'Companies Visited',
										value: currentStats.companiesVisited,
										suffix: '',
										color: 'from-purple-500 to-violet-600',
										trend: 'up'
									},
									{
										icon: DollarSign,
										label: 'Highest Package',
										value: currentStats.highestPackage,
										suffix: ' LPA',
										color: 'from-orange-500 to-red-600',
										trend: 'up'
									}
								].map((metric, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										className='bg-white rounded-2xl p-8 shadow-xl border border-gray-100'>
										<div className='flex items-center justify-between mb-6'>
											<div
												className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center text-white`}>
												<metric.icon className='w-8 h-8' />
											</div>
											<div
												className={`flex items-center space-x-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
												{metric.trend === 'up' ? (
													<ArrowUp className='w-4 h-4' />
												) : (
													<ArrowDown className='w-4 h-4' />
												)}
												<span className='text-sm font-medium'>+5.2%</span>
											</div>
										</div>
										<h3 className='text-3xl font-bold text-gray-900 mb-2'>
											<AnimatedNumber value={metric.value} suffix={metric.suffix} />
										</h3>
										<p className='text-gray-600 font-medium'>{metric.label}</p>
									</motion.div>
								))}
							</div>

							{/* Package Statistics */}
							<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
								<motion.div
									initial={{ opacity: 0, x: -30 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8 }}
									className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
									<h3 className='text-2xl font-bold text-gray-900 mb-6'>
										Package Statistics
									</h3>
									<div className='space-y-4'>
										<div className='flex justify-between items-center'>
											<span className='text-gray-600'>Average Package</span>
											<span className='text-2xl font-bold text-blue-600'>
												₹{currentStats.averagePackage} LPA
											</span>
										</div>
										<div className='flex justify-between items-center'>
											<span className='text-gray-600'>Median Package</span>
											<span className='text-xl font-semibold text-green-600'>
												₹{currentStats.medianPackage} LPA
											</span>
										</div>
										<div className='flex justify-between items-center'>
											<span className='text-gray-600'>Total Students</span>
											<span className='text-xl font-semibold text-gray-900'>
												{currentStats.totalStudents}
											</span>
										</div>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.2 }}
									className='lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
									<h3 className='text-2xl font-bold text-gray-900 mb-6'>
										Package Distribution
									</h3>
									<div className='space-y-4'>
										{(currentData.packageDistribution || []).map((item, index) => (
											<div key={index} className='flex items-center space-x-4'>
												<div className='w-24 text-sm font-medium text-gray-700'>
													{item.range}
												</div>
												<div className='flex-1'>
													<div className='bg-gray-200 rounded-full h-3 relative overflow-hidden'>
														<motion.div
															initial={{ width: 0 }}
															animate={{ width: `${item.percentage}%` }}
															transition={{ duration: 1, delay: index * 0.1 }}
															className='bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full'
														/>
													</div>
												</div>
												<div className='w-20 text-sm font-semibold text-gray-900 text-right'>
													{item.count} ({item.percentage}%)
												</div>
											</div>
										))}
									</div>
								</motion.div>
							</div>
						</>
					)}
				</div>
			</section>
		</Editable>
	);
}
