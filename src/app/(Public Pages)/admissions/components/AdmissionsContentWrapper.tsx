'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AdmissionsContentWrapperProps {
	children: React.ReactNode;
}

const AdmissionsContentWrapper = ({ children }: AdmissionsContentWrapperProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='flex-1 max-w-full overflow-hidden'>
			<div className='w-full max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className='p-4 sm:p-6 lg:p-8'>
					{children}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default AdmissionsContentWrapper;








