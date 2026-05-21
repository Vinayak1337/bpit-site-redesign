'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Editable from '@/components/ui/Editable';
import HeroForm from './HeroForm';
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';

interface HeroEditorProps {
	initialData: InternshipsData;
	pageSlug: string;
}

export default function HeroEditor({ initialData, pageSlug }: HeroEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<InternshipsData>(initial);

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

	const HeroIcon = (Icons as any)[currentData.hero.icon] || Icons.Briefcase;

	return (
		<Editable label="Hero Section" formContent={formContent}>
			<section className={`relative py-20 bg-gradient-to-r ${currentData.hero.gradient}`}>
				<div className="relative z-10 container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center text-white max-w-4xl mx-auto"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
							className="flex justify-center mb-6"
						>
							<div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
								<HeroIcon className="w-12 h-12" />
							</div>
						</motion.div>
						
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent break-words">
							{currentData.hero.title}
						</h1>
						<p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
							{currentData.hero.subtitle}
						</p>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
					</motion.div>
				</div>
			</section>
		</Editable>
	);
}
