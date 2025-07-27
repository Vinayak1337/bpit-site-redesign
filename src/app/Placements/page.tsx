'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
	Building2,
	Users,
	Trophy,
	TrendingUp,
	Award,
	ChevronRight,
	Briefcase,
	GraduationCap,
	ArrowRight,
	BarChart3,
	Network,
	BookOpen,
	PieChart
} from 'lucide-react';

const PlacementsPage = () => {
	const fadeInUp: Variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
		}
	};

	const staggerContainer: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.3
			}
		}
	};

	const scaleIn: Variants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
		}
	};

	const placementSections = [
		{
			title: 'About Training & Placement',
			description: 'Learn about our comprehensive training and placement program designed to prepare students for industry success.',
			href: '/Placements/About-T&P',
			icon: BookOpen,
			color: 'from-blue-500 to-blue-600',
			bgColor: 'from-blue-50 to-blue-100',
			features: ['Industry-aligned curriculum', 'Skill development programs', 'Career guidance']
		},
		{
			title: 'Placement Cell Overview',
			description: 'Discover how our dedicated placement cell works tirelessly to connect students with top employers.',
			href: '/Placements/placement-cell-overview',
			icon: Users,
			color: 'from-green-500 to-green-600',
			bgColor: 'from-green-50 to-green-100',
			features: ['Dedicated placement team', 'Industry partnerships', 'Student support services']
		},
		{
			title: 'Our Recruiters',
			description: 'Explore our extensive network of recruiting partners from top companies across various industries.',
			href: '/Placements/our-recrutiers',
			icon: Building2,
			color: 'from-purple-500 to-purple-600',
			bgColor: 'from-purple-50 to-purple-100',
			features: ['Fortune 500 companies', 'Startups & MNCs', 'Diverse industry presence']
		},
		{
			title: 'Placement Statistics',
			description: 'View comprehensive placement data, success stories, and detailed analytics of our students achievements.',
			href: '/Placements/placements-statistics',
			icon: BarChart3,
			color: 'from-orange-500 to-orange-600',
			bgColor: 'from-orange-50 to-orange-100',
			features: ['Real-time statistics', 'Branch-wise data', 'Package analysis']
		},
		{
			title: 'Alumni Network',
			description: 'Connect with our successful alumni who are making their mark in leading organizations worldwide.',
			href: '/Placements/Alumni-network',
			icon: Network,
			color: 'from-teal-500 to-teal-600',
			bgColor: 'from-teal-50 to-teal-100',
			features: ['Global alumni network', 'Mentorship programs', 'Industry connections']
		},
		{
			title: 'Internship Opportunities',
			description: 'Discover internship programs that provide hands-on experience and industry exposure to our students.',
			href: '/Placements/internship-opportunity',
			icon: Briefcase,
			color: 'from-indigo-500 to-indigo-600',
			bgColor: 'from-indigo-50 to-indigo-100',
			features: ['Industry internships', 'Research opportunities', 'Skill development']
		}
	];

	const placementStats = [
		{
			label: 'Overall Placement Rate',
			value: '95%',
			icon: TrendingUp,
			color: 'text-green-600'
		},
		{
			label: 'Average Package',
			value: '₹8.5 LPA',
			icon: Trophy,
			color: 'text-blue-600'
		},
		{
			label: 'Highest Package',
			value: '₹45 LPA',
			icon: Award,
			color: 'text-purple-600'
		},
		{
			label: 'Recruiting Companies',
			value: '200+',
			icon: Building2,
			color: 'text-orange-600'
		}
	];

	const recentHighlights = [
		{
			title: 'Record Breaking Placements in 2025',
			description: 'Our highest placement rate achieved with students securing positions in top-tier companies.',
			image: '/events/img1.png'
		},
		{
			title: 'Industry Partnership Expansion',
			description: 'New partnerships with leading tech companies for enhanced placement opportunities.',
			image: '/events/img2.png'
		},
		{
			title: 'Alumni Success Stories',
			description: 'Our graduates continue to excel in their careers, inspiring the next generation.',
			image: '/events/img3.png'
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
						className="text-center"
					>
						<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
							Training & Placements
						</h1>
						<p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
							Empowering students with industry-ready skills and connecting them with leading employers 
							for successful career launches in their chosen fields.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Link href="/Placements/placements-statistics">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
								>
									<BarChart3 className="w-5 h-5" />
									View Statistics
								</motion.button>
							</Link>
							<Link href="/Placements/our-recrutiers">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors flex items-center gap-2"
								>
									<Building2 className="w-5 h-5" />
									Our Recruiters
								</motion.button>
							</Link>
						</div>
					</motion.div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-16">
				{/* Key Statistics */}
				<motion.section
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="mb-20"
				>
					<motion.div variants={fadeInUp} className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Placement Highlights
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{placementStats.map((stat, index) => (
							<motion.div
								key={index}
								variants={scaleIn}
								whileHover={{ scale: 1.05 }}
								className="bg-white rounded-2xl p-8 shadow-xl border-0 hover:shadow-2xl transition-all duration-300"
							>
								<div className="flex items-center justify-between mb-4">
									<stat.icon className={`w-12 h-12 ${stat.color}`} />
									<div className="text-right">
										<div className="text-3xl font-bold text-gray-900">
											{stat.value}
										</div>
									</div>
								</div>
								<p className="text-gray-600 font-medium">{stat.label}</p>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Main Navigation Sections */}
				<motion.section
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="mb-20"
				>
					<motion.div variants={fadeInUp} className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Explore Placement Services
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Comprehensive placement support and career development services designed to ensure your success
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-4"></div>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{placementSections.map((section, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								whileHover={{ scale: 1.02 }}
								className="group"
							>
								<Link href={section.href}>
									<div className={`bg-gradient-to-br ${section.bgColor} rounded-2xl p-8 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer`}>
										<div className="flex items-center justify-between mb-6">
											<div className={`p-4 rounded-2xl bg-gradient-to-r ${section.color} shadow-lg`}>
												<section.icon className="w-8 h-8 text-white" />
											</div>
											<ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
										</div>
										
										<h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
											{section.title}
										</h3>
										
										<p className="text-gray-600 mb-6 leading-relaxed">
											{section.description}
										</p>

										<div className="space-y-2">
											{section.features.map((feature, idx) => (
												<div key={idx} className="flex items-center gap-2">
													<ChevronRight className="w-4 h-4 text-blue-500" />
													<span className="text-sm text-gray-600">{feature}</span>
												</div>
											))}
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Recent Highlights */}
				<motion.section
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="mb-20"
				>
					<motion.div variants={fadeInUp} className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Recent Highlights
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{recentHighlights.map((highlight, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								whileHover={{ scale: 1.02 }}
								className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
							>
								<div className="relative h-48">
									<Image
										src={highlight.image}
										alt={highlight.title}
										fill
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-gray-900 mb-3">
										{highlight.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{highlight.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Quick Access Links */}
				<motion.section
					initial="hidden"
					animate="visible"
					variants={fadeInUp}
					className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center"
				>
					<h2 className="text-3xl font-bold mb-4">
						Ready to Launch Your Career?
					</h2>
					<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
						Join thousands of successful alumni who started their journey at BPIT. 
						Explore opportunities and take the next step toward your dream career.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link href="/Placements/placements-statistics">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
							>
								<PieChart className="w-5 h-5" />
								View Placement Data
							</motion.button>
						</Link>
						<Link href="/Placements/About-T&P">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2"
							>
								<GraduationCap className="w-5 h-5" />
								Learn About T&P
							</motion.button>
						</Link>
					</div>
				</motion.section>
			</div>
		</div>
	);
};

export default PlacementsPage;
