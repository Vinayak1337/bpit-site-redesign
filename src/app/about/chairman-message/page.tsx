'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const ChairmanMessagePage = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='space-y-8'>
			<div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200'>
				<div className='flex items-start gap-6 mb-8'>
					<div className='w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
						<MessageSquare className='w-10 h-10 text-white' />
					</div>
					<div>
						<h1 className='text-3xl font-bold text-gray-900 mb-2'>
							Chairman&apos;s Message
						</h1>
						<p className='text-purple-600 font-medium'>
							A Vision for Excellence in Engineering Education
						</p>
					</div>
				</div>

				<div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
					<div className='prose prose-lg text-gray-700 leading-relaxed max-w-none'>
						<p className='text-lg font-medium text-purple-800 mb-4'>
							&ldquo;Dear Students, Faculty, and Stakeholders,&rdquo;
						</p>

						<p>
							It gives me immense pleasure to welcome you to Bhagwan
							Parshuram Institute of Technology, an institution that has
							been at the forefront of engineering education since 2007. Our
							journey has been one of continuous growth, innovation, and
							excellence.
						</p>

						<p>
							At BPIT, we believe that education is not just about imparting
							knowledge, but about shaping future leaders who will drive
							technological advancement and social progress. Our commitment
							extends beyond traditional classroom learning to encompass
							research, innovation, and industry collaboration.
						</p>

						<p>
							We have consistently maintained our focus on providing
							world-class infrastructure, distinguished faculty, and an
							environment that encourages creativity and critical thinking.
							Our NBA accreditation and strong industry partnerships are
							testament to our unwavering commitment to quality education.
						</p>

						<p>
							As we move forward, we remain dedicated to our mission of
							producing competent engineers who are not only technically
							proficient but also ethically grounded and socially
							responsible. I encourage all our students to make the most of
							the opportunities available at BPIT and emerge as leaders in
							their chosen fields.
						</p>

						<p className='font-medium text-purple-800 mt-6'>
							Wishing you all success in your academic and professional
							endeavors.
						</p>

						<div className='mt-6 pt-4 border-t border-gray-200'>
							<p className='font-semibold text-gray-900'>
								Dr. [Chairman Name]
							</p>
							<p className='text-purple-600'>Chairman, BPIT</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ChairmanMessagePage; 