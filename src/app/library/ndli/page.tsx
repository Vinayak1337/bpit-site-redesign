'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function NDLIPage() {
	return (
		<motion.div 
			className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<div className="max-w-4xl mx-auto">
				<motion.h1 
					className="text-4xl font-bold text-gray-900 mb-8"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.1 }}
				>
					NDLI (National Digital Library of India)
				</motion.h1>
				
				<motion.div 
					className="bg-white rounded-lg shadow-lg p-8"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<p className="text-gray-600 text-lg">
						National Digital Library of India resources will be available here soon.
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
}