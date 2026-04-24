'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Users,
	Target,
	Award,
	BookOpen,
	Lightbulb,
	CheckCircle,
	Quote,
	MessageCircle,
	Calendar,
	TrendingUp,
	Star
} from 'lucide-react';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

interface TrainingPlacementSectionProps {
	data: TrainingPlacementData | null;
}

const iconMap: Record<string, React.ComponentType<any>> = {
	Users,
	Target,
	Award,
	BookOpen,
	Lightbulb,
	CheckCircle,
	Quote,
	MessageCircle,
	Calendar,
	TrendingUp,
	Star
};

export default function TrainingPlacementSection({
	data
}: TrainingPlacementSectionProps) {
	if (!data) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center'>
				<p className='text-gray-500'>No training and placement data available.</p>
			</div>
		);
	}

	const getIcon = (iconName: string) => {
		return iconMap[iconName] || Users;
	};

	const getColorClasses = (color: string) => {
		const colorMap: Record<string, string> = {
			blue: 'from-blue-500 to-cyan-600',
			green: 'from-green-500 to-emerald-600',
			purple: 'from-purple-500 to-violet-600',
			orange: 'from-orange-500 to-red-600'
		};
		return colorMap[color] || 'from-blue-500 to-cyan-600';
	};

	const HeroIcon = data.hero?.icon ? getIcon(data.hero.icon) : Users;

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
			{/* Hero Section */}
			<section
				className={`relative py-20 bg-gradient-to-r ${data.hero?.gradient || 'from-blue-900 via-blue-800 to-blue-900'}`}>
				<div className='relative z-10 container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center text-white max-w-4xl mx-auto'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
							className='flex justify-center mb-6'>
							<div className='p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20'>
								<HeroIcon className='w-12 h-12' />
							</div>
						</motion.div>

						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
							{data.hero?.title || 'About Training & Placement'}
						</h1>
						<p className='text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 mb-8 leading-relaxed'>
							{data.hero?.subtitle ||
								'Empowering students with industry-ready skills and career opportunities'}
						</p>
						<div className='w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full' />
					</motion.div>
				</div>
			</section>

			{/* Director's Message */}
			{data.directorMessage && (
				<section className='py-20 bg-white -mt-10 relative z-20'>
					<div className='container mx-auto px-4'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='max-w-6xl mx-auto'>
							<div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 shadow-xl'>
								<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center'>
									<div className='lg:col-span-1'>
									<motion.div
										initial={{ scale: 0.8, opacity: 0 }}
										whileInView={{ scale: 1, opacity: 1 }}
										transition={{ duration: 0.6 }}
										className='relative'>
										{data.directorMessage.image ? (
											<img
												src={data.directorMessage.image}
												alt={data.directorMessage.name}
												className='w-48 h-48 mx-auto rounded-full object-cover shadow-2xl border-4 border-white'
											/>
										) : (
											<img
												src='/avatar-default.svg'
												alt={data.directorMessage.name}
												className='w-48 h-48 mx-auto rounded-full object-cover shadow-2xl border-4 border-white bg-blue-500'
											/>
										)}
										<div className='absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center'>
											<Quote className='w-6 h-6 text-yellow-800' />
										</div>
									</motion.div>
									</div>

									<div className='lg:col-span-2 space-y-6'>
										<div>
											<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
												Message from T&P Head
											</h2>
											<p className='text-xl text-blue-600 font-semibold'>
												{data.directorMessage.name}
											</p>
											<p className='text-gray-600'>
												{data.directorMessage.position}
											</p>
										</div>

										<div className='prose prose-lg text-gray-700'>
											<p className='text-lg leading-relaxed italic'>
												"{data.directorMessage.message1}"
											</p>
											<p className='text-lg leading-relaxed'>
												"{data.directorMessage.message2}"
											</p>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* T&P Team Section */}
			{data.teamMembers && data.teamMembers.length > 0 && (
				<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
					<div className='container mx-auto px-4'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='text-center mb-16'>
							<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
								{data.teamTitle || 'Our Dedicated Team'}
							</h2>
							<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
								{data.teamDescription ||
									'Meet the professionals who make career dreams a reality'}
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
							{data.teamMembers.map((member, index) => (
								<motion.div
									key={member.id || index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg h-full'>
									<div className='flex items-start space-x-8 h-full'>
										<div className='flex-shrink-0'>
											{member.image ? (
												<img
													src={member.image}
													alt={member.name}
													className='w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg'
												/>
											) : (
												<img
													src='/avatar-default.svg'
													alt={member.name}
													className='w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg bg-blue-500'
												/>
											)}
										</div>
										<div className='flex-1 min-w-0'>
											<h3 className='text-2xl font-bold text-gray-900 mb-2 break-words'>
												{member.name}
											</h3>
											<p className='text-blue-600 font-semibold mb-3 break-words'>
												{member.position}
											</p>
											<p className='text-gray-600 mb-3 text-sm leading-relaxed'>
												{member.qualifications}
											</p>
											<div className='flex items-start space-x-2'>
												<Star className='w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0' />
												<span className='text-sm text-gray-700 font-medium break-words'>
													{member.specialization}
												</span>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Department Details */}
			{data.departments && data.departments.length > 0 && (
				<section className='py-20 bg-white'>
					<div className='container mx-auto px-4'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='text-center mb-16'>
							<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
								{data.departmentsTitle ||
									'Department-wise Placement Coordinators'}
							</h2>
							<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
								{data.departmentsDescription ||
									"Specialized support for each department's unique placement needs"}
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{data.departments.map((dept, index) => (
								<motion.div
									key={dept.id || index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100'>
									<div className='flex items-start justify-between mb-6'>
										<div>
											<div className='inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-sm font-bold mb-3'>
												{dept.code}
											</div>
											<h3 className='text-2xl font-bold text-gray-900 mb-2'>
												{dept.name}
											</h3>
											<p className='text-blue-600 font-semibold'>
												Coordinator: {dept.coordinator}
											</p>
										</div>
										<div className='text-right'>
											<p className='text-2xl font-bold text-gray-900'>
												{dept.avgPackage}
											</p>
											<p className='text-sm text-gray-600'>Avg. Package</p>
										</div>
									</div>

									<div className='space-y-4'>
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>
												Top Recruiters:
											</h4>
											<p className='text-gray-600 text-sm'>{dept.companies}</p>
										</div>

										<div className='pt-4 border-t border-gray-200'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center space-x-2'>
													<TrendingUp className='w-5 h-5 text-green-500' />
													<span className='text-sm font-medium text-gray-700'>
														Placement Rate
													</span>
												</div>
												<span className='text-lg font-bold text-green-600'>
													{dept.placementRate}
												</span>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Training Programs */}
			{data.trainingPrograms && data.trainingPrograms.length > 0 && (
				<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
					<div className='container mx-auto px-4'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='text-center mb-16'>
							<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
								{data.trainingTitle || 'Training Programs'}
							</h2>
							<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
								{data.trainingDescription ||
									'Comprehensive training modules to enhance student employability'}
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{data.trainingPrograms.map((program, index) => {
								const ProgramIcon = getIcon(program.icon);
								return (
									<motion.div
										key={program.id || index}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										className='bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg'>
										<div
											className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(program.color)} rounded-2xl flex items-center justify-center mb-6 text-white`}>
											<ProgramIcon className='w-8 h-8' />
										</div>

										<h3 className='text-2xl font-bold text-gray-900 mb-4'>
											{program.title}
										</h3>
										<p className='text-gray-600 mb-6 leading-relaxed'>
											{program.description}
										</p>

										<div className='grid grid-cols-2 gap-4'>
											<div className='flex items-center space-x-2'>
												<Calendar className='w-5 h-5 text-gray-400' />
												<div>
													<p className='text-sm text-gray-500'>Duration</p>
													<p className='font-semibold text-gray-900'>
														{program.duration}
													</p>
												</div>
											</div>
											<div className='flex items-center space-x-2'>
												<Users className='w-5 h-5 text-gray-400' />
												<div>
													<p className='text-sm text-gray-500'>Participants</p>
													<p className='font-semibold text-gray-900'>
														{program.participants}
													</p>
												</div>
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>
			)}

			{/* T&P Cell Objectives */}
			{data.objectives && data.objectives.length > 0 && (
				<section className='py-20 bg-white'>
					<div className='container mx-auto px-4'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='text-center mb-16'>
							<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
								{data.objectivesTitle || 'T&P Cell Objectives'}
							</h2>
							<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
								{data.objectivesDescription ||
									'Our primary focus areas for student development and placement success'}
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{data.objectives.map((objective, index) => {
								const ObjectiveIcon = getIcon(objective.icon);
								return (
									<motion.div
										key={objective.id || index}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-lg'>
										<div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white'>
											<ObjectiveIcon className='w-8 h-8' />
										</div>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>
											{objective.title}
										</h3>
										<p className='text-gray-600 leading-relaxed'>
											{objective.description}
										</p>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>
			)}

			{/* Key Statistics */}
			{data.statistics && data.statistics.length > 0 && (
				<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
					<div className='container mx-auto px-4'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='text-center mb-16'>
							<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
								{data.statisticsTitle || 'Our Success Metrics'}
							</h2>
							<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
								{data.statisticsDescription ||
									'Placement statistics that showcase our commitment to student success'}
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
							{data.statistics.map((stat, index) => (
								<motion.div
									key={stat.id || index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-lg'>
									<div className='text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2'>
										{stat.number}
									</div>
									<div className='text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1'>
										{stat.label}
									</div>
									<div className='text-sm text-gray-600'>{stat.sublabel}</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
