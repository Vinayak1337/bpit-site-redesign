'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ExaminationHeroData } from '@/app/(Private Pages)/actions/academia-examination';

interface Props {
	data: ExaminationHeroData;
}

const ExaminationHero = ({ data }: Props) => {
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
			className={`relative bg-gradient-to-r ${data.gradient || 'from-blue-600 to-blue-700'} text-white py-12 sm:py-16 md:py-20`}
			style={backgroundStyles}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center max-w-3xl mx-auto'>
					<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>
						{data.title}
					</h1>
					<p className='text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100'>
						{data.subtitle}
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default ExaminationHero;
