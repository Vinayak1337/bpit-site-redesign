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
	Brain,
	UserCheck,
	Home,
	Shield,
	Eye,
	Lightbulb,
	Camera,
	Music,
	Info,
	MessageSquare,
	BarChart3,
	Briefcase
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

	const instituteItems = [
		{
			title: 'About BPIT',
			href: '/about',
			description:
				'Learn about our history, achievements, and commitment to excellence',
			icon: <Building2 className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Vision & Mission',
			href: '/vision',
			description: 'Our goals and objectives for shaping future engineers',
			icon: <Target className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Management',
			href: '/management',
			description: 'Meet our leadership team and faculty members',
			icon: <Users className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Accreditation',
			href: '/accreditation',
			description: 'NBA & NAAC certified quality education standards',
			icon: <Award className='w-4 h-4 text-blue-600' />
		}
	];

	const departmentItems = [
		{
			title: 'Computer Science',
			href: '/cse',
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
			href: '/it',
			description: 'Network systems, cybersecurity, and IT infrastructure',
			icon: (
				<div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
					<span className='text-green-600 font-semibold text-xs'>IT</span>
				</div>
			)
		},
		{
			title: 'Electronics & Communication',
			href: '/ece',
			description: 'Circuit design, telecommunications, and embedded systems',
			icon: (
				<div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
					<span className='text-purple-600 font-semibold text-xs'>EC</span>
				</div>
			)
		},
		{
			title: 'Electrical Engineering',
			href: '/eee',
			description: 'Power systems, automation, and electrical machinery',
			icon: (
				<div className='w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center'>
					<span className='text-orange-600 font-semibold text-xs'>EE</span>
				</div>
			)
		},
		{
			title: 'Management',
			href: '/management',
			description: 'Business administration and management studies',
			icon: (
				<div className='w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center'>
					<span className='text-rose-600 font-semibold text-xs'>MG</span>
				</div>
			)
		}
	];

	const academiaItems = [
		{
			title: 'Academic Calendar',
			href: '/academia/calendar',
			description: 'Important academic dates and semester schedules',
			icon: <Calendar className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Scheme & Syllabus',
			href: '/academia/syllabus',
			description: 'Course curriculum and subject details',
			icon: <BookOpen className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Fee Structure',
			href: '/academia/fee-structure',
			description: 'Program fees and payment information',
			icon: <DollarSign className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Scholarships',
			href: '/academia/scholarships',
			description: 'Financial assistance and merit scholarships',
			icon: <GraduationCap className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'List of Students',
			href: '/academia/students',
			description: 'List of students in the current batch',
			icon: <Users className='w-4 h-4 text-blue-600' />
		}
	];

	const campusLifeItems = [
		{
			title: 'Self Learning',
			href: '/campus-life/self-learning',
			description:
				'Independent study resources and self-paced learning modules',
			icon: <Brain className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Mentorship Program',
			href: '/campus-life/mentorship',
			description: 'Faculty guidance and peer mentoring initiatives',
			icon: <UserCheck className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'BPIT Campus Facilities',
			href: '/campus-life/facilities',
			description: 'Modern infrastructure, labs, library, and amenities',
			icon: <Home className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'BPIT Societies',
			href: '/campus-life/societies',
			description: 'Student clubs, cultural groups, and professional societies',
			icon: <Users className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'NSS Cell',
			href: '/campus-life/nss',
			description: 'National Service Scheme and community outreach programs',
			icon: <Shield className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Drishti',
			href: '/campus-life/drishti',
			description: 'Student magazine and creative writing platform',
			icon: <Eye className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'IIC',
			href: '/campus-life/iic',
			description: 'Institution Innovation Council for entrepreneurship',
			icon: <Lightbulb className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'BPIT Gallery',
			href: '/campus-life/gallery',
			description: 'Photo gallery of campus events and activities',
			icon: <Camera className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'BPIT Fest',
			href: '/campus-life/fest',
			description: 'Annual cultural festival and inter-college events',
			icon: <Music className='w-4 h-4 text-blue-600' />
		}
	];

	const trainingPlacementItems = [
		{
			title: 'About T&P',
			href: '/training-placement/about',
			description: 'Learn about our Training & Placement department',
			icon: <Info className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Message from T&P Head',
			href: '/training-placement/message',
			description: 'Words from our Training & Placement Head',
			icon: <MessageSquare className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'T&P Team',
			href: '/training-placement/team',
			description: 'Meet our dedicated placement team members',
			icon: <Users className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Placement Record',
			href: '/training-placement/records',
			description: 'View our impressive placement statistics and achievements',
			icon: <BarChart3 className='w-4 h-4 text-blue-600' />
		},
		{
			title: 'Recruiters',
			href: '/training-placement/recruiters',
			description: 'Our industry partners and recruiting companies',
			icon: <Briefcase className='w-4 h-4 text-blue-600' />
		}
	];

	return (
		<>
			{/* Top Contact Bar */}
			<motion.div
				className='bg-blue-900 text-white py-2 px-4 text-sm hidden md:block'
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
					<div className='flex items-center lg:justify-center justify-between gap-5 h-20'>
						{/* Logo */}
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

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-8'>
							<NavigationMenu>
								<NavigationMenuList className='space-x-2'>
									<NavigationMenuItem>
										<NavigationMenuLink
											className='text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-blue-50'
											href='/'>
											Home
										</NavigationMenuLink>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											Institute
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												About Institute
											</DropdownMenuLabel>
											<DropdownMenuSeparator />{' '}
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{instituteItems.map(item => (
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

									<NavigationMenuItem>
										<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
											Academia
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Academia
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{academiaItems.map(item => (
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
											Campus Life
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Campus Life
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{campusLifeItems.map(item => (
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
											Training & Placement
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
												Training & Placement
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{trainingPlacementItems.map(item => (
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
										<NavigationMenuLink
											className='text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-blue-50'
											href='/admission'>
											Student Portal
										</NavigationMenuLink>
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
									Institute
								</Link>
								<Link
									href='/departments'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Departments
								</Link>
								<Link
									href='/academia'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Academia
								</Link>
								<Link
									href='/campus-life'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Campus Life
								</Link>
								<Link
									href='/training-placement'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Training & Placement
								</Link>
								<Link
									href='/admission'
									className='block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'>
									Admission
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
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
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
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export default Header;
