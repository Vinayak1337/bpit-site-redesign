'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
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

interface Event {
	id: number;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	date: string;
	time: string;
	location: string;
	category: string;
	attendees: number;
	featured: boolean;
	status: string;
	tags: string[];
	organizer: string;
	registrationOpen: boolean;
	price: string;
	highlights: string[];
	rating: number;
	totalRatings: number;
}

interface EventsSectionData {
	events: Event[];
}

interface EventsSectionProps {
	data: EventsSectionData;
}

const categoryIcons = {
	Technology: <Zap className='w-5 h-5' />,
	Cultural: <Palette className='w-5 h-5' />,
	Professional: <Target className='w-5 h-5' />,
	Academic: <Lightbulb className='w-5 h-5' />,
	Networking: <Globe className='w-5 h-5' />
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

const EventCard = ({ event, index }: { event: Event; index: number }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const cardRef = useRef(null);
	const isInView = useInView(cardRef, { once: true, margin: '-100px' });

	const dateObj = formatDate(event.date);

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{
				duration: 0.6,
				delay: index * 0.1,
				ease: 'easeOut'
			}}
			whileHover={{
				y: -10,
				transition: { duration: 0.3 }
			}}
			className='relative group'>
			<div
				className='
				relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl
				border border-white/40 shadow-lg
				transform-gpu transition-all duration-500
				group-hover:shadow-2xl group-hover:shadow-black/10
			'>
				<div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-30' />

				{event.featured && (
					<div className='absolute top-4 left-4 z-20'>
						<div className='flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg'>
							<Star className='w-4 h-4 fill-current' />
							Featured
						</div>
					</div>
				)}

				<div className='absolute top-4 right-4 z-20 flex gap-2'>
					<button
						onClick={() => setIsLiked(!isLiked)}
						aria-label='Like event'
						className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
							isLiked
								? 'bg-blue-500 text-white shadow-lg'
								: 'bg-white/80 text-gray-600 hover:bg-white'
						}`}>
						<Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
					</button>
					<button
						onClick={() => setIsBookmarked(!isBookmarked)}
						aria-label='Bookmark event'
						className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
							isBookmarked
								? 'bg-blue-500 text-white shadow-lg'
								: 'bg-white/80 text-gray-600 hover:bg-white'
						}`}>
						<Bookmark
							className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
						/>
					</button>
				</div>

				<div className='relative h-64 overflow-hidden'>
					<div className='h-full transition-transform duration-300 group-hover:scale-105'>
						<Image
							src={event.image}
							alt={event.title}
							fill
							className='object-cover'
						/>
					</div>

					<div className='absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-800 opacity-30' />

					<div className='absolute bottom-4 left-4'>
						<div className='bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/40'>
							<div className='text-center'>
								<div className='text-2xl font-bold text-blue-600'>
									{dateObj.day}
								</div>
								<div className='text-sm font-semibold text-gray-600'>
									{dateObj.month}
								</div>
							</div>
						</div>
					</div>

					<div className='absolute bottom-4 right-4'>
						<div className='flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-white/40'>
							<Star className='w-4 h-4 text-yellow-500 fill-current' />
							<span className='text-sm font-bold text-gray-800'>
								{event.rating}
							</span>
							<span className='text-xs text-gray-500'>
								({event.totalRatings})
							</span>
						</div>
					</div>
				</div>

				<div className='relative p-6 space-y-4'>
					<div className='flex items-center gap-2'>
						<div className='p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'>
							{categoryIcons[event.category as keyof typeof categoryIcons] || (
								<Zap className='w-5 h-5' />
							)}
						</div>
						<span className='text-sm font-bold text-blue-600 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text'>
							{event.category}
						</span>
					</div>

					<div>
						<h3 className='text-xl font-bold text-gray-900 mb-1 line-clamp-2'>
							{event.title}
						</h3>
						<p className='text-sm font-medium text-gray-600'>
							{event.subtitle}
						</p>
					</div>

					<p className='text-sm text-gray-600 leading-relaxed line-clamp-3'>
						{event.description}
					</p>

					<div className='space-y-2'>
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
					</div>

					<div className='flex flex-wrap gap-2'>
						{event.highlights.map((highlight, i) => (
							<span
								key={i}
								className='px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'>
								{highlight}
							</span>
						))}
					</div>

					<div className='pt-4'>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								className='w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-xl text-white border-0 rounded-2xl py-3 font-bold transition-all duration-300'
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
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default function EventsSection({
	data
}: EventsSectionProps) {
	const sectionRef = useRef(null);
	const controls = useAnimation();

	const { events } = data;

	const animation = useCallback(() => {
		const scrollWidth = events.length * (360 + 24); // CARD_WIDTH + GAP
		controls.start({
			x: -scrollWidth,
			transition: {
				duration: 10, // DURATION
				ease: 'linear',
				repeat: Infinity,
				repeatType: 'loop'
			}
		});
	}, [controls, events.length]);

	useEffect(() => {
		animation();
	}, [animation]);

	return (
		<section
			ref={sectionRef}
			className='relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden'>
			<div className='absolute inset-0'>
				<div className='absolute top-20 left-10 w-[300px] h-[300px] bg-blue-300/10 rounded-full mix-blend-multiply filter blur-2xl' />
				<div className='absolute top-40 right-10 w-[250px] h-[250px] bg-red-300/10 rounded-full mix-blend-multiply filter blur-2xl' />
			</div>

			<div className='relative z-10 container mx-auto px-4'>
				<div className='max-w-7xl mx-auto'>
					<div className='flex items-center justify-between mb-8'>
						<div className='flex items-center gap-3'>
							<div className='p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg'>
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
							className='group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'
							whileHover={{ scale: 1.05, x: 5 }}
							whileTap={{ scale: 0.95 }}>
							<span className='font-semibold'>View All Events</span>
							<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
						</motion.button>
					</div>

					<div className='relative overflow-hidden rounded-2xl'>
						<div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-blue-50/80 to-transparent z-10 pointer-events-none' />
						<div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-indigo-50 via-blue-50/80 to-transparent z-10 pointer-events-none' />

						<motion.div
							className='flex gap-6'
							animate={controls}
							style={{
								width: `${(360 + 24) * events.length * 2}px`
							}}>
							{events.map((event, index) => (
								<motion.div
									key={`${event.id}-${index}`}
									className='w-[360px] flex-shrink-0'>
									<EventCard event={event} index={index % events.length} />
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
