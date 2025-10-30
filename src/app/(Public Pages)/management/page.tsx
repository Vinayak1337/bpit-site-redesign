'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, Target } from 'lucide-react';
import AnimatedProfileCard from '@/app/(Public Pages)/management/components/AnimatedProfileCard';

import { managementPageData } from '@/data/management';

interface ManagementPageData {
	title: string;
	leaders: Array<{
		name: string;
		position: string;
		description: string[];
		delay: number;
	}>;
	vision: {
		title: string;
		quote: string;
		delay: number;
	};
}

interface ManagementPageProps {
	data: ManagementPageData;
}

const ManagementPageWrapper = () => {
	return <ManagementPage data={managementPageData} />;
};

const ManagementPage = ({ data }: ManagementPageProps) => {
	return (
		<div className='space-y-6 sm:space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-200'>
				<div className='text-center mb-6 sm:mb-8'>
					<div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
						<Users className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
					</div>
					<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
						{data.title}
					</h1>
				</div>
			</motion.div>

			{/* Leadership Profiles */}
			<div className='space-y-6 sm:space-y-8'>
				{data.leaders.map((leader, index) => (
					<AnimatedProfileCard key={index} delay={leader.delay}>
						<div className='flex flex-col lg:flex-row gap-4 sm:gap-6 items-start'>
							<div className='w-24 h-30 sm:w-28 sm:h-35 md:w-32 md:h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 self-center lg:self-start'>
								<User className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400' />
							</div>

							<div className='flex-1'>
								<div className='mb-3 sm:mb-4'>
									<h3 className='text-lg sm:text-xl font-bold text-gray-900'>
										{leader.name}
									</h3>
									<p className='text-blue-600 font-medium text-sm sm:text-base'>
										{leader.position}
									</p>
								</div>

								<div className='prose prose-gray max-w-none text-xs sm:text-sm'>
									{leader.description.map((paragraph, paragraphIndex) => (
										<p
											key={paragraphIndex}
											className='text-gray-700 leading-relaxed mb-2 sm:mb-3'>
											{paragraph}
										</p>
									))}
								</div>
							</div>
						</div>
					</AnimatedProfileCard>
				))}
			</div>

			{/* Vision Statement */}
			<AnimatedProfileCard delay={0.6}>
				<div className='text-center'>
					<div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
						<Target className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
					</div>
					<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
						{data.vision.title}
					</h3>
					<p className='text-gray-700 leading-relaxed max-w-3xl mx-auto text-sm sm:text-base'>
						&ldquo;{data.vision.quote}&rdquo;
					</p>
				</div>
			</AnimatedProfileCard>
		</div>
	);
};

export default ManagementPageWrapper;
