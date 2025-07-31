'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
	Code,
	Users,
	BookOpen,
	GraduationCap,
	Building2,
	Star,
	ChevronRight,
	ChevronLeft,
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
	Package,
	GitBranch,
	Terminal,
	Layers,
	Rocket,
	Heart,
	Link,
	Mail,
	Cpu,
	Brain,
	Smartphone,
	Download,
	Sun,
	Snowflake,
	Info,
	HelpCircle,
	Archive
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
const DepartmentHighlightsCarousel = ({
	isHovered,
	setIsHovered
}: {
	isHovered: boolean;
	setIsHovered: (value: boolean) => void;
}) => {

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

	const renderHighlightCard = (highlight: typeof highlights[0], index: number) => (
		<div
			key={`highlight-${index}`}
			className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex-shrink-0 w-72 sm:w-80 mx-2 sm:mx-3'
			style={{ minWidth: '280px' }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>

			{/* Image Section */}
			<div className='relative h-48 bg-gray-200 overflow-hidden'>
				<Image
					src={highlight.image}
					alt={highlight.title}
					fill
					className='object-cover transition-transform duration-300 group-hover:scale-110'
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
const ShiningStarsSection = ({
	activeStudent,
	setActiveStudent,
	isHovered,
	setIsHovered
}: {
	activeStudent: number;
	setActiveStudent: (value: number) => void;
	isHovered: boolean;
	setIsHovered: (value: boolean) => void;
}) => {

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
				setActiveStudent((activeStudent + 1) % students.length);
			}, 4000); // Change every 4 seconds

			return () => clearInterval(interval);
		}
	}, [isHovered, students.length, setActiveStudent, activeStudent]); return (
		<div className='space-y-8'>
			{/* Student Details Display */}
			<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{/* Student Photo and Basic Info */}
				<div className='lg:col-span-1'>
					<div className='text-center'>
						<div className='relative w-40 h-40 mx-auto mb-4'>
							<Image
								src={currentStudent.image}
								alt={currentStudent.name}
								width={160}
								height={160}
								className="w-full h-full object-cover rounded-full"
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
						className={`relative transition-all duration-300 flex-shrink-0 ${index === activeStudent
								? 'scale-110'
								: 'scale-100 hover:scale-105'
							}`}>
						<div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg border-3 transition-all duration-300 ${index === activeStudent
								? 'border-blue-500'
								: 'border-blue-300 hover:border-blue-400'
							}`}>
							<Image
								src={student.image}
								alt={student.name}
								width={64}
								height={64}
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
							<Image
								src={glimpse.image}
								alt={glimpse.alt}
								width={320}
								height={256}
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

// Program Pictures Carousel Component
const ProgramPicturesCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const programPictures = [
		{
			id: 1,
			title: 'Tech Symposium 2024',
			image: '/events/img1.png',
			description: 'Students showcasing their innovative projects at the annual tech symposium',
			date: 'March 2024',
			event: 'Technical Event'
		},
		{
			id: 2,
			title: 'Hackathon Winners',
			image: '/events/img2.png',
			description: 'Celebrating the winning teams of our 48-hour coding hackathon',
			date: 'February 2024',
			event: 'Competition'
		},
		{
			id: 3,
			title: 'Industry Workshop',
			image: '/events/img3.png',
			description: 'Students participating in hands-on workshop with industry experts',
			date: 'January 2024',
			event: 'Workshop'
		},
		{
			id: 4,
			title: 'Project Exhibition',
			image: '/events/img1.png',
			description: 'Final year students presenting their capstone projects',
			date: 'December 2023',
			event: 'Exhibition'
		},
		{
			id: 5,
			title: 'Coding Competition',
			image: '/events/img2.png',
			description: 'Inter-college programming competition participants',
			date: 'November 2023',
			event: 'Competition'
		}
	];

	// Auto-slide functionality
	useEffect(() => {
		if (!isHovered) {
			const interval = setInterval(() => {
				setCurrentSlide((prev) => (prev + 1) % programPictures.length);
			}, 4000);
			return () => clearInterval(interval);
		}
	}, [isHovered, programPictures.length]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % programPictures.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + programPictures.length) % programPictures.length);
	};

	return (
		<div
			className='relative h-80 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl overflow-hidden border border-blue-200'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Carousel Images */}
			<div className='relative w-full h-full'>
				{programPictures.map((picture, index) => (
					<div
						key={picture.id}
						className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
							}`}
					>
						<Image
							src={picture.image}
							alt={picture.title}
							fill
							className='object-cover'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

						{/* Content Overlay */}
						<div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
							<div className='flex items-center gap-2 mb-2'>
								<span className='px-3 py-1 bg-blue-600/80 rounded-full text-sm font-medium'>
									{picture.event}
								</span>
								<span className='px-3 py-1 bg-gray-900/60 rounded-full text-sm'>
									{picture.date}
								</span>
							</div>
							<h3 className='text-xl font-bold mb-2'>{picture.title}</h3>
							<p className='text-white/90 text-sm leading-relaxed'>
								{picture.description}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className='absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300'
			>
				<ChevronLeft className='w-5 h-5' />
			</button>
			<button
				onClick={nextSlide}
				className='absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300'
			>
				<ChevronRight className='w-5 h-5' />
			</button>

			{/* Slide Indicators */}
			<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
				{programPictures.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
								? 'bg-white w-6'
								: 'bg-white/50 hover:bg-white/75'
							}`}
					/>
				))}
			</div>
		</div>
	);
};

// CSE Toppers Carousel Component
const CSEToppersCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const toppers = [
		{
			id: 1,
			name: 'Arjun Sharma',
			image: '/events/img1.png',
			cgpa: '9.85',
			year: '2024',
			achievement: 'Department Topper',
			company: 'Google',
			package: '₹45 LPA',
			specialization: 'Machine Learning & AI'
		},
		{
			id: 2,
			name: 'Priya Patel',
			image: '/events/img2.png',
			cgpa: '9.82',
			year: '2024',
			achievement: 'University Rank 2',
			company: 'Microsoft',
			package: '₹42 LPA',
			specialization: 'Cloud Computing'
		},
		{
			id: 3,
			name: 'Raj Kumar',
			image: '/events/img3.png',
			cgpa: '9.78',
			year: '2024',
			achievement: 'Gold Medalist',
			company: 'Amazon',
			package: '₹38 LPA',
			specialization: 'Data Science'
		},
		{
			id: 4,
			name: 'Sneha Gupta',
			image: '/events/img1.png',
			cgpa: '9.75',
			year: '2023',
			achievement: 'Department Topper',
			company: 'Adobe',
			package: '₹35 LPA',
			specialization: 'Full Stack Development'
		},
		{
			id: 5,
			name: 'Vikram Singh',
			image: '/events/img2.png',
			cgpa: '9.72',
			year: '2023',
			achievement: 'University Rank 3',
			company: 'Oracle',
			package: '₹32 LPA',
			specialization: 'Database Systems'
		}
	];

	// Duplicate toppers for infinite scroll effect
	const duplicatedToppers = [...toppers, ...toppers];

	// Auto-slide functionality - moves right to left continuously
	useEffect(() => {
		if (!isHovered) {
			const interval = setInterval(() => {
				setCurrentSlide((prev) => {
					const next = prev + 1;
					// Reset to beginning when we've scrolled through all original items
					return next >= toppers.length ? 0 : next;
				});
			}, 3000); // Faster auto-scroll (3 seconds)
			return () => clearInterval(interval);
		}
	}, [isHovered, toppers.length]);

	const nextSlide = () => {
		setCurrentSlide((prev) => {
			const next = prev + 1;
			return next >= toppers.length ? 0 : next;
		});
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + toppers.length) % toppers.length);
	};

	return (
		<div
			className='relative overflow-hidden'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.div
				className='flex gap-8'
				animate={{
					x: `${-currentSlide * (100 / duplicatedToppers.length) * duplicatedToppers.length / 5}%`
				}}
				transition={{
					duration: 0.8,
					ease: "easeInOut"
				}}
				style={{ width: `${duplicatedToppers.length * 20}%` }}
			>
				{duplicatedToppers.map((topper, index) => (
					<motion.div
						key={`${topper.id}-${index}`}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className='text-center group cursor-pointer flex-shrink-0'
						style={{ width: `${100 / duplicatedToppers.length}%` }}
					>
						<div className='relative w-32 h-32 mx-auto mb-3'>
							<Image
								src={topper.image}
								alt={topper.name}
								fill
								className='rounded-full object-cover border-4 border-yellow-300 group-hover:border-yellow-500 transition-all duration-300 group-hover:scale-105'
								sizes='128px'
							/>
						</div>
						<h3 className='text-lg font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors duration-300'>{topper.name}</h3>
						<p className='text-yellow-600 font-medium text-sm'>{topper.achievement}</p>
					</motion.div>
				))}
			</motion.div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white hover:bg-yellow-600 transition-all duration-300 shadow-lg z-10'
			>
				<ChevronLeft className='w-5 h-5' />
			</button>
			<button
				onClick={nextSlide}
				className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white hover:bg-yellow-600 transition-all duration-300 shadow-lg z-10'
			>
				<ChevronRight className='w-5 h-5' />
			</button>

			{/* Slide Indicators */}
			<div className='flex justify-center mt-6 space-x-2'>
				{toppers.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
								? 'bg-yellow-500 w-8'
								: 'bg-yellow-300 hover:bg-yellow-400'
							}`}
					/>
				))}
			</div>
		</div>
	);
};

// Alumni Testimonials Carousel Component
const AlumniTestimonialsCarousel: React.FC<{ isHovered: boolean, setIsHovered: (hovered: boolean) => void }> = ({ isHovered, setIsHovered }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const alumniTestimonials = [
		{
			name: "Rajat Mudgil",
			batch: "2020-24",
			company: "Amazon",
			role: "Software Development Engineer",
			testimonial: "I am incredibly grateful for the education and experiences I gained at BPIT. The rigorous curriculum, dedicated faculty, and numerous opportunities for hands-on learning prepared me exceptionally well for my career in the tech industry. The college's emphasis on both theoretical knowledge and practical skills gave me the confidence to tackle complex challenges in my role as a Software Development Engineer at Amazon. The supportive environment and cutting-edge resources at BPIT truly made a difference in shaping my professional journey. I would highly recommend BPIT to anyone looking to build a strong foundation in computer science and engineering."
		},
		{
			name: "Tuhin Kalia",
			batch: "2019-23",
			company: "Google",
			role: "Product Manager",
			testimonial: "My time at BPIT was transformative in every sense. The college doesn't just focus on technical education but also nurtures leadership qualities and innovative thinking. The faculty members are not only experts in their fields but also mentors who guide you beyond academics. The diverse project opportunities and industry collaborations provided me with real-world exposure that proved invaluable during my transition to Google. The analytical and problem-solving skills I developed at BPIT are what I use every day as a Product Manager. BPIT gave me the tools and confidence to pursue my dreams in the tech world."
		},
		{
			name: "Neha Bedi",
			batch: "2018-22",
			company: "Microsoft",
			role: "Senior Software Engineer",
			testimonial: "BPIT has been instrumental in shaping my career and personal growth. The college provides an excellent blend of academic rigor and practical exposure through internships, projects, and industry partnerships. The faculty's commitment to student success is evident in their personalized attention and continuous support. The state-of-the-art labs and research opportunities allowed me to explore emerging technologies and develop innovative solutions. Today, as a Senior Software Engineer at Microsoft, I draw upon the strong foundation in computer science principles and the collaborative spirit I learned at BPIT. I am proud to be an alumna of such a prestigious institution."
		}
	];

	useEffect(() => {
		if (!isHovered) {
			const interval = setInterval(() => {
				setCurrentSlide((prev) => (prev + 1) % alumniTestimonials.length);
			}, 4000);
			return () => clearInterval(interval);
		}
	}, [isHovered, alumniTestimonials.length]);

	return (
		<div
			className="mt-6 relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentSlide}
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
					className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 shadow-lg"
				>
					<div className="flex flex-col space-y-6">
						{/* Testimonial Content */}
						<div className="relative">
							<div className="text-4xl text-blue-400 mb-4 font-serif">&ldquo;</div>
							<p className="text-gray-700 text-lg leading-relaxed italic">
								{alumniTestimonials[currentSlide].testimonial}
							</p>
							<div className="text-4xl text-blue-400 mt-4 font-serif text-right">&rdquo;</div>
						</div>

						{/* Alumni Information */}
						<div className="border-t border-blue-200 pt-6">
							<div className="flex items-center justify-between">
								<div>
									<h4 className="text-xl font-bold text-gray-800">
										{alumniTestimonials[currentSlide].name}
									</h4>
									<p className="text-blue-600 font-semibold">
										{alumniTestimonials[currentSlide].role}
									</p>
									<p className="text-gray-600">
										{alumniTestimonials[currentSlide].company} • Batch {alumniTestimonials[currentSlide].batch}
									</p>
								</div>
								<div className="hidden md:block">
									<div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
										{alumniTestimonials[currentSlide].name.split(' ').map(n => n[0]).join('')}
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Carousel Indicators */}
			<div className="flex justify-center mt-6 space-x-2">
				{alumniTestimonials.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
								? 'bg-blue-500 scale-125'
								: 'bg-blue-200 hover:bg-blue-300'
							}`}
					/>
				))}
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={() => setCurrentSlide((prev) => prev === 0 ? alumniTestimonials.length - 1 : prev - 1)}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
			>
				<ChevronLeft size={20} />
			</button>
			<button
				onClick={() => setCurrentSlide((prev) => (prev + 1) % alumniTestimonials.length)}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
			>
				<ChevronRight size={20} />
			</button>
		</div>
	);
};

const CSEDepartmentPage = () => {
	const [activeSection, setActiveSection] = useState('home');
	const [activeSubSection, setActiveSubSection] = useState('');
	const [expandedSections, setExpandedSections] = useState<string[]>([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [selectedYear, setSelectedYear] = useState('2023-24');
	const [selectedAcademicYear, setSelectedAcademicYear] = useState<'2024-25' | '2023-24'>('2024-25');
	const [selectedProjectYear, setSelectedProjectYear] = useState<'2021-25' | '2020-24' | '2019-23' | '2018-22' | '2017-21'>('2021-25');
	const [selectedWorkshopYear, setSelectedWorkshopYear] = useState<'2022-23' | '2021-22' | '2020-21' | 'Conferences' | 'FDP'>('2022-23');
	const [selectedPublicationType, setSelectedPublicationType] = useState<'Journal 2024-25' | 'Journal 2023-24' | 'Journal 2022-23' | 'Conference 2024-25' | 'Conference 2023-24' | 'Conference 2022-23' | 'Book Chapter 2023-24' | 'Book Chapter 2022-23' | 'Patents 2023-24'>('Journal 2024-25');
	const [selectedStudentYear, setSelectedStudentYear] = useState<'2023-24' | '2022-23' | '2021-22' | '2020-21'>('2023-24');
	const [selectedPatentYear, setSelectedPatentYear] = useState<'2023-24' | '2022-23'>('2023-24');
	const [selectedPlacementYear, setSelectedPlacementYear] = useState<'2020-24' | '2019-23' | '2018-22' | '2017-21'>('2020-24');
	const [selectedResultYear, setSelectedResultYear] = useState<'2023-24' | '2022-23' | 'Previous'>('2023-24');
	const [selectedResultSemester, setSelectedResultSemester] = useState<'Odd' | 'Even'>('Odd');

	// States for carousel components
	const [highlightsHovered, setHighlightsHovered] = useState(false);
	const [activeStudent, setActiveStudent] = useState(0);
	const [starsHovered, setStarsHovered] = useState(false);
	const [alumniHovered, setAlumniHovered] = useState(false);

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
					icon: <GitBranch className='w-4 h-4' />
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
				}
			]
		},
		{
			id: 'alumni',
			title: 'Alumni',
			icon: <Users2 className='w-5 h-5' />,
			hasContent: true
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
				},
				{
					id: 'patents',
					title: 'Patents',
					icon: <Shield className='w-4 h-4' />
				},
				{
					id: 'magazine',
					title: 'Magazine',
					icon: <Camera className='w-4 h-4' />
				},
				{
					id: 'newsletter',
					title: 'News‑Letter',
					icon: <Newspaper className='w-4 h-4' />
				}
			]
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
									<div className='w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-3 p-1'>                                        <Image
										src="/achal-sir.png"
										alt="Dr. ACHAL KAUSHIK"
										width={80}
										height={80}
										className='w-full h-full rounded-full object-cover'
										onError={(e) => {
											e.currentTarget.style.display = 'none';
											const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
											if (nextSibling) {
												nextSibling.style.display = 'flex';
											}
										}}
									/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center' style={{ display: 'none' }}>
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
									<div className='w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mx-auto mb-3 p-1'>                                        <Image
										src="/faculty/faculty-2.jpg"
										alt="Dr. Faculty Name"
										width={80}
										height={80}
										className='w-full h-full rounded-full object-cover'
										onError={(e) => {
											e.currentTarget.style.display = 'none';
											const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
											if (nextSibling) {
												nextSibling.style.display = 'flex';
											}
										}}
									/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center' style={{ display: 'none' }}>
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
									<div className='w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-3 p-1'>                                        <Image
										src="/faculty/faculty-3.jpg"
										alt="Dr. Faculty Name"
										width={80}
										height={80}
										className='w-full h-full rounded-full object-cover'
										onError={(e) => {
											e.currentTarget.style.display = 'none';
											const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
											if (nextSibling) {
												nextSibling.style.display = 'flex';
											}
										}}
									/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center' style={{ display: 'none' }}>
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
									<div className='w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mx-auto mb-3 p-1'>                                        <Image
										src="/faculty/faculty-4.jpg"
										alt="Prof. Faculty Name"
										width={80}
										height={80}
										className='w-full h-full rounded-full object-cover'
										onError={(e) => {
											e.currentTarget.style.display = 'none';
											const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
											if (nextSibling) {
												nextSibling.style.display = 'flex';
											}
										}}
									/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center' style={{ display: 'none' }}>
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
									<div className='w-20 h-20 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full mx-auto mb-3 p-1'>                                        <Image
										src="/faculty/faculty-5.jpg"
										alt="Dr. Faculty Name"
										width={80}
										height={80}
										className='w-full h-full rounded-full object-cover'
										onError={(e) => {
											e.currentTarget.style.display = 'none';
											const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
											if (nextSibling) {
												nextSibling.style.display = 'flex';
											}
										}}
									/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center' style={{ display: 'none' }}>
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
									<div className='w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full mx-auto mb-3 p-1'>                                        <Image
										src="/faculty/faculty-6.jpg"
										alt="Dr. Faculty Name"
										width={80}
										height={80}
										className='w-full h-full rounded-full object-cover'
										onError={(e) => {
											e.currentTarget.style.display = 'none';
											const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
											if (nextSibling) {
												nextSibling.style.display = 'flex';
											}
										}}
									/>
										<div className='w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center' style={{ display: 'none' }}>
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
									className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedYear === '2023-24'
											? 'bg-emerald-600 text-white'
											: 'text-gray-600 hover:text-gray-900'
										}`}
								>
									2023-24
								</button>
								<button
									onClick={() => setSelectedYear('2022-23')}
									className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedYear === '2022-23'
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
														const getCategoryColor = (category: string) => {
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

														const calculateDuration = (start: string, end: string) => {
															const startDate = new Date(start.split('-').reverse().join('-'));
															const endDate = new Date(end.split('-').reverse().join('-'));
															const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
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
														const getCategoryColor = (category: string) => {
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

														const calculateDuration = (start: string, end: string) => {
															const startDate = new Date(start.split('-').reverse().join('-'));
															const endDate = new Date(end.split('-').reverse().join('-'));
															const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
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
														const getCategoryColor = (category: string) => {
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

														const calculateDuration = (start: string, end: string) => {
															const startDate = new Date(start.split('-').reverse().join('-'));
															const endDate = new Date(end.split('-').reverse().join('-'));
															const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
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
														const getCategoryColor = (category: string) => {
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

														const calculateDuration = (start: string, end: string) => {
															const startDate = new Date(start.split('-').reverse().join('-'));
															const endDate = new Date(end.split('-').reverse().join('-'));
															const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
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
														<li>• Freshers&apos; Orientation: Aug 10, 2024</li>
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
									The faculty members apply any of these methods in their respective subjects to make their teaching more interactive and increases the students&apos; interest in the class.
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
			);
		}

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
									The Lab is equipped with the facility for Robotics. e-Yantra Robotic Lab is a MHRD funded project initiated by IIT Bombay under &quot;e-Yantra Lab Setup Initiative (eLSI)&quot; under which colleges are encouraged to setup robotics labs.
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
												<span><strong>18 Systems:</strong> 18.5&quot; Screen, i5 Processor, 16GB RAM, 500GB SSD</span>
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

		// If facilities section is selected with foss-cell subsection
		if (activeSection === 'facilities' && activeSubSection === 'foss-cell') {
			return (
				<div className='space-y-8'>
					{/* FOSS Cell Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<GitBranch className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>FOSS Cell - Free & Open Source Software</h1>
							<p className='text-green-600 font-medium'>Promoting open-source culture and collaboration</p>
						</div>
					</motion.div>

					{/* Introduction */}
					<AnimatedCard delay={0.1}>
						<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
									<GitBranch className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>What is FOSS Cell?</h2>
							</div>
							<p className='text-gray-700 leading-relaxed'>
								The Free and Open Source Software (FOSS) Cell is a dedicated initiative within our Computer Science & Engineering department that promotes the use, development, and contribution to open-source software projects. Our cell serves as a hub for students and faculty to collaborate on open-source projects, learn modern development practices, and contribute to the global open-source community.
							</p>
						</div>
					</AnimatedCard>

					{/* Objectives */}
					<AnimatedCard delay={0.2}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
									<Target className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Our Objectives</h2>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{[
									"Promote awareness about Free and Open Source Software",
									"Encourage students to contribute to open-source projects",
									"Develop coding skills through collaborative projects",
									"Foster a culture of knowledge sharing and community building",
									"Organize workshops and seminars on open-source technologies",
									"Support students in participating in global open-source programs"
								].map((objective, index) => (
									<div key={index} className='flex items-start'>
										<div className='w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
										<span className='text-gray-700'>{objective}</span>
									</div>
								))}
							</div>
						</div>
					</AnimatedCard>

					{/* Activities */}
					<AnimatedCard delay={0.3}>
						<div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-3'>
									<Rocket className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Our Activities</h2>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{[
									{
										title: "Code Contribution Drives",
										description: "Regular sessions where students contribute to popular open-source projects",
										color: "from-blue-100 to-blue-200"
									},
									{
										title: "Technical Workshops",
										description: "Hands-on workshops on Git, GitHub, and modern development tools",
										color: "from-green-100 to-green-200"
									},
									{
										title: "Hackathons",
										description: "Organizing and participating in open-source hackathons",
										color: "from-purple-100 to-purple-200"
									},
									{
										title: "Guest Lectures",
										description: "Industry experts sharing insights on open-source development",
										color: "from-orange-100 to-orange-200"
									},
									{
										title: "Project Mentoring",
										description: "Guidance for students starting their open-source journey",
										color: "from-teal-100 to-teal-200"
									},
									{
										title: "Community Building",
										description: "Creating a supportive network of open-source enthusiasts",
										color: "from-pink-100 to-pink-200"
									}
								].map((activity, index) => (
									<div key={index} className={`bg-gradient-to-br ${activity.color} rounded-lg p-4 border border-gray-200`}>
										<h4 className='font-semibold text-gray-900 mb-2'>{activity.title}</h4>
										<p className='text-gray-700 text-sm'>{activity.description}</p>
									</div>
								))}
							</div>
						</div>
					</AnimatedCard>

					{/* Training Programs */}
					<AnimatedCard delay={0.4}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mr-3'>
									<BookOpen className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Training Programs</h2>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-4'>
									<h4 className='font-semibold text-gray-900'>Beginner Level</h4>
									<div className='space-y-2'>
										{[
											"Introduction to Open Source",
											"Git and GitHub Basics",
											"Linux Fundamentals",
											"Command Line Interface",
											"Version Control Systems"
										].map((program, index) => (
											<div key={index} className='flex items-center p-3 bg-blue-50 rounded-lg'>
												<Terminal className='w-4 h-4 text-blue-600 mr-3' />
												<span className='text-gray-700'>{program}</span>
											</div>
										))}
									</div>
								</div>
								<div className='space-y-4'>
									<h4 className='font-semibold text-gray-900'>Advanced Level</h4>
									<div className='space-y-2'>
										{[
											"Contributing to Large Projects",
											"Code Review Best Practices",
											"Open Source Licensing",
											"Community Management",
											"Project Maintenance"
										].map((program, index) => (
											<div key={index} className='flex items-center p-3 bg-green-50 rounded-lg'>
												<Layers className='w-4 h-4 text-green-600 mr-3' />
												<span className='text-gray-700'>{program}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Technologies */}
					<AnimatedCard delay={0.5}>
						<div className='bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center mr-3'>
									<Code className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Technologies We Work With</h2>
							</div>
							<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
								{[
									"Python", "JavaScript", "React", "Node.js", "Django", "Flutter",
									"Docker", "Kubernetes", "Linux", "Git", "PostgreSQL", "MongoDB",
									"TensorFlow", "PyTorch", "OpenCV", "Apache", "Nginx", "Redis",
									"Elasticsearch", "Grafana", "Jenkins", "Ansible", "Terraform", "AWS"
								].map((tech, index) => (
									<div key={index} className='bg-white rounded-lg p-3 text-center border border-gray-200 hover:shadow-md transition-shadow'>
										<span className='text-gray-800 font-medium text-sm'>{tech}</span>
									</div>
								))}
							</div>
						</div>
					</AnimatedCard>

					{/* Achievements */}
					<AnimatedCard delay={0.6}>
						<div className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mr-3'>
									<Trophy className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Our Achievements</h2>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{[
									{
										title: "100+ Students Engaged",
										description: "Successfully onboarded over 100 students into open-source development",
										icon: <Users className='w-6 h-6 text-blue-600' />
									},
									{
										title: "50+ Contributions",
										description: "Our students have made significant contributions to various open-source projects",
										icon: <GitBranch className='w-6 h-6 text-green-600' />
									},
									{
										title: "10+ Workshops Conducted",
										description: "Regular workshops on Git, GitHub, and open-source development practices",
										icon: <BookOpen className='w-6 h-6 text-purple-600' />
									},
									{
										title: "5+ Industry Partnerships",
										description: "Collaborations with tech companies for mentorship and project guidance",
										icon: <Building2 className='w-6 h-6 text-orange-600' />
									}
								].map((achievement, index) => (
									<div key={index} className='bg-white rounded-lg p-4 border border-gray-200'>
										<div className='flex items-center mb-3'>
											<div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3'>
												{achievement.icon}
											</div>
											<h4 className='font-semibold text-gray-900'>{achievement.title}</h4>
										</div>
										<p className='text-gray-700 text-sm'>{achievement.description}</p>
									</div>
								))}
							</div>
						</div>
					</AnimatedCard>

					{/* Get Involved */}
					<AnimatedCard delay={0.7}>
						<div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
									<Heart className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Get Involved</h2>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<h4 className='font-semibold text-gray-900 mb-3'>For Students</h4>
									<div className='space-y-2'>
										{[
											"Join our weekly coding sessions",
											"Participate in open-source projects",
											"Attend workshops and seminars",
											"Contribute to our GitHub organization",
											"Mentor junior students"
										].map((item, index) => (
											<div key={index} className='flex items-center'>
												<div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
												<span className='text-gray-700'>{item}</span>
											</div>
										))}
									</div>
								</div>
								<div>
									<h4 className='font-semibold text-gray-900 mb-3'>For Faculty</h4>
									<div className='space-y-2'>
										{[
											"Guide student projects",
											"Conduct technical workshops",
											"Collaborate on research projects",
											"Connect with industry partners",
											"Promote open-source culture"
										].map((item, index) => (
											<div key={index} className='flex items-center'>
												<div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
												<span className='text-gray-700'>{item}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Contact & Resources */}
					<AnimatedCard delay={0.8}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{/* Contact Information */}
								<div>
									<div className='flex items-center mb-4'>
										<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
											<Mail className='w-6 h-6 text-white' />
										</div>
										<h3 className='text-xl font-bold text-gray-900'>Contact Us</h3>
									</div>
									<div className='space-y-3'>
										<div className='flex items-center'>
											<Mail className='w-4 h-4 text-gray-500 mr-3' />
											<span className='text-gray-700'>fosscel@bpitindia.com</span>
										</div>
										<div className='flex items-center'>
											<MapPin className='w-4 h-4 text-gray-500 mr-3' />
											<span className='text-gray-700'>Computer Science Department, BPIT</span>
										</div>
										<div className='flex items-center'>
											<Clock className='w-4 h-4 text-gray-500 mr-3' />
											<span className='text-gray-700'>Mon-Fri, 9:00 AM - 5:00 PM</span>
										</div>
									</div>
								</div>

								{/* Quick Links */}
								<div>
									<div className='flex items-center mb-4'>
										<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
											<Link className='w-6 h-6 text-white' />
										</div>
										<h3 className='text-xl font-bold text-gray-900'>Quick Links</h3>
									</div>
									<div className='space-y-2'>
										{[
											'GitHub Organization',
											'Discord Community',
											'Project Repository',
											'Contribution Guidelines',
											'Event Calendar'
										].map((link, index) => (
											<a key={index} href="#" className='block text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'>
												{link}
											</a>
										))}
									</div>
								</div>
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
											<span className='text-sm text-gray-900 font-semibold'>18.5&quot; Display</span>
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
												&quot;Welcome to the Department of Computer Science & Engineering. Our department
												is committed to providing quality education and fostering innovation in the
												field of computer science and engineering.&quot;
											</p>
											<p className='text-gray-700 italic mb-3 text-sm'>
												&quot;We strive to create an environment where students can develop their
												technical skills, critical thinking abilities, and professional competencies
												to become successful engineers and leaders in the technology industry.&quot;
											</p>
											<p className='text-gray-700 italic text-sm'>
												&quot;I invite you to explore our programs, research opportunities, and the
												vibrant academic community that makes our department a great place to learn and grow.&quot;
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

							<DepartmentHighlightsCarousel
								isHovered={highlightsHovered}
								setIsHovered={setHighlightsHovered}
							/>
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

							<ShiningStarsSection
								activeStudent={activeStudent}
								setActiveStudent={setActiveStudent}
								isHovered={starsHovered}
								setIsHovered={setStarsHovered}
							/>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// For subsections, get the current key
		const currentKey = activeSection === 'home' ? activeSubSection : activeSection;

		// Handle specific subsections
		if (activeSection === 'home' && activeSubSection === 'vision-mission') {
			return (
				<div className='space-y-8'>
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Eye className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold mb-2'>Vision & Mission</h1>
							<p className='text-blue-100 font-medium'>
								Our guiding principles for excellence in Computer Science & Engineering
							</p>
						</div>
					</motion.div>

					{/* Vision Section */}
					<AnimatedCard delay={0.1}>
						<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4'>
									<Eye className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Our Vision</h2>
							</div>
							<div className='bg-white/80 rounded-lg p-6 border border-blue-100'>
								<p className='text-lg text-gray-700 leading-relaxed'>
									To emerge as a center of excellence, in the field of Computer Science and Engineering & Research,
									by grooming our pupils with strong conceptual knowledge to enable them as a professional and
									researcher for the benefit of society.
								</p>
							</div>
						</div>
					</AnimatedCard>

					{/* Mission Section */}
					<AnimatedCard delay={0.2}>
						<div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4'>
									<Target className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Our Mission</h2>
							</div>
							<div className='bg-white/80 rounded-lg p-6 border border-purple-100'>
								<div className='space-y-4'>
									<div className='flex items-start'>
										<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
										<p className='text-gray-700 leading-relaxed'>
											To inculcate self-motivation among the students, who can find and understand the need of the day.
										</p>
									</div>
									<div className='flex items-start'>
										<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
										<p className='text-gray-700 leading-relaxed'>
											To produce best quality professionals with strong conceptual knowledge and hands-on experience.
										</p>
									</div>
									<div className='flex items-start'>
										<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
										<p className='text-gray-700 leading-relaxed'>
											To enable the students to be technically competent among their peers and serve as ethical software professionals.
										</p>
									</div>
									<div className='flex items-start'>
										<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
										<p className='text-gray-700 leading-relaxed'>
											To facilitate industry interaction exposure for the benefit of the stakeholders.
										</p>
									</div>
									<div className='flex items-start'>
										<div className='w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
										<p className='text-gray-700 leading-relaxed'>
											To motivate faculties and students for continuous improvement of their academic standards with qualitative research.
										</p>
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Impact Section */}
					<AnimatedCard delay={0.3}>
						<div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4'>
									<Trophy className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Our Impact</h2>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								<div className='bg-white/80 rounded-lg p-6 border border-green-100 text-center'>
									<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3'>
										<GraduationCap className='w-6 h-6 text-white' />
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-2'>Quality Education</h3>
									<p className='text-gray-600 text-sm'>
										Comprehensive curriculum with hands-on learning approach
									</p>
								</div>
								<div className='bg-white/80 rounded-lg p-6 border border-green-100 text-center'>
									<div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3'>
										<Users className='w-6 h-6 text-white' />
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-2'>Industry Ready</h3>
									<p className='text-gray-600 text-sm'>
										Students prepared for professional challenges
									</p>
								</div>
								<div className='bg-white/80 rounded-lg p-6 border border-green-100 text-center'>
									<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3'>
										<Lightbulb className='w-6 h-6 text-white' />
									</div>
									<h3 className='text-lg font-bold text-gray-900 mb-2'>Innovation</h3>
									<p className='text-gray-600 text-sm'>
										Fostering research and innovation culture
									</p>
								</div>
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// Handle POs / PEOs / PSOs subsection
		if (activeSection === 'home' && activeSubSection === 'pos-peos-psos') {
			return (
				<div className='space-y-8'>
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Target className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold mb-2'>Program Outcomes & Objectives</h1>
							<p className='text-green-100 font-medium'>
								Comprehensive learning outcomes and educational objectives for CSE program
							</p>
						</div>
					</motion.div>

					{/* Program Outcomes (POs) Section */}
					<AnimatedCard delay={0.1}>
						<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4'>
									<BookOpen className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Program Outcomes (POs)</h2>
							</div>
							<div className='bg-white/80 rounded-lg p-6 border border-blue-100'>
								<p className='text-lg font-semibold text-gray-800 mb-6'>Engineering Graduates will be able to:</p>
								<div className='space-y-4'>
									{[
										{
											title: 'Engineering knowledge',
											description: 'Apply knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.'
										},
										{
											title: 'Problem analysis',
											description: 'Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.'
										},
										{
											title: 'Design/development of solutions',
											description: 'Design solutions for complex engineering problems and design system components or processes that meet specified needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental considerations.'
										},
										{
											title: 'Conduct investigations of complex problems',
											description: 'Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.'
										},
										{
											title: 'Modern tool usage',
											description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.'
										},
										{
											title: 'The engineer and society',
											description: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.'
										},
										{
											title: 'Environment and sustainability',
											description: 'Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.'
										},
										{
											title: 'Ethics',
											description: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.'
										},
										{
											title: 'Individual and team work',
											description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multi-disciplinary settings.'
										},
										{
											title: 'Communication',
											description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.'
										},
										{
											title: 'Project management and finance',
											description: 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one\'s own work, as a member and leader in a team, to manage projects and in multi-disciplinary environments.'
										},
										{
											title: 'Life-long learning',
											description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.'
										}
									].map((po, index) => (
										<div key={index} className='flex items-start'>
											<div className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1 flex-shrink-0'>
												{index + 1}
											</div>
											<div>
												<h3 className='font-semibold text-gray-800 mb-1'>{po.title}:</h3>
												<p className='text-gray-700 leading-relaxed'>{po.description}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Program Educational Objectives (PEOs) Section */}
					<AnimatedCard delay={0.2}>
						<div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4'>
									<GraduationCap className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Program Educational Objectives (PEOs)</h2>
							</div>
							<div className='bg-white/80 rounded-lg p-6 border border-purple-100'>
								<div className='space-y-4'>
									{[
										{
											code: 'PEO1',
											description: 'To promulgate strong foundation in Applied Sciences, Mathematics and Engineering fundamentals.'
										},
										{
											code: 'PEO2',
											description: 'To be able to comprehend, analyze and map the computational logics with real time problems.'
										},
										{
											code: 'PEO3',
											description: 'To provide extensive knowledge to design and build products with innovative solutions for problems using their skills in Computer Science and Engineering field and other related domains.'
										},
										{
											code: 'PEO4',
											description: 'To inculcate attributes such as self-confidence, ethics, teamwork, leadership skills, communication skills for life-long learning.'
										},
										{
											code: 'PEO5',
											description: 'To succeed with excellence as computer professional/successful entrepreneurs or pursue higher studies through quality education.'
										}
									].map((peo, index) => (
										<div key={index} className='flex items-start'>
											<div className='w-12 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3 mt-1 flex-shrink-0'>
												{peo.code}
											</div>
											<p className='text-gray-700 leading-relaxed'>{peo.description}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Program Specific Outcomes (PSOs) Section */}
					<AnimatedCard delay={0.3}>
						<div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4'>
									<Trophy className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Program Specific Outcomes (PSOs)</h2>
							</div>

							{/* PSOs for Batch 2020 */}
							<div className='bg-white/80 rounded-lg p-6 border border-green-100 mb-6'>
								<h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
									<Calendar className='w-5 h-5 mr-2' />
									Applicable Upto Batch 2020
								</h3>
								<div className='space-y-4'>
									{[
										{
											code: 'PSO1',
											title: 'Foundation of Computer System',
											description: 'Ability to comprehend mathematical science principles, coupled with engineering specialization to analyze & design solutions to real world problems.'
										},
										{
											code: 'PSO2',
											title: 'Proficiency in Software Development Skills',
											description: 'Applying the concepts for building new innovations with a wide range of programming languages and recent open source platforms, by upgrading with new skills and techniques.'
										},
										{
											code: 'PSO3',
											title: 'Successful Career and Entrepreneurship',
											description: 'Ability to excel in his/her innovative career ethically and engaging himself/herself professionally as an entrepreneur, software professional, pursue higher studies with good communication and leadership skills, for the benefit of the society.'
										}
									].map((pso, index) => (
										<div key={index} className='flex items-start'>
											<div className='w-12 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3 mt-1 flex-shrink-0'>
												{pso.code}
											</div>
											<div>
												<h4 className='font-semibold text-gray-800 mb-1'>{pso.title}:</h4>
												<p className='text-gray-700 leading-relaxed'>{pso.description}</p>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* PSOs for Batch 2021 onwards */}
							<div className='bg-white/80 rounded-lg p-6 border border-green-100'>
								<h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
									<Calendar className='w-5 h-5 mr-2' />
									W.E.F. Batch 2021
								</h3>
								<div className='space-y-4'>
									{[
										{
											code: 'PSO1',
											description: 'To develop and integrate knowledge of different disciplines- Computer Science, Electronics, Economics, Mathematics and Statistics to analyze and design computing solutions to solve the problems in different domains.'
										},
										{
											code: 'PSO2',
											description: 'To demonstrate research and technical skills for emerging areas to produce solutions to problems through open source and proprietary platforms.'
										},
										{
											code: 'PSO3',
											description: 'To exhibit the ability to ethically excel in life-long professional career, higher studies and entrepreneurship with good communication, writing and leadership skills for the benefit of society.'
										}
									].map((pso, index) => (
										<div key={index} className='flex items-start'>
											<div className='w-12 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3 mt-1 flex-shrink-0'>
												{pso.code}
											</div>
											<p className='text-gray-700 leading-relaxed'>{pso.description}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// If student-corner section is selected with awards subsection
		if (activeSection === 'student-corner' && activeSubSection === 'awards') {
			// Define types for awards data
			interface Award2024 {
				name: string;
				enrollment: string;
				class: string;
				activity: string;
				date: string;
				place: string;
				position: string;
			}

			interface Award2023 {
				srno: number;
				name: string;
				enrollment: string;
				class: string;
				activity: string;
				date: string;
				place: string;
				position: string;
			}

			type AwardsData = {
				'2024-25': Award2024[];
				'2023-24': Award2023[];
			};

			// Awards data structure
			const awardsData: AwardsData = {
				'2024-25': [
					{ name: 'VIDHATRI NAUTIYAL', enrollment: '08220802723', class: 'CSE B', activity: 'college events like NSS', date: '20-02-2025', place: 'bpit', position: 'Appreciation/Participation Certificate' },
					{ name: 'Pulkit Arora', enrollment: '07820802723', class: 'CSE B', activity: 'Hackathon', date: '18-02-2025', place: 'Room 410', position: 'Appreciation/Participation Certificate' },
					{ name: 'Avikshit Trivedi', enrollment: '09920802723', class: 'CSE B', activity: 'Hackathon', date: '18-02-2025', place: 'Room no. 410', position: 'Appreciation/Participation Certificate' },
					{ name: 'Lakshay Joshi', enrollment: '07620802723', class: 'CSE B', activity: 'Hackathon', date: '18-02-2025', place: '410', position: 'Appreciation/Participation Certificate' },
					{ name: 'Kusha Sharma', enrollment: '08120802723', class: 'CSE B', activity: 'Hackathon', date: '18-02-2025', place: 'room 410, bpit', position: 'Appreciation/Participation Certificate' },
					{ name: 'Harsh Chhabra', enrollment: '08920802723', class: 'CSE B', activity: 'Hackathon', date: '16-02-2025', place: 'Delhi', position: '1st' },
					{ name: 'AYUSH TIWARI', enrollment: '09520802723', class: 'CSE B', activity: 'Hackathon', date: '15-02-2025', place: '408 room no', position: '2nd' },
					{ name: 'PRIYANSHU', enrollment: '09720802723', class: 'CSE B', activity: 'Webinar', date: '15-02-2025', place: 'Online', position: 'Appreciation/Participation Certificate' },
					{ name: 'Bhumika Maheshwari', enrollment: '08420802723', class: 'CSE B', activity: 'Ideathhon', date: '04-02-2025', place: 'Vigyan bhawan , central secretariat', position: 'Appreciation/Participation Certificate' },
					{ name: 'Raj Agam Singh Kalra', enrollment: '00620802722', class: 'CSE A', activity: 'Ideathhon', date: '04-02-2025', place: 'Vigyan Bhawan in New Delhi', position: 'Appreciation/Participation Certificate' },
					{ name: 'Arpita Guniyal', enrollment: '07520802723', class: 'CSE B', activity: 'Ideathhon', date: '04-02-2025', place: 'Vigyan Bhavan', position: 'Appreciation/Participation Certificate' },
					{ name: 'Mokshit Kaushik', enrollment: '35920802723', class: 'CSE A', activity: 'college events like NSS', date: '02-02-2025', place: 'Offline', position: '2nd' },
					{ name: 'VIDHATRI NAUTIYAL', enrollment: '08220802723', class: 'CSE B', activity: 'Debate', date: '01-02-2025', place: 'Bpit ( online event )', position: '2nd' },
					{ name: 'Ranjan', enrollment: '14720802723', class: 'CSE C', activity: 'Quiz', date: '01-02-2025', place: 'Online on unstop', position: 'Appreciation/Participation Certificate' },
					{ name: 'Himanshi Hans', enrollment: '01520802722', class: 'CSE A', activity: 'Ideathhon', date: '31-01-2025', place: 'Two day event – 31st Jan And 4th Feb at GGSIPU East Campus, Karkarduma court', position: 'Appreciation/Participation Certificate' },
					{ name: 'Ranjan', enrollment: '14720802723', class: 'CSE C', activity: 'college events like NSS', date: '31-01-2025', place: 'BPIT', position: 'Appreciation/Participation Certificate' },
					{ name: 'Arsh Tiwari', enrollment: '15520802723', class: 'CSE C', activity: 'Ideathhon', date: '31-01-2025', place: 'GURU GOBIND SINGH INDRAPRASTHA UNIVERSITY, EAST DELHI CAMPUS', position: 'Appreciation/Participation Certificate' },
					{ name: 'Naveen Gupta', enrollment: '36420802723', class: 'CSE A', activity: 'college events like NSS', date: '29-01-2025', place: 'College', position: 'Appreciation/Participation Certificate' },
					{ name: 'Preeti Kumari', enrollment: '15620802723', class: 'CSE C', activity: 'Hackathon', date: '29-01-2025', place: 'SRM Institute of Science and Technology, New Delhi', position: 'Appreciation/Participation Certificate' },
					{ name: 'Hitarth Singaria', enrollment: '08820802723', class: 'CSE B', activity: 'college events like NSS', date: '28-01-2025', place: 'BPIT(Room no. 6A)', position: 'Appreciation/Participation Certificate' },
					{ name: 'Preeti Kumari', enrollment: '15620802723', class: 'CSE C', activity: 'college events like NSS', date: '28-01-2025', place: 'BPIT', position: 'Appreciation/Participation Certificate' },
					{ name: 'Arpita Guniyal', enrollment: '07520802723', class: 'CSE B', activity: 'Seminar', date: '28-01-2025', place: 'IGDTUW', position: 'Appreciation/Participation Certificate' },
					{ name: 'Avikshit Trivedi', enrollment: '09920802723', class: 'CSE B', activity: 'Seminar', date: '28-01-2025', place: 'IGDTUW', position: 'Appreciation/Participation Certificate' },
					{ name: 'Prince Kumar', enrollment: '14520802723', class: 'CSE C', activity: 'Hackathon', date: '26-01-2025', place: 'Sharda University', position: '3rd' },
					{ name: 'Naveen Gupta', enrollment: '36420802723', class: 'CSE A', activity: 'Ideathhon', date: '23-01-2025', place: 'Online submission', position: 'Appreciation/Participation Certificate' },
					{ name: 'Raj Agam Singh Kalra', enrollment: '00620802722', class: 'CSE A', activity: 'college events like NSS', date: '23-01-2025', place: 'MAIT', position: 'Appreciation/Participation Certificate' },
					{ name: 'Karnita Saumya', enrollment: '12620802723', class: 'CSE C', activity: 'Hackathon', date: '21-01-2025', place: 'Shardha University, greater noida', position: 'Appreciation/Participation Certificate' },
					{ name: 'Raj Agam Singh Kalra', enrollment: '00620802722', class: 'CSE A', activity: 'Webinar', date: '20-01-2025', place: 'online', position: 'Appreciation/Participation Certificate' },
					{ name: 'Gauransh Goel', enrollment: '02220802722', class: 'CSE A', activity: 'Hackathon', date: '13-01-2025', place: 'BPIT', position: '1st' },
					{ name: 'Ranjan', enrollment: '14720802723', class: 'CSE C', activity: 'cultural event', date: '12-01-2025', place: 'Bharat mandapam', position: 'Appreciation/Participation Certificate' },
					{ name: 'Prince Kumar', enrollment: '14520802723', class: 'CSE C', activity: 'Fellowship Programs', date: '30-12-2024', place: 'IIT Delhi', position: '1st' },
					{ name: 'AYUSH TIWARI', enrollment: '09520802723', class: 'CSE B', activity: 'Fellowship Programs', date: '24-12-2024', place: 'PITAMPURA(CODING BLOCKS)', position: 'Appreciation/Participation Certificate' },
					{ name: 'Naveen Gupta', enrollment: '36420802723', class: 'CSE A', activity: 'college events like NSS', date: '09-12-2024', place: 'College', position: 'Appreciation/Participation Certificate' },
					{ name: 'Hitarth Singaria', enrollment: '08820802723', class: 'CSE B', activity: 'college events like NSS', date: '09-12-2024', place: 'BPIT', position: 'Appreciation/Participation Certificate' },
					{ name: 'Aanya Gautam', enrollment: '12820802723', class: 'CSE C', activity: 'Hackathon', date: '01-12-2024', place: 'Online', position: 'Appreciation/Participation Certificate' },
					{ name: 'Aanya Gautam', enrollment: '12820802723', class: 'CSE C', activity: 'Spoken Tutorial', date: '06-11-2024', place: 'Bhagwan parshuram institute of technology', position: 'Appreciation/Participation Certificate' },
					{ name: 'Naveen Gupta', enrollment: '36420802723', class: 'Cse A', activity: 'webinar', date: '25-10-2024', place: 'Online', position: 'Appreciation/Participation Certificate' },
					{ name: 'Kartik Dalal', enrollment: '35420802723', class: 'Cse A', activity: 'webinar', date: '24-10-2024', place: 'Online mode', position: 'Appreciation/Participation Certificate' },
					{ name: 'Sumukhi Tripathi', enrollment: '36320802723', class: 'Cse A', activity: 'College Events like NSS', date: '22-10-2024', place: 'BPIT', position: '2nd' },
					{ name: 'Ranjan', enrollment: '14720802723', class: 'Cse C', activity: 'College Events like NSS', date: '21-10-2024', place: 'BPIT', position: 'Appreciation/Participation Certificate' },
					{ name: 'Parth sharma', enrollment: '35720802723', class: 'Cse A', activity: 'webinar', date: '17-10-2024', place: 'MS Teams (online)', position: '3rd' },
					{ name: 'Surender', enrollment: '05620802722', class: 'Cse B', activity: 'Quizz', date: '17-10-2024', place: 'Online(Microsoft Teams)', position: '2nd' },
					{ name: 'Arsh Tiwari', enrollment: '15520802723', class: 'Cse C', activity: 'Hackathon', date: '16-10-2024', place: 'Manipal Institute of Technology ( MAHE ) , Karnataka', position: '3rd' },
					{ name: 'Harjot Singh', enrollment: '12320802723', class: 'Cse C', activity: 'Fellowship Programs', date: '15-10-2024', place: 'GGSIPU Main Campus', position: 'Appreciation/Participation Certificate' },
					{ name: 'Kanishka sharma', enrollment: '36120802723', class: 'Cse A', activity: 'Boot Camp', date: '21-09-2024', place: 'Online platform', position: 'Appreciation/Participation Certificate' }
				],
				'2023-24': [
					{ srno: 1, name: 'Ankit Gupta', enrollment: '820807222', class: 'CSE B', activity: 'Quizz', date: '1/26/2023', place: 'Google Forms', position: 'Appreciation/Participation Certificate' },
					{ srno: 2, name: 'Deewanshi Bansal', enrollment: '3820802721', class: 'CSE A', activity: 'Conference', date: '1/4/2023', place: 'DTU, BPIT,BPIT, Microsoft office(Gurgaon)', position: 'Appreciation/Participation Certificate' },
					{ srno: 3, name: 'Shivank Kapur', enrollment: '6920802722', class: 'CSE B', activity: 'Seminar, Conference', date: '1/15/2023', place: 'I became MLSA', position: 'Appreciation/Participation Certificate' },
					{ srno: 4, name: 'Anamika Rawat', enrollment: '20220802720', class: 'CSE C', activity: 'JGEC Winter of Code', date: '2/15/2023', place: 'Online', position: 'Appreciation/Participation Certificate' },
					{ srno: 5, name: 'Anjali Kumari Dubey', enrollment: '20420802720', class: 'CSE C', activity: 'SWOC: open source', date: '3/31/2023', place: 'Online', position: 'Appreciation/Participation Certificate' },
					{ srno: 6, name: 'SEJAL YUWARAJ', enrollment: '2520802721', class: 'CSE A', activity: 'Seminar', date: '3/21/2023', place: 'Bpit', position: 'Appreciation/Participation Certificate' },
					{ srno: 7, name: 'Anamika Rawat', enrollment: '20220802720', class: 'CSE C', activity: 'Full stack web development', date: '3/30/2023', place: 'Online', position: '1st' },
					{ srno: 8, name: 'V V Anup Sreeram', enrollment: '9120802721', class: 'CSE B', activity: 'Tech Fest', date: '3/16/2023', place: 'IGDTU', position: 'Appreciation/Participation Certificate' },
					{ srno: 9, name: 'Ayush Tyagi', enrollment: '1120807222', class: 'CSE B', activity: 'Cultural Event', date: '1/4/2023', place: 'Delhi Institute of Advanced Studies', position: '2nd' },
					{ srno: 10, name: 'Tushar Sethi', enrollment: '720802721', class: 'CSE A', activity: 'Internship', date: '6/3/2023', place: 'CODING SAATHI', position: 'Appreciation/Participation Certificate' },
					{ srno: 11, name: 'Ayush Garg', enrollment: '3220802720', class: 'CSE A', activity: 'Quizz, Seminar, Workshop, Conference', date: '1/3/2023', place: 'Delhi and Online', position: 'Appreciation/Participation Certificate' },
					{ srno: 12, name: 'Khushank singh panwar', enrollment: '14020802721', class: 'CSE C', activity: 'Cultural Event', date: '3/17/2023', place: 'Zenith (annual fest of gitarattan international school of business)', position: '2nd' },
					{ srno: 13, name: 'Yash Kumar', enrollment: '9420802722', class: 'CSE B', activity: 'Quizz', date: '3/28/2023', place: 'Online', position: 'Appreciation/Participation Certificate' },
					{ srno: 14, name: 'Ayush Sharma', enrollment: '3420802720', class: 'CSE A', activity: 'Seminar, Conference', date: '3/21/2023', place: 'ITC maurya, New Delhi', position: 'Appreciation/Participation Certificate' },
					{ srno: 15, name: 'Komal Tripathi', enrollment: '7620802720', class: 'CSE B', activity: 'Tech Fest', date: '1/10/2023', place: 'Online', position: 'Appreciation/Participation Certificate' },
					{ srno: 16, name: 'Ashray Gupta', enrollment: '3220802721', class: 'CSE A', activity: 'Marathon', date: '3/31/2023', place: 'GGSIPU main campus , dwarka', position: 'Appreciation/Participation Certificate' },
					{ srno: 17, name: 'Abhay Sharma', enrollment: '10420802721', class: 'CSE C', activity: 'Quizz', date: '1/26/2023', place: 'Online', position: 'Appreciation/Participation Certificate' },
					{ srno: 18, name: 'Ayush Saini', enrollment: '3320802720', class: 'CSE A', activity: 'Seminar, Workshop', date: '1/3/2023', place: 'Expert talk at bpit 6A and gdsc wow at Gautam Buddha University', position: 'Appreciation/Participation Certificate' },
					{ srno: 19, name: 'KIRTI SINGH', enrollment: '7520802720', class: 'CSE B', activity: 'Cultural Event', date: '6/4/2023', place: 'Maharaja Agrasen Institute of Technology (MAIT)', position: '1st' },
					{ srno: 20, name: 'KIRTI SINGH', enrollment: '7520802720', class: 'CSE B', activity: 'Cultural Event', date: '11/4/2023', place: 'Swami Shraddhanand College (DU)', position: 'Appreciation/Participation Certificate' }
				]
			};

			return (
				<div className='space-y-8'>
					{/* Awards Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Trophy className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Student&apos;s Achievements</h1>
							<p className='text-yellow-600 font-medium'>Celebrating Excellence and Recognition</p>
						</div>
					</motion.div>

					{/* Program Pictures Carousel */}
					<AnimatedCard delay={0.1}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
									<Camera className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Awards</h2>
							</div>
							<ProgramPicturesCarousel />
						</div>
					</AnimatedCard>

					{/* Academic Year Toggle */}
					<AnimatedCard delay={0.2}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center'>
									<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
										<Calendar className='w-6 h-6 text-white' />
									</div>
									<h2 className='text-2xl font-bold text-gray-900'>Academic Year</h2>
								</div>
							</div>

							<div className='flex justify-center mb-8'>
								<div className='bg-gray-100 rounded-xl p-2 border border-gray-200'>
									<div className='flex space-x-2'>
										{Object.keys(awardsData).map((year) => (
											<button
												key={year}
												onClick={() => setSelectedAcademicYear(year as '2024-25' | '2023-24')}
												className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${selectedAcademicYear === year
														? 'bg-blue-600 text-white shadow-lg'
														: 'text-gray-600 hover:text-gray-900 hover:bg-white'
													}`}>
												{year}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Awards Table */}
					<AnimatedCard delay={0.3}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
									<Award className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>
									Student Achievements ({selectedAcademicYear})
								</h2>
							</div>

							<div className='overflow-x-auto'>
								<table className='w-full border-collapse'>
									<thead>
										<tr className='bg-gray-50 border-b border-gray-200'>
											{selectedAcademicYear === '2023-24' && (
												<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>
													Sr. No.
												</th>
											)}
											<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>
												Name of Student
											</th>
											<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>
												Enrollment No.
											</th>
											<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>
												Class
											</th>
											<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>
												Extra Curricular Activity
											</th>
											<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>
												Date/Month
											</th>
											<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>
												Place of Event
											</th>
											<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900'>
												Position Achieved
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										{awardsData[selectedAcademicYear]?.map((student: Award2024 | Award2023, index: number) => (
											<tr key={index} className='hover:bg-gray-50 transition-colors'>
												{selectedAcademicYear === '2023-24' && (
													<td className='px-4 py-4 text-sm text-gray-900 border-r border-gray-200'>
														{('srno' in student ? student.srno : null) || index + 1}
													</td>
												)}
												<td className='px-4 py-4 text-sm font-medium text-gray-900 border-r border-gray-200'>
													{student.name}
												</td>
												<td className='px-4 py-4 text-sm text-gray-600 border-r border-gray-200'>
													{student.enrollment}
												</td>
												<td className='px-4 py-4 text-sm text-gray-600 border-r border-gray-200'>
													{student.class}
												</td>
												<td className='px-4 py-4 text-sm text-gray-600 border-r border-gray-200'>
													<div className='flex items-center'>
														{student.activity.toLowerCase().includes('hackathon') && (
															<Code className='w-4 h-4 text-blue-600 mr-2' />
														)}
														{student.activity.toLowerCase().includes('quiz') && (
															<Brain className='w-4 h-4 text-purple-600 mr-2' />
														)}
														{student.activity.toLowerCase().includes('cultural') && (
															<Trophy className='w-4 h-4 text-yellow-600 mr-2' />
														)}
														{student.activity.toLowerCase().includes('seminar') && (
															<Presentation className='w-4 h-4 text-green-600 mr-2' />
														)}
														{student.activity.toLowerCase().includes('conference') && (
															<Users className='w-4 h-4 text-indigo-600 mr-2' />
														)}
														{student.activity.toLowerCase().includes('webinar') && (
															<Monitor className='w-4 h-4 text-teal-600 mr-2' />
														)}
														{student.activity.toLowerCase().includes('workshop') && (
															<Wrench className='w-4 h-4 text-orange-600 mr-2' />
														)}
														<span className='capitalize'>{student.activity}</span>
													</div>
												</td>
												<td className='px-4 py-4 text-sm text-gray-600 border-r border-gray-200'>
													{student.date}
												</td>
												<td className='px-4 py-4 text-sm text-gray-600 border-r border-gray-200'>
													<div className='max-w-xs'>
														<span className='break-words'>{student.place}</span>
													</div>
												</td>
												<td className='px-4 py-4 text-sm border-r border-gray-200'>
													<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.position === '1st'
															? 'bg-yellow-100 text-yellow-800'
															: student.position === '2nd'
																? 'bg-gray-100 text-gray-800'
																: student.position === '3rd'
																	? 'bg-orange-100 text-orange-800'
																	: 'bg-blue-100 text-blue-800'
														}`}>
														{student.position === '1st' && <Trophy className='w-3 h-3 mr-1' />}
														{student.position === '2nd' && <Award className='w-3 h-3 mr-1' />}
														{student.position === '3rd' && <Star className='w-3 h-3 mr-1' />}
														{!['1st', '2nd', '3rd'].includes(student.position) && <CheckCircle className='w-3 h-3 mr-1' />}
														{student.position}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Summary Statistics */}
							<div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
								<div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
									<div className='flex items-center'>
										<Users className='w-8 h-8 text-blue-600 mr-3' />
										<div>
											<p className='text-2xl font-bold text-blue-900'>
												{awardsData[selectedAcademicYear]?.length || 0}
											</p>
											<p className='text-sm text-blue-600'>Total Students</p>
										</div>
									</div>
								</div>
								<div className='bg-yellow-50 rounded-lg p-4 border border-yellow-200'>
									<div className='flex items-center'>
										<Trophy className='w-8 h-8 text-yellow-600 mr-3' />
										<div>
											<p className='text-2xl font-bold text-yellow-900'>
												{awardsData[selectedAcademicYear]?.filter((student: Award2024 | Award2023) => student.position === '1st').length || 0}
											</p>
											<p className='text-sm text-yellow-600'>First Position</p>
										</div>
									</div>
								</div>
								<div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
									<div className='flex items-center'>
										<Award className='w-8 h-8 text-gray-600 mr-3' />
										<div>
											<p className='text-2xl font-bold text-gray-900'>
												{awardsData[selectedAcademicYear]?.filter((student: Award2024 | Award2023) => student.position === '2nd').length || 0}
											</p>
											<p className='text-sm text-gray-600'>Second Position</p>
										</div>
									</div>
								</div>
								<div className='bg-orange-50 rounded-lg p-4 border border-orange-200'>
									<div className='flex items-center'>
										<Star className='w-8 h-8 text-orange-600 mr-3' />
										<div>
											<p className='text-2xl font-bold text-orange-900'>
												{awardsData[selectedAcademicYear]?.filter((student: Award2024 | Award2023) => student.position === '3rd').length || 0}
											</p>
											<p className='text-sm text-orange-600'>Third Position</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* CSE Toppers Carousel */}
					<AnimatedCard delay={0.4}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mr-3'>
									<Trophy className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900 '>CSE Toppers</h2>
							</div>
							<CSEToppersCarousel />
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// If student-corner section is selected with prototype-product-development subsection
		if (activeSection === 'student-corner' && activeSubSection === 'prototype-product-development') {
			return (
				<div className='space-y-8'>
					{/* Prototype Product Development Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Wrench className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Prototype Product Development</h1>
							<p className='text-orange-600 font-medium'>Innovative Student Projects and Prototypes</p>
						</div>
					</motion.div>

					{/* Infinite Carousel Header */}
					<AnimatedCard delay={0.1}>
						<div className='bg-white rounded-xl p-6 border border-gray-200 overflow-hidden'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
									<Camera className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Project Showcase</h2>
							</div>

							{/* Carousel Container */}
							<div className='relative h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl overflow-hidden'>
								<div className='absolute inset-0 flex items-center justify-center'>
									<div className='animate-carousel flex space-x-8'>
										{/* Duplicate the images for infinite effect */}
										{[...Array(3)].map((_, setIndex) => (
											<React.Fragment key={`carousel-set-${setIndex}`}>
												<div key={`${setIndex}-1`} className='flex-shrink-0 w-80 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-200'>
													<div className='text-center'>
														<div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3'>
															<Code className='w-8 h-8 text-white' />
														</div>
														<h3 className='text-lg font-semibold text-gray-800 mb-1'>Attendance App</h3>
														<p className='text-sm text-gray-600'>Mobile Application Development</p>
													</div>
												</div>
												<div key={`${setIndex}-2`} className='flex-shrink-0 w-80 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-200'>
													<div className='text-center'>
														<div className='w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3'>
															<GraduationCap className='w-8 h-8 text-white' />
														</div>
														<h3 className='text-lg font-semibold text-gray-800 mb-1'>Brainchant</h3>
														<p className='text-sm text-gray-600'>Educational Platform</p>
													</div>
												</div>
												<div key={`${setIndex}-3`} className='flex-shrink-0 w-80 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-200'>
													<div className='text-center'>
														<div className='w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3'>
															<Zap className='w-8 h-8 text-white' />
														</div>
														<h3 className='text-lg font-semibold text-gray-800 mb-1'>Solar Tracker</h3>
														<p className='text-sm text-gray-600'>IoT & Automation</p>
													</div>
												</div>
												<div key={`${setIndex}-4`} className='flex-shrink-0 w-80 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-200'>
													<div className='text-center'>
														<div className='w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3'>
															<Shield className='w-8 h-8 text-white' />
														</div>
														<h3 className='text-lg font-semibold text-gray-800 mb-1'>TagGuard</h3>
														<p className='text-sm text-gray-600'>Security System</p>
													</div>
												</div>
											</React.Fragment>
										))}
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>

					{/* Projects Table */}
					<AnimatedCard delay={0.2}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
									<FolderOpen className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Project Details</h2>
							</div>

							<div className='overflow-x-auto'>
								<table className='w-full border-collapse'>
									<thead>
										<tr className='bg-gray-50 border-b border-gray-200'>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>S. No.</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Title</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Details</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Student Names</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										{[
											{
												sno: 1,
												title: "Attendance App",
												details: "The objective of this project to maintain the attendance details of students.",
												students: "Shubham, Mohak, Rajat"
											},
											{
												sno: 2,
												title: "Brainchant: one stop solution for B.Tech Students",
												details: "Brainchant's website, brainchant.in, serves as the central hub for accessing its innovative educational platform. Here, students can find a wealth of high-quality content, including interactive live sessions, video lectures, and detailed subject analyses. Through this platform, Brainchant addresses the pressing issue of unreliable educational resources, providing undergrad and postgrad students with a reliable and effective learning solution. With its freemium SaaS model, Brainchant offers both free and premium subscription options, ensuring accessibility for all learners. Led by CEO Ayush Garg and COO Mayank Nailwal, Brainchant is poised to transform the educational landscape with its commitment to quality, affordability, and scalability.",
												students: "Ayush Garg, Ayush Saini, Aarti, Akansha Mittal"
											},
											{
												sno: 3,
												title: "Automated Solar Tracker",
												details: "New solar tracker maximizes sunlight exposure with the help of LDR sensors operated by Arduino UNO and can be programmed using the Arduino Integrated Development Environment (IDE).",
												students: "Syed Nameer Ibraheem, Afaque Ahmad, Md Zahin Ahmad, Parvesh Kumar"
											},
											{
												sno: 4,
												title: "Digital Government Scheme",
												details: "This product aims to access the central and state schemes without going to the block office or district office by using an aadhar card.",
												students: "Diwakar Kumar, Vishesh, Gaurav"
											},
											{
												sno: 5,
												title: "TagGuard",
												details: "TagGuard is a comprehensive security system designed to protect Near Field Communication (NFC) and Radio Frequency Identification (RFID) technology from cyber threats, utilizing advanced encryption, authentication, and access control mechanisms. By integrating robust encryption algorithms, dynamic authentication protocols, and tamper-resistant tags, TagGuard enhances data security, user privacy, and resilience against unauthorized access in NFC and RFID systems.",
												students: "Akriti Ajit, Bhavya Malhotra, Manika"
											},
											{
												sno: 6,
												title: "KeyKatcher- The simplified keylogger",
												details: "it's a keylogger, once installed in a system, starts capturing all the keystrokes entered by any user. Later, those keystrokes are stored in a Txt file and are sent over in the mail to any specific email address. Also, after the mail is sent, the Txt file is deleted automatically. Hence, leaving no trace.",
												students: "Himank Jain, Shaurya Dhingra, Saksham Batra, Pratyaksh Khurana"
											},
											{
												sno: 7,
												title: "BusKaro",
												details: "\"BusKaro!\" is a Bus Tracking and Management System aimed at improving public transportation by providing real-time bus tracking, route information, and AI-driven assistance. Leveraging modern technologies, it enhances user experience, ensures route adherence, and contributes to more efficient and environmentally friendly travel.",
												students: "Ujjawal Sharma, Pratham Gupta, Ekta Bansal, Vasu Dandona"
											},
											{
												sno: 8,
												title: "Gesture Control",
												details: "This product aims to develop a robust and versatile gesture control library built using TensorFlow vision models. This library will serve as a valuable resource for developers looking to seamlessly integrate gesture-based interactions into their web applications. By offering a streamlined and customizable solution, it empowers developers to create immersive, interactive, and user-friendly web experiences.",
												students: "Rahul Paul, Akshat Gupta, Yash Bhardwaj"
											},
											{
												sno: 9,
												title: "Malware Detection & Analysis using AI",
												details: "The main task is to distinguish malware present statically utilizing AI calculations with the assistance of the compact executable (PE file format).",
												students: "Kartik Malik, Manish Kumar, Mehul Kumar Soni, Radha Mukhraiya"
											},
											{
												sno: 10,
												title: "ConfMan",
												details: "The objective of this product to manage the conference details.",
												students: "Ankit Gaur, Akash Samal, Ramit Batra and Ayush Mangla"
											}
										].map((project, index) => (
											<tr key={index} className='hover:bg-gray-50 transition-colors'>
												<td className='px-6 py-4 text-sm text-gray-900 border-r border-gray-200 font-medium'>
													{project.sno}
												</td>
												<td className='px-6 py-4 text-sm font-semibold text-gray-900 border-r border-gray-200'>
													{project.title}
												</td>
												<td className='px-6 py-4 text-sm text-gray-700 border-r border-gray-200 leading-relaxed'>
													{project.details}
												</td>
												<td className='px-6 py-4 text-sm text-gray-700 font-medium'>
													{project.students}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</AnimatedCard>

					{/* Project Categories */}
					<AnimatedCard delay={0.3}>
						<div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3'>
									<BarChart className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Project Categories</h2>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{[
									{
										category: 'Mobile Applications',
										count: 2,
										color: 'from-blue-100 to-blue-200',
										icon: <Monitor className='w-6 h-6 text-blue-600' />
									},
									{
										category: 'Web Platforms',
										count: 3,
										color: 'from-green-100 to-green-200',
										icon: <Globe className='w-6 h-6 text-green-600' />
									},
									{
										category: 'IoT & Hardware',
										count: 1,
										color: 'from-yellow-100 to-yellow-200',
										icon: <Cpu className='w-6 h-6 text-yellow-600' />
									},
									{
										category: 'Security Systems',
										count: 2,
										color: 'from-purple-100 to-purple-200',
										icon: <Shield className='w-6 h-6 text-purple-600' />
									},
									{
										category: 'AI & Machine Learning',
										count: 2,
										color: 'from-indigo-100 to-indigo-200',
										icon: <Brain className='w-6 h-6 text-indigo-600' />
									}
								].map((category, index) => (
									<div key={index} className={`bg-gradient-to-br ${category.color} rounded-lg p-4 border border-gray-200`}>
										<div className='flex items-center justify-between mb-2'>
											<div className='flex items-center'>
												{category.icon}
												<span className='ml-2 font-semibold text-gray-900'>{category.category}</span>
											</div>
											<span className='bg-white px-2 py-1 rounded-full text-sm font-bold text-gray-700'>
												{category.count}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</AnimatedCard>

					{/* Innovation Impact */}
					<AnimatedCard delay={0.4}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
									<TrendingUp className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Innovation Impact</h2>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Users className='w-8 h-8 text-blue-600' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900 mb-2'>28</h3>
									<p className='text-gray-600'>Students Involved</p>
								</div>
								<div className='text-center'>
									<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<FolderOpen className='w-8 h-8 text-green-600' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900 mb-2'>10</h3>
									<p className='text-gray-600'>Active Projects</p>
								</div>
								<div className='text-center'>
									<div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Trophy className='w-8 h-8 text-purple-600' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900 mb-2'>5</h3>
									<p className='text-gray-600'>Technology Domains</p>
								</div>
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// If student-corner section is selected with projects subsection
		if (activeSection === 'student-corner' && activeSubSection === 'projects') {
			// Project data structure
			interface Project {
				groupNo: string;
				members: string[];
				projectName: string;
				mentorName: string;
			}

			interface ProjectsData {
				'2021-25': Project[];
				'2020-24': Project[];
				'2019-23': Project[];
				'2018-22': Project[];
				'2017-21': Project[];
			}

			const projectsData: ProjectsData = {
				'2021-25': [
					{ groupNo: 'G1', members: ['Rishi Jha', 'Yashika', 'Sneha Nautiyal', 'Shreyash Singh'], projectName: 'Shop Seek', mentorName: 'Ms. Vishakha Verma/ Ms. Priya' },
					{ groupNo: 'G2', members: ['Khushank Singh Panwar', 'Moksh Aggarwal', 'Kavya Singh', 'Manish Rawat'], projectName: 'Path Provider using Ambulance', mentorName: 'Mr. Aditya' },
					{ groupNo: 'G3', members: ['Yash Jain', 'Sahil Mittal', 'Tushar Sethi', 'Amartya Pratap Singh'], projectName: 'LSTM Research Whtsap Encryption', mentorName: 'Ms. Pratibha' },
					{ groupNo: 'G4', members: ['Dhruv', 'Arjun Bhardwaj', 'Amrit Chattpadhyay', 'Amrit Kumar'], projectName: 'Registration Portal', mentorName: 'Ms. Anju Kaushik' },
					{ groupNo: 'G5', members: ['Sachin Kumar', 'Harshit Kaushik', 'Anand Mohan', 'Vishwa Mohan Verma'], projectName: 'Team Sphere', mentorName: 'Ms. Ayushi Gupta' },
					{ groupNo: 'G6', members: ['V V Anup Sreeram', 'Uzair khan', 'Abhinav Gaur', 'Devansh miglani'], projectName: 'LightPod', mentorName: 'Ms Vishakha Sehdev' },
					{ groupNo: 'G7', members: ['Shirish Patel', 'Ravi Raj', 'Arpit Singh', 'Mayank Singhwal'], projectName: 'Rent-ease', mentorName: 'Ms. Soumya Sharma' },
					{ groupNo: 'G8', members: ['Sanyam Jain', 'Radhika Aggrawal', 'Yash Chaudhary'], projectName: 'Traffic light control system using Ardeino', mentorName: 'Ms. Tanisha Madan' },
					{ groupNo: 'G9', members: ['Divya Arora', 'Vanshika', 'Anushka Singh', 'Amartya Pratap Singh'], projectName: 'Fashion Recommender System', mentorName: 'Ms. Deepti Jain and Dr. Mugdha Sharma' },
					{ groupNo: 'G10', members: ['Anant Bhardwaj', 'Dhananjay Sharma', 'Chirag Singh Manral', 'Aryan Saini'], projectName: 'Customer Data Platformn', mentorName: 'Mr. Dinesh' },
					{ groupNo: 'G11', members: ['Gursimran Kaur', 'Vansh Varun', 'Divyansh Kumar', 'Divit Gaur'], projectName: 'Advance Surveillance security system for Animal Detection', mentorName: 'Dr. Richa Vats' },
					{ groupNo: 'G12', members: ['Aryan Gaba', 'Ritesh Kumar', 'Rounak Ranjan', 'Aryan Basra'], projectName: 'Healthslot- Healthcare platform', mentorName: 'Dr. Mugdha Sharma' },
					{ groupNo: 'G13', members: ['Ankur Dubey', 'Aryan Kumar', 'Jatin Kumar Tiwari', 'Siddharth Suyal'], projectName: 'Delhi Transport Corporation Website', mentorName: 'Dr. Himani' },
					{ groupNo: 'G14', members: ['Gautam Gupta', 'Archit Jain', 'Rakesh', 'Pawas Goyal'], projectName: 'Smart Parking', mentorName: 'Dr. Charu Gupta' },
					{ groupNo: 'G15', members: ['Akshit Goel', 'Shreyash Joshi', 'Ashutosh Tripathi', 'Yashwin Gahlawat'], projectName: 'Eco-Revolution waste Management', mentorName: 'Dr. Palak Girdhar' },
					{ groupNo: 'G16', members: ['Abhey Suman', 'Aditya Kumar', 'Vinay Sharma', 'Gautam Pathak'], projectName: 'Agri Support', mentorName: 'Dr. Vishal Khatri' },
					{ groupNo: 'G17', members: ['Esha Mathur', 'Harimohan sharma', 'Fazil Iqbal', 'Jyotiraditya Swain'], projectName: 'Finance Literacy', mentorName: 'Dr. Suman Arora' },
					{ groupNo: 'G18', members: ['Jaskirat Singh', 'Madeeha Ishaque', 'Prabal Gupta', 'Prabhjot Singh'], projectName: 'Campusclub', mentorName: 'Dr. Monika Arora' },
					{ groupNo: 'G19', members: ['Deepanshi Verma', 'Malvika Sachdev'], projectName: 'Precting human migration patterns under climate ways in India', mentorName: 'Dr. Shweta Taneja' },
					{ groupNo: 'G20', members: ['Siddhant Kaushik', 'Abhishek Kumar Singh', 'Prajjwal Kapri', 'Ashray Gupta'], projectName: 'Codeflows', mentorName: 'Dr. Bhawna Suri' },
					{ groupNo: 'G21', members: ['Himanshu Bhenwal', 'krishna Aggarwal'], projectName: 'Smart card', mentorName: 'Prof. Achal Kaushik' },
					{ groupNo: 'G22', members: ['Diya Arora', 'Anupam Mittal', 'Avinash Jha', 'Kushagra Goyal'], projectName: 'Blockchain for disability verification', mentorName: 'Ms. Tanisha Madan' },
					{ groupNo: 'G23', members: ['Rajdeep Singh', 'Stuti Dabral', 'Saurav Sharma'], projectName: 'Toxicity Detection in Text', mentorName: 'Ms. Deepti Jain' },
					{ groupNo: 'G24', members: ['P B M Anirudh', 'Vinay Bibyan', 'Laksh kaul', 'Muskan'], projectName: 'Adapt Learn', mentorName: 'Mr. Dinesh' },
					{ groupNo: 'G25', members: ['Vinayak Sahu', 'Vatsal Goel', 'Kartik Vaid', 'Pratham Chauhan'], projectName: 'Trust raise decentralised block chain based crowfunding platform', mentorName: 'Ms. Richa Vats' },
					{ groupNo: 'G26', members: ['Sarthak', 'Rupesh', 'Devanshi'], projectName: 'Xplovo: Mental health Platform', mentorName: 'Dr. Mugdha' },
					{ groupNo: 'G27', members: ['Naman Chawla', 'Anurag Thakur', 'Varun Allagh', 'Vansh'], projectName: 'Research Paper Recommendation System', mentorName: 'Dr. Himani' },
					{ groupNo: 'G28', members: ['Saurabh Kumar', 'Nishant chowdhary', 'Manish Kumar Sharma', 'Akkul Gautam'], projectName: 'Shopping Cart', mentorName: 'Dr. Charu Gupta' },
					{ groupNo: 'G29', members: ['Gyan Dev', 'Navneet Kumar', 'Sakshi', 'Mansimar'], projectName: 'Aura-Social', mentorName: 'Dr. Palak Girdhar' },
					{ groupNo: 'G30', members: ['Sejal Yuwaraj', 'Pooja', 'Mehak Rajpal', 'Sunaina Uppal'], projectName: 'Melody Box', mentorName: 'Dr. Vishal Khatri' },
					{ groupNo: 'G31', members: ['Lakshay garg', 'Aman narang', 'Daxh khatreja', 'Gracy dhamija'], projectName: 'Advance Fishing detection using ML', mentorName: 'Dr. Suman Arora' },
					{ groupNo: 'G32', members: ['Deewanshi Bansal', 'Nakul Singh'], projectName: 'MeetNew', mentorName: 'Dr. Monika Arora' },
					{ groupNo: 'G33', members: ['Vibhuti Gupta', 'Khushi Kulshreshtha', 'Priyanshu Gautam', 'Shivansh Sharma'], projectName: 'News True Bytes (Fake news detection)', mentorName: 'Dr. Shweta Taneja' },
					{ groupNo: 'G34', members: ['Siddharth Mishra', 'Hemant Singh', 'Khushi'], projectName: 'Youtube video Summanizer', mentorName: 'Dr. Bhawna Suri' },
					{ groupNo: 'G35', members: ['Mohammed Faaiz', 'Satvik Gupta', 'Nimesh', 'Sachi Datta'], projectName: 'Acad View', mentorName: 'Prof. Achal Kaushik' },
					{ groupNo: 'G36', members: ['Chirag Upadhyay', 'Murli', 'Jubin Kumar Birah'], projectName: 'e-Chat', mentorName: 'Ms. Priya Paliwal/ Ms. Anju Kaushik' },
					{ groupNo: 'G37', members: ['Yash Dabas', 'Daksh Lohia'], projectName: 'Smart Parking using IOT', mentorName: 'Mr. Aditya Sam Koshi' },
					{ groupNo: 'G38', members: ['Ayush Mehan', 'Om Bhojwani', 'Antrip'], projectName: 'Alumni Association Platform for University', mentorName: 'Ms. Pratibha Sharma' },
					{ groupNo: 'G40', members: ['Suryansh Singh', 'Vaibhav Sareen', 'Aryan Singh', 'Arpit Doneria'], projectName: 'Fault Prediction in Software', mentorName: 'Ms. Ayushi Gupta' },
					{ groupNo: 'G41', members: ['Mohd abuzar ansari', 'Khushal babbar', 'Mankhush kumar', 'Saksham modgil'], projectName: 'Emotion Recognition from Screen', mentorName: 'Ms. Vishakha Verma' },
					{ groupNo: 'G42', members: ['Madhav Gupta', 'Ankit Gupta', 'Faizan', 'Himanshi Negi'], projectName: 'Emotion facial recognition', mentorName: 'Ms. Soumya Sharma' },
					{ groupNo: 'G43', members: ['Kartik Rai', 'Ananya Dubey', 'Chinmaya Kalra', 'Kannan'], projectName: 'Gym Tracker', mentorName: 'Ms. Deepti Jain' },
					{ groupNo: 'G44', members: ['Vaibhav Agria', 'Aditya'], projectName: 'ARK Surveillance System', mentorName: 'Mr. Dinesh' },
					{ groupNo: 'G45', members: ['Harsh Saini', 'Shivansh Garg'], projectName: 'CodeCast', mentorName: 'Dr. Richa Vats' },
					{ groupNo: 'G46', members: ['Shubham Kumar', 'Yash Rawat', 'Namain Jain', 'Junet Hossain'], projectName: 'J-Mailer', mentorName: 'Dr. Mugdha Sharma' },
					{ groupNo: 'G47', members: ['Suraj kumar', 'Sagar kumar Shrivastav', 'Vignesh'], projectName: 'Enhanced AI Gym Trainer', mentorName: 'Dr. Himani Sharma' },
					{ groupNo: 'G48', members: ['Varun Anand', 'Tia', 'Vetanshu Rajoria'], projectName: 'Hear me out', mentorName: 'Dr. Charu Gupta' },
					{ groupNo: 'G49', members: ['Rishav Raj', 'Vaibhav Goyal', 'Priayanshu Thakur', 'Harsh Choudhary'], projectName: 'Career Boost', mentorName: 'Dr. Palak Girdhar' },
					{ groupNo: 'G50', members: ['Swarika Sharma', 'Sunny Sehwag', 'Deepika Rani', 'Shivani Shukla'], projectName: 'Virtual Trade', mentorName: 'Dr. Vishal Khatri' },
					{ groupNo: 'G51', members: ['Aditya Bhardwaj', 'Aayushi Singh', 'Ansh', 'Sezal Sharma'], projectName: 'Vegabonder: Automated Traveller Planner with AI', mentorName: 'Dr. Suman Arora' },
					{ groupNo: 'G52', members: ['Abhijeet kumar', 'Shivam kumar', 'Tarun singh'], projectName: 'StableMax', mentorName: 'Dr. Monika Arora' },
					{ groupNo: 'G53', members: ['Anant dev singh', 'Pawan jindal', 'Kunsh Pandit', 'Dipanshu pandey'], projectName: 'Learacart podcast Platform', mentorName: 'Dr. Shweta Taneja' },
					{ groupNo: 'G54', members: ['Ayush Tyagi', 'Ravinesh Mishra', 'Ujjwal Tiwari'], projectName: 'DoNUT DeepFake', mentorName: 'Dr. Bhawna suri' },
					{ groupNo: 'G55', members: ['Aditya Gupta', 'Abhay Sharma', 'Himanshu Narayan', 'Hrithik Roushan Sharma'], projectName: 'Traffic signal Recognition using CNN', mentorName: 'Prof. Achal Kaushik' }
				],
				'2020-24': [],
				'2019-23': [],
				'2018-22': [],
				'2017-21': []
			};

			const currentProjects = projectsData[selectedProjectYear];

			return (
				<div className='space-y-8'>
					{/* Projects Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<FolderOpen className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Innovative Project List</h1>
							<p className='text-blue-600 font-medium'>Department of Computer Science & Technology</p>
						</div>
					</motion.div>

					{/* Year Toggle */}
					<AnimatedCard delay={0.1}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center justify-between mb-6'>
								<h2 className='text-2xl font-bold text-gray-900'>Select Academic Year</h2>
								<div className='flex items-center space-x-2'>
									<Calendar className='w-5 h-5 text-gray-500' />
									<span className='text-sm text-gray-500'>Current: {selectedProjectYear}</span>
								</div>
							</div>

							<div className='flex flex-wrap justify-center gap-3'>
								{['2021-25', '2020-24', '2019-23', '2018-22', '2017-21'].map((year) => (
									<button
										key={year}
										onClick={() => setSelectedProjectYear(year as '2021-25' | '2020-24' | '2019-23' | '2018-22' | '2017-21')}
										className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedProjectYear === year
												? 'bg-blue-600 text-white shadow-lg'
												: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
											}`}
									>
										{year}
									</button>
								))}
							</div>
						</div>
					</AnimatedCard>

					{/* Projects Table */}
					<AnimatedCard delay={0.2}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-3'>
									<BookOpen className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Projects for {selectedProjectYear}</h2>
							</div>

							{currentProjects.length > 0 ? (
								<div className='overflow-x-auto'>
									<table className='w-full border-collapse'>
										<thead>
											<tr className='bg-gray-50 border-b border-gray-200'>
												<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Group No.</th>
												<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Members Name</th>
												<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Project Name</th>
												<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Mentor Name</th>
											</tr>
										</thead>
										<tbody className='divide-y divide-gray-200'>
											{currentProjects.map((project, index) => (
												<tr key={index} className='hover:bg-gray-50 transition-colors duration-200'>
													<td className='px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200'>
														{project.groupNo}
													</td>
													<td className='px-6 py-4 text-sm text-gray-700 border-r border-gray-200'>
														<div className='space-y-1'>
															{project.members.map((member, idx) => (
																<div key={idx} className='flex items-center'>
																	<div className='w-2 h-2 bg-blue-400 rounded-full mr-2'></div>
																	{member}
																</div>
															))}
														</div>
													</td>
													<td className='px-6 py-4 text-sm font-medium text-blue-600 border-r border-gray-200'>
														{project.projectName}
													</td>
													<td className='px-6 py-4 text-sm text-gray-700'>
														{project.mentorName}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className='text-center py-12'>
									<FolderOpen className='w-16 h-16 text-gray-300 mx-auto mb-4' />
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>No Projects Available</h3>
									<p className='text-gray-500'>Projects for {selectedProjectYear} will be updated soon.</p>
								</div>
							)}

							{/* Project Statistics */}
							{currentProjects.length > 0 && (
								<div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
									<div className='bg-blue-50 rounded-lg p-4 text-center border border-blue-200'>
										<div className='text-2xl font-bold text-blue-600'>{currentProjects.length}</div>
										<div className='text-sm text-blue-600 font-medium'>Total Projects</div>
									</div>
									<div className='bg-green-50 rounded-lg p-4 text-center border border-green-200'>
										<div className='text-2xl font-bold text-green-600'>
											{currentProjects.reduce((total, project) => total + project.members.length, 0)}
										</div>
										<div className='text-sm text-green-600 font-medium'>Total Students</div>
									</div>
									<div className='bg-purple-50 rounded-lg p-4 text-center border border-purple-200'>
										<div className='text-2xl font-bold text-purple-600'>
											{[...new Set(currentProjects.map(p => p.mentorName))].length}
										</div>
										<div className='text-sm text-purple-600 font-medium'>Unique Mentors</div>
									</div>
									<div className='bg-orange-50 rounded-lg p-4 text-center border border-orange-200'>
										<div className='text-2xl font-bold text-orange-600'>
											{Math.round(currentProjects.reduce((total, project) => total + project.members.length, 0) / currentProjects.length)}
										</div>
										<div className='text-sm text-orange-600 font-medium'>Avg. Team Size</div>
									</div>
								</div>
							)}
						</div>
					</AnimatedCard>

					{/* Project Categories/Domains */}
					<AnimatedCard delay={0.3}>
						<div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
									<Target className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Project Domains</h2>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{[
									{ domain: 'Web Development', count: 15, color: 'from-blue-50 to-blue-100', icon: <Monitor className='w-8 h-8 text-blue-600' /> },
									{ domain: 'Mobile Applications', count: 8, color: 'from-green-50 to-green-100', icon: <Smartphone className='w-8 h-8 text-green-600' /> },
									{ domain: 'Machine Learning', count: 12, color: 'from-purple-50 to-purple-100', icon: <Brain className='w-8 h-8 text-purple-600' /> },
									{ domain: 'IoT & Embedded', count: 6, color: 'from-orange-50 to-orange-100', icon: <Cpu className='w-8 h-8 text-orange-600' /> },
									{ domain: 'Blockchain', count: 4, color: 'from-teal-50 to-teal-100', icon: <Shield className='w-8 h-8 text-teal-600' /> },
									{ domain: 'Healthcare Tech', count: 7, color: 'from-pink-50 to-pink-100', icon: <Heart className='w-8 h-8 text-pink-600' /> }
								].map((category, index) => (
									<div key={index} className={`bg-gradient-to-br ${category.color} rounded-lg p-6 border border-gray-200`}>
										<div className='flex items-center mb-4'>
											{category.icon}
											<h3 className='text-lg font-semibold text-gray-900 ml-3'>{category.domain}</h3>
										</div>
										<div className='flex items-center justify-between'>
											<span className='text-2xl font-bold text-gray-800'>{category.count}</span>
											<span className='text-sm text-gray-600'>Projects</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// If student-corner section is selected with seminars-workshops subsection
		if (activeSection === 'student-corner' && activeSubSection === 'seminars-workshops') {
			// Workshop/Seminar data structure
			interface WorkshopEvent {
				sno: number;
				eventActivity: string;
				date: string;
				resourcePerson: string;
				relevantPOs: string[];
				relevantPSOs: string[];
			}

			interface WorkshopData {
				'2022-23': WorkshopEvent[];
				'2021-22': WorkshopEvent[];
				'2020-21': WorkshopEvent[];
				'Conferences': WorkshopEvent[];
				'FDP': WorkshopEvent[];
			}

			const workshopData: WorkshopData = {
				'2022-23': [
					{
						sno: 1,
						eventActivity: 'CodeXploit Hacking AI',
						date: '05th June, 2023',
						resourcePerson: 'Mr. Bhavya Malhotra, CSE 3rd Year Student',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 2,
						eventActivity: 'Ideathon',
						date: '22 – 23rd April 23',
						resourcePerson: 'E-yantra and R&D societies',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO8', 'PO10'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 3,
						eventActivity: 'Project Ideation to Start-up Success',
						date: '04th May 2023',
						resourcePerson: 'Ms. Purva Aggarwal (C.E.O. Good Good Piggy)',
						relevantPOs: ['PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO3']
					},
					{
						sno: 4,
						eventActivity: 'Placement Guidance-CSE/AIDS/EEE',
						date: '02nd May 2023',
						resourcePerson: 'Dr. Abhishek Swaroop, Head T & P, HOD (IT) & Mr. Sanjay Dureja',
						relevantPOs: ['PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO3']
					},
					{
						sno: 5,
						eventActivity: 'Webinar on Web Development',
						date: '29th April 2023',
						resourcePerson: 'Mr. Shivank Kapur, CSE Student',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 6,
						eventActivity: 'Unleashing the Code: Roadmap to Programming',
						date: '24th April 2023',
						resourcePerson: 'Ms. Mahima Hans, S/W engineer at Microsoft',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 7,
						eventActivity: 'Intro to OpenSource and ML',
						date: '23rd April 2023',
						resourcePerson: 'Mr. Sayan Nath',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 8,
						eventActivity: 'SIGs on Machine Learning and Python',
						date: '14th April 2023(Every weekend, Fri, Sat and Sun)',
						resourcePerson: 'Himanshu, Jai, Harshit from IEEE-BPIT',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5'],
						relevantPSOs: ['PSO1', 'PSO2']
					},
					{
						sno: 9,
						eventActivity: 'Coding Contest',
						date: '10th April 2023',
						resourcePerson: 'Coding Ninjas',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO8', 'PO10'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 10,
						eventActivity: 'Seminar- The Placement Puzzle',
						date: '10th April 2023',
						resourcePerson: 'Mr. Simarjot Singh(ZS )',
						relevantPOs: ['PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO3']
					},
					{
						sno: 11,
						eventActivity: 'Webinar- Open Source and Development',
						date: '8th April 2023',
						resourcePerson: 'Mr. Diganta Kr Banik, Developer at Keploy',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 12,
						eventActivity: 'Exciting career opportunities after Engineering: help to crack GATE, ESE exams and campus placements',
						date: '28th March 2023',
						resourcePerson: 'Mr. Gurupal Singh, UnAcademy',
						relevantPOs: ['PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO3']
					},
					{
						sno: 13,
						eventActivity: 'Interview Preparation Bootcamp',
						date: '04 – 30th April 2023 (7 Days)',
						resourcePerson: 'Mr. Abhinav Awasthi, Founder of Crack DSA, Newton School Coding Club',
						relevantPOs: ['PO1', 'PO8', 'PO10', 'PO12'],
						relevantPSOs: ['PSO2', 'PSO3']
					},
					{
						sno: 14,
						eventActivity: 'Month-long Web Development Bootcamp',
						date: '07th Jan – 07th Feb 2023',
						resourcePerson: 'Mr. Praveen K P and Mr. Adarsh Halder, NSCC',
						relevantPOs: ['PO5', 'PO10', 'PO11'],
						relevantPSOs: ['PSO2']
					},
					{
						sno: 15,
						eventActivity: 'DSA Bootcamp',
						date: '3days(3 – 5th Jan 2023)',
						resourcePerson: 'Abhinav Awasthi DSA Mentor at Geeks of Geeks ,Upcoming SDEIntern at LinkedIn',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO10'],
						relevantPSOs: ['PSO1', 'PSO2']
					},
					{
						sno: 16,
						eventActivity: 'Ideathon',
						date: '22 – 23rd April 23',
						resourcePerson: 'NA',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO8', 'PO10'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 17,
						eventActivity: 'HackNITR 4.0 (Round 2)',
						date: '28 – 29th Jan 2023',
						resourcePerson: 'NA',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO8', 'PO9', 'PO11'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 18,
						eventActivity: 'HackNITR 4.0 (Round 1)',
						date: '6 – 8th Jan 2023',
						resourcePerson: 'NA',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO8', 'PO9', 'PO11'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 19,
						eventActivity: 'GeekTalk with Sandeep Jain',
						date: '28th Dec. 2022',
						resourcePerson: 'Mr Sandeep Jain,Founder and CEO Geeks of Geeks',
						relevantPOs: ['PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO3']
					},
					{
						sno: 20,
						eventActivity: '4th International Conference ICCIN-22',
						date: '15 – 16th Dec 2022',
						resourcePerson: 'CSE-BPIT',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 21,
						eventActivity: 'Basics of DSA Series: Arrays(Online)',
						date: '07th Dec. 2022',
						resourcePerson: 'Tanmay Arya',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 22,
						eventActivity: 'Newton\'s November Coding Challenge(Online)',
						date: '30th Nov. 2022',
						resourcePerson: 'N/A',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO8', 'PO10'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 23,
						eventActivity: 'Javascript Bootcamp(Online)',
						date: '30th Nov 2022 – 1st Dec 2022',
						resourcePerson: 'Harshita Sharma',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 24,
						eventActivity: 'Open Source Webinar',
						date: '25th Nov. 2022',
						resourcePerson: 'Vasundhara Shukla,GDG Lucknow',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5'],
						relevantPSOs: ['PSO1', 'PSO2']
					},
					{
						sno: 25,
						eventActivity: 'Interview Preparation Webinar',
						date: '21st Nov. 2022',
						resourcePerson: 'Sudesh Kumar',
						relevantPOs: ['PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO3']
					},
					{
						sno: 26,
						eventActivity: 'Webinar on Introduction to Cloud Computing (Google Cloud Developers Students Club)(GCDSC)',
						date: '19th Nov. 2022',
						resourcePerson: 'Ms. Tripti Shandilya and Mr. Siddhant Vijay Singh',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 27,
						eventActivity: 'ROBORACE',
						date: '24th Nov. 2022',
						resourcePerson: '–',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 28,
						eventActivity: 'ROBOWARS',
						date: '24th Nov. 22',
						resourcePerson: '–',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 29,
						eventActivity: 'DATATHON',
						date: '23 – 24th Nov. 2022',
						resourcePerson: '–',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 30,
						eventActivity: 'GRE & TOEFL insights',
						date: '10th Nov. 2022',
						resourcePerson: 'Mr Joseph Augentine, Jamboree',
						relevantPOs: ['PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO3']
					},
					{
						sno: 31,
						eventActivity: '30 Days NLP Training (FDP CUM SDP)',
						date: '7th Nov. 22 – 14th Dec. 22',
						resourcePerson: 'ICFOSS, Govt. of Kerala, India',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 32,
						eventActivity: 'Newton\'s October coding challenge(Online)',
						date: '27th Oct. 2022',
						resourcePerson: 'NA',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO8', 'PO10'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 33,
						eventActivity: 'Game of Codes National level coding contest(Online)',
						date: '21st Oct. 2022',
						resourcePerson: 'NA',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO8', 'PO10'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					},
					{
						sno: 34,
						eventActivity: 'Webinar on Design',
						date: '16th Oct. 2022',
						resourcePerson: 'Prishita Aggarwal,UI/UX Designer',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5'],
						relevantPSOs: ['PSO1', 'PSO2']
					},
					{
						sno: 35,
						eventActivity: 'UI/UX Bootcamp',
						date: '11th Oct. 2022',
						resourcePerson: 'Sowmiya V',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5'],
						relevantPSOs: ['PSO1', 'PSO2']
					},
					{
						sno: 36,
						eventActivity: 'Webinar on – "Opportunities in Research after Engineering"',
						date: '3rd Oct. 2022',
						resourcePerson: 'Ms. Nitika Rohra, DTU',
						relevantPOs: ['PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
						relevantPSOs: ['PSO3']
					},
					{
						sno: 37,
						eventActivity: 'Peptalk with Love Babbar ( #DEFINE)',
						date: '23rd Sep. 2022',
						resourcePerson: 'Mr Love Babbar (YouTuber and Influencer)',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5'],
						relevantPSOs: ['PSO1', 'PSO2']
					},
					{
						sno: 38,
						eventActivity: 'Workshop on IIT Delhi – Virtual Labs',
						date: '21st  Sep. 2022',
						resourcePerson: 'Mr. Chirag Kumar , Mr. Pradeep Sharma (IIT Delhi)',
						relevantPOs: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO12'],
						relevantPSOs: ['PSO1', 'PSO2', 'PSO3']
					}
				],
				'2021-22': [],
				'2020-21': [],
				'Conferences': [],
				'FDP': []
			};

			const currentWorkshops = workshopData[selectedWorkshopYear];

			return (
				<div className='space-y-8'>
					{/* Workshops Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Presentation className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Events & Activities Conducted by CSE Department</h1>
							<p className='text-purple-600 font-medium'>Webinars, Workshops, Conferences & Training Programs</p>
						</div>
					</motion.div>

					{/* Year Toggle */}
					<AnimatedCard delay={0.1}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center justify-between mb-6'>
								<h2 className='text-2xl font-bold text-gray-900'>Select Academic Year</h2>
								<div className='flex items-center space-x-2'>
									<Calendar className='w-5 h-5 text-gray-500' />
									<span className='text-sm text-gray-500'>Current: {selectedWorkshopYear}</span>
								</div>
							</div>

							<div className='flex flex-wrap justify-center gap-3'>
								{['2022-23', '2021-22', '2020-21', 'Conferences', 'FDP'].map((year) => (
									<button
										key={year}
										onClick={() => setSelectedWorkshopYear(year as '2022-23' | '2021-22' | '2020-21' | 'Conferences' | 'FDP')}
										className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedWorkshopYear === year
												? 'bg-purple-600 text-white shadow-lg'
												: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
											}`}
									>
										{year}
									</button>
								))}
							</div>
						</div>
					</AnimatedCard>

					{/* Events Table */}
					<AnimatedCard delay={0.2}>
						<div className='bg-white rounded-xl p-6 border border-gray-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
									<BookOpen className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Events for {selectedWorkshopYear}</h2>
							</div>

							{currentWorkshops.length > 0 ? (
								<div className='overflow-x-auto'>
									<table className='w-full border-collapse'>
										<thead>
											<tr className='bg-gray-50 border-b border-gray-200'>
												<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>S.No</th>
												<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Event/Activity</th>
												<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Date</th>
												<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Resource Person/Organization</th>
												<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200'>Relevant PO&apos;s</th>
												<th className='px-4 py-4 text-left text-sm font-semibold text-gray-900'>Relevant PSO&apos;s</th>
											</tr>
										</thead>
										<tbody className='divide-y divide-gray-200'>
											{currentWorkshops.map((workshop, index) => (
												<tr key={index} className='hover:bg-gray-50 transition-colors duration-200'>
													<td className='px-4 py-4 text-sm font-medium text-gray-900 border-r border-gray-200'>
														{workshop.sno}
													</td>
													<td className='px-4 py-4 text-sm font-medium text-blue-600 border-r border-gray-200'>
														{workshop.eventActivity}
													</td>
													<td className='px-4 py-4 text-sm text-gray-700 border-r border-gray-200'>
														{workshop.date}
													</td>
													<td className='px-4 py-4 text-sm text-gray-700 border-r border-gray-200'>
														{workshop.resourcePerson}
													</td>
													<td className='px-4 py-4 text-sm border-r border-gray-200'>
														<div className='flex flex-wrap gap-1'>
															{workshop.relevantPOs.map((po, idx) => (
																<span key={idx} className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md'>
																	{po}
																</span>
															))}
														</div>
													</td>
													<td className='px-4 py-4 text-sm'>
														<div className='flex flex-wrap gap-1'>
															{workshop.relevantPSOs.map((pso, idx) => (
																<span key={idx} className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md'>
																	{pso}
																</span>
															))}
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className='text-center py-12'>
									<Presentation className='w-16 h-16 text-gray-300 mx-auto mb-4' />
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>No Events Available</h3>
									<p className='text-gray-500'>Events for {selectedWorkshopYear} will be updated soon.</p>
								</div>
							)}

							{/* Event Statistics */}
							{currentWorkshops.length > 0 && (
								<div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
									<div className='bg-purple-50 rounded-lg p-4 text-center border border-purple-200'>
										<div className='text-2xl font-bold text-purple-600'>{currentWorkshops.length}</div>
										<div className='text-sm text-purple-600 font-medium'>Total Events</div>
									</div>
									<div className='bg-blue-50 rounded-lg p-4 text-center border border-blue-200'>
										<div className='text-2xl font-bold text-blue-600'>
											{currentWorkshops.filter(w => w.eventActivity.toLowerCase().includes('webinar')).length}
										</div>
										<div className='text-sm text-blue-600 font-medium'>Webinars</div>
									</div>
									<div className='bg-green-50 rounded-lg p-4 text-center border border-green-200'>
										<div className='text-2xl font-bold text-green-600'>
											{currentWorkshops.filter(w => w.eventActivity.toLowerCase().includes('workshop') || w.eventActivity.toLowerCase().includes('bootcamp')).length}
										</div>
										<div className='text-sm text-green-600 font-medium'>Workshops</div>
									</div>
									<div className='bg-orange-50 rounded-lg p-4 text-center border border-orange-200'>
										<div className='text-2xl font-bold text-orange-600'>
											{currentWorkshops.filter(w => w.eventActivity.toLowerCase().includes('contest') || w.eventActivity.toLowerCase().includes('hackathon') || w.eventActivity.toLowerCase().includes('ideathon')).length}
										</div>
										<div className='text-sm text-orange-600 font-medium'>Competitions</div>
									</div>
								</div>
							)}
						</div>
					</AnimatedCard>

					{/* Event Categories */}
					<AnimatedCard delay={0.3}>
						<div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3'>
									<Target className='w-6 h-6 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900'>Event Categories</h2>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{[
									{ category: 'Technical Webinars', count: 12, color: 'from-blue-50 to-blue-100', icon: <Monitor className='w-8 h-8 text-blue-600' /> },
									{ category: 'Coding Bootcamps', count: 8, color: 'from-green-50 to-green-100', icon: <Code className='w-8 h-8 text-green-600' /> },
									{ category: 'Career Guidance', count: 6, color: 'from-purple-50 to-purple-100', icon: <GraduationCap className='w-8 h-8 text-purple-600' /> },
									{ category: 'Industry Talks', count: 4, color: 'from-orange-50 to-orange-100', icon: <Briefcase className='w-8 h-8 text-orange-600' /> },
									{ category: 'Hackathons', count: 5, color: 'from-teal-50 to-teal-100', icon: <Zap className='w-8 h-8 text-teal-600' /> },
									{ category: 'Research & Dev', count: 3, color: 'from-pink-50 to-pink-100', icon: <Lightbulb className='w-8 h-8 text-pink-600' /> }
								].map((category, index) => (
									<div key={index} className={`bg-gradient-to-br ${category.color} rounded-lg p-6 border border-gray-200`}>
										<div className='flex items-center mb-4'>
											{category.icon}
											<h3 className='text-lg font-semibold text-gray-900 ml-3'>{category.category}</h3>
										</div>
										<div className='flex items-center justify-between'>
											<span className='text-2xl font-bold text-gray-800'>{category.count}</span>
											<span className='text-sm text-gray-600'>Events</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// Alumni Section
		if (activeSection === 'alumni') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Users2 className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Alumni Testimonials</h1>
							<p className='text-gray-600 font-medium'>Success stories from our distinguished graduates</p>
						</div>
					</motion.div>

					<AnimatedCard>
						<div className='bg-white rounded-xl p-6'>
							<div className='flex items-center space-x-2 mb-6'>
								<Users2 className='w-6 h-6 text-blue-600' />
								<h2 className='text-2xl font-bold text-gray-900'>Voices of Success</h2>
							</div>
							<p className='text-gray-600 mb-6'>
								Hear from our accomplished alumni who have made their mark in leading technology companies worldwide.
								Their journeys showcase the quality of education and opportunities that BPIT provides to shape future leaders.
							</p>

							<AlumniTestimonialsCarousel
								isHovered={alumniHovered}
								setIsHovered={setAlumniHovered}
							/>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// Publications Section
		if (activeSection === 'publications' && activeSubSection === 'faculty-publications') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<BookOpenCheck className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Faculty Publications</h1>
							<p className='text-gray-600 font-medium'>Research papers and publications by our esteemed faculty</p>
						</div>
					</motion.div>

					<AnimatedCard>
						<div className='bg-white rounded-xl p-6'>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-2'>
									<BookOpenCheck className='w-6 h-6 text-blue-600' />
									<h2 className='text-2xl font-bold text-gray-900'>Faculty Research Publications</h2>
								</div>
							</div>
							
							{/* Toggle Buttons */}
							<div className='flex flex-wrap justify-center gap-2 mb-8'>
								<div className='bg-gray-100 rounded-xl p-2'>
									<div className='flex flex-wrap gap-2'>
										{([
											'Journal 2024-25', 
											'Journal 2023-24', 
											'Journal 2022-23', 
											'Conference 2024-25', 
											'Conference 2023-24', 
											'Conference 2022-23', 
											'Book Chapter 2023-24', 
											'Book Chapter 2022-23', 
											'Patents 2023-24'
										] as const).map((type) => (
											<button 
												key={type}
												onClick={() => setSelectedPublicationType(type)}
												className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
													selectedPublicationType === type 
														? 'bg-blue-600 text-white shadow-lg' 
														: 'text-gray-600 hover:text-gray-900 hover:bg-white'
												}`}
											>
												{type}
											</button>
										))}
									</div>
								</div>
							</div>

							{/* Publications Content */}
							{selectedPublicationType === 'Journal 2024-25' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Journal Publications 2024-2025</h3>
										<div className='overflow-x-auto'>
											<table className='w-full'>
												<thead>
													<tr className='border-b border-blue-200'>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>Faculty Name</th>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>Paper Title</th>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>Journal</th>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>SCOPUS</th>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>Link</th>
													</tr>
												</thead>
												<tbody className='divide-y divide-blue-100'>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Nitish Pathak</td>
														<td className='py-4 px-4 text-gray-700'>OptiCharge: A firefly algorithm-based approach for minimizing electric vehicle waiting time at charging stations</td>
														<td className='py-4 px-4 text-gray-700'>Intelligent Decision Technologies</td>
														<td className='py-4 px-4'>
															<span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>Scopus</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://content.iospress.com/articles/intelligent-decision-technologies/idt230619' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Charu Gupta</td>
														<td className='py-4 px-4 text-gray-700'>Transient Empirical Machine Learning Models based on Bit Coin Price Prediction using High and Low Values</td>
														<td className='py-4 px-4 text-gray-700'>Recent Advances in Computer Science and Communications</td>
														<td className='py-4 px-4'>
															<span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>Scopus</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://www.eurekaselect.com/article/144817' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Charu Gupta</td>
														<td className='py-4 px-4 text-gray-700'>Adaptive Prefix Filtering for Accurate Code Clone Detection in Conjunction with Meta‐learning</td>
														<td className='py-4 px-4 text-gray-700'>SN Computer Science</td>
														<td className='py-4 px-4'>
															<span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>Scopus</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://doi.org/10.1007/s42979-024-03140-' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Charu Gupta</td>
														<td className='py-4 px-4 text-gray-700'>Differentially Processed Optimized Collaborative Rich Text Editor</td>
														<td className='py-4 px-4 text-gray-700'>Multimedia Tools and Applications</td>
														<td className='py-4 px-4'>
															<span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>Scopus</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://doi.org/10.1007/s11042-024-19734-3' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Vishal Khatri</td>
														<td className='py-4 px-4 text-gray-700'>Law Grit – One Stop Legal Solution</td>
														<td className='py-4 px-4 text-gray-700'>IJRASET</td>
														<td className='py-4 px-4'>
															<span className='bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium'>–</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://www.ijraset.com/best-journal/lawgrit-one-stop-legal-solution-website' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Ms. Anju Kaushik</td>
														<td className='py-4 px-4 text-gray-700'>Leveraging ChatGPT, AI and Web tools for cognitive development in individuals with mental disabilities</td>
														<td className='py-4 px-4 text-gray-700'>International Journal of research and Analytical reviews (IJRAR)</td>
														<td className='py-4 px-4'>
															<span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>Scopus</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://www.ijrar.org/papers/IJRAR24A2673.pdf' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Ms. Anju Kaushik</td>
														<td className='py-4 px-4 text-gray-700'>Unveiling Emotions Through Sentiment Analysis</td>
														<td className='py-4 px-4 text-gray-700'>ELSEVIER</td>
														<td className='py-4 px-4'>
															<span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>SCOPUS</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://ssrn.com/abstract=4759907' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Richa Vats</td>
														<td className='py-4 px-4 text-gray-700'>Interview Preparation Assistant</td>
														<td className='py-4 px-4 text-gray-700'>IJSREM</td>
														<td className='py-4 px-4'>
															<span className='bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium'>–</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://ijsrem.com/download/interview-preparation-assistant/' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-blue-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Richa Vats</td>
														<td className='py-4 px-4 text-gray-700'>CLINICAL RESEARCH: MEDICAL IMAGE PROCESSING, ANALYSIS, AND VISUALIZATION</td>
														<td className='py-4 px-4 text-gray-700'>International Journal of Electronics Engineering and Application</td>
														<td className='py-4 px-4'>
															<span className='bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium'>–</span>
														</td>
														<td className='py-4 px-4'>
															<a href='https://ijeea.in/?page_id=438' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}

							{selectedPublicationType === 'Journal 2023-24' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Journal Publications 2023-2024</h3>
										<div className='overflow-x-auto'>
											<table className='w-full'>
												<thead>
													<tr className='border-b border-indigo-200'>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>Faculty Name</th>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>Paper Title</th>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>Journal</th>
														<th className='text-left py-3 px-4 font-semibold text-gray-900'>Link</th>
													</tr>
												</thead>
												<tbody className='divide-y divide-indigo-100'>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr Bhawna Suri</td>
														<td className='py-4 px-4 text-gray-700'>A blockchain based private framework for facilitating digital forensics using iot</td>
														<td className='py-4 px-4 text-gray-700'>Journal of Discrete Mathematical Sciences and Cryptography</td>
														<td className='py-4 px-4'>
															<a href='https://tarupublications.com/doi/10.47974/JDMSC-1733' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr Shweta Taneja</td>
														<td className='py-4 px-4 text-gray-700'>A blockchain based private framework for facilitating digital forensics using iot</td>
														<td className='py-4 px-4 text-gray-700'>Journal of Discrete Mathematical Sciences and Cryptography</td>
														<td className='py-4 px-4'>
															<a href='https://tarupublications.com/doi/10.47974/JDMSC-1733' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Nitish Pathak</td>
														<td className='py-4 px-4 text-gray-700'>Decoding the growth of multimodal learning: A bibliometric exploration of its impact and influence</td>
														<td className='py-4 px-4 text-gray-700'>Intelligent Decision Technologies</td>
														<td className='py-4 px-4'>
															<a href='https://doi.org/10.3233/IDT-230727' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Nitish Pathak</td>
														<td className='py-4 px-4 text-gray-700'>Opticharge: A firefly algorithm-based approach for minimizing electric vehicle waiting time at charging stations</td>
														<td className='py-4 px-4 text-gray-700'>Intelligent Decision Technologies</td>
														<td className='py-4 px-4'>
															<a href='https://content.iospress.com/articles/intelligent-decision-technologies/idt230619' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Nitish Pathak</td>
														<td className='py-4 px-4 text-gray-700'>Computational Analysis: Unveiling the Quantum Algorithms for Protein Analysis and predictions</td>
														<td className='py-4 px-4 text-gray-700'>IEEE Access</td>
														<td className='py-4 px-4'>
															<a href='https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10235973' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Monika Arora</td>
														<td className='py-4 px-4 text-gray-700'>A Blockchain based Private Framework for Facilitating Digital Forensics using iot</td>
														<td className='py-4 px-4 text-gray-700'>Journal of Discrete Mathematical Sciences and Cryptography</td>
														<td className='py-4 px-4'>
															<a href='https://doi.org/10.47974/JDMSC-1733' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Monika Arora</td>
														<td className='py-4 px-4 text-gray-700'>Evaluation of text summarization techniques in healthcare domain: Pharmaceutical drug feedback</td>
														<td className='py-4 px-4 text-gray-700'>Intelligent Decision Technologies</td>
														<td className='py-4 px-4'>
															<a href='https://content.iospress.com/articles/intelligent-decision-technologies/idt230129' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Monika Arora</td>
														<td className='py-4 px-4 text-gray-700'>Classifying Hindi News Using Various Machine Learning and Deep Learning Techniques</td>
														<td className='py-4 px-4 text-gray-700'>International Journal on Artificial Intelligence Tools</td>
														<td className='py-4 px-4'>
															<a href='https://doi.org/10.1142/S0218213023500641' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Monika Arora</td>
														<td className='py-4 px-4 text-gray-700'>An optimized SVM-RFE based feature selection and weighted entropy K-means approach for big data clustering in mapreduce</td>
														<td className='py-4 px-4 text-gray-700'>Multimedia Tools and Applications</td>
														<td className='py-4 px-4'>
															<a href='https://doi.org/10.1007/s11042-023-18044-4' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Palak Girdhar</td>
														<td className='py-4 px-4 text-gray-700'>Real-time sign language recognition using CNNS</td>
														<td className='py-4 px-4 text-gray-700'>Advances and Applications in Mathematical Sciences</td>
														<td className='py-4 px-4'>
															<a href='https://www.mililink.com/upload/article/1192354776aams_vol_2211_sep_2023_a4_p2199-2211_jatin_aggarwal_et_al.pdf' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Mugdha Sharma</td>
														<td className='py-4 px-4 text-gray-700'>Application of intelligent adaptive neuro fuzzy method for reusability of component-based software system</td>
														<td className='py-4 px-4 text-gray-700'>The International Arab Journal of Information Technology (IAJIT)</td>
														<td className='py-4 px-4'>
															<a href='http://dx.doi.org/10.34028/iajit/20/5/10' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Richa Sharma</td>
														<td className='py-4 px-4 text-gray-700'>Application of intelligent adaptive neuro fuzzy method for reusability of component-based software system</td>
														<td className='py-4 px-4 text-gray-700'>The International Arab Journal of Information Technology (IAJIT)</td>
														<td className='py-4 px-4'>
															<a href='http://dx.doi.org/10.34028/iajit/20/5/10' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Dr. Richa Sharma</td>
														<td className='py-4 px-4 text-gray-700'>An automated face mask detection system using transfer learning based neural network to preventing viral infection</td>
														<td className='py-4 px-4 text-gray-700'>Expert Systems, Wiley</td>
														<td className='py-4 px-4'>
															<a href='https://onlinelibrary.wiley.com/doi/abs/10.1111/exsy.13507' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Ms. Pratibha Sharma</td>
														<td className='py-4 px-4 text-gray-700'>Leveraging ChatGPT, AI and Web tools for cognitive development in individuals with mental disabilities</td>
														<td className='py-4 px-4 text-gray-700'>International Journal of research and Analytical reviews (IJRAR)</td>
														<td className='py-4 px-4'>
															<a href='https://www.ijrar.org/papers/IJRAR24A2673.pdf' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
													<tr className='hover:bg-indigo-25 transition-colors'>
														<td className='py-4 px-4 font-medium text-gray-900'>Ms. Anju Kaushik</td>
														<td className='py-4 px-4 text-gray-700'>Leveraging ChatGPT, AI and Web tools for cognitive development in individuals with mental disabilities</td>
														<td className='py-4 px-4 text-gray-700'>International Journal of research and Analytical reviews (IJRAR)</td>
														<td className='py-4 px-4'>
															<a href='https://www.ijrar.org/papers/IJRAR24A2673.pdf' 
																target='_blank' 
																rel='noopener noreferrer'
																className='text-blue-600 hover:text-blue-800 text-sm underline break-all'>
																View Paper
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}

							{selectedPublicationType === 'Journal 2022-23' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Journal Publications 2022-2023</h3>
										<div className='text-center py-12'>
											<div className='w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
												<BookOpenCheck className='w-12 h-12 text-emerald-600' />
											</div>
											<h4 className='text-lg font-bold text-gray-900 mb-4'>Journal Papers 2022-23</h4>
											<p className='text-gray-600 max-w-md mx-auto'>
												Journal publications for 2022-23 are being compiled. Please check back soon for detailed listings.
											</p>
										</div>
									</div>
								</div>
							)}

							{selectedPublicationType === 'Conference 2024-25' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Conference Publications 2024-2025</h3>
										<div className='text-center py-12'>
											<div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
												<Presentation className='w-12 h-12 text-green-600' />
											</div>
											<h4 className='text-lg font-bold text-gray-900 mb-4'>Conference Papers</h4>
											<p className='text-gray-600 max-w-md mx-auto'>
												Conference publications for 2024-25 are being compiled. Please check back soon for detailed listings.
											</p>
										</div>
									</div>
								</div>
							)}

							{selectedPublicationType === 'Conference 2023-24' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-green-50 to-lime-50 rounded-xl p-6 border border-green-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Conference Publications 2023-2024</h3>
										<div className='text-center py-12'>
											<div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
												<Presentation className='w-12 h-12 text-green-600' />
											</div>
											<h4 className='text-lg font-bold text-gray-900 mb-4'>Conference Papers 2023-24</h4>
											<p className='text-gray-600 max-w-md mx-auto'>
												Conference publications for 2023-24 are being organized. Please check back soon for comprehensive listings.
											</p>
										</div>
									</div>
								</div>
							)}

							{selectedPublicationType === 'Conference 2022-23' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Conference Publications 2022-2023</h3>
										<div className='text-center py-12'>
											<div className='w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6'>
												<Presentation className='w-12 h-12 text-cyan-600' />
											</div>
											<h4 className='text-lg font-bold text-gray-900 mb-4'>Conference Papers 2022-23</h4>
											<p className='text-gray-600 max-w-md mx-auto'>
												Conference publications for 2022-23 are being compiled. Please visit soon for detailed conference paper listings.
											</p>
										</div>
									</div>
								</div>
							)}

							{selectedPublicationType === 'Book Chapter 2023-24' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Book Chapters 2023-2024</h3>
										<div className='text-center py-12'>
											<div className='w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6'>
												<BookOpen className='w-12 h-12 text-amber-600' />
											</div>
											<h4 className='text-lg font-bold text-gray-900 mb-4'>Book Chapters 2023-24</h4>
											<p className='text-gray-600 max-w-md mx-auto'>
												Book chapter contributions for 2023-24 are being documented. Please check back for complete chapter listings.
											</p>
										</div>
									</div>
								</div>
							)}

							{selectedPublicationType === 'Book Chapter 2022-23' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Book Chapters 2022-2023</h3>
										<div className='text-center py-12'>
											<div className='w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6'>
												<BookOpen className='w-12 h-12 text-rose-600' />
											</div>
											<h4 className='text-lg font-bold text-gray-900 mb-4'>Book Chapters 2022-23</h4>
											<p className='text-gray-600 max-w-md mx-auto'>
												Book chapter information for 2022-23 is being organized. Please visit soon for comprehensive chapter details.
											</p>
										</div>
									</div>
								</div>
							)}

							{selectedPublicationType === 'Patents 2023-24' && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>Patents 2023-2024</h3>
										<div className='text-center py-12'>
											<div className='w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
												<Shield className='w-12 h-12 text-purple-600' />
											</div>
											<h4 className='text-lg font-bold text-gray-900 mb-4'>Patent Applications</h4>
											<p className='text-gray-600 max-w-md mx-auto'>
												Patent information for 2023-24 is being organized. Please visit soon for comprehensive patent listings.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Summary Statistics */}
							<div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
								<div className='bg-blue-50 rounded-lg p-4 text-center border border-blue-200'>
									<div className='text-2xl font-bold text-blue-600'>24</div>
									<div className='text-sm text-gray-600'>Total Journal Papers</div>
								</div>
								<div className='bg-indigo-50 rounded-lg p-4 text-center border border-indigo-200'>
									<div className='text-2xl font-bold text-indigo-600'>15</div>
									<div className='text-sm text-gray-600'>Papers (2023-24)</div>
								</div>
								<div className='bg-green-50 rounded-lg p-4 text-center border border-green-200'>
									<div className='text-2xl font-bold text-green-600'>6</div>
									<div className='text-sm text-gray-600'>Scopus Indexed (2024-25)</div>
								</div>
								<div className='bg-purple-50 rounded-lg p-4 text-center border border-purple-200'>
									<div className='text-2xl font-bold text-purple-600'>12</div>
									<div className='text-sm text-gray-600'>Faculty Contributors</div>
								</div>
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		if (activeSection === 'publications' && activeSubSection === 'student-publications') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<NotebookPen className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Student Publications</h1>
							<p className='text-gray-600 font-medium'>Research achievements and publications by our talented students</p>
						</div>
					</motion.div>

					<AnimatedCard>
						<div className='bg-white rounded-xl p-6'>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-2'>
									<NotebookPen className='w-6 h-6 text-green-600' />
									<h2 className='text-2xl font-bold text-gray-900'>Student Research Publications</h2>
								</div>
								<div className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
									{selectedStudentYear === '2023-24' && '5 Publications'} 
									{selectedStudentYear === '2022-23' && '16 Publications'}
									{selectedStudentYear === '2021-22' && '12 Publications'}
									{selectedStudentYear === '2020-21' && '12 Publications'}
								</div>
							</div>
							
							<div className='mb-6'>
								<div className='flex flex-wrap gap-2'>
									{['2023-24', '2022-23', '2021-22', '2020-21'].map((year) => (
										<button
											key={year}
											onClick={() => setSelectedStudentYear(year as '2023-24' | '2022-23' | '2021-22' | '2020-21')}
											className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
												selectedStudentYear === year
													? 'bg-green-600 text-white shadow-md'
													: 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600'
											}`}>
											{year}
										</button>
									))}
								</div>
							</div>

							{selectedStudentYear === '2023-24' && (
								<div className='overflow-x-auto'>
									<table className='w-full border-collapse'>
										<thead>
											<tr className='bg-gray-50'>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>S.No</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Authors</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Paper Title</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Year</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Journal/Conference</th>
											</tr>
										</thead>
										<tbody>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>1</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Devansh Dhingra, Arin Verma, Ankur Goyal, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Comparative analysis of different models for depression detection using natural language processing</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2024</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Social Network Analysis and Mining</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Vibha Jain, Dr. Priyanka Ahlawat, Dr. Deepika Sharma, Dr. Ashu Gupta, Arshpreet Singh, Abhay Mittal, Himanshu Yadav, Richa Chauhan</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Combining Euclidean Distance and Cosine Similarity for Enhanced Performance in FAISS-Based Large Language Model Retrieval</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2024</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>ICMLBDA 2024</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Shailesh Jaloree, Dr. Abhishek Kumar, Dr. Priyanka Ahlawat, Sidhant Goel, Harsh Gupta, Anshul Jain, Anirudh Sagar</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Comparative analysis of traditional machine learning algorithms and neural networks for agricultural recommendation systems</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2024</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>ICMLBDA 2024</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Vibha Jain, Priyanka Ahlawat, Deepika Sharma, Ashu Gupta, Arshpreet Singh, Abhay Mittal, Himanshu Yadav, Richa Chauhan</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Retrieval-Augmented Generation: Bridging the Gap Between Language Models and Domain-Specific Knowledge</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2024</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>ICRTC 2024</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Yuvraj Sharma, Anirudh Yadav, Bawa Singh, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>A dynamic approach for customer lifetime value analysis using machine learning techniques</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2024</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>ICMLBDA 2024</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}

							{selectedStudentYear === '2022-23' && (
								<div className='overflow-x-auto'>
									<table className='w-full border-collapse'>
										<thead>
											<tr className='bg-gray-50'>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>S.No</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Authors</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Paper Title</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Year</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Journal/Conference</th>
											</tr>
										</thead>
										<tbody>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>1</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Adarsh Maurya, Arpit Jain, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>SIMS: Student Information Management System for Education Institutes</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS), Volume: 1</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Bhawna Sharma, Shivam Prakash, Dr. Ramesh Kumar</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>A blockchain-based approach for secure e-voting system</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>The 5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Harshit Jain, Deepanshu Dhawan, Anurag Sharma, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Implementation of Secure Car Parking using IoT</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Md Arish Khan, Alok Jalan, MD Furqan, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart Classroom System Based on Internet of Things (IoT)</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Ujjawal Dixit, Sidhesh Bharti, Samanyu Sood, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart Agriculture using Internet of Things (IoT)</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>6</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Vedant Prabhat, Sakshi Aggarwal, Simar Preet Singh, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart Kitchen Assistant using Deep Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>7</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Bhavik Goyal, Himanshu Gupta, Dr. Mukul Gupta</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Fake Product Detection using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>8</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Gurdip Singh, Tarun Bhardwaj, Ayush Bhardwaj, Dr. Mukul Gupta</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Multi-Factor Authentication Using Machine Learning Technique</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>9</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Hrishikesh Shrimali, Yuvraj Singh, Himmat Singh, Dr. Mukul Gupta</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Facial Emotion Recognition System Based on Machine Learning Approach</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>10</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Manan Kwatra, Shreshth Goel, Divyanshu, Dr. Mukul Gupta</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Disease Prediction and Drug Recommendation using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>11</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Mohit Khokhani, Shivank Aggarwal, Ishant Jain, Dr. Mukul Gupta</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Stock Price Prediction using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>12</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Tanmay Gupta, Sagarjeet Vir Singh, Manav Kumar, Dr. Mukul Gupta</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Fingerprint Recognition using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>13</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Vipul Sondhi, Yashraj Parnami, Sanskriti Anand, Dr. Mukul Gupta</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Real Time License Plate Recognition using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>14</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Arundeep Singh, Dr. Jatinder Kaur</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>A Novel Heart Disease Prediction Paradigm using KNN Imputation with Bio-Inspired Bayesian Optimization</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Journal of Engineering Research & Technology (IJAERT), ISSN: 2278-0181, Vol.12, Issue. 5</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>15</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Samit Kumar, Shivam Raj, Dr. Shashi Bhushan Kotwal</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Automated Wrist Fracture Detection in X-Ray Images: A Comprehensive Study Using Deep Learning Techniques</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>International Journal of Cognitive Computing in Engineering (IJCCE), Elsevier, Vol. 4</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>16</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Manish Gupta, Piyush Mishra, Dr. Shashi Bhushan Kotwal</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Hybrid Approach for Breast Cancer Detection and Masking in Digital Mammograms</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2023</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>International Journal of Cognitive Computing in Engineering (IJCCE), Elsevier, Vol. 4</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}

							{selectedStudentYear === '2021-22' && (
								<div className='overflow-x-auto'>
									<table className='w-full border-collapse'>
										<thead>
											<tr className='bg-gray-50'>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>S.No</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Authors</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Paper Title</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Year</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Journal/Conference</th>
											</tr>
										</thead>
										<tbody>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>1</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Akshdeep Singh, Priyanka Sharma, Kushal Kansal, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Intelligent Traffic Lights Control System</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Anuj Sharma, Sachin Sharma, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Analysis of Credit Card Default Prediction using Neural Networks</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Anushka Bansal, Hardik Makkar, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Credit Card Fraud Detection: A Comparative Analysis of Machine Learning Algorithms</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Ayush Raj, Harshit Gera, Shivam Sharma, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart Home Automation System using IoT</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Esha Wadhawan, Himank Soni, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Movie Recommendation System Based on Collaborative Filtering</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>6</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Gautam Singh, Aayush Sharma, Gaurav Prasad, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>COVID-19 Detection System using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>7</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Komal Narvekar, Nikita Parashar, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Prediction of Chronic Kidney Disease using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>8</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Lokesh Singla, Nikhil Bansal, Tushar Patheja, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart E-Learning System using Machine Learning and Artificial Intelligence</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>9</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Priyanka, Gagan Deep, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Prediction of House Price using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>10</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Priyanshu Kumar, Yash Raj, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Heart Disease Prediction using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>11</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Sparsh Jain, Akash Jain, Shubham Nanda, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart Car Security and Tracking System using GPS and IoT</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>12</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Yash Dhiman, Pardeep Kumar, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Fake News Detection using Machine Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2022</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4th International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}

							{selectedStudentYear === '2020-21' && (
								<div className='overflow-x-auto'>
									<table className='w-full border-collapse'>
										<thead>
											<tr className='bg-gray-50'>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>S.No</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Authors</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Paper Title</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Year</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Journal/Conference</th>
											</tr>
										</thead>
										<tbody>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>1</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Amit Kumar, Aakash Verma, Rishav Khanna, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart Health Monitoring System using IoT</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Arjun Singh, Ayush Goyal, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Automated Smart Irrigation System for Agriculture</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Chirag Jain, Harsh Verma, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Stock Market Prediction using Machine Learning and Deep Learning</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>4</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Deepak Sharma, Rohit Kumar, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart Traffic Management System using AI</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>5</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Hitesh Aggarwal, Karan Bhatt, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Sentiment Analysis of Social Media Data using Natural Language Processing</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>6</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Kunal Sharma, Mohit Jain, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart City Management using IoT and Big Data</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>7</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Manish Singh, Nitin Kumar, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>E-Commerce Recommendation System using Collaborative Filtering</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>8</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Pradeep Kumar, Rahul Gupta, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Voice Controlled Home Automation System</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>9</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Rajesh Singh, Sumit Kumar, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>COVID-19 Contact Tracing System using Mobile Application</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>10</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Sandeep Sharma, Vikash Kumar, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Blockchain-Based Secure Voting System</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>11</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Shubham Jain, Tanuj Sharma, Dr. Priyanka Ahlawat</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Intelligent Chatbot for Customer Support using NLP</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
											<tr className='hover:bg-gray-50'>
												<td className='border border-gray-200 px-4 py-3 text-sm'>12</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Vikas Sharma, Yash Agarwal, Dr. Aman Jatain</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>Smart Energy Management System for Buildings</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>2021</td>
												<td className='border border-gray-200 px-4 py-3 text-sm'>3rd International Conference on Information Systems & Management Science (ISMS)</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}

							<div className='mt-6 text-center text-sm text-gray-500'>
								Total Student Publications: 45 | Spanning 4 Academic Years
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		if (activeSection === 'publications' && activeSubSection === 'patents') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Shield className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Patents</h1>
							<p className='text-gray-600 font-medium'>Intellectual property and innovations by our department</p>
						</div>
					</motion.div>

					<AnimatedCard>
						<div className='bg-white rounded-xl p-6'>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-2'>
									<Shield className='w-6 h-6 text-purple-600' />
									<h2 className='text-2xl font-bold text-gray-900'>Patents & Intellectual Property</h2>
								</div>
								<div className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
									{selectedPatentYear === '2023-24' && '5 Patents'}
									{selectedPatentYear === '2022-23' && 'Coming Soon'}
								</div>
							</div>
							
							<div className='mb-6'>
								<div className='flex flex-wrap gap-2'>
									{['2023-24', '2022-23'].map((year) => (
										<button
											key={year}
											onClick={() => setSelectedPatentYear(year as '2023-24' | '2022-23')}
											className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
												selectedPatentYear === year
													? 'bg-purple-600 text-white shadow-md'
													: 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
											}`}>
											{year}
										</button>
									))}
								</div>
							</div>

							{selectedPatentYear === '2023-24' && (
								<div className='space-y-6'>
									<div className='overflow-x-auto'>
										<h3 className='text-xl font-semibold text-gray-900 mb-4'>Patents Published/Granted 2023-2024</h3>
										<table className='w-full border-collapse'>
											<thead>
												<tr className='bg-gray-50'>
													<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Patent Application No.</th>
													<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Status</th>
													<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Inventor/s Name</th>
													<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Title of the Patent</th>
													<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Applicant/s Name</th>
													<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Links</th>
												</tr>
											</thead>
											<tbody>
												<tr className='hover:bg-gray-50'>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>400286-001</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
															Granted
														</span>
													</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Nitish Pathak, Dr. Neelam Sharma, Dr. Monica Bhutani, Dr. Monica Gupta, Dr. Bhavya Alankar, Dr Jeetendra Pande, Harsh Vardhan Pant, Dr. Kirti Gupta</td>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>Students Behaviour Monitoring Device</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Nitish Pathak, Dr. Neelam Sharma, Dr. Monica Bhutani, Dr. Monica Gupta, Dr. Bhavya Alankar, Dr Jeetendra Pande, Harsh Vardhan Pant, Dr. Kirti Gupta</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<a href='https://search.ipindia.gov.in/DesignApplicationStatus' target='_blank' rel='noopener noreferrer' className='text-purple-600 hover:text-purple-800 underline'>
															View Patent
														</a>
													</td>
												</tr>
												<tr className='hover:bg-gray-50'>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>389750-001</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
															Granted
														</span>
													</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Nitish Pathak, Dr. Neelam Sharma, Dr. Archana Balyan, Dr. Suman Mann, Dr. Sumit Jain, Dr. Alka Pant</td>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>Machine Learning based Mobile Jammer</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Nitish Pathak, Dr. Neelam Sharma, Dr. Archana Balyan, Dr. Suman Mann, Dr. Sumit Jain, Dr. Alka Pant</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<a href='https://search.ipindia.gov.in/DesignApplicationStatus' target='_blank' rel='noopener noreferrer' className='text-purple-600 hover:text-purple-800 underline'>
															View Patent
														</a>
													</td>
												</tr>
												<tr className='hover:bg-gray-50'>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>392866-001</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
															Granted
														</span>
													</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Nitish Pathak, Dr. Neelam Sharma, Dr. Binu Thomas, Dr. Jacob Bose, Dr. B. S. Daga, Dr. Bhavya Alankar, Dr. Mahaveerakannan R</td>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>AI-Based Micro GPS Tracking Chip</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Nitish Pathak, Dr. Neelam Sharma, Dr. Binu Thomas, Dr. Jacob Bose, Dr. B. S. Daga, Dr. Bhavya Alankar, Dr. Mahaveerakannan R</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<a href='https://search.ipindia.gov.in/DesignApplicationStatus' target='_blank' rel='noopener noreferrer' className='text-purple-600 hover:text-purple-800 underline'>
															View Patent
														</a>
													</td>
												</tr>
												<tr className='hover:bg-gray-50'>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>202311075031</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
															Published
														</span>
													</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Pavan Kumar Pandey, Dr.Vineet Kansal, Dr.Abhishek Swaroop, Dr. Monika Arora</td>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>Public Key Infrastructure Based Secure Multipath Routing in Vehicular Ad-Hoc Networks</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Pavan Kumar Pandey, Dr.Vineet Kansal, Dr.Abhishek Swaroop, Dr. Monika Arora</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<a href='https://iprsearch.ipindia.gov.in/PatentSearch/PatentSearch/ViewApplicationStatus' target='_blank' rel='noopener noreferrer' className='text-purple-600 hover:text-purple-800 underline'>
															View Patent
														</a>
													</td>
												</tr>
												<tr className='hover:bg-gray-50'>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>L-144100/2024</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800'>
															Copyright
														</span>
													</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Bhawna Suri, Dr. Shweta Taneja, Dr. Monika Arora</td>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>Confman-An Automated Conference Management Process</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>Dr. Bhawna Suri, Dr. Shweta Taneja, Dr. Monika Arora</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>
														<span className='text-gray-500 text-xs'>Link not available</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							)}

							{selectedPatentYear === '2022-23' && (
								<div className='text-center py-12'>
									<div className='w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
										<Shield className='w-12 h-12 text-purple-600' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-4'>Patents 2022-23</h3>
									<p className='text-gray-600 max-w-md mx-auto'>
										Patent information for academic year 2022-23 is being compiled. Please check back soon for updates.
									</p>
								</div>
							)}

							<div className='mt-6 text-center text-sm text-gray-500'>
								Total Patents & IP: 5 | Including 3 Granted Patents, 1 Published Patent, and 1 Copyright
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		if (activeSection === 'publications' && activeSubSection === 'magazine') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Camera className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Department Magazine</h1>
							<p className='text-gray-600 font-medium'>Annual publications showcasing department activities and achievements</p>
						</div>
					</motion.div>

					<AnimatedCard>
						<div className='bg-white rounded-xl p-6'>
							<div className='flex items-center space-x-2 mb-6'>
								<Camera className='w-6 h-6 text-orange-600' />
								<h2 className='text-2xl font-bold text-gray-900'>CSE Department Magazine</h2>
							</div>
							<p className='text-gray-600 mb-6'>
								Our annual magazine captures the essence of department life, featuring student achievements, 
								faculty accomplishments, technical articles, and memorable events throughout the academic year.
							</p>
							<div className='text-center py-12'>
								<div className='w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6'>
									<Camera className='w-12 h-12 text-orange-600' />
								</div>
								<h3 className='text-xl font-bold text-gray-900 mb-4'>Magazine Archive</h3>
								<p className='text-gray-600 max-w-md mx-auto'>
									Digital copies of our department magazines are being prepared. Check back soon for downloadable editions.
								</p>
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		if (activeSection === 'publications' && activeSubSection === 'newsletter') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Newspaper className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Department Newsletter</h1>
							<p className='text-gray-600 font-medium'>The Department Publishes Newsletter twice in a year</p>
						</div>
					</motion.div>

					<AnimatedCard>
						<div className='bg-white rounded-xl p-6'>
							<div className='flex items-center space-x-2 mb-6'>
								<Newspaper className='w-6 h-6 text-teal-600' />
								<h2 className='text-2xl font-bold text-gray-900'>CSE Newsletter Archive</h2>
							</div>
							<p className='text-gray-600 mb-8'>
								Stay updated with the latest happenings in the CSE department through our bi-annual newsletters 
								featuring news, achievements, events, and important announcements.
							</p>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
								{/* 2023 Newsletters */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.1 }}
									className='bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-100 hover:shadow-lg transition-shadow duration-300'>
									<div className='flex items-center justify-center mb-4'>
										<div className='w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center'>
											<Calendar className='w-6 h-6 text-white' />
										</div>
									</div>
									<h3 className='text-xl font-bold text-gray-900 text-center mb-2'>JULY 2023</h3>
									<p className='text-center text-sm text-gray-600 mb-4'>Summer Edition</p>
									<div className='text-center'>
										<button className='bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center mx-auto'>
											<Download className='w-4 h-4 mr-2' />
											Download PDF
										</button>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-300'>
									<div className='flex items-center justify-center mb-4'>
										<div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center'>
											<Calendar className='w-6 h-6 text-white' />
										</div>
									</div>
									<h3 className='text-xl font-bold text-gray-900 text-center mb-2'>DEC 2023</h3>
									<p className='text-center text-sm text-gray-600 mb-4'>Winter Edition</p>
									<div className='text-center'>
										<button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto'>
											<Download className='w-4 h-4 mr-2' />
											Download PDF
										</button>
									</div>
								</motion.div>

								{/* 2022 Newsletters */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.3 }}
									className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100 hover:shadow-lg transition-shadow duration-300'>
									<div className='flex items-center justify-center mb-4'>
										<div className='w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center'>
											<Sun className='w-6 h-6 text-white' />
										</div>
									</div>
									<h3 className='text-xl font-bold text-gray-900 text-center mb-2'>JULY 2022</h3>
									<p className='text-center text-sm text-gray-600 mb-4'>Summer Reflection</p>
									<div className='text-center'>
										<button className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center mx-auto'>
											<Download className='w-4 h-4 mr-2' />
											Download PDF
										</button>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									className='bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-6 border border-purple-100 hover:shadow-lg transition-shadow duration-300'>
									<div className='flex items-center justify-center mb-4'>
										<div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center'>
											<Snowflake className='w-6 h-6 text-white' />
										</div>
									</div>
									<h3 className='text-xl font-bold text-gray-900 text-center mb-2'>DEC 2022</h3>
									<p className='text-center text-sm text-gray-600 mb-4'>Winter Reflection</p>
									<div className='text-center'>
										<button className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center mx-auto'>
											<Download className='w-4 h-4 mr-2' />
											Download PDF
										</button>
									</div>
								</motion.div>

								{/* 2021 Newsletters */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.5 }}
									className='bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-100 hover:shadow-lg transition-shadow duration-300'>
									<div className='flex items-center justify-center mb-4'>
										<div className='w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center'>
											<Sun className='w-6 h-6 text-white' />
										</div>
									</div>
									<h3 className='text-xl font-bold text-gray-900 text-center mb-2'>JULY 2021</h3>
									<p className='text-center text-sm text-gray-600 mb-4'>Summer Reflection</p>
									<div className='text-center'>
										<button className='bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center mx-auto'>
											<Download className='w-4 h-4 mr-2' />
											Download PDF
										</button>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.6 }}
									className='bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100 hover:shadow-lg transition-shadow duration-300'>
									<div className='flex items-center justify-center mb-4'>
										<div className='w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center'>
											<Snowflake className='w-6 h-6 text-white' />
										</div>
									</div>
									<h3 className='text-xl font-bold text-gray-900 text-center mb-2'>DEC 2021</h3>
									<p className='text-center text-sm text-gray-600 mb-4'>Winter Reflection</p>
									<div className='text-center'>
										<button className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center mx-auto'>
											<Download className='w-4 h-4 mr-2' />
											Download PDF
										</button>
									</div>
								</motion.div>

								{/* 2020 Newsletters */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.7 }}
									className='bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 border border-red-100 hover:shadow-lg transition-shadow duration-300'>
									<div className='flex items-center justify-center mb-4'>
										<div className='w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center'>
											<Sun className='w-6 h-6 text-white' />
										</div>
									</div>
									<h3 className='text-xl font-bold text-gray-900 text-center mb-2'>JULY 2020</h3>
									<p className='text-center text-sm text-gray-600 mb-4'>Summer Reflection</p>
									<div className='text-center'>
										<button className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center mx-auto'>
											<Download className='w-4 h-4 mr-2' />
											Download PDF
										</button>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.8 }}
									className='bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-6 border border-slate-100 hover:shadow-lg transition-shadow duration-300'>
									<div className='flex items-center justify-center mb-4'>
										<div className='w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center'>
											<Snowflake className='w-6 h-6 text-white' />
										</div>
									</div>
									<h3 className='text-xl font-bold text-gray-900 text-center mb-2'>DEC 2020</h3>
									<p className='text-center text-sm text-gray-600 mb-4'>Winter Reflection</p>
									<div className='text-center'>
										<button className='bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors duration-200 flex items-center mx-auto'>
											<Download className='w-4 h-4 mr-2' />
											Download PDF
										</button>
									</div>
								</motion.div>
							</div>

							<div className='mt-8 text-center'>
								<div className='inline-flex items-center px-4 py-2 bg-teal-50 text-teal-700 rounded-lg'>
									<Info className='w-4 h-4 mr-2' />
									<span className='text-sm font-medium'>
										Newsletters are published twice yearly - July (Summer Edition) & December (Winter Edition)
									</span>
								</div>
							</div>

							<div className='mt-6 text-center text-sm text-gray-500'>
								Total Newsletters: 8 | Spanning 4 Years (2020-2023)
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		if (activeSection === 'result') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<BarChart className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Semester Results</h1>
							<p className='text-gray-600 font-medium'>Access B.Tech semester-wise examination results</p>
						</div>
					</motion.div>

					{/* Result Filters */}
					<AnimatedCard delay={0.1}>
						<div className='bg-white rounded-xl p-6 border border-gray-200 shadow-sm'>
							<h3 className='text-xl font-bold text-gray-900 mb-6'>Filter Results</h3>
							
							{/* Year Selection */}
							<div className='mb-6'>
								<h4 className='text-lg font-semibold text-gray-800 mb-3'>Academic Year</h4>
								<div className='flex flex-wrap gap-3'>
									{['2023-24', '2022-23', 'Previous'].map((year) => (
										<button
											key={year}
											onClick={() => setSelectedResultYear(year as '2023-24' | '2022-23' | 'Previous')}
											className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
												selectedResultYear === year
													? 'bg-emerald-600 text-white shadow-md'
													: 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
											}`}>
											{year}
										</button>
									))}
								</div>
							</div>

							{/* Semester Selection - Only for non-Previous years */}
							{selectedResultYear !== 'Previous' && (
								<div className='mb-6'>
									<h4 className='text-lg font-semibold text-gray-800 mb-3'>Semester</h4>
									<div className='flex flex-wrap gap-3'>
										{['Odd', 'Even'].map((semester) => (
											<button
												key={semester}
												onClick={() => setSelectedResultSemester(semester as 'Odd' | 'Even')}
												className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
													selectedResultSemester === semester
														? 'bg-blue-600 text-white shadow-md'
														: 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
												}`}>
												{semester} Semester
											</button>
										))}
									</div>
								</div>
							)}
						</div>
					</AnimatedCard>

					{/* Results Content */}
					<AnimatedCard delay={0.2}>
						<div className='bg-white rounded-xl p-6 border border-gray-200 shadow-sm'>
							{/* 2023-24 Odd Semester Results */}
							{selectedResultYear === '2023-24' && selectedResultSemester === 'Odd' && (
								<div className='space-y-8'>
									<div className='text-center mb-8'>
										<h2 className='text-2xl font-bold text-gray-900 mb-2'>
											Result 2023-24 Odd Semester (B.Tech. Programme)
										</h2>
										<div className='w-24 h-1 bg-emerald-500 mx-auto rounded-full'></div>
									</div>

									{/* Program-wise Results */}
									<div className='space-y-6'>
										{/* ECE Results */}
										<div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200'>
											<h3 className='text-xl font-bold text-blue-900 mb-4 flex items-center'>
												<Cpu className='w-6 h-6 mr-3 text-blue-600' />
												B.Tech (Electronics and Communication Engineering)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{[
													'ECE 2022-2026 3rd SEM REGULAR',
													'ECE 2020-2024 7th SEM REGULAR',
													'ECE 2021-2025 5th SEM REGULAR',
													'ECE 2023-2027 1st SEM REGULAR'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium'>{result}</span>
															<button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
																<Download className='w-4 h-4 mr-2' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* EEE Results */}
										<div className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200'>
											<h3 className='text-xl font-bold text-yellow-900 mb-4 flex items-center'>
												<Zap className='w-6 h-6 mr-3 text-yellow-600' />
												B.Tech (Electrical and Electronics Engineering)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{[
													'EEE 2022-2026 3rd SEM REGULAR',
													'EEE 2020-2024 7th SEM REGULAR',
													'EEE 2021-2025 5th SEM REGULAR',
													'EEE 2023-2027 1st SEM REGULAR'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-yellow-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium'>{result}</span>
															<button className='bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
																<Download className='w-4 h-4 mr-2' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* CSE Results */}
										<div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200'>
											<h3 className='text-xl font-bold text-green-900 mb-4 flex items-center'>
												<Code className='w-6 h-6 mr-3 text-green-600' />
												B.Tech (Computer Science Engineering)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{[
													'CSE 2022-2026 3rd SEM REGULAR',
													'CSE 2020-2024 7th SEM REGULAR',
													'CSE 2021-2025 5th SEM REGULAR',
													'CSE 2023-2027 1st SEM REGULAR'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium'>{result}</span>
															<button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
																<Download className='w-4 h-4 mr-2' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* IT Results */}
										<div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200'>
											<h3 className='text-xl font-bold text-purple-900 mb-4 flex items-center'>
												<Monitor className='w-6 h-6 mr-3 text-purple-600' />
												B.Tech (IT)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{[
													'IT 2022-2026 3rd SEM REGULAR',
													'IT 2020-2024 7th SEM REGULAR',
													'IT 2021-2025 5th SEM REGULAR',
													'IT 2023-2027 1st SEM REGULAR'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-purple-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium'>{result}</span>
															<button className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
																<Download className='w-4 h-4 mr-2' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* AI&DS Results */}
										<div className='bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200'>
											<h3 className='text-xl font-bold text-red-900 mb-4 flex items-center'>
												<Brain className='w-6 h-6 mr-3 text-red-600' />
												B.Tech (AI&DS)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div className='bg-white rounded-lg p-4 border border-red-200 hover:shadow-md transition-shadow'>
													<div className='flex items-center justify-between'>
														<span className='text-gray-800 font-medium'>AI&DS 2022-2026 3rd SEM REGULAR</span>
														<button className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
															<Download className='w-4 h-4 mr-2' />
															View
														</button>
													</div>
												</div>
											</div>
										</div>

										{/* CSE&DS Results */}
										<div className='bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200'>
											<h3 className='text-xl font-bold text-teal-900 mb-4 flex items-center'>
												<Database className='w-6 h-6 mr-3 text-teal-600' />
												B.Tech (CSE&DS)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div className='bg-white rounded-lg p-4 border border-teal-200 hover:shadow-md transition-shadow'>
													<div className='flex items-center justify-between'>
														<span className='text-gray-800 font-medium'>CSE&DS 2023-2027 1st SEM REGULAR</span>
														<button className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
															<Download className='w-4 h-4 mr-2' />
															View
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* 2022-23 Even Semester Results */}
							{selectedResultYear === '2022-23' && selectedResultSemester === 'Even' && (
								<div className='space-y-8'>
									<div className='text-center mb-8'>
										<h2 className='text-2xl font-bold text-gray-900 mb-2'>
											Result 2022-23 Even Semester (B.Tech. Programme)
										</h2>
										<div className='w-24 h-1 bg-emerald-500 mx-auto rounded-full'></div>
									</div>

									{/* Program-wise Results */}
									<div className='space-y-6'>
										{/* ECE Results */}
										<div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200'>
											<h3 className='text-xl font-bold text-blue-900 mb-4 flex items-center'>
												<Cpu className='w-6 h-6 mr-3 text-blue-600' />
												B.Tech (Electronics and Communication Engineering)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{[
													'ECE 2022-2026 2nd SEM REGULAR',
													'ECE 2020-2024 6th SEM REGULAR',
													'ECE 2021-2025 4th SEM REGULAR',
													'ECE 2019-2023 8th SEM REGULAR'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium'>{result}</span>
															<button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
																<Download className='w-4 h-4 mr-2' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* EEE Results */}
										<div className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200'>
											<h3 className='text-xl font-bold text-yellow-900 mb-4 flex items-center'>
												<Zap className='w-6 h-6 mr-3 text-yellow-600' />
												B.Tech (Electrical and Electronics Engineering)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{[
													'EEE 2022-2026 2nd SEM REGULAR',
													'EEE 2020-2024 6th SEM REGULAR',
													'EEE 2021-2025 4th SEM REGULAR',
													'EEE 2019-2023 8th SEM REGULAR'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-yellow-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium'>{result}</span>
															<button className='bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
																<Download className='w-4 h-4 mr-2' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* CSE Results */}
										<div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200'>
											<h3 className='text-xl font-bold text-green-900 mb-4 flex items-center'>
												<Code className='w-6 h-6 mr-3 text-green-600' />
												B.Tech (Computer Science Engineering)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{[
													'CSE 2022-2026 2nd SEM REGULAR',
													'CSE 2020-2024 6th SEM REGULAR',
													'CSE 2021-2025 4th SEM REGULAR',
													'CSE 2019-2023 8th SEM REGULAR'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium'>{result}</span>
															<button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
																<Download className='w-4 h-4 mr-2' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* IT Results */}
										<div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200'>
											<h3 className='text-xl font-bold text-purple-900 mb-4 flex items-center'>
												<Monitor className='w-6 h-6 mr-3 text-purple-600' />
												B.Tech (IT)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{[
													'IT 2022-2026 2nd SEM REGULAR',
													'IT 2020-2024 6th SEM REGULAR',
													'IT 2021-2025 4th SEM REGULAR',
													'IT 2019-2023 8th SEM REGULAR'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-purple-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium'>{result}</span>
															<button className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
																<Download className='w-4 h-4 mr-2' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* AI&DS Results */}
										<div className='bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200'>
											<h3 className='text-xl font-bold text-red-900 mb-4 flex items-center'>
												<Brain className='w-6 h-6 mr-3 text-red-600' />
												B.Tech (AI&DS)
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div className='bg-white rounded-lg p-4 border border-red-200 hover:shadow-md transition-shadow'>
													<div className='flex items-center justify-between'>
														<span className='text-gray-800 font-medium'>AI&DS 2022-2026 2nd SEM REGULAR</span>
														<button className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center'>
															<Download className='w-4 h-4 mr-2' />
															View
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Previous Results */}
							{selectedResultYear === 'Previous' && (
								<div className='space-y-8'>
									<div className='text-center mb-8'>
										<h2 className='text-2xl font-bold text-gray-900 mb-2'>
											Previous Results
										</h2>
										<div className='w-24 h-1 bg-emerald-500 mx-auto rounded-full'></div>
									</div>

									{/* 2022-23 Odd & Even Semester */}
									<div className='bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200'>
										<h3 className='text-xl font-bold text-gray-900 mb-6 flex items-center'>
											<Calendar className='w-6 h-6 mr-3 text-gray-600' />
											Result 2022-23 Odd & Even Semester
										</h3>

										{/* MBA Results */}
										<div className='mb-8'>
											<h4 className='text-lg font-semibold text-blue-900 mb-4 flex items-center'>
												<GraduationCap className='w-5 h-5 mr-2 text-blue-600' />
												Master of Business Administration
											</h4>
											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
												{[
													'MBA I Sem 2021-23 Result',
													'MBA III Sem 2020-22 Result',
													'MBA 4th Sem result 2020-22'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium text-sm'>{result}</span>
															<button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center'>
																<Download className='w-3 h-3 mr-1' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* BBA Results */}
										<div>
											<h4 className='text-lg font-semibold text-green-900 mb-4 flex items-center'>
												<BookOpen className='w-5 h-5 mr-2 text-green-600' />
												Bachelor of Business Administration
											</h4>
											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
												{[
													'BBA I Sem 2021-24 Result',
													'Results of BBA 2nd & 4th Sem June 2021',
													'BBA III Sem 2020-23 Result',
													'BBA 4th Sem Result 2020-23',
													'BBA V Sem 2019-22 Result',
													'BBA 6th Sem 2019-22 result'
												].map((result, index) => (
													<div key={index} className='bg-white rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow'>
														<div className='flex items-center justify-between'>
															<span className='text-gray-800 font-medium text-sm'>{result}</span>
															<button className='bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center'>
																<Download className='w-3 h-3 mr-1' />
																View
															</button>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>

									{/* Legacy Results */}
									<div className='bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200'>
										<h3 className='text-xl font-bold text-amber-900 mb-6 flex items-center'>
											<Archive className='w-6 h-6 mr-3 text-amber-600' />
											Legacy Results (2018-2022)
										</h3>
										
										<div className='space-y-6'>
											{/* ECE Legacy */}
											<div>
												<h4 className='text-lg font-semibold text-blue-900 mb-3'>Electronics and Communication Engineering</h4>
												<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
													{[
														'ECE 2018-2022 1st SEM REAPPEAR 2022',
														'ECE 2019-2023 1st SEM REAPPEAR 2022',
														'ECE 2020-2024 1st SEM REAPPEAR 2022',
														'ECE 2021-2025 1st SEM REGULAR 2022',
														'ECE 3rd SEM LE REGULAR 2022',
														'ECE 2020-2024 3rd SEM REGULAR 2022',
														'ECE 2018-2022 3rd SEM REAPPEAR 2022',
														'ECE 2019-2023 3rd SEM REAPPEAR 2022',
														'ECE 2019-2023 5th SEM REGULAR 2022',
														'ECE 2018-2022 7th SEM REGULAR 2022'
													].map((result, index) => (
														<div key={index} className='bg-white rounded-lg p-3 border border-blue-200 hover:shadow-md transition-shadow'>
															<div className='flex items-center justify-between'>
																<span className='text-gray-800 font-medium text-sm'>{result}</span>
																<button className='bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center'>
																	<Download className='w-3 h-3 mr-1' />
																	View
																</button>
															</div>
														</div>
													))}
												</div>
											</div>

											{/* EEE Legacy */}
											<div>
												<h4 className='text-lg font-semibold text-yellow-900 mb-3'>Electrical and Electronics Engineering</h4>
												<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
													{[
														'EEE 2018-2022 1st SEM REAPPEAR 2022',
														'EEE 2019-2023 1st SEM REAPPEAR 2022',
														'EEE 2020-2024 1st SEM REAPPEAR 2022',
														'EEE 2021-2025 1st SEM REGULAR 2022',
														'EEE 3rd SEM LE REGULAR',
														'EEE 2020-2024 3rd SEM REGULAR',
														'EEE 2018-2022 3rd SEM REAPPEAR 2022',
														'EEE 2019-2023 3rd SEM REAPPEAR 2022',
														'EEE 2019-2023 5th SEM REGULAR 2022',
														'EEE 2018-2022 7th SEM REGULAR 2022'
													].map((result, index) => (
														<div key={index} className='bg-white rounded-lg p-3 border border-yellow-200 hover:shadow-md transition-shadow'>
															<div className='flex items-center justify-between'>
																<span className='text-gray-800 font-medium text-sm'>{result}</span>
																<button className='bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center'>
																	<Download className='w-3 h-3 mr-1' />
																	View
																</button>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Help Section */}
							<div className='mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200'>
								<h3 className='text-lg font-bold text-indigo-900 mb-4 flex items-center'>
									<HelpCircle className='w-5 h-5 mr-2 text-indigo-600' />
									Need Help?
								</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<p className='text-gray-700 font-medium'>For result-related queries:</p>
										<p className='text-indigo-600 font-semibold'>📧 results@bpit.ac.in</p>
										<p className='text-indigo-600 font-semibold'>📞 +91-11-2757-1101</p>
									</div>
									<div className='space-y-2'>
										<p className='text-gray-700 font-medium'>Examination Office Hours:</p>
										<p className='text-gray-600'>Monday - Friday: 9:00 AM - 5:00 PM</p>
										<p className='text-gray-600'>Saturday: 9:00 AM - 1:00 PM</p>
									</div>
								</div>
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		if (activeSection === 'placement') {
			return (
				<div className='space-y-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<TrendingUp className='w-8 h-8 text-white' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>Placements</h1>
							<p className='text-gray-600 font-medium'>Outstanding placement records showcasing student success stories</p>
						</div>
					</motion.div>

					<AnimatedCard>
						<div className='bg-white rounded-xl p-6'>
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-2'>
									<TrendingUp className='w-6 h-6 text-emerald-600' />
									<h2 className='text-2xl font-bold text-gray-900'>Placement Statistics</h2>
								</div>
								<div className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
									{selectedPlacementYear === '2020-24' && '123 Students Placed'}
									{selectedPlacementYear === '2019-23' && '98 Students Placed'}
									{selectedPlacementYear === '2018-22' && '114 Students Placed'}
									{selectedPlacementYear === '2017-21' && '120 Students Placed'}
								</div>
							</div>
							
							<div className='mb-6'>
								<div className='flex flex-wrap gap-2'>
									{['2020-24', '2019-23', '2018-22', '2017-21'].map((year) => (
										<button
											key={year}
											onClick={() => setSelectedPlacementYear(year as '2020-24' | '2019-23' | '2018-22' | '2017-21')}
											className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
												selectedPlacementYear === year
													? 'bg-emerald-600 text-white shadow-md'
													: 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
											}`}>
											{year}
										</button>
									))}
								</div>
							</div>

							{selectedPlacementYear === '2020-24' && (
								<div className='overflow-x-auto'>
									<table className='w-full border-collapse'>
										<thead>
											<tr className='bg-gray-50'>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>S.No.</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Enrollment No.</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Name</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Stream</th>
												<th className='border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'>Company</th>
											</tr>
										</thead>
										<tbody>
											{[
												{ sno: 1, enrollment: '00120802720', name: 'AADISH JAIN', stream: 'CSE A', company: 'SALESCODE' },
												{ sno: 2, enrollment: '00220802720', name: 'AAKASH RATURI', stream: 'CSE A', company: 'COMPRO' },
												{ sno: 3, enrollment: '00220807221', name: 'DHRUV CHANDHOK', stream: 'CSE A', company: 'POLICY BAZAAR' },
												{ sno: 4, enrollment: '00320802720', name: 'AAMIR', stream: 'CSE A', company: 'TCS' },
												{ sno: 5, enrollment: '00520802720', name: 'ABHIPRAYA SINHA', stream: 'CSE A', company: 'ZOMATO' },
												{ sno: 6, enrollment: '00620807221', name: 'KUNAL KUMAR MISHRA', stream: 'CSE A', company: 'MOTHERSON' },
												{ sno: 7, enrollment: '00720802720', name: 'ABHISHEK JHA', stream: 'CSE A', company: 'TCS' },
												{ sno: 8, enrollment: '00820802720', name: 'ABHISHEK JHA', stream: 'CSE A', company: 'TCS' },
												{ sno: 9, enrollment: '00920802720', name: 'ABHISHEK SHARMA', stream: 'CSE A', company: 'TCS' },
												{ sno: 10, enrollment: '01020802720', name: 'ADITYA AZAD SINGH', stream: 'CSE A', company: 'SOFTAGE' },
												{ sno: 11, enrollment: '01120802720', name: 'ADITYA KUMAR', stream: 'CSE A', company: 'BIGOH' },
												{ sno: 12, enrollment: '01420802720', name: 'AKANKSHA', stream: 'CSE A', company: 'GOVT JOB' },
												{ sno: 13, enrollment: '01520802720', name: 'AKANSHA MITTAL', stream: 'CSE A', company: 'ACCENTURE' },
												{ sno: 14, enrollment: '01820802720', name: 'AMANDEEP SINGH', stream: 'CSE A', company: 'DAFFODIL' },
												{ sno: 15, enrollment: '01920802720', name: 'AMIT TRIPATHI', stream: 'CSE A', company: 'BIGOH' },
												{ sno: 16, enrollment: '02020802720', name: 'ANCHAL KAPIL', stream: 'CSE A', company: 'MOTHERSON' },
												{ sno: 17, enrollment: '02220802720', name: 'ANIKET SHOBHIT', stream: 'CSE A', company: 'RX LOGIX' },
												{ sno: 18, enrollment: '02320802720', name: 'ANISHA GUPTA', stream: 'CSE A', company: 'PERSISTENT SYSTEMS' },
												{ sno: 19, enrollment: '02520802720', name: 'ANKIT SHAH', stream: 'CSE A', company: 'QUALCOMM' },
												{ sno: 20, enrollment: '02820802720', name: 'ARPIT MOHAN SRIVASTAVA', stream: 'CSE A', company: 'TECH MAHINDRA' },
												{ sno: 21, enrollment: '02920802720', name: 'ASHISH', stream: 'CSE A', company: 'GO DIGIT' },
												{ sno: 22, enrollment: '03020802720', name: 'ASHWARY PRATAP', stream: 'CSE A', company: 'AON' },
												{ sno: 23, enrollment: '03220802720', name: 'AYUSH GARG', stream: 'CSE A', company: 'CODEDAMN PVT. LTD.' },
												{ sno: 24, enrollment: '03320802720', name: 'AYUSH SAINI', stream: 'CSE A', company: 'TCS' },
												{ sno: 25, enrollment: '03420802720', name: 'AYUSH SHARMA', stream: 'CSE A', company: 'PROTIVITI' },
												{ sno: 26, enrollment: '04020802720', name: 'CHETAS PAHUJA', stream: 'CSE A', company: 'ION' },
												{ sno: 27, enrollment: '04220802720', name: 'DEEPANSHU', stream: 'CSE A', company: 'DELOITTE' },
												{ sno: 28, enrollment: '35120802720', name: 'PRATYAKSH KHURANA', stream: 'CSE A', company: 'SALESCODE' },
												{ sno: 29, enrollment: '35220802720', name: 'ARUSHI GUPTA', stream: 'CSE A', company: 'ACCENTURE' },
												{ sno: 30, enrollment: '35320802720', name: 'RUPASHI GOEL', stream: 'CSE A', company: 'NEWGEN' },
												{ sno: 31, enrollment: '35420802720', name: 'JIGYASA CHOPRA', stream: 'CSE A', company: 'CG INFINITY' },
												{ sno: 32, enrollment: '35520802720', name: 'AKRITI AJIT', stream: 'CSE A', company: 'MYNTRA' },
												{ sno: 33, enrollment: '35620802720', name: 'ANSHIKA GUPTA', stream: 'CSE A', company: 'NEWGEN' },
												{ sno: 34, enrollment: '35920802720', name: 'ABHINAV GOEL', stream: 'CSE A', company: 'DELOITTE' },
												{ sno: 35, enrollment: '36020802720', name: 'ANUSHKA MISHRA', stream: 'CSE A', company: 'PUBLICIS SAPIENT' },
												{ sno: 36, enrollment: '36120802720', name: 'SHAURYA DHINGRA', stream: 'CSE A', company: 'ACCENTURE' },
												{ sno: 37, enrollment: '36220802720', name: 'SAKSHAM BATRA', stream: 'CSE A', company: 'MOTHERSON' },
												{ sno: 38, enrollment: '36320802720', name: 'SOVEN DARA', stream: 'CSE A', company: 'DELOITTE' },
												{ sno: 39, enrollment: '36420802720', name: 'ROHAN BHARDWAJ', stream: 'CSE A', company: 'TECH MAHINDRA' },
												{ sno: 40, enrollment: '36520802720', name: 'HIMANK JAIN', stream: 'CSE A', company: 'PROTIVITI' },
												{ sno: 41, enrollment: '36820802720', name: 'PARTH AGGARWAL', stream: 'CSE A', company: 'DELOITTE' },
												{ sno: 42, enrollment: '00820807221', name: 'GAURAV KUMAR JHA', stream: 'CSE B', company: 'TCS' },
												{ sno: 43, enrollment: '01320807221', name: 'ANEELA SIDDIQUI', stream: 'CSE B', company: 'TCS' },
												{ sno: 44, enrollment: '01620807221', name: 'DIWAKAR KUMAR', stream: 'CSE B', company: 'TCS' },
												{ sno: 45, enrollment: '01720807221', name: 'ABHISHEK SHARMA', stream: 'CSE B', company: 'TCS' },
												{ sno: 46, enrollment: '04320802720', name: 'DEEPIKA', stream: 'CSE B', company: 'PERSISTENT SYSTEMS' },
												{ sno: 47, enrollment: '04420802720', name: 'DEEPTI MITTAL', stream: 'CSE B', company: 'JUSPAY' },
												{ sno: 48, enrollment: '04720802720', name: 'DIYA SRIVASTAVA', stream: 'CSE B', company: 'PERSISTENT SYSTEMS' },
												{ sno: 49, enrollment: '05020802720', name: 'FAHEEMUDDIN NASEEM', stream: 'CSE B', company: 'LIBSYS' },
												{ sno: 50, enrollment: '05220802720', name: 'GOMSI MITTAL', stream: 'CSE B', company: 'AVALON' }
											].map((student, index) => (
												<tr key={index} className='hover:bg-gray-50'>
													<td className='border border-gray-200 px-4 py-3 text-sm'>{student.sno}</td>
													<td className='border border-gray-200 px-4 py-3 text-xs font-mono'>{student.enrollment}</td>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium'>{student.name}</td>
													<td className='border border-gray-200 px-4 py-3 text-sm'>{student.stream}</td>
													<td className='border border-gray-200 px-4 py-3 text-sm font-medium text-emerald-600'>{student.company}</td>
												</tr>
											))}
										</tbody>
									</table>
									<div className='mt-4 text-center'>
										<div className='inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg'>
											<Info className='w-4 h-4 mr-2' />
											<span className='text-sm font-medium'>
												Showing first 50 entries. Total 123 students placed in 2020-24 batch.
											</span>
										</div>
									</div>
								</div>
							)}

							{selectedPlacementYear === '2019-23' && (
								<div className='text-center py-12'>
									<div className='w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
										<TrendingUp className='w-12 h-12 text-emerald-600' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-4'>Placement Data 2019-23</h3>
									<p className='text-gray-600 max-w-md mx-auto mb-6'>
										Comprehensive placement data for 2019-23 batch with 98 successful placements in top companies.
									</p>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto'>
										<div className='bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-100'>
											<div className='text-2xl font-bold text-emerald-600'>98</div>
											<div className='text-sm text-gray-600'>Total Placements</div>
										</div>
										<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100'>
											<div className='text-2xl font-bold text-blue-600'>85%</div>
											<div className='text-sm text-gray-600'>Placement Rate</div>
										</div>
										<div className='bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100'>
											<div className='text-2xl font-bold text-purple-600'>50+</div>
											<div className='text-sm text-gray-600'>Companies</div>
										</div>
									</div>
								</div>
							)}

							{selectedPlacementYear === '2018-22' && (
								<div className='text-center py-12'>
									<div className='w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
										<TrendingUp className='w-12 h-12 text-emerald-600' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-4'>Placement Data 2018-22</h3>
									<p className='text-gray-600 max-w-md mx-auto mb-6'>
										Outstanding placement record for 2018-22 batch with 114 successful placements across diverse industries.
									</p>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto'>
										<div className='bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-100'>
											<div className='text-2xl font-bold text-emerald-600'>114</div>
											<div className='text-sm text-gray-600'>Total Placements</div>
										</div>
										<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100'>
											<div className='text-2xl font-bold text-blue-600'>88%</div>
											<div className='text-sm text-gray-600'>Placement Rate</div>
										</div>
										<div className='bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100'>
											<div className='text-2xl font-bold text-purple-600'>60+</div>
											<div className='text-sm text-gray-600'>Companies</div>
										</div>
									</div>
								</div>
							)}

							{selectedPlacementYear === '2017-21' && (
								<div className='text-center py-12'>
									<div className='w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
										<TrendingUp className='w-12 h-12 text-emerald-600' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-4'>Placement Data 2017-21</h3>
									<p className='text-gray-600 max-w-md mx-auto mb-6'>
										Exceptional placement achievements for 2017-21 batch with 120 successful placements in leading organizations.
									</p>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto'>
										<div className='bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-100'>
											<div className='text-2xl font-bold text-emerald-600'>120</div>
											<div className='text-sm text-gray-600'>Total Placements</div>
										</div>
										<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100'>
											<div className='text-2xl font-bold text-blue-600'>92%</div>
											<div className='text-sm text-gray-600'>Placement Rate</div>
										</div>
										<div className='bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100'>
											<div className='text-2xl font-bold text-purple-600'>75+</div>
											<div className='text-sm text-gray-600'>Companies</div>
										</div>
									</div>
								</div>
							)}

							<div className='mt-8 text-center'>
								<div className='inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg'>
									<Award className='w-4 h-4 mr-2' />
									<span className='text-sm font-medium'>
										Total 455+ Students Placed | Top Companies: Amazon, Google, Microsoft, TCS, Accenture
									</span>
								</div>
							</div>

							<div className='mt-6 text-center text-sm text-gray-500'>
								Placement Records: 4 Years | 2017-2024 | Consistent Excellence in Student Careers
							</div>
						</div>
					</AnimatedCard>
				</div>
			);
		}

		// Add basic content for other sections
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
							Information Technology 
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
						className={`bg-white rounded-full shadow-lg border border-gray-200 p-3 hover:shadow-xl transition-all duration-300 ${isMobileMenuOpen ? 'bg-blue-600 text-white' : 'text-gray-900'
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
													className={`flex-1 text-left p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeSection === section.id && !activeSubSection
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
															className={`p-2 rounded-lg transition-colors ${activeSection === section.id && !activeSubSection
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
																className={`w-4 h-4 ml-auto transition-transform ${activeSection === section.id && !activeSubSection
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
														className={`p-3 rounded-xl transition-all duration-300 ml-2 ${expandedSections.includes(section.id)
																? 'bg-blue-50 text-blue-700'
																: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
															}`}
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}>
														<ChevronDown
															className={`w-4 h-4 transition-transform ${expandedSections.includes(section.id)
																	? 'rotate-180'
																	: ''
																} ${expandedSections.includes(section.id)
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
																	className={`w-full text-left p-2 pl-4 rounded-lg transition-all duration-200 group text-sm ${activeSection === section.id &&
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
																			className={`p-1 rounded transition-colors ${activeSection === section.id &&
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
												className={`flex-1 text-left p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeSection === section.id && !activeSubSection
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
														className={`p-2 rounded-lg transition-colors ${activeSection === section.id && !activeSubSection
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
															className={`w-4 h-4 ml-auto transition-transform ${activeSection === section.id && !activeSubSection
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
													className={`p-3 rounded-xl transition-all duration-300 ml-2 ${expandedSections.includes(section.id)
															? 'bg-blue-50 text-blue-700'
															: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
														}`}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}>
													<ChevronDown
														className={`w-4 h-4 transition-transform ${expandedSections.includes(section.id)
																? 'rotate-180'
																: ''
															} ${expandedSections.includes(section.id)
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
																className={`w-full text-left p-2 pl-4 rounded-lg transition-all duration-200 group text-sm ${activeSection === section.id &&
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
																		className={`p-1 rounded transition-colors ${activeSection === section.id &&
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