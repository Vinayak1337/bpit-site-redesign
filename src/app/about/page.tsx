'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Building2,
	Calendar,
	MapPin,
	Award,
	Users,
	BookOpen,
	GraduationCap,
	Globe,
	Trophy,
	Lightbulb
} from 'lucide-react';

import { aboutPageData } from '@/data/about';

interface AboutPageData {
	header: {
		title: string;
		subtitle: string;
		established: string;
		location: string;
		accreditation: string;
		affiliation: string;
	};
	stats: Array<{
		icon: string;
		value: string;
		label: string;
		color: string;
	}>;
	legacy: {
		title: string;
		paragraphs: string[];
	};
	features: Array<{
		icon: string;
		title: string;
		description: string;
		color: string;
	}>;
}

interface AboutPageProps {
	data: AboutPageData;
}

const getIcon = (iconName: string) => {
	const icons: { [key: string]: React.ReactNode } = {
		GraduationCap: <GraduationCap className='w-5 h-5' />,
		BookOpen: <BookOpen className='w-5 h-5' />,
		Trophy: <Trophy className='w-6 h-6' />,
		Lightbulb: <Lightbulb className='w-6 h-6' />,
		Users: <Users className='w-6 h-6' />
	};
	return icons[iconName] || <Building2 className='w-5 h-5' />;
};

const getColorClasses = (color: string) => {
	const colors: { [key: string]: { text: string; bg: string } } = {
		green: { text: 'text-green-600', bg: 'bg-green-100' },
		purple: { text: 'text-purple-600', bg: 'bg-purple-100' },
		blue: { text: 'text-blue-600', bg: 'bg-blue-100' }
	};
	return colors[color] || { text: 'text-gray-600', bg: 'bg-gray-100' };
};

const AboutPageWrapper = () => {
	return <AboutPage data={aboutPageData} />;
};

const AboutPage = ({ data }: AboutPageProps) => {
	return (
		<div className='space-y-8'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 pt-25 border border-blue-200'>
				<div className='flex items-center gap-4 mb-6'>
					<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center'>
						<Building2 className='w-8 h-8 text-white' />
					</div>
					<div>
						<h1 className='text-3xl font-bold text-gray-900'>
							{data.header.title}
						</h1>
						<p className='text-blue-600 font-medium'>
							{data.header.subtitle}
						</p>
					</div>
				</div>

				<div className='grid md:grid-cols-2 gap-6'>
					<div className='space-y-4'>
						<div className='flex items-center gap-3'>
							<Calendar className='w-5 h-5 text-blue-600' />
							<span className='text-gray-700'>Established: {data.header.established}</span>
						</div>
						<div className='flex items-center gap-3'>
							<MapPin className='w-5 h-5 text-blue-600' />
							<span className='text-gray-700'>Location: {data.header.location}</span>
						</div>
						<div className='flex items-center gap-3'>
							<Award className='w-5 h-5 text-blue-600' />
							<span className='text-gray-700'>Accreditation: {data.header.accreditation}</span>
						</div>
						<div className='flex items-center gap-3'>
							<Users className='w-5 h-5 text-blue-600' />
							<span className='text-gray-700'>Affiliation: {data.header.affiliation}</span>
						</div>
					</div>
					<div className='space-y-4'>
						{data.stats.map((stat, index) => {
							const colorClasses = getColorClasses(stat.color);
							return (
								<div key={index} className='bg-white rounded-lg p-4 shadow-sm'>
									<div className='flex items-center gap-2 mb-2'>
										<div className={colorClasses.text}>
											{getIcon(stat.icon)}
										</div>
										<span className='font-semibold text-gray-900'>{stat.value}</span>
									</div>
									<p className='text-sm text-gray-600'>{stat.label}</p>
								</div>
							);
						})}
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='space-y-6'>
				<h2 className='text-2xl font-bold text-gray-900 flex items-center gap-3'>
					<Globe className='w-6 h-6 text-blue-600' />
					{data.legacy.title}
				</h2>

				<div className='prose prose-lg text-gray-700 leading-relaxed'>
					{data.legacy.paragraphs.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>

				<div className='grid md:grid-cols-3 gap-6 mt-8'>
					{data.features.map((feature, index) => {
						const colorClasses = getColorClasses(feature.color);
						return (
							<motion.div
								key={index}
								whileHover={{ scale: 1.05 }}
								className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
								<div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-4`}>
									<div className={colorClasses.text}>
										{getIcon(feature.icon)}
									</div>
								</div>
								<h3 className='font-semibold text-gray-900 mb-2'>
									{feature.title}
								</h3>
								<p className='text-gray-600 text-sm'>
									{feature.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
};

export default AboutPageWrapper;
