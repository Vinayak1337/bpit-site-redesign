'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimate } from 'framer-motion';

interface Company {
	name: string;
	logo: string;
}

interface Statistic {
	value: string;
	label: string;
}

interface PlacementCompaniesData {
	title: string;
	subtitle: string;
	companies: Company[];
	statistics: Statistic[];
}

interface PlacementCompaniesProps {
	data: PlacementCompaniesData;
}

const PlacementCompanies = ({ data }: PlacementCompaniesProps) => {
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<ReturnType<typeof animate> | null>(null);
	const currentPositionRef = useRef(0);

	// Card dimensions - responsive based on screen size
	const getCardWidth = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) return 160; // lg breakpoint
			if (window.innerWidth >= 640) return 140; // sm breakpoint
			return 120; // mobile
		}
		return 160; // fallback
	};

	const [cardWidth, setCardWidth] = useState(getCardWidth());
	const getCardGap = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) return 48; // lg breakpoint (space-x-12)
			if (window.innerWidth >= 640) return 32; // sm breakpoint (space-x-8)
			return 24; // mobile (space-x-6)
		}
		return 48; // fallback
	};
	const [cardGap, setCardGap] = useState(getCardGap());
	const cardWithGap = cardWidth + cardGap;
	const companiesToRender = data.companies;
	const totalCardsWidth = companiesToRender.length * cardWithGap;
	const hasCompanies = companiesToRender.length > 0;
	const speed = 120; // pixels per second

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
		if (!scope.current || !containerRef.current || !hasCompanies) {
			return;
		}

		const containerWidth = containerRef.current.offsetWidth;
		const startPosition = (containerWidth - cardWidth) / 2;

		// Clean up any existing animation before starting new one
		if (animationRef.current) {
			animationRef.current.stop();
			animationRef.current = null;
		}

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
						if (isHovered || !scope.current) return;

						const resetPosition = containerWidth;
						if (scope.current) {
							animate(scope.current, { x: resetPosition }, { duration: 0 });
							currentPositionRef.current = resetPosition;

							setTimeout(() => {
								if (!isHovered && scope.current) {
									runAnimation();
								}
							}, 100);
						}
					}
				}
			);
		};

		const timer = setTimeout(runAnimation, 500);

		return () => {
			clearTimeout(timer);
			if (animationRef.current) {
				animationRef.current.stop();
				animationRef.current = null;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scope, animate, data.companies.length, totalCardsWidth, cardWidth, cardGap]);

	useEffect(() => {
		if (!isHovered && scope.current && containerRef.current && hasCompanies) {
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
							if (isHovered || !scope.current) return;

							const resetPosition = containerWidth;
							if (scope.current) {
								animate(scope.current, { x: resetPosition }, { duration: 0 });
								currentPositionRef.current = resetPosition;

								setTimeout(() => {
									if (!isHovered && scope.current) {
										continueAnimation();
									}
								}, 100);
							}
						}
					}
				);
			};

			setTimeout(continueAnimation, 50);
		}
	}, [isHovered, scope, animate, totalCardsWidth, cardWidth, cardGap, hasCompanies]);

	useEffect(() => {
		if (isHovered && animationRef.current) {
			animationRef.current.stop();
			animationRef.current = null;
		}
	}, [isHovered]);

	// Cleanup effect to prevent memory leaks
	useEffect(() => {
		return () => {
			if (animationRef.current) {
				animationRef.current.stop();
				animationRef.current = null;
			}
		};
	}, []);

	const handleCardHover = (hovered: boolean) => {
		setIsHovered(hovered);
	};

	return (
		<section className='py-8 md:py-12 lg:py-16 bg-gray-50 overflow-hidden'>
			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<div className='text-center mb-8 lg:mb-12'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
						{data.title}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className='text-base lg:text-lg text-gray-600 max-w-2xl mx-auto'>
						{data.subtitle}
					</motion.p>
				</div>

				{/* Smaller screens use a simple grid for easier scanning */}
				<div className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden'>
					{companiesToRender.map((company, index) => (
						<div
							key={`${company.name}-${index}`}
							className='flex min-h-16 items-center justify-center rounded-lg bg-white p-4 shadow-sm'>
							<Image
								src={company.logo}
								alt={`${company.name} logo`}
								width={128}
								height={64}
								className='max-h-[40px] max-w-[96px] object-contain opacity-80'
								onError={() => {
									// Handle image loading error silently
								}}
							/>
						</div>
					))}
				</div>

				{/* Infinite Scrolling Companies */}
				<div ref={containerRef} className='relative hidden lg:block'>
					<div className='overflow-hidden'>
						<div className='absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10'></div>
						<div className='absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10'></div>

						<div ref={scope} className='flex w-max gap-12'>
							{companiesToRender.map((company, index) => (
								<motion.div
									key={`${company.name}-${index}`}
									className='group flex h-20 w-[160px] flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md'
									whileHover={{ scale: 1.05 }}
									onMouseEnter={() => handleCardHover(true)}
									onMouseLeave={() => handleCardHover(false)}>
									<Image
										src={company.logo}
										alt={`${company.name} logo`}
										width={128}
										height={64}
										className='max-h-[50px] max-w-[120px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'
										onError={() => {
											// Handle image loading error silently
										}}
									/>
								</motion.div>
							))}
						</div>
					</div>
				</div>

				{/* Statistics */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className='grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-16 max-w-4xl mx-auto'>
					{data.statistics.map((stat, index) => (
						<div key={index} className='text-center'>
							<div className='text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-2'>
								{stat.value}
							</div>
							<div className='text-xs lg:text-sm text-gray-600'>{stat.label}</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default PlacementCompanies;
