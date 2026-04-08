'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { NoticeItem, NoticeTransitionMode, PhaseAwaiter } from './types';
import {
	NOTICE_CARD_GAP_PX,
	NOTICE_CARD_HEIGHT_PX,
	NOTICE_RESET_EASE,
	NOTICE_RESET_MS,
	NOTICE_SLIDE_MS,
	NOTICE_STEP_EASE,
	NOTICE_WAIT_MS,
	createPhaseAwaiter,
	formatDate,
	pauseGate,
	toSafeHref,
	useNoticeVisibleCount,
	usePageVisibilityPaused,
	waitWithPause
} from './shared';

type RotatingNoticeColumnProps = {
	title: string;
	icon: ReactNode;
	items: NoticeItem[];
};

const NoticeCard = ({ item }: { item: NoticeItem }) => (
	<Link
		href={toSafeHref(item.href)}
		className='group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md'>
		<div className='mb-2 flex items-center justify-between gap-2'>
			<span className='min-w-0 truncate rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700'>
				{item.category}
			</span>
			<span className='shrink-0 text-xs text-slate-500'>{formatDate(item.date)}</span>
		</div>
		<h3 className='line-clamp-2 text-sm font-semibold leading-snug text-slate-900 md:text-base'>
			{item.title}
		</h3>
		{item.content ? (
			<p className='mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 md:text-sm'>
				{item.content}
			</p>
		) : null}
		<div className='mt-auto pt-3 inline-flex max-w-full items-center gap-1 text-xs font-medium text-blue-700 transition group-hover:gap-1.5'>
			<span>Read update</span>
			<ArrowUpRight className='h-3.5 w-3.5 shrink-0' />
		</div>
	</Link>
);

export function RotatingNoticeColumn({ title, icon, items }: RotatingNoticeColumnProps) {
	const prefersReducedMotion = useReducedMotion();
	const isPageHidden = usePageVisibilityPaused();
	const visibleCount = useNoticeVisibleCount();

	const [offset, setOffset] = useState(0);
	const [transitionMode, setTransitionMode] = useState<NoticeTransitionMode>('step');
	const [isInteracting, setIsInteracting] = useState(false);

	const maxOffset = Math.max(items.length - visibleCount, 0);
	const canLoop = !prefersReducedMotion && maxOffset > 0;
	const isPaused = isInteracting || isPageHidden;

	const pausedRef = useRef(isPaused);
	const offsetRef = useRef(offset);
	const maxOffsetRef = useRef(maxOffset);
	const animationAwaiterRef = useRef<PhaseAwaiter>(createPhaseAwaiter());

	useEffect(() => {
		pausedRef.current = isPaused;
	}, [isPaused]);

	useEffect(() => {
		offsetRef.current = offset;
	}, [offset]);

	useEffect(() => {
		maxOffsetRef.current = maxOffset;
	}, [maxOffset]);

	useEffect(() => {
		setOffset(0);
		setTransitionMode('step');
	}, [visibleCount, items.length]);

	useEffect(() => {
		const animationAwaiter = animationAwaiterRef.current;

		if (!canLoop) {
			return () => {
				animationAwaiter.cancel();
			};
		}

		const controller = new AbortController();

		const runLoop = async () => {
			while (!controller.signal.aborted) {
				await pauseGate(pausedRef, controller.signal);
				await waitWithPause(NOTICE_WAIT_MS, pausedRef, controller.signal);
				if (controller.signal.aborted) {
					break;
				}

				const currentOffset = offsetRef.current;
				const currentMaxOffset = maxOffsetRef.current;
				const animationDone = animationAwaiterRef.current.wait();

				if (currentOffset >= currentMaxOffset) {
					setTransitionMode('reset');
					setOffset(0);
				} else {
					setTransitionMode('step');
					setOffset(currentOffset + 1);
				}

				await animationDone;
			}
		};

		runLoop();

		return () => {
			controller.abort();
			animationAwaiter.cancel();
		};
	}, [canLoop, visibleCount, items.length]);

	const rowStep = NOTICE_CARD_HEIGHT_PX + NOTICE_CARD_GAP_PX;
	const viewportHeight =
		visibleCount * NOTICE_CARD_HEIGHT_PX +
		Math.max(visibleCount - 1, 0) * NOTICE_CARD_GAP_PX;

	return (
		<article className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6'>
			<div className='mb-4 flex items-center justify-between'>
				<div className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-700'>
					{icon}
					<span>{title}</span>
				</div>
				<span className='rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500'>
					{items.length}
				</span>
			</div>

			{items.length > 0 ? (
				<div
					onMouseEnter={() => setIsInteracting(true)}
					onMouseLeave={() => setIsInteracting(false)}
					onFocusCapture={() => setIsInteracting(true)}
					onBlurCapture={event => {
						const container = event.currentTarget;
						requestAnimationFrame(() => {
							setIsInteracting(container.contains(document.activeElement));
						});
					}}
					className='overflow-hidden rounded-2xl'
					style={{ height: `${viewportHeight}px` }}>
					<motion.div
						className='flex flex-col gap-3'
						animate={{ y: -(offset * rowStep) }}
						transition={{
							duration: (transitionMode === 'reset' ? NOTICE_RESET_MS : NOTICE_SLIDE_MS) / 1000,
							ease: transitionMode === 'reset' ? NOTICE_RESET_EASE : NOTICE_STEP_EASE
						}}
						style={{ willChange: 'transform' }}
						onAnimationComplete={() => {
							animationAwaiterRef.current.resolve();
						}}>
						{items.map((item, index) => {
							const key = `${item.id ?? item.title}-${item.date}-${index}`;
							return (
								<div key={key} style={{ height: `${NOTICE_CARD_HEIGHT_PX}px` }}>
									<NoticeCard item={item} />
								</div>
							);
						})}
					</motion.div>
				</div>
			) : (
				<p className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600'>
					No updates available right now.
				</p>
			)}
		</article>
	);
}
