'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import TeamForm from './TeamForm';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

interface TeamEditorProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
}

export default function TeamEditor({ initialData, pageSlug }: TeamEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<TrainingPlacementData>(initial);

	const formContent = useMemo(
		() => (
			<TeamForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Dedicated Team" formContent={formContent}>
			{currentData.teamMembers && currentData.teamMembers.length > 0 ? (
			<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							{currentData.teamTitle || 'Our Dedicated Team'}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{currentData.teamDescription ||
								'Meet our experienced team of professionals dedicated to student success'}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
						{currentData.teamMembers.map((member, index) => (
							<motion.div
								key={member.id || index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='bg-white rounded-2xl p-8 shadow-lg h-full'>
								<div className='flex items-start space-x-8 h-full'>
									<div className='flex-shrink-0'>
										{member.image ? (
											<img
												src={member.image}
												alt={member.name}
												className='w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg'
											/>
										) : (
											<img
												src='/avatar-default.svg'
												alt={member.name}
												className='w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg bg-blue-500'
											/>
										)}
									</div>
									<div className='flex-1 min-w-0'>
										<h3 className='text-2xl font-bold text-gray-900 mb-2 break-words'>
											{member.name}
										</h3>
										<p className='text-blue-600 font-semibold mb-3 break-words'>
											{member.position}
										</p>
										<p className='text-gray-600 mb-3 text-sm leading-relaxed'>
											{member.qualifications}
										</p>
										<div className='flex items-start space-x-2'>
											<Star className='w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0' />
											<span className='text-sm text-gray-700 font-medium break-words'>
												{member.specialization}
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
			) : (
				<div className='py-20 bg-gradient-to-br from-gray-50 to-blue-50 text-center text-gray-500'>
					No team members added. Click to add team members.
				</div>
			)}
		</Editable>
	);
}