'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Bell, Calendar, FileText, Users, Award } from 'lucide-react';

const AcademiaOverview = () => {
	const quickStats = [
		{
			icon: <BookOpen className='w-8 h-8' />,
			value: '8',
			label: 'Academic Departments',
			color: 'bg-blue-100 text-blue-600'
		},
		{
			icon: <Users className='w-8 h-8' />,
			value: '2000+',
			label: 'Students Enrolled',
			color: 'bg-green-100 text-green-600'
		},
		{
			icon: <Award className='w-8 h-8' />,
			value: '100+',
			label: 'Faculty Members',
			color: 'bg-purple-100 text-purple-600'
		},
		{
			icon: <FileText className='w-8 h-8' />,
			value: '12',
			label: 'B.Tech Programs',
			color: 'bg-orange-100 text-orange-600'
		}
	];

	const quickAccess = [
		{
			title: 'Notices & Circulars',
			description: 'Stay updated with the latest academic notices and circulars',
			icon: <Bell className='w-6 h-6' />,
			href: '/academia/notices-circulars',
			color: 'bg-red-50 border-red-200 hover:bg-red-100'
		},
		{
			title: 'Syllabus & Ordinance',
			description: 'Access detailed syllabi and academic ordinances',
			icon: <BookOpen className='w-6 h-6' />,
			href: '/academia/syllabus-ordinance',
			color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
		},
		{
			title: 'Academic Calendar',
			description: 'View important academic dates and schedules',
			icon: <Calendar className='w-6 h-6' />,
			href: '/academia/academic-calendar',
			color: 'bg-green-50 border-green-200 hover:bg-green-100'
		}
	];

	return (
		<div className='space-y-8'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='text-center'>
				<h1 className='text-4xl font-bold text-gray-900 mb-4'>
					Academic Excellence at BPIT
				</h1>
				<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
					Discover our comprehensive academic resources, programs, and support systems 
					designed to foster innovation and excellence in engineering education.
				</p>
			</motion.div>

			{/* Quick Stats */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
				{quickStats.map((stat, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
						className='bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center'>
						<div className={`inline-flex p-3 rounded-lg ${stat.color} mb-3`}>
							{stat.icon}
						</div>
						<div className='text-2xl font-bold text-gray-900 mb-1'>
							{stat.value}
						</div>
						<div className='text-sm text-gray-600'>
							{stat.label}
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Academic Mission */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Our Academic Mission</h2>
				<p className='text-gray-700 text-lg leading-relaxed'>
					BPIT is committed to providing quality technical education that prepares students 
					for successful careers in engineering and technology. Our academic programs are designed 
					to combine theoretical knowledge with practical application, ensuring graduates are 
					industry-ready and capable of contributing to technological advancement.
				</p>
			</motion.div>

			{/* Quick Access Cards */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='grid md:grid-cols-3 gap-6'>
				{quickAccess.map((item, index) => (
					<motion.a
						key={index}
						href={item.href}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
						className={`block p-6 rounded-xl border-2 transition-all duration-300 ${item.color}`}>
						<div className='flex items-start gap-4'>
							<div className='bg-white p-3 rounded-lg shadow-sm'>
								{item.icon}
							</div>
							<div>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									{item.title}
								</h3>
								<p className='text-gray-600 text-sm'>
									{item.description}
								</p>
							</div>
						</div>
					</motion.a>
				))}
			</motion.div>

			{/* Academic Departments */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='bg-white p-8 rounded-xl shadow-md border border-gray-100'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>Academic Departments</h2>
				
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{[
						'Computer Science & Engineering',
						'Electronics & Communication',
						'Mechanical Engineering',
						'Civil Engineering',
						'Electrical Engineering',
						'Information Technology',
						'Applied Mathematics',
						'Physics & Chemistry'
					].map((dept, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
							className='bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow'>
							<div className='flex items-center gap-3'>
								<div className='w-2 h-2 bg-blue-600 rounded-full'></div>
								<span className='font-medium text-gray-800'>{dept}</span>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Important Information */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.0 }}
				className='bg-yellow-50 p-6 rounded-xl border border-yellow-200'>
				<h3 className='text-lg font-bold text-gray-900 mb-4'>Important Academic Information</h3>
				<ul className='space-y-2 text-gray-700'>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>All academic notices and updates are published in the Notices & Circulars section</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>Semester syllabi and examination schedules are available in Syllabus & Ordinance</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>Academic calendar contains all important dates for the academic year</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>Students are advised to regularly check these sections for updates</span>
					</li>
				</ul>
			</motion.div>
		</div>
	);
};

export default AcademiaOverview;