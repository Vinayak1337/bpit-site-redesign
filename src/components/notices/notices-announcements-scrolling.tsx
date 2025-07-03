'use client';

import Image from 'next/image';
import { Calendar, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const notices = [
	{
		id: 1,
		category: 'Academic',
		title: 'Mid-semester examination schedule released',
		date: 'Dec 28, 2024',
		image: '/events/img1.png?height=60&width=60'
	},
	{
		id: 2,
		category: 'Financial Aid',
		title: 'Education loans available through PM Vidya laxmi scheme',
		date: 'Dec 25, 2024',
		image: '/events/img2.png?height=60&width=60'
	},
	{
		id: 3,
		category: 'Admission',
		title: 'Last date for semester registration extended',
		date: 'Dec 24, 2024',
		image: '/events/img1.png?height=60&width=60'
	},
	{
		id: 4,
		category: 'Academic',
		title: 'Final year project submission guidelines published',
		date: 'Dec 23, 2024',
		image: '/events/img2.png?height=60&width=60'
	},
	{
		id: 5,
		category: 'Admission',
		title: 'New batch orientation program announced',
		date: 'Dec 22, 2024',
		image: '/events/img1.png?height=60&width=60'
	},
	{
		id: 6,
		category: 'Academic',
		title: 'Course registration for next semester opens',
		date: 'Dec 21, 2024',
		image: '/events/img2.png?height=60&width=60'
	},
	{
		id: 7,
		category: 'Financial Aid',
		title: 'Scholarship applications now available',
		date: 'Dec 20, 2024',
		image: '/events/img1.png?height=60&width=60'
	}
];

const announcements = [
	{
		id: 1,
		category: 'Innovation',
		title: 'Note for Institute Innovation Council (IIC)',
		date: 'Dec 24, 2024',
		image: '/events/img1.png?height=60&width=60'
	},
	{
		id: 2,
		category: 'Sports',
		title: 'Inter-college basketball tournament registration open',
		date: 'Dec 23, 2024',
		image: '/events/img2.png?height=60&width=60'
	},
	{
		id: 3,
		category: 'Library',
		title: 'New digital resources added to library portal',
		date: 'Dec 22, 2024',
		image: '/events/img1.png?height=60&width=60'
	},
	{
		id: 4,
		category: 'Sports',
		title: 'Annual sports meet registration begins',
		date: 'Dec 21, 2024',
		image: '/events/img2.png?height=60&width=60'
	},
	{
		id: 5,
		category: 'Innovation',
		title: 'Startup incubation program applications open',
		date: 'Dec 20, 2024',
		image: '/events/img1.png?height=60&width=60'
	},
	{
		id: 6,
		category: 'Library',
		title: 'Extended library hours during exams',
		date: 'Dec 19, 2024',
		image: '/events/img2.png?height=60&width=60'
	},
	{
		id: 7,
		category: 'Innovation',
		title: 'Tech fest hackathon registration live',
		date: 'Dec 18, 2024',
		image: '/events/img1.png?height=60&width=60'
	}
];

interface ScrollingSectionProps {
	title: string;
	items: typeof notices;
	viewAllText: string;
	animationName: string;
}

function ScrollingSection({
	title,
	items,
	viewAllText,
	animationName
}: ScrollingSectionProps) {
	const [isPaused, setIsPaused] = useState(false);

	const CARD_HEIGHT = 94; // height of each card including increased margin (80px + 14px margin)
	const VISIBLE_CARDS = 4;
	const CONTAINER_HEIGHT = VISIBLE_CARDS * CARD_HEIGHT;

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between mb-8'>
				<h2 className='text-2xl md:text-3xl font-bold text-gray-600 font-sans'>
					{title}
				</h2>
				<a
					href='#'
					className='border border-blue-600 text-blue-600 hover:border-black hover:text-black px-6 py-2 rounded-lg font-semibold transition-colors bg-transparent font-sans'
					style={{ background: 'none' }}>
					{viewAllText}
				</a>
			</div>

			<div
				className='relative overflow-hidden rounded-2xl'
				style={{ height: `${CONTAINER_HEIGHT}px` }}
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}>
				<div
					style={{
						animation: `${animationName} ${
							(items.length + VISIBLE_CARDS) * 3
						}s linear infinite`,
						animationPlayState: isPaused ? 'paused' : 'running'
					}}>
					{items.map(item => (
						<div
							key={item.id}
							className='flex h-20 group cursor-pointer bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 overflow-hidden mb-[14px]'>
							{/* Left Image */}
							<div className='flex-shrink-0'>
								<div className='w-20 h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center overflow-hidden'>
									<Image
										src={item.image || '/placeholder.svg'}
										alt='Item preview'
										width={80}
										height={80}
										className='w-full h-full object-cover'
									/>
								</div>
							</div>

							{/* Content */}
							<div className='flex-1 min-w-0 flex items-center'>
								<div className='w-full p-4'>
									<div className='flex items-start justify-between gap-2'>
										<div className='flex-1'>
											<span className='inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full mb-2'>
												{item.category}
											</span>
											<h3 className='font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-green-700 transition-colors line-clamp-2'>
												{item.title}
											</h3>
											<p className='text-xs text-gray-500 flex items-center gap-1'>
												<Calendar className='w-3 h-3' />
												{item.date}
											</p>
										</div>
										<ExternalLink className='w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0 ml-2' />
									</div>
								</div>
							</div>
						</div>
					))}
					{/* Add empty space equal to container height so all cards scroll out */}
					<div style={{ height: `${CONTAINER_HEIGHT}px` }}></div>
				</div>
			</div>
		</div>
	);
}

export default function NoticesAnnouncementsScrollingSection() {
	const CARD_HEIGHT = 94;
	const NOTICES_SCROLL_DISTANCE = notices.length * CARD_HEIGHT;
	const ANNOUNCEMENTS_SCROLL_DISTANCE = announcements.length * CARD_HEIGHT;

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
				@keyframes scroll-up-notices {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-${NOTICES_SCROLL_DISTANCE}px);
					}
				}
				@keyframes scroll-up-announcements {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-${ANNOUNCEMENTS_SCROLL_DISTANCE}px);
					}
				}
				`
				}}
			/>
			<section className='py-16 px-4 md:px-6 lg:px-8 bg-gray-50'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative'>
						{/* Notices */}
						<ScrollingSection
							title='Notices'
							items={notices}
							viewAllText='View All Notices'
							animationName='scroll-up-notices'
						/>

						{/* Vertical Separator */}
						<div
							className='hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 opacity-20'
							style={{ zIndex: 1 }}></div>

						{/* Announcements */}
						<ScrollingSection
							title='Announcements'
							items={announcements}
							viewAllText='View All Announcements'
							animationName='scroll-up-announcements'
						/>
					</div>
				</div>
			</section>
		</>
	);
}
