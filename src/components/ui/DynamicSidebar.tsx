'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
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
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);

	const isActive = (href: string) => {
		const basePath = navItems[0]?.href || '';
		if (href === basePath) {
			return pathname === basePath;
		}
		return pathname?.startsWith(href) ?? false;
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

	// Check scroll position and update arrow visibility
	useEffect(() => {
		const checkScrollPosition = () => {
			if (!scrollContainerRef.current) return;
			
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
			setShowLeftArrow(scrollLeft > 0);
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
		};

		const container = scrollContainerRef.current;
		if (container) {
			checkScrollPosition();
			container.addEventListener('scroll', checkScrollPosition);
			return () => container.removeEventListener('scroll', checkScrollPosition);
		}
	}, [navItems]);

	// Initial check for arrow visibility
	useEffect(() => {
		const timer = setTimeout(() => {
			if (scrollContainerRef.current) {
				const { scrollWidth, clientWidth } = scrollContainerRef.current;
				setShowRightArrow(scrollWidth > clientWidth);
			}
		}, 100);
		return () => clearTimeout(timer);
	}, [navItems]);

	// Scroll functions
	const scrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
		}
	};

	const scrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
		}
	};

	return (
		<>
			{/* Mobile & Tablet Horizontal Navigation */}
			<div className='lg:hidden relative mb-6'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
					
					{/* Left Arrow */}
					{showLeftArrow && (
						<motion.button
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={scrollLeft}
							className='absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-xl border-2 border-blue-300 flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 hover:scale-110 transition-all duration-300 active:scale-95'
							style={{ pointerEvents: 'auto' }}
							aria-label='Scroll left'>
							<ChevronLeft className='w-5 h-5' />
						</motion.button>
					)}

					{/* Right Arrow */}
					{showRightArrow && (
						<motion.button
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={scrollRight}
							className='absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-xl border-2 border-blue-300 flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 hover:scale-110 transition-all duration-300 active:scale-95'
							style={{ pointerEvents: 'auto' }}
							aria-label='Scroll right'>
							<ChevronRight className='w-5 h-5' />
						</motion.button>
					)}

					{/* Horizontal Scrollable Container */}
					<div
						ref={scrollContainerRef}
						className='flex overflow-x-auto gap-2 p-3 scrollbar-hide scroll-smooth'
						style={{
							scrollbarWidth: 'none',
							msOverflowStyle: 'none',
							WebkitScrollbar: 'none'
						} as React.CSSProperties}>
						{navItems.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
								className='flex-shrink-0'>
								<Link
									href={item.href}
									className={`relative flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
										isActive(item.href)
											? `bg-blue-50 text-blue-700 shadow-md border border-blue-200`
											: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
									}`}>
									
									{isActive(item.href) && (
										<motion.div
											className='absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl'
											layoutId='activeMobileTab'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.3 }}
										/>
									)}
									
									<div
										className={`relative z-10 p-1.5 rounded-lg transition-colors flex-shrink-0 ${
											isActive(item.href)
												? 'bg-blue-100 text-blue-600'
												: 'bg-gray-100 text-gray-500'
										}`}>
										{getIcon(item.icon)}
									</div>
									<span className='relative z-10 font-medium text-sm'>{item.title}</span>
								</Link>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>

			{/* Desktop Sidebar */}
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className='hidden lg:block lg:w-80 flex-shrink-0'>
				<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-25'>
					<div className='p-2 overflow-y-auto max-h-[50vh] blue-scrollbar'>
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
									
									{isActive(item.href) && (
										<motion.div
											className={`absolute inset-0 bg-gradient-to-r ${theme.activeGradient} rounded-xl`}
											layoutId='activeDesktopTab'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.3 }}
										/>
									)}
									
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
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>

			<style jsx>{`
				.blue-scrollbar::-webkit-scrollbar {
					width: 6px;
				}
				.blue-scrollbar::-webkit-scrollbar-track {
					background: #f1f5f9;
					border-radius: 3px;
				}
				.blue-scrollbar::-webkit-scrollbar-thumb {
					background: #3b82f6;
					border-radius: 3px;
				}
				.blue-scrollbar::-webkit-scrollbar-thumb:hover {
					background: #2563eb;
				}
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</>
	);
};

export default DynamicSidebar;
