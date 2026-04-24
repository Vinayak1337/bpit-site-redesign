'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	TrendingUp,
	Users,
	Building2,
	Award,
	Target,
	Briefcase,
	Star,
	CheckCircle,
	ArrowRight,
	Phone,
	Mail,
	MapPin,
	Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';

const iconMap = {
	TrendingUp,
	Users,
	Building2,
	Award,
	Target,
	Briefcase,
	Star,
	CheckCircle,
	ArrowRight,
	Phone,
	Mail,
	MapPin,
	Lightbulb
};

interface PlacementOverviewSectionProps {
	data: PlacementOverviewData;
}

export default function PlacementOverviewSection({
	data
}: PlacementOverviewSectionProps) {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
			{/* Hero Section */}
			<section
				className={`relative py-20 bg-gradient-to-r ${data.hero.gradient}`}>
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
							<div
								className={`p-4 ${data.hero.iconColor} backdrop-blur-sm rounded-2xl border border-white/20`}>
								{React.createElement(
									iconMap[data.hero.icon as keyof typeof iconMap] || Briefcase,
									{ className: 'w-12 h-12' }
								)}
							</div>
						</motion.div>

						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
							{data.hero.title}
						</h1>
						<p
							className={`text-base sm:text-lg md:text-xl lg:text-2xl ${data.hero.textColor} mb-8 leading-relaxed`}>
							{data.hero.subtitle}
						</p>
						<div className='w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full' />
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className='py-16 -mt-10 relative z-20'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{data.stats.map((stat, index) => {
							const IconComponent =
								iconMap[stat.icon as keyof typeof iconMap] || Target;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100'>
									<div
										className={`w-16 h-16 ${stat.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
										<IconComponent className='w-8 h-8' />
									</div>
									<h3
										className={`text-3xl font-bold ${stat.textColor} mb-2 text-center`}>
										{stat.value}
									</h3>
									<p className='text-gray-600 text-center font-medium'>
										{stat.label}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center max-w-4xl mx-auto mb-16'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
							{data.missionTitle}
						</h2>
						<p className='text-xl text-gray-600 leading-relaxed'>
							{data.missionDescription}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className='space-y-6'>
							<div className='prose prose-lg text-gray-700'>
								<p className='text-lg leading-relaxed'>
									{data.missionContent.paragraph1}
								</p>
								<p className='text-lg leading-relaxed'>
									{data.missionContent.paragraph2}
								</p>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								{data.missionContent.features.map((feature, index) => (
									<div key={index} className='flex items-center space-x-3'>
										<CheckCircle className='w-6 h-6 text-green-500' />
										<span className='text-gray-700 font-medium'>{feature}</span>
									</div>
								))}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className='relative'>
							<div className='bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-1'>
								<div className='bg-white rounded-2xl p-8 h-full'>
									<h3 className='text-2xl font-bold text-gray-900 mb-6'>
										Key Objectives
									</h3>
									<ul className='space-y-4'>
										{data.missionContent.objectives.map((objective, index) => (
											<motion.li
												key={index}
												initial={{ opacity: 0, x: 20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 }}
												className='flex items-center space-x-3'>
												<div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full' />
												<span className='text-gray-700'>{objective}</span>
											</motion.li>
										))}
									</ul>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
							{data.servicesTitle}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{data.servicesDescription}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{data.features.map((feature, index) => {
							const IconComponent =
								iconMap[feature.icon as keyof typeof iconMap] || Target;
							return (
								<motion.div
									key={feature.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg'>
									<div
										className={`w-16 h-16 bg-gradient-to-r ${feature.iconColor} rounded-2xl flex items-center justify-center mb-6 text-white`}>
										<IconComponent className='w-8 h-8' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900 mb-4'>
										{feature.title}
									</h3>
									<p className='text-gray-600 leading-relaxed'>
										{feature.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
							{data.teamTitle}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{data.teamDescription}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
						{data.teamMembers.map((member, index) => (
							<motion.div
								key={member.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center shadow-lg'>
								{member.image ? (
									<img
										src={member.image}
										alt={member.name}
										className='w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg'
									/>
								) : (
									<div
										className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-lg ${
											member.gradientColor ||
											'bg-gradient-to-br from-blue-500 to-blue-600'
										}`}>
										<span
											className={`text-2xl font-bold ${
												member.textColor || 'text-white'
											}`}>
											{member.initials ||
												member.name
													.split(' ')
													.map(n => n[0])
													.join('')
													.toUpperCase()}
										</span>
									</div>
								)}
								<h3 className='text-2xl font-bold text-gray-900 mb-2'>
									{member.name}
								</h3>
								<p className='text-blue-600 font-semibold mb-4'>
									{member.position}
								</p>
								<div className='flex items-center justify-center space-x-2 text-gray-600'>
									<Mail className='w-4 h-4' />
									<span className='text-sm'>{member.email}</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Technical Training Section */}
			<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
							{data.trainingTitle}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{data.trainingDescription}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{data.trainingAreas.map((area, index) => {
							const IconComponent =
								iconMap[area.icon as keyof typeof iconMap] || Users;
							return (
								<motion.div
									key={area.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg'>
									<div
										className={`w-16 h-16 bg-gradient-to-r ${area.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
										<IconComponent className='w-8 h-8' />
									</div>
									<h3 className='text-xl font-bold text-gray-900 mb-4 text-center'>
										{area.title}
									</h3>
									<ul className='space-y-2'>
										{area.skills.map((skill, skillIndex) => (
											<li
												key={skillIndex}
												className='flex items-center space-x-2'>
												<CheckCircle className='w-4 h-4 text-blue-600 flex-shrink-0' />
												<span className='text-sm text-gray-700'>{skill}</span>
											</li>
										))}
									</ul>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Achievements Section */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
							{data.achievementsTitle}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{data.achievementsDescription}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{data.achievements.map((achievement, index) => {
							const IconComponent =
								iconMap[achievement.icon as keyof typeof iconMap] || Award;
							return (
								<motion.div
									key={achievement.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center'>
									<div
										className={`w-16 h-16 bg-gradient-to-r ${achievement.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
										<IconComponent className='w-8 h-8' />
									</div>
									<div className='mb-4'>
										<span
											className={`inline-block px-3 py-1 ${achievement.categoryColor} text-xs font-semibold rounded-full mb-3`}>
											{achievement.category}
										</span>
										<h3 className='text-xl font-bold text-gray-900 mb-2'>
											{achievement.title}
										</h3>
										<div
											className={`text-2xl font-bold ${achievement.highlightColor} mb-2`}>
											{achievement.highlight}
										</div>
										<p className='text-sm text-gray-500 mb-2'>
											{achievement.department}
										</p>
									</div>
									<p className='text-gray-600 leading-relaxed text-sm'>
										{achievement.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Placement Highlights */}
			<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
							{data.highlightsTitle}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{data.highlightsDescription}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{data.highlights.map((dept, index) => (
							<motion.div
								key={dept.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='bg-white rounded-2xl p-6 shadow-lg text-center'>
								<div
									className={`w-12 h-12 bg-gradient-to-r ${dept.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}>
									{dept.initials}
								</div>
								<h3 className='text-lg font-bold text-gray-900 mb-4'>
									{dept.department}
								</h3>
								<div className='space-y-2'>
									<div>
										<p className='text-xs text-gray-500'>Highest Package</p>
										<p className='text-lg font-bold text-green-600'>
											{dept.maxPackage}
										</p>
									</div>
									<div>
										<p className='text-xs text-gray-500'>Average Package</p>
										<p className='text-lg font-bold text-blue-600'>
											{dept.avgPackage}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className='py-20 bg-gradient-to-r from-blue-900 to-blue-800'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center text-white'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
							{data.contactTitle}
						</h2>
						<p className='text-xl text-blue-200 mb-12 max-w-3xl mx-auto'>
							{data.contactDescription}
						</p>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
							{data.contacts.map((contact, index) => {
								const IconComponent =
									iconMap[contact.icon as keyof typeof iconMap] || Phone;
								return (
									<div key={index} className='flex flex-col items-center'>
										<div
											className={`w-16 h-16 ${contact.iconColor} backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4`}>
											<IconComponent className='w-8 h-8' />
										</div>
										<h3 className='text-xl font-semibold mb-2'>
											{contact.title}
										</h3>
										<p className={contact.textColor}>{contact.value}</p>
									</div>
								);
							})}
						</div>

						<Button
							size='lg'
							className='bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group'>
							{data.contactButtonText}
							<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
						</Button>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
