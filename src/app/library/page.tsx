'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Database, Clock, Download, Globe } from 'lucide-react';

const LibraryOverview = () => {
	const stats = [
		{
			icon: <BookOpen className='w-8 h-8' />,
			value: '50,000+',
			label: 'Books & Journals',
			color: 'bg-blue-100 text-blue-600'
		},
		{
			icon: <Database className='w-8 h-8' />,
			value: '10,000+',
			label: 'Digital Resources',
			color: 'bg-green-100 text-green-600'
		},
		{
			icon: <Users className='w-8 h-8' />,
			value: '500+',
			label: 'Daily Visitors',
			color: 'bg-purple-100 text-purple-600'
		},
		{
			icon: <Globe className='w-8 h-8' />,
			value: '24/7',
			label: 'Online Access',
			color: 'bg-orange-100 text-orange-600'
		}
	];

	const features = [
		{
			title: 'Digital Library',
			description: 'Access thousands of e-books, research papers, and academic journals online.',
			icon: <Database className='w-6 h-6' />
		},
		{
			title: 'Study Spaces',
			description: 'Quiet and comfortable reading areas with modern facilities.',
			icon: <BookOpen className='w-6 h-6' />
		},
		{
			title: 'Extended Hours',
			description: 'Library services available with extended hours during exam periods.',
			icon: <Clock className='w-6 h-6' />
		},
		{
			title: 'Research Support',
			description: 'Expert assistance for research projects and academic work.',
			icon: <Users className='w-6 h-6' />
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
					BPIT Library
				</h1>
				<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
					Discover a world of knowledge at the BPIT Library. Our comprehensive collection 
					and modern facilities support your academic journey and research endeavors.
				</p>
			</motion.div>

			{/* Stats Grid */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
				{stats.map((stat, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
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

			{/* Library Mission */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Our Mission</h2>
				<p className='text-gray-700 text-lg leading-relaxed'>
					The BPIT Library serves as the academic heart of our institution, providing 
					comprehensive information resources and services to support teaching, learning, 
					and research. We are committed to fostering an environment that encourages 
					intellectual growth and lifelong learning.
				</p>
			</motion.div>

			{/* Features Grid */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='grid md:grid-cols-2 gap-6'>
				{features.map((feature, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
						className='bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow'>
						<div className='flex items-start gap-4'>
							<div className='bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0'>
								{feature.icon}
							</div>
							<div>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									{feature.title}
								</h3>
								<p className='text-gray-600'>
									{feature.description}
								</p>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Contact Info */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='bg-white p-6 rounded-xl shadow-md border border-gray-100'>
				<h2 className='text-xl font-bold text-gray-900 mb-4'>Library Information</h2>
				<div className='grid md:grid-cols-2 gap-6 text-gray-600'>
					<div>
						<h3 className='font-semibold text-gray-900 mb-2'>Location</h3>
						<p>Ground Floor, Academic Block</p>
						<p>Bhagwan Parshuram Institute of Technology</p>
					</div>
					<div>
						<h3 className='font-semibold text-gray-900 mb-2'>Quick Links</h3>
						<ul className='space-y-1'>
							<li>• Library Timings</li>
							<li>• Digital Resources</li>
							<li>• Book Collection</li>
							<li>• Contact Information</li>
						</ul>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default LibraryOverview;