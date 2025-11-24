'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
	ChevronLeft,
	ChevronRight,
	ArrowRight,
	Users,
	BookOpen,
	Trophy,
	Building,
	Award
} from 'lucide-react';

interface Slide {
	title: string;
	subtitle: string;
	description: string | React.ReactNode;
	image: string;
	icon: string | React.ReactNode;
	stats: string;
	cta?: {
		label: string;
		href?: string;
		isEnquiry?: boolean;
	};
	secondary_cta?: {
		label: string;
		href?: string;
		isEnquiry?: boolean;
	};
}

interface Hero2Data {
	slides: Slide[];
}

interface Hero2Props {
	data: Hero2Data;
}

const getIcon = (iconName: string) => {
	const icons: { [key: string]: React.ReactNode } = {
		BookOpen: <BookOpen className='w-6 h-6 sm:w-8 sm:h-8' />,
		Users: <Users className='w-6 h-6 sm:w-8 sm:h-8' />,
		Trophy: <Trophy className='w-6 h-6 sm:w-8 sm:h-8' />,
		Building: <Building className='w-6 h-6 sm:w-8 sm:h-8' />,
		Award: <Award className='w-6 h-6 sm:w-8 sm:h-8' />
	};
	return icons[iconName] || <BookOpen className='w-6 h-6 sm:w-8 sm:h-8' />;
};

const Hero2 = ({ data }: Hero2Props) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const slides = data.slides;

	const resetTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		if (!isPaused) {
			timerRef.current = setInterval(() => {
				setCurrentSlide((prev: number) => (prev + 1) % slides.length);
			}, 5000);
		}
	}, [slides.length, isPaused]);

	useEffect(() => {
		resetTimer();
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [resetTimer]);

	const handleMouseEnter = () => {
		setIsPaused(true);
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
	};

	const handleMouseLeave = () => {
		setIsPaused(false);
	};

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % slides.length);
		resetTimer(); // Reset timer when manually navigating
	};

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
		resetTimer(); // Reset timer when manually navigating
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
		resetTimer(); // Reset timer when manually navigating
	};

	return (
		<section className='relative h-[75vh] sm:h-[85vh] lg:h-screen bg-gray-900 overflow-hidden'>
			{/* Background Image Carousel */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentSlide}
					initial={{ opacity: 0, scale: 1.1 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.7 }}
					className='absolute inset-0'>
					<div
						className='w-full h-full bg-cover bg-center bg-no-repeat'
						style={{
							backgroundImage: `url(${slides[currentSlide].image})`
						}}
					/>
					{/* Blue overlay with opacity */}
					<div className='absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-blue-900/70' />
					<div className='absolute inset-0 bg-black/30' />
				</motion.div>
			</AnimatePresence>

			{/* Content */}
			<div className='relative z-10 h-full flex items-center'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-4xl mx-auto text-center text-white'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -50 }}
								transition={{ duration: 0.6 }}
								className='space-y-3 sm:space-y-4 lg:space-y-6'>
								{/* Icon */}
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className='flex justify-center mb-4 sm:mb-6'>
									<div className='p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20'>
										{typeof slides[currentSlide].icon === 'string' 
											? getIcon(slides[currentSlide].icon as string)
											: slides[currentSlide].icon
										}
									</div>
								</motion.div>

								{/* Stats Badge */}
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.3 }}
									className='inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-blue-400/30'>
									{slides[currentSlide].stats}
								</motion.div>

								{/* Title */}
								<motion.h2
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight'>
									{slides[currentSlide].title}
								</motion.h2>

								{/* Subtitle */}
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
									className='text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 font-medium mb-3 sm:mb-4 lg:mb-6'>
									{slides[currentSlide].subtitle}
								</motion.p>

								{/* Description */}
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6 }}
									className='text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-0'>
									{slides[currentSlide].description}
								</motion.p>

								{/* CTA Buttons */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.7 }}
									className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
									{slides[currentSlide].cta && (
										<Button
											size='lg'
											className='bg-white text-blue-900 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-sm sm:text-base'
											onMouseEnter={handleMouseEnter}
											onMouseLeave={handleMouseLeave}
											trackingEvent="hero_primary_cta_click"
											trackingData={{
												label: slides[currentSlide].cta.label,
												href: slides[currentSlide].cta.href,
												slide_index: currentSlide
											}}
											onClick={() => {
												if (slides[currentSlide].cta?.isEnquiry) {
													const event = new CustomEvent('openEnquiry');
													window.dispatchEvent(event);
												} else if (slides[currentSlide].cta?.href) {
													window.location.href = slides[currentSlide].cta.href as string;
												}
											}}>
											{slides[currentSlide].cta.label}
											<ArrowRight className='ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform' />
										</Button>
									)}
									{slides[currentSlide].secondary_cta && (
										<Button
											variant='outline'
											size='lg'
											className='border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-900 hover:border-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base shadow-lg'
											onMouseEnter={handleMouseEnter}
											onMouseLeave={handleMouseLeave}
											trackingEvent="hero_secondary_cta_click"
											trackingData={{
												label: slides[currentSlide].secondary_cta.label,
												href: slides[currentSlide].secondary_cta.href,
												slide_index: currentSlide
											}}
											onClick={() => {
												if (slides[currentSlide].secondary_cta?.isEnquiry) {
													const event = new CustomEvent('openEnquiry');
													window.dispatchEvent(event);
												} else if (slides[currentSlide].secondary_cta?.href) {
													window.location.href = slides[currentSlide].secondary_cta.href as string;
												}
											}}>
											{slides[currentSlide].secondary_cta.label}
										</Button>
									)}
								</motion.div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>

			{/* Navigation Arrows */}
			<Button
				variant="ghost"
				size="icon"
				onClick={prevSlide}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				aria-label='Previous slide'
				className='absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group h-auto w-auto'>
				<ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform' />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={nextSlide}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				aria-label='Next slide'
				className='absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group h-auto w-auto'>
				<ChevronRight className='w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform' />
			</Button>

			{/* Slide Indicators */}
			<div className='absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3'>
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						aria-label={`Go to slide ${index + 1}`}
						className={`h-2 sm:h-3 transition-all duration-300 ${
							index === currentSlide
								? 'w-6 sm:w-8 bg-white rounded-lg'
								: 'w-2 sm:w-3 bg-white/50 hover:bg-white/75 rounded-full'
						}`}
					/>
				))}
			</div>

			{/* Progress Bar */}
			<div className='absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/20'>
				<motion.div
					className='h-full bg-white'
					initial={{ width: '0%' }}
					animate={{ width: isPaused ? '0%' : '100%' }}
					transition={{
						duration: isPaused ? 0 : 5,
						repeat: isPaused ? 0 : Infinity,
						ease: 'linear'
					}}
					key={`${currentSlide}-${isPaused}`}
				/>
			</div>

			{/* Floating Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<motion.div
					className='absolute top-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full'
					animate={{
						y: [0, -20, 0],
						opacity: [0.3, 1, 0.3]
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						delay: 0
					}}
				/>
				<motion.div
					className='absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300/50 rounded-full'
					animate={{
						y: [0, -15, 0],
						opacity: [0.5, 1, 0.5]
					}}
					transition={{
						duration: 2.5,
						repeat: Infinity,
						delay: 1
					}}
				/>
				<motion.div
					className='absolute bottom-1/3 left-1/5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full'
					animate={{
						y: [0, -25, 0],
						opacity: [0.4, 1, 0.4]
					}}
					transition={{
						duration: 3.5,
						repeat: Infinity,
						delay: 2
					}}
				/>
			</div>
		</section>
	);
};

export default Hero2;
