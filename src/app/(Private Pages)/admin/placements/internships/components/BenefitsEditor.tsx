'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Editable from '@/components/ui/Editable';
import BenefitsForm from './BenefitsForm';
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';

interface BenefitsEditorProps {
	initialData: InternshipsData;
	pageSlug: string;
}

export default function BenefitsEditor({ initialData, pageSlug }: BenefitsEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<InternshipsData>(initial);

	const formContent = useMemo(
		() => (
			<BenefitsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Why Internships Section" presentation="dialog" formContent={formContent}>
			<section className="py-20 bg-gradient-to-br from-gray-50 to-white">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Why Pursue <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Internships?</span>
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
					</motion.div>

					<div className="grid md:grid-cols-2 gap-8">
						{currentData.benefits.map((benefit, index) => {
							const BenefitIcon = (Icons as any)[benefit.icon] || Icons.Star;
							
							// Map color names to actual Tailwind gradient classes
							const gradientClasses: Record<string, string> = {
								'blue': 'from-blue-600 to-cyan-600',
								'green': 'from-green-600 to-emerald-600',
								'purple': 'from-purple-600 to-pink-600',
								'orange': 'from-orange-600 to-red-600',
								'from-blue-600 to-cyan-600': 'from-blue-600 to-cyan-600',
								'from-green-600 to-emerald-600': 'from-green-600 to-emerald-600',
								'from-purple-600 to-pink-600': 'from-purple-600 to-pink-600',
								'from-orange-600 to-red-600': 'from-orange-600 to-red-600'
							};
							
							const gradientClass = gradientClasses[benefit.color] || 'from-blue-600 to-cyan-600';
							
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className={`relative bg-gradient-to-br ${gradientClass} p-8 rounded-2xl text-white shadow-xl overflow-hidden group`}>
									<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
									<div className="relative">
										<BenefitIcon className="w-12 h-12 mb-4" />
										<h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
										<p className="text-white/90 leading-relaxed">{benefit.description}</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>
		</Editable>
	);
}
