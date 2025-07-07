'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
	Bell,
	Calendar,
	Clock,
	ArrowRight,
	Sparkles,
	BookOpen,
	GraduationCap,
	Award,
	Users,
	TrendingUp,
	Filter,
	ExternalLink,
	Pin,
	Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Priority = 'high' | 'medium' | 'low';
type Category =
	| 'Academic'
	| 'Financial Aid'
	| 'Admission'
	| 'Innovation'
	| 'Sports'
	| 'Library'
	| 'General';

const notices = [
	{
		id: 1,
		category: 'Academic' as Category,
		title: 'Mid-semester examination schedule released',
		subtitle: 'Check your exam dates and prepare accordingly',
		date: '2024-12-28',
		time: '10:00 AM',
		image: '/events/img1.png',
		priority: 'high' as Priority,
		tags: ['Exam', 'Schedule', 'Important'],
		description:
			'The mid-semester examination schedule has been released. Students are advised to check their individual exam timetables and prepare accordingly.',
		views: 1250,
		pinned: true,
		urgent: true
	},
	{
		id: 2,
		category: 'Financial Aid' as Category,
		title: 'Education loans available through PM Vidya Laxmi scheme',
		subtitle: 'Apply now for financial assistance',
		date: '2024-12-25',
		time: '2:30 PM',
		image: '/events/img2.png',
		priority: 'medium' as Priority,
		tags: ['Scholarship', 'Finance', 'Government'],
		description:
			'Students can now apply for education loans through the PM Vidya Laxmi scheme. Eligible students can receive financial assistance for their studies.',
		views: 890,
		pinned: false,
		urgent: false
	},
	{
		id: 3,
		category: 'Admission' as Category,
		title: 'Last date for semester registration extended',
		subtitle: 'Extended deadline for course registration',
		date: '2024-12-24',
		time: '5:00 PM',
		image: '/events/img1.png',
		priority: 'high' as Priority,
		tags: ['Registration', 'Deadline', 'Extension'],
		description:
			'The deadline for semester registration has been extended by one week. Students who have not yet registered are advised to complete the process immediately.',
		views: 2100,
		pinned: true,
		urgent: true
	},
	{
		id: 4,
		category: 'Academic' as Category,
		title: 'Final year project submission guidelines published',
		subtitle: 'Important guidelines for project submission',
		date: '2024-12-23',
		time: '11:15 AM',
		image: '/events/img2.png',
		priority: 'medium' as Priority,
		tags: ['Project', 'Guidelines', 'Final Year'],
		description:
			'Final year students can now access the comprehensive guidelines for project submission including format requirements and deadlines.',
		views: 1450,
		pinned: false,
		urgent: false
	},
	{
		id: 5,
		category: 'Innovation' as Category,
		title: 'Startup incubation program applications open',
		subtitle: 'Transform your ideas into reality',
		date: '2024-12-20',
		time: '11:00 AM',
		image: '/events/img1.png',
		priority: 'medium' as Priority,
		tags: ['Startup', 'Innovation', 'Incubation'],
		description:
			"The institute's startup incubation program is now accepting applications. Students with innovative business ideas are encouraged to apply.",
		views: 780,
		pinned: false,
		urgent: false
	},
	{
		id: 6,
		category: 'Library' as Category,
		title: 'Extended library hours during exams',
		subtitle: '24/7 access during examination period',
		date: '2024-12-19',
		time: '6:00 AM',
		image: '/events/img2.png',
		priority: 'high' as Priority,
		tags: ['Library', 'Exams', 'Extended Hours'],
		description:
			"The library will remain open 24/7 during the examination period to support students' preparation needs.",
		views: 1650,
		pinned: true,
		urgent: false
	}
];

const announcements = [
	{
		id: 1,
		category: 'Innovation' as Category,
		title: 'Institute Innovation Council (IIC) Meeting',
		subtitle: 'Monthly innovation council update',
		date: '2024-12-24',
		time: '1:30 PM',
		image: '/events/img1.png',
		priority: 'high' as Priority,
		tags: ['Innovation', 'Council', 'Meeting'],
		description:
			'Monthly meeting of the Institute Innovation Council to discuss ongoing projects and future initiatives.',
		views: 450,
		pinned: true,
		urgent: false
	},
	{
		id: 2,
		category: 'Sports' as Category,
		title: 'Inter-college basketball tournament registration',
		subtitle: 'Register your team now',
		date: '2024-12-23',
		time: '4:00 PM',
		image: '/events/img2.png',
		priority: 'medium' as Priority,
		tags: ['Sports', 'Tournament', 'Basketball'],
		description:
			'Registration is now open for the inter-college basketball tournament. Teams must register before the deadline.',
		views: 620,
		pinned: false,
		urgent: false
	},
	{
		id: 3,
		category: 'Academic' as Category,
		title: 'Guest lecture series on AI and Machine Learning',
		subtitle: 'Industry experts share insights',
		date: '2024-12-22',
		time: '10:30 AM',
		image: '/events/img1.png',
		priority: 'medium' as Priority,
		tags: ['AI', 'Machine Learning', 'Guest Lecture'],
		description:
			'Join us for an exciting guest lecture series featuring industry experts discussing the latest trends in AI and Machine Learning.',
		views: 980,
		pinned: false,
		urgent: false
	},
	{
		id: 4,
		category: 'General' as Category,
		title: 'Campus maintenance scheduled for this weekend',
		subtitle: 'Temporary service disruptions expected',
		date: '2024-12-21',
		time: '8:00 AM',
		image: '/events/img2.png',
		priority: 'low' as Priority,
		tags: ['Maintenance', 'Campus', 'Weekend'],
		description:
			'Scheduled maintenance work will be conducted over the weekend. Some services may be temporarily unavailable.',
		views: 340,
		pinned: false,
		urgent: false
	}
];

const getCategoryConfig = (category: Category) => {
	const configs = {
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
	return configs[category];
};

const getPriorityConfig = (priority: Priority) => {
	const configs = {
		high: {
			gradient: 'from-red-500 to-rose-600',
			bg: 'bg-red-50',
			border: 'border-red-200',
			text: 'text-red-700',
			label: 'High Priority'
		},
		medium: {
			gradient: 'from-yellow-500 to-orange-600',
			bg: 'bg-yellow-50',
			border: 'border-yellow-200',
			text: 'text-yellow-700',
			label: 'Medium Priority'
		},
		low: {
			gradient: 'from-green-500 to-emerald-600',
			bg: 'bg-green-50',
			border: 'border-green-200',
			text: 'text-green-700',
			label: 'Low Priority'
		}
	};
	return configs[priority];
};

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

const NoticeCard = ({
	item,
	index
}: {
	item: (typeof notices)[0];
	index: number;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const categoryConfig = getCategoryConfig(item.category);
	const priorityConfig = getPriorityConfig(item.priority);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className='group relative'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className='relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1'>
				{/* Priority Indicator */}
				{item.priority === 'high' && (
					<div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600' />
				)}

				{/* Pinned Badge */}
				{item.pinned && (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: 'spring' }}
						className='absolute top-3 right-3 z-10'>
						<div className='bg-gradient-to-r from-amber-400 to-orange-500 text-white p-1.5 rounded-full shadow-lg'>
							<Pin className='w-3 h-3' />
						</div>
					</motion.div>
				)}

				{/* Urgent Badge */}
				{item.urgent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='absolute top-3 left-3 z-10'>
						<div className='bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1'>
							<div className='w-2 h-2 bg-white rounded-full animate-pulse' />
							Urgent
						</div>
					</motion.div>
				)}

				<div className='p-6'>
					{/* Header */}
					<div className='flex items-start gap-4 mb-4'>
						{/* Image */}
						<div className='relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-lg'>
							<Image
								src={item.image}
								alt={item.title}
								fill
								className='object-cover'
							/>
						</div>

						{/* Content Header */}
						<div className='flex-1 min-w-0'>
							<div className='flex items-center gap-2 mb-2'>
								<div
									className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryConfig.bg} ${categoryConfig.border} ${categoryConfig.text} border`}>
									{categoryConfig.icon}
									{item.category}
								</div>
								<div
									className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.border} ${priorityConfig.text} border`}>
									{priorityConfig.label}
								</div>
							</div>

							<h3 className='font-bold text-gray-800 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300'>
								{item.title}
							</h3>
							<p className='text-xs text-gray-600 font-medium leading-relaxed'>
								{item.subtitle}
							</p>
						</div>
					</div>

					{/* Description */}
					<p className='text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4'>
						{item.description}
					</p>

					{/* Tags */}
					<div className='flex flex-wrap gap-1 mb-4'>
						{item.tags.slice(0, 3).map((tag, tagIndex) => (
							<span
								key={tagIndex}
								className='px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors duration-200'>
								{tag}
							</span>
						))}
						{item.tags.length > 3 && (
							<span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium'>
								+{item.tags.length - 3} more
							</span>
						)}
					</div>

					{/* Footer */}
					<div className='flex items-center justify-between pt-4 border-t border-gray-100'>
						<div className='flex items-center gap-4 text-xs text-gray-500'>
							<div className='flex items-center gap-1'>
								<Calendar className='w-3 h-3' />
								<span>{formatDate(item.date)}</span>
							</div>
							<div className='flex items-center gap-1'>
								<Clock className='w-3 h-3' />
								<span>{item.time}</span>
							</div>
							<div className='flex items-center gap-1'>
								<Eye className='w-3 h-3' />
								<span>{item.views}</span>
							</div>
						</div>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200'>
							View
							<ArrowRight className='w-3 h-3' />
						</motion.button>
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

const ScrollingSection = ({
	title,
	items,
	icon,
	gradient
}: {
	title: string;
	items: typeof notices;
	icon: React.ReactNode;
	gradient: string;
}) => {
	return (
		<div className='relative'>
			{/* Section Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center gap-3'>
					<div
						className={`p-3 bg-gradient-to-r ${gradient} text-white rounded-xl shadow-lg`}>
						{icon}
					</div>
					<div>
						<h3 className='text-2xl font-bold text-gray-800'>{title}</h3>
						<p className='text-gray-600'>Latest updates and information</p>
					</div>
				</div>

				<div className='flex items-center gap-3'>
					<Button variant='outline' size='sm' className='rounded-xl'>
						<Filter className='w-4 h-4 mr-2' />
						Filter
					</Button>
					<Button
						className={`bg-gradient-to-r ${gradient} hover:opacity-90 rounded-xl border-0`}>
						View All
						<ExternalLink className='w-4 h-4 ml-2' />
					</Button>
				</div>
			</div>

			{/* Infinite Scrolling Container */}
			<div className='relative overflow-hidden rounded-2xl'>
				{/* Gradient masks for seamless edge effect */}
				<div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-indigo-50 via-indigo-50/80 to-transparent z-10 pointer-events-none' />
				<div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-indigo-50 via-indigo-50/80 to-transparent z-10 pointer-events-none' />

				<motion.div
					animate={{ x: [0, -(items.length * 380)] }}
					transition={{
						duration: items.length * 3,
						repeat: Infinity,
						ease: 'linear'
					}}
					className='flex gap-6'
					style={{ width: `${items.length * 380 * 3}px` }}>
					{/* Triple the items for seamless infinite scroll */}
					{[...items, ...items, ...items].map((item, index) => (
						<motion.div
							key={`${item.id}-${index}`}
							className='w-[360px] flex-shrink-0'
							initial={{ opacity: 1, scale: 1 }}
							animate={{
								opacity: 1,
								scale: 1
							}}>
							<NoticeCard item={item} index={index % items.length} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default function ModernNoticesSection() {
	const [activeTab, setActiveTab] = useState<'notices' | 'announcements'>(
		'notices'
	);

	return (
		<section className='relative py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden'>
			{/* Background Elements */}
			<div className='absolute inset-0'>
				<div className='absolute top-20 right-10 w-80 h-80 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob' />
				<div className='absolute bottom-20 left-10 w-80 h-80 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' />
				<div className='absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000' />
			</div>

			{/* Floating Elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full'
						style={{
							top: `${15 + i * 10}%`,
							left: `${5 + i * 12}%`
						}}
						animate={{
							y: [0, -20, 0],
							opacity: [0.2, 0.8, 0.2]
						}}
						transition={{
							duration: 2 + i * 0.3,
							repeat: Infinity,
							delay: i * 0.2
						}}
					/>
				))}
			</div>

			<div className='relative z-10 container mx-auto px-4'>
				<div className='max-w-7xl mx-auto'>
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center space-y-6 mb-16'>
						<div className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white/40 shadow-lg'>
							<Bell className='w-5 h-5 text-indigo-600' />
							<span className='text-indigo-700 font-semibold'>
								Stay Updated
							</span>
							<Sparkles className='w-5 h-5 text-indigo-600' />
						</div>

						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent leading-tight'>
							Notices &
							<br />
							<span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
								Announcements
							</span>
						</h2>

						<p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
							Stay informed with the latest notices, announcements, and
							important updates from our institute. Never miss critical
							information again.
						</p>

						<div className='flex justify-center'>
							<div className='w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full' />
						</div>
					</motion.div>

					{/* Tab Navigation */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='flex justify-center mb-12'>
						<div className='inline-flex bg-white/80 backdrop-blur-md rounded-2xl p-2 border border-white/40 shadow-xl'>
							<button
								onClick={() => setActiveTab('notices')}
								className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
									activeTab === 'notices'
										? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
										: 'text-gray-600 hover:text-gray-800'
								}`}>
								Official Notices
							</button>
							<button
								onClick={() => setActiveTab('announcements')}
								className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
									activeTab === 'announcements'
										? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
										: 'text-gray-600 hover:text-gray-800'
								}`}>
								Announcements
							</button>
						</div>
					</motion.div>

					{/* Content */}
					<AnimatePresence mode='wait'>
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}>
							{activeTab === 'notices' ? (
								<ScrollingSection
									title='Official Notices'
									items={notices}
									icon={<Bell className='w-6 h-6' />}
									gradient='from-indigo-600 to-purple-600'
								/>
							) : (
								<ScrollingSection
									title='Latest Announcements'
									items={announcements}
									icon={<Sparkles className='w-6 h-6' />}
									gradient='from-purple-600 to-pink-600'
								/>
							)}
						</motion.div>
					</AnimatePresence>

					{/* Quick Stats */}
					{/* <motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className='mt-16 grid grid-cols-1 md:grid-cols-4 gap-6'>
						{[
							{
								label: 'Active Notices',
								value: notices.length,
								icon: <Bell className='w-5 h-5' />
							},
							{
								label: 'Announcements',
								value: announcements.length,
								icon: <Sparkles className='w-5 h-5' />
							},
							{
								label: 'High Priority',
								value: [...notices, ...announcements].filter(
									item => item.priority === 'high'
								).length,
								icon: <TrendingUp className='w-5 h-5' />
							},
							{
								label: 'Total Views',
								value: '12.5K',
								icon: <Eye className='w-5 h-5' />
							}
						].map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
								className='bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300'>
								<div className='flex items-center justify-between mb-2'>
									<div className='text-indigo-600'>{stat.icon}</div>
									<div className='text-2xl font-bold text-gray-800'>
										{stat.value}
									</div>
								</div>
								<p className='text-gray-600 font-medium'>{stat.label}</p>
							</motion.div>
						))}
					</motion.div> */}
				</div>
			</div>
		</section>
	);
}
