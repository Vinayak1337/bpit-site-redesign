'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	BookOpen,
	GraduationCap,
	Award,
	ChevronLeft,
	ChevronRight,
	X,
	Eye
} from 'lucide-react';
import type { CalendarEventItem } from '@/app/(Private Pages)/actions/academia-academic-calendar';

type EventType = CalendarEventItem['type'];

type Props = { events: CalendarEventItem[] };

export default function CalendarEvents({ events }: Props) {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedFilter, setSelectedFilter] = useState<EventType | 'all'>(
		'all'
	);
	const [selectedEvent, setSelectedEvent] = useState<CalendarEventItem | null>(
		null
	);
	const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month');

	const eventTypeColors = {
		exam: {
			bg: 'bg-red-50',
			border: 'border-red-200',
			text: 'text-red-700',
			icon: 'bg-red-100',
			dot: 'bg-red-500',
			badge: 'bg-red-100 text-red-800'
		},
		holiday: {
			bg: 'bg-emerald-50',
			border: 'border-emerald-200',
			text: 'text-emerald-700',
			icon: 'bg-emerald-100',
			dot: 'bg-emerald-500',
			badge: 'bg-emerald-100 text-emerald-800'
		},
		academic: {
			bg: 'bg-blue-50',
			border: 'border-blue-200',
			text: 'text-blue-700',
			icon: 'bg-blue-100',
			dot: 'bg-blue-500',
			badge: 'bg-blue-100 text-blue-800'
		},
		orientation: {
			bg: 'bg-purple-50',
			border: 'border-purple-200',
			text: 'text-purple-700',
			icon: 'bg-purple-100',
			dot: 'bg-purple-500',
			badge: 'bg-purple-100 text-purple-800'
		},
		fest: {
			bg: 'bg-amber-50',
			border: 'border-amber-200',
			text: 'text-amber-700',
			icon: 'bg-amber-100',
			dot: 'bg-amber-500',
			badge: 'bg-amber-100 text-amber-800'
		}
	} as const;

	const eventTypeIcons: Record<EventType, React.ReactNode> = {
		exam: <BookOpen className='w-5 h-5' />,
		holiday: <Calendar className='w-5 h-5' />,
		academic: <GraduationCap className='w-5 h-5' />,
		orientation: <Users className='w-5 h-5' />,
		fest: <Award className='w-5 h-5' />
	};

	const filteredEvents =
		selectedFilter === 'all'
			? events
			: events.filter(event => event.type === selectedFilter);

	const getDaysInMonth = (date: Date) =>
		new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

	const getFirstDayOfMonth = (date: Date) =>
		new Date(date.getFullYear(), date.getMonth(), 1).getDay();

	const getEventsForDate = (date: Date) =>
		filteredEvents.filter(event => {
			const eventDate = new Date(event.date);
			const eventEnd = event.endDate ? new Date(event.endDate) : eventDate;
			return date >= eventDate && date <= eventEnd;
		});

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const navigateMonth = (direction: 'prev' | 'next') => {
		setCurrentDate(prev => {
			const newDate = new Date(prev);
			if (direction === 'prev') {
				newDate.setMonth(newDate.getMonth() - 1);
			} else {
				newDate.setMonth(newDate.getMonth() + 1);
			}
			return newDate;
		});
	};

	const renderCalendarGrid = () => {
		const daysInMonth = getDaysInMonth(currentDate);
		const firstDay = getFirstDayOfMonth(currentDate);
		const days: React.ReactNode[] = [];

		for (let i = 0; i < firstDay; i++) {
			days.push(
				<div
					key={`empty-${i}`}
					className='h-24 border border-gray-100 bg-gray-50/50'></div>
			);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				day
			);
			const dayEvents = getEventsForDate(date);
			const isToday = new Date().toDateString() === date.toDateString();

			days.push(
				<motion.div
					key={day}
					whileHover={{ scale: 1.02 }}
					className={`h-24 border border-gray-100 p-2 cursor-pointer transition-all duration-200 hover:bg-blue-50 relative overflow-hidden ${
						isToday
							? 'bg-blue-50 border-blue-300'
							: 'bg-white hover:shadow-sm'
					}`}>
					<div
						className={`text-sm font-medium mb-1 ${
							isToday ? 'text-blue-600' : 'text-gray-700'
						}`}>
						{day}
						{isToday && (
							<span className='ml-1 w-2 h-2 bg-blue-600 rounded-full inline-block'></span>
						)}
					</div>

					<div className='space-y-1'>
						{dayEvents.slice(0, 2).map((event, idx) => (
							<motion.div
								key={event.id}
								initial={{ opacity: 0, y: 5 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.1 }}
								onClick={e => {
									e.stopPropagation();
									setSelectedEvent(event);
								}}
								className={`text-xs px-2 py-1 rounded-md cursor-pointer hover:opacity-80 transition-opacity ${
									eventTypeColors[event.type].badge
								} truncate`}>
								{event.title}
							</motion.div>
						))}

						{dayEvents.length > 2 && (
							<div className='text-xs text-gray-500 px-2'>
								+{dayEvents.length - 2} more
							</div>
						)}
					</div>
				</motion.div>
			);
		}

		return days;
	};

	const filterButtons = [
		{
			key: 'all',
			label: 'All Events',
			count: events.length,
			color: 'bg-gray-100 text-gray-800'
		},
		{
			key: 'exam',
			label: 'Exams',
			count: events.filter(e => e.type === 'exam').length,
			color: 'bg-red-100 text-red-800'
		},
		{
			key: 'academic',
			label: 'Academic',
			count: events.filter(e => e.type === 'academic').length,
			color: 'bg-blue-100 text-blue-800'
		},
		{
			key: 'orientation',
			label: 'Orientation',
			count: events.filter(e => e.type === 'orientation').length,
			color: 'bg-purple-100 text-purple-800'
		},
		{
			key: 'fest',
			label: 'Events',
			count: events.filter(e => e.type === 'fest').length,
			color: 'bg-amber-100 text-amber-800'
		},
		{
			key: 'holiday',
			label: 'Holidays',
			count: events.filter(e => e.type === 'holiday').length,
			color: 'bg-emerald-100 text-emerald-800'
		}
	];

	const formatDate = (dateString: string, endDate?: string) => {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		if (endDate) {
			const end = new Date(endDate);
			return `${date.toLocaleDateString(
				'en-US',
				options
			)} - ${end.toLocaleDateString('en-US', options)}`;
		}

		return date.toLocaleDateString('en-US', options);
	};

	return (
		<motion.div
			className='space-y-6'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}>
			{/* View Toggle */}
			<motion.div
				className='flex items-center gap-2 justify-end'
				initial={{ x: 50, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.5 }}>
				<div className='bg-gray-100 rounded-lg p-1 flex'>
					<button
						onClick={() => setViewMode('month')}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
							viewMode === 'month'
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						}`}>
						<Calendar className='w-4 h-4 mr-2 inline' />
						Calendar
					</button>
					<button
						onClick={() => setViewMode('agenda')}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
							viewMode === 'agenda'
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						}`}>
						<Eye className='w-4 h-4 mr-2 inline' />
						Agenda
					</button>
				</div>
			</motion.div>

			{/* Filter Buttons */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.6 }}
				className='flex flex-wrap gap-2'>
				{filterButtons.map(filter => (
					<button
						key={filter.key}
						onClick={() =>
							setSelectedFilter(filter.key as EventType | 'all')
						}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
							selectedFilter === filter.key
								? `${filter.color} shadow-md scale-105`
								: 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
						}`}>
						{filter.label}
						<span
							className={`text-xs px-2 py-0.5 rounded-full ${
								selectedFilter === filter.key
									? 'bg-white/30'
									: 'bg-gray-100'
							}`}>
							{filter.count}
						</span>
					</button>
				))}
			</motion.div>

			{viewMode === 'month' ? (
				<>
					{/* Calendar Navigation */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4'>
						<button
							onClick={() => navigateMonth('prev')}
							className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
							<ChevronLeft className='w-5 h-5 text-gray-600' />
						</button>

						<h2 className='text-xl font-bold text-gray-900'>
							{monthNames[currentDate.getMonth()]}{' '}
							{currentDate.getFullYear()}
						</h2>

						<button
							onClick={() => navigateMonth('next')}
							className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
							<ChevronRight className='w-5 h-5 text-gray-600' />
						</button>
					</motion.div>

					{/* Calendar Grid */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
						<div className='grid grid-cols-7 bg-gray-50'>
							{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
								<div
									key={day}
									className='p-4 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0'>
									{day}
								</div>
							))}
						</div>

						<div className='grid grid-cols-7'>{renderCalendarGrid()}</div>
					</motion.div>
				</>
			) : (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='space-y-4'>
					{filteredEvents
						.slice()
						.sort(
							(a, b) =>
								new Date(a.date).getTime() - new Date(b.date).getTime()
						)
						.map((event, index) => {
							const colorScheme = eventTypeColors[event.type];
							const icon = eventTypeIcons[event.type];

							return (
								<motion.div
									key={event.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: index * 0.05 }}
									onClick={() => setSelectedEvent(event)}
									className={`${colorScheme.bg} ${colorScheme.border} border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}>
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center gap-3'>
											<div
												className={`p-2 ${colorScheme.icon} rounded-lg ${colorScheme.text}`}>
												{icon}
											</div>
											<div>
												<h3
													className={`text-lg font-semibold ${colorScheme.text}`}>
													{event.title}
												</h3>
												<p
													className={`text-sm ${colorScheme.text} opacity-80`}>
													{formatDate(event.date, event.endDate || undefined)}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-2'>
											{event.priority === 'high' && (
												<span className='bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium'>
													High Priority
												</span>
											)}
											<span
												className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${colorScheme.badge}`}>
												{event.type}
											</span>
										</div>
									</div>

									<p className={`text-sm ${colorScheme.text} mb-3`}>
										{event.description}
									</p>

									{(event.time || event.location) && (
										<div className='flex flex-wrap gap-4 text-xs'>
											{event.time && (
												<div className='flex items-center gap-1'>
													<Clock
														className={`w-3 h-3 ${colorScheme.text}`}
													/>
													<span className={colorScheme.text}>
														{event.time}
													</span>
												</div>
											)}
											{event.location && (
												<div className='flex items-center gap-1'>
													<MapPin
														className={`w-3 h-3 ${colorScheme.text}`}
													/>
													<span className={colorScheme.text}>
														{event.location}
													</span>
												</div>
											)}
										</div>
									)}
								</motion.div>
							);
						})}
				</motion.div>
			)}

			{/* Event Detail Modal */}
			<AnimatePresence>
				{selectedEvent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
						onClick={() => setSelectedEvent(null)}>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							onClick={e => e.stopPropagation()}
							className='bg-white rounded-2xl shadow-xl max-w-md w-full p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center gap-3'>
									<div
										className={`p-3 ${
											eventTypeColors[selectedEvent.type].icon
										} rounded-lg ${
											eventTypeColors[selectedEvent.type].text
										}`}>
										{eventTypeIcons[selectedEvent.type]}
									</div>
									<div>
										<h3 className='text-xl font-bold text-gray-900'>
											{selectedEvent.title}
										</h3>
										<span
											className={`text-xs px-3 py-1 rounded-full ${
												eventTypeColors[selectedEvent.type].badge
											} capitalize`}>
											{selectedEvent.type}
										</span>
									</div>
								</div>

								<button
									onClick={() => setSelectedEvent(null)}
									className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
									<X className='w-5 h-5 text-gray-500' />
								</button>
							</div>

							<p className='text-gray-700 mb-6'>
								{selectedEvent.description}
							</p>

							<div className='space-y-3'>
								<div className='flex items-center gap-3'>
									<Calendar className='w-4 h-4 text-gray-500' />
									<span className='text-sm text-gray-700'>
										{formatDate(
											selectedEvent.date,
											selectedEvent.endDate || undefined
										)}
									</span>
								</div>

								{selectedEvent.time && (
									<div className='flex items-center gap-3'>
										<Clock className='w-4 h-4 text-gray-500' />
										<span className='text-sm text-gray-700'>
											{selectedEvent.time}
										</span>
									</div>
								)}

								{selectedEvent.location && (
									<div className='flex items-center gap-3'>
										<MapPin className='w-4 h-4 text-gray-500' />
										<span className='text-sm text-gray-700'>
											{selectedEvent.location}
										</span>
									</div>
								)}

								{selectedEvent.semester && (
									<div className='flex items-center gap-3'>
										<GraduationCap className='w-4 h-4 text-gray-500' />
										<span className='text-sm text-gray-700'>
											{selectedEvent.semester}
										</span>
									</div>
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
