'use client';

import { motion } from 'framer-motion';
import {
	Award,
	BookOpen,
	CheckCircle,
	Globe,
	GraduationCap,
	Info,
	Mail,
	Phone
} from 'lucide-react';
import React from 'react';

interface ScholarshipCategory {
	title: string;
	icon: React.ReactElement;
	badge: string;
	accent: string;
	scholarships: string[];
	portal?: string;
}

const scholarshipCategories: ScholarshipCategory[] = [
	{
		title: 'From University (GGSIPU)',
		icon: <GraduationCap className='h-5 w-5' />,
		badge: 'University',
		accent: 'text-blue-700 bg-blue-100',
		scholarships: ['EWS Scholarship'],
		portal: 'University Portal'
	},
	{
		title: 'From Delhi Government (E-District Portal)',
		icon: <Globe className='h-5 w-5' />,
		badge: 'State',
		accent: 'text-cyan-700 bg-cyan-100',
		scholarships: [
			'Merit-cum-Means Income Linked Financial Assistance Scheme of Delhi Higher Education Aid Trust',
			'B.R. Ambedkar State Toppers Award for Students belonging to SC/ST/OBC Category',
			'Merit Scholarship for students belonging to Minority studying in professional/technical colleges. Institutions/Universities',
			'Merit Scholarship to SC/ST/OBC Students of College/Professional Institutions',
			'Post Matric Scholarship for OBC Students(PMS-OBC)',
			'Post matric Scholarship schemes for SC'
		],
		portal: 'E-District Portal'
	},
	{
		title: 'From National Scholarship Portal (NSP Portal 2.0)',
		icon: <Award className='h-5 w-5' />,
		badge: 'National',
		accent: 'text-indigo-700 bg-indigo-100',
		scholarships: [
			"Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Riflesmm",
			'Merit-Cum-Means Scholarship for Professional and Technical Courses CS',
			'Central Sector Scheme of Scholarships for College and University Students',
			'Post Matric Scholarship Schemes Minorities CS',
			'Financial Assistance for Education to the Wards Of BEEDI/CINE/IOMC/LSDM- POST MATRIC',
			'Post Matric Scheme for Award of Scholarships under Beedi Workers Welfare Fund',
			'Post Matric Scholarship for SC Students'
		],
		portal: 'NSP Portal 2.0'
	}
];

export default function ScholarshipPage() {
	return (
		<main className='min-h-screen bg-slate-50'>
			<section className='relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 py-20 text-white'>
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_58%)]' />
				<div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent' />
				<div className='container relative z-10 mx-auto px-4 text-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='mx-auto max-w-4xl space-y-5'>
						<div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm'>
							<BookOpen className='h-4 w-4' />
							Scholarships & Financial Aid
						</div>
						<h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
							Scholarship Opportunities
						</h1>
						<p className='text-lg text-slate-200 md:text-xl'>
							Detailed scholarship options from University, Delhi Government and
							National portals.
						</p>
					</motion.div>
				</div>
			</section>

			<div className='container mx-auto space-y-8 px-4 py-10 md:py-14'>
				<motion.section
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
					<div className='mb-4 flex items-center gap-3'>
						<Info className='h-6 w-6 text-blue-700' />
						<h2 className='text-2xl font-semibold text-slate-900'>
							Before You Apply
						</h2>
					</div>
					<p className='text-slate-600'>
						BPIT supports students through multiple scholarship channels. Check
						eligibility criteria and required documents before applying on the
						respective portals.
					</p>
				</motion.section>

				<div className='space-y-6'>
					{scholarshipCategories.map((category, index) => (
						<motion.section
							key={category.title}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: index * 0.08 }}
							className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
							<div className='border-b border-slate-200 bg-slate-50 px-6 py-5'>
								<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
									<div className='flex items-center gap-3'>
										<div className='rounded-lg bg-blue-100 p-2 text-blue-700'>
											{category.icon}
										</div>
										<div>
											<h3 className='text-xl font-semibold text-slate-900'>
												{category.title}
											</h3>
											{category.portal ? (
												<p className='text-sm text-slate-600'>{category.portal}</p>
											) : null}
										</div>
									</div>
									<span
										className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${category.accent}`}>
										{category.badge}
									</span>
								</div>
							</div>

							<div className='space-y-3 p-6'>
								{category.scholarships.map((scholarship, scholarshipIndex) => (
									<motion.div
										key={scholarship}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: scholarshipIndex * 0.04 }}
										className='flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3'>
										<CheckCircle className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600' />
										<p className='text-sm text-slate-700'>{scholarship}</p>
									</motion.div>
								))}
							</div>
						</motion.section>
					))}
				</div>

				<motion.section
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.2 }}
					className='rounded-2xl border border-blue-200 bg-blue-50 p-6 md:p-8'>
					<h3 className='mb-4 text-xl font-semibold text-blue-900'>Important Notes</h3>
					<div className='space-y-2 text-sm text-blue-900/90'>
						<p>• Apply only through the official portal relevant to your scheme.</p>
						<p>• Verify eligibility, deadlines, and documents before submission.</p>
						<p>• Keep copies of acknowledgement and submitted forms for record.</p>
						<p>• Contact admissions office for support on application issues.</p>
					</div>
				</motion.section>

				<motion.section
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.25 }}
					className='rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-8'>
					<h3 className='text-2xl font-semibold text-slate-900'>
						Need Help With Applications?
					</h3>
					<p className='mt-2 text-slate-600'>
						Admissions team can guide you through the scholarship process.
					</p>
					<div className='mt-6 flex flex-col justify-center gap-3 sm:flex-row'>
						<div className='rounded-lg bg-slate-100 px-5 py-3 text-left'>
							<div className='flex items-center gap-2 text-sm font-medium text-slate-700'>
								<Mail className='h-4 w-4 text-blue-700' />
								Email
							</div>
							<p className='text-sm text-slate-700'>scholarships@bpit.ac.in</p>
						</div>
						<div className='rounded-lg bg-slate-100 px-5 py-3 text-left'>
							<div className='flex items-center gap-2 text-sm font-medium text-slate-700'>
								<Phone className='h-4 w-4 text-blue-700' />
								Phone
							</div>
							<p className='text-sm text-slate-700'>+91-11-2757-1101</p>
						</div>
					</div>
				</motion.section>
			</div>
		</main>
	);
}
