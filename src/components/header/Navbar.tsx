'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Menu,
	X,
	Building2,
	Target,
	Users,
	Award,
	Calendar,
	BookOpen,
	DollarSign,
	GraduationCap,
	Home,
	Shield,
	Camera,
	Music,
	MessageSquare,
	BarChart3,
	Briefcase,
	FileText,
	Download,
	HelpCircle,
	Star,
	CreditCard,
	ClipboardList,
	BookMarked,
	TrendingUp,
	Network,
	Users2,
	Scale,
	UserX,
	LogIn,
	CheckCircle,
	BarChart,
	Bell,
	Search,
	ArrowLeft,
	ChevronRight,
	Phone,
	Mail,
	MapPin,
	Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [activeSection, setActiveSection] = useState('');
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	
	// For swipe gesture
	const dragX = useMotionValue(0);
	const background = useTransform(
		dragX,
		[-100, 0, 100],
		['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']
	);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
				setIsMobileMenuOpen(false);
			}
		};

		if (isMobileMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'unset';
		};
	}, [isMobileMenuOpen]);

	const aboutBPITItems = [
		{
			title: 'About Us',
			href: '/about',
			description: 'Leadership insights and institutional overview',
			icon: <Building2 className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Vision & Mission',
			href: '/vision-mission',
			description: 'Our goals and objectives for shaping future engineers',
			icon: <Target className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Governing Body',
			href: '/management',
			description: 'Management, administration & faculties',
			icon: <Users className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Statutory Committees',
			href: '/iqac',
			description: 'IQAC, Anti-Ragging, and other statutory committees',
			icon: <Shield className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Mandatory Disclosures',
			href: '/accreditation',
			description: 'AICTE/NBA accreditation and mandatory disclosures',
			icon: <Award className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Photo & Video Gallery',
			href: '/gallery',
			description: 'Campus life, events, and institutional memories',
			icon: <Camera className='w-4 h-4 text-blue-600' />
		}
	];

	const admissionsItems = [
		{
			title: 'Why Choose BPIT?',
			href: '/admissions/why-choose',
			description: 'Top placement records, accreditation, and excellence',
			icon: <Star className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Admission Process & Eligibility',
			href: '/admissions/process',
			description: 'Step-by-step admission process and eligibility criteria',
			icon: <ClipboardList className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Fee Structure',
			href: '/admissions/fees',
			description: 'Program fees and payment information',
			icon: <DollarSign className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Scholarships',
			href: '/admissions/scholarships',
			description: 'Financial assistance and merit scholarships',
			icon: <GraduationCap className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Download Brochure',
			href: '/admissions/brochure',
			description: 'Complete information brochure and prospectus',
			icon: <Download className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'FAQs',
			href: '/admissions/faqs',
			description: 'Frequently asked questions about admissions',
			icon: <HelpCircle className='w-4 h-4 text-blue-600' />
		}
	];

	const academicsItems = [
		{
			title: 'Academic Calendar',
			href: '/academics/calendar',
			description: 'Important academic dates and semester schedules',
			icon: <Calendar className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Examination & Results',
			href: '/academics/examination',
			description: 'Exam schedules, results, and academic performance',
			icon: <FileText className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Syllabus & Ordinances',
			href: '/academics/syllabus',
			description: 'Course curriculum, syllabus, and academic ordinances',
			icon: <BookOpen className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Library / Resource Center',
			href: '/academics/library',
			description: 'Library resources, digital collections, and services',
			icon: <BookMarked className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Notices & Circulars',
			href: '/academics/notices',
			description: 'Important notices, circulars, and announcements',
			icon: <Bell className='w-4 h-4 text-blue-600' />
		}
	];

	const departmentItems = [
		{
			title: 'Computer Science & Engineering',
			href: '/departments/cse',
			description:
				'Software development, algorithms, and programming expertise',
			icon: (
				<div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
					<span className='text-blue-600 font-semibold text-xs'>CS</span>
				</div>
			)
		},
		{
			title: 'Information Technology',
			href: '/departments/it',
			description: 'Network systems, cybersecurity, and IT infrastructure',
			icon: (
				<div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
					<span className='text-green-600 font-semibold text-xs'>IT</span>
				</div>
			)
		},
		{
			title: 'Electronics & Communication',
			href: '/departments/ece',
			description: 'Circuit design, telecommunications, and embedded systems',
			icon: (
				<div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
					<span className='text-purple-600 font-semibold text-xs'>EC</span>
				</div>
			)
		},
		{
			title: 'Electrical & Electronics',
			href: '/departments/eee',
			description: 'Power systems, automation, and electrical machinery',
			icon: (
				<div className='w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center'>
					<span className='text-orange-600 font-semibold text-xs'>EE</span>
				</div>
			)
		},
		{
			title: 'Management Programs',
			href: '/departments/mba',
			description: 'Business administration and management studies',
			icon: (
				<div className='w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center'>
					<span className='text-rose-600 font-semibold text-xs'>MG</span>
				</div>
			)
		}
	];

	const placementsItems = [
		{
			title: 'Placement Cell Overview',
			href: '/placements/overview',
			description: 'About our placement cell and career services',
			icon: <TrendingUp className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'About T&P',
			href: '/placements/training-placement',
			description: 'Message from T&P, T&P team, and department details',
			icon: <MessageSquare className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Our Recruiters',
			href: '/placements/recruiters',
			description: 'Industry partners and recruiting companies',
			icon: <Briefcase className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Placement Statistics',
			href: '/placements/statistics',
			description: 'Placement records, packages, and success stories',
			icon: <BarChart3 className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Internship Opportunities',
			href: '/placements/internships',
			description: 'Industry internships and training programs',
			icon: <Users2 className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Alumni Network',
			href: '/placements/alumni',
			description: 'Connect with our successful alumni network',
			icon: <Network className='w-4 h-4 text-blue-600' />
		}
	];

	const studentLifeItems = [
		{
			title: 'Campus Facilities',
			href: '/student-life/facilities',
			description: 'Hostel, canteen, sports, and modern amenities',
			icon: <Home className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Clubs & Societies',
			href: '/student-life/clubs',
			description: 'Student clubs, cultural groups, and professional societies',
			icon: <Users className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Events & Festivals',
			href: '/student-life/events',
			description: 'Cultural festivals, tech fests, and campus events',
			icon: <Music className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Student Grievance Cell',
			href: '/student-life/grievance',
			description: 'Student support and grievance redressal system',
			icon: <UserX className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Code of Conduct',
			href: '/student-life/code-of-conduct',
			description: 'Student code of conduct and disciplinary guidelines',
			icon: <Scale className='w-4 h-4 text-blue-600' />
		}
	];

	const studentPortalItems = [
		{
			title: 'Login / Dashboard',
			href: '/student-portal/login',
			description: 'Access your student dashboard and portal',
			icon: <LogIn className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Fee Payment',
			href: '/student-portal/fee-payment',
			description: 'Online fee payment and transaction history',
			icon: <CreditCard className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Attendance Tracker',
			href: '/student-portal/attendance',
			description: 'Track your attendance and academic progress',
			icon: <CheckCircle className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Result Viewer',
			href: '/student-portal/results',
			description: 'View examination results and academic records',
			icon: <BarChart className='w-4 h-4 text-blue-600' />
		}
	];

	// All menu sections for mobile
	const menuSections = [
		{ title: 'About BPIT', items: aboutBPITItems, icon: <Building2 className='w-4 h-4' /> },
		{ title: 'Admissions', items: admissionsItems, icon: <GraduationCap className='w-4 h-4' /> },
		{ title: 'Academics', items: academicsItems, icon: <BookOpen className='w-4 h-4' /> },
		{ title: 'Departments', items: departmentItems, icon: <Users className='w-4 h-4' /> },
		{ title: 'Placements', items: placementsItems, icon: <Briefcase className='w-4 h-4' /> },
		{ title: 'Student Life', items: studentLifeItems, icon: <Music className='w-4 h-4' /> },
		{ title: 'Student Portal', items: studentPortalItems, icon: <LogIn className='w-4 h-4' /> }
	];

	// Search functionality
	const handleSearch = (query: string) => {
		setSearchQuery(query);
		// Implement search logic here
		console.log('Searching for:', query);
	};

	// Animated hamburger component
	const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => (
		<div className='relative w-8 h-8 flex items-center justify-center'>
			<motion.div className='absolute'>
				<motion.span
					className='absolute w-6 h-0.5 bg-gray-700 rounded-full'
					animate={{
						rotate: isOpen ? 45 : 0,
						y: isOpen ? 0 : -8
					}}
					transition={{ duration: 0.3 }}
				/>
				<motion.span
					className='absolute w-6 h-0.5 bg-gray-700 rounded-full'
					animate={{
						opacity: isOpen ? 0 : 1
					}}
					transition={{ duration: 0.2 }}
				/>
				<motion.span
					className='absolute w-6 h-0.5 bg-gray-700 rounded-full'
					animate={{
						rotate: isOpen ? -45 : 0,
						y: isOpen ? 0 : 8
					}}
					transition={{ duration: 0.3 }}
				/>
			</motion.div>
		</div>
	);

	return (
		<>
			<motion.header
				className={cn(
					'sticky top-0 z-50 w-full transition-all duration-300',
					isScrolled
						? 'bg-white/95 backdrop-blur-lg shadow-lg border-b'
						: 'bg-white shadow-sm'
				)}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between h-16 lg:h-20'>
						{/* Logo */}
						<Link href='/'>
							<motion.div
								className='flex items-center space-x-3'
								whileHover={{ scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 300 }}>
								<Image
									src='/logo.png'
									alt='BPIT Logo'
									width={60}
									height={60}
									className='rounded-lg lg:w-20 lg:h-20'
								/>
							</motion.div>
						</Link>

						{/* Desktop Navigation - Hidden on mobile */}
						<div className='hidden lg:flex items-center space-x-5'>
							{/* Desktop navigation remains the same */}
							<NavigationMenu>
								<NavigationMenuList>
									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											About BPIT
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												About BPIT
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{aboutBPITItems.map(item => (
													<ListItem
														key={item.title}
														title={item.title}
														href={item.href}
														icon={item.icon}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											Admissions
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Admissions
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{admissionsItems.map(item => (
													<ListItem
														key={item.title}
														title={item.title}
														href={item.href}
														icon={item.icon}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											Academics
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Academics
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{academicsItems.map(item => (
													<ListItem
														key={item.title}
														title={item.title}
														href={item.href}
														icon={item.icon}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											Departments
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Departments
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{departmentItems.map(item => (
													<ListItem
														key={item.title}
														title={item.title}
														href={item.href}
														icon={item.icon}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>

							<NavigationMenu>
								<NavigationMenuList className='space-x-2'>
									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											Placements
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Placements
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{placementsItems.map(item => (
													<ListItem
														key={item.title}
														title={item.title}
														href={item.href}
														icon={item.icon}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											Student Life
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Student Life
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{studentLifeItems.map(item => (
													<ListItem
														key={item.title}
														title={item.title}
														href={item.href}
														icon={item.icon}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											Student Portal
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Student Portal
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{studentPortalItems.map(item => (
													<ListItem
														key={item.title}
														title={item.title}
														href={item.href}
														icon={item.icon}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>

							<Button
								className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300'
								onClick={() => {
									const event = new CustomEvent('openEnquiry');
									window.dispatchEvent(event);
								}}>
								Enquire Now
							</Button>
						</div>

						{/* Mobile Menu Controls */}
						<div className='flex items-center gap-2 lg:hidden'>
							{/* Search Icon */}
							<motion.button
								whileTap={{ scale: 0.95 }}
								className='p-2 rounded-full hover:bg-gray-100 transition-colors'
								onClick={() => setShowSearch(!showSearch)}>
								<Search className='w-5 h-5 text-gray-700' />
							</motion.button>

							{/* Animated Hamburger Menu */}
							<motion.button
								whileTap={{ scale: 0.95 }}
								className='p-2 rounded-full hover:bg-gray-100 transition-colors'
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
								<AnimatedHamburger isOpen={isMobileMenuOpen} />
							</motion.button>
						</div>
					</div>

					{/* Mobile Search Bar */}
					<AnimatePresence>
						{showSearch && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className='lg:hidden border-t py-3'>
								<div className='relative'>
									<Input
										type='text'
										placeholder='Search for courses, departments, events...'
										value={searchQuery}
										onChange={(e) => handleSearch(e.target.value)}
										className='w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-500'
									/>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.header>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						{/* Background Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='fixed inset-0 bg-black/50 z-40 lg:hidden'
							onClick={() => setIsMobileMenuOpen(false)}
						/>

						{/* Mobile Menu Panel */}
						<motion.div
							ref={mobileMenuRef}
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							drag='x'
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={0.2}
							onDragEnd={(e, { offset, velocity }) => {
								if (offset.x > 100 || velocity.x > 500) {
									setIsMobileMenuOpen(false);
								}
							}}
							transition={{ type: 'spring', damping: 30, stiffness: 300 }}
							className='fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-50 overflow-hidden shadow-2xl lg:hidden'>
							
							{/* Mobile Menu Header */}
							<div className='bg-gradient-to-r from-blue-600 to-blue-700 p-4'>
								<div className='flex items-center justify-between mb-4'>
									<h2 className='text-white text-lg font-semibold flex items-center gap-2'>
										<Sparkles className='w-5 h-5' />
										Navigation Menu
									</h2>
									<motion.button
										whileTap={{ scale: 0.95 }}
										onClick={() => setIsMobileMenuOpen(false)}
										className='p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors'>
										<X className='w-5 h-5 text-white' />
									</motion.button>
								</div>

								{/* Quick Contact Info */}
								<div className='space-y-2 text-white/90 text-sm'>
									<div className='flex items-center gap-2'>
										<Phone className='w-4 h-4' />
										<span>+91 11 2757 1080</span>
									</div>
									<div className='flex items-center gap-2'>
										<Mail className='w-4 h-4' />
										<span>info@bpitindia.com</span>
									</div>
								</div>
							</div>

							{/* Scrollable Menu Content */}
							<div className='h-[calc(100%-180px)] overflow-y-auto pb-20'>
								<div className='p-4'>
									{/* Home Link */}
									<Link
										href='/'
										onClick={() => setIsMobileMenuOpen(false)}
										className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors mb-2'>
										<div className='flex items-center gap-3'>
											<Home className='w-5 h-5 text-blue-600' />
											<span className='font-medium'>Home</span>
										</div>
										<ChevronRight className='w-4 h-4 text-gray-400' />
									</Link>

									{/* Accordion Menu */}
									<Accordion type='single' collapsible className='space-y-2'>
										{menuSections.map((section, index) => (
											<AccordionItem key={index} value={`item-${index}`} className='border rounded-lg'>
												<AccordionTrigger className='px-3 hover:no-underline hover:bg-gray-50'>
													<div className='flex items-center gap-3'>
														<span className='text-blue-600'>{section.icon}</span>
														<span className='font-medium'>{section.title}</span>
													</div>
												</AccordionTrigger>
												<AccordionContent className='px-3 pb-3'>
													<div className='space-y-1'>
														{section.items.map((item, itemIndex) => (
															<Link
																key={itemIndex}
																href={item.href}
																onClick={() => setIsMobileMenuOpen(false)}
																className='flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors'>
																<div className='mt-0.5'>{item.icon}</div>
																<div className='flex-1'>
																	<div className='font-medium text-sm text-gray-800'>
																		{item.title}
																	</div>
																	<div className='text-xs text-gray-500 mt-0.5'>
																		{item.description}
																	</div>
																</div>
															</Link>
														))}
													</div>
												</AccordionContent>
											</AccordionItem>
										))}
									</Accordion>

									{/* Enquire Now Button */}
									<div className='mt-6'>
										<Button
											className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full py-3 font-medium shadow-lg'
											onClick={() => {
												setIsMobileMenuOpen(false);
												const event = new CustomEvent('openEnquiry');
												window.dispatchEvent(event);
											}}>
											<Sparkles className='w-4 h-4 mr-2' />
											Enquire Now
										</Button>
									</div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Floating Bottom Navigation for Mobile */}
			<motion.div
				initial={{ y: 100 }}
				animate={{ y: 0 }}
				transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
				className={cn(
					'fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 lg:hidden transition-transform duration-300',
					isScrolled && !isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
				)}>
				<div className='flex items-center justify-around py-2'>
					<Link href='/' className='flex flex-col items-center p-2'>
						<Home className='w-5 h-5 text-gray-600' />
						<span className='text-xs mt-1 text-gray-600'>Home</span>
					</Link>
					<Link href='/admissions' className='flex flex-col items-center p-2'>
						<GraduationCap className='w-5 h-5 text-gray-600' />
						<span className='text-xs mt-1 text-gray-600'>Admissions</span>
					</Link>
					<button
						onClick={() => {
							const event = new CustomEvent('openEnquiry');
							window.dispatchEvent(event);
						}}
						className='flex flex-col items-center p-2 relative'>
						<div className='absolute -top-6 bg-blue-600 rounded-full p-3 shadow-lg'>
							<MessageSquare className='w-6 h-6 text-white' />
						</div>
						<span className='text-xs mt-7 text-blue-600 font-medium'>Enquire</span>
					</button>
					<Link href='/student-portal' className='flex flex-col items-center p-2'>
						<LogIn className='w-5 h-5 text-gray-600' />
						<span className='text-xs mt-1 text-gray-600'>Portal</span>
					</Link>
					<Link href='/contact' className='flex flex-col items-center p-2'>
						<Phone className='w-5 h-5 text-gray-600' />
						<span className='text-xs mt-1 text-gray-600'>Contact</span>
					</Link>
				</div>
			</motion.div>
		</>
	);
};

const ListItem = React.forwardRef<
	React.ComponentRef<'a'>,
	React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode; href: string }
>(({ className, title, children, icon, href, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href}
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}>
					<div className='flex items-center gap-2'>
						{icon}
						<div className='text-sm font-medium leading-none'>{title}</div>
					</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export default Navbar;
