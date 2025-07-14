'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	UserCheck,
	Building2,
	Users,
	Briefcase,
	GraduationCap,
	Calendar,
	Mail,
	BookOpen
} from 'lucide-react';

const LeadershipTeamPage = () => {
	return (
		<div className='space-y-8'>
			<div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200'>
				<div className='text-center mb-8'>
					<div className='w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
						<UserCheck className='w-12 h-12 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Our Leadership Team
					</h1>
					<p className='text-purple-600 font-medium'>
						Experienced Leaders Driving Excellence
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8'>
					{/* Principal */}
					<motion.div
						whileHover={{ scale: 1.02 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-center gap-4 mb-4'>
							<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
								<Building2 className='w-8 h-8 text-blue-600' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-gray-900'>
									Dr. [Principal Name]
								</h3>
								<p className='text-blue-600 font-medium'>Principal</p>
							</div>
						</div>
						<div className='space-y-2 text-sm text-gray-600'>
							<div className='flex items-center gap-2'>
								<GraduationCap className='w-4 h-4' />
								<span>Ph.D. in [Field], [University]</span>
							</div>
							<div className='flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								<span>15+ years of experience</span>
							</div>
							<div className='flex items-center gap-2'>
								<Mail className='w-4 h-4' />
								<span>principal@bpitindia.com</span>
							</div>
						</div>
						<p className='text-gray-700 mt-4 text-sm'>
							Leading the institution with a vision for academic excellence and
							innovation in engineering education.
						</p>
					</motion.div>

					{/* Vice Principal */}
					<motion.div
						whileHover={{ scale: 1.02 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-center gap-4 mb-4'>
							<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
								<Users className='w-8 h-8 text-green-600' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-gray-900'>
									Dr. [Vice Principal Name]
								</h3>
								<p className='text-green-600 font-medium'>Vice Principal</p>
							</div>
						</div>
						<div className='space-y-2 text-sm text-gray-600'>
							<div className='flex items-center gap-2'>
								<GraduationCap className='w-4 h-4' />
								<span>Ph.D. in [Field], [University]</span>
							</div>
							<div className='flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								<span>12+ years of experience</span>
							</div>
							<div className='flex items-center gap-2'>
								<Mail className='w-4 h-4' />
								<span>viceprincipal@bpitindia.com</span>
							</div>
						</div>
						<p className='text-gray-700 mt-4 text-sm'>
							Supporting institutional leadership and overseeing academic
							operations and faculty development.
						</p>
					</motion.div>

					{/* Dean Academics */}
					<motion.div
						whileHover={{ scale: 1.02 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-center gap-4 mb-4'>
							<div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center'>
								<BookOpen className='w-8 h-8 text-orange-600' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-gray-900'>
									Dr. [Dean Name]
								</h3>
								<p className='text-orange-600 font-medium'>Dean - Academics</p>
							</div>
						</div>
						<div className='space-y-2 text-sm text-gray-600'>
							<div className='flex items-center gap-2'>
								<GraduationCap className='w-4 h-4' />
								<span>Ph.D. in [Field], [University]</span>
							</div>
							<div className='flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								<span>10+ years of experience</span>
							</div>
							<div className='flex items-center gap-2'>
								<Mail className='w-4 h-4' />
								<span>dean.academics@bpitindia.com</span>
							</div>
						</div>
						<p className='text-gray-700 mt-4 text-sm'>
							Overseeing academic policies, curriculum development, and
							maintaining educational standards.
						</p>
					</motion.div>

					{/* Registrar */}
					<motion.div
						whileHover={{ scale: 1.02 }}
						className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-center gap-4 mb-4'>
							<div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center'>
								<Briefcase className='w-8 h-8 text-purple-600' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-gray-900'>
									Mr./Ms. [Registrar Name]
								</h3>
								<p className='text-purple-600 font-medium'>Registrar</p>
							</div>
						</div>
						<div className='space-y-2 text-sm text-gray-600'>
							<div className='flex items-center gap-2'>
								<GraduationCap className='w-4 h-4' />
								<span>M.A./M.Sc. in [Field]</span>
							</div>
							<div className='flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								<span>8+ years of experience</span>
							</div>
							<div className='flex items-center gap-2'>
								<Mail className='w-4 h-4' />
								<span>registrar@bpitindia.com</span>
							</div>
						</div>
						<p className='text-gray-700 mt-4 text-sm'>
							Managing student records, admissions, examinations, and
							administrative operations.
						</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default LeadershipTeamPage;
