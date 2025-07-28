'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Database, Globe, FileText, Calculator, Cpu, Beaker, PenTool } from 'lucide-react';

const BookCollection = () => {
	const collections = [
		{
			category: 'Engineering & Technology',
			count: '15,000+',
			description: 'Comprehensive collection covering all engineering disciplines',
			icon: <Cpu className='w-6 h-6' />,
			color: 'bg-blue-100 text-blue-600',
			subjects: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical']
		},
		{
			category: 'Mathematics & Physics',
			count: '8,000+',
			description: 'Advanced mathematical concepts and physics fundamentals',
			icon: <Calculator className='w-6 h-6' />,
			color: 'bg-green-100 text-green-600',
			subjects: ['Pure Mathematics', 'Applied Mathematics', 'Physics', 'Statistics']
		},
		{
			category: 'Science & Research',
			count: '12,000+',
			description: 'Scientific journals, research papers, and laboratory manuals',
			icon: <Beaker className='w-6 h-6' />,
			color: 'bg-purple-100 text-purple-600',
			subjects: ['Chemistry', 'Biology', 'Environmental Science', 'Materials Science']
		},
		{
			category: 'Management & Humanities',
			count: '6,000+',
			description: 'Business management, economics, and humanities collection',
			icon: <PenTool className='w-6 h-6' />,
			color: 'bg-orange-100 text-orange-600',
			subjects: ['Management', 'Economics', 'English Literature', 'Philosophy']
		},
		{
			category: 'Reference Materials',
			count: '3,000+',
			description: 'Encyclopedias, dictionaries, handbooks, and reference guides',
			icon: <FileText className='w-6 h-6' />,
			color: 'bg-red-100 text-red-600',
			subjects: ['Encyclopedias', 'Technical Handbooks', 'Standards', 'Dictionaries']
		},
		{
			category: 'Digital Resources',
			count: '10,000+',
			description: 'E-books, online journals, and digital databases',
			icon: <Database className='w-6 h-6' />,
			color: 'bg-indigo-100 text-indigo-600',
			subjects: ['IEEE Xplore', 'SpringerLink', 'ScienceDirect', 'ACM Digital Library']
		}
	];

	const statistics = [
		{ label: 'Total Books', value: '50,000+', icon: <BookOpen className='w-8 h-8' /> },
		{ label: 'Journals', value: '200+', icon: <FileText className='w-8 h-8' /> },
		{ label: 'Digital Resources', value: '10,000+', icon: <Database className='w-8 h-8' /> },
		{ label: 'Online Databases', value: '25+', icon: <Globe className='w-8 h-8' /> }
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
					Book Collection
				</h1>
				<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
					Explore our extensive collection of books, journals, and digital resources 
					covering all major academic disciplines and research areas.
				</p>
			</motion.div>

			{/* Statistics */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
				{statistics.map((stat, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
						className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center'>
						<div className='bg-blue-100 p-3 rounded-lg text-blue-600 inline-flex mb-3'>
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

			{/* Collections Grid */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{collections.map((collection, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
						className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'>
						<div className='flex items-start gap-4 mb-4'>
							<div className={`p-3 rounded-lg ${collection.color}`}>
								{collection.icon}
							</div>
							<div className='flex-1'>
								<h3 className='text-lg font-bold text-gray-900 mb-1'>
									{collection.category}
								</h3>
								<div className='text-2xl font-bold text-blue-600 mb-2'>
									{collection.count}
								</div>
							</div>
						</div>
						
						<p className='text-gray-600 mb-4'>
							{collection.description}
						</p>
						
						<div>
							<h4 className='font-semibold text-gray-900 mb-2'>Key Subjects:</h4>
							<div className='flex flex-wrap gap-2'>
								{collection.subjects.map((subject, idx) => (
									<span
										key={idx}
										className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'>
										{subject}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Special Collections */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>Special Collections</h2>
				
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-white p-6 rounded-lg shadow-md'>
						<h3 className='text-lg font-bold text-gray-900 mb-3'>Thesis & Dissertations</h3>
						<p className='text-gray-600 mb-3'>
							Complete collection of M.Tech and Ph.D. theses from BPIT students and faculty.
						</p>
						<ul className='text-sm text-gray-600 space-y-1'>
							<li>• M.Tech Project Reports: 500+</li>
							<li>• Ph.D. Dissertations: 50+</li>
							<li>• Research Papers: 1000+</li>
						</ul>
					</div>
					
					<div className='bg-white p-6 rounded-lg shadow-md'>
						<h3 className='text-lg font-bold text-gray-900 mb-3'>Rare Books & Archives</h3>
						<p className='text-gray-600 mb-3'>
							Historical engineering texts and foundational works in technology.
						</p>
						<ul className='text-sm text-gray-600 space-y-1'>
							<li>• First Edition Technical Books</li>
							<li>• Historical Engineering Texts</li>
							<li>• Institution Archives</li>
						</ul>
					</div>
				</div>
			</motion.div>

			{/* Access Information */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='bg-white p-6 rounded-xl shadow-lg border border-gray-200'>
				<h2 className='text-xl font-bold text-gray-900 mb-4'>Collection Access</h2>
				<div className='grid md:grid-cols-2 gap-6 text-gray-600'>
					<div>
						<h3 className='font-semibold text-gray-900 mb-2'>Borrowing Policies</h3>
						<ul className='space-y-1 text-sm'>
							<li>• Students: 3 books for 15 days</li>
							<li>• Faculty: 10 books for 30 days</li>
							<li>• Research Scholars: 5 books for 21 days</li>
							<li>• Reference books: Library use only</li>
						</ul>
					</div>
					<div>
						<h3 className='font-semibold text-gray-900 mb-2'>Search & Discovery</h3>
						<ul className='space-y-1 text-sm'>
							<li>• Online catalog (OPAC) available</li>
							<li>• Subject-wise classification</li>
							<li>• Author and title search</li>
							<li>• Digital resource integration</li>
						</ul>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default BookCollection;