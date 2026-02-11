'use client';

import { motion } from 'framer-motion';

export type Stat = { value: string; label: string };

const StatsStrip = ({ stats }: { stats: Stat[] }) => {
	return (
		<section className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7'>
			<div className='mb-5 flex flex-col gap-2 md:mb-6'>
				<p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-700'>
					BPIT at a glance
				</p>
				<h2 className='text-xl font-semibold text-slate-900 md:text-2xl'>
					Key performance highlights
				</h2>
			</div>

			<div className='grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
				{stats.map((stat, index) => (
					<motion.article
						key={stat.label}
						initial={{ opacity: 0, y: 14 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: index * 0.05 }}
						viewport={{ once: true }}
						className='rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4'>
						<p className='text-2xl font-bold text-blue-900 md:text-3xl'>{stat.value}</p>
						<p className='mt-1 text-xs text-slate-600 md:text-sm'>{stat.label}</p>
					</motion.article>
				))}
			</div>
		</section>
	);
};

export default StatsStrip;
