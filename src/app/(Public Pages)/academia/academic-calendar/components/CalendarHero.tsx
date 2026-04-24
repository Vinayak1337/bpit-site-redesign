'use client';

import { motion } from 'framer-motion';
import type { CalendarHeroData } from '@/app/(Private Pages)/actions/academia-academic-calendar';

export default function CalendarHero({ data }: { data: CalendarHeroData }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.1 }}
			className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
			<motion.div
				className='mb-4 lg:mb-0'
				initial={{ x: -50, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.2 }}>
				<motion.h1
					className='text-3xl font-bold text-gray-900 mb-2'
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.3 }}>
					{data.title}
				</motion.h1>
				<motion.p
					className='text-gray-600'
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}>
					{data.subtitle}
				</motion.p>
			</motion.div>
		</motion.div>
	);
}
