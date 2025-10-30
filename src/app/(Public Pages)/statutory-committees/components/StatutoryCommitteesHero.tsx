'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star } from 'lucide-react';

const StatutoryCommitteesHero = () => {
	return (
		<section className='relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white overflow-hidden'>
			<div className='absolute inset-0 bg-black/20'></div>
			<div className='absolute inset-0'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl'></div>
				<div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl'></div>
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
						<Shield className='w-10 h-10 text-white' />
					</motion.div>

					<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100'>
						Statutory Committees
					</h1>

					<p className='text-xl md:text-2xl text-green-100 mb-8 leading-relaxed'>
						Ensuring Quality, Safety, and Compliance in Educational Excellence
					</p>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='flex flex-wrap justify-center gap-4 text-sm'>
						<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
							<Star className='w-4 h-4 text-yellow-300' />
							<span>Quality Assurance</span>
						</div>
						<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
							<Star className='w-4 h-4 text-yellow-300' />
							<span>Student Safety</span>
						</div>
						<div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
							<Star className='w-4 h-4 text-yellow-300' />
							<span>Regulatory Compliance</span>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default StatutoryCommitteesHero;
