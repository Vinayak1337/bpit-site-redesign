'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Building2,
	Calendar,
	MapPin,
	Award,
	Users,
	BookOpen,
	GraduationCap,
	Globe,
	Trophy,
	Lightbulb
} from 'lucide-react';

const AboutPage = () => {
	return (
		<div className='space-y-8'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 pt-25 border border-blue-200'>
				<div className='flex items-center gap-4 mb-6'>
					<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center'>
						<Building2 className='w-8 h-8 text-white' />
					</div>
					<div>
						<h1 className='text-3xl font-bold text-gray-900'>
							Bhagwan Parshuram Institute of Technology
						</h1>
						<p className='text-blue-600 font-medium'>
							Excellence in Engineering Education
						</p>
					</div>
				</div>

				<div className='grid md:grid-cols-2 gap-6'>
					<div className='space-y-4'>
						<div className='flex items-center gap-3'>
							<Calendar className='w-5 h-5 text-blue-600' />
							<span className='text-gray-700'>Established: 2007</span>
						</div>
						<div className='flex items-center gap-3'>
							<MapPin className='w-5 h-5 text-blue-600' />
							<span className='text-gray-700'>Location: Rohini, New Delhi</span>
						</div>
						<div className='flex items-center gap-3'>
							<Award className='w-5 h-5 text-blue-600' />
							<span className='text-gray-700'>Accreditation: NBA & NAAC</span>
						</div>
						<div className='flex items-center gap-3'>
							<Users className='w-5 h-5 text-blue-600' />
							<span className='text-gray-700'>Affiliation: GGSIPU</span>
						</div>
					</div>
					<div className='space-y-4'>
						<div className='bg-white rounded-lg p-4 shadow-sm'>
							<div className='flex items-center gap-2 mb-2'>
								<GraduationCap className='w-5 h-5 text-green-600' />
								<span className='font-semibold text-gray-900'>1000+</span>
							</div>
							<p className='text-sm text-gray-600'>Students Enrolled</p>
						</div>
						<div className='bg-white rounded-lg p-4 shadow-sm'>
							<div className='flex items-center gap-2 mb-2'>
								<BookOpen className='w-5 h-5 text-purple-600' />
								<span className='font-semibold text-gray-900'>5</span>
							</div>
							<p className='text-sm text-gray-600'>Engineering Departments</p>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='space-y-6'>
				<h2 className='text-2xl font-bold text-gray-900 flex items-center gap-3'>
					<Globe className='w-6 h-6 text-blue-600' />
					Our Legacy
				</h2>

				<div className='prose prose-lg text-gray-700 leading-relaxed'>
					<p>
						Bhagwan Parshuram Institute of Technology (BPIT) stands as a beacon
						of excellence in engineering education in Delhi. Established in
						2007, BPIT has been committed to providing world-class technical
						education and fostering innovation among aspiring engineers.
					</p>

					<p>
						Located in the heart of Rohini, New Delhi, our institution is
						affiliated with Guru Gobind Singh Indraprastha University (GGSIPU)
						and is accredited by the National Board of Accreditation (NBA) and
						National Assessment and Accreditation Council (NAAC), ensuring the
						highest standards of education quality.
					</p>

					<p>
						Our campus is equipped with state-of-the-art laboratories, modern
						classrooms, and cutting-edge research facilities. We offer
						undergraduate programs in Computer Science, Information Technology,
						Electronics & Communication, Electrical Engineering, and Management
						Studies.
					</p>
				</div>

				<div className='grid md:grid-cols-3 gap-6 mt-8'>
					<motion.div
						whileHover={{ scale: 1.05 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
							<Trophy className='w-6 h-6 text-blue-600' />
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							Academic Excellence
						</h3>
						<p className='text-gray-600 text-sm'>
							Consistently high placement rates and academic achievements by our
							students.
						</p>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
							<Lightbulb className='w-6 h-6 text-green-600' />
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>Innovation Hub</h3>
						<p className='text-gray-600 text-sm'>
							Fostering creativity and innovation through research projects and
							startups.
						</p>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
							<Users className='w-6 h-6 text-purple-600' />
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							Industry Connect
						</h3>
						<p className='text-gray-600 text-sm'>
							Strong industry partnerships providing internships and placement
							opportunities.
						</p>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default AboutPage;
