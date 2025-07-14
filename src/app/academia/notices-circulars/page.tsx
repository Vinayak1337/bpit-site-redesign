'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, Clock, ArrowRight, Eye, Pin, ExternalLink, Filter, Download, Users, GraduationCap, BookOpen, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Priority = 'high' | 'medium' | 'low';
type Category = 'Academic' | 'Financial Aid' | 'Admission' | 'Sports' | 'Library' | 'General' | 'Examination';

interface Notice {
	id: number;
	category: Category;
	title: string;
	subtitle: string;
	date: string;
	time: string;
	priority: Priority;
	tags: string[];
	description: string;
	views: number;
	pinned: boolean;
	urgent: boolean;
	fileSize?: string;
	department?: string;
}

export default function NoticesCircularsPage() {
	const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
			fileSize: '450 KB',
			department: 'Academic Section'
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
			fileSize: '320 KB',
			department: 'Student Welfare'
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
			fileSize: '280 KB',
			department: 'Admission Office'
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
			fileSize: '180 KB',
			department: 'Sports Department'
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
			fileSize: '150 KB',
			department: 'Library'
		},
		{
			id: 6,
			category: 'Examination',
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
			fileSize: '540 KB',
			department: 'Examination Cell'
		}
	];

	const categories = [
		{ key: 'all', label: 'All Notices', icon: <Bell className="w-4 h-4" />, count: notices.length },
		{ key: 'Academic', label: 'Academic', icon: <BookOpen className="w-4 h-4" />, count: notices.filter(n => n.category === 'Academic').length },
		{ key: 'Examination', label: 'Examination', icon: <GraduationCap className="w-4 h-4" />, count: notices.filter(n => n.category === 'Examination').length },
		{ key: 'Financial Aid', label: 'Financial Aid', icon: <Award className="w-4 h-4" />, count: notices.filter(n => n.category === 'Financial Aid').length },
		{ key: 'Admission', label: 'Admission', icon: <Users className="w-4 h-4" />, count: notices.filter(n => n.category === 'Admission').length },
		{ key: 'Sports', label: 'Sports', icon: <Award className="w-4 h-4" />, count: notices.filter(n => n.category === 'Sports').length },
		{ key: 'Library', label: 'Library', icon: <BookOpen className="w-4 h-4" />, count: notices.filter(n => n.category === 'Library').length },
		{ key: 'General', label: 'General', icon: <Bell className="w-4 h-4" />, count: notices.filter(n => n.category === 'General').length }
	];

	const filteredNotices = selectedCategory === 'all' 
		? notices 
		: notices.filter(notice => notice.category === selectedCategory);

	const getPriorityColor = (priority: Priority) => {
		switch (priority) {
			case 'high': return 'bg-red-100 text-red-800 border-red-200';
			case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'low': return 'bg-green-100 text-green-800 border-green-200';
		}
	};

	const getCategoryColor = (category: Category) => {
		const colors = {
			Academic: 'bg-blue-50 border-blue-200 text-blue-700',
			'Financial Aid': 'bg-green-50 border-green-200 text-green-700',
			Admission: 'bg-purple-50 border-purple-200 text-purple-700',
			Sports: 'bg-orange-50 border-orange-200 text-orange-700',
			Library: 'bg-indigo-50 border-indigo-200 text-indigo-700',
			General: 'bg-gray-50 border-gray-200 text-gray-700',
			Examination: 'bg-red-50 border-red-200 text-red-700'
		};
		return colors[category];
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
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
						<Bell className="w-8 h-8 text-blue-600" />
					</div>
				</div>
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Notices & Circulars
				</h1>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto">
					Stay informed with the latest announcements, circular updates, and important 
					notices from BPIT administration, departments, and academic sections.
				</p>
			</motion.div>

			{/* Filter Categories */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="flex flex-wrap gap-2 justify-center"
			>
				{categories.map((category) => (
					<Button
						key={category.key}
						variant={selectedCategory === category.key ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedCategory(category.key as Category | 'all')}
						className="h-10"
					>
						{category.icon}
						<span className="ml-2">{category.label}</span>
						<span className="ml-2 bg-white/20 text-xs px-2 py-1 rounded-full">
							{category.count}
						</span>
					</Button>
				))}
			</motion.div>

			{/* Notices Grid */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={selectedCategory}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.4 }}
						className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
					>
						{filteredNotices.map((notice, index) => (
							<motion.div
								key={notice.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								className="relative"
							>
								<Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden ${getCategoryColor(notice.category)} border-l-4 h-full`}>
									{notice.pinned && (
										<div className="absolute top-3 right-3 z-10">
											<Pin className="w-4 h-4 text-blue-600 fill-current" />
										</div>
									)}
									
									{notice.urgent && (
										<div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
											Urgent
										</div>
									)}

									<CardHeader className="pb-4">
										<div className="flex items-start justify-between mb-3">
											<span className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(notice.category)} font-medium`}>
												{notice.category}
											</span>
											<span className={`text-xs px-3 py-1 rounded border ${getPriorityColor(notice.priority)} font-medium`}>
												{notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
											</span>
										</div>
										<CardTitle className="text-lg leading-tight text-gray-900 mb-2">
											{notice.title}
										</CardTitle>
										<p className="text-sm text-gray-600 leading-relaxed">{notice.subtitle}</p>
									</CardHeader>

									<CardContent className="space-y-4">
										<p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
											{notice.description}
										</p>

										<div className="flex flex-wrap gap-2 mb-4">
											{notice.tags.map((tag, tagIndex) => (
												<span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
													{tag}
												</span>
											))}
										</div>

										<div className="flex items-center justify-between text-xs text-gray-500 mb-4">
											<div className="flex items-center space-x-4">
												<div className="flex items-center space-x-1">
													<Calendar className="w-3 h-3" />
													<span>{formatDate(notice.date)}</span>
												</div>
												<div className="flex items-center space-x-1">
													<Clock className="w-3 h-3" />
													<span>{notice.time}</span>
												</div>
											</div>
											<div className="flex items-center space-x-1">
												<Eye className="w-3 h-3" />
												<span>{notice.views}</span>
											</div>
										</div>

										{notice.department && (
											<div className="text-xs text-gray-500 italic mb-4">
												From: {notice.department}
											</div>
										)}

										<div className="flex items-center justify-between pt-2 border-t border-gray-100">
											{notice.fileSize && (
												<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
													{notice.fileSize}
												</span>
											)}
											<div className="flex space-x-2">
												<Button size="sm" variant="outline" className="h-8 text-xs">
													<Eye className="w-3 h-3 mr-1" />
													View
												</Button>
												<Button size="sm" className="h-8 text-xs">
													<Download className="w-3 h-3 mr-1" />
													Download
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>
			</motion.div>

			{/* Statistics */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Notice Statistics</h2>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
					<div>
						<Bell className="w-8 h-8 text-blue-200 mx-auto mb-2" />
						<h3 className="text-2xl font-bold mb-1">{notices.length}</h3>
						<p className="text-blue-100 text-sm">Total Notices</p>
					</div>
					<div>
						<Pin className="w-8 h-8 text-blue-200 mx-auto mb-2" />
						<h3 className="text-2xl font-bold mb-1">{notices.filter(n => n.pinned).length}</h3>
						<p className="text-blue-100 text-sm">Pinned Notices</p>
					</div>
					<div>
						<ExternalLink className="w-8 h-8 text-blue-200 mx-auto mb-2" />
						<h3 className="text-2xl font-bold mb-1">{notices.filter(n => n.urgent).length}</h3>
						<p className="text-blue-100 text-sm">Urgent Notices</p>
					</div>
					<div>
						<Eye className="w-8 h-8 text-blue-200 mx-auto mb-2" />
						<h3 className="text-2xl font-bold mb-1">{notices.reduce((sum, n) => sum + n.views, 0)}</h3>
						<p className="text-blue-100 text-sm">Total Views</p>
					</div>
				</div>
			</motion.div>

			{/* Important Notice */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
			>
				<div className="flex items-start space-x-3">
					<div className="flex-shrink-0">
						<div className="p-2 bg-yellow-100 rounded-lg">
							<Bell className="w-5 h-5 text-yellow-600" />
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-yellow-800 mb-2">Stay Updated</h3>
						<p className="text-yellow-700 text-sm leading-relaxed">
							All notices and circulars are published as soon as they are issued by the respective departments. 
							Students and faculty are advised to check this section regularly for important updates. 
							For any queries regarding specific notices, please contact the issuing department directly.
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
