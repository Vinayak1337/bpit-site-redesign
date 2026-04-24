'use client';

import { useMemo, useState } from 'react';
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
import type { SyllabusProgramItem } from '@/app/(Private Pages)/actions/academia-syllabus-ordinance';

type Props = { programs: SyllabusProgramItem[] };

export default function SyllabusPrograms({ programs }: Props) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
	const [selectedType, setSelectedType] = useState<string>('all');
	const [sortBy, setSortBy] = useState<'name' | 'updated' | 'size'>('name');

	const allItems = programs;

	const filteredItems = useMemo(() => {
		let filtered = allItems;

		if (searchTerm) {
			const q = searchTerm.toLowerCase();
			filtered = filtered.filter(item => {
				const titleMatch = item.name.toLowerCase().includes(q);
				const descMatch = (item.description ?? '').toLowerCase().includes(q);
				const courseMatch =
					item.type === 'syllabus' &&
					item.courses.some(c => c.toLowerCase().includes(q));
				return titleMatch || descMatch || courseMatch;
			});
		}

		if (selectedType !== 'all') {
			filtered = filtered.filter(item => item.type === selectedType);
		}

		if (selectedDepartment !== 'all') {
			filtered = filtered.filter(item => {
				if (item.type === 'syllabus') return item.name === selectedDepartment;
				if (item.type === 'ordinance')
					return item.department === selectedDepartment;
				return false;
			});
		}

		const sorted = [...filtered].sort((a, b) => {
			switch (sortBy) {
				case 'name':
					return a.name.localeCompare(b.name);
				case 'updated':
					return (
						new Date(b.lastUpdated || 0).getTime() -
						new Date(a.lastUpdated || 0).getTime()
					);
				case 'size':
					return (a.size || '').localeCompare(b.size || '');
				default:
					return 0;
			}
		});

		return sorted;
	}, [allItems, searchTerm, selectedType, selectedDepartment, sortBy]);

	const uniqueDepartments = [
		'all',
		...Array.from(
			new Set(
				allItems
					.map(item => {
						if (item.type === 'syllabus') return item.name;
						if (item.type === 'ordinance') return item.department;
						return null;
					})
					.filter((d): d is string => !!d)
			)
		)
	];

	const colorClass = (color: string, shade: string) =>
		`${color}-${shade}`;

	return (
		<>
			<motion.div
				className='sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm'
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6 }}>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
						<div className='relative flex-1 max-w-md w-full'>
							<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
							<input
								type='text'
								placeholder='Search syllabi and ordinances...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900 placeholder-gray-500'
							/>
						</div>

						<div className='flex flex-wrap gap-3 items-center'>
							<div className='relative'>
								<select
									value={selectedType}
									onChange={e => setSelectedType(e.target.value)}
									className='appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900'>
									<option value='all'>All Types</option>
									<option value='syllabus'>Syllabi</option>
									<option value='ordinance'>Ordinances</option>
								</select>
								<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none' />
							</div>

							<div className='relative'>
								<select
									value={selectedDepartment}
									onChange={e => setSelectedDepartment(e.target.value)}
									className='appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900'>
									{uniqueDepartments.map(dept => (
										<option key={dept} value={dept}>
											{dept === 'all' ? 'All Departments' : dept}
										</option>
									))}
								</select>
								<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none' />
							</div>

							<div className='relative'>
								<select
									value={sortBy}
									onChange={e =>
										setSortBy(e.target.value as 'name' | 'updated' | 'size')
									}
									className='appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900'>
									<option value='name'>Sort by Name</option>
									<option value='updated'>Sort by Updated</option>
									<option value='size'>Sort by Size</option>
								</select>
								<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none' />
							</div>
						</div>
					</div>

					<div className='flex flex-wrap gap-2 mt-4'>
						{(['all', 'syllabus', 'ordinance'] as const).map(type => (
							<Button
								key={type}
								variant={selectedType === type ? 'default' : 'outline'}
								size='sm'
								onClick={() => setSelectedType(type)}
								className={`rounded-full transition-all duration-200 ${
									selectedType === type
										? 'bg-blue-600 text-white shadow-lg transform scale-105'
										: 'hover:bg-blue-50 hover:border-blue-200'
								}`}>
								{type === 'all' ? (
									<Filter className='w-4 h-4 mr-2' />
								) : type === 'syllabus' ? (
									<BookOpen className='w-4 h-4 mr-2' />
								) : (
									<FileText className='w-4 h-4 mr-2' />
								)}
								{type === 'all'
									? 'All Items'
									: type === 'syllabus'
									? 'Syllabi'
									: 'Ordinances'}
								<span className='ml-2 bg-white/20 text-xs px-2 py-0.5 rounded-full'>
									{type === 'all'
										? allItems.length
										: allItems.filter(i => i.type === type).length}
								</span>
							</Button>
						))}
					</div>
				</div>
			</motion.div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
				<h2 className='text-2xl font-bold text-gray-900'>
					{selectedType === 'all'
						? 'All Documents'
						: selectedType === 'syllabus'
						? 'Department Syllabi'
						: 'Academic Ordinances'}
				</h2>
				<p className='text-gray-600 mt-1'>
					Showing {filteredItems.length} of {allItems.length} documents
				</p>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12'>
				{filteredItems.length > 0 ? (
					<motion.div
						className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
						initial='hidden'
						animate='visible'
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: { staggerChildren: 0.1 }
							}
						}}>
						<AnimatePresence>
							{filteredItems.map((item, index) => (
								<motion.div
									key={`${item.type}-${item.id}-${index}`}
									layout
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 }
									}}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.3 }}>
									{item.type === 'syllabus' ? (
										<Card
											className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-${colorClass(
												item.color,
												'50'
											)} to-${colorClass(item.color, '100')} h-full`}>
											<CardHeader className='pb-4'>
												<div className='flex items-center justify-between mb-2'>
													<div
														className={`p-2 bg-${colorClass(
															item.color,
															'600'
														)} rounded-lg`}>
														<BookOpen className='w-5 h-5 text-white' />
													</div>
													<span
														className={`text-xs font-semibold text-${colorClass(
															item.color,
															'700'
														)} bg-white px-2 py-1 rounded`}>
														{item.code}
													</span>
												</div>
												<CardTitle
													className={`text-lg text-${colorClass(
														item.color,
														'900'
													)}`}>
													{item.name}
												</CardTitle>
											</CardHeader>
											<CardContent className='flex-1'>
												<div className='space-y-3 h-full flex flex-col'>
													<div className='flex-1'>
														<span className='text-sm font-medium text-gray-700'>
															Courses Offered:
														</span>
														<div className='flex flex-wrap gap-1 mt-1'>
															{item.courses.map((course, i) => (
																<span
																	key={i}
																	className={`text-xs bg-${colorClass(
																		item.color,
																		'200'
																	)} text-${colorClass(
																		item.color,
																		'800'
																	)} px-2 py-1 rounded`}>
																	{course}
																</span>
															))}
														</div>
													</div>
													<div className='flex items-center justify-between mt-auto'>
														<span
															className={`text-sm text-${colorClass(
																item.color,
																'700'
															)}`}>
															{item.syllabusCount} Semester Syllabi
														</span>
														{item.documentUrl ? (
															<a
																href={item.documentUrl}
																target='_blank'
																rel='noopener noreferrer'>
																<Button
																	size='sm'
																	className={`bg-${colorClass(
																		item.color,
																		'600'
																	)} hover:bg-${colorClass(
																		item.color,
																		'700'
																	)}`}>
																	View Syllabi
																</Button>
															</a>
														) : (
															<Button
																size='sm'
																className={`bg-${colorClass(
																	item.color,
																	'600'
																)} hover:bg-${colorClass(item.color, '700')}`}>
																View Syllabi
															</Button>
														)}
													</div>
												</div>
											</CardContent>
										</Card>
									) : (
										<Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full'>
											<CardHeader className='pb-4'>
												<div className='flex items-start justify-between mb-2'>
													<FileText className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
													{item.size ? (
														<span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded'>
															{item.size}
														</span>
													) : null}
												</div>
												<CardTitle className='text-lg leading-tight'>
													{item.name}
												</CardTitle>
											</CardHeader>
											<CardContent className='flex-1'>
												<div className='h-full flex flex-col'>
													<p className='text-sm text-gray-600 mb-4 flex-1'>
														{item.description}
													</p>
													<div className='flex items-center justify-between mt-auto'>
														<span className='text-xs text-gray-500'>
															{item.lastUpdated
																? `Updated: ${new Date(
																		item.lastUpdated
																  ).toLocaleDateString()}`
																: ''}
														</span>
														{item.documentUrl ? (
															<a
																href={item.documentUrl}
																target='_blank'
																rel='noopener noreferrer'>
																<Button
																	size='sm'
																	className='bg-blue-600 hover:bg-blue-700'>
																	<Download className='w-4 h-4 mr-1' />
																	Download
																</Button>
															</a>
														) : (
															<Button
																size='sm'
																className='bg-blue-600 hover:bg-blue-700'>
																<Download className='w-4 h-4 mr-1' />
																Download
															</Button>
														)}
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
						className='text-center py-16'>
						<div className='w-24 h-24 mx-auto mb-6 text-gray-300'>
							<Search className='w-full h-full' />
						</div>
						<h3 className='text-2xl font-semibold text-gray-900 mb-4'>
							No documents found
						</h3>
						<p className='text-gray-500 text-lg mb-8'>
							Try adjusting your search terms or filters to find what
							you&apos;re looking for.
						</p>
						<Button
							onClick={() => {
								setSearchTerm('');
								setSelectedDepartment('all');
								setSelectedType('all');
							}}
							className='bg-blue-600 hover:bg-blue-700 text-white'>
							Clear All Filters
						</Button>
					</motion.div>
				)}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
						<div>
							<GraduationCap className='w-12 h-12 text-blue-200 mx-auto mb-3' />
							<h3 className='text-3xl font-bold mb-2'>
								{allItems.filter(i => i.type === 'syllabus').length}
							</h3>
							<p className='text-blue-100'>Engineering Departments</p>
						</div>
						<div>
							<Calendar className='w-12 h-12 text-blue-200 mx-auto mb-3' />
							<h3 className='text-3xl font-bold mb-2'>8</h3>
							<p className='text-blue-100'>Semesters per Program</p>
						</div>
						<div>
							<Users className='w-12 h-12 text-blue-200 mx-auto mb-3' />
							<h3 className='text-3xl font-bold mb-2'>180+</h3>
							<p className='text-blue-100'>Credits per Degree</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
					<div className='flex items-start space-x-3'>
						<div className='flex-shrink-0'>
							<div className='p-2 bg-yellow-100 rounded-lg'>
								<FileText className='w-5 h-5 text-yellow-600' />
							</div>
						</div>
						<div>
							<h3 className='text-lg font-semibold text-yellow-800 mb-2'>
								Important Notice
							</h3>
							<p className='text-yellow-700 text-sm leading-relaxed'>
								All syllabi and ordinances are updated regularly as per GGSIPU
								guidelines. Students are advised to download the latest
								versions before each academic session. For any queries
								regarding curriculum or academic regulations, please contact
								the respective department offices.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
}
