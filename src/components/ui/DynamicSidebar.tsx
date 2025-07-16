'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

interface NavItem {
	id: string;
	title: string;
	icon: string;
	href: string;
}

interface Theme {
	primary: string;
	activeGradient: string;
	activeBorder: string;
	activeText: string;
	activeIcon: string;
	activeChevron: string;
}

interface DynamicSidebarProps {
	navItems: NavItem[];
	theme: Theme;
}

const DynamicSidebar = ({ navItems, theme }: DynamicSidebarProps) => {
	const pathname = usePathname();

	const isActive = (href: string) => {
		const basePath = navItems[0]?.href || '';
		if (href === basePath) {
			return pathname === basePath;
		}
		return pathname.startsWith(href);
	};

	const getIcon = (iconName: string) => {
		const IconComponent = (
			Icons as unknown as Record<
				string,
				React.ComponentType<{ className?: string }>
			>
		)[iconName];
		return IconComponent ? (
			<IconComponent className='w-4 h-4 lg:w-5 lg:h-5' />
		) : null;
	};

	return (
		<>
			{/* Desktop Sidebar - Hidden on mobile/tablet */}
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className='hidden lg:block lg:w-80 flex-shrink-0'>
				<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-25'>
					<div className='p-2'>
						{navItems.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}>
								<Link
									href={item.href}
									className={`w-full text-left p-4 rounded-xl mb-2 transition-all duration-300 group relative overflow-hidden block ${
										isActive(item.href)
											? `bg-${theme.primary}-50 ${theme.activeText} shadow-md ${theme.activeBorder}`
											: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
									}`}>
									<div className='flex items-center gap-3 relative z-10'>
										<div
											className={`p-2 rounded-lg transition-colors ${
												isActive(item.href)
													? `bg-${theme.primary}-100 ${theme.activeIcon}`
													: 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
											}`}>
											{getIcon(item.icon)}
										</div>
										<span className='font-medium'>{item.title}</span>
										<ChevronRight
											className={`w-4 h-4 ml-auto transition-transform ${
												isActive(item.href)
													? `rotate-90 ${theme.activeChevron}`
													: 'text-gray-400'
											}`}
										/>
									</div>

									{isActive(item.href) && (
										<motion.div
											className={`absolute inset-0 bg-gradient-to-r ${theme.activeGradient} rounded-xl`}
											layoutId='activeTab'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.3 }}
										/>
									)}
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>

			{/* Mobile/Tablet Navigation - Minimal Wrapped */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='lg:hidden w-full mb-4'>
				<div className='px-4 sm:px-6'>
					<div className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
						{navItems.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.3,
									delay: index * 0.1,
									ease: 'easeOut'
								}}>
								<Link
									href={item.href}
									className={`relative inline-block py-2 px-1 text-sm font-medium transition-all duration-300 ${
										isActive(item.href)
											? `${theme.activeText}`
											: 'text-gray-600 hover:text-gray-900'
									}`}>
									<span className='relative z-10'>{item.title}</span>

									{/* Active underline with sliding animation */}
									{isActive(item.href) && (
										<motion.div
											className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-sm'
											layoutId='activeMobileUnderline'
											initial={{ scaleX: 0 }}
											animate={{ scaleX: 1 }}
											transition={{
												type: 'spring',
												stiffness: 400,
												damping: 30,
												duration: 0.6
											}}
										/>
									)}

									{/* Hover dot */}
									<motion.div
										className='absolute -bottom-1 left-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-0'
										initial={{ opacity: 0, scale: 0 }}
										whileHover={{ opacity: 1, scale: 1 }}
										style={{ transform: 'translateX(-50%)' }}
									/>
								</Link>
							</motion.div>
						))}
					</div>

					{/* Simple separator line */}
					<motion.div
						className='w-12 h-px bg-gray-300 mx-auto mt-3'
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					/>
				</div>
			</motion.div>
		</>
	);
};

export default DynamicSidebar;
