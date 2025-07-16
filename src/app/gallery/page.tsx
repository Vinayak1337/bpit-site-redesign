'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	Camera,
	Video,
	Search,
	Grid,
	List,
	Play,
	X,
	ChevronLeft,
	ChevronRight,
	Calendar,
	Eye,
	Heart,
	Share2,
	Download,
	MapPin,
	Award,
	GraduationCap,
	Building,
	Palette,
	Trophy,
	Zap
} from 'lucide-react';

interface MediaItem {
	id: number;
	type: 'photo' | 'video';
	title: string;
	description: string;
	category: string;
	image: string;
	videoUrl?: string;
	date: string;
	views: number;
	likes: number;
	photographer?: string;
	event?: string;
	tags: string[];
}

interface Category {
	id: string;
	name: string;
	icon: React.ReactNode;
	count: number;
	color: string;
}

const Gallery = () => {
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const heroRef = useRef<HTMLDivElement>(null);
	const isHeroInView = useInView(heroRef, { once: true });

	// Sample data for gallery items
	const mediaItems: MediaItem[] = [
		{
			id: 1,
			type: 'photo',
			title: 'Annual Convocation Ceremony 2024',
			description: 'Graduates receiving their degrees at the grand convocation ceremony',
			category: 'academic',
			image: '/api/placeholder/800/600',
			date: '2024-03-15',
			views: 1250,
			likes: 89,
			photographer: 'BPIT Media Team',
			event: 'Convocation 2024',
			tags: ['graduation', 'ceremony', 'academic', 'achievement']
		},
		{
			id: 2,
			type: 'video',
			title: 'Campus Virtual Tour',
			description: 'Take a comprehensive virtual tour of our beautiful campus facilities',
			category: 'campus',
			image: '/api/placeholder/800/600',
			videoUrl: 'https://example.com/campus-tour',
			date: '2024-02-20',
			views: 2100,
			likes: 156,
			event: 'Campus Showcase',
			tags: ['campus', 'facilities', 'tour', 'infrastructure']
		},
		{
			id: 3,
			type: 'photo',
			title: 'Cultural Fest - TECHNOVA 2024',
			description: 'Students performing traditional dance at our annual cultural festival',
			category: 'cultural',
			image: '/api/placeholder/800/600',
			date: '2024-01-28',
			views: 980,
			likes: 127,
			photographer: 'Cultural Committee',
			event: 'TECHNOVA 2024',
			tags: ['festival', 'dance', 'cultural', 'students']
		},
		{
			id: 4,
			type: 'photo',
			title: 'Robotics Competition Winners',
			description: 'Our engineering students showcasing their award-winning robots',
			category: 'technical',
			image: '/api/placeholder/800/600',
			date: '2024-01-15',
			views: 1420,
			likes: 203,
			photographer: 'Technical Team',
			event: 'Robotics Championship',
			tags: ['robotics', 'engineering', 'competition', 'innovation']
		},
		{
			id: 5,
			type: 'video',
			title: 'Industry Expert Guest Lecture',
			description: 'Renowned industry expert sharing insights on emerging technologies',
			category: 'academic',
			image: '/api/placeholder/800/600',
			videoUrl: 'https://example.com/guest-lecture',
			date: '2024-01-10',
			views: 756,
			likes: 94,
			event: 'Expert Lecture Series',
			tags: ['lecture', 'industry', 'technology', 'learning']
		},
		{
			id: 6,
			type: 'photo',
			title: 'Sports Day Championship',
			description: 'Athletic competitions and team spirit at our annual sports event',
			category: 'sports',
			image: '/api/placeholder/800/600',
			date: '2023-12-18',
			views: 1100,
			likes: 165,
			photographer: 'Sports Committee',
			event: 'Annual Sports Day',
			tags: ['sports', 'competition', 'athletics', 'teamwork']
		},
		{
			id: 7,
			type: 'photo',
			title: 'State-of-the-Art Laboratory',
			description: 'Students working in our advanced computer science laboratory',
			category: 'campus',
			image: '/api/placeholder/800/600',
			date: '2023-12-05',
			views: 890,
			likes: 78,
			photographer: 'Infrastructure Team',
			event: 'Lab Showcase',
			tags: ['laboratory', 'technology', 'students', 'infrastructure']
		},
		{
			id: 8,
			type: 'video',
			title: 'Student Success Stories',
			description: 'Alumni sharing their journey and achievements post-graduation',
			category: 'achievements',
			image: '/api/placeholder/800/600',
			videoUrl: 'https://example.com/success-stories',
			date: '2023-11-20',
			views: 1890,
			likes: 234,
			event: 'Alumni Meet',
			tags: ['alumni', 'success', 'career', 'inspiration']
		}
	];

	const categories: Category[] = [
		{
			id: 'all',
			name: 'All Media',
			icon: <Grid className="w-4 h-4" />,
			count: mediaItems.length,
			color: 'bg-blue-500'
		},
		{
			id: 'academic',
			name: 'Academic Events',
			icon: <GraduationCap className="w-4 h-4" />,
			count: mediaItems.filter(item => item.category === 'academic').length,
			color: 'bg-purple-500'
		},
		{
			id: 'campus',
			name: 'Campus Life',
			icon: <Building className="w-4 h-4" />,
			count: mediaItems.filter(item => item.category === 'campus').length,
			color: 'bg-green-500'
		},
		{
			id: 'cultural',
			name: 'Cultural Events',
			icon: <Palette className="w-4 h-4" />,
			count: mediaItems.filter(item => item.category === 'cultural').length,
			color: 'bg-pink-500'
		},
		{
			id: 'technical',
			name: 'Technical Events',
			icon: <Zap className="w-4 h-4" />,
			count: mediaItems.filter(item => item.category === 'technical').length,
			color: 'bg-orange-500'
		},
		{
			id: 'sports',
			name: 'Sports Events',
			icon: <Trophy className="w-4 h-4" />,
			count: mediaItems.filter(item => item.category === 'sports').length,
			color: 'bg-red-500'
		},
		{
			id: 'achievements',
			name: 'Achievements',
			icon: <Award className="w-4 h-4" />,
			count: mediaItems.filter(item => item.category === 'achievements').length,
			color: 'bg-yellow-500'
		}
	];

	// Filter media items based on selected category and search term
	const filteredMedia = mediaItems.filter(item => {
		const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
		const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		return matchesCategory && matchesSearch;
	});

	const openLightbox = (media: MediaItem) => {
		setSelectedMedia(media);
		setCurrentImageIndex(filteredMedia.findIndex(item => item.id === media.id));
		setIsLightboxOpen(true);
	};

	const closeLightbox = () => {
		setIsLightboxOpen(false);
		setSelectedMedia(null);
	};

	const navigateImage = useCallback((direction: 'prev' | 'next') => {
		const newIndex = direction === 'prev' 
			? (currentImageIndex - 1 + filteredMedia.length) % filteredMedia.length
			: (currentImageIndex + 1) % filteredMedia.length;
		
		setCurrentImageIndex(newIndex);
		setSelectedMedia(filteredMedia[newIndex]);
	}, [currentImageIndex, filteredMedia]);

	useEffect(() => {
		// Simulate loading
		const timer = setTimeout(() => setIsLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		// Handle keyboard navigation in lightbox
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isLightboxOpen) return;
			
			switch (e.key) {
				case 'Escape':
					closeLightbox();
					break;
				case 'ArrowLeft':
					navigateImage('prev');
					break;
				case 'ArrowRight':
					navigateImage('next');
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isLightboxOpen, navigateImage]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			{/* Hero Section */}
			<section ref={heroRef} className="relative py-20 overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
					<div className="absolute top-20 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
					<div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto"
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={isHeroInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
						>
							<Camera className="w-4 h-4" />
							Photo & Video Gallery
						</motion.div>
						
						<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
							Capturing
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-3">
								BPIT Moments
							</span>
						</h1>
						
						<p className="text-xl text-gray-600 mb-8 leading-relaxed">
							Explore the vibrant campus life, academic achievements, cultural celebrations, 
							and memorable moments that define the BPIT experience through our comprehensive gallery.
						</p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
						>
							<div className="flex items-center gap-2">
								<Camera className="w-4 h-4 text-blue-500" />
								<span>{mediaItems.filter(item => item.type === 'photo').length} Photos</span>
							</div>
							<div className="flex items-center gap-2">
								<Video className="w-4 h-4 text-purple-500" />
								<span>{mediaItems.filter(item => item.type === 'video').length} Videos</span>
							</div>
							<div className="flex items-center gap-2">
								<Eye className="w-4 h-4 text-green-500" />
								<span>{mediaItems.reduce((acc, item) => acc + item.views, 0).toLocaleString()} Total Views</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Gallery Controls */}
			<section className="container mx-auto px-4 mb-8">
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
					{/* Search and View Toggle */}
					<div className="flex flex-col md:flex-row gap-4 mb-6">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Search photos, videos, events..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
							/>
						</div>
						
						<div className="flex gap-2">
							<Button
								variant={viewMode === 'grid' ? 'default' : 'outline'}
								size="lg"
								onClick={() => setViewMode('grid')}
								className="flex items-center gap-2"
							>
								<Grid className="w-4 h-4" />
								Grid
							</Button>
							<Button
								variant={viewMode === 'list' ? 'default' : 'outline'}
								size="lg"
								onClick={() => setViewMode('list')}
								className="flex items-center gap-2"
							>
								<List className="w-4 h-4" />
								List
							</Button>
						</div>
					</div>

					{/* Category Filters */}
					<div className="flex flex-wrap gap-3">
						{categories.map((category, index) => (
							<motion.button
								key={category.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
								onClick={() => setSelectedCategory(category.id)}
								className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
									selectedCategory === category.id
										? 'bg-blue-500 text-white shadow-lg scale-105'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								{category.icon}
								<span className="font-medium">{category.name}</span>
								<span className={`px-2 py-1 rounded-full text-xs ${
									selectedCategory === category.id
										? 'bg-white/20 text-white'
										: 'bg-gray-200 text-gray-600'
								}`}>
									{category.count}
								</span>
							</motion.button>
						))}
					</div>
				</div>
			</section>

			{/* Gallery Grid */}
			<section className="container mx-auto px-4 mb-12">
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, index) => (
							<div key={index} className="aspect-[4/3] bg-gray-200 rounded-xl animate-pulse" />
						))}
					</div>
				) : (
					<motion.div
						layout
						className={`grid gap-6 ${
							viewMode === 'grid'
								? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
								: 'grid-cols-1'
						}`}
					>
						{filteredMedia.map((media, index) => (
							<motion.div
								key={media.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								className={`group cursor-pointer ${
									viewMode === 'list' ? 'flex gap-4 bg-white rounded-xl p-4 shadow-lg' : ''
								}`}
								onClick={() => openLightbox(media)}
							>
								<div className={`relative overflow-hidden rounded-xl ${
									viewMode === 'grid' 
										? 'aspect-[4/3] w-full' 
										: 'w-48 h-32 flex-shrink-0'
								}`}>
									<Image
										src={media.image}
										alt={media.title}
										fill
										className="object-cover transition-all duration-300 group-hover:scale-110"
										sizes={viewMode === 'grid' ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw' : '192px'}
									/>
									
									{/* Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									
									{/* Media Type Icon */}
									<div className="absolute top-3 left-3">
										<div className={`p-2 rounded-full ${
											media.type === 'video' 
												? 'bg-red-500 text-white' 
												: 'bg-blue-500 text-white'
										}`}>
											{media.type === 'video' ? (
												<Video className="w-4 h-4" />
											) : (
												<Camera className="w-4 h-4" />
											)}
										</div>
									</div>

									{/* Play Button for Videos */}
									{media.type === 'video' && (
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="bg-white/90 p-4 rounded-full">
												<Play className="w-8 h-8 text-gray-900" />
											</div>
										</div>
									)}

									{/* Stats */}
									<div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
											<Eye className="w-3 h-3" />
											{media.views}
										</div>
										<div className="flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
											<Heart className="w-3 h-3" />
											{media.likes}
										</div>
									</div>
								</div>

								{/* Content */}
								<div className={viewMode === 'grid' ? 'p-4 bg-white rounded-b-xl' : 'flex-1'}>
									<h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
										{media.title}
									</h3>
									<p className="text-gray-600 text-sm mb-3 line-clamp-2">
										{media.description}
									</p>
									
									<div className="flex items-center justify-between text-xs text-gray-500">
										<div className="flex items-center gap-2">
											<Calendar className="w-3 h-3" />
											{new Date(media.date).toLocaleDateString()}
										</div>
										{media.event && (
											<div className="flex items-center gap-1">
												<MapPin className="w-3 h-3" />
												{media.event}
											</div>
										)}
									</div>

									{/* Tags */}
									<div className="flex flex-wrap gap-1 mt-2">
										{media.tags.slice(0, 3).map(tag => (
											<span
												key={tag}
												className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
											>
												#{tag}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				)}

				{/* No Results */}
				{!isLoading && filteredMedia.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-16"
					>
						<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Search className="w-12 h-12 text-gray-400" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No media found</h3>
						<p className="text-gray-600 mb-4">
							Try adjusting your search terms or category filters
						</p>
						<Button
							onClick={() => {
								setSearchTerm('');
								setSelectedCategory('all');
							}}
							variant="outline"
						>
							Clear Filters
						</Button>
					</motion.div>
				)}
			</section>

			{/* Lightbox Modal */}
			{isLightboxOpen && selectedMedia && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
					onClick={closeLightbox}
				>
					<div className="relative max-w-6xl max-h-full w-full">
						{/* Close Button */}
						<button
							onClick={closeLightbox}
							className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
						>
							<X className="w-6 h-6" />
						</button>

						{/* Navigation Buttons */}
						<button
							onClick={(e) => {
								e.stopPropagation();
								navigateImage('prev');
							}}
							className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
						>
							<ChevronLeft className="w-6 h-6" />
						</button>
						
						<button
							onClick={(e) => {
								e.stopPropagation();
								navigateImage('next');
							}}
							className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
						>
							<ChevronRight className="w-6 h-6" />
						</button>

						{/* Media Content */}
						<div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl overflow-hidden">
							<div className="relative aspect-video">
								{selectedMedia.type === 'video' ? (
									<div className="w-full h-full bg-black flex items-center justify-center">
										<div className="text-white text-center">
											<Video className="w-16 h-16 mx-auto mb-4" />
											<p>Video player would be implemented here</p>
											<p className="text-sm text-gray-300 mt-2">
												Video URL: {selectedMedia.videoUrl}
											</p>
										</div>
									</div>
								) : (
									<Image
										src={selectedMedia.image}
										alt={selectedMedia.title}
										fill
										className="object-contain"
										sizes="100vw"
									/>
								)}
							</div>
							
							{/* Media Info */}
							<div className="p-6">
								<div className="flex items-start justify-between mb-4">
									<div className="flex-1">
										<h2 className="text-2xl font-bold text-gray-900 mb-2">
											{selectedMedia.title}
										</h2>
										<p className="text-gray-600 mb-4">
											{selectedMedia.description}
										</p>
									</div>
									
									<div className="flex gap-2">
										<Button size="sm" variant="outline">
											<Share2 className="w-4 h-4" />
										</Button>
										<Button size="sm" variant="outline">
											<Download className="w-4 h-4" />
										</Button>
									</div>
								</div>

								<div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
									<div className="flex items-center gap-2">
										<Calendar className="w-4 h-4" />
										{new Date(selectedMedia.date).toLocaleDateString()}
									</div>
									{selectedMedia.photographer && (
										<div className="flex items-center gap-2">
											<Camera className="w-4 h-4" />
											{selectedMedia.photographer}
										</div>
									)}
									{selectedMedia.event && (
										<div className="flex items-center gap-2">
											<MapPin className="w-4 h-4" />
											{selectedMedia.event}
										</div>
									)}
									<div className="flex items-center gap-2">
										<Eye className="w-4 h-4" />
										{selectedMedia.views} views
									</div>
									<div className="flex items-center gap-2">
										<Heart className="w-4 h-4" />
										{selectedMedia.likes} likes
									</div>
								</div>

								{/* Tags */}
								<div className="flex flex-wrap gap-2">
									{selectedMedia.tags.map(tag => (
										<span
											key={tag}
											className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
										>
											#{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default Gallery;