'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import type { ChairmanMessageData } from '@/app/(Private Pages)/actions/about';

type Props = {
	data: ChairmanMessageData;
};

export function ChairmanMessageHeaderBlock({ data }: Props) {
	return (
		<div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6'>
			<div className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 aspect-square'>
				<MessageSquare className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white' />
			</div>
			<div className='flex-1'>
				<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
					{data.header.title}
				</h1>
				<p className='text-purple-600 font-medium text-sm sm:text-base'>
					{data.header.subtitle}
				</p>
			</div>
		</div>
	);
}

export function ChairmanMessageBodyBlock({ data }: Props) {
	return (
		<div className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200'>
			<div className='prose prose-sm sm:prose-lg text-gray-700 leading-relaxed max-w-none'>
				{data.quote ? (
					<p className='text-base sm:text-lg font-medium text-purple-800 mb-3 sm:mb-4'>
						{data.quote}
					</p>
				) : null}

				{data.paragraphs?.map((paragraph, index) => (
					<p key={index} className='text-sm sm:text-base mb-3 sm:mb-4'>
						{paragraph}
					</p>
				))}

				{data.more?.map((paragraph, index) => (
					<p key={`more-${index}`} className='text-sm sm:text-base mb-3 sm:mb-4'>
						{paragraph}
					</p>
				))}

				<p className='font-medium text-purple-800 mt-4 sm:mt-6 text-sm sm:text-base'>
					Wishing you all success in your academic and professional endeavors.
				</p>
			</div>
		</div>
	);
}

export function ChairmanMessageSignatureBlock() {
	return (
		<div className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200'>
			<div className='pt-1'>
				<p className='font-semibold text-gray-900 text-sm sm:text-base'>
					Dr. [Chairman Name]
				</p>
				<p className='text-purple-600 text-xs sm:text-sm'>Chairman, BPIT</p>
			</div>
		</div>
	);
}

export default function ChairmanMessageSection({ data }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='space-y-6 sm:space-y-8'>
			<div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-200 space-y-6 sm:space-y-8'>
				<ChairmanMessageHeaderBlock data={data} />
				<ChairmanMessageBodyBlock data={data} />
				<ChairmanMessageSignatureBlock />
			</div>
		</motion.div>
	);
}
