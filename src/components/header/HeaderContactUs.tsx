'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const HeaderContactUs = () => (
	<motion.div
		className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 px-4 text-sm hidden md:block'
		initial={{ y: -20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		transition={{ duration: 0.5 }}>
		<div className='container mx-auto flex justify-between items-center'>
			<div className='flex items-center space-x-6'>
				<div className='flex items-center space-x-2'>
					<Phone className='w-4 h-4' />
					<span>011-2757 1080</span>
				</div>
				<div className='flex items-center space-x-2'>
					<Mail className='w-4 h-4' />
					<span>bpitindia@yahoo.com</span>
				</div>
				<div className='flex items-center space-x-2'>
					<MapPin className='w-4 h-4' />
					<span>PSP-4, Sector-17, Rohini, New Delhi</span>
				</div>
			</div>
			<div className='text-sm'>
				<span className='text-yellow-300'>NBA Accredited</span> B.Tech Programs
			</div>
		</div>
	</motion.div>
);

export default HeaderContactUs;
