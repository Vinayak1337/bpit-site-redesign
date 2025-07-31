'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Info, MapPin, Clock, Phone, Mail, Users, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

const LibraryInformation = () => {
	const basicInfo = [
		{
			icon: <MapPin className='w-6 h-6' />,
			title: 'Location',
			details: [
				'Ground Floor, Academic Block',
				'Bhagwan Parshuram Institute of Technology',
				'PSP-4, Sector-17, Rohini',
				'New Delhi - 110089'
			],
			color: 'bg-blue-100 text-blue-600'
		},
		{
			icon: <Clock className='w-6 h-6' />,
			title: 'Operating Hours',
			details: [
				'Monday - Friday: 8:00 AM - 8:00 PM',
				'Saturday: 9:00 AM - 6:00 PM',
				'Sunday: 10:00 AM - 5:00 PM',
				'Exam Period: Extended Hours'
			],
			color: 'bg-green-100 text-green-600'
		},
		{
			icon: <Users className='w-6 h-6' />,
			title: 'Library Staff',
			details: [
				'Chief Librarian: Mr. Vikash Pandey',
				'Assistant Librarian: Ms. Anjali Verma',
				'Digital Coordinator: Ms. Pooja Singh',
				'Support Staff: 3 Members'
			],
			color: 'bg-purple-100 text-purple-600'
		},
		{
			icon: <BookOpen className='w-6 h-6' />,
			title: 'Collection Size',
			details: [
				'Total Books: 50,000+',
				'Digital Resources: 10,000+',
				'Journals: 200+',
				'Online Databases: 25+'
			],
			color: 'bg-orange-100 text-orange-600'
		}
	];

	const policies = [
		{
			title: 'Library Card Requirements',
			icon: <CheckCircle className='w-5 h-5' />,
			rules: [
				'Valid student/faculty ID required',
				'One library card per person',
				'Replacement fee: ₹100',
				'Card must be renewed annually'
			]
		},
		{
			title: 'Borrowing Rules',
			icon: <BookOpen className='w-5 h-5' />,
			rules: [
				'Students: 3 books for 15 days',
				'Faculty: 10 books for 30 days',
				'Research Scholars: 5 books for 21 days',
				'Reference books: Library use only'
			]
		},
		{
			title: 'Fine Structure',
			icon: <AlertCircle className='w-5 h-5' />,
			rules: [
				'Overdue fine: ₹2 per day per book',
				'Lost book replacement + ₹50 processing',
				'Damaged book assessment charges',
				'Late renewal: ₹10 per book'
			]
		}
	];

	const services = [
		'Book lending and reservation',
		'Digital resource access',
		'Reference and research assistance',
		'Inter-library loan services',
		'Photocopying and printing',
		'Computer and internet access',
		'Study space reservations',
		'Academic research support'
	];

	const facilities = [
		'Air-conditioned reading halls',
		'Silent study zones',
		'Group discussion rooms',
		'Computer terminals with internet',
		'WiFi connectivity throughout',
		'Photocopying and scanning',
		'CCTV security system',
		'Drinking water facility'
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
					Library Information
				</h1>
				<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
					Complete information about BPIT Library facilities, policies, and services. 
					Everything you need to know for an effective library experience.
				</p>
			</motion.div>

			{/* Basic Information Grid */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='grid md:grid-cols-2 gap-6'>
				{basicInfo.map((info, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
						className='bg-white p-6 rounded-xl shadow-lg border border-gray-200'>
						<div className='flex items-start gap-4 mb-4'>
							<div className={`p-3 rounded-lg ${info.color}`}>
								{info.icon}
							</div>
							<div className='flex-1'>
								<h3 className='text-lg font-bold text-gray-900 mb-3'>
									{info.title}
								</h3>
								<ul className='space-y-2'>
									{info.details.map((detail, idx) => (
										<li key={idx} className='text-gray-600 text-sm'>
											{detail}
										</li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Contact Information */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='bg-blue-100 p-2 rounded-lg'>
						<Phone className='w-6 h-6 text-blue-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900'>Contact Information</h2>
				</div>
				
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-white p-6 rounded-lg shadow-md'>
						<h3 className='font-bold text-gray-900 mb-3'>Direct Contact</h3>
						<div className='space-y-2 text-gray-600'>
							<div className='flex items-center gap-2'>
								<Phone className='w-4 h-4 text-blue-600' />
								<span>Library: +91-11-2757-1084</span>
							</div>
							<div className='flex items-center gap-2'>
								<Mail className='w-4 h-4 text-blue-600' />
								<span>librarian@bpitindia.ac.in</span>
							</div>
						</div>
					</div>
					
					<div className='bg-white p-6 rounded-lg shadow-md'>
						<h3 className='font-bold text-gray-900 mb-3'>Emergency Contact</h3>
						<div className='space-y-2 text-gray-600'>
							<div className='flex items-center gap-2'>
								<Phone className='w-4 h-4 text-red-600' />
								<span>Security: +91-11-2757-1080</span>
							</div>
							<div className='flex items-center gap-2'>
								<Mail className='w-4 h-4 text-red-600' />
								<span>info@bpitindia.ac.in</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Library Policies */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='bg-white p-8 rounded-xl shadow-lg border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>Library Policies</h2>
				
				<div className='grid md:grid-cols-3 gap-6'>
					{policies.map((policy, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
							className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='bg-blue-100 p-2 rounded-lg text-blue-600'>
									{policy.icon}
								</div>
								<h3 className='font-bold text-gray-900'>{policy.title}</h3>
							</div>
							<ul className='space-y-2'>
								{policy.rules.map((rule, idx) => (
									<li key={idx} className='text-gray-600 text-sm flex items-start gap-2'>
										<span className='text-blue-600 mt-1'>•</span>
										<span>{rule}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Services and Facilities */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='grid md:grid-cols-2 gap-6'>
				<div className='bg-white p-6 rounded-xl shadow-lg border border-gray-200'>
					<h3 className='text-xl font-bold text-gray-900 mb-4'>Available Services</h3>
					<ul className='space-y-2'>
						{services.map((service, index) => (
							<li key={index} className='text-gray-600 flex items-start gap-2'>
								<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
								<span>{service}</span>
							</li>
						))}
					</ul>
				</div>
				
				<div className='bg-white p-6 rounded-xl shadow-lg border border-gray-200'>
					<h3 className='text-xl font-bold text-gray-900 mb-4'>Library Facilities</h3>
					<ul className='space-y-2'>
						{facilities.map((facility, index) => (
							<li key={index} className='text-gray-600 flex items-start gap-2'>
								<CheckCircle className='w-4 h-4 text-green-600 mt-1 flex-shrink-0' />
								<span>{facility}</span>
							</li>
						))}
					</ul>
				</div>
			</motion.div>

			{/* Important Notes */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.0 }}
				className='bg-yellow-50 p-6 rounded-xl border border-yellow-200'>
				<div className='flex items-center gap-3 mb-4'>
					<AlertCircle className='w-6 h-6 text-yellow-600' />
					<h3 className='text-lg font-bold text-gray-900'>Important Information</h3>
				</div>
				<ul className='space-y-2 text-gray-700'>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>Library timings may change during holidays and examination periods</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>Digital resources are accessible 24/7 through the library website</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>Students must carry their library cards for all library services</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>Food and beverages are strictly prohibited inside the library</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-yellow-600 mt-1'>•</span>
						<span>Mobile phones must be kept on silent mode in reading areas</span>
					</li>
				</ul>
			</motion.div>
		</div>
	);
};

export default LibraryInformation;