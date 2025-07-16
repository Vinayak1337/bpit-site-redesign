'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
	BookOpen, 
	Search, 
	Download, 
	Printer, 
	Wifi, 
	Users, 
	Clock, 
	Database,
	FileText,
	Headphones,
	Globe,
	Archive
} from 'lucide-react';

const LibraryServices = () => {
	const services = [
		{
			title: 'Book Lending',
			description: 'Borrow books from our extensive collection with flexible return policies.',
			icon: <BookOpen className='w-6 h-6' />,
			color: 'bg-blue-100 text-blue-600',
			features: ['15-day lending period', 'Renewal options', 'Online reservations', 'Inter-library loans']
		},
		{
			title: 'Reference Services',
			description: 'Expert assistance for research and academic queries from qualified librarians.',
			icon: <Search className='w-6 h-6' />,
			color: 'bg-green-100 text-green-600',
			features: ['Research guidance', 'Citation help', 'Database training', 'Literature search']
		},
		{
			title: 'Digital Resources',
			description: 'Access to online databases, e-books, and digital journals.',
			icon: <Database className='w-6 h-6' />,
			color: 'bg-purple-100 text-purple-600',
			features: ['IEEE Xplore access', 'SpringerLink', 'ScienceDirect', '24/7 online access']
		},
		{
			title: 'Study Spaces',
			description: 'Quiet study areas and group discussion rooms for collaborative learning.',
			icon: <Users className='w-6 h-6' />,
			color: 'bg-orange-100 text-orange-600',
			features: ['Silent study zones', 'Group study rooms', 'Reading halls', 'Research carrels']
		},
		{
			title: 'Internet & WiFi',
			description: 'High-speed internet connectivity throughout the library premises.',
			icon: <Wifi className='w-6 h-6' />,
			color: 'bg-cyan-100 text-cyan-600',
			features: ['Free WiFi access', 'Computer terminals', 'Laptop charging points', '24/7 connectivity']
		},
		{
			title: 'Printing & Scanning',
			description: 'Photocopying, printing, and scanning facilities for academic needs.',
			icon: <Printer className='w-6 h-6' />,
			color: 'bg-red-100 text-red-600',
			features: ['Color & B&W printing', 'Scanning services', 'Binding facilities', 'Affordable rates']
		},
		{
			title: 'Document Delivery',
			description: 'Obtain research papers and documents from external sources.',
			icon: <FileText className='w-6 h-6' />,
			color: 'bg-indigo-100 text-indigo-600',
			features: ['Inter-library loans', 'Document requests', 'Article delivery', 'Research support']
		},
		{
			title: 'Audio-Visual Services',
			description: 'Multimedia resources and equipment for enhanced learning experience.',
			icon: <Headphones className='w-6 h-6' />,
			color: 'bg-pink-100 text-pink-600',
			features: ['DVD/CD collection', 'Audio books', 'Video lectures', 'Multimedia equipment']
		},
		{
			title: 'Online Catalog',
			description: 'Search and browse library collection through our online catalog system.',
			icon: <Globe className='w-6 h-6' />,
			color: 'bg-yellow-100 text-yellow-600',
			features: ['OPAC system', 'Advanced search', 'Book reservations', 'Account management']
		},
		{
			title: 'Archive Services',
			description: 'Access to institutional archives and historical documents.',
			icon: <Archive className='w-6 h-6' />,
			color: 'bg-gray-100 text-gray-600',
			features: ['Thesis archive', 'Institution history', 'Faculty publications', 'Research repository']
		}
	];

	const specialServices = [
		{
			title: 'Extended Hours',
			description: 'Extended library hours during examination periods',
			icon: <Clock className='w-5 h-5' />,
			timing: 'During Exams: 8 AM - 10 PM'
		},
		{
			title: 'Research Support',
			description: 'Dedicated support for research scholars and faculty',
			icon: <Users className='w-5 h-5' />,
			timing: 'Mon-Fri: 9 AM - 5 PM'
		},
		{
			title: 'Digital Downloads',
			description: 'Access to downloadable research papers and e-books',
			icon: <Download className='w-5 h-5' />,
			timing: '24/7 Online Access'
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
					Library Services
				</h1>
				<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
					Comprehensive library services designed to support your academic and research needs. 
					From traditional book lending to cutting-edge digital resources.
				</p>
			</motion.div>

			{/* Main Services Grid */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{services.map((service, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
						className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'>
						<div className='flex items-start gap-4 mb-4'>
							<div className={`p-3 rounded-lg ${service.color}`}>
								{service.icon}
							</div>
							<div className='flex-1'>
								<h3 className='text-lg font-bold text-gray-900 mb-2'>
									{service.title}
								</h3>
								<p className='text-gray-600 text-sm mb-3'>
									{service.description}
								</p>
							</div>
						</div>
						
						<div>
							<h4 className='font-semibold text-gray-900 mb-2 text-sm'>Key Features:</h4>
							<ul className='space-y-1'>
								{service.features.map((feature, idx) => (
									<li
										key={idx}
										className='text-gray-600 text-xs flex items-start gap-2'>
										<span className='text-blue-600 mt-1'>•</span>
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Special Services */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>Special Services</h2>
				
				<div className='grid md:grid-cols-3 gap-6'>
					{specialServices.map((service, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
							className='bg-white p-6 rounded-lg shadow-md'>
							<div className='flex items-center gap-3 mb-3'>
								<div className='bg-blue-100 p-2 rounded-lg text-blue-600'>
									{service.icon}
								</div>
								<h3 className='font-bold text-gray-900'>{service.title}</h3>
							</div>
							<p className='text-gray-600 text-sm mb-3'>{service.description}</p>
							<div className='text-sm font-semibold text-blue-600'>{service.timing}</div>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Service Guidelines */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='bg-white p-8 rounded-xl shadow-lg border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>Service Guidelines</h2>
				
				<div className='grid md:grid-cols-2 gap-8'>
					<div>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>How to Access Services</h3>
						<ol className='space-y-2 text-gray-600'>
							<li className='flex gap-3'>
								<span className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5'>1</span>
								<span>Present your valid library card at the service desk</span>
							</li>
							<li className='flex gap-3'>
								<span className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5'>2</span>
								<span>Fill out the appropriate service request form</span>
							</li>
							<li className='flex gap-3'>
								<span className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5'>3</span>
								<span>Pay applicable fees (if any) at the counter</span>
							</li>
							<li className='flex gap-3'>
								<span className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5'>4</span>
								<span>Collect your service receipt and wait for processing</span>
							</li>
						</ol>
					</div>
					
					<div>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>Important Notes</h3>
						<ul className='space-y-2 text-gray-600'>
							<li className='flex items-start gap-2'>
								<span className='text-blue-600 mt-1'>•</span>
								<span>Some services may require advance booking</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-blue-600 mt-1'>•</span>
								<span>Faculty and research scholars get priority access</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-blue-600 mt-1'>•</span>
								<span>Digital services are available 24/7 online</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-blue-600 mt-1'>•</span>
								<span>Service charges may apply for external users</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-blue-600 mt-1'>•</span>
								<span>Contact library staff for specialized assistance</span>
							</li>
						</ul>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default LibraryServices;
