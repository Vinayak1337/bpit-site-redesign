'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Target, Users } from 'lucide-react';

const PrincipalMessagePage = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='space-y-8'>
			<div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200'>
				<div className='flex items-start gap-6 mb-8'>
					<div className='w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
						<User className='w-10 h-10 text-white' />
					</div>
					<div>
						<h1 className='text-3xl font-bold text-gray-900 mb-2'>
							Principal&apos;s Message
						</h1>
						<p className='text-green-600 font-medium'>
							Leading Academic Excellence and Innovation
						</p>
					</div>
				</div>

				<div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
					<div className='prose prose-lg text-gray-700 leading-relaxed max-w-none'>
						<p className='text-lg font-medium text-green-800 mb-4'>
							&ldquo;Dear Students and Academic Community,&rdquo;
						</p>

						<p>
							Welcome to BPIT, where academic excellence meets innovation. As
							the Principal, I am proud to lead an institution that has
							consistently set benchmarks in engineering education and has
							produced thousands of successful professionals who are making
							significant contributions to the industry and society.
						</p>

						<p>
							Our institution stands on the pillars of quality education,
							research excellence, and industry relevance. We have carefully
							designed our curriculum to bridge the gap between theoretical
							knowledge and practical application, ensuring our graduates are
							industry-ready from day one.
						</p>

						<p>
							The faculty at BPIT comprises experienced academics and industry
							professionals who bring diverse perspectives to the classroom. Our
							state-of-the-art laboratories, modern infrastructure, and rich
							library resources provide the perfect environment for learning and
							research.
						</p>

						<p>
							We encourage our students to participate in various co-curricular
							and extra-curricular activities, technical competitions, and
							research projects. These experiences not only enhance their
							technical skills but also develop their leadership qualities,
							teamwork abilities, and communication skills.
						</p>

						<p>
							I invite you to be part of our vibrant academic community where
							innovation thrives, dreams take shape, and future leaders are
							nurtured. Together, let us continue to uphold the values of
							excellence, integrity, and service that define BPIT.
						</p>

						<p className='font-medium text-green-800 mt-6'>
							Best wishes for your academic journey.
						</p>

						<div className='mt-6 pt-4 border-t border-gray-200'>
							<p className='font-semibold text-gray-900'>
								Prof. [Principal Name]
							</p>
							<p className='text-green-600'>Principal, BPIT</p>
						</div>
					</div>
				</div>

				<div className='grid md:grid-cols-3 gap-6 mt-8'>
					<motion.div
						whileHover={{ scale: 1.05 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
							<BookOpen className='w-6 h-6 text-green-600' />
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							Academic Leadership
						</h3>
						<p className='text-gray-600 text-sm'>
							Guiding curriculum development and maintaining academic standards.
						</p>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
							<Target className='w-6 h-6 text-blue-600' />
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							Strategic Vision
						</h3>
						<p className='text-gray-600 text-sm'>
							Developing long-term strategies for institutional growth and
							excellence.
						</p>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
							<Users className='w-6 h-6 text-purple-600' />
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							Student Mentorship
						</h3>
						<p className='text-gray-600 text-sm'>
							Fostering student development and career guidance.
						</p>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default PrincipalMessagePage;
