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
	Bell,
	Database,
	Network,
	Globe,
	TreePine,
	BarChart3,
	Computer,
	Package
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
	const duplicatedHighlights = [...highlights, ...highlights];    const renderHighlightCard = (highlight: any, index: number) => (
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

// R&D Lab Glimpses Carousel Component
const RDLabGlimpsesCarousel = () => {
	const glimpses = [
		{
			id: 1,
			image: '/events/CSE-RD-Labs4.png',
			alt: 'R&D Laboratory'
		},
		{
			id: 2,
			image: '/events/foss-website1.png',
			alt: 'FOSS Lab'
		},
		{
			id: 3,
			image: '/events/CSE-RD-Labs7.png',
			alt: 'Research Activities'
		}
	];

	// Create multiple duplicates for smooth infinite scrolling
	const duplicatedGlimpses = [...glimpses, ...glimpses, ...glimpses];

	return (
		<div className='relative w-full h-64 overflow-hidden rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50'>
			{/* Infinite Scrolling Container */}
			<div className='overflow-hidden'>
				<motion.div
					className='flex gap-6'
					animate={{ 
						x: '-100%'
					}}
					transition={{
						x: {
							repeat: Infinity,
							repeatType: 'loop',
							duration: 30, // Slow speed - 30 seconds for full cycle
							ease: 'linear'
						}
					}}
					style={{ 
						width: `${duplicatedGlimpses.length * 320}px`,
						willChange: 'transform'
					}}
				>
					{duplicatedGlimpses.map((glimpse, index) => (
						<div
							key={`glimpse-${index}`}
							className='flex-shrink-0 w-80 h-64 rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300'
						>
							<img 
								src={glimpse.image} 
								alt={glimpse.alt}
								className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.style.display = 'none';
									const fallback = target.nextElementSibling as HTMLDivElement;
									if (fallback) fallback.style.display = 'flex';
								}}
							/>
							
							{/* Fallback for missing images */}
							<div className='w-full h-full hidden items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100'>
								<div className='text-center'>
									<Camera className='w-12 h-12 text-purple-400 mx-auto mb-3' />
									<p className='text-purple-600 font-medium text-sm'>{glimpse.alt}</p>
								</div>
							</div>
						</div>
					))}
				</motion.div>
			</div>
			
			{/* Gradient Overlays for smooth edge effect */}
			<div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-purple-50 to-transparent pointer-events-none z-10'></div>
			<div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-purple-50 to-transparent pointer-events-none z-10'></div>
		</div>
	);
};

const CSEDepartmentPage = () => {
	const [activeSection, setActiveSection] = useState('home');
	const [activeSubSection, setActiveSubSection] = useState('');
	const [expandedSections, setExpandedSections] = useState<string[]>([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [selectedYear, setSelectedYear] = useState('2023-24');

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
									<div className='w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-3 p-1'>                                        <img 
                                            src="/achal-sir.png" 
                                            alt="Dr. ACHAL KAUSHIK"
                                            className='w-full h-full rounded-full object-cover'
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                                if (nextSibling) {
                                                    nextSibling.style.display = 'flex';
                                                }
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
									<div className='w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mx-auto mb-3 p-1'>                                        <img 
                                            src="/faculty/faculty-2.jpg" 
                                            alt="Dr. Faculty Name"
                                            className='w-full h-full rounded-full object-cover'
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                                if (nextSibling) {
                                                    nextSibling.style.display = 'flex';
                                                }
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
									<div className='w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-3 p-1'>                                        <img 
                                            src="/faculty/faculty-3.jpg" 
                                            alt="Dr. Faculty Name"
                                            className='w-full h-full rounded-full object-cover'
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                                if (nextSibling) {
                                                    nextSibling.style.display = 'flex';
                                                }
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
									<div className='w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mx-auto mb-3 p-1'>                                        <img 
                                            src="/faculty/faculty-4.jpg" 
                                            alt="Prof. Faculty Name"
                                            className='w-full h-full rounded-full object-cover'
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                                if (nextSibling) {
                                                    nextSibling.style.display = 'flex';
                                                }
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
									<div className='w-20 h-20 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full mx-auto mb-3 p-1'>                                        <img 
                                            src="/faculty/faculty-5.jpg" 
                                            alt="Dr. Faculty Name"
                                            className='w-full h-full rounded-full object-cover'
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                                if (nextSibling) {
                                                    nextSibling.style.display = 'flex';
                                                }
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
									<div className='w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full mx-auto mb-3 p-1'>                                        <img 
                                            src="/faculty/faculty-6.jpg" 
                                            alt="Dr. Faculty Name"
                                            className='w-full h-full rounded-full object-cover'
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                                                if (nextSibling) {
                                                    nextSibling.style.display = 'flex';
                                                }
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
								<button 
									onClick={() => setSelectedYear('2023-24')}
									className={`px-6 py-2 rounded-lg font-medium transition-colors ${
										selectedYear === '2023-24' 
											? 'bg-emerald-600 text-white' 
											: 'text-gray-600 hover:text-gray-900'
									}`}
								>
									2023-24
								</button>
								<button 
									onClick={() => setSelectedYear('2022-23')}
									className={`px-6 py-2 rounded-lg font-medium transition-colors ${
										selectedYear === '2022-23' 
											? 'bg-emerald-600 text-white' 
											: 'text-gray-600 hover:text-gray-900'
									}`}
								>
									2022-23
								</button>
							</div>
						</div>
					</div>

					{/* Activity Calendar Content */}
					<div className='space-y-8'>
						{selectedYear === '2023-24' ? (
							<>
								{/* Odd Semester 2023-24 */}
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

										{/* ...existing Odd Semester 2023-24 table... */}
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

								{/* Even Semester 2023-24 */}
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

										{/* ...existing Even Semester 2023-24 table... */}
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
							</>
						) : (
							<>
								{/* Odd Semester 2022-23 */}
								<AnimatedCard delay={0.1}>
									<div className='bg-white rounded-xl p-6 border border-gray-200'>
										<div className='flex items-center justify-between mb-6'>
											<div className='flex items-center'>
												<div className='w-3 h-3 bg-purple-500 rounded-full mr-3'></div>
												<h2 className='text-2xl font-bold text-gray-900'>Odd Semester (2022-23)</h2>
											</div>
											<div className='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium'>
												Aug 2022 - Jan 2023
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
															startDate: "29-08-2022",
															endDate: "9-12-2022",
															category: "academic"
														},
														{
															sno: 2,
															event: "First Year Counselling (Admission of first year)",
															startDate: "01-09-2022",
															endDate: "30-09-2022",
															category: "admission"
														},
														{
															sno: 3,
															event: "Induction Programme of first year",
															startDate: "1-10-2022",
															endDate: "14-10-2022",
															category: "orientation"
														},
														{
															sno: 4,
															event: "Navratri Festival Celebration",
															startDate: "26-09-2022",
															endDate: "5-10-2022",
															category: "cultural"
														},
														{
															sno: 5,
															event: "Sports Day (University event)",
															startDate: "20-10-2022",
															endDate: "22-10-2022",
															category: "sports"
														},
														{
															sno: 6,
															event: "Minor Project Defense -I (Fourth Year)",
															startDate: "7-11-2022",
															endDate: "12-11-2022",
															category: "academic"
														},
														{
															sno: 7,
															event: "Mid Sessional Exams",
															startDate: "31-10-2022",
															endDate: "6-11-2022",
															category: "exam"
														},
														{
															sno: 8,
															event: "Summer Training Viva",
															startDate: "7-11-2022",
															endDate: "9-11-2022",
															category: "academic"
														},
														{
															sno: 9,
															event: "Initiation of first year classes/ Lateral Entry classes",
															startDate: "1-10-2022",
															endDate: "9-12-2022",
															category: "academic"
														},
														{
															sno: 10,
															event: "Diwali Festival Break",
															startDate: "22-10-2022",
															endDate: "26-10-2022",
															category: "break"
														},
														{
															sno: 11,
															event: "Internal Practical Exams",
															startDate: "21-11-2022",
															endDate: "28-11-2022",
															category: "exam"
														},
														{
															sno: 12,
															event: "Cultural Event - Techfest",
															startDate: "28-11-2022",
															endDate: "30-11-2022",
															category: "cultural"
														},
														{
															sno: 13,
															event: "Second Project Defense (Fourth Year)",
															startDate: "19-11-2022",
															endDate: "24-11-2022",
															category: "academic"
														},
														{
															sno: 14,
															event: "Preparatory Exams/Retest/Lateral Entry Minor Exam",
															startDate: "19-12-2022",
															endDate: "24-12-2022",
															category: "exam"
														},
														{
															sno: 15,
															event: "Preparatory Leaves for students",
															startDate: "24-12-2022",
															endDate: "29-12-2022",
															category: "break"
														},
														{
															sno: 16,
															event: "External Practical",
															startDate: "19-12-2022",
															endDate: "29-12-2022",
															category: "exam"
														},
														{
															sno: 17,
															event: "Faculty Development Program",
															startDate: "26-12-2022",
															endDate: "31-12-2022",
															category: "faculty"
														},
														{
															sno: 18,
															event: "Winter Break (Faculty)",
															startDate: "17-01-2023",
															endDate: "23-01-2023",
															category: "break"
														},
														{
															sno: 19,
															event: "University Examination",
															startDate: "29-12-2022",
															endDate: "16-01-2023",
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

								{/* Even Semester 2022-23 */}
								<AnimatedCard delay={0.2}>
									<div className='bg-white rounded-xl p-6 border border-gray-200'>
										<div className='flex items-center justify-between mb-6'>
											<div className='flex items-center'>
												<div className='w-3 h-3 bg-indigo-500 rounded-full mr-3'></div>
												<h2 className='text-2xl font-bold text-gray-900'>Even Semester (2022-23)</h2>
											</div>
											<div className='bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium'>
												Jan 2023 - Jul 2023
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
															event: "Semester Start (For fourth, Sixth and Eighth semesters)",
															startDate: "24-01-2023",
															endDate: "30-05-2023",
															category: "academic"
														},
														{
															sno: 2,
															event: "Republic Day Celebration",
															startDate: "26-01-2023",
															endDate: "26-01-2023",
															category: "cultural"
														},
														{
															sno: 3,
															event: "Annual Cultural Festival - Anugoonj",
															startDate: "09-02-2023",
															endDate: "11-02-2023",
															category: "cultural"
														},
														{
															sno: 4,
															event: "First Major Project Defense (Fourth Year)",
															startDate: "28-02-2023",
															endDate: "28-02-2023",
															category: "academic"
														},
														{
															sno: 5,
															event: "Holi Festival Break",
															startDate: "07-03-2023",
															endDate: "09-03-2023",
															category: "break"
														},
														{
															sno: 6,
															event: "Mid term Sessional Exams",
															startDate: "27-03-2023",
															endDate: "31-03-2023",
															category: "exam"
														},
														{
															sno: 7,
															event: "Mid Term Practical Exams",
															startDate: "03-04-2023",
															endDate: "07-04-2023",
															category: "exam"
														},
														{
															sno: 8,
															event: "Faculty Development Workshop",
															startDate: "12-04-2023",
															endDate: "13-04-2023",
															category: "faculty"
														},
														{
															sno: 9,
															event: "Spring Sports Tournament",
															startDate: "20-04-2023",
															endDate: "22-04-2023",
															category: "sports"
														},
														{
															sno: 10,
															event: "Second Major Project Defense (Fourth Year)",
															startDate: "16-05-2023",
															endDate: "18-05-2023",
															category: "academic"
														},
														{
															sno: 11,
															event: "External Practical",
															startDate: "15-05-2023",
															endDate: "20-05-2023",
															category: "exam"
														},
														{
															sno: 12,
															event: "Industry Expert Lecture Series",
															startDate: "22-05-2023",
															endDate: "25-05-2023",
															category: "academic"
														},
														{
															sno: 13,
															event: "Preparatory Leaves for students",
															startDate: "01-06-2023",
															endDate: "06-06-2023",
															category: "break"
														},
														{
															sno: 14,
															event: "University Examination",
															startDate: "07-06-2023",
															endDate: "27-06-2023",
															category: "exam"
														},
														{
															sno: 15,
															event: "Summer Break (Faculty)",
															startDate: "28-06-2023",
															endDate: "31-07-2023",
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
							</>
						)}

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
			);        }
        
        // If teaching learning process subsection is selected
        if (activeSection === 'pedagogical-initiatives' && activeSubSection === 'teaching-learning-process') {
            return (
                <div className='space-y-8'>
                    {/* Teaching Learning Process Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                <BookOpen className='w-8 h-8 text-white' />
                            </div>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Teaching Learning Process</h1>
                            <p className='text-green-600 font-medium'>Outcome-Based Education with Student-Centered Approach</p>
                        </div>
                    </motion.div>

                    {/* Introduction and Overview */}
                    <AnimatedCard delay={0.1}>
                        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Target className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Overview</h2>
                            </div>
                            <div className='prose max-w-none text-gray-700 leading-relaxed'>
                                <p className='text-base mb-4'>
                                    Teaching Learning process is a crucial part of outcome-based education (OBE) and focuses on students to acquire the knowledge, skills and attitudes. Student-centered and practical oriented lectures, tutorials, collaborative learning, self-learning, peer-to-peer learning approaches with integration of appropriate teaching aids, and teaching materials are the educational strategies selected to support the Teaching Learning Process.
                                </p>
                                <p className='text-base mb-4'>
                                    Our department employs a comprehensive approach that combines traditional teaching methods with modern pedagogical techniques to ensure effective knowledge transfer and skill development. The process is designed to enhance student engagement, promote critical thinking, and develop practical problem-solving abilities.
                                </p>
                                <p className='text-base'>
                                    We believe in creating an interactive learning environment where students are active participants rather than passive recipients of information, fostering a culture of inquiry, innovation, and continuous improvement.
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Teaching Methodologies */}
                    <AnimatedCard delay={0.2}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Settings className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Teaching Methodologies</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {[
                                    {
                                        title: 'Student-Centered Learning',
                                        description: 'Interactive lectures where students actively participate through discussions, Q&A sessions, and collaborative problem-solving activities.',
                                        icon: <Users className='w-8 h-8 text-blue-600' />,
                                        color: 'from-blue-50 to-blue-100',
                                        border: 'border-blue-200'
                                    },
                                    {
                                        title: 'Practical Oriented Approach',
                                        description: 'Hands-on laboratory sessions, project-based learning, and real-world case studies to bridge theory and practice.',
                                        icon: <Code className='w-8 h-8 text-green-600' />,
                                        color: 'from-green-50 to-green-100',
                                        border: 'border-green-200'
                                    },
                                    {
                                        title: 'Collaborative Learning',
                                        description: 'Group projects, team assignments, and peer learning activities that promote teamwork and communication skills.',
                                        icon: <Users className='w-8 h-8 text-purple-600' />,
                                        color: 'from-purple-50 to-purple-100',
                                        border: 'border-purple-200'
                                    },
                                    {
                                        title: 'Self-Learning Initiative',
                                        description: 'Independent research projects, self-paced learning modules, and personalized learning paths to develop autonomous learning skills.',
                                        icon: <BookOpen className='w-8 h-8 text-orange-600' />,
                                        color: 'from-orange-50 to-orange-100',
                                        border: 'border-orange-200'
                                    },
                                    {
                                        title: 'Peer-to-Peer Learning',
                                        description: 'Student mentorship programs, peer tutoring sessions, and collaborative study groups for mutual knowledge sharing.',
                                        icon: <UserCheck className='w-8 h-8 text-indigo-600' />,
                                        color: 'from-indigo-50 to-indigo-100',
                                        border: 'border-indigo-200'
                                    },
                                    {
                                        title: 'Technology Integration',
                                        description: 'Digital learning platforms, interactive multimedia content, and modern teaching aids to enhance learning experience.',
                                        icon: <Monitor className='w-8 h-8 text-teal-600' />,
                                        color: 'from-teal-50 to-teal-100',
                                        border: 'border-teal-200'
                                    }
                                ].map((method, index) => (
                                    <div key={index} className={`bg-gradient-to-br ${method.color} rounded-lg p-6 ${method.border} border hover:shadow-lg transition-all duration-300`}>
                                        <div className='flex items-center mb-4'>
                                            <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm'>
                                                {method.icon}
                                            </div>
                                            <h3 className='text-lg font-bold text-gray-900'>{method.title}</h3>
                                        </div>
                                        <p className='text-gray-700 text-sm leading-relaxed'>{method.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* OBE Framework */}
                    <AnimatedCard delay={0.3}>
                        <div className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Target className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Outcome-Based Education Framework</h2>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                                <div className='bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200'>
                                    <div className='text-center mb-4'>
                                        <div className='w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3'>
                                            <BookOpen className='w-8 h-8 text-white' />
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900 mb-2'>Knowledge Acquisition</h3>
                                    </div>
                                    <ul className='space-y-2 text-sm text-gray-700'>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Comprehensive understanding of core concepts</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Theoretical foundation in computer science</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Current industry trends and technologies</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Research methodologies and practices</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className='bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200'>
                                    <div className='text-center mb-4'>
                                        <div className='w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3'>
                                            <Settings className='w-8 h-8 text-white' />
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900 mb-2'>Skill Development</h3>
                                    </div>
                                    <ul className='space-y-2 text-sm text-gray-700'>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Programming and software development</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Problem-solving and analytical thinking</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Project management and teamwork</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Communication and presentation skills</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className='bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200'>
                                    <div className='text-center mb-4'>
                                        <div className='w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3'>
                                            <Star className='w-8 h-8 text-white' />
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900 mb-2'>Attitude Formation</h3>
                                    </div>
                                    <ul className='space-y-2 text-sm text-gray-700'>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Professional ethics and responsibility</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Continuous learning mindset</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Innovation and entrepreneurship</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <div className='w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                            <span>Social responsibility and sustainability</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Assessment and Evaluation */}
                    <AnimatedCard delay={0.4}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
                                    <CheckCircle className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Assessment and Evaluation Methods</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-4'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-3'>Formative Assessment</h3>
                                    {[
                                        {
                                            method: 'Continuous Assessment',
                                            description: 'Regular quizzes, assignments, and class participation to monitor student progress',
                                            icon: <Clock className='w-5 h-5 text-blue-600' />
                                        },
                                        {
                                            method: 'Peer Evaluation',
                                            description: 'Students evaluate each other\'s work and provide constructive feedback',
                                            icon: <Users className='w-5 h-5 text-green-600' />
                                        },
                                        {
                                            method: 'Self-Assessment',
                                            description: 'Students reflect on their own learning and identify areas for improvement',
                                            icon: <User className='w-5 h-5 text-purple-600' />
                                        },
                                        {
                                            method: 'Portfolio Development',
                                            description: 'Collection of student work demonstrating learning progress over time',
                                            icon: <FolderOpen className='w-5 h-5 text-orange-600' />
                                        }
                                    ].map((assessment, index) => (
                                        <div key={index} className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                                            <div className='flex items-start'>
                                                <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm'>
                                                    {assessment.icon}
                                                </div>
                                                <div>
                                                    <h4 className='font-semibold text-gray-900 mb-1'>{assessment.method}</h4>
                                                    <p className='text-sm text-gray-600'>{assessment.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='space-y-4'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-3'>Summative Assessment</h3>
                                    {[
                                        {
                                            method: 'Written Examinations',
                                            description: 'Comprehensive tests to evaluate theoretical knowledge and understanding',
                                            icon: <FileText className='w-5 h-5 text-blue-600' />
                                        },
                                        {
                                            method: 'Practical Examinations',
                                            description: 'Hands-on laboratory tests to assess practical skills and application',
                                            icon: <Code className='w-5 h-5 text-green-600' />
                                        },
                                        {
                                            method: 'Project Evaluation',
                                            description: 'Assessment of major projects and capstone work demonstrating competency',
                                            icon: <Lightbulb className='w-5 h-5 text-purple-600' />
                                        },
                                        {
                                            method: 'Presentation Assessment',
                                            description: 'Evaluation of communication skills through project presentations and seminars',
                                            icon: <Monitor className='w-5 h-5 text-orange-600' />
                                        }
                                    ].map((assessment, index) => (
                                        <div key={index} className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                                            <div className='flex items-start'>
                                                <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm'>
                                                    {assessment.icon}
                                                </div>
                                                <div>
                                                    <h4 className='font-semibold text-gray-900 mb-1'>{assessment.method}</h4>
                                                    <p className='text-sm text-gray-600'>{assessment.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Learning Support Systems */}
                    <AnimatedCard delay={0.5}>
                        <div className='bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Settings className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Learning Support Systems</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[
                                    {
                                        title: 'Digital Learning Platforms',
                                        description: 'LMS, online resources, and digital libraries for enhanced learning experience',
                                        icon: <Monitor className='w-8 h-8 text-blue-600' />,
                                        features: ['Moodle LMS', 'Digital Library', 'Video Lectures', 'Online Assessments']
                                    },
                                    {
                                        title: 'Tutorial Support',
                                        description: 'Regular tutorial sessions and doubt-clearing sessions for additional support',
                                        icon: <Users className='w-8 h-8 text-green-600' />,
                                        features: ['Weekly Tutorials', 'Doubt Sessions', 'Extra Classes', 'Remedial Teaching']
                                    },
                                    {
                                        title: 'Mentorship Program',
                                        description: 'Faculty and peer mentorship for academic and personal guidance',
                                        icon: <UserCheck className='w-8 h-8 text-purple-600' />,
                                        features: ['Faculty Mentors', 'Peer Mentors', 'Career Guidance', 'Personal Counseling']
                                    },
                                    {
                                        title: 'Laboratory Facilities',
                                        description: 'Well-equipped labs with modern equipment and software for practical learning',
                                        icon: <Settings className='w-8 h-8 text-orange-600' />,
                                        features: ['15+ Specialized Labs', 'Latest Software', 'High-end Hardware', '24/7 Access']
                                    },
                                    {
                                        title: 'Industry Interaction',
                                        description: 'Regular industry expert sessions and industrial visits for practical exposure',
                                        icon: <Briefcase className='w-8 h-8 text-indigo-600' />,
                                        features: ['Expert Sessions', 'Industrial Visits', 'Internship Programs', 'Live Projects']
                                    },
                                    {
                                        title: 'Study Materials',
                                        description: 'Comprehensive study materials, reference books, and digital resources',
                                        icon: <BookOpen className='w-8 h-8 text-teal-600' />,
                                        features: ['Lecture Notes', 'Reference Books', 'E-books', 'Research Papers']
                                    }
                                ].map((support, index) => (
                                    <div key={index} className='bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300'>
                                        <div className='text-center mb-4'>
                                            <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3'>
                                                {support.icon}
                                            </div>
                                            <h3 className='text-lg font-bold text-gray-900 mb-2'>{support.title}</h3>
                                            <p className='text-sm text-gray-600 mb-4'>{support.description}</p>
                                        </div>
                                        <ul className='space-y-2'>
                                            {support.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className='flex items-center text-sm text-gray-700'>
                                                    <div className='w-2 h-2 bg-cyan-500 rounded-full mr-3 flex-shrink-0'></div>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Key Features and Benefits */}
                    <AnimatedCard delay={0.6}>
                        <div className='bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Trophy className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Key Features & Benefits</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-4'>Process Features</h3>
                                    <ul className='space-y-3'>
                                        {[
                                            'Outcome-based curriculum design',
                                            'Student-centered learning approach',
                                            'Interactive and engaging teaching methods',
                                            'Technology-enhanced learning environment',
                                            'Continuous assessment and feedback',
                                            'Industry-relevant practical training'
                                        ].map((feature, index) => (
                                            <li key={index} className='flex items-start'>
                                                <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                                <span className='text-sm text-gray-700'>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className='bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-4'>Student Benefits</h3>
                                    <ul className='space-y-3'>
                                        {[
                                            'Enhanced problem-solving abilities',
                                            'Improved technical and soft skills',
                                            'Better industry readiness',
                                            'Strong foundation for higher studies',
                                            'Increased employment opportunities',
                                            'Lifelong learning capabilities'
                                        ].map((benefit, index) => (
                                            <li key={index} className='flex items-start'>
                                                <div className='w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                                <span className='text-sm text-gray-700'>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>
                </div>
            );
        }
        
        // If innovative practices subsection is selected
        if (activeSection === 'pedagogical-initiatives' && activeSubSection === 'innovative-practices') {
            return (
                <div className='space-y-8'>
                    {/* Innovative Practices Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                <Lightbulb className='w-8 h-8 text-white' />
                            </div>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Innovative Practices</h1>
                            <p className='text-orange-600 font-medium'>Innovative Methods used in Teaching Learning Process</p>
                        </div>
                    </motion.div>

                    {/* Introduction */}
                    <AnimatedCard delay={0.1}>
                        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
                                    <BookOpen className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Overview</h2>
                            </div>
                            <div className='prose max-w-none text-gray-700 leading-relaxed'>
                                <p className='text-base mb-4'>
                                    The following innovative methods are followed and implemented to give the students a more accurate and practical knowledge of the subject. The faculty member decides upon an innovative method that they want to implement for their subject and then conduct them in the lab/theory session.
                                </p>
                                <p className='text-base mb-4'>
                                    These innovative methods are designed such that they encourage the students to think out of the box and look at the same problem with a different view and then propose a solution to it. These innovative methods are either implemented in a group set-up or a pair set-up or at an individual level.
                                </p>
                                <p className='text-base'>
                                    The main motive of these innovative methods is to ensure that the basic concept of the subject is very clearly understood by the student so that they can handle any kind of complex, real world problem.
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Innovative Methods Table */}
                    <AnimatedCard delay={0.2}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Settings className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Innovative Teaching Methods</h2>
                            </div>

                            <div className='overflow-x-auto'>
                                <table className='w-full border-collapse'>
                                    <thead>
                                        <tr className='bg-gray-50'>
                                            <th className='border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900'>S.No</th>
                                            <th className='border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900'>Innovation Method</th>
                                            <th className='border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900'>Description</th>
                                            <th className='border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900'>Impact</th>
                                            <th className='border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900'>PO Mapping</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            {
                                                sno: 1,
                                                method: "Project Based Learning",
                                                description: "In this method various projects are given to students and they work together to solve problems",
                                                impact: "Students will be able to bridge the gap between theoretical concepts and practical requirements.",
                                                poMapping: "PO1, PO2, PO3, PO4, PO5, PO8, PO9, PO12"
                                            },
                                            {
                                                sno: 2,
                                                method: "Game Based Learning",
                                                description: "Educators incorporate game elements, such as points, levels, and rewards, into the learning process to engage and motivate students.",
                                                impact: "Enhances motivation, engagement, knowledge retention, and the development of various cognitive and social skills.",
                                                poMapping: "PO1, PO2, PO4, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 3,
                                                method: "Think, Pair and Share",
                                                description: "In this method, a problem is posed, students have time to think about it individually, and then they work in pairs to solve the problem and share their ideas with the class.",
                                                impact: "This method improves students' problem solving and communication skills",
                                                poMapping: "PO1, PO2, PO3, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 4,
                                                method: "Quiz",
                                                description: "A quiz refers to a fast and information evaluation of the knowledge of students. Quiz within a learning environment to assess how the learners understand a concept. Therefore, it serves as a process to understand students' insight into the subject matter.",
                                                impact: "Improves concentration, identifies knowledge gaps, boosts confidence, and helps children retain information.",
                                                poMapping: "PO1, PO2, PO3, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 5,
                                                method: "Group Project",
                                                description: "The project will be divided into distinct subprojects, each of which will be assigned to different groups, contributing to the completion of the overarching project as a whole.",
                                                impact: "This method will improve effective communication, collaboration, and a willingness to work together.",
                                                poMapping: "PO1, PO2, PO3, PO4, PO5, PO8, PO9, PO10, PO11, PO12"
                                            },
                                            {
                                                sno: 6,
                                                method: "Brainstorming",
                                                description: "Tasks will be given to students in groups and they have to perform it on staruml and then have to present it",
                                                impact: "This method will encourage teamwork in students and can be used to improve communication skills.",
                                                poMapping: "PO1, PO2, PO3, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 7,
                                                method: "Flash Cards",
                                                description: "Flashcards are cards with a limited amount of information on them, such as words, phrases, questions, photos, numbers, or even a little sketch. All these are usually related to a subject and/or a study topic.",
                                                impact: "They are useful for learning and studying tasks that involve memorizing.",
                                                poMapping: "PO2, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 8,
                                                method: "Reflexive learning (Experience based Learning)",
                                                description: "Students are presented with real-world problems that require critical thinking, research, and collaboration to solve. It promotes inquiry-based learning and encourages students to apply their knowledge to practical situations.",
                                                impact: "Develop communication skills and self-confidence and gain and strengthen decision-making skills by responding to and solving real world problems and processes.",
                                                poMapping: "PO1, PO2, PO3, PO4, PO8, PO9, PO10, PO11, PO12"
                                            },
                                            {
                                                sno: 9,
                                                method: "Group Discussion",
                                                description: "Educators incorporate game elements, such as points, levels, and rewards, into the learning process to engage and motivate students.",
                                                impact: "Promote a deeper understanding of a topic and increase long-term retention.",
                                                poMapping: "PO1, PO2, PO3, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 10,
                                                method: "Critical Thinking and problem solving",
                                                description: "Students are encouraged to spend as much time as possible on each problem to find the solution. The questions are designed such that the answers can only be gotten from considering multiple possibilities of the solution",
                                                impact: "To improving analytical thinking and building problem solving skills",
                                                poMapping: "PO1, PO2, PO3, PO4, PO5, PO8, PO9, PO10, PO11, PO12"
                                            },
                                            {
                                                sno: 11,
                                                method: "Flipped Classroom",
                                                description: "In this approach, students watch pre-recorded videos at home to learn new concepts, and class time is used for discussions, problem-solving, and hands-on activities.",
                                                impact: "Students develop independent learning skills",
                                                poMapping: "PO1, PO2, PO3, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 12,
                                                method: "ICT tools",
                                                description: "Incorporating technology tools such as power point presentations, virtual reality, augmented reality, interactive whiteboards, and educational apps can make learning more interactive, immersive, and engaging for students.",
                                                impact: "ICT tools has transformed the teaching-learning process, making it more dynamic, engaging, and effective.",
                                                poMapping: "PO1, PO5, PO9, PO12"
                                            },
                                            {
                                                sno: 13,
                                                method: "Peer to peer learning",
                                                description: "students solidify their knowledge by teaching each other. One student tutoring another in a supervised environment can result in better learning and retention.",
                                                impact: "Fosters teamwork, cooperation, patience, and better social skills.",
                                                poMapping: "PO1, PO2, PO3, PO4, PO5, PO8, PO9, PO10, PO11, PO12"
                                            },
                                            {
                                                sno: 14,
                                                method: "Personalized learning",
                                                description: "Students pose questions, investigate, and seek answers or solutions through research and exploration, fostering curiosity and independent thinking.",
                                                impact: "Each and every student can be able to learn on their own pace",
                                                poMapping: "PO1, PO2, PO3, PO4, PO5, PO9, PO9, PO11, PO12"
                                            },
                                            {
                                                sno: 15,
                                                method: "Concept map/Mind map",
                                                description: "Students create visual diagrams or mind maps to organize and connect concepts, facilitating understanding and promoting creative thinking.",
                                                impact: "Students to actively engage in their learning, often by connecting their prior knowledge to new information.",
                                                poMapping: "PO1, PO2, PO3, PO4, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 16,
                                                method: "Synchronous and Asynchronous learning",
                                                description: "Utilizing both synchronous (real-time) and asynchronous (self-paced) learning approaches allows students to learn at their own pace and participate in live interactions and discussions. Like Nptel, Spoken tutorial",
                                                impact: "Synchronous learning offers the advantage of real-time conversations with trainers or peers, the flexibility of asynchronous learning benefits the students who were absent and were busy with some other responsibilities.",
                                                poMapping: "PO1, PO2, PO3, PO4, PO8, PO9, PO10, PO12"
                                            },
                                            {
                                                sno: 17,
                                                method: "Virtual labs",
                                                description: "Allow the instructors to capture learners' attention by allowing them to test all those procedures in an online setup easily.",
                                                impact: "Students can conduct the same experiment multiple times to ensure they completely understand the concept.",
                                                poMapping: "PO1, PO2, PO3, PO4, PO8, PO9, PO10, PO12"
                                            }
                                        ].map((item, index) => (
                                            <tr key={index} className='hover:bg-gray-50 transition-colors'>
                                                <td className='border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900'>{item.sno}</td>
                                                <td className='border border-gray-300 px-4 py-3'>
                                                    <div className='font-medium text-blue-800 text-sm'>{item.method}</div>
                                                </td>
                                                <td className='border border-gray-300 px-4 py-3 text-sm text-gray-700 leading-relaxed'>{item.description}</td>
                                                <td className='border border-gray-300 px-4 py-3 text-sm text-gray-700 leading-relaxed'>{item.impact}</td>
                                                <td className='border border-gray-300 px-4 py-3'>
                                                    <div className='flex flex-wrap gap-1'>
                                                        {item.poMapping.split(', ').map((po, poIndex) => (
                                                            <span key={poIndex} className='px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium'>
                                                                {po}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Additional Resources */}
                    <AnimatedCard delay={0.3}>
                        <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-3'>
                                    <FolderOpen className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-xl font-bold text-gray-900'>Faculty Resources</h2>
                            </div>
                            <div className='bg-white/70 backdrop-blur-sm rounded-xl p-4'>
                                <p className='text-gray-700 mb-4'>
                                    The faculty members apply any of these methods in their respective subjects to make their teaching more interactive and increases the students' interest in the class.
                                </p>
                                <div className='flex items-center'>
                                    <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
                                        <FileText className='w-5 h-5 text-blue-600' />
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-900 mb-1'>Review Activities</p>
                                        <p className='text-sm text-gray-600 mb-2'>Other faculty members can review these activities from the following link:</p>
                                        <a 
                                            href='https://drive.google.com/drive/folders/1Ngd-i8_aBT3fw4LMOD1bSVDm1-8kyB-v?usp=sharing' 
                                            target='_blank' 
                                            rel='noopener noreferrer'
                                            className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm'>
                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                                            </svg>
                                            Access Google Drive
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Key Benefits */}
                    <AnimatedCard delay={0.4}>
                        <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Trophy className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-xl font-bold text-gray-900'>Key Benefits</h2>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {[
                                    {
                                        icon: <Users className='w-8 h-8 text-blue-600' />,
                                        title: 'Enhanced Collaboration',
                                        description: 'Students work together effectively in groups and pairs, improving teamwork skills.'
                                    },
                                    {
                                        icon: <Lightbulb className='w-8 h-8 text-yellow-600' />,
                                        title: 'Critical Thinking',
                                        description: 'Encourages students to think out of the box and approach problems from different perspectives.'
                                    },
                                    {
                                        icon: <Target className='w-8 h-8 text-green-600' />,
                                        title: 'Practical Application',
                                        description: 'Bridges the gap between theoretical concepts and real-world problem solving.'
                                    },
                                    {
                                        icon: <BookOpen className='w-8 h-8 text-purple-600' />,
                                        title: 'Better Retention',
                                        description: 'Interactive methods improve knowledge retention and understanding of core concepts.'
                                    },
                                    {
                                        icon: <Star className='w-8 h-8 text-orange-600' />,
                                        title: 'Increased Engagement',
                                        description: 'Game-based and interactive learning methods boost student motivation and participation.'
                                    },
                                    {
                                        icon: <GraduationCap className='w-8 h-8 text-indigo-600' />,
                                        title: 'Independent Learning',
                                        description: 'Students develop self-directed learning skills and academic independence.'
                                    }
                                ].map((benefit, index) => (
                                    <div key={index} className='bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center'>
                                        <div className='flex justify-center mb-3'>
                                            {benefit.icon}
                                        </div>
                                        <h3 className='font-bold text-gray-900 mb-2'>{benefit.title}</h3>
                                        <p className='text-sm text-gray-600'>{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedCard>
                </div>
            );        }
        
        // If facilities section is selected with rd-labs subsection
        if (activeSection === 'facilities' && activeSubSection === 'rd-labs') {
            return (
                <div className='space-y-8'>
                    {/* R&D Labs Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                <Microscope className='w-8 h-8 text-white' />
                            </div>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Research & Development Labs</h1>
                            <p className='text-purple-600 font-medium'>Innovation Hub for Future Technologies</p>
                        </div>
                    </motion.div>

                    {/* R&D Lab Overview */}
                    <AnimatedCard delay={0.1}>
                        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
                                    <FlaskConical className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>R&D Laboratory</h2>
                            </div>
                            <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                <p className='text-base mb-4'>
                                    In Research and Development (R&D) lab, a dynamic hub where curiosity meets innovation. Here, students and faculty come together to explore the uncharted realms of science and technology. Led by passionate mentors and supported by state-of-the-art facilities, the R&D lab serves as a crucible for creativity and discovery.
                                </p>
                                <p className='text-base mb-4'>
                                    Students engage in hands-on research projects, ranging from fundamental scientific inquiries to cutting-edge technological advancements. Through experimentation, collaboration, and critical thinking, they develop the skills and knowledge necessary to become leaders in their respective fields.
                                </p>
                                <p className='text-base mb-4'>
                                    Beyond academic pursuits, the R&D lab fosters a culture of interdisciplinary collaboration, encouraging students to tackle real-world challenges and make meaningful contributions to society. As a beacon of innovation on campus, the R&D lab inspires a new generation of thinkers, innovators, and problem solvers, shaping the future of science and technology.
                                </p>
                            </div>

                            {/* Lab Staff */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200'>
                                    <div className='flex items-center mb-3'>
                                        <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
                                            <UserCheck className='w-5 h-5 text-blue-600' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-bold text-gray-900'>Lab Incharge</h3>
                                            <p className='text-blue-600 font-medium'>Ms. Anju & Ms. Shweta Gupta</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200'>
                                    <div className='flex items-center mb-3'>
                                        <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3'>
                                            <Wrench className='w-5 h-5 text-green-600' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-bold text-gray-900'>Lab Technician</h3>
                                            <p className='text-green-600 font-medium'>Ms. Ekta Sharma</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Robotics and Automation Lab */}
                    <AnimatedCard delay={0.2}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Settings className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Robotics And Automation Lab</h2>
                            </div>
                            <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                <p className='text-base mb-4'>
                                    The lab serves as a platform for conducting research and development in areas like Robotics, Embedded Systems etc. These areas are associated and collaborated with well-established Institutions in India like IIT Bombay.
                                </p>
                            </div>

                            {/* Lab Staff */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                                <div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200'>
                                    <div className='flex items-center mb-3'>
                                        <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3'>
                                            <UserCheck className='w-5 h-5 text-orange-600' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-bold text-gray-900'>Lab Incharge</h3>
                                            <p className='text-orange-600 font-medium'>Dr. Charu Gupta</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-200'>
                                    <div className='flex items-center mb-3'>
                                        <div className='w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3'>
                                            <Wrench className='w-5 h-5 text-teal-600' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-bold text-gray-900'>Lab Technician</h3>
                                            <p className='text-teal-600 font-medium'>Ms. Parul</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* e-Yantra Section */}
                    <AnimatedCard delay={0.3}>
                        <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Trophy className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>e-Yantra</h2>
                            </div>
                            <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                <p className='text-base mb-4'>
                                    The Lab is equipped with the facility for Robotics. e-Yantra Robotic Lab is a MHRD funded project initiated by IIT Bombay under "e-Yantra Lab Setup Initiative (eLSI)" under which colleges are encouraged to setup robotics labs.
                                </p>
                                <p className='text-base mb-4'>
                                    It is designed as a scalable and sustainable approach that addresses infrastructure creation and teacher training – to create an eco-system at the colleges to impart effective engineering education.
                                </p>
                                <p className='text-base'>
                                    e-Yantra Lab is equipped with Firebird V. This facility is available to the students, so that they can focus on embedded system and robotics projects.
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <div className='bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200 text-center'>
                                    <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
                                        <Building2 className='w-6 h-6 text-blue-600' />
                                    </div>
                                    <h3 className='text-lg font-bold text-gray-900 mb-2'>MHRD Funded</h3>
                                    <p className='text-sm text-gray-600'>Government supported initiative for robotics education</p>
                                </div>
                                <div className='bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200 text-center'>
                                    <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
                                        <GraduationCap className='w-6 h-6 text-purple-600' />
                                    </div>
                                    <h3 className='text-lg font-bold text-gray-900 mb-2'>IIT Bombay</h3>
                                    <p className='text-sm text-gray-600'>Collaboration with premier technical institute</p>
                                </div>
                                <div className='bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200 text-center'>
                                    <div className='w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
                                        <Settings className='w-6 h-6 text-orange-600' />
                                    </div>
                                    <h3 className='text-lg font-bold text-gray-900 mb-2'>Firebird V</h3>
                                    <p className='text-sm text-gray-600'>Advanced robotics platform for hands-on learning</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Glimpses Section with Carousel */}
                    <AnimatedCard delay={0.4}>
                        <div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Camera className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Glimpses</h2>
                            </div>
                            
                            <RDLabGlimpsesCarousel />
                        </div>
                    </AnimatedCard>

                    {/* Research Areas */}
                    <AnimatedCard delay={0.5}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Lightbulb className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Research Areas</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[
                                    {
                                        title: 'Artificial Intelligence',
                                        description: 'Machine learning, deep learning, and AI applications in various domains',
                                        icon: <Lightbulb className='w-8 h-8 text-blue-600' />,
                                        color: 'from-blue-50 to-blue-100'
                                    },
                                    {
                                        title: 'Robotics',
                                        description: 'Autonomous robots, robotic systems, and automation technologies',
                                        icon: <Settings className='w-8 h-8 text-orange-600' />,
                                        color: 'from-orange-50 to-orange-100'
                                    },
                                    {
                                        title: 'Embedded Systems',
                                        description: 'IoT devices, microcontrollers, and embedded software development',
                                        icon: <Monitor className='w-8 h-8 text-green-600' />,
                                        color: 'from-green-50 to-green-100'
                                    },
                                    {
                                        title: 'Computer Vision',
                                        description: 'Image processing, pattern recognition, and visual computing',
                                        icon: <Eye className='w-8 h-8 text-purple-600' />,
                                        color: 'from-purple-50 to-purple-100'
                                    },
                                    {
                                        title: 'Data Science',
                                        description: 'Big data analytics, data mining, and statistical analysis',
                                        icon: <BarChart className='w-8 h-8 text-teal-600' />,
                                        color: 'from-teal-50 to-teal-100'
                                    },
                                    {
                                        title: 'Cybersecurity',
                                        description: 'Network security, cryptography, and information security',
                                        icon: <Shield className='w-8 h-8 text-red-600' />,
                                        color: 'from-red-50 to-red-100'
                                    }
                                ].map((area, index) => (
                                    <div key={index} className={`bg-gradient-to-br ${area.color} rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300`}>
                                        <div className='flex items-center mb-4'>
                                            <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm'>
                                                {area.icon}
                                            </div>
                                            <h3 className='text-lg font-bold text-gray-900'>{area.title}</h3>
                                        </div>
                                        <p className='text-gray-700 text-sm leading-relaxed'>{area.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedCard>
                </div>
            );
        }
        
        // If facilities section is selected with labs subsection
        if (activeSection === 'facilities' && activeSubSection === 'labs') {
            return (
                <div className='space-y-8'>
                    {/* Labs Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                <Monitor className='w-8 h-8 text-white' />
                            </div>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Laboratory Facilities</h1>
                            <p className='text-blue-600 font-medium'>State-of-the-art laboratories equipped with modern technology</p>
                        </div>
                    </motion.div>

                    {/* Labs Overview */}
                    <AnimatedCard delay={0.1}>
                        <div className='bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Settings className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Overview</h2>
                            </div>
                            <div className='prose max-w-none text-gray-700 leading-relaxed'>
                                <p className='text-base mb-4'>
                                    The Department of Computer Science & Engineering is equipped with state-of-the-art laboratories that provide students with hands-on experience in various domains of computer science. Our labs are designed to support both theoretical learning and practical implementation, enabling students to develop skills that are directly applicable in the industry.
                                </p>
                                <p className='text-base'>
                                    Each laboratory is equipped with the latest hardware and software configurations, ensuring students have access to current technology and industry-standard tools. The labs support various programming languages, development environments, and specialized software required for comprehensive computer science education.
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Database Lab */}
                    <AnimatedCard delay={0.2}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div>
                                    <div className='flex items-center mb-4'>
                                        <div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
                                            <Database className='w-6 h-6 text-white' />
                                        </div>
                                        <h2 className='text-2xl font-bold text-gray-900'>Database Lab</h2>
                                    </div>
                                    <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                        <p className='text-base mb-4'>
                                            In the database lab, students engage in practical exercises aimed at enhancing their skills in managing, querying, and analyzing data. Through hands-on experimentation with various database management systems, such as MySQL, students learn to design efficient database structures and optimize performance.
                                        </p>
                                        <p className='text-base mb-4'>
                                            They explore techniques for data normalization, indexing, and data manipulation using SQL commands. Additionally, students delve into advanced topics like database security, transactions, and data warehousing, gaining valuable insights into real-world applications of database technology.
                                        </p>
                                        <p className='text-base'>
                                            This lab is equipped with the latest computer systems to provide optimal learning experience.
                                        </p>
                                    </div>

                                    {/* System Configuration */}
                                    <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 mb-4'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>System Configuration</h3>
                                        <div className='space-y-2 text-sm text-gray-700'>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                                                <span><strong>System:</strong> Dell OptiPlex 5000 i7 – 12 Gen</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                                                <span><strong>RAM:</strong> 16GB</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                                                <span><strong>Storage:</strong> 256GB SSD</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                                                <span><strong>UPS:</strong> Microtek 10 KV</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Software Available */}
                                    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>Software Available</h3>
                                        <div className='flex flex-wrap gap-2'>
                                            {['Linux', 'Oracle XE', 'Java', 'DosBOX', 'StarUml', 'Code Blocks', 'Prolog'].map((software, index) => (
                                                <span key={index} className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                                                    {software}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300'>
                                        <div className='text-center'>
                                            <Database className='w-16 h-16 text-gray-400 mx-auto mb-3' />
                                            <p className='text-gray-500 font-medium'>Database Lab Photo</p>
                                            <p className='text-gray-400 text-sm'>To be uploaded</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Programming Lab-I */}
                    <AnimatedCard delay={0.3}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div className='order-2 lg:order-1 flex items-center justify-center'>
                                    <div className='w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300'>
                                        <div className='text-center'>
                                            <Code className='w-16 h-16 text-gray-400 mx-auto mb-3' />
                                            <p className='text-gray-500 font-medium'>Programming Lab-I Photo</p>
                                            <p className='text-gray-400 text-sm'>To be uploaded</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='order-1 lg:order-2'>
                                    <div className='flex items-center mb-4'>
                                        <div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-3'>
                                            <Code className='w-6 h-6 text-white' />
                                        </div>
                                        <h2 className='text-2xl font-bold text-gray-900'>Programming Lab-I</h2>
                                    </div>
                                    <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                        <p className='text-base mb-4'>
                                            This Programming lab is dedicated to students learning about implementing various programming concepts using various languages like Java SE, Java EE and Python. This lab provides different software for hands-on with a high‐level understanding of concepts of Artificial Intelligence (AI), Mobile computing (MC), Programming in Python(PIP), Advanced Java programming, and Java programming practical problems.
                                        </p>
                                        <p className='text-base'>
                                            This lab has the latest computer systems with high-performance configuration to ensure smooth development experience.
                                        </p>
                                    </div>

                                    {/* System Configuration */}
                                    <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 mb-4'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>System Configuration</h3>
                                        <div className='space-y-2 text-sm text-gray-700'>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-purple-500 rounded-full mr-3'></div>
                                                <span><strong>System:</strong> Dell OptiPlex 5000 i7 – 12 Gen</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-purple-500 rounded-full mr-3'></div>
                                                <span><strong>RAM:</strong> 16GB</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-purple-500 rounded-full mr-3'></div>
                                                <span><strong>Storage:</strong> 256GB SSD</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-purple-500 rounded-full mr-3'></div>
                                                <span><strong>UPS:</strong> Microtek 10 KV</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Software Available */}
                                    <div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>Software Available</h3>
                                        <div className='flex flex-wrap gap-2'>
                                            {['Linux', 'Libre Office', 'JDK', 'DosBox', 'StarUML', 'Prolog'].map((software, index) => (
                                                <span key={index} className='px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium'>
                                                    {software}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Network Programming Lab */}
                    <AnimatedCard delay={0.4}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div>
                                    <div className='flex items-center mb-4'>
                                        <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
                                            <Network className='w-6 h-6 text-white' />
                                        </div>
                                        <h2 className='text-2xl font-bold text-gray-900'>Network Programming Lab</h2>
                                    </div>
                                    <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                        <p className='text-base mb-4'>
                                            This lab aims to introduce the students to the world of computer networks where they learn about network-related commands, practice Linux programming using Linux system calls, and start using tools for Network Traffic Analysis and Network Monitoring.
                                        </p>
                                        <p className='text-base'>
                                            Students implement a three-tier application (client browser, apache2 WebServer, MySQL DB) and study the implementation options, gaining practical experience in network programming and system administration.
                                        </p>
                                    </div>

                                    {/* System Configuration */}
                                    <div className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200 mb-4'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>System Configuration</h3>
                                        <div className='space-y-2 text-sm text-gray-700'>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
                                                <span><strong>System:</strong> Dell OptiPlex 5000 i7 – 12 Gen</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
                                                <span><strong>RAM:</strong> 16GB</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
                                                <span><strong>Storage:</strong> 256GB SSD</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
                                                <span><strong>UPS:</strong> Microtek 10 KV</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Software Available */}
                                    <div className='bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg p-4 border border-cyan-200'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>Software Available</h3>
                                        <div className='flex flex-wrap gap-2'>
                                            {['Python', 'Libre Office', 'Scilab', 'Code Blocks', 'Prolog', 'Cisco Packet Tracer'].map((software, index) => (
                                                <span key={index} className='px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium'>
                                                    {software}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300'>
                                        <div className='text-center'>
                                            <Network className='w-16 h-16 text-gray-400 mx-auto mb-3' />
                                            <p className='text-gray-500 font-medium'>Network Programming Lab Photo</p>
                                            <p className='text-gray-400 text-sm'>To be uploaded</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Project Lab */}
                    <AnimatedCard delay={0.5}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div className='order-2 lg:order-1 flex items-center justify-center'>
                                    <div className='w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300'>
                                        <div className='text-center'>
                                            <Lightbulb className='w-16 h-16 text-gray-400 mx-auto mb-3' />
                                            <p className='text-gray-500 font-medium'>Project Lab Photo</p>
                                            <p className='text-gray-400 text-sm'>To be uploaded</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='order-1 lg:order-2'>
                                    <div className='flex items-center mb-4'>
                                        <div className='w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mr-3'>
                                            <Lightbulb className='w-6 h-6 text-white' />
                                        </div>
                                        <h2 className='text-2xl font-bold text-gray-900'>Project Lab</h2>
                                    </div>
                                    <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                        <p className='text-base mb-4'>
                                            The lab facilitates opportunities to work in emerging areas like Artificial Intelligence, Machine Learning, Cybersecurity, and Software Engineering. It is equipped with the necessary software and hardware to support project-based learning, enabling students to tackle real-world challenges, develop critical problem-solving skills, and cultivate creativity whether working individually or in teams.
                                        </p>
                                        <p className='text-base'>
                                            With guidance from experienced faculty and industry mentors, students would have the opportunity to conceptualize, design, and implement solutions, fostering a culture of entrepreneurship and technological advancement within the academic community.
                                        </p>
                                    </div>

                                    {/* System Configuration */}
                                    <div className='bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200 mb-4'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>System Configuration</h3>
                                        <div className='space-y-2 text-sm text-gray-700'>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-orange-500 rounded-full mr-3'></div>
                                                <span><strong>System:</strong> HP440 G9 i7-13700</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-orange-500 rounded-full mr-3'></div>
                                                <span><strong>RAM:</strong> 16GB DDR4</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-orange-500 rounded-full mr-3'></div>
                                                <span><strong>Storage:</strong> 512GB SSD</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Software Available */}
                                    <div className='bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-200'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>Software Available</h3>
                                        <div className='flex flex-wrap gap-2'>
                                            {['Java SE Development Kit', 'NetBeans IDE', 'Python', 'R', 'Oracle 10g', 'MATLAB', 'Turnitin', 'Anaconda', 'Apache Web Server', 'BASH', 'Code Blocks'].map((software, index) => (
                                                <span key={index} className='px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium'>
                                                    {software}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Ubiquitous Computing Lab */}
                    <AnimatedCard delay={0.6}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div>
                                    <div className='flex items-center mb-4'>
                                        <div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
                                            <Globe className='w-6 h-6 text-white' />
                                        </div>
                                        <h2 className='text-2xl font-bold text-gray-900'>Ubiquitous Computing Lab</h2>
                                    </div>
                                    <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                        <p className='text-base mb-4'>
                                            Numerous computing domains are the focus of the ubiquitous computing lab. The goal of this lab is to carry out computer science experiments that assist students in solving challenging computing problems. The objective is to investigate how diverse technologies like IoT, Data Analytics, and Embedded Systems may be applied in many fields, and environments so they can interact with one another, with minimal human effort to complete tasks.
                                        </p>
                                    </div>

                                    {/* System Configuration */}
                                    <div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200 mb-4'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>System Configuration</h3>
                                        <div className='space-y-2 text-sm text-gray-700'>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-indigo-500 rounded-full mr-3'></div>
                                                <span><strong>12 Systems:</strong> Windows 10 Pro, i5 Gen, 8GB RAM, NVIDIA GT610 (4GB), 512GB SSD</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-indigo-500 rounded-full mr-3'></div>
                                                <span><strong>18 Systems:</strong> 18.5" Screen, i5 Processor, 16GB RAM, 500GB SSD</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Software Available */}
                                    <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>Software Available</h3>
                                        <div className='flex flex-wrap gap-2'>
                                            {['Jupiter Notebook', 'Postgres SQL', 'Tableau', 'Power BI', 'VMware', 'Parrot OS', 'Cyber Ghost', 'Active Directory Explorer', 'NetBIOS', 'NetScan', 'Nessus', 'System Hacking Tools'].map((software, index) => (
                                                <span key={index} className='px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium'>
                                                    {software}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300'>
                                        <div className='text-center'>
                                            <Globe className='w-16 h-16 text-gray-400 mx-auto mb-3' />
                                            <p className='text-gray-500 font-medium'>Ubiquitous Computing Lab Photo</p>
                                            <p className='text-gray-400 text-sm'>To be uploaded</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Data Structures & Algorithm Lab */}
                    <AnimatedCard delay={0.7}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div className='order-2 lg:order-1 flex items-center justify-center'>
                                    <div className='w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300'>
                                        <div className='text-center'>
                                            <TreePine className='w-16 h-16 text-gray-400 mx-auto mb-3' />
                                            <p className='text-gray-500 font-medium'>Data Structures & Algorithm Lab Photo</p>
                                            <p className='text-gray-400 text-sm'>To be uploaded</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='order-1 lg:order-2'>
                                    <div className='flex items-center mb-4'>
                                        <div className='w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mr-3'>
                                            <TreePine className='w-6 h-6 text-white' />
                                        </div>
                                        <h2 className='text-2xl font-bold text-gray-900'>Data Structures & Algorithm Lab</h2>
                                    </div>
                                    <div className='prose max-w-none text-gray-700 leading-relaxed mb-6'>
                                        <p className='text-base mb-4'>
                                            In the Data Structures and Algorithms lab, students engage in practical exercises aimed at implementing a diverse range of data structures such as arrays, linked lists, trees, graphs, and hash tables. They also delve into algorithmic design techniques including sorting, searching, and graph traversal.
                                        </p>
                                        <p className='text-base'>
                                            Through these activities, students acquire a thorough comprehension of the underlying fundamental principles for efficient data organization and algorithmic optimization, preparing them to tackle complex computational challenges in various domains such as software development, artificial intelligence, and data science.
                                        </p>
                                    </div>

                                    {/* System Configuration */}
                                    <div className='bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-200 mb-4'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>System Configuration</h3>
                                        <div className='space-y-2 text-sm text-gray-700'>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-teal-500 rounded-full mr-3'></div>
                                                <span><strong>System:</strong> HP440 G9 i7-13700</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-teal-500 rounded-full mr-3'></div>
                                                <span><strong>RAM:</strong> 16GB DDR4</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-2 h-2 bg-teal-500 rounded-full mr-3'></div>
                                                <span><strong>Storage:</strong> 512GB SSD</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Software Available */}
                                    <div className='bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200'>
                                        <h3 className='text-lg font-bold text-gray-900 mb-3'>Software Available</h3>
                                        <div className='flex flex-wrap gap-2'>
                                            {['Java', 'C/C++', 'Python', 'MATLAB'].map((software, index) => (
                                                <span key={index} className='px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium'>
                                                    {software}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Lab Statistics */}
                    <AnimatedCard delay={0.8}>
                        <div className='bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center mr-3'>
                                    <BarChart3 className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Lab Statistics</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                {[
                                    {
                                        title: 'Total Labs',
                                        value: '6',
                                        icon: <Monitor className='w-8 h-8 text-blue-600' />,
                                        color: 'from-blue-400 to-blue-600'
                                    },
                                    {
                                        title: 'Total Systems',
                                        value: '150+',
                                        icon: <Computer className='w-8 h-8 text-green-600' />,
                                        color: 'from-green-400 to-green-600'
                                    },
                                    {
                                        title: 'Software Packages',
                                        value: '50+',
                                        icon: <Package className='w-8 h-8 text-purple-600' />,
                                        color: 'from-purple-400 to-purple-600'
                                    },
                                    {
                                        title: 'Students Capacity',
                                        value: '400+',
                                        icon: <Users className='w-8 h-8 text-orange-600' />,
                                        color: 'from-orange-400 to-orange-600'
                                    }
                                ].map((stat, index) => (
                                    <div key={index} className='bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300'>
                                        <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                            {stat.icon}
                                        </div>
                                        <h3 className='text-2xl font-bold text-gray-900 mb-2'>{stat.value}</h3>
                                        <p className='text-gray-600 font-medium'>{stat.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedCard>
                </div>
            );
        }
        
        // If facilities section is selected with industry-supported-labs subsection
        if (activeSection === 'facilities' && activeSubSection === 'industry-supported-labs') {
            return (
                <div className='space-y-8'>
                    {/* Industry Supported Labs Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                <Factory className='w-8 h-8 text-white' />
                            </div>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Industry Supported Lab</h1>
                            <p className='text-indigo-600 font-medium'>Industry-Academia Partnership for Skill Development</p>
                        </div>
                    </motion.div>

                    {/* MoU Overview */}
                    <AnimatedCard delay={0.1}>
                        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Building2 className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Partnership Overview</h2>
                            </div>
                            <div className='prose max-w-none text-gray-700 leading-relaxed'>
                                <p className='text-base mb-4'>
                                    The Department of Computer Science and Engineering has signed an MoU with <strong>Winnovation Education Services Pvt Ltd, Noida</strong> in 2023, a pioneer education and training services company creating employable engineers for the industry.
                                </p>
                                <p className='text-base mb-4'>
                                    They work closely with industry, institutes and students and provide training, placement guidance, internships, corporate grooming and personality development solutions on the campus. They have partnered with <strong>SOTI India, Kratikal Tech Pvt. Ltd., Satcom Infotech Pvt Ltd, Telecommunications Consultants India, Orient Technologies, Chipsoft India</strong>, and other <strong>80+ corporates</strong>.
                                </p>
                                <p className='text-base mb-4'>
                                    They Enable Corporates to hire from a trained pool of talented certified manpower on emerging technologies. It is a <strong>360° proven and tested-train hiring model</strong>.
                                </p>
                            </div>

                            {/* Partnership Highlights */}
                            <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 mt-6'>
                                <h3 className='text-lg font-bold text-gray-900 mb-3'>Partnership Highlights</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                    <div className='flex items-center'>
                                        <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                                        <span className='text-sm text-gray-700'>Training & Placement Guidance</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-2 h-2 bg-purple-500 rounded-full mr-2'></div>
                                        <span className='text-sm text-gray-700'>Internship Programs</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                                        <span className='text-sm text-gray-700'>Corporate Grooming</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-2 h-2 bg-orange-500 rounded-full mr-2'></div>
                                        <span className='text-sm text-gray-700'>Personality Development</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-2 h-2 bg-teal-500 rounded-full mr-2'></div>
                                        <span className='text-sm text-gray-700'>80+ Corporate Partners</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-2 h-2 bg-red-500 rounded-full mr-2'></div>
                                        <span className='text-sm text-gray-700'>360° Train-Hire Model</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Lab Staff */}
                    <AnimatedCard delay={0.2}>
                        <div className='bg-white rounded-xl p-6 border border-gray-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Users className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Lab Staff</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200'>
                                    <div className='flex items-center mb-4'>
                                        <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
                                            <UserCheck className='w-6 h-6 text-blue-600' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-bold text-gray-900'>Lab/Cell Incharge</h3>
                                            <p className='text-blue-600 font-medium'>Ms. Vishakha Sehdev Verma</p>
                                        </div>
                                    </div>
                                    <div className='bg-white/70 rounded-lg p-3'>
                                        <p className='text-sm text-gray-700'>
                                            Responsible for overseeing lab operations, coordinating with industry partners, and ensuring quality training delivery.
                                        </p>
                                    </div>
                                </div>

                                <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200'>
                                    <div className='flex items-center mb-4'>
                                        <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3'>
                                            <Wrench className='w-6 h-6 text-green-600' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-bold text-gray-900'>Lab Technician</h3>
                                            <p className='text-green-600 font-medium'>Ms. Ekta Sharma</p>
                                        </div>
                                    </div>
                                    <div className='bg-white/70 rounded-lg p-3'>
                                        <p className='text-sm text-gray-700'>
                                            Manages lab equipment, provides technical support, and assists students with hands-on training activities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* System Configuration */}
                    <AnimatedCard delay={0.3}>
                        <div className='bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Monitor className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>System Configuration</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='bg-white rounded-lg p-6 border border-gray-200'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center'>
                                        <Computer className='w-5 h-5 text-blue-600 mr-2' />
                                        High-Performance Systems (12 units)
                                    </h3>
                                    <div className='space-y-3'>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>Operating System</span>
                                            <span className='text-sm text-gray-900 font-semibold'>Windows 10 Pro</span>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>Processor</span>
                                            <span className='text-sm text-gray-900 font-semibold'>Intel i5 Gen</span>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>RAM</span>
                                            <span className='text-sm text-gray-900 font-semibold'>8GB</span>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>Graphics Card</span>
                                            <span className='text-sm text-gray-900 font-semibold'>NVIDIA GT610 (4GB)</span>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>Storage</span>
                                            <span className='text-sm text-gray-900 font-semibold'>SSD 512GB</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white rounded-lg p-6 border border-gray-200'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center'>
                                        <Monitor className='w-5 h-5 text-green-600 mr-2' />
                                        Standard Systems (18 units)
                                    </h3>
                                    <div className='space-y-3'>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>Screen Size</span>
                                            <span className='text-sm text-gray-900 font-semibold'>18.5" Display</span>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>Processor</span>
                                            <span className='text-sm text-gray-900 font-semibold'>Intel i5</span>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>RAM</span>
                                            <span className='text-sm text-gray-900 font-semibold'>16GB</span>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-sm font-medium text-gray-700'>Storage</span>
                                            <span className='text-sm text-gray-900 font-semibold'>SSD 500GB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Software Available */}
                    <AnimatedCard delay={0.4}>
                        <div className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Code className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Software Available</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='bg-white rounded-lg p-6 border border-gray-200'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center'>
                                        <BarChart3 className='w-5 h-5 text-blue-600 mr-2' />
                                        Data Science Tools
                                    </h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {['Jupiter Notebook', 'Postgres SQL', 'Tableau', 'Power BI'].map((software, index) => (
                                            <span key={index} className='px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                                                {software}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className='bg-white rounded-lg p-6 border border-gray-200'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center'>
                                        <Shield className='w-5 h-5 text-red-600 mr-2' />
                                        Cybersecurity Tools
                                    </h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {['VM ware', 'Parrot OS', 'Cyber Ghost', 'Active Directory Explorer', 'Net bios', 'Net Scan', 'Nessus', 'System Hacking Tools', 'Malware4 Threats'].map((software, index) => (
                                            <span key={index} className='px-3 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium'>
                                                {software}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='mt-6 bg-white rounded-lg p-4 border border-gray-200'>
                                <p className='text-sm text-gray-600 text-center'>
                                    <span className='font-medium'>Additional Software:</span> The lab is equipped with many more specialized tools and software packages for comprehensive training in Data Science and Cybersecurity domains.
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>

                    {/* Key Benefits */}
                    <AnimatedCard delay={0.5}>
                        <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200'>
                            <div className='flex items-center mb-6'>
                                <div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
                                    <Trophy className='w-6 h-6 text-white' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900'>Key Benefits</h2>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[
                                    {
                                        icon: <Briefcase className='w-8 h-8 text-blue-600' />,
                                        title: 'Industry-Ready Skills',
                                        description: 'Students gain practical experience with industry-standard tools and technologies used in professional environments.',
                                        color: 'from-blue-50 to-blue-100'
                                    },
                                    {
                                        icon: <Users className='w-8 h-8 text-green-600' />,
                                        title: 'Placement Support',
                                        description: 'Direct access to 80+ corporate partners for internships, training, and placement opportunities.',
                                        color: 'from-green-50 to-green-100'
                                    },
                                    {
                                        icon: <Target className='w-8 h-8 text-purple-600' />,
                                        title: 'Skill Certification',
                                        description: 'Industry-recognized certifications that enhance employability and career prospects.',
                                        color: 'from-purple-50 to-purple-100'
                                    },
                                    {
                                        icon: <Lightbulb className='w-8 h-8 text-orange-600' />,
                                        title: 'Corporate Grooming',
                                        description: 'Comprehensive personality development and professional grooming programs.',
                                        color: 'from-orange-50 to-orange-100'
                                    },
                                    {
                                        icon: <GraduationCap className='w-8 h-8 text-teal-600' />,
                                        title: 'Practical Training',
                                        description: 'Hands-on experience with real-world projects and industry-relevant case studies.',
                                        color: 'from-teal-50 to-teal-100'
                                    },
                                    {
                                        icon: <Building2 className='w-8 h-8 text-indigo-600' />,
                                        title: 'Industry Mentorship',
                                        description: 'Access to experienced industry professionals for guidance and mentorship.',
                                        color: 'from-indigo-50 to-indigo-100'
                                    }
                                ].map((benefit, index) => (
                                    <div key={index} className={`bg-gradient-to-br ${benefit.color} rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300`}>
                                        <div className='flex items-center mb-4'>
                                            <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm'>
                                                {benefit.icon}
                                            </div>
                                            <h3 className='text-lg font-bold text-gray-900'>{benefit.title}</h3>
                                        </div>
                                        <p className='text-gray-700 text-sm leading-relaxed'>{benefit.description}</p>
                                    </div>
                                ))}
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