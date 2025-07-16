'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
	MessageSquare, 
	Shield, 
	Users, 
	Heart, 
	Scale, 
	Clock, 
	CheckCircle, 
	Phone, 
	Mail, 
	MapPin, 
	User, 
	FileText, 
	Info, 
	Star, 
	Eye, 
	Lock, 
	Send, 
	BookOpen, 
	Target, 
	ChevronRight, 
	ChevronDown, 
	Download,
	HelpCircle,
	ThumbsUp,
	Timer,
	Users2,
	Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DynamicSidebar from '@/components/ui/DynamicSidebar';

export default function GrievanceCellPage() {
	const [activeTab, setActiveTab] = useState('overview');
	const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		rollNumber: '',
		grievanceType: '',
		description: '',
		anonymous: false,
		urgent: false
	});

	const studentLifeNavItems = [
		{
			id: 'facilities',
			title: 'Campus Facilities',
			icon: 'Home',
			href: '/student-life/facilities'
		},
		{
			id: 'clubs',
			title: 'Clubs & Societies',
			icon: 'Users',
			href: '/student-life/clubs'
		},
		{
			id: 'events',
			title: 'Events & Festivals',
			icon: 'Music',
			href: '/student-life/events'
		},
		{
			id: 'grievance',
			title: 'Grievance Cell',
			icon: 'Shield',
			href: '/student-life/grievance'
		},
		{
			id: 'conduct',
			title: 'Code of Conduct',
			icon: 'Scale',
			href: '/student-life/code-of-conduct'
		}
	];

	const sidebarTheme = {
		primary: 'blue',
		activeGradient: 'from-blue-500/10 to-purple-500/10',
		activeBorder: 'border-l-4 border-blue-500',
		activeText: 'text-blue-700',
		activeIcon: 'text-blue-600',
		activeChevron: 'text-blue-500'
	};

	const grievanceTypes = [
		{
			icon: <BookOpen className="w-8 h-8 text-blue-500" />,
			title: "Academic Issues",
			description: "Concerns related to academics, grades, faculty, or coursework",
			color: "blue",
			examples: ["Unfair grading", "Academic harassment", "Curriculum issues", "Faculty misconduct"]
		},
		{
			icon: <Users className="w-8 h-8 text-green-500" />,
			title: "Harassment & Discrimination",
			description: "Reports of harassment, discrimination, or bullying",
			color: "green",
			examples: ["Sexual harassment", "Ragging", "Discrimination", "Cyberbullying"]
		},
		{
			icon: <Building className="w-8 h-8 text-purple-500" />,
			title: "Infrastructure Issues",
			description: "Problems with campus facilities, hostels, or infrastructure",
			color: "purple",
			examples: ["Hostel problems", "Facility maintenance", "Safety concerns", "Equipment issues"]
		},
		{
			icon: <FileText className="w-8 h-8 text-orange-500" />,
			title: "Administrative Issues",
			description: "Concerns about administrative processes and services",
			color: "orange",
			examples: ["Fee issues", "Document problems", "Service delays", "Policy concerns"]
		},
		{
			icon: <Heart className="w-8 h-8 text-red-500" />,
			title: "Personal & Welfare",
			description: "Mental health, personal issues, and student welfare concerns",
			color: "red",
			examples: ["Mental health", "Financial aid", "Personal safety", "Counseling needs"]
		},
		{
			icon: <Scale className="w-8 h-8 text-indigo-500" />,
			title: "Other Concerns",
			description: "Any other issues that don't fit the above categories",
			color: "indigo",
			examples: ["General complaints", "Suggestions", "Policy feedback", "Other matters"]
		}
	];

	const process = [
		{
			step: 1,
			title: "Submit Grievance",
			description: "Fill out the online form or visit our office with your concern",
			icon: <Send className="w-6 h-6 text-blue-600" />,
			timeframe: "Immediate"
		},
		{
			step: 2,
			title: "Acknowledgment",
			description: "Receive confirmation with unique grievance ID for tracking",
			icon: <CheckCircle className="w-6 h-6 text-green-600" />,
			timeframe: "Within 24 hours"
		},
		{
			step: 3,
			title: "Investigation",
			description: "Our team investigates and gathers relevant information",
			icon: <Eye className="w-6 h-6 text-purple-600" />,
			timeframe: "3-7 working days"
		},
		{
			step: 4,
			title: "Resolution",
			description: "Appropriate action taken and resolution communicated",
			icon: <Target className="w-6 h-6 text-orange-600" />,
			timeframe: "7-15 working days"
		},
		{
			step: 5,
			title: "Follow-up",
			description: "Feedback collection and case closure confirmation",
			icon: <ThumbsUp className="w-6 h-6 text-teal-600" />,
			timeframe: "Within 30 days"
		}
	];

	const principles = [
		{
			title: "Confidentiality",
			description: "All grievances are handled with utmost confidentiality and privacy",
			icon: <Lock className="w-8 h-8 text-blue-500" />
		},
		{
			title: "Impartiality",
			description: "Fair and unbiased investigation of all complaints",
			icon: <Scale className="w-8 h-8 text-green-500" />
		},
		{
			title: "Accessibility",
			description: "Easy access to grievance mechanisms for all students",
			icon: <Users className="w-8 h-8 text-purple-500" />
		},
		{
			title: "Timeliness",
			description: "Quick response and resolution within defined timeframes",
			icon: <Clock className="w-8 h-8 text-orange-500" />
		}
	];

	const committeemembers = [
		{
			name: "Dr. Rajesh Kumar",
			position: "Chairperson, Student Grievance Cell",
			department: "Dean, Student Affairs",
			email: "rajesh.kumar@bpit.ac.in",
			phone: "+91-11-2757-1125",
			image: "/api/placeholder/150/150"
		},
		{
			name: "Prof. Priya Sharma",
			position: "Faculty Representative",
			department: "Computer Science Engineering",
			email: "priya.sharma@bpit.ac.in",
			phone: "+91-11-2757-1126",
			image: "/api/placeholder/150/150"
		},
		{
			name: "Ms. Anjali Gupta",
			position: "Administrative Representative",
			department: "Student Services",
			email: "anjali.gupta@bpit.ac.in",
			phone: "+91-11-2757-1127",
			image: "/api/placeholder/150/150"
		},
		{
			name: "Arjun Patel",
			position: "Student Representative",
			department: "Final Year, ECE",
			email: "arjun.patel@student.bpit.ac.in",
			phone: "+91-98765-43210",
			image: "/api/placeholder/150/150"
		}
	];

	const faqs = [
		{
			id: "what-is-grievance",
			question: "What constitutes a grievance?",
			answer: "A grievance is any concern, complaint, or issue that affects your academic experience, personal well-being, or rights as a student. This includes academic problems, harassment, discrimination, infrastructure issues, or any unfair treatment."
		},
		{
			id: "anonymous-reporting",
			question: "Can I file a grievance anonymously?",
			answer: "Yes, we accept anonymous grievances. However, providing your contact information helps us communicate with you about the progress and resolution of your concern. We maintain strict confidentiality in all cases."
		},
		{
			id: "response-time",
			question: "How long does it take to resolve a grievance?",
			answer: "Most grievances are resolved within 7-15 working days. Complex cases may take longer, but we provide regular updates on the progress. Urgent matters are prioritized and addressed immediately."
		},
		{
			id: "retaliation-protection",
			question: "Will I face any retaliation for filing a grievance?",
			answer: "Absolutely not. The college has a strict no-retaliation policy. Any form of retaliation against students who file grievances is itself a serious violation and will result in severe consequences for the perpetrator."
		},
		{
			id: "appeal-process",
			question: "What if I'm not satisfied with the resolution?",
			answer: "If you're not satisfied with the initial resolution, you can appeal to the higher authorities. The appeal process involves review by senior college officials and external committee members if necessary."
		},
		{
			id: "support-available",
			question: "What support is available during the process?",
			answer: "We provide counseling support, legal guidance if needed, and can connect you with external support services. You can also have a trusted person accompany you during meetings if required."
		}
	];

	const stats = [
		{
			number: "98%",
			label: "Resolution Rate",
			description: "Successfully resolved grievances",
			icon: <CheckCircle className="w-8 h-8 text-green-500" />
		},
		{
			number: "24hrs",
			label: "Response Time",
			description: "Average first response time",
			icon: <Timer className="w-8 h-8 text-blue-500" />
		},
		{
			number: "500+",
			label: "Cases Handled",
			description: "Total grievances addressed",
			icon: <FileText className="w-8 h-8 text-purple-500" />
		},
		{
			number: "4.8/5",
			label: "Satisfaction Score",
			description: "Student satisfaction rating",
			icon: <Star className="w-8 h-8 text-yellow-500" />
		}
	];

	const toggleFaq = (faqId: string) => {
		setExpandedFaq(expandedFaq === faqId ? null : faqId);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white"
			>
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
					<div className="text-center">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
							className="flex justify-center mb-6"
						>
							<div className="p-4 bg-white/20 backdrop-blur-lg rounded-full">
								<Shield className="w-12 h-12 text-yellow-300" />
							</div>
						</motion.div>
						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							Student 
							<span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
								Grievance Cell
							</span>
						</h1>
						<p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
							Your voice matters! We're here to listen, support, and ensure every student feels safe and valued. 
							Together, we create a better campus experience for everyone.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Button 
								size="lg" 
								className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3 rounded-full shadow-xl"
							>
								<Send className="w-5 h-5 mr-2" />
								File a Grievance
							</Button>
							<Button 
								size="lg" 
								variant="outline" 
								className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-3 rounded-full"
							>
								<Phone className="w-5 h-5 mr-2" />
								Call for Help
							</Button>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Statistics */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="relative -mt-10 z-10"
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 * index }}
							>
								<Card className="text-center border-0 shadow-xl bg-white/90 backdrop-blur-lg">
									<CardContent className="p-6">
										<div className="flex justify-center mb-4">
											{stat.icon}
										</div>
										<div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
										<div className="font-semibold text-gray-800 mb-1">{stat.label}</div>
										<div className="text-sm text-gray-600">{stat.description}</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>

			{/* Navigation Tabs */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className="bg-white border-b sticky top-0 z-40 shadow-sm mt-16"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex space-x-8 overflow-x-auto py-4">
						{[
							{ id: 'overview', label: 'Overview', icon: <Info className="w-5 h-5" /> },
							{ id: 'types', label: 'Grievance Types', icon: <FileText className="w-5 h-5" /> },
							{ id: 'process', label: 'Process', icon: <Target className="w-5 h-5" /> },
							{ id: 'committee', label: 'Committee', icon: <Users2 className="w-5 h-5" /> },
							{ id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-5 h-5" /> },
							{ id: 'submit', label: 'Submit Grievance', icon: <Send className="w-5 h-5" /> }
						].map(tab => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 px-4 py-2 font-medium whitespace-nowrap transition-colors ${
									activeTab === tab.id
										? 'text-blue-600 border-b-2 border-blue-600'
										: 'text-gray-600 hover:text-blue-600'
								}`}
							>
								{tab.icon}
								{tab.label}
							</button>
						))}
					</div>
				</div>
			</motion.div>

			{/* Tab Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar */}
					<DynamicSidebar navItems={studentLifeNavItems} theme={sidebarTheme} />

					{/* Main Content */}
					<div className="flex-1">
						<AnimatePresence mode="wait">
					{activeTab === 'overview' && (
						<motion.div
							key="overview"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className="space-y-12"
						>
							{/* Core Principles */}
							<div>
								<h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Core Principles</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
									{principles.map((principle, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.1 * index }}
										>
											<Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
												<CardContent className="p-6">
													<div className="flex justify-center mb-4">
														{principle.icon}
													</div>
													<h3 className="text-lg font-bold text-gray-900 mb-3">{principle.title}</h3>
													<p className="text-gray-600 text-sm">{principle.description}</p>
												</CardContent>
											</Card>
										</motion.div>
									))}
								</div>
							</div>

							{/* Mission Statement */}
							<Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
								<CardContent className="p-8">
									<div className="text-center">
										<h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
										<p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
											The Student Grievance Cell at BPIT is committed to creating a safe, supportive, and inclusive 
											environment where every student can thrive. We provide a confidential, accessible, and efficient 
											platform for students to voice their concerns and seek resolution. Our goal is to foster a 
											culture of respect, transparency, and continuous improvement in the college community.
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{activeTab === 'types' && (
						<motion.div
							key="types"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Types of Grievances</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{grievanceTypes.map((type, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 * index }}
									>
										<Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
											<CardHeader>
												<div className="flex items-center gap-4 mb-4">
													<div className={`p-3 bg-${type.color}-50 rounded-lg`}>
														{type.icon}
													</div>
													<div>
														<CardTitle className="text-xl">{type.title}</CardTitle>
													</div>
												</div>
												<p className="text-gray-600">{type.description}</p>
											</CardHeader>
											<CardContent>
												<h4 className="font-semibold text-gray-800 mb-3">Common Examples:</h4>
												<ul className="space-y-2">
													{type.examples.map((example, exampleIndex) => (
														<li key={exampleIndex} className="flex items-center gap-2">
															<ChevronRight className="w-4 h-4 text-blue-500" />
															<span className="text-sm text-gray-700">{example}</span>
														</li>
													))}
												</ul>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}

					{activeTab === 'process' && (
						<motion.div
							key="process"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Grievance Resolution Process</h2>
							<div className="space-y-8">
								{process.map((step, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.1 * index }}
									>
										<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
											<CardContent className="p-6">
												<div className="flex items-center gap-6">
													<div className="flex-shrink-0">
														<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
															<span className="text-2xl font-bold text-blue-600">{step.step}</span>
														</div>
													</div>
													<div className="flex-grow">
														<div className="flex items-start justify-between">
															<div>
																<h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
																<p className="text-gray-600 mb-2">{step.description}</p>
																<div className="flex items-center gap-2">
																	<Clock className="w-4 h-4 text-green-500" />
																	<span className="text-sm font-medium text-green-600">{step.timeframe}</span>
																</div>
															</div>
															<div className="ml-4">
																{step.icon}
															</div>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}

					{activeTab === 'committee' && (
						<motion.div
							key="committee"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Committee Members</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{committeemembers.map((member, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 * index }}
									>
										<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
											<CardContent className="p-6">
												<div className="flex items-center gap-4">
													<div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
														<User className="w-8 h-8 text-white" />
													</div>
													<div className="flex-grow">
														<h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
														<p className="text-blue-600 font-medium">{member.position}</p>
														<p className="text-gray-600 text-sm">{member.department}</p>
													</div>
												</div>
												<div className="mt-4 space-y-2">
													<div className="flex items-center gap-2">
														<Mail className="w-4 h-4 text-gray-400" />
														<span className="text-sm text-gray-600">{member.email}</span>
													</div>
													<div className="flex items-center gap-2">
														<Phone className="w-4 h-4 text-gray-400" />
														<span className="text-sm text-gray-600">{member.phone}</span>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}

					{activeTab === 'faq' && (
						<motion.div
							key="faq"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
							<div className="space-y-4 max-w-4xl mx-auto">
								{faqs.map((faq, index) => (
									<motion.div
										key={faq.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 * index }}
									>
										<Card className="border-0 shadow-lg">
											<CardHeader>
												<button
													onClick={() => toggleFaq(faq.id)}
													className="flex items-center justify-between w-full text-left"
												>
													<h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
													{expandedFaq === faq.id ? (
														<ChevronDown className="w-5 h-5 text-gray-400" />
													) : (
														<ChevronRight className="w-5 h-5 text-gray-400" />
													)}
												</button>
											</CardHeader>
											<AnimatePresence>
												{expandedFaq === faq.id && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: "auto" }}
														exit={{ opacity: 0, height: 0 }}
														transition={{ duration: 0.3 }}
													>
														<CardContent className="pt-0">
															<p className="text-gray-600 leading-relaxed">{faq.answer}</p>
														</CardContent>
													</motion.div>
												)}
											</AnimatePresence>
										</Card>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}

					{activeTab === 'submit' && (
						<motion.div
							key="submit"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Submit Your Grievance</h2>
							<div className="max-w-2xl mx-auto">
								<Card className="border-0 shadow-xl">
									<CardContent className="p-8">
										<form className="space-y-6">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Full Name *
													</label>
													<input
														type="text"
														name="name"
														value={formData.name}
														onChange={handleInputChange}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														placeholder="Enter your full name"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Email Address *
													</label>
													<input
														type="email"
														name="email"
														value={formData.email}
														onChange={handleInputChange}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														placeholder="Enter your email"
													/>
												</div>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Roll Number *
													</label>
													<input
														type="text"
														name="rollNumber"
														value={formData.rollNumber}
														onChange={handleInputChange}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														placeholder="Enter your roll number"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Grievance Type *
													</label>
													<select
														name="grievanceType"
														value={formData.grievanceType}
														onChange={handleInputChange}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													>
														<option value="">Select grievance type</option>
														<option value="academic">Academic Issues</option>
														<option value="harassment">Harassment & Discrimination</option>
														<option value="infrastructure">Infrastructure Issues</option>
														<option value="administrative">Administrative Issues</option>
														<option value="welfare">Personal & Welfare</option>
														<option value="other">Other Concerns</option>
													</select>
												</div>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Describe Your Grievance *
												</label>
												<textarea
													name="description"
													value={formData.description}
													onChange={handleInputChange}
													rows={6}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
													placeholder="Please provide detailed information about your grievance..."
												/>
											</div>
											<div className="flex items-center gap-2">
												<input
													type="checkbox"
													name="urgent"
													checked={formData.urgent}
													onChange={handleInputChange}
													className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
												/>
												<label className="text-sm text-gray-700">
													This is an urgent matter requiring immediate attention
												</label>
											</div>
											<div className="flex gap-4">
												<Button type="submit" size="lg" className="flex-1">
													<Send className="w-5 h-5 mr-2" />
													Submit Grievance
												</Button>
												<Button type="button" variant="outline" size="lg">
													<Download className="w-5 h-5 mr-2" />
													Save Draft
												</Button>
											</div>
										</form>
									</CardContent>
								</Card>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
					</div>
				</div>
			</div>

			{/* Contact Section - Lighter Version */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.0 }}
				className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-16"
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
							className="flex justify-center mb-6"
						>
							<div className="p-4 bg-white rounded-full shadow-lg">
								<Heart className="w-12 h-12 text-red-500" />
							</div>
						</motion.div>
						<h2 className="text-4xl font-bold text-gray-900 mb-6">We're Here for You</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
							Your voice matters. Reach out anytime - we're committed to creating a safe and supportive environment for everyone. 💙
						</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							whileHover={{ y: -5, scale: 1.02 }}
						>
							<Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
								<CardContent className="p-6 text-center relative">
									<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
									<div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
										<Phone className="w-8 h-8 text-green-600" />
									</div>
									<h3 className="font-bold text-gray-900 mb-3">24/7 Helpline</h3>
									<p className="text-gray-600 text-sm mb-2">+91-11-2757-1124</p>
									<p className="text-gray-600 text-sm">grievance@bpit.ac.in</p>
									<div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
										<Clock className="w-3 h-3 mr-1" />
										Always Available
									</div>
								</CardContent>
							</Card>
						</motion.div>
						
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							whileHover={{ y: -5, scale: 1.02 }}
						>
							<Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
								<CardContent className="p-6 text-center relative">
									<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
									<div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
										<Building className="w-8 h-8 text-blue-600" />
									</div>
									<h3 className="font-bold text-gray-900 mb-3">Visit Our Office</h3>
									<p className="text-gray-600 text-sm mb-2">Room 201, Admin Block</p>
									<p className="text-gray-600 text-sm">Mon-Fri: 9:00 AM - 5:00 PM</p>
									<div className="mt-4 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
										<MapPin className="w-3 h-3 mr-1" />
										In-Person Support
									</div>
								</CardContent>
							</Card>
						</motion.div>
						
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							whileHover={{ y: -5, scale: 1.02 }}
						>
							<Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
								<CardContent className="p-6 text-center relative">
									<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
									<div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
										<MessageSquare className="w-8 h-8 text-purple-600" />
									</div>
									<h3 className="font-bold text-gray-900 mb-3">Anonymous Chat</h3>
									<p className="text-gray-600 text-sm mb-2">Secure & Confidential</p>
									<p className="text-gray-600 text-sm">Live support available</p>
									<div className="mt-4 inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
										<Shield className="w-3 h-3 mr-1" />
										100% Private
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.8 }}
						className="text-center"
					>
						<div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Share Your Concern?</h3>
							<p className="text-gray-600 mb-6">
								Every voice matters in building a better campus community. Your courage to speak up makes a difference! ✨
							</p>
							<div className="flex flex-wrap justify-center gap-4">
								<Button 
									size="lg" 
									className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-full shadow-lg"
								>
									<MessageSquare className="w-5 h-5 mr-2" />
									Submit Grievance
								</Button>
								<Button 
									size="lg" 
									variant="outline" 
									className="border-gray-300 text-gray-700 hover:bg-gray-50 font-bold px-8 py-3 rounded-full"
								>
									<Download className="w-5 h-5 mr-2" />
									Get Support Guide
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
