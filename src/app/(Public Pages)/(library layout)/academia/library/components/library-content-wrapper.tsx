'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface LibraryContentWrapperProps {
	children: React.ReactNode;
}

const LibraryContentWrapper = ({ children }: LibraryContentWrapperProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='flex-1 min-w-0'>
			<Card className='shadow-lg border-gray-200 overflow-hidden py-0'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className='p-4 sm:p-6 md:p-8'>
					{children}
				</motion.div>
			</Card>
		</motion.div>
	);
};

export default LibraryContentWrapper;
