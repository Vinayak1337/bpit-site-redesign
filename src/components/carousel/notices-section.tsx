'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import {
	Bell,
	Sparkles,
	Filter,
	ExternalLink,
	Megaphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import NoticeCard from './notice-card';

const ScrollingSection = ({
	title,
	items,
	icon
}: {
	title: string;
	items: Notice[];
	icon: React.ReactNode;
}) => {
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<ReturnType<typeof animate> | null>(null);
	const currentPositionRef = useRef(0);

	// Card dimensions - responsive based on screen size
	const getCardWidth = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) return 360; // lg breakpoint
			if (window.innerWidth >= 640) return 320; // sm breakpoint
			return 260; // mobile - smaller for better fit
		}
		return 360; // fallback
	};

	const [cardWidth, setCardWidth] = useState(getCardWidth());
	const getCardGap = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) return 24; // lg breakpoint
			if (window.innerWidth >= 640) return 16; // sm breakpoint
			return 12; // mobile
		}
		return 24; // fallback
	};
	const [cardGap, setCardGap] = useState(getCardGap());
	const cardWithGap = cardWidth + cardGap;
	const totalCardsWidth = items.length * cardWithGap * 2;
	const speed = 160; // pixels per second

	// Update card width and gap on resize
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
	}, [scope, animate, items.length, totalCardsWidth, cardWidth, cardGap]);

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
		<div className='relative'>
			{/* Section Header */}
			<div className='flex flex-row items-center justify-between mb-6 lg:mb-8 gap-4'>
				<div className='flex items-center gap-3'>
					<div
						className={`p-2 lg:p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg`}>
						{icon}
					</div>
					<div>
						<h3 className='text-xl lg:text-2xl font-bold text-gray-800'>
							{title}
						</h3>
						<p className='text-sm lg:text-base text-gray-600 hidden md:block'>
							Latest updates and information
						</p>
					</div>
				</div>

				<div className='flex items-center gap-2 lg:gap-3 flex-wrap'>
					<Button
						variant='outline'
						size='sm'
						className='rounded-xl text-xs lg:text-sm'>
						<Filter className='w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2' />
						<span className='hidden sm:inline'>Filter</span>
					</Button>
					<Button
						className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 rounded-xl border-0 text-xs lg:text-sm`}>
						<span className='hidden sm:inline'>View All</span>
						<span className='sm:hidden'>All</span>
						<ExternalLink className='w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2' />
					</Button>
				</div>
			</div>

			{/* Infinite Scrolling Container */}
			<div ref={containerRef} className='relative overflow-hidden rounded-2xl'>
				{/* Gradient masks for seamless edge effect - hidden on mobile */}
				<div className='absolute left-0 top-0 bottom-0 w-0 sm:w-16 lg:w-20 bg-gradient-to-r from-indigo-50 via-indigo-50/80 to-transparent z-10 pointer-events-none' />
				<div className='absolute right-0 top-0 bottom-0 w-0 sm:w-16 lg:w-20 bg-gradient-to-l from-indigo-50 via-indigo-50/80 to-transparent z-10 pointer-events-none' />

				<div ref={scope} className='flex gap-3 sm:gap-4 lg:gap-6 w-max'>
					{[...items, ...items].map((item, index) => (
						<div
							key={`${item.id}-${index}`}
							className='w-[260px] sm:w-[320px] lg:w-[360px] flex-shrink-0'
							onMouseEnter={() => handleCardHover(true)}
							onMouseLeave={() => handleCardHover(false)}>
							<NoticeCard item={item} index={index} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default function NoticesSection({ data }: NoticesSectionProps) {
	const { notices, announcements } = data;

	return (
		<section className='relative py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden'>
			{/* Background Elements */}
			<div className='absolute inset-0'>
				<div className='absolute top-20 right-10 w-80 h-80 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob' />
				<div className='absolute bottom-20 left-10 w-80 h-80 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' />
				<div className='absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000' />
			</div>

			{/* Floating Elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full'
						style={{
							top: `${15 + i * 10}%`,
							left: `${5 + i * 12}%`
						}}
						animate={{
							y: [0, -20, 0],
							opacity: [0.2, 0.8, 0.2]
						}}
						transition={{
							duration: 2 + i * 0.3,
							repeat: Infinity,
							delay: i * 0.2
						}}
					/>
				))}
			</div>

			<div className='relative z-10 container mx-auto px-4'>
				<div className='max-w-7xl mx-auto'>
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center space-y-6 mb-16'>
						<div className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white/40 shadow-lg'>
							<Bell className='w-5 h-5 text-indigo-600' />
							<span className='text-indigo-700 font-semibold'>
								Stay Updated
							</span>
							<Sparkles className='w-5 h-5 text-indigo-600' />
						</div>

						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent leading-tight'>
							Notices &
							<br />
							<span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
								Announcements
							</span>
						</h2>

						<p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
							Stay informed with the latest notices, announcements, and
							important updates from our institute. Never miss critical
							information again.
						</p>

						<div className='flex justify-center'>
							<div className='w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full' />
						</div>
					</motion.div>

					{/* Content */}
					<AnimatePresence mode='wait'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}>
							<div className='flex flex-col gap-6'>
								<ScrollingSection
									title='Official Notices'
									items={notices}
									icon={<Bell className='w-6 h-6' />}
								/>
								<ScrollingSection
									title='Announcements'
									items={announcements}
									icon={<Megaphone className='w-6 h-6' />}
								/>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
