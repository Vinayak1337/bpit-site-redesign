'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
	Code,
	Users,
	BookOpen,
	GraduationCap,
	Building2,
	Star,
	ChevronRight,
	ChevronDown,
	Calendar,
	Target,
	Lightbulb,
	Shield,
	Factory,
	Trophy,
	FileText,
	Newspaper,
	TrendingUp,
	Home,
	Briefcase,
	Zap,
	Clock,
	UserCheck,
	User,
	Monitor,
	Eye,
	Settings,
	Microscope,
	Wrench,
	FlaskConical,
	Users2,
	Presentation,
	NotebookPen,
	FolderOpen,
	Camera,
	BarChart,
	CheckCircle,
	BookOpenCheck,
	Mail
} from 'lucide-react';

interface SubSection {
	id: string;
	title: string;
	icon: React.ReactNode;
}

interface NavigationSection {
	id: string;
	title: string;
	icon: React.ReactNode;
	subSections?: SubSection[];
	hasContent?: boolean;
}

const CSEDepartmentPage = () => {
	const [activeSection, setActiveSection] = useState('home');
	const [activeSubSection, setActiveSubSection] = useState('vision-mission');
	const [expandedSections, setExpandedSections] = useState<string[]>(['home']);

	// Toggle section expansion
	const toggleSection = (sectionId: string) => {
		setExpandedSections(prev =>
			prev.includes(sectionId)
				? prev.filter(id => id !== sectionId)
				: [...prev, sectionId]
		);
	};

	// Handle section click
	const handleSectionClick = (sectionId: string, subSectionId?: string) => {
		setActiveSection(sectionId);
		if (subSectionId) {
			setActiveSubSection(subSectionId);
			if (!expandedSections.includes(sectionId)) {
				toggleSection(sectionId);
			}
		}
	};

	// Animated Card Component
	const AnimatedCard = ({
		children,
		delay = 0
	}: {
		children: React.ReactNode;
		delay?: number;
	}) => {
		const ref = useRef(null);
		const isInView = useInView(ref, {
			once: true,
			margin: '-100px 0px -100px 0px'
		});

		return (
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: 50, scale: 0.95 }}
				animate={
					isInView
						? {
								opacity: 1,
								y: 0,
								scale: 1,
								transition: {
									type: 'spring',
									damping: 25,
									stiffness: 300,
									delay: delay,
									duration: 0.6
								}
						  }
						: {}
				}
				className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300'
				whileHover={{
					y: -5,
					transition: { duration: 0.2 }
				}}>
				{children}
			</motion.div>
		);
	};

	// Navigation structure
	const navigationSections: NavigationSection[] = [
		{
			id: 'home',
			title: 'Home',
			icon: <Home className='w-5 h-5' />,
			subSections: [
				{
					id: 'vision-mission',
					title: 'Vision / Mission',
					icon: <Eye className='w-4 h-4' />
				},
				{
					id: 'pos-peos-psos',
					title: 'POs / PEOs / PSOs',
					icon: <Target className='w-4 h-4' />
				}
			]
		},
		{
			id: 'faculty',
			title: 'Faculty',
			icon: <Users className='w-5 h-5' />,
			hasContent: true
		},
		{
			id: 'pedagogical-initiatives',
			title: 'Pedagogical Initiatives',
			icon: <BookOpen className='w-5 h-5' />,
			subSections: [
				{
					id: 'academic-calendar',
					title: 'Academic Calendar',
					icon: <Calendar className='w-4 h-4' />
				},
				{
					id: 'activity-calendar',
					title: 'Activity Calendar',
					icon: <Clock className='w-4 h-4' />
				},
				{
					id: 'innovative-practices',
					title: 'Innovative Practices',
					icon: <Lightbulb className='w-4 h-4' />
				},
				{
					id: 'teaching-learning-process',
					title: 'Teaching Learning Process',
					icon: <GraduationCap className='w-4 h-4' />
				}
			]
		},
		{
			id: 'facilities',
			title: 'Facilities',
			icon: <Building2 className='w-5 h-5' />,
			subSections: [
				{
					id: 'labs',
					title: 'Labs',
					icon: <Microscope className='w-4 h-4' />
				},
				{
					id: 'rd-labs',
					title: 'R&D Labs',
					icon: <FlaskConical className='w-4 h-4' />
				},
				{
					id: 'industry-supported-labs',
					title: 'Industry‑Supported Labs',
					icon: <Factory className='w-4 h-4' />
				},
				{
					id: 'foss-cell',
					title: 'FOSS Cell',
					icon: <Code className='w-4 h-4' />
				}
			]
		},
		{
			id: 'student-corner',
			title: 'Student Corner',
			icon: <GraduationCap className='w-5 h-5' />,
			subSections: [
				{
					id: 'prototype-product-development',
					title: 'Prototype Product Development',
					icon: <Wrench className='w-4 h-4' />
				},
				{
					id: 'awards',
					title: 'Awards',
					icon: <Trophy className='w-4 h-4' />
				},
				{
					id: 'projects',
					title: 'Projects',
					icon: <FolderOpen className='w-4 h-4' />
				},
				{
					id: 'seminars-workshops',
					title: 'Seminars & Workshops',
					icon: <Presentation className='w-4 h-4' />
				},
				{
					id: 'alumni',
					title: 'Alumni',
					icon: <Users2 className='w-4 h-4' />
				}
			]
		},
		{
			id: 'publications',
			title: 'Publications',
			icon: <FileText className='w-5 h-5' />,
			subSections: [
				{
					id: 'faculty-publications',
					title: 'Faculty Publications',
					icon: <BookOpenCheck className='w-4 h-4' />
				},
				{
					id: 'student-publications',
					title: 'Student Publications',
					icon: <NotebookPen className='w-4 h-4' />
				}
			]
		},
		{
			id: 'patents',
			title: 'Patents',
			icon: <Shield className='w-5 h-5' />,
			hasContent: true
		},
		{
			id: 'magazine',
			title: 'Magazine',
			icon: <Camera className='w-5 h-5' />,
			hasContent: true
		},
		{
			id: 'newsletter',
			title: 'News‑Letter',
			icon: <Newspaper className='w-5 h-5' />,
			hasContent: true
		},
		{
			id: 'result',
			title: 'Result',
			icon: <BarChart className='w-5 h-5' />,
			hasContent: true
		},
		{
			id: 'placement',
			title: 'Placement',
			icon: <Briefcase className='w-5 h-5' />,
			hasContent: true
		}
	];

	// Get current content based on active section and subsection
	const getCurrentContent = () => {
		const currentKey =
			activeSection === 'home' ? activeSubSection : activeSection;

		switch (currentKey) {
			case 'home':
			case 'overview':
				return (
					<div className='space-y-12'>
						{/* Welcome Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200'>
							<div className='text-center mb-8'>
								<div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
									<Home className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
								</div>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>
									Welcome to CSE Department
								</h1>
								<p className='text-blue-600 font-medium'>
									Building Tomorrow&apos;s Tech Leaders Today
								</p>
							</div>

							{/* Quick Stats */}
							<div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-8'>
								{[
									{
										label: 'Students',
										value: '800+',
										icon: <Users className='w-5 h-5' />
									},
									{
										label: 'Faculty',
										value: '30+',
										icon: <UserCheck className='w-5 h-5' />
									},
									{
										label: 'Labs',
										value: '15+',
										icon: <Monitor className='w-5 h-5' />
									},
									{
										label: 'Placements',
										value: '95%',
										icon: <TrendingUp className='w-5 h-5' />
									}
								].map((stat, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 * index }}
										className='bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50'>
										<div className='text-blue-600 flex justify-center mb-2'>
											{stat.icon}
										</div>
										<div className='text-2xl font-bold text-gray-900'>
											{stat.value}
										</div>
										<div className='text-sm text-gray-600'>{stat.label}</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Navigation Quick Links */}
						<AnimatedCard delay={0.1}>
							<div>
								<h2 className='text-2xl font-bold text-gray-900 mb-6'>
									Explore Our Department
								</h2>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
									{[
										{
											title: 'Vision & Mission',
											icon: <Eye className='w-6 h-6' />,
											section: 'about',
											subsection: 'vision-mission',
											color: 'blue'
										},
										{
											title: 'POs/PEOs/PSOs',
											icon: <Target className='w-6 h-6' />,
											section: 'about',
											subsection: 'pos-peos-psos',
											color: 'purple'
										},
										{
											title: 'Faculty Members',
											icon: <Users className='w-6 h-6' />,
											section: 'about',
											subsection: 'faculty',
											color: 'green'
										},
										{
											title: 'Academic Calendar',
											icon: <Calendar className='w-6 h-6' />,
											section: 'academics',
											subsection: 'academic-calendar',
											color: 'orange'
										},
										{
											title: 'Labs & Facilities',
											icon: <Monitor className='w-6 h-6' />,
											section: 'facilities',
											subsection: 'labs',
											color: 'indigo'
										},
										{
											title: 'Student Corner',
											icon: <GraduationCap className='w-6 h-6' />,
											section: 'student-corner',
											subsection: 'awards',
											color: 'teal'
										}
									].map((link, index) => (
										<motion.button
											key={index}
											onClick={() =>
												handleSectionClick(link.section, link.subsection)
											}
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ delay: 0.1 * index }}
											whileHover={{ scale: 1.05 }}
											className={`p-4 bg-${link.color}-50 hover:bg-${link.color}-100 border border-${link.color}-200 rounded-xl text-left transition-all duration-300 group`}>
											<div className={`text-${link.color}-600 mb-2`}>
												{link.icon}
											</div>
											<h3
												className={`font-semibold text-gray-900 group-hover:text-${link.color}-600 transition-colors`}>
												{link.title}
											</h3>
										</motion.button>
									))}
								</div>
							</div>
						</AnimatedCard>
					</div>
				);

			case 'vision-mission':
				return (
					<div className='space-y-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200'>
							<div className='text-center mb-8'>
								<div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
									<Eye className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
								</div>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>
									Vision & Mission
								</h1>
								<p className='text-blue-600 font-medium'>
									CSE Department - Building Tomorrow&apos;s Tech Leaders
								</p>
							</div>
						</motion.div>

						<div className='grid md:grid-cols-1 gap-8'>
							<AnimatedCard delay={0.1}>
								<div className='text-center'>
									<div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
										<Eye className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900 mb-4'>
										Our Vision
									</h3>
									<p className='text-gray-700 leading-relaxed'>
										To be a globally recognized department of Computer Science &
										Engineering that fosters innovation, excellence in
										education, and cutting-edge research to produce competent
										professionals who contribute to technological advancement
										and societal development.
									</p>
								</div>
							</AnimatedCard>

							<AnimatedCard delay={0.2}>
								<div className='text-center'>
									<div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
										<Target className='w-5 h-5 sm:w-6 sm:h-6 text-green-600' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900 mb-4'>
										Our Mission
									</h3>
									<div className='text-gray-700 leading-relaxed space-y-3'>
										<p>
											• To provide quality education in Computer Science &
											Engineering through innovative teaching-learning practices
										</p>
										<p>
											• To promote research and development activities in
											emerging areas of technology
										</p>
										<p>
											• To develop industry-ready professionals with strong
											ethical values and leadership qualities
										</p>
										<p>
											• To foster entrepreneurship and innovation among students
											and faculty
										</p>
										<p>
											• To establish strong industry-academia collaboration for
											mutual benefit
										</p>
									</div>
								</div>
							</AnimatedCard>
						</div>
					</div>
				);

			case 'pos-peos-psos':
				return (
					<div className='space-y-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200'>
							<div className='text-center mb-8'>
								<div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
									<Target className='w-8 h-8 text-white' />
								</div>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>
									Program Outcomes & Objectives
								</h1>
								<p className='text-purple-600 font-medium'>
									POs / PEOs / PSOs - Comprehensive Educational Framework
								</p>
							</div>
						</motion.div>

						<div className='grid md:grid-cols-1 gap-8'>
							<AnimatedCard delay={0.1}>
								<div>
									<div className='flex items-center gap-3 mb-6'>
										<div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
											<Target className='w-5 h-5 text-blue-600' />
										</div>
										<h3 className='text-xl font-bold text-gray-900'>
											Program Educational Objectives (PEOs)
										</h3>
									</div>
									<div className='space-y-3 text-gray-700'>
										<p>
											<strong>PEO1:</strong> Graduates will have successful
											careers in computer science and engineering or related
											fields, demonstrating technical competence and
											professional growth.
										</p>
										<p>
											<strong>PEO2:</strong> Graduates will demonstrate
											leadership, teamwork, and communication skills in
											multidisciplinary environments.
										</p>
										<p>
											<strong>PEO3:</strong> Graduates will engage in lifelong
											learning to adapt to technological changes and pursue
											advanced studies or research.
										</p>
										<p>
											<strong>PEO4:</strong> Graduates will contribute to
											society with ethical responsibility and awareness of
											contemporary issues.
										</p>
									</div>
								</div>
							</AnimatedCard>

							<AnimatedCard delay={0.2}>
								<div>
									<div className='flex items-center gap-3 mb-6'>
										<div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
											<CheckCircle className='w-5 h-5 text-green-600' />
										</div>
										<h3 className='text-xl font-bold text-gray-900'>
											Program Outcomes (POs)
										</h3>
									</div>
									<div className='grid md:grid-cols-2 gap-4 text-sm text-gray-700'>
										<div className='space-y-2'>
											<p>
												<strong>PO1:</strong> Engineering knowledge
											</p>
											<p>
												<strong>PO2:</strong> Problem analysis
											</p>
											<p>
												<strong>PO3:</strong> Design/development of solutions
											</p>
											<p>
												<strong>PO4:</strong> Conduct investigations
											</p>
											<p>
												<strong>PO5:</strong> Modern tool usage
											</p>
											<p>
												<strong>PO6:</strong> Engineer and society
											</p>
										</div>
										<div className='space-y-2'>
											<p>
												<strong>PO7:</strong> Environment and sustainability
											</p>
											<p>
												<strong>PO8:</strong> Ethics
											</p>
											<p>
												<strong>PO9:</strong> Individual and team work
											</p>
											<p>
												<strong>PO10:</strong> Communication
											</p>
											<p>
												<strong>PO11:</strong> Project management
											</p>
											<p>
												<strong>PO12:</strong> Life-long learning
											</p>
										</div>
									</div>
								</div>
							</AnimatedCard>

							<AnimatedCard delay={0.3}>
								<div>
									<div className='flex items-center gap-3 mb-6'>
										<div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
											<Star className='w-5 h-5 text-purple-600' />
										</div>
										<h3 className='text-xl font-bold text-gray-900'>
											Program Specific Outcomes (PSOs)
										</h3>
									</div>
									<div className='space-y-3 text-gray-700'>
										<p>
											<strong>PSO1:</strong> Professional Skills: Ability to
											design, implement, and maintain software systems using
											appropriate programming languages, frameworks, and tools.
										</p>
										<p>
											<strong>PSO2:</strong> Problem Solving: Capability to
											analyze complex computing problems and develop algorithmic
											solutions with consideration of time and space complexity.
										</p>
										<p>
											<strong>PSO3:</strong> Emerging Technologies: Competency
											to adapt and apply emerging technologies in areas like
											AI/ML, IoT, Cybersecurity, and Data Science to solve
											real-world problems.
										</p>
									</div>
								</div>
							</AnimatedCard>
						</div>
					</div>
				);

			case 'faculty':
				return (
					<div className='space-y-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-200'>
							<div className='text-center mb-8'>
								<div className='w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
									<Users className='w-8 h-8 text-white' />
								</div>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>
									Faculty Members
								</h1>
								<p className='text-indigo-600 font-medium'>
									Expert Educators & Researchers
								</p>
							</div>
						</motion.div>

						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{[
								{
									name: 'Dr. Priya Sharma',
									designation: 'Professor & HOD',
									specialization: 'Machine Learning, Computer Vision',
									experience: '15+ years',
									email: 'priya.sharma@bpitindia.com',
									education: 'Ph.D. Computer Science, IIT Delhi'
								},
								{
									name: 'Dr. Rajesh Kumar',
									designation: 'Associate Professor',
									specialization: 'Cybersecurity, Network Security',
									experience: '12+ years',
									email: 'rajesh.kumar@bpitindia.com',
									education: 'Ph.D. Information Security, IIT Bombay'
								},
								{
									name: 'Dr. Anita Verma',
									designation: 'Assistant Professor',
									specialization: 'Data Science, Big Data Analytics',
									experience: '8+ years',
									email: 'anita.verma@bpitindia.com',
									education: 'Ph.D. Data Science, IIT Kanpur'
								},
								{
									name: 'Prof. Amit Singh',
									designation: 'Assistant Professor',
									specialization: 'Software Engineering, Web Technologies',
									experience: '6+ years',
									email: 'amit.singh@bpitindia.com',
									education: 'M.Tech CSE, DTU'
								},
								{
									name: 'Dr. Neha Gupta',
									designation: 'Assistant Professor',
									specialization: 'Artificial Intelligence, NLP',
									experience: '7+ years',
									email: 'neha.gupta@bpitindia.com',
									education: 'Ph.D. AI, IIIT Delhi'
								},
								{
									name: 'Prof. Vikash Yadav',
									designation: 'Assistant Professor',
									specialization: 'Database Systems, Cloud Computing',
									experience: '5+ years',
									email: 'vikash.yadav@bpitindia.com',
									education: 'M.Tech IT, NSIT'
								}
							].map((faculty, index) => (
								<AnimatedCard key={faculty.name} delay={0.1 + index * 0.1}>
									<div className='text-center'>
										<div className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
											<User className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-gray-400' />
										</div>
										<h3 className='text-lg font-bold text-gray-900 mb-1'>
											{faculty.name}
										</h3>
										<p className='text-blue-600 font-medium mb-2'>
											{faculty.designation}
										</p>
										<p className='text-sm text-gray-600 mb-3'>
											{faculty.specialization}
										</p>

										<div className='space-y-2 text-xs text-gray-500 mb-4'>
											<div className='flex items-center justify-center gap-1'>
												<Clock className='w-3 h-3' />
												<span>{faculty.experience}</span>
											</div>
											<div className='flex items-center justify-center gap-1'>
												<Mail className='w-3 h-3' />
												<span className='truncate'>{faculty.email}</span>
											</div>
											<p className='text-center'>{faculty.education}</p>
										</div>
									</div>
								</AnimatedCard>
							))}
						</div>
					</div>
				);

			case 'academic-calendar':
				return (
					<div className='space-y-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200'>
							<div className='text-center mb-8'>
								<div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
									<Calendar className='w-8 h-8 text-white' />
								</div>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>
									Academic Calendar
								</h1>
								<p className='text-green-600 font-medium'>
									Important Academic Dates & Events
								</p>
							</div>
						</motion.div>

						<div className='grid md:grid-cols-1 gap-8'>
							<AnimatedCard delay={0.1}>
								<div>
									<h3 className='text-xl font-bold text-gray-900 mb-6'>
										Academic Year 2024-25
									</h3>
									<div className='space-y-4'>
										{[
											{
												event: 'Semester 1 Registration',
												date: 'July 15 - July 30, 2024',
												type: 'registration'
											},
											{
												event: 'Classes Begin (Semester 1)',
												date: 'August 1, 2024',
												type: 'classes'
											},
											{
												event: 'Mid-Term Examinations',
												date: 'September 15 - September 25, 2024',
												type: 'exam'
											},
											{
												event: 'Semester 1 End Examinations',
												date: 'November 20 - December 5, 2024',
												type: 'exam'
											},
											{
												event: 'Winter Break',
												date: 'December 10 - December 31, 2024',
												type: 'break'
											},
											{
												event: 'Semester 2 Registration',
												date: 'January 5 - January 15, 2025',
												type: 'registration'
											},
											{
												event: 'Classes Begin (Semester 2)',
												date: 'January 20, 2025',
												type: 'classes'
											},
											{
												event: 'Mid-Term Examinations',
												date: 'March 1 - March 10, 2025',
												type: 'exam'
											},
											{
												event: 'Semester 2 End Examinations',
												date: 'May 15 - May 30, 2025',
												type: 'exam'
											},
											{
												event: 'Summer Break',
												date: 'June 1 - July 15, 2025',
												type: 'break'
											}
										].map((item, index) => (
											<motion.div
												key={index}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 }}
												className={`p-4 rounded-lg border-l-4 ${
													item.type === 'exam'
														? 'bg-red-50 border-red-500'
														: item.type === 'classes'
														? 'bg-blue-50 border-blue-500'
														: item.type === 'registration'
														? 'bg-green-50 border-green-500'
														: 'bg-gray-50 border-gray-500'
												}`}>
												<div className='flex justify-between items-center'>
													<h4 className='font-semibold text-gray-900'>
														{item.event}
													</h4>
													<span className='text-sm text-gray-600'>
														{item.date}
													</span>
												</div>
											</motion.div>
										))}
									</div>
								</div>
							</AnimatedCard>
						</div>
					</div>
				);

			// Add default case for other sections
			default:
				return (
					<div className='space-y-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200'>
							<div className='text-center'>
								<div className='w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
									<Settings className='w-8 h-8 text-white' />
								</div>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>
									{navigationSections.find(s => s.id === activeSection)
										?.title ||
										navigationSections
											.find(s =>
												s.subSections?.find(sub => sub.id === activeSubSection)
											)
											?.subSections?.find(sub => sub.id === activeSubSection)
											?.title ||
										'Section'}
								</h1>
								<p className='text-gray-600 font-medium'>
									Content coming soon...
								</p>
							</div>
						</motion.div>

						<AnimatedCard>
							<div className='text-center py-12'>
								<div className='w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 aspect-square'>
									<Zap className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-blue-600' />
								</div>
								<h3 className='text-xl font-bold text-gray-900 mb-4'>
									Content Under Development
								</h3>
								<p className='text-gray-600 max-w-md mx-auto'>
									We&apos;re working hard to bring you comprehensive content for
									this section. Please check back soon for updates!
								</p>
							</div>
						</AnimatedCard>
					</div>
				);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
					<div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
				</div>

				<div className='relative z-10 container mx-auto px-3 sm:px-4 py-16 sm:py-20 md:py-24'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center max-w-4xl mx-auto'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 backdrop-blur-sm aspect-square'>
							<Code className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white' />
						</motion.div>

						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
							Computer Science & Engineering
						</h1>

						<p className='text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed'>
							Innovating Tomorrow&apos;s Technology Today
						</p>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='flex flex-wrap justify-center gap-4 text-sm'>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>AI & Machine Learning</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Data Science</span>
							</div>
							<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
								<Star className='w-4 h-4 text-yellow-300' />
								<span>Cybersecurity</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<div className='container mx-auto px-3 sm:px-4 py-8 sm:py-12'>
				<div className='flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8'>
					{/* Advanced Sidebar Navigation */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='lg:w-80 flex-shrink-0'>
						<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8'>
							<div className='bg-gradient-to-r from-blue-600 to-purple-600 p-4'>
								<h3 className='text-white font-bold text-lg'>Navigation</h3>
							</div>

							<div className='p-2 max-h-[80vh] overflow-y-auto'>
								{navigationSections.map((section, index) => (
									<div key={section.id} className='mb-2'>
										<motion.button
											onClick={() => {
												if (section.subSections) {
													toggleSection(section.id);
												} else {
													handleSectionClick(section.id);
												}
											}}
											className={`w-full text-left p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
												activeSection === section.id
													? 'bg-blue-50 text-blue-700 shadow-md border border-blue-200'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
											}`}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											initial={{ opacity: 0, y: 12 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}>
											<div className='flex items-center gap-3 relative z-10'>
												<div
													className={`p-2 rounded-lg transition-colors ${
														activeSection === section.id
															? 'bg-blue-100 text-blue-600'
															: 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
													}`}>
													{section.icon}
												</div>
												<span className='font-medium text-sm'>
													{section.title}
												</span>
												{section.subSections && (
													<ChevronDown
														className={`w-4 h-4 ml-auto transition-transform ${
															expandedSections.includes(section.id)
																? 'rotate-180'
																: ''
														} ${
															activeSection === section.id
																? 'text-blue-600'
																: 'text-gray-400'
														}`}
													/>
												)}
												{!section.subSections && (
													<ChevronRight
														className={`w-4 h-4 ml-auto transition-transform ${
															activeSection === section.id
																? 'rotate-90 text-blue-600'
																: 'text-gray-400'
														}`}
													/>
												)}
											</div>
										</motion.button>

										{/* Sub-sections */}
										<AnimatePresence>
											{section.subSections &&
												expandedSections.includes(section.id) && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: 'auto' }}
														exit={{ opacity: 0, height: 0 }}
														transition={{ duration: 0.3 }}
														className='ml-4 mt-2 space-y-1 border-l-2 border-gray-200'>
														{section.subSections.map((subSection, subIndex) => (
															<motion.button
																key={subSection.id}
																onClick={() =>
																	handleSectionClick(section.id, subSection.id)
																}
																className={`w-full text-left p-2 pl-4 rounded-lg transition-all duration-200 group text-sm ${
																	activeSection === section.id &&
																	activeSubSection === subSection.id
																		? 'bg-blue-100 text-blue-700 border-l-2 border-blue-500'
																		: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-2 border-transparent'
																}`}
																initial={{ opacity: 0, y: 8 }}
																animate={{ opacity: 1, y: 0 }}
																transition={{
																	duration: 0.2,
																	delay: subIndex * 0.05
																}}>
																<div className='flex items-center gap-2'>
																	<div
																		className={`p-1 rounded transition-colors ${
																			activeSection === section.id &&
																			activeSubSection === subSection.id
																				? 'bg-blue-200 text-blue-700'
																				: 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
																		}`}>
																		{subSection.icon}
																	</div>
																	<span className='font-medium'>
																		{subSection.title}
																	</span>
																</div>
															</motion.button>
														))}
													</motion.div>
												)}
										</AnimatePresence>
									</div>
								))}
							</div>
						</div>
					</motion.div>

					{/* Content Area */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='flex-1'>
						<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
							<AnimatePresence mode='wait'>
								<motion.div
									key={`${activeSection}-${activeSubSection}`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.4 }}
									className='p-4 sm:p-6 lg:p-8'>
									{getCurrentContent()}
								</motion.div>
							</AnimatePresence>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default CSEDepartmentPage;
