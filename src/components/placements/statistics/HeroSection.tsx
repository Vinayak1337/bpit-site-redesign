'use client';

import { motion } from 'framer-motion';
import {
	BarChart3, TrendingUp, Award, Target, Users,
	Building2, Briefcase, GraduationCap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

const ICON_MAP: Record<string, LucideIcon> = {
	BarChart3, TrendingUp, Award, Target, Users, Building2, Briefcase, GraduationCap
};

interface HeroSectionProps {
	data: PlacementStatisticsData;
}

export default function HeroSection({ data }: HeroSectionProps) {
	const IconComponent = ICON_MAP[data.hero?.icon || 'BarChart3'] || BarChart3;

	return (
		<section
			className={`relative py-20 bg-gradient-to-r ${data.hero?.gradient || 'from-blue-900 via-blue-800 to-blue-900'}`}>
			<div className='relative z-10 container mx-auto px-4 sm:px-6'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center text-white max-w-4xl mx-auto'>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
						className='flex justify-center mb-6'>
						<div className='p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20'>
							<IconComponent className='w-12 h-12' />
						</div>
					</motion.div>

					<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
						{data.hero?.title || 'Placement Statistics'}
					</h1>
					<p className='text-lg md:text-xl text-blue-200 mb-8 leading-relaxed'>
						{data.hero?.subtitle ||
							'Data-driven insights into our placement success and student achievements'}
					</p>
					<div className='w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full' />
				</motion.div>
			</div>
		</section>
	);
}
