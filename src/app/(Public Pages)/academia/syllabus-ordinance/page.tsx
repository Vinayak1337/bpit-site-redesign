'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
	FileText, 
	Download, 
	BookOpen, 
	Calendar, 
	Users, 
	GraduationCap, 
	Search,
	Filter,
	ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SyllabusOrdinancePage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
	const [selectedType, setSelectedType] = useState<string>('all'); // syllabus or ordinance
	const [sortBy, setSortBy] = useState<'name' | 'updated' | 'size'>('name');

	const departments = [
		{
			name: "Computer Science & Engineering",
			code: "CSE",
			color: "blue",
			courses: ["B.Tech CSE", "M.Tech CSE"],
			syllabusCount: 8,
			type: "syllabus"
		},
		{
			name: "Electronics & Communication",
			code: "ECE",
			color: "green",
			courses: ["B.Tech ECE", "M.Tech ECE"],
			syllabusCount: 8,
			type: "syllabus"
		},
		{
			name: "Mechanical Engineering",
			code: "ME",
			color: "purple",
			courses: ["B.Tech ME", "M.Tech Production"],
			syllabusCount: 8,
			type: "syllabus"
		},
		{
			name: "Electrical Engineering",
			code: "EE",
			color: "orange",
			courses: ["B.Tech EE"],
			syllabusCount: 8,
			type: "syllabus"
		},
		{
			name: "Information Technology",
			code: "IT",
			color: "indigo",
			courses: ["B.Tech IT"],
			syllabusCount: 8,
			type: "syllabus"
		}
	];

	const ordinances = [
		{
			title: "General Ordinance for Undergraduate Programs",
			description: "Complete guidelines for B.Tech programs, examination rules, and academic regulations",
			lastUpdated: "2024-01-15",
			size: "2.5 MB",
			type: "ordinance",
			department: "General",
			course: "All Undergraduate"
		},
		{
			title: "General Ordinance for Postgraduate Programs",
			description: "Guidelines for M.Tech programs, thesis requirements, and academic policies",
			lastUpdated: "2024-01-15",
			size: "1.8 MB",
			type: "ordinance",
			department: "General",
			course: "All Postgraduate"
		},
		{
			title: "Credit Transfer & Migration Policy",
			description: "Rules for credit transfer between institutions and migration procedures",
			lastUpdated: "2023-12-10",
			size: "850 KB",
			type: "ordinance",
			department: "General",
			course: "All Programs"
		}
	];

	// Combine all items for filtering with proper typing
	const allItems = [
		...departments.map(dept => ({
			...dept,
			title: dept.name,
			description: `${dept.courses.join(', ')} - ${dept.syllabusCount} Semester Syllabi`,
			lastUpdated: "2024-01-15",
			size: "Multiple Files",
			type: 'syllabus' as const
		})),
		...ordinances.map(ord => ({ ...ord, type: 'ordinance' as const }))
	];

	// Filter and sort items
	const filteredItems = useMemo(() => {
		let filtered = allItems;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(item => {
				const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
				const descMatch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
				const courseMatch = item.type === 'syllabus' && 'courses' in item && 
					item.courses.some((course: string) => 
						course.toLowerCase().includes(searchTerm.toLowerCase())
					);
				return titleMatch || descMatch || courseMatch;
			});
		}

		// Filter by type
		if (selectedType !== 'all') {
			filtered = filtered.filter(item => item.type === selectedType);
		}

		// Filter by department
		if (selectedDepartment !== 'all') {
			filtered = filtered.filter(item => {
				if (item.type === 'syllabus' && 'name' in item) {
					return item.name === selectedDepartment;
				}
				if (item.type === 'ordinance' && 'department' in item) {
					return item.department === selectedDepartment;
				}
				return false;
			});
		}

		// Sort items
		filtered.sort((a, b) => {
			switch (sortBy) {
				case 'name':
					return a.title.localeCompare(b.title);
				case 'updated':
					return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
				case 'size':
					// Simple size comparison (this would need more sophisticated logic for real file sizes)
					return a.size.localeCompare(b.size);
				default:
					return 0;
			}
		});

		return filtered;
	}, [allItems, searchTerm, selectedType, selectedDepartment, sortBy]);

	// Get unique departments for filter
	const uniqueDepartments = ['all', ...Array.from(new Set(allItems.map(item => {
		if (item.type === 'syllabus' && 'name' in item) {
			return item.name;
		}
		if (item.type === 'ordinance' && 'department' in item) {
			return item.department;
		}
		return null;
	}).filter((dept): dept is string => dept !== null)))];



	return (
		<motion.div 
			className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.1 }}
				className="relative overflow-hidden bg-white text-gray-900"
			>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
							transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
						>
							<div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg">
								<FileText className="w-10 h-10 text-white" />
							</div>
						</motion.div>
						<motion.h1 
							className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							Syllabus & Ordinance
						</motion.h1>
						<motion.p 
							className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.5 }}
						>
							Access comprehensive curriculum details, course syllabi, and academic ordinances 
							for all undergraduate and postgraduate programs at BPIT.
						</motion.p>
					</motion.div>
				</div>
			</motion.div>

			{/* Search and Filters */}
			<motion.div 
				className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.6 }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
								placeholder="Search syllabi and ordinances..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900 placeholder-gray-500"
							/>
						</div>

						{/* Filters */}
						<div className="flex flex-wrap gap-3 items-center">
							{/* Type Filter */}
							<div className="relative">
								<select
									value={selectedType}
									onChange={(e) => setSelectedType(e.target.value)}
									className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900"
								>
									<option value="all">All Types</option>
									<option value="syllabus">Syllabi</option>
									<option value="ordinance">Ordinances</option>
								</select>
								<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
							</div>

							{/* Department Filter */}
							<div className="relative">
								<select
									value={selectedDepartment}
									onChange={(e) => setSelectedDepartment(e.target.value)}
									className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900"
								>
									{uniqueDepartments.map((dept) => (
										<option key={dept} value={dept}>
											{dept === 'all' ? 'All Departments' : dept}
										</option>
									))}
								</select>
								<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
							</div>

							{/* Sort */}
							<div className="relative">
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as 'name' | 'updated' | 'size')}
									className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900"
								>
									<option value="name">Sort by Name</option>
									<option value="updated">Sort by Updated</option>
									<option value="size">Sort by Size</option>
								</select>
								<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
							</div>
						</div>
					</motion.div>

					{/* Quick Filter Pills */}
					<motion.div 
						className="flex flex-wrap gap-2 mt-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.8 }}
					>
						{['all', 'syllabus', 'ordinance'].map((type) => (
							<Button
								key={type}
								variant={selectedType === type ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedType(type)}
								className={`rounded-full transition-all duration-200 ${
									selectedType === type 
										? 'bg-blue-600 text-white shadow-lg transform scale-105' 
										: 'hover:bg-blue-50 hover:border-blue-200'
								}`}
							>
								{type === 'all' ? <Filter className="w-4 h-4 mr-2" /> : 
								 type === 'syllabus' ? <BookOpen className="w-4 h-4 mr-2" /> : 
								 <FileText className="w-4 h-4 mr-2" />}
								{type === 'all' ? 'All Items' : 
								 type === 'syllabus' ? 'Syllabi' : 'Ordinances'}
								<span className="ml-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">
									{type === 'all' ? allItems.length : 
									 allItems.filter(item => item.type === type).length}
								</span>
							</Button>
						))}
					</motion.div>
				</div>
			</motion.div>

			{/* Results Info */}
			<motion.div 
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, delay: 0.9 }}
			>
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">
							{selectedType === 'all' ? 'All Documents' : 
							 selectedType === 'syllabus' ? 'Department Syllabi' : 'Academic Ordinances'}
						</h2>
						<p className="text-gray-600 mt-1">
							Showing {filteredItems.length} of {allItems.length} documents
						</p>
					</div>
				</div>
			</motion.div>

			{/* Main Content */}
			<motion.div 
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1.0 }}
			>
				{filteredItems.length > 0 ? (
					<motion.div 
						className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
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
							{filteredItems.map((item, index) => (
								<motion.div
									key={`${item.type}-${index}`}
									layout
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 }
									}}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.3 }}
								>
									{item.type === 'syllabus' ? (
										<Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-${(item as any).color}-50 to-${(item as any).color}-100 h-full`}>
											<CardHeader className="pb-4">
												<div className="flex items-center justify-between mb-2">
													<div className={`p-2 bg-${(item as any).color}-600 rounded-lg`}>
														<BookOpen className="w-5 h-5 text-white" />
													</div>
													<span className={`text-xs font-semibold text-${(item as any).color}-700 bg-white px-2 py-1 rounded`}>
														{(item as any).code}
													</span>
												</div>
												<CardTitle className={`text-lg text-${(item as any).color}-900`}>{item.title}</CardTitle>
											</CardHeader>
											<CardContent className="flex-1">
												<div className="space-y-3 h-full flex flex-col">
													<div className="flex-1">
														<span className="text-sm font-medium text-gray-700">Courses Offered:</span>
														<div className="flex flex-wrap gap-1 mt-1">
															{(item as any).courses?.map((course: string, courseIndex: number) => (
																<span key={courseIndex} className={`text-xs bg-${(item as any).color}-200 text-${(item as any).color}-800 px-2 py-1 rounded`}>
																	{course}
																</span>
															))}
														</div>
													</div>
													<div className="flex items-center justify-between mt-auto">
														<span className={`text-sm text-${(item as any).color}-700`}>
															{(item as any).syllabusCount} Semester Syllabi
														</span>
														<Button size="sm" className={`bg-${(item as any).color}-600 hover:bg-${(item as any).color}-700`}>
															View Syllabi
														</Button>
													</div>
												</div>
											</CardContent>
										</Card>
									) : (
										<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
											<CardHeader className="pb-4">
												<div className="flex items-start justify-between mb-2">
													<FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
													<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
														{item.size}
													</span>
												</div>
												<CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
											</CardHeader>
											<CardContent className="flex-1">
												<div className="h-full flex flex-col">
													<p className="text-sm text-gray-600 mb-4 flex-1">{item.description}</p>
													<div className="flex items-center justify-between mt-auto">
														<span className="text-xs text-gray-500">
															Updated: {new Date(item.lastUpdated).toLocaleDateString()}
														</span>
														<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
															<Download className="w-4 h-4 mr-1" />
															Download
														</Button>
													</div>
												</div>
											</CardContent>
										</Card>
									)}
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
						<h3 className="text-2xl font-semibold text-gray-900 mb-4">No documents found</h3>
						<p className="text-gray-500 text-lg mb-8">Try adjusting your search terms or filters to find what you're looking for.</p>
						<Button
							onClick={() => {
								setSearchTerm('');
								setSelectedDepartment('all');
								setSelectedType('all');
							}}
							className="bg-blue-600 hover:bg-blue-700 text-white"
						>
							Clear All Filters
						</Button>
					</motion.div>
				)}

				{/* Quick Stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
				>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
						<div>
							<GraduationCap className="w-12 h-12 text-blue-200 mx-auto mb-3" />
							<h3 className="text-3xl font-bold mb-2">5</h3>
							<p className="text-blue-100">Engineering Departments</p>
						</div>
						<div>
							<Calendar className="w-12 h-12 text-blue-200 mx-auto mb-3" />
							<h3 className="text-3xl font-bold mb-2">8</h3>
							<p className="text-blue-100">Semesters per Program</p>
						</div>
						<div>
							<Users className="w-12 h-12 text-blue-200 mx-auto mb-3" />
							<h3 className="text-3xl font-bold mb-2">180+</h3>
							<p className="text-blue-100">Credits per Degree</p>
						</div>
					</div>
				</motion.div>

				{/* Additional Information */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
				>
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0">
							<div className="p-2 bg-yellow-100 rounded-lg">
								<FileText className="w-5 h-5 text-yellow-600" />
							</div>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
							<p className="text-yellow-700 text-sm leading-relaxed">
								All syllabi and ordinances are updated regularly as per GGSIPU guidelines. 
								Students are advised to download the latest versions before each academic session. 
								For any queries regarding curriculum or academic regulations, please contact the respective department offices.
							</p>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
