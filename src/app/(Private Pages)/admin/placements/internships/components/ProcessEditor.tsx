'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Editable from '@/components/ui/Editable';
import ProcessForm from './ProcessForm';
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';

interface ProcessEditorProps {
	initialData: InternshipsData;
	pageSlug: string;
}

export default function ProcessEditor({ initialData, pageSlug }: ProcessEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<InternshipsData>(initial);

	const formContent = useMemo(
		() => (
			<ProcessForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="How Internships Work Section" presentation="dialog" formContent={formContent}>
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							How <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Internships Work</span>
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{currentData.process.map((step, index) => {
							const StepIcon = (Icons as any)[step.icon] || Icons.CheckCircle;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center">
									<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
										<StepIcon className="w-8 h-8" />
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
									<p className="text-gray-600 leading-relaxed">{step.description}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>
		</Editable>
	);
}
