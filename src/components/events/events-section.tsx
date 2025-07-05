'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
	ChevronLeft,
	ChevronRight,
	Calendar,
	MapPin,
	Clock,
	ArrowRight,
	Star,
	Users,
	Eye,
	Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const events = [
	{
		id: 1,
		title: 'Annual Tech Symposium 2024',
		date: 'March 15, 2024',
		time: '9:00 AM - 5:00 PM',
		location: 'Main Auditorium',
		image: '/events/img3.png?height=400&width=400',
		category: 'Technology',
		description:
			'Cutting-edge technology presentations and innovations showcasing the future of engineering.',
		attendees: '500+',
		featured: true
	},
	{
		id: 2,
		title: 'Cultural Fest - Harmony',
		date: 'March 22, 2024',
		time: '6:00 PM - 11:00 PM',
		location: 'Campus Grounds',
		image: '/events/img2.png?height=400&width=400',
		category: 'Cultural',
		description:
			'Experience the vibrant colors of our cultural diversity through performances and exhibitions.',
		attendees: '800+',
		featured: false
	},
	{
		id: 3,
		title: 'Career Fair 2024',
		date: 'April 5, 2024',
		time: '10:00 AM - 4:00 PM',
		location: 'Sports Complex',
		image: '/events/img3.png?height=400&width=400',
		category: 'Career',
		description:
			'Connect with industry leaders and explore exciting career opportunities.',
		attendees: '300+',
		featured: true
	},
	{
		id: 4,
		title: 'Research Conference',
		date: 'April 12, 2024',
		time: '9:30 AM - 6:00 PM',
		location: 'Conference Hall',
		image: '/events/img2.png?height=400&width=400',
		category: 'Academic',
		description:
			'Groundbreaking research presentations and academic discussions.',
		attendees: '200+',
		featured: false
	},
	{
		id: 5,
		title: 'Sports Meet 2024',
		date: 'April 20, 2024',
		time: '8:00 AM - 6:00 PM',
		location: 'Sports Ground',
		image: '/events/img3.png?height=400&width=400',
		category: 'Sports',
		description:
			'Athletic excellence and sportsmanship in various competitive events.',
		attendees: '600+',
		featured: false
	},
	{
		id: 6,
		title: 'Alumni Meet',
		date: 'May 5, 2024',
		time: '5:00 PM - 10:00 PM',
		location: 'Main Hall',
		image: '/events/img2.png?height=400&width=400',
		category: 'Alumni',
		description:
			'Reconnect with fellow alumni and celebrate our shared journey.',
		attendees: '400+',
		featured: true
	}
];

const getCategoryConfig = (category: string) => {
	const configs = {
		Technology: {
			bg: 'bg-gradient-to-r from-blue-500 to-cyan-600',
			text: 'text-white',
			icon: '💻',
			glow: 'shadow-blue-500/25'
		},
		Cultural: {
			bg: 'bg-gradient-to-r from-purple-500 to-pink-600',
			text: 'text-white',
			icon: '🎭',
			glow: 'shadow-purple-500/25'
		},
		Career: {
			bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
			text: 'text-white',
			icon: '💼',
			glow: 'shadow-green-500/25'
		},
		Academic: {
			bg: 'bg-gradient-to-r from-indigo-500 to-blue-600',
			text: 'text-white',
			icon: '📚',
			glow: 'shadow-indigo-500/25'
		},
		Sports: {
			bg: 'bg-gradient-to-r from-orange-500 to-red-600',
			text: 'text-white',
			icon: '🏆',
			glow: 'shadow-orange-500/25'
		},
		Alumni: {
			bg: 'bg-gradient-to-r from-violet-500 to-purple-600',
			text: 'text-white',
			icon: '🎓',
			glow: 'shadow-violet-500/25'
		}
	};
	return (
		configs[category as keyof typeof configs] || {
			bg: 'bg-gradient-to-r from-gray-500 to-gray-600',
			text: 'text-white',
			icon: '📅',
			glow: 'shadow-gray-500/25'
		}
	);
};

export default function EventsSection() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [cardsPerView, setCardsPerView] = useState(3);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	const getCardsPerView = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 768) return 1; // Mobile: 1 card
			if (window.innerWidth < 1200) return 2; // Tablet: 2 cards
			return 3; // Desktop: 3 cards
		}
		return 3;
	};

	useEffect(() => {
		const handleResize = () => {
			setCardsPerView(getCardsPerView());
		};

		setCardsPerView(getCardsPerView());
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentIndex(prev => {
				const nextIndex = prev + 1;
				const maxIndex = Math.max(0, events.length - cardsPerView);
				return nextIndex > maxIndex ? 0 : nextIndex;
			});
		}, 4000);

		return () => clearInterval(interval);
	}, [cardsPerView, isAutoPlaying]);

	const maxIndex = Math.max(0, events.length - cardsPerView);

	const nextSlide = () => {
		setCurrentIndex(prev => {
			const nextIndex = prev + 1;
			return nextIndex > maxIndex ? 0 : nextIndex;
		});
	};

	const prevSlide = () => {
		setCurrentIndex(prev => {
			const prevIndex = prev - 1;
			return prevIndex < 0 ? maxIndex : prevIndex;
		});
	};

	const getVisibleEvents = () => {
		return events.slice(currentIndex, currentIndex + cardsPerView);
	};

	return (
		<section className='relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden'>
			{/* Background Elements */}
			<div className='absolute inset-0'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob' />
				<div className='absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000' />
				<div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000' />
			</div>

			{/* Floating particles */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-2 h-2 bg-blue-400 rounded-full opacity-30'
						style={{
							left: `${20 + i * 15}%`,
							top: `${30 + i * 10}%`
						}}
						animate={{
							y: [0, -30, 0],
							opacity: [0.3, 1, 0.3]
						}}
						transition={{
							duration: 3 + i,
							repeat: Infinity,
							delay: i * 0.5
						}}
					/>
				))}
			</div>

			<div className='relative z-10 max-w-7xl mx-auto'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
						className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-6 shadow-lg'>
						<Sparkles className='w-5 h-5 mr-2' />
						<span className='font-semibold'>Upcoming Events</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.6 }}
						className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-4'>
						Experience Excellence
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
						Join us for inspiring events that shape the future of technology,
						culture, and innovation at BPIT
					</motion.p>
				</motion.div>

				{/* Controls */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className='flex justify-between items-center mb-12'>
					<div className='flex items-center space-x-4'>
						<button
							onClick={() => setIsAutoPlaying(!isAutoPlaying)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
								isAutoPlaying
									? 'bg-blue-100 text-blue-700 border border-blue-200'
									: 'bg-gray-100 text-gray-600 border border-gray-200'
							}`}>
							{isAutoPlaying ? 'Auto-play On' : 'Auto-play Off'}
						</button>
					</div>

					<div className='flex items-center space-x-3'>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onClick={prevSlide}
							className='w-12 h-12 bg-white/80 backdrop-blur-sm hover:bg-white border border-blue-100 hover:border-blue-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group'>
							<ChevronLeft className='w-5 h-5 text-blue-600 group-hover:text-blue-800 transition-colors' />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onClick={nextSlide}
							className='w-12 h-12 bg-white/80 backdrop-blur-sm hover:bg-white border border-blue-100 hover:border-blue-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group'>
							<ChevronRight className='w-5 h-5 text-blue-600 group-hover:text-blue-800 transition-colors' />
						</motion.button>
					</div>
				</motion.div>

				{/* Events Carousel */}
				<div
					className='relative'
					onMouseEnter={() => setIsAutoPlaying(false)}
					onMouseLeave={() => setIsAutoPlaying(true)}>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.6, ease: 'easeInOut' }}
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{getVisibleEvents().map((event, index) => {
								const categoryConfig = getCategoryConfig(event.category);
								return (
									<motion.div
										key={event.id}
										initial={{ opacity: 0, y: 50, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										transition={{
											duration: 0.6,
											delay: index * 0.1,
											ease: 'easeOut'
										}}
										whileHover={{
											y: -10,
											scale: 1.02,
											transition: { duration: 0.3 }
										}}
										className='group relative'>
										<div
											className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${categoryConfig.glow}`}
										/>

										<div className='relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50'>
											{/* Featured Badge */}
											{event.featured && (
												<div className='absolute top-4 left-4 z-20'>
													<motion.div
														initial={{ scale: 0, rotate: -180 }}
														animate={{ scale: 1, rotate: 0 }}
														transition={{ delay: 0.5, type: 'spring' }}
														className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg'>
														<Star className='w-3 h-3 mr-1 fill-current' />
														Featured
													</motion.div>
												</div>
											)}

											{/* Image Section */}
											<div className='relative h-56 overflow-hidden'>
												<Image
													src={event.image || '/placeholder.svg'}
													alt={event.title}
													fill
													className='object-cover transition-transform duration-500 group-hover:scale-110'
												/>
												<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

												{/* Category Badge */}
												<div className='absolute top-4 right-4'>
													<div
														className={`${categoryConfig.bg} ${categoryConfig.text} px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm flex items-center`}>
														<span className='mr-2'>{categoryConfig.icon}</span>
														{event.category}
													</div>
												</div>

												{/* Quick Stats */}
												<div className='absolute bottom-4 left-4 flex items-center space-x-4'>
													<div className='bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center'>
														<Users className='w-3 h-3 mr-1' />
														{event.attendees}
													</div>
												</div>
											</div>

											{/* Content Section */}
											<div className='p-6 space-y-4'>
												<div className='space-y-2'>
													<h3 className='text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300'>
														{event.title}
													</h3>
													<p className='text-gray-600 text-sm line-clamp-2'>
														{event.description}
													</p>
												</div>

												<div className='space-y-3'>
													<div className='flex items-center text-sm text-gray-600'>
														<Calendar className='w-4 h-4 mr-3 text-blue-500' />
														<span className='font-medium'>{event.date}</span>
													</div>
													<div className='flex items-center text-sm text-gray-600'>
														<Clock className='w-4 h-4 mr-3 text-blue-500' />
														<span>{event.time}</span>
													</div>
													<div className='flex items-center text-sm text-gray-600'>
														<MapPin className='w-4 h-4 mr-3 text-blue-500' />
														<span>{event.location}</span>
													</div>
												</div>

												<motion.div
													className='pt-4'
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}>
													<Button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group'>
														<span>Learn More</span>
														<ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
													</Button>
												</motion.div>
											</div>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Pagination Dots */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8 }}
					className='flex justify-center mt-12 space-x-2'>
					{Array.from({ length: maxIndex + 1 }).map((_, index) => (
						<motion.button
							key={index}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => setCurrentIndex(index)}
							className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
								index === currentIndex
									? 'bg-blue-600 shadow-lg'
									: 'bg-gray-300 hover:bg-gray-400'
							}`}>
							{index === currentIndex && (
								<motion.div
									layoutId='activeIndicator'
									className='absolute inset-0 bg-blue-600 rounded-full'
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}
						</motion.button>
					))}
				</motion.div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.6 }}
					className='text-center mt-16'>
					<Button
						size='lg'
						className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group'>
						<Eye className='w-5 h-5 mr-2' />
						View All Events
						<ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
