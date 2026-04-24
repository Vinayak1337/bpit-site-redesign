'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
	Bell,
	Calendar,
	Clock,
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
import type { NoticeItem } from '@/app/(Private Pages)/actions/academia-notices-circulars';

type Props = { notices: NoticeItem[] };

export default function NoticesList({ notices }: Props) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [selectedPriority, setSelectedPriority] = useState<string>('all');
	const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

	const categories = [
		{ key: 'all', label: 'All', icon: <Bell className='w-4 h-4' /> },
		{ key: 'Academic', label: 'Academic', icon: <GraduationCap className='w-4 h-4' /> },
		{ key: 'Financial Aid', label: 'Financial Aid', icon: <Award className='w-4 h-4' /> },
		{ key: 'Admission', label: 'Admission', icon: <Users className='w-4 h-4' /> },
		{ key: 'Innovation', label: 'Innovation', icon: <Lightbulb className='w-4 h-4' /> },
		{ key: 'Sports', label: 'Sports', icon: <Trophy className='w-4 h-4' /> },
		{ key: 'General', label: 'General', icon: <Building2 className='w-4 h-4' /> },
		{ key: 'Library', label: 'Library', icon: <Bell className='w-4 h-4' /> }
	];

	const filteredNotices = useMemo(() => {
		let filtered = notices;
		if (searchTerm) {
			const q = searchTerm.toLowerCase();
			filtered = filtered.filter(
				n =>
					n.title.toLowerCase().includes(q) ||
					n.subtitle.toLowerCase().includes(q) ||
					n.description.toLowerCase().includes(q) ||
					n.tags.some(t => t.toLowerCase().includes(q))
			);
		}
		if (selectedCategory !== 'all') {
			filtered = filtered.filter(n => n.category === selectedCategory);
		}
		if (selectedPriority !== 'all') {
			filtered = filtered.filter(n => n.priority === selectedPriority);
		}
		filtered = [...filtered].sort((a, b) => {
			if (sortBy === 'date') {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			}
			const order = { high: 3, medium: 2, low: 1 } as const;
			return order[b.priority] - order[a.priority];
		});
		return filtered.sort((a, b) => {
			if (a.pinned && !b.pinned) return -1;
			if (!a.pinned && b.pinned) return 1;
			if (a.urgent && !b.urgent) return -1;
			if (!a.urgent && b.urgent) return 1;
			return 0;
		});
	}, [notices, searchTerm, selectedCategory, selectedPriority, sortBy]);

	const formatDate = (d: string) =>
		new Date(d).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

	return (
		<>
			<div className='sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
						<div className='relative flex-1 max-w-md w-full'>
							<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
							<input
								type='text'
								placeholder='Search notices...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm'
							/>
						</div>
						<div className='flex flex-wrap gap-3 items-center'>
							<div className='relative'>
								<select
									value={selectedCategory}
									onChange={e => setSelectedCategory(e.target.value)}
									className='appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm'>
									{categories.map(c => (
										<option key={c.key} value={c.key}>
											{c.label}
										</option>
									))}
								</select>
								<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none' />
							</div>
							<div className='relative'>
								<select
									value={selectedPriority}
									onChange={e => setSelectedPriority(e.target.value)}
									className='appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm'>
									<option value='all'>All Priorities</option>
									<option value='high'>High Priority</option>
									<option value='medium'>Medium Priority</option>
									<option value='low'>Low Priority</option>
								</select>
								<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none' />
							</div>
							<div className='relative'>
								<select
									value={sortBy}
									onChange={e => setSortBy(e.target.value as 'date' | 'priority')}
									className='appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm'>
									<option value='date'>Sort by Date</option>
									<option value='priority'>Sort by Priority</option>
								</select>
								<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none' />
							</div>
						</div>
					</div>
					<div className='flex flex-wrap gap-2 mt-4'>
						{categories.map(c => (
							<Button
								key={c.key}
								variant={selectedCategory === c.key ? 'default' : 'outline'}
								size='sm'
								onClick={() => setSelectedCategory(c.key)}
								className={`rounded-full ${selectedCategory === c.key ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`}>
								{c.icon}
								<span className='ml-2'>{c.label}</span>
							</Button>
						))}
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
				<h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
					{selectedCategory === 'all' ? 'All Notices' : `${selectedCategory} Notices`}
				</h2>
				<p className='text-gray-600 mt-1 text-sm'>
					Showing {filteredNotices.length} of {notices.length} notices
				</p>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
				{filteredNotices.length > 0 ? (
					<motion.div
						className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'
						initial='hidden'
						animate='visible'
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
						}}>
						<AnimatePresence>
							{filteredNotices.map(notice => (
								<motion.div
									key={notice.id}
									layout
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 }
									}}
									className='group relative'>
									<div className='relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-64'>
										{notice.priority === 'high' && (
											<div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600' />
										)}
										<div className='absolute top-3 right-3 z-10 flex items-center gap-2'>
											{notice.pinned && (
												<div className='bg-gradient-to-r from-amber-400 to-orange-500 text-white p-1.5 rounded-full shadow-lg'>
													<Pin className='w-3 h-3' />
												</div>
											)}
											{notice.urgent && (
												<div className='bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1'>
													<div className='w-2 h-2 bg-white rounded-full animate-pulse' />
													Urgent
												</div>
											)}
										</div>
										<div className='p-4 h-full flex flex-col'>
											<div className='flex items-start gap-3 mb-3'>
												{notice.image && (
													<div className='relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-lg'>
														<Image
															src={notice.image}
															alt={notice.title}
															fill
															className='object-cover'
														/>
													</div>
												)}
												<div className='flex-1 min-w-0'>
													<div className='flex flex-wrap items-center gap-1.5 mb-2'>
														<div className='inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border bg-blue-50 border-blue-200 text-blue-700'>
															<span>{notice.category}</span>
														</div>
														<div
															className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
																notice.priority === 'high'
																	? 'bg-red-50 border-red-200 text-red-700'
																	: notice.priority === 'medium'
																	? 'bg-yellow-50 border-yellow-200 text-yellow-700'
																	: 'bg-green-50 border-green-200 text-green-700'
															}`}>
															{notice.priority}
														</div>
													</div>
													<h3 className='font-bold text-gray-800 text-sm leading-tight mb-1 line-clamp-2'>
														{notice.title}
													</h3>
													<p className='text-xs text-gray-500 font-medium leading-relaxed line-clamp-1'>
														{notice.subtitle}
													</p>
												</div>
											</div>
											<p className='text-gray-600 text-xs leading-relaxed line-clamp-2 mb-3 flex-1'>
												{notice.description}
											</p>
											<div className='flex flex-wrap gap-1 mb-3'>
												{notice.tags.slice(0, 3).map((t, i) => (
													<span
														key={i}
														className='px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium'>
														{t}
													</span>
												))}
											</div>
											<div className='flex items-center justify-between pt-3 border-t border-gray-100 mt-auto'>
												<div className='flex items-center gap-3 text-xs text-gray-500'>
													<div className='flex items-center gap-1'>
														<Calendar className='w-3 h-3' />
														<span>{formatDate(notice.date)}</span>
													</div>
													{notice.time && (
														<div className='flex items-center gap-1'>
															<Clock className='w-3 h-3' />
															<span>{notice.time}</span>
														</div>
													)}
												</div>
												{notice.link && (
													<a
														href={notice.link}
														className='flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 py-2 px-1'>
														View
														<ExternalLink className='w-3 h-3' />
													</a>
												)}
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				) : (
					<div className='text-center py-16'>
						<div className='w-20 h-20 mx-auto mb-6 text-gray-300'>
							<Search className='w-full h-full' />
						</div>
						<h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-4'>
							No notices found
						</h3>
						<Button
							onClick={() => {
								setSearchTerm('');
								setSelectedCategory('all');
								setSelectedPriority('all');
							}}
							className='bg-blue-600 hover:bg-blue-700 text-white'>
							Clear Filters
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
