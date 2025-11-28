'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Editable from '@/components/ui/Editable';
import PartnersForm from './PartnersForm';
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';

interface PartnersEditorProps {
	initialData: InternshipsData;
	pageSlug: string;
}

export default function PartnersEditor({ initialData, pageSlug }: PartnersEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<InternshipsData>(initial);
	const [activeFilter, setActiveFilter] = useState<string>('All');
	const [searchQuery, setSearchQuery] = useState('');

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

	// Filter and search logic
	const filteredOpportunities = currentData.opportunities.filter(opp => {
		const matchesFilter = activeFilter === 'All' || opp.category === activeFilter;
		const matchesSearch = searchQuery === '' || 
			opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
			opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			opp.domains.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesFilter && matchesSearch;
	});

	return (
		<Editable label="Industry Partners Section" formContent={formContent}>
			<section className="py-20 bg-gradient-to-br from-gray-50 to-white">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Industry <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Partners</span>
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
					</motion.div>

					{/* Filters */}
					<div className="flex flex-wrap justify-center gap-3 mb-8">
						{['All', ...currentData.filters].map(filter => (
							<button
								key={filter}
								onClick={() => setActiveFilter(filter)}
								className={`px-6 py-2 rounded-full font-medium transition-all ${
									activeFilter === filter
										? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
										: 'bg-white text-gray-600 border border-gray-300 hover:border-blue-600'
								}`}>
								{filter}
							</button>
						))}
					</div>

					{/* Search */}
					<div className="max-w-2xl mx-auto mb-12">
						<div className="relative">
							<Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								type="text"
								placeholder="Search by company, role, or domain..."
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
							/>
						</div>
					</div>

					{/* Opportunities Grid */}
					<div className="grid md:grid-cols-2 gap-6">
						{filteredOpportunities.map((opportunity, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.05 }}
								className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
								{/* Header */}
								<div className="flex items-start justify-between mb-6">
									<div className="flex items-center space-x-4">
										<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl font-bold">
											{opportunity.company.split(' ').map(word => word[0]).join('').substring(0, 2)}
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-900 mb-1">{opportunity.company}</h3>
											<p className="text-blue-600 font-semibold">{opportunity.title}</p>
										</div>
									</div>
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
										{opportunity.category}
									</span>
								</div>

								{/* Description */}
								<p className="text-gray-600 mb-6 leading-relaxed">{opportunity.description}</p>

								{/* Location */}
								<div className="flex items-center space-x-2 mb-6">
									<Icons.MapPin className="w-4 h-4 text-gray-400" />
									<span className="text-sm text-gray-600">{opportunity.location}</span>
								</div>

								{/* Domains */}
								<div className="mb-6">
									<h4 className="text-sm font-semibold text-gray-900 mb-3">Focus Areas:</h4>
									<div className="flex flex-wrap gap-2">
										{opportunity.domains.map((domain, i) => (
											<span
												key={i}
												className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs rounded-full border border-blue-200">
												{domain}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{filteredOpportunities.length === 0 && (
						<div className="text-center py-12 text-gray-500">
							<Icons.Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
							<p className="text-lg">No opportunities found matching your criteria</p>
						</div>
					)}
				</div>
			</section>
		</Editable>
	);
}
