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
		title: 'Semester End Examinations Schedule Released',
		href: '/academics/examination'
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
		href: '/academics/library'
	},
	{
		title: 'Scholarship Applications Open - Merit & Need Based',
		href: '/admissions/scholarships'
	}
];

const ImportantAnnouncement = () => {
	const desktopLabelRef = useRef<HTMLDivElement>(null);
	const mobileLabelRef = useRef<HTMLDivElement>(null);

	type AnimationState = {
		duration: number;
		animateX: (string | number)[];
	};

	const desktopContainerRef = useRef<HTMLDivElement>(null);
	const desktopAnnouncementsRef = useRef<HTMLDivElement>(null);
	const [desktopAnimation, setDesktopAnimation] = useState<AnimationState>({
		duration: 20,
		animateX: ['100%', '-120%']
	});

	const mobileContainerRef = useRef<HTMLDivElement>(null);
	const mobileAnnouncementsRef = useRef<HTMLDivElement>(null);
	const [mobileAnimation, setMobileAnimation] = useState<AnimationState>({
		duration: 20,
		animateX: ['100%', '-120%']
	});

	useEffect(() => {
		const calculateAnimation = (
			containerRef: React.RefObject<HTMLDivElement | null>,
			announcementsRef: React.RefObject<HTMLDivElement | null>,
			labelRef: React.RefObject<HTMLDivElement | null>,
			setAnimation: React.Dispatch<React.SetStateAction<AnimationState>>
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
					const speed = 180; // pixels per second
					const newDuration = totalDistance / speed;

					setAnimation({
						duration: newDuration,
						animateX: [containerWidth, -(1.6 * announcementsWidth + labelWidth)]
					});
				}
			}
		};

		const setupAnimations = () => {
			calculateAnimation(
				desktopContainerRef,
				desktopAnnouncementsRef,
				desktopLabelRef,
				setDesktopAnimation
			);
			calculateAnimation(
				mobileContainerRef,
				mobileAnnouncementsRef,
				mobileLabelRef,
				setMobileAnimation
			);
		};

		setupAnimations();

		window.addEventListener('resize', setupAnimations);
		return () => window.removeEventListener('resize', setupAnimations);
	}, []);

	return (
		<>
			{/* Desktop Announcements Bar */}
			<motion.div
				className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 overflow-hidden relative hidden md:block'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				<div className='flex items-center'>
					<div
						ref={desktopLabelRef}
						className='flex-shrink-0 px-4 font-semibold text-sm border-r border-blue-400'>
						<span className='flex items-center gap-2'>
							<Bell className='w-4 h-4' />
							Important Announcements:
						</span>
					</div>
					<div className='flex-1 overflow-hidden' ref={desktopContainerRef}>
						<motion.div
							ref={desktopAnnouncementsRef}
							className='flex items-center whitespace-nowrap'
							animate={{
								x: desktopAnimation.animateX
							}}
							transition={{
								repeat: Infinity,
								repeatType: 'loop',
								duration: desktopAnimation.duration,
								ease: 'linear'
							}}>
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={index}
									href={announcement.href}
									className='text-sm hover:text-yellow-300 transition-colors duration-200 mx-8 flex-shrink-0'>
									{announcement.title}
								</Link>
							))}
						</motion.div>
					</div>
				</div>
			</motion.div>

			{/* Mobile Announcements Bar */}
			<motion.div
				className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 overflow-hidden relative md:hidden'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				<div className='flex items-center'>
					<div
						ref={mobileLabelRef}
						className='flex-shrink-0 px-3 font-semibold text-xs border-r border-blue-400'>
						<span className='flex items-center gap-1'>
							<Bell className='w-3 h-3' />
							News:
						</span>
					</div>
					<div className='flex-1 overflow-hidden' ref={mobileContainerRef}>
						<motion.div
							ref={mobileAnnouncementsRef}
							className='flex items-center whitespace-nowrap'
							animate={{
								x: mobileAnimation.animateX
							}}
							transition={{
								repeat: Infinity,
								repeatType: 'loop',
								duration: mobileAnimation.duration,
								ease: 'linear'
							}}>
							{importantAnnouncements.map((announcement, index) => (
								<Link
									key={index}
									href={announcement.href}
									className='text-xs hover:text-yellow-300 transition-colors duration-200 mx-6 flex-shrink-0'>
									{announcement.title}
								</Link>
							))}
						</motion.div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default ImportantAnnouncement;
