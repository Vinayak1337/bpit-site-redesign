'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Shield,
	Target,
	Users,
	TrendingUp,
	CheckCircle,
	Eye,
	Award,
	FileText,
	BarChart3,
	Settings,
	BookOpen,
	Calendar,
	Star,
	Lightbulb
} from 'lucide-react';

const IQACPage = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white overflow-hidden'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl'></div>
					<div className='absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl'></div>
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
							<Shield className='w-10 h-10 text-white' />
						</motion.div>
						
						<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100'>
							IQAC
						</h1>
						
						<p className='text-xl md:text-2xl text-purple-100 mb-4 leading-relaxed'>
							Internal Quality Assurance Cell
						</p>
						
						<p className='text-lg text-purple-200 mb-8 leading-relaxed'>
							Driving Continuous Improvement in Academic Excellence and Institutional Development
						</p>
						
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='flex flex-wrap justify-center gap-4 text-sm'
						>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Quality Enhancement</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Academic Excellence</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Continuous Improvement</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-12'>
				<div className='max-w-6xl mx-auto space-y-12'>
					{/* About IQAC */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'
					>
						<div className='text-center mb-8'>
							<div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Target className='w-8 h-8 text-purple-600' />
							</div>
							<h2 className='text-3xl font-bold text-gray-900 mb-4'>About IQAC</h2>
							<p className='text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed'>
								The Internal Quality Assurance Cell (IQAC) at BPIT is a pivotal body established to ensure 
								continuous enhancement of the quality of education and institutional performance. As mandated 
								by NAAC, IQAC serves as a dynamic mechanism for quality improvement initiatives.
							</p>
						</div>
						
						<div className='grid md:grid-cols-3 gap-6'>
							<div className='text-center p-4 bg-purple-50 rounded-lg'>
								<Eye className='w-8 h-8 text-purple-600 mx-auto mb-3' />
								<h4 className='font-semibold text-gray-900 mb-2'>Vision</h4>
								<p className='text-sm text-gray-600'>
									To foster a culture of excellence and continuous quality improvement in all institutional activities.
								</p>
							</div>
							<div className='text-center p-4 bg-blue-50 rounded-lg'>
								<Target className='w-8 h-8 text-blue-600 mx-auto mb-3' />
								<h4 className='font-semibold text-gray-900 mb-2'>Mission</h4>
								<p className='text-sm text-gray-600'>
									To ensure quality enhancement through systematic planning, implementation, and monitoring of quality initiatives.
								</p>
							</div>
							<div className='text-center p-4 bg-green-50 rounded-lg'>
								<Award className='w-8 h-8 text-green-600 mx-auto mb-3' />
								<h4 className='font-semibold text-gray-900 mb-2'>Objective</h4>
								<p className='text-sm text-gray-600'>
									To promote academic excellence and institutional effectiveness through quality assurance mechanisms.
								</p>
							</div>
						</div>
					</motion.div>

					{/* Functions & Responsibilities */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'
					>
						<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>Functions & Responsibilities</h3>
						
						<div className='grid md:grid-cols-2 gap-8'>
							<div className='space-y-6'>
								<div className='flex items-start gap-4'>
									<div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0'>
										<BarChart3 className='w-5 h-5 text-blue-600' />
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>Quality Assessment</h4>
										<p className='text-gray-600 text-sm'>
											Regular monitoring and evaluation of academic and administrative processes to ensure quality standards.
										</p>
									</div>
								</div>
								
								<div className='flex items-start gap-4'>
									<div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0'>
										<TrendingUp className='w-5 h-5 text-green-600' />
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>Continuous Improvement</h4>
										<p className='text-gray-600 text-sm'>
											Implementation of quality enhancement strategies and best practices across all departments.
										</p>
									</div>
								</div>
								
								<div className='flex items-start gap-4'>
									<div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0'>
										<FileText className='w-5 h-5 text-purple-600' />
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>Documentation</h4>
										<p className='text-gray-600 text-sm'>
											Maintaining comprehensive records of quality initiatives and institutional performance metrics.
										</p>
									</div>
								</div>
							</div>
							
							<div className='space-y-6'>
								<div className='flex items-start gap-4'>
									<div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0'>
										<Users className='w-5 h-5 text-orange-600' />
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>Stakeholder Engagement</h4>
										<p className='text-gray-600 text-sm'>
											Facilitating feedback from students, faculty, and industry to enhance educational quality.
										</p>
									</div>
								</div>
								
								<div className='flex items-start gap-4'>
									<div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0'>
										<Settings className='w-5 h-5 text-red-600' />
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>Policy Implementation</h4>
										<p className='text-gray-600 text-sm'>
											Ensuring effective implementation of quality policies and procedures across the institution.
										</p>
									</div>
								</div>
								
								<div className='flex items-start gap-4'>
									<div className='w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0'>
										<BookOpen className='w-5 h-5 text-teal-600' />
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>Training & Development</h4>
										<p className='text-gray-600 text-sm'>
											Organizing faculty development programs and quality awareness sessions for staff.
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* IQAC Composition */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200'
					>
						<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>IQAC Composition</h3>
						
						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
							<div className='bg-white rounded-xl p-6 shadow-sm text-center'>
								<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Users className='w-6 h-6 text-blue-600' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>Chairperson</h4>
								<p className='text-sm text-gray-600'>Principal of the Institution</p>
							</div>
							
							<div className='bg-white rounded-xl p-6 shadow-sm text-center'>
								<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<BookOpen className='w-6 h-6 text-green-600' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>Faculty Members</h4>
								<p className='text-sm text-gray-600'>Senior faculty from different departments</p>
							</div>
							
							<div className='bg-white rounded-xl p-6 shadow-sm text-center'>
								<div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Award className='w-6 h-6 text-purple-600' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>External Expert</h4>
								<p className='text-sm text-gray-600'>Quality expert from academia/industry</p>
							</div>
							
							<div className='bg-white rounded-xl p-6 shadow-sm text-center'>
								<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Settings className='w-6 h-6 text-orange-600' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>Administrative Staff</h4>
								<p className='text-sm text-gray-600'>Representatives from admin & support services</p>
							</div>
						</div>
					</motion.div>

					{/* Quality Initiatives */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'
					>
						<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>Quality Initiatives</h3>
						
						<div className='grid md:grid-cols-3 gap-6'>
							<div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200'>
								<div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4'>
									<Lightbulb className='w-6 h-6 text-white' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-3'>Academic Enhancement</h4>
								<ul className='space-y-2 text-sm text-gray-700'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
										<span>Curriculum review and updates</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
										<span>Faculty development programs</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
										<span>Student feedback analysis</span>
									</li>
								</ul>
							</div>
							
							<div className='bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200'>
								<div className='w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4'>
									<TrendingUp className='w-6 h-6 text-white' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-3'>Infrastructure Development</h4>
								<ul className='space-y-2 text-sm text-gray-700'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Laboratory upgrades</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Digital learning resources</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
										<span>Campus facility improvements</span>
									</li>
								</ul>
							</div>
							
							<div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200'>
								<div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4'>
									<Award className='w-6 h-6 text-white' />
								</div>
								<h4 className='font-semibold text-gray-900 mb-3'>Quality Assurance</h4>
								<ul className='space-y-2 text-sm text-gray-700'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0' />
										<span>Regular quality audits</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0' />
										<span>Best practice implementation</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0' />
										<span>Performance monitoring</span>
									</li>
								</ul>
							</div>
						</div>
					</motion.div>

					{/* Annual Activities */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'
					>
						<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>Annual Activities</h3>
						
						<div className='grid md:grid-cols-2 gap-8'>
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
									<Calendar className='w-5 h-5 text-blue-600' />
									Regular Activities
								</h4>
								<div className='space-y-3'>
									<div className='bg-gray-50 rounded-lg p-4'>
										<h5 className='font-medium text-gray-900 mb-1'>IQAC Meetings</h5>
										<p className='text-sm text-gray-600'>Monthly meetings to review quality initiatives and plan improvements</p>
									</div>
									<div className='bg-gray-50 rounded-lg p-4'>
										<h5 className='font-medium text-gray-900 mb-1'>Quality Workshops</h5>
										<p className='text-sm text-gray-600'>Quarterly workshops on quality enhancement and best practices</p>
									</div>
									<div className='bg-gray-50 rounded-lg p-4'>
										<h5 className='font-medium text-gray-900 mb-1'>Annual Quality Report</h5>
										<p className='text-sm text-gray-600'>Comprehensive analysis of institutional quality metrics and achievements</p>
									</div>
								</div>
							</div>
							
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
									<FileText className='w-5 h-5 text-purple-600' />
									Documentation
								</h4>
								<div className='space-y-3'>
									<div className='bg-gray-50 rounded-lg p-4'>
										<h5 className='font-medium text-gray-900 mb-1'>Meeting Minutes</h5>
										<p className='text-sm text-gray-600'>Detailed records of all IQAC meetings and decisions</p>
									</div>
									<div className='bg-gray-50 rounded-lg p-4'>
										<h5 className='font-medium text-gray-900 mb-1'>Quality Reports</h5>
										<p className='text-sm text-gray-600'>Regular reports on quality metrics and improvement initiatives</p>
									</div>
									<div className='bg-gray-50 rounded-lg p-4'>
										<h5 className='font-medium text-gray-900 mb-1'>Best Practices</h5>
										<p className='text-sm text-gray-600'>Documentation of innovative practices and success stories</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Contact Information */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className='bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center'
					>
						<div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Shield className='w-8 h-8 text-white' />
						</div>
						<h3 className='text-2xl font-bold mb-4'>Contact IQAC</h3>
						<p className='text-lg mb-6 opacity-90'>
							For queries related to quality assurance and institutional improvement initiatives
						</p>
						<div className='flex flex-wrap justify-center gap-6 text-sm'>
							<div className='bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm'>
								<span className='font-medium'>Email: iqac@bpitindia.com</span>
							</div>
							<div className='bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm'>
								<span className='font-medium'>Phone: +91-11-XXXX-XXXX</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default IQACPage;
