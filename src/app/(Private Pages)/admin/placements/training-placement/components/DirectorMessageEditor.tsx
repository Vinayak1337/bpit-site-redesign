'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import DirectorMessageForm from './DirectorMessageForm';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

interface DirectorMessageEditorProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
}

export default function DirectorMessageEditor({ initialData, pageSlug }: DirectorMessageEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<TrainingPlacementData>(initial);

	const formContent = useMemo(
		() => (
			<DirectorMessageForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Director's Message" presentation="dialog" formContent={formContent}>
			{currentData.directorMessage ? (
			<section className='py-20 bg-white -mt-10 relative z-20'>
			<div className='container mx-auto px-4'>
				<div className='max-w-6xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-center'>
							<div className='lg:col-span-1 flex justify-center'>
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.6 }}
									className='relative'>
									{currentData.directorMessage.image ? (
										<img
											src={currentData.directorMessage.image}
											alt={currentData.directorMessage.name}
											className='w-48 h-48 mx-auto rounded-full object-cover shadow-2xl border-4 border-white'
										/>
									) : (
										<img
											src='/avatar-default.svg'
											alt={currentData.directorMessage.name}
											className='w-48 h-48 mx-auto rounded-full object-cover shadow-2xl border-4 border-white bg-blue-500'
										/>
									)}
									<div className='absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center'>
										<Quote className='w-6 h-6 text-yellow-800' />
									</div>
								</motion.div>
							</div>

							<div className='lg:col-span-2 space-y-6'>
								<div>
									<h2 className='text-4xl font-bold text-gray-900 mb-2'>
										Message from T&P Head
									</h2>
									<p className='text-xl text-blue-600 font-semibold'>
										{currentData.directorMessage.name}
									</p>
									<p className='text-gray-600'>
										{currentData.directorMessage.position}
									</p>
								</div>

								<div className='prose prose-lg text-gray-700'>
									<p className='text-lg leading-relaxed italic'>
										"{currentData.directorMessage.message1}"
									</p>
									<p className='text-lg leading-relaxed'>
										"{currentData.directorMessage.message2}"
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
			) : (
					<div className='py-20 bg-white text-center text-gray-500'>
						No director message data. Click to add.
					</div>
				)}
			</Editable>
		);
	}