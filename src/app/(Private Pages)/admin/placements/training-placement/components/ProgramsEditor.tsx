'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import ProgramsForm from './ProgramsForm';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

const iconMap: Record<string, React.ComponentType<any>> = {
	Users,
	Calendar
};

interface ProgramsEditorProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
}

export default function ProgramsEditor({ initialData, pageSlug }: ProgramsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<TrainingPlacementData>(initial);

	const formContent = useMemo(
		() => (
			<ProgramsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	const getIcon = (iconName: string) => iconMap[iconName] || Users;
	const getColorClasses = (color: string) => {
		const colorMap: Record<string, string> = {
			blue: 'from-blue-500 to-cyan-600',
			green: 'from-green-500 to-emerald-600',
			purple: 'from-purple-500 to-violet-600',
			orange: 'from-orange-500 to-red-600'
		};
		return colorMap[color] || 'from-blue-500 to-cyan-600';
	};

	return (
		<Editable label="Training Programs" formContent={formContent}>
			{currentData.trainingPrograms && currentData.trainingPrograms.length > 0 ? (
			<section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							{currentData.trainingTitle || 'Training Programs'}
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{currentData.trainingDescription || 'Comprehensive training programs'}
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{currentData.trainingPrograms.map((program, index) => {
							const ProgramIcon = getIcon(program.icon);
							return (
								<motion.div
									key={program.id || index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-white rounded-2xl p-8 shadow-lg'>
									<div
										className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(program.color)} rounded-2xl flex items-center justify-center mb-6 text-white`}>
										<ProgramIcon className='w-8 h-8' />
									</div>

									<h3 className='text-2xl font-bold text-gray-900 mb-4'>
										{program.title}
									</h3>
									<p className='text-gray-600 mb-6 leading-relaxed'>
										{program.description}
									</p>

									<div className='grid grid-cols-2 gap-4'>
										<div className='flex items-center space-x-2'>
											<Calendar className='w-5 h-5 text-gray-400' />
											<div>
												<p className='text-sm text-gray-500'>Duration</p>
												<p className='font-semibold text-gray-900'>
													{program.duration}
												</p>
											</div>
										</div>
										<div className='flex items-center space-x-2'>
											<Users className='w-5 h-5 text-gray-400' />
											<div>
												<p className='text-sm text-gray-500'>Participants</p>
												<p className='font-semibold text-gray-900'>
													{program.participants}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>
			) : (
				<div className='py-20 bg-gradient-to-br from-gray-50 to-blue-50 text-center text-gray-500'>
					No training programs added. Click to add programs.
				</div>
			)}
		</Editable>
	);
}
