'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from './event-card';
import MobileEventsCarousel from './mobile-events-carousel';

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

interface EventsSectionProps {
	data: {
		events: Event[];
	};
}

export default function EventsSection({ data }: EventsSectionProps) {
	const uniqueEvents = useMemo(() => {
		const seen = new Set<string>();
		return data.events.filter(event => {
			const key = `${event.id ?? ''}-${event.title}`;
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});
	}, [data.events]);
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<ReturnType<typeof animate> | null>(null);
	const currentPositionRef = useRef(0);

	const events = uniqueEvents;

	const getCardWidth = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) return 360;
			if (window.innerWidth >= 640) return 300;
			return 280;
		}
		return 360;
	};

	const [cardWidth, setCardWidth] = useState(getCardWidth());
	const getCardGap = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) return 24;
			if (window.innerWidth >= 640) return 16;
			return 12;
		}
		return 24;
	};
	const [cardGap, setCardGap] = useState(getCardGap());
	const cardWithGap = cardWidth + cardGap;
	const totalCardsWidth = events.length * cardWithGap;
	const speed = 160; // pixels per second

	useEffect(() => {
		const handleResize = () => {
			setCardWidth(getCardWidth());
			setCardGap(getCardGap());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (!scope.current || !containerRef.current) return;

		const containerWidth = containerRef.current.offsetWidth;

		const startPosition = (containerWidth - cardWidth) / 2;

		animate(scope.current, { x: startPosition }, { duration: 0 });
		currentPositionRef.current = startPosition;

		const runAnimation = () => {
			if (isHovered || !scope.current) return;

			const endPosition = -totalCardsWidth;

			const remainingDistance = Math.abs(
				endPosition - currentPositionRef.current
			);
			const duration = remainingDistance / speed;

			animationRef.current = animate(
				scope.current,
				{ x: endPosition },
				{
					duration: duration,
					ease: 'linear',
					onUpdate: latest => {
						currentPositionRef.current = latest;
					},
					onComplete: () => {
						if (isHovered) return;

						const resetPosition = containerWidth;
						animate(scope.current, { x: resetPosition }, { duration: 0 });
						currentPositionRef.current = resetPosition;

						setTimeout(() => {
							runAnimation();
						}, 100);
					}
				}
			);
		};

		const timer = setTimeout(runAnimation, 500);

		return () => {
			clearTimeout(timer);
			if (animationRef.current) {
				animationRef.current.stop();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scope, animate, events.length, totalCardsWidth, cardWidth, cardGap]);

	useEffect(() => {
		if (!isHovered && scope.current && containerRef.current) {
			const containerWidth = containerRef.current.offsetWidth;

			const continueAnimation = () => {
				if (isHovered || !scope.current) return;

				const endPosition = -totalCardsWidth;
				const remainingDistance = Math.abs(
					endPosition - currentPositionRef.current
				);
				const duration = remainingDistance / speed;

				animationRef.current = animate(
					scope.current,
					{ x: endPosition },
					{
						duration: duration,
						ease: 'linear',
						onUpdate: latest => {
							currentPositionRef.current = latest;
						},
						onComplete: () => {
							if (isHovered) return;

							const resetPosition = containerWidth;
							animate(scope.current, { x: resetPosition }, { duration: 0 });
							currentPositionRef.current = resetPosition;

							setTimeout(() => {
								continueAnimation();
							}, 100);
						}
					}
				);
			};

			setTimeout(continueAnimation, 50);
		}
	}, [isHovered, scope, animate, totalCardsWidth, cardWidth, cardGap]);

	useEffect(() => {
		if (isHovered) {
			if (animationRef.current) {
				animationRef.current.stop();
			}
		}
	}, [isHovered]);

	const handleCardHover = (hovered: boolean) => {
		setIsHovered(hovered);
	};

	return (
		<>
			{/* Mobile Carousel - Show only on mobile devices */}
			<div className='block sm:hidden'>
				<MobileEventsCarousel events={events} />
			</div>

			{/* Desktop/Tablet Horizontal Scrolling - Show on tablet and larger */}
			<section className='relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden hidden sm:block'>
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-[300px] h-[300px] bg-blue-300/10 rounded-full mix-blend-multiply filter blur-2xl' />
					<div className='absolute top-40 right-10 w-[250px] h-[250px] bg-red-300/10 rounded-full mix-blend-multiply filter blur-2xl' />
				</div>

				<div className='relative z-10 container mx-auto px-4'>
					<div className='max-w-7xl mx-auto'>
						<div className='flex flex-row items-center justify-between mb-6 lg:mb-8 gap-4'>
							<div className='flex items-center gap-3'>
								<div className='p-2 lg:p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg'>
									<Calendar className='w-5 h-5 lg:w-6 lg:h-6' />
								</div>
								<div>
									<h3 className='text-xl lg:text-2xl font-bold text-gray-800'>
										Official Events
									</h3>
									<p className='text-sm lg:text-base text-gray-600 hidden md:block'>
										Latest campus events and activities
									</p>
								</div>
							</div>

							<Button
								className='group flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base hover:scale-105'
								trackingEvent="events_view_all_clicked">
								<span className='font-semibold'>
									<span className='hidden sm:inline'>View All Events</span>
									<span className='sm:hidden'>View All</span>
								</span>
								<ArrowRight className='w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform' />
							</Button>
						</div>

						<div
							ref={containerRef}
							className='relative overflow-hidden rounded-2xl'>
							{/* Gradient masks for seamless edge effect - hidden on mobile */}
							<div className='absolute left-0 top-0 bottom-0 w-0 sm:w-16 lg:w-20 bg-gradient-to-r from-slate-50 via-blue-50/80 to-transparent z-10 pointer-events-none' />
							<div className='absolute right-0 top-0 bottom-0 w-0 sm:w-16 lg:w-20 bg-gradient-to-l from-indigo-50 via-blue-50/80 to-transparent z-10 pointer-events-none' />

							<div ref={scope} className='flex gap-3 sm:gap-4 lg:gap-6 w-max'>
								{events.map((event, index) => (
									<div
										key={`${event.id}-${index}`}
										className='w-[280px] sm:w-[300px] lg:w-[360px] flex-shrink-0'
										onMouseEnter={() => handleCardHover(true)}
										onMouseLeave={() => handleCardHover(false)}>
										<EventCard event={event} index={index} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
