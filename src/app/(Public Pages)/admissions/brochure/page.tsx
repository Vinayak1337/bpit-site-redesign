'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
	Calendar,
	Download,
	ExternalLink,
	FileText,
	GraduationCap,
	RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrochureInfo {
	id: string;
	title: string;
	description: string;
	icon: React.ReactElement;
	url: string;
	lastUpdated?: string;
	isAutoDetected?: boolean;
	detectedText?: string;
}

interface ScrapedBrochures {
	undergraduate?: string;
	postgraduate?: string;
	ugText?: string;
	pgText?: string;
}

type BrochureFetchResult = {
	urls: ScrapedBrochures;
	autoDetected: boolean;
	status: string;
};

const getCurrentBrochureUrls = (): ScrapedBrochures => {
	const currentYear = new Date().getFullYear();

	if (currentYear === 2025) {
		return {
			undergraduate: 'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
			postgraduate: 'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf'
		};
	}

	const yearSuffix = currentYear.toString().slice(2);
	return {
		undergraduate: `http://www.ipu.ac.in/Pubinfo${currentYear}/adm${yearSuffix}brug.pdf`,
		postgraduate: `http://www.ipu.ac.in/Pubinfo${currentYear}/adm${yearSuffix}brPG.pdf`
	};
};

const normalizeIpuUrl = (url: string | undefined): string | undefined => {
	if (!url) return undefined;
	const trimmed = url.trim();
	if (!trimmed) return undefined;
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
		return trimmed;
	}
	return `http://www.ipu.ac.in/${trimmed.replace(/^\/+/, '')}`;
};

export default function BrochurePage() {
	const [brochures, setBrochures] = useState<BrochureInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [lastChecked, setLastChecked] = useState('');
	const [scrapingStatus, setScrapingStatus] = useState('');
	const [autoDetected, setAutoDetected] = useState(false);

	const currentYear = useMemo(() => new Date().getFullYear(), []);

	const fetchBrochuresFromIPU = useCallback(async (): Promise<BrochureFetchResult> => {
		try {
			const response = await fetch('/api/scrape-brochures', {
				cache: 'no-store'
			});
			const data = await response.json();

			if (data.success && data.brochures) {
				return {
					urls: {
						undergraduate: normalizeIpuUrl(data.brochures.undergraduate),
						postgraduate: normalizeIpuUrl(data.brochures.postgraduate),
						ugText: data.brochures.ugText,
						pgText: data.brochures.pgText
					},
					autoDetected: true,
					status: 'Live brochure links loaded from IPU website.'
				};
			}

			const fallback = data.fallback || getCurrentBrochureUrls();
			return {
				urls: {
					undergraduate: normalizeIpuUrl(fallback.undergraduate),
					postgraduate: normalizeIpuUrl(fallback.postgraduate),
					ugText: fallback.ugText,
					pgText: fallback.pgText
				},
				autoDetected: false,
				status: 'Using fallback brochure links (auto-detection unavailable).'
			};
		} catch {
			const fallback = getCurrentBrochureUrls();
			return {
				urls: {
					undergraduate: normalizeIpuUrl(fallback.undergraduate),
					postgraduate: normalizeIpuUrl(fallback.postgraduate)
				},
				autoDetected: false,
				status: 'Could not reach IPU scan endpoint. Using fallback links.'
			};
		}
	}, []);

	const initializeBrochures = useCallback(async () => {
		setIsLoading(true);
		const { urls, autoDetected: detected, status } = await fetchBrochuresFromIPU();

		const data: BrochureInfo[] = [
			{
				id: 'undergraduate',
				title: 'Undergraduate Admissions Brochure',
				description: `B.Tech, BBA and other undergraduate programs for Academic Year ${currentYear}-${currentYear + 1}.`,
				icon: <GraduationCap className='h-7 w-7' />,
				url:
					urls.undergraduate ||
					'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
				lastUpdated: new Date().toLocaleString(),
				isAutoDetected: detected && Boolean(urls.undergraduate),
				detectedText: urls.ugText
			},
			{
				id: 'postgraduate',
				title: 'Postgraduate Admissions Brochure',
				description: `MBA, M.Tech and other postgraduate programs for Academic Year ${currentYear}-${currentYear + 1}.`,
				icon: <FileText className='h-7 w-7' />,
				url:
					urls.postgraduate ||
					'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf',
				lastUpdated: new Date().toLocaleString(),
				isAutoDetected: detected && Boolean(urls.postgraduate),
				detectedText: urls.pgText
			}
		];

		setBrochures(data);
		setAutoDetected(detected);
		setScrapingStatus(status);
		setLastChecked(new Date().toLocaleString());
		setIsLoading(false);
	}, [currentYear, fetchBrochuresFromIPU]);

	const refreshBrochureUrls = async () => {
		setIsRefreshing(true);
		setScrapingStatus('Refreshing brochure links from IPU...');
		await initializeBrochures();
		setIsRefreshing(false);
	};

	const brochureProxyUrl = (brochure: BrochureInfo, mode: 'download' | 'view') => {
		const params = new URLSearchParams({
			url: brochure.url,
			title: brochure.title,
			mode
		});
		return `/api/brochure-download?${params.toString()}`;
	};

	const downloadBrochure = (brochure: BrochureInfo) => {
		window.location.assign(brochureProxyUrl(brochure, 'download'));
	};

	const openBrochure = (brochure: BrochureInfo) => {
		window.open(brochureProxyUrl(brochure, 'view'), '_blank', 'noopener,noreferrer');
	};

	useEffect(() => {
		initializeBrochures();
	}, [initializeBrochures]);

	return (
		<main className='min-h-screen bg-slate-50'>
			<section className='relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 py-16 text-white md:py-20'>
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_58%)]' />
				<div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent' />
				<div className='container relative z-10 mx-auto px-4 text-center'>
					<div className='mx-auto max-w-4xl space-y-4'>
						<div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm'>
							<FileText className='h-4 w-4' />
							Admissions Brochure
						</div>
						<h1 className='text-3xl font-bold tracking-tight md:text-5xl'>
							Brochure {currentYear}-{currentYear + 1}
						</h1>
						<p className='text-base text-slate-200 md:text-xl'>
							Official brochure links with direct download and view support.
						</p>
					</div>
				</div>
			</section>

			<div className='container mx-auto space-y-6 px-4 py-8 md:py-12'>
				<section className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6'>
					<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
						<div className='space-y-1'>
							<div className='flex items-center gap-2 text-slate-800'>
								<Calendar className='h-5 w-5 text-blue-700' />
								<span className='font-semibold'>
									Academic Year {currentYear}-{currentYear + 1}
								</span>
							</div>
							<p className='text-xs text-slate-500'>Last checked: {lastChecked}</p>
							<p className='text-xs text-blue-700'>{scrapingStatus}</p>
						</div>
						<div className='flex flex-wrap items-center gap-2'>
							{autoDetected ? (
								<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
									Live links detected
								</span>
							) : (
								<span className='rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700'>
									Fallback links in use
								</span>
							)}
							<Button
								onClick={refreshBrochureUrls}
								disabled={isRefreshing || isLoading}
								className='bg-blue-700 hover:bg-blue-800'
								trackingEvent='brochure_refresh_clicked'>
								<RefreshCw
									className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
								/>
								Refresh
							</Button>
						</div>
					</div>
				</section>

				<div className='grid gap-6 lg:grid-cols-2'>
					{brochures.map((brochure, index) => (
						<motion.section
							key={brochure.id}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: index * 0.08 }}
							className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
							<div className='border-b border-slate-200 bg-slate-50 p-5'>
								<div className='flex items-start gap-3'>
									<div className='rounded-lg bg-blue-100 p-2 text-blue-700'>
										{brochure.icon}
									</div>
									<div className='space-y-1'>
										<h3 className='text-xl font-semibold text-slate-900'>
											{brochure.title}
										</h3>
										<p className='text-xs text-slate-500'>
											{brochure.isAutoDetected
												? 'Detected from IPU website'
												: 'Using fallback source'}
										</p>
										{brochure.detectedText ? (
											<p className='text-xs text-slate-500'>
												Source: &quot;{brochure.detectedText}&quot;
											</p>
										) : null}
									</div>
								</div>
							</div>

							<div className='space-y-5 p-5'>
								<p className='text-sm leading-relaxed text-slate-600'>
									{brochure.description}
								</p>
								<div className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
									<h4 className='mb-2 text-sm font-semibold text-slate-800'>
										Includes
									</h4>
									<ul className='space-y-1 text-xs text-slate-600'>
										<li>• Programs and eligibility details</li>
										<li>• Admission process and timeline</li>
										<li>• Fee structure and policies</li>
										<li>• Infrastructure and support services</li>
									</ul>
								</div>
								<div className='flex flex-col gap-3 sm:flex-row'>
									<Button
										onClick={() => downloadBrochure(brochure)}
										className='flex-1 bg-blue-700 hover:bg-blue-800'
										trackingEvent='brochure_download_clicked'
										trackingData={{ brochure: brochure.title, url: brochure.url }}>
										<Download className='mr-2 h-4 w-4' />
										Download PDF
									</Button>
									<Button
										variant='outline'
										onClick={() => openBrochure(brochure)}
										className='flex-1 border-slate-300'
										trackingEvent='brochure_view_clicked'
										trackingData={{ brochure: brochure.title, url: brochure.url }}>
										<ExternalLink className='mr-2 h-4 w-4' />
										View Online
									</Button>
								</div>
							</div>
						</motion.section>
					))}
				</div>
			</div>
		</main>
	);
}
