'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import {
	Building2,
	Users,
	Trophy,
	Target,
	TrendingUp,
	Award,
	Globe,
	Star,
	Calendar,
	ArrowRight,
	Search,
	ExternalLink,
	CheckCircle2,
	Zap,
	Shield,
	Heart,
	Lightbulb
} from 'lucide-react';

const OurRecruitersPage = () => {
	const [searchTerm, setSearchTerm] = useState('');

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
				staggerChildren: 0.1,
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

	const recruiters = [
		// Engineering Companies (12 companies)
		{
			name: 'Tata Consultancy Services',
			logo: '/logos/tcs.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'IT Services',
			roles: ['Software Engineer', 'Data Scientist', 'Consultant'],
			package: '7-12 LPA',
			description: 'Global leader in IT services, consulting and business solutions'
		},
		{
			name: 'Microsoft',
			logo: '/logos/microsoft.png',
			category: 'engineering',
			tier: 'dream',
			industry: 'Technology',
			roles: ['Software Engineer', 'Cloud Engineer', 'Product Manager'],
			package: '25-45 LPA',
			description: 'Leading technology corporation developing software and cloud services'
		},
		{
			name: 'Google',
			logo: '/logos/google.png',
			category: 'engineering',
			tier: 'dream',
			industry: 'Technology',
			roles: ['Software Engineer', 'Data Scientist', 'Product Manager'],
			package: '35-65 LPA',
			description: 'Multinational technology company specializing in Internet-related services'
		},
		{
			name: 'Amazon',
			logo: '/logos/amazon.png',
			category: 'engineering',
			tier: 'dream',
			industry: 'E-commerce/Cloud',
			roles: ['Software Development Engineer', 'Cloud Engineer', 'Product Manager'],
			package: '30-55 LPA',
			description: 'Leading e-commerce and cloud computing company'
		},
		{
			name: 'Infosys',
			logo: '/logos/infosys.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'IT Services',
			roles: ['Systems Engineer', 'Software Developer', 'Business Analyst'],
			package: '6-10 LPA',
			description: 'Next-generation digital services and consulting company'
		},
		{
			name: 'Wipro',
			logo: '/logos/wipro.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'IT Services',
			roles: ['Project Engineer', 'Software Engineer', 'DevOps Engineer'],
			package: '6-11 LPA',
			description: 'Leading global information technology, consulting and business services'
		},
		{
			name: 'HCL Technologies',
			logo: '/logos/hcl.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'IT Services',
			roles: ['Software Engineer', 'Technical Lead', 'DevOps Engineer'],
			package: '6-12 LPA',
			description: 'Global technology and software services company'
		},
		{
			name: 'Cognizant',
			logo: '/logos/cognizant.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'IT Services',
			roles: ['Programmer Analyst', 'Associate', 'Developer'],
			package: '5-9 LPA',
			description: 'American multinational IT services and consulting corporation'
		},
		{
			name: 'Nagarro',
			logo: '/logos/nagarro.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'Software Development',
			roles: ['Software Engineer', 'Associate Engineer', 'Developer'],
			package: '8-16 LPA',
			description: 'Global software development and technology consulting company'
		},
		{
			name: 'Flipkart',
			logo: '/logos/flipkart.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'E-commerce',
			roles: ['Software Engineer', 'Product Manager', 'Data Scientist'],
			package: '15-25 LPA',
			description: 'Leading Indian e-commerce marketplace'
		},
		{
			name: 'Paytm',
			logo: '/logos/paytm.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'Fintech',
			roles: ['Software Engineer', 'Backend Developer', 'Mobile Developer'],
			package: '12-20 LPA',
			description: 'Digital payment and financial services company'
		},
		{
			name: 'Zomato',
			logo: '/logos/zomato.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'Food Tech',
			roles: ['Software Engineer', 'Product Manager', 'Data Analyst'],
			package: '10-18 LPA',
			description: 'Online food delivery and restaurant discovery platform'
		},

		// Management Companies (5 companies)
		{
			name: 'McKinsey & Company',
			logo: '/logos/mckinsey.png',
			category: 'management',
			tier: 'dream',
			industry: 'Strategy Consulting',
			roles: ['Business Analyst', 'Associate Consultant', 'Engagement Manager'],
			package: '20-35 LPA',
			description: 'Global management consulting firm serving leading businesses'
		},
		{
			name: 'Boston Consulting Group',
			logo: '/logos/bcg.png',
			category: 'management',
			tier: 'dream',
			industry: 'Management Consulting',
			roles: ['Consultant', 'Project Leader', 'Business Analyst'],
			package: '18-32 LPA',
			description: 'Leading strategy consulting firm helping organizations solve their most important challenges'
		},
		{
			name: 'KPMG',
			logo: '/logos/kpmg.png',
			category: 'management',
			tier: 'premium',
			industry: 'Consulting',
			roles: ['Management Trainee', 'Analyst', 'Associate Consultant'],
			package: '8-15 LPA',
			description: 'Global network of professional firms providing audit, tax and advisory services'
		},
		{
			name: 'Deloitte',
			logo: '/logos/deloitte.png',
			category: 'management',
			tier: 'premium',
			industry: 'Consulting',
			roles: ['Analyst', 'Consultant', 'Business Technology Analyst'],
			package: '10-18 LPA',
			description: 'Global professional services network and one of the Big Four accounting firms'
		},
		{
			name: 'Goldman Sachs',
			logo: '/logos/goldman-sachs.png',
			category: 'management',
			tier: 'dream',
			industry: 'Investment Banking',
			roles: ['Analyst', 'Associate', 'Technology Analyst'],
			package: '25-40 LPA',
			description: 'Leading global investment banking, securities and investment management firm'
		},

		// Both Categories (5 companies)
		{
			name: 'Accenture',
			logo: '/logos/accenture.png',
			category: 'both',
			tier: 'premium',
			industry: 'Consulting',
			roles: ['Associate Software Engineer', 'Analyst', 'Consultant'],
			package: '8-14 LPA',
			description: 'Global professional services company with leading capabilities'
		},
		{
			name: 'Capgemini',
			logo: '/logos/capgemini.png',
			category: 'both',
			tier: 'premium',
			industry: 'Consulting',
			roles: ['Analyst', 'Senior Analyst', 'Consultant'],
			package: '7-13 LPA',
			description: 'Global consulting, technology services and digital transformation'
		},
		{
			name: 'IBM',
			logo: '/logos/ibm.png',
			category: 'both',
			tier: 'premium',
			industry: 'Technology',
			roles: ['Software Developer', 'Data Engineer', 'Business Consultant'],
			package: '8-15 LPA',
			description: 'Multinational technology and consulting corporation'
		},
		{
			name: 'HDFC Bank',
			logo: '/logos/hdfc.png',
			category: 'both',
			tier: 'premium',
			industry: 'Banking',
			roles: ['Management Trainee', 'Software Developer', 'Business Analyst'],
			package: '6-12 LPA',
			description: 'Leading private sector bank with extensive digital banking services'
		},
		{
			name: 'Tech Mahindra',
			logo: '/logos/png-clipart-satyam-scandal-tech-mahindra.png',
			category: 'both',
			tier: 'premium',
			industry: 'IT Services',
			roles: ['Software Engineer', 'Business Analyst', 'Associate'],
			package: '6-12 LPA',
			description: 'Leading provider of digital transformation, consulting and business re-engineering'
		}
	];

	const recruitmentTrends = [
		{
			year: '2024',
			totalOffers: 450,
			averagePackage: '9.2 LPA',
			highestPackage: '65 LPA',
			dreamCompanies: 8,
			newRecruiters: 5,
			sectors: [
				{ name: 'IT & Software', percentage: 45 },
				{ name: 'Consulting', percentage: 20 },
				{ name: 'Banking & Finance', percentage: 15 },
				{ name: 'Manufacturing', percentage: 12 },
				{ name: 'Others', percentage: 8 }
			]
		},
		{
			year: '2023',
			totalOffers: 420,
			averagePackage: '8.7 LPA',
			highestPackage: '58 LPA',
			dreamCompanies: 7,
			newRecruiters: 4,
			sectors: [
				{ name: 'IT & Software', percentage: 42 },
				{ name: 'Consulting', percentage: 18 },
				{ name: 'Banking & Finance', percentage: 17 },
				{ name: 'Manufacturing', percentage: 15 },
				{ name: 'Others', percentage: 8 }
			]
		}
	];

	const companyBenefits = [
		{
			category: 'Dream Companies',
			count: 8,
			icon: <Star className="w-8 h-8" />,
			color: 'from-purple-500 to-pink-500',
			benefits: ['Premium Packages', 'Global Exposure', 'Rapid Growth', 'Innovation Focus']
		},
		{
			category: 'Premium Partners',
			count: 18,
			icon: <Award className="w-8 h-8" />,
			color: 'from-blue-500 to-cyan-500',
			benefits: ['Competitive Salary', 'Career Development', 'Work-Life Balance', 'Learning Opportunities']
		},
		{
			category: 'Growth Companies',
			count: 15,
			icon: <TrendingUp className="w-8 h-8" />,
			color: 'from-green-500 to-emerald-500',
			benefits: ['Fast-paced Environment', 'Ownership Mindset', 'Skill Development', 'Future Leadership']
		}
	];

	const stats = [
		{ value: '22+', label: 'Partner Companies', icon: <Building2 className="w-6 h-6" /> },
		{ value: '95%', label: 'Placement Rate', icon: <TrendingUp className="w-6 h-6" /> },
		{ value: '₹65L', label: 'Highest Package', icon: <Trophy className="w-6 h-6" /> },
		{ value: '8+', label: 'Dream Companies', icon: <Star className="w-6 h-6" /> }
	];

	const filteredRecruiters = recruiters.filter(recruiter => {
		// If no search term, show all recruiters
		if (!searchTerm || searchTerm.trim() === '') {
			return true;
		}
		
		// Search in name, industry, and roles
		const searchLower = searchTerm.toLowerCase().trim();
		const matchesName = recruiter.name.toLowerCase().includes(searchLower);
		const matchesIndustry = recruiter.industry.toLowerCase().includes(searchLower);
		const matchesRoles = recruiter.roles.some(role => 
			role.toLowerCase().includes(searchLower)
		);
		const matchesDescription = recruiter.description.toLowerCase().includes(searchLower);
		
		return matchesName || matchesIndustry || matchesRoles || matchesDescription;
	});

	// Debug logging
	console.log('Search term:', searchTerm);
	console.log('Total recruiters:', recruiters.length);
	console.log('Filtered recruiters:', filteredRecruiters.length);

	const getTierColor = (tier: string) => {
		switch (tier) {
			case 'dream':
				return 'from-purple-500 to-pink-500';
			case 'premium':
				return 'from-blue-500 to-cyan-500';
			default:
				return 'from-gray-500 to-gray-600';
		}
	};

	const getTierBadge = (tier: string) => {
		switch (tier) {
			case 'dream':
				return 'Dream Company';
			case 'premium':
				return 'Premium Recruiter';
			default:
				return 'Core Company';
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
			{/* Hero Section */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white"
			>
				<div 
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
					}}
				></div>
				
				<div className="relative container mx-auto px-6 py-20">
					<div className="max-w-4xl mx-auto text-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="mb-6"
						>
							<div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
								<Building2 className="w-10 h-10 text-cyan-300" />
							</div>
						</motion.div>
						
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
						>
							Our Recruiters
						</motion.h1>
						
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
						>
							Connecting talent with industry leaders across engineering and management domains
						</motion.p>
						
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="flex flex-wrap justify-center gap-4"
						>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-cyan-200">
									<Trophy className="w-5 h-5" />
									Global Leaders
								</span>
							</div>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-cyan-200">
									<Target className="w-5 h-5" />
									Dream Companies
								</span>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Stats Section */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-16 bg-white shadow-lg relative z-10 -mt-10 mx-6 rounded-2xl"
			>
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="text-center group"
							>
								<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
									<div className="text-white">{stat.icon}</div>
								</div>
								<div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
								<div className="text-gray-600 font-medium">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Filters and Search */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50"
			>
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto">
						<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
							<div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
								{/* Search */}
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="text"
										placeholder="Search companies, roles, industries..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10 pr-12 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[350px]"
									/>
									{searchTerm && (
										<button
											onClick={() => setSearchTerm('')}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
											title="Clear search"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Recruiters Grid */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-white"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Our Recruitment Partners
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Partnering with industry leaders to provide exceptional career opportunities 
							for our graduates across diverse sectors
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-6"></div>
						
						{/* Filter Status */}
						<div className="mt-8 flex flex-col items-center gap-4">
							<div className="flex justify-center items-center gap-4 text-sm text-gray-600 flex-wrap">
								<span className="flex items-center gap-2">
									<div className="w-3 h-3 bg-purple-500 rounded-full"></div>
									Showing <span className="font-bold text-purple-600 text-lg">{filteredRecruiters.length}</span> companies
								</span>
								{searchTerm && (
									<span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full font-medium">
										Search: &quot;{searchTerm}&quot;
									</span>
								)}
							</div>
						</div>
					</motion.div>

					<motion.div 
						key={`${searchTerm}-grid`} 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
					>
						{filteredRecruiters.map((recruiter, index) => (
							<motion.div
								key={`${recruiter.name}-${index}`}
								variants={scaleIn}
								className="group"
							>
								<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
									{/* Tier Badge */}
									<div className={`h-1.5 bg-gradient-to-r ${getTierColor(recruiter.tier)}`}></div>
									
									<div className="p-5 flex flex-col flex-grow">
										{/* Company Logo and Name */}
										<div className="flex items-center gap-3 mb-4">
											<div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-2 group-hover:bg-gray-100 transition-colors flex-shrink-0">
												<Image
													src={recruiter.logo}
													alt={recruiter.name}
													width={32}
													height={32}
													className="object-contain"
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.style.display = 'none';
														target.nextElementSibling?.classList.remove('hidden');
													}}
												/>
												<Building2 className="w-6 h-6 text-gray-400 hidden" />
											</div>
											<div className="min-w-0">
												<h3 className="text-base font-bold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
													{recruiter.name}
												</h3>
												<span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTierColor(recruiter.tier)} mt-1`}>
													{getTierBadge(recruiter.tier)}
												</span>
											</div>
										</div>

										{/* Company Details */}
										<div className="space-y-2 mb-4">
											<div className="flex items-center gap-2 text-gray-600">
												<Globe className="w-3.5 h-3.5 flex-shrink-0" />
												<span className="text-xs line-clamp-1">{recruiter.industry}</span>
											</div>
											
											<div className="flex items-center gap-2 text-gray-600">
												<Trophy className="w-3.5 h-3.5 flex-shrink-0" />
												<span className="text-xs font-medium text-green-600">{recruiter.package}</span>
											</div>

											<p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
												{recruiter.description}
											</p>
										</div>

										{/* Roles */}
										<div className="mb-4 flex-grow">
											<h4 className="text-xs font-semibold text-gray-800 mb-2">Popular Roles:</h4>
											<div className="flex flex-wrap gap-1">
												{recruiter.roles.slice(0, 3).map((role, roleIndex) => (
													<span
														key={roleIndex}
														className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium line-clamp-1"
													>
														{role}
													</span>
												))}
												{recruiter.roles.length > 3 && (
													<span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
														+{recruiter.roles.length - 3}
													</span>
												)}
											</div>
										</div>

										{/* Action Button */}
										<div className="pt-3 border-t border-gray-100 mt-auto">
											<button className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-sm">
												<span>View Opportunities</span>
												<ExternalLink className="w-3.5 h-3.5" />
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>

					{filteredRecruiters.length === 0 && searchTerm && (
						<motion.div
							variants={fadeInUp}
							className="text-center py-16"
						>
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<Search className="w-12 h-12 text-gray-400" />
							</div>
							<h3 className="text-2xl font-bold text-gray-800 mb-4">No companies found</h3>
							<p className="text-gray-600 mb-6">
								No companies match your search for &quot;<span className="font-semibold text-purple-600">{searchTerm}</span>&quot;
							</p>
							<button
								onClick={() => setSearchTerm('')}
								className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors font-medium"
							>
								Show All Companies
							</button>
						</motion.div>
					)}
				</div>
			</motion.section>

			{/* Recruitment Trends & Analytics */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Recruitment Trends & Analytics
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Data-driven insights into our placement success and industry partnerships
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid lg:grid-cols-2 gap-8 mb-12">
						{recruitmentTrends.map((trend, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500"
							>
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-2xl font-bold text-gray-800">Academic Year {trend.year}</h3>
									<Calendar className="w-8 h-8 text-blue-500" />
								</div>

								<div className="grid grid-cols-2 gap-4 mb-6">
									<div className="text-center">
										<div className="text-3xl font-bold text-blue-600 mb-2">{trend.totalOffers}</div>
										<div className="text-gray-600 text-sm">Total Offers</div>
									</div>
									<div className="text-center">
										<div className="text-3xl font-bold text-green-600 mb-2">{trend.averagePackage}</div>
										<div className="text-gray-600 text-sm">Average Package</div>
									</div>
									<div className="text-center">
										<div className="text-3xl font-bold text-purple-600 mb-2">{trend.highestPackage}</div>
										<div className="text-gray-600 text-sm">Highest Package</div>
									</div>
									<div className="text-center">
										<div className="text-3xl font-bold text-orange-600 mb-2">{trend.dreamCompanies}</div>
										<div className="text-gray-600 text-sm">Dream Companies</div>
									</div>
								</div>

								<div className="border-t border-gray-100 pt-6">
									<h4 className="font-semibold text-gray-800 mb-4">Sector-wise Distribution</h4>
									<div className="space-y-3">
										{trend.sectors.map((sector, sectorIndex) => (
											<div key={sectorIndex} className="flex items-center justify-between">
												<span className="text-gray-600 text-sm">{sector.name}</span>
												<div className="flex items-center gap-3">
													<div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
														<div 
															className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
															style={{ width: `${sector.percentage}%` }}
														></div>
													</div>
													<span className="text-blue-600 font-medium text-sm w-8">{sector.percentage}%</span>
												</div>
											</div>
										))}
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Company Categories & Benefits */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-white"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Company Categories & Benefits
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Diverse opportunities across different company tiers and growth stages
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{companyBenefits.map((category, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="group"
							>
								<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
									<div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
									
									<div className="p-8">
										<div className="flex items-center gap-4 mb-6">
											<div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
												{category.icon}
											</div>
											<div>
												<h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
													{category.category}
												</h3>
												<p className="text-blue-600 font-medium">{category.count} Companies</p>
											</div>
										</div>

										<div className="space-y-3">
											<h4 className="font-semibold text-gray-800 mb-3">Key Benefits:</h4>
											{category.benefits.map((benefit, benefitIndex) => (
												<div key={benefitIndex} className="flex items-start gap-3">
													<CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
													<span className="text-gray-600">{benefit}</span>
												</div>
											))}
										</div>

										<div className="mt-6 pt-6 border-t border-gray-100">
											<div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors cursor-pointer">
												<span>View Companies</span>
												<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Industry Insights */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Industry Insights & Opportunities
						</h2>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Understanding market trends and future career opportunities
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid lg:grid-cols-4 gap-8">
						<motion.div variants={fadeInUp} className="lg:col-span-2">
							<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
								<div className="flex items-center gap-4 mb-6">
									<Lightbulb className="w-8 h-8 text-yellow-400" />
									<h3 className="text-2xl font-bold">Emerging Technologies</h3>
								</div>
								<p className="text-gray-300 mb-6">
									Our recruitment partners are actively seeking talent in cutting-edge technologies and innovation-driven roles.
								</p>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<Zap className="w-4 h-4 text-blue-400" />
											<span className="text-sm">Artificial Intelligence</span>
										</div>
										<div className="flex items-center gap-2">
											<Zap className="w-4 h-4 text-blue-400" />
											<span className="text-sm">Machine Learning</span>
										</div>
										<div className="flex items-center gap-2">
											<Zap className="w-4 h-4 text-blue-400" />
											<span className="text-sm">Cloud Computing</span>
										</div>
									</div>
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<Zap className="w-4 h-4 text-blue-400" />
											<span className="text-sm">Data Science</span>
										</div>
										<div className="flex items-center gap-2">
											<Zap className="w-4 h-4 text-blue-400" />
											<span className="text-sm">Cybersecurity</span>
										</div>
										<div className="flex items-center gap-2">
											<Zap className="w-4 h-4 text-blue-400" />
											<span className="text-sm">DevOps & SRE</span>
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						<motion.div variants={fadeInUp}>
							<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
								<Shield className="w-8 h-8 text-green-400 mb-4" />
								<h3 className="text-xl font-bold mb-4">Career Security</h3>
								<p className="text-gray-300 text-sm mb-4">
									Long-term career stability with our trusted industry partners.
								</p>
								<div className="space-y-2">
									<div className="text-2xl font-bold text-green-400">98%</div>
									<div className="text-sm text-gray-400">Job Retention Rate</div>
								</div>
							</div>
						</motion.div>

						<motion.div variants={fadeInUp}>
							<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
								<Heart className="w-8 h-8 text-red-400 mb-4" />
								<h3 className="text-xl font-bold mb-4">Work-Life Balance</h3>
								<p className="text-gray-300 text-sm mb-4">
									Companies committed to employee well-being and growth.
								</p>
								<div className="space-y-2">
									<div className="text-2xl font-bold text-red-400">4.2/5</div>
									<div className="text-sm text-gray-400">Employee Satisfaction</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Call to Action */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-20 bg-gradient-to-r from-purple-600 to-pink-600"
			>
				<div className="container mx-auto px-6 text-center">
					<div className="max-w-3xl mx-auto text-white">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Ready to Join These Leaders?
						</h2>
						<p className="text-xl mb-8 opacity-90">
							Our placement cell works tirelessly to connect you with the right opportunities. 
							Start your journey towards a successful career today.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
								<Users className="w-6 h-6" />
								Connect with Alumni
							</button>
							<button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors flex items-center justify-center gap-2">
								<Calendar className="w-6 h-6" />
								Schedule Guidance
							</button>
						</div>
					</div>
				</div>
			</motion.section>
		</div>
	);
};

export default OurRecruitersPage;
