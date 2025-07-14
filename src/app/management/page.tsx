'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, Target } from 'lucide-react';
import AnimatedProfileCard from '@/app/management/components/AnimatedProfileCard';

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
		<div className='space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200'>
				<div className='text-center mb-8'>
					<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
						<Users className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>{data.title}</h1>
				</div>
			</motion.div>

			{/* Leadership Profiles */}
			<div className='space-y-8'>
				{data.leaders.map((leader, index) => (
					<AnimatedProfileCard key={index} delay={leader.delay}>
						<div className='flex flex-col md:flex-row gap-6 items-start'>
							<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
								<User className='w-16 h-16 text-gray-400' />
							</div>

							<div className='flex-1'>
								<div className='mb-4'>
									<h3 className='text-xl font-bold text-gray-900'>
										{leader.name}
									</h3>
									<p className='text-blue-600 font-medium'>{leader.position}</p>
								</div>

								<div className='prose prose-gray max-w-none text-sm'>
									{leader.description.map((paragraph, paragraphIndex) => (
										<p key={paragraphIndex} className='text-gray-700 leading-relaxed mb-3'>
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
					<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Target className='w-6 h-6 text-blue-600' />
					</div>
					<h3 className='text-2xl font-bold text-gray-900 mb-4'>
						{data.vision.title}
					</h3>
					<p className='text-gray-700 leading-relaxed max-w-3xl mx-auto'>
						&ldquo;{data.vision.quote}&rdquo;
					</p>
				</div>
			</AnimatedProfileCard>
		</div>
	);
};

export default ManagementPageWrapper;
