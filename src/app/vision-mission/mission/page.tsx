'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Target,
	Heart,
	BookOpen,
	Lightbulb,
	Users,
	Globe,
	Zap
} from 'lucide-react';

const MissionPage = () => {
	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200'>
				<div className='text-center mb-8'>
					<div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
						<Target className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>Our Mission</h1>
					<p className='text-green-600 font-medium'>
						Empowering Minds, Building Futures
					</p>
				</div>
			</motion.div>

			{/* Mission Statement */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-8'>
					<div className='w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Heart className='w-6 h-6 text-white' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						Mission Statement
					</h2>
					<div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100'>
						<p className='text-lg text-gray-800 leading-relaxed font-medium italic mb-4'>
							&ldquo;To provide quality technical education through innovative
							teaching methodologies, foster research and development
							activities, promote industry-academia collaboration, and develop
							skilled professionals with strong ethical values who can
							contribute effectively to the technological growth of the nation
							and society.&rdquo;
						</p>
					</div>
				</div>
			</motion.div>

			{/* Mission Objectives */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='space-y-6'>
				<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
					Mission Objectives
				</h3>

				<div className='space-y-4'>
					{/* Objective 1 */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
								<BookOpen className='w-5 h-5 text-blue-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-2'>
									Quality Education
								</h4>
								<p className='text-gray-700 leading-relaxed'>
									Deliver comprehensive technical education through modern
									curriculum, experienced faculty, and innovative teaching
									methodologies that prepare students for the challenges of the
									21st century.
								</p>
							</div>
						</div>
					</div>

					{/* Objective 2 */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
								<Lightbulb className='w-5 h-5 text-green-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-2'>
									Research & Innovation
								</h4>
								<p className='text-gray-700 leading-relaxed'>
									Promote a culture of research, innovation, and
									entrepreneurship among students and faculty to develop
									solutions for real-world problems and contribute to
									technological advancement.
								</p>
							</div>
						</div>
					</div>

					{/* Objective 3 */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
								<Users className='w-5 h-5 text-purple-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-2'>
									Industry Collaboration
								</h4>
								<p className='text-gray-700 leading-relaxed'>
									Foster strong industry-academia partnerships through
									internships, projects, and placements to ensure students are
									industry-ready and meet the evolving needs of the corporate
									world.
								</p>
							</div>
						</div>
					</div>

					{/* Objective 4 */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
								<Heart className='w-5 h-5 text-orange-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-2'>
									Ethical Development
								</h4>
								<p className='text-gray-700 leading-relaxed'>
									Instill strong moral and ethical values in students,
									developing them as responsible citizens who contribute
									positively to society and uphold the highest standards of
									professional integrity.
								</p>
							</div>
						</div>
					</div>

					{/* Objective 5 */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
								<Globe className='w-5 h-5 text-teal-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-2'>
									Global Competency
								</h4>
								<p className='text-gray-700 leading-relaxed'>
									Develop globally competent engineers through exposure to
									international best practices, cross-cultural learning, and
									collaboration with leading institutions worldwide.
								</p>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Mission Impact */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-6'>
					<div className='w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Zap className='w-6 h-6 text-white' />
					</div>
					<h3 className='text-2xl font-bold text-gray-900 mb-4'>
						Mission Impact
					</h3>
				</div>

				<div className='grid md:grid-cols-3 gap-6'>
					<div className='text-center'>
						<div className='text-3xl font-bold text-green-600 mb-2'>5000+</div>
						<p className='text-gray-700 font-medium'>Alumni Making Impact</p>
					</div>

					<div className='text-center'>
						<div className='text-3xl font-bold text-blue-600 mb-2'>95%</div>
						<p className='text-gray-700 font-medium'>Placement Success Rate</p>
					</div>

					<div className='text-center'>
						<div className='text-3xl font-bold text-purple-600 mb-2'>100+</div>
						<p className='text-gray-700 font-medium'>Research Publications</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default MissionPage;
