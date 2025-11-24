'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	UserX,
	Shield,
	AlertTriangle,
	Phone,
	Mail,
	MapPin,
	Clock,
	User
} from 'lucide-react';
import type { AntiRaggingData } from '@/app/(Private Pages)/actions/statutory-committees';

const iconMap = {
	UserX,
	Shield,
	AlertTriangle,
	Phone,
	Mail,
	MapPin,
	Clock,
	User
};

type Props = {
	data: AntiRaggingData;
};

const AntiRaggingContent = ({ data }: Props) => {
	const {
		definition,
		committeeMembers,
		preventiveMeasures,
		punishments,
		emergencyContacts
	} = data;

	return (
		<div className='space-y-6 sm:space-y-8'>
			{/* Definition of Ragging */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200'>
				<h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3'>
					<AlertTriangle className='w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0' />
					{definition.title}
				</h2>
				<div className='prose prose-gray max-w-none'>
					<p className='text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed'>
						{definition.content}
					</p>
					<div className='bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4'>
						<h4 className='font-semibold text-red-800 mb-2 text-sm sm:text-base'>
							Ragging includes:
						</h4>
						<ul className='list-disc list-inside text-red-700 space-y-1 text-xs sm:text-sm'>
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
				className='bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200'>
				<h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3'>
					<Shield className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0' />
					Committee Members
				</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
					{committeeMembers.map((member, index) => (
						<div key={index} className='bg-blue-50 rounded-lg p-3 sm:p-4'>
							<div className='flex items-center gap-2 sm:gap-3 mb-2'>
								<User className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0' />
								<span className='font-medium text-gray-900 text-sm sm:text-base'>
									{member.name}
								</span>
							</div>
							<p className='text-blue-700 text-xs sm:text-sm mb-1'>
								{member.designation}
							</p>
							<p className='text-gray-600 text-xs sm:text-sm mb-1'>
								{member.department}
							</p>
							{member.phone && (
								<p className='text-gray-600 text-xs sm:text-sm'>
									📞 {member.phone}
								</p>
							)}
							{member.email && (
								<p className='text-gray-600 text-xs sm:text-sm'>
									✉️ {member.email}
								</p>
							)}
						</div>
					))}
				</div>
			</motion.div>

			{/* Preventive Measures */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200'>
				<h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3'>
					<Shield className='w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0' />
					Preventive Measures
				</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
					{preventiveMeasures.map((measure, index) => (
						<div key={index} className='bg-green-50 rounded-lg p-4 sm:p-6'>
							<div className='flex items-center gap-3 mb-3'>
								<div className='w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-lg flex items-center justify-center aspect-square'>
									<Shield className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
								</div>
								<h3 className='text-base sm:text-lg font-semibold text-gray-900'>
									{measure.title}
								</h3>
							</div>
							<p className='text-gray-700 text-sm sm:text-base leading-relaxed'>
								{measure.description}
							</p>
						</div>
					))}
				</div>
			</motion.div>

			{/* Punishments */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.7 }}
				className='bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200'>
				<h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3'>
					<AlertTriangle className='w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0' />
					Punishments for Ragging
				</h2>

				<ul className='space-y-2 sm:space-y-3'>
					{punishments.map((punishment, index) => (
						<li key={index} className='flex items-start gap-2 sm:gap-3'>
							<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0'></div>
							<span className='text-gray-700 text-sm sm:text-base leading-relaxed'>
								{punishment}
							</span>
						</li>
					))}
				</ul>
			</motion.div>

			{/* Emergency Contacts */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
				{emergencyContacts.map((contactInfo, index) => {
                    const IconComponent = iconMap[contactInfo.icon as keyof typeof iconMap] || Phone;
                    return (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
						className='bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-200'>
						<div className='text-center mb-3 sm:mb-4'>
							<div
								className={`w-10 h-10 sm:w-12 sm:h-12 ${contactInfo.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square`}>
								<IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${contactInfo.iconColor}`} />
							</div>
							<h3 className='text-base sm:text-lg font-bold text-gray-900 mb-2'>
								{contactInfo.title}
							</h3>
							<div className='space-y-1 text-gray-700 text-xs sm:text-sm'>
								<p className='text-lg sm:text-xl font-bold text-red-600'>
									{contactInfo.contact}
								</p>
								<p>{contactInfo.description}</p>
							</div>
						</div>
					</motion.div>
				)})}
			</div>
		</div>
	);
};

export default AntiRaggingContent;


