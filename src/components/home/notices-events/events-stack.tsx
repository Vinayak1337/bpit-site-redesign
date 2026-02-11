'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from 'lucide-react';
import type { EventItem, EventPhase, EventQueueItem, PhaseAwaiter } from './types';
import {
	EVENT_COLLAPSE_EASE,
	EVENT_COLLAPSE_MS,
	EVENT_EXPAND_EASE,
	EVENT_EXPAND_MS,
	EVENT_EXPANDED_HOLD_MS,
	EVENT_LAYOUT_EASE,
	EVENT_MIN_SLIDE_DISTANCE_PX,
	EVENT_PRE_SLIDE_DELAY_MS,
	EVENT_RESET_DOWN_MS,
	EVENT_SIGNAL_FALLBACK_BUFFER_MS,
	EVENT_SLIDE_MS,
	EVENT_STACK_GAP_PX,
	createPhaseAwaiter,
	formatDate,
	pauseGate,
	rotateLeft,
	toSafeHref,
	usePageVisibilityPaused,
	wait,
	waitWithPause
} from './shared';

const rotateQueueToKey = (
	items: EventQueueItem[],
	queueKey: string
): EventQueueItem[] => {
	const targetIndex = items.findIndex(item => item._queueKey === queueKey);
	if (targetIndex <= 0) {
		return items;
	}

	return [...items.slice(targetIndex), ...items.slice(0, targetIndex)];
};

const EVENT_VISIBLE_ROW_COUNT = 3;

type EventStackRowProps = {
	event: EventQueueItem;
	isExpanded: boolean;
	onActivate: () => void;
	onExpandedAnimationComplete: (queueKey: string) => void;
	onCollapsedAnimationComplete: (queueKey: string) => void;
};

const EventStackRow = ({
	event,
	isExpanded,
	onActivate,
	onExpandedAnimationComplete,
	onCollapsedAnimationComplete
}: EventStackRowProps) => (
	<motion.li
		data-expanded={isExpanded ? 'true' : 'false'}
		style={{ willChange: 'transform' }}
		className='list-none'>
		<article className='overflow-hidden rounded-2xl border border-slate-200 bg-slate-50'>
			<button
				type='button'
				onClick={onActivate}
				className='flex w-full items-start justify-between gap-3 p-4 text-left transition-colors duration-200 hover:bg-white'>
				<div className='min-w-0'>
					<div className='mb-1 flex flex-wrap items-center gap-2'>
						<span className='rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700'>
							{event.category}
						</span>
						<span className='text-xs text-slate-500'>{formatDate(event.date)}</span>
					</div>
					<h3 className='line-clamp-1 text-sm font-semibold text-slate-900 md:text-base'>
						{event.title}
					</h3>
					<p className='mt-1 line-clamp-1 text-xs text-slate-600'>
						{event.time || 'Time TBA'} • {event.location || 'Location TBA'}
					</p>
				</div>
				<motion.span
					animate={{ rotate: isExpanded ? 45 : 0 }}
					transition={{
						duration: (isExpanded ? EVENT_EXPAND_MS : EVENT_COLLAPSE_MS) / 1000,
						ease: isExpanded ? EVENT_EXPAND_EASE : EVENT_COLLAPSE_EASE
					}}
					className='shrink-0 rounded-full border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-600'>
					+
				</motion.span>
			</button>

			<AnimatePresence
				initial={false}
				onExitComplete={() => onCollapsedAnimationComplete(event._queueKey)}>
				{isExpanded ? (
					<motion.div
						key='expanded-content'
						initial={{ height: 0, opacity: 0, y: 10 }}
						animate={{ height: 'auto', opacity: 1, y: 0 }}
						exit={{ height: 0, opacity: 0, y: -8 }}
						transition={{
							height: {
								duration: (isExpanded ? EVENT_EXPAND_MS : EVENT_COLLAPSE_MS) / 1000,
								ease: isExpanded ? EVENT_EXPAND_EASE : EVENT_COLLAPSE_EASE
							},
							opacity: {
								duration: (isExpanded ? EVENT_EXPAND_MS : EVENT_COLLAPSE_MS) / 1000,
								ease: isExpanded ? EVENT_EXPAND_EASE : EVENT_COLLAPSE_EASE
							},
							y: {
								duration: (isExpanded ? EVENT_EXPAND_MS : EVENT_COLLAPSE_MS) / 1000,
								ease: isExpanded ? EVENT_EXPAND_EASE : EVENT_COLLAPSE_EASE
							}
						}}
						onAnimationComplete={() => onExpandedAnimationComplete(event._queueKey)}
						className='overflow-hidden'>
						<div className='space-y-3 border-t border-slate-200 bg-white p-4'>
							<div className='relative h-40 w-full overflow-hidden rounded-xl'>
								{event.image ? (
									<Image src={event.image} alt={event.title} fill className='object-cover' />
								) : (
									<div className='h-full w-full bg-gradient-to-br from-blue-100 via-cyan-100 to-slate-100' />
								)}
							</div>
							<p className='line-clamp-3 text-sm leading-relaxed text-slate-600'>
								{event.description}
							</p>
							<div className='flex flex-wrap items-center gap-4 text-xs text-slate-600'>
								<span className='inline-flex items-center gap-1.5'>
									<Clock3 className='h-3.5 w-3.5 text-blue-700' />
									{event.time || 'Time TBA'}
								</span>
								<span className='inline-flex items-center gap-1.5'>
									<MapPin className='h-3.5 w-3.5 text-blue-700' />
									{event.location || 'Location TBA'}
								</span>
							</div>
							<Link
								href={toSafeHref(event.registrationLink)}
								className='inline-flex items-center gap-1 rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-800'>
								Explore event
								<ArrowUpRight className='h-3.5 w-3.5' />
							</Link>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</article>
	</motion.li>
);

type RotatingEventsStackProps = {
	events: EventItem[];
};

export function RotatingEventsStack({ events }: RotatingEventsStackProps) {
	const prefersReducedMotion = useReducedMotion();
	const isPageHidden = usePageVisibilityPaused();

	const [queue, setQueue] = useState<EventQueueItem[]>([]);
	const [activeQueueKey, setActiveQueueKey] = useState<string | null>(null);
	const [phase, setPhase] = useState<EventPhase>('idle');
	const [isInteracting, setIsInteracting] = useState(false);
	const [resetOffsetY, setResetOffsetY] = useState(0);
	const [slideOffsetY, setSlideOffsetY] = useState(0);
	const [sequenceVersion, setSequenceVersion] = useState(0);
	const [stackViewportHeight, setStackViewportHeight] = useState<number | null>(null);

	const baseQueueRef = useRef<EventQueueItem[]>([]);
	const queueRef = useRef<EventQueueItem[]>(queue);
	const activeQueueKeyRef = useRef<string | null>(activeQueueKey);
	const activeBaseIndexRef = useRef(0);
	const phaseRef = useRef<EventPhase>(phase);
	const manualTargetKeyRef = useRef<string | null>(null);
	const pausedRef = useRef(false);
	const listRef = useRef<HTMLUListElement | null>(null);
	const collapsedRowHeightRef = useRef(0);
	const expandedRowHeightRef = useRef(0);

	const collapseTargetKeyRef = useRef<string | null>(null);
	const expandTargetKeyRef = useRef<string | null>(null);

	const collapseAwaiterRef = useRef<PhaseAwaiter>(createPhaseAwaiter());
	const expandAwaiterRef = useRef<PhaseAwaiter>(createPhaseAwaiter());
	const slideAwaiterRef = useRef<PhaseAwaiter>(createPhaseAwaiter());
	const resetAwaiterRef = useRef<PhaseAwaiter>(createPhaseAwaiter());

	useEffect(() => {
		const normalized = events.map((event, index) => ({
			...event,
			_queueKey: `${event.id ?? event.title}-${event.date}-${index}`
		}));
		const initialKey = normalized[0]?._queueKey ?? null;

		baseQueueRef.current = normalized;
		queueRef.current = normalized;
		activeQueueKeyRef.current = initialKey;
		activeBaseIndexRef.current = 0;
		manualTargetKeyRef.current = null;
		collapseTargetKeyRef.current = null;
		expandTargetKeyRef.current = null;
		setResetOffsetY(0);
		setSlideOffsetY(0);
		setPhase('idle');
		setQueue(normalized);
		setActiveQueueKey(initialKey);
		setSequenceVersion(previous => previous + 1);
		setStackViewportHeight(null);
	}, [events]);

	useEffect(() => {
		queueRef.current = queue;
	}, [queue]);

	useEffect(() => {
		activeQueueKeyRef.current = activeQueueKey;
		if (!activeQueueKey) {
			return;
		}

		const baseIndex = baseQueueRef.current.findIndex(item => item._queueKey === activeQueueKey);
		if (baseIndex >= 0) {
			activeBaseIndexRef.current = baseIndex;
		}
	}, [activeQueueKey]);

	useEffect(() => {
		phaseRef.current = phase;
	}, [phase]);

	useEffect(() => {
		pausedRef.current = isInteracting || isPageHidden;
	}, [isInteracting, isPageHidden]);

	useLayoutEffect(() => {
		const listElement = listRef.current;
		if (!listElement || queue.length === 0) {
			return;
		}

		const rows = Array.from(listElement.children) as HTMLElement[];
		if (rows.length === 0) {
			return;
		}

		const expandedRow = rows.find(row => row.dataset.expanded === 'true');
		const collapsedRow = rows.find(row => row.dataset.expanded !== 'true');

		if (expandedRow) {
			expandedRowHeightRef.current = expandedRow.getBoundingClientRect().height;
		}
		if (collapsedRow) {
			collapsedRowHeightRef.current = collapsedRow.getBoundingClientRect().height;
		}

		const expandedHeight = expandedRowHeightRef.current || rows[0].getBoundingClientRect().height;
		const collapsedHeight = collapsedRowHeightRef.current || expandedHeight;
		const visibleRows = Math.min(EVENT_VISIBLE_ROW_COUNT, rows.length);
		const nextHeight =
			expandedHeight +
			Math.max(visibleRows - 1, 0) * collapsedHeight +
			Math.max(visibleRows - 1, 0) * EVENT_STACK_GAP_PX;

		if (nextHeight <= 0) {
			return;
		}

		setStackViewportHeight(previous =>
			previous === null ? Math.ceil(nextHeight) : Math.max(previous, Math.ceil(nextHeight))
		);
	}, [queue, activeQueueKey]);

	useEffect(() => {
		if (queue.length === 0) {
			activeQueueKeyRef.current = null;
			setActiveQueueKey(null);
			return;
		}

		if (!activeQueueKey) {
			return;
		}

		if (!queue.some(item => item._queueKey === activeQueueKey)) {
			const fallbackKey = queue[0]?._queueKey ?? null;
			if (!fallbackKey) {
				return;
			}
			activeQueueKeyRef.current = fallbackKey;
			setActiveQueueKey(fallbackKey);
		}
	}, [activeQueueKey, queue]);

	useEffect(() => {
		const collapseAwaiter = collapseAwaiterRef.current;
		const expandAwaiter = expandAwaiterRef.current;
		const slideAwaiter = slideAwaiterRef.current;
		const resetAwaiter = resetAwaiterRef.current;

		if (prefersReducedMotion || queueRef.current.length <= 1) {
			return () => {
				collapseAwaiter.cancel();
				expandAwaiter.cancel();
				slideAwaiter.cancel();
				resetAwaiter.cancel();
			};
		}

		const controller = new AbortController();

		const runSequence = async () => {
			while (!controller.signal.aborted) {
				await pauseGate(pausedRef, controller.signal);
				if (controller.signal.aborted) {
					break;
				}

				const currentQueue = queueRef.current;
				const baseQueue = baseQueueRef.current;
				if (currentQueue.length <= 1 || baseQueue.length <= 1) {
					break;
				}

				const currentKey = activeQueueKeyRef.current ?? currentQueue[0]?._queueKey ?? null;
				if (!currentKey) {
					break;
				}

				const manualTargetKey = manualTargetKeyRef.current;
				const isValidManualTarget =
					Boolean(manualTargetKey) &&
					currentQueue.some(item => item._queueKey === manualTargetKey);
				if (isValidManualTarget && manualTargetKey) {
					manualTargetKeyRef.current = null;
					if (manualTargetKey !== currentKey) {
						const rotatedManualQueue = rotateQueueToKey(currentQueue, manualTargetKey);
						queueRef.current = rotatedManualQueue;
						setQueue(rotatedManualQueue);
						activeQueueKeyRef.current = manualTargetKey;
						setActiveQueueKey(manualTargetKey);
						const manualBaseIndex = baseQueue.findIndex(
							item => item._queueKey === manualTargetKey
						);
						if (manualBaseIndex >= 0) {
							activeBaseIndexRef.current = manualBaseIndex;
						}
						setResetOffsetY(0);
						setSlideOffsetY(0);
					}
					setPhase('idle');
					continue;
				}

				let currentBaseIndex = activeBaseIndexRef.current;
				if (baseQueue[currentBaseIndex]?._queueKey !== currentKey) {
					currentBaseIndex = baseQueue.findIndex(item => item._queueKey === currentKey);
				}

				if (currentBaseIndex < 0) {
					const fallbackKey = currentQueue[0]?._queueKey ?? null;
					if (!fallbackKey) {
						break;
					}
					activeQueueKeyRef.current = fallbackKey;
					setActiveQueueKey(fallbackKey);
					const fallbackBaseIndex = baseQueue.findIndex(item => item._queueKey === fallbackKey);
					activeBaseIndexRef.current = fallbackBaseIndex >= 0 ? fallbackBaseIndex : 0;
					await wait(40, controller.signal);
					continue;
				}
				activeBaseIndexRef.current = currentBaseIndex;

				await waitWithPause(EVENT_EXPANDED_HOLD_MS, pausedRef, controller.signal);
				if (controller.signal.aborted) {
					break;
				}

				setPhase('collapse_current');
				collapseTargetKeyRef.current = currentKey;
				const collapsed = Promise.race([
					collapseAwaiterRef.current.wait(),
					wait(EVENT_COLLAPSE_MS + EVENT_SIGNAL_FALLBACK_BUFFER_MS, controller.signal)
				]);
				activeQueueKeyRef.current = null;
				setActiveQueueKey(null);
				await collapsed;
				if (controller.signal.aborted) {
					break;
				}

				await waitWithPause(EVENT_PRE_SLIDE_DELAY_MS, pausedRef, controller.signal);
				if (controller.signal.aborted) {
					break;
				}

				const nextBaseIndex = (currentBaseIndex + 1) % baseQueue.length;
				const nextBaseKey = baseQueue[nextBaseIndex]?._queueKey ?? null;
				if (!nextBaseKey) {
					break;
				}

				const firstItemElement = listRef.current?.firstElementChild as HTMLElement | null;
				const firstItemHeight = firstItemElement?.getBoundingClientRect().height ?? 0;
				const rowStep =
					firstItemHeight > 0
						? firstItemHeight + EVENT_STACK_GAP_PX
						: EVENT_MIN_SLIDE_DISTANCE_PX;

				const isLastItem = currentBaseIndex === baseQueue.length - 1;

				if (!isLastItem) {
					setPhase('slide_queue_up');
					const slid = Promise.race([
						slideAwaiterRef.current.wait(),
						wait(EVENT_SLIDE_MS + EVENT_SIGNAL_FALLBACK_BUFFER_MS, controller.signal)
					]);
					setSlideOffsetY(-rowStep);
					await slid;
					if (controller.signal.aborted) {
						break;
					}

					const rotatedQueue = rotateLeft(queueRef.current);
					queueRef.current = rotatedQueue;
					setQueue(rotatedQueue);
					setPhase('idle');
					setSlideOffsetY(0);
				} else {
					// Start from the "last item at top" visual position and sweep down to base order.
					const resetDistance = rowStep * Math.max(baseQueue.length - 1, 1);
					queueRef.current = baseQueue;
					setQueue(baseQueue);
					setSlideOffsetY(-resetDistance);
					setResetOffsetY(0);

					setPhase('reset_queue_down');
					const resetDone = Promise.race([
						resetAwaiterRef.current.wait(),
						wait(EVENT_RESET_DOWN_MS + EVENT_SIGNAL_FALLBACK_BUFFER_MS, controller.signal)
					]);
					setResetOffsetY(resetDistance);
					await resetDone;
					if (controller.signal.aborted) {
						break;
					}

					setPhase('idle');
					setSlideOffsetY(0);
					setResetOffsetY(0);
				}

				setPhase('expand_next');
				expandTargetKeyRef.current = nextBaseKey;
				const expanded = Promise.race([
					expandAwaiterRef.current.wait(),
					wait(EVENT_EXPAND_MS + EVENT_SIGNAL_FALLBACK_BUFFER_MS, controller.signal)
				]);
				activeBaseIndexRef.current = nextBaseIndex;
				activeQueueKeyRef.current = nextBaseKey;
				setActiveQueueKey(nextBaseKey);
				await expanded;
				setPhase('idle');
			}
		};

		runSequence();

		return () => {
			controller.abort();
			collapseAwaiter.cancel();
			expandAwaiter.cancel();
			slideAwaiter.cancel();
			resetAwaiter.cancel();
		};
	}, [prefersReducedMotion, sequenceVersion]);

	return (
		<article className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6'>
			<div className='mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-700'>
				<CalendarDays className='h-4 w-4 text-blue-700' />
				<span>Events Spotlight</span>
			</div>

			{queue.length > 0 ? (
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
					className='space-y-3 overflow-hidden'
					style={
						queue.length > 1 && stackViewportHeight
							? { height: `${stackViewportHeight}px` }
							: undefined
					}>
					<motion.ul
						ref={listRef}
						animate={{ y: resetOffsetY + slideOffsetY }}
						transition={{
							duration:
								(phase === 'slide_queue_up'
									? EVENT_SLIDE_MS
									: phase === 'reset_queue_down'
										? EVENT_RESET_DOWN_MS
										: 0) / 1000,
							ease: EVENT_LAYOUT_EASE
						}}
						style={{ willChange: 'transform' }}
						onAnimationComplete={() => {
							if (phaseRef.current === 'slide_queue_up') {
								slideAwaiterRef.current.resolve();
								return;
							}
							if (phaseRef.current === 'reset_queue_down') {
								resetAwaiterRef.current.resolve();
							}
						}}
						className='space-y-3'>
						{queue.map(event => {
							const isExpanded = event._queueKey === activeQueueKey;

							return (
								<EventStackRow
									key={event._queueKey}
									event={event}
									isExpanded={isExpanded}
									onExpandedAnimationComplete={queueKey => {
										if (
											phaseRef.current === 'expand_next' &&
											expandTargetKeyRef.current === queueKey
										) {
											expandAwaiterRef.current.resolve();
										}
									}}
									onCollapsedAnimationComplete={queueKey => {
										if (
											phaseRef.current === 'collapse_current' &&
											collapseTargetKeyRef.current === queueKey
										) {
											collapseAwaiterRef.current.resolve();
										}
									}}
									onActivate={() => {
										if (prefersReducedMotion) {
											activeQueueKeyRef.current = event._queueKey;
											setActiveQueueKey(event._queueKey);
											return;
										}

										if (isExpanded) {
											return;
										}

										if (phaseRef.current === 'idle') {
											const rotatedQueue = rotateQueueToKey(queueRef.current, event._queueKey);
											queueRef.current = rotatedQueue;
											setQueue(rotatedQueue);
											activeQueueKeyRef.current = event._queueKey;
											setActiveQueueKey(event._queueKey);
											const manualBaseIndex = baseQueueRef.current.findIndex(
												item => item._queueKey === event._queueKey
											);
											if (manualBaseIndex >= 0) {
												activeBaseIndexRef.current = manualBaseIndex;
											}
											manualTargetKeyRef.current = null;
											setResetOffsetY(0);
											setSlideOffsetY(0);
											setPhase('idle');
											setSequenceVersion(previous => previous + 1);
											return;
										}

										manualTargetKeyRef.current = event._queueKey;
									}}
								/>
							);
						})}
					</motion.ul>
				</div>
			) : (
				<p className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600'>
					No events available right now.
				</p>
			)}
		</article>
	);
}
