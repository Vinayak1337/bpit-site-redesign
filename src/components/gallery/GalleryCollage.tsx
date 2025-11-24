'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GalleryItem } from '@/lib/schemas/gallery';

interface GalleryCollageProps {
	items: GalleryItem[];
	categories: string[];
}

export default function GalleryCollage({
	items,
	categories
}: GalleryCollageProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(items);
	const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	useEffect(() => {
		if (selectedCategory === 'All') {
			setFilteredItems(items);
		} else {
			setFilteredItems(
				items.filter(item => item.category === selectedCategory)
			);
		}
	}, [selectedCategory, items]);

	const openLightbox = (item: GalleryItem) => {
		const index = filteredItems.findIndex(i => i.id === item.id);
		setSelectedImage(item);
		setCurrentIndex(index);
		document.body.style.overflow = 'hidden';
	};

	const closeLightbox = () => {
		setSelectedImage(null);
		document.body.style.overflow = 'auto';
	};

	const navigateLightbox = (direction: 'prev' | 'next') => {
		const newIndex =
			direction === 'next'
				? (currentIndex + 1) % filteredItems.length
				: (currentIndex - 1 + filteredItems.length) % filteredItems.length;

		setCurrentIndex(newIndex);
		setSelectedImage(filteredItems[newIndex]);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!selectedImage) return;
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowRight') navigateLightbox('next');
			if (e.key === 'ArrowLeft') navigateLightbox('prev');
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [selectedImage, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

	// Helper to get grid classes based on size
	const getGridClasses = (size?: string) => {
		switch (size) {
			case 'large':
				return 'md:col-span-2 md:row-span-2';
			case 'wide':
				return 'md:col-span-2 md:row-span-1';
			case 'tall':
				return 'md:col-span-1 md:row-span-2';
			default:
				return 'md:col-span-1 md:row-span-1';
		}
	};

	return (
		<div className='space-y-8'>
			{/* Filter Navigation */}
			<div className='sticky top-20 z-30 flex justify-center pb-4'>
				<div className='bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-gray-200/50 flex flex-wrap justify-center gap-1'>
					{categories.map(category => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={cn(
								'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
								selectedCategory === category
									? 'bg-blue-600 text-white shadow-md'
									: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
							)}>
							{category}
						</button>
					))}
				</div>
			</div>

			{/* Collage Grid */}
			<div className='relative p-4 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner overflow-hidden'>
				{/* Background Pattern */}
				<div
					className='absolute inset-0 opacity-[0.4] pointer-events-none'
					style={{
						backgroundImage:
							'radial-gradient(#94a3b8 1.5px, transparent 1.5px)',
						backgroundSize: '24px 24px'
					}}
				/>

				<motion.div
					layout
					className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-6 relative z-10'>
					<AnimatePresence mode='popLayout'>
						{filteredItems.map(item => (
							<motion.div
								key={item.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.4 }}
								className={cn(
									'relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-100 shadow-sm hover:shadow-xl hover:z-10 transition-all duration-500 hover:-translate-y-1',
									getGridClasses(item.size)
								)}
								onClick={() => openLightbox(item)}>
								<Image
									src={item.src}
									alt={item.title}
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-110'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>

								{/* Hover Overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6'>
									<div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
										<div className='flex items-center gap-2 text-blue-300 text-xs font-medium mb-1 uppercase tracking-wider'>
											<span>{item.category}</span>
											{item.date && (
												<>
													<span className='w-1 h-1 bg-blue-300 rounded-full' />
													<span className='flex items-center gap-1'>
														<Calendar className='w-3 h-3' /> {item.date}
													</span>
												</>
											)}
										</div>
										<h3 className='text-white font-bold text-xl leading-tight mb-1'>
											{item.title}
										</h3>
										{item.description && (
											<p className='text-white/80 text-sm line-clamp-2'>
												{item.description}
											</p>
										)}
									</div>
									<div className='absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'>
										<ZoomIn className='w-5 h-5' />
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4'
						onClick={closeLightbox}>
						{/* Close Button */}
						<button
							onClick={closeLightbox}
							aria-label='Close lightbox'
							className='absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 group'>
							<X className='w-6 h-6 group-hover:rotate-90 transition-transform duration-300' />
						</button>

						{/* Navigation Buttons */}
						<button
							onClick={e => {
								e.stopPropagation();
								navigateLightbox('prev');
							}}
							aria-label='Previous image'
							className='absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50 hover:scale-110 hidden sm:flex'>
							<ChevronLeft className='w-8 h-8' />
						</button>
						<button
							onClick={e => {
								e.stopPropagation();
								navigateLightbox('next');
							}}
							aria-label='Next image'
							className='absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50 hover:scale-110 hidden sm:flex'>
							<ChevronRight className='w-8 h-8' />
						</button>

						{/* Image Container */}
						<motion.div
							key={selectedImage.id}
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							transition={{ type: 'spring', damping: 25, stiffness: 300 }}
							className='relative max-w-7xl w-full flex flex-col items-center'
							onClick={e => e.stopPropagation()}>
							<div className='relative w-full h-[80vh] rounded-lg overflow-hidden shadow-2xl bg-black/50 ring-1 ring-white/10'>
								<Image
									src={selectedImage.src}
									alt={selectedImage.title}
									fill
									className='object-contain'
									priority
								/>
							</div>

							<div className='mt-6 text-center text-white max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500'>
								<div className='flex items-center justify-center gap-3 text-blue-300 text-sm font-medium mb-2'>
									<span className='bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30'>
										{selectedImage.category}
									</span>
									{selectedImage.date && (
										<span className='flex items-center gap-1 opacity-80'>
											<Calendar className='w-4 h-4' /> {selectedImage.date}
										</span>
									)}
								</div>
								<h3 className='text-3xl font-bold mb-2 tracking-tight'>
									{selectedImage.title}
								</h3>
								<p className='text-gray-400 leading-relaxed'>
									{selectedImage.description}
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
