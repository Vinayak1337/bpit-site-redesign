'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	BookOpen,
	Bell,
	Calendar,
	FileText,
	Users,
	Award,
	type LucideIcon
} from 'lucide-react';
import type { AcademiaOverviewData } from '@/app/(Private Pages)/actions/academia-overview';

// --- Icon map ---

const ICON_MAP: Record<string, LucideIcon> = {
	BookOpen,
	Bell,
	Calendar,
	FileText,
	Users,
	Award
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
	const Icon = ICON_MAP[name];
	if (!Icon) return null;
	return <Icon className={className} />;
}

// --- Component ---

interface AcademiaOverviewClientProps {
	data: AcademiaOverviewData;
}

const AcademiaOverviewClient = ({ data }: AcademiaOverviewClientProps) => {
	const { heading, subheading, stats, missionTitle, missionText, quickAccess, departments, importantInfo } = data;

	return (
		<div className='space-y-8'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='text-center'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
					{heading}
				</h1>
				<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
					{subheading}
				</p>
			</motion.div>

			{/* Quick Stats */}
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
						transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
						className='bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center'>
						<div className={`inline-flex p-3 rounded-lg ${stat.color} mb-3`}>
							<DynamicIcon name={stat.icon} className='w-8 h-8' />
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
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>{missionTitle}</h2>
				<p className='text-gray-700 text-lg leading-relaxed'>
					{missionText}
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
								<DynamicIcon name={item.icon} className='w-6 h-6' />
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
					{departments.map((dept, index) => (
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
				<h3 className='text-lg font-bold text-gray-900 mb-4'>{importantInfo.title}</h3>
				<ul className='space-y-2 text-gray-700'>
					{importantInfo.points.map((point, index) => (
						<li key={index} className='flex items-start gap-2'>
							<span className='text-yellow-600 mt-1'>•</span>
							<span>{point}</span>
						</li>
					))}
				</ul>
			</motion.div>
		</div>
	);
};

export default AcademiaOverviewClient;
