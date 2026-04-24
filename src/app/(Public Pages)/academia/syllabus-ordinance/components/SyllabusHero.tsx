'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import type { SyllabusHeroData } from '@/app/(Private Pages)/actions/academia-syllabus-ordinance';

export default function SyllabusHero({ data }: { data: SyllabusHeroData }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='relative overflow-hidden bg-white text-gray-900'>
			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16'>
				<div className='text-center'>
					<div className='flex justify-center mb-4'>
						<div className='p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg'>
							<FileText className='w-8 h-8 text-white' />
						</div>
					</div>
					<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-900'>
						{data.title}
					</h1>
					<p className='text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
						{data.subtitle}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
