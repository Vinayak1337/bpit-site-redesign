'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Eye, Target, Award, ChevronRight } from 'lucide-react';

interface NavItem {
	id: string;
	title: string;
	icon: React.ReactNode;
	href: string;
}

const navItems: NavItem[] = [
	{
		id: 'vision',
		title: 'Our Vision',
		icon: <Eye className='w-5 h-5' />,
		href: '/vision-mission'
	},
	{
		id: 'mission',
		title: 'Our Mission',
		icon: <Target className='w-5 h-5' />,
		href: '/vision-mission/mission'
	},
	{
		id: 'quality-policy',
		title: 'Quality Policy',
		icon: <Award className='w-5 h-5' />,
		href: '/vision-mission/quality-policy'
	}
];

const VisionMissionSidebar = () => {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === '/vision-mission') {
			return pathname === '/vision-mission';
		}
		return pathname.startsWith(href);
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6 }}
			className='lg:w-80 flex-shrink-0'>
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
										className='absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl'
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
	);
};

export default VisionMissionSidebar;
