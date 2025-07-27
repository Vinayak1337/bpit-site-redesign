'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
	Briefcase,
	Calendar,
	Clock,
	MapPin,
	TrendingUp,
	Award,
	Users,
	Target,
	CheckCircle2,
	Star,
	Building2,
	Globe,
	BookOpen,
	Search,
	ExternalLink,
	FileText,
	Send,
	Phone,
	ChevronRight,
	Zap,
	Trophy,
	GraduationCap,
	Heart,
	Code,
	PieChart
} from 'lucide-react';

const InternshipOpportunityPage = () => {
	const [activeTab, setActiveTab] = useState<'current' | 'summer' | 'winter' | 'corporate'>('current');
	const [selectedDomain, setSelectedDomain] = useState<'all' | 'tech' | 'management' | 'research'>('all');

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

	const internshipPrograms = [
		{
			id: 1,
			title: 'Summer Internship Program 2025',
			company: 'Tech Mahindra',
			domain: 'tech',
			type: 'summer',
			duration: '8-12 weeks',
			stipend: '₹15,000 - ₹25,000/month',
			location: 'Bangalore, Hyderabad',
			deadline: '2025-03-15',
			description: 'Work on cutting-edge digital transformation projects with industry mentors.',
			skills: ['Java/Python', 'Cloud Computing', 'AI/ML', 'Data Analytics'],
			benefits: ['Industry Exposure', 'Certification', 'Pre-placement Offers', 'Mentorship'],
			eligibility: '3rd/4th year B.Tech (CSE/IT/ECE)',
			status: 'Open',
			logo: '/logos/png-clipart-satyam-scandal-tech-mahindra.png'
		},
		{
			id: 2,
			title: 'Operations Internship',
			company: 'Wizard Events',
			domain: 'management',
			type: 'current',
			duration: '6 months',
			stipend: '₹12,000 - ₹18,000/month',
			location: 'Delhi NCR',
			deadline: '2025-02-28',
			description: 'Gain hands-on experience in event management and operations excellence.',
			skills: ['Project Management', 'Communication', 'Leadership', 'Event Planning'],
			benefits: ['Live Project Experience', 'Industry Networks', 'Skill Development', 'Certificate'],
			eligibility: 'BBA/MBA students (all years)',
			status: 'Active',
			logo: '/logos/wizard-events.png'
		},
		{
			id: 3,
			title: 'Software Development Internship',
			company: 'Microsoft',
			domain: 'tech',
			type: 'summer',
			duration: '12 weeks',
			stipend: '₹80,000 - ₹1,20,000/month',
			location: 'Hyderabad, Bangalore',
			deadline: '2025-01-31',
			description: 'Contribute to Microsoft products and services with global impact.',
			skills: ['C#/.NET', 'Azure', 'React/Angular', 'System Design'],
			benefits: ['Global Exposure', 'Full-time Offers', 'Premium Mentorship', 'Product Impact'],
			eligibility: '3rd/4th year B.Tech (CSE/IT)',
			status: 'Premium',
			logo: '/logos/microsoft.png'
		},
		{
			id: 4,
			title: 'Data Science Research Internship',
			company: 'IBM Research',
			domain: 'research',
			type: 'winter',
			duration: '16 weeks',
			stipend: '₹45,000 - ₹60,000/month',
			location: 'Bangalore, Delhi',
			deadline: '2025-10-15',
			description: 'Research and develop next-generation AI/ML solutions.',
			skills: ['Python/R', 'Machine Learning', 'Deep Learning', 'Research Methodology'],
			benefits: ['Research Publication', 'PhD Guidance', 'Global Collaboration', 'Innovation Labs'],
			eligibility: 'M.Tech/B.Tech final year (CSE/IT)',
			status: 'Research',
			logo: '/logos/ibm.png'
		},
		{
			id: 5,
			title: 'Business Analyst Internship',
			company: 'Accenture',
			domain: 'management',
			type: 'corporate',
			duration: '10 weeks',
			stipend: '₹25,000 - ₹35,000/month',
			location: 'Mumbai, Pune, Delhi',
			deadline: '2025-03-30',
			description: 'Analyze business processes and drive digital transformation initiatives.',
			skills: ['Business Analysis', 'Data Visualization', 'Process Improvement', 'Client Interaction'],
			benefits: ['Client Exposure', 'Consulting Skills', 'Global Projects', 'Career Pathway'],
			eligibility: 'MBA/BBA students (final year)',
			status: 'Corporate',
			logo: '/logos/accenture.png'
		},
		{
			id: 6,
			title: 'Full Stack Development',
			company: 'Infosys',
			domain: 'tech',
			type: 'summer',
			duration: '10 weeks',
			stipend: '₹20,000 - ₹30,000/month',
			location: 'Mysore, Pune, Chennai',
			deadline: '2025-02-20',
			description: 'End-to-end application development with modern tech stack.',
			skills: ['MEAN/MERN Stack', 'Microservices', 'DevOps', 'Agile Methodology'],
			benefits: ['InStep Program', 'Global Opportunity', 'Skill Certification', 'Job Offers'],
			eligibility: '2nd/3rd year B.Tech (CSE/IT/ECE)',
			status: 'Open',
			logo: '/logos/infosys.png'
		}
	];

	const stats = [
		{ value: '500+', label: 'Internships Placed', icon: <Briefcase className="w-6 h-6" /> },
		{ value: '150+', label: 'Partner Companies', icon: <Building2 className="w-6 h-6" /> },
		{ value: '₹1.2L', label: 'Highest Stipend', icon: <Trophy className="w-6 h-6" /> },
		{ value: '85%', label: 'Conversion Rate', icon: <TrendingUp className="w-6 h-6" /> }
	];

	const successStories = [
		{
			name: 'Aashima',
			batch: 'BBA (2023-26)',
			company: 'Wizard Events',
			role: 'Operations Intern',
			story: 'Secured valuable internship experience in operations department, gaining real-world event management skills.',
			achievement: 'Outstanding Performance',
			image: '/students/aashima.jpg'
		},
		{
			name: 'Rahul Sharma',
			batch: 'CSE (2022-26)',
			company: 'Microsoft',
			role: 'SDE Intern',
			story: 'Contributed to Azure cloud services during summer internship and received pre-placement offer.',
			achievement: 'Full-time Offer',
			image: '/students/rahul.jpg'
		},
		{
			name: 'Priya Gupta',
			batch: 'MBA (2024-26)',
			company: 'Deloitte',
			role: 'Business Analyst Intern',
			story: 'Led client engagement projects and implemented process improvements during corporate internship.',
			achievement: 'Client Recognition',
			image: '/students/priya.jpg'
		}
	];

	const internshipBenefits = [
		{
			icon: <Target className="w-8 h-8" />,
			title: 'Industry Exposure',
			description: 'Work with leading companies on real-world projects and challenges',
			color: 'from-blue-500 to-cyan-500'
		},
		{
			icon: <Users className="w-8 h-8" />,
			title: 'Mentorship',
			description: 'Learn from industry experts and experienced professionals',
			color: 'from-purple-500 to-pink-500'
		},
		{
			icon: <Award className="w-8 h-8" />,
			title: 'Skill Development',
			description: 'Enhance technical and soft skills through practical application',
			color: 'from-green-500 to-emerald-500'
		},
		{
			icon: <Zap className="w-8 h-8" />,
			title: 'Career Acceleration',
			description: 'Fast-track your career with pre-placement opportunities',
			color: 'from-orange-500 to-red-500'
		},
		{
			icon: <Globe className="w-8 h-8" />,
			title: 'Global Opportunities',
			description: 'Access to international projects and cross-cultural experience',
			color: 'from-indigo-500 to-purple-500'
		},
		{
			icon: <Heart className="w-8 h-8" />,
			title: 'Network Building',
			description: 'Build valuable professional connections and industry relationships',
			color: 'from-teal-500 to-blue-500'
		}
	];

	const applicationProcess = [
		{
			step: 1,
			title: 'Browse Opportunities',
			description: 'Explore available internships based on your interests and skills',
			icon: <Search className="w-6 h-6" />
		},
		{
			step: 2,
			title: 'Prepare Application',
			description: 'Update resume, write cover letter, and gather required documents',
			icon: <FileText className="w-6 h-6" />
		},
		{
			step: 3,
			title: 'Submit Application',
			description: 'Apply through our placement portal with all necessary documents',
			icon: <Send className="w-6 h-6" />
		},
		{
			step: 4,
			title: 'Selection Process',
			description: 'Participate in aptitude tests, interviews, and assessment rounds',
			icon: <CheckCircle2 className="w-6 h-6" />
		}
	];

	const filteredInternships = internshipPrograms.filter(internship => {
		const matchesTab = activeTab === 'current' || internship.type === activeTab;
		const matchesDomain = selectedDomain === 'all' || internship.domain === selectedDomain;
		return matchesTab && matchesDomain;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Premium':
				return 'bg-purple-500';
			case 'Open':
				return 'bg-green-500';
			case 'Active':
				return 'bg-blue-500';
			case 'Research':
				return 'bg-indigo-500';
			case 'Corporate':
				return 'bg-orange-500';
			default:
				return 'bg-gray-500';
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
			{/* Hero Section */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="relative overflow-hidden bg-gradient-to-r from-green-900 via-teal-900 to-blue-900 text-white"
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
								<Briefcase className="w-10 h-10 text-cyan-300" />
							</div>
						</motion.div>
						
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent"
						>
							Internship Opportunities
						</motion.h1>
						
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
						>
							Launch your career with meaningful internship experiences at top companies
						</motion.p>
						
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="flex flex-wrap justify-center gap-4"
						>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-cyan-200">
									<Star className="w-5 h-5" />
									Premium Programs
								</span>
							</div>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-cyan-200">
									<Target className="w-5 h-5" />
									Career Growth
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
								<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
									<div className="text-white">{stat.icon}</div>
								</div>
								<div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
								<div className="text-gray-600 font-medium">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Why Choose Our Internship Program */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-r from-green-50 to-teal-50"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Why Choose Our Internship Program?
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Our comprehensive internship program is designed to bridge the gap between 
							academic learning and professional excellence
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{internshipBenefits.map((benefit, index) => (
							<motion.div
								key={index}
								variants={scaleIn}
								className="group"
							>
								<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
									<div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
									
									<div className="p-8">
										<div className="flex items-center gap-4 mb-6">
											<div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
												{benefit.icon}
											</div>
											<h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
												{benefit.title}
											</h3>
										</div>

										<p className="text-gray-600 leading-relaxed">
											{benefit.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Filters */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-16 bg-white"
			>
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto">
						<div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-xl p-8 border border-gray-100">
							<div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
								{/* Program Type Filters */}
								<div className="flex flex-wrap gap-2">
									{[
										{ key: 'current', label: 'Current Openings', icon: <Clock className="w-4 h-4" /> },
										{ key: 'summer', label: 'Summer Programs', icon: <Briefcase className="w-4 h-4" /> },
										{ key: 'winter', label: 'Winter Programs', icon: <Calendar className="w-4 h-4" /> },
										{ key: 'corporate', label: 'Corporate Programs', icon: <Building2 className="w-4 h-4" /> }
									].map((tab) => (
										<button
											key={tab.key}
											onClick={() => setActiveTab(tab.key as 'current' | 'summer' | 'winter' | 'corporate')}
											className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
												activeTab === tab.key
													? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
													: 'bg-white text-gray-600 hover:bg-gray-50'
											}`}
										>
											{tab.icon}
											{tab.label}
										</button>
									))}
								</div>

								{/* Domain Filters */}
								<div className="flex flex-wrap gap-2">
									{[
										{ key: 'all', label: 'All Domains', icon: <Globe className="w-4 h-4" /> },
										{ key: 'tech', label: 'Technology', icon: <Code className="w-4 h-4" /> },
										{ key: 'management', label: 'Management', icon: <PieChart className="w-4 h-4" /> },
										{ key: 'research', label: 'Research', icon: <BookOpen className="w-4 h-4" /> }
									].map((domain) => (
										<button
											key={domain.key}
											onClick={() => setSelectedDomain(domain.key as 'all' | 'tech' | 'management' | 'research')}
											className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
												selectedDomain === domain.key
													? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
													: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
											}`}
										>
											{domain.icon}
											{domain.label}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Internship Listings */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gray-50"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Available Opportunities
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Discover internship opportunities tailored to your skills and career aspirations
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid lg:grid-cols-2 gap-8">
						{filteredInternships.map((internship) => (
							<motion.div
								key={internship.id}
								variants={scaleIn}
								className="group"
							>
								<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
									{/* Company Header */}
									<div className="p-6 border-b border-gray-100">
										<div className="flex items-center justify-between mb-4">
											<div className="flex items-center gap-4">
												<div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2">
													<Building2 className="w-8 h-8 text-gray-400" />
												</div>
												<div>
													<h3 className="text-xl font-bold text-gray-800">{internship.title}</h3>
													<p className="text-gray-600">{internship.company}</p>
												</div>
											</div>
											<div className="text-right">
												<span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(internship.status)}`}>
													{internship.status}
												</span>
											</div>
										</div>
									</div>

									{/* Internship Details */}
									<div className="p-6">
										<div className="grid md:grid-cols-2 gap-4 mb-6">
											<div className="flex items-center gap-2 text-gray-600 text-sm">
												<Clock className="w-4 h-4" />
												<span>{internship.duration}</span>
											</div>
											<div className="flex items-center gap-2 text-gray-600 text-sm">
												<MapPin className="w-4 h-4" />
												<span>{internship.location}</span>
											</div>
											<div className="flex items-center gap-2 text-gray-600 text-sm">
												<Trophy className="w-4 h-4" />
												<span className="font-medium text-green-600">{internship.stipend}</span>
											</div>
											<div className="flex items-center gap-2 text-gray-600 text-sm">
												<Calendar className="w-4 h-4" />
												<span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
											</div>
										</div>

										{/* Description */}
										<p className="text-gray-600 text-sm leading-relaxed mb-6">
											{internship.description}
										</p>

										{/* Skills Required */}
										<div className="mb-6">
											<h4 className="text-sm font-semibold text-gray-800 mb-3">Skills Required:</h4>
											<div className="flex flex-wrap gap-2">
												{internship.skills.map((skill, skillIndex) => (
													<span
														key={skillIndex}
														className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
													>
														{skill}
													</span>
												))}
											</div>
										</div>

										{/* Benefits */}
										<div className="mb-6">
											<h4 className="text-sm font-semibold text-gray-800 mb-3">Benefits:</h4>
											<div className="grid grid-cols-2 gap-2">
												{internship.benefits.map((benefit, benefitIndex) => (
													<div key={benefitIndex} className="flex items-center gap-2 text-xs text-gray-600">
														<CheckCircle2 className="w-3 h-3 text-green-500" />
														<span>{benefit}</span>
													</div>
												))}
											</div>
										</div>

										{/* Eligibility */}
										<div className="mb-6 p-3 bg-gray-50 rounded-lg">
											<p className="text-sm text-gray-700">
												<span className="font-medium">Eligibility:</span> {internship.eligibility}
											</p>
										</div>

										{/* Action Button */}
										<button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2">
											<span>Apply Now</span>
											<ExternalLink className="w-4 h-4" />
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{filteredInternships.length === 0 && (
						<motion.div
							variants={fadeInUp}
							className="text-center py-16"
						>
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<Search className="w-12 h-12 text-gray-400" />
							</div>
							<h3 className="text-2xl font-bold text-gray-800 mb-4">No internships found</h3>
							<p className="text-gray-600">Try adjusting your filters to see more opportunities</p>
						</motion.div>
					)}
				</div>
			</motion.section>

			{/* Application Process */}
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
							Application Process
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Follow these simple steps to apply for your dream internship
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="max-w-4xl mx-auto">
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{applicationProcess.map((step, index) => (
								<motion.div
									key={step.step}
									variants={scaleIn}
									className="relative group"
								>
									<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
										<div className="text-center">
											<div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
												{step.icon}
											</div>
											<div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-sm font-bold">
												{step.step}
											</div>
											<h3 className="text-lg font-bold text-gray-800 mb-3">{step.title}</h3>
											<p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
										</div>
									</div>
									{index < applicationProcess.length - 1 && (
										<div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
											<ChevronRight className="w-6 h-6 text-gray-300" />
										</div>
									)}
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Success Stories */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-r from-green-50 to-teal-50"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Success Stories
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Hear from our students who transformed their careers through internships
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{successStories.map((story, index) => (
							<motion.div
								key={index}
								variants={scaleIn}
								className="group"
							>
								<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
									{/* Student Photo */}
									<div className="relative h-48 bg-gradient-to-br from-green-400 to-teal-500">
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
												<GraduationCap className="w-12 h-12 text-white" />
											</div>
										</div>
										<div className="absolute top-4 right-4">
											<span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
												{story.batch}
											</span>
										</div>
									</div>
									
									<div className="p-6">
										<div className="mb-4">
											<h3 className="text-xl font-bold text-gray-800 mb-2">{story.name}</h3>
											<p className="text-green-600 font-medium">{story.role}</p>
											<p className="text-gray-600 text-sm">{story.company}</p>
										</div>

										<div className="mb-4">
											<span className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium">
												{story.achievement}
											</span>
										</div>

										<p className="text-gray-600 text-sm leading-relaxed">
											{story.story}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Call to Action */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-20 bg-gradient-to-r from-green-600 to-teal-600"
			>
				<div className="container mx-auto px-6 text-center">
					<div className="max-w-3xl mx-auto text-white">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Ready to Start Your Journey?
						</h2>
						<p className="text-xl mb-8 opacity-90">
							Don&apos;t wait for opportunities, create them. Apply for internships today 
							and take the first step towards your dream career.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
								<Briefcase className="w-6 h-6" />
								Browse Internships
							</button>
							<button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center gap-2">
								<Phone className="w-6 h-6" />
								Contact Us
							</button>
						</div>
					</div>
				</div>
			</motion.section>
		</div>
	);
};

export default InternshipOpportunityPage;
