'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, UserX, Users, Heart, Eye, Star } from 'lucide-react';
import type { StatutoryOverviewData } from '@/app/(Private Pages)/actions/statutory-committees';

type Props = {
	data: StatutoryOverviewData;
};

const iconMap = {
	Shield,
	CheckCircle,
	UserX,
	Users,
	Heart,
	Eye,
	Star
};

export function StatutoryOverviewHeroSection({ data }: Props) {
	return (
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
					{data.hero.title}
				</h1>
				<p className='text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed'>
					{data.hero.description}
				</p>
			</div>
		</motion.div>
	);
}

export function StatutoryOverviewCommitteesSection({ data }: Props) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
			{data.committees.map((committee, index) => {
				const IconComponent = iconMap[committee.icon as keyof typeof iconMap] || Shield;
				return (
					<motion.div
						key={`${committee.key}-${index}`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'>
						<div className='text-center mb-4 sm:mb-6'>
							<div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
								<IconComponent className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
							</div>
							<h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>
								{committee.title}
							</h3>
							<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
								{committee.description}
							</p>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}

export default function StatutoryOverviewView({ data }: Props) {
	return (
		<div className='space-y-6 sm:space-y-8'>
			<StatutoryOverviewHeroSection data={data} />
			<StatutoryOverviewCommitteesSection data={data} />
		</div>
	);
}
