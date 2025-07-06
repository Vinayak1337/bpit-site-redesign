'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
	Phone,
	Mail,
	MapPin,
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
	Bell,
	BookMarked,
	TrendingUp,
	Network,
	Users2,
	Scale,
	UserX,
	LogIn,
	CheckCircle,
	BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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

	const importantAnnouncements = [
		{
			title: 'Admission 2024-25 Session Open - Apply Now',
			href: '/admissions/apply'
		},
		{
			title: 'Semester End Examinations Schedule Released',
			href: '/academics/examination'
		},
		{
			title: 'Placement Drive 2024 - Register Today',
			href: '/placements/register'
		},
		{
			title: 'Annual Tech Fest "INNOVATE 2024" - March 15-17',
			href: '/events/tech-fest'
		},
		{
			title: 'Library New Books Collection Available',
			href: '/academics/library'
		},
		{
			title: 'Scholarship Applications Open - Merit & Need Based',
			href: '/admissions/scholarships'
		}
	];

	return (
		<>
			{/* Top Contact Bar */}
			<motion.div
				className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 px-4 text-sm hidden md:block'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				<div className='container mx-auto flex justify-between items-center'>
					<div className='flex items-center space-x-6'>
						<div className='flex items-center space-x-2'>
							<Phone className='w-4 h-4' />
							<span>011-2757 1080</span>
						</div>
						<div className='flex items-center space-x-2'>
							<Mail className='w-4 h-4' />
							<span>bpitindia@yahoo.com</span>
						</div>
						<div className='flex items-center space-x-2'>
							<MapPin className='w-4 h-4' />
							<span>PSP-4, Sector-17, Rohini, New Delhi</span>
						</div>
					</div>
					<div className='text-sm'>
						<span className='text-yellow-300'>NBA Accredited</span> B.Tech
						Programs
					</div>
				</div>
			</motion.div>

			{/* Important Announcements Bar */}
			<motion.div
				className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 overflow-hidden relative hidden md:block'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				<div className='flex items-center'>
					<div className='flex-shrink-0 px-4 font-semibold text-sm border-r border-blue-400'>
						<span className='flex items-center gap-2'>
							<Bell className='w-4 h-4' />
							Important Announcements:
						</span>
					</div>
					<div className='flex-1 overflow-hidden'>
						<div className='animate-marquee flex items-center whitespace-nowrap'>
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={index}
									href={announcement.href}
									className='text-sm hover:text-yellow-300 transition-colors duration-200 mx-8 flex-shrink-0'>
									{announcement.title}
								</Link>
							))}
							{/* Duplicate for seamless loop */}
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={`duplicate-${index}`}
									href={announcement.href}
									className='text-sm hover:text-yellow-300 transition-colors duration-200 mx-8 flex-shrink-0'>
									{announcement.title}
								</Link>
							))}
						</div>
					</div>
				</div>
			</motion.div>

			{/* Mobile Announcements Bar */}
			<motion.div
				className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 overflow-hidden relative md:hidden'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				<div className='flex items-center'>
					<div className='flex-shrink-0 px-3 font-semibold text-xs border-r border-blue-400'>
						<span className='flex items-center gap-1'>
							<Bell className='w-3 h-3' />
							News:
						</span>
					</div>
					<div className='flex-1 overflow-hidden'>
						<div className='animate-marquee flex items-center whitespace-nowrap'>
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={index}
									href={announcement.href}
									className='text-xs hover:text-yellow-300 transition-colors duration-200 mx-6 flex-shrink-0'>
									{announcement.title}
								</Link>
							))}
							{/* Duplicate for seamless loop */}
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={`duplicate-${index}`}
									href={announcement.href}
									className='text-xs hover:text-yellow-300 transition-colors duration-200 mx-6 flex-shrink-0'>
									{announcement.title}
								</Link>
							))}
						</div>
					</div>
				</div>
			</motion.div>

			{/* Main Header */}
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
				<div className='container mx-auto px-4'>
					<div className='flex items-center lg:justify-center justify-between gap-4 h-20'>
						{/* Logo */}
						<Link href='/'>
							<motion.div
								className='flex items-center space-x-3'
								whileHover={{ scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 300 }}>
								<Image
									src='/logo.png'
									alt='BPIT Logo'
									width={80}
									height={80}
									className='rounded-lg scale-150'
								/>
							</motion.div>
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-5'>
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
								className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300'
								onClick={() => {
									// Will be handled by the enquiry popup
									const event = new CustomEvent('openEnquiry');
									window.dispatchEvent(event);
								}}>
								Enquire Now
							</Button>
						</div>

						{/* Mobile Menu Button */}
						<button
							className='lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							{isMobileMenuOpen ? (
								<X className='w-6 h-6 text-gray-700' />
							) : (
								<Menu className='w-6 h-6 text-gray-700' />
							)}
						</button>
					</div>

					{/* Mobile Menu */}
					{isMobileMenuOpen && (
						<motion.div
							className='lg:hidden border-t bg-white'
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}>
							<div className='py-4 space-y-4'>
								<Link
									href='/'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Home
								</Link>
								<Link
									href='/about'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									About BPIT
								</Link>
								<Link
									href='/admissions'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Admissions
								</Link>
								<Link
									href='/academics'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Academics
								</Link>
								<Link
									href='/departments'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Departments
								</Link>
								<Link
									href='/placements'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Placements
								</Link>
								<Link
									href='/student-life'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Student Life
								</Link>
								<Link
									href='/student-portal'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Student Portal
								</Link>
								<div className='px-4'>
									<Button
										className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full'
										onClick={() => {
											const event = new CustomEvent('openEnquiry');
											window.dispatchEvent(event);
										}}>
										Enquiry Now
									</Button>
								</div>
							</div>
						</motion.div>
					)}
				</div>
			</motion.header>
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

export default Header;
