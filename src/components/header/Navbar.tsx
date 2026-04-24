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
import { DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import {
	aboutBPITItems,
	admissionsItems,
	academicsItems,
	departmentItems,
	placementsItems,
	studentLifeItems,
	studentPortalItems
} from '@/data/nav-items';
import { cn } from '@/lib/utils';
import {
	X,
	Menu,
	GraduationCap,
	Building2,
	ChevronUp,
	ChevronDown,
	Home,
	BookOpen,
	Users,
	Briefcase,
	Music,
	LogIn
} from 'lucide-react';
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
					<div className='flex items-center lg:justify-center justify-between gap-2 sm:gap-4 h-16 lg:h-20'>
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
														href={item.href ?? '/'}
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
														href={item.href ?? '/'}
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
														href={item.href ?? '/'}
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
														href={item.href ?? '/'}
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
														href={item.href ?? '/'}
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
														href={item.href ?? '/'}
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
														href={item.href ?? '/'}
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
							className='lg:hidden p-2 sm:p-3 rounded-md hover:bg-gray-100 transition-colors z-50 relative min-h-[44px] min-w-[44px] flex items-center justify-center'
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
						className='group fixed bottom-4 left-4 z-50 flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl sm:bottom-6 sm:left-6 sm:min-w-[44px] sm:px-5 sm:py-3 lg:hidden'
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
						<span className='hidden sm:inline group-hover:translate-x-1 transition-transform'>
							Enquire Now
						</span>
						<span className='sr-only sm:not-sr-only'>Enquiry</span>
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
