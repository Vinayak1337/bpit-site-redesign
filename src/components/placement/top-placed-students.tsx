'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimate } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface Student {
	id: number;
	name: string;
	company: string;
	package: string;
	branch: string;
	year: string;
	image: string;
	companyLogo: string;
}

interface Statistic {
	value: string;
	label: string;
}

interface TopPlacedStudentsData {
	title: string;
	subtitle: string;
	students: Student[];
	statistics: Statistic[];
}

interface TopPlacedStudentsProps {
	data: TopPlacedStudentsData;
}

const TopPlacedStudents = ({ data }: TopPlacedStudentsProps) => {
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<ReturnType<typeof animate> | null>(null);
	const currentPositionRef = useRef(0);

	const studentsToRender = data.students;

	// Card dimensions - responsive based on screen size
	const getCardWidth = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) return 288; // lg breakpoint (w-72)
			if (window.innerWidth >= 640) return 256; // sm breakpoint (w-64)
			return 240; // mobile (w-60)
		}
		return 288; // fallback
	};

	const [cardWidth, setCardWidth] = useState(getCardWidth());
	const getCardGap = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) return 32; // lg breakpoint (space-x-8)
			if (window.innerWidth >= 640) return 24; // sm breakpoint (space-x-6)
			return 16; // mobile (space-x-4)
		}
		return 32; // fallback
	};
	const [cardGap, setCardGap] = useState(getCardGap());
	const cardWithGap = cardWidth + cardGap;
	const totalCardsWidth = studentsToRender.length * cardWithGap;
	const hasStudents = studentsToRender.length > 0;
	const speed = 140; // pixels per second

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
		if (!scope.current || !containerRef.current || !hasStudents) return;

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
	}, [scope, animate, studentsToRender.length, totalCardsWidth, cardWidth, cardGap, hasStudents]);

	useEffect(() => {
		if (!isHovered && scope.current && containerRef.current && hasStudents) {
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
	}, [isHovered, scope, animate, totalCardsWidth, cardWidth, cardGap, hasStudents]);

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
		<section className='py-12 lg:py-16 bg-gray-50 overflow-hidden'>
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

				{/* Infinite Scrolling Students */}
				<div ref={containerRef} className='relative'>
					<div className='overflow-hidden'>
						{/* Gradient Fade Effect - hidden on mobile */}
						<div className='absolute top-0 left-0 w-0 sm:w-16 lg:w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10'></div>
						<div className='absolute top-0 right-0 w-0 sm:w-16 lg:w-20 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10'></div>

						<div ref={scope} className='flex gap-4 sm:gap-6 lg:gap-8 w-max'>
							{studentsToRender.map((student, index) => (
								<motion.div
									key={`${student.name}-${index}`}
									className='flex-shrink-0 w-60 sm:w-64 lg:w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group mb-5'
									whileHover={{ scale: 1.02 }}
									onMouseEnter={() => handleCardHover(true)}
									onMouseLeave={() => handleCardHover(false)}>
									{/* Student Image */}
									<div className='relative h-40 sm:h-44 lg:h-48 overflow-hidden'>
										<Image
											src={student.image}
											alt={student.name}
											width={300}
											height={200}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
										/>
										<div className='absolute top-2 right-2 lg:top-3 lg:right-3 bg-white rounded-full p-1.5 lg:p-2 shadow-md'>
											<Image
												src={student.companyLogo}
												alt={student.company}
												width={24}
												height={24}
												className='w-5 h-5 lg:w-6 lg:h-6 object-contain'
											/>
										</div>
										<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 lg:p-4'>
											<div className='text-white text-xs lg:text-sm font-medium'>
												{student.year} Graduate
											</div>
										</div>
									</div>

									{/* Student Info */}
									<div className='p-4 lg:p-6'>
										<h3 className='text-lg lg:text-xl font-bold text-gray-900 mb-2'>
											{student.name}
										</h3>
										<p className='text-xs lg:text-sm text-gray-600 mb-3'>
											{student.branch}
										</p>

										<div className='flex items-center justify-between'>
											<div>
												<div className='text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center'>
													<DollarSign className='w-4 h-4 lg:w-5 lg:h-5 mr-1 text-blue-600' />
													{student.package}
												</div>
												<div className='text-xs text-gray-500'>Package</div>
											</div>
											<div className='text-right'>
												<div className='text-sm lg:text-lg font-semibold text-gray-900'>
													{student.company}
												</div>
												<div className='text-xs text-gray-500'>Placed at</div>
											</div>
										</div>
									</div>
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
							<div className='text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
								{stat.value}
							</div>
							<div className='text-xs lg:text-sm text-gray-600'>
								{stat.label}
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default TopPlacedStudents;
