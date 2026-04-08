'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const CollegeCarousel = () => {
	const images = [
		{
			id: 1,
			src: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'College Campus View',
			title: 'Beautiful Campus'
		},
		{
			id: 2,
			src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Students in Library',
			title: 'State-of-the-art Library'
		},
		{
			id: 3,
			src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Graduation Ceremony',
			title: 'Graduation Day'
		},
		{
			id: 4,
			src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Science Laboratory',
			title: 'Advanced Laboratories'
		},
		{
			id: 5,
			src: 'https://plus.unsplash.com/premium_photo-1691708774736-b66f6529d61a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			alt: 'Student Activities',
			title: 'Campus Life'
		},
		{
			id: 6,
			src: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			alt: 'Sports Facilities',
			title: 'Sports Complex'
		},
		{
			id: 7,
			src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Lecture Hall',
			title: 'Modern Classrooms'
		},
		{
			id: 8,
			src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Campus Garden',
			title: 'Green Campus'
		},
		{
			id: 9,
			src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Computer Lab',
			title: 'Technology Center'
		},
		{
			id: 10,
			src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Engineering Workshop',
			title: 'Engineering Facilities'
		},
		{
			id: 11,
			src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Student Cafeteria',
			title: 'Dining Facilities'
		},
		{
			id: 12,
			src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Award Ceremony',
			title: 'Academic Excellence'
		},
		{
			id: 13,
			src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Research Center',
			title: 'Research & Development'
		},
		{
			id: 14,
			src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Student Collaboration',
			title: 'Collaborative Learning'
		},
		{
			id: 15,
			src: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			alt: 'Innovation Hub',
			title: 'Innovation Center'
		}
	];

	const [currentSlide, setCurrentSlide] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (!isPlaying || isHovered) return;

		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % images.length);
		}, 3500);

		return () => clearInterval(interval);
	}, [isPlaying, isHovered, images.length]);

	const goToSlide = (index: React.SetStateAction<number>) => {
		setCurrentSlide(index);
	};

	const goToPrevious = () => {
		setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
	};

	const goToNext = () => {
		setCurrentSlide(prev => (prev + 1) % images.length);
	};

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div
			className='relative w-full h-64 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden rounded-lg shadow-2xl group'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Main Image Container */}
			<div className='relative w-full h-full'>
				{images.map((image, index) => (
					<div
						key={image.id}
						className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
							index === currentSlide ? 'opacity-100' : 'opacity-0'
						}`}>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='object-cover'
						/>
						{/* Gradient Overlay */}
						<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />

						{/* Image Title */}
						<div className='absolute bottom-4 left-4 md:bottom-8 md:left-8'>
							<h3 className='text-white text-lg md:text-2xl lg:text-3xl font-bold drop-shadow-lg'>
								{image.title}
							</h3>
						</div>
					</div>
				))}
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={goToPrevious}
				className='absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100'
				aria-label='Previous image'>
				<ChevronLeft className='w-4 h-4 md:w-6 md:h-6' />
			</button>

			<button
				onClick={goToNext}
				className='absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100'
				aria-label='Next image'>
				<ChevronRight className='w-4 h-4 md:w-6 md:h-6' />
			</button>

			{/* Play/Pause Button */}
			<button
				onClick={togglePlayPause}
				className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100'
				aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}>
				{isPlaying ? (
					<Pause className='w-4 h-4' />
				) : (
					<Play className='w-4 h-4' />
				)}
			</button>

			{/* Dots Indicator */}
			<div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
							index === currentSlide
								? 'bg-white scale-125'
								: 'bg-white/50 hover:bg-white/70'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>

			{/* Progress Bar */}
			<div className='absolute bottom-0 left-0 w-full h-1 bg-white/20'>
				<div
					className='h-full bg-white transition-all duration-300 ease-linear'
					style={{
						width: `${((currentSlide + 1) / images.length) * 100}%`
					}}
				/>
			</div>

			{/* Slide Counter */}
			<div className='absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
				{currentSlide + 1} / {images.length}
			</div>
		</div>
	);
};

export default CollegeCarousel;
