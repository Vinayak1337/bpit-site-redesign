'use client';

import { motion } from 'framer-motion';
import { accreditations } from '@/data/admissions';

const Accreditations = () => {
	return (
		<section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.55 }}
				viewport={{ once: true }}
				className='mb-7'>
				<p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-700'>
					Recognitions
				</p>
				<h2 className='mt-2 text-2xl font-semibold text-slate-900 md:text-3xl'>
					Accreditations and affiliations
				</h2>
				<p className='mt-3 max-w-2xl text-sm text-slate-600 md:text-base'>
					Recognized by leading governing bodies and ranked among reliable institutions.
				</p>
			</motion.div>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{accreditations.map((item, index) => (
					<motion.article
						key={item.title}
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.42, delay: index * 0.04 }}
						viewport={{ once: true }}
						className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
						<div className='mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-white'>
							{item.icon}
						</div>
						<h3 className='text-base font-semibold text-slate-900'>{item.title}</h3>
						<p className='mt-1 text-sm text-slate-600'>{item.subtitle}</p>
					</motion.article>
				))}
			</div>
		</section>
	);
};

export default Accreditations;
