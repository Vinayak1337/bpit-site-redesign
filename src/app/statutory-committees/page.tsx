'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Shield,
	CheckCircle,
	UserX,
	Users,
	Heart,
	Eye,
	Star
} from 'lucide-react';
import { statutoryCommitteesPageData } from '@/data/statutory-committees';

const iconMap = {
	Shield: Shield,
	CheckCircle: CheckCircle,
	UserX: UserX,
	Users: Users,
	Heart: Heart,
	Eye: Eye,
	Star: Star
};

const StatutoryCommitteesPage = () => {
	const { hero, committees } = statutoryCommitteesPageData;

	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200'>
				<div className='text-center mb-8'>
					<div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
						<Shield className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						{hero.title}
					</h1>
					<p className='text-gray-600 max-w-2xl mx-auto'>{hero.description}</p>
				</div>
			</motion.div>

			{/* Committees Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{committees.map((committee, index) => {
					const IconComponent = iconMap[committee.icon as keyof typeof iconMap];
					return (
						<motion.div
							key={committee.key}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className='bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
							<div className='flex items-start gap-4'>
								<div className='p-3 bg-gray-50 rounded-xl'>
									<IconComponent className={`w-8 h-8 ${committee.iconColor}`} />
								</div>
								<div className='flex-1'>
									<h3 className='text-xl font-bold text-gray-900 mb-2'>
										{committee.title}
									</h3>
									<p className='text-gray-600 mb-4 text-sm leading-relaxed'>
										{committee.description}
									</p>
									<a
										href={committee.href}
										className='inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors'>
										Learn More
										<svg
											className='w-4 h-4'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 5l7 7-7 7'
											/>
										</svg>
									</a>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Mission Statement */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200'>
				<div className='text-center'>
					<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Star className='w-6 h-6 text-blue-600' />
					</div>
					<h3 className='text-2xl font-bold text-gray-900 mb-4'>
						Our Commitment to Excellence
					</h3>
					<p className='text-gray-700 leading-relaxed max-w-3xl mx-auto'>
						These statutory committees work in collaboration to ensure that BPIT
						maintains the highest standards of academic quality, student safety,
						and regulatory compliance. Each committee operates with
						transparency, accountability, and a student-centric approach to
						create an environment conducive to learning and growth.
					</p>
				</div>
			</motion.div>

			{/* Key Responsibilities */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.0 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h3 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
					Key Responsibilities
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='text-center'>
						<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
							<CheckCircle className='w-6 h-6 text-green-600' />
						</div>
						<h4 className='text-lg font-semibold text-gray-900 mb-2'>
							Quality Assurance
						</h4>
						<p className='text-gray-600 text-sm'>
							Continuous monitoring and enhancement of academic and
							administrative quality standards.
						</p>
					</div>
					<div className='text-center'>
						<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
							<Shield className='w-6 h-6 text-blue-600' />
						</div>
						<h4 className='text-lg font-semibold text-gray-900 mb-2'>
							Student Safety
						</h4>
						<p className='text-gray-600 text-sm'>
							Ensuring a safe, secure, and harassment-free environment for all
							students.
						</p>
					</div>
					<div className='text-center'>
						<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
							<Users className='w-6 h-6 text-purple-600' />
						</div>
						<h4 className='text-lg font-semibold text-gray-900 mb-2'>
							Regulatory Compliance
						</h4>
						<p className='text-gray-600 text-sm'>
							Adherence to all statutory requirements and regulatory guidelines.
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default StatutoryCommitteesPage;
