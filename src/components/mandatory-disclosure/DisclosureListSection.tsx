'use client';

import React from 'react';
import {
	FileText,
	ExternalLink,
	Shield,
	FolderOpen,
	Download,
	CheckCircle,
	Calendar,
	Award,
	Globe,
	BookOpen,
	TrendingUp,
	Users,
	Target
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DisclosureData } from '@/lib/schemas/mandatory-disclosure';

const COLOR_VARIANTS = [
	{
		bg: 'bg-blue-100',
		text: 'text-blue-600',
		infoBg: 'bg-blue-50',
		infoText: 'text-blue-700',
		infoTitle: 'text-blue-800'
	},
	{
		bg: 'bg-purple-100',
		text: 'text-purple-600',
		infoBg: 'bg-purple-50',
		infoText: 'text-purple-700',
		infoTitle: 'text-purple-800'
	},
	{
		bg: 'bg-green-100',
		text: 'text-green-600',
		infoBg: 'bg-green-50',
		infoText: 'text-green-700',
		infoTitle: 'text-green-800'
	},
	{
		bg: 'bg-orange-100',
		text: 'text-orange-600',
		infoBg: 'bg-orange-50',
		infoText: 'text-orange-700',
		infoTitle: 'text-orange-800'
	}
];

const ICONS = [Award, Globe, FolderOpen, BookOpen];

export default function DisclosureListSection({
	data
}: {
	data: DisclosureData;
}) {
	// Group items by category
	const groupedItems = data.items.reduce((acc, item) => {
		const category = item.category || 'General';
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(item);
		return acc;
	}, {} as Record<string, typeof data.items>);

	// Get sorted categories (General first, others alphabetical)
	const categories = Object.keys(groupedItems).sort((a, b) => {
		if (a === 'General') return -1;
		if (b === 'General') return 1;
		return a.localeCompare(b);
	});

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<div className='max-w-6xl mx-auto min-w-0 space-y-8 sm:space-y-12'>
				{/* Introduction Card - Like "Quality Recognition" */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200'>
					<div className='text-center mb-8'>
						<div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
							<Shield className='w-8 h-8 text-green-600' />
						</div>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>
							Regulatory Compliance
						</h2>
						<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
							BPIT maintains transparency through mandatory disclosures as
							required by AICTE, UGC, and other regulatory bodies ensuring
							accountability in technical education.
						</p>
					</div>
				</motion.div>

				{/* Document Category Cards - Like NAAC/NBA/ISO Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
					{categories.map((category, index) => {
						const variant = COLOR_VARIANTS[index % COLOR_VARIANTS.length];
						const IconComponent = ICONS[index % ICONS.length];
						const items = groupedItems[category];

						return (
							<motion.div
								key={category}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
								className='min-w-0 bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'>
								<div className='text-center mb-6'>
									<div
										className={`w-16 h-16 ${variant.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
										<IconComponent className={`w-8 h-8 ${variant.text}`} />
									</div>
									<h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words'>
										{category}
									</h3>
									<p className={`${variant.text} font-medium`}>
										{items.length} Document{items.length !== 1 ? 's' : ''}{' '}
										Available
									</p>
								</div>

								<div className='space-y-4'>
									{/* Info Box - Like the Grade/Programs box */}
									<div className={`${variant.infoBg} rounded-lg p-4 min-w-0`}>
										<div className='flex items-center gap-2 mb-2'>
											<CheckCircle className={`w-5 h-5 ${variant.text}`} />
											<span className={`font-semibold ${variant.infoTitle}`}>
												Documents
											</span>
										</div>
										<div className='space-y-2'>
											{items.slice(0, 3).map((item, idx) => (
												<Link
													key={item.id}
													href={item.url}
													target={
														item.url.startsWith('http') ? '_blank' : undefined
													}
													className={`flex min-w-0 items-center gap-2 text-sm ${variant.infoText} hover:underline`}>
													{item.url.endsWith('.pdf') ? (
														<Download className='w-3 h-3 flex-shrink-0' />
													) : (
														<ExternalLink className='w-3 h-3 flex-shrink-0' />
													)}
													<span className='truncate'>{item.title}</span>
												</Link>
											))}
											{items.length > 3 && (
												<p className={`text-xs ${variant.infoText} mt-2`}>
													+{items.length - 3} more document
													{items.length - 3 !== 1 ? 's' : ''}
												</p>
											)}
										</div>
									</div>

									{/* Meta info - Like Accredited/Valid dates */}
									<div className='space-y-2'>
										<div className='flex items-center gap-2 text-sm text-gray-600'>
											<Calendar className='w-4 h-4' />
											<span>Last Updated: 2024</span>
										</div>
										<div className='flex items-center gap-2 text-sm text-gray-600'>
											<Target className='w-4 h-4' />
											<span>Status: Active</span>
										</div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Benefits Section - Like Benefits of Accreditation */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className='bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200'>
					<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
						Why Mandatory Disclosure?
					</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
						<div className='text-center'>
							<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<TrendingUp className='w-6 h-6 text-blue-600' />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>Transparency</h4>
							<p className='text-sm text-gray-600'>
								Ensures open access to institutional information for
								stakeholders.
							</p>
						</div>

						<div className='text-center'>
							<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<Users className='w-6 h-6 text-green-600' />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>
								Accountability
							</h4>
							<p className='text-sm text-gray-600'>
								Demonstrates commitment to regulatory compliance and ethics.
							</p>
						</div>

						<div className='text-center'>
							<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<Globe className='w-6 h-6 text-purple-600' />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>
								Trust Building
							</h4>
							<p className='text-sm text-gray-600'>
								Builds confidence among students, parents, and recruiters.
							</p>
						</div>

						<div className='text-center'>
							<div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<BookOpen className='w-6 h-6 text-orange-600' />
							</div>
							<h4 className='font-semibold text-gray-900 mb-2'>
								Informed Decisions
							</h4>
							<p className='text-sm text-gray-600'>
								Helps prospective students make informed choices.
							</p>
						</div>
					</div>
				</motion.div>

				{/* Compliance Section - Like Compliance & Standards */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className='bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200'>
					<div className='text-center mb-8'>
						<h3 className='text-2xl font-bold text-gray-900 mb-4'>
							Regulatory Bodies
						</h3>
						<p className='text-gray-600 max-w-3xl mx-auto'>
							Our disclosures comply with guidelines from major regulatory
							authorities governing technical education in India.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
						<div className='min-w-0 bg-white rounded-xl p-4 sm:p-6 shadow-sm'>
							<h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
								<FileText className='w-5 h-5 text-blue-600' />
								AICTE Requirements
							</h4>
							<ul className='space-y-2 text-gray-600'>
								<li className='flex items-start gap-2'>
									<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
									<span>Approval letters and extension orders</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
									<span>Faculty and staff information</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
									<span>Infrastructure and facilities details</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
									<span>Fee structure and financial aid</span>
								</li>
							</ul>
						</div>

						<div className='min-w-0 bg-white rounded-xl p-4 sm:p-6 shadow-sm'>
							<h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
								<Shield className='w-5 h-5 text-purple-600' />
								University Guidelines
							</h4>
							<ul className='space-y-2 text-gray-600'>
								<li className='flex items-start gap-2'>
									<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
									<span>Affiliation and recognition status</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
									<span>Academic programs offered</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
									<span>Admission process and criteria</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
									<span>Student grievance mechanisms</span>
								</li>
							</ul>
						</div>
					</div>
				</motion.div>

				{/* All Documents Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className='bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200'>
					<div className='text-center mb-8'>
						<div className='w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<FileText className='w-8 h-8 text-white' />
						</div>
						<h3 className='text-2xl font-bold text-gray-900 mb-4'>
							All Documents
						</h3>
						<p className='text-gray-600 max-w-3xl mx-auto'>
							Quick access to all mandatory disclosure documents organized by
							category.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{data.items.map((item, index) => (
							<Link
								key={item.id}
								href={item.url}
								target={item.url.startsWith('http') ? '_blank' : undefined}
								className='group flex min-w-0 items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all duration-200'>
								<div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-blue-200 flex-shrink-0'>
									{item.url.endsWith('.pdf') ? (
										<Download className='w-5 h-5 text-gray-400 group-hover:text-blue-600' />
									) : (
										<ExternalLink className='w-5 h-5 text-gray-400 group-hover:text-blue-600' />
									)}
								</div>
								<div className='min-w-0 overflow-hidden'>
									<p className='font-medium text-gray-700 group-hover:text-blue-700 truncate text-sm'>
										{item.title}
									</p>
									<p className='text-xs text-gray-500'>
										{item.category || 'General'}
									</p>
								</div>
							</Link>
						))}
					</div>

					{data.items.length === 0 && (
						<div className='text-center py-12 text-gray-500'>
							<FileText className='w-12 h-12 text-gray-300 mx-auto mb-4' />
							<p>No disclosure documents available at the moment.</p>
						</div>
					)}
				</motion.div>
			</div>
		</div>
	);
}
