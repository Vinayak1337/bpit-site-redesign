'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Eye,
	Target,
	Award,
	Lightbulb,
	Users,
	Globe,
	BookOpen,
	Star,
	Heart,
	Zap,
	Shield,
	TrendingUp,
	ChevronRight,
	Compass,
	Rocket,
	CheckCircle
} from 'lucide-react';

interface TabContent {
	id: string;
	title: string;
	icon: React.ReactNode;
	content: React.ReactNode;
}

const VisionMissionPage = () => {
	const [activeTab, setActiveTab] = useState('vision');

	const tabContent: TabContent[] = [
		{
			id: 'vision',
			title: 'Our Vision',
			icon: <Eye className='w-5 h-5' />,
			content: (
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
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								Our Vision
							</h1>
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
									innovation, fostering holistic development of students to
									become competent engineers and responsible citizens who
									contribute meaningfully to society and the nation&apos;s
									technological advancement.&rdquo;
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
									Fostering a culture of research, innovation, and
									entrepreneurship to address real-world challenges and
									contribute to technological advancement.
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
									Nurturing well-rounded individuals with strong technical
									skills, ethical values, and leadership qualities to serve
									society and the nation.
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
								<h4 className='font-bold text-gray-900 mb-2'>
									Global Presence
								</h4>
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
			)
		},
		{
			id: 'mission',
			title: 'Our Mission',
			icon: <Target className='w-5 h-5' />,
			content: (
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
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								Our Mission
							</h1>
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
									&ldquo;To provide quality technical education through
									innovative teaching methodologies, foster research and
									development activities, promote industry-academia
									collaboration, and develop skilled professionals with strong
									ethical values who can contribute effectively to the
									technological growth of the nation and society.&rdquo;
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
											methodologies that prepare students for the challenges of
											the 21st century.
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
											internships, projects, and placements to ensure students
											are industry-ready and meet the evolving needs of the
											corporate world.
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
								<div className='text-3xl font-bold text-green-600 mb-2'>
									5000+
								</div>
								<p className='text-gray-700 font-medium'>
									Alumni Making Impact
								</p>
							</div>

							<div className='text-center'>
								<div className='text-3xl font-bold text-blue-600 mb-2'>95%</div>
								<p className='text-gray-700 font-medium'>
									Placement Success Rate
								</p>
							</div>

							<div className='text-center'>
								<div className='text-3xl font-bold text-purple-600 mb-2'>
									100+
								</div>
								<p className='text-gray-700 font-medium'>
									Research Publications
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			)
		},
		{
			id: 'quality-policy',
			title: 'Quality Policy',
			icon: <Award className='w-5 h-5' />,
			content: (
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
									&ldquo;BPIT is committed to providing quality technical
									education and training to produce competent engineers and
									technology leaders. We strive for continuous improvement in
									all our processes, maintain high academic standards, and
									ensure stakeholder satisfaction through effective
									implementation of Quality Management System.&rdquo;
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
													Maintain updated curriculum aligned with industry
													needs
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
			)
		}
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl'></div>
					<div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div>
				</div>

				<div className='relative z-10 container mx-auto px-4 py-24'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center max-w-4xl mx-auto'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm'>
							<Compass className='w-10 h-10 text-white' />
						</motion.div>

						<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
							Vision & Mission
						</h1>

						<p className='text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed'>
							Guiding Principles for Educational Excellence and Institutional
							Growth
						</p>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='flex flex-wrap justify-center gap-4 text-sm'>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Vision for Excellence</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Mission Driven</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Quality Assured</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className='lg:w-80 flex-shrink-0'>
						<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8'>
							<div className='p-2'>
								{tabContent.map((tab, index) => (
									<motion.button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`w-full text-left p-4 rounded-xl mb-2 transition-all duration-300 group relative overflow-hidden ${
											activeTab === tab.id
												? 'bg-blue-50 text-blue-700 shadow-md border border-blue-200'
												: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
										}`}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: index * 0.1 }}>
										<div className='flex items-center gap-3 relative z-10'>
											<div
												className={`p-2 rounded-lg transition-colors ${
													activeTab === tab.id
														? 'bg-blue-100 text-blue-600'
														: 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
												}`}>
												{tab.icon}
											</div>
											<span className='font-medium'>{tab.title}</span>
											<ChevronRight
												className={`w-4 h-4 ml-auto transition-transform ${
													activeTab === tab.id
														? 'rotate-90 text-blue-600'
														: 'text-gray-400'
												}`}
											/>
										</div>

										{activeTab === tab.id && (
											<motion.div
												className='absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl'
												layoutId='activeTab'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.3 }}
											/>
										)}
									</motion.button>
								))}
							</div>
						</div>
					</motion.div>

					{/* Content Area */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className='flex-1'>
						<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
							<AnimatePresence mode='wait'>
								<motion.div
									key={activeTab}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.4 }}
									className='p-8'>
									{tabContent.find(tab => tab.id === activeTab)?.content}
								</motion.div>
							</AnimatePresence>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default VisionMissionPage;
