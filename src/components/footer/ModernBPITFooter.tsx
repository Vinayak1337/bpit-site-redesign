'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
	MapPin,
	Phone,
	Mail,
	Instagram,
	Linkedin,
	Twitter,
	Youtube,
	ExternalLink,
	Send,
	GraduationCap,
	Building2,
	Award,
	Users,
	BookOpen,
	ChevronRight,
	ArrowUp,
	Globe,
	Calendar,
	Star,
	Heart,
	Target,
	Lightbulb,
	Trophy,
	ChevronDown,
	Facebook
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ModernBPITFooter = () => {
	const [hoveredSection, setHoveredSection] = useState<string | null>(null);
	const [expandedSection, setExpandedSection] = useState<string | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Check if we're on client side and screen size
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		
		checkMobile();
		window.addEventListener('resize', checkMobile);
		
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Scroll visibility effect
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		const footerElement = document.getElementById('modern-footer');
		if (footerElement) {
			observer.observe(footerElement);
		}

		// Scroll to top button visibility
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 500);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			if (footerElement) observer.unobserve(footerElement);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const quickLinks = [
		{ name: 'About BPIT', href: '/about', icon: <Building2 className='w-4 h-4' /> },
		{ name: 'Admissions', href: '/admissions', icon: <GraduationCap className='w-4 h-4' /> },
		{ name: 'Academics', href: '/academics', icon: <BookOpen className='w-4 h-4' /> },
		{ name: 'Placements', href: '/placements', icon: <Trophy className='w-4 h-4' /> },
		{ name: 'Campus Life', href: '/campus', icon: <Users className='w-4 h-4' /> },
		{ name: 'Contact Us', href: '/contact', icon: <Mail className='w-4 h-4' /> }
	];

	const departments = [
		{ name: 'Computer Science Engineering', code: 'CSE', color: 'blue' },
		{ name: 'Information Technology', code: 'IT', color: 'green' },
		{ name: 'Electronics & Communication', code: 'ECE', color: 'purple' },
		{ name: 'Electrical Engineering', code: 'EEE', color: 'orange' },
		{ name: 'Management Studies', code: 'MG', color: 'rose' }
	];

	const socialLinks = [
		{
			icon: Instagram,
			href: 'https://www.instagram.com/bpitindia/',
			label: 'Instagram',
			color: 'from-pink-500 to-purple-600'
		},
		{
			icon: Linkedin,
			href: 'https://www.linkedin.com/in/bhagwan-parshuram-institute-of-technology-bpit-50358a178/',
			label: 'LinkedIn',
			color: 'from-blue-600 to-blue-700'
		},
		{
			icon: Twitter,
			href: 'https://x.com/BpitIndia',
			label: 'Twitter',
			color: 'from-sky-400 to-blue-500'
		},
		{
			icon: Youtube,
			href: 'https://www.youtube.com/@bpitcampus',
			label: 'YouTube',
			color: 'from-red-500 to-red-600'
		},
		{
			icon: Facebook,
			href: '#',
			label: 'Facebook',
			color: 'from-blue-500 to-blue-600'
		}
	];

	const contactInfo = [
		{
			icon: MapPin,
			title: 'Campus Address',
			text: 'Bhagwan Parshuram Institute of Technology, Rohini Sector-17, New Delhi - 110089',
			href: 'https://www.google.com/maps/place/Bhagwan+Parshuram+Institute+of+Technology/@28.7366529,77.1097591,17z',
			type: 'link'
		},
		{
			icon: Phone,
			title: 'Phone Numbers',
			text: '011-2757 1080, 011-2757 2900',
			href: 'tel:01127571080',
			type: 'link'
		},
		{
			icon: Mail,
			title: 'Email Address',
			text: 'bpitindia@yahoo.com',
			href: 'mailto:bpitindia@yahoo.com',
			type: 'link'
		}
	];

	const achievements = [
		{ number: '2007', label: 'Established', icon: <Calendar className='w-6 h-6' /> },
		{ number: '1000+', label: 'Students', icon: <Users className='w-6 h-6' /> },
		{ number: 'NBA', label: 'Accredited', icon: <Award className='w-6 h-6' /> },
		{ number: '95%+', label: 'Placement', icon: <Trophy className='w-6 h-6' /> }
	];

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const toggleMobileSection = (section: string) => {
		setExpandedSection(expandedSection === section ? null : section);
	};

	return (
		<>
			{/* Scroll to Top Button */}
			<AnimatePresence>
				{showScrollTop && (
					<motion.button
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						onClick={scrollToTop}
						className='fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<ArrowUp className='w-5 h-5 group-hover:-translate-y-1 transition-transform' />
					</motion.button>
				)}
			</AnimatePresence>

			<footer
				id='modern-footer'
				className='relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden'
			>
				{/* Animated Background Elements */}
				<div className='absolute inset-0 overflow-hidden'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob' />
					<div className='absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' />
					<div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000' />
				</div>

				{/* Floating Particles */}
				<div className='absolute inset-0 overflow-hidden pointer-events-none'>
					{[...Array(20)].map((_, i) => (
						<motion.div
							key={i}
							className='absolute w-1 h-1 bg-white/20 rounded-full'
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`
							}}
							animate={{
								y: [0, -30, 0],
								opacity: [0.2, 1, 0.2]
							}}
							transition={{
								duration: 3 + Math.random() * 2,
								repeat: Infinity,
								delay: Math.random() * 2
							}}
						/>
					))}
				</div>

				{/* Top Border Accent */}
				<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400' />

				{/* Main Content */}
				<div className='relative z-10 container mx-auto px-4 py-16'>
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isVisible ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'
					>
						<div className='flex items-center justify-center gap-4 mb-6'>
							<div className='w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center'>
								<Building2 className='w-8 h-8 text-white' />
							</div>
							<div className='text-left'>
								<h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
									Bhagwan Parshuram Institute of Technology
								</h2>
								<p className='text-blue-200 text-lg'>Excellence in Engineering Education</p>
							</div>
						</div>
						
						{/* Achievement Stats */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12'>
							{achievements.map((achievement, index) => (
								<motion.div
									key={achievement.label}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={isVisible ? { opacity: 1, scale: 1 } : {}}
									transition={{ duration: 0.6, delay: 0.1 * index }}
									className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group'
									whileHover={{ scale: 1.05 }}
								>
									<div className='flex items-center justify-center mb-3 text-blue-400 group-hover:text-blue-300 transition-colors'>
										{achievement.icon}
									</div>
									<div className='text-2xl font-bold text-white mb-1'>{achievement.number}</div>
									<div className='text-sm text-blue-200'>{achievement.label}</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Main Footer Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
						{/* Quick Links */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={isVisible ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, delay: 0.2 }}
							className='space-y-6'
							onMouseEnter={() => setHoveredSection('links')}
							onMouseLeave={() => setHoveredSection(null)}
						>
							<div className='flex items-center gap-3 md:hidden'>
								<h3 className='text-xl font-bold text-white'>Quick Links</h3>
								<button
									onClick={() => toggleMobileSection('links')}
									className='md:hidden text-white/60'
								>
									<ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'links' ? 'rotate-180' : ''}`} />
								</button>
							</div>
							<h3 className='hidden md:block text-xl font-bold text-white mb-6'>Quick Links</h3>
							
							<div className={`space-y-3 ${expandedSection === 'links' || !isMobile ? 'block' : 'hidden'} md:block`}>
								{quickLinks.map((link, index) => (
									<motion.div
										key={link.name}
										initial={{ opacity: 0, x: -20 }}
										animate={isVisible ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.4, delay: 0.1 * index }}
									>
										<Link
											href={link.href}
											className='flex items-center gap-3 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 group'
										>
											<div className='p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/40 transition-colors'>
												{link.icon}
											</div>
											<span className='group-hover:translate-x-1 transition-transform'>{link.name}</span>
											<ChevronRight className='w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />
										</Link>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Departments */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={isVisible ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, delay: 0.3 }}
							className='space-y-6'
							onMouseEnter={() => setHoveredSection('departments')}
							onMouseLeave={() => setHoveredSection(null)}
						>
							<div className='flex items-center gap-3 md:hidden'>
								<h3 className='text-xl font-bold text-white'>Departments</h3>
								<button
									onClick={() => toggleMobileSection('departments')}
									className='md:hidden text-white/60'
								>
									<ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'departments' ? 'rotate-180' : ''}`} />
								</button>
							</div>
							<h3 className='hidden md:block text-xl font-bold text-white mb-6'>Departments</h3>
							
							<div className={`space-y-3 ${expandedSection === 'departments' || !isMobile ? 'block' : 'hidden'} md:block`}>
								{departments.map((dept, index) => (
									<motion.div
										key={dept.name}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={isVisible ? { opacity: 1, scale: 1 } : {}}
										transition={{ duration: 0.4, delay: 0.1 * index }}
										className='bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer'
										whileHover={{ scale: 1.02 }}
									>
										<div className='flex items-center gap-3'>
											<div className={`w-10 h-10 bg-${dept.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
												<span className={`text-${dept.color}-600 font-semibold text-xs`}>{dept.code}</span>
											</div>
											<div>
												<div className='text-white font-medium text-sm'>{dept.name}</div>
												<div className='text-white/60 text-xs'>Engineering</div>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Contact Information */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={isVisible ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, delay: 0.4 }}
							className='space-y-6'
							onMouseEnter={() => setHoveredSection('contact')}
							onMouseLeave={() => setHoveredSection(null)}
						>
							<div className='flex items-center gap-3 md:hidden'>
								<h3 className='text-xl font-bold text-white'>Contact Info</h3>
								<button
									onClick={() => toggleMobileSection('contact')}
									className='md:hidden text-white/60'
								>
									<ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'contact' ? 'rotate-180' : ''}`} />
								</button>
							</div>
							<h3 className='hidden md:block text-xl font-bold text-white mb-6'>Contact Info</h3>
							
							<div className={`space-y-4 ${expandedSection === 'contact' || !isMobile ? 'block' : 'hidden'} md:block`}>
								{contactInfo.map((contact, index) => (
									<motion.div
										key={contact.title}
										initial={{ opacity: 0, y: 20 }}
										animate={isVisible ? { opacity: 1, y: 0 } : {}}
										transition={{ duration: 0.4, delay: 0.1 * index }}
									>
										<a
											href={contact.href}
											target={contact.href.startsWith('http') ? '_blank' : undefined}
											rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
											className='block p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 group'
										>
											<div className='flex items-start gap-3'>
												<div className='p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/40 transition-colors flex-shrink-0'>
													<contact.icon className='w-5 h-5 text-blue-400' />
												</div>
												<div>
													<div className='text-white font-medium text-sm mb-1'>{contact.title}</div>
													<div className='text-white/80 text-xs leading-relaxed group-hover:text-white transition-colors'>
														{contact.text}
													</div>
												</div>
											</div>
										</a>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Newsletter & Social */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={isVisible ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, delay: 0.5 }}
							className='space-y-6'
							onMouseEnter={() => setHoveredSection('social')}
							onMouseLeave={() => setHoveredSection(null)}
						>
							<div className='flex items-center gap-3 md:hidden'>
								<h3 className='text-xl font-bold text-white'>Stay Connected</h3>
								<button
									onClick={() => toggleMobileSection('social')}
									className='md:hidden text-white/60'
								>
									<ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === 'social' ? 'rotate-180' : ''}`} />
								</button>
							</div>
							<h3 className='hidden md:block text-xl font-bold text-white mb-6'>Stay Connected</h3>
							
							<div className={`space-y-6 ${expandedSection === 'social' || !isMobile ? 'block' : 'hidden'} md:block`}>
								{/* Newsletter Signup */}
								<div className='bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
									<h4 className='text-white font-medium mb-3'>Get Updates</h4>
									<div className='space-y-3'>
										<Input
											type='email'
											placeholder='Enter your email'
											className='bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/20'
										/>
										<Button className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg'>
											<Send className='w-4 h-4 mr-2' />
											Subscribe
										</Button>
									</div>
								</div>

								{/* Social Media Links */}
								<div>
									<h4 className='text-white font-medium mb-4'>Follow Us</h4>
									<div className='flex flex-wrap gap-3'>
										{socialLinks.map((social, index) => (
											<motion.a
												key={social.label}
												href={social.href}
												target='_blank'
												rel='noopener noreferrer'
												className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group`}
												whileHover={{ scale: 1.1, rotate: 5 }}
												whileTap={{ scale: 0.95 }}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={isVisible ? { opacity: 1, scale: 1 } : {}}
												transition={{ duration: 0.4, delay: 0.1 * index }}
											>
												<social.icon className='w-5 h-5 text-white group-hover:scale-110 transition-transform' />
											</motion.a>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Bottom Section */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isVisible ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.6 }}
						className='border-t border-white/10 pt-8 mt-12'
					>
						<div className='flex flex-col md:flex-row items-center justify-between gap-6'>
							<div className='text-center md:text-left'>
								<p className='text-white/80 text-sm'>
									© 2024 Bhagwan Parshuram Institute of Technology. All rights reserved.
								</p>
								<p className='text-white/60 text-xs mt-1'>
									Affiliated to GGSIPU | NBA Accredited | NAAC Certified
								</p>
							</div>
							
							<div className='flex items-center gap-6 text-sm text-white/60'>
								<Link href='/privacy' className='hover:text-white transition-colors'>
									Privacy Policy
								</Link>
								<Link href='/terms' className='hover:text-white transition-colors'>
									Terms of Service
								</Link>
								<Link href='/sitemap' className='hover:text-white transition-colors'>
									Sitemap
								</Link>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Bottom Gradient */}
				<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400' />
			</footer>
		</>
	);
};

export default ModernBPITFooter;
