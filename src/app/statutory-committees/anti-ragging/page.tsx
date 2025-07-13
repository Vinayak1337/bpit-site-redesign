'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	UserX,
	Shield,
	Phone,
	Mail,
	AlertTriangle,
	Users,
	FileText,
	Gavel
} from 'lucide-react';
import { antiRaggingPageData } from '@/data/statutory-committees';

const iconMap = {
	UserX: UserX,
	Shield: Shield,
	Phone: Phone,
	Mail: Mail,
	AlertTriangle: AlertTriangle,
	Users: Users,
	FileText: FileText,
	Gavel: Gavel
};

const AntiRaggingPage = () => {
	const {
		hero,
		definition,
		committeeMembers,
		preventiveMeasures,
		punishments,
		emergencyContacts
	} = antiRaggingPageData;

	return (
		<div className='space-y-8'>
			{/* Header Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className={`bg-gradient-to-r ${hero.gradient} rounded-2xl p-8 border ${hero.borderColor}`}>
				<div className='text-center mb-6'>
					<div
						className={`w-16 h-16 ${hero.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
						<UserX className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						{hero.title}
					</h1>
					<p className='text-gray-600 max-w-2xl mx-auto'>{hero.description}</p>
				</div>
			</motion.div>

			{/* Definition of Ragging */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
					<AlertTriangle className='w-6 h-6 text-red-600' />
					{definition.title}
				</h2>
				<div className='prose prose-gray max-w-none'>
					<p className='text-gray-700 mb-4'>{definition.content}</p>
					<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
						<h4 className='font-semibold text-red-800 mb-2'>
							Ragging includes:
						</h4>
						<ul className='list-disc list-inside text-red-700 space-y-1 text-sm'>
							{definition.includes.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</div>
				</div>
			</motion.div>

			{/* Committee Members */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Users className='w-6 h-6 text-blue-600' />
					Committee Members
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{committeeMembers.map((member, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: 0.1 * index }}
							className='bg-gray-50 rounded-xl p-6'>
							<h4 className='font-semibold text-gray-900 text-lg mb-1'>
								{member.name}
							</h4>
							<p className='text-blue-600 font-medium mb-2'>
								{member.designation}
							</p>
							<p className='text-gray-600 text-sm mb-3'>{member.department}</p>
							<div className='space-y-2'>
								<div className='flex items-center gap-2 text-sm'>
									<Phone className='w-4 h-4 text-gray-400' />
									<span className='text-gray-600'>{member.phone}</span>
								</div>
								<div className='flex items-center gap-2 text-sm'>
									<Mail className='w-4 h-4 text-gray-400' />
									<span className='text-gray-600'>{member.email}</span>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Preventive Measures */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Shield className='w-6 h-6 text-green-600' />
					Preventive Measures
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{preventiveMeasures.map((measure, index) => {
						const IconComponent = iconMap[measure.icon as keyof typeof iconMap];
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.1 * index }}
								className='bg-gray-50 rounded-xl p-6'>
								<div className='flex items-start gap-4'>
									<div className='p-3 bg-white rounded-lg'>
										<IconComponent className={`w-6 h-6 ${measure.iconColor}`} />
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>
											{measure.title}
										</h4>
										<p className='text-gray-600 text-sm'>
											{measure.description}
										</p>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			{/* Punishments */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Gavel className='w-6 h-6 text-red-600' />
					Punishments for Ragging
				</h2>
				<div className='bg-red-50 border border-red-200 rounded-xl p-6'>
					<p className='text-red-800 mb-4 font-medium'>
						Any student found guilty of ragging shall be liable to one or more
						of the following punishments:
					</p>
					<ul className='space-y-2'>
						{punishments.map((punishment, index) => (
							<li key={index} className='flex items-start gap-3 text-red-700'>
								<div className='w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0'></div>
								<span className='text-sm'>{punishment}</span>
							</li>
						))}
					</ul>
				</div>
			</motion.div>

			{/* Emergency Contacts */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.0 }}
				className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
					Emergency Contacts & Helpline
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{emergencyContacts.map((contact, index) => {
						const IconComponent = iconMap[contact.icon as keyof typeof iconMap];
						return (
							<div key={index} className='text-center'>
								<div
									className={`w-12 h-12 ${contact.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
									<IconComponent className={`w-6 h-6 ${contact.iconColor}`} />
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>
									{contact.title}
								</h4>
								<p className='text-gray-600 font-bold'>{contact.contact}</p>
								<p className='text-gray-500 text-sm'>{contact.description}</p>
							</div>
						);
					})}
				</div>
				<div className='mt-6 text-center'>
					<p className='text-gray-600 text-sm'>
						Remember: Your safety is our priority. Don&apos;t hesitate to report any
						incident, however minor it may seem.
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default AntiRaggingPage;
