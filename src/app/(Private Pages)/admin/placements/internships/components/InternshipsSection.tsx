'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  MapPin,
  Star,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';
import * as Icons from 'lucide-react';

interface InternshipsSectionProps {
	data: InternshipsData;
}

export default function InternshipsSection({ data }: InternshipsSectionProps) {
	const HeroIcon = (Icons as any)[data.hero.icon] || Icons.Briefcase;

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
							const StatIcon = (Icons as any)[stat.icon] || Icons.TrendingUp;
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

			{/* Benefits Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Why Pursue Internships?
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Discover the advantages of gaining practical experience through our internship programs
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{data.benefits.map((benefit, index) => {
							const BenefitIcon = (Icons as any)[benefit.icon] || Icons.Award;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border border-gray-100"
								>
									<div className={`w-16 h-16 bg-gradient-to-r ${
										benefit.color === 'blue' ? 'from-blue-500 to-cyan-600' :
										benefit.color === 'green' ? 'from-green-500 to-emerald-600' :
										benefit.color === 'purple' ? 'from-purple-500 to-violet-600' :
										'from-orange-500 to-red-600'
									} rounded-2xl flex items-center justify-center mb-6 text-white`}>
										<BenefitIcon className="w-8 h-8" />
									</div>
									<h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
									<p className="text-gray-600 leading-relaxed">{benefit.description}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Opportunities Section */}
			<section className="py-16">
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
							Leading companies that regularly offer internship opportunities to our students
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{data.opportunities.map((internship, index) => (
							<motion.div
								key={internship.company + internship.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
							>
								{/* Header */}
								<div className="flex items-start justify-between mb-6">
									<div className="flex items-center space-x-4">
										<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl font-bold">
											{internship.company.split(' ').map(word => word[0]).join('').substring(0, 2)}
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-900 mb-1">{internship.company}</h3>
											<p className="text-blue-600 font-semibold">{internship.title}</p>
										</div>
									</div>
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
										{internship.category}
									</span>
								</div>

								{/* Description */}
								<p className="text-gray-600 mb-6 leading-relaxed">{internship.description}</p>

								{/* Location */}
								<div className="flex items-center space-x-2 mb-6">
									<MapPin className="w-4 h-4 text-gray-400" />
									<span className="text-sm text-gray-600">{internship.location}</span>
								</div>

								{/* Domains */}
								<div className="mb-6">
									<h4 className="text-sm font-semibold text-gray-900 mb-3">Focus Areas:</h4>
									<div className="flex flex-wrap gap-2">
										{internship.domains.map((domain, idx) => (
											<span
												key={idx}
												className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs rounded-full border border-blue-200"
											>
												{domain}
											</span>
										))}
									</div>
								</div>

								{/* Footer */}
								<div className="pt-4 border-t border-gray-100 flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Star className="w-4 h-4 text-blue-500 fill-current" />
										<span className="text-sm font-semibold text-gray-700">Industry Partner</span>
									</div>
									<span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full">
										{internship.type}
									</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							How Internships Work
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Understanding the internship process and what to expect
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{data.process.map((step, index) => {
							const StepIcon = (Icons as any)[step.icon] || Icons.Users;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center"
								>
									<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
										<StepIcon className="w-8 h-8" />
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
									<p className="text-gray-600 leading-relaxed">{step.description}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className={`py-20 bg-gradient-to-r ${data.contact.gradient}`}>
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center text-white max-w-4xl mx-auto"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							{data.contact.title}
						</h2>
						<p className="text-xl text-blue-200 mb-12 leading-relaxed">
							{data.contact.subtitle}
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
							<div className="flex flex-col items-center">
								<div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
									<Phone className="w-8 h-8" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Call Us</h3>
								<p className="text-blue-200">{data.contact.phone}</p>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
									<Mail className="w-8 h-8" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Email Us</h3>
								<p className="text-blue-200">{data.contact.email}</p>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							{data.contact.buttons.map((button, index) => {
								const BtnIcon = (Icons as any)[button.icon] || Icons.BookOpen;
								return (
									<button
										key={index}
										className={button.variant === 'primary' 
											? "bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
											: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center"
										}
									>
										<BtnIcon className="mr-2 w-5 h-5" />
										{button.text}
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
