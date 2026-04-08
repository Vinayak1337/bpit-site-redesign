'use client';

import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { AlertCircle, ChevronDown, IndianRupee, Layers, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
	AdmissionsFeeProgram,
	AdmissionsFeesMeta
} from '@/app/(Private Pages)/actions/admissions';

type Props = {
	meta?: AdmissionsFeesMeta | null;
	programs?: AdmissionsFeeProgram[];
};

type FeeYear = AdmissionsFeeProgram['years'][number];
type FeeBreakdown = NonNullable<FeeYear['breakdowns']>[number];
type AnnualHead = {
	name: string;
	amount: number;
	description: string;
};

const EMPTY_META: AdmissionsFeesMeta = {
	title: '',
	subtitle: '',
	description: '',
	academicSession: '',
	billingNote: '',
	importantNotes: [],
	supportMessage: '',
	supportEmail: '',
	supportPhone: '',
	selectorEyebrow: '',
	selectorTitle: '',
	selectorDescription: '',
	overviewEyebrow: '',
	programTotalLabel: '',
	annualViewsLabel: '',
	breakdownPanelsLabel: '',
	paymentNoteTitle: '',
	snapshotEyebrow: '',
	snapshotTitle: '',
	snapshotDescription: '',
	yearSectionsLabel: '',
	yearTotalLabel: '',
	breakdownEyebrow: '',
	breakdownTitle: '',
	breakdownDescription: '',
	annualHeadsEyebrow: '',
	annualHeadsTitle: '',
	annualHeadsDescription: '',
	importantNotesEyebrow: '',
	importantNotesTitle: '',
	supportEyebrow: '',
	supportTitle: '',
	supportCardTitle: '',
	supportCardDescription: ''
};

const PROGRAM_TONES: Record<
	string,
	{
		accent: string;
		accentSoft: string;
		accentText: string;
		accentBorder: string;
		hero: string;
	}
> = {
	btech: {
		accent: 'bg-blue-600',
		accentSoft: 'bg-blue-50',
		accentText: 'text-blue-700',
		accentBorder: 'border-blue-200',
		hero: 'from-slate-950 via-blue-950 to-blue-900'
	},
	'btech-lateral': {
		accent: 'bg-emerald-600',
		accentSoft: 'bg-emerald-50',
		accentText: 'text-emerald-700',
		accentBorder: 'border-emerald-200',
		hero: 'from-slate-950 via-emerald-950 to-emerald-900'
	},
	bba: {
		accent: 'bg-violet-600',
		accentSoft: 'bg-violet-50',
		accentText: 'text-violet-700',
		accentBorder: 'border-violet-200',
		hero: 'from-slate-950 via-violet-950 to-violet-900'
	},
	mba: {
		accent: 'bg-rose-600',
		accentSoft: 'bg-rose-50',
		accentText: 'text-rose-700',
		accentBorder: 'border-rose-200',
		hero: 'from-slate-950 via-rose-950 to-rose-900'
	}
};

const accordionVariants: Variants = {
	hidden: { height: 0, opacity: 0 },
	visible: {
		height: 'auto',
		opacity: 1,
		transition: { duration: 0.28, ease: 'easeOut' }
	},
	exit: {
		height: 0,
		opacity: 0,
		transition: { duration: 0.2, ease: 'easeIn' }
	}
};

const fadeUpVariants: Variants = {
	hidden: { opacity: 0, y: 14 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

const formatCurrency = (amount: number) =>
	new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 0
	}).format(amount);

const sumAmounts = (amounts: number[]) => amounts.reduce((sum, amount) => sum + amount, 0);

function getBreakdowns(year: FeeYear): FeeBreakdown[] {
	if (year.breakdowns?.length) {
		return year.breakdowns;
	}

	return (year.feeGroups ?? []).map((group, index) => ({
		id: `legacy-${year.year}-${index}`,
		title: group.groupName,
		shortLabel: '',
		description: '',
		totalAmount: group.totalAmount,
		components: group.components
	}));
}

function getAnnualHeads(year: FeeYear): AnnualHead[] {
	const headMap = new Map<string, AnnualHead>();

	for (const breakdown of getBreakdowns(year)) {
		for (const component of breakdown.components) {
			const existing = headMap.get(component.name);
			if (existing) {
				existing.amount += component.amount;
				if (component.description && !existing.description.includes(component.description)) {
					existing.description = existing.description
						? `${existing.description} / ${component.description}`
						: component.description;
				}
				continue;
			}

			headMap.set(component.name, {
				name: component.name,
				amount: component.amount,
				description: component.description || ''
			});
		}
	}

	return Array.from(headMap.values()).sort((left, right) => right.amount - left.amount);
}

function getProgramTone(programId: string) {
	return (
		PROGRAM_TONES[programId] ?? {
			accent: 'bg-slate-700',
			accentSoft: 'bg-slate-100',
			accentText: 'text-slate-700',
			accentBorder: 'border-slate-200',
			hero: 'from-slate-950 via-slate-900 to-slate-800'
		}
	);
}

export default function FeesExplorer({ meta, programs }: Props) {
	const safePrograms = programs ?? [];
	const safeMeta = meta ?? EMPTY_META;
	const [selectedProgramId, setSelectedProgramId] = useState(safePrograms[0]?.id ?? '');
	const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});

	const currentProgram =
		safePrograms.find(program => program.id === selectedProgramId) ?? safePrograms[0] ?? null;

	if (!currentProgram) {
		return (
			<section className='flex min-h-[40vh] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8'>
				<div className='text-center'>
					<h1 className='text-xl font-medium text-slate-800'>
						{safeMeta.title || 'Fee structure unavailable'}
					</h1>
					<p className='mt-2 text-sm text-slate-500'>Fee data is currently unavailable.</p>
				</div>
			</section>
		);
	}

	const tone = getProgramTone(currentProgram.id);
	const entryYear = currentProgram.years[0]?.year ?? 1;
	const allYearTotals = currentProgram.years.map(year => ({
		label: year.title || `Year ${year.year}`,
		amount: year.totalYearFee,
		breakdownCount: getBreakdowns(year).length
	}));

	const currentProgramBreakdownCount = currentProgram.years.reduce(
		(sum, year) => sum + getBreakdowns(year).length,
		0
	);

	return (
		<div className='space-y-8 pb-8'>
			<section>
				<motion.div
					initial='hidden'
					animate='visible'
					variants={fadeUpVariants}
					className='relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-white shadow-xl sm:p-8'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_40%)]' />
					<div className='absolute -right-16 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl' />
					<div className='relative'>
						{safeMeta.subtitle ? (
							<div className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100'>
								<Layers className='h-3.5 w-3.5' />
								{safeMeta.subtitle}
							</div>
						) : null}
						<h1 className='mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl'>
							{safeMeta.title || currentProgram.name}
						</h1>
						<p className='mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base'>
							{safeMeta.description}
						</p>
						<div className='mt-6 flex flex-wrap gap-3'>
							{safeMeta.academicSession ? (
								<span className='rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-100'>
									{safeMeta.academicSession}
								</span>
							) : null}
							{safeMeta.billingNote ? (
								<span className='rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-100'>
									{safeMeta.billingNote}
								</span>
							) : null}
						</div>
					</div>
				</motion.div>
			</section>

			<section className='rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm md:p-6'>
				<div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
					<div>
						<p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>
							{safeMeta.selectorEyebrow || 'Programs'}
						</p>
						<h2 className='mt-2 text-2xl font-semibold text-slate-900'>
							{safeMeta.selectorTitle || 'Choose a course to inspect the full fee ledger'}
						</h2>
					</div>
					<p className='max-w-2xl text-sm text-slate-600'>
						{safeMeta.selectorDescription ||
							'Each program card opens a calmer year-by-year view with clear account heads tucked inside expandable annual sections.'}
					</p>
				</div>

				<div className='mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
					{safePrograms.map(program => {
						const programTone = getProgramTone(program.id);
						const isActive = program.id === currentProgram.id;
						const firstYear = program.years[0]?.year ?? 1;

						return (
							<button
								key={program.id}
								type='button'
								onClick={() => {
									setSelectedProgramId(program.id);
									setExpandedYears({});
								}}
								className={cn(
									'relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-200 sm:p-5',
									isActive
										? `${programTone.accentBorder} bg-slate-950 text-white shadow-lg`
										: 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:shadow-md'
								)}>
								<div
									className={cn(
										'absolute inset-x-0 top-0 h-1',
										isActive ? 'bg-white/80' : programTone.accent
									)}
								/>
								<div className='flex items-start justify-between gap-4'>
									<span
										className={cn(
											'rounded-full px-2.5 py-1 text-xs font-medium',
											isActive ? 'bg-white/10 text-slate-100' : 'bg-slate-100 text-slate-600'
										)}>
										{firstYear > 1 ? `Starts Year ${firstYear}` : program.duration}
									</span>
								</div>
								<p className={cn('mt-8 text-sm font-medium', isActive ? 'text-slate-300' : 'text-slate-500')}>
									{program.shortName || program.name}
								</p>
								<h3 className='mt-1 text-lg font-semibold leading-snug'>{program.name}</h3>
								<p className={cn('mt-3 text-sm leading-6', isActive ? 'text-slate-300' : 'text-slate-600')}>
									{program.description}
								</p>
								<div className='mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between'>
									<div>
										<p className={cn('text-xs uppercase tracking-[0.18em]', isActive ? 'text-slate-400' : 'text-slate-500')}>
											{safeMeta.programTotalLabel || 'Program total'}
										</p>
										<p className='mt-1 text-2xl font-semibold'>{formatCurrency(program.totalProgramFee)}</p>
									</div>
									<div className={cn('text-sm sm:text-right', isActive ? 'text-slate-300' : 'text-slate-500')}>
										<p>{program.years.length} annual cards</p>
										<p>{program.duration}</p>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</section>

			<section className='grid gap-6 xl:grid-cols-[1.05fr_0.95fr]'>
				<motion.div
					key={currentProgram.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className={cn(
						'relative overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br p-5 text-white shadow-xl sm:p-8',
						tone.hero
					)}>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_42%)]' />
					<div className='absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-white/10 blur-3xl' />
					<div className='relative'>
						<div className='flex flex-wrap items-center gap-3'>
							<span className='rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-slate-100'>
								{currentProgram.shortName || currentProgram.name}
							</span>
							<span className='rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-slate-100'>
								{currentProgram.duration}
							</span>
							{entryYear > 1 ? (
								<span className='rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-slate-100'>
									Entry from Year {entryYear}
								</span>
							) : null}
						</div>

						<h2 className='mt-5 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl'>
							{currentProgram.name}
						</h2>
						<p className='mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base'>
							{currentProgram.description}
						</p>

						<div className='mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
							<div className='rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm'>
								<p className='text-xs uppercase tracking-[0.16em] text-slate-300'>
									{safeMeta.programTotalLabel || 'Program total'}
								</p>
								<p className='mt-2 text-2xl font-semibold'>{formatCurrency(currentProgram.totalProgramFee)}</p>
							</div>
							<div className='rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm'>
								<p className='text-xs uppercase tracking-[0.16em] text-slate-300'>
									{safeMeta.annualViewsLabel || 'Annual views'}
								</p>
								<p className='mt-2 text-2xl font-semibold'>{currentProgram.years.length}</p>
							</div>
							<div className='rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm'>
								<p className='text-xs uppercase tracking-[0.16em] text-slate-300'>
									{safeMeta.breakdownPanelsLabel || 'Breakdown panels'}
								</p>
								<p className='mt-2 text-2xl font-semibold'>{currentProgramBreakdownCount}</p>
							</div>
						</div>

						{currentProgram.paymentNote ? (
							<div className='mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100 backdrop-blur-sm'>
								<p className='font-medium'>{safeMeta.paymentNoteTitle || 'Payment note'}</p>
								<p className='mt-2 leading-6 text-slate-200'>{currentProgram.paymentNote}</p>
							</div>
						) : null}
					</div>
				</motion.div>

				<motion.div
					key={`${currentProgram.id}-snapshot`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
					<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>
								{safeMeta.snapshotEyebrow || 'Annual snapshot'}
							</p>
							<h3 className='mt-2 text-2xl font-semibold text-slate-900'>
								{safeMeta.snapshotTitle || 'Yearly totals before you open the breakdowns'}
							</h3>
							{safeMeta.snapshotDescription ? (
								<p className='mt-2 max-w-2xl text-sm text-slate-600'>{safeMeta.snapshotDescription}</p>
							) : null}
						</div>
						<div className={cn('rounded-2xl px-4 py-3 sm:text-right', tone.accentSoft)}>
							<p className={cn('text-xs font-semibold uppercase tracking-[0.16em]', tone.accentText)}>
								{safeMeta.programTotalLabel || 'Program total'}
							</p>
							<p className='mt-1 text-xl font-semibold text-slate-900'>
								{formatCurrency(currentProgram.totalProgramFee)}
							</p>
						</div>
					</div>

					<div className='mt-6 space-y-3'>
						{allYearTotals.map(year => (
							<div
								key={year.label}
								className='flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between'>
								<div>
									<p className='font-medium text-slate-900'>{year.label}</p>
									<p className='mt-1 text-sm text-slate-500'>
										{year.breakdownCount}{' '}
										{year.breakdownCount === 1 ? 'section' : safeMeta.yearSectionsLabel || 'sections'}
									</p>
								</div>
								<div className='sm:text-right'>
									<p className='text-lg font-semibold text-slate-900'>{formatCurrency(year.amount)}</p>
									<p className='mt-1 text-xs uppercase tracking-[0.16em] text-slate-500'>
										{safeMeta.yearTotalLabel || 'Annual total'}
									</p>
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</section>

			<section className='space-y-4'>
				<div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>
								{safeMeta.breakdownEyebrow || 'Detailed breakdown'}
							</p>
							<h2 className='mt-2 text-2xl font-semibold text-slate-900'>
								{safeMeta.breakdownTitle || 'Open any annual card to inspect the detailed fee ledger'}
							</h2>
						</div>
					<p className='max-w-2xl text-sm text-slate-600'>
						{safeMeta.breakdownDescription ||
							'All breakdowns stay collapsed by default, so the page remains readable even with the full fee dataset in place.'}
					</p>
				</div>

				<div className='space-y-4'>
					{currentProgram.years.map((year, yearIndex) => {
						const breakdowns = getBreakdowns(year);
						const annualHeads = getAnnualHeads(year);
						const breakdownTotals = breakdowns.map(breakdown => breakdown.totalAmount);
						const yearKey = `${currentProgram.id}-${year.year}`;
						const isExpanded = Boolean(expandedYears[yearKey]);

						return (
							<motion.article
								key={yearKey}
								initial='hidden'
								animate='visible'
								variants={fadeUpVariants}
								transition={{ delay: yearIndex * 0.04 }}
								className={cn(
									'overflow-hidden rounded-[26px] border bg-white shadow-sm transition-colors duration-200',
									isExpanded ? `${tone.accentBorder} shadow-md` : 'border-slate-200'
								)}>
								<button
									type='button'
									onClick={() =>
										setExpandedYears(previous => ({
											...previous,
											[yearKey]: !previous[yearKey]
										}))
									}
									className='flex w-full flex-col gap-5 px-5 py-5 text-left md:px-6'>
									<div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
										<div className='flex items-start gap-4'>
											<div
												className={cn(
													'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold',
													isExpanded
														? `${tone.accent} text-white`
														: `${tone.accentSoft} ${tone.accentText}`
												)}>
												Y{year.year}
											</div>
											<div>
												<h3 className='text-xl font-semibold text-slate-900'>
													{year.title || `Year ${year.year}`}
												</h3>
												{year.note ? (
													<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-600'>
														{year.note}
													</p>
												) : null}
											</div>
										</div>

										<div className='flex w-full flex-wrap items-center gap-3 lg:w-auto lg:justify-end'>
											{breakdowns.map(breakdown => (
												<div
													key={breakdown.id || breakdown.title}
													className={cn(
														'min-w-[8.5rem] rounded-2xl border px-4 py-3 text-left sm:text-right',
														isExpanded
															? `${tone.accentBorder} ${tone.accentSoft}`
															: 'border-slate-200 bg-slate-50'
													)}>
													<p className='text-xs uppercase tracking-[0.16em] text-slate-500'>
														{breakdown.shortLabel || breakdown.title}
													</p>
													<p className='mt-1 text-sm font-semibold text-slate-900'>
														{formatCurrency(breakdown.totalAmount)}
													</p>
												</div>
											))}
											<div className='min-w-[8.5rem] rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-left text-white sm:text-right'>
												<p className='text-xs uppercase tracking-[0.16em] text-slate-300'>Annual total</p>
												<p className='mt-1 text-lg font-semibold'>{formatCurrency(year.totalYearFee)}</p>
											</div>
											<div
												className={cn(
													'flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200',
													isExpanded ? 'rotate-180 bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
												)}>
												<ChevronDown className='h-5 w-5' />
											</div>
										</div>
									</div>

									<div className='flex flex-wrap gap-3 text-sm text-slate-600'>
										<span className='rounded-full bg-slate-100 px-3 py-1.5'>
											{breakdowns.length} {breakdowns.length === 1 ? 'breakdown section' : 'breakdown sections'}
										</span>
										<span className='rounded-full bg-slate-100 px-3 py-1.5'>
											{sumAmounts(breakdownTotals) === year.totalYearFee
												? 'Breakdowns match annual total'
												: 'Annual total includes additional adjustments'}
										</span>
									</div>
								</button>

								<AnimatePresence initial={false}>
									{isExpanded ? (
										<motion.div
											initial='hidden'
											animate='visible'
											exit='exit'
											variants={accordionVariants}
											className='border-t border-slate-100'>
											<div className='space-y-4 p-5 md:p-6'>
												<section className='rounded-3xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5'>
													<div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
														<div>
															<p
																className={cn(
																	'text-xs font-semibold uppercase tracking-[0.18em]',
																	tone.accentText
																)}>
																{safeMeta.annualHeadsEyebrow || 'Annual account heads'}
															</p>
															<h4 className='mt-2 text-lg font-semibold text-slate-900'>
																{safeMeta.annualHeadsTitle || 'How this year total is made up'}
															</h4>
															<p className='mt-2 text-sm leading-6 text-slate-600'>
																{safeMeta.annualHeadsDescription ||
																	'Each fee head appears only once here. The billing sections above stay as totals only so the same items are not repeated again below.'}
															</p>
														</div>
														<div className='rounded-2xl bg-white px-4 py-3 shadow-sm sm:text-right'>
															<p className='text-xs uppercase tracking-[0.16em] text-slate-500'>
																{safeMeta.yearTotalLabel || 'Annual total'}
															</p>
															<p className='mt-1 text-lg font-semibold text-slate-900'>
																{formatCurrency(year.totalYearFee)}
															</p>
														</div>
													</div>

													<ul className='mt-5 grid gap-3 lg:grid-cols-2'>
														{annualHeads.map(head => (
															<li
																key={`${yearKey}-${head.name}`}
																className='rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm'>
																<div className='flex items-start justify-between gap-4'>
																	<div className='min-w-0'>
																		<p className='font-medium text-slate-900'>{head.name}</p>
																		{head.description ? (
																			<p className='mt-1 text-sm leading-6 text-slate-500'>{head.description}</p>
																		) : null}
																	</div>
																	<p className='shrink-0 text-base font-semibold text-slate-900'>
																		{formatCurrency(head.amount)}
																	</p>
																</div>
															</li>
														))}
													</ul>
												</section>
											</div>
										</motion.div>
									) : null}
								</AnimatePresence>
							</motion.article>
						);
					})}
				</div>
			</section>

			<section className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
					className='rounded-[28px] border border-amber-200 bg-amber-50/80 p-6 shadow-sm'>
					<div className='flex items-center gap-3'>
						<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700'>
							<AlertCircle className='h-5 w-5' />
						</div>
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.18em] text-amber-700'>
								{safeMeta.importantNotesEyebrow || 'Important notes'}
							</p>
							<h3 className='mt-1 text-2xl font-semibold text-amber-950'>
								{safeMeta.importantNotesTitle || 'Before you compare fee totals'}
							</h3>
						</div>
					</div>

					<ul className='mt-6 space-y-3'>
						{safeMeta.importantNotes.map(note => (
							<li
								key={note}
								className='rounded-2xl border border-amber-200 bg-white/80 px-4 py-4 text-sm leading-6 text-amber-950'>
								{note}
							</li>
						))}
					</ul>
				</motion.div>

				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeUpVariants}
					className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
					<p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>
						{safeMeta.supportEyebrow || 'Support'}
					</p>
					<h3 className='mt-2 text-2xl font-semibold text-slate-900'>
						{safeMeta.supportTitle || 'Need help with fee clarification?'}
					</h3>
					<p className='mt-3 text-sm leading-7 text-slate-600'>{safeMeta.supportMessage}</p>

					<div className='mt-6 space-y-3'>
						{safeMeta.supportEmail ? (
							<a
								href={`mailto:${safeMeta.supportEmail}`}
							className='flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors hover:border-slate-300 hover:bg-slate-100'>
								<div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', tone.accentSoft, tone.accentText)}>
									<Mail className='h-5 w-5' />
								</div>
								<div className='min-w-0'>
									<p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>Email</p>
									<p className='mt-1 break-all font-medium text-slate-900'>{safeMeta.supportEmail}</p>
								</div>
							</a>
						) : null}
						{safeMeta.supportPhone ? (
							<a
								href={`tel:${safeMeta.supportPhone}`}
								className='flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors hover:border-slate-300 hover:bg-slate-100'>
								<div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', tone.accentSoft, tone.accentText)}>
									<Phone className='h-5 w-5' />
								</div>
								<div className='min-w-0'>
									<p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>Phone</p>
									<p className='mt-1 break-words font-medium text-slate-900'>{safeMeta.supportPhone}</p>
								</div>
							</a>
						) : null}
					</div>

					<div className='mt-6 rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white'>
						<p className='flex items-center gap-2 text-sm font-medium text-slate-100'>
							<IndianRupee className='h-4 w-4' />
							{safeMeta.supportCardTitle || 'Fee design principle'}
						</p>
						<p className='mt-3 text-sm leading-6 text-slate-300'>
							{safeMeta.supportCardDescription ||
								'This page now prioritizes clarity over decoration: annual totals stay visible at a glance, while the detailed breakup opens only when someone needs the detail.'}
						</p>
					</div>
				</motion.div>
			</section>
		</div>
	);
}
