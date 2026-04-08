'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronRight, FileText, GraduationCap, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AdmissionsProcessMeta } from '@/app/(Private Pages)/actions/admissions';

type Props = {
	activeCategoryId: string;
	activeSubcategoryId: string;
	expandedCategories: string[];
	title?: string;
	categories?: AdmissionsProcessMeta['categories'];
	supportCard?: AdmissionsProcessMeta['supportCard'];
	onCategoryClick: (categoryId: string) => void;
	onSubsectionClick: (subsectionId: string) => void;
	onPrimaryCta?: () => void;
	onSecondaryCta?: () => void;
	showAdditionalInfo?: boolean;
};

export default function ProcessSidebar({
	activeCategoryId,
	activeSubcategoryId,
	expandedCategories,
	title,
	categories,
	supportCard,
	onCategoryClick,
	onSubsectionClick,
	onPrimaryCta,
	onSecondaryCta,
	showAdditionalInfo = true
}: Props) {
	const safeCategories = categories ?? [];
	const safeSupportCard = supportCard ?? null;

	return (
		<div className='w-full lg:w-80 lg:flex-shrink-0'>
			<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md lg:sticky lg:top-4'>
				<div className='border-b border-gray-100 p-6'>
					<h2 className='flex items-center gap-2 text-lg font-bold text-gray-900'>
						<GraduationCap className='h-5 w-5 text-blue-600' />
						{title || 'Program Categories'}
					</h2>
				</div>

				<div className='p-4'>
					{safeCategories.map(category => {
						const isExpanded = expandedCategories.includes(category.id);
						return (
							<div key={category.id} className='mb-4 last:mb-0'>
								<Button
									variant='ghost'
									onClick={() => onCategoryClick(category.id)}
									className={`h-auto w-full rounded-lg p-3 transition-all duration-200 ${
										activeCategoryId === category.id
											? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
											: 'hover:bg-gray-50'
									}`}>
									<span className='font-semibold text-gray-900'>{category.title}</span>
									<motion.div
										animate={{ rotate: isExpanded ? 90 : 0 }}
										transition={{ duration: 0.2 }}>
										<ChevronRight className='h-5 w-5 text-gray-500' />
									</motion.div>
								</Button>

								<AnimatePresence>
									{isExpanded ? (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3 }}
											className='ml-4 mt-2 overflow-hidden'>
											{(category.subcategories ?? []).map(item => (
												<Button
													key={item.id}
													variant='ghost'
													onClick={() => onSubsectionClick(item.id)}
													className={`mb-2 h-auto w-full justify-start rounded-lg p-3 text-left transition-all duration-200 last:mb-0 ${
														activeSubcategoryId === item.id
															? 'bg-blue-500 text-white hover:bg-blue-600'
															: 'text-gray-700 hover:bg-gray-50'
													}`}>
													{item.title}
												</Button>
											))}
										</motion.div>
									) : null}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</div>

			{showAdditionalInfo && safeSupportCard ? (
				<div
					className={`mt-6 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 ${
						activeSubcategoryId ? 'hidden lg:block' : 'block'
					}`}>
					<h3 className='mb-3 flex items-center gap-2 font-bold text-gray-900'>
						<BookOpen className='h-5 w-5 text-blue-600' />
						{safeSupportCard.title}
					</h3>
					<p className='mb-4 text-sm text-gray-600'>{safeSupportCard.description}</p>
					<div className='flex flex-col gap-3'>
						<Button
							onClick={onPrimaryCta}
							asChild={!onPrimaryCta}
							className='w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-600'>
							{onPrimaryCta ? (
								<>
									<UserPlus className='mr-2 h-4 w-4' />
									{safeSupportCard.primaryCtaLabel}
								</>
							) : (
								<Link href={safeSupportCard.primaryCtaHref}>
									<UserPlus className='mr-2 h-4 w-4' />
									{safeSupportCard.primaryCtaLabel}
								</Link>
							)}
						</Button>
						<Button
							variant='outline'
							onClick={onSecondaryCta}
							asChild={!onSecondaryCta}
							className='w-full rounded-lg border-2 border-blue-500 bg-white px-4 py-2 font-semibold text-blue-500 transition-colors duration-200 hover:bg-blue-500 hover:text-white'>
							{onSecondaryCta ? (
								<>
									<FileText className='mr-2 h-4 w-4' />
									{safeSupportCard.secondaryCtaLabel}
								</>
							) : (
								<Link href={safeSupportCard.secondaryCtaHref}>
									<FileText className='mr-2 h-4 w-4' />
									{safeSupportCard.secondaryCtaLabel}
								</Link>
							)}
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}
