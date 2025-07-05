'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	Clock,
	MapPin,
	Users,
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	Sparkles,
	ExternalLink,
	Heart,
	Share2,
	Play,
	Pause
} from 'lucide-react';

// Sample events data
const events = [
	{
		id: 1,
		title: 'AI & Machine Learning Summit 2024',
		subtitle: 'Exploring the Future of Artificial Intelligence',
		description:
			'Join industry leaders and researchers as they discuss the latest breakthroughs in AI and machine learning technologies.',
		image: '/events/img1.png',
		date: '2024-03-15',
		time: '9:00 AM - 6:00 PM',
		location: 'Main Auditorium, BPIT Campus',
		category: 'Technology',
		attendees: 500,
		featured: true,
		tags: ['AI', 'Machine Learning', 'Technology', 'Research']
	},
	{
		id: 2,
		title: 'Annual Cultural Festival',
		subtitle: 'Celebrating Diversity and Creativity',
		description:
			'Experience the rich cultural heritage through music, dance, art, and performances from students across all departments.',
		image: '/events/img2.png',
		date: '2024-03-22',
		time: '6:00 PM - 11:00 PM',
		location: 'Open Ground, BPIT Campus',
		category: 'Cultural',
		attendees: 1200,
		featured: false,
		tags: ['Cultural', 'Music', 'Dance', 'Art']
	},
	{
		id: 3,
		title: 'Startup Pitch Competition',
		subtitle: 'Where Innovation Meets Investment',
		description:
			'Young entrepreneurs showcase their innovative ideas to industry experts and potential investors.',
		image: '/events/img3.png',
		date: '2024-04-05',
		time: '10:00 AM - 4:00 PM',
		location: 'Innovation Hub, BPIT',
		category: 'Business',
		attendees: 300,
		featured: true,
		tags: ['Startup', 'Innovation', 'Business', 'Competition']
	},
	{
		id: 4,
		title: 'Cybersecurity Workshop',
		subtitle: 'Protecting Digital Assets',
		description:
			'Learn essential cybersecurity skills and best practices from industry professionals.',
		image: '/events/img1.png',
		date: '2024-04-12',
		time: '2:00 PM - 5:00 PM',
		location: 'Computer Lab 3, BPIT',
		category: 'Technology',
		attendees: 150,
		featured: false,
		tags: ['Cybersecurity', 'Workshop', 'Technology']
	},
	{
		id: 5,
		title: 'Green Energy Symposium',
		subtitle: 'Sustainable Future Technologies',
		description:
			'Discover renewable energy solutions and sustainable technologies for a greener tomorrow.',
		image: '/events/img2.png',
		date: '2024-04-18',
		time: '9:00 AM - 3:00 PM',
		location: 'Conference Hall, BPIT',
		category: 'Environment',
		attendees: 250,
		featured: false,
		tags: ['Environment', 'Energy', 'Sustainability']
	},
	{
		id: 6,
		title: 'Alumni Networking Night',
		subtitle: 'Connect, Share, Inspire',
		description:
			'An evening to reconnect with fellow alumni and share experiences and opportunities.',
		image: '/events/img3.png',
		date: '2024-04-25',
		time: '7:00 PM - 10:00 PM',
		location: 'Alumni Hall, BPIT',
		category: 'Networking',
		attendees: 400,
		featured: true,
		tags: ['Alumni', 'Networking', 'Career']
	}
];

// Category gradients
const categoryGradients = {
	Technology: 'from-blue-500 to-cyan-500',
	Cultural: 'from-purple-500 to-pink-500',
	Business: 'from-green-500 to-emerald-500',
	Environment: 'from-green-400 to-teal-500',
	Networking: 'from-orange-500 to-red-500'
};

// Format date utility
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return {
		day: date.getDate().toString().padStart(2, '0'),
		month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
		year: date.getFullYear().toString()
	};
};

// Event Card Component
const EventCard = ({
	event,
	index
}: {
	event: (typeof events)[0];
	index: number;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const dateObj = formatDate(event.date);
	const gradient =
		categoryGradients[event.category as keyof typeof categoryGradients];

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ y: -10 }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			className='group h-full'>
			<div className='relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden h-full hover:shadow-2xl transition-all duration-500'>
				{/* Featured Badge */}
				{event.featured && (
					<div className='absolute top-4 left-4 z-20'>
						<div className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg'>
							✨ Featured
						</div>
					</div>
				)}

				{/* Action Buttons */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
					transition={{ duration: 0.3 }}
					className='absolute top-4 right-4 z-20 flex flex-col gap-2'>
					<button
						onClick={() => setIsLiked(!isLiked)}
						title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
						aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
						className={`p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 ${
							isLiked
								? 'bg-red-500 text-white'
								: 'bg-white/90 text-gray-700 hover:bg-white'
						}`}>
						<Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
					</button>
					<button
						title='Share event'
						aria-label='Share event'
						className='p-2 rounded-full bg-white/90 backdrop-blur-md border border-white/30 text-gray-700 hover:bg-white transition-all duration-300'>
						<Share2 className='w-4 h-4' />
					</button>
				</motion.div>

				{/* Image Section */}
				<div className='relative h-64 overflow-hidden'>
					<motion.div
						animate={{ scale: isHovered ? 1.1 : 1 }}
						transition={{ duration: 0.7 }}
						className='h-full'>
						<Image
							src={event.image}
							alt={event.title}
							fill
							className='object-cover'
						/>
					</motion.div>

					{/* Date Badge */}
					<div className='absolute bottom-4 left-4'>
						<div className='bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/30'>
							<div className='text-center'>
								<div className='text-2xl font-bold text-gray-800'>
									{dateObj.day}
								</div>
								<div className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>
									{dateObj.month}
								</div>
								<div className='text-xs text-gray-500'>{dateObj.year}</div>
							</div>
						</div>
					</div>

					{/* Category Badge */}
					<div className='absolute bottom-4 right-4'>
						<div
							className={`bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
							{event.category}
						</div>
					</div>
				</div>

				{/* Content Section */}
				<div className='p-6 space-y-4'>
					{/* Title and Subtitle */}
					<div className='space-y-2'>
						<h3 className='text-xl font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-300'>
							{event.title}
						</h3>
						<p className='text-sm font-medium text-gray-600 leading-relaxed'>
							{event.subtitle}
						</p>
					</div>

					{/* Description */}
					<p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
						{event.description}
					</p>

					{/* Tags */}
					<div className='flex flex-wrap gap-2'>
						{event.tags.map((tag, tagIndex) => (
							<span
								key={tagIndex}
								className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-200'>
								{tag}
							</span>
						))}
					</div>

					{/* Event Details */}
					<div className='space-y-3 border-t pt-4'>
						<div className='flex items-center gap-3 text-sm text-gray-600'>
							<Clock className='w-4 h-4' />
							<span>{event.time}</span>
						</div>
						<div className='flex items-center gap-3 text-sm text-gray-600'>
							<MapPin className='w-4 h-4' />
							<span>{event.location}</span>
						</div>
						<div className='flex items-center gap-3 text-sm text-gray-600'>
							<Users className='w-4 h-4' />
							<span>{event.attendees}+ Expected Attendees</span>
						</div>
					</div>

					{/* Action Button */}
					<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
						<Button
							className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white border-0 rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl`}>
							Register Now
							<ArrowRight className='w-4 h-4 ml-2' />
						</Button>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

// Main Events Section Component
export default function ModernEventsSection() {
	const [currentPage, setCurrentPage] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [cardsPerPage, setCardsPerPage] = useState(3);

	// Responsive cards per page
	useEffect(() => {
		const updateCardsPerPage = () => {
			if (window.innerWidth < 768) {
				setCardsPerPage(1);
			} else if (window.innerWidth < 1200) {
				setCardsPerPage(2);
			} else {
				setCardsPerPage(3);
			}
		};

		updateCardsPerPage();
		window.addEventListener('resize', updateCardsPerPage);
		return () => window.removeEventListener('resize', updateCardsPerPage);
	}, []);

	// Calculate total pages
	const totalPages = Math.ceil(events.length / cardsPerPage);

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying || totalPages <= 1) return;

		const interval = setInterval(() => {
			setCurrentPage(prev => (prev >= totalPages - 1 ? 0 : prev + 1));
		}, 4000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, totalPages]);

	// Navigation functions
	const goToNextPage = () => {
		setCurrentPage(prev => (prev >= totalPages - 1 ? 0 : prev + 1));
	};

	const goToPrevPage = () => {
		setCurrentPage(prev => (prev <= 0 ? totalPages - 1 : prev - 1));
	};

	const goToPage = (pageIndex: number) => {
		setCurrentPage(pageIndex);
	};

	// Get events for current page
	const getCurrentPageEvents = () => {
		const startIndex = currentPage * cardsPerPage;
		const endIndex = Math.min(startIndex + cardsPerPage, events.length);
		return events.slice(startIndex, endIndex);
	};

	return (
		<section className='relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden'>
			{/* Background Decorations */}
			<div className='absolute inset-0'>
				<div className='absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob' />
				<div className='absolute top-40 right-10 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' />
				<div className='absolute -bottom-8 left-20 w-96 h-96 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000' />
			</div>

			{/* Floating Elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full'
						style={{
							top: `${20 + i * 15}%`,
							left: `${10 + i * 10}%`
						}}
						animate={{
							y: [0, -30, 0],
							opacity: [0.3, 1, 0.3],
							scale: [1, 1.2, 1]
						}}
						transition={{
							duration: 3 + i * 0.5,
							repeat: Infinity,
							delay: i * 0.3
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
						<div className='inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full border border-white/30 shadow-lg'>
							<Sparkles className='w-5 h-5 text-purple-600' />
							<span className='text-purple-700 font-semibold'>
								Upcoming Events
							</span>
							<Sparkles className='w-5 h-5 text-purple-600' />
						</div>

						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight'>
							Discover Amazing
							<br />
							<span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
								Events & Experiences
							</span>
						</h2>

						<p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
							Join us for extraordinary events that inspire, educate, and
							connect our vibrant community.
						</p>

						<div className='flex justify-center'>
							<div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full' />
						</div>
					</motion.div>

					{/* Navigation Controls */}
					{totalPages > 1 && (
						<div className='flex justify-center items-center gap-4 mb-8'>
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={goToPrevPage}
								className='p-3 bg-white/80 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'>
								<ChevronLeft className='w-6 h-6 text-gray-700' />
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsAutoPlaying(!isAutoPlaying)}
								className={`flex items-center gap-2 px-4 py-2 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium ${
									isAutoPlaying
										? 'bg-blue-500 text-white'
										: 'bg-white/80 text-gray-700'
								}`}>
								{isAutoPlaying ? (
									<Pause className='w-4 h-4' />
								) : (
									<Play className='w-4 h-4' />
								)}
								{isAutoPlaying ? 'Pause' : 'Play'}
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={goToNextPage}
								className='p-3 bg-white/80 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'>
								<ChevronRight className='w-6 h-6 text-gray-700' />
							</motion.button>
						</div>
					)}

					{/* Events Display */}
					<div className='relative overflow-hidden rounded-3xl'>
						<motion.div
							key={currentPage}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{
								type: 'spring',
								stiffness: 300,
								damping: 30
							}}
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{getCurrentPageEvents().map((event, index) => (
								<EventCard key={event.id} event={event} index={index} />
							))}
						</motion.div>
					</div>

					{/* Pagination Dots */}
					{totalPages > 1 && (
						<div className='flex justify-center gap-2 mt-12'>
							{Array.from({ length: totalPages }).map((_, index) => (
								<motion.button
									key={index}
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.9 }}
									onClick={() => goToPage(index)}
									className={`w-3 h-3 rounded-full transition-all duration-300 ${
										index === currentPage
											? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
											: 'bg-gray-300 hover:bg-gray-400'
									}`}
								/>
							))}
						</div>
					)}

					{/* View All Button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.5 }}
						className='text-center mt-16'>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
								View All Events
								<ExternalLink className='w-5 h-5 ml-2' />
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
