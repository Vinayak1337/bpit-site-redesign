'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Sliders, Trophy, Calendar, GraduationCap, Building2,
	DollarSign, Filter, Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface TopStudentsSectionProps {
	data: PlacementStatisticsData;
}

const STUDENTS_PER_PAGE = 10;

export default function TopStudentsSection({ data }: TopStudentsSectionProps) {
	const [filters, setFilters] = useState({
		year: data?.years?.[0] || 'All',
		department: 'All',
		company: 'All',
		minSalary: 0
	});
	const [currentPage, setCurrentPage] = useState(1);

	const allCompanies = [
		'All',
		...Array.from(new Set((data.studentPlacements || []).map(s => s.company))).sort()
	];

	const filteredStudents = (data.studentPlacements || [])
		.filter(student => {
			const matchesYear = filters.year === 'All' || student.batch === filters.year;
			const matchesDept = filters.department === 'All' || student.department === filters.department;
			const matchesCompany = filters.company === 'All' || student.company === filters.company;
			const matchesSalary = student.package >= filters.minSalary;
			return matchesYear && matchesDept && matchesCompany && matchesSalary;
		})
		.sort((a, b) => b.package - a.package);

	const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
	const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
	const currentStudents = filteredStudents.slice(startIndex, startIndex + STUDENTS_PER_PAGE);

	const updateFilter = (key: keyof typeof filters, value: string | number) => {
		setFilters(prev => ({ ...prev, [key]: value }));
		setCurrentPage(1);
	};

	const clearFilters = () => {
		setFilters({ year: 'All', department: 'All', company: 'All', minSalary: 0 });
		setCurrentPage(1);
	};

	return (
		<section className='py-16 md:py-24 bg-white -mt-10 relative z-20'>
			<div className='container mx-auto px-4 sm:px-6'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
						Top Placed Students
					</h2>
					<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
						Discover our students&apos; exceptional placement achievements with advanced filtering
					</p>
				</motion.div>

				{/* Filter Panel */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='max-w-6xl mx-auto mb-12'>
					<div className='bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200'>
						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3'>
							<div className='flex items-center space-x-3'>
								<div className='p-2 bg-blue-100 rounded-lg'>
									<Sliders className='w-5 h-5 text-blue-600' />
								</div>
								<div>
									<h3 className='text-xl font-bold text-gray-900'>Filter Students</h3>
									<p className='text-gray-500 text-sm'>Refine your search</p>
								</div>
							</div>
							<div className='flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 self-start sm:self-auto'>
								<Trophy className='w-4 h-4 text-blue-600' />
								<span className='text-base font-bold text-blue-700'>{filteredStudents.length}</span>
								<span className='text-sm text-blue-600'>results</span>
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
							<div className='space-y-1.5'>
								<label className='text-sm font-medium text-gray-700 flex items-center gap-1.5'>
									<Calendar className='w-4 h-4 text-blue-600' aria-hidden='true' />
									Batch Year
								</label>
								<Select
									value={filters.year}
									onValueChange={v => updateFilter('year', v)}
									aria-label='Filter by batch year'>
									<SelectTrigger className='h-11 border-gray-300 hover:border-blue-400'>
										<SelectValue placeholder='All Years' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='All'>All Years</SelectItem>
										{(data.years || []).map(year => (
											<SelectItem key={year} value={year}>{year}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-1.5'>
								<label className='text-sm font-medium text-gray-700 flex items-center gap-1.5'>
									<GraduationCap className='w-4 h-4 text-green-600' aria-hidden='true' />
									Department
								</label>
								<Select
									value={filters.department}
									onValueChange={v => updateFilter('department', v)}
									aria-label='Filter by department'>
									<SelectTrigger className='h-11 border-gray-300 hover:border-green-400'>
										<SelectValue placeholder='All Departments' />
									</SelectTrigger>
									<SelectContent>
										{(data.departments || []).map(dept => (
											<SelectItem key={dept} value={dept}>
												{dept === 'All' ? 'All Departments' : dept}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-1.5'>
								<label className='text-sm font-medium text-gray-700 flex items-center gap-1.5'>
									<Building2 className='w-4 h-4 text-purple-600' aria-hidden='true' />
									Company
								</label>
								<Select
									value={filters.company}
									onValueChange={v => updateFilter('company', v)}
									aria-label='Filter by company'>
									<SelectTrigger className='h-11 border-gray-300 hover:border-purple-400'>
										<SelectValue placeholder='All Companies' />
									</SelectTrigger>
									<SelectContent>
										{allCompanies.map(company => (
											<SelectItem key={company} value={company}>{company}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-1.5'>
								<label htmlFor='min-salary' className='text-sm font-medium text-gray-700 flex items-center gap-1.5'>
									<DollarSign className='w-4 h-4 text-orange-600' aria-hidden='true' />
									Min Package (LPA)
								</label>
								<Input
									id='min-salary'
									type='number'
									min='0'
									max='20'
									step='0.5'
									value={filters.minSalary}
									onChange={e => updateFilter('minSalary', parseFloat(e.target.value) || 0)}
									className='h-11 border-gray-300 hover:border-orange-400'
									placeholder='0.0'
									aria-label='Minimum package in LPA'
								/>
							</div>
						</div>

						<div className='flex flex-wrap gap-3 justify-center'>
							<Button
								onClick={clearFilters}
								variant='outline'
								className='border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded-lg'>
								<Filter className='w-4 h-4 mr-2' />
								Clear Filters
							</Button>
							<Button
								onClick={() => {
									setFilters(prev => ({ ...prev, year: data.years?.[0] || '2024', minSalary: 10 }));
									setCurrentPage(1);
								}}
								className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg'>
								<Trophy className='w-4 h-4 mr-2' />
								Top Packages {data.years?.[0] || '2024'}
							</Button>
						</div>
					</div>
				</motion.div>

				{/* Student Results */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<div className='flex items-center justify-between mb-6'>
						<div>
							<h3 className='text-2xl font-bold text-gray-900 mb-1'>Student Placements</h3>
							<p className='text-gray-500 text-sm'>
								{currentPage === 1 ? 'Showing top results' : `Page ${currentPage} of ${totalPages}`}
								{' '}• Sorted by package (highest first)
							</p>
						</div>
						<div className='text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl border text-right'>
							<div className='font-semibold text-gray-800'>
								{startIndex + 1}–{Math.min(startIndex + STUDENTS_PER_PAGE, filteredStudents.length)} of {filteredStudents.length}
							</div>
							<div className='text-xs text-gray-500'>students</div>
						</div>
					</div>

					{filteredStudents.length === 0 ? (
						<div className='text-center py-20'>
							<div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
								<Search className='w-12 h-12 text-gray-400' />
							</div>
							<h3 className='text-2xl font-bold text-gray-900 mb-3'>No students found</h3>
							<p className='text-gray-500'>Try adjusting your filter criteria to see more results</p>
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12' role='list'>
								<AnimatePresence>
									{currentStudents.map((student, index) => {
										const globalIndex = startIndex + index;
										const isTopThree = globalIndex < 3 && currentPage === 1;
										const rankColors = [
											'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100',
											'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100',
											'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100'
										];

										return (
											<motion.div
												key={`${student.name}-${student.company}-p${currentPage}`}
												role='listitem'
												initial={{ opacity: 0, y: 30 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{ duration: 0.4, delay: index * 0.04 }}
												className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transition-all duration-300 ${
													isTopThree ? rankColors[globalIndex] : 'border-blue-200 hover:border-blue-300'
												}`}>
												{isTopThree && (
													<div className='absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md'>
														{globalIndex + 1}
													</div>
												)}

												<div className='flex items-center justify-between gap-4'>
													<div className='flex items-center gap-4'>
														<div className='relative w-16 h-16 flex-shrink-0'>
															<Image
																src={student.image || '/avatar-default.svg'}
																alt={student.name}
																fill
																className='rounded-xl object-cover border-2 border-blue-100'
																unoptimized
															/>
														</div>
														<div>
															<h4 className='text-lg font-bold text-gray-900 mb-1'>{student.name}</h4>
															<div className='space-y-1'>
																<div className='flex items-center gap-2 text-sm text-gray-600'>
																	<GraduationCap className='w-4 h-4 flex-shrink-0' />
																	<span className='font-medium'>{student.department}</span>
																	<span className='text-gray-400'>•</span>
																	<span>Batch {student.batch}</span>
																</div>
																<div className='flex items-center gap-2 text-sm text-gray-600'>
																	<Building2 className='w-4 h-4 flex-shrink-0' />
																	<span className='font-medium'>{student.company}</span>
																	<span className='text-gray-400'>•</span>
																	<span>{student.role}</span>
																</div>
															</div>
														</div>
													</div>
													<div className='text-right flex-shrink-0'>
														<div className='text-2xl font-bold text-green-600'>₹{student.package}</div>
														<div className='text-xs text-gray-500 font-semibold'>LPA</div>
													</div>
												</div>
											</motion.div>
										);
									})}
								</AnimatePresence>
							</div>

							{totalPages > 1 && (
								<div className='flex items-center justify-center gap-2'>
									<Button
										onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
										disabled={currentPage === 1}
										variant='outline'
										className='px-6 py-3 font-semibold rounded-xl border-2 disabled:opacity-40'
										aria-label='Previous page'>
										<ChevronLeft className='w-4 h-4 mr-1' />
										Prev
									</Button>

									<div className='flex gap-1.5'>
										{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
											let pageNum: number;
											if (totalPages <= 5) pageNum = i + 1;
											else if (currentPage <= 3) pageNum = i + 1;
											else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
											else pageNum = currentPage - 2 + i;
											return (
												<Button
													key={pageNum}
													onClick={() => setCurrentPage(pageNum)}
													variant={currentPage === pageNum ? 'default' : 'outline'}
													className={`w-11 h-11 p-0 font-bold rounded-xl border-2 ${
														currentPage === pageNum
															? 'bg-blue-600 text-white shadow-md'
															: 'text-gray-600 hover:bg-blue-50 hover:border-blue-300'
													}`}
													aria-label={`Page ${pageNum}`}
													aria-current={currentPage === pageNum ? 'page' : undefined}>
													{pageNum}
												</Button>
											);
										})}
									</div>

									<Button
										onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
										disabled={currentPage === totalPages}
										variant='outline'
										className='px-6 py-3 font-semibold rounded-xl border-2 disabled:opacity-40'
										aria-label='Next page'>
										Next
										<ChevronRight className='w-4 h-4 ml-1' />
									</Button>
								</div>
							)}
						</>
					)}
				</motion.div>
			</div>
		</section>
	);
}
