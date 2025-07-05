'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
	Users,
	UserCheck,
	User,
	Building2,
	Award,
	Target,
	Briefcase,
	Shield,
	Eye,
	Heart,
	Star,
	ChevronRight,
	Mail,
	Phone,
	MapPin,
	Calendar,
	GraduationCap,
	BookOpen
} from 'lucide-react';

interface TabContent {
	id: string;
	title: string;
	icon: React.ReactNode;
	content: React.ReactNode;
}

const ManagementPage = () => {
	const [activeTab, setActiveTab] = useState('management-overview');

	// Animated Profile Card Component
	const AnimatedProfileCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
		const ref = useRef(null);
		const isInView = useInView(ref, { 
			once: true, 
			margin: "-100px 0px -100px 0px" 
		});

		return (
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: -100, scale: 0.8 }}
				animate={isInView ? { 
					opacity: 1, 
					y: 0, 
					scale: 1,
					transition: {
						type: "spring",
						damping: 25,
						stiffness: 300,
						delay: delay,
						duration: 0.8
					}
				} : {}}
				className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'
				whileHover={{ 
					y: -5,
					transition: { duration: 0.2 }
				}}
			>
				{children}
			</motion.div>
		);
	};

	const tabContent: TabContent[] = [
		{
			id: 'management-overview',
			title: 'Management Overview',
			icon: <Users className='w-5 h-5' />,
			content: (
				<div className='space-y-8'>
					{/* Hero Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200'
					>
						<div className='text-center mb-8'>
							<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Users className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								Management
							</h1>
						</div>
					</motion.div>

					{/* Leadership Profiles */}
					<div className='space-y-8'>
						{/* Shri Vinod Vats - Chairman */}
						<AnimatedProfileCard delay={0.1}>
							<div className='flex flex-col md:flex-row gap-6 items-start'>
								<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
									<User className='w-16 h-16 text-gray-400' />
								</div>
								
								<div className='flex-1'>
									<div className='mb-4'>
										<h3 className='text-xl font-bold text-gray-900'>Shri Vinod Vats</h3>
										<p className='text-blue-600 font-medium'>Chairman</p>
									</div>
									
									<div className='prose prose-gray max-w-none text-sm'>
										<p className='text-gray-700 leading-relaxed mb-3'>
											Shri Vinod Vats is the Chairman of Bhagwan Parshuram Institute of Technology and also the President of Bharatiya Brahmin's Charitable Trust. Being a visionary and a great social leader, he has played a vital role in the development of the institute. His endeavour for furthering and championing the cause of excellence in technical and higher education with a view to training and bringing up the future skilled engineers in diverse fields of Technology and management has inspired millions.
										</p>
										<p className='text-gray-700 leading-relaxed'>
											This Institute was established under his dynamic Leadership. Presently as the President of the Management Committee and a member of the Bharatiya Technical Educational Society (BTES), he has been professional, educational and rational. Shri Vinod Vats has gained a prominent position as one for his exemplary social works and his key contributions to work in social span areas, and these include his entire life into contributing to the strong self-power.
										</p>
									</div>
								</div>
							</div>
						</AnimatedProfileCard>

						{/* Shri Surender Sharma */}
						<AnimatedProfileCard delay={0.2}>
							<div className='flex flex-col md:flex-row gap-6 items-start'>
								<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
									<User className='w-16 h-16 text-gray-400' />
								</div>
								
								<div className='flex-1'>
									<div className='mb-4'>
										<h3 className='text-xl font-bold text-gray-900'>Shri Surender Sharma</h3>
										<p className='text-blue-600 font-medium'>Vice President</p>
									</div>
									
									<div className='prose prose-gray max-w-none text-sm'>
										<p className='text-gray-700 leading-relaxed mb-3'>
											Padma Shri, Surender Sharma is the Vice President of Bhagwan Parshuram Institute of Technology as well as Bharatiya Brahmin's Charitable Trust. He is a popular renowned Hindi poet-chronicler across the globe. His phenomenal success-story and charismatic social service and the President of BPCT's Scholarship Trust.
										</p>
										<p className='text-gray-700 leading-relaxed'>
											He has been bestowed with honours. His prominent social service and humanitarian work has earned a widespread recognition globally which includes a title 'Padma Shri', Bharatiya Jyoti Award from the government of India in 2015. He is known nationwide for his inspiring literary and literary works, he has also served with distinction as CPIO minister and corporation counselor.
										</p>
									</div>
								</div>
							</div>
						</AnimatedProfileCard>

						{/* Shri Ram Babu Sharma */}
						<AnimatedProfileCard delay={0.3}>
							<div className='flex flex-col md:flex-row gap-6 items-start'>
								<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
									<User className='w-16 h-16 text-gray-400' />
								</div>
								
								<div className='flex-1'>
									<div className='mb-4'>
										<h3 className='text-xl font-bold text-gray-900'>Shri Ram Babu Sharma</h3>
										<p className='text-blue-600 font-medium'>General Secretary</p>
									</div>
									
									<div className='prose prose-gray max-w-none text-sm'>
										<p className='text-gray-700 leading-relaxed mb-3'>
											Shri Ram Babu Sharma is the General Secretary of Bhagwan Parshuram Institute of Technology and Bharatiya Brahmin's Charitable Trust. He has been associated with various social religious and sports organisations. He was a member of the Hotel Federation of Northern India. He is president of Shri Shasta Pavilion, a social organisation engaged in providing free schools and free coaching to underprivileged children.
										</p>
										<p className='text-gray-700 leading-relaxed'>
											He is also in the consultant body of Satish Chandra Fertilizer Kohar in Darbhanga (Delhi). His vision of this institute is to develop a world-class perspective to college with the fast-changing technological scenario.
										</p>
									</div>
								</div>
							</div>
						</AnimatedProfileCard>

						{/* Shri Shambhu Sharma */}
						<AnimatedProfileCard delay={0.4}>
							<div className='flex flex-col md:flex-row gap-6 items-start'>
								<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
									<User className='w-16 h-16 text-gray-400' />
								</div>
								
								<div className='flex-1'>
									<div className='mb-4'>
										<h3 className='text-xl font-bold text-gray-900'>Shri Shambhu Sharma</h3>
										<p className='text-blue-600 font-medium'>Secretary</p>
									</div>
									
									<div className='prose prose-gray max-w-none text-sm'>
										<p className='text-gray-700 leading-relaxed mb-3'>
											Shri Shambhu Sharma is the Secretary of Bhagwan Parshuram Institute of Technology. He is the General Secretary of Global Bharatiya Mahakumbh at a received an one of the concerned letters Law Pandit Maulavi Sharma. Former national President of Akhil Bharatiya Brahmin Mahasabha and is received in one of his concerned works for global Bharatiya Mahakumbh.
										</p>
										<p className='text-gray-700 leading-relaxed'>
											He is actively involved operations of medical health. He is the national. He is serving around operations of medical health. He is developed a world-wide prospective to college with the fast-changing technological scenario.
										</p>
									</div>
								</div>
							</div>
						</AnimatedProfileCard>

						{/* Shri Sanjeev Sharma */}
						<AnimatedProfileCard delay={0.5}>
							<div className='flex flex-col md:flex-row gap-6 items-start'>
								<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
									<User className='w-16 h-16 text-gray-400' />
								</div>
								
								<div className='flex-1'>
									<div className='mb-4'>
										<h3 className='text-xl font-bold text-gray-900'>Shri Sanjeev Sharma</h3>
										<p className='text-blue-600 font-medium'>Treasurer</p>
									</div>
									
									<div className='prose prose-gray max-w-none text-sm'>
										<p className='text-gray-700 leading-relaxed mb-3'>
											Working in the Treasurer of Bhagwan Parshuram Institute of Technology, he has been associated with both business and the best interests of educational society to a considerable time. His dedication and the hard work in this institute is so desired above all his other institutions.
										</p>
										<p className='text-gray-700 leading-relaxed'>
											He has devoted and transformed segments alike and their institute & his dedicated teaching faculty. The mission of this institute is to develop a world-class perspective to college with the fast-changing technological scenario. In addition, online tech discipline wise a well-known of and well known colleges.
										</p>
									</div>
								</div>
							</div>
						</AnimatedProfileCard>
					</div>

					{/* Vision Statement */}
					<AnimatedProfileCard delay={0.6}>
						<div className='text-center'>
							<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<Target className='w-6 h-6 text-blue-600' />
							</div>
							<h3 className='text-2xl font-bold text-gray-900 mb-4'>Our Collective Vision</h3>
							<p className='text-gray-700 leading-relaxed max-w-3xl mx-auto'>
								"Together, we are committed to creating an educational ecosystem that nurtures innovation, 
								fosters excellence, and prepares future leaders who will drive technological advancement 
								and social progress for a better tomorrow."
							</p>
						</div>
					</AnimatedProfileCard>
				</div>
			)
		},
		{
			id: 'leadership-team',
			title: 'Leadership Team',
			icon: <UserCheck className='w-5 h-5' />,
			content: (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='space-y-8'
				>
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
								className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'
							>
								<div className='flex items-center gap-4 mb-4'>
									<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
										<Building2 className='w-8 h-8 text-blue-600' />
									</div>
									<div>
										<h3 className='text-xl font-bold text-gray-900'>Dr. [Principal Name]</h3>
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
									Leading the institution with a vision for academic excellence and innovation in engineering education.
								</p>
							</motion.div>

							{/* Vice Principal */}
							<motion.div
								whileHover={{ scale: 1.02 }}
								className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'
							>
								<div className='flex items-center gap-4 mb-4'>
									<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
										<Users className='w-8 h-8 text-green-600' />
									</div>
									<div>
										<h3 className='text-xl font-bold text-gray-900'>Dr. [Vice Principal Name]</h3>
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
									Supporting institutional leadership and overseeing academic operations and faculty development.
								</p>
							</motion.div>

							{/* Dean Academics */}
							<motion.div
								whileHover={{ scale: 1.02 }}
								className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'
							>
								<div className='flex items-center gap-4 mb-4'>
									<div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center'>
										<BookOpen className='w-8 h-8 text-orange-600' />
									</div>
									<div>
										<h3 className='text-xl font-bold text-gray-900'>Dr. [Dean Name]</h3>
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
									Overseeing academic policies, curriculum development, and maintaining educational standards.
								</p>
							</motion.div>

							{/* Registrar */}
							<motion.div
								whileHover={{ scale: 1.02 }}
								className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'
							>
								<div className='flex items-center gap-4 mb-4'>
									<div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center'>
										<Briefcase className='w-8 h-8 text-purple-600' />
									</div>
									<div>
										<h3 className='text-xl font-bold text-gray-900'>Mr./Ms. [Registrar Name]</h3>
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
									Managing student records, admissions, examinations, and administrative operations.
								</p>
							</motion.div>
						</div>
					</div>
				</motion.div>
			)
		},
		{
			id: 'governance-structure',
			title: 'Governance Structure',
			icon: <Building2 className='w-5 h-5' />,
			content: (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='space-y-8'
				>
					<div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200'>
						<div className='text-center mb-8'>
							<div className='w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Building2 className='w-12 h-12 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								Governance Structure
							</h1>
							<p className='text-green-600 font-medium'>
								Organizational Framework for Excellence
							</p>
						</div>

						<div className='space-y-6'>
							<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
								<h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
									<Award className='w-6 h-6 text-green-600' />
									Board of Governors
								</h3>
								<p className='text-gray-700 mb-4'>
									The Board of Governors provides strategic oversight and policy direction for the institution. 
									Comprising eminent personalities from academia, industry, and public service, the board ensures 
									BPIT maintains its commitment to excellence.
								</p>
								<div className='grid md:grid-cols-2 gap-4'>
									<div className='bg-green-50 rounded-lg p-4'>
										<h4 className='font-semibold text-green-800 mb-2'>Key Responsibilities</h4>
										<ul className='text-sm text-green-700 space-y-1'>
											<li>• Strategic planning and policy formulation</li>
											<li>• Financial oversight and budget approval</li>
											<li>• Academic quality assurance</li>
											<li>• Institutional development initiatives</li>
										</ul>
									</div>
									<div className='bg-green-50 rounded-lg p-4'>
										<h4 className='font-semibold text-green-800 mb-2'>Composition</h4>
										<ul className='text-sm text-green-700 space-y-1'>
											<li>• Chairman (Industry Leader)</li>
											<li>• Academic Representatives</li>
											<li>• Government Nominees</li>
											<li>• Alumni Representatives</li>
										</ul>
									</div>
								</div>
							</div>

							<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
								<h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
									<Users className='w-6 h-6 text-blue-600' />
									Academic Council
								</h3>
								<p className='text-gray-700 mb-4'>
									The Academic Council is the primary academic decision-making body, responsible for maintaining 
									and enhancing the quality of education, research, and academic programs.
								</p>
								<div className='grid md:grid-cols-2 gap-4'>
									<div className='bg-blue-50 rounded-lg p-4'>
										<h4 className='font-semibold text-blue-800 mb-2'>Functions</h4>
										<ul className='text-sm text-blue-700 space-y-1'>
											<li>• Curriculum development and review</li>
											<li>• Faculty recruitment and promotion</li>
											<li>• Research policy formulation</li>
											<li>• Academic calendar planning</li>
										</ul>
									</div>
									<div className='bg-blue-50 rounded-lg p-4'>
										<h4 className='font-semibold text-blue-800 mb-2'>Members</h4>
										<ul className='text-sm text-blue-700 space-y-1'>
											<li>• Principal (Chairperson)</li>
											<li>• Heads of Departments</li>
											<li>• Senior Faculty Members</li>
											<li>• External Academic Experts</li>
										</ul>
									</div>
								</div>
							</div>

							<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
								<h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
									<Shield className='w-6 h-6 text-purple-600' />
									Administrative Structure
								</h3>
								<p className='text-gray-700 mb-4'>
									Our administrative structure ensures efficient operations, student services, and support 
									for academic activities through well-defined roles and responsibilities.
								</p>
								<div className='grid md:grid-cols-3 gap-4'>
									<div className='bg-purple-50 rounded-lg p-4'>
										<h4 className='font-semibold text-purple-800 mb-2'>Academic Affairs</h4>
										<ul className='text-sm text-purple-700 space-y-1'>
											<li>• Admissions Office</li>
											<li>• Examination Cell</li>
											<li>• Training & Placement</li>
											<li>• Student Affairs</li>
										</ul>
									</div>
									<div className='bg-purple-50 rounded-lg p-4'>
										<h4 className='font-semibold text-purple-800 mb-2'>Support Services</h4>
										<ul className='text-sm text-purple-700 space-y-1'>
											<li>• Library Services</li>
											<li>• IT Infrastructure</li>
											<li>• Finance & Accounts</li>
											<li>• Human Resources</li>
										</ul>
									</div>
									<div className='bg-purple-50 rounded-lg p-4'>
										<h4 className='font-semibold text-purple-800 mb-2'>Quality Assurance</h4>
										<ul className='text-sm text-purple-700 space-y-1'>
											<li>• IQAC Cell</li>
											<li>• Research & Development</li>
											<li>• Industry Relations</li>
											<li>• Alumni Affairs</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)
		},
		{
			id: 'policies-procedures',
			title: 'Policies & Procedures',
			icon: <Shield className='w-5 h-5' />,
			content: (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='space-y-8'
				>
					<div className='bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200'>
						<div className='text-center mb-8'>
							<div className='w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Shield className='w-12 h-12 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								Policies & Procedures
							</h1>
							<p className='text-amber-600 font-medium'>
								Framework for Institutional Excellence
							</p>
						</div>

						<div className='grid md:grid-cols-2 gap-8'>
							<div className='space-y-6'>
								<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
									<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
										<BookOpen className='w-5 h-5 text-blue-600' />
										Academic Policies
									</h3>
									<ul className='space-y-2 text-gray-700'>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Admission Policy & Procedures</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Examination & Evaluation Policy</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Anti-Ragging Policy</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Student Grievance Redressal</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Research & Publication Policy</span>
										</li>
									</ul>
								</div>

								<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
									<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
										<Users className='w-5 h-5 text-green-600' />
										Faculty Policies
									</h3>
									<ul className='space-y-2 text-gray-700'>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Faculty Recruitment Policy</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Performance Evaluation System</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Professional Development Policy</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Leave & Attendance Policy</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Code of Conduct</span>
										</li>
									</ul>
								</div>
							</div>

							<div className='space-y-6'>
								<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
									<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
										<Award className='w-5 h-5 text-purple-600' />
										Quality Assurance
									</h3>
									<ul className='space-y-2 text-gray-700'>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>IQAC Guidelines & Procedures</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>NBA Accreditation Compliance</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>NAAC Assessment Framework</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Continuous Improvement Process</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>External Quality Audit</span>
										</li>
									</ul>
								</div>

								<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
									<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-3'>
										<Briefcase className='w-5 h-5 text-orange-600' />
										Administrative Policies
									</h3>
									<ul className='space-y-2 text-gray-700'>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Financial Management Policy</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Procurement & Purchase Policy</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>IT Security & Data Protection</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Infrastructure Development</span>
										</li>
										<li className='flex items-start gap-2'>
											<div className='w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0'></div>
											<span>Safety & Security Protocols</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
							<h3 className='text-lg font-bold text-gray-900 mb-4 text-center'>
								Policy Implementation Framework
							</h3>
							<div className='grid md:grid-cols-4 gap-4'>
								<div className='text-center'>
									<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
										<Eye className='w-6 h-6 text-blue-600' />
									</div>
									<h4 className='font-semibold text-gray-900 mb-2'>Review</h4>
									<p className='text-sm text-gray-600'>Regular policy review and updates</p>
								</div>
								<div className='text-center'>
									<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3'>
										<UserCheck className='w-6 h-6 text-green-600' />
									</div>
									<h4 className='font-semibold text-gray-900 mb-2'>Approval</h4>
									<p className='text-sm text-gray-600'>Stakeholder consultation and approval</p>
								</div>
								<div className='text-center'>
									<div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3'>
										<BookOpen className='w-6 h-6 text-purple-600' />
									</div>
									<h4 className='font-semibold text-gray-900 mb-2'>Communication</h4>
									<p className='text-sm text-gray-600'>Policy dissemination and training</p>
								</div>
								<div className='text-center'>
									<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3'>
										<Target className='w-6 h-6 text-orange-600' />
									</div>
									<h4 className='font-semibold text-gray-900 mb-2'>Monitoring</h4>
									<p className='text-sm text-gray-600'>Compliance monitoring and evaluation</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)
		}
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden'>
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
						className='text-center max-w-4xl mx-auto'
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm'
						>
							<Users className='w-10 h-10 text-white' />
						</motion.div>
						
						<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
							Administration & Management
						</h1>
						
						<p className='text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed'>
							Leadership Excellence Driving Institutional Growth and Academic Achievement
						</p>
						
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='flex flex-wrap justify-center gap-4 text-sm'
						>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Strategic Leadership</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Quality Governance</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Student-Centric Approach</span>
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
						className='lg:w-80 flex-shrink-0'
					>
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
										transition={{ duration: 0.3, delay: index * 0.1 }}
									>
										<div className='flex items-center gap-3 relative z-10'>
											<div className={`p-2 rounded-lg transition-colors ${
												activeTab === tab.id 
													? 'bg-blue-100 text-blue-600' 
													: 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
											}`}>
												{tab.icon}
											</div>
											<span className='font-medium'>{tab.title}</span>
											<ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
												activeTab === tab.id ? 'rotate-90 text-blue-600' : 'text-gray-400'
											}`} />
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
						className='flex-1'
					>
						<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
							<AnimatePresence mode='wait'>
								<motion.div
									key={activeTab}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.4 }}
									className='p-8'
								>
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

export default ManagementPage;
