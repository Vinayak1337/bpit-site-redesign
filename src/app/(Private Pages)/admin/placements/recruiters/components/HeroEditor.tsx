'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Editable from '@/components/ui/Editable';
import HeroForm from './HeroForm';
import type { RecruitersData } from '@/app/(Private Pages)/actions/recruiters';

interface HeroEditorProps {
	initialData: RecruitersData;
	pageSlug: string;
}

export default function HeroEditor({ initialData, pageSlug }: HeroEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<RecruitersData>(initial);

	const formContent = useMemo(
		() => (
			<HeroForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	const HeroIcon = (Icons[currentData.hero?.icon as keyof typeof Icons] || Icons.Building2) as any;

	return (
		<Editable label="Hero Section" presentation="dialog" formContent={formContent}>
			<section className={`relative py-20 bg-gradient-to-r ${currentData.hero?.gradient || 'from-blue-900 via-blue-800 to-blue-900'}`}>
				<div className='relative z-10 container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center text-white max-w-4xl mx-auto'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
							className='flex justify-center mb-6'>
							<div className='p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20'>
								<HeroIcon className='w-12 h-12' />
							</div>
						</motion.div>

						<h1 className='text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
							{currentData.hero?.title || 'Our Recruiters'}
						</h1>
						<p className='text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed'>
							{currentData.hero?.subtitle || 'Partnering with industry leaders'}
						</p>
						<div className='w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full' />
					</motion.div>
				</div>
			</section>
		</Editable>
	);
}
