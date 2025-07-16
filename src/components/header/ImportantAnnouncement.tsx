'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bell } from 'lucide-react';

const importantAnnouncements = [
	{
		title: 'Admission 2024-25 Session Open - Apply Now',
		href: '/admissions/apply'
	},

	{
		title: 'Placement Drive 2024 - Register Today',
		href: '/placements/register'
	},
	{
		title: 'Annual Tech Fest "INNOVATE 2024" - March 15-17',
		href: '/events/tech-fest'
	},
	{
		title: 'Library New Books Collection Available',
		href: '/library'
	},
	{
		title: 'Scholarship Applications Open - Merit & Need Based',
		href: '/admissions/scholarship'
	}
];

const ImportantAnnouncement = () => {
	const desktopLabelRef = useRef<HTMLDivElement>(null);
	const mobileLabelRef = useRef<HTMLDivElement>(null);

	const desktopContainerRef = useRef<HTMLDivElement>(null);
	const desktopAnnouncementsRef = useRef<HTMLDivElement>(null);
	const [desktopAnimation, setDesktopAnimation] = useState({
		duration: 100,
		from: '100%',
		to: '-100%'
	});

	const mobileContainerRef = useRef<HTMLDivElement>(null);
	const mobileAnnouncementsRef = useRef<HTMLDivElement>(null);
	const [mobileAnimation, setMobileAnimation] = useState({
		duration: 100,
		from: '100%',
		to: '-100%'
	});

	const [isHovering, setIsHovering] = useState(false);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		const calculateAnimation = (
			containerRef: React.RefObject<HTMLDivElement | null>,
			announcementsRef: React.RefObject<HTMLDivElement | null>,
			labelRef: React.RefObject<HTMLDivElement | null>
		) => {
			if (
				containerRef.current &&
				announcementsRef.current &&
				labelRef.current
			) {
				const containerWidth = containerRef.current.offsetWidth;
				const announcementsWidth = announcementsRef.current.offsetWidth;
				const labelWidth = labelRef.current.offsetWidth;

				if (announcementsWidth > 0) {
					const totalDistance =
						containerWidth + announcementsWidth + labelWidth;
					const speed = 100; // pixels per second
					const newDuration = totalDistance / speed;

					return {
						duration: newDuration,
						from: `${containerWidth}px`,
						to: `-${announcementsWidth + labelWidth}px`
					};
				}
			}
			return null;
		};

		const setupAnimations = () => {
			if (!isClient) return;

			const desktopAnim = calculateAnimation(
				desktopContainerRef,
				desktopAnnouncementsRef,
				desktopLabelRef
			);
			if (desktopAnim) setDesktopAnimation(desktopAnim);

			const mobileAnim = calculateAnimation(
				mobileContainerRef,
				mobileAnnouncementsRef,
				mobileLabelRef
			);
			if (mobileAnim) setMobileAnimation(mobileAnim);
		};

		setupAnimations();
		window.addEventListener('resize', setupAnimations);
		return () => window.removeEventListener('resize', setupAnimations);
	}, [isClient]);

	const desktopKeyframes = `
    @keyframes scrollDesktop {
      from { transform: translateX(${desktopAnimation.from}); }
      to { transform: translateX(${desktopAnimation.to}); }
    }
  `;

	const mobileKeyframes = `
    @keyframes scrollMobile {
      from { transform: translateX(${mobileAnimation.from}); }
      to { transform: translateX(${mobileAnimation.to}); }
    }
  `;

	return (
		<>
			{isClient && (
				<style>
					{desktopKeyframes}
					{mobileKeyframes}
					{`.animation-paused { animation-play-state: paused !important; }`}
				</style>
			)}
			{/* Desktop Announcements Bar */}
			<motion.div
				className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 lg:py-3 overflow-hidden relative hidden md:block'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}>
				<div className='flex items-center'>
					<div
						ref={desktopLabelRef}
						className='flex-shrink-0 px-4 lg:px-6 font-semibold text-sm border-r border-blue-400'>
						<span className='flex items-center gap-2'>
							<Bell className='w-4 h-4' />
							<span className='hidden lg:inline'>Important Announcements:</span>
							<span className='lg:hidden'>News:</span>
						</span>
					</div>
					<div className='flex-1 overflow-hidden' ref={desktopContainerRef}>
						<div
							ref={desktopAnnouncementsRef}
							className={`flex items-center whitespace-nowrap ${
								isHovering ? 'animation-paused' : ''
							}`}
							style={
								isClient
									? {
											animation: `scrollDesktop ${desktopAnimation.duration}s linear infinite`
									  }
									: {}
							}>
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={index}
									href={announcement.href}
									className='text-sm lg:text-base hover:text-yellow-300 transition-colors duration-200 mx-6 lg:mx-8 flex-shrink-0'>
									{announcement.title}
								</Link>
							))}
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={`desktop-clone-${index}`}
									href={announcement.href}
									aria-hidden='true'
									className='text-sm lg:text-base hover:text-yellow-300 transition-colors duration-200 mx-6 lg:mx-8 flex-shrink-0'>
									{announcement.title}
								</Link>
							))}
						</div>
					</div>
				</div>
			</motion.div>

			{/* Mobile Announcements Bar */}
			<motion.div
				className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 sm:py-3 overflow-hidden relative md:hidden'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}>
				<div className='flex items-center'>
					<div
						ref={mobileLabelRef}
						className='flex-shrink-0 px-3 sm:px-4 font-semibold text-xs sm:text-sm border-r border-blue-400'>
						<span className='flex items-center gap-1 sm:gap-2'>
							<Bell className='w-3 h-3 sm:w-4 sm:h-4' />
							<span className='hidden sm:inline'>News:</span>
							<span className='sm:hidden'>📢</span>
						</span>
					</div>
					<div className='flex-1 overflow-hidden' ref={mobileContainerRef}>
						<div
							ref={mobileAnnouncementsRef}
							className={`flex items-center whitespace-nowrap ${
								isHovering ? 'animation-paused' : ''
							}`}
							style={
								isClient
									? {
											animation: `scrollMobile ${mobileAnimation.duration}s linear infinite`
									  }
									: {}
							}>
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={index}
									href={announcement.href}
									className='text-xs sm:text-sm hover:text-yellow-300 transition-colors duration-200 mx-4 sm:mx-6 flex-shrink-0 py-1'>
									{announcement.title}
								</Link>
							))}
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={`mobile-clone-${index}`}
									href={announcement.href}
									aria-hidden='true'
									className='text-xs sm:text-sm hover:text-yellow-300 transition-colors duration-200 mx-4 sm:mx-6 flex-shrink-0 py-1'>
									{announcement.title}
								</Link>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default ImportantAnnouncement;
