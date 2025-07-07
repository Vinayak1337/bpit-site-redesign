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
			className='space-y-8'>
			<div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200'>
				<div className='text-center mb-8'>
					<div className='w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Heart className='w-12 h-12 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						In Memory of Our Visionary Founder
					</h1>
					<p className='text-orange-600 font-medium'>
						Bhagwan Parshuram - The Divine Inspiration
					</p>
				</div>

				<div className='prose prose-lg text-gray-700 leading-relaxed max-w-none'>
					<p>
						Our institution draws its name and inspiration from Bhagwan
						Parshuram, the sixth avatar of Lord Vishnu, known for his unwavering
						dedication to righteousness and excellence. Just as Bhagwan
						Parshuram was a master of all sciences and arts, our institute
						strives to create well-rounded engineers who excel in both technical
						and human values.
					</p>

					<blockquote className='border-l-4 border-orange-500 pl-6 italic text-orange-800 bg-orange-50 p-4 rounded-r-lg'>
						&ldquo;Education is the most powerful weapon which you can use to
						change the world. Let us honor our founder&apos;s vision by pursuing
						knowledge with dedication and righteousness.&rdquo;
					</blockquote>

					<p>
						The values of discipline, dedication, and excellence that Bhagwan
						Parshuram embodied continue to guide our educational philosophy. We
						believe in nurturing not just skilled professionals, but ethical
						leaders who will contribute positively to society.
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-6 mt-8'>
					<div className='bg-white rounded-lg p-6 shadow-sm'>
						<h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
							<Star className='w-5 h-5 text-orange-600' />
							Core Values
						</h3>
						<ul className='space-y-2 text-gray-700'>
							<li>• Righteousness and Integrity</li>
							<li>• Excellence in Education</li>
							<li>• Dedication to Knowledge</li>
							<li>• Service to Society</li>
						</ul>
					</div>
					<div className='bg-white rounded-lg p-6 shadow-sm'>
						<h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
							<Trophy className='w-5 h-5 text-orange-600' />
							Our Commitment
						</h3>
						<ul className='space-y-2 text-gray-700'>
							<li>• Holistic Development</li>
							<li>• Ethical Leadership</li>
							<li>• Innovation & Research</li>
							<li>• Global Competence</li>
						</ul>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default FounderTributePage;
