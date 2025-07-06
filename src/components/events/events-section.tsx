'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	Clock,
	MapPin,
	Users,
	ArrowRight,
	Calendar,
	Star,
	Bookmark,
	Zap,
	Heart,
	Globe,
	Target,
	Lightbulb,
	Palette
} from 'lucide-react';

const events = [
	{
		id: 1,
		title: 'BPIT TechFest 2024',
		subtitle: 'Innovation Summit & Tech Showcase',
		description:
			'Join us for the most spectacular tech festival featuring AI/ML workshops, robotics competitions, startup showcases, and industry expert keynotes.',
		image: '/events/img1.png',
		date: '2024-03-15',
		time: '9:00 AM - 8:00 PM',
		location: 'BPIT Main Auditorium',
		category: 'Technology',
		attendees: 1200,
		featured: true,
		status: 'upcoming',
		tags: ['AI/ML', 'Robotics', 'Startups', 'Innovation'],
		organizer: 'Technical Society BPIT',
		registrationOpen: true,
		price: 'Free',
		highlights: ['Industry Leaders', '48+ Hours', '₹50K+ Prizes'],
		rating: 4.9,
		totalRatings: 847
	},
	{
		id: 2,
		title: 'Industry Connect 2024',
		subtitle: 'Career Guidance & Networking',
		description:
			'Exclusive networking event with senior engineers from FAANG companies sharing career insights, technical guidance, and placement strategies.',
		image: '/events/img2.png',
		date: '2024-03-22',
		time: '2:00 PM - 7:00 PM',
		location: 'Conference Hall Complex',
		category: 'Professional',
		attendees: 450,
		featured: true,
		status: 'upcoming',
		tags: ['FAANG', 'Career', 'Networking', 'Placement'],
		organizer: 'Training & Placement Cell',
		registrationOpen: true,
		price: '₹199',
		highlights: ['FAANG Engineers', 'Live Q&A', 'Job Referrals'],
		rating: 4.8,
		totalRatings: 623
	},
	{
		id: 3,
		title: 'Sanskriti Cultural Fest',
		subtitle: 'Celebrating Arts & Heritage',
		description:
			'Experience the vibrant tapestry of Indian culture through music, dance, drama, art exhibitions, and traditional performances.',
		image: '/events/img3.png',
		date: '2024-04-05',
		time: '6:00 PM - 11:00 PM',
		location: 'Open Air Theatre',
		category: 'Cultural',
		attendees: 1500,
		featured: false,
		status: 'upcoming',
		tags: ['Music', 'Dance', 'Art', 'Heritage'],
		organizer: 'Cultural Committee',
		registrationOpen: true,
		price: 'Free',
		highlights: ['Live Performances', '15+ Events', 'Celebrity Guest'],
		rating: 4.7,
		totalRatings: 1024
	},
	{
		id: 4,
		title: 'CodeCraft Hackathon',
		subtitle: '72-Hour Innovation Marathon',
		description:
			'The ultimate coding challenge to solve real-world problems with cutting-edge technology, mentorship, and massive prize pool.',
		image: '/events/img1.png',
		date: '2024-04-12',
		time: '9:00 AM - 9:00 AM (+3 days)',
		location: 'Computer Science Block',
		category: 'Technology',
		attendees: 300,
		featured: true,
		status: 'upcoming',
		tags: ['Hackathon', 'Innovation', 'Prizes', 'Mentorship'],
		organizer: 'CSE Department',
		registrationOpen: true,
		price: '₹299',
		highlights: ['₹1L+ Prizes', '72 Hours', 'Mentor Support'],
		rating: 4.9,
		totalRatings: 412
	},
	{
		id: 5,
		title: 'Research Symposium',
		subtitle: 'Future of Engineering',
		description:
			'Showcase of groundbreaking research in emerging technologies, sustainable engineering, and next-generation innovations.',
		image: '/events/img2.png',
		date: '2024-04-18',
		time: '10:00 AM - 6:00 PM',
		location: 'Research Center',
		category: 'Academic',
		attendees: 350,
		featured: false,
		status: 'upcoming',
		tags: ['Research', 'Innovation', 'Future Tech', 'Sustainability'],
		organizer: 'R&D Cell',
		registrationOpen: true,
		price: 'Free',
		highlights: ['20+ Papers', 'Expert Panel', 'Publication'],
		rating: 4.6,
		totalRatings: 267
	},
	{
		id: 6,
		title: 'Alumni Homecoming',
		subtitle: 'Reconnect & Celebrate Success',
		description:
			'Annual alumni gathering celebrating achievements, sharing experiences, and strengthening the BPIT family bonds.',
		image: '/events/img3.png',
		date: '2024-04-25',
		time: '4:00 PM - 10:00 PM',
		location: 'Alumni Memorial Hall',
		category: 'Networking',
		attendees: 800,
		featured: false,
		status: 'upcoming',
		tags: ['Alumni', 'Success Stories', 'Networking', 'Legacy'],
		organizer: 'Alumni Association',
		registrationOpen: false,
		price: 'Invite Only',
		highlights: ['Success Stories', 'Gala Dinner', 'Awards'],
		rating: 4.8,
		totalRatings: 956
	}
];

const categoryConfig = {
	Technology: {
		gradient: 'from-blue-500 via-cyan-500 to-teal-500',
		bgGradient: 'from-blue-50 via-cyan-50 to-teal-50',
		darkGradient: 'from-blue-900 via-cyan-900 to-teal-900',
		icon: <Zap className='w-5 h-5' />,
		color: 'text-blue-600',
		accentColor: 'bg-blue-500',
		borderColor: 'border-blue-200',
		glowColor: 'shadow-blue-500/25'
	},
	Cultural: {
		gradient: 'from-purple-500 via-pink-500 to-rose-500',
		bgGradient: 'from-purple-50 via-pink-50 to-rose-50',
		darkGradient: 'from-purple-900 via-pink-900 to-rose-900',
		icon: <Palette className='w-5 h-5' />,
		color: 'text-purple-600',
		accentColor: 'bg-purple-500',
		borderColor: 'border-purple-200',
		glowColor: 'shadow-purple-500/25'
	},
	Professional: {
		gradient: 'from-green-500 via-emerald-500 to-teal-500',
		bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
		darkGradient: 'from-green-900 via-emerald-900 to-teal-900',
		icon: <Target className='w-5 h-5' />,
		color: 'text-green-600',
		accentColor: 'bg-green-500',
		borderColor: 'border-green-200',
		glowColor: 'shadow-green-500/25'
	},
	Academic: {
		gradient: 'from-orange-500 via-amber-500 to-yellow-500',
		bgGradient: 'from-orange-50 via-amber-50 to-yellow-50',
		darkGradient: 'from-orange-900 via-amber-900 to-yellow-900',
		icon: <Lightbulb className='w-5 h-5' />,
		color: 'text-orange-600',
		accentColor: 'bg-orange-500',
		borderColor: 'border-orange-200',
		glowColor: 'shadow-orange-500/25'
	},
	Networking: {
		gradient: 'from-indigo-500 via-purple-500 to-blue-500',
		bgGradient: 'from-indigo-50 via-purple-50 to-blue-50',
		darkGradient: 'from-indigo-900 via-purple-900 to-blue-900',
		icon: <Globe className='w-5 h-5' />,
		color: 'text-indigo-600',
		accentColor: 'bg-indigo-500',
		borderColor: 'border-indigo-200',
		glowColor: 'shadow-indigo-500/25'
	}
};

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return {
		day: date.getDate().toString().padStart(2, '0'),
		month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
		year: date.getFullYear().toString(),
		weekday: date.toLocaleDateString('en-US', { weekday: 'long' })
	};
};

const UltraEventCard = ({
	event,
	index
}: {
	event: (typeof events)[0];
	index: number;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const cardRef = useRef(null);
	const isInView = useInView(cardRef, { once: true, margin: '-100px' });

	const dateObj = formatDate(event.date);
	const config = categoryConfig[event.category as keyof typeof categoryConfig];

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 100, rotateX: -15 }}
			animate={
				isInView
					? { opacity: 1, y: 0, rotateX: 0 }
					: { opacity: 0, y: 100, rotateX: -15 }
			}
			transition={{
				duration: 0.8,
				delay: index * 0.2,
				type: 'spring',
				stiffness: 100,
				damping: 20
			}}
			whileHover={{
				y: -20,
				rotateY: 5,
				rotateX: 5,
				scale: 1.02,
				transition: { duration: 0.4 }
			}}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			className='relative group perspective-1000'
			style={{
				transformStyle: 'preserve-3d'
			}}>
			<div
				className={`
				relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl
				border border-white/40 ${config.glowColor}
				transform-gpu transition-all duration-500
				${isHovered ? 'shadow-2xl shadow-black/10' : 'shadow-lg'}
			`}>
				<motion.div
					className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-50`}
					animate={{
						background: isHovered
							? `linear-gradient(135deg, ${config.bgGradient})`
							: `linear-gradient(45deg, ${config.bgGradient})`
					}}
					transition={{ duration: 0.6 }}
				/>

				<div className='absolute inset-0 overflow-hidden pointer-events-none'>
					{[...Array(6)].map((_, i) => (
						<motion.div
							key={i}
							className={`absolute w-1 h-1 ${config.accentColor} rounded-full opacity-40`}
							style={{
								top: `${20 + i * 15}%`,
								left: `${10 + i * 12}%`
							}}
							animate={{
								y: isHovered ? [0, -20, 0] : [0, -10, 0],
								opacity: isHovered ? [0.4, 1, 0.4] : [0.2, 0.6, 0.2],
								scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1]
							}}
							transition={{
								duration: 2 + i * 0.3,
								repeat: Infinity,
								delay: i * 0.4
							}}
						/>
					))}
				</div>

				{event.featured && (
					<motion.div
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{ delay: index * 0.2 + 0.5, type: 'spring' }}
						className='absolute top-4 left-4 z-20'>
						<div className='flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg'>
							<Star className='w-4 h-4 fill-current' />
							Featured
						</div>
					</motion.div>
				)}

				<div className='absolute top-4 right-4 z-20 flex gap-2'>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsLiked(!isLiked)}
						className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
							isLiked
								? 'bg-red-500 text-white shadow-lg'
								: 'bg-white/80 text-gray-600 hover:bg-white'
						}`}>
						<Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsBookmarked(!isBookmarked)}
						className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
							isBookmarked
								? `${config.accentColor} text-white shadow-lg`
								: 'bg-white/80 text-gray-600 hover:bg-white'
						}`}>
						<Bookmark
							className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
						/>
					</motion.button>
				</div>

				<div className='relative h-64 overflow-hidden'>
					<motion.div
						animate={{
							scale: isHovered ? 1.1 : 1,
							y: isHovered ? -10 : 0
						}}
						transition={{ duration: 0.6 }}
						className='h-full'>
						<Image
							src={event.image}
							alt={event.title}
							fill
							className='object-cover'
						/>
					</motion.div>

					<div
						className={`absolute inset-0 bg-gradient-to-t ${config.darkGradient} opacity-30`}
					/>

					<motion.div
						initial={{ x: -100 }}
						animate={{ x: 0 }}
						transition={{ delay: index * 0.2 + 0.3 }}
						className='absolute bottom-4 left-4'>
						<div className='bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/40'>
							<div className='text-center'>
								<div className={`text-2xl font-bold ${config.color}`}>
									{dateObj.day}
								</div>
								<div className='text-sm font-semibold text-gray-600'>
									{dateObj.month}
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ x: 100 }}
						animate={{ x: 0 }}
						transition={{ delay: index * 0.2 + 0.4 }}
						className='absolute bottom-4 right-4'>
						<div className='flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-white/40'>
							<Star className='w-4 h-4 text-yellow-500 fill-current' />
							<span className='text-sm font-bold text-gray-800'>
								{event.rating}
							</span>
							<span className='text-xs text-gray-500'>
								({event.totalRatings})
							</span>
						</div>
					</motion.div>
				</div>

				<div className='relative p-6 space-y-4'>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: index * 0.2 + 0.6 }}
						className='flex items-center gap-2'>
						<div
							className={`p-2 rounded-xl bg-gradient-to-r ${config.gradient} text-white shadow-lg`}>
							{config.icon}
						</div>
						<span
							className={`text-sm font-bold ${config.color} bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
							{event.category}
						</span>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 + 0.7 }}>
						<h3 className='text-xl font-bold text-gray-900 mb-1 line-clamp-2'>
							{event.title}
						</h3>
						<p className='text-sm font-medium text-gray-600'>
							{event.subtitle}
						</p>
					</motion.div>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 + 0.8 }}
						className='text-sm text-gray-600 leading-relaxed line-clamp-3'>
						{event.description}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 + 0.9 }}
						className='space-y-2'>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<Clock className='w-4 h-4' />
							<span>{event.time}</span>
						</div>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<MapPin className='w-4 h-4' />
							<span>{event.location}</span>
						</div>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<Users className='w-4 h-4' />
							<span>{event.attendees} attendees</span>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 + 1.0 }}
						className='flex flex-wrap gap-2'>
						{event.highlights.map((highlight, i) => (
							<span
								key={i}
								className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${config.gradient} text-white shadow-md`}>
								{highlight}
							</span>
						))}
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: index * 0.2 + 1.1 }}
						className='pt-4'>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								className={`w-full bg-gradient-to-r ${config.gradient} hover:shadow-xl text-white border-0 rounded-2xl py-3 font-bold transition-all duration-300`}
								disabled={!event.registrationOpen}>
								{event.registrationOpen ? (
									<>
										<Calendar className='w-4 h-4 mr-2' />
										Register Now
										<ArrowRight className='w-4 h-4 ml-2' />
									</>
								) : (
									<>
										<Clock className='w-4 h-4 mr-2' />
										Registration Closed
									</>
								)}
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default function UltraModernEventsSection() {
	const sectionRef = useRef(null);
	const [isPaused, setIsPaused] = useState(false);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start']
	});

	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

	const CARD_WIDTH = 400;
	const SCROLL_DISTANCE = events.length * CARD_WIDTH;

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						@keyframes scroll-left-events {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(-${SCROLL_DISTANCE}px);
							}
						}
						.scroll-left-animation {
							animation: scroll-left-events ${events.length * 4}s linear infinite;
						}
						.scroll-paused {
							animation-play-state: paused;
						}
					`
				}}
			/>

			<motion.section
				ref={sectionRef}
				style={{ opacity }}
				className='relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden'>
				<div className='absolute inset-0'>
					<motion.div
						style={{ y }}
						className='absolute top-20 left-10 w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl'
						animate={{
							scale: [1, 1.2, 1],
							rotate: [0, 90, 0]
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							ease: 'linear'
						}}
					/>
					<motion.div
						style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
						className='absolute top-40 right-10 w-[450px] h-[450px] bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl'
						animate={{
							scale: [1.2, 1, 1.2],
							rotate: [90, 180, 90]
						}}
						transition={{
							duration: 25,
							repeat: Infinity,
							ease: 'linear'
						}}
					/>
					<motion.div
						style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
						className='absolute bottom-20 left-20 w-[600px] h-[600px] bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl'
						animate={{
							scale: [1, 1.3, 1],
							rotate: [180, 270, 180]
						}}
						transition={{
							duration: 30,
							repeat: Infinity,
							ease: 'linear'
						}}
					/>

					<div className='absolute inset-0 overflow-hidden pointer-events-none'>
						{[...Array(20)].map((_, i) => (
							<motion.div
								key={i}
								className='absolute'
								style={{
									top: `${10 + (i % 4) * 25}%`,
									left: `${5 + (i % 5) * 20}%`
								}}
								animate={{
									y: [0, -50, 0],
									rotate: [0, 360],
									opacity: [0.2, 1, 0.2],
									scale: [1, 1.5, 1]
								}}
								transition={{
									duration: 8 + i * 0.5,
									repeat: Infinity,
									delay: i * 0.3,
									ease: 'easeInOut'
								}}>
								<div
									className={`w-2 h-2 rounded-full ${
										i % 4 === 0
											? 'bg-blue-400'
											: i % 4 === 1
											? 'bg-purple-400'
											: i % 4 === 2
											? 'bg-pink-400'
											: 'bg-cyan-400'
									} shadow-lg`}
								/>
							</motion.div>
						))}
					</div>
				</div>

				<div className='relative z-10 container mx-auto px-4'>
					<div className='max-w-7xl mx-auto'>
						<div className='flex items-center justify-between mb-8'>
							<div className='flex items-center gap-3'>
								<div className='p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg'>
									<Calendar className='w-6 h-6' />
								</div>
								<div>
									<h3 className='text-2xl font-bold text-gray-800'>
										Official Events
									</h3>
									<p className='text-gray-600'>
										Latest campus events and activities
									</p>
								</div>
							</div>

							<motion.button
								className='group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'
								whileHover={{ scale: 1.05, x: 5 }}
								whileTap={{ scale: 0.95 }}>
								<span className='font-semibold'>View All Events</span>
								<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
							</motion.button>
						</div>

						<div
							className='relative overflow-hidden rounded-2xl'
							onMouseEnter={() => setIsPaused(true)}
							onMouseLeave={() => setIsPaused(false)}>
							{/* Gradient masks for seamless edge effect */}
							<div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-blue-50/80 to-transparent z-10 pointer-events-none' />
							<div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-indigo-50 via-blue-50/80 to-transparent z-10 pointer-events-none' />

							{/* Scrolling Container */}
							<div
								className={`flex gap-6 scroll-left-animation ${
									isPaused ? 'scroll-paused' : ''
								}`}
								style={{ width: `${events.length * CARD_WIDTH * 2}px` }}>
								{/* Duplicate events for seamless infinite scroll */}
								{[...events, ...events].map((event, index) => (
									<motion.div
										key={`${event.id}-${Math.floor(index / events.length)}`}
										className='w-[360px] flex-shrink-0'
										initial={{ opacity: 1, scale: 1 }}
										whileHover={{ scale: 1.02 }}
										transition={{ duration: 0.3 }}>
										<UltraEventCard
											event={event}
											index={index % events.length}
										/>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</div>
			</motion.section>
		</>
	);
}
