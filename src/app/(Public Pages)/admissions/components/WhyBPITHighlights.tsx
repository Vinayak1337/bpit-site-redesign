'use client';

import { motion } from 'framer-motion';
import { getAdmissionsIcon } from '@/lib/admissions-icons';
import type { WhyBpitHighlightsSection } from '@/app/(Private Pages)/actions/admissions';

const WhyBPITHighlights = ({ data }: { data?: WhyBpitHighlightsSection | null }) => {
	if (!data || data.items.length === 0) {
		return null;
	}

	return (
		<section
			id='highlights'
			className='rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm md:p-8'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className='mb-7 md:mb-8'>
				{data.eyebrow ? (
					<p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-700'>
						{data.eyebrow}
					</p>
				) : null}
				{data.title ? (
					<h2 className='mt-2 text-2xl font-semibold text-slate-900 md:text-3xl'>
						{data.title}
					</h2>
				) : null}
				{data.description ? (
					<p className='mt-3 max-w-3xl text-sm text-slate-600 md:text-base'>
						{data.description}
					</p>
				) : null}
			</motion.div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{data.items.map((highlight, index) => {
					const Icon = getAdmissionsIcon(highlight.icon);
					return (
						<motion.article
							key={highlight.title}
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: index * 0.05 }}
							viewport={{ once: true }}
							className='group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
							<div className='mb-4 flex items-center justify-between'>
								<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-white'>
									<Icon className='h-8 w-8' />
								</div>
								<span className='rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500'>
									0{index + 1}
								</span>
							</div>
							<h3 className='text-lg font-semibold text-slate-900'>{highlight.title}</h3>
							<p className='mt-2 text-sm leading-relaxed text-slate-600'>
								{highlight.description}
							</p>
						</motion.article>
					);
				})}
			</div>
		</section>
	);
};

export default WhyBPITHighlights;
