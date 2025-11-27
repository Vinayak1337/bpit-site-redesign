'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import Editable from '@/components/ui/Editable';
import PartnersForm from './PartnersForm';
import type { RecruitersData } from '@/app/(Private Pages)/actions/recruiters';

interface PartnersEditorProps {
	initialData: RecruitersData;
	pageSlug: string;
}

export default function PartnersEditor({ initialData, pageSlug }: PartnersEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<RecruitersData>(initial);

	const formContent = useMemo(
		() => (
			<PartnersForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Industry Partners Section" formContent={formContent}>
			<section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-12"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Industry Partners
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Showing {currentData.recruiters?.length || 0} companies across all categories
						</p>
					</motion.div>

					{currentData.recruiters && currentData.recruiters.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{currentData.recruiters.map((recruiter, index) => {
								const ExternalLinkIcon = Icons.ExternalLink;
								const Building2Icon = Icons.Building2;
								const MapPinIcon = Icons.MapPin;
								const CalendarIcon = Icons.Calendar;
								const StarIcon = Icons.Star;

								return (
									<motion.div
										key={recruiter.name}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
									>
										{/* Company Header */}
										<div className="flex items-start justify-between mb-6">
											<div className="flex items-center space-x-4">
												<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl font-bold">
													{recruiter.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
												</div>
												<div>
													<h3 className="text-xl font-bold text-gray-900 mb-1">{recruiter.name}</h3>
													<span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
														recruiter.type === 'MNC' ? 'bg-blue-100 text-blue-800' :
														recruiter.type === 'Product Giant' ? 'bg-purple-100 text-purple-800' :
														recruiter.type === 'Consulting' ? 'bg-green-100 text-green-800' :
														recruiter.type === 'Banking' ? 'bg-orange-100 text-orange-800' :
														recruiter.type === 'Unicorn' ? 'bg-pink-100 text-pink-800' :
														recruiter.type === 'R&D' ? 'bg-indigo-100 text-indigo-800' :
														recruiter.type === 'Fintech' ? 'bg-teal-100 text-teal-800' :
														'bg-gray-100 text-gray-800'
													}`}>
														{recruiter.type}
													</span>
												</div>
											</div>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => window.open(recruiter.website, '_blank')}
												className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-300"
											>
												<ExternalLinkIcon className="w-4 h-4 text-gray-400 hover:text-blue-600" />
											</Button>
										</div>

										{/* Company Info */}
										<div className="space-y-4 mb-6">
											<p className="text-gray-600 text-sm leading-relaxed">{recruiter.description}</p>
											
											<div className="flex items-center space-x-2">
												<Building2Icon className="w-4 h-4 text-gray-400" />
												<div>
													<p className="text-xs text-gray-500">Sector</p>
													<p className="text-sm font-semibold text-gray-900">{recruiter.sector}</p>
												</div>
											</div>

											<div className="flex items-center space-x-2">
												<MapPinIcon className="w-4 h-4 text-gray-400" />
												<span className="text-sm text-gray-600">{recruiter.location}</span>
											</div>
										</div>

										{/* Footer */}
										<div className="pt-4 border-t border-gray-100 flex items-center justify-between">
											<div className="flex items-center space-x-2">
												<CalendarIcon className="w-4 h-4 text-gray-400" />
												<span className="text-xs text-gray-500">Est. {recruiter.established}</span>
											</div>
											<div className="flex items-center space-x-1">
												<StarIcon className="w-4 h-4 text-blue-500 fill-current" />
												<span className="text-sm font-semibold text-gray-700">Industry Partner</span>
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>
					) : (
						<div className='text-center text-gray-500 py-12'>
							No partner companies added. Click to add partners.
						</div>
					)}
				</div>
			</section>
		</Editable>
	);
}
