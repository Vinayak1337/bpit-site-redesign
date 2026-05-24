'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { cn } from '@/lib/utils';
import {
	Award,
	BarChart,
	BarChart3,
	Bell,
	BookMarked,
	BookOpen,
	Briefcase,
	Building2,
	Calendar,
	Camera,
	ChevronDown,
	ChevronUp,
	ClipboardList,
	Code2,
	CreditCard,
	Database,
	DollarSign,
	Download,
	FileText,
	GraduationCap,
	HelpCircle,
	Home,
	Link2,
	LogIn,
	Menu,
	MessageSquare,
	Music,
	Network,
	Radio,
	Shield,
	Star,
	Target,
	Users,
	X
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NavbarProps = {
	config: SiteChromeConfig;
};

const iconMap: Record<string, LucideIcon> = {
	Award,
	BarChart,
	BarChart3,
	Bell,
	BookMarked,
	BookOpen,
	Briefcase,
	Building2,
	Calendar,
	Camera,
	ClipboardList,
	Code2,
	CreditCard,
	Database,
	DollarSign,
	Download,
	FileText,
	GraduationCap,
	HelpCircle,
	Home,
	Link2,
	LogIn,
	MessageSquare,
	Music,
	Network,
	Radio,
	Shield,
	Star,
	Target,
	Users
};

const byOrder = <T extends { order?: number }>(items: T[]): T[] =>
	[...items].sort((first, second) => (first.order ?? 0) - (second.order ?? 0));

const getIcon = (
	iconName: string | undefined,
	className = 'h-4 w-4 text-blue-600'
) => {
	const Icon = iconName ? iconMap[iconName] ?? Link2 : Link2;
	return <Icon className={className} />;
};

const getEnabledSections = (
	sections: SiteChromeNavSection[]
): SiteChromeNavSection[] =>
	byOrder(sections)
		.filter(section => section.enabled)
		.map(section => ({
			...section,
			items: byOrder(section.items).filter(item => item.enabled)
		}))
		.filter(section => section.items.length > 0);

const Navbar = ({ config }: NavbarProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeMobileSection, setActiveMobileSection] = useState<string | null>(
		null
	);
	const [isMounted, setIsMounted] = useState(false);

	const enabledSections = useMemo(
		() => getEnabledSections(config.navSections ?? []),
		[config.navSections]
	);
	const logoSrc = config.logo?.src?.trim() || '/logo.png';
	const logoAlt = config.logo?.alt?.trim() || 'BPIT Logo';

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

	const renderDesktopSection = (section: SiteChromeNavSection) => (
		<NavigationMenuItem key={section.id}>
			<NavigationMenuTrigger className='text-gray-700 hover:text-blue-600 font-medium'>
				{section.label}
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<DropdownMenuLabel className='text-blue-600 font-semibold text-center'>
					{section.label}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
					{section.items.map(item => (
						<ListItem
							key={item.id}
							title={item.label}
							href={item.href || '/'}
							icon={getIcon(item.icon)}>
							{item.description}
						</ListItem>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		setActiveMobileSection(null);
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
					<div className='flex items-center xl:justify-center justify-between gap-2 sm:gap-4 h-16 sm:h-18 xl:h-20'>
						<Link href='/'>
							<motion.div
								className='flex items-center space-x-2 sm:space-x-3'
								whileHover={{ scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 300 }}>
								<img
									src={logoSrc}
									alt={logoAlt}
									width={60}
									height={60}
									className='h-[60px] w-[60px] rounded-lg object-contain sm:scale-125 xl:scale-150'
								/>
							</motion.div>
						</Link>

						<div className='hidden xl:flex items-center space-x-5'>
							<NavigationMenu>
								<NavigationMenuList>
									{enabledSections.slice(0, 4).map(renderDesktopSection)}
								</NavigationMenuList>
							</NavigationMenu>

							<NavigationMenu>
								<NavigationMenuList className='space-x-2'>
									{enabledSections.slice(4).map(renderDesktopSection)}
								</NavigationMenuList>
							</NavigationMenu>

							<Button
								className='bg-blue-600 hover:bg-blue-700 text-white px-4 xl:px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm xl:text-base'
								onClick={() => {
									const event = new CustomEvent('openEnquiry');
									window.dispatchEvent(event);
								}}>
								<span className='hidden xl:inline'>Enquire Now</span>
								<span className='xl:hidden'>Enquiry</span>
							</Button>
						</div>

						<button
							className='xl:hidden p-2 sm:p-3 rounded-md hover:bg-gray-100 transition-colors z-50 relative'
							onClick={() => {
								setIsMobileMenuOpen(!isMobileMenuOpen);
								setActiveMobileSection(null);
							}}
							aria-label='Toggle navigation menu'>
							{isMobileMenuOpen ? (
								<X className='w-5 h-5 sm:w-6 sm:h-6 text-gray-700' />
							) : (
								<Menu className='w-5 h-5 sm:w-6 sm:h-6 text-gray-700' />
							)}
						</button>
					</div>
				</div>
			</motion.header>

			{isMounted && (
				<AnimatePresence>
					<motion.button
						className='xl:hidden fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 sm:px-5 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center gap-2 text-sm sm:text-base'
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
						<span className='sm:hidden group-hover:translate-x-1 transition-transform'>
							Enquiry
						</span>
					</motion.button>
				</AnimatePresence>
			)}

			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						className={cn(
							'xl:hidden fixed inset-0 z-40 bg-white border-t shadow-lg mobile-menu-container',
							isScrolled ? 'top-16 sm:top-18' : 'top-[110px] sm:top-[120px]'
						)}
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '100%' }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}>
						<div className='h-full overflow-y-auto'>
							<div className='px-4 sm:px-6 py-4 sm:py-6 space-y-2'>
								<Link
									href='/'
									className='flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
									onClick={closeMobileMenu}>
									<Home className='w-5 h-5 mr-3' />
									Home
								</Link>

								{enabledSections.map(section => (
									<div key={section.id} className='space-y-1'>
										<button
											className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-base'
											onClick={() => toggleMobileSection(section.id)}>
											<div className='flex items-center'>
												{getIcon(section.icon, 'w-5 h-5 mr-3')}
												{section.label}
											</div>
											{activeMobileSection === section.id ? (
												<ChevronUp className='w-4 h-4' />
											) : (
												<ChevronDown className='w-4 h-4' />
											)}
										</button>
										<AnimatePresence>
											{activeMobileSection === section.id && (
												<motion.div
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.2 }}
													className='ml-4 space-y-1'>
													{section.items.map(item => (
														<Link
															key={item.id}
															href={item.href || '/'}
															className='flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
															onClick={closeMobileMenu}>
															{getIcon(item.icon)}
															<span className='ml-2'>{item.label}</span>
														</Link>
													))}
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								))}

								<div className='pt-4 px-4'>
									<Button
										className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 text-base font-medium'
										onClick={() => {
											const event = new CustomEvent('openEnquiry');
											window.dispatchEvent(event);
											closeMobileMenu();
										}}>
										Enquire Now
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
