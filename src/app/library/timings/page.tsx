'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, AlertCircle, Users, BookOpen } from 'lucide-react';

const LibraryTimings = () => {
	const regularTimings = [
		{ day: 'Monday - Friday', time: '8:00 AM - 8:00 PM', type: 'weekday' },
		{ day: 'Saturday', time: '9:00 AM - 6:00 PM', type: 'saturday' },
		{ day: 'Sunday', time: '10:00 AM - 5:00 PM', type: 'sunday' }
	];

	const examTimings = [
		{ day: 'Monday - Sunday', time: '8:00 AM - 10:00 PM', type: 'exam' }
	];

	const specialServices = [
		{
			title: 'Reading Hall',
			timing: '24/7 Access',
			description: 'Available for students with extended study hours',
			icon: <BookOpen className='w-5 h-5' />
		},
		{
			title: 'Digital Library',
			timing: '24/7 Online',
			description: 'Access digital resources anytime from anywhere',
			icon: <Users className='w-5 h-5' />
		},
		{
			title: 'Reference Section',
			timing: '9:00 AM - 6:00 PM',
			description: 'Librarian assistance available during these hours',
			icon: <Clock className='w-5 h-5' />
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
					Library Timings
				</h1>
				<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
					Plan your library visits with our comprehensive timing schedule. 
					Extended hours available during examination periods.
				</p>
			</motion.div>

			{/* Regular Timings */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white p-8 rounded-xl shadow-lg border border-gray-200'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='bg-blue-100 p-2 rounded-lg'>
						<Calendar className='w-6 h-6 text-blue-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900'>Regular Timings</h2>
				</div>
				
				<div className='grid gap-4'>
					{regularTimings.map((timing, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
							className={`flex justify-between items-center p-4 rounded-lg border-2 ${
								timing.type === 'weekday' 
									? 'bg-green-50 border-green-200' 
									: timing.type === 'saturday'
									? 'bg-blue-50 border-blue-200'
									: 'bg-orange-50 border-orange-200'
							}`}>
							<span className='font-semibold text-gray-900'>{timing.day}</span>
							<span className='text-lg font-bold text-gray-700'>{timing.time}</span>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Exam Period Timings */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='bg-orange-100 p-2 rounded-lg'>
						<AlertCircle className='w-6 h-6 text-orange-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900'>Examination Period</h2>
				</div>
				
				<div className='grid gap-4'>
					{examTimings.map((timing, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
							className='flex justify-between items-center p-4 rounded-lg bg-white border-2 border-orange-300'>
							<span className='font-semibold text-gray-900'>{timing.day}</span>
							<span className='text-lg font-bold text-orange-600'>{timing.time}</span>
						</motion.div>
					))}
				</div>
				
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.6 }}
					className='mt-4 p-4 bg-orange-100 rounded-lg'>
					<p className='text-orange-800 font-medium'>
						<strong>Note:</strong> Extended hours are available during mid-semester and final examination periods. 
						Students are advised to check notices for any temporary schedule changes.
					</p>
				</motion.div>
			</motion.div>

			{/* Special Services */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='bg-white p-8 rounded-xl shadow-lg border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>Special Services & Timings</h2>
				
				<div className='grid md:grid-cols-3 gap-6'>
					{specialServices.map((service, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
							className='bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow'>
							<div className='flex items-center gap-3 mb-3'>
								<div className='bg-blue-100 p-2 rounded-lg text-blue-600'>
									{service.icon}
								</div>
								<h3 className='font-semibold text-gray-900'>{service.title}</h3>
							</div>
							<div className='text-lg font-bold text-blue-600 mb-2'>{service.timing}</div>
							<p className='text-gray-600 text-sm'>{service.description}</p>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Important Notes */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='bg-blue-50 p-6 rounded-xl border border-blue-200'>
				<h3 className='text-lg font-bold text-gray-900 mb-4'>Important Information</h3>
				<ul className='space-y-2 text-gray-700'>
					<li className='flex items-start gap-2'>
						<span className='text-blue-600 mt-1'>•</span>
						<span>Library cards are required for access during all hours</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-blue-600 mt-1'>•</span>
						<span>Silent zones are maintained in reading areas</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-blue-600 mt-1'>•</span>
						<span>Food and beverages are not allowed inside the library</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-blue-600 mt-1'>•</span>
						<span>Mobile phones must be kept on silent mode</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-blue-600 mt-1'>•</span>
						<span>Holiday timings may vary - check library notices</span>
					</li>
				</ul>
			</motion.div>
		</div>
	);
};

export default LibraryTimings;