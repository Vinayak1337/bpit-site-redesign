'use client';

import { motion } from 'framer-motion';
import { getAdmissionsIcon } from '@/lib/admissions-icons';
import type { WhyBpitAccreditationsSection } from '@/app/(Private Pages)/actions/admissions';

const Accreditations = ({ data }: { data?: WhyBpitAccreditationsSection | null }) => {
	if (!data || data.items.length === 0) {
		return null;
	}

	return (
		<section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.55 }}
				viewport={{ once: true }}
				className='mb-7'>
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
					<p className='mt-3 max-w-2xl text-sm text-slate-600 md:text-base'>
						{data.description}
					</p>
				) : null}
			</motion.div>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{data.items.map((item, index) => {
					const Icon = getAdmissionsIcon(item.icon);
					return (
						<motion.article
							key={item.title}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.42, delay: index * 0.04 }}
							viewport={{ once: true }}
							className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
							<div className='mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-white'>
								<Icon className='h-8 w-8' />
							</div>
							<h3 className='text-base font-semibold text-slate-900'>{item.title}</h3>
							<p className='mt-1 text-sm text-slate-600'>{item.subtitle}</p>
						</motion.article>
					);
				})}
			</div>
		</section>
	);
};

export default Accreditations;
