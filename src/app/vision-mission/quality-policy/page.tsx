'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Award,
	Shield,
	BookOpen,
	TrendingUp,
	Users,
	Star,
	CheckCircle,
	Target,
	Zap,
	Eye
} from 'lucide-react';

const QualityPolicyPage = () => {
	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-purple-50 to-indigo-100 rounded-2xl p-8 border border-purple-200'>
				<div className='text-center mb-8'>
					<div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
						<Award className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Quality Policy
					</h1>
					<p className='text-purple-600 font-medium'>
						Commitment to Excellence in All Endeavors
					</p>
				</div>
			</motion.div>

			{/* Quality Policy Statement */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-8'>
					<div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Shield className='w-6 h-6 text-white' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						Quality Policy Statement
					</h2>
					<div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100'>
						<p className='text-lg text-gray-800 leading-relaxed font-medium italic mb-4'>
							&ldquo;BPIT is committed to providing quality technical education
							and training to produce competent engineers and technology
							leaders. We strive for continuous improvement in all our
							processes, maintain high academic standards, and ensure
							stakeholder satisfaction through effective implementation of
							Quality Management System.&rdquo;
						</p>
					</div>
				</div>
			</motion.div>

			{/* Quality Commitments */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='space-y-6'>
				<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
					Our Quality Commitments
				</h3>

				<div className='grid md:grid-cols-2 gap-6'>
					{/* Academic Excellence */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0'>
								<BookOpen className='w-6 h-6 text-blue-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-3'>
									Academic Excellence
								</h4>
								<ul className='space-y-2 text-gray-700'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Maintain updated curriculum aligned with industry needs
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Employ qualified and experienced faculty
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Provide state-of-the-art infrastructure and facilities
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Continuous Improvement */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0'>
								<TrendingUp className='w-6 h-6 text-green-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-3'>
									Continuous Improvement
								</h4>
								<ul className='space-y-2 text-gray-700'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Regular review and enhancement of academic processes
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Feedback-driven improvement initiatives
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Adoption of best practices in education
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Stakeholder Satisfaction */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0'>
								<Users className='w-6 h-6 text-purple-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-3'>
									Stakeholder Satisfaction
								</h4>
								<ul className='space-y-2 text-gray-700'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Regular feedback collection from all stakeholders
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Prompt grievance redressal mechanisms
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Transparent communication channels
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Professional Development */}
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4'>
							<div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0'>
								<Star className='w-6 h-6 text-orange-600' />
							</div>
							<div>
								<h4 className='text-lg font-bold text-gray-900 mb-3'>
									Professional Development
								</h4>
								<ul className='space-y-2 text-gray-700'>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Continuous faculty development programs
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Student skill enhancement initiatives
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
										<span className='text-sm'>
											Industry exposure and training programs
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Quality Framework */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<div className='text-center mb-8'>
					<div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Shield className='w-6 h-6 text-white' />
					</div>
					<h3 className='text-2xl font-bold text-gray-900 mb-6'>
						Quality Management Framework
					</h3>
				</div>

				<div className='grid md:grid-cols-4 gap-6'>
					<div className='text-center'>
						<div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4'>
							<Target className='w-8 h-8 text-blue-600' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>Plan</h4>
						<p className='text-gray-700 text-sm'>
							Establish quality objectives and processes
						</p>
					</div>

					<div className='text-center'>
						<div className='w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4'>
							<Zap className='w-8 h-8 text-green-600' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>Do</h4>
						<p className='text-gray-700 text-sm'>
							Implement planned processes and activities
						</p>
					</div>

					<div className='text-center'>
						<div className='w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4'>
							<Eye className='w-8 h-8 text-purple-600' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>Check</h4>
						<p className='text-gray-700 text-sm'>
							Monitor and evaluate process effectiveness
						</p>
					</div>

					<div className='text-center'>
						<div className='w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4'>
							<TrendingUp className='w-8 h-8 text-orange-600' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>Act</h4>
						<p className='text-gray-700 text-sm'>
							Take corrective actions for improvement
						</p>
					</div>
				</div>
			</motion.div>

			{/* Quality Assurance Bodies */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.5 }}
				className='bg-white rounded-xl p-8 shadow-lg border border-gray-200'>
				<h3 className='text-2xl font-bold text-gray-900 text-center mb-6'>
					Quality Assurance Bodies
				</h3>

				<div className='grid md:grid-cols-3 gap-6'>
					<div className='text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl'>
						<div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3'>
							<Award className='w-6 h-6 text-white' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>IQAC</h4>
						<p className='text-gray-700 text-sm'>
							Internal Quality Assurance Cell for continuous monitoring
						</p>
					</div>

					<div className='text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl'>
						<div className='w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3'>
							<Shield className='w-6 h-6 text-white' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>NBA</h4>
						<p className='text-gray-700 text-sm'>
							National Board of Accreditation compliance
						</p>
					</div>

					<div className='text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl'>
						<div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3'>
							<Star className='w-6 h-6 text-white' />
						</div>
						<h4 className='font-bold text-gray-900 mb-2'>NAAC</h4>
						<p className='text-gray-700 text-sm'>
							National Assessment and Accreditation Council
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default QualityPolicyPage;
