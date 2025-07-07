'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Building2,
	Heart,
	MessageSquare,
	User,
	Award,
	Target,
	Users,
	BookOpen,
	Calendar,
	MapPin,
	Star,
	ChevronRight,
	Lightbulb,
	Trophy,
	Globe,
	GraduationCap
} from 'lucide-react';

interface TabContent {
	id: string;
	title: string;
	icon: React.ReactNode;
	content: React.ReactNode;
}

const AboutPage = () => {
	const [activeTab, setActiveTab] = useState('about-bpit');

	const tabContent: TabContent[] = [
		{
			id: 'about-bpit',
			title: 'About BPIT',
			icon: <Building2 className='w-5 h-5' />,
			content: (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200'>
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
									<span className='text-gray-700'>
										Location: Rohini, New Delhi
									</span>
								</div>
								<div className='flex items-center gap-3'>
									<Award className='w-5 h-5 text-blue-600' />
									<span className='text-gray-700'>
										Accreditation: NBA & NAAC
									</span>
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
									<p className='text-sm text-gray-600'>
										Engineering Departments
									</p>
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
								Bhagwan Parshuram Institute of Technology (BPIT) stands as a
								beacon of excellence in engineering education in Delhi.
								Established in 2007, BPIT has been committed to providing
								world-class technical education and fostering innovation among
								aspiring engineers.
							</p>

							<p>
								Located in the heart of Rohini, New Delhi, our institution is
								affiliated with Guru Gobind Singh Indraprastha University
								(GGSIPU) and is accredited by the National Board of
								Accreditation (NBA) and National Assessment and Accreditation
								Council (NAAC), ensuring the highest standards of education
								quality.
							</p>

							<p>
								Our campus is equipped with state-of-the-art laboratories,
								modern classrooms, and cutting-edge research facilities. We
								offer undergraduate programs in Computer Science, Information
								Technology, Electronics & Communication, Electrical Engineering,
								and Management Studies.
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
									Consistently high placement rates and academic achievements by
									our students.
								</p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.05 }}
								className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
								<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
									<Lightbulb className='w-6 h-6 text-green-600' />
								</div>
								<h3 className='font-semibold text-gray-900 mb-2'>
									Innovation Hub
								</h3>
								<p className='text-gray-600 text-sm'>
									Fostering creativity and innovation through research projects
									and startups.
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
									Strong industry partnerships providing internships and
									placement opportunities.
								</p>
							</motion.div>
						</div>
					</motion.div>
				</div>
			)
		},
		{
			id: 'founder-tribute',
			title: 'Tribute to Founder',
			icon: <Heart className='w-5 h-5' />,
			content: (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='space-y-8'>
					<div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200'>
						<div className='text-center mb-8'>
							<div className='w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Heart className='w-12 h-12 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								In Memory of Our Visionary Founder
							</h1>
							<p className='text-orange-600 font-medium'>
								Bhagwan Parshuram - The Divine Inspiration
							</p>
						</div>

						<div className='prose prose-lg text-gray-700 leading-relaxed max-w-none'>
							<p>
								Our institution draws its name and inspiration from Bhagwan
								Parshuram, the sixth avatar of Lord Vishnu, known for his
								unwavering dedication to righteousness and excellence. Just as
								Bhagwan Parshuram was a master of all sciences and arts, our
								institute strives to create well-rounded engineers who excel in
								both technical and human values.
							</p>

							<blockquote className='border-l-4 border-orange-500 pl-6 italic text-orange-800 bg-orange-50 p-4 rounded-r-lg'>
								&ldquo;Education is the most powerful weapon which you can use
								to change the world. Let us honor our founder&apos;s vision by
								pursuing knowledge with dedication and righteousness.&rdquo;
							</blockquote>

							<p>
								The values of discipline, dedication, and excellence that
								Bhagwan Parshuram embodied continue to guide our educational
								philosophy. We believe in nurturing not just skilled
								professionals, but ethical leaders who will contribute
								positively to society.
							</p>
						</div>

						<div className='grid md:grid-cols-2 gap-6 mt-8'>
							<div className='bg-white rounded-lg p-6 shadow-sm'>
								<h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
									<Star className='w-5 h-5 text-orange-600' />
									Core Values
								</h3>
								<ul className='space-y-2 text-gray-700'>
									<li>• Righteousness and Integrity</li>
									<li>• Excellence in Education</li>
									<li>• Dedication to Knowledge</li>
									<li>• Service to Society</li>
								</ul>
							</div>
							<div className='bg-white rounded-lg p-6 shadow-sm'>
								<h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
									<Trophy className='w-5 h-5 text-orange-600' />
									Our Commitment
								</h3>
								<ul className='space-y-2 text-gray-700'>
									<li>• Holistic Development</li>
									<li>• Ethical Leadership</li>
									<li>• Innovation & Research</li>
									<li>• Global Competence</li>
								</ul>
							</div>
						</div>
					</div>
				</motion.div>
			)
		},
		{
			id: 'chairman-message',
			title: "Chairman's Message",
			icon: <MessageSquare className='w-5 h-5' />,
			content: (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='space-y-8'>
					<div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200'>
						<div className='flex items-start gap-6 mb-8'>
							<div className='w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
								<MessageSquare className='w-10 h-10 text-white' />
							</div>
							<div>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>
									Chairman&apos;s Message
								</h1>
								<p className='text-purple-600 font-medium'>
									A Vision for Excellence in Engineering Education
								</p>
							</div>
						</div>

						<div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
							<div className='prose prose-lg text-gray-700 leading-relaxed max-w-none'>
								<p className='text-lg font-medium text-purple-800 mb-4'>
									&ldquo;Dear Students, Faculty, and Stakeholders,&rdquo;
								</p>

								<p>
									It gives me immense pleasure to welcome you to Bhagwan
									Parshuram Institute of Technology, an institution that has
									been at the forefront of engineering education since 2007. Our
									journey has been one of continuous growth, innovation, and
									excellence.
								</p>

								<p>
									At BPIT, we believe that education is not just about imparting
									knowledge, but about shaping future leaders who will drive
									technological advancement and social progress. Our commitment
									extends beyond traditional classroom learning to encompass
									research, innovation, and industry collaboration.
								</p>

								<p>
									We have consistently maintained our focus on providing
									world-class infrastructure, distinguished faculty, and an
									environment that encourages creativity and critical thinking.
									Our NBA accreditation and strong industry partnerships are
									testament to our unwavering commitment to quality education.
								</p>

								<p>
									As we move forward, we remain dedicated to our mission of
									producing competent engineers who are not only technically
									proficient but also ethically grounded and socially
									responsible. I encourage all our students to make the most of
									the opportunities available at BPIT and emerge as leaders in
									their chosen fields.
								</p>

								<p className='font-medium text-purple-800 mt-6'>
									Wishing you all success in your academic and professional
									endeavors.
								</p>

								<div className='mt-6 pt-4 border-t border-gray-200'>
									<p className='font-semibold text-gray-900'>
										Dr. [Chairman Name]
									</p>
									<p className='text-purple-600'>Chairman, BPIT</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)
		},
		{
			id: 'principal-message',
			title: "Principal&apos;s Message",
			icon: <User className='w-5 h-5' />,
			content: (
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
									Welcome to BPIT, where academic excellence meets innovation.
									As the Principal, I am proud to lead an institution that has
									consistently set benchmarks in engineering education and has
									produced thousands of successful professionals who are making
									significant contributions to the industry and society.
								</p>

								<p>
									Our institution stands on the pillars of quality education,
									research excellence, and industry relevance. We have carefully
									designed our curriculum to bridge the gap between theoretical
									knowledge and practical application, ensuring our graduates
									are industry-ready from day one.
								</p>

								<p>
									The faculty at BPIT comprises experienced academics and
									industry professionals who bring diverse perspectives to the
									classroom. Our state-of-the-art laboratories, modern
									infrastructure, and rich library resources provide the perfect
									environment for learning and research.
								</p>

								<p>
									We encourage our students to participate in various
									co-curricular and extra-curricular activities, technical
									competitions, and research projects. These experiences not
									only enhance their technical skills but also develop their
									leadership qualities, teamwork abilities, and communication
									skills.
								</p>

								<p>
									I invite you to be part of our vibrant academic community
									where innovation thrives, dreams take shape, and future
									leaders are nurtured. Together, let us continue to uphold the
									values of excellence, integrity, and service that define BPIT.
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
									Guiding curriculum development and maintaining academic
									standards.
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
			)
		}
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			{/* Hero Section */}
			<section className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center'>
						<h1 className='text-4xl md:text-5xl font-bold mb-4'>About BPIT</h1>
						<p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
							Discover our journey of excellence, vision, and commitment to
							engineering education
						</p>

						{/* Floating Elements */}
						<div className='absolute inset-0 overflow-hidden pointer-events-none'>
							<motion.div
								className='absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30'
								animate={{
									y: [0, -20, 0],
									opacity: [0.3, 1, 0.3]
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									delay: 0
								}}
							/>
							<motion.div
								className='absolute top-1/3 right-1/3 w-3 h-3 bg-blue-200 rounded-full opacity-40'
								animate={{
									y: [0, -30, 0],
									opacity: [0.4, 1, 0.4]
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									delay: 1
								}}
							/>
							<motion.div
								className='absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-30'
								animate={{
									y: [0, -25, 0],
									opacity: [0.3, 1, 0.3]
								}}
								transition={{
									duration: 3.5,
									repeat: Infinity,
									delay: 2
								}}
							/>
						</div>
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

export default AboutPage;
