'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Eye,
	Compass,
	BookOpen,
	Lightbulb,
	Globe,
	Users,
	TrendingUp,
	Award,
	Rocket
} from 'lucide-react';

const VisionPage = () => {
	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200'>
				<div className='text-center mb-8'>
					<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
						<Eye className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>Our Vision</h1>
					<p className='text-blue-600 font-medium'>
						Inspiring Excellence, Shaping Tomorrow
					</p>
				</div>
			</motion.div>

			{/* Vision Statement */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-8'>
					<div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Compass className='w-6 h-6 text-white' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						Vision Statement
					</h2>
					<div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100'>
						<p className='text-lg text-gray-800 leading-relaxed font-medium italic'>
							&ldquo;To be a premier institute of technical education,
							recognized globally for excellence in teaching, research, and
							innovation, fostering holistic development of students to become
							competent engineers and responsible citizens who contribute
							meaningfully to society and the nation&apos;s technological
							advancement.&rdquo;
						</p>
					</div>
				</div>
			</motion.div>

			{/* Vision Pillars */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='space-y-6'>
				<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
					Vision Pillars
				</h3>

				<div className='grid md:grid-cols-2 gap-6'>
					{/* Academic Excellence */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-center gap-4 mb-4'>
							<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
								<BookOpen className='w-6 h-6 text-blue-600' />
							</div>
							<h4 className='text-xl font-bold text-gray-900'>
								Academic Excellence
							</h4>
						</div>
						<p className='text-gray-700 leading-relaxed'>
							Delivering world-class technical education through innovative
							curriculum, experienced faculty, and state-of-the-art
							infrastructure to nurture future engineers.
						</p>
					</div>

					{/* Research & Innovation */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-center gap-4 mb-4'>
							<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
								<Lightbulb className='w-6 h-6 text-green-600' />
							</div>
							<h4 className='text-xl font-bold text-gray-900'>
								Research & Innovation
							</h4>
						</div>
						<p className='text-gray-700 leading-relaxed'>
							Fostering a culture of research, innovation, and entrepreneurship
							to address real-world challenges and contribute to technological
							advancement.
						</p>
					</div>

					{/* Global Recognition */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-center gap-4 mb-4'>
							<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
								<Globe className='w-6 h-6 text-purple-600' />
							</div>
							<h4 className='text-xl font-bold text-gray-900'>
								Global Recognition
							</h4>
						</div>
						<p className='text-gray-700 leading-relaxed'>
							Achieving international recognition through quality education,
							research collaborations, and partnerships with leading
							institutions worldwide.
						</p>
					</div>

					{/* Holistic Development */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-center gap-4 mb-4'>
							<div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center'>
								<Users className='w-6 h-6 text-orange-600' />
							</div>
							<h4 className='text-xl font-bold text-gray-900'>
								Holistic Development
							</h4>
						</div>
						<p className='text-gray-700 leading-relaxed'>
							Nurturing well-rounded individuals with strong technical skills,
							ethical values, and leadership qualities to serve society and the
							nation.
						</p>
					</div>
				</div>
			</motion.div>

			{/* Future Aspirations */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-6'>
					<div className='w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Rocket className='w-6 h-6 text-white' />
					</div>
					<h3 className='text-2xl font-bold text-gray-900 mb-4'>
						Future Aspirations
					</h3>
				</div>

				<div className='grid md:grid-cols-3 gap-6'>
					<div className='text-center'>
						<div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4'>
							<TrendingUp className='w-8 h-8 text-blue-600' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>2030 Goals</h4>
						<p className='text-gray-700 text-sm'>
							Achieve top 50 ranking among engineering institutes in India
						</p>
					</div>

					<div className='text-center'>
						<div className='w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4'>
							<Globe className='w-8 h-8 text-green-600' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>Global Presence</h4>
						<p className='text-gray-700 text-sm'>
							Establish international collaborations and exchange programs
						</p>
					</div>

					<div className='text-center'>
						<div className='w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4'>
							<Award className='w-8 h-8 text-purple-600' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>Excellence</h4>
						<p className='text-gray-700 text-sm'>
							Maintain highest standards of academic and research excellence
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default VisionPage;
