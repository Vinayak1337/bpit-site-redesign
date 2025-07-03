'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const TestimonialCarousel = () => {
	const testimonials = [
		{
			id: 1,
			image:
				'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
			name: 'Emma Johnson',
			title: 'Best Learning Experience'
		},
		{
			id: 2,
			image:
				'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop',
			name: 'Michael Chen',
			title: 'Inspiring Teachers'
		},
		{
			id: 3,
			image:
				'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop',
			name: 'Sarah Williams',
			title: 'Amazing School Environment'
		},
		{
			id: 4,
			image:
				'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop',
			name: 'David Martinez',
			title: 'Great Academic Support'
		},
		{
			id: 5,
			image:
				'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
			name: 'Olivia Brown',
			title: 'Wonderful Learning Journey'
		},
		{
			id: 6,
			image:
				'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=250&fit=crop',
			name: 'James Wilson',
			title: 'Excellent Facilities'
		},
		{
			id: 7,
			image:
				'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop',
			name: 'Ava Davis',
			title: 'Outstanding Education'
		},
		{
			id: 8,
			image:
				'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
			name: 'Ethan Thompson',
			title: 'Transformed My Future'
		}
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (!isHovered && !isTransitioning) {
			const interval = setInterval(() => {
				setCurrentIndex(prev => (prev + 1) % testimonials.length);
			}, 4000);
			return () => clearInterval(interval);
		}
	}, [isHovered, isTransitioning, testimonials.length]);

	const handleClick = (index: React.SetStateAction<number>) => {
		if (index !== currentIndex && !isTransitioning) {
			setIsTransitioning(true);
			setCurrentIndex(index);
			setTimeout(() => setIsTransitioning(false), 600);
		}
	};

	const getCardStyle = (index: number) => {
		const total = testimonials.length;
		let position = (index - currentIndex + total) % total;
		if (position > Math.floor(total / 2)) position -= total;

		const isActive = position === 0;
		const isVisible = Math.abs(position) <= 2;

		if (!isVisible) {
			return {
				opacity: 0,
				visibility: 'hidden',
				transform: 'translateX(300px) scale(0.7)',
				zIndex: 0,
				transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				position: 'absolute'
			};
		}

		const scale = isActive ? 1 : 0.8;
		const zIndex = isActive ? 20 : 15 - Math.abs(position);
		const translateX = position * 160;
		const translateY = isActive ? 0 : Math.abs(position) * 10;
		const opacity = isActive ? 1 : 0.6;
		const blur = isActive ? 0 : 2;
		const brightness = isActive ? 1 : 0.7;

		return {
			transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
			opacity,
			zIndex,
			filter: `blur(${blur}px) brightness(${brightness})`,
			transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
			position: 'absolute',
			visibility: 'visible'
		};
	};

	return (
		<div className='bg-blue-950 text-white p-12 flex flex-col items-center  overflow-hidden'>
			<h1 className='text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
				Student Testimonials
			</h1>

			<div
				className='relative w-full max-w-7xl h-96  flex items-center justify-center'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={{ perspective: '1000px' }}>
				<div className='relative w-full h-full flex items-center justify-center '>
					{testimonials.map((item, index) => (
						<div
							key={item.id}
							style={getCardStyle(index) as React.CSSProperties}
							className={`
                w-96 h-80 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
                shadow-2xl cursor-pointer overflow-hidden border border-white/20
                hover:border-white/40 hover:shadow-3xl backdrop-blur-sm
                ${index === currentIndex ? 'hover:scale-105' : ''}
              `}
							onClick={() => handleClick(index)}>
							<div className='relative w-full h-full group'>
								<div className='relative w-full h-3/5 overflow-hidden rounded-t-2xl'>
									<Image
										src={item.image}
										alt={item.name}
										fill
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										className='object-cover transition-transform duration-700 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
								</div>

								{/* Play button overlay */}
								<div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
									<div className='w-16 h-16 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 group-hover:shadow-blue-500/30'>
										<Play className='w-6 h-6 ml-1' fill='currentColor' />
									</div>
								</div>

								{/* Student info section */}
								<div className='h-2/5 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-white/15 to-white/5 rounded-b-2xl'>
									<h3 className='text-xl font-bold text-center mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
										{item.name}
									</h3>
									<p className='text-sm text-blue-100 text-center opacity-90'>
										{item.title}
									</p>
								</div>

								{/* Active card glow effect */}
								{index === currentIndex && (
									<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl' />
								)}
							</div>
						</div>
					))}
				</div>
			</div>
			{/* Enhanced dots indicator */}
			<div className='flex space-x-3 mt-8'>
				{testimonials.map((_, index) => (
					<button
						key={index}
						onClick={() => handleClick(index)}
						className={`
              relative transition-all duration-500 rounded-full
              ${
								index === currentIndex
									? 'w-12 h-3 bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-400/30'
									: 'w-3 h-3 bg-white/30 hover:bg-white/60 hover:scale-125'
							}
            `}>
						{index === currentIndex && (
							<div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 animate-pulse opacity-50' />
						)}
					</button>
				))}
			</div>
		</div>
	);
};

export default TestimonialCarousel;
