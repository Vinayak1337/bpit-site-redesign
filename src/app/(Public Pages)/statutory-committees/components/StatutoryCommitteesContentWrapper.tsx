'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatutoryCommitteesContentWrapperProps {
	children: React.ReactNode;
}

const StatutoryCommitteesContentWrapper: React.FC<
	StatutoryCommitteesContentWrapperProps
> = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			className='flex-1 lg:pl-8'>
			<div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-8'>
				{children}
			</div>
		</motion.div>
	);
};

export default StatutoryCommitteesContentWrapper;
