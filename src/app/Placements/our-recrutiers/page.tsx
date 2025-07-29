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
	Globe,
	Star,
	Briefcase,
	GraduationCap,
	Calendar,
	Search,
	ExternalLink
} from 'lucide-react';

const OurRecruitersPage = () => {const [activeTab, setActiveTab] = useState<'all' | 'engineering' | 'management'>('all');
	
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
		// Technology & Software Companies (Engineering)
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
			name: 'IBM',
			logo: '/logos/ibm.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'Technology',
			roles: ['Software Developer', 'Data Engineer', 'AI Specialist'],
			package: '8-15 LPA',
			description: 'Multinational technology and consulting corporation'
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
			name: 'Wipro',
			logo: '/logos/wipro.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'IT Services',
			roles: ['Project Engineer', 'Software Engineer', 'Business Analyst'],
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
			name: 'Capgemini',
			logo: '/logos/capgemini.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'Consulting',
			roles: ['Analyst', 'Senior Analyst', 'Consultant'],
			package: '7-13 LPA',
			description: 'Global consulting, technology services and digital transformation'
		},
		{
			name: 'Accenture',
			logo: '/logos/accenture.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'Consulting',
			roles: ['Associate Software Engineer', 'Analyst', 'Consultant'],
			package: '8-14 LPA',
			description: 'Global professional services company with leading capabilities'
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

		// Management & Consulting Companies
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
			name: 'Tech Mahindra',
			logo: '/logos/png-clipart-satyam-scandal-tech-mahindra.png',
			category: 'both',
			tier: 'premium',
			industry: 'IT Services',
			roles: ['Software Engineer', 'Business Analyst', 'Associate'],
			package: '6-12 LPA',
			description: 'Leading provider of digital transformation, consulting and business re-engineering'
		},

		// Additional Premium Recruiters
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
		{
			name: 'Swiggy',
			logo: '/logos/swiggy.png',
			category: 'engineering',
			tier: 'premium',
			industry: 'Food Tech',
			roles: ['Software Engineer', 'DevOps Engineer', 'Product Manager'],
			package: '12-22 LPA',
			description: 'On-demand delivery platform for food and other essentials'
		}
	];

	const stats = [
		{ value: '200+', label: 'Partner Companies', icon: <Building2 className="w-6 h-6" /> },
		{ value: '95%', label: 'Placement Rate', icon: <TrendingUp className="w-6 h-6" /> },
		{ value: '₹65L', label: 'Highest Package', icon: <Trophy className="w-6 h-6" /> },
		{ value: '50+', label: 'Dream Companies', icon: <Star className="w-6 h-6" /> }
	];

	const filteredRecruiters = recruiters.filter(recruiter => {
		const matchesTab = activeTab === 'all' || recruiter.category === activeTab || recruiter.category === 'both';
		const matchesSearch = recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							  recruiter.industry.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesTab && matchesSearch;
	});

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
							<div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
								{/* Category Filters */}
								<div className="flex flex-wrap gap-2">
									{[
										{ key: 'all', label: 'All Companies', icon: <Building2 className="w-4 h-4" /> },
										{ key: 'engineering', label: 'Engineering', icon: <Briefcase className="w-4 h-4" /> },
										{ key: 'management', label: 'Management', icon: <GraduationCap className="w-4 h-4" /> }
									].map((tab) => (
										<button
											key={tab.key}
											onClick={() => setActiveTab(tab.key as 'all' | 'engineering' | 'management')}
											className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
												activeTab === tab.key
													? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
													: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
											}`}
										>
											{tab.icon}
											{tab.label}
										</button>
									))}
								</div>

								{/* Search */}
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="text"
										placeholder="Search companies..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[300px]"
									/>
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
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredRecruiters.map((recruiter, index) => (
							<motion.div
								key={index}
								variants={scaleIn}
								className="group"
							>
								<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
									{/* Tier Badge */}
									<div className={`h-2 bg-gradient-to-r ${getTierColor(recruiter.tier)}`}></div>
									
									<div className="p-8">
										{/* Company Logo and Name */}
										<div className="flex items-center gap-4 mb-6">
											<div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2 group-hover:bg-gray-100 transition-colors">
												<Image
													src={recruiter.logo}
													alt={recruiter.name}
													width={48}
													height={48}
													className="object-contain"
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.style.display = 'none';
														target.nextElementSibling?.classList.remove('hidden');
													}}
												/>
												<Building2 className="w-8 h-8 text-gray-400 hidden" />
											</div>
											<div>
												<h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
													{recruiter.name}
												</h3>
												<span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTierColor(recruiter.tier)}`}>
													{getTierBadge(recruiter.tier)}
												</span>
											</div>
										</div>

										{/* Company Details */}
										<div className="space-y-4 mb-6">
											<div className="flex items-center gap-2 text-gray-600">
												<Globe className="w-4 h-4" />
												<span className="text-sm">{recruiter.industry}</span>
											</div>
											
											<div className="flex items-center gap-2 text-gray-600">
												<Trophy className="w-4 h-4" />
												<span className="text-sm font-medium text-green-600">{recruiter.package}</span>
											</div>

											<p className="text-gray-600 text-sm leading-relaxed">
												{recruiter.description}
											</p>
										</div>

										{/* Roles */}
										<div className="mb-6">
											<h4 className="text-sm font-semibold text-gray-800 mb-3">Popular Roles:</h4>
											<div className="flex flex-wrap gap-2">
												{recruiter.roles.map((role, roleIndex) => (
													<span
														key={roleIndex}
														className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
													>
														{role}
													</span>
												))}
											</div>
										</div>

										{/* Action Button */}
										<div className="pt-4 border-t border-gray-100">
											<button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group-hover:scale-105">
												<span>View Opportunities</span>
												<ExternalLink className="w-4 h-4" />
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{filteredRecruiters.length === 0 && (
						<motion.div
							variants={fadeInUp}
							className="text-center py-16"
						>
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<Search className="w-12 h-12 text-gray-400" />
							</div>
							<h3 className="text-2xl font-bold text-gray-800 mb-4">No companies found</h3>
							<p className="text-gray-600">Try adjusting your search or filter criteria</p>
						</motion.div>
					)}
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
