'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Calendar,
	MapPin,
	Clock,
	Star,
	Zap,
	Palette,
	Target,
	Lightbulb,
	Globe
} from 'lucide-react';

const categoryIcons = {
	Technology: <Zap className='w-4 h-4' />,
	Cultural: <Palette className='w-4 h-4' />,
	Professional: <Target className='w-4 h-4' />,
	Academic: <Lightbulb className='w-4 h-4' />,
	Networking: <Globe className='w-4 h-4' />
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

// Local interface matching what MobileEventsCarousel passes
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

interface MobileEventCardProps {
	event: Event;
	isActive: boolean;
}

const MobileEventCard = ({ event, isActive }: MobileEventCardProps) => {
	const dateObj = formatDate(event.date);
	const ctaLabel = 'Register Now';
	const ctaLink = event.registrationLink ?? '/';
	const isExternalLink = ctaLink.startsWith('http');

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{
				opacity: isActive ? 1 : 0.7,
				scale: isActive ? 1 : 0.95,
				y: isActive ? 0 : 10
			}}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className='relative w-full max-w-sm mx-auto'>
			{/* Main Card Container */}
			<div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200/50 shadow-xl backdrop-blur-lg'>
				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' />

				{/* Category Badge */}
				<div className='absolute top-4 right-4 z-20'>
					<div className='flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg'>
						{categoryIcons[event.category as keyof typeof categoryIcons] || (
							<Zap className='w-4 h-4' />
						)}
						<span className='text-xs font-medium'>{event.category}</span>
					</div>
				</div>

				{/* Image Section */}
				<div className='relative h-48 overflow-hidden'>
					<Image
						src={event.image}
						alt={event.title}
						fill
						className='object-cover transition-transform duration-300 hover:scale-105'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />

					{/* Date Badge */}
					<div className='absolute bottom-4 left-4'>
						<div className='bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/30'>
							<div className='text-center'>
								<div className='text-xl font-bold text-blue-600'>
									{dateObj.day}
								</div>
								<div className='text-xs font-semibold text-gray-600'>
									{dateObj.month}
								</div>
							</div>
						</div>
					</div>

					{/* Status Badge */}
					<div className='absolute bottom-4 right-4'>
						<div className='flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/30'>
							<Star className='w-3 h-3 text-blue-500' />
							<span className='text-xs font-semibold text-gray-800'>
								Upcoming
							</span>
						</div>
					</div>
				</div>

				{/* Content Section */}
				<div className='p-6 space-y-4'>
					{/* Title */}
					<div>
						<h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight'>
							{event.title}
						</h3>
						<p className='text-sm text-gray-600 leading-relaxed line-clamp-2'>
							{event.description}
						</p>
					</div>

					{/* Event Details */}
					<div className='space-y-2.5'>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<Clock className='w-4 h-4 text-blue-500' />
							<span>{event.time}</span>
						</div>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<MapPin className='w-4 h-4 text-blue-500' />
							<span className='line-clamp-1'>{event.location}</span>
						</div>
					</div>

					{/* Registration Button */}
					<motion.div whileTap={{ scale: 0.95 }}>
						<Button
							asChild
							className='w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0'
							trackingEvent="mobile_event_register_clicked"
							trackingData={{ eventTitle: event.title, eventId: event.id }}>
							<Link
								href={ctaLink}
								target={isExternalLink ? '_blank' : undefined}
								rel={isExternalLink ? 'noopener noreferrer' : undefined}
								className='flex items-center justify-center gap-2'>
								<Calendar className='w-4 h-4' />
								<span>{ctaLabel}</span>
							</Link>
						</Button>
					</motion.div>
				</div>

				{/* Decorative Elements */}
				<div className='absolute top-20 -right-8 w-16 h-16 bg-blue-200/30 rounded-full blur-xl' />
				<div className='absolute bottom-20 -left-8 w-12 h-12 bg-purple-200/30 rounded-full blur-lg' />
			</div>
		</motion.div>
	);
};

export default MobileEventCard;
