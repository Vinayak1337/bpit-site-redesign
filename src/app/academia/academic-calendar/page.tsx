'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, BookOpen, GraduationCap, Award, ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

type EventType = 'exam' | 'holiday' | 'academic' | 'orientation' | 'fest';

interface CalendarEvent {
	id: number;
	title: string;
	description: string;
	date: string;
	endDate?: string;
	time?: string;
	location?: string;
	type: EventType;
	semester?: string;
	department?: string;
	priority: 'high' | 'medium' | 'low';
}

export default function AcademicCalendarPage() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedFilter, setSelectedFilter] = useState<EventType | 'all'>('all');
	const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
	const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month');

	const events: CalendarEvent[] = [
		// Winter Break & New Year
		{
			id: 1,
			title: "Winter Break",
			description: "Winter vacation for all students and faculty",
			date: "2025-01-01",
			endDate: "2025-01-07",
			type: "holiday",
			priority: "low"
		},
		{
			id: 2,
			title: "Classes Resume",
			description: "Regular classes resume after winter break",
			date: "2025-01-08",
			time: "9:00 AM",
			location: "All Departments",
			type: "academic",
			semester: "All Semesters",
			priority: "high"
		},
		{
			id: 3,
			title: "Mid-Semester Exams",
			description: "Mid-semester examinations for all undergraduate programs",
			date: "2025-01-15",
			endDate: "2025-01-25",
			time: "9:00 AM",
			location: "Examination Halls",
			type: "exam",
			semester: "All Semesters",
			priority: "high"
		},
		{
			id: 4,
			title: "Spring Semester Registration",
			description: "Course registration for Spring semester 2025",
			date: "2025-01-20",
			endDate: "2025-01-22",
			time: "9:00 AM - 5:00 PM",
			location: "Academic Office",
			type: "academic",
			semester: "All Semesters",
			priority: "high"
		},
		{
			id: 5,
			title: "Republic Day",
			description: "National holiday - Republic Day celebration",
			date: "2025-01-26",
			type: "holiday",
			priority: "medium"
		},
		{
			id: 6,
			title: "Industry Lecture Series",
			description: "Guest lectures by industry experts and professionals",
			date: "2025-02-05",
			endDate: "2025-02-07",
			time: "2:00 PM - 4:00 PM",
			location: "Main Auditorium",
			type: "academic",
			priority: "medium"
		},
		{
			id: 7,
			title: "TECHNOVANZA 2025",
			description: "Annual technical festival with competitions, workshops, and tech talks",
			date: "2025-02-10",
			endDate: "2025-02-12",
			time: "10:00 AM - 6:00 PM",
			location: "Campus Wide",
			type: "fest",
			priority: "medium"
		},
		{
			id: 8,
			title: "Fresher's Welcome Program",
			description: "Welcome program for newly admitted students",
			date: "2025-02-15",
			endDate: "2025-02-16",
			time: "10:00 AM - 4:00 PM",
			location: "Main Auditorium",
			type: "orientation",
			semester: "1st Semester",
			priority: "high"
		},
		{
			id: 9,
			title: "Project Presentation Week",
			description: "Final year project presentations and evaluations",
			date: "2025-02-20",
			endDate: "2025-02-24",
			time: "9:00 AM - 5:00 PM",
			location: "Various Labs",
			type: "academic",
			semester: "Final Year",
			priority: "high"
		},
		{
			id: 10,
			title: "Annual Sports Day",
			description: "Inter-department sports competitions and cultural activities",
			date: "2025-02-28",
			time: "8:00 AM - 6:00 PM",
			location: "Sports Complex",
			type: "fest",
			priority: "medium"
		},
		{
			id: 11,
			title: "Holi Festival",
			description: "Festival of colors - campus celebration",
			date: "2025-03-14",
			type: "holiday",
			priority: "low"
		},
		{
			id: 12,
			title: "End-Semester Examinations",
			description: "Final examinations for Spring semester 2025",
			date: "2025-03-15",
			endDate: "2025-03-30",
			time: "9:00 AM - 12:00 PM",
			location: "Examination Halls",
			type: "exam",
			semester: "All Semesters",
			priority: "high"
		},
		{
			id: 13,
			title: "Spring Break",
			description: "Spring vacation after semester examinations",
			date: "2025-04-01",
			endDate: "2025-04-15",
			type: "holiday",
			priority: "low"
		},
		{
			id: 14,
			title: "Summer Semester Registration",
			description: "Registration for summer courses and supplementary exams",
			date: "2025-04-16",
			endDate: "2025-04-18",
			time: "9:00 AM - 4:00 PM",
			location: "Academic Office",
			type: "academic",
			priority: "medium"
		},
		{
			id: 15,
			title: "Summer Semester Classes Begin",
			description: "Commencement of summer semester courses",
			date: "2025-04-20",
			time: "9:00 AM",
			location: "All Departments",
			type: "academic",
			semester: "Summer Semester",
			priority: "high"
		},
		{
			id: 16,
			title: "Labour Day",
			description: "International Workers' Day - Holiday",
			date: "2025-05-01",
			type: "holiday",
			priority: "low"
		},
		{
			id: 17,
			title: "Mid-Summer Assessments",
			description: "Mid-term assessments for summer semester",
			date: "2025-05-15",
			endDate: "2025-05-20",
			time: "9:00 AM",
			location: "Examination Halls",
			type: "exam",
			semester: "Summer Semester",
			priority: "high"
		},
		{
			id: 18,
			title: "Industry Internship Program",
			description: "Summer internship program with industry partners",
			date: "2025-05-25",
			endDate: "2025-07-25",
			type: "academic",
			semester: "Pre-final Year",
			priority: "medium"
		},
		{
			id: 19,
			title: "Summer Semester End Exams",
			description: "Final examinations for summer semester",
			date: "2025-06-10",
			endDate: "2025-06-20",
			time: "9:00 AM",
			location: "Examination Halls",
			type: "exam",
			semester: "Summer Semester",
			priority: "high"
		},
		{
			id: 20,
			title: "Summer Break",
			description: "Summer vacation for students and faculty",
			date: "2025-06-21",
			endDate: "2025-07-15",
			type: "holiday",
			priority: "low"
		},
		{
			id: 21,
			title: "Faculty Development Program",
			description: "Professional development workshops for faculty",
			date: "2025-07-01",
			endDate: "2025-07-10",
			time: "9:00 AM - 4:00 PM",
			location: "Conference Hall",
			type: "academic",
			priority: "medium"
		},
		{
			id: 22,
			title: "New Academic Year 2025-26",
			description: "Commencement of new academic year 2025-26",
			date: "2025-07-16",
			time: "9:00 AM",
			location: "Main Auditorium",
			type: "academic",
			semester: "All Semesters",
			priority: "high"
		},
		{
			id: 23,
			title: "Freshman Orientation Week",
			description: "Orientation program for newly admitted students",
			date: "2025-07-20",
			endDate: "2025-07-26",
			time: "9:00 AM - 5:00 PM",
			location: "Various Venues",
			type: "orientation",
			semester: "1st Semester",
			priority: "high"
		},
		{
			id: 24,
			title: "Independence Day",
			description: "National holiday - Independence Day celebration",
			date: "2025-08-15",
			time: "8:00 AM",
			location: "Main Campus",
			type: "holiday",
			priority: "medium"
		},
		{
			id: 25,
			title: "Mid-Semester Tests",
			description: "Mid-semester examinations for Fall semester",
			date: "2025-09-15",
			endDate: "2025-09-25",
			time: "9:00 AM",
			location: "Examination Halls",
			type: "exam",
			semester: "All Semesters",
			priority: "high"
		},
		{
			id: 26,
			title: "Ganesh Chaturthi",
			description: "Festival celebration on campus",
			date: "2025-08-29",
			type: "holiday",
			priority: "low"
		},
		{
			id: 27,
			title: "Gandhi Jayanti",
			description: "Mahatma Gandhi's birth anniversary",
			date: "2025-10-02",
			type: "holiday",
			priority: "medium"
		},
		{
			id: 28,
			title: "Diwali Celebration",
			description: "Festival of lights celebration",
			date: "2025-10-20",
			endDate: "2025-10-24",
			type: "holiday",
			priority: "low"
		},
		{
			id: 29,
			title: "Fall Semester End Exams",
			description: "Final examinations for Fall semester 2025",
			date: "2025-11-20",
			endDate: "2025-12-15",
			time: "9:00 AM",
			location: "Examination Halls",
			type: "exam",
			semester: "All Semesters",
			priority: "high"
		},
		{
			id: 30,
			title: "Annual Cultural Fest",
			description: "Inter-college cultural festival and competitions",
			date: "2025-11-05",
			endDate: "2025-11-07",
			time: "10:00 AM - 8:00 PM",
			location: "Campus Wide",
			type: "fest",
			priority: "medium"
		},
		{
			id: 31,
			title: "Christmas Holiday",
			description: "Christmas and New Year break",
			date: "2025-12-24",
			endDate: "2025-12-31",
			type: "holiday",
			priority: "low"
		},
		{
			id: 32,
			title: "Convocation Ceremony",
			description: "Annual graduation ceremony for outgoing students",
			date: "2025-12-20",
			time: "10:00 AM",
			location: "Main Auditorium",
			type: "academic",
			semester: "Final Year",
			priority: "high"
		}
	];

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
	};

	const eventTypeIcons = {
		exam: <BookOpen className="w-5 h-5" />,
		holiday: <Calendar className="w-5 h-5" />,
		academic: <GraduationCap className="w-5 h-5" />,
		orientation: <Users className="w-5 h-5" />,
		fest: <Award className="w-5 h-5" />
	};

	const filteredEvents = selectedFilter === 'all' 
		? events 
		: events.filter(event => event.type === selectedFilter);

	// Calendar helpers
	const getDaysInMonth = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	};

	const getEventsForDate = (date: Date) => {
		return filteredEvents.filter(event => {
			const eventDate = new Date(event.date);
			const eventEnd = event.endDate ? new Date(event.endDate) : eventDate;
			
			return date >= eventDate && date <= eventEnd;
		});
	};

	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
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
		const days = [];

		// Empty cells for days before the first day of the month
		for (let i = 0; i < firstDay; i++) {
			days.push(
				<div key={`empty-${i}`} className="h-24 border border-gray-100 bg-gray-50/50"></div>
			);
		}

		// Days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
			const dayEvents = getEventsForDate(date);
			const isToday = new Date().toDateString() === date.toDateString();

			days.push(
				<motion.div
					key={day}
					whileHover={{ scale: 1.02 }}
					className={`h-24 border border-gray-100 p-2 cursor-pointer transition-all duration-200 hover:bg-blue-50 relative overflow-hidden ${
						isToday ? 'bg-blue-50 border-blue-300' : 'bg-white hover:shadow-sm'
					}`}
				>
					<div className={`text-sm font-medium mb-1 ${
						isToday ? 'text-blue-600' : 'text-gray-700'
					}`}>
						{day}
						{isToday && (
							<span className="ml-1 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
						)}
					</div>
					
					{/* Event indicators */}
					<div className="space-y-1">
						{dayEvents.slice(0, 2).map((event, idx) => (
							<motion.div
								key={event.id}
								initial={{ opacity: 0, y: 5 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.1 }}
								onClick={(e) => {
									e.stopPropagation();
									setSelectedEvent(event);
								}}
								className={`text-xs px-2 py-1 rounded-md cursor-pointer hover:opacity-80 transition-opacity ${
									eventTypeColors[event.type].badge
								} truncate`}
							>
								{event.title}
							</motion.div>
						))}
						
						{dayEvents.length > 2 && (
							<div className="text-xs text-gray-500 px-2">
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
		{ key: 'all', label: 'All Events', count: events.length, color: 'bg-gray-100 text-gray-800' },
		{ key: 'exam', label: 'Exams', count: events.filter(e => e.type === 'exam').length, color: 'bg-red-100 text-red-800' },
		{ key: 'academic', label: 'Academic', count: events.filter(e => e.type === 'academic').length, color: 'bg-blue-100 text-blue-800' },
		{ key: 'orientation', label: 'Orientation', count: events.filter(e => e.type === 'orientation').length, color: 'bg-purple-100 text-purple-800' },
		{ key: 'fest', label: 'Events', count: events.filter(e => e.type === 'fest').length, color: 'bg-amber-100 text-amber-800' },
		{ key: 'holiday', label: 'Holidays', count: events.filter(e => e.type === 'holiday').length, color: 'bg-emerald-100 text-emerald-800' }
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
			return `${date.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
		}
		
		return date.toLocaleDateString('en-US', options);
	};

	return (
		<motion.div 
			className="space-y-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.1 }}
				className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
			>
				<motion.div 
					className="mb-4 lg:mb-0"
					initial={{ x: -50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<motion.h1 
						className="text-3xl font-bold text-gray-900 mb-2"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						Academic Calendar 2025-26
					</motion.h1>
					<motion.p 
						className="text-gray-600"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						Complete academic year calendar with examinations, holidays, festivals, and important events
					</motion.p>
				</motion.div>
				
				{/* View Toggle */}
				<motion.div 
					className="flex items-center gap-2"
					initial={{ x: 50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.5 }}
				>
					<div className="bg-gray-100 rounded-lg p-1 flex">
						<button
							onClick={() => setViewMode('month')}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								viewMode === 'month' 
									? 'bg-white text-gray-900 shadow-sm' 
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							<Calendar className="w-4 h-4 mr-2 inline" />
							Calendar
						</button>
						<button
							onClick={() => setViewMode('agenda')}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								viewMode === 'agenda' 
									? 'bg-white text-gray-900 shadow-sm' 
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							<Eye className="w-4 h-4 mr-2 inline" />
							Agenda
						</button>
					</div>
				</motion.div>
			</motion.div>

			{/* Filter Buttons */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.6 }}
				className="flex flex-wrap gap-2"
			>
				{filterButtons.map((filter) => (
					<button
						key={filter.key}
						onClick={() => setSelectedFilter(filter.key as EventType | 'all')}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
							selectedFilter === filter.key 
								? `${filter.color} shadow-md scale-105` 
								: 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
						}`}
					>
						{filter.label}
						<span className={`text-xs px-2 py-0.5 rounded-full ${
							selectedFilter === filter.key ? 'bg-white/30' : 'bg-gray-100'
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
						className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4"
					>
						<button
							onClick={() => navigateMonth('prev')}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<ChevronLeft className="w-5 h-5 text-gray-600" />
						</button>
						
						<h2 className="text-xl font-bold text-gray-900">
							{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
						</h2>
						
						<button
							onClick={() => navigateMonth('next')}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<ChevronRight className="w-5 h-5 text-gray-600" />
						</button>
					</motion.div>

					{/* Calendar Grid */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
					>
						{/* Day Headers */}
						<div className="grid grid-cols-7 bg-gray-50">
							{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
								<div key={day} className="p-4 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
									{day}
								</div>
							))}
						</div>
						
						{/* Calendar Days */}
						<div className="grid grid-cols-7">
							{renderCalendarGrid()}
						</div>
					</motion.div>
				</>
			) : (
				/* Agenda View */
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="space-y-4"
				>
					{filteredEvents
						.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
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
									className={`${colorScheme.bg} ${colorScheme.border} border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
								>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className={`p-2 ${colorScheme.icon} rounded-lg ${colorScheme.text}`}>
												{icon}
											</div>
											<div>
												<h3 className={`text-lg font-semibold ${colorScheme.text}`}>
													{event.title}
												</h3>
												<p className={`text-sm ${colorScheme.text} opacity-80`}>
													{formatDate(event.date, event.endDate)}
												</p>
											</div>
										</div>
										
										<div className="flex items-center gap-2">
											{event.priority === 'high' && (
												<span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
													High Priority
												</span>
											)}
											<span className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${colorScheme.badge}`}>
												{event.type}
											</span>
										</div>
									</div>
									
									<p className={`text-sm ${colorScheme.text} mb-3`}>
										{event.description}
									</p>
									
									{(event.time || event.location) && (
										<div className="flex flex-wrap gap-4 text-xs">
											{event.time && (
												<div className="flex items-center gap-1">
													<Clock className={`w-3 h-3 ${colorScheme.text}`} />
													<span className={colorScheme.text}>{event.time}</span>
												</div>
											)}
											{event.location && (
												<div className="flex items-center gap-1">
													<MapPin className={`w-3 h-3 ${colorScheme.text}`} />
													<span className={colorScheme.text}>{event.location}</span>
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
						className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
						onClick={() => setSelectedEvent(null)}
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
							className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-3">
									<div className={`p-3 ${eventTypeColors[selectedEvent.type].icon} rounded-lg ${eventTypeColors[selectedEvent.type].text}`}>
										{eventTypeIcons[selectedEvent.type]}
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900">
											{selectedEvent.title}
										</h3>
										<span className={`text-xs px-3 py-1 rounded-full ${eventTypeColors[selectedEvent.type].badge} capitalize`}>
											{selectedEvent.type}
										</span>
									</div>
								</div>
								
								<button
									onClick={() => setSelectedEvent(null)}
									className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								>
									<X className="w-5 h-5 text-gray-500" />
								</button>
							</div>
							
							<p className="text-gray-700 mb-6">
								{selectedEvent.description}
							</p>
							
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Calendar className="w-4 h-4 text-gray-500" />
									<span className="text-sm text-gray-700">
										{formatDate(selectedEvent.date, selectedEvent.endDate)}
									</span>
								</div>
								
								{selectedEvent.time && (
									<div className="flex items-center gap-3">
										<Clock className="w-4 h-4 text-gray-500" />
										<span className="text-sm text-gray-700">{selectedEvent.time}</span>
									</div>
								)}
								
								{selectedEvent.location && (
									<div className="flex items-center gap-3">
										<MapPin className="w-4 h-4 text-gray-500" />
										<span className="text-sm text-gray-700">{selectedEvent.location}</span>
									</div>
								)}
								
								{selectedEvent.semester && (
									<div className="flex items-center gap-3">
										<GraduationCap className="w-4 h-4 text-gray-500" />
										<span className="text-sm text-gray-700">{selectedEvent.semester}</span>
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
