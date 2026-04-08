import Link from 'next/link';
import {
	type AdmissionsOverviewDepartmentsSection,
	type AdmissionsOverviewHeroData,
	type AdmissionsOverviewLinksSection,
	type AdmissionsOverviewNotesSection,
	type AdmissionsOverviewStatsSection
} from '@/app/(Private Pages)/actions/admissions';
import { getAdmissionsIcon } from '@/lib/admissions-icons';

type OverviewIntroSectionProps = {
	data?: AdmissionsOverviewHeroData | null;
	programCount?: number;
};

export function AdmissionsOverviewIntroSection({
	data,
	programCount = 0
}: OverviewIntroSectionProps) {
	if (!data) {
		return null;
	}

	return (
		<section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
			{data.subtitle ? (
				<p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-700'>
					{data.subtitle}
				</p>
			) : null}
			{data.title ? (
				<h1 className='mt-2 text-3xl font-bold text-slate-900 md:text-4xl'>{data.title}</h1>
			) : null}
			{data.description ? (
				<p className='mt-4 max-w-4xl text-slate-600'>{data.description}</p>
			) : null}
			{programCount > 0 && data.programCountLabel ? (
				<div className='mt-5 inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700'>
					{programCount} {data.programCountLabel}
				</div>
			) : null}
		</section>
	);
}

export function AdmissionsOverviewStatsSection({
	data
}: {
	data?: AdmissionsOverviewStatsSection | null;
}) {
	if (!data || data.items.length === 0) {
		return null;
	}

	return (
		<section className='space-y-4'>
			{data.eyebrow || data.title || data.description ? (
				<div>
					{data.eyebrow ? (
						<p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-700'>
							{data.eyebrow}
						</p>
					) : null}
					{data.title ? (
						<h2 className='mt-2 text-2xl font-semibold text-slate-900'>{data.title}</h2>
					) : null}
					{data.description ? (
						<p className='mt-2 max-w-3xl text-sm text-slate-600'>{data.description}</p>
					) : null}
				</div>
			) : null}

			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{data.items.map(stat => {
					const Icon = stat.icon ? getAdmissionsIcon(stat.icon) : null;
					return (
						<article
							key={`${stat.value}-${stat.label}`}
							className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
							<div className='mb-3 flex items-center justify-between'>
								{Icon ? (
									<div className='rounded-lg bg-blue-50 p-2 text-blue-700'>
										<Icon className='h-5 w-5' />
									</div>
								) : null}
							</div>
							<p className='text-2xl font-bold text-slate-900'>{stat.value}</p>
							<p className='mt-1 text-sm text-slate-600'>{stat.label}</p>
						</article>
					);
				})}
			</div>
		</section>
	);
}

export function AdmissionsOverviewLinksSection({
	data
}: {
	data?: AdmissionsOverviewLinksSection | null;
}) {
	if (!data || data.items.length === 0) {
		return null;
	}

	return (
		<section className='space-y-4'>
			{data.eyebrow || data.title || data.description ? (
				<div>
					{data.eyebrow ? (
						<p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-700'>
							{data.eyebrow}
						</p>
					) : null}
					{data.title ? (
						<h2 className='mt-2 text-2xl font-semibold text-slate-900'>{data.title}</h2>
					) : null}
					{data.description ? (
						<p className='mt-2 max-w-3xl text-sm text-slate-600'>{data.description}</p>
					) : null}
				</div>
			) : null}

			<div className='grid gap-4 md:grid-cols-2'>
				{data.items.map(link => {
					const Icon = getAdmissionsIcon(link.icon);
					return (
						<Link
							key={link.href}
							href={link.href}
							className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
							<div className='mb-3 inline-flex rounded-lg bg-blue-50 p-2 text-blue-700'>
								<Icon className='h-5 w-5' />
							</div>
							<h2 className='text-xl font-semibold text-slate-900'>{link.title}</h2>
							<p className='mt-2 text-sm text-slate-600'>{link.description}</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

export function AdmissionsOverviewDepartmentsSection({
	data
}: {
	data?: AdmissionsOverviewDepartmentsSection | null;
}) {
	if (!data || data.items.length === 0) {
		return null;
	}

	return (
		<section className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
			{data.title ? <h2 className='text-xl font-semibold text-slate-900'>{data.title}</h2> : null}
			{data.description ? <p className='mt-2 text-sm text-slate-600'>{data.description}</p> : null}
			<div className='mt-4 grid gap-3 md:grid-cols-2'>
				{data.items.map(item => (
					<div key={item.name} className='rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700'>
						{item.name}
					</div>
				))}
			</div>
		</section>
	);
}

export function AdmissionsOverviewNotesSection({
	data
}: {
	data?: AdmissionsOverviewNotesSection | null;
}) {
	if (!data || data.items.length === 0) {
		return null;
	}

	return (
		<section className='rounded-xl border border-blue-200 bg-blue-50 p-6'>
			{data.title ? <h2 className='text-lg font-semibold text-blue-900'>{data.title}</h2> : null}
			{data.description ? (
				<p className='mt-2 text-sm text-blue-900/80'>{data.description}</p>
			) : null}
			<ul className='mt-3 space-y-2 text-sm text-blue-900/90'>
				{data.items.map(note => (
					<li key={note}>• {note}</li>
				))}
			</ul>
		</section>
	);
}
