'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { ContactType } from '@prisma/client';

type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

const HeaderContactUs = ({ contacts }: { contacts: ContactDTO[] }) => {
	const phones = contacts.filter(c => c.type === 'PHONE');
	const primaryPhone = phones[0] ?? null;
	const email = contacts.find(c => c.type === 'EMAIL') ?? null;
	const address = contacts.find(c => c.type === 'ADDRESS') ?? null;
	const sanitizeTel = (input: string): string => input.replace(/[^+\d]/g, '');

	const phoneTel = primaryPhone ? sanitizeTel(primaryPhone.value) : '';
	const phoneDisplay = primaryPhone?.displayValue ?? primaryPhone?.value ?? '';
	const emailValue = email?.value ?? '';
	const addressText = address?.displayValue ?? address?.value ?? '';
	const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		addressText
	)}`;

	return (
		<motion.div
			className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-1 sm:py-3 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm'
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}>
			<div className='container mx-auto'>
				{/* Mobile Layout - Stacked */}
				<div className='md:hidden space-y-1'>
					<div className='flex items-center justify-between'>
						<a
							href={`tel:${phoneTel}`}
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200 py-1'>
							<Phone className='w-3 h-3 sm:w-4 sm:h-4' />
							<span>{phoneDisplay}</span>
						</a>
						<a
							href={`mailto:${emailValue}`}
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200 py-1'>
							<Mail className='w-3 h-3 sm:w-4 sm:h-4' />
							<span className='sm:inline'>{emailValue}</span>
						</a>
					</div>
					<div className='flex items-center justify-between'>
						<a
							href={mapUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200 py-1'>
							<MapPin className='w-3 h-3 sm:w-4 sm:h-4' />
							<span className='hidden sm:inline'>{addressText}</span>
							<span className='sm:hidden'>Location</span>
						</a>
						<div className='text-xs sm:text-sm'>
							<span className='text-yellow-300'>NBA Accredited</span>
						</div>
					</div>
				</div>

				{/* Desktop Layout - Horizontal */}
				<div className='hidden md:flex justify-between items-center'>
					<div className='flex items-center space-x-4 lg:space-x-6'>
						<a
							href={`tel:${phoneTel}`}
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
							<Phone className='w-4 h-4' />
							<span>{phoneDisplay}</span>
						</a>
						<a
							href={`mailto:${emailValue}`}
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
							<Mail className='w-4 h-4' />
							<span>{emailValue}</span>
						</a>
						<a
							href={mapUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200'>
							<MapPin className='w-4 h-4' />
							<span>{addressText}</span>
						</a>
					</div>
					<div className='text-sm'>
						<span className='text-yellow-300'>
							NBA Accredited B.Tech Programs
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default HeaderContactUs;
