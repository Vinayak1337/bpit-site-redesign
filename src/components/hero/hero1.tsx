'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
	Award,
	ArrowRight,
	Star,
	CheckCircle
} from 'lucide-react';

interface HeroData {
	mainTitle: string;
	subTitle: string;
	institutionName: string;
	unitInfo: string;
	approvalInfo: string;
	affiliationInfo: string;
	nbaAccredited: boolean;
	highlights: string[];
	buttons: Array<{
		text: string;
		type: 'primary' | 'outline';
		action: string;
	}>;
}

interface Hero1Props {
	data: HeroData;
}

const Hero1 = ({ data }: Hero1Props) => {

	return (
		<section className='relative max-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50  overflow-hidden'>
			{/* Background Elements */}
			<div className='absolute inset-0'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob' />
				<div className='absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000' />
				<div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000' />
			</div>

			{/* Floating Elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<motion.div
					className='absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full'
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
					className='absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full'
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
					className='absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full'
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

			<div className='relative z-10 container mx-auto px-4 py-20'>
				<div className='max-w-6xl mx-auto'>
					{/* Main Content */}
					<div className='text-center space-y-8'>
						{/* Main Value Proposition */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.1 }}
							className='space-y-6'>
							<h1 className='text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent leading-tight'>
								{data.mainTitle}
								<br />
								<span className='text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent'>
									{data.subTitle}
								</span>
							</h1>

							{/* Institution Name - More Subtle */}
							<motion.div
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								className='space-y-2'>
								<p className='text-xl md:text-2xl font-semibold text-gray-700 tracking-wide'>
									{data.institutionName}
								</p>
								<div className='w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full' />
							</motion.div>

							{/* NBA Badge - More Prominent */}
							{data.nbaAccredited && (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									className='flex justify-center'>
									<div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-200 text-blue-800 rounded-full font-semibold shadow-lg'>
										<Star className='w-5 h-5 mr-3 text-yellow-500 fill-current' />
										<span className='text-base md:text-lg'>
											NBA Accredited Institution
										</span>
										<Award className='w-5 h-5 ml-3 text-blue-600' />
									</div>
								</motion.div>
							)}
						</motion.div>

						{/* Institutional Information */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className='max-w-4xl mx-auto space-y-4'>
							{/* Unit Information */}
							<motion.p
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 }}
								className='text-base md:text-lg font-semibold text-red-600 tracking-wide'>
								{data.unitInfo}
							</motion.p>

							{/* Approval Information */}
							<motion.p
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.7 }}
								className='text-sm md:text-base text-gray-700 font-medium bg-gradient-to-r from-gray-100 to-blue-50 px-4 py-2 rounded-full inline-block border border-gray-200'>
								{data.approvalInfo}
							</motion.p>

							{/* Affiliation Information */}
							<motion.p
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.8 }}
								className='text-base md:text-lg text-gray-700 leading-relaxed'>
								{data.affiliationInfo}
							</motion.p>

							{/* Decorative Element */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8, delay: 0.9 }}
								className='flex justify-center items-center space-x-4 pt-2'>
								<div className='w-6 h-0.5 bg-gradient-to-r from-transparent to-red-500 rounded-full'></div>
								<div className='w-2 h-2 bg-red-500 rounded-full shadow-lg'></div>
								<div className='w-6 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full'></div>
							</motion.div>
						</motion.div>

						{/* Highlights */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.0 }}
							className='flex justify-center w-full'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl'>
								{data.highlights.map((highlight, index) => (
									<div
										key={index}
										className='flex items-center justify-start space-x-2 text-gray-700'>
										<CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0' />
										<span className='font-semibold'>{highlight}</span>
									</div>
								))}
							</div>
						</motion.div>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.1 }}
							className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							{data.buttons.map((button, index) => (
								<Button
									key={index}
									size='lg'
									variant={button.type === 'outline' ? 'outline' : 'default'}
									className={button.type === 'primary' 
										? 'bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group'
										: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300'
									}
									onClick={() => {
										if (button.action === 'openEnquiry') {
											const event = new CustomEvent('openEnquiry');
											window.dispatchEvent(event);
										}
									}}>
									{button.text}
									{button.type === 'primary' && (
										<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
									)}
								</Button>
							))}
						</motion.div>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes blob {
					0% {
						transform: translate(0px, 0px) scale(1);
					}
					33% {
						transform: translate(30px, -50px) scale(1.1);
					}
					66% {
						transform: translate(-20px, 20px) scale(0.9);
					}
					100% {
						transform: translate(0px, 0px) scale(1);
					}
				}
				.animate-blob {
					animation: blob 7s infinite;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</section>
	);
};

export default Hero1;
