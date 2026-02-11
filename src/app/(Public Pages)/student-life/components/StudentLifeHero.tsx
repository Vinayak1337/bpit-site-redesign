'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { StudentLifeHeroData } from '@/app/(Private Pages)/actions/student-life';

interface StudentLifeHeroProps {
	data: StudentLifeHeroData;
}

const StudentLifeHero = ({ data }: StudentLifeHeroProps) => {
	const backgroundStyles =
		data.backgroundImage && data.backgroundImage.length > 0
			? {
					backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.55)), url(${data.backgroundImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
			  }
			: undefined;

	return (
		<section
			className={`relative bg-gradient-to-r ${data.gradient || 'from-blue-600 to-purple-600'} text-white py-16`}
			style={backgroundStyles}>
			<div className='container mx-auto px-4 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>{data.title}</h1>
					<p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
						{data.subtitle}
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
					</div>
				</motion.div>
			</div>
			{backgroundStyles ? (
				<div className='absolute inset-0 bg-slate-900/40 pointer-events-none' />
			) : null}
		</section>
	);
};

export default StudentLifeHero;









