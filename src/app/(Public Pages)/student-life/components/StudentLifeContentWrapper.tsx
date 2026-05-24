'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StudentLifeContentWrapperProps {
	children: React.ReactNode;
}

const StudentLifeContentWrapper = ({ children }: StudentLifeContentWrapperProps) => {
		return (
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='flex-1'>
			<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className='p-8'>
					{children}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default StudentLifeContentWrapper;
