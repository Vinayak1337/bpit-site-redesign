'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
	Clock,
	MapPin,
	ArrowRight,
	Calendar,
	Star,
	Zap,
	Globe,
	Target,
	Lightbulb,
	Palette
} from 'lucide-react';

// Local interface matching what EventsSection passes
interface Event {
	id?: string;
	title: string;
	date: string;
	time: string;
	location: string;
	image: string;
	category: string;
	description: string;
	registrationLink?: string;
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
	const cardRef = useRef(null);
	const isInView = useInView(cardRef, { once: true, margin: '-100px' });

	const dateObj = formatDate(event.date);
	const ctaLabel = 'Register Now';
	const ctaLink = event.registrationLink ?? '/';
	const isExternalLink = ctaLink.startsWith('http');

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
				relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white/90 backdrop-blur-xl
				border border-white/40 shadow-lg
				transform-gpu transition-all duration-500
				group-hover:shadow-2xl group-hover:shadow-black/10
			'>
				<div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-30' />

				<div className='relative h-48 lg:h-64 overflow-hidden'>
					<div className='h-full transition-transform duration-300 group-hover:scale-105'>
						<Image
							src={event.image}
							alt={event.title}
							fill
							className='object-cover'
						/>
					</div>

					<div className='absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-800 opacity-30' />

					<div className='absolute bottom-3 left-3 lg:bottom-4 lg:left-4'>
						<div className='bg-white/95 backdrop-blur-md rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-xl border border-white/40'>
							<div className='text-center'>
								<div className='text-lg lg:text-2xl font-bold text-blue-600'>
									{dateObj.day}
								</div>
								<div className='text-xs lg:text-sm font-semibold text-gray-600'>
									{dateObj.month}
								</div>
							</div>
						</div>
					</div>

					<div className='absolute bottom-3 right-3 lg:bottom-4 lg:right-4'>
						<div className='flex items-center gap-1 px-2 lg:px-3 py-1 lg:py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-white/40'>
							<Star className='w-3 h-3 lg:w-4 lg:h-4 text-blue-500' />
							<span className='text-xs lg:text-sm font-semibold text-gray-800'>
								Upcoming
							</span>
						</div>
					</div>
				</div>

				<div className='relative p-4 lg:p-6 space-y-3 lg:space-y-4'>
					<div className='flex items-center gap-2'>
						<div className='p-1.5 lg:p-2 rounded-lg lg:rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'>
							{categoryIcons[event.category as keyof typeof categoryIcons] || (
								<Zap className='w-4 h-4 lg:w-5 lg:h-5' />
							)}
						</div>
						<span className='text-xs lg:text-sm font-bold text-blue-600 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text'>
							{event.category}
						</span>
					</div>

					<div>
						<h3 className='text-base lg:text-xl font-bold text-gray-900 mb-1 line-clamp-2'>
							{event.title}
						</h3>
					</div>

					<p className='text-xs lg:text-sm text-gray-600 leading-relaxed line-clamp-3'>
						{event.description}
					</p>

					<div className='space-y-2'>
						<div className='flex items-center gap-2 text-xs lg:text-sm text-gray-600'>
							<Clock className='w-3 h-3 lg:w-4 lg:h-4' />
							<span>{event.time}</span>
						</div>
						<div className='flex items-center gap-2 text-xs lg:text-sm text-gray-600'>
							<MapPin className='w-3 h-3 lg:w-4 lg:h-4' />
							<span className='line-clamp-1'>{event.location}</span>
						</div>
					</div>

					<div className='pt-3 lg:pt-4'>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								asChild
								className='w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-xl text-white border-0 rounded-xl lg:rounded-2xl py-2 lg:py-3 text-xs lg:text-sm font-bold transition-all duration-300'
								trackingEvent="event_register_clicked"
								trackingData={{
									title: event.title,
									id: event.id,
									link: ctaLink
								}}>
								<Link
									href={ctaLink}
									target={isExternalLink ? '_blank' : undefined}
									rel={isExternalLink ? 'noopener noreferrer' : undefined}>
									<Calendar className='w-3 h-3 lg:w-4 lg:h-4' />
									<span>{ctaLabel}</span>
									<ArrowRight className='w-3 h-3 lg:w-4 lg:h-4' />
								</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default EventCard;
