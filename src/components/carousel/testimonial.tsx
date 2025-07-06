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

const Testimonial = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playingIndex, setPlayingIndex] = useState<number | null>(null);
	const [direction, setDirection] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const testimonials = [
		{
			id: 1,
			name: 'Arjun Sharma',
			batch: 'B.Tech CSE 2024',
			company: 'Microsoft',
			position: 'Software Engineer',
			image:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			video:
				'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
			testimonial:
				"BPIT transformed my career. The faculty's guidance and modern infrastructure helped me secure my dream job at Microsoft. The coding culture here is exceptional.",
			rating: 5,
			achievement: 'Placed at Microsoft with 18 LPA package',
			tags: ['Coding', 'Placements', 'Faculty']
		},
		{
			id: 2,
			name: 'Priya Patel',
			batch: 'B.Tech IT 2023',
			company: 'Amazon',
			position: 'Product Manager',
			image:
				'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
			video:
				'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
			testimonial:
				'The entrepreneurship ecosystem at BPIT is incredible. From ideation to execution, the support system helped me grow both personally and professionally.',
			rating: 5,
			achievement: 'Started her own tech startup',
			tags: ['Innovation', 'Entrepreneurship', 'Leadership']
		},
		{
			id: 3,
			name: 'Rajesh Kumar',
			batch: 'B.Tech ECE 2022',
			company: 'Google',
			position: 'Hardware Engineer',
			image:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
			video:
				'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
			testimonial:
				'The research opportunities and advanced labs at BPIT gave me hands-on experience that directly contributed to my success at Google.',
			rating: 5,
			achievement: 'Published 3 research papers',
			tags: ['Research', 'Innovation', 'Technology']
		},
		{
			id: 4,
			name: 'Sneha Gupta',
			batch: 'B.Tech EEE 2024',
			company: 'Tesla',
			position: 'Electrical Engineer',
			image:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
			video:
				'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
			testimonial:
				"BPIT's industry connections and practical learning approach prepared me for the global stage. Now I'm working on sustainable technology at Tesla.",
			rating: 5,
			achievement: 'Working on EV technology at Tesla',
			tags: ['Sustainability', 'Global Exposure', 'Innovation']
		},
		{
			id: 5,
			name: 'Vikash Singh',
			batch: 'MBA 2023',
			company: 'McKinsey & Company',
			position: 'Business Analyst',
			image:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
			video:
				'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
			testimonial:
				'The management program at BPIT combines theoretical knowledge with practical experience. The case study approach and industry mentorship were game-changers.',
			rating: 5,
			achievement: 'Youngest team lead at McKinsey',
			tags: ['Leadership', 'Strategy', 'Management']
		},
		{
			id: 6,
			name: 'Ananya Reddy',
			batch: 'B.Tech CSE 2023',
			company: 'Adobe',
			position: 'UX Designer',
			image:
				'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
			video:
				'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
			testimonial:
				"BPIT's creative environment and supportive faculty helped me discover my passion for design. The college encourages interdisciplinary learning.",
			rating: 5,
			achievement: 'Leading design team at Adobe',
			tags: ['Creativity', 'Design', 'Innovation']
		}
	];

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
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className='absolute'
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`
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
						Student Testimonials
					</h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.5, duration: 0.6 }}
						className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
						Hear from our students and alumni about their transformative journey
						at BPIT and how it shaped their successful careers.
					</motion.p>
				</motion.div>

				{/* Main Testimonial Display */}
				<div
					className='relative max-w-6xl mx-auto mb-16'
					style={{ height: '600px' }}>
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
								className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden h-full group hover:shadow-3xl transition-all duration-700'
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}>
								<div className='grid md:grid-cols-2 h-full'>
									{/* Left Side - Image/Video */}
									<div className='relative overflow-hidden'>
										<Image
											src={testimonials[currentIndex].image}
											alt={testimonials[currentIndex].name}
											fill
											className='object-cover transition-transform duration-700 group-hover:scale-110'
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
									<div className='p-8 md:p-12 flex flex-col justify-center'>
										<motion.div
											initial={{ opacity: 0, x: 50 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.3, duration: 0.6 }}>
											{/* Star Rating */}
											<div className='flex items-center mb-6'>
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
															<Star className='w-6 h-6 text-yellow-400 fill-current mr-1' />
														</motion.div>
													)
												)}
											</div>

											{/* Quote */}
											<Quote className='w-12 h-12 text-blue-200 mb-6 opacity-50' />

											<blockquote className='text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic'>
												&ldquo;{testimonials[currentIndex].testimonial}&rdquo;
											</blockquote>

											{/* Student Info */}
											<div className='space-y-3 mb-6'>
												<h3 className='text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent'>
													{testimonials[currentIndex].name}
												</h3>
												<p className='text-blue-600 font-semibold'>
													{testimonials[currentIndex].position}
												</p>
												<p className='text-gray-600'>
													{testimonials[currentIndex].batch} •{' '}
													{testimonials[currentIndex].achievement}
												</p>
											</div>

											{/* Tags */}
											<div className='flex flex-wrap gap-2 mb-6'>
												{testimonials[currentIndex].tags.map((tag, index) => (
													<span
														key={index}
														className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium'>
														{tag}
													</span>
												))}
											</div>

											{/* Watch Full Story Button */}
											<Button
												className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group'
												onClick={() => toggleVideo(currentIndex)}>
												<Volume2 className='w-4 h-4 mr-2' />
												Watch Full Story
												<ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
											</Button>
										</motion.div>
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation Arrows */}
					<button
						onClick={prevTestimonial}
						aria-label='Previous testimonial'
						className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl group'>
						<ChevronLeft className='w-6 h-6 group-hover:-translate-x-1 transition-transform' />
					</button>
					<button
						onClick={nextTestimonial}
						aria-label='Next testimonial'
						className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl group'>
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
};

export default Testimonial;
