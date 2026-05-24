'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Award,
	Shield,
	CheckCircle,
	Star,
	Target,
	Trophy,
	Calendar,
	FileText,
	Users,
	BookOpen,
	TrendingUp,
	Globe
} from 'lucide-react';

const AccreditationPage = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl'></div>
					<div className='absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
				</div>
				
				<div className='relative z-10 container mx-auto px-4 py-24'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center max-w-4xl mx-auto'
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm'
						>
							<Award className='w-10 h-10 text-white' />
						</motion.div>
						
						<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100'>
							Accreditation
						</h1>
						
						<p className='text-xl md:text-2xl text-green-100 mb-8 leading-relaxed'>
							Recognized Excellence in Technical Education and Quality Standards
						</p>
						
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='flex flex-wrap justify-center gap-4 text-sm'
						>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>NAAC Accredited</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>NBA Approved</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>ISO Certified</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-12'>
				<div className='max-w-6xl mx-auto space-y-12'>
					{/* Introduction */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'
					>
						<div className='text-center mb-8'>
							<div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Shield className='w-8 h-8 text-green-600' />
							</div>
							<h2 className='text-3xl font-bold text-gray-900 mb-4'>Quality Recognition</h2>
							<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
								BPIT has achieved multiple prestigious accreditations that validate our commitment to excellence 
								in technical education, infrastructure, and academic standards.
							</p>
						</div>
					</motion.div>

					{/* Accreditation Cards */}
					<div className='grid md:grid-cols-3 gap-8'>
						{/* NAAC Accreditation */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'
						>
							<div className='text-center mb-6'>
								<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Award className='w-8 h-8 text-blue-600' />
								</div>
								<h3 className='text-2xl font-bold text-gray-900 mb-2'>NAAC</h3>
								<p className='text-blue-600 font-medium'>National Assessment and Accreditation Council</p>
							</div>
							
							<div className='space-y-4'>
								<div className='bg-blue-50 rounded-lg p-4'>
									<div className='flex items-center gap-2 mb-2'>
										<CheckCircle className='w-5 h-5 text-blue-600' />
										<span className='font-semibold text-blue-800'>Grade: A</span>
									</div>
									<p className='text-sm text-blue-700'>
										Recognized for academic excellence, infrastructure, and student support services.
									</p>
								</div>
								
								<div className='space-y-2'>
									<div className='flex items-center gap-2 text-sm text-gray-600'>
										<Calendar className='w-4 h-4' />
										<span>Accredited: 2022</span>
									</div>
									<div className='flex items-center gap-2 text-sm text-gray-600'>
										<Target className='w-4 h-4' />
										<span>Valid Until: 2027</span>
									</div>
								</div>
							</div>
						</motion.div>

						{/* NBA Accreditation */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'
						>
							<div className='text-center mb-6'>
								<div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Trophy className='w-8 h-8 text-purple-600' />
								</div>
								<h3 className='text-2xl font-bold text-gray-900 mb-2'>NBA</h3>
								<p className='text-purple-600 font-medium'>National Board of Accreditation</p>
							</div>
							
							<div className='space-y-4'>
								<div className='bg-purple-50 rounded-lg p-4'>
									<div className='flex items-center gap-2 mb-2'>
										<CheckCircle className='w-5 h-5 text-purple-600' />
										<span className='font-semibold text-purple-800'>Programs Accredited</span>
									</div>
									<p className='text-sm text-purple-700'>
										Computer Science, IT, ECE, and Electrical Engineering programs approved.
									</p>
								</div>
								
								<div className='space-y-2'>
									<div className='flex items-center gap-2 text-sm text-gray-600'>
										<Calendar className='w-4 h-4' />
										<span>Accredited: 2021</span>
									</div>
									<div className='flex items-center gap-2 text-sm text-gray-600'>
										<Target className='w-4 h-4' />
										<span>Valid Until: 2024</span>
									</div>
								</div>
							</div>
						</motion.div>

						{/* ISO Certification */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'
						>
							<div className='text-center mb-6'>
								<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Globe className='w-8 h-8 text-green-600' />
								</div>
								<h3 className='text-2xl font-bold text-gray-900 mb-2'>ISO</h3>
								<p className='text-green-600 font-medium'>International Organization for Standardization</p>
							</div>
							
							<div className='space-y-4'>
								<div className='bg-green-50 rounded-lg p-4'>
									<div className='flex items-center gap-2 mb-2'>
										<CheckCircle className='w-5 h-5 text-green-600' />
										<span className='font-semibold text-green-800'>ISO 9001:2015</span>
									</div>
									<p className='text-sm text-green-700'>
										Quality Management System certification for educational services.
									</p>
								</div>
								
								<div className='space-y-2'>
									<div className='flex items-center gap-2 text-sm text-gray-600'>
										<Calendar className='w-4 h-4' />
										<span>Certified: 2020</span>
									</div>
									<div className='flex items-center gap-2 text-sm text-gray-600'>
										<Target className='w-4 h-4' />
										<span>Valid Until: 2025</span>
									</div>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Benefits Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'
					>
						<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>Benefits of Accreditation</h3>
						
						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
							<div className='text-center'>
								<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
									<TrendingUp className='w-6 h-6 text-blue-600' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>Quality Assurance</h4>
								<p className='text-sm text-gray-600'>
									Ensures high standards in education delivery and infrastructure.
								</p>
							</div>
							
							<div className='text-center'>
								<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
									<Users className='w-6 h-6 text-green-600' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>Student Benefits</h4>
								<p className='text-sm text-gray-600'>
									Enhanced employability and recognition in higher education.
								</p>
							</div>
							
							<div className='text-center'>
								<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
									<Globe className='w-6 h-6 text-purple-600' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>Global Recognition</h4>
								<p className='text-sm text-gray-600'>
									International acceptance and credibility of our programs.
								</p>
							</div>
							
							<div className='text-center'>
								<div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
									<BookOpen className='w-6 h-6 text-orange-600' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>Continuous Improvement</h4>
								<p className='text-sm text-gray-600'>
									Regular assessment and enhancement of academic processes.
								</p>
							</div>
						</div>
					</motion.div>

					{/* Compliance & Standards */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className='bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200'
					>
						<div className='text-center mb-8'>
							<h3 className='text-2xl font-bold text-gray-900 mb-4'>Compliance & Standards</h3>
							<p className='text-gray-600 max-w-3xl mx-auto'>
								Our accreditations ensure that we maintain the highest standards in all aspects of education delivery,
								from curriculum design to infrastructure development.
							</p>
						</div>
						
						<div className='grid md:grid-cols-2 gap-8'>
							<div className='bg-white rounded-xl p-6 shadow-sm'>
								<h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
									<FileText className='w-5 h-5 text-blue-600' />
									Academic Standards
								</h4>
								<ul className='space-y-2 text-gray-600'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Curriculum aligned with industry requirements</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Regular faculty development programs</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Continuous assessment and improvement</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Student feedback integration</span>
									</li>
								</ul>
							</div>
							
							<div className='bg-white rounded-xl p-6 shadow-sm'>
								<h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
									<Shield className='w-5 h-5 text-purple-600' />
									Infrastructure Standards
								</h4>
								<ul className='space-y-2 text-gray-600'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Modern laboratories and equipment</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Digital library and online resources</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Safety and security protocols</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Accessibility and inclusive design</span>
									</li>
								</ul>
							</div>
						</div>
					</motion.div>

					{/* Future Goals */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center'
					>
						<div className='w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Target className='w-8 h-8 text-white' />
						</div>
						<h3 className='text-2xl font-bold text-gray-900 mb-4'>Future Accreditation Goals</h3>
						<p className='text-gray-600 mb-6 max-w-3xl mx-auto'>
							We are committed to continuous improvement and are working towards additional accreditations 
							and certifications to further enhance our educational standards.
						</p>
						
						<div className='flex flex-wrap justify-center gap-4'>
							<div className='bg-blue-50 rounded-lg px-4 py-2'>
								<span className='text-blue-700 font-medium'>ABET Accreditation</span>
							</div>
							<div className='bg-green-50 rounded-lg px-4 py-2'>
								<span className='text-green-700 font-medium'>QS University Rating</span>
							</div>
							<div className='bg-purple-50 rounded-lg px-4 py-2'>
								<span className='text-purple-700 font-medium'>NIRF Ranking</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default AccreditationPage;
