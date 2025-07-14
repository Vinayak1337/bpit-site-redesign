'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, BookOpen, GraduationCap, Award, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
	const [selectedFilter, setSelectedFilter] = useState<EventType | 'all'>('all');

	const events: CalendarEvent[] = [
		{
			id: 1,
			title: "Mid-Semester Examinations",
			description: "Mid-semester examinations for all undergraduate programs",
			date: "2024-03-15",
			endDate: "2024-03-25",
			time: "9:00 AM onwards",
			location: "Examination Halls",
			type: "exam",
			semester: "All Semesters",
			priority: "high"
		},
		{
			id: 2,
			title: "Annual Technical Fest - TECHNOVANZA",
			description: "Annual technical festival with competitions, workshops, and tech talks",
			date: "2024-04-10",
			endDate: "2024-04-12",
			time: "10:00 AM - 6:00 PM",
			location: "Campus Wide",
			type: "fest",
			priority: "medium"
		},
		{
			id: 3,
			title: "Summer Break",
			description: "Summer vacation for all students and faculty",
			date: "2024-05-15",
			endDate: "2024-06-30",
			type: "holiday",
			priority: "low"
		},
		{
			id: 4,
			title: "New Academic Session Begins",
			description: "Commencement of new academic year 2024-25",
			date: "2024-07-15",
			time: "9:00 AM",
			location: "Auditorium",
			type: "academic",
			semester: "1st & 3rd Semester",
			priority: "high"
		},
		{
			id: 5,
			title: "Fresher's Orientation Program",
			description: "Welcome program for newly admitted students",
			date: "2024-07-20",
			endDate: "2024-07-22",
			time: "10:00 AM - 4:00 PM",
			location: "Main Auditorium",
			type: "orientation",
			semester: "1st Semester",
			priority: "high"
		},
		{
			id: 6,
			title: "End-Semester Examinations",
			description: "Final examinations for current semester",
			date: "2024-11-20",
			endDate: "2024-12-15",
			time: "9:00 AM onwards",
			location: "Examination Halls",
			type: "exam",
			semester: "All Semesters",
			priority: "high"
		}
	];

	const eventTypeColors = {
		exam: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'bg-red-100' },
		holiday: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: 'bg-green-100' },
		academic: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'bg-blue-100' },
		orientation: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'bg-purple-100' },
		fest: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: 'bg-orange-100' }
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

	const filterButtons = [
		{ key: 'all', label: 'All Events', count: events.length },
		{ key: 'exam', label: 'Examinations', count: events.filter(e => e.type === 'exam').length },
		{ key: 'academic', label: 'Academic', count: events.filter(e => e.type === 'academic').length },
		{ key: 'orientation', label: 'Orientation', count: events.filter(e => e.type === 'orientation').length },
		{ key: 'fest', label: 'Festivals', count: events.filter(e => e.type === 'fest').length },
		{ key: 'holiday', label: 'Holidays', count: events.filter(e => e.type === 'holiday').length }
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
		<div className="space-y-8">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center"
			>
				<div className="flex justify-center mb-4">
					<div className="p-4 bg-blue-100 rounded-full">
						<Calendar className="w-8 h-8 text-blue-600" />
					</div>
				</div>
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Academic Calendar 2024-25
				</h1>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto">
					Stay updated with important academic dates, examination schedules, holidays, 
					and institutional events throughout the academic year.
				</p>
			</motion.div>

			{/* Filter Buttons */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="flex flex-wrap gap-2 justify-center"
			>
				{filterButtons.map((filter) => (
					<Button
						key={filter.key}
						variant={selectedFilter === filter.key ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedFilter(filter.key as EventType | 'all')}
						className="h-10"
					>
						<Filter className="w-4 h-4 mr-2" />
						{filter.label}
						<span className="ml-2 bg-white/20 text-xs px-2 py-1 rounded-full">
							{filter.count}
						</span>
					</Button>
				))}
			</motion.div>

			{/* Events List */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className="space-y-4"
			>
				{filteredEvents.map((event, index) => {
					const colorScheme = eventTypeColors[event.type];
					const icon = eventTypeIcons[event.type];
					
					return (
						<motion.div
							key={event.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							className={`${colorScheme.bg} ${colorScheme.border} border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300`}
						>
							<div className="flex items-start justify-between">
								<div className="flex items-start space-x-4 flex-1">
									<div className={`p-3 ${colorScheme.icon} rounded-lg ${colorScheme.text}`}>
										{icon}
									</div>
									
									<div className="flex-1">
										<div className="flex items-center justify-between mb-2">
											<h3 className={`text-xl font-bold ${colorScheme.text}`}>
												{event.title}
											</h3>
											<div className="flex items-center space-x-2">
												{event.priority === 'high' && (
													<span className="inline-block bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
														High Priority
													</span>
												)}
												<span className={`text-xs ${colorScheme.text} bg-white px-3 py-1 rounded-full capitalize font-medium`}>
													{event.type}
												</span>
											</div>
										</div>
										
										<p className={`text-base ${colorScheme.text} mb-4 leading-relaxed`}>
											{event.description}
										</p>
										
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
											<div className="flex items-center space-x-2">
												<Calendar className={`w-4 h-4 ${colorScheme.text}`} />
												<div>
													<span className="text-xs text-gray-500 block">Date</span>
													<span className={`text-sm font-medium ${colorScheme.text}`}>
														{formatDate(event.date, event.endDate)}
													</span>
												</div>
											</div>
											
											{event.time && (
												<div className="flex items-center space-x-2">
													<Clock className={`w-4 h-4 ${colorScheme.text}`} />
													<div>
														<span className="text-xs text-gray-500 block">Time</span>
														<span className={`text-sm font-medium ${colorScheme.text}`}>
															{event.time}
														</span>
													</div>
												</div>
											)}
											
											{event.location && (
												<div className="flex items-center space-x-2">
													<MapPin className={`w-4 h-4 ${colorScheme.text}`} />
													<div>
														<span className="text-xs text-gray-500 block">Location</span>
														<span className={`text-sm font-medium ${colorScheme.text}`}>
															{event.location}
														</span>
													</div>
												</div>
											)}
											
											{event.semester && (
												<div className="flex items-center space-x-2">
													<GraduationCap className={`w-4 h-4 ${colorScheme.text}`} />
													<div>
														<span className="text-xs text-gray-500 block">Semester</span>
														<span className={`text-sm font-medium ${colorScheme.text}`}>
															{event.semester}
														</span>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}
			</motion.div>

			{/* Important Dates Summary */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Quick Calendar Overview</h2>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
					<div>
						<BookOpen className="w-8 h-8 text-blue-200 mx-auto mb-2" />
						<h3 className="text-xl font-bold mb-1">2</h3>
						<p className="text-blue-100 text-sm">Examination Periods</p>
					</div>
					<div>
						<Award className="w-8 h-8 text-blue-200 mx-auto mb-2" />
						<h3 className="text-xl font-bold mb-1">1</h3>
						<p className="text-blue-100 text-sm">Technical Festival</p>
					</div>
					<div>
						<Calendar className="w-8 h-8 text-blue-200 mx-auto mb-2" />
						<h3 className="text-xl font-bold mb-1">45</h3>
						<p className="text-blue-100 text-sm">Holiday Days</p>
					</div>
					<div>
						<Users className="w-8 h-8 text-blue-200 mx-auto mb-2" />
						<h3 className="text-xl font-bold mb-1">3</h3>
						<p className="text-blue-100 text-sm">Orientation Days</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
