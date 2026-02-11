import { useEffect, useState, type MutableRefObject } from 'react';
import type { Easing } from 'framer-motion';
import type { PhaseAwaiter } from './types';

export const NOTICE_WAIT_MS = 1500;
export const NOTICE_SLIDE_MS = 360;
export const NOTICE_RESET_MS = 620;
export const NOTICE_CARD_HEIGHT_PX = 168;
export const NOTICE_CARD_GAP_PX = 12;
export const NOTICE_STEP_EASE: Easing = 'linear';
export const NOTICE_RESET_EASE: Easing = [0.16, 1, 0.3, 1];

export const EVENT_PHASE_DELAY_MS = 200;
export const EVENT_PRE_SLIDE_DELAY_MS = 100;
export const EVENT_EXPANDED_HOLD_MS = 1500;
export const EVENT_COLLAPSE_MS = 380;
export const EVENT_EXPAND_MS = 460;
export const EVENT_SLIDE_MS = 240;
export const EVENT_RESET_DOWN_MS = 520;
export const EVENT_STACK_GAP_PX = 12;
export const EVENT_MIN_SLIDE_DISTANCE_PX = 104;
export const EVENT_LAYOUT_EASE: Easing = [0.22, 1, 0.36, 1];
export const EVENT_EXPAND_EASE: Easing = [0.16, 1, 0.3, 1];
export const EVENT_COLLAPSE_EASE: Easing = [0.4, 0, 0.2, 1];
export const EVENT_SIGNAL_FALLBACK_BUFFER_MS = 80;

const parseDate = (value: string): Date | null => {
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) {
		return null;
	}
	return parsed;
};

export const formatDate = (value: string): string => {
	const parsed = parseDate(value);
	if (!parsed) {
		return value;
	}
	return new Intl.DateTimeFormat('en-IN', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(parsed);
};

export const toSafeHref = (href?: string): string => {
	if (!href) {
		return '#';
	}
	if (href.startsWith('/') || href.startsWith('https://') || href.startsWith('http://')) {
		return href;
	}
	return '#';
};

export const dedupeByIdAndTitle = <T extends { id?: string; title: string }>(
	items: T[]
): T[] => {
	const seen = new Set<string>();
	return items.filter(item => {
		const key = `${item.id ?? ''}-${item.title}`;
		if (seen.has(key)) {
			return false;
		}
		seen.add(key);
		return true;
	});
};

export const sortByDateDesc = <T extends { date: string }>(items: T[]): T[] =>
	[...items].sort((a, b) => {
		const dateA = parseDate(a.date)?.getTime() ?? 0;
		const dateB = parseDate(b.date)?.getTime() ?? 0;
		return dateB - dateA;
	});

export const sortByDateAsc = <T extends { date: string }>(items: T[]): T[] =>
	[...items].sort((a, b) => {
		const dateA = parseDate(a.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
		const dateB = parseDate(b.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
		return dateA - dateB;
	});

export const rotateLeft = <T,>(items: T[]): T[] => {
	if (items.length <= 1) {
		return items;
	}
	const [first, ...rest] = items;
	if (!first) {
		return items;
	}
	return [...rest, first];
};

export const createPhaseAwaiter = (): PhaseAwaiter => {
	const resolverRef: { current: null | (() => void) } = { current: null };

	return {
		wait: () =>
			new Promise<void>(resolve => {
				resolverRef.current = () => {
					resolverRef.current = null;
					resolve();
				};
			}),
		resolve: () => {
			if (resolverRef.current) {
				resolverRef.current();
			}
		},
		cancel: () => {
			if (resolverRef.current) {
				resolverRef.current();
			}
		}
	};
};

export const wait = (ms: number, signal: AbortSignal): Promise<void> =>
	new Promise(resolve => {
		if (signal.aborted) {
			resolve();
			return;
		}

		const timeoutId = window.setTimeout(() => {
			resolve();
		}, ms);

		const onAbort = () => {
			window.clearTimeout(timeoutId);
			resolve();
		};

		signal.addEventListener('abort', onAbort, { once: true });
	});

export const pauseGate = async (
	pausedRef: MutableRefObject<boolean>,
	signal: AbortSignal
): Promise<void> => {
	while (pausedRef.current && !signal.aborted) {
		await wait(40, signal);
	}
};

export const waitWithPause = async (
	totalMs: number,
	pausedRef: MutableRefObject<boolean>,
	signal: AbortSignal
): Promise<void> => {
	let remaining = totalMs;
	while (remaining > 0 && !signal.aborted) {
		await pauseGate(pausedRef, signal);
		if (signal.aborted) {
			return;
		}

		const slice = Math.min(40, remaining);
		await wait(slice, signal);
		if (!pausedRef.current) {
			remaining -= slice;
		}
	}
};

export function usePageVisibilityPaused(): boolean {
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		const updateVisibility = () => {
			setIsHidden(document.visibilityState !== 'visible');
		};

		updateVisibility();
		document.addEventListener('visibilitychange', updateVisibility);
		return () => {
			document.removeEventListener('visibilitychange', updateVisibility);
		};
	}, []);

	return isHidden;
}

export function useNoticeVisibleCount() {
	const [visibleCount, setVisibleCount] = useState(3);

	useEffect(() => {
		const updateVisibleCount = () => {
			if (window.innerWidth >= 1024) {
				setVisibleCount(3);
				return;
			}
			if (window.innerWidth >= 768) {
				setVisibleCount(2);
				return;
			}
			setVisibleCount(1);
		};

		updateVisibleCount();
		window.addEventListener('resize', updateVisibleCount);
		return () => {
			window.removeEventListener('resize', updateVisibleCount);
		};
	}, []);

	return visibleCount;
}
