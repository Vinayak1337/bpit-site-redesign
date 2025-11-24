'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	Shield,
	CheckCircle,
	UserX,
	Users,
	Heart,
	Eye,
	Star,
	ChevronRight
} from 'lucide-react';
import type { StatutoryOverviewData } from '@/app/(Private Pages)/actions/statutory-committees';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	Shield,
	CheckCircle,
	UserX,
	Users,
	Heart,
	Eye,
	Star
};

interface Props {
	data: StatutoryOverviewData;
}

export default function StatutoryCommitteesSection({ data }: Props) {
	const { hero, committees } = data;

	return (
		<div className='space-y-6 sm:space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-200'>
				<div className='text-center mb-6 sm:mb-8'>
					<div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
						<Shield className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
					</div>
					<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
						{hero.title}
					</h1>
					<p className='text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed'>
						{hero.description}
					</p>
				</div>
			</motion.div>

			{/* Committees Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
				{committees.map((committee, index) => {
					const IconComponent = iconMap[committee.icon] || Shield;
					return (
						<motion.div
							key={committee.key || index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}>
							<Link
								href={committee.href || '#'}
								className='block bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300'>
								<div className='text-center mb-4 sm:mb-6'>
									<div
										className={`w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square`}>
										<IconComponent
											className={`w-5 h-5 sm:w-6 sm:h-6 ${committee.iconColor || 'text-blue-600'}`}
										/>
									</div>
									<h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>
										{committee.title}
									</h3>
									<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
										{committee.description}
									</p>
								</div>
								<div className='flex items-center justify-center text-blue-600 text-sm font-medium'>
									Learn More
									<ChevronRight className='w-4 h-4 ml-1' />
								</div>
							</Link>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}

