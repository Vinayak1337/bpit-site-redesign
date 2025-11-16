'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecruitersData } from '@/app/(Private Pages)/actions/recruiters';

interface RecruitersSectionProps {
	data: RecruitersData;
}

export default function RecruitersSection({ data }: RecruitersSectionProps) {
	const HeroIcon = Icons[data.hero.icon as keyof typeof Icons] as React.ElementType || Icons.Building2;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
			{/* Hero Section */}
			<section className={`relative py-20 bg-gradient-to-r ${data.hero.gradient}`}>
				<div className="relative z-10 container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center text-white max-w-4xl mx-auto"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
							className="flex justify-center mb-6"
						>
							<div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
								<HeroIcon className="w-12 h-12" />
							</div>
						</motion.div>
						
						<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
							{data.hero.title}
						</h1>
						<p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
							{data.hero.subtitle}
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 -mt-10 relative z-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{data.stats.map((stat, index) => {
							const StatIcon = Icons[stat.icon as keyof typeof Icons] as React.ElementType || Icons.TrendingUp;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
								>
									<div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
										<StatIcon className="w-8 h-8" />
									</div>
									<h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">{stat.value}</h3>
									<p className="text-gray-600 text-center font-medium">{stat.label}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Recruiters Grid */}
			<section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-12"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Industry Partners
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Showing {data.recruiters.length} companies across all categories
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{data.recruiters.map((recruiter, index) => {
							const ExternalLinkIcon = Icons.ExternalLink;
							const Building2Icon = Icons.Building2;
							const MapPinIcon = Icons.MapPin;
							const CalendarIcon = Icons.Calendar;
							const StarIcon = Icons.Star;

							return (
								<motion.div
									key={recruiter.name}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
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
				</div>
			</section>

			{/* CTA Section */}
			<section className={`py-20 bg-gradient-to-r ${data.cta.gradient}`}>
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center text-white max-w-4xl mx-auto"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							{data.cta.title}
						</h2>
						<p className="text-xl text-blue-200 mb-8 leading-relaxed">
							{data.cta.subtitle}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							{data.cta.buttons.map((btn, index) => {
								const BtnIcon = Icons[btn.icon as keyof typeof Icons] as React.ElementType || Icons.Building2;
								return (
									<button
										key={index}
										className={`px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
											btn.variant === 'primary'
												? 'bg-white text-blue-900 hover:bg-blue-50'
												: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900'
										}`}
									>
										<BtnIcon className="mr-2 w-5 h-5" />
										{btn.text}
									</button>
								);
							})}
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
