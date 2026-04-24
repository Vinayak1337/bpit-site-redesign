'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileCheck, ClipboardList, CalendarClock } from 'lucide-react';
import type { ExaminationContentData } from '@/app/(Private Pages)/actions/academia-examination';

interface Props {
	data: ExaminationContentData;
}

const iconMap = {
	FileCheck,
	ClipboardList,
	CalendarClock
} as const;

type IconName = keyof typeof iconMap;

const ExaminationContent = ({ data }: Props) => {
	return (
		<section className='py-8 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto space-y-8 md:space-y-10'>
					{/* Intro */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='text-center space-y-3'>
						<Badge
							variant='secondary'
							className='bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 font-medium'>
							{data.eyebrow}
						</Badge>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
							{data.heading}
						</h2>
						<p className='text-base sm:text-lg text-gray-600 leading-relaxed'>
							{data.intro}
						</p>
					</motion.div>

					{/* Info blocks */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
						{data.sections.map((section, index) => {
							const Icon =
								iconMap[(section.icon as IconName) ?? 'FileCheck'] ??
								FileCheck;
							return (
								<motion.div
									key={section.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.08 }}>
									<Card className='h-full hover:shadow-lg transition-shadow'>
										<CardHeader>
											<div
												className='bg-blue-50 text-blue-700 w-10 h-10 rounded-lg flex items-center justify-center'
												aria-hidden='true'>
												<Icon className='w-5 h-5' />
											</div>
											<CardTitle className='text-base sm:text-lg font-semibold text-gray-900 mt-2'>
												{section.title}
											</CardTitle>
											<CardDescription className='text-sm text-gray-600'>
												{section.description}
											</CardDescription>
										</CardHeader>
										{section.note ? (
											<CardContent>
												<p className='text-xs sm:text-sm text-gray-500 italic'>
													{section.note}
												</p>
											</CardContent>
										) : null}
									</Card>
								</motion.div>
							);
						})}
					</div>

					{/* Long-form body */}
					{data.body && data.body.length > 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}>
							<Card>
								<CardContent className='py-6 md:py-8'>
									<div className='prose prose-sm sm:prose-base max-w-none text-gray-700 whitespace-pre-line'>
										{data.body}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default ExaminationContent;
