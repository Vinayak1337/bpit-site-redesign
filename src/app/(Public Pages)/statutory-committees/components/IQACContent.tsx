'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	CheckCircle,
	Target,
	Users,
	BarChart3,
	Award,
	FileText,
	Eye,
	Settings
} from 'lucide-react';
import type { IqacData } from '@/app/(Private Pages)/actions/statutory-committees';

const iconMap = {
	CheckCircle: CheckCircle,
	Target: Target,
	Users: Users,
	BarChart3: BarChart3,
	Award: Award,
	FileText: FileText,
	Eye: Eye,
	Settings: Settings
};

type Props = {
	data: IqacData;
};

const IQACContent = ({ data }: Props) => {
	const {
		about,
		objectives,
		functions,
		committeeMembers,
		initiatives,
		aqar
	} = data;

	return (
		<div className='space-y-6 sm:space-y-8'>
			{/* About IQAC */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200'>
				<h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3'>
					<FileText className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0' />
					{about.title}
				</h2>
				<div className='prose prose-gray max-w-none'>
					{about.content.map((paragraph, index) => (
						<p key={index} className='text-gray-700 mb-4'>
							{paragraph}
						</p>
					))}
					<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
						<h4 className='font-semibold text-blue-800 mb-2'>Vision:</h4>
						<p className='text-blue-700 text-sm mb-3'>{about.vision}</p>
						<h4 className='font-semibold text-blue-800 mb-2'>Mission:</h4>
						<p className='text-blue-700 text-sm'>{about.mission}</p>
					</div>
				</div>
			</motion.div>

			{/* Objectives */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Target className='w-6 h-6 text-green-600' />
					Objectives
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{objectives.map((objective, index) => {
						const IconComponent =
							iconMap[objective.icon as keyof typeof iconMap] || Target;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.1 * index }}
								className='bg-gray-50 rounded-xl p-6'>
								<div className='flex items-start gap-4'>
									<div className='p-3 bg-white rounded-lg'>
										<IconComponent
											className={`w-6 h-6 ${objective.iconColor}`}
										/>
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>
											{objective.title}
										</h4>
										<p className='text-gray-600 text-sm'>
											{objective.description}
										</p>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			{/* Functions */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Settings className='w-6 h-6 text-purple-600' />
					Functions of IQAC
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{functions.map((func, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: 0.1 * index }}
							className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
							<div className='w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0'></div>
							<span className='text-sm text-gray-700'>{func}</span>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Committee Members */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Users className='w-6 h-6 text-blue-600' />
					Committee Members
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{committeeMembers.map((member, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.1 * index }}
							className='bg-gray-50 rounded-xl p-6'>
							<h4 className='font-semibold text-gray-900 text-lg mb-1'>
								{member.name}
							</h4>
							<p className='text-blue-600 font-medium mb-2'>
								{member.designation}
							</p>
							<p className='text-gray-600 text-sm mb-2'>{member.department}</p>
							<p className='text-gray-500 text-xs'>{member.qualification}</p>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Quality Initiatives */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.0 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Award className='w-6 h-6 text-green-600' />
					Quality Initiatives
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{initiatives.map((initiative, index) => {
						const IconComponent =
							iconMap[initiative.icon as keyof typeof iconMap] || Award;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.1 * index }}
								className='bg-gray-50 rounded-xl p-6'>
								<div className='flex items-start gap-4'>
									<div className='p-3 bg-white rounded-lg'>
										<IconComponent
											className={`w-6 h-6 ${initiative.iconColor}`}
										/>
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>
											{initiative.title}
										</h4>
										<p className='text-gray-600 text-sm'>
											{initiative.description}
										</p>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			{/* Annual Quality Assurance Report */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.2 }}
				className='bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
					{aqar.title}
				</h2>
				<div className='text-center mb-6'>
					<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<FileText className='w-6 h-6 text-green-600' />
					</div>
					<p className='text-gray-700 max-w-2xl mx-auto mb-6'>
						{aqar.description}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{aqar.reports.map((report, index) => (
							<div key={index} className='bg-white rounded-lg p-4 shadow-sm'>
								<h4 className='font-semibold text-gray-900 mb-2'>
									{report.title}
								</h4>
								<p className='text-sm text-gray-600 mb-3'>
									{report.description}
								</p>
								<button
									className={`${report.buttonColor} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}>
									{report.buttonText}
								</button>
							</div>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default IQACContent;

