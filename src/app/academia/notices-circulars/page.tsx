"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
	Bell, 
	Calendar, 
	Clock, 
	Eye, 
	Pin, 
	Search, 
	ExternalLink,
	GraduationCap,
	Award,
	Users,
	Lightbulb,
	Trophy,
	Building2,
	ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NoticesCircularsPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [selectedPriority, setSelectedPriority] = useState<string>('all');
	const [sortBy, setSortBy] = useState<'date' | 'priority' | 'views'>('date');
	const notices: Notice[] = [
		{
			id: 1,
			category: 'Academic',
			title: 'Mid-semester examination schedule released',
			subtitle: 'Check your exam dates and prepare accordingly',
			date: '2024-12-28',
			time: '10:00 AM',
			priority: 'high',
			tags: ['Exam', 'Schedule', 'Important'],
			description: 'The mid-semester examination schedule has been released. Students are advised to check their individual exam timetables and prepare accordingly.',
			views: 1250,
			pinned: true,
			urgent: true,
			image: '/placeholder.svg?height=120&width=120'
		},
		{
			id: 2,
			category: 'Financial Aid',
			title: 'Merit-cum-Means Scholarship applications open',
			subtitle: 'Apply now for financial assistance programs',
			date: '2024-12-25',
			time: '2:30 PM',
			priority: 'medium',
			tags: ['Scholarship', 'Financial Aid', 'Application'],
			description: 'Applications are now open for Merit-cum-Means Scholarships for the academic year 2024-25. Eligible students can apply online.',
			views: 890,
			pinned: true,
			urgent: false,
			image: '/placeholder.svg?height=120&width=120'
		},
		{
			id: 3,
			category: 'Admission',
			title: 'Additional counseling round for vacant seats',
			subtitle: 'Last chance for admission in B.Tech programs',
			date: '2024-12-20',
			time: '11:15 AM',
			priority: 'high',
			tags: ['Admission', 'Counseling', 'B.Tech'],
			description: 'Additional counseling round will be conducted for remaining vacant seats in various B.Tech programs. Interested candidates should apply immediately.',
			views: 2100,
			pinned: false,
			urgent: true,
			image: '/placeholder.svg?height=120&width=120'
		},
		{
			id: 4,
			category: 'Sports',
			title: 'Inter-college sports tournament registration',
			subtitle: 'Register for annual sports competition',
			date: '2024-12-18',
			time: '4:00 PM',
			priority: 'medium',
			tags: ['Sports', 'Tournament', 'Registration'],
			description: 'Registration is now open for the annual inter-college sports tournament. Students can participate in various indoor and outdoor sports.',
			views: 650,
			pinned: false,
			urgent: false,
			image: '/placeholder.svg?height=120&width=120'
		},
		{
			id: 5,
			category: 'Library',
			title: 'New digital resources added to library',
			subtitle: 'Access latest journals and e-books',
			date: '2024-12-15',
			time: '9:30 AM',
			priority: 'low',
			tags: ['Library', 'Digital Resources', 'E-books'],
			description: 'The library has added new digital resources including international journals, e-books, and research databases for student access.',
			views: 420,
			pinned: false,
			urgent: false,
			image: '/placeholder.svg?height=120&width=120'
		},
		{
			id: 6,
			category: 'Academic',
			title: 'Online practical examination guidelines',
			subtitle: 'Important instructions for practical exams',
			date: '2024-12-12',
			time: '1:45 PM',
			priority: 'high',
			tags: ['Practical', 'Examination', 'Guidelines'],
			description: 'Detailed guidelines for conducting online practical examinations. Students must follow all protocols for successful completion.',
			views: 1580,
			pinned: true,
			urgent: false,
			image: '/placeholder.svg?height=120&width=120'
		}
	];

	const announcements: Notice[] = [
		{
			id: 7,
			category: 'General',
			title: 'Campus maintenance schedule update',
			subtitle: 'Important infrastructure maintenance notice',
			date: '2024-12-10',
			time: '8:00 AM',
			priority: 'medium',
			tags: ['Maintenance', 'Infrastructure', 'Schedule'],
			description: 'Scheduled maintenance activities for campus infrastructure. Some facilities may be temporarily unavailable during maintenance hours.',
			views: 320,
			pinned: false,
			urgent: false,
			image: '/placeholder.svg?height=120&width=120'
		},
		{
			id: 8,
			category: 'Academic',
			title: 'Research symposium call for papers',
			subtitle: 'Submit your research papers for annual symposium',
			date: '2024-12-08',
			time: '3:00 PM',
			priority: 'medium',
			tags: ['Research', 'Symposium', 'Papers'],
			description: 'Call for research papers for the annual academic symposium. Students and faculty are invited to submit their research work.',
			views: 560,
			pinned: false,
			urgent: false,
			image: '/placeholder.svg?height=120&width=120'
		},
		{
			id: 9,
			category: 'Innovation',
			title: 'Annual Innovation Contest 2024',
			subtitle: 'Showcase your innovative ideas and win prizes',
			date: '2024-12-05',
			time: '11:00 AM',
			priority: 'high',
			tags: ['Innovation', 'Contest', 'Technology'],
			description: 'Participate in the annual innovation contest and present your groundbreaking ideas. Multiple categories and attractive prizes await.',
			views: 890,
			pinned: true,
			urgent: false,
			image: '/placeholder.svg?height=120&width=120'
		},
		{
			id: 10,
			category: 'Sports',
			title: 'Annual sports day celebration',
			subtitle: 'Join us for a day of sports and fun activities',
			date: '2024-12-02',
			time: '9:00 AM',
			priority: 'medium',
			tags: ['Sports Day', 'Celebration', 'Events'],
			description: 'Annual sports day with various athletic competitions, cultural programs, and prize distributions for outstanding performers.',
			views: 750,
			pinned: false,
			urgent: false,
			image: '/placeholder.svg?height=120&width=120'
		}
	];

	// Combined all notices and announcements
	const allNotices = useMemo(() => [...notices, ...announcements], []);

	// Categories with icons and colors
	const categories = [
		{ key: 'all', label: 'All', icon: <Bell className="w-4 h-4" />, color: 'bg-gray-100 text-gray-700' },
		{ key: 'Academic', label: 'Academic', icon: <GraduationCap className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700' },
		{ key: 'Financial Aid', label: 'Financial Aid', icon: <Award className="w-4 h-4" />, color: 'bg-green-100 text-green-700' },
		{ key: 'Admission', label: 'Admission', icon: <Users className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700' },
		{ key: 'Innovation', label: 'Innovation', icon: <Lightbulb className="w-4 h-4" />, color: 'bg-orange-100 text-orange-700' },
		{ key: 'Sports', label: 'Sports', icon: <Trophy className="w-4 h-4" />, color: 'bg-red-100 text-red-700' },
		{ key: 'General', label: 'General', icon: <Building2 className="w-4 h-4" />, color: 'bg-gray-100 text-gray-700' },
		{ key: 'Library', label: 'Library', icon: <Bell className="w-4 h-4" />, color: 'bg-indigo-100 text-indigo-700' }
	];

	// Filter and sort notices
	const filteredNotices = useMemo(() => {
		let filtered = allNotices;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(notice =>
				notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				notice.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
				notice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				notice.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
			);
		}

		// Filter by category
		if (selectedCategory !== 'all') {
			filtered = filtered.filter(notice => notice.category === selectedCategory);
		}

		// Filter by priority
		if (selectedPriority !== 'all') {
			filtered = filtered.filter(notice => notice.priority === selectedPriority);
		}

		// Sort notices
		filtered.sort((a, b) => {
			switch (sortBy) {
				case 'date':
					return new Date(b.date).getTime() - new Date(a.date).getTime();
				case 'priority':
					const priorityOrder = { high: 3, medium: 2, low: 1 };
					return priorityOrder[b.priority] - priorityOrder[a.priority];
				case 'views':
					return b.views - a.views;
				default:
					return 0;
			}
		});

		// Prioritize pinned and urgent notices
		return filtered.sort((a, b) => {
			if (a.pinned && !b.pinned) return -1;
			if (!a.pinned && b.pinned) return 1;
			if (a.urgent && !b.urgent) return -1;
			if (!a.urgent && b.urgent) return 1;
			return 0;
		});
	}, [allNotices, searchTerm, selectedCategory, selectedPriority, sortBy]);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	return (
		<motion.div 
			className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			{/* Header Section */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.1 }}
				className="relative overflow-hidden bg-white text-gray-900"
			>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<motion.div 
						className="text-center"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<motion.div 
							className="flex justify-center mb-4"
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
						>
							<div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg">
								<Bell className="w-8 h-8 text-white" />
							</div>
						</motion.div>
						<motion.h1 
							className="text-3xl md:text-4xl font-bold mb-3 text-gray-900"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							Notices & Circulars
						</motion.h1>
						<motion.p 
							className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.5 }}
						>						Stay informed with the latest announcements, circular updates, and important 
						notices from BPIT administration, departments, and academic sections.
						</motion.p>
					</motion.div>
				</div>
			</motion.div>

			{/* Filters and Search Section */}
			<motion.div 
				className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.6 }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<motion.div 
						className="flex flex-col lg:flex-row gap-4 items-center justify-between"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.7 }}
					>
						{/* Search */}
						<div className="relative flex-1 max-w-md w-full">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								type="text"
								placeholder="Search notices..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
							/>
						</div>

						{/* Filters */}
						<div className="flex flex-wrap gap-3 items-center">
							{/* Category Filter */}
							<div className="relative">
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
								>
									{categories.map((category) => (
										<option key={category.key} value={category.key}>
											{category.label}
										</option>
									))}
								</select>
								<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
							</div>

							{/* Priority Filter */}
							<div className="relative">
								<select
									value={selectedPriority}
									onChange={(e) => setSelectedPriority(e.target.value)}
									className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
								>
									<option value="all">All Priorities</option>
									<option value="high">High Priority</option>
									<option value="medium">Medium Priority</option>
									<option value="low">Low Priority</option>
								</select>
								<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
							</div>

							{/* Sort */}
							<div className="relative">
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'views')}
									className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
								>
									<option value="date">Sort by Date</option>
									<option value="priority">Sort by Priority</option>
									<option value="views">Sort by Views</option>
								</select>
								<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
							</div>
						</div>
					</motion.div>

					{/* Category Pills */}
					<motion.div 
						className="flex flex-wrap gap-2 mt-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.8 }}
					>
						{categories.map((category) => (
							<Button
								key={category.key}
								variant={selectedCategory === category.key ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedCategory(category.key)}
								className={`rounded-full transition-all duration-200 ${
									selectedCategory === category.key 
										? 'bg-blue-600 text-white shadow-lg transform scale-105' 
										: 'hover:bg-blue-50 hover:border-blue-200'
								}`}
							>
								{category.icon}
								<span className="ml-2">{category.label}</span>
								<span className="ml-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">
									{selectedCategory === category.key 
										? filteredNotices.length 
										: allNotices.filter(n => category.key === 'all' ? true : n.category === category.key).length
									}
								</span>
							</Button>
						))}
					</motion.div>
				</div>
			</motion.div>

			{/* Results Info */}
			<motion.div 
				className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, delay: 0.9 }}
			>
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">
							{selectedCategory === 'all' ? 'All Notices' : `${selectedCategory} Notices`}
						</h2>
						<p className="text-gray-600 mt-1">
							Showing {filteredNotices.length} of {allNotices.length} notices
						</p>
					</div>
				</div>
			</motion.div>

			{/* Main Content */}
			<motion.div 
				className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-16"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1.0 }}
			>
				{filteredNotices.length > 0 ? (
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
						initial="hidden"
						animate="visible"
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: {
									staggerChildren: 0.1
								}
							}
						}}
					>
						<AnimatePresence>
							{filteredNotices.map((notice) => (
								<motion.div
									key={notice.id}
									layout
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 }
									}}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.3 }}
									className="group relative"
								>
									{/* Mobile Layout - Different structure for small devices */}
									<div className="sm:hidden">
										<div className="relative overflow-hidden rounded-xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-sm hover:shadow-lg transition-all duration-300 p-4">
											{/* Mobile Priority Indicator */}
											{notice.priority === 'high' && (
												<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />
											)}
											
											{/* Mobile Header Row */}
											<div className="flex items-center gap-2 mb-3">
												<div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
													<Image
														src={notice.image}
														alt={notice.title}
														fill
														className="object-cover"
													/>
												</div>
												<div className="flex-1 min-w-0">
													<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
														notice.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
														notice.category === 'Financial Aid' ? 'bg-green-100 text-green-700' :
														notice.category === 'Admission' ? 'bg-purple-100 text-purple-700' :
														notice.category === 'Innovation' ? 'bg-orange-100 text-orange-700' :
														notice.category === 'Sports' ? 'bg-pink-100 text-pink-700' :
														notice.category === 'Library' ? 'bg-indigo-100 text-indigo-700' :
														'bg-gray-100 text-gray-700'
													}`}>
														{notice.category === 'Academic' ? <GraduationCap className="w-2.5 h-2.5" /> :
														notice.category === 'Financial Aid' ? <Award className="w-2.5 h-2.5" /> :
														notice.category === 'Admission' ? <Users className="w-2.5 h-2.5" /> :
														notice.category === 'Innovation' ? <Lightbulb className="w-2.5 h-2.5" /> :
														notice.category === 'Sports' ? <Trophy className="w-2.5 h-2.5" /> :
														notice.category === 'Library' ? <Bell className="w-2.5 h-2.5" /> :
														<Bell className="w-2.5 h-2.5" />}
														{notice.category}
													</span>
												</div>
											</div>
											
											{/* Mobile Badges - Below category/image, above title */}
											<div className="flex flex-wrap gap-2 mb-3">
												{notice.pinned && (
													<div className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md flex items-center gap-1">
														<Pin className="w-3 h-3" />
														<span className="text-xs font-medium">Pinned</span>
													</div>
												)}
												{notice.urgent && (
													<div className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-medium">
														Urgent
													</div>
												)}
												<span className={`px-2 py-1 rounded-md text-xs font-medium ${
													notice.priority === 'high' ? 'bg-red-100 text-red-700' :
													notice.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
													'bg-green-100 text-green-700'
												}`}>
													{notice.priority} priority
												</span>
											</div>

											{/* Mobile Title and Description */}
											<div className="mb-3">
												<h3 className="font-bold text-gray-900 text-sm leading-tight mb-2">
													{notice.title}
												</h3>
												<p className="text-xs text-gray-600 leading-relaxed mb-2">
													{notice.subtitle}
												</p>
												<p className="text-xs text-gray-500 leading-relaxed">
													{notice.description}
												</p>
											</div>

											{/* Mobile Tags */}
											<div className="flex flex-wrap gap-1 mb-3">
												{notice.tags.slice(0, 4).map((tag, tagIndex) => (
													<span
														key={tagIndex}
														className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
													>
														{tag}
													</span>
												))}
											</div>

											{/* Mobile Footer */}
											<div className="flex items-center justify-between pt-2 border-t border-gray-100">
												<div className="flex flex-col gap-1.5 text-xs text-gray-500 flex-1">
													{/* First row - Date and Time */}
													<div className="flex items-center gap-4">
														<div className="flex items-center gap-1">
															<Calendar className="w-3 h-3" />
															<span>{formatDate(notice.date)}</span>
														</div>
														<div className="flex items-center gap-1">
															<Clock className="w-3 h-3" />
															<span>{notice.time}</span>
														</div>
													</div>
													{/* Second row - Views */}
													<div className="flex items-center gap-1">
														<Eye className="w-3 h-3" />
														<span>{notice.views} views</span>
													</div>
												</div>
												<motion.button
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors ml-3"
												>
													View
												</motion.button>
											</div>
										</div>
									</div>

									{/* Desktop/Tablet Layout - Consistent height with optimized content */}
									<div className="hidden sm:block">
										<div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-[26rem] lg:h-[28rem] flex flex-col">
										{/* Priority Indicator */}
										{notice.priority === 'high' && (
											<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />
										)}

										<div className="p-4 lg:p-5 h-full flex flex-col">
											{/* Header Row - Image and Category */}
											<div className="flex items-center gap-3 mb-3 flex-shrink-0">
												<div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-lg">
													<Image
														src={notice.image}
														alt={notice.title}
														fill
														className="object-cover"
													/>
												</div>
												<div className="flex-1">
													<div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
														notice.category === 'Academic' ? 'bg-blue-50 border-blue-200 text-blue-700' :
														notice.category === 'Financial Aid' ? 'bg-green-50 border-green-200 text-green-700' :
														notice.category === 'Admission' ? 'bg-purple-50 border-purple-200 text-purple-700' :
														notice.category === 'Innovation' ? 'bg-orange-50 border-orange-200 text-orange-700' :
														notice.category === 'Sports' ? 'bg-pink-50 border-pink-200 text-pink-700' :
														notice.category === 'Library' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
														'bg-gray-50 border-gray-200 text-gray-700'
													}`}>
														{notice.category === 'Academic' ? <GraduationCap className="w-4 h-4" /> :
														notice.category === 'Financial Aid' ? <Award className="w-4 h-4" /> :
														notice.category === 'Admission' ? <Users className="w-4 h-4" /> :
														notice.category === 'Innovation' ? <Lightbulb className="w-4 h-4" /> :
														notice.category === 'Sports' ? <Trophy className="w-4 h-4" /> :
														notice.category === 'Library' ? <Bell className="w-4 h-4" /> :
														<Bell className="w-4 h-4" />}
														<span>{notice.category}</span>
													</div>
												</div>
											</div>
											
											{/* Badges Row - Below image/category, above title */}
											<div className="flex flex-wrap gap-2 mb-3 flex-shrink-0">
												{notice.pinned && (
													<motion.div
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{ delay: 0.2, type: 'spring' }}
														className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-lg flex items-center gap-1.5 text-sm font-medium"
													>
														<Pin className="w-4 h-4" />
														<span>Pinned</span>
													</motion.div>
												)}
												{notice.urgent && (
													<motion.div
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														transition={{ delay: 0.3 }}
														className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1"
													>
														<div className="w-2 h-2 bg-white rounded-full animate-pulse" />
														Urgent
													</motion.div>
												)}
												<div className={`px-3 py-1 rounded-lg text-sm font-medium border ${
													notice.priority === 'high' ? 'bg-red-50 border-red-200 text-red-700' :
													notice.priority === 'medium' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
													'bg-green-50 border-green-200 text-green-700'
												}`}>
													{notice.priority} priority
												</div>
											</div>

											{/* Title and Subtitle Section */}
											<div className="mb-3 flex-shrink-0">
												<h3 className="font-bold text-gray-800 text-base lg:text-lg leading-tight mb-2 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
													{notice.title}
												</h3>
												<p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-1">
													{notice.subtitle}
												</p>
											</div>

											{/* Main Content - Description and Tags */}
											<div className="flex-1 flex flex-col min-h-0 mb-3">
												<div className="flex-1 mb-3">
													<p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
														{notice.description}
													</p>
												</div>

												{/* Tags */}
												<div className="flex flex-wrap gap-1.5 flex-shrink-0">
													{notice.tags.slice(0, 2).map((tag, tagIndex) => (
														<span
															key={tagIndex}
															className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors duration-200"
														>
														{tag}
													</span>
												))}
												{notice.tags.length > 2 && (
													<span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
														+{notice.tags.length - 2}
													</span>
												)}
											</div>
											</div>

											{/* Footer - Reorganized for better spacing */}
											<div className="pt-2 sm:pt-3 border-t border-gray-100 mt-auto flex-shrink-0">
												{/* Desktop Footer Layout */}
												<div className="hidden lg:flex items-center justify-between">
													<div className="flex items-center gap-4 text-xs text-gray-500">
														<div className="flex items-center gap-1">
															<Calendar className="w-3 h-3" />
															<span>{formatDate(notice.date)}</span>
														</div>
														<div className="flex items-center gap-1">
															<Clock className="w-3 h-3" />
															<span>{notice.time}</span>
														</div>
														<div className="flex items-center gap-1">
															<Eye className="w-3 h-3" />
															<span>{notice.views} views</span>
														</div>
													</div>

													<motion.button
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}
														className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-blue-50"
													>
														<span>View Details</span>
														<ExternalLink className="w-3 h-3" />
													</motion.button>
												</div>

												{/* Tablet Footer Layout */}
												<div className="hidden sm:flex lg:hidden flex-col gap-2">
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-3 text-xs text-gray-500">
															<div className="flex items-center gap-1">
																<Calendar className="w-3 h-3" />
																<span>{formatDate(notice.date)}</span>
															</div>
															<div className="flex items-center gap-1">
																<Clock className="w-3 h-3" />
																<span>{notice.time}</span>
															</div>
														</div>
														<div className="flex items-center gap-1 text-xs text-gray-500">
															<Eye className="w-3 h-3" />
															<span>{notice.views}</span>
														</div>
													</div>
													<div className="flex justify-end">
														<motion.button
															whileHover={{ scale: 1.05 }}
															whileTap={{ scale: 0.95 }}
															className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-blue-50"
														>
															<span>View</span>
															<ExternalLink className="w-3 h-3" />
														</motion.button>
													</div>
												</div>

												{/* Mobile Footer Layout */}
												<div className="flex sm:hidden flex-col gap-2">
													<div className="flex items-center justify-between text-xs text-gray-500">
														<div className="flex items-center gap-2">
															<div className="flex items-center gap-1">
																<Calendar className="w-2.5 h-2.5" />
																<span>{formatDate(notice.date).slice(0, 8)}</span>
															</div>
															<div className="flex items-center gap-1">
																<Clock className="w-2.5 h-2.5" />
																<span>{notice.time}</span>
															</div>
														</div>
														<div className="flex items-center gap-1">
															<Eye className="w-2.5 h-2.5" />
															<span>{notice.views}</span>
														</div>
													</div>
													<div className="flex justify-end">
														<motion.button
															whileHover={{ scale: 1.05 }}
															whileTap={{ scale: 0.95 }}
															className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-blue-50"
														>
															<span>View</span>
															<ExternalLink className="w-2.5 h-2.5" />
														</motion.button>
													</div>
												</div>
											</div>
										</div>

										{/* Hover Overlay */}
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 0 }}
											whileHover={{ opacity: 0.02 }}
											transition={{ duration: 0.3 }}
											className={`absolute inset-0 bg-gradient-to-br ${
												notice.category === 'Academic' ? 'from-blue-500 to-indigo-600' :
												notice.category === 'Financial Aid' ? 'from-green-500 to-emerald-600' :
												notice.category === 'Admission' ? 'from-purple-500 to-violet-600' :
												notice.category === 'Innovation' ? 'from-orange-500 to-red-600' :
												notice.category === 'Sports' ? 'from-pink-500 to-rose-600' :
												notice.category === 'Library' ? 'from-indigo-500 to-blue-600' :
												'from-gray-500 to-slate-600'
											}`}
										/>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center py-16"
					>
						<div className="w-24 h-24 mx-auto mb-6 text-gray-300">
							<Search className="w-full h-full" />
						</div>
						<h3 className="text-2xl font-semibold text-gray-900 mb-4">No notices found</h3>
						<p className="text-gray-500 text-lg mb-8">Try adjusting your search terms or filters to find what you're looking for.</p>
						<Button
							onClick={() => {
								setSearchTerm('');
								setSelectedCategory('all');
								setSelectedPriority('all');
							}}
							className="bg-blue-600 hover:bg-blue-700 text-white"
						>
							Clear All Filters
						</Button>
					</motion.div>
				)}
			</motion.div>
		</motion.div>
	);
}
