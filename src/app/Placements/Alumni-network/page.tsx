'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
	Users,
	Star,
	MapPin,
	Briefcase,
	GraduationCap,
	Trophy,
	Globe,
	TrendingUp,
	Award,
	MessageSquare,
	Heart,
	Network,
	UserCheck,
	BookOpen,
	Linkedin,
	Search,
	ArrowRight,
	UserPlus,
	Share2
} from 'lucide-react';

const AlumniNetworkPage = () => {
	const [activeTab, setActiveTab] = useState<'featured' | 'international' | 'industry' | 'achievements'>('featured');
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

	const featuredAlumni = [
		// FEATURED ALUMNI - Top performers and notable success stories
		{
			name: 'Swarika Sharma',
			batch: 'CSE (2021-25)',
			company: 'Google',
			position: 'Software Engineer',
			package: '₹51 LPA',
			location: 'Bangalore, India',
			category: 'featured',
			achievement: 'Highest Package in CSE',
			image: '/alumni/swarika.jpg',
			linkedin: '#',
			story: 'Secured dream job at Google with exceptional coding skills and innovative project work.'
		},
		{
			name: 'Yashika',
			batch: 'CSE (2021-25)',
			company: 'Microsoft',
			position: 'Software Development Engineer',
			package: '₹51 LPA',
			location: 'Hyderabad, India',
			category: 'featured',
			achievement: 'Microsoft SDE Role',
			image: '/alumni/yashika.jpg',
			linkedin: '#',
			story: 'Excellence in cloud computing and AI led to this prestigious Microsoft role.'
		},
		{
			name: 'Arjun Mehta',
			batch: 'CSE (2019-23)',
			company: 'Amazon',
			position: 'Senior Software Development Engineer',
			package: '₹45 LPA',
			location: 'Seattle, USA',
			category: 'featured',
			achievement: 'AWS Team Lead',
			image: '/alumni/arjun.jpg',
			linkedin: '#',
			story: 'Leading cloud infrastructure development at Amazon Web Services, driving innovation in scalable systems.'
		},
		{
			name: 'Priya Sharma',
			batch: 'IT (2018-22)',
			company: 'Meta',
			position: 'Product Manager',
			package: '₹42 LPA',
			location: 'Menlo Park, USA',
			category: 'featured',
			achievement: 'Facebook Product Team',
			image: '/alumni/priya.jpg',
			linkedin: '#',
			story: 'Driving product strategy for Instagram features, impacting millions of users globally.'
		},
		{
			name: 'Rohit Kumar',
			batch: 'CSE (2017-21)',
			company: 'Tesla',
			position: 'Autopilot Software Engineer',
			package: '₹48 LPA',
			location: 'Palo Alto, USA',
			category: 'featured',
			achievement: 'Tesla Autopilot Team',
			image: '/alumni/rohit.jpg',
			linkedin: '#',
			story: 'Contributing to autonomous vehicle technology, revolutionizing transportation industry.'
		},
		{
			name: 'Ananya Singh',
			batch: 'ECE (2016-20)',
			company: 'Apple',
			position: 'Hardware Engineer',
			package: '₹40 LPA',
			location: 'Cupertino, USA',
			category: 'featured',
			achievement: 'iPhone Development Team',
			image: '/alumni/ananya.jpg',
			linkedin: '#',
			story: 'Designing cutting-edge hardware for Apple devices, pushing technological boundaries.'
		},

		// INTERNATIONAL ALUMNI - Studying or working abroad
		{
			name: 'Vaibhav Khanna',
			batch: 'IT (2013-2017)',
			company: 'Georgia Tech Atlanta',
			position: 'MS in Computer Science',
			package: 'International Studies',
			location: 'Atlanta, USA',
			category: 'international',
			achievement: 'Pursuing Masters at Georgia Tech',
			image: '/alumni/vaibhav.jpg',
			linkedin: '#',
			story: 'Advanced studies in AI and Machine Learning at one of the top US universities.'
		},
		{
			name: 'Rahul',
			batch: 'IT (2012-2016)',
			company: 'Dalhousie University',
			position: 'Masters in Applied Computer Science',
			package: 'International Studies',
			location: 'Nova Scotia, Canada',
			category: 'international',
			achievement: 'Masters in Canada',
			image: '/alumni/rahul.jpg',
			linkedin: '#',
			story: 'Specializing in applied computer science with focus on data analytics.'
		},
		{
			name: 'Sneha Gupta',
			batch: 'CSE (2015-19)',
			company: 'University of Toronto',
			position: 'PhD in Artificial Intelligence',
			package: 'Research Scholarship',
			location: 'Toronto, Canada',
			category: 'international',
			achievement: 'PhD at Top Canadian University',
			image: '/alumni/sneha.jpg',
			linkedin: '#',
			story: 'Researching next-generation AI algorithms with focus on neural networks and deep learning.'
		},
		{
			name: 'Karan Patel',
			batch: 'ECE (2014-18)',
			company: 'University of Melbourne',
			position: 'MS in Robotics Engineering',
			package: 'Merit Scholarship',
			location: 'Melbourne, Australia',
			category: 'international',
			achievement: 'Robotics Research Scholar',
			image: '/alumni/karan.jpg',
			linkedin: '#',
			story: 'Advancing robotics technology with research in autonomous systems and IoT integration.'
		},
		{
			name: 'Divya Agarwal',
			batch: 'IT (2016-20)',
			company: 'ETH Zurich',
			position: 'MS in Data Science',
			package: 'Full Scholarship',
			location: 'Zurich, Switzerland',
			category: 'international',
			achievement: 'ETH Zurich Scholar',
			image: '/alumni/divya.jpg',
			linkedin: '#',
			story: 'Pursuing advanced data science research at one of Europe\'s premier technical universities.'
		},
		{
			name: 'Amit Verma',
			batch: 'CSE (2013-17)',
			company: 'Cambridge University',
			position: 'PhD in Machine Learning',
			package: 'Research Fellowship',
			location: 'Cambridge, UK',
			category: 'international',
			achievement: 'Cambridge Research Fellow',
			image: '/alumni/amit.jpg',
			linkedin: '#',
			story: 'Conducting groundbreaking research in machine learning applications for healthcare.'
		},
		{
			name: 'Richa Jain',
			batch: 'BBA (2015-18)',
			company: 'London Business School',
			position: 'MBA Student',
			package: 'Merit Scholarship',
			location: 'London, UK',
			category: 'international',
			achievement: 'LBS MBA Scholar',
			image: '/alumni/richa.jpg',
			linkedin: '#',
			story: 'Pursuing MBA with specialization in international business and entrepreneurship.'
		},

		// INDUSTRY LEADERS - Entrepreneurs and senior executives
		{
			name: 'Aashima',
			batch: 'BBA (2023-26)',
			company: 'Wizard Events',
			position: 'Operations Intern',
			package: 'Internship',
			location: 'Delhi, India',
			category: 'industry',
			achievement: 'Operations Excellence',
			image: '/alumni/aashima.jpg',
			linkedin: '#',
			story: 'Gaining valuable industry experience in event management and operations.'
		},
		{
			name: 'Vikash Sharma',
			batch: 'CSE (2010-14)',
			company: 'TechVenture Solutions',
			position: 'Founder & CEO',
			package: 'Entrepreneur',
			location: 'Bangalore, India',
			category: 'industry',
			achievement: 'Startup Founder - ₹50Cr Valuation',
			image: '/alumni/vikash.jpg',
			linkedin: '#',
			story: 'Built a successful fintech startup from ground up, now serving 100K+ customers across India.'
		},
		{
			name: 'Neha Kapoor',
			batch: 'IT (2008-12)',
			company: 'InnovateTech',
			position: 'Co-Founder & CTO',
			package: 'Entrepreneur',
			location: 'Mumbai, India',
			category: 'industry',
			achievement: 'EdTech Unicorn Co-Founder',
			image: '/alumni/neha.jpg',
			linkedin: '#',
			story: 'Co-founded an education technology company that revolutionized online learning in India.'
		},
		{
			name: 'Rajesh Malhotra',
			batch: 'ECE (2006-10)',
			company: 'Samsung R&D',
			position: 'Vice President - Engineering',
			package: '₹65 LPA',
			location: 'Seoul, South Korea',
			category: 'industry',
			achievement: 'VP at Samsung',
			image: '/alumni/rajesh.jpg',
			linkedin: '#',
			story: 'Leading next-generation smartphone technology development at Samsung headquarters.'
		},
		{
			name: 'Pooja Sinha',
			batch: 'BBA (2009-12)',
			company: 'Flipkart',
			position: 'Senior Director - Strategy',
			package: '₹55 LPA',
			location: 'Bangalore, India',
			category: 'industry',
			achievement: 'Flipkart Senior Leadership',
			image: '/alumni/pooja.jpg',
			linkedin: '#',
			story: 'Driving strategic initiatives and expansion plans for India\'s largest e-commerce platform.'
		},
		{
			name: 'Aditya Thakur',
			batch: 'CSE (2011-15)',
			company: 'Zomato',
			position: 'Head of Product',
			package: '₹45 LPA',
			location: 'Gurgaon, India',
			category: 'industry',
			achievement: 'Product Head at Unicorn',
			image: '/alumni/aditya.jpg',
			linkedin: '#',
			story: 'Leading product innovation at Zomato, enhancing food delivery experience for millions.'
		},

		// ACHIEVEMENTS - Academic excellence and recognition
		{
			name: 'Pavneet Singh',
			batch: 'CSE (2020-24)',
			company: 'Tech Innovation Lab',
			position: 'Senior Developer',
			package: '₹18 LPA',
			location: 'Delhi, India',
			category: 'achievements',
			achievement: 'Gold Medalist - CGPA 9.62',
			image: '/alumni/pavneet.jpg',
			linkedin: '#',
			story: 'Academic excellence with consistent innovation in software development projects.'
		},
		{
			name: 'Ujjawal Chaudhary',
			batch: 'IT (2020-24)',
			company: 'StartTech Solutions',
			position: 'Technical Lead',
			package: '₹15 LPA',
			location: 'Gurgaon, India',
			category: 'achievements',
			achievement: 'Gold Medalist at Convocation',
			image: '/alumni/ujjawal.jpg',
			linkedin: '#',
			story: 'Leading technical innovations while maintaining academic excellence.'
		},
		{
			name: 'Jyoti Ahuja',
			batch: 'CSE (2022-26)',
			company: 'Currently Studying',
			position: 'Student',
			package: 'Academic Excellence',
			location: 'Delhi, India',
			category: 'achievements',
			achievement: 'Current CGPA 9.62',
			image: '/alumni/jyoti.jpg',
			linkedin: '#',
			story: 'Maintaining exceptional academic performance with research contributions.'
		},
		{
			name: 'Harsh Agarwal',
			batch: 'ECE (2019-23)',
			company: 'Intel Corporation',
			position: 'Chip Design Engineer',
			package: '₹28 LPA',
			location: 'Bangalore, India',
			category: 'achievements',
			achievement: 'University Topper - 9.8 CGPA',
			image: '/alumni/harsh.jpg',
			linkedin: '#',
			story: 'Graduated as university topper, now designing next-generation processors at Intel.'
		},
		{
			name: 'Shweta Bansal',
			batch: 'IT (2018-22)',
			company: 'Oracle',
			position: 'Database Developer',
			package: '₹22 LPA',
			location: 'Hyderabad, India',
			category: 'achievements',
			achievement: 'Dean\'s List - 4 Years',
			image: '/alumni/shweta.jpg',
			linkedin: '#',
			story: 'Consistent academic achiever, featured on Dean\'s List throughout college journey.'
		},
		{
			name: 'Arpit Gupta',
			batch: 'CSE (2017-21)',
			company: 'Adobe Systems',
			position: 'Software Engineer',
			package: '₹35 LPA',
			location: 'Noida, India',
			category: 'achievements',
			achievement: 'Best Project Award Winner',
			image: '/alumni/arpit.jpg',
			linkedin: '#',
			story: 'Won multiple project competitions and hackathons during college, now creating digital experiences at Adobe.'
		},
		{
			name: 'Ritu Sharma',
			batch: 'ECE (2016-20)',
			company: 'Qualcomm',
			position: 'RF Engineer',
			package: '₹30 LPA',
			location: 'Bangalore, India',
			category: 'achievements',
			achievement: 'Research Excellence Award',
			image: '/alumni/ritu.jpg',
			linkedin: '#',
			story: 'Published 5 research papers during studies, now developing 5G technology at Qualcomm.'
		},
		{
			name: 'Nikhil Pandey',
			batch: 'IT (2015-19)',
			company: 'Salesforce',
			position: 'Cloud Solutions Architect',
			package: '₹38 LPA',
			location: 'San Francisco, USA',
			category: 'achievements',
			achievement: 'Innovation Award - Final Year',
			image: '/alumni/nikhil.jpg',
			linkedin: '#',
			story: 'Won innovation award for developing AI-powered student management system, now architecting cloud solutions.'
		}
	];

	const stats = [
		{ value: '5000+', label: 'Alumni Worldwide', icon: <Users className="w-6 h-6" /> },
		{ value: '50+', label: 'Countries', icon: <Globe className="w-6 h-6" /> },
		{ value: '₹51L', label: 'Highest Package', icon: <Trophy className="w-6 h-6" /> },
		{ value: '95%', label: 'Placement Success', icon: <TrendingUp className="w-6 h-6" /> }
	];

	const networkBenefits = [
		{
			icon: <UserCheck className="w-8 h-8" />,
			title: 'Mentorship Programs',
			description: 'Connect with senior alumni for career guidance and professional development',
			color: 'from-blue-500 to-cyan-500'
		},
		{
			icon: <Briefcase className="w-8 h-8" />,
			title: 'Job Referrals',
			description: 'Access exclusive job opportunities through alumni connections',
			color: 'from-purple-500 to-pink-500'
		},
		{
			icon: <Network className="w-8 h-8" />,
			title: 'Professional Networking',
			description: 'Build valuable connections across various industries and domains',
			color: 'from-green-500 to-emerald-500'
		},
		{
			icon: <BookOpen className="w-8 h-8" />,
			title: 'Knowledge Sharing',
			description: 'Participate in webinars, workshops, and expert sessions',
			color: 'from-orange-500 to-red-500'
		},
		{
			icon: <Heart className="w-8 h-8" />,
			title: 'Give Back',
			description: 'Contribute to your alma mater and help nurture future talents',
			color: 'from-indigo-500 to-purple-500'
		},
		{
			icon: <Award className="w-8 h-8" />,
			title: 'Recognition',
			description: 'Celebrate achievements and get featured in alumni success stories',
			color: 'from-teal-500 to-blue-500'
		}
	];

	const filteredAlumni = featuredAlumni.filter(alumni => {
		// For 'featured' tab, show all alumni. For other tabs, show only matching category
		const matchesTab = activeTab === 'featured' ? true : alumni.category === activeTab;
		
		// Search across name, company, batch, position, and location
		const searchTermLower = searchTerm.toLowerCase();
		const matchesSearch = searchTerm === '' || 
							  alumni.name.toLowerCase().includes(searchTermLower) ||
							  alumni.company.toLowerCase().includes(searchTermLower) ||
							  alumni.batch.toLowerCase().includes(searchTermLower) ||
							  alumni.position.toLowerCase().includes(searchTermLower) ||
							  alumni.location.toLowerCase().includes(searchTermLower) ||
							  alumni.achievement.toLowerCase().includes(searchTermLower);
		
		return matchesTab && matchesSearch;
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
			{/* Hero Section */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white"
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
								<Network className="w-10 h-10 text-cyan-300" />
							</div>
						</motion.div>
						
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
						>
							Alumni Network
						</motion.h1>
						
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
						>
							Connecting generations of BPIT excellence across the globe
						</motion.p>
						
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="flex flex-wrap justify-center gap-4"
						>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-cyan-200">
									<Globe className="w-5 h-5" />
									Global Network
								</span>
							</div>
							<div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
								<span className="flex items-center gap-2 text-cyan-200">
									<Star className="w-5 h-5" />
									Success Stories
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
								<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
									<div className="text-white">{stat.icon}</div>
								</div>
								<div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
								<div className="text-gray-600 font-medium">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Network Benefits */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-r from-blue-50 to-purple-50"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							Why Join Our Alumni Network?
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Our alumni network is more than just connections—it&apos;s a community 
							that empowers, supports, and celebrates success together
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{networkBenefits.map((benefit, index) => (
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
											<h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
												{benefit.title}
											</h3>
										</div>

										<p className="text-gray-600 leading-relaxed mb-6">
											{benefit.description}
										</p>

										<div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
											<span>Learn more</span>
											<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
										</div>
									</div>
								</div>
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
				className="py-16 bg-white"
			>
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto">
						<div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-xl p-8 border border-gray-100">
							<div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
								{/* Category Filters */}
								<div className="flex flex-wrap gap-2">
									{[
										{ key: 'featured', label: 'Featured Alumni', icon: <Star className="w-4 h-4" /> },
										{ key: 'international', label: 'International', icon: <Globe className="w-4 h-4" /> },
										{ key: 'industry', label: 'Industry Leaders', icon: <Briefcase className="w-4 h-4" /> },
										{ key: 'achievements', label: 'Top Achievers', icon: <Trophy className="w-4 h-4" /> }
									].map((tab) => (
										<button
											key={tab.key}
											onClick={() => {
												setActiveTab(tab.key as 'featured' | 'international' | 'industry' | 'achievements');
												setSearchTerm(''); // Clear search when switching tabs
											}}
											className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
												activeTab === tab.key
													? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
													: 'bg-white text-gray-600 hover:bg-gray-50'
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
										placeholder="Search alumni..."
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

			{/* Alumni Showcase */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
				className="py-20 bg-gradient-to-br from-gray-50 to-white"
			>
				<div className="container mx-auto px-6">
					<motion.div variants={fadeInUp} className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
							{activeTab === 'featured' && 'Success Stories'}
							{activeTab === 'international' && 'International Alumni'}
							{activeTab === 'industry' && 'Industry Leaders'}
							{activeTab === 'achievements' && 'Top Achievers'}
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							{activeTab === 'featured' && 'Meet our distinguished alumni who are making their mark across the world'}
							{activeTab === 'international' && 'Discover our global alumni pursuing higher education and careers abroad'}
							{activeTab === 'industry' && 'Connect with our entrepreneurial alumni leading innovation in their industries'}
							{activeTab === 'achievements' && 'Celebrate our academically excellent alumni who continue to excel'}
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
						
						{/* Results count */}
						<div className="mt-6">
							<span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
								{filteredAlumni.length} {filteredAlumni.length === 1 ? 'Alumni' : 'Alumni'} Found
							</span>
						</div>
					</motion.div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4" key={`${activeTab}-${searchTerm}`}>
						{filteredAlumni.map((alumni, index) => (
							<motion.div
								key={`${activeTab}-${alumni.name}-${index}`}
								variants={scaleIn}
								className="group"
								initial="hidden"
								animate="visible"
								transition={{ delay: index * 0.1 }}
							>
								<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col max-w-[280px] mx-auto">
									{/* Alumni Photo */}
									<div className="relative h-44 bg-gradient-to-br from-purple-400 to-blue-500 flex-shrink-0">
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
												<GraduationCap className="w-10 h-10 text-white" />
											</div>
										</div>
										<div className="absolute top-3 right-3">
											<span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
												{alumni.batch}
											</span>
										</div>
									</div>
									
									<div className="p-4 flex-grow flex flex-col">
										{/* Alumni Info */}
										<div className="mb-3">
											<h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{alumni.name}</h3>
											<p className="text-purple-600 font-medium text-sm line-clamp-1">{alumni.position}</p>
											<p className="text-gray-600 text-xs line-clamp-1">{alumni.company}</p>
										</div>

										{/* Achievement Badge */}
										<div className="mb-3">
											<span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium line-clamp-1">
												{alumni.achievement}
											</span>
										</div>

										{/* Details */}
										<div className="space-y-1 mb-3">
											<div className="flex items-center gap-2 text-gray-600 text-xs">
												<MapPin className="w-3 h-3 flex-shrink-0" />
												<span className="line-clamp-1">{alumni.location}</span>
											</div>
											<div className="flex items-center gap-2 text-gray-600 text-xs">
												<Trophy className="w-3 h-3 flex-shrink-0" />
												<span className="font-medium text-green-600 line-clamp-1">{alumni.package}</span>
											</div>
										</div>

										{/* Story */}
										<p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
											{alumni.story}
										</p>

										{/* Actions */}
										<div className="flex gap-2 mt-auto">
											<button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-xs">
												<MessageSquare className="w-3 h-3 inline mr-1" />
												Connect
											</button>
											<button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
												<Linkedin className="w-3 h-3" />
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{filteredAlumni.length === 0 && (
						<motion.div
							variants={fadeInUp}
							className="text-center py-16"
						>
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<Search className="w-12 h-12 text-gray-400" />
							</div>
							<h3 className="text-2xl font-bold text-gray-800 mb-4">No alumni found</h3>
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
				className="py-20 bg-gradient-to-r from-purple-600 to-blue-600"
			>
				<div className="container mx-auto px-6 text-center">
					<div className="max-w-3xl mx-auto text-white">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Join Our Alumni Network
						</h2>
						<p className="text-xl mb-8 opacity-90">
							Whether you&apos;re a recent graduate or a seasoned professional, 
							connect with fellow BPIT alumni and be part of our success story.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
								<UserPlus className="w-6 h-6" />
								Register as Alumni
							</button>
							<button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors flex items-center justify-center gap-2">
								<Share2 className="w-6 h-6" />
								Share Your Story
							</button>
						</div>
					</div>
				</div>
			</motion.section>
		</div>
	);
};

export default AlumniNetworkPage;
