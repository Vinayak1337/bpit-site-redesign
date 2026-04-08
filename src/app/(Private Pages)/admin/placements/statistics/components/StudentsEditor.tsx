'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	GraduationCap,
	Building2,
	Calendar,
	Sliders,
	Trophy,
	Filter,
	Search,
	ChevronLeft,
	ChevronRight,
	DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import Editable from '@/components/ui/Editable';
import StudentsForm from './StudentsForm';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface StudentsEditorProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
}

export default function StudentsEditor({ initialData, pageSlug }: StudentsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementStatisticsData>(initial);

	const formContent = useMemo(
		() => (
			<StudentsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	// Student filters
	const [studentFilters, setStudentFilters] = useState({
		year: currentData.years?.[0] || '2024',
		department: 'All',
		company: 'All',
		minSalary: 0
	});
	const [currentPage, setCurrentPage] = useState(1);
	const studentsPerPage = 10;

	// Get unique companies for filter
	const allCompanies = [
		'All',
		...Array.from(
			new Set((currentData.studentPlacements || []).map(s => s.company))
		).sort()
	];

	// Filter students
	const filteredStudents = (currentData.studentPlacements || [])
		.filter(student => {
			const matchesYear =
				studentFilters.year === 'All' || student.batch === studentFilters.year;
			const matchesDept =
				studentFilters.department === 'All' ||
				student.department === studentFilters.department;
			const matchesCompany =
				studentFilters.company === 'All' ||
				student.company === studentFilters.company;
			const matchesSalary = student.package >= studentFilters.minSalary;

			return matchesYear && matchesDept && matchesCompany && matchesSalary;
		})
		.sort((a, b) => b.package - a.package);

	const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
	const startIndex = (currentPage - 1) * studentsPerPage;
	const currentStudents = filteredStudents.slice(
		startIndex,
		startIndex + studentsPerPage
	);

	return (
		<Editable label="Top Placed Students Section" formContent={formContent}>
			<section className='py-16 bg-white -mt-10 relative z-20'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-12'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							Top Placed Students
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Discover our students&apos; exceptional placement achievements with
							advanced filtering
						</p>
					</motion.div>

					{/* Filter Interface */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='max-w-6xl mx-auto mb-16'>
						<div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'>
							<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8'>
								<div className='flex items-center space-x-3 mb-4 lg:mb-0'>
									<div className='p-2 bg-blue-100 rounded-lg'>
										<Sliders className='w-5 h-5 text-blue-600' />
									</div>
									<div>
										<h3 className='text-2xl font-bold text-gray-900'>
											Filter Students
										</h3>
										<p className='text-gray-600 text-sm'>Refine your search</p>
									</div>
								</div>
								<div className='flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200'>
									<Trophy className='w-4 h-4 text-blue-600' />
									<span className='text-lg font-bold text-blue-700'>
										{filteredStudents.length}
									</span>
									<span className='text-sm text-blue-600'>results</span>
								</div>
							</div>

							{/* Filter Grid */}
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
										<Calendar className='w-4 h-4 text-blue-600' />
										Batch Year
									</label>
									<Select
										value={studentFilters.year}
										onValueChange={value => {
											setStudentFilters({ ...studentFilters, year: value });
											setCurrentPage(1);
										}}>
										<SelectTrigger className='w-full h-12 border border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg bg-white transition-colors'>
											<SelectValue placeholder='All Years' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='All'>All Years</SelectItem>
											{(currentData.years || []).map(year => (
												<SelectItem key={year} value={year}>
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
										<GraduationCap className='w-4 h-4 text-green-600' />
										Department
									</label>
									<Select
										value={studentFilters.department}
										onValueChange={value => {
											setStudentFilters({ ...studentFilters, department: value });
											setCurrentPage(1);
										}}>
										<SelectTrigger className='w-full h-12 border border-gray-300 hover:border-green-400 focus:border-green-500 rounded-lg bg-white transition-colors'>
											<SelectValue placeholder='All Departments' />
										</SelectTrigger>
										<SelectContent>
											{(currentData.departments || []).map(dept => (
												<SelectItem key={dept} value={dept}>
													{dept === 'All' ? 'All Departments' : dept}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
										<Building2 className='w-4 h-4 text-purple-600' />
										Company
									</label>
									<Select
										value={studentFilters.company}
										onValueChange={value => {
											setStudentFilters({ ...studentFilters, company: value });
											setCurrentPage(1);
										}}>
										<SelectTrigger className='w-full h-12 border border-gray-300 hover:border-purple-400 focus:border-purple-500 rounded-lg bg-white transition-colors'>
											<SelectValue placeholder='All Companies' />
										</SelectTrigger>
										<SelectContent>
											{allCompanies.map(company => (
												<SelectItem key={company} value={company}>
													{company}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
										<DollarSign className='w-4 h-4 text-orange-600' />
										Min Package (LPA)
									</label>
									<Input
										type='number'
										min='0'
										max='20'
										step='0.5'
										value={studentFilters.minSalary}
										onChange={e => {
											setStudentFilters({
												...studentFilters,
												minSalary: parseFloat(e.target.value) || 0
											});
											setCurrentPage(1);
										}}
										className='h-12 border border-gray-300 hover:border-orange-400 focus:border-orange-500 rounded-lg bg-white transition-colors'
										placeholder='0.0'
									/>
								</div>
							</div>

							{/* Action Buttons */}
							<div className='flex flex-wrap gap-3 justify-center'>
								<Button
									onClick={() => {
										setStudentFilters({
											year: 'All',
											department: 'All',
											company: 'All',
											minSalary: 0
										});
										setCurrentPage(1);
									}}
									variant='outline'
									className='border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2 rounded-lg transition-colors'>
									<Filter className='w-4 h-4 mr-2' />
									Clear Filters
								</Button>
								<Button
									onClick={() => {
										setStudentFilters({
											...studentFilters,
											year: currentData.years?.[0] || '2024',
											minSalary: 10
										});
										setCurrentPage(1);
									}}
									className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors'>
									<Trophy className='w-4 h-4 mr-2' />
									Top Packages {currentData.years?.[0] || '2024'}
								</Button>
							</div>
						</div>
					</motion.div>

					{/* Student Results */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}>
						<div className='flex items-center justify-between mb-8'>
							<div>
								<h3 className='text-3xl font-bold text-gray-900 mb-2'>
									Student Placements
								</h3>
								<p className='text-gray-600'>
									{currentPage === 1
										? 'Showing top results'
										: `Page ${currentPage} of ${totalPages}`}{' '}
									• Sorted by package (highest first)
								</p>
							</div>
							<div className='text-right'>
								<div className='text-sm text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-3 rounded-2xl border'>
									<div className='font-semibold text-gray-800'>
										{startIndex + 1}-
										{Math.min(
											startIndex + studentsPerPage,
											filteredStudents.length
										)}{' '}
										of {filteredStudents.length}
									</div>
									<div className='text-xs text-gray-500'>students</div>
								</div>
							</div>
						</div>

						{filteredStudents.length === 0 ? (
							<div className='text-center py-20'>
								<div className='w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8'>
									<Search className='w-14 h-14 text-gray-400' />
								</div>
								<h3 className='text-3xl font-bold text-gray-900 mb-4'>
									No students found
								</h3>
								<p className='text-gray-600 text-lg'>
									Try adjusting your filter criteria to see more results
								</p>
							</div>
						) : (
							<>
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
									<AnimatePresence>
										{currentStudents.map((student, index) => {
											const globalIndex = startIndex + index;
											const isTopThree = globalIndex < 3;

											return (
												<motion.div
													key={`${student.name}-${student.company}-page-${currentPage}`}
													initial={{ opacity: 0, y: 30 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -30 }}
													transition={{ duration: 0.4, delay: index * 0.05 }}
													className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 ${
														isTopThree && currentPage === 1
															? globalIndex === 0
																? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100'
																: globalIndex === 1
																	? 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100'
																	: 'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100'
															: 'border-blue-200 hover:border-blue-300'
													}`}>
													{isTopThree && currentPage === 1 && (
														<div className='absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg'>
															{globalIndex + 1}
														</div>
													)}

													<div className='flex items-center justify-between'>
														<div className='flex items-center space-x-6'>
															{student.image ? (
																<img
																	src={student.image}
																	alt={student.name}
																	className='w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-blue-100'
																/>
															) : (
																<div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-2 border-blue-100'>
																	{student.name.split(' ').map(n => n[0]).join('')}
																</div>
															)}
															<div>
																<h4 className='text-xl font-bold text-gray-900 mb-2'>
																	{student.name}
																</h4>
																<div className='space-y-2'>
																	<div className='flex items-center space-x-3 text-gray-600'>
																		<GraduationCap className='w-5 h-5' />
																		<span className='font-semibold'>
																			{student.department}
																		</span>
																		<span className='text-gray-400'>•</span>
																		<span>Batch {student.batch}</span>
																	</div>
																	<div className='flex items-center space-x-3 text-gray-600'>
																		<Building2 className='w-5 h-5' />
																		<span className='font-semibold'>
																			{student.company}
																		</span>
																		<span className='text-gray-400'>•</span>
																		<span>{student.role}</span>
																	</div>
																</div>
															</div>
														</div>
														<div className='text-right'>
															<div className='text-3xl font-bold text-green-600 mb-1'>
																₹{student.package}
															</div>
															<div className='text-sm text-gray-500 font-semibold'>
																LPA
															</div>
														</div>
													</div>
												</motion.div>
											);
										})}
									</AnimatePresence>
								</div>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className='flex items-center justify-center space-x-3'>
										<Button
											onClick={() =>
												setCurrentPage(prev => Math.max(prev - 1, 1))
											}
											disabled={currentPage === 1}
											variant='outline'
											className='px-8 py-4 font-semibold rounded-2xl border-2 disabled:opacity-50'>
											<ChevronLeft className='w-5 h-5 mr-2' />
											Previous
										</Button>

										<div className='flex space-x-2'>
											{Array.from(
												{ length: Math.min(totalPages, 5) },
												(_, i) => {
													let pageNum;
													if (totalPages <= 5) {
														pageNum = i + 1;
													} else if (currentPage <= 3) {
														pageNum = i + 1;
													} else if (currentPage >= totalPages - 2) {
														pageNum = totalPages - 4 + i;
													} else {
														pageNum = currentPage - 2 + i;
													}

													return (
														<Button
															key={pageNum}
															onClick={() => setCurrentPage(pageNum)}
															variant={
																currentPage === pageNum ? 'default' : 'outline'
															}
															className={`w-14 h-14 p-0 font-bold text-lg rounded-2xl border-2 transition-all duration-200 ${
																currentPage === pageNum
																	? 'bg-blue-600 text-white shadow-lg scale-110'
																	: 'text-gray-600 hover:bg-blue-50 hover:border-blue-300'
															}`}>
															{pageNum}
														</Button>
													);
												}
											)}
										</div>

										<Button
											onClick={() =>
												setCurrentPage(prev => Math.min(prev + 1, totalPages))
											}
											disabled={currentPage === totalPages}
											variant='outline'
											className='px-8 py-4 font-semibold rounded-2xl border-2 disabled:opacity-50'>
											Next
											<ChevronRight className='w-5 h-5 ml-2' />
										</Button>
									</div>
								)}
							</>
						)}
					</motion.div>
				</div>
			</section>
		</Editable>
	);
}
