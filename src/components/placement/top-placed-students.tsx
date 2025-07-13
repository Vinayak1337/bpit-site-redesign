'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface Student {
	id: number;
	name: string;
	company: string;
	package: string;
	branch: string;
	year: string;
	image: string;
	companyLogo: string;
}

interface Statistic {
	value: string;
	label: string;
}

interface TopPlacedStudentsData {
	title: string;
	subtitle: string;
	students: Student[];
	statistics: Statistic[];
}

interface TopPlacedStudentsProps {
	data: TopPlacedStudentsData;
}

const TopPlacedStudents = ({ data }: TopPlacedStudentsProps) => {
	const topStudents = data.students;

	// Duplicate the array for seamless infinite scroll
	const duplicatedStudents = [...topStudents, ...topStudents];

	return (
		<section className='py-16 bg-gray-50 overflow-hidden'>
			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<div className='text-center mb-12'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
						{data.title}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className='text-lg text-gray-600 max-w-2xl mx-auto'>
						{data.subtitle}
					</motion.p>
				</div>

				{/* Infinite Scrolling Students */}
				<div className='relative'>
					<div className='overflow-hidden'>
						<motion.div
							className='flex space-x-8'
							animate={{
								x: [0, -1600]
							}}
							transition={{
								x: {
									repeat: Infinity,
									repeatType: 'loop',
									duration: 30,
									ease: 'linear'
								}
							}}>
							{duplicatedStudents.map((student, index) => (
								<motion.div
									key={`${student.name}-${index}`}
									className='flex-shrink-0 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group mb-5'
									whileHover={{ scale: 1.02 }}>
									{/* Student Image */}
									<div className='relative h-48 overflow-hidden'>
										<Image
											src={student.image}
											alt={student.name}
											width={300}
											height={200}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
										/>
										<div className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md'>
											<Image
												src={student.companyLogo}
												alt={student.company}
												width={24}
												height={24}
												className='w-6 h-6 object-contain'
											/>
										</div>
										<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4'>
											<div className='text-white text-sm font-medium'>
												{student.year} Graduate
											</div>
										</div>
									</div>

									{/* Student Info */}
									<div className='p-6'>
										<h3 className='text-xl font-bold text-gray-900 mb-2'>
											{student.name}
										</h3>
										<p className='text-sm text-gray-600 mb-3'>
											{student.branch}
										</p>

										<div className='flex items-center justify-between'>
											<div>
												<div className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center'>
													<DollarSign className='w-5 h-5 mr-1 text-blue-600' />
													{student.package}
												</div>
												<div className='text-xs text-gray-500'>Package</div>
											</div>
											<div className='text-right'>
												<div className='text-lg font-semibold text-gray-900'>
													{student.company}
												</div>
												<div className='text-xs text-gray-500'>Placed at</div>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>

					{/* Gradient Fade Effect */}
					<div className='absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10'></div>
					<div className='absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10'></div>
				</div>

				{/* Statistics */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto'>
					{data.statistics.map((stat, index) => (
						<div key={index} className='text-center'>
							<div className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
								{stat.value}
							</div>
							<div className='text-sm text-gray-600'>{stat.label}</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default TopPlacedStudents;
