'use client';

import { motion } from 'framer-motion';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface SectorSectionProps {
	data: PlacementStatisticsData;
}

export default function SectorSection({ data }: SectorSectionProps) {
	if (!data.sectorWiseData?.length && !data.yearlyTrends?.length) return null;

	return (
		<section className='py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50'>
			<div className='container mx-auto px-4 sm:px-6'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
						Sector-wise Distribution
					</h2>
					<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
						Industry sectors where our students are making their mark
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className='space-y-5' role='list'>
						{(data.sectorWiseData || []).map((sector, index) => (
							<div
								key={index}
								role='listitem'
								className='bg-white rounded-xl p-5 shadow-lg'>
								<div className='flex items-center justify-between mb-3'>
									<h3 className='text-base font-bold text-gray-900'>{sector.sector}</h3>
									<span className='text-xl font-bold text-gray-900'>{sector.percentage}%</span>
								</div>
								<div className='bg-gray-100 rounded-full h-3 mb-3 overflow-hidden'>
									<motion.div
										initial={{ width: 0 }}
										whileInView={{ width: `${sector.percentage}%` }}
										transition={{ duration: 1, delay: index * 0.1 }}
										className={`bg-gradient-to-r ${sector.color} h-full rounded-full`}
									/>
								</div>
								<div className='flex flex-wrap gap-1.5' role='list' aria-label={`Companies in ${sector.sector}`}>
									{sector.companies.map((company, idx) => (
										<span
											key={idx}
											role='listitem'
											className='px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150 cursor-default'>
											{company}
										</span>
									))}
								</div>
							</div>
						))}
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className='bg-white rounded-2xl p-6 shadow-lg'>
						<h3 className='text-xl font-bold text-gray-900 mb-6'>Yearly Trends</h3>
						<div className='space-y-5'>
							{(data.yearlyTrends || []).map((trend, index) => (
								<div key={index} className='flex items-center gap-5'>
									<div className='w-14 text-base font-bold text-gray-900 flex-shrink-0'>{trend.year}</div>
									<div className='flex-1 space-y-1.5'>
										<div className='flex justify-between text-xs'>
											<span className='text-gray-500'>Placement Rate</span>
											<span className='font-semibold'>{trend.rate}%</span>
										</div>
										<div className='bg-gray-100 rounded-full h-2'>
											<motion.div
												initial={{ width: 0 }}
												whileInView={{ width: `${trend.rate}%` }}
												transition={{ duration: 1, delay: index * 0.1 }}
												className='bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full'
											/>
										</div>
										<div className='flex justify-between text-xs text-gray-400'>
											<span>Avg: ₹{trend.avg} LPA</span>
											<span>{trend.companies} companies</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
