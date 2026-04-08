'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
	TrendingUp,
	Users,
	Building2,
	Award,
	Target,
	Briefcase,
	Star,
	CheckCircle,
	ArrowRight,
	Phone,
	Mail,
	MapPin,
	Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Editable from '@/components/ui/Editable';
import ContactForm from './ContactForm';
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';

const iconMap = {
	TrendingUp,
	Users,
	Building2,
	Award,
	Target,
	Briefcase,
	Star,
	CheckCircle,
	ArrowRight,
	Phone,
	Mail,
	MapPin,
	Lightbulb
};

interface ContactEditorProps {
	initialData: PlacementOverviewData;
	pageSlug: string;
}

export default function ContactEditor({ initialData, pageSlug }: ContactEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementOverviewData>(initial);

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
		<Editable
			label="Contact Section"
			formContent={formContent}
		>
			{/* Contact Section */}
			<section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center text-white"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							{currentData.contactTitle}
						</h2>
						<p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
							{currentData.contactDescription}
						</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
							{currentData.contacts.map((contact, index) => {
								const IconComponent = iconMap[contact.icon as keyof typeof iconMap] || Phone;
								return (
									<div key={index} className="flex flex-col items-center">
										<div className={`w-16 h-16 ${contact.iconColor} backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4`}>
											<IconComponent className="w-8 h-8" />
										</div>
										<h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
										<p className={contact.textColor}>{contact.value}</p>
									</div>
								);
							})}
						</div>

						<Button
							size="lg"
							className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
						>
							{currentData.contactButtonText}
							<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Button>
					</motion.div>
				</div>
			</section>
		</Editable>
	);
}
