'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, Target } from 'lucide-react';
import AnimatedProfileCard from '@/app/management/components/AnimatedProfileCard';

const ManagementPage = () => {
	return (
		<div className='space-y-8'>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200'>
				<div className='text-center mb-8'>
					<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
						<Users className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>Management</h1>
				</div>
			</motion.div>

			{/* Leadership Profiles */}
			<div className='space-y-8'>
				{/* Shri Vinod Vats - Chairman */}
				<AnimatedProfileCard delay={0.1}>
					<div className='flex flex-col md:flex-row gap-6 items-start'>
						<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
							<User className='w-16 h-16 text-gray-400' />
						</div>

						<div className='flex-1'>
							<div className='mb-4'>
								<h3 className='text-xl font-bold text-gray-900'>
									Shri Vinod Vats
								</h3>
								<p className='text-blue-600 font-medium'>Chairman</p>
							</div>

							<div className='prose prose-gray max-w-none text-sm'>
								<p className='text-gray-700 leading-relaxed mb-3'>
									Shri Vinod Vats is the Chairman of Bhagwan Parshuram Institute
									of Technology and also the President of Bharatiya
									Brahmin&apos;s Charitable Trust. Being a visionary and a great
									social leader, he has played a vital role in the development
									of the institute. His endeavour for furthering and championing
									the cause of excellence in technical and higher education with
									a view to training and bringing up the future skilled
									engineers in diverse fields of Technology and management has
									inspired millions.
								</p>
								<p className='text-gray-700 leading-relaxed'>
									This Institute was established under his dynamic Leadership.
									Presently as the President of the Management Committee and a
									member of the Bharatiya Technical Educational Society (BTES),
									he has been professional, educational and rational. Shri Vinod
									Vats has gained a prominent position as one for his exemplary
									social works and his key contributions to work in social span
									areas, and these include his entire life into contributing to
									the strong self-power.
								</p>
							</div>
						</div>
					</div>
				</AnimatedProfileCard>

				{/* Shri Surender Sharma */}
				<AnimatedProfileCard delay={0.2}>
					<div className='flex flex-col md:flex-row gap-6 items-start'>
						<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
							<User className='w-16 h-16 text-gray-400' />
						</div>

						<div className='flex-1'>
							<div className='mb-4'>
								<h3 className='text-xl font-bold text-gray-900'>
									Shri Surender Sharma
								</h3>
								<p className='text-blue-600 font-medium'>Vice President</p>
							</div>

							<div className='prose prose-gray max-w-none text-sm'>
								<p className='text-gray-700 leading-relaxed mb-3'>
									Padma Shri, Surender Sharma is the Vice President of Bhagwan
									Parshuram Institute of Technology as well as Bharatiya
									Brahmin&apos;s Charitable Trust. He is a popular renowned
									Hindi poet-chronicler across the globe. His phenomenal
									success-story and charismatic social service and the President
									of BPCT&apos;s Scholarship Trust.
								</p>
								<p className='text-gray-700 leading-relaxed'>
									He has been bestowed with honours. His prominent social
									service and humanitarian work has earned a widespread
									recognition globally which includes a title &lsquo;Padma
									Shri&rsquo;, Bharatiya Jyoti Award from the government of
									India in 2015. He is known nationwide for his inspiring
									literary and literary works, he has also served with
									distinction as CPIO minister and corporation counselor.
								</p>
							</div>
						</div>
					</div>
				</AnimatedProfileCard>

				{/* Shri Ram Babu Sharma */}
				<AnimatedProfileCard delay={0.3}>
					<div className='flex flex-col md:flex-row gap-6 items-start'>
						<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
							<User className='w-16 h-16 text-gray-400' />
						</div>

						<div className='flex-1'>
							<div className='mb-4'>
								<h3 className='text-xl font-bold text-gray-900'>
									Shri Ram Babu Sharma
								</h3>
								<p className='text-blue-600 font-medium'>General Secretary</p>
							</div>

							<div className='prose prose-gray max-w-none text-sm'>
								<p className='text-gray-700 leading-relaxed mb-3'>
									Shri Ram Babu Sharma is the General Secretary of Bhagwan
									Parshuram Institute of Technology and Bharatiya Brahmin&apos;s
									Charitable Trust. He has been associated with various social
									religious and sports organisations. He was a member of the
									Hotel Federation of Northern India. He is president of Shri
									Shasta Pavilion, a social organisation engaged in providing
									free schools and free coaching to underprivileged children.
								</p>
								<p className='text-gray-700 leading-relaxed'>
									He is also in the consultant body of Satish Chandra Fertilizer
									Kohar in Darbhanga (Delhi). His vision of this institute is to
									develop a world-class perspective to college with the
									fast-changing technological scenario.
								</p>
							</div>
						</div>
					</div>
				</AnimatedProfileCard>

				{/* Shri Shambhu Sharma */}
				<AnimatedProfileCard delay={0.4}>
					<div className='flex flex-col md:flex-row gap-6 items-start'>
						<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
							<User className='w-16 h-16 text-gray-400' />
						</div>

						<div className='flex-1'>
							<div className='mb-4'>
								<h3 className='text-xl font-bold text-gray-900'>
									Shri Shambhu Sharma
								</h3>
								<p className='text-blue-600 font-medium'>Secretary</p>
							</div>

							<div className='prose prose-gray max-w-none text-sm'>
								<p className='text-gray-700 leading-relaxed mb-3'>
									Shri Shambhu Sharma is the Secretary of Bhagwan Parshuram
									Institute of Technology. He is the General Secretary of Global
									Bharatiya Mahakumbh at a received an one of the concerned
									letters Law Pandit Maulavi Sharma. Former national President
									of Akhil Bharatiya Brahmin Mahasabha and is received in one of
									his concerned works for global Bharatiya Mahakumbh.
								</p>
								<p className='text-gray-700 leading-relaxed'>
									He is actively involved operations of medical health. He is
									the national. He is serving around operations of medical
									health. He is developed a world-wide prospective to college
									with the fast-changing technological scenario.
								</p>
							</div>
						</div>
					</div>
				</AnimatedProfileCard>

				{/* Shri Sanjeev Sharma */}
				<AnimatedProfileCard delay={0.5}>
					<div className='flex flex-col md:flex-row gap-6 items-start'>
						<div className='w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
							<User className='w-16 h-16 text-gray-400' />
						</div>

						<div className='flex-1'>
							<div className='mb-4'>
								<h3 className='text-xl font-bold text-gray-900'>
									Shri Sanjeev Sharma
								</h3>
								<p className='text-blue-600 font-medium'>Treasurer</p>
							</div>

							<div className='prose prose-gray max-w-none text-sm'>
								<p className='text-gray-700 leading-relaxed mb-3'>
									Working in the Treasurer of Bhagwan Parshuram Institute of
									Technology, he has been associated with both business and the
									best interests of educational society to a considerable time.
									His dedication and the hard work in this institute is so
									desired above all his other institutions.
								</p>
								<p className='text-gray-700 leading-relaxed'>
									He has devoted and transformed segments alike and their
									institute & his dedicated teaching faculty. The mission of
									this institute is to develop a world-class perspective to
									college with the fast-changing technological scenario. In
									addition, online tech discipline wise a well-known of and well
									known colleges.
								</p>
							</div>
						</div>
					</div>
				</AnimatedProfileCard>
			</div>

			{/* Vision Statement */}
			<AnimatedProfileCard delay={0.6}>
				<div className='text-center'>
					<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
						<Target className='w-6 h-6 text-blue-600' />
					</div>
					<h3 className='text-2xl font-bold text-gray-900 mb-4'>
						Our Collective Vision
					</h3>
					<p className='text-gray-700 leading-relaxed max-w-3xl mx-auto'>
						&ldquo;Together, we are committed to creating an educational
						ecosystem that nurtures innovation, fosters excellence, and prepares
						future leaders who will drive technological advancement and social
						progress for a better tomorrow.&rdquo;
					</p>
				</div>
			</AnimatedProfileCard>
		</div>
	);
};

export default ManagementPage;
