'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import {
	Play,
	Pause,
	Volume2,
	Star,
	Quote,
	ChevronLeft,
	ChevronRight,
	Award,
	ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialItem {
	id: number;
	name: string;
	batch: string;
	company: string;
	position: string;
	image: string;
	video: string;
	testimonial: string;
	rating: number;
	achievement: string;
	tags: string[];
}

interface TestimonialData {
	title: string;
	subtitle: string;
	testimonials: TestimonialItem[];
}

interface TestimonialProps {
	data: TestimonialData;
}

export default function Testimonial({ data }: TestimonialProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playingIndex, setPlayingIndex] = useState<number | null>(null);
	const [direction, setDirection] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const { title, subtitle, testimonials } = data;

	const resetTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		timerRef.current = setInterval(() => {
			if (!isPlaying && !isHovered) {
				setDirection(1);
				setCurrentIndex(prev => (prev + 1) % testimonials.length);
			}
		}, 5000);
	}, [isPlaying, isHovered, testimonials.length]);

	useEffect(() => {
		resetTimer();
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [isPlaying, isHovered, testimonials.length, resetTimer]);

	const nextTestimonial = () => {
		setDirection(1);
		setCurrentIndex(prev => (prev + 1) % testimonials.length);
		resetTimer(); // Reset timer when manually navigating
	};

	const prevTestimonial = () => {
		setDirection(-1);
		setCurrentIndex(
			prev => (prev - 1 + testimonials.length) % testimonials.length
		);
		resetTimer(); // Reset timer when manually navigating
	};

	const goToTestimonial = (index: number) => {
		setDirection(index > currentIndex ? 1 : -1);
		setCurrentIndex(index);
		resetTimer(); // Reset timer when manually navigating
	};

	const toggleVideo = (index: number) => {
		if (playingIndex === index) {
			setIsPlaying(false);
			setPlayingIndex(null);
		} else {
			setIsPlaying(true);
			setPlayingIndex(index);
		}
	};

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
			scale: 0.8,
			rotateY: direction > 0 ? 45 : -45
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			scale: 1,
			rotateY: 0
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
			scale: 0.8,
			rotateY: direction < 0 ? 45 : -45
		})
	};

	// Floating particles animation
	const FloatingParticle = ({ delay = 0 }) => (
		<motion.div
			className='absolute w-1 h-1 bg-blue-400/30 rounded-full'
			animate={{
				y: [-20, -100, -20],
				x: [-10, 10, -10],
				opacity: [0, 1, 0]
			}}
			transition={{
				duration: 6,
				delay,
				repeat: Infinity,
				ease: 'easeInOut'
			}}
		/>
	);

	return (
		<section
			ref={sectionRef}
			className='relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden'
			style={{ perspective: '1000px' }}>
			{/* Background Elements */}
			<div className='absolute inset-0'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse' />
				<div className='absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000' />
				<div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000' />
			</div>

			{/* Floating Particles */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				{[
					{ left: 10, top: 20 },
					{ left: 85, top: 15 },
					{ left: 25, top: 60 },
					{ left: 70, top: 80 },
					{ left: 45, top: 25 },
					{ left: 15, top: 75 },
					{ left: 90, top: 45 },
					{ left: 35, top: 85 },
					{ left: 60, top: 10 },
					{ left: 5, top: 50 },
					{ left: 75, top: 35 },
					{ left: 30, top: 70 },
					{ left: 95, top: 60 },
					{ left: 20, top: 40 },
					{ left: 80, top: 90 },
					{ left: 50, top: 5 },
					{ left: 65, top: 55 },
					{ left: 40, top: 30 },
					{ left: 55, top: 75 },
					{ left: 25, top: 45 }
				].map((position, i) => (
					<div
						key={i}
						className='absolute'
						style={{
							left: `${position.left}%`,
							top: `${position.top}%`
						}}>
						<FloatingParticle delay={i * 0.3} />
					</div>
				))}
			</div>

			<div className='relative z-10 container mx-auto px-4 py-20'>
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'>
					<motion.div
						initial={{ scale: 0 }}
						animate={isInView ? { scale: 1 } : {}}
						transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
						className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-200 text-blue-800 rounded-full font-semibold shadow-lg mb-8'>
						<Quote className='w-5 h-5 mr-3' />
						<span>Student Success Stories</span>
						<Star className='w-5 h-5 ml-3 text-yellow-500 fill-current' />
					</motion.div>

					<h2 className='text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent leading-tight mb-6'>
						{title}
					</h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.5, duration: 0.6 }}
						className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
						{subtitle}
					</motion.p>
				</motion.div>

				{/* Main Testimonial Display */}
				<div className='relative max-w-6xl mx-auto mb-24 lg:mb-16 min-h-[600px]'>
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
								opacity: { duration: 0.4 },
								scale: { duration: 0.4 },
								rotateY: { duration: 0.6 }
							}}
							className='absolute inset-0'>
							<div
								className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden group hover:shadow-3xl transition-all duration-700'
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}>
								<div className='flex flex-col md:grid md:grid-cols-2 min-h-full'>
									{/* Left Side - Image/Video */}
									<div className='relative overflow-hidden h-[250px] sm:h-[300px] md:h-full md:min-h-[600px]'>
										<Image
											src={testimonials[currentIndex].image}
											alt={testimonials[currentIndex].name}
											fill
											className='object-cover object-top lg:object-center transition-transform duration-700 group-hover:scale-110'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

										{/* Video Play Button */}
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => toggleVideo(currentIndex)}
											className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:shadow-blue-500/30 transition-all duration-300'>
											{playingIndex === currentIndex && isPlaying ? (
												<Pause className='w-8 h-8' fill='currentColor' />
											) : (
												<Play className='w-8 h-8 ml-1' fill='currentColor' />
											)}
										</motion.button>

										{/* Company Badge */}
										<div className='absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30'>
											<span className='text-sm font-semibold text-gray-800'>
												{testimonials[currentIndex].company}
											</span>
										</div>

										{/* Achievement Badge */}
										<div className='absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg'>
											<Award className='w-4 h-4 inline mr-2' />
											Success Story
										</div>
									</div>

									{/* Right Side - Content */}
									<div className='p-6 sm:p-8 md:p-12 flex flex-col justify-center flex-1'>
										<motion.div
											initial={{ opacity: 0, x: 50 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.3, duration: 0.6 }}>
											{/* Star Rating */}
											<div className='flex items-center mb-4 sm:mb-6'>
												{[...Array(testimonials[currentIndex].rating)].map(
													(_, i) => (
														<motion.div
															key={i}
															initial={{ scale: 0, rotate: 180 }}
															animate={{ scale: 1, rotate: 0 }}
															transition={{
																delay: 0.5 + i * 0.1,
																type: 'spring',
																stiffness: 200
															}}>
															<Star className='w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-current mr-1' />
														</motion.div>
													)
												)}
											</div>

											{/* Quote */}
											<Quote className='w-8 h-8 sm:w-12 sm:h-12 text-blue-200 mb-4 sm:mb-6 opacity-50' />

											<blockquote className='text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 italic'>
												&ldquo;{testimonials[currentIndex].testimonial}&rdquo;
											</blockquote>

											{/* Student Info */}
											<div className='space-y-2 mb-4 md:mb-6'>
												<h3 className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent'>
													{testimonials[currentIndex].name}
												</h3>
												<p className='text-blue-600 font-semibold text-sm sm:text-base'>
													{testimonials[currentIndex].position}
												</p>
												<p className='text-gray-600 text-sm sm:text-base'>
													{testimonials[currentIndex].batch} •{' '}
													{testimonials[currentIndex].achievement}
												</p>
											</div>

											{/* Tags */}
											<div className='flex flex-wrap gap-1 sm:gap-2 mb-4 md:mb-6'>
												{testimonials[currentIndex].tags.map((tag, index) => (
													<span
														key={index}
														className='px-2 py-1 sm:px-3 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium'>
														{tag}
													</span>
												))}
											</div>

											{/* Watch Full Story Button */}
											<Button
												className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-sm sm:text-base'
												onClick={() => toggleVideo(currentIndex)}>
												<Volume2 className='w-3 h-3 sm:w-4 sm:h-4 mr-2' />
												<span className='hidden sm:inline'>
													Watch Full Story
												</span>
												<span className='sm:hidden'>Watch Story</span>
												<ArrowRight className='ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform' />
											</Button>
										</motion.div>
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation Arrows - Hidden on mobile and tablet */}
					<button
						onClick={prevTestimonial}
						aria-label='Previous testimonial'
						className='hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl group'>
						<ChevronLeft className='w-6 h-6 group-hover:-translate-x-1 transition-transform' />
					</button>
					<button
						onClick={nextTestimonial}
						aria-label='Next testimonial'
						className='hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl group'>
						<ChevronRight className='w-6 h-6 group-hover:translate-x-1 transition-transform' />
					</button>
				</div>

				{/* Thumbnail Navigation */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 1, duration: 0.8 }}
					className='flex justify-center space-x-4 mb-8 overflow-x-auto py-4'>
					{testimonials.map((testimonial, index) => (
						<motion.button
							key={testimonial.id}
							onClick={() => goToTestimonial(index)}
							className={`flex-shrink-0 relative w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
								index === currentIndex
									? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/30'
									: 'border-white/50 hover:border-blue-300 hover:scale-105'
							}`}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}>
							<Image
								src={testimonial.image}
								alt={testimonial.name}
								fill
								className='object-cover'
							/>
							<div
								className={`absolute inset-0 bg-blue-600/20 transition-opacity duration-300 ${
									index === currentIndex ? 'opacity-0' : 'opacity-40'
								}`}
							/>
						</motion.button>
					))}
				</motion.div>

				{/* Progress Indicators */}
				<div className='flex justify-center space-x-3'>
					{testimonials.map((_, index) => (
						<button
							key={index}
							onClick={() => goToTestimonial(index)}
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
				</div>
			</div>

			<style jsx>{`
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</section>
	);
}
