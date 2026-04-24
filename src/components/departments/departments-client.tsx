'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
	Code,
	Cpu,
	Zap,
	Radio,
	Briefcase,
	ChevronRight,
	GraduationCap,
	Building2,
	Users,
	BookOpen,
	type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DepartmentsPageData, Department } from '@/app/(Private Pages)/actions/departments';

// --- Icon map ---

const ICON_MAP: Record<string, LucideIcon> = {
	Code,
	Cpu,
	Zap,
	Radio,
	Briefcase,
	GraduationCap,
	Building2,
	Users,
	BookOpen
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
	const Icon = ICON_MAP[name];
	if (!Icon) return null;
	return <Icon className={className} />;
}

// --- Component ---

interface DepartmentsClientProps {
	data: DepartmentsPageData;
}

export default function DepartmentsClient({ data }: DepartmentsClientProps) {
	const router = useRouter();
	const { departments } = data;

	const handleDepartmentClick = (department: Department) => {
		if (department.available) {
			router.push(`/departments/${department.id}`);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
			{/* Hero Section */}
			<div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Building2 className='w-12 h-12 mr-4' />
							<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
								Academic Departments
							</h1>
						</div>
						<p className='text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto'>
							Explore our diverse range of academic departments offering world-class education
						</p>
						<p className='text-lg text-blue-200 mt-4 max-w-2xl mx-auto'>
							Discover cutting-edge programs designed to prepare you for the future
						</p>
					</motion.div>
				</div>
			</div>

			{/* Departments Grid */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{departments.map((department, index) => (
						<motion.div
							key={department.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 ${
								department.available
									? 'hover:shadow-xl hover:scale-105 cursor-pointer'
									: 'opacity-75 cursor-not-allowed'
							}`}
							onClick={() => handleDepartmentClick(department)}>
							{/* Status Badge */}
							<div className='absolute top-4 right-4 z-10'>
								{department.available ? (
									<div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
										Available
									</div>
								) : (
									<div className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium'>
										Coming Soon
									</div>
								)}
							</div>

							{/* Department Header */}
							<div className={`${department.bgColor} p-6 relative`}>
								<div className='flex items-center gap-4'>
									<div className={`p-3 rounded-lg bg-white ${department.color}`}>
										<DynamicIcon name={department.iconName} className='w-8 h-8' />
									</div>
									<div className='flex-1'>
										<h3 className='text-xl font-bold text-gray-800'>{department.name}</h3>
										<p className='text-sm text-gray-600 mt-1'>{department.fullName}</p>
									</div>
									{department.available && (
										<ChevronRight className='w-6 h-6 text-gray-400' />
									)}
								</div>
							</div>

							{/* Department Content */}
							<div className='p-6'>
								<p className='text-gray-600 mb-6 leading-relaxed'>
									{department.description}
								</p>

								{/* Statistics */}
								<div className='grid grid-cols-3 gap-4 mb-6'>
									<div className='text-center'>
										<div className='flex items-center justify-center mb-2'>
											<Users className='w-5 h-5 text-blue-600' />
										</div>
										<div className='text-2xl font-bold text-gray-800'>{department.students}</div>
										<div className='text-sm text-gray-600'>Students</div>
									</div>
									<div className='text-center'>
										<div className='flex items-center justify-center mb-2'>
											<GraduationCap className='w-5 h-5 text-green-600' />
										</div>
										<div className='text-2xl font-bold text-gray-800'>{department.faculty}</div>
										<div className='text-sm text-gray-600'>Faculty</div>
									</div>
									<div className='text-center'>
										<div className='flex items-center justify-center mb-2'>
											<BookOpen className='w-5 h-5 text-purple-600' />
										</div>
										<div className='text-2xl font-bold text-gray-800'>{department.labs}</div>
										<div className='text-sm text-gray-600'>Labs</div>
									</div>
								</div>

								{/* Specializations */}
								{department.specializations && department.specializations.length > 0 && (
									<div className='mb-6'>
										<h4 className='font-semibold text-gray-800 mb-3'>Key Specializations</h4>
										<div className='flex flex-wrap gap-2'>
											{department.specializations.map((spec, idx) => (
												<span
													key={idx}
													className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'>
													{spec}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Action Button */}
								<div className='flex justify-center'>
									{department.available ? (
										<Button
											className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200 h-auto'
											trackingEvent='department_explore_clicked'
											trackingData={{ department: department.id, name: department.name }}>
											Explore Department
											<ChevronRight className='w-5 h-5' />
										</Button>
									) : (
										<div className='bg-gray-100 text-gray-500 px-6 py-3 rounded-lg font-medium flex items-center gap-2 cursor-not-allowed'>
											Page Under Development
										</div>
									)}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Information Section */}
			<div className='bg-gray-50 py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-800 mb-4'>Why Choose Our Departments?</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Our departments are designed to provide comprehensive education with industry-relevant curriculum and hands-on experience
						</p>
					</motion.div>

					<div className='grid md:grid-cols-3 gap-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.1 }}
							className='text-center'>
							<div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<BookOpen className='w-8 h-8 text-blue-600' />
							</div>
							<h3 className='text-xl font-bold text-gray-800 mb-2'>Industry-Aligned Curriculum</h3>
							<p className='text-gray-600'>
								Our curriculum is regularly updated to match industry standards and emerging technologies
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className='text-center'>
							<div className='bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Users className='w-8 h-8 text-green-600' />
							</div>
							<h3 className='text-xl font-bold text-gray-800 mb-2'>Expert Faculty</h3>
							<p className='text-gray-600'>
								Learn from experienced faculty members with both academic excellence and industry experience
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							className='text-center'>
							<div className='bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Building2 className='w-8 h-8 text-purple-600' />
							</div>
							<h3 className='text-xl font-bold text-gray-800 mb-2'>Modern Infrastructure</h3>
							<p className='text-gray-600'>
								State-of-the-art laboratories and facilities to support hands-on learning and research
							</p>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Contact Section */}
			<div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}>
						<h2 className='text-3xl font-bold mb-4'>Need More Information?</h2>
						<p className='text-xl text-blue-100 mb-8'>
							Contact our admissions team to learn more about our departments and programs
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<div className='bg-white/20 px-6 py-3 rounded-lg'>
								<p className='font-medium'>Academic Office</p>
								<p className='text-blue-100'>academics@bpit.ac.in</p>
							</div>
							<div className='bg-white/20 px-6 py-3 rounded-lg'>
								<p className='font-medium'>Phone</p>
								<p className='text-blue-100'>+91-11-2757-1101</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
