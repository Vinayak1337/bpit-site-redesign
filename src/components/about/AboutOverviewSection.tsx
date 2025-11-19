'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
	Award,
	Building2,
	Calendar,
	MapPin,
	Users
} from 'lucide-react';
import type { AboutOverviewData } from '@/app/(Private Pages)/actions/about';
import { getIcon } from '@/components/about/icons';

type Props = {
	data: AboutOverviewData;
};

const colorClasses: Record<
	AboutOverviewData['stats'][number]['color'],
	{ text: string; bg: string }
> = {
	blue: { text: 'text-blue-600', bg: 'bg-blue-100' },
	green: { text: 'text-green-600', bg: 'bg-green-100' },
	purple: { text: 'text-purple-600', bg: 'bg-purple-100' }
};

function AboutOverviewSectionComponent({ data }: Props) {
	const hasHeaderImage =
		typeof data.header.image === 'string' && data.header.image.length > 0;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-200'>
			<div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6'>
				<div className='relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-blue-600 aspect-square'>
					{hasHeaderImage ? (
						<Image
							src={data.header.image as string}
							alt={data.header.title}
							fill
							className='object-cover'
							sizes='64px'
						/>
					) : (
						<Building2 className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
					)}
				</div>
				<div className='flex-1'>
					<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1'>
						{data.header.title}
					</h1>
					<p className='text-blue-600 font-medium text-sm sm:text-base'>
						{data.header.subtitle}
					</p>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
				<div className='space-y-3 sm:space-y-4'>
					<div className='flex items-center gap-2 sm:gap-3'>
						<Calendar className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0' />
						<span className='text-gray-700 text-sm sm:text-base'>
							Established: {data.header.established}
						</span>
					</div>
					<div className='flex items-center gap-2 sm:gap-3'>
						<MapPin className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0' />
						<span className='text-gray-700 text-sm sm:text-base'>
							Location: {data.header.location}
						</span>
					</div>
					<div className='flex items-center gap-2 sm:gap-3'>
						<Award className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0' />
						<span className='text-gray-700 text-sm sm:text-base'>
							Accreditation: {data.header.accreditation}
						</span>
					</div>
					<div className='flex items-center gap-2 sm:gap-3'>
						<Users className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0' />
						<span className='text-gray-700 text-sm sm:text-base'>
							Affiliation: {data.header.affiliation}
						</span>
					</div>
				</div>
				<div className='space-y-3 sm:space-y-4'>
					{data.stats.map((stat, index) => {
						const classes = colorClasses[stat.color] ?? colorClasses.blue;
						const iconElement = getIcon(stat.icon);

						return (
							<div
								key={`${stat.label}-${index}`}
								className='bg-white rounded-lg p-3 sm:p-4 shadow-sm'>
								<div className='flex items-center gap-3 mb-2'>
									<div
										className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center ${classes.bg}`}>
										<span className={`${classes.text} flex items-center justify-center`}>
											{iconElement}
										</span>
									</div>
									<span className='font-semibold text-gray-900 text-sm sm:text-base'>
										{stat.value}
									</span>
								</div>
								<p className='text-xs sm:text-sm text-gray-600'>{stat.label}</p>
							</div>
						);
					})}
				</div>
			</div>
		</motion.div>
	);
}

const AboutOverviewSection = memo(AboutOverviewSectionComponent);
export default AboutOverviewSection;
