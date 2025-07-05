'use client';

import Image from 'next/image';
import {
	Calendar,
	BookOpen,
	Megaphone,
	ChevronRight,
	Sparkles,
	Clock,
	ArrowUpRight,
	Bell,
	GraduationCap
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Priority = 'high' | 'medium' | 'low';

const notices = [
	{
		id: 1,
		category: 'Academic',
		title: 'Mid-semester examination schedule released',
		date: 'Dec 28, 2024',
		time: '10:00 AM',
		image: '/events/img1.png?height=60&width=60',
		priority: 'high',
		tags: ['Exam', 'Schedule']
	},
	{
		id: 2,
		category: 'Financial Aid',
		title: 'Education loans available through PM Vidya laxmi scheme',
		date: 'Dec 25, 2024',
		time: '2:30 PM',
		image: '/events/img2.png?height=60&width=60',
		priority: 'medium',
		tags: ['Scholarship', 'Finance']
	},
	{
		id: 3,
		category: 'Admission',
		title: 'Last date for semester registration extended',
		date: 'Dec 24, 2024',
		time: '5:00 PM',
		image: '/events/img1.png?height=60&width=60',
		priority: 'high',
		tags: ['Registration', 'Deadline']
	},
	{
		id: 4,
		category: 'Academic',
		title: 'Final year project submission guidelines published',
		date: 'Dec 23, 2024',
		time: '11:15 AM',
		image: '/events/img2.png?height=60&width=60',
		priority: 'medium',
		tags: ['Project', 'Guidelines']
	},
	{
		id: 5,
		category: 'Admission',
		title: 'New batch orientation program announced',
		date: 'Dec 22, 2024',
		time: '9:00 AM',
		image: '/events/img1.png?height=60&width=60',
		priority: 'low',
		tags: ['Orientation', 'New Students']
	},
	{
		id: 6,
		category: 'Academic',
		title: 'Course registration for next semester opens',
		date: 'Dec 21, 2024',
		time: '12:00 PM',
		image: '/events/img2.png?height=60&width=60',
		priority: 'high',
		tags: ['Registration', 'Courses']
	},
	{
		id: 7,
		category: 'Financial Aid',
		title: 'Scholarship applications now available',
		date: 'Dec 20, 2024',
		time: '3:45 PM',
		image: '/events/img1.png?height=60&width=60',
		priority: 'medium',
		tags: ['Scholarship', 'Applications']
	}
];

const announcements = [
	{
		id: 1,
		category: 'Innovation',
		title: 'Note for Institute Innovation Council (IIC)',
		date: 'Dec 24, 2024',
		time: '1:30 PM',
		image: '/events/img1.png?height=60&width=60',
		priority: 'high',
		tags: ['Innovation', 'Council']
	},
	{
		id: 2,
		category: 'Sports',
		title: 'Inter-college basketball tournament registration open',
		date: 'Dec 23, 2024',
		time: '4:00 PM',
		image: '/events/img2.png?height=60&width=60',
		priority: 'medium',
		tags: ['Sports', 'Tournament']
	},
	{
		id: 3,
		category: 'Library',
		title: 'New digital resources added to library portal',
		date: 'Dec 22, 2024',
		time: '10:30 AM',
		image: '/events/img1.png?height=60&width=60',
		priority: 'low',
		tags: ['Library', 'Digital']
	},
	{
		id: 4,
		category: 'Sports',
		title: 'Annual sports meet registration begins',
		date: 'Dec 21, 2024',
		time: '8:00 AM',
		image: '/events/img2.png?height=60&width=60',
		priority: 'high',
		tags: ['Sports', 'Annual']
	},
	{
		id: 5,
		category: 'Innovation',
		title: 'Startup incubation program applications open',
		date: 'Dec 20, 2024',
		time: '11:00 AM',
		image: '/events/img1.png?height=60&width=60',
		priority: 'medium',
		tags: ['Startup', 'Innovation']
	},
	{
		id: 6,
		category: 'Library',
		title: 'Extended library hours during exams',
		date: 'Dec 19, 2024',
		time: '6:00 AM',
		image: '/events/img2.png?height=60&width=60',
		priority: 'high',
		tags: ['Library', 'Exams']
	},
	{
		id: 7,
		category: 'Innovation',
		title: 'Tech fest hackathon registration live',
		date: 'Dec 18, 2024',
		time: '2:15 PM',
		image: '/events/img1.png?height=60&width=60',
		priority: 'medium',
		tags: ['Tech Fest', 'Hackathon']
	}
];

interface ModernCardProps {
	item: (typeof notices)[0];
}

function ModernCard({ item }: ModernCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	const priorityColors: Record<Priority, string> = {
		high: 'from-red-500 to-red-600',
		medium: 'from-blue-500 to-blue-600',
		low: 'from-green-500 to-green-600'
	};

	const categoryIcons = {
		Academic: <GraduationCap className='w-4 h-4' />,
		'Financial Aid': <Sparkles className='w-4 h-4' />,
		Admission: <BookOpen className='w-4 h-4' />,
		Innovation: <Sparkles className='w-4 h-4' />,
		Sports: <Bell className='w-4 h-4' />,
		Library: <BookOpen className='w-4 h-4' />
	};

	return (
		<motion.div
			className='group cursor-pointer mb-4 last:mb-0'
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}>
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500'>
				{/* Animated background gradient */}
				<motion.div
					className='absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5'
					animate={{
						background: isHovered
							? 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))'
							: 'linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.05))'
					}}
					transition={{ duration: 0.5 }}
				/>

				{/* Priority indicator */}
				<div
					className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
						priorityColors[item.priority as Priority]
					}`}
				/>

				<div className='relative p-4 flex items-center space-x-4'>
					{/* Image with advanced effects */}
					<motion.div
						className='relative flex-shrink-0'
						whileHover={{ scale: 1.05 }}
						transition={{ type: 'spring', stiffness: 300 }}>
						<div className='w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-white/50 shadow-lg'>
							<Image
								src={item.image || '/placeholder.svg'}
								alt='Item preview'
								width={64}
								height={64}
								className='w-full h-full object-cover'
							/>
						</div>

						{/* Floating priority badge */}
						<motion.div
							className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r ${
								priorityColors[item.priority as Priority]
							} flex items-center justify-center shadow-lg`}
							animate={{
								scale: isHovered ? 1.1 : 1,
								rotate: isHovered ? 360 : 0
							}}
							transition={{ duration: 0.5 }}>
							<div className='w-1.5 h-1.5 bg-white rounded-full' />
						</motion.div>
					</motion.div>

					{/* Content */}
					<div className='flex-1 min-w-0'>
						{/* Header with category */}
						<div className='flex items-center justify-between mb-2'>
							<motion.div
								className='flex items-center space-x-2'
								animate={{ x: isHovered ? 3 : 0 }}
								transition={{ duration: 0.3 }}>
								<div className='flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50'>
									{categoryIcons[item.category as keyof typeof categoryIcons]}
									<span className='text-xs font-semibold text-blue-700'>
										{item.category}
									</span>
								</div>
							</motion.div>

							<motion.div
								animate={{
									rotate: isHovered ? 45 : 0,
									scale: isHovered ? 1.1 : 1
								}}
								transition={{ duration: 0.3 }}>
								<ArrowUpRight className='w-4 h-4 text-gray-400 group-hover:text-blue-600' />
							</motion.div>
						</div>

						{/* Title */}
						<motion.h3
							className='font-bold text-gray-800 text-sm leading-tight mb-2 group-hover:text-blue-700 transition-colors line-clamp-2'
							animate={{ x: isHovered ? 3 : 0 }}
							transition={{ duration: 0.3, delay: 0.1 }}>
							{item.title}
						</motion.h3>

						{/* Date and time with enhanced styling */}
						<motion.div
							className='flex items-center justify-between'
							animate={{ x: isHovered ? 3 : 0 }}
							transition={{ duration: 0.3, delay: 0.2 }}>
							<div className='flex items-center space-x-3 text-xs text-gray-600'>
								<div className='flex items-center space-x-1'>
									<Calendar className='w-3 h-3 text-blue-500' />
									<span className='font-medium'>{item.date}</span>
								</div>
								<div className='flex items-center space-x-1'>
									<Clock className='w-3 h-3 text-purple-500' />
									<span className='font-medium'>{item.time}</span>
								</div>
							</div>

							{/* Tags */}
							<div className='flex space-x-1'>
								{item.tags.slice(0, 1).map((tag, tagIndex) => (
									<motion.span
										key={tag}
										className='px-2 py-1 text-xs font-medium bg-gray-100/80 text-gray-600 rounded-full border border-gray-200/50'
										animate={{
											scale: isHovered ? 1.05 : 1,
											y: isHovered ? -1 : 0
										}}
										transition={{ duration: 0.3, delay: tagIndex * 0.05 }}>
										{tag}
									</motion.span>
								))}
							</div>
						</motion.div>
					</div>
				</div>

				{/* Hover glow effect */}
				<motion.div
					className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl'
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 1 : 0 }}
					transition={{ duration: 0.3 }}
				/>
			</div>
		</motion.div>
	);
}

interface ContinuousScrollingSectionProps {
	title: string;
	items: typeof notices;
	viewAllText: string;
	icon: React.ReactNode;
	gradient: string;
	animationName: string;
}

function ContinuousScrollingSection({
	title,
	items,
	viewAllText,
	icon,
	gradient,
	animationName
}: ContinuousScrollingSectionProps) {
	const [isPaused, setIsPaused] = useState(false);

	const CARD_HEIGHT = 110; // height of each card including margin
	const VISIBLE_CARDS = 4;
	const CONTAINER_HEIGHT = VISIBLE_CARDS * CARD_HEIGHT;

	return (
		<motion.div
			className='space-y-6'
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}>
			{/* Enhanced Header */}
			<div className='relative'>
				{/* Background decoration */}
				<div className='absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-3xl opacity-50' />

				<div className='relative flex items-center justify-between gap-4 p-4 md:p-6 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg'>
					<motion.div
						className='flex items-center space-x-3 md:space-x-4 flex-1 min-w-0'
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}>
						<div
							className={`p-2 md:p-3 bg-gradient-to-r ${gradient} rounded-2xl shadow-lg flex-shrink-0`}>
							{icon}
						</div>
						<div className='min-w-0 flex-1'>
							<h2 className='text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent truncate'>
								{title}
							</h2>
							<div className='flex items-center space-x-2 mt-1'>
								<div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0' />
								<span className='text-xs md:text-sm text-gray-600 font-medium'>
									Live Updates
								</span>
							</div>
						</div>
					</motion.div>

					<motion.button
						className='group flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0'
						whileHover={{ scale: 1.05, x: 5 }}
						whileTap={{ scale: 0.95 }}>
						<span className='font-semibold text-sm md:text-base whitespace-nowrap'>
							{viewAllText}
						</span>
						<ChevronRight className='w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0' />
					</motion.button>
				</div>
			</div>

			{/* Scrolling Cards Container */}
			<div
				className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50/50 to-blue-50/50 backdrop-blur-sm border border-white/20'
				style={{ height: `${CONTAINER_HEIGHT}px` }}
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}>
				{/* Background decoration */}
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)]' />

				<div
					className='relative p-4'
					style={{
						animation: `${animationName} ${items.length * 3}s linear infinite`,
						animationPlayState: isPaused ? 'paused' : 'running'
					}}>
					{/* Original items */}
					{items.map(item => (
						<ModernCard key={`original-${item.id}`} item={item} />
					))}

					{/* Duplicate items for seamless loop */}
					{items.map(item => (
						<ModernCard key={`duplicate-${item.id}`} item={item} />
					))}
				</div>
			</div>
		</motion.div>
	);
}

export default function NoticesAnnouncementsScrollingSection() {
	const CARD_HEIGHT = 110;
	const NOTICES_SCROLL_DISTANCE = notices.length * CARD_HEIGHT;
	const ANNOUNCEMENTS_SCROLL_DISTANCE = announcements.length * CARD_HEIGHT;

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
				@keyframes scroll-up-notices {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-${NOTICES_SCROLL_DISTANCE}px);
					}
				}
				@keyframes scroll-up-announcements {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-${ANNOUNCEMENTS_SCROLL_DISTANCE}px);
					}
				}
				`
				}}
			/>
			<section className='relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden'>
				{/* Enhanced background with multiple layers */}
				<div className='absolute inset-0'>
					{/* Base gradient */}
					<div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50' />

					{/* Animated blob effects */}
					<div className='absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob' />
					<div className='absolute top-40 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000' />
					<div className='absolute -bottom-8 left-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000' />

					{/* Floating elements */}
					<motion.div
						className='absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full'
						animate={{
							y: [0, -30, 0],
							opacity: [0.3, 1, 0.3]
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							delay: 0
						}}
					/>
					<motion.div
						className='absolute top-1/3 right-1/3 w-4 h-4 bg-purple-400 rounded-full'
						animate={{
							y: [0, -40, 0],
							opacity: [0.4, 1, 0.4]
						}}
						transition={{
							duration: 5,
							repeat: Infinity,
							delay: 1
						}}
					/>
				</div>

				<div className='relative z-10 max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
						{/* Notices */}
						<ContinuousScrollingSection
							title='Notices'
							items={notices}
							viewAllText='View All'
							icon={<BookOpen className='w-6 h-6 text-white' />}
							gradient='from-blue-500 to-blue-600'
							animationName='scroll-up-notices'
						/>

						{/* Announcements */}
						<ContinuousScrollingSection
							title='Announcements'
							items={announcements}
							viewAllText='View All'
							icon={<Megaphone className='w-6 h-6 text-white' />}
							gradient='from-purple-500 to-purple-600'
							animationName='scroll-up-announcements'
						/>
					</div>
				</div>

				{/* CSS for blob animation */}
				<style jsx>{`
					@keyframes blob {
						0% {
							transform: translate(0px, 0px) scale(1);
						}
						33% {
							transform: translate(30px, -50px) scale(1.1);
						}
						66% {
							transform: translate(-20px, 20px) scale(0.9);
						}
						100% {
							transform: translate(0px, 0px) scale(1);
						}
					}
					.animate-blob {
						animation: blob 7s infinite;
					}
					.animation-delay-2000 {
						animation-delay: 2s;
					}
					.animation-delay-4000 {
						animation-delay: 4s;
					}
				`}</style>
			</section>
		</>
	);
}
