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

const Hero2 = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const slides = [
		{
			title: 'Engineering Excellence',
			subtitle: "Shaping Tomorrow's Innovators",
			description: (
				<>
					<span className='font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent'>
						A Unit of Bhartiya Brahmin Charitable Trust (Regd.).
					</span>
					<br />
					<span>(Approved by AICTE, Ministry of Education (MoE))</span>
					<br />
					<span>
						Affiliated to {' '}
						<span className='font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent'>Guru Gobind Singh Indraprastha University, Delhi</span>
					</span>
				</>
			),
			image:
				'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
			icon: <Award className='w-8 h-8' />,
			stats: 'NBA Accredited Institution',
			cta: {
				label: 'Apply Now',
				isEnquiry: true
			},
			secondary_cta: {
				label: 'Explore Programs',
				href: '/admissions'
			}
		},
		{
			title: 'Engineering Excellence',
			subtitle: 'NBA Accredited Programs',
			description:
				"Discover our world-class engineering programs in Computer Science, Information Technology, Electronics, and Electrical Engineering designed to shape tomorrow's innovators.",
			image:
				'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
			icon: <BookOpen className='w-8 h-8' />,
			stats: '1000+ Students',
			cta: {
				label: 'Learn More',
				href: '/admissions'
			}
		},
		{
			title: 'Campus Life',
			subtitle: 'Beyond Academics',
			description:
				'Experience vibrant campus life with state-of-the-art facilities, hostels, sports complexes, and numerous clubs and societies that nurture holistic development.',
			image:
				'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
			icon: <Users className='w-8 h-8' />,
			stats: '50+ Clubs',
			cta: {
				label: 'Discover More',
				href: '/campus-life'
			}
		},
		{
			title: 'Placement Success',
			subtitle: 'Industry Ready',
			description:
				'Join our alumni network working at top companies like Amazon, Microsoft, and Google. Our dedicated placement cell ensures 100% placement assistance.',
			image:
				'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',
			icon: <Trophy className='w-8 h-8' />,
			stats: '100% Placement',
			cta: {
				label: 'View Placements',
				href: '/placements'
			}
		},
		{
			title: 'Modern Infrastructure',
			subtitle: 'Learning Environment',
			description:
				'Study in modern classrooms, well-equipped laboratories, digital libraries, and smart campus facilities that provide the perfect environment for learning.',
			image:
				'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
			icon: <Building className='w-8 h-8' />,
			stats: 'Modern Facilities',
			cta: {
				label: 'See Facilities',
				href: '/facilities'
			}
		}
	];

	const resetTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		timerRef.current = setInterval(() => {
			setCurrentSlide((prev: number) => (prev + 1) % slides.length);
		}, 5000);
	}, [slides.length]);

	useEffect(() => {
		resetTimer();
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [resetTimer]);

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % slides.length);
		resetTimer();
	};

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
		resetTimer();
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
		resetTimer();
	};

	return (
		<section className='relative h-screen bg-gray-900 overflow-hidden'>
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
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto text-center text-white'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -50 }}
								transition={{ duration: 0.6 }}
								className='space-y-6'>
								{/* Icon */}
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className='flex justify-center mb-6'>
									<div className='p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20'>
										{slides[currentSlide].icon}
									</div>
								</motion.div>

								{/* Stats Badge */}
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.3 }}
									className='inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium border border-blue-400/30'>
									{slides[currentSlide].stats}
								</motion.div>

								{/* Title */}
								<motion.h2
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className='text-5xl md:text-7xl font-bold mb-4'>
									{slides[currentSlide].title}
								</motion.h2>

								{/* Subtitle */}
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
									className='text-xl md:text-2xl text-blue-200 font-medium mb-6'>
									{slides[currentSlide].subtitle}
								</motion.p>

								{/* Description */}
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6 }}
									className='text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8'>
									{slides[currentSlide].description}
								</motion.p>

								{/* CTA Buttons */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.7 }}
									className='flex flex-col sm:flex-row gap-4 justify-center'>
									{slides[currentSlide].cta && (
										<Button
											size='lg'
											className='bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group'
											onClick={() => {
												if (slides[currentSlide].cta?.isEnquiry) {
													const event = new CustomEvent('openEnquiry');
													window.dispatchEvent(event);
												} else if (slides[currentSlide].cta?.href) {
													window.location.href = slides[currentSlide].cta
														.href as string;
												}
											}}>
											{slides[currentSlide].cta.label}
											<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
										</Button>
									)}
									{slides[currentSlide].secondary_cta && (
										<Button
											variant='outline'
											size='lg'
											className='border-2 border-white hover:bg-white text-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300'
											onClick={() => {
												if (slides[currentSlide].secondary_cta?.href) {
													window.location.href = slides[currentSlide]
														.secondary_cta.href as string;
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
			<button
				onClick={prevSlide}
				aria-label='Previous slide'
				className='absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group'>
				<ChevronLeft className='w-6 h-6 group-hover:-translate-x-1 transition-transform' />
			</button>
			<button
				onClick={nextSlide}
				aria-label='Next slide'
				className='absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group'>
				<ChevronRight className='w-6 h-6 group-hover:translate-x-1 transition-transform' />
			</button>

			{/* Slide Indicators */}
			<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3'>
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						aria-label={`Go to slide ${index + 1}`}
						className={`h-3 transition-all duration-300 ${
							index === currentSlide
								? 'w-8 bg-white rounded-lg'
								: 'w-3 bg-white/50 hover:bg-white/75 rounded-full'
						}`}
					/>
				))}
			</div>

			{/* Progress Bar */}
			<div className='absolute bottom-0 left-0 w-full h-1 bg-white/20'>
				<motion.div
					className='h-full bg-white'
					initial={{ width: '0%' }}
					animate={{ width: '100%' }}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: 'linear'
					}}
					key={currentSlide}
				/>
			</div>

			{/* Floating Elements */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<motion.div
					className='absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full'
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
					className='absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-white/40 rounded-full'
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
