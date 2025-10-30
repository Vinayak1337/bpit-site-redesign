'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const HeaderContactUs = ({ data }: { data: HeaderContactUsData }) => (
	<motion.div
		className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 sm:py-3 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm'
		initial={{ y: -20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		transition={{ duration: 0.5 }}>
		<div className='container mx-auto'>
			{/* Mobile Layout - Stacked */}
			<div className='md:hidden space-y-2'>
				<div className='flex items-center justify-between'>
					<a
						href={`tel:${data.phone.tel}`}
						className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
						<Phone className='w-3 h-3 sm:w-4 sm:h-4' />
						<span>{data.phone.display}</span>
					</a>
					<a
						href={`mailto:${data.email}`}
						className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
						<Mail className='w-3 h-3 sm:w-4 sm:h-4' />
						<span className='sm:inline'>{data.email}</span>
					</a>
				</div>
				<div className='flex items-center justify-between'>
					<a
						href={data.mapUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
						<MapPin className='w-3 h-3 sm:w-4 sm:h-4' />
						<span className='hidden sm:inline'>
							{data.address}
						</span>
						<span className='sm:hidden'>Location</span>
					</a>
					<div className='text-xs sm:text-sm'>
						<span className='text-yellow-300'>{data.accreditation.mobile}</span>
					</div>
				</div>
			</div>

			{/* Desktop Layout - Horizontal */}
			<div className='hidden md:flex justify-between items-center'>
				<div className='flex items-center space-x-4 lg:space-x-6'>
						<a
							href={`tel:${data.phone.tel}`}
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
							<Phone className='w-4 h-4' />
							<span>{data.phone.display}</span>
						</a>
						<a
							href={`mailto:${data.email}`}
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
							<Mail className='w-4 h-4' />
							<span>{data.email}</span>
						</a>
						<a
							href={data.mapUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
							<MapPin className='w-4 h-4' />
							<span>{data.address}</span>
						</a>
					</div>
					<div className='text-sm'>
						<span className='text-yellow-300'>{data.accreditation.desktop}</span>
					</div>
			</div>
		</div>
	</motion.div>
);

export default HeaderContactUs;
