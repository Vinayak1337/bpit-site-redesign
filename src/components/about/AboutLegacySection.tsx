'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { AboutLegacyData } from '@/app/(Private Pages)/actions/about';
import { Globe } from 'lucide-react';
import { getIcon } from '@/components/about/icons';

type Props = {
	data: AboutLegacyData;
};

const colorClasses: Record<
	AboutLegacyData['features'][number]['color'],
	{ text: string; bg: string }
> = {
	blue: { text: 'text-blue-600', bg: 'bg-blue-100' },
	green: { text: 'text-green-600', bg: 'bg-green-100' },
	purple: { text: 'text-purple-600', bg: 'bg-purple-100' },
	orange: { text: 'text-orange-600', bg: 'bg-orange-100' },
	red: { text: 'text-red-600', bg: 'bg-red-100' },
	indigo: { text: 'text-indigo-600', bg: 'bg-indigo-100' }
};

function AboutLegacySectionComponent({ data }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			className='space-y-4 sm:space-y-6'>
			<h2 className='text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3'>
				<Globe className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0' />
				{data.title}
			</h2>

			<div className='prose prose-sm sm:prose-lg text-gray-700 leading-relaxed max-w-none'>
				{data.paragraphs.map((paragraph, index) => (
					<p key={`${paragraph.slice(0, 20)}-${index}`} className='text-sm sm:text-base mb-3 sm:mb-4'>
						{paragraph}
					</p>
				))}
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8'>
				{data.features.map((feature, index) => {
					const classes = colorClasses[feature.color] ?? colorClasses.blue;
					return (
						<motion.div
							key={`${feature.title}-${index}`}
							whileHover={{ scale: 1.02 }}
							className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
							<div
								className={`w-10 h-10 sm:w-12 sm:h-12 ${classes.bg} rounded-lg flex items-center justify-center mb-3 sm:mb-4 aspect-square`}>
								<div className={classes.text}>{getIcon(feature.icon)}</div>
							</div>
							<h3 className='font-semibold text-gray-900 mb-2 text-sm sm:text-base'>
								{feature.title}
							</h3>
							<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
								{feature.description}
							</p>
						</motion.div>
					);
				})}
			</div>
		</motion.div>
	);
}

const AboutLegacySection = memo(AboutLegacySectionComponent);
export default AboutLegacySection;
