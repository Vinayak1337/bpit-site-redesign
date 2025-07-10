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
				<a
					href='tel:011-27571080'
					className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
					<Phone className='w-4 h-4' />
					<span>011-2757 1080</span>
				</a>
				<a
					href='mailto:bpitindia@yahoo.com'
					className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
					<Mail className='w-4 h-4' />
					<span>bpitindia@yahoo.com</span>
				</a>
				<a
					href='https://www.google.com/maps/search/?api=1&query=PSP-4%2C%20Sector-17%2C%20Rohini%2C%20New%20Delhi'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
					<MapPin className='w-4 h-4' />
					<span>PSP-4, Sector-17, Rohini, New Delhi</span>
				</a>
			</div>
			<div className='text-sm'>
				<span className='text-yellow-300'>NBA Accredited</span> B.Tech Programs
			</div>
		</div>
	</motion.div>
);

export default HeaderContactUs;
