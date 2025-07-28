'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
	ChevronDown,
	ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeMobileSection, setActiveMobileSection] = useState<string | null>(
		null
	);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				isMobileMenuOpen &&
				!(event.target as Element).closest('.mobile-menu-container')
			) {
				setIsMobileMenuOpen(false);
				setActiveMobileSection(null);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [isMobileMenuOpen]);

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMobileMenuOpen]);

	const toggleMobileSection = (section: string) => {
		setActiveMobileSection(activeMobileSection === section ? null : section);
	};

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
			href: '/statutory-committees',
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
			href: '/admissions/why-bpit',
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
			href: '/admissions/scholarship',
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
			href: '/academia/academic-calendar',
			description: 'Important academic dates and semester schedules',
			icon: <Calendar className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Examination & Results',
			href: '/academia/examination',
			description: 'Exam schedules, results, and academic performance',
			icon: <FileText className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Syllabus & Ordinances',
			href: '/academia/syllabus-ordinance',
			description: 'Course curriculum, syllabus, and academic ordinances',
			icon: <BookOpen className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Library / Resource Center',
			href: '/academia/library',
			description: 'Library resources, digital collections, and services',
			icon: <BookMarked className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Notices & Circulars',
			href: '/academia/notices-circulars',
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

	return (
		<>
			<motion.header
				className={cn(
					'sticky top-0 z-50 w-full transition-all duration-300',
					isScrolled
						? 'bg-white backdrop-blur-lg shadow-lg border-b'
						: 'bg-white shadow-sm'
				)}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center lg:justify-center justify-between gap-2 sm:gap-4 h-16 sm:h-18 lg:h-20'>
						{/* Logo */}
						<Link href='/'>
							<motion.div
								className='flex items-center space-x-2 sm:space-x-3'
								whileHover={{ scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 300 }}>
								<Image
									src='/logo.png'
									alt='BPIT Logo'
									width={60}
									height={60}
									className='rounded-lg sm:scale-125 lg:scale-150'
								/>
							</motion.div>
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-3 xl:space-x-5'>
							{/* First Navigation Menu - Left Side */}
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

							{/* Second Navigation Menu - Right Side */}
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
								className='bg-blue-600 hover:bg-blue-700 text-white px-4 xl:px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm xl:text-base'
								onClick={() => {
									// Will be handled by the enquiry popup
									const event = new CustomEvent('openEnquiry');
									window.dispatchEvent(event);
								}}>
								<span className='hidden xl:inline'>Enquire Now</span>
								<span className='xl:hidden'>Enquiry</span>
							</Button>
						</div>

						{/* Mobile Menu Button */}
						<button
							className='lg:hidden p-2 sm:p-3 rounded-md hover:bg-gray-100 transition-colors z-50 relative'
							onClick={() => {
								setIsMobileMenuOpen(!isMobileMenuOpen);
								setActiveMobileSection(null);
							}}>
							{isMobileMenuOpen ? (
								<X className='w-5 h-5 sm:w-6 sm:h-6 text-gray-700' />
							) : (
								<Menu className='w-5 h-5 sm:w-6 sm:h-6 text-gray-700' />
							)}
						</button>
					</div>
				</div>
			</motion.header>

			{/* Floating Enquire Now Button - Mobile/Tablet Only */}
			{isMounted && (
				<AnimatePresence>
					<motion.button
						className='lg:hidden fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 sm:px-5 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center gap-2 text-sm sm:text-base'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => {
							const event = new CustomEvent('openEnquiry');
							window.dispatchEvent(event);
						}}>
						<GraduationCap className='w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform' />
						<span className='hidden sm:inline group-hover:translate-x-1 transition-transform'>Enquire Now</span>
						<span className='sm:hidden group-hover:translate-x-1 transition-transform'>Enquiry</span>
					</motion.button>
				</AnimatePresence>
			)}

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						className={cn(
							'lg:hidden fixed inset-0 z-40 bg-white border-t shadow-lg mobile-menu-container',
							isScrolled ? 'top-16 sm:top-18' : 'top-[110px] sm:top-[120px]'
						)}
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '100%' }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}>
						<div className='h-full overflow-y-auto'>
							<div className='px-4 sm:px-6 py-4 sm:py-6 space-y-2'>
								{/* Home Link */}
								<Link
									href='/'
									className='flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
									onClick={() => {
										setIsMobileMenuOpen(false);
										setActiveMobileSection(null);
									}}>
									<Home className='w-5 h-5 mr-3' />
									Home
								</Link>

								{/* About BPIT Section */}
								<div className='space-y-1'>
									<button
										className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
										onClick={() => toggleMobileSection('about')}>
										<div className='flex items-center'>
											<Building2 className='w-5 h-5 mr-3' />
											About BPIT
										</div>
										{activeMobileSection === 'about' ? (
											<ChevronUp className='w-4 h-4' />
										) : (
											<ChevronDown className='w-4 h-4' />
										)}
									</button>
									<AnimatePresence>
										{activeMobileSection === 'about' && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className='ml-4 space-y-1'>
												{aboutBPITItems.map(item => (
													<Link
														key={item.title}
														href={item.href}
														className='flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveMobileSection(null);
														}}>
														{item.icon}
														<span className='ml-2'>{item.title}</span>
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Admissions Section */}
								<div className='space-y-1'>
									<button
										className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
										onClick={() => toggleMobileSection('admissions')}>
										<div className='flex items-center'>
											<GraduationCap className='w-5 h-5 mr-3' />
											Admissions
										</div>
										{activeMobileSection === 'admissions' ? (
											<ChevronUp className='w-4 h-4' />
										) : (
											<ChevronDown className='w-4 h-4' />
										)}
									</button>
									<AnimatePresence>
										{activeMobileSection === 'admissions' && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className='ml-4 space-y-1'>
												{admissionsItems.map(item => (
													<Link
														key={item.title}
														href={item.href}
														className='flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveMobileSection(null);
														}}>
														{item.icon}
														<span className='ml-2'>{item.title}</span>
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Academics Section */}
								<div className='space-y-1'>
									<button
										className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
										onClick={() => toggleMobileSection('academics')}>
										<div className='flex items-center'>
											<BookOpen className='w-5 h-5 mr-3' />
											Academics
										</div>
										{activeMobileSection === 'academics' ? (
											<ChevronUp className='w-4 h-4' />
										) : (
											<ChevronDown className='w-4 h-4' />
										)}
									</button>
									<AnimatePresence>
										{activeMobileSection === 'academics' && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className='ml-4 space-y-1'>
												{academicsItems.map(item => (
													<Link
														key={item.title}
														href={item.href}
														className='flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveMobileSection(null);
														}}>
														{item.icon}
														<span className='ml-2'>{item.title}</span>
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Departments Section */}
								<div className='space-y-1'>
									<button
										className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
										onClick={() => toggleMobileSection('departments')}>
										<div className='flex items-center'>
											<Users className='w-5 h-5 mr-3' />
											Departments
										</div>
										{activeMobileSection === 'departments' ? (
											<ChevronUp className='w-4 h-4' />
										) : (
											<ChevronDown className='w-4 h-4' />
										)}
									</button>
									<AnimatePresence>
										{activeMobileSection === 'departments' && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className='ml-4 space-y-1'>
												{departmentItems.map(item => (
													<Link
														key={item.title}
														href={item.href}
														className='flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveMobileSection(null);
														}}>
														{item.icon}
														<span className='ml-2'>{item.title}</span>
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Placements Section */}
								<div className='space-y-1'>
									<button
										className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
										onClick={() => toggleMobileSection('placements')}>
										<div className='flex items-center'>
											<Briefcase className='w-5 h-5 mr-3' />
											Placements
										</div>
										{activeMobileSection === 'placements' ? (
											<ChevronUp className='w-4 h-4' />
										) : (
											<ChevronDown className='w-4 h-4' />
										)}
									</button>
									<AnimatePresence>
										{activeMobileSection === 'placements' && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className='ml-4 space-y-1'>
												{placementsItems.map(item => (
													<Link
														key={item.title}
														href={item.href}
														className='flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveMobileSection(null);
														}}>
														{item.icon}
														<span className='ml-2'>{item.title}</span>
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Student Life Section */}
								<div className='space-y-1'>
									<button
										className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
										onClick={() => toggleMobileSection('student-life')}>
										<div className='flex items-center'>
											<Music className='w-5 h-5 mr-3' />
											Student Life
										</div>
										{activeMobileSection === 'student-life' ? (
											<ChevronUp className='w-4 h-4' />
										) : (
											<ChevronDown className='w-4 h-4' />
										)}
									</button>
									<AnimatePresence>
										{activeMobileSection === 'student-life' && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className='ml-4 space-y-1'>
												{studentLifeItems.map(item => (
													<Link
														key={item.title}
														href={item.href}
														className='flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveMobileSection(null);
														}}>
														{item.icon}
														<span className='ml-2'>{item.title}</span>
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Student Portal Section */}
								<div className='space-y-1'>
									<button
										className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
										onClick={() => toggleMobileSection('student-portal')}>
										<div className='flex items-center'>
											<LogIn className='w-5 h-5 mr-3' />
											Student Portal
										</div>
										{activeMobileSection === 'student-portal' ? (
											<ChevronUp className='w-4 h-4' />
										) : (
											<ChevronDown className='w-4 h-4' />
										)}
									</button>
									<AnimatePresence>
										{activeMobileSection === 'student-portal' && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className='ml-4 space-y-1'>
												{studentPortalItems.map(item => (
													<Link
														key={item.title}
														href={item.href}
														className='flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
														onClick={() => {
															setIsMobileMenuOpen(false);
															setActiveMobileSection(null);
														}}>
														{item.icon}
														<span className='ml-2'>{item.title}</span>
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Enquiry Button */}
								<div className='pt-4 px-4'>
									<Button
										className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 text-base font-medium'
										onClick={() => {
											const event = new CustomEvent('openEnquiry');
											window.dispatchEvent(event);
											setIsMobileMenuOpen(false);
											setActiveMobileSection(null);
										}}>
										Enquiry Now
									</Button>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
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
