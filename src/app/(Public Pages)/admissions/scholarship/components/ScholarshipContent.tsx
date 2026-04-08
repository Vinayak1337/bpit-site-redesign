import { ExternalLink, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { getAdmissionsIcon } from '@/lib/admissions-icons';
import type {
	AdmissionsScholarshipCategory,
	AdmissionsScholarshipIntro,
	AdmissionsScholarshipNotesSection,
	AdmissionsScholarshipSupport
} from '@/app/(Private Pages)/actions/admissions';

type Props = {
	intro?: AdmissionsScholarshipIntro | null;
	categories?: AdmissionsScholarshipCategory[];
	notes?: AdmissionsScholarshipNotesSection | null;
	support?: AdmissionsScholarshipSupport | null;
};

const EMPTY_INTRO: AdmissionsScholarshipIntro = {
	badge: '',
	title: '',
	subtitle: '',
	beforeApplyTitle: '',
	beforeApplyDescription: ''
};

const EMPTY_SUPPORT: AdmissionsScholarshipSupport = {
	title: '',
	description: '',
	email: '',
	phone: ''
};

export default function ScholarshipContent({ intro, categories = [], notes, support }: Props) {
	const safeIntro = intro ?? EMPTY_INTRO;
	const safeSupport = support ?? EMPTY_SUPPORT;
	const safeNotes = notes ?? { title: '', description: '', items: [], eyebrow: '' };
	const hasIntroHeader = Boolean(
		safeIntro.badge || safeIntro.title || safeIntro.subtitle
	);

	return (
		<div className='space-y-6'>
			{hasIntroHeader ? (
				<section className='rounded-xl border border-slate-200 bg-white p-6'>
					{safeIntro.badge ? (
						<p className='text-xs font-semibold uppercase tracking-[0.14em] text-blue-700'>{safeIntro.badge}</p>
					) : null}
					{safeIntro.title ? (
						<h1 className='mt-2 text-3xl font-bold text-slate-900 md:text-4xl'>{safeIntro.title}</h1>
					) : null}
					{safeIntro.subtitle ? <p className='mt-3 text-slate-600'>{safeIntro.subtitle}</p> : null}
				</section>
			) : null}

			{safeIntro.beforeApplyTitle || safeIntro.beforeApplyDescription ? (
				<section className='rounded-xl border border-slate-200 bg-white p-6'>
					{safeIntro.beforeApplyTitle ? (
						<h2 className='text-xl font-semibold text-slate-900'>{safeIntro.beforeApplyTitle}</h2>
					) : null}
					{safeIntro.beforeApplyDescription ? (
						<p className='mt-2 text-sm text-slate-600'>{safeIntro.beforeApplyDescription}</p>
					) : null}
				</section>
			) : null}

			<div className='space-y-4'>
				{categories.map(category => {
					const Icon = getAdmissionsIcon(category.icon);
					const portalUrl = category.portalUrl || '';
					return (
						<section key={category.title} className='rounded-xl border border-slate-200 bg-white'>
							<div className='border-b border-slate-200 bg-slate-50 p-5'>
								<div className='flex flex-wrap items-center justify-between gap-3'>
									<div className='flex items-center gap-3'>
										<div className='rounded-lg bg-blue-50 p-2 text-blue-700'>
											<Icon className='h-5 w-5' />
										</div>
										<div>
											<h2 className='text-lg font-semibold text-slate-900'>{category.title}</h2>
											{category.portal ? <p className='text-xs text-slate-500'>{category.portal}</p> : null}
										</div>
									</div>
									<div className='flex items-center gap-2'>
										{portalUrl ? (
											<Link
												href={portalUrl}
												target='_blank'
												rel='noreferrer'
												aria-label={`Open ${category.portal || category.title}`}
												className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'>
												<ExternalLink className='h-4 w-4' />
											</Link>
										) : null}
										<span className={`rounded-full px-3 py-1 text-xs font-medium ${category.accent}`}>
											{category.badge}
										</span>
									</div>
								</div>
							</div>
							<ul className='space-y-2 p-5 text-sm text-slate-700'>
								{category.scholarships.map(item => (
									<li key={item} className='rounded-md bg-slate-50 px-3 py-2'>
										• {item}
									</li>
								))}
							</ul>
						</section>
					);
				})}
			</div>

			{safeNotes.items.length > 0 ? (
				<section className='rounded-xl border border-blue-200 bg-blue-50 p-6'>
					{safeNotes.title ? (
						<h2 className='text-lg font-semibold text-blue-900'>{safeNotes.title}</h2>
					) : null}
					{safeNotes.description ? (
						<p className='mt-2 text-sm text-blue-900/80'>{safeNotes.description}</p>
					) : null}
					<ul className='mt-3 space-y-2 text-sm text-blue-900/90'>
						{safeNotes.items.map(note => (
							<li key={note}>• {note}</li>
						))}
					</ul>
				</section>
			) : null}

			{safeSupport.title || safeSupport.description || safeSupport.email || safeSupport.phone ? (
				<section className='rounded-xl border border-slate-200 bg-white p-6 text-center'>
					{safeSupport.title ? (
						<h2 className='text-xl font-semibold text-slate-900'>{safeSupport.title}</h2>
					) : null}
					{safeSupport.description ? (
						<p className='mt-2 text-sm text-slate-600'>{safeSupport.description}</p>
					) : null}
					<div className='mt-4 flex flex-col items-center justify-center gap-2 text-sm text-slate-700 sm:flex-row sm:gap-6'>
						{safeSupport.email ? (
							<span className='inline-flex items-center gap-2'>
								<Mail className='h-4 w-4 text-blue-700' />
								{safeSupport.email}
							</span>
						) : null}
						{safeSupport.phone ? (
							<span className='inline-flex items-center gap-2'>
								<Phone className='h-4 w-4 text-blue-700' />
								{safeSupport.phone}
							</span>
						) : null}
					</div>
				</section>
			) : null}
		</div>
	);
}
