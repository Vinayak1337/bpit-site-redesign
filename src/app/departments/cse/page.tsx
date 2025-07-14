'use client';

import React, { useState, useRef, useEffect } from 'react';
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
	Mail,
	Award,
	MapPin,
	Menu,
	X,
	Bell
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

// Department Highlights Carousel Component
const DepartmentHighlightsCarousel = () => {
	const [isHovered, setIsHovered] = useState(false);
	
	const highlights = [
		{
			title: 'Hackathon Winners 2024',
			image: '/events/img1.png',
			description: 'Our students secured 1st place in National Hackathon with innovative AI solution for healthcare.',
			category: 'Competition',
			date: 'December 2024',
			achievement: 'First Place',
			bgColor: 'from-blue-500 to-blue-600',
			participants: '300+ Teams',
			prize: '₹50,000'
		},
		{
			title: 'Research Excellence Award',
			image: '/events/img2.png',
			description: 'Department recognized for outstanding research contribution in Machine Learning and Data Science.',
			category: 'Research',
			date: 'November 2024',
			achievement: 'Excellence Award',
			bgColor: 'from-green-500 to-green-600',
			participants: '15 Research Papers',
			prize: 'National Recognition'
		},
		{
			title: 'Tech Symposium 2024',
			image: '/events/img3.png',
			description: 'Annual technical symposium with 500+ participants and industry experts from top tech companies.',
			category: 'Event',
			date: 'October 2024',
			achievement: 'Successful Event',
			bgColor: 'from-purple-500 to-purple-600',
			participants: '500+ Attendees',
			prize: 'Industry Connect'
		},
		{
			title: 'Industry Partnership Program',
			image: '/events/img1.png',
			description: 'Strategic collaboration with leading tech companies for student internships and placements.',
			category: 'Partnership',
			date: 'September 2024',
			achievement: 'MOU Signed',
			bgColor: 'from-orange-500 to-orange-600',
			participants: '5 Companies',
			prize: 'Job Opportunities'
		},
		{
			title: 'Coding Competition Victory',
			image: '/events/img2.png',
			description: 'Team CodeMasters won inter-college programming contest with innovative problem-solving approach.',
			category: 'Competition',
			date: 'August 2024',
			achievement: 'Champions',
			bgColor: 'from-red-500 to-red-600',
			participants: '200+ Teams',
			prize: '₹25,000'
		},
		{
			title: 'Innovation Lab Launch',
			image: '/events/img3.png',
			description: 'New AI/ML innovation lab inaugurated with state-of-the-art equipment and software tools.',
			category: 'Infrastructure',
			date: 'July 2024',
			achievement: 'Lab Inaugurated',
			bgColor: 'from-indigo-500 to-indigo-600',
			participants: 'Advanced Equipment',
			prize: 'Enhanced Learning'
		},
		{
			title: 'Open Source Contribution Drive',
			image: '/events/img1.png',
			description: 'Students contributed to major open source projects and gained recognition from global developers.',
			category: 'Community',
			date: 'June 2024',
			achievement: 'Global Recognition',
			bgColor: 'from-teal-500 to-teal-600',
			participants: '50+ Contributors',
			prize: 'GitHub Achievements'
		},
		{
			title: 'AI Workshop Series',
			image: '/events/img2.png',
			description: 'Comprehensive workshop series on Artificial Intelligence and Machine Learning for beginners.',
			category: 'Workshop',
			date: 'May 2024',
			achievement: 'Skill Development',
			bgColor: 'from-cyan-500 to-cyan-600',
			participants: '200+ Students',
			prize: 'Certification'
		},
		{
			title: 'Startup Incubation Program',
			image: '/events/img3.png',
			description: 'Department launches startup incubation program to foster entrepreneurship among students.',
			category: 'Innovation',
			date: 'April 2024',
			achievement: 'Program Launch',
			bgColor: 'from-rose-500 to-rose-600',
			participants: '25+ Startups',
			prize: 'Funding Support'
		},
		{
			title: 'International Conference Participation',
			image: '/events/img1.png',
			description: 'Faculty and students presented research papers at international technology conferences.',
			category: 'Research',
			date: 'March 2024',
			achievement: 'Global Platform',
			bgColor: 'from-amber-500 to-amber-600',
			participants: '10+ Papers',
			prize: 'International Exposure'
		}
	];

	// Create duplicate arrays for seamless infinite scrolling
	const duplicatedHighlights = [...highlights, ...highlights];

	const renderHighlightCard = (highlight: any, index: number) => (
		<div
			key={`highlight-${index}`}
			className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex-shrink-0 w-72 sm:w-80 mx-2 sm:mx-3'
			style={{ minWidth: '280px' }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			
			{/* Image Section */}
			<div className='relative h-48 bg-gray-200 overflow-hidden'>
				<img 
					src={highlight.image} 
					alt={highlight.title}
					className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
					onError={(e) => {
						e.currentTarget.style.display = 'none';
						(e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
					}}
				/>
				{/* Fallback gradient background */}
				<div className={`absolute inset-0 bg-gradient-to-br ${highlight.bgColor} opacity-90 hidden items-center justify-center`}>
					<div className='text-center text-white'>
						<Trophy className='w-12 h-12 mx-auto mb-2' />
						<p className='text-sm font-medium'>{highlight.category}</p>
					</div>
				</div>
			</div>
			
			{/* Content Section */}
			<div className='p-6'>
				<h3 className='text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors'>
					{highlight.title}
				</h3>
				
				<p className='text-gray-600 text-sm leading-relaxed mb-4'>
					{highlight.description}
				</p>
			</div>
		</div>
	);

	return (
		<div className='relative'>
			{/* Carousel Container */}
			<div className='relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm'>
				{/* Infinite Horizontal Scrolling */}
				<div className='py-6'>
					<motion.div
						className='flex'
						animate={isHovered ? {} : { x: ['0%', '-50%'] }}
						transition={isHovered ? {} : {
							duration: 30,
							repeat: Infinity,
							ease: "linear"
						}}
						style={{ willChange: 'transform' }}>
						{duplicatedHighlights.map((highlight, index) => 
							renderHighlightCard(highlight, index)
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

// Shining Stars Section Component
const ShiningStarsSection = () => {
	const [activeStudent, setActiveStudent] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const students = [
		{
			id: 1,
			name: 'Arjun Sharma',
			image: '/events/img1.png',
			achievement: 'Google Software Engineer',
			year: '2023 Graduate',
			company: 'Google',
			package: '₹45 LPA',
			location: 'Bangalore',
			description: 'Secured position as Software Engineer at Google after excelling in competitive programming and contributing to open-source projects.',
			skills: ['Python', 'Java', 'Machine Learning', 'System Design'],
			projects: ['AI-powered Healthcare App', 'Distributed Computing System'],
			awards: ['Best Final Year Project', 'Google Code-in Winner']
		},
		{
			id: 2,
			name: 'Priya Patel',
			image: '/events/img2.png',
			achievement: 'Microsoft Product Manager',
			year: '2023 Graduate',
			company: 'Microsoft',
			package: '₹38 LPA',
			location: 'Hyderabad',
			description: 'Landed Product Manager role at Microsoft with expertise in AI/ML and exceptional leadership skills in team projects.',
			skills: ['Product Management', 'Data Analysis', 'AI/ML', 'Leadership'],
			projects: ['Smart Campus Management System', 'E-commerce Analytics Platform'],
			awards: ['Outstanding Leadership Award', 'Microsoft Imagine Cup Finalist']
		},
		{
			id: 3,
			name: 'Rahul Kumar',
			image: '/events/img3.png',
			achievement: 'Amazon SDE-2',
			year: '2022 Graduate',
			company: 'Amazon',
			package: '₹42 LPA',
			location: 'Seattle, USA',
			description: 'Promoted to SDE-2 at Amazon within 1 year, leading cloud infrastructure projects and mentoring new graduates.',
			skills: ['AWS', 'Distributed Systems', 'Java', 'Microservices'],
			projects: ['Cloud Migration Tool', 'Real-time Data Processing Pipeline'],
			awards: ['Amazon Bar Raiser', 'Best Innovation Award']
		},
		{
			id: 4,
			name: 'Sneha Gupta',
			image: '/events/img1.png',
			achievement: 'Startup Founder',
			year: '2022 Graduate',
			company: 'EduTech Solutions',
			package: 'Entrepreneur',
			location: 'Mumbai',
			description: 'Founded successful EdTech startup that has impacted 100,000+ students with innovative learning solutions.',
			skills: ['Entrepreneurship', 'Full Stack Development', 'Business Strategy', 'Team Leadership'],
			projects: ['AI Learning Platform', 'Student Assessment System'],
			awards: ['Young Entrepreneur Award', 'Best Startup Pitch Competition']
		},
		{
			id: 5,
			name: 'Vikash Singh',
			image: '/events/img2.png',
			achievement: 'Meta Research Scientist',
			year: '2023 Graduate',
			company: 'Meta',
			package: '₹50 LPA',
			location: 'Menlo Park, USA',
			description: 'Joined Meta as Research Scientist focusing on Computer Vision and AR/VR technologies with cutting-edge research.',
			skills: ['Computer Vision', 'Deep Learning', 'Python', 'Research & Development'],
			projects: ['AR Object Recognition', 'Neural Network Optimization'],
			awards: ['Best Research Paper', 'Meta AI Residency Program']
		},
		{
			id: 6,
			name: 'Ananya Gupta',
			image: '/events/img3.png',
			achievement: 'Apple iOS Developer',
			year: '2023 Graduate',
			company: 'Apple',
			package: '₹48 LPA',
			location: 'Cupertino, USA',
			description: 'Secured position as iOS Developer at Apple, working on innovative mobile applications and contributing to the next generation of iPhone features.',
			skills: ['Swift', 'iOS Development', 'Mobile UI/UX', 'Core ML'],
			projects: ['Health Monitoring App', 'Smart Home Integration'],
			awards: ['Apple WWDC Scholarship', 'Best Mobile App Developer']
		},
		{
			id: 7,
			name: 'Karan Mehta',
			image: '/events/img1.png',
			achievement: 'Netflix Senior Engineer',
			year: '2022 Graduate',
			company: 'Netflix',
			package: '₹44 LPA',
			location: 'Los Angeles, USA',
			description: 'Promoted to Senior Software Engineer at Netflix, leading the development of recommendation algorithms and streaming optimization systems.',
			skills: ['Distributed Systems', 'Big Data', 'Scala', 'Machine Learning'],
			projects: ['Content Recommendation Engine', 'Video Streaming Optimization'],
			awards: ['Netflix Innovation Award', 'Best Performance Optimization']
		},
		{
			id: 8,
			name: 'Ritika Sharma',
			image: '/events/img2.png',
			achievement: 'Adobe Creative Cloud Engineer',
			year: '2023 Graduate',
			company: 'Adobe',
			package: '₹41 LPA',
			location: 'San Jose, USA',
			description: 'Joined Adobe as Software Engineer working on Creative Cloud applications, focusing on AI-powered creative tools and user experience.',
			skills: ['JavaScript', 'React', 'AI/ML', 'Creative Technologies'],
			projects: ['AI-powered Photo Editor', 'Real-time Collaboration Tools'],
			awards: ['Adobe Creative Challenge Winner', 'Outstanding UI/UX Design']
		},
		{
			id: 9,
			name: 'Aditya Raj',
			image: '/events/img3.png',
			achievement: 'Tesla Autopilot Engineer',
			year: '2022 Graduate',
			company: 'Tesla',
			package: '₹52 LPA',
			location: 'Palo Alto, USA',
			description: 'Working as Autopilot Software Engineer at Tesla, developing cutting-edge autonomous driving technology and neural networks for self-driving cars.',
			skills: ['Computer Vision', 'Deep Learning', 'C++', 'Autonomous Systems'],
			projects: ['Self-Driving Car Algorithm', 'Neural Network for Object Detection'],
			awards: ['Tesla Innovation Excellence', 'Best Autonomous Systems Project']
		},
		{
			id: 10,
			name: 'Pooja Verma',
			image: '/events/img1.png',
			achievement: 'Uber Principal Engineer',
			year: '2021 Graduate',
			company: 'Uber',
			package: '₹46 LPA',
			location: 'San Francisco, USA',
			description: 'Promoted to Principal Engineer at Uber, leading the development of ride-sharing algorithms and real-time location tracking systems.',
			skills: ['Distributed Systems', 'Real-time Systems', 'Go', 'System Architecture'],
			projects: ['Real-time Ride Matching', 'Dynamic Pricing Algorithm'],
			awards: ['Uber Engineering Excellence', 'Best System Architecture Design']
		}
	];

	const currentStudent = students[activeStudent];

	// Auto-cycle through students
	useEffect(() => {
		if (!isHovered) {
			const interval = setInterval(() => {
				setActiveStudent((prev) => (prev + 1) % students.length);
			}, 4000); // Change every 4 seconds

			return () => clearInterval(interval);
		}
	}, [isHovered, students.length]);

	return (
		<div className='space-y-8'>
			{/* Student Details Display */}
			<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{/* Student Photo and Basic Info */}
					<div className='lg:col-span-1'>
						<div className='text-center'>
							<div className='relative w-40 h-40 mx-auto mb-4'>
								<img
									src={currentStudent.image}
									alt={currentStudent.name}
									className='w-full h-full object-cover rounded-full'
									onError={(e) => {
										(e.target as HTMLImageElement).style.display = 'none';
										(e.target as HTMLImageElement).nextElementSibling?.setAttribute('style', 'display: flex');
									}}
								/>
								{/* Fallback */}
								<div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full hidden items-center justify-center'>
									<User className='w-16 h-16 text-white' />
								</div>
							</div>
							<h3 className='text-2xl font-bold text-gray-900 mb-2'>{currentStudent.name}</h3>
							<p className='text-blue-600 font-semibold mb-1'>{currentStudent.achievement}</p>
							<p className='text-gray-600 text-sm mb-2'>{currentStudent.year}</p>
							<div className='flex items-center justify-center gap-2 mb-2'>
								<Building2 className='w-4 h-4 text-blue-600' />
								<span className='text-blue-600 font-medium'>{currentStudent.company}</span>
							</div>
							<div className='flex items-center justify-center gap-2 mb-2'>
								<TrendingUp className='w-4 h-4 text-green-600' />
								<span className='text-green-600 font-medium'>{currentStudent.package}</span>
							</div>
							<div className='flex items-center justify-center gap-2'>
								<MapPin className='w-4 h-4 text-gray-600' />
								<span className='text-gray-600'>{currentStudent.location}</span>
							</div>
						</div>
					</div>

					{/* Detailed Information */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Description */}
						<div>
							<h4 className='text-lg font-bold text-gray-900 mb-3'>Achievement Story</h4>
							<p className='text-gray-700 leading-relaxed'>{currentStudent.description}</p>
						</div>

						{/* Skills */}
						<div>
							<h4 className='text-lg font-bold text-gray-900 mb-3'>Core Skills</h4>
							<div className='flex flex-wrap gap-2'>
								{currentStudent.skills.map((skill, index) => (
									<span
										key={index}
										className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
										{skill}
									</span>
								))}
							</div>
						</div>

						{/* Projects */}
						<div>
							<h4 className='text-lg font-bold text-gray-900 mb-3'>Notable Projects</h4>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
								{currentStudent.projects.map((project, index) => (
									<div key={index} className='bg-gray-50 rounded-lg p-3'>
										<div className='flex items-center gap-2'>
											<FolderOpen className='w-4 h-4 text-purple-600' />
											<span className='text-gray-800 font-medium text-sm'>{project}</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Awards */}
						<div>
							<h4 className='text-lg font-bold text-gray-900 mb-3'>Awards & Recognition</h4>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
								{currentStudent.awards.map((award, index) => (
									<div key={index} className='bg-blue-50 rounded-lg p-3'>
										<div className='flex items-center gap-2'>
											<Award className='w-4 h-4 text-blue-600' />
											<span className='text-gray-800 font-medium text-sm'>{award}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Circular Navigation */}
			<div className='flex justify-center items-center space-x-2 sm:space-x-4 overflow-x-auto pb-4'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				{students.map((student, index) => (
					<button
						key={student.id}
						onClick={() => setActiveStudent(index)}
						className={`relative transition-all duration-300 flex-shrink-0 ${
							index === activeStudent
								? 'scale-110'
								: 'scale-100 hover:scale-105'
						}`}>
						<div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg border-3 transition-all duration-300 ${
							index === activeStudent
								? 'border-blue-500'
								: 'border-blue-300 hover:border-blue-400'
						}`}>
							<img
								src={student.image}
								alt={student.name}
								className='w-full h-full object-cover'
								onError={(e) => {
									(e.target as HTMLImageElement).style.display = 'none';
									(e.target as HTMLImageElement).nextElementSibling?.setAttribute('style', 'display: flex');
								}}
							/>
							{/* Fallback */}
							<div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 hidden items-center justify-center'>
								<User className='w-8 h-8 text-white' />
							</div>
						</div>
						{/* Active indicator */}
						{index === activeStudent && (
							<div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
						)}
					</button>
				))}
			</div>
		</div>
	);
};

const CSEDepartmentPage = () => {
	const [activeSection, setActiveSection] = useState('home');
	const [activeSubSection, setActiveSubSection] = useState('');
	const [expandedSections, setExpandedSections] = useState<string[]>([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
		} else {
			// When clicking on main section (like Home), clear subsection
			setActiveSubSection('');
		}
		// Close mobile menu when section is selected
		setIsMobileMenuOpen(false);
	};

	// Toggle mobile menu
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		
		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMobileMenuOpen]);

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
		// If faculty section is selected, show faculty content
		if (activeSection === 'faculty') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Users className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Faculty</h1>
							<p className='text-gray-600 font-medium'>Meet our distinguished faculty members</p>
						</div>
					</motion.div>

					{/* Faculty Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{/* Dr. ACHAL KAUSHIK - HOD */}
						<AnimatedCard delay={0.1}>
							<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200'>
								<div className='text-center mb-4'>
									<div className='w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-3 p-1'>
										<img 
											src="/achal-sir.png" 
											alt="Dr. ACHAL KAUSHIK"
											className='w-full h-full rounded-full object-cover'
											onError={(e) => {
												e.currentTarget.style.display = 'none';
												e.currentTarget.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center' style={{display: 'none'}}>
											<User className='w-10 h-10 text-white' />
										</div>
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-1'>Dr. ACHAL KAUSHIK</h3>
									<p className='text-blue-600 font-semibold text-sm mb-1'>PROFESSOR & Dean Academics</p>
									<p className='text-purple-600 font-medium text-sm'>HOD CSE</p>
								</div>

								<div className='bg-white/70 rounded-lg p-4 space-y-3'>
									<div className='flex items-start'>
										<Clock className='w-4 h-4 text-blue-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Experience: </span>
											<span className='text-gray-600 text-sm'>20+ Years</span>
										</div>
									</div>

									<div className='flex items-start'>
										<GraduationCap className='w-4 h-4 text-green-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Qualification: </span>
											<span className='text-gray-600 text-sm'>Ph.D(CSE) JNU, M.Tech (CSE)</span>
										</div>
									</div>

									<div className='flex items-start'>
										<Lightbulb className='w-4 h-4 text-orange-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Research Interest: </span>
											<span className='text-gray-600 text-sm'>Grid Cloud Green Computing, Machine Learning, Neural Network</span>
										</div>
									</div>

									<div className='flex items-start'>
										<FileText className='w-4 h-4 text-purple-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Publications: </span>
											<span className='text-gray-600 text-sm'>13 Google Scholar</span>
										</div>
									</div>
								</div>
							</div>
						</AnimatedCard>

						{/* Additional Faculty Members */}
						<AnimatedCard delay={0.2}>
							<div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200'>
								<div className='text-center mb-4'>
									<div className='w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mx-auto mb-3 p-1'>
										<img 
											src="/faculty/faculty-2.jpg" 
											alt="Dr. Faculty Name"
											className='w-full h-full rounded-full object-cover'
											onError={(e) => {
												e.currentTarget.style.display = 'none';
												e.currentTarget.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center' style={{display: 'none'}}>
											<User className='w-10 h-10 text-white' />
										</div>
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-1'>Dr. [Faculty Name]</h3>
									<p className='text-green-600 font-semibold text-sm mb-1'>ASSOCIATE PROFESSOR</p>
									<p className='text-emerald-600 font-medium text-sm'>CSE Department</p>
								</div>

								<div className='bg-white/70 rounded-lg p-4 space-y-3'>
									<div className='flex items-start'>
										<Clock className='w-4 h-4 text-green-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Experience: </span>
											<span className='text-gray-600 text-sm'>15+ Years</span>
										</div>
									</div>

									<div className='flex items-start'>
										<GraduationCap className='w-4 h-4 text-green-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Qualification: </span>
											<span className='text-gray-600 text-sm'>Ph.D(CSE), M.Tech (CSE)</span>
										</div>
									</div>

									<div className='flex items-start'>
										<Lightbulb className='w-4 h-4 text-orange-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Research Interest: </span>
											<span className='text-gray-600 text-sm'>Data Science, AI/ML, Software Engineering</span>
										</div>
									</div>

									<div className='flex items-start'>
										<FileText className='w-4 h-4 text-purple-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Publications: </span>
											<span className='text-gray-600 text-sm'>20+ Publications</span>
										</div>
									</div>
								</div>
							</div>
						</AnimatedCard>

						<AnimatedCard delay={0.3}>
							<div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200'>
								<div className='text-center mb-4'>
									<div className='w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-3 p-1'>
										<img 
											src="/faculty/faculty-3.jpg" 
											alt="Dr. Faculty Name"
											className='w-full h-full rounded-full object-cover'
											onError={(e) => {
												e.currentTarget.style.display = 'none';
												e.currentTarget.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center' style={{display: 'none'}}>
											<User className='w-10 h-10 text-white' />
										</div>
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-1'>Dr. [Faculty Name]</h3>
									<p className='text-purple-600 font-semibold text-sm mb-1'>ASSISTANT PROFESSOR</p>
									<p className='text-pink-600 font-medium text-sm'>CSE Department</p>
								</div>

								<div className='bg-white/70 rounded-lg p-4 space-y-3'>
									<div className='flex items-start'>
										<Clock className='w-4 h-4 text-purple-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Experience: </span>
											<span className='text-gray-600 text-sm'>10+ Years</span>
										</div>
									</div>

									<div className='flex items-start'>
										<GraduationCap className='w-4 h-4 text-purple-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Qualification: </span>
											<span className='text-gray-600 text-sm'>Ph.D(CSE), M.Tech (CSE)</span>
										</div>
									</div>

									<div className='flex items-start'>
										<Lightbulb className='w-4 h-4 text-orange-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Research Interest: </span>
											<span className='text-gray-600 text-sm'>Computer Networks, Cybersecurity, IoT</span>
										</div>
									</div>

									<div className='flex items-start'>
										<FileText className='w-4 h-4 text-purple-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Publications: </span>
											<span className='text-gray-600 text-sm'>15+ Publications</span>
										</div>
									</div>
								</div>
							</div>
						</AnimatedCard>

						<AnimatedCard delay={0.4}>
							<div className='bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200'>
								<div className='text-center mb-4'>
									<div className='w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mx-auto mb-3 p-1'>
										<img 
											src="/faculty/faculty-4.jpg" 
											alt="Prof. Faculty Name"
											className='w-full h-full rounded-full object-cover'
											onError={(e) => {
												e.currentTarget.style.display = 'none';
												e.currentTarget.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center' style={{display: 'none'}}>
											<User className='w-10 h-10 text-white' />
										</div>
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-1'>Prof. [Faculty Name]</h3>
									<p className='text-orange-600 font-semibold text-sm mb-1'>PROFESSOR</p>
									<p className='text-red-600 font-medium text-sm'>CSE Department</p>
								</div>

								<div className='bg-white/70 rounded-lg p-4 space-y-3'>
									<div className='flex items-start'>
										<Clock className='w-4 h-4 text-orange-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Experience: </span>
											<span className='text-gray-600 text-sm'>25+ Years</span>
										</div>
									</div>

									<div className='flex items-start'>
										<GraduationCap className='w-4 h-4 text-orange-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Qualification: </span>
											<span className='text-gray-600 text-sm'>Ph.D(CSE), M.Tech (CSE)</span>
										</div>
									</div>

									<div className='flex items-start'>
										<Lightbulb className='w-4 h-4 text-orange-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Research Interest: </span>
											<span className='text-gray-600 text-sm'>Database Systems, Big Data Analytics, Cloud Computing</span>
										</div>
									</div>

									<div className='flex items-start'>
										<FileText className='w-4 h-4 text-purple-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Publications: </span>
											<span className='text-gray-600 text-sm'>30+ Publications</span>
										</div>
									</div>
								</div>
							</div>
						</AnimatedCard>

						<AnimatedCard delay={0.5}>
							<div className='bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200'>
								<div className='text-center mb-4'>
									<div className='w-20 h-20 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full mx-auto mb-3 p-1'>
										<img 
											src="/faculty/faculty-5.jpg" 
											alt="Dr. Faculty Name"
											className='w-full h-full rounded-full object-cover'
											onError={(e) => {
												e.currentTarget.style.display = 'none';
												e.currentTarget.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center' style={{display: 'none'}}>
											<User className='w-10 h-10 text-white' />
										</div>
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-1'>Dr. [Faculty Name]</h3>
									<p className='text-teal-600 font-semibold text-sm mb-1'>ASSOCIATE PROFESSOR</p>
									<p className='text-cyan-600 font-medium text-sm'>CSE Department</p>
								</div>

								<div className='bg-white/70 rounded-lg p-4 space-y-3'>
									<div className='flex items-start'>
										<Clock className='w-4 h-4 text-teal-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Experience: </span>
											<span className='text-gray-600 text-sm'>12+ Years</span>
										</div>
									</div>

									<div className='flex items-start'>
										<GraduationCap className='w-4 h-4 text-teal-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Qualification: </span>
											<span className='text-gray-600 text-sm'>Ph.D(CSE), M.Tech (CSE)</span>
										</div>
									</div>

									<div className='flex items-start'>
										<Lightbulb className='w-4 h-4 text-orange-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Research Interest: </span>
											<span className='text-gray-600 text-sm'>Image Processing, Computer Vision, Pattern Recognition</span>
										</div>
									</div>

									<div className='flex items-start'>
										<FileText className='w-4 h-4 text-purple-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Publications: </span>
											<span className='text-gray-600 text-sm'>18+ Publications</span>
										</div>
									</div>
								</div>
							</div>
						</AnimatedCard>

						<AnimatedCard delay={0.6}>
							<div className='bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200'>
								<div className='text-center mb-4'>
									<div className='w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full mx-auto mb-3 p-1'>
										<img 
											src="/faculty/faculty-6.jpg" 
											alt="Dr. Faculty Name"
											className='w-full h-full rounded-full object-cover'
											onError={(e) => {
												e.currentTarget.style.display = 'none';
												e.currentTarget.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center' style={{display: 'none'}}>
											<User className='w-10 h-10 text-white' />
										</div>
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-1'>Dr. [Faculty Name]</h3>
									<p className='text-indigo-600 font-semibold text-sm mb-1'>ASSISTANT PROFESSOR</p>
									<p className='text-blue-600 font-medium text-sm'>CSE Department</p>
								</div>

								<div className='bg-white/70 rounded-lg p-4 space-y-3'>
									<div className='flex items-start'>
										<Clock className='w-4 h-4 text-indigo-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Experience: </span>
											<span className='text-gray-600 text-sm'>8+ Years</span>
										</div>
									</div>

									<div className='flex items-start'>
										<GraduationCap className='w-4 h-4 text-indigo-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Qualification: </span>
											<span className='text-gray-600 text-sm'>Ph.D(CSE), M.Tech (CSE)</span>
										</div>
									</div>

									<div className='flex items-start'>
										<Lightbulb className='w-4 h-4 text-orange-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Research Interest: </span>
											<span className='text-gray-600 text-sm'>Algorithms, Data Structures, Competitive Programming</span>
										</div>
									</div>

									<div className='flex items-start'>
										<FileText className='w-4 h-4 text-purple-600 mr-2 mt-0.5' />
										<div>
											<span className='font-semibold text-gray-700 text-sm'>Publications: </span>
											<span className='text-gray-600 text-sm'>12+ Publications</span>
										</div>
									</div>
								</div>
							</div>
						</AnimatedCard>
					</div>
				</div>
			);
		}

		// If activity calendar subsection is selected
		if (activeSection === 'pedagogical-initiatives' && activeSubSection === 'activity-calendar') {
			return (
				<div className='space-y-8'>
					{/* Activity Calendar Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Clock className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Activity Calendar</h1>
							<p className='text-emerald-600 font-medium'>Comprehensive schedule of all academic and cultural activities</p>
						</div>
					</motion.div>

					{/* Academic Year Selector */}
					<div className='flex justify-center mb-8'>
						<div className='bg-white rounded-xl p-2 border border-gray-200 shadow-sm'>
							<div className='flex space-x-2'>
								<button className='bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-colors'>
									2023-24
								</button>
								<button className='text-gray-600 hover:text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors'>
									2022-23
								</button>
							</div>
						</div>
					</div>

					{/* Activity Calendar Content */}
					<div className='space-y-8'>
						{/* Odd Semester */}
						<AnimatedCard delay={0.1}>
							<div className='bg-white rounded-xl p-6 border border-gray-200'>
								<div className='flex items-center justify-between mb-6'>
									<div className='flex items-center'>
										<div className='w-3 h-3 bg-blue-500 rounded-full mr-3'></div>
										<h2 className='text-2xl font-bold text-gray-900'>Odd Semester (2023-24)</h2>
									</div>
									<div className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
										Aug 2023 - Jan 2024
									</div>
								</div>

								<div className='overflow-x-auto'>
									<table className='w-full'>
										<thead>
											<tr className='border-b border-gray-200'>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>S.No</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>Event</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>Start Date</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>End Date</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>Duration</th>
											</tr>
										</thead>
										<tbody className='divide-y divide-gray-100'>
											{[
												{
													sno: 1,
													event: "Semester Start (For third, fifth and seventh semester)",
													startDate: "28-08-2023",
													endDate: "8-12-2023",
													category: "academic"
												},
												{
													sno: 2,
													event: "Schedule of Societies Event, IIT Bombay Spoken Tutorial",
													startDate: "28-08-2023",
													endDate: "8-12-2023",
													category: "event"
												},
												{
													sno: 3,
													event: "First Year Counselling (Admission of first year)",
													startDate: "01-09-2023",
													endDate: "31-09-2023",
													category: "admission"
												},
												{
													sno: 4,
													event: "Induction Programme of first year",
													startDate: "1-10-2023",
													endDate: "15-10-2023",
													category: "orientation"
												},
												{
													sno: 5,
													event: "Sports Day (University event)",
													startDate: "19-10-2023",
													endDate: "21-10-2023",
													category: "sports"
												},
												{
													sno: 6,
													event: "Minor Project Defense -I (Fourth Year)",
													startDate: "5-11-2023",
													endDate: "10-11-2023",
													category: "academic"
												},
												{
													sno: 7,
													event: "Spot Counselling Round of first year",
													startDate: "1-10-2023",
													endDate: "15-10-2023",
													category: "admission"
												},
												{
													sno: 8,
													event: "Mid Sessional Exams",
													startDate: "30-10-2023",
													endDate: "5-11-2023",
													category: "exam"
												},
												{
													sno: 9,
													event: "Summer Training Viva",
													startDate: "5-11-2023",
													endDate: "7-11-2023",
													category: "academic"
												},
												{
													sno: 10,
													event: "Initiation of first year classes/ Lateral Entry classes",
													startDate: "1-10-2023",
													endDate: "8-12-2023",
													category: "academic"
												},
												{
													sno: 11,
													event: "Internal Practical Exams",
													startDate: "22-11-2023",
													endDate: "29-11-2023",
													category: "exam"
												},
												{
													sno: 12,
													event: "Cultural Event",
													startDate: "30-11-2023",
													endDate: "2-12-2023",
													category: "cultural"
												},
												{
													sno: 13,
													event: "Second Project Defense (Fourth Year)",
													startDate: "20-11-2023",
													endDate: "25-11-2023",
													category: "academic"
												},
												{
													sno: 14,
													event: "Preparatory Exams/Retest /Lateral Entry Minor Exam",
													startDate: "20-12-2023",
													endDate: "25-12-2023",
													category: "exam"
												},
												{
													sno: 15,
													event: "Preparatory Leaves for students",
													startDate: "25-12-2023",
													endDate: "30-12-2023",
													category: "break"
												},
												{
													sno: 16,
													event: "External Practical",
													startDate: "20-12-2023",
													endDate: "30-12-2023",
													category: "exam"
												},
												{
													sno: 17,
													event: "Faculty Recreational Outdoor Activity",
													startDate: "25-12-2023",
													endDate: "30-12-2023",
													category: "faculty"
												},
												{
													sno: 18,
													event: "Winter Break (Faculty)",
													startDate: "18-01-2024",
													endDate: "24-01-2024",
													category: "break"
												},
												{
													sno: 19,
													event: "University Examination",
													startDate: "30-12-2023",
													endDate: "17-01-2024",
													category: "exam"
												}
											].map((item, index) => {
												const getCategoryColor = (category) => {
													switch (category) {
														case 'academic': return 'bg-blue-100 text-blue-800';
														case 'exam': return 'bg-red-100 text-red-800';
														case 'cultural': return 'bg-purple-100 text-purple-800';
														case 'sports': return 'bg-green-100 text-green-800';
														case 'admission': return 'bg-yellow-100 text-yellow-800';
														case 'orientation': return 'bg-indigo-100 text-indigo-800';
														case 'break': return 'bg-gray-100 text-gray-800';
														case 'faculty': return 'bg-emerald-100 text-emerald-800';
														case 'event': return 'bg-orange-100 text-orange-800';
														default: return 'bg-gray-100 text-gray-800';
													}
												};

												const calculateDuration = (start, end) => {
													const startDate = new Date(start.split('-').reverse().join('-'));
													const endDate = new Date(end.split('-').reverse().join('-'));
													const diffTime = Math.abs(endDate - startDate);
													const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
													return `${diffDays} days`;
												};

												return (
													<tr key={index} className='hover:bg-gray-50 transition-colors'>
														<td className='py-3 px-4 text-sm font-medium text-gray-900'>{item.sno}</td>
														<td className='py-3 px-4'>
															<div className='flex items-center'>
																<span className='text-sm font-medium text-gray-900 mr-2'>{item.event}</span>
																<span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
																	{item.category}
																</span>
															</div>
														</td>
														<td className='py-3 px-4 text-sm text-gray-600'>{item.startDate}</td>
														<td className='py-3 px-4 text-sm text-gray-600'>{item.endDate}</td>
														<td className='py-3 px-4 text-sm text-gray-600'>{calculateDuration(item.startDate, item.endDate)}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</AnimatedCard>

						{/* Even Semester */}
						<AnimatedCard delay={0.2}>
							<div className='bg-white rounded-xl p-6 border border-gray-200'>
								<div className='flex items-center justify-between mb-6'>
									<div className='flex items-center'>
										<div className='w-3 h-3 bg-emerald-500 rounded-full mr-3'></div>
										<h2 className='text-2xl font-bold text-gray-900'>Even Semester (2023-24)</h2>
									</div>
									<div className='bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium'>
										Jan 2024 - Jul 2024
									</div>
								</div>

								<div className='overflow-x-auto'>
									<table className='w-full'>
										<thead>
											<tr className='border-b border-gray-200'>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>S.No</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>Event</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>Start Date</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>End Date</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50'>Duration</th>
											</tr>
										</thead>
										<tbody className='divide-y divide-gray-100'>
											{[
												{
													sno: 1,
													event: "Semester Start (For fourth, Sixth and Eight semesters)",
													startDate: "25-01-2024",
													endDate: "29-05-2024",
													category: "academic"
												},
												{
													sno: 2,
													event: "Schedule of Societies Event, IIT Bombay Spoken Tutorial",
													startDate: "25-01-2024",
													endDate: "29-05-2024",
													category: "event"
												},
												{
													sno: 3,
													event: "Anugoonj",
													startDate: "08-02-2024",
													endDate: "10-02-2024",
													category: "cultural"
												},
												{
													sno: 4,
													event: "First Major Project Defense (Fourth Year)",
													startDate: "01-03-2024",
													endDate: "01-03-2024",
													category: "academic"
												},
												{
													sno: 5,
													event: "Mid term Sessional Exams",
													startDate: "25-03-2024",
													endDate: "29-03-2024",
													category: "exam"
												},
												{
													sno: 6,
													event: "Mid Term Practical Exams",
													startDate: "01-04-2024",
													endDate: "05-04-2024",
													category: "exam"
												},
												{
													sno: 7,
													event: "Faculty Recreational Activity",
													startDate: "10-04-2024",
													endDate: "11-04-2024",
													category: "faculty"
												},
												{
													sno: 8,
													event: "Second Major Project Defense (Fourth Year)",
													startDate: "15-05-2024",
													endDate: "17-05-2024",
													category: "academic"
												},
												{
													sno: 9,
													event: "External Practical",
													startDate: "13-05-2024",
													endDate: "18-05-2024",
													category: "exam"
												},
												{
													sno: 10,
													event: "Preparatory Leaves for students",
													startDate: "30-05-2024",
													endDate: "05-06-2024",
													category: "break"
												},
												{
													sno: 11,
													event: "University Examination",
													startDate: "06-06-2024",
													endDate: "26-06-2024",
													category: "exam"
												},
												{
													sno: 12,
													event: "Summer Break (Faculty)",
													startDate: "27-06-2024",
													endDate: "31-07-2024",
													category: "break"
												}
											].map((item, index) => {
												const getCategoryColor = (category) => {
													switch (category) {
														case 'academic': return 'bg-blue-100 text-blue-800';
														case 'exam': return 'bg-red-100 text-red-800';
														case 'cultural': return 'bg-purple-100 text-purple-800';
														case 'sports': return 'bg-green-100 text-green-800';
														case 'admission': return 'bg-yellow-100 text-yellow-800';
														case 'orientation': return 'bg-indigo-100 text-indigo-800';
														case 'break': return 'bg-gray-100 text-gray-800';
														case 'faculty': return 'bg-emerald-100 text-emerald-800';
														case 'event': return 'bg-orange-100 text-orange-800';
														default: return 'bg-gray-100 text-gray-800';
													}
												};

												const calculateDuration = (start, end) => {
													const startDate = new Date(start.split('-').reverse().join('-'));
													const endDate = new Date(end.split('-').reverse().join('-'));
													const diffTime = Math.abs(endDate - startDate);
													const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
													return `${diffDays} days`;
												};

												return (
													<tr key={index} className='hover:bg-gray-50 transition-colors'>
														<td className='py-3 px-4 text-sm font-medium text-gray-900'>{item.sno}</td>
														<td className='py-3 px-4'>
															<div className='flex items-center'>
																<span className='text-sm font-medium text-gray-900 mr-2'>{item.event}</span>
																<span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
																	{item.category}
																</span>
															</div>
														</td>
														<td className='py-3 px-4 text-sm text-gray-600'>{item.startDate}</td>
														<td className='py-3 px-4 text-sm text-gray-600'>{item.endDate}</td>
														<td className='py-3 px-4 text-sm text-gray-600'>{calculateDuration(item.startDate, item.endDate)}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</AnimatedCard>

						{/* Activity Categories Legend */}
						<AnimatedCard delay={0.3}>
							<div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200'>
								<h3 className='text-lg font-bold text-gray-900 mb-4'>Activity Categories</h3>
								<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3'>
									{[
										{ name: 'Academic', color: 'bg-blue-100 text-blue-800' },
										{ name: 'Examinations', color: 'bg-red-100 text-red-800' },
										{ name: 'Cultural', color: 'bg-purple-100 text-purple-800' },
										{ name: 'Sports', color: 'bg-green-100 text-green-800' },
										{ name: 'Admission', color: 'bg-yellow-100 text-yellow-800' },
										{ name: 'Orientation', color: 'bg-indigo-100 text-indigo-800' },
										{ name: 'Break', color: 'bg-gray-100 text-gray-800' },
										{ name: 'Faculty', color: 'bg-emerald-100 text-emerald-800' },
										{ name: 'Events', color: 'bg-orange-100 text-orange-800' }
									].map((category, index) => (
										<div key={index} className='flex items-center'>
											<span className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
												{category.name}
											</span>
										</div>
									))}
								</div>
							</div>
						</AnimatedCard>
					</div>
				</div>
			);
		}

		// If academic calendar subsection is selected
		if (activeSection === 'pedagogical-initiatives' && activeSubSection === 'academic-calendar') {
			return (
				<div className='space-y-8'>
					{/* Academic Calendar Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Calendar className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Academic Calendar</h1>
							<p className='text-indigo-600 font-medium'>Stay updated with important academic dates and events</p>
						</div>
					</motion.div>

					{/* Current Semester Overview */}
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						<AnimatedCard delay={0.1}>
							<div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200'>
								<div className='text-center'>
									<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
										<BookOpen className='w-6 h-6 text-white' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-2'>Current Semester</h3>
									<p className='text-blue-600 font-semibold text-lg'>Odd Semester 2024-25</p>
									<p className='text-gray-600 text-sm mt-1'>Aug 2024 - Dec 2024</p>
								</div>
							</div>
						</AnimatedCard>

						<AnimatedCard delay={0.2}>
							<div className='bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200'>
								<div className='text-center'>
									<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
										<Clock className='w-6 h-6 text-white' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-2'>Days Remaining</h3>
									<p className='text-green-600 font-semibold text-lg'>45 Days</p>
									<p className='text-gray-600 text-sm mt-1'>Until End Term Exams</p>
								</div>
							</div>
						</AnimatedCard>

						<AnimatedCard delay={0.3}>
							<div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200'>
								<div className='text-center'>
									<div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
										<Target className='w-6 h-6 text-white' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-2'>Next Milestone</h3>
									<p className='text-purple-600 font-semibold text-lg'>Mid-Term Results</p>
									<p className='text-gray-600 text-sm mt-1'>Dec 15, 2024</p>
								</div>
							</div>
						</AnimatedCard>
					</div>

					{/* Academic Calendar Timeline */}
					<AnimatedCard delay={0.4}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-6'>
								<Calendar className='w-6 h-6 text-indigo-600 mr-3' />
								<h2 className='text-2xl font-bold text-gray-900'>Academic Timeline 2024-25</h2>
							</div>

							<div className='space-y-6'>
								{/* Semester 1 */}
								<div className='relative'>
									<div className='flex items-start'>
										<div className='flex-shrink-0 w-4 h-4 bg-indigo-600 rounded-full mt-1.5 border-2 border-white shadow-lg'></div>
										<div className='ml-6 pb-8'>
											<div className='flex items-center justify-between mb-2'>
												<h3 className='text-lg font-semibold text-gray-900'>Odd Semester 2024-25</h3>
												<span className='bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Current</span>
											</div>
											<p className='text-gray-600 text-sm mb-3'>August 2024 - December 2024</p>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div className='bg-gray-50 rounded-lg p-4'>
													<h4 className='font-medium text-gray-900 mb-2'>Key Dates</h4>
													<ul className='text-sm text-gray-600 space-y-1'>
														<li>• Classes Begin: Aug 5, 2024</li>
														<li>• Mid-Term Exams: Oct 15-25, 2024</li>
														<li>• End-Term Exams: Dec 10-20, 2024</li>
														<li>• Result Declaration: Dec 30, 2024</li>
													</ul>
												</div>
												<div className='bg-gray-50 rounded-lg p-4'>
													<h4 className='font-medium text-gray-900 mb-2'>Important Events</h4>
													<ul className='text-sm text-gray-600 space-y-1'>
														<li>• Freshers' Orientation: Aug 10, 2024</li>
														<li>• Tech Symposium: Oct 5, 2024</li>
														<li>• Project Presentations: Nov 20, 2024</li>
														<li>• Winter Break: Dec 21, 2024</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className='absolute left-2 top-8 w-0.5 h-full bg-gray-300'></div>
								</div>

								{/* Semester 2 */}
								<div className='relative'>
									<div className='flex items-start'>
										<div className='flex-shrink-0 w-4 h-4 bg-gray-400 rounded-full mt-1.5 border-2 border-white shadow-lg'></div>
										<div className='ml-6 pb-8'>
											<div className='flex items-center justify-between mb-2'>
												<h3 className='text-lg font-semibold text-gray-900'>Even Semester 2024-25</h3>
												<span className='bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Upcoming</span>
											</div>
											<p className='text-gray-600 text-sm mb-3'>January 2025 - May 2025</p>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div className='bg-gray-50 rounded-lg p-4'>
													<h4 className='font-medium text-gray-900 mb-2'>Key Dates</h4>
													<ul className='text-sm text-gray-600 space-y-1'>
														<li>• Classes Begin: Jan 8, 2025</li>
														<li>• Mid-Term Exams: Mar 15-25, 2025</li>
														<li>• End-Term Exams: May 10-20, 2025</li>
														<li>• Result Declaration: May 30, 2025</li>
													</ul>
												</div>
												<div className='bg-gray-50 rounded-lg p-4'>
													<h4 className='font-medium text-gray-900 mb-2'>Important Events</h4>
													<ul className='text-sm text-gray-600 space-y-1'>
														<li>• Industry Visits: Feb 15, 2025</li>
														<li>• Annual Fest: Mar 10, 2025</li>
														<li>• Internship Fair: Apr 5, 2025</li>
														<li>• Convocation: Jun 15, 2025</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className='absolute left-2 top-8 w-0.5 h-full bg-gray-300'></div>
								</div>

								{/* Summer Term */}
								<div className='relative'>
									<div className='flex items-start'>
										<div className='flex-shrink-0 w-4 h-4 bg-orange-400 rounded-full mt-1.5 border-2 border-white shadow-lg'></div>
										<div className='ml-6'>
											<div className='flex items-center justify-between mb-2'>
												<h3 className='text-lg font-semibold text-gray-900'>Summer Term 2025</h3>
												<span className='bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>Optional</span>
											</div>
											<p className='text-gray-600 text-sm mb-3'>June 2025 - July 2025</p>
											<div className='bg-gray-50 rounded-lg p-4'>
												<h4 className='font-medium text-gray-900 mb-2'>Summer Activities</h4>
												<ul className='text-sm text-gray-600 space-y-1'>
													<li>• Internship Programs: Jun 1 - Jul 31, 2025</li>
													<li>• Summer Courses: Jun 15 - Jul 15, 2025</li>
													<li>• Research Projects: Jun 1 - Jul 31, 2025</li>
													<li>• Industry Training: Jun 10 - Jul 20, 2025</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Quick Actions */}
					<AnimatedCard delay={0.5}>
						<div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200'>
							<h2 className='text-xl font-bold text-gray-900 mb-4'>Quick Actions</h2>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<a 
									href="/academic-calendar-2024-25.pdf" 
									download="BPIT_CSE_Academic_Calendar_2024-25.pdf"
									className='bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 text-left transition-all group cursor-pointer block'
								>
									<div className='flex items-center mb-2'>
										<FileText className='w-5 h-5 text-blue-600 mr-2 group-hover:scale-110 transition-transform' />
										<span className='font-medium text-gray-900 group-hover:text-blue-700'>Download Calendar</span>
									</div>
									<p className='text-sm text-gray-600 group-hover:text-blue-600'>Get the complete academic calendar PDF</p>
								</a>
								<button className='bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-4 text-left transition-all group'>
									<div className='flex items-center mb-2'>
										<Bell className='w-5 h-5 text-green-600 mr-2 group-hover:scale-110 transition-transform' />
										<span className='font-medium text-gray-900 group-hover:text-green-700'>Set Reminders</span>
									</div>
									<p className='text-sm text-gray-600 group-hover:text-green-600'>Get notified about important dates</p>
								</button>
								<button className='bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg p-4 text-left transition-all group'>
									<div className='flex items-center mb-2'>
										<Calendar className='w-5 h-5 text-purple-600 mr-2 group-hover:scale-110 transition-transform' />
										<span className='font-medium text-gray-900 group-hover:text-purple-700'>View Events</span>
									</div>
									<p className='text-sm text-gray-600 group-hover:text-purple-600'>See all upcoming academic events</p>
								</button>
							</div>
						</div>
					</AnimatedCard>

					{/* PDF Download Section */}
					<AnimatedCard delay={0.6}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center justify-between mb-4'>
								<h2 className='text-xl font-bold text-gray-900'>Academic Calendar Documents</h2>
								<div className='flex items-center space-x-2'>
									<div className='w-2 h-2 bg-green-500 rounded-full'></div>
									<span className='text-sm text-green-600 font-medium'>Updated</span>
								</div>
							</div>
							
							<div className='space-y-4'>
								<div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'>
									<div className='flex items-center'>
										<div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4'>
											<FileText className='w-6 h-6 text-red-600' />
										</div>
										<div>
											<h3 className='font-medium text-gray-900'>Academic Calendar 2024-25</h3>
											<p className='text-sm text-gray-600'>Complete academic schedule with all important dates</p>
											<div className='flex items-center mt-1 text-xs text-gray-500'>
												<span>PDF • 2.1 MB • Updated: Dec 10, 2024</span>
											</div>
										</div>
									</div>
									<a 
										href="/academic-calendar-2024-25.pdf" 
										download="BPIT_CSE_Academic_Calendar_2024-25.pdf"
										className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2'
									>
										<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
										</svg>
										<span>Download</span>
									</a>
								</div>

								<div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'>
									<div className='flex items-center'>
										<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4'>
											<Calendar className='w-6 h-6 text-green-600' />
										</div>
										<div>
											<h3 className='font-medium text-gray-900'>Exam Schedule 2024-25</h3>
											<p className='text-sm text-gray-600'>Detailed examination timetable for all semesters</p>
											<div className='flex items-center mt-1 text-xs text-gray-500'>
												<span>PDF • 1.8 MB • Updated: Dec 5, 2024</span>
											</div>
										</div>
									</div>
									<a 
										href="/exam-schedule-2024-25.pdf" 
										download="BPIT_CSE_Exam_Schedule_2024-25.pdf"
										className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2'
									>
										<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
										</svg>
										<span>Download</span>
									</a>
								</div>

								<div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'>
									<div className='flex items-center'>
										<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4'>
											<BookOpen className='w-6 h-6 text-purple-600' />
										</div>
										<div>
											<h3 className='font-medium text-gray-900'>Holiday List 2024-25</h3>
											<p className='text-sm text-gray-600'>Official holidays and festival dates</p>
											<div className='flex items-center mt-1 text-xs text-gray-500'>
												<span>PDF • 0.5 MB • Updated: Aug 15, 2024</span>
											</div>
										</div>
									</div>
									<a 
										href="/holiday-list-2024-25.pdf" 
										download="BPIT_Holiday_List_2024-25.pdf"
										className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2'
									>
										<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
										</svg>
										<span>Download</span>
									</a>
								</div>
							</div>

							<div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
								<div className='flex items-start'>
									<div className='w-5 h-5 text-blue-600 mt-0.5 mr-3'>
										<svg fill='currentColor' viewBox='0 0 20 20'>
											<path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
										</svg>
									</div>
									<div>
										<h4 className='font-medium text-blue-900 mb-1'>Important Note</h4>
										<p className='text-sm text-blue-800'>
											Please regularly check for updates to the academic calendar. Any changes will be communicated through official college channels and updated documents will be available for download.
										</p>
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// If home section is selected and no subsection, show home content
		if (activeSection === 'home' && !activeSubSection) {
			return (
				<div className='space-y-6'>
					{/* Hero Section with Animated Background */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 rounded-xl p-8 text-white'>
						{/* Animated Background Elements */}
						<div className='absolute inset-0'>
							<div className='absolute top-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse'></div>
							<div className='absolute bottom-10 left-10 w-28 h-28 bg-purple-400/20 rounded-full blur-lg animate-pulse delay-1000'></div>
							<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl animate-pulse delay-500'></div>
						</div>
						
						<div className='relative z-10'>
							<div className='flex items-center justify-center mb-6'>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.3, type: 'spring' }}
									className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4'>
									<Code className='w-8 h-8 text-white' />
								</motion.div>
								<div className='text-center'>
									<h1 className='text-2xl lg:text-3xl font-bold mb-2'>
										Computer Science & Engineering
									</h1>
									<p className='text-lg text-blue-200'>
										Shaping the Future of Technology
									</p>
								</div>
							</div>
										{/* Quick Stats with Enhanced Design */}
						<div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8'>
								{[
									{ label: 'Students', value: '800+', icon: <Users className='w-5 h-5' />, color: 'from-blue-400 to-blue-600' },
									{ label: 'Faculty', value: '30+', icon: <UserCheck className='w-5 h-5' />, color: 'from-green-400 to-green-600' },
									{ label: 'Labs', value: '15+', icon: <Monitor className='w-5 h-5' />, color: 'from-purple-400 to-purple-600' },
									{ label: 'Placements', value: '95%', icon: <TrendingUp className='w-5 h-5' />, color: 'from-orange-400 to-orange-600' }
								].map((stat, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.5 + index * 0.1 }}
										className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300'>
										<div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
											{stat.icon}
										</div>
										<div className='text-2xl font-bold mb-1'>{stat.value}</div>
										<div className='text-blue-200 text-sm'>{stat.label}</div>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* About Department with Rich Content */}
					<AnimatedCard delay={0.1}>
						<div className='bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
									<BookOpen className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>About Department</h2>
							</div>
							<div className='prose max-w-none text-gray-700 leading-relaxed'>
								<p className='text-base mb-4'>
									The Department of Computer Science & Engineering is committed towards excellence 
									in education and research in the field of Computer Science and Engineering. The 
									department offers a 4-year undergraduate program in Computer Science and Engineering 
									leading to the degree of Bachelor of Technology.
								</p>
								<p className='text-base mb-4'>
									The Department has well-equipped laboratories, including Programming Language Lab, 
									Data Structure Lab, Database Lab, Computer Networks Lab, Software Engineering Lab, 
									and many more. The department also has a dedicated Research & Development center 
									that focuses on cutting-edge research in various domains of computer science.
								</p>
								<p className='text-base'>
									Our faculty members are highly qualified and experienced in their respective fields. 
									They are actively involved in research and have published numerous papers in 
									international journals and conferences. The department also regularly organizes 
									workshops, seminars, and industrial visits to keep students updated with the 
									latest technological trends.
								</p>
							</div>
						</div>
					</AnimatedCard>

					{/* Message from HOD with Photo */}
					<AnimatedCard delay={0.2}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-3'>
									<User className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Message from HOD</h2>
							</div>
							<div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200'>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center'>
									<div className='lg:col-span-1'>
										<div className='relative'>
											<div className='w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-xl mx-auto mb-4 flex items-center justify-center'>
												<User className='w-16 h-16 text-purple-600' />
											</div>
											<div className='text-center'>
												<h3 className='text-lg font-bold text-gray-900'>Dr. [HOD Name]</h3>
												<p className='text-purple-600 font-medium text-sm'>Head of Department</p>
												<p className='text-gray-600 text-sm'>Ph.D. Computer Science</p>
											</div>
										</div>
									</div>
									<div className='lg:col-span-3'>
										<div className='bg-white/70 backdrop-blur-sm rounded-xl p-4'>
											<p className='text-gray-700 italic mb-3 text-sm'>
												"Welcome to the Department of Computer Science & Engineering. Our department 
												is committed to providing quality education and fostering innovation in the 
												field of computer science and engineering."
											</p>
											<p className='text-gray-700 italic mb-3 text-sm'>
												"We strive to create an environment where students can develop their 
												technical skills, critical thinking abilities, and professional competencies 
												to become successful engineers and leaders in the technology industry."
											</p>
											<p className='text-gray-700 italic text-sm'>
												"I invite you to explore our programs, research opportunities, and the 
												vibrant academic community that makes our department a great place to learn and grow."
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Events and News Section */}
					<AnimatedCard delay={0.25}>
						<div className='bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
							<div className='flex items-center justify-center mb-6'>
								<div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
									<Newspaper className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Events & News</h2>
							</div>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
								{/* Upcoming Events Column */}
								<div className='space-y-4'>
									<div className='flex items-center mb-3'>
										<Calendar className='w-5 h-5 text-indigo-600 mr-2' />
										<h3 className='text-lg font-bold text-gray-900'>Upcoming Events</h3>
									</div>
									<div className='relative h-[400px] overflow-hidden rounded-lg'>
										<motion.div
											className='space-y-3'
											animate={{ y: ['0%', '-100%'] }}
											transition={{
												duration: 40,
												repeat: Infinity,
												ease: "linear"
											}}
											style={{ willChange: 'transform' }}>
											{/* Duplicate events for seamless loop */}
											{[...Array(4)].map((_, loopIndex) => (
												<div key={loopIndex}>
													{[
														{
															title: 'Annual Tech Symposium 2025',
															date: 'March 15-16, 2025',
															type: 'Technical Event',
															description: 'Two-day technical symposium featuring latest trends in AI, ML, and emerging technologies.',
															status: 'upcoming',
															participants: '500+ Expected',
															bgColor: 'from-blue-100 to-blue-50',
															iconColor: 'text-blue-600'
														},
														{
															title: 'Industry Expert Lecture Series',
															date: 'February 28, 2025',
															type: 'Guest Lecture',
															description: 'Distinguished industry professionals sharing insights on current market trends.',
															status: 'upcoming',
															participants: '200+ Students',
															bgColor: 'from-green-100 to-green-50',
															iconColor: 'text-green-600'
														},
														{
															title: 'Coding Competition - CodeFest',
															date: 'March 5, 2025',
															type: 'Competition',
															description: 'Inter-college coding competition with exciting prizes and internship opportunities.',
															status: 'registration-open',
															participants: '300+ Participants',
															bgColor: 'from-purple-100 to-purple-50',
															iconColor: 'text-purple-600'
														},
														{
															title: 'Workshop on Machine Learning',
															date: 'February 20, 2025',
															type: 'Workshop',
															description: 'Hands-on workshop covering advanced machine learning techniques and applications.',
															status: 'upcoming',
															participants: '150+ Students',
															bgColor: 'from-orange-100 to-orange-50',
															iconColor: 'text-orange-600'
														},
														{
															title: 'Hackathon 2025',
															date: 'March 25-26, 2025',
															type: 'Competition',
															description: '48-hour hackathon challenging students to develop innovative solutions to real-world problems.',
															status: 'upcoming',
															participants: '400+ Participants',
															bgColor: 'from-pink-100 to-pink-50',
															iconColor: 'text-pink-600'
														},
														{
															title: 'Alumni Meet & Greet',
															date: 'April 10, 2025',
															type: 'Networking',
															description: 'Connect with successful alumni working in top tech companies and startups.',
															status: 'upcoming',
															participants: '250+ Alumni',
															bgColor: 'from-cyan-100 to-cyan-50',
															iconColor: 'text-cyan-600'
														}
													].map((event, index) => (
														<motion.div
															key={`${loopIndex}-${index}`}
															className={`bg-gradient-to-r ${event.bgColor} rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
															<div className='flex items-start justify-between mb-2'>
																<div className='flex items-center'>
																	<div className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 ${event.iconColor}`}>
																		<Calendar className='w-4 h-4' />
																	</div>
																	<div>
																		<h4 className='font-bold text-gray-900 group-hover:text-gray-800 transition-colors text-sm'>
																			{event.title}
																		</h4>
																		<p className='text-xs text-gray-600'>{event.date}</p>
																	</div>
																</div>
															</div>
															<p className='text-gray-700 text-sm mb-3 leading-relaxed'>
																{event.description}
															</p>
															<div className='flex items-center justify-between'>
																<div className='flex items-center text-sm text-gray-600'>
																	<Users className='w-4 h-4 mr-1' />
																	{event.participants}
																</div>
															</div>
														</motion.div>
													))}
												</div>
											))}
										</motion.div>
									</div>
								</div>

								{/* Latest News Column */}
								<div className='space-y-4'>
									<div className='flex items-center mb-3'>
										<Newspaper className='w-5 h-5 text-blue-600 mr-2' />
										<h3 className='text-lg font-bold text-gray-900'>Latest News</h3>
									</div>
									<div className='relative h-[400px] overflow-hidden rounded-lg'>
										<motion.div
											className='space-y-3'
											animate={{ y: ['0%', '-100%'] }}
											transition={{
												duration: 40,
												repeat: Infinity,
												ease: "linear"
											}}
											style={{ willChange: 'transform' }}>
											{/* Duplicate news for seamless loop */}
											{[...Array(4)].map((_, loopIndex) => (
												<div key={loopIndex}>
													{[
														{
															title: 'CSE Department Achieves NBA Accreditation',
															date: 'January 20, 2025',
															category: 'Achievement',
															description: 'Our department has been granted NBA accreditation for the next 5 years, recognizing our commitment to quality education.',
															priority: 'high',
															bgColor: 'from-yellow-100 to-yellow-50',
															iconColor: 'text-yellow-600'
														},
														{
															title: 'New Research Lab Inaugurated',
															date: 'January 15, 2025',
															category: 'Infrastructure',
															description: 'State-of-the-art AI & ML research laboratory inaugurated with latest equipment and software.',
															priority: 'medium',
															bgColor: 'from-indigo-100 to-indigo-50',
															iconColor: 'text-indigo-600'
														},
														{
															title: 'Outstanding Placement Results 2024',
															date: 'January 10, 2025',
															category: 'Placements',
															description: '95% placement rate achieved with top companies like Google, Microsoft, and Amazon recruiting our students.',
															priority: 'high',
															bgColor: 'from-emerald-100 to-emerald-50',
															iconColor: 'text-emerald-600'
														},
														{
															title: 'Faculty Research Paper Published',
															date: 'January 5, 2025',
															category: 'Research',
															description: 'Dr. [Faculty Name] published research paper on "Advanced Machine Learning Algorithms" in IEEE journal.',
															priority: 'medium',
															bgColor: 'from-rose-100 to-rose-50',
															iconColor: 'text-rose-600'
														},
														{
															title: 'Student Wins National Coding Competition',
															date: 'December 28, 2024',
															category: 'Achievement',
															description: 'CSE student secures first place in national level coding competition organized by IIT Delhi.',
															priority: 'high',
															bgColor: 'from-cyan-100 to-cyan-50',
															iconColor: 'text-cyan-600'
														},
														{
															title: 'New Partnership with Tech Giants',
															date: 'December 20, 2024',
															category: 'Partnership',
															description: 'Department establishes collaboration with leading technology companies for internships and placements.',
															priority: 'medium',
															bgColor: 'from-purple-100 to-purple-50',
															iconColor: 'text-purple-600'
														}
													].map((news, index) => (
														<motion.div
															key={`${loopIndex}-${index}`}
															className={`bg-gradient-to-r ${news.bgColor} rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
															<div className='flex items-start justify-between mb-2'>
																<div className='flex items-center'>
																	<div className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 ${news.iconColor}`}>
																		<Newspaper className='w-4 h-4' />
																	</div>
																	<div>
																		<h4 className='font-bold text-gray-900 group-hover:text-gray-800 transition-colors text-sm'>
																			{news.title}
																		</h4>
																		<p className='text-xs text-gray-600'>{news.date}</p>
																	</div>
																</div>
																<div className='flex items-center space-x-2'>
																	{news.priority === 'high' && (
																		<div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
																	)}
																</div>
															</div>
															<p className='text-gray-700 text-sm leading-relaxed'>
																{news.description}
															</p>
														</motion.div>
													))}
												</div>
											))}
										</motion.div>
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Department Highlights Carousel */}
					<AnimatedCard delay={0.3}>
						<div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200'>
							<div className='flex items-center justify-center mb-6'>
								<div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-3'>
									<Trophy className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Department Highlights</h2>
							</div>

							<DepartmentHighlightsCarousel />
						</div>
					</AnimatedCard>

					{/* Our Shining Stars Section */}
					<AnimatedCard delay={0.35}>
						<div className='bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200'>
							<div className='flex items-center justify-center mb-6'>
								<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
									<Star className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Our Shining Stars</h2>
							</div>

							<ShiningStarsSection />
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// For subsections, get the current key
		const currentKey = activeSection === 'home' ? activeSubSection : activeSection;

		// Add basic content for different sections
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
							{currentKey.charAt(0).toUpperCase() + currentKey.slice(1).replace('-', ' ')}
						</h1>
						<p className='text-gray-600 font-medium'>
							Content coming soon...
						</p>
					</div>
				</motion.div>

				<AnimatedCard>
					<div className='text-center py-12'>
						<div className='w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
							<Zap className='w-12 h-12 text-blue-600' />
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
	};

	return (
		<div className='min-h-screen bg-gray-50 overflow-x-hidden'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
					<div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
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
							<Code className='w-10 h-10 text-white' />
						</motion.div>

						<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
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
			<div className='container mx-auto px-4 py-12 max-w-full'>
				{/* Sticky Mobile Menu Button */}
				<div className='lg:hidden fixed top-30 left-4 z-50 bottom-160'>
					<button
						onClick={toggleMobileMenu}
						className={`bg-white rounded-full shadow-lg border border-gray-200 p-3 hover:shadow-xl transition-all duration-300 ${
							isMobileMenuOpen ? 'bg-blue-600 text-white' : 'text-gray-900'
						}`}>
						{isMobileMenuOpen ? (
							<X className='w-6 h-6' />
						) : (
							<Menu className='w-6 h-6' />
						)}
					</button>
				</div>

				{/* Mobile Navigation Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<>
							{/* Backdrop */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								className='lg:hidden fixed inset-0 bg-black/50 z-40'
								onClick={toggleMobileMenu}
							/>
							
							{/* Mobile Menu */}
							<motion.div
								initial={{ opacity: 0, x: '-100%' }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: '-100%' }}
								transition={{ duration: 0.3 }}
								className='lg:hidden fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white shadow-xl z-50 overflow-hidden'>
								<div className='bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between'>
									<h3 className='text-white font-bold text-lg'>Navigation</h3>
									<button
										onClick={toggleMobileMenu}
										className='text-white hover:bg-white/10 rounded-lg p-2 transition-colors'>
										<X className='w-5 h-5' />
									</button>
								</div>

								<div className='p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100' style={{ paddingBottom: '80px' }}>
									{navigationSections.map((section, index) => (
										<div key={section.id} className='mb-2'>
											<div className='flex items-center'>
												{/* Main section button */}
												<motion.button
													onClick={() => handleSectionClick(section.id)}
													className={`flex-1 text-left p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
														activeSection === section.id && !activeSubSection
															? 'bg-blue-50 text-blue-700 shadow-md border border-blue-200'
															: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
													}`}
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.3, delay: index * 0.05 }}>
													<div className='flex items-center gap-3 relative z-10'>
														<div
															className={`p-2 rounded-lg transition-colors ${
																activeSection === section.id && !activeSubSection
																	? 'bg-blue-100 text-blue-600'
																	: 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
															}`}>
															{section.icon}
														</div>
														<span className='font-medium text-sm'>
															{section.title}
														</span>
														{!section.subSections && (
															<ChevronRight
																className={`w-4 h-4 ml-auto transition-transform ${
																	activeSection === section.id && !activeSubSection
																		? 'rotate-90 text-blue-600'
																		: 'text-gray-400'
																}`}
															/>
														)}
													</div>
												</motion.button>

												{/* Dropdown button for sections with subsections */}
												{section.subSections && (
													<motion.button
														onClick={() => toggleSection(section.id)}
														className={`p-3 rounded-xl transition-all duration-300 ml-2 ${
															expandedSections.includes(section.id)
																? 'bg-blue-50 text-blue-700'
																: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
														}`}
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}>
														<ChevronDown
															className={`w-4 h-4 transition-transform ${
																expandedSections.includes(section.id)
																	? 'rotate-180'
																	: ''
															} ${
																expandedSections.includes(section.id)
																	? 'text-blue-600'
																	: 'text-gray-400'
															}`}
														/>
													</motion.button>
												)}
											</div>

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
																	initial={{ opacity: 0, x: -10 }}
																	animate={{ opacity: 1, x: 0 }}
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
							</motion.div>
						</>
					)}
				</AnimatePresence>

				<div className='flex flex-col lg:flex-row gap-8 w-full'>
					{/* Desktop Sidebar Navigation */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className='hidden lg:block lg:w-80 flex-shrink-0 w-full'>
						<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8 z-30 max-h-[calc(100vh-4rem)]'>
							<div className='bg-gradient-to-r from-blue-600 to-purple-600 p-4'>
								<h3 className='text-white font-bold text-lg'>Navigation</h3>
							</div>

							<div className='p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100' style={{ maxHeight: 'calc(100vh - 8rem)' }}>
								{navigationSections.map((section, index) => (
									<div key={section.id} className='mb-2'>
										<div className='flex items-center'>
											{/* Main section button */}
											<motion.button
												onClick={() => handleSectionClick(section.id)}
												className={`flex-1 text-left p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
													activeSection === section.id && !activeSubSection
														? 'bg-blue-50 text-blue-700 shadow-md border border-blue-200'
														: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
												}`}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.3, delay: index * 0.05 }}>
												<div className='flex items-center gap-3 relative z-10'>
													<div
														className={`p-2 rounded-lg transition-colors ${
															activeSection === section.id && !activeSubSection
																? 'bg-blue-100 text-blue-600'
																: 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
														}`}>
														{section.icon}
													</div>
													<span className='font-medium text-sm'>
														{section.title}
													</span>
													{!section.subSections && (
														<ChevronRight
															className={`w-4 h-4 ml-auto transition-transform ${
																activeSection === section.id && !activeSubSection
																	? 'rotate-90 text-blue-600'
																	: 'text-gray-400'
															}`}
														/>
													)}
												</div>
											</motion.button>

											{/* Dropdown button for sections with subsections */}
											{section.subSections && (
												<motion.button
													onClick={() => toggleSection(section.id)}
													className={`p-3 rounded-xl transition-all duration-300 ml-2 ${
														expandedSections.includes(section.id)
															? 'bg-blue-50 text-blue-700'
															: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
													}`}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}>
													<ChevronDown
														className={`w-4 h-4 transition-transform ${
															expandedSections.includes(section.id)
																? 'rotate-180'
																: ''
														} ${
															expandedSections.includes(section.id)
																? 'text-blue-600'
																: 'text-gray-400'
														}`}
													/>
												</motion.button>
											)}
										</div>

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
																initial={{ opacity: 0, x: -10 }}
																animate={{ opacity: 1, x: 0 }}
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
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className='flex-1 w-full overflow-x-hidden'>
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