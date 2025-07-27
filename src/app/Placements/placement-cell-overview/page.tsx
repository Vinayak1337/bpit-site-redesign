'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
	Award,
	Target,
	Users,
	TrendingUp,
	Building2,
	BookOpen,
	MessageSquare,
	Star,
	CheckCircle2,
	ArrowRight,
	Mail,
	Phone,
	Linkedin,
	Trophy,
	BarChart3,
	Briefcase,
	GraduationCap,
	Globe,
	ChevronRight,
	Quote,
	Download,
	Rocket
} from 'lucide-react';

const PlacementCellOverviewPage = () => {
	const [activeObjective, setActiveObjective] = useState(0);

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

	const placementStats = [
		{
			value: '96%',
			label: 'Placement Rate',
			description: 'Eligible & Interested Students',
			icon: <Trophy className="w-8 h-8" />,
			color: 'from-green-500 to-emerald-500'
		},
		{
			value: '₹9.07L',
			label: 'Average Package',
			description: '2022 Pass Out Batch',
			icon: <TrendingUp className="w-8 h-8" />,
			color: 'from-blue-500 to-cyan-500'
		},
		{
			value: '₹7.0L',
			label: 'Median Package',
			description: 'Per Annum',
			icon: <BarChart3 className="w-8 h-8" />,
			color: 'from-purple-500 to-pink-500'
		},
		{
			value: '200+',
			label: 'Partner Companies',
			description: 'Including MNCs & Startups',
			icon: <Building2 className="w-8 h-8" />,
			color: 'from-orange-500 to-red-500'
		}
	];

	const tpTeam = [
		{
			id: 1,
			name: 'Prof. Achal Kausik',
			position: 'Head, Training & Placement',
			designation: 'Dean Academics, HOD CSE',
			email: 'achal.kausik@bpitindia.ac.in',
			phone: '+91-98XX-XXX-XXX',
			image: '/achal-sir.png',
			qualifications: ['Ph.D. Computer Science', 'M.Tech CSE', 'B.Tech CSE'],
			experience: '15+ Years in Academia',
			specialization: 'Data Structures, Algorithms, Machine Learning',
			achievements: [
				'Led 96% placement success rate',
				'Established partnerships with 200+ companies',
				'Implemented innovative training programs'
			],
			social: {
				linkedin: '#',
				email: 'achal.kausik@bpitindia.ac.in'
			}
		},
		{
			id: 2,
			name: 'Mr. Sanjay Dureja',
			position: 'Senior Manager T&P',
			designation: 'Training & Placement',
			email: 'sanjay.dureja@bpitindia.ac.in',
			phone: '+91-98XX-XXX-XXX',
			image: '/team/sanjay-dureja.jpg',
			qualifications: ['MBA HR', 'B.Tech'],
			experience: '12+ Years in Industry & Academia',
			specialization: 'Corporate Relations, Student Training',
			achievements: [
				'Built strong industry connections',
				'Coordinated 500+ placement drives',
				'Developed comprehensive training modules'
			],
			social: {
				linkedin: '#',
				email: 'sanjay.dureja@bpitindia.ac.in'
			}
		},
		{
			id: 3,
			name: 'Ms. Priyanka',
			position: 'Assistant Manager T&P',
			designation: 'Training & Placement',
			email: 'priyanka@bpitindia.ac.in',
			phone: '+91-98XX-XXX-XXX',
			image: '/team/priyanka.jpg',
			qualifications: ['MBA', 'B.Com'],
			experience: '8+ Years in Placement Operations',
			specialization: 'Student Counseling, Interview Coordination',
			achievements: [
				'Managed placement logistics',
				'Coordinated technical assessments',
				'Student career guidance specialist'
			],
			social: {
				linkedin: '#',
				email: 'priyanka@bpitindia.ac.in'
			}
		},
		{
			id: 4,
			name: 'Mr. Kashish',
			position: 'T&P Coordinator',
			designation: 'Training & Placement',
			email: 'kashish@bpitindia.ac.in',
			phone: '+91-98XX-XXX-XXX',
			image: '/team/kashish.jpg',
			qualifications: ['M.Tech', 'B.Tech CSE'],
			experience: '5+ Years in Technical Training',
			specialization: 'Technical Training, Skill Development',
			achievements: [
				'Conducted 100+ technical workshops',
				'Improved coding proficiency by 40%',
				'Established coding club activities'
			],
			social: {
				linkedin: '#',
				email: 'kashish@bpitindia.ac.in'
			}
		},
		{
			id: 5,
			name: 'Ms. Promila',
			position: 'Office Assistant',
			designation: 'Training & Placement',
			email: 'promila@bpitindia.ac.in',
			phone: '+91-98XX-XXX-XXX',
			image: '/team/promila.jpg',
			qualifications: ['B.Com', 'Diploma in Computer Applications'],
			experience: '10+ Years in Administrative Support',
			specialization: 'Administrative Operations, Documentation',
			achievements: [
				'Managed student databases efficiently',
				'Coordinated placement documentation',
				'Streamlined administrative processes'
			],
			social: {
				email: 'promila@bpitindia.ac.in'
			}
		}
	];

	const focusAreas = [
		{
			title: 'Information Dissemination',
			description: 'Keeping students informed about opportunities, requirements, and industry trends',
			icon: <Globe className="w-6 h-6" />,
			color: 'from-blue-500 to-cyan-500'
		},
		{
			title: 'Motivation',
			description: 'Inspiring students to excel and participate in various competitions and activities',
			icon: <Rocket className="w-6 h-6" />,
			color: 'from-purple-500 to-pink-500'
		},
		{
			title: 'Assessment',
			description: 'Early evaluation of student capabilities to identify strengths and improvement areas',
			icon: <Target className="w-6 h-6" />,
			color: 'from-green-500 to-emerald-500'
		},
		{
			title: 'Training',
			description: 'Comprehensive skill development through in-house resources and external agencies',
			icon: <BookOpen className="w-6 h-6" />,
			color: 'from-orange-500 to-red-500'
		},
		{
			title: 'Feedback',
			description: 'Continuous improvement through student and recruiter feedback mechanisms',
			icon: <MessageSquare className="w-6 h-6" />,
			color: 'from-teal-500 to-blue-500'
		},
		{
			title: 'Placements',
			description: 'Facilitating successful career transitions through strategic placement drives',
			icon: <Briefcase className="w-6 h-6" />,
			color: 'from-indigo-500 to-purple-500'
		}
	];

	const objectives = [
		{
			title: 'Maximum Placement Success',
			description: 'Get the maximum eligible and interested students placed in reputed organizations',
			icon: <Trophy className="w-8 h-8" />,
			details: 'We strive to achieve 100% placement for all eligible and interested students through strategic partnerships and comprehensive training programs.'
		},
		{
			title: 'Competitive Packages',
			description: 'To achieve a good mean and median package for our students',
			icon: <TrendingUp className="w-8 h-8" />,
			details: 'Focus on securing competitive salary packages that reflect the quality of education and skills developed at BPIT.'
		},
		{
			title: 'Higher Studies Support',
			description: 'To help students who wish to pursue higher studies and research',
			icon: <GraduationCap className="w-8 h-8" />,
			details: 'Providing guidance and support for students interested in pursuing masters, PhD, and other advanced degree programs.'
		}
	];

	const topRecruiters = [
		{ name: 'TCS', logo: '/logos/tcs.png', tier: 'Mass' },
		{ name: 'Infosys', logo: '/logos/infosys.png', tier: 'Mass' },
		{ name: 'Wipro', logo: '/logos/wipro.png', tier: 'Mass' },
		{ name: 'HCL', logo: '/logos/hcl.png', tier: 'Mass' },
		{ name: 'IBM', logo: '/logos/ibm.png', tier: 'Mass' },
		{ name: 'Accenture', logo: '/logos/accenture.png', tier: 'Mass' },
		{ name: 'Capgemini', logo: '/logos/capgemini.png', tier: 'Mass' },
		{ name: 'Cognizant', logo: '/logos/cognizant.png', tier: 'Mass' },
		{ name: 'Microsoft', logo: '/logos/microsoft.png', tier: 'Premium' },
		{ name: 'Nagarro', logo: '/logos/nagarro.png', tier: 'Product' },
		{ name: 'Tech Mahindra', logo: '/logos/png-clipart-satyam-scandal-tech-mahindra.png', tier: 'Mass' },
		{ name: 'KPMG', logo: '/logos/kpmg.png', tier: 'Premium' }
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
			{/* Hero Section */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white"
			>
				<div 
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
					}}
				></div>
				
				<div className="relative container mx-auto px-6 py-24">
					<div className="max-w-4xl mx-auto text-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="mb-8"
						>
							<div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mb-6">
								<Building2 className="w-12 h-12 text-cyan-300" />
							</div>
						</motion.div>
						
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
						>
							Placement Cell Overview
						</motion.h1>
						
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
						>
							Bridging Academia and Industry for Exceptional Career Success
						</motion.p>
						
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="flex flex-wrap justify-center gap-4"
						>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-cyan-200">
									<Award className="w-5 h-5" />
									96% Placement Rate
								</span>
							</div>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-cyan-200">
									<TrendingUp className="w-5 h-5" />
									₹9.07L Average Package
								</span>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Key Statistics */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-16 bg-white shadow-lg relative z-10 -mt-12 mx-6 rounded-3xl"
			>
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{placementStats.map((stat, index) => (
							<motion.div
								key={index}
								variants={scaleIn}
								className="text-center group cursor-pointer"
							>
								<div className="relative">
									<div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
										<div className="text-white">{stat.icon}</div>
									</div>
									<div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
										<Star className="w-3 h-3 text-yellow-800" />
									</div>
								</div>
								<div className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
									{stat.value}
								</div>
								<div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
								<div className="text-sm text-gray-500">{stat.description}</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Message from T&P Head */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50"
			>
				<div className="container mx-auto px-6">
					<div className="max-w-6xl mx-auto">
						<motion.div variants={fadeInUp} className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
								Message from T&P Head
							</h2>
							<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
						</motion.div>

						<div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
							<div className="grid lg:grid-cols-5 gap-0">
								{/* Profile Section */}
								<div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-center items-center text-white">
									<div className="relative mb-6">
										<div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border-4 border-white/30">
											<Image
												src="/achal-sir.png"
												alt="Prof. Achal Kausik"
												width={128}
												height={128}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
											<Quote className="w-5 h-5 text-yellow-800" />
										</div>
									</div>
									
									<h3 className="text-2xl font-bold mb-2 text-center">Prof. Achal Kausik</h3>
									<p className="text-blue-200 text-center mb-4">Head, Training & Placement</p>
									<p className="text-blue-200 text-center text-sm">Dean Academics, HOD CSE</p>
									
									<div className="mt-6 flex gap-3">
										<div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
											<Mail className="w-5 h-5" />
										</div>
										<div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
											<Linkedin className="w-5 h-5" />
										</div>
									</div>
								</div>

								{/* Message Content */}
								<div className="lg:col-span-3 p-8 lg:p-12">
									<div className="space-y-6 text-gray-700 leading-relaxed">
										<div className="flex items-start gap-4">
											<Quote className="w-8 h-8 text-blue-500 mt-1 flex-shrink-0" />
											<div className="space-y-4">
												<p className="text-lg">
													BPIT has a well equipped Training and placement Cell. The team consists of 
													dedicated professionals who work tirelessly to ensure our students achieve their career goals.
												</p>
												
												<p>
													The average package of 2022 pass out batch is around <span className="font-bold text-blue-600">9.07 lakhs per annum</span> where as median is 
													<span className="font-bold text-blue-600"> Rs. 7.0 Lakhs per annum</span>. As far as placement is concerned 
													<span className="font-bold text-green-600"> 96% of eligible and interested students got placed</span>.
												</p>
												
												<p>
													The students are able to secure jobs in reputed companies such as <span className="font-semibold">Google, Microsoft, Amazon, Zomato, Flipkart, Paytm, Mobikwik, Josh Technologies, Zs Associates</span>. 
													All major mass recruiters such as TCS, Infosys, HCL, IBM, Capgemini, Wipro, Accenture etc. also recruit from BPIT.
												</p>
												
												<div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
													<p className="italic">
														&quot;T&P cell has a well defined placement policy which is circulated to the students one year in advance 
														in order to avoid any confusion. The placement policy is followed strictly so that our objectives may be fulfilled.&quot;
													</p>
												</div>
												
												<p>
													After assessing students at an early stage, T&P cell try to impart training using either in house resources 
													or calling outside agencies/personnel to fill the gap identified during assessment. The students are provided 
													all kind of help to improve their awareness and are motivated to participate in various competitions.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Focus Areas */}
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
							Our Focus Areas
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							In order to get the best results, T&P cell focuses on these key areas
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{focusAreas.map((area, index) => (
							<motion.div
								key={index}
								variants={scaleIn}
								className="group"
							>
								<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
									<div className={`h-2 bg-gradient-to-r ${area.color}`}></div>
									
									<div className="p-8">
										<div className="flex items-center gap-4 mb-6">
											<div className={`w-14 h-14 bg-gradient-to-r ${area.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
												{area.icon}
											</div>
											<h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
												{area.title}
											</h3>
										</div>

										<p className="text-gray-600 leading-relaxed">
											{area.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Objectives Section */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-r from-gray-50 to-blue-50"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Our Objectives
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Strategic goals that drive our placement excellence
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="max-w-4xl mx-auto">
						<div className="space-y-6">
							{objectives.map((objective, index) => (
								<motion.div
									key={index}
									variants={scaleIn}
									className="group"
								>
									<div 
										className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${
											activeObjective === index ? 'ring-2 ring-blue-500' : ''
										}`}
										onClick={() => setActiveObjective(activeObjective === index ? -1 : index)}
									>
										<div className="p-8">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-6">
													<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
														{objective.icon}
													</div>
													<div>
														<h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
															{objective.title}
														</h3>
														<p className="text-gray-600">
															{objective.description}
														</p>
													</div>
												</div>
												<ChevronRight 
													className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
														activeObjective === index ? 'rotate-90' : ''
													}`} 
												/>
											</div>
											
											{activeObjective === index && (
												<motion.div
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													transition={{ duration: 0.3 }}
													className="mt-6 pt-6 border-t border-gray-100"
												>
													<p className="text-gray-700 leading-relaxed">
														{objective.details}
													</p>
												</motion.div>
											)}
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</motion.section>

			{/* T&P Team Section */}
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
							Meet Our T&P Team
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Dedicated professionals committed to your career success
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{tpTeam.map((member) => (
							<motion.div
								key={member.id}
								variants={scaleIn}
								className="group"
							>
								<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
									{/* Profile Image */}
									<div className="relative h-56 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden flex-shrink-0">
										{member.id === 1 ? (
											<Image
												src={member.image}
												alt={member.name}
												width={300}
												height={224}
												className="w-full h-full object-cover object-top"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
													<Users className="w-10 h-10 text-white" />
												</div>
											</div>
										)}
										<div className="absolute top-3 right-3">
											<span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
												{member.experience}
											</span>
										</div>
									</div>
									
									<div className="p-4 flex-grow flex flex-col">
										<div className="mb-3">
											<h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-1">{member.name}</h3>
											<p className="text-blue-600 font-medium text-sm line-clamp-1">{member.position}</p>
											<p className="text-gray-600 text-xs line-clamp-1">{member.designation}</p>
										</div>

										<div className="mb-3">
											<p className="text-gray-700 text-xs leading-relaxed line-clamp-2">
												<span className="font-medium">Specialization:</span> {member.specialization}
											</p>
										</div>

										{/* Qualifications */}
										<div className="mb-3">
											<h4 className="text-xs font-semibold text-gray-800 mb-1">Qualifications:</h4>
											<div className="flex flex-wrap gap-1">
												{member.qualifications.slice(0, 2).map((qual, qualIndex) => (
													<span
														key={qualIndex}
														className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium"
													>
														{qual}
													</span>
												))}
												{member.qualifications.length > 2 && (
													<span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
														+{member.qualifications.length - 2}
													</span>
												)}
											</div>
										</div>

										{/* Key Achievements */}
										<div className="mb-4 flex-grow">
											<h4 className="text-xs font-semibold text-gray-800 mb-1">Key Achievements:</h4>
											<div className="space-y-1">
												{member.achievements.slice(0, 2).map((achievement, achIndex) => (
													<div key={achIndex} className="flex items-start gap-2 text-xs text-gray-600">
														<CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
														<span className="line-clamp-2">{achievement}</span>
													</div>
												))}
											</div>
										</div>

										{/* Contact */}
										<div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
											<div className="flex gap-2">
												<div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer">
													<Mail className="w-4 h-4 text-blue-600" />
												</div>
												{member.social.linkedin && (
													<div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer">
														<Linkedin className="w-4 h-4 text-blue-600" />
													</div>
												)}
											</div>
											<button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
												View Profile
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Top Recruiters Preview */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Our Recruiting Partners
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Industry leaders who trust BPIT talent
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-8 max-w-6xl mx-auto">
						{topRecruiters.slice(0, 12).map((company, index) => (
							<motion.div
								key={index}
								variants={scaleIn}
								className="group cursor-pointer"
								whileHover={{ 
									scale: 1.1,
									rotateY: 10,
									transition: { duration: 0.3 }
								}}
								whileTap={{ scale: 0.95 }}
							>
								<div className="aspect-square flex items-center justify-center relative p-4">
									<Image
										src={company.logo}
										alt={`${company.name} logo`}
										width={80}
										height={80}
										className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 drop-shadow-lg group-hover:drop-shadow-2xl"
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.style.display = 'none';
										}}
									/>
									
									{/* Animated border on hover */}
									<div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
									
									{/* Subtle glow effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
									
									{/* Tooltip */}
									<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10">
										{company.name}
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div variants={fadeInUp} className="text-center mt-16">
						<Link href="/Placements/our-recrutiers">
							<motion.button 
								className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto group"
								whileHover={{ 
									scale: 1.05,
									boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
								}}
								whileTap={{ scale: 0.95 }}
							>
								<span>View All Recruiters</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
							</motion.button>
						</Link>
					</motion.div>
				</div>
			</motion.section>

			{/* Call to Action */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600"
			>
				<div className="container mx-auto px-6 text-center">
					<div className="max-w-3xl mx-auto text-white">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Ready to Launch Your Career?
						</h2>
						<p className="text-xl mb-8 opacity-90">
							Join BPIT&apos;s legacy of successful placements and take the first step 
							towards your dream career with industry-leading companies.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
								<Download className="w-6 h-6" />
								Placement Brochure
							</button>
							<button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
								<Phone className="w-6 h-6" />
								Contact T&P Cell
							</button>
						</div>
					</div>
				</div>
			</motion.section>
		</div>
	);
};

export default PlacementCellOverviewPage;
