'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
	Calendar,
	ChevronLeft,
	ChevronRight,
	Expand,
	Film,
	Image as ImageIcon,
	Play,
	X
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { GalleryItem } from '@/lib/schemas/gallery';

interface GalleryCollageProps {
	items: GalleryItem[];
	categories: string[];
	visibleSections?: Array<'filters' | 'grid'>;
}

type MediaFilter = 'all' | 'image' | 'video';

const VIDEO_URL_PATTERN = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i;
const FALLBACK_IMAGE_URL =
	'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

const isVideoItem = (item: GalleryItem): boolean => {
	if (item.mediaType === 'video') return true;
	return VIDEO_URL_PATTERN.test(item.src);
};

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

const getYouTubeEmbedUrl = (url: string): string | null => {
	try {
		const parsed = new URL(url);
		if (parsed.hostname.includes('youtu.be')) {
			const id = parsed.pathname.replace('/', '').trim();
			return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
		}
		if (
			parsed.hostname.includes('youtube.com') ||
			parsed.hostname.includes('www.youtube.com')
		) {
			const id = parsed.searchParams.get('v');
			return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
		}
		return null;
	} catch {
		return null;
	}
};

export default function GalleryCollage({
	items,
	categories,
	visibleSections
}: GalleryCollageProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all');
	const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [brokenUrls, setBrokenUrls] = useState<Record<string, true>>({});

	const normalizedCategories = useMemo(() => {
		const sanitizedProvided = categories
			.map(category => category.trim())
			.filter(category => category.length > 0);
		const fromItems = items
			.map(item => item.category.trim())
			.filter(category => category.length > 0);
		return Array.from(
			new Set([
				'All',
				...sanitizedProvided.filter(category => category !== 'All'),
				...fromItems.filter(category => category !== 'All')
			])
		);
	}, [categories, items]);

	const filteredItems = useMemo(() => {
		return items.filter(item => {
			const matchesCategory =
				selectedCategory === 'All' || item.category === selectedCategory;

			if (mediaFilter === 'all') return matchesCategory;
			if (mediaFilter === 'video') return matchesCategory && isVideoItem(item);
			return matchesCategory && !isVideoItem(item);
		});
	}, [items, mediaFilter, selectedCategory]);

	const totals = useMemo(() => {
		const videos = items.filter(isVideoItem).length;
		return {
			all: items.length,
			videos,
			photos: items.length - videos,
			categories: normalizedCategories.filter(category => category !== 'All').length
		};
	}, [items, normalizedCategories]);

	const categoryCounts = useMemo(() => {
		const counts: Record<string, number> = { All: items.length };
		for (const item of items) {
			counts[item.category] = (counts[item.category] ?? 0) + 1;
		}
		return counts;
	}, [items]);

	const closeLightbox = useCallback(() => {
		setSelectedItem(null);
		document.body.style.overflow = '';
	}, []);

	const openLightbox = useCallback(
		(item: GalleryItem) => {
			const index = filteredItems.findIndex(filteredItem => filteredItem.id === item.id);
			setSelectedItem(item);
			setCurrentIndex(index >= 0 ? index : 0);
			document.body.style.overflow = 'hidden';
		},
		[filteredItems]
	);

	const navigateLightbox = useCallback(
		(direction: 'prev' | 'next') => {
			if (filteredItems.length === 0) return;
			const newIndex =
				direction === 'next'
					? (currentIndex + 1) % filteredItems.length
					: (currentIndex - 1 + filteredItems.length) % filteredItems.length;
			setCurrentIndex(newIndex);
			setSelectedItem(filteredItems[newIndex]);
		},
		[currentIndex, filteredItems]
	);

	useEffect(() => {
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!selectedItem) return;
			if (event.key === 'Escape') closeLightbox();
			if (event.key === 'ArrowRight') navigateLightbox('next');
			if (event.key === 'ArrowLeft') navigateLightbox('prev');
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [closeLightbox, navigateLightbox, selectedItem]);

	const showSection = (section: 'hero' | 'filters' | 'grid') => {
		if (!visibleSections) return true;
		if (section === 'hero') return false;
		return visibleSections.includes(section);
	};

	const markUrlBroken = useCallback((url: string | undefined) => {
		if (!url) return;
		setBrokenUrls(previous => {
			if (previous[url]) return previous;
			return { ...previous, [url]: true };
		});
	}, []);

	const resolveImageUrl = useCallback(
		(url: string | undefined) => {
			if (!url) return FALLBACK_IMAGE_URL;
			if (brokenUrls[url]) return FALLBACK_IMAGE_URL;
			return url;
		},
		[brokenUrls]
	);

	const lightboxYouTubeUrl = selectedItem
		? getYouTubeEmbedUrl(selectedItem.src)
		: null;

	return (
		<div className='space-y-8'>
			{showSection('hero') ? (
				<section className='relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 px-6 py-10 text-white md:px-10'>
					<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_60%)]' />
					<div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent' />
					<div className='relative space-y-6'>
						<div className='inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-100'>
							BPIT Media Archive
						</div>
						<div className='space-y-3'>
							<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
								Photo & Video Library
							</h1>
							<p className='max-w-3xl text-sm text-slate-200 md:text-base'>
								Explore festivals, campus moments, technical events, and institutional
								milestones in one curated library.
							</p>
						</div>
						<div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
							<div className='rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur'>
								<div className='text-xl font-semibold'>{totals.all}</div>
								<div className='text-xs text-blue-100/85'>Media Items</div>
							</div>
							<div className='rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur'>
								<div className='text-xl font-semibold'>{totals.photos}</div>
								<div className='text-xs text-blue-100/85'>Photos</div>
							</div>
							{totals.videos > 0 ? (
								<div className='rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur'>
									<div className='text-xl font-semibold'>{totals.videos}</div>
									<div className='text-xs text-blue-100/85'>Videos</div>
								</div>
							) : null}
							<div className='rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur'>
								<div className='text-xl font-semibold'>{totals.categories}</div>
								<div className='text-xs text-blue-100/85'>Collections</div>
							</div>
						</div>
					</div>
				</section>
			) : null}

			{showSection('filters') ? (
				<section className='space-y-4 rounded-2xl border border-slate-200 bg-white p-4 md:p-5'>
					<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
						<div className='flex flex-wrap items-center gap-2'>
							<Badge variant='secondary' className='bg-slate-100 text-slate-700'>
								Media Type
							</Badge>
							<Button
								type='button'
								size='sm'
								variant={mediaFilter === 'all' ? 'default' : 'outline'}
								onClick={() => setMediaFilter('all')}>
								All
							</Button>
							<Button
								type='button'
								size='sm'
								variant={mediaFilter === 'image' ? 'default' : 'outline'}
								onClick={() => setMediaFilter('image')}>
								<ImageIcon className='h-4 w-4' />
								Photos
							</Button>
							<Button
								type='button'
								size='sm'
								variant={mediaFilter === 'video' ? 'default' : 'outline'}
								onClick={() => setMediaFilter('video')}>
								<Film className='h-4 w-4' />
								Videos
							</Button>
						</div>
						<p className='text-xs text-slate-500'>{filteredItems.length} items shown</p>
					</div>

					<div className='flex flex-wrap gap-2'>
						{normalizedCategories.map(category => (
							<Button
								key={category}
								type='button'
								size='sm'
								variant={selectedCategory === category ? 'default' : 'outline'}
								className='rounded-full'
								onClick={() => setSelectedCategory(category)}
								trackingEvent='gallery_filter_category'
								trackingData={{ category }}>
								{category}
								{categoryCounts[category] != null ? (
									<span className={cn(
										'ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
										selectedCategory === category
											? 'bg-white/20 text-white'
											: 'bg-slate-100 text-slate-500'
									)}>
										{categoryCounts[category]}
									</span>
								) : null}
							</Button>
						))}
					</div>
				</section>
			) : null}

			{showSection('grid') ? (
				<section className='rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6'>
					{filteredItems.length === 0 ? (
						<div className='rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center'>
							<p className='text-sm font-medium text-slate-700'>
								No media found for this selection.
							</p>
							<p className='mt-1 text-sm text-slate-500'>
								Try a different category or media type.
							</p>
						</div>
					) : (
						<motion.div
							layout
							className='grid auto-rows-[220px] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
							<AnimatePresence mode='popLayout'>
								{filteredItems.map(item => {
									const isVideo = isVideoItem(item);
									const cardImageUrl = isVideo
										? resolveImageUrl(item.thumbnail)
										: resolveImageUrl(item.src);
									return (
										<motion.button
											key={item.id}
											layout
											type='button'
											initial={{ opacity: 0, y: 12 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 12 }}
											transition={{ duration: 0.24 }}
											className={cn(
												'group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
												getGridClasses(item.size)
											)}
											onClick={() => openLightbox(item)}>
											{isVideo && item.thumbnail ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													src={cardImageUrl}
													alt={item.title}
													className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
													loading='lazy'
													onError={() => markUrlBroken(item.thumbnail)}
												/>
											) : !isVideo ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													src={cardImageUrl}
													alt={item.title}
													className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
													loading='lazy'
													onError={() => markUrlBroken(item.src)}
												/>
											) : (
												<div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white'>
													<div className='flex flex-col items-center gap-2 opacity-90'>
														<Film className='h-10 w-10' />
														<span className='text-xs font-medium tracking-wide'>
															Video Preview
														</span>
													</div>
												</div>
											)}

											<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
											<div className='absolute inset-x-0 bottom-0 space-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-3'>
												<div className='flex items-center gap-2 text-[11px] text-blue-100'>
													<Badge className='border border-white/20 bg-white/10 text-white hover:bg-white/10'>
														{item.category}
													</Badge>
													{isVideo ? (
														<Badge className='border border-white/20 bg-white/10 text-white hover:bg-white/10'>
															Video
														</Badge>
													) : null}
													{item.date ? (
														<span className='inline-flex items-center gap-1 text-blue-100/90'>
															<Calendar className='h-3 w-3' />
															{item.date}
														</span>
													) : null}
												</div>
												<h3 className='line-clamp-1 text-base font-semibold text-white'>
													{item.title}
												</h3>
												{item.description ? (
													<p className='line-clamp-2 text-xs text-slate-200'>
														{item.description}
													</p>
												) : null}
											</div>

											{isVideo ? (
												<div className='absolute right-4 top-4 rounded-full border border-white/30 bg-black/40 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
													<Play className='h-4 w-4 fill-white' />
												</div>
											) : (
												<div className='absolute right-4 top-4 rounded-full border border-white/30 bg-black/40 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
													<Expand className='h-4 w-4' />
												</div>
											)}
										</motion.button>
									);
								})}
							</AnimatePresence>
						</motion.div>
					)}
				</section>
			) : null}

			<AnimatePresence>
				{selectedItem ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/90 p-4 backdrop-blur-sm'
						onClick={closeLightbox}>
						<div className='relative mx-auto flex h-full max-w-7xl items-center justify-center'>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='absolute right-0 top-0 z-50 text-white hover:bg-white/20'
								onClick={closeLightbox}
								trackingEvent='gallery_lightbox_close'>
								<X className='h-5 w-5' />
							</Button>

							{filteredItems.length > 1 ? (
								<>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='absolute left-0 top-1/2 z-50 -translate-y-1/2 text-white hover:bg-white/20'
										onClick={event => {
											event.stopPropagation();
											navigateLightbox('prev');
										}}
										trackingEvent='gallery_lightbox_prev'>
										<ChevronLeft className='h-6 w-6' />
									</Button>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='absolute right-0 top-1/2 z-50 -translate-y-1/2 text-white hover:bg-white/20'
										onClick={event => {
											event.stopPropagation();
											navigateLightbox('next');
										}}
										trackingEvent='gallery_lightbox_next'>
										<ChevronRight className='h-6 w-6' />
									</Button>
								</>
							) : null}

							<motion.div
								key={selectedItem.id}
								initial={{ opacity: 0, scale: 0.96 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.96 }}
								className='w-full max-w-5xl space-y-4'
								onClick={event => event.stopPropagation()}>
								<div className='relative h-[70vh] overflow-hidden rounded-xl border border-white/20 bg-black'>
									{isVideoItem(selectedItem) ? (
										lightboxYouTubeUrl ? (
											<iframe
												src={lightboxYouTubeUrl}
												title={selectedItem.title}
												className='h-full w-full'
												allow='autoplay; encrypted-media; picture-in-picture'
												allowFullScreen
											/>
										) : (
											<video
												src={selectedItem.src}
												poster={selectedItem.thumbnail}
												controls
												autoPlay
												playsInline
												className='h-full w-full bg-black object-contain'
											/>
										)
									) : (
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={resolveImageUrl(selectedItem.src)}
											alt={selectedItem.title}
											className='h-full w-full object-contain'
											onError={() => markUrlBroken(selectedItem.src)}
										/>
									)}
								</div>

								<div className='space-y-2 text-center text-white'>
									<div className='flex items-center justify-center gap-2'>
										<Badge className='bg-white/15 text-white hover:bg-white/15'>
											{selectedItem.category}
										</Badge>
										{selectedItem.date ? (
											<span className='inline-flex items-center gap-1 text-sm text-slate-300'>
												<Calendar className='h-4 w-4' />
												{selectedItem.date}
											</span>
										) : null}
									</div>
									<h3 className='text-2xl font-semibold tracking-tight'>
										{selectedItem.title}
									</h3>
									{selectedItem.description ? (
										<p className='mx-auto max-w-2xl text-sm text-slate-300'>
											{selectedItem.description}
										</p>
									) : null}
								</div>
							</motion.div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
