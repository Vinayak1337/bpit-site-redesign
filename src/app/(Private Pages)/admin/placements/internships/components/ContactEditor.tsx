'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Editable from '@/components/ui/Editable';
import ContactForm from './ContactForm';
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';

interface ContactEditorProps {
	initialData: InternshipsData;
	pageSlug: string;
}

export default function ContactEditor({ initialData, pageSlug }: ContactEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<InternshipsData>(initial);

	const formContent = useMemo(
		() => (
			<ContactForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label="Need Guidance Section" formContent={formContent}>
			<section className={`py-20 bg-gradient-to-r ${currentData.contact.gradient} text-white`}>
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center max-w-3xl mx-auto">
						<h2 className="text-4xl font-bold mb-4">{currentData.contact.title}</h2>
						<p className="text-lg text-white/90 mb-8">{currentData.contact.subtitle}</p>

						<div className="flex flex-wrap justify-center gap-6 mb-8">
							<a href={`tel:${currentData.contact.phone}`} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">
								<Icons.Phone className="w-5 h-5" />
								<span>{currentData.contact.phone}</span>
							</a>
							<a href={`mailto:${currentData.contact.email}`} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">
								<Icons.Mail className="w-5 h-5" />
								<span>{currentData.contact.email}</span>
							</a>
						</div>

						<div className="flex flex-wrap justify-center gap-4">
							{currentData.contact.buttons?.map((button, index) => {
								const ButtonIcon = (Icons as any)[button.icon] || Icons.ArrowRight;
								return (
									<motion.button
										key={index}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className={`
											flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all
											${button.variant === 'primary' 
												? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg'
												: 'bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30'
											}
										`}>
										<span>{button.text}</span>
										<ButtonIcon className="w-5 h-5" />
									</motion.button>
								);
							})}
						</div>
					</motion.div>
				</div>
			</section>
		</Editable>
	);
}
