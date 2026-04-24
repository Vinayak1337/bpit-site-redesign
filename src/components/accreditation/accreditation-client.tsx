'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Award,
	Shield,
	CheckCircle,
	Star,
	Target,
	Trophy,
	Calendar,
	FileText,
	Users,
	BookOpen,
	TrendingUp,
	Globe,
	type LucideIcon
} from 'lucide-react';
import type { AccreditationData } from '@/app/(Private Pages)/actions/accreditation';

// --- Icon map ---

const ICON_MAP: Record<string, LucideIcon> = {
	Award,
	Shield,
	CheckCircle,
	Star,
	Target,
	Trophy,
	Calendar,
	FileText,
	Users,
	BookOpen,
	TrendingUp,
	Globe
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
	const Icon = ICON_MAP[name];
	if (!Icon) return null;
	return <Icon className={className} />;
}

// --- Color scheme maps ---

const CARD_COLORS: Record<string, { badge: string; bg: string; checkColor: string; titleColor: string; descColor: string; headerBg: string }> = {
	blue: {
		badge: 'bg-blue-50',
		bg: 'bg-blue-100',
		checkColor: 'text-blue-600',
		titleColor: 'text-blue-800',
		descColor: 'text-blue-700',
		headerBg: 'bg-blue-100'
	},
	purple: {
		badge: 'bg-purple-50',
		bg: 'bg-purple-100',
		checkColor: 'text-purple-600',
		titleColor: 'text-purple-800',
		descColor: 'text-purple-700',
		headerBg: 'bg-purple-100'
	},
	green: {
		badge: 'bg-green-50',
		bg: 'bg-green-100',
		checkColor: 'text-green-600',
		titleColor: 'text-green-800',
		descColor: 'text-green-700',
		headerBg: 'bg-green-100'
	},
	orange: {
		badge: 'bg-orange-50',
		bg: 'bg-orange-100',
		checkColor: 'text-orange-600',
		titleColor: 'text-orange-800',
		descColor: 'text-orange-700',
		headerBg: 'bg-orange-100'
	}
};

const BENEFIT_COLORS: Record<string, { icon: string; bg: string }> = {
	blue: { icon: 'text-blue-600', bg: 'bg-blue-100' },
	green: { icon: 'text-green-600', bg: 'bg-green-100' },
	purple: { icon: 'text-purple-600', bg: 'bg-purple-100' },
	orange: { icon: 'text-orange-600', bg: 'bg-orange-100' }
};

const GOAL_COLORS: Record<string, string> = {
	blue: 'bg-blue-50 text-blue-700',
	green: 'bg-green-50 text-green-700',
	purple: 'bg-purple-50 text-purple-700',
	orange: 'bg-orange-50 text-orange-700'
};

// --- Component ---

interface AccreditationClientProps {
	data: AccreditationData;
}

const AccreditationClient = ({ data }: AccreditationClientProps) => {
	const { hero, intro, cards, benefits, compliance, future } = data;

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl'></div>
					<div className='absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl'></div>
				</div>

				<div className='relative z-10 container mx-auto px-4 py-24'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center max-w-4xl mx-auto'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm'>
							<Award className='w-10 h-10 text-white' />
						</motion.div>

						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100'>
							{hero.title}
						</h1>

						<p className='text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 mb-8 leading-relaxed'>
							{hero.subtitle}
						</p>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='flex flex-wrap justify-center gap-4 text-sm'>
							{hero.badges.map((badge, index) => (
								<div key={index} className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
									<Star className='w-4 h-4 text-yellow-300' />
									<span>{badge.label}</span>
								</div>
							))}
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-12'>
				<div className='max-w-6xl mx-auto space-y-12'>
					{/* Introduction */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'>
						<div className='text-center mb-8'>
							<div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
								<Shield className='w-8 h-8 text-green-600' />
							</div>
							<h2 className='text-3xl font-bold text-gray-900 mb-4'>{intro.title}</h2>
							<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
								{intro.description}
							</p>
						</div>
					</motion.div>

					{/* Accreditation Cards */}
					<div className='grid md:grid-cols-3 gap-8'>
						{cards.map((card, index) => {
							const colors = CARD_COLORS[card.colorScheme] ?? CARD_COLORS.blue;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
									className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'>
									<div className='text-center mb-6'>
										<div className={`w-16 h-16 ${colors.headerBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
											<DynamicIcon name={card.icon} className={`w-8 h-8 ${colors.checkColor}`} />
										</div>
										<h3 className='text-2xl font-bold text-gray-900 mb-2'>{card.name}</h3>
										<p className={`${colors.checkColor} font-medium`}>{card.fullName}</p>
									</div>

									<div className='space-y-4'>
										<div className={`${colors.badge} rounded-lg p-4`}>
											<div className='flex items-center gap-2 mb-2'>
												<CheckCircle className={`w-5 h-5 ${colors.checkColor}`} />
												<span className={`font-semibold ${colors.titleColor}`}>{card.badgeTitle}</span>
											</div>
											<p className={`text-sm ${colors.descColor}`}>
												{card.badgeDescription}
											</p>
										</div>

										<div className='space-y-2'>
											<div className='flex items-center gap-2 text-sm text-gray-600'>
												<Calendar className='w-4 h-4' />
												<span>Accredited: {card.accreditedYear}</span>
											</div>
											<div className='flex items-center gap-2 text-sm text-gray-600'>
												<Target className='w-4 h-4' />
												<span>Valid Until: {card.validUntil}</span>
											</div>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>

					{/* Benefits Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'>
						<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>Benefits of Accreditation</h3>

						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{benefits.map((benefit, index) => {
								const colors = BENEFIT_COLORS[benefit.colorScheme] ?? BENEFIT_COLORS.blue;
								return (
									<div key={index} className='text-center'>
										<div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
											<DynamicIcon name={benefit.icon} className={`w-6 h-6 ${colors.icon}`} />
										</div>
										<h4 className='font-semibold text-gray-900 mb-2'>{benefit.title}</h4>
										<p className='text-sm text-gray-600'>{benefit.description}</p>
									</div>
								);
							})}
						</div>
					</motion.div>

					{/* Compliance & Standards */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className='bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200'>
						<div className='text-center mb-8'>
							<h3 className='text-2xl font-bold text-gray-900 mb-4'>{compliance.title}</h3>
							<p className='text-gray-600 max-w-3xl mx-auto'>{compliance.description}</p>
						</div>

						<div className='grid md:grid-cols-2 gap-8'>
							{compliance.groups.map((group, index) => (
								<div key={index} className='bg-white rounded-xl p-6 shadow-sm'>
									<h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
										<DynamicIcon name={group.icon} className='w-5 h-5 text-blue-600' />
										{group.title}
									</h4>
									<ul className='space-y-2 text-gray-600'>
										{group.items.map((item, itemIndex) => (
											<li key={itemIndex} className='flex items-start gap-2'>
												<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</motion.div>

					{/* Future Goals */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center'>
						<div className='w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Target className='w-8 h-8 text-white' />
						</div>
						<h3 className='text-2xl font-bold text-gray-900 mb-4'>{future.title}</h3>
						<p className='text-gray-600 mb-6 max-w-3xl mx-auto'>{future.description}</p>

						<div className='flex flex-wrap justify-center gap-4'>
							{future.goals.map((goal, index) => (
								<div key={index} className={`rounded-lg px-4 py-2 ${GOAL_COLORS[goal.colorScheme] ?? GOAL_COLORS.blue}`}>
									<span className='font-medium'>{goal.label}</span>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default AccreditationClient;
