'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Editable from '@/components/ui/Editable';
import CTAForm from './CTAForm';
import type { RecruitersData } from '@/app/(Private Pages)/actions/recruiters';

interface CTAEditorProps {
	initialData: RecruitersData;
	pageSlug: string;
}

export default function CTAEditor({ initialData, pageSlug }: CTAEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<RecruitersData>(initial);

	const formContent = useMemo(
		() => (
			<CTAForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Partnership CTA Section" formContent={formContent}>
			<section className={`py-20 bg-gradient-to-r ${currentData.cta?.gradient || 'from-blue-900 via-blue-800 to-blue-900'}`}>
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center text-white max-w-4xl mx-auto"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							{currentData.cta?.title || 'Want to Partner with BPIT?'}
						</h2>
						<p className="text-xl text-blue-200 mb-8 leading-relaxed">
							{currentData.cta?.subtitle || 'Join our network of industry leaders'}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							{currentData.cta?.buttons && currentData.cta.buttons.length > 0 ? (
								currentData.cta.buttons.map((btn, index) => {
									const BtnIcon = (Icons[btn.icon as keyof typeof Icons] || Icons.Building2) as any;
									return (
										<button
											key={index}
											className={`px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
												btn.variant === 'primary'
													? 'bg-white text-blue-900 hover:bg-blue-50'
													: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900'
											}`}
										>
											<BtnIcon className="w-5 h-5 mr-2" />
											{btn.text}
										</button>
									);
								})
							) : (
								<div className='text-blue-200'>
									No buttons added. Click to add CTA buttons.
								</div>
							)}
						</div>
					</motion.div>
				</div>
			</section>
		</Editable>
	);
}
