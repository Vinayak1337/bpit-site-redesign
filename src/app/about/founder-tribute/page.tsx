'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Trophy } from 'lucide-react';

const FounderTributePage = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='space-y-6 sm:space-y-8'>
			<div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-orange-200'>
				<div className='text-center mb-6 sm:mb-8'>
					<div className='w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
						<Heart className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-white' />
					</div>
					<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
						In Memory of Our Visionary Founder
					</h1>
					<p className='text-orange-600 font-medium text-sm sm:text-base'>
						Bhagwan Parshuram - The Divine Inspiration
					</p>
				</div>

				<div className='prose prose-sm sm:prose-lg text-gray-700 leading-relaxed max-w-none'>
					<p className='text-sm sm:text-base mb-3 sm:mb-4'>
						Our institution draws its name and inspiration from Bhagwan
						Parshuram, the sixth avatar of Lord Vishnu, known for his unwavering
						dedication to righteousness and excellence. Just as Bhagwan
						Parshuram was a master of all sciences and arts, our institute
						strives to create well-rounded engineers who excel in both technical
						and human values.
					</p>

					<blockquote className='border-l-4 border-orange-500 pl-4 sm:pl-6 italic text-orange-800 bg-orange-50 p-3 sm:p-4 rounded-r-lg text-sm sm:text-base mb-3 sm:mb-4'>
						&ldquo;Education is the most powerful weapon which you can use to
						change the world. Let us honor our founder&apos;s vision by pursuing
						knowledge with dedication and righteousness.&rdquo;
					</blockquote>

					<p className='text-sm sm:text-base mb-4 sm:mb-6'>
						The values of discipline, dedication, and excellence that Bhagwan
						Parshuram embodied continue to guide our educational philosophy. We
						believe in nurturing not just skilled professionals, but ethical
						leaders who will contribute positively to society.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8'>
					<div className='bg-white rounded-lg p-4 sm:p-6 shadow-sm'>
						<h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base'>
							<Star className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0' />
							Core Values
						</h3>
						<ul className='space-y-2 text-gray-700'>
							<li className='text-xs sm:text-sm'>
								• Righteousness and Integrity
							</li>
							<li className='text-xs sm:text-sm'>• Excellence in Education</li>
							<li className='text-xs sm:text-sm'>• Dedication to Knowledge</li>
							<li className='text-xs sm:text-sm'>• Service to Society</li>
						</ul>
					</div>
					<div className='bg-white rounded-lg p-4 sm:p-6 shadow-sm'>
						<h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base'>
							<Trophy className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0' />
							Our Commitment
						</h3>
						<ul className='space-y-2 text-gray-700'>
							<li className='text-xs sm:text-sm'>• Holistic Development</li>
							<li className='text-xs sm:text-sm'>• Ethical Leadership</li>
							<li className='text-xs sm:text-sm'>• Innovation & Research</li>
							<li className='text-xs sm:text-sm'>• Global Competence</li>
						</ul>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default FounderTributePage;
