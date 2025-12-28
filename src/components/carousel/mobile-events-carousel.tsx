'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileEventCard from './mobile-event-card';

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

interface MobileEventsCarouselProps {
	events: Event[];
}

const FloatingBubble = ({
	delay = 0,
	size = 'w-4 h-4',
	color = 'bg-blue-300/30',
	position
}: {
	delay?: number;
	size?: string;
	color?: string;
	position: { top: string; left: string };
}) => (
	<motion.div
		className={`absolute ${size} ${color} rounded-full blur-sm`}
		style={{ top: position.top, left: position.left }}
		animate={{
			y: [-10, -30, -10],
			x: [-5, 5, -5],
			opacity: [0.3, 0.8, 0.3],
			scale: [1, 1.2, 1]
		}}
		transition={{
			duration: 4 + delay,
			repeat: Infinity,
			ease: 'easeInOut',
			delay
		}}
	/>
);

const MobileEventsCarousel = ({ events }: MobileEventsCarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const resetTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		if (!isHovered) {
			timerRef.current = setInterval(() => {
				setDirection(1);
				setCurrentIndex(prev => (prev + 1) % events.length);
			}, 5000);
		}
	}, [isHovered, events.length]);

	useEffect(() => {
		resetTimer();
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [resetTimer]);

	const goToNext = () => {
		setDirection(1);
		setCurrentIndex(prev => (prev + 1) % events.length);
		resetTimer();
	};

	const goToPrev = () => {
		setDirection(-1);
		setCurrentIndex(prev => (prev - 1 + events.length) % events.length);
		resetTimer();
	};

	const goToSlide = (index: number) => {
		setDirection(index > currentIndex ? 1 : -1);
		setCurrentIndex(index);
		resetTimer();
	};

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? '100%' : '-100%',
			opacity: 0,
			scale: 0.9
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			scale: 1
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? '100%' : '-100%',
			opacity: 0,
			scale: 0.9
		})
	};

	const bubbles = [
		{
			delay: 0,
			size: 'w-6 h-6',
			color: 'bg-blue-400/20',
			position: { top: '15%', left: '10%' }
		},
		{
			delay: 1,
			size: 'w-4 h-4',
			color: 'bg-purple-400/25',
			position: { top: '25%', left: '85%' }
		},
		{
			delay: 2,
			size: 'w-5 h-5',
			color: 'bg-pink-400/20',
			position: { top: '45%', left: '8%' }
		},
		{
			delay: 1.5,
			size: 'w-3 h-3',
			color: 'bg-indigo-400/30',
			position: { top: '60%', left: '90%' }
		},
		{
			delay: 0.5,
			size: 'w-4 h-4',
			color: 'bg-cyan-400/25',
			position: { top: '80%', left: '15%' }
		},
		{
			delay: 2.5,
			size: 'w-5 h-5',
			color: 'bg-violet-400/20',
			position: { top: '35%', left: '50%' }
		},
		{
			delay: 3,
			size: 'w-3 h-3',
			color: 'bg-rose-400/25',
			position: { top: '70%', left: '70%' }
		},
		{
			delay: 1,
			size: 'w-6 h-6',
			color: 'bg-teal-400/15',
			position: { top: '10%', left: '60%' }
		}
	];

	return (
		<section className='relative py-16 pb-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden'>
			{/* Background Decorative Elements */}
			<div className='absolute inset-0'>
				<div className='absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse' />
				<div className='absolute top-20 right-10 w-24 h-24 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-1000' />
				<div className='absolute bottom-20 left-20 w-28 h-28 bg-pink-200/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000' />
			</div>

			{/* Floating Bubbles */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				{bubbles.map((bubble, index) => (
					<FloatingBubble
						key={index}
						delay={bubble.delay}
						size={bubble.size}
						color={bubble.color}
						position={bubble.position}
					/>
				))}
			</div>

			<div className='relative z-10 container mx-auto px-4'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-8'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<div className='p-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg'>
							<Calendar className='w-5 h-5' />
						</div>
						<h3 className='text-2xl font-bold text-gray-800'>
							Official Events
						</h3>
					</div>
					<p className='text-sm text-gray-600'>
						Swipe or wait to explore campus events
					</p>
				</motion.div>

				{/* Carousel Container */}
				<div
					className='relative h-[580px] max-w-sm mx-auto'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					{/* Navigation Arrows - Hidden on mobile and tablet */}
					<Button
						variant="ghost"
						onClick={goToPrev}
						aria-label='Previous event'
						className='absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl hidden lg:block'
						trackingEvent="events_carousel_prev">
						<ChevronLeft className='w-5 h-5' />
					</Button>
					<Button
						variant="ghost"
						onClick={goToNext}
						aria-label='Next event'
						className='absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl hidden lg:block'
						trackingEvent="events_carousel_next">
						<ChevronRight className='w-5 h-5' />
					</Button>

					{/* Card Slider */}
					<div className='relative h-full overflow-hidden'>
						<AnimatePresence mode='wait' custom={direction}>
							<motion.div
								key={currentIndex}
								custom={direction}
								variants={slideVariants}
								initial='enter'
								animate='center'
								exit='exit'
								transition={{
									x: { type: 'spring', stiffness: 300, damping: 30 },
									opacity: { duration: 0.3 },
									scale: { duration: 0.4 }
								}}
								className='absolute inset-0'>
								<MobileEventCard event={events[currentIndex]} isActive={true} />
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Dots Indicator */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className='flex justify-center space-x-2 mt-6'>
					{events.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`relative transition-all duration-500 ${
								index === currentIndex
									? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg shadow-blue-500/30'
									: 'w-2 h-2 bg-blue-200 hover:bg-blue-300 rounded-full hover:scale-125'
							}`}>
							{index === currentIndex && (
								<motion.div
									className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse opacity-50'
									layoutId='activeIndicator'
								/>
							)}
						</button>
					))}
				</motion.div>

				{/* Progress Bar */}
				<div className='max-w-sm mx-auto mt-4'>
					<div className='w-full h-1 bg-blue-100 rounded-full overflow-hidden'>
						<motion.div
							className='h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full'
							initial={{ width: '0%' }}
							animate={{ width: '100%' }}
							key={currentIndex}
							transition={{ duration: 5, ease: 'linear' }}
						/>
					</div>
				</div>
			</div>

			<style jsx>{`
				.animation-delay-1000 {
					animation-delay: 1s;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
			`}</style>
		</section>
	);
};

export default MobileEventsCarousel;
