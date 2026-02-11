'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
	aboutBPITItems,
	admissionsItems,
	academicsItems,
	departmentItems,
	placementsItems,
	studentLifeItems,
	studentPortalItems
} from '@/data/nav-items';
import { Home, Search } from 'lucide-react';
import {
	PUBLIC_TO_ADMIN_PAGE_MAP,
	type AdminCoverageStatus,
	type AdminEditingMode,
	type AdminPageCoverage
} from '@/data/admin-page-map';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

type NavItem = {
	title: string;
	href: string;
	description?: string;
	icon?: React.ReactNode;
};

type Group = { key: string; label: string; items: NavItem[] };

type StatusFilter = 'all' | 'complete' | 'missing';

type PageRow = {
	title: string;
	description?: string;
	icon?: React.ReactNode;
	publicHref: string;
	isExternal: boolean;
	coverage: AdminPageCoverage | null;
};

const statusClasses: Record<AdminCoverageStatus, string> = {
	complete: 'bg-emerald-100 text-emerald-800 border-emerald-200',
	missing: 'bg-rose-100 text-rose-800 border-rose-200'
};

const modeLabel: Record<AdminEditingMode, string> = {
	live: 'Live',
	form: 'Form',
	none: 'No editor'
};

const statusFilters: Array<{ key: StatusFilter; label: string }> = [
	{ key: 'all', label: 'All' },
	{ key: 'complete', label: 'Complete' },
	{ key: 'missing', label: 'Missing' }
];

const implementedSubpages: Group[] = [
	{
		key: 'about-subpages',
		label: 'About Subpages',
		items: [
			{ title: 'Founder Tribute', href: '/about/founder-tribute' },
			{ title: 'Chairman Message', href: '/about/chairman-message' },
			{ title: 'Principal Message', href: '/about/principal-message' }
		]
	},
	{
		key: 'vision-subpages',
		label: 'Vision & Mission Subpages',
		items: [
			{ title: 'Mission', href: '/vision-mission/mission' },
			{ title: 'Quality Policy', href: '/vision-mission/quality-policy' }
		]
	},
	{
		key: 'management-subpages',
		label: 'Management Subpages',
		items: [
			{ title: 'Leadership Team', href: '/management/leadership-team' },
			{ title: 'Governance Structure', href: '/management/governance-structure' },
			{ title: 'Policies & Procedures', href: '/management/policies-procedures' }
		]
	},
	{
		key: 'statutory-subpages',
		label: 'Statutory Subpages',
		items: [
			{ title: 'IQAC', href: '/statutory-committees/iqac' },
			{ title: 'Anti-Ragging', href: '/statutory-committees/anti-ragging' },
			{
				title: 'Internal Complaints',
				href: '/statutory-committees/internal-complaints'
			},
			{ title: 'Student Welfare', href: '/statutory-committees/student-welfare' },
			{
				title: 'Grievance Redressal',
				href: '/statutory-committees/grievance-redressal'
			}
		]
	},
	{
		key: 'student-life-subpages',
		label: 'Student Life Subpages',
		items: [{ title: 'Student Life Overview', href: '/student-life' }]
	}
];

const normalizePublicHref = (href: string): string => {
	if (href === '/home' || href === '/admin/home') return '/';
	return href.startsWith('/') ? href : `/${href}`;
};

const NavPagesGrid: React.FC = () => {
	const [query, setQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

	const groups: Group[] = useMemo(
		() => [
			{
				key: 'main',
				label: 'Main Page',
				items: [{ title: 'Homepage', href: '/home', icon: <Home className='w-5 h-5' /> }]
			},
			{ key: 'about', label: 'About BPIT', items: aboutBPITItems as NavItem[] },
			{ key: 'admissions', label: 'Admissions', items: admissionsItems as NavItem[] },
			{ key: 'academics', label: 'Academics', items: academicsItems as NavItem[] },
			{ key: 'departments', label: 'Departments', items: departmentItems as NavItem[] },
			{ key: 'placements', label: 'Placements', items: placementsItems as NavItem[] },
			{ key: 'student-life', label: 'Student Life', items: studentLifeItems as NavItem[] },
			{ key: 'student-portal', label: 'Student Portal', items: studentPortalItems as NavItem[] },
			...implementedSubpages
		],
		[]
	);

	const normalizedQuery = query.trim().toLowerCase();

	const groupedRows = useMemo(() => {
		return groups
			.map(group => {
				const uniqueItems = Array.from(
					new Map(group.items.map(item => [normalizePublicHref(item.href), item])).values()
				);

				const rows: PageRow[] = uniqueItems.map(item => {
					const isExternal = /^https?:\/\//.test(item.href);
					const publicHref = isExternal
						? item.href
						: normalizePublicHref(item.href);

					const coverage = isExternal
						? null
						: PUBLIC_TO_ADMIN_PAGE_MAP[publicHref] ?? {
								adminHref: null,
								status: 'missing',
								editingMode: 'none',
								note: 'No mapped admin editor exists yet.'
						  };

					return {
						title: item.title,
						description: item.description,
						icon: item.icon,
						publicHref,
						isExternal,
						coverage
					};
				});

				const filteredRows = rows.filter(row => {
					const matchesQuery =
						!normalizedQuery ||
						row.title.toLowerCase().includes(normalizedQuery) ||
						row.publicHref.toLowerCase().includes(normalizedQuery);

					const matchesStatus =
						statusFilter === 'all' ||
						(!row.isExternal &&
							(statusFilter === 'complete'
								? row.coverage?.status === 'complete'
								: row.coverage?.status === 'missing'));

					return matchesQuery && matchesStatus;
				});

				return { ...group, rows: filteredRows };
			})
			.filter(group => group.rows.length > 0);
	}, [groups, normalizedQuery, statusFilter]);

	const counts = useMemo(() => {
		const allRows = groups.flatMap(group => group.items).map(item => {
			const isExternal = /^https?:\/\//.test(item.href);
			if (isExternal) {
				return { isExternal: true, status: 'missing' as AdminCoverageStatus };
			}

			const coverage = PUBLIC_TO_ADMIN_PAGE_MAP[normalizePublicHref(item.href)];
			return {
				isExternal: false,
				status: coverage?.status ?? ('missing' as AdminCoverageStatus)
			};
		});

		const editableRows = allRows.filter(row => !row.isExternal);
		return {
			all: editableRows.length,
			complete: editableRows.filter(row => row.status === 'complete').length,
			missing: editableRows.filter(row => row.status === 'missing').length
		};
	}, [groups]);

	return (
		<div className='space-y-6'>
			<Card className='border-slate-200 sticky top-3 z-20'>
				<CardContent className='pt-6 space-y-4'>
					<div className='flex flex-col xl:flex-row gap-3 xl:items-center xl:justify-between'>
						<div className='relative w-full xl:max-w-lg'>
							<Search className='absolute left-3 top-2.5 h-4 w-4 text-slate-400' />
							<Input
								value={query}
								onChange={e => setQuery(e.target.value)}
								placeholder='Search page title or URL'
								className='pl-9'
							/>
						</div>
						<div className='flex items-center gap-2 flex-wrap'>
							{statusFilters.map(filter => (
								<Button
									key={filter.key}
									type='button'
									size='sm'
									variant={statusFilter === filter.key ? 'default' : 'outline'}
									onClick={() => setStatusFilter(filter.key)}>
									{filter.label}
									<Badge
										variant='secondary'
										className='ml-1 text-[10px] px-1.5 py-0 bg-white/70'>
										{counts[filter.key]}
									</Badge>
								</Button>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='space-y-4'>
				{groupedRows.map(group => (
					<Card key={group.key} className='border-slate-200'>
						<CardHeader className='pb-3'>
							<div className='flex items-center justify-between'>
								<CardTitle className='text-slate-900 text-lg'>{group.label}</CardTitle>
								<Badge variant='outline'>{group.rows.length}</Badge>
							</div>
							<CardDescription>
								Open public page, then jump to mapped admin editor.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							{group.rows.map(row => (
								<div
									key={`${group.key}-${row.title}-${row.publicHref}`}
									className='rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors'>
									<div className='grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start'>
										<div className='min-w-0'>
											<div className='flex items-center gap-2'>
												<span className='text-slate-600'>{row.icon}</span>
												<p className='font-medium text-slate-900 truncate'>{row.title}</p>
											</div>
											<p className='text-xs text-slate-500 mt-1 truncate'>
												{row.publicHref}
											</p>
											<div className='flex items-center gap-2 mt-2 flex-wrap'>
												{row.isExternal ? (
													<Badge variant='outline'>External</Badge>
												) : row.coverage ? (
													<>
														<Badge
															variant='outline'
															className={statusClasses[row.coverage.status]}>
															{row.coverage.status}
														</Badge>
														<Badge variant='outline'>
															{modeLabel[row.coverage.editingMode]}
														</Badge>
													</>
												) : null}
											</div>
											{row.description ? (
												<p className='text-xs text-slate-500 mt-2'>{row.description}</p>
											) : null}
											{row.coverage?.note ? (
												<p className='text-xs text-slate-500 mt-1'>{row.coverage.note}</p>
											) : null}
										</div>

										<div className='flex items-center gap-2 shrink-0'>
											{row.isExternal ? (
												<a
													href={row.publicHref}
													target='_blank'
													rel='noreferrer'
													aria-label={`Open ${row.title}`}>
													<Button variant='outline' size='sm'>
														Open
													</Button>
												</a>
											) : (
												<Link
													href={row.publicHref}
													target='_blank'
													aria-label={`Open ${row.title}`}>
													<Button variant='outline' size='sm'>
														Open
													</Button>
												</Link>
											)}

											{!row.isExternal && row.coverage?.adminHref ? (
												<Link
													href={row.coverage.adminHref}
													aria-label={`Edit ${row.title}`}>
													<Button size='sm'>Edit</Button>
												</Link>
											) : !row.isExternal ? (
												<Button size='sm' disabled>
													No editor
												</Button>
											) : null}
										</div>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				))}
			</div>

			{groupedRows.length === 0 ? (
				<Card className='border-slate-200'>
					<CardContent className='pt-6'>
						<p className='text-sm text-slate-500'>
							No pages match your current search/filter.
						</p>
					</CardContent>
				</Card>
			) : null}
		</div>
	);
};

export default NavPagesGrid;
