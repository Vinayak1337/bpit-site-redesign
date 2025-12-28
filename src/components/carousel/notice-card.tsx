'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	Bell,
	Calendar,
	ArrowRight,
	BookOpen,
	GraduationCap,
	Award,
	Users,
	TrendingUp,
	Pin
} from 'lucide-react';

// Local interface matching what NoticesSection passes
interface Notice {
	id?: string;
	title: string;
	date: string;
	category: string;
	href?: string;
	fileUrl?: string;
	priority?: boolean;
	content?: string;
}

const getCategoryConfig = (category: string) => {
	const configs: Record<string, any> = {
		Academic: {
			gradient: 'from-blue-500 to-indigo-600',
			icon: <GraduationCap className='w-4 h-4' />,
			bg: 'bg-blue-50',
			border: 'border-blue-200',
			text: 'text-blue-700'
		},
		'Financial Aid': {
			gradient: 'from-green-500 to-emerald-600',
			icon: <Award className='w-4 h-4' />,
			bg: 'bg-green-50',
			border: 'border-green-200',
			text: 'text-green-700'
		},
		Admission: {
			gradient: 'from-purple-500 to-violet-600',
			icon: <Users className='w-4 h-4' />,
			bg: 'bg-purple-50',
			border: 'border-purple-200',
			text: 'text-purple-700'
		},
		Innovation: {
			gradient: 'from-orange-500 to-red-600',
			icon: <TrendingUp className='w-4 h-4' />,
			bg: 'bg-orange-50',
			border: 'border-orange-200',
			text: 'text-orange-700'
		},
		Sports: {
			gradient: 'from-pink-500 to-rose-600',
			icon: <Users className='w-4 h-4' />,
			bg: 'bg-pink-50',
			border: 'border-pink-200',
			text: 'text-pink-700'
		},
		Library: {
			gradient: 'from-indigo-500 to-blue-600',
			icon: <BookOpen className='w-4 h-4' />,
			bg: 'bg-indigo-50',
			border: 'border-indigo-200',
			text: 'text-indigo-700'
		},
		General: {
			gradient: 'from-gray-500 to-slate-600',
			icon: <Bell className='w-4 h-4' />,
			bg: 'bg-gray-50',
			border: 'border-gray-200',
			text: 'text-gray-700'
		}
	};
	return configs[category] || configs['General'];
};

const MotionLink = motion(Link);

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return 'Today';
	if (diffDays === 1) return 'Yesterday';
	if (diffDays <= 7) return `${diffDays} days ago`;

	return date.toLocaleDateString('en', {
		month: 'short',
		day: 'numeric',
		year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
	});
};

const NoticeCard = ({ item, index }: { item: Notice; index: number }) => {
	const [isHovered, setIsHovered] = useState(false);
	const categoryConfig = getCategoryConfig(item.category);
	const link = item.href || item.fileUrl || '#';
	const isExternalLink = link.startsWith('http');

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className='group relative'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className='relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-sm md:shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1'>
				{/* Priority Indicator */}
				{item.priority && (
					<div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600' />
				)}

				<div className='p-4 sm:p-6'>
					{/* Header */}
					<div className='flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4'>
						{/* Category Icon */}
						<div className={`p-2.5 rounded-xl ${categoryConfig.bg} ${categoryConfig.border} border flex-shrink-0`}>
							{categoryConfig.icon}
						</div>

						{/* Content Header */}
						<div className='flex-1 min-w-0'>
							<div className='flex flex-row flex-wrap items-center gap-1.5 mb-2'>
								{item.priority && (
									<div className='bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1'>
										<Pin className='w-3 h-3' />
										<span>Priority</span>
									</div>
								)}
								<div
									className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryConfig.bg} ${categoryConfig.border} ${categoryConfig.text} border`}>
									<span className='hidden sm:inline'>{item.category}</span>
									<span className='sm:hidden'>{item.category.slice(0, 3)}</span>
								</div>
							</div>

							<h3 className='font-bold text-gray-800 text-xs sm:text-sm leading-tight mb-1 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300'>
								{item.title}
							</h3>
						</div>
					</div>

					{/* Content/Description */}
					{item.content && (
						<p className='text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4'>
							{item.content}
						</p>
					)}

					{/* Footer */}
					<div className='flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100'>
						<div className='flex items-center gap-3 text-xs text-gray-500 sm:gap-4'>
							<div className='flex items-center gap-1'>
								<Calendar className='w-3 h-3' />
								<span className='hidden sm:inline'>
									{formatDate(item.date)}
								</span>
								<span className='sm:hidden'>
									{formatDate(item.date).split(' ')[0]}
								</span>
							</div>
						</div>

						<MotionLink
							href={link}
							target={isExternalLink ? '_blank' : undefined}
							rel={isExternalLink ? 'noopener noreferrer' : undefined}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200'
							data-ph-event="notice_card_clicked"
							data-ph-data={JSON.stringify({
								title: item.title,
								category: item.category,
								id: item.id,
								link: link
							})}>
							View
							<ArrowRight className='w-3 h-3' />
						</MotionLink>
					</div>
				</div>

				{/* Hover Overlay */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 0.02 : 0 }}
					transition={{ duration: 0.3 }}
					className={`absolute inset-0 bg-gradient-to-br ${categoryConfig.gradient}`}
				/>
			</div>
		</motion.div>
	);
};

export default NoticeCard;
