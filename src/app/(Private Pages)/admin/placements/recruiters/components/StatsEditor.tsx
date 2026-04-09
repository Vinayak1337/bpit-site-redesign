'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Editable from '@/components/ui/Editable';
import StatsForm from './StatsForm';
import type { RecruitersData } from '@/app/(Private Pages)/actions/recruiters';

interface StatsEditorProps {
	initialData: RecruitersData;
	pageSlug: string;
}

export default function StatsEditor({ initialData, pageSlug }: StatsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<RecruitersData>(initial);

	const formContent = useMemo(
		() => (
			<StatsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Stats Cards Section" presentation="dialog" formContent={formContent}>
			<section className="py-16 -mt-10 relative z-20">
				<div className="container mx-auto px-4">
					{currentData.stats && currentData.stats.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{currentData.stats.map((stat, index) => {
								const StatIcon = (Icons[stat.icon as keyof typeof Icons] || Icons.TrendingUp) as any;
								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
									>
										<div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
											<StatIcon className="w-8 h-8" />
										</div>
										<h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">{stat.value}</h3>
										<p className="text-gray-600 text-center font-medium">{stat.label}</p>
									</motion.div>
								);
							})}
						</div>
					) : (
						<div className='text-center text-gray-500 py-12'>
							No stats added. Click to add stats.
						</div>
					)}
				</div>
			</section>
		</Editable>
	);
}
