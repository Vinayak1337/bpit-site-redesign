'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InternalComplaintsData } from '@/app/(Private Pages)/actions/statutory-committees';
import { getIconComponent } from './StatutoryIcons';
import {
	AlertTriangle,
	Users,
	Phone,
	Mail,
	FileText,
	Heart,
	Scale,
	Shield
} from 'lucide-react';

export default function InternalComplaintsView({
	data
}: {
	data: InternalComplaintsData;
}) {
	const {
		hero,
		definition,
		committeeMembers,
		procedures,
		supportServices,
		rightsAndResponsibilities,
		contactInfo
	} = data;

	const HeroIcon = getIconComponent(hero.icon || 'Users');

	return (
		<div className='space-y-8'>
			{/* Hero */}
			<div
				className={`rounded-2xl p-12 text-white relative overflow-hidden bg-gradient-to-br ${
					hero.gradient || 'from-purple-600 via-purple-700 to-pink-600'
				} shadow-lg`}>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32'></div>
				<div className='absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32'></div>

				<div className='relative z-10 flex flex-col md:flex-row items-center gap-8'>
					<div
						className={`w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm ring-1 ring-white/20 shadow-xl`}>
						<HeroIcon className='w-10 h-10 text-white' />
					</div>
					<div className='text-center md:text-left'>
						<h1 className='text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-sm'>
							{hero.title}
						</h1>
						<p className='text-white/95 text-lg leading-relaxed font-medium max-w-3xl'>
							{hero.description}
						</p>
					</div>
				</div>
			</div>

			{/* Definition & Scope */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
					<div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
						<AlertTriangle className='w-6 h-6 text-orange-600' />
					</div>
					{definition.title}
				</h2>
				<div className='prose prose-gray max-w-none'>
					<p className='text-gray-700 mb-4'>{definition.content}</p>
					<div className='bg-orange-50 border border-orange-200 rounded-lg p-4'>
						<h4 className='font-semibold text-orange-800 mb-2'>
							Sexual harassment includes:
						</h4>
						<ul className='list-disc list-inside text-orange-700 space-y-1 text-sm'>
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
					<div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
						<Users className='w-6 h-6 text-blue-600' />
					</div>
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
							<p className='text-purple-600 font-medium mb-2'>
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

			{/* Complaint Procedure */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
						<FileText className='w-6 h-6 text-green-600' />
					</div>
					Complaint Procedure
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{procedures.map((procedure, index) => {
						const IconComponent = getIconComponent(procedure.icon);
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.1 * index }}
								className='bg-gray-50 rounded-xl p-6 text-center'>
								<div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4'>
									<IconComponent className={`w-6 h-6 ${procedure.iconColor}`} />
								</div>
								<div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3'>
									<span className='text-white font-bold text-sm'>
										{procedure.step}
									</span>
								</div>
								<h4 className='font-semibold text-gray-900 mb-2'>
									{procedure.title}
								</h4>
								<p className='text-gray-600 text-sm'>{procedure.description}</p>
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			{/* Support Services */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<div className='w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center'>
						<Heart className='w-6 h-6 text-pink-600' />
					</div>
					Support Services
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{supportServices.map((service, index) => {
						const IconComponent = getIconComponent(service.icon);
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.1 * index }}
								className='bg-gray-50 rounded-xl p-6'>
								<div className='flex items-start gap-4'>
									<div className='p-3 bg-white rounded-lg'>
										<IconComponent className={`w-6 h-6 ${service.iconColor}`} />
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>
											{service.title}
										</h4>
										<p className='text-gray-600 text-sm'>
											{service.description}
										</p>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>

			{/* Rights & Responsibilities */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.0 }}
				className='bg-white rounded-2xl p-8 border border-gray-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
						<Scale className='w-6 h-6 text-blue-600' />
					</div>
					Rights & Responsibilities
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							Your Rights
						</h3>
						<ul className='space-y-2'>
							{rightsAndResponsibilities.rights.map((right, index) => (
								<li key={index} className='flex items-start gap-3'>
									<div className='w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
									<span className='text-sm text-gray-700'>{right}</span>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							Our Responsibilities
						</h3>
						<ul className='space-y-2'>
							{rightsAndResponsibilities.responsibilities.map(
								(responsibility, index) => (
									<li key={index} className='flex items-start gap-3'>
										<div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
										<span className='text-sm text-gray-700'>
											{responsibility}
										</span>
									</li>
								)
							)}
						</ul>
					</div>
				</div>
			</motion.div>

			{/* Contact Information */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.2 }}
				className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
					How to Report
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{contactInfo.map((contact, index) => {
						const IconComponent = getIconComponent(contact.icon);
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
						Your courage to speak up helps create a safer environment for
						everyone. All complaints are treated with utmost confidentiality and
						seriousness.
					</p>
				</div>
			</motion.div>
		</div>
	);
}
