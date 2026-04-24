'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import { Download, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAdmissionsIcon } from '@/lib/admissions-icons';
import type {
	AdmissionsBrochureConfig,
	AdmissionsBrochureItem
} from '@/app/(Private Pages)/actions/admissions';

type ScrapeResponse = {
	success: boolean;
	autoDetectEnabled: boolean;
	brochures?: {
		undergraduate?: string;
		postgraduate?: string;
		ugText?: string;
		pgText?: string;
	};
	items: AdmissionsBrochureItem[];
	message: string;
	source: 'scrape' | 'db';
};

type Props = {
	config?: AdmissionsBrochureConfig | null;
	items?: AdmissionsBrochureItem[];
};

const EMPTY_CONFIG: AdmissionsBrochureConfig = {
	heroBadge: '',
	heroTitle: '',
	heroSubtitle: '',
	autoDetectEnabled: false,
	emptyStateTitle: '',
	emptyStateDescription: ''
};

const applyScrapeToItems = (
	baseItems: AdmissionsBrochureItem[],
	brochures?: ScrapeResponse['brochures']
): AdmissionsBrochureItem[] => {
	if (!brochures) return baseItems;
	return baseItems.map(item => {
		if (item.id === 'undergraduate' && brochures.undergraduate) {
			return {
				...item,
				url: brochures.undergraduate,
				lastUpdated: brochures.ugText || item.lastUpdated
			};
		}
		if (item.id === 'postgraduate' && brochures.postgraduate) {
			return {
				...item,
				url: brochures.postgraduate,
				lastUpdated: brochures.pgText || item.lastUpdated
			};
		}
		return item;
	});
};

export default function BrochureExplorer({ config, items = [] }: Props) {
	const safeConfig = config ?? EMPTY_CONFIG;
	const posthog = usePostHog();
	const [brochures, setBrochures] = useState<AdmissionsBrochureItem[]>(items);
	const [message, setMessage] = useState('');
	const [isRefreshing, setIsRefreshing] = useState(false);
	const hasHeroContent = Boolean(
		safeConfig.heroBadge || safeConfig.heroTitle || safeConfig.heroSubtitle || safeConfig.autoDetectEnabled || message
	);

	const hasItems = useMemo(() => brochures.length > 0, [brochures.length]);

	const fetchLiveBrochures = useCallback(async () => {
		if (!safeConfig.autoDetectEnabled) return;
		setIsRefreshing(true);
		try {
			const response = await fetch('/api/scrape-brochures', { cache: 'no-store' });
			const payload = (await response.json()) as ScrapeResponse;

			if (payload.success && payload.source === 'scrape') {
				setBrochures(current => applyScrapeToItems(current, payload.brochures));
			}
			if (payload.items?.length) {
				setBrochures(current => {
					const source = payload.success ? current : payload.items;
					return source;
				});
			}
			setMessage(payload.message || 'Brochure status updated.');
		} catch {
			setMessage('Unable to refresh brochure links right now.');
		} finally {
			setIsRefreshing(false);
		}
	}, [safeConfig.autoDetectEnabled]);

	useEffect(() => {
		void fetchLiveBrochures();
	}, [fetchLiveBrochures]);

	const brochureProxyUrl = (brochure: AdmissionsBrochureItem, mode: 'download' | 'view') => {
		const params = new URLSearchParams({
			url: brochure.url,
			title: brochure.title,
			mode
		});
		return `/api/brochure-download?${params.toString()}`;
	};

	return (
		<div className='space-y-6'>
			{hasHeroContent ? (
				<section className='rounded-xl border border-slate-200 bg-white p-6'>
					{safeConfig.heroBadge ? (
						<p className='text-xs font-semibold uppercase tracking-[0.14em] text-blue-700'>
							{safeConfig.heroBadge}
						</p>
					) : null}
					{safeConfig.heroTitle ? (
						<h1 className='mt-2 text-3xl font-bold text-slate-900 md:text-4xl'>{safeConfig.heroTitle}</h1>
					) : null}
					{safeConfig.heroSubtitle ? (
						<p className='mt-3 text-slate-600'>{safeConfig.heroSubtitle}</p>
					) : null}
					<div className='mt-4 flex flex-wrap items-center gap-2'>
						<span
							className={`rounded-full px-3 py-1 text-xs font-medium ${
								safeConfig.autoDetectEnabled
									? 'bg-emerald-100 text-emerald-700'
									: 'bg-amber-100 text-amber-700'
							}`}>
							{safeConfig.autoDetectEnabled ? 'Auto-detect enabled' : 'Auto-detect disabled'}
						</span>
						{safeConfig.autoDetectEnabled ? (
							<Button
								variant='outline'
								onClick={() => void fetchLiveBrochures()}
								disabled={isRefreshing}>
								<RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
								Refresh
							</Button>
						) : null}
					</div>
					{message ? <p className='mt-3 text-xs text-slate-500'>{message}</p> : null}
				</section>
			) : null}

			{hasItems ? (
				<div className='grid gap-4 md:grid-cols-2'>
					{brochures.map(item => {
						const Icon = getAdmissionsIcon(item.icon);
						return (
							<article key={item.id} className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
								<div className='inline-flex rounded-lg bg-blue-50 p-2 text-blue-700'>
									<Icon className='h-5 w-5' />
								</div>
								<h2 className='mt-3 text-lg font-semibold text-slate-900'>{item.title}</h2>
								<p className='mt-2 text-sm text-slate-600'>{item.description}</p>
								{item.lastUpdated ? (
									<p className='mt-2 text-xs text-slate-500'>{item.lastUpdated}</p>
								) : null}
								<div className='mt-4 flex flex-col gap-2 sm:flex-row'>
									<Button
										className='flex-1 bg-blue-700 hover:bg-blue-800'
										onClick={() => {
											posthog?.capture('brochure_download', {
												brochure_id: item.id,
												brochure_title: item.title
											});
											window.location.assign(brochureProxyUrl(item, 'download'));
										}}>
										<Download className='mr-2 h-4 w-4' />
										Download
									</Button>
									<Button
										variant='outline'
										className='flex-1'
										onClick={() => {
											posthog?.capture('brochure_view', {
												brochure_id: item.id,
												brochure_title: item.title
											});
											window.open(
												brochureProxyUrl(item, 'view'),
												'_blank',
												'noopener,noreferrer'
											);
										}}>
										<ExternalLink className='mr-2 h-4 w-4' />
										View
									</Button>
								</div>
							</article>
						);
					})}
				</div>
			) : (
				<section className='rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center'>
					<h2 className='text-lg font-semibold text-slate-900'>
						{safeConfig.emptyStateTitle || 'No brochure items configured'}
					</h2>
					<p className='mt-2 text-sm text-slate-600'>
						{safeConfig.emptyStateDescription || 'Please add brochure items from admin.'}
					</p>
				</section>
			)}
		</div>
	);
}
