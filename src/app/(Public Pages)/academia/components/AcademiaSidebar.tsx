'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
	BookOpen,
	Bell,
	Calendar,
	ChevronRight
} from 'lucide-react';

interface NavItem {
	id: string;
	title: string;
	icon: React.ReactNode;
	href: string;
}

const navItems: NavItem[] = [
	{
		id: 'notices-circulars',
		title: 'Notices & Circulars',
		icon: <Bell className='w-5 h-5' />,
		href: '/academia/notices-circulars'
	},
	{
		id: 'syllabus-ordinance',
		title: 'Syllabus & Ordinance',
		icon: <BookOpen className='w-5 h-5' />,
		href: '/academia/syllabus-ordinance'
	},
	{
		id: 'academic-calendar',
		title: 'Academic Calendar',
		icon: <Calendar className='w-5 h-5' />,
		href: '/academia/academic-calendar'
	}
];

const AcademiaSidebar = () => {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === '/academia') {
			return pathname === '/academia';
		}
		return pathname?.startsWith(href) ?? false;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='lg:w-80 flex-shrink-0'>
			<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-6 max-h-[calc(100vh-8rem)]'>
				<div className='p-2 overflow-y-auto max-h-[calc(100vh-10rem)] sidebar-scroll'>
					{navItems.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}>
							<Link
								href={item.href}
								className={`w-full text-left p-4 rounded-xl mb-2 transition-all duration-300 group relative overflow-hidden block ${
									isActive(item.href)
										? 'bg-blue-50 text-blue-700 shadow-md border border-blue-200'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
								}`}>
								<div className='flex items-center gap-3 relative z-10'>
									<div
										className={`p-2 rounded-lg transition-colors ${
											isActive(item.href)
												? 'bg-blue-100 text-blue-600'
												: 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
										}`}>
										{item.icon}
									</div>
									<span className='font-medium'>{item.title}</span>
									<ChevronRight
										className={`w-4 h-4 ml-auto transition-transform ${
											isActive(item.href)
												? 'rotate-90 text-blue-600'
												: 'text-gray-400'
										}`}
									/>
								</div>

								{isActive(item.href) && (
									<motion.div
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full'
									/>
								)}
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default AcademiaSidebar;
