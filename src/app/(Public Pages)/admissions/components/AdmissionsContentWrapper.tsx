'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AdmissionsContentWrapperProps {
	children: React.ReactNode;
}

const AdmissionsContentWrapper = ({ children }: AdmissionsContentWrapperProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6 }}
			className='flex-1 max-w-full overflow-hidden'>
			<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden w-full max-w-full hover:shadow-xl transition-all duration-300'>
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

export default AdmissionsContentWrapper;



