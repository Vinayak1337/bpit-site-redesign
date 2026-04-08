'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FacultyMember = {
	id: number;
	name: string;
	title: string;
	department: string;
	image: string;
	researchInterest: string;
	publications: number;
	bio: string;
};

type FacultySectionProps = {
	faculty: FacultyMember[];
};

export default function FacultySection({ faculty }: FacultySectionProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	return (
		<section ref={ref} className='py-20 lg:py-32 bg-white dark:bg-gray-900'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'>
					<h2 className='text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
						Meet Our Distinguished Faculty
					</h2>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
						Learn from world-renowned experts who are leaders in their fields
						and dedicated to your success.
					</p>
				</motion.div>

				{/* Faculty Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{faculty.map((member: FacultyMember, index: number) => (
						<motion.div
							key={member.id}
							initial={{ opacity: 0, y: 50 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className='group'>
							<div className='bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 group-hover:-translate-y-4'>
								{/* Image */}
								<div className='relative overflow-hidden'>
									<Image
										src={member.image || '/placeholder.svg'}
										alt={member.name}
										width={400}
										height={256}
										className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

									{/* Hover overlay with stats */}
									<div className='absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
										<div className='grid grid-cols-1 gap-2 text-white text-center'>
											<div className='bg-black/50 rounded-lg p-2 backdrop-blur-sm mx-auto w-32 max-w-full'>
												<BookOpen className='w-6 h-4 mx-auto mb-1' />
												<div className='text-xs font-semibold'>
													{member.publications}
												</div>
												<div className='text-xs opacity-80'>Papers</div>
											</div>
										</div>
									</div>
								</div>

								{/* Content */}
								<div className='p-6'>
									<div className='mb-3'>
										<span className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full'>
											{member.department}
										</span>
									</div>

									<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
										{member.name}
									</h3>

									<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
										{member.title}
									</p>

									<p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
										{member.researchInterest}
									</p>

									<p className='text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed'>
										{member.bio}
									</p>

									<Button
										variant='outline'
										size='sm'
										className='w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 bg-transparent'>
										View Profile
										<ExternalLink className='ml-2 w-3 h-3' />
									</Button>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* View All Faculty Button */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.4 }}
					className='text-center mt-12'>
					<Button
						size='lg'
						className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full'>
						View All Faculty
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
