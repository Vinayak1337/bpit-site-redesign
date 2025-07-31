'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
	Brain,
	Code,
	Database,
	MessageSquare,
	Users,
	Lightbulb,
	Target,
	TrendingUp,
	Award,
	BookOpen,
	Cpu,
	Globe,
	Zap,
	ChevronRight,
	CheckCircle2,
	Star,
	ArrowRight,
	GraduationCap,
	Building2,
	Briefcase,
	FileText,
	ClipboardList,
	UserCheck
} from 'lucide-react';

const TrainingAndPlacementPage = () => {
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

	const slideInLeft: Variants = {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
		}
	};

	const slideInRight: Variants = {
		hidden: { opacity: 0, x: 50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
		}
	};

	const trainingAreas = [
		{
			category: 'Core Technical Skills',
			icon: <Code className="w-6 h-6" />,
			color: 'from-blue-600 to-blue-400',
			skills: [
				'Data Structures & Algorithms',
				'Programming Languages',
				'CORE subjects (OS, DBMS, SE, OOPS, Networking)',
				'Web & Mobile Development',
				'System Design'
			]
		},
		{
			category: 'Aptitude & Reasoning',
			icon: <Brain className="w-6 h-6" />,
			color: 'from-blue-500 to-blue-300',
			skills: [
				'Quantitative Aptitude',
				'Logical Reasoning',
				'Verbal Skills',
				'SQL',
				'Linux'
			]
		},
		{
			category: 'Soft Skills & Communication',
			icon: <MessageSquare className="w-6 h-6" />,
			color: 'from-blue-700 to-blue-500',
			skills: [
				'Group Discussion & Interviews',
				'Guesstimates',
				'Case Studies',
				'Presentation Skills',
				'Professional Communication'
			]
		},
		{
			category: 'Specialized Technologies',
			icon: <Cpu className="w-6 h-6" />,
			color: 'from-blue-800 to-blue-600',
			skills: [
				'Digital Hardware Design and Implementation on FPGA',
				'Physical Design Flow in CMOS Technology',
				'ASIC Development',
				'Embedded System Design',
				'SOC verification'
			]
		},
		{
			category: 'Advanced Engineering',
			icon: <Zap className="w-6 h-6" />,
			color: 'from-blue-400 to-blue-200',
			skills: [
				'PCB Board Design',
				'Microstrip Patch Antenna Design Using HFSS',
				'Antenna Array',
				'Metamaterial Implementation on MIMO Antenna',
				'Band Pass Filter Designing'
			]
		},
		{
			category: 'Research & Analysis',
			icon: <Database className="w-6 h-6" />,
			color: 'from-blue-900 to-blue-700',
			skills: [
				'MATLAB Programming Techniques',
				'Signal Processing with MATLAB',
				'Image Processing with MATLAB',
				'Data Analysis',
				'Research Methodologies'
			]
		}
	];

	const highlights = [
		{
			icon: <Building2 className="w-8 h-8" />,
			title: 'Industry Partnerships',
			description: 'Technical training from renowned institutions',
			color: 'bg-blue-600'
		},
		{
			icon: <Users className="w-8 h-8" />,
			title: 'Expert Sessions',
			description: 'Guest lectures by industry personnel',
			color: 'bg-blue-700'
		},
		{
			icon: <Briefcase className="w-8 h-8" />,
			title: 'Industry Exposure',
			description: 'Regular industrial visits and internships',
			color: 'bg-blue-800'
		}
	];

	const stats = [
		{ value: '150+', label: 'Training Modules', icon: <BookOpen className="w-6 h-6" /> },
		{ value: '80+', label: 'Industry Partners', icon: <Building2 className="w-6 h-6" /> },
		{ value: '96%', label: 'Placement Rate', icon: <TrendingUp className="w-6 h-6" /> },
		{ value: '2500+', label: 'Students Trained', icon: <GraduationCap className="w-6 h-6" /> }
	];

	const trainingPrograms = [
		{
			title: 'Technical Skills Development',
			duration: '4 months',
			modules: ['Data Structures & Algorithms', 'System Design', 'Database Management', 'Web Technologies'],
			description: 'Comprehensive technical training covering core programming concepts and industry-relevant technologies.',
			icon: <Code className="w-8 h-8" />,
			color: 'from-blue-600 to-blue-400'
		},
		{
			title: 'Soft Skills & Communication',
			duration: '2 months',
			modules: ['Public Speaking', 'Team Leadership', 'Professional Etiquette', 'Presentation Skills'],
			description: 'Essential soft skills training to enhance professional communication and interpersonal abilities.',
			icon: <MessageSquare className="w-8 h-8" />,
			color: 'from-blue-700 to-blue-500'
		},
		{
			title: 'Industry Certification Programs',
			duration: '3-6 months',
			modules: ['AWS Cloud Practitioner', 'Google Analytics', 'Microsoft Azure', 'Oracle Database'],
			description: 'Industry-recognized certification programs to boost technical credentials and market value.',
			icon: <Award className="w-8 h-8" />,
			color: 'from-blue-800 to-blue-600'
		},
		{
			title: 'Aptitude & Reasoning',
			duration: '3 months',
			modules: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'],
			description: 'Intensive aptitude training to excel in placement tests and competitive examinations.',
			icon: <Brain className="w-8 h-8" />,
			color: 'from-blue-500 to-blue-300'
		}
	];

	const placementProcess = [
		{
			step: 1,
			title: 'Pre-Placement Preparation',
			description: 'Resume building, skill assessment, and career counseling sessions.',
			icon: <FileText className="w-6 h-6" />,
			duration: '2-3 months',
			activities: ['Resume Review', 'Mock Interviews', 'Skill Gap Analysis', 'Industry Orientation']
		},
		{
			step: 2,
			title: 'Company Registration',
			description: 'Students register for companies based on eligibility and preferences.',
			icon: <ClipboardList className="w-6 h-6" />,
			duration: '1-2 weeks',
			activities: ['Eligibility Check', 'Company Research', 'Application Submission', 'Document Verification']
		},
		{
			step: 3,
			title: 'Assessment & Interviews',
			description: 'Online tests, technical rounds, and HR interviews conducted by companies.',
			icon: <UserCheck className="w-6 h-6" />,
			duration: '1-4 weeks',
			activities: ['Aptitude Test', 'Technical Interview', 'HR Round', 'Group Discussion']
		},
		{
			step: 4,
			title: 'Final Selection',
			description: 'Offer letters, salary negotiation, and joining formalities.',
			icon: <CheckCircle2 className="w-6 h-6" />,
			duration: '1-2 weeks',
			activities: ['Result Declaration', 'Offer Letter', 'Background Verification', 'Joining Process']
		}
	];

	const industryPartners = [
		{ name: 'Information Technology', companies: 25, avgPackage: '8.5 LPA', topRoles: ['Software Engineer', 'Data Analyst'] },
		{ name: 'Financial Services', companies: 15, avgPackage: '7.2 LPA', topRoles: ['Financial Analyst', 'Risk Manager'] },
		{ name: 'Consulting', companies: 12, avgPackage: '9.1 LPA', topRoles: ['Business Consultant', 'Strategy Analyst'] },
		{ name: 'Manufacturing', companies: 18, avgPackage: '6.8 LPA', topRoles: ['Process Engineer', 'Quality Manager'] },
		{ name: 'Healthcare', companies: 8, avgPackage: '7.5 LPA', topRoles: ['Healthcare IT', 'Biomedical Engineer'] },
		{ name: 'E-commerce', companies: 10, avgPackage: '8.9 LPA', topRoles: ['Product Manager', 'Business Analyst'] }
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
			{/* Hero Section */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white"
			>
				<div 
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
								<Target className="w-10 h-10 text-blue-300" />
							</div>
						</motion.div>
						
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-transparent"
						>
							Training & Placement Cell
						</motion.h1>
						
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
						>
							Empowering students with comprehensive skill development for tomorrow&apos;s challenges
						</motion.p>
						
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="flex flex-wrap justify-center gap-4"
						>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-blue-200">
									<Award className="w-5 h-5" />
									Excellence in Training
								</span>
							</div>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-blue-200">
									<TrendingUp className="w-5 h-5" />
									Industry-Ready Skills
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
								<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
									<div className="text-white">{stat.icon}</div>
								</div>
								<div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
								<div className="text-gray-600 font-medium">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Mission Statement */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50"
			>
				<div className="container mx-auto px-6">
					<div className="max-w-6xl mx-auto">
						<motion.div variants={fadeInUp} className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
								Our Mission
							</h2>
							<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
						</motion.div>

						<div className="grid md:grid-cols-2 gap-12 items-center">
							<motion.div variants={slideInLeft} className="space-y-6">
								<div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
									<div className="flex items-start gap-4 mb-6">
										<div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
											<Lightbulb className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">Innovation-Driven Learning</h3>
											<p className="text-gray-600 leading-relaxed">
												The modern era is highly competitive, enabling us with a myriad of opportunities. 
												Technology is drastically changing, and it is difficult to pace up with constantly 
												evolving avenues in the digitalised set-up.
											</p>
										</div>
									</div>
								</div>

								<div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
											<Target className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">Holistic Development</h3>
											<p className="text-gray-600 leading-relaxed">
												Training and Placement Cell at BPIT aims for the overall development of students. 
												We strive hard to impart knowledge based on blended learning where theoretical 
												and practical knowledge culminates in ambitious, goal-oriented students.
											</p>
										</div>
									</div>
								</div>
							</motion.div>

							<motion.div variants={slideInRight} className="space-y-6">
								<div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
											<Users className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">Industry-Ready Skills</h3>
											<p className="text-gray-600 leading-relaxed">
												BPIT aspires to build the perceived importance of technical competence with 
												embodied perception. We expose students to industry demands early in their 
												journey with an objective to develop a comprehensive skill set.
											</p>
										</div>
									</div>
								</div>

								<div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
									<div className="flex items-center gap-3 mb-4">
										<Award className="w-8 h-8" />
										<h3 className="text-xl font-bold">Excellence Promise</h3>
									</div>
									<p className="leading-relaxed opacity-90">
										In-house competency has been developed over the years in all key areas 
										significant for placement and diverse career paths for students.
									</p>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Training Areas */}
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
							Comprehensive Training Program
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Our meticulously designed curriculum covers all essential areas to ensure 
							students are well-prepared for the competitive industry landscape
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{trainingAreas.map((area, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
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
												{area.category}
											</h3>
										</div>

										<ul className="space-y-3">
											{area.skills.map((skill, skillIndex) => (
												<li key={skillIndex} className="flex items-start gap-3">
													<CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
													<span className="text-gray-600 leading-relaxed">{skill}</span>
												</li>
											))}
										</ul>

										<div className="mt-6 pt-6 border-t border-gray-100">
											<div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
												<span>Learn more</span>
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

			{/* Key Highlights */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden"
			>
				<div 
					className="absolute inset-0 opacity-30"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0h100v100h-100z' fill='none'/%3E%3Cpath d='m0 0 50 50-50 50v-100z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/svg%3E")`
					}}
				></div>
				
				<div className="container mx-auto px-6 relative z-10">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Why Choose Our Training Program?
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-200 mx-auto rounded-full"></div>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{highlights.map((highlight, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="group"
							>
								<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group-hover:scale-105">
									<div className={`w-16 h-16 ${highlight.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
										{highlight.icon}
									</div>
									
									<h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
										{highlight.title}
									</h3>
									
									<p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
										{highlight.description}
									</p>
									
									<div className="mt-6 flex items-center text-blue-300 font-medium">
										<span>Explore</span>
										<ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div
						variants={fadeInUp}
						className="mt-16 text-center"
					>
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
							<Star className="w-12 h-12 text-blue-300 mx-auto mb-6" />
							<h3 className="text-2xl font-bold mb-4">
								Technical training from renowned institutions, guest lectures by industry personnel 
								and industrial visits are key attributes of our training programme.
							</h3>
							<p className="text-gray-300 text-lg">
								Experience comprehensive learning that bridges the gap between academic knowledge 
								and industry requirements.
							</p>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Training Programs Detail */}
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
							Comprehensive Training Programs
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Our structured training modules are designed to develop both technical expertise and professional skills
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-6">
						{trainingPrograms.map((program, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="group"
							>
								<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
									<div className={`h-1.5 bg-gradient-to-r ${program.color}`}></div>
									
									<div className="p-6">
										<div className="flex items-center gap-3 mb-4">
											<div className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
												<div className="scale-75">{program.icon}</div>
											</div>
											<div>
												<h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
													{program.title}
												</h3>
												<p className="text-blue-600 font-medium text-sm">Duration: {program.duration}</p>
											</div>
										</div>

										<p className="text-gray-600 mb-4 text-sm leading-relaxed">
											{program.description}
										</p>

										<div className="space-y-2">
											<h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Modules:</h4>
											{program.modules.map((module, moduleIndex) => (
												<div key={moduleIndex} className="flex items-start gap-2">
													<CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
													<span className="text-gray-600 text-sm">{module}</span>
												</div>
											))}
										</div>

										<div className="mt-4 pt-4 border-t border-gray-100">
											<div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors cursor-pointer text-sm">
												<span>View Curriculum</span>
												<ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Placement Process */}
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
							Our Placement Process
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							A systematic approach to ensure successful career placements for our students
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="relative">
						{/* Process Flow Line */}
						<div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 z-0"></div>

						<div className="grid lg:grid-cols-4 gap-8 relative z-10">
							{placementProcess.map((step, index) => (
								<motion.div
									key={index}
									variants={fadeInUp}
									className="text-center group"
								>
									<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 relative">
										{/* Step Number */}
										<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
											{step.step}
										</div>

										<div className="mt-6 mb-6">
											<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
												{step.icon}
											</div>
											<h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
												{step.title}
											</h3>
											<p className="text-blue-600 font-medium text-sm mb-4">
												Duration: {step.duration}
											</p>
										</div>

										<p className="text-gray-600 mb-6 leading-relaxed">
											{step.description}
										</p>

										<div className="space-y-2">
											<h4 className="font-semibold text-gray-800 text-sm mb-3">Key Activities:</h4>
											{step.activities.map((activity, activityIndex) => (
												<div key={activityIndex} className="flex items-center gap-2 text-sm">
													<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
													<span className="text-gray-600">{activity}</span>
												</div>
											))}
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Industry Partners & Statistics */}
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
							Industry Partnerships
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Strong connections across diverse industries ensuring varied placement opportunities
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{industryPartners.map((industry, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="group"
							>
								<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
											{industry.name}
										</h3>
										<Building2 className="w-6 h-6 text-blue-500" />
									</div>

									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-gray-600">Companies</span>
											<span className="font-semibold text-blue-600">{industry.companies}+</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-600">Avg Package</span>
											<span className="font-semibold text-green-600">{industry.avgPackage}</span>
										</div>
									</div>

									<div className="mt-4 pt-4 border-t border-gray-100">
										<p className="text-sm text-gray-600 mb-2">Top Roles:</p>
										<div className="flex flex-wrap gap-2">
											{industry.topRoles.map((role, roleIndex) => (
												<span key={roleIndex} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
													{role}
												</span>
											))}
										</div>
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
				className="py-20 bg-gradient-to-r from-blue-700 to-blue-900"
			>
				<div className="container mx-auto px-6 text-center">
					<div className="max-w-3xl mx-auto text-white">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Ready to Transform Your Career?
						</h2>
						<p className="text-xl mb-8 opacity-90">
							Join our comprehensive training program and become industry-ready with 
							cutting-edge skills and practical experience.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
								<GraduationCap className="w-6 h-6" />
								Start Your Journey
							</button>
							<button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-700 transition-colors flex items-center justify-center gap-2">
								<Globe className="w-6 h-6" />
								Learn More
							</button>
						</div>
					</div>
				</div>
			</motion.section>
		</div>
	);
};

export default TrainingAndPlacementPage;
