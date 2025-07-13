'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Company {
	name: string;
	logo: string;
}

interface Statistic {
	value: string;
	label: string;
}

interface PlacementCompaniesData {
	title: string;
	subtitle: string;
	companies: Company[];
	statistics: Statistic[];
}

interface PlacementCompaniesProps {
	data: PlacementCompaniesData;
}

const PlacementCompanies = ({ data }: PlacementCompaniesProps) => {
	// Duplicate the array for seamless infinite scroll
	const duplicatedCompanies = [...data.companies, ...data.companies];

	return (
		<section className='py-16 bg-gray-50 overflow-hidden'>
			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<div className='text-center mb-12'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
						{data.title}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className='text-lg text-gray-600 max-w-2xl mx-auto'>
						{data.subtitle}
					</motion.p>
				</div>

				{/* Infinite Scrolling Companies */}
				<div className='relative'>
					<div className='overflow-hidden'>
						<motion.div
							className='flex space-x-12'
							animate={{
								x: [0, -1200]
							}}
							transition={{
								x: {
									repeat: Infinity,
									repeatType: 'loop',
									duration: 25,
									ease: 'linear'
								}
							}}>
							{duplicatedCompanies.map((company, index) => (
								<motion.div
									key={`${company.name}-${index}`}
									className='flex-shrink-0 flex items-center justify-center w-40 h-20 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group'
									whileHover={{ scale: 1.05 }}>
									<Image
										src={company.logo}
										alt={`${company.name} logo`}
										width={128}
										height={64}
										className='object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100'
										onError={() => {
											// Fallback handled by Next.js Image component
											console.log(`Failed to load logo for ${company.name}`);
										}}
									/>
								</motion.div>
							))}
						</motion.div>
					</div>

					{/* Gradient Fade Effect */}
					<div className='absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10'></div>
					<div className='absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10'></div>
				</div>

				{/* Statistics */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto'>
					{data.statistics.map((stat, index) => (
						<div key={index} className='text-center'>
							<div className='text-2xl md:text-3xl font-bold text-blue-600 mb-2'>
								{stat.value}
							</div>
							<div className='text-sm text-gray-600'>{stat.label}</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default PlacementCompanies;
