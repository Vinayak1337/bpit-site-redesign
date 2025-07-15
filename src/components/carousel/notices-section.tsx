'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import Image from 'next/image';
import {
	Bell,
	Calendar,
	Clock,
	ArrowRight,
	Sparkles,
	BookOpen,
	GraduationCap,
	Award,
	Users,
	TrendingUp,
	Filter,
	ExternalLink,
	Pin,
	Eye,
	Megaphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const getCategoryConfig = (category: Category) => {
	const configs = {
		Academic: {
			gradient: 'from-blue-500 to-indigo-600',
			icon: <GraduationCap className='w-4 h-4' />,
			bg: 'bg-blue-50',
			border: 'border-blue-200',
			text: 'text-blue-700'
		},
		'Financial Aid': {
			gradient: 'from-green-500 to-emerald-600',
			icon: <Award className='w-4 h-4' />,
			bg: 'bg-green-50',
			border: 'border-green-200',
			text: 'text-green-700'
		},
		Admission: {
			gradient: 'from-purple-500 to-violet-600',
			icon: <Users className='w-4 h-4' />,
			bg: 'bg-purple-50',
			border: 'border-purple-200',
			text: 'text-purple-700'
		},
		Innovation: {
			gradient: 'from-orange-500 to-red-600',
			icon: <TrendingUp className='w-4 h-4' />,
			bg: 'bg-orange-50',
			border: 'border-orange-200',
			text: 'text-orange-700'
		},
		Sports: {
			gradient: 'from-pink-500 to-rose-600',
			icon: <Users className='w-4 h-4' />,
			bg: 'bg-pink-50',
			border: 'border-pink-200',
			text: 'text-pink-700'
		},
		Library: {
			gradient: 'from-indigo-500 to-blue-600',
			icon: <BookOpen className='w-4 h-4' />,
			bg: 'bg-indigo-50',
			border: 'border-indigo-200',
			text: 'text-indigo-700'
		},
		General: {
			gradient: 'from-gray-500 to-slate-600',
			icon: <Bell className='w-4 h-4' />,
			bg: 'bg-gray-50',
			border: 'border-gray-200',
			text: 'text-gray-700'
		}
	};
	return configs[category];
};

const getPriorityConfig = (priority: Priority) => {
	const configs = {
		high: {
			gradient: 'from-red-500 to-rose-600',
			bg: 'bg-red-50',
			border: 'border-red-200',
			text: 'text-red-700',
			label: 'High Priority'
		},
		medium: {
			gradient: 'from-yellow-500 to-orange-600',
			bg: 'bg-yellow-50',
			border: 'border-yellow-200',
			text: 'text-yellow-700',
			label: 'Medium Priority'
		},
		low: {
			gradient: 'from-green-500 to-emerald-600',
			bg: 'bg-green-50',
			border: 'border-green-200',
			text: 'text-green-700',
			label: 'Low Priority'
		}
	};
	return configs[priority];
};

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return 'Today';
	if (diffDays === 1) return 'Yesterday';
	if (diffDays <= 7) return `${diffDays} days ago`;

	return date.toLocaleDateString('en', {
		month: 'short',
		day: 'numeric',
		year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
	});
};

const NoticeCard = ({ item, index }: { item: Notice; index: number }) => {
	const [isHovered, setIsHovered] = useState(false);
	const categoryConfig = getCategoryConfig(item.category);
	const priorityConfig = getPriorityConfig(item.priority);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className='group relative'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className='relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-sm md:shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1'>
				{/* Priority Indicator */}
				{item.priority === 'high' && (
					<div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600' />
				)}

				{/* Pinned Badge */}
				{item.pinned && (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: 'spring' }}
						className='absolute top-3 right-3 z-10'>
						<div className='bg-gradient-to-r from-amber-400 to-orange-500 text-white p-1.5 rounded-full shadow-lg'>
							<Pin className='w-3 h-3' />
						</div>
					</motion.div>
				)}

				{/* Urgent Badge */}
				{item.urgent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='absolute top-3 left-3 z-10 hidden md:block'>
						<div className='bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1'>
							<div className='w-2 h-2 bg-white rounded-full animate-pulse' />
							Urgent
						</div>
					</motion.div>
				)}

				<div className='p-4 sm:p-6'>
					{/* Header */}
					<div className='flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4'>
						{/* Image */}
						<div className='relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-lg'>
							<Image
								src={item.image}
								alt={item.title}
								fill
								className='object-cover'
							/>
						</div>

						{/* Content Header */}
						<div className='flex-1 min-w-0'>
							<div className='flex flex-row flex-wrap items-center gap-1.5 mb-2'>
								{item.urgent && (
									<div className='md:hidden bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1'>
										<div className='w-1.5 h-1.5 bg-white rounded-full animate-pulse' />
										<span>Urgent</span>
									</div>
								)}
								<div
									className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryConfig.bg} ${categoryConfig.border} ${categoryConfig.text} border`}>
									{categoryConfig.icon}
									<span className='hidden sm:inline'>{item.category}</span>
									<span className='sm:hidden'>{item.category.slice(0, 3)}</span>
								</div>
								<div
									className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.border} ${priorityConfig.text} border`}>
									<span className='hidden sm:inline'>
										{priorityConfig.label}
									</span>
									<span className='sm:hidden'>{item.priority}</span>
								</div>
							</div>

							<h3 className='font-bold text-gray-800 text-xs sm:text-sm leading-tight mb-1 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300'>
								{item.title}
							</h3>
							<p className='text-xs text-gray-500 font-medium leading-relaxed line-clamp-1'>
								{item.subtitle}
							</p>
						</div>
					</div>

					{/* Description */}
					<p className='text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4'>
						{item.description}
					</p>

					{/* Tags */}
					<div className='flex flex-wrap gap-1 mb-3 sm:mb-4'>
						{item.tags.slice(0, 3).map((tag, tagIndex) => (
							<span
								key={tagIndex}
								className='px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors duration-200'>
								{tag}
							</span>
						))}
						{item.tags.length > 3 && (
							<span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium'>
								+{item.tags.length - 3} more
							</span>
						)}
					</div>

					{/* Footer */}
					<div className='flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100'>
						<div className='flex items-center gap-3 text-xs text-gray-500 sm:gap-4'>
							<div className='flex items-center gap-1'>
								<Calendar className='w-3 h-3' />
								<span className='hidden sm:inline'>
									{formatDate(item.date)}
								</span>
								<span className='sm:hidden'>
									{formatDate(item.date).split(' ')[0]}
								</span>
							</div>
							<div className='flex items-center gap-1'>
								<Clock className='w-3 h-3' />
								<span>{item.time}</span>
							</div>
							<div className='items-center gap-1 hidden sm:flex'>
								<Eye className='w-3 h-3' />
								<span>{item.views}</span>
							</div>
						</div>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200'>
							View
							<ArrowRight className='w-3 h-3' />
						</motion.button>
					</div>
				</div>

				{/* Hover Overlay */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 0.02 : 0 }}
					transition={{ duration: 0.3 }}
					className={`absolute inset-0 bg-gradient-to-br ${categoryConfig.gradient}`}
				/>
			</div>
		</motion.div>
	);
};

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
