'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ChevronRight, GraduationCap } from 'lucide-react';
import type {
	AdmissionsProcessMeta,
	AdmissionsProgramCatalogItem
} from '@/app/(Private Pages)/actions/admissions';
import ProcessProgramCard from '@/app/(Public Pages)/admissions/process/components/ProcessProgramCard';
import ProcessSidebar from '@/app/(Public Pages)/admissions/process/components/ProcessSidebar';

type Props = {
	meta?: AdmissionsProcessMeta | null;
	programs?: AdmissionsProgramCatalogItem[];
};

export default function ProcessExplorer({ meta, programs }: Props) {
	const router = useRouter();
	const [activeCategoryId, setActiveCategoryId] = useState('');
	const [activeSubcategoryId, setActiveSubcategoryId] = useState('');
	const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
	const safePrograms = programs ?? [];

	if (!meta) {
		return (
			<section className='rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center'>
				<h1 className='text-xl font-semibold text-slate-900'>Admissions data unavailable</h1>
				<p className='mt-2 text-sm text-slate-600'>
					Process content can be rendered here once it is configured in the CMS.
				</p>
			</section>
		);
	}

	const safeCategories = meta.categories ?? [];

	const categoryMap = useMemo(
		() =>
			Object.fromEntries(
				safeCategories.map(category => [category.id, category] as const)
			),
		[safeCategories]
	);

	const subcategoryMap = useMemo(
		() =>
			Object.fromEntries(
				safeCategories.flatMap(category =>
					category.subcategories.map(subcategory => [
						subcategory.id,
						{ ...subcategory, categoryId: category.id, categoryTitle: category.title }
					] as const)
				)
			),
		[safeCategories]
	);

	const activePrograms = useMemo(() => {
		if (!activeCategoryId || !activeSubcategoryId) {
			return [];
		}
		return safePrograms.filter(
			program =>
				program.categoryId === activeCategoryId &&
				program.subcategoryId === activeSubcategoryId
		);
	}, [activeCategoryId, activeSubcategoryId, safePrograms]);

	const activeCategory = activeCategoryId ? categoryMap[activeCategoryId] : undefined;
	const activeSubcategory = activeSubcategoryId ? subcategoryMap[activeSubcategoryId] : undefined;

	const contentTitle =
		activeSubcategory?.title ?? activeCategory?.title ?? meta.emptyStateTitle;
	const contentDescription =
		activeSubcategory?.description ||
		activeCategory?.description ||
		meta.defaultCategoryDescription;

	const toggleCategory = (categoryId: string) => {
		setActiveCategoryId(current => (current === categoryId ? '' : categoryId));
		setActiveSubcategoryId('');
		setExpandedCategories(current =>
			current.includes(categoryId)
				? current.filter(item => item !== categoryId)
				: [...current, categoryId]
		);
	};

	const handleSubsectionClick = (subsectionId: string) => {
		const subcategory = subcategoryMap[subsectionId];
		if (!subcategory) return;
		setActiveCategoryId(subcategory.categoryId);
		setActiveSubcategoryId(subsectionId);
		setExpandedCategories(current =>
			current.includes(subcategory.categoryId)
				? current
				: [...current, subcategory.categoryId]
		);
	};

	const handleViewDetails = (programId: string) => {
		router.push(`/admissions/process/${programId}`);
	};

	const handlePrimaryCta = () => {
		if (!meta.supportCard?.primaryCtaHref) return;
		window.open(meta.supportCard.primaryCtaHref, '_blank');
	};

	const handleSecondaryCta = () => {
		if (!meta.supportCard?.secondaryCtaHref) return;
		if (meta.supportCard.secondaryCtaHref.endsWith('.pdf')) {
			const link = document.createElement('a');
			link.href = meta.supportCard.secondaryCtaHref;
			link.download = 'BPIT_Admission_Brochure.pdf';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			return;
		}
		window.open(meta.supportCard.secondaryCtaHref, '_blank');
	};

	const renderProgramCards = (items: AdmissionsProgramCatalogItem[]) => {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='grid gap-6'>
				{items.map(program => (
					<ProcessProgramCard
						key={program.id}
						program={program}
						onViewDetails={handleViewDetails}
						durationLabel={meta.listCopy.durationLabel}
						intakeLabel={meta.listCopy.intakeLabel}
						ctaLabel={meta.listCopy.cardCtaLabel}
					/>
				))}
			</motion.div>
		);
	};

	return (
		<div>
			<div className='border-b bg-white shadow-sm'>
				<div className='container mx-auto px-4 py-5 sm:py-6'>
					<h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>{meta.headerTitle}</h1>
					<p className='mt-2 text-sm text-gray-600 sm:text-base'>{meta.headerSubtitle}</p>
				</div>
			</div>

			<div className='container mx-auto px-4 py-6 sm:py-8'>
				<div className='flex flex-col gap-8 lg:flex-row'>
					<div className={activeSubcategoryId ? 'hidden lg:block' : 'block'}>
						<ProcessSidebar
							activeCategoryId={activeCategoryId}
							activeSubcategoryId={activeSubcategoryId}
							expandedCategories={expandedCategories}
							title={meta.listCopy.sidebarTitle}
							categories={safeCategories}
							supportCard={meta.supportCard}
							onCategoryClick={toggleCategory}
							onSubsectionClick={handleSubsectionClick}
							onPrimaryCta={handlePrimaryCta}
							onSecondaryCta={handleSecondaryCta}
							showAdditionalInfo
						/>
					</div>

					<div className='flex-1 lg:max-w-none'>
						<div className='rounded-xl border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:p-8'>
							{activeSubcategoryId ? (
								<motion.button
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3 }}
									onClick={() => setActiveSubcategoryId('')}
									className='mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 lg:hidden'>
									<ChevronRight className='h-4 w-4 rotate-180' />
									<span>{meta.listCopy.mobileBackLabel}</span>
								</motion.button>
							) : null}

							{activeSubcategory ? (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
									className='mb-6'>
									<nav className='flex flex-wrap items-center gap-2 text-xs text-gray-600 sm:text-sm'>
										<span>{meta.listCopy.breadcrumbRootLabel}</span>
										<ChevronRight className='h-4 w-4' />
										<span>{activeCategory?.title}</span>
										<ChevronRight className='h-4 w-4' />
										<span className='font-medium text-blue-600'>
											{activeSubcategory.breadcrumbLabel || activeSubcategory.title}
										</span>
									</nav>
								</motion.div>
							) : null}

							<div className='mb-8'>
								<h2 className='mb-2 text-xl font-bold text-gray-900 sm:text-2xl'>
									{contentTitle}
								</h2>
								<p className='text-sm text-gray-600 sm:text-base'>{contentDescription}</p>
							</div>

							<AnimatePresence mode='wait'>
								{activeSubcategoryId ? (
									activePrograms.length > 0 ? (
										<motion.div key={activeSubcategoryId}>
											{renderProgramCards(activePrograms)}
										</motion.div>
									) : (
										<motion.div
											key={`${activeSubcategoryId}-empty`}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className='rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 sm:p-8 sm:text-base'>
											{meta.listCopy.noProgramsMessage}
										</motion.div>
									)
								) : (
									<motion.div
										key='default'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className='py-12 text-center sm:py-16'>
										<GraduationCap className='mx-auto mb-4 h-14 w-14 text-gray-300 sm:h-16 sm:w-16' />
										<h3 className='mb-2 text-lg font-semibold text-gray-500 sm:text-xl'>
											{activeCategory ? contentTitle : meta.emptyStateTitle}
										</h3>
										<p className='text-sm text-gray-400 sm:text-base'>
											{activeCategory ? contentDescription : meta.emptyStateDescription}
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
