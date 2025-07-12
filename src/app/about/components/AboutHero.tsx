'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
	return (
		<section className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>About BPIT</h1>
					<p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
						Discover our journey of excellence, vision, and commitment to
						engineering education
					</p>

					{/* Floating Elements */}
					<div className='absolute inset-0 overflow-hidden pointer-events-none'>
						<motion.div
							className='absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30'
							animate={{
								y: [0, -20, 0],
								opacity: [0.3, 1, 0.3]
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								delay: 0
							}}
						/>
						<motion.div
							className='absolute top-1/3 right-1/3 w-3 h-3 bg-blue-200 rounded-full opacity-40'
							animate={{
								y: [0, -30, 0],
								opacity: [0.4, 1, 0.4]
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								delay: 1
							}}
						/>
						<motion.div
							className='absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-30'
							animate={{
								y: [0, -25, 0],
								opacity: [0.3, 1, 0.3]
							}}
							transition={{
								duration: 3.5,
								repeat: Infinity,
								delay: 2
							}}
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutHero;
