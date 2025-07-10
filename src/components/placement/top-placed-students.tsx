'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

const TopPlacedStudents = () => {
	const topStudents = [
		{
			id: 1,
			name: 'Priya Sharma',
			company: 'Google',
			package: '45 LPA',
			branch: 'Computer Science',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/google.com'
		},
		{
			id: 2,
			name: 'Arjun Gupta',
			company: 'Microsoft',
			package: '42 LPA',
			branch: 'Information Technology',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/microsoft.com'
		},
		{
			id: 3,
			name: 'Sneha Patel',
			company: 'Amazon',
			package: '38 LPA',
			branch: 'Computer Science',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/amazon.com'
		},
		{
			id: 4,
			name: 'Rohit Kumar',
			company: 'Adobe',
			package: '35 LPA',
			branch: 'Electronics & Communication',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/adobe.com'
		},
		{
			id: 5,
			name: 'Ananya Singh',
			company: 'Oracle',
			package: '32 LPA',
			branch: 'Information Technology',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/oracle.com'
		},
		{
			id: 6,
			name: 'Karan Mehta',
			company: 'IBM',
			package: '28 LPA',
			branch: 'Computer Science',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/ibm.com'
		}
	];

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
						Our Top Placed Students
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className='text-lg text-gray-600 max-w-2xl mx-auto'>
						Meet the bright minds from BPIT who secured exceptional packages at
						top-tier companies worldwide
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
					<div className='text-center'>
						<div className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
							45 LPA
						</div>
						<div className='text-sm text-gray-600'>Highest Package</div>
					</div>
					<div className='text-center'>
						<div className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
							15+
						</div>
						<div className='text-sm text-gray-600'>Dream Offers</div>
					</div>
					<div className='text-center'>
						<div className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
							50+
						</div>
						<div className='text-sm text-gray-600'>Top Companies</div>
					</div>
					<div className='text-center'>
						<div className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
							98%
						</div>
						<div className='text-sm text-gray-600'>Success Rate</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default TopPlacedStudents;
