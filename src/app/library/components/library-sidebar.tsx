'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
	BookOpen,
	Info,
	Users,
	UserCheck,
	FileText,
	Clock,
	GraduationCap,
	Globe,
	Network,
	School,
	BookOpenCheck,
	Newspaper,
	Copy,
	ShoppingCart,
	Trash2,
	Database,
	BookMarked,
	Download,
	ExternalLink,
	Phone,
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
		id: 'overview',
		title: 'Library Overview',
		icon: <BookOpen className='w-5 h-5' />,
		href: '/library'
	},
	{
		id: 'information',
		title: 'Library Information',
		icon: <Info className='w-5 h-5' />,
		href: '/library/information'
	},
	{
		id: 'advisory-committee',
		title: 'Advisory Committee',
		icon: <Users className='w-5 h-5' />,
		href: '/library/advisory-committee'
	},
	{
		id: 'staff',
		title: 'Library Staff',
		icon: <UserCheck className='w-5 h-5' />,
		href: '/library/staff'
	},
	{
		id: 'rules',
		title: 'Library Rules',
		icon: <FileText className='w-5 h-5' />,
		href: '/library/rules'
	},
	{
		id: 'timings',
		title: 'Library Timings',
		icon: <Clock className='w-5 h-5' />,
		href: '/library/timings'
	},
	{
		id: 'self-learning',
		title: 'Self Learning',
		icon: <GraduationCap className='w-5 h-5' />,
		href: '/library/self-learning'
	},
	{
		id: 'digital-library',
		title: 'Digital Library',
		icon: <Globe className='w-5 h-5' />,
		href: '/library/digital-library'
	},
	{
		id: 'delnet',
		title: 'DELNET',
		icon: <Network className='w-5 h-5' />,
		href: '/library/delnet'
	},
	{
		id: 'ndli',
		title: 'NDLI',
		icon: <School className='w-5 h-5' />,
		href: '/library/ndli'
	},
	{
		id: 'moocs',
		title: 'MOOCs',
		icon: <BookOpenCheck className='w-5 h-5' />,
		href: '/library/moocs'
	},
	{
		id: 'newspapers',
		title: 'Newspapers',
		icon: <Newspaper className='w-5 h-5' />,
		href: '/library/newspapers'
	},
	{
		id: 'photocopy-service',
		title: 'Photocopy Service',
		icon: <Copy className='w-5 h-5' />,
		href: '/library/photocopy-service'
	},
	{
		id: 'book-acquisition',
		title: 'Book Acquisition',
		icon: <ShoppingCart className='w-5 h-5' />,
		href: '/library/book-acquisition'
	},
	{
		id: 'weeding-out',
		title: 'Weeding Out',
		icon: <Trash2 className='w-5 h-5' />,
		href: '/library/weeding-out'
	},
	{
		id: 'e-resources',
		title: 'E-Resources',
		icon: <Database className='w-5 h-5' />,
		href: '/library/e-resources'
	},
	{
		id: 'book-bank',
		title: 'Book Bank',
		icon: <BookMarked className='w-5 h-5' />,
		href: '/library/book-bank'
	},
	{
		id: 'downloads',
		title: 'Downloads',
		icon: <Download className='w-5 h-5' />,
		href: '/library/downloads'
	},
	{
		id: 'useful-links',
		title: 'Useful Links',
		icon: <ExternalLink className='w-5 h-5' />,
		href: '/library/useful-links'
	},
	{
		id: 'contact',
		title: 'Contact Us',
		icon: <Phone className='w-5 h-5' />,
		href: '/library/contact'
	}
];

const LibrarySidebar = () => {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === '/library') {
			return pathname === '/library';
		}
		return pathname.startsWith(href);
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6 }}
			className='lg:w-80 flex-shrink-0'>
			<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-6 max-h-[calc(100vh-8rem)]'>
				<div className='p-2 overflow-y-auto max-h-[calc(100vh-10rem)] sidebar-scroll'>
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

export default LibrarySidebar;