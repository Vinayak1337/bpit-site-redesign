import type { Metadata } from 'next';
import { getTermsOfServiceData } from '@/app/(Private Pages)/actions/terms-of-service';
import { TERMS_OF_SERVICE_PAGE_SLUG } from '@/lib/page-slugs';

export const metadata: Metadata = {
	title: 'Terms of Service | BPIT',
	description:
		'Understand the acceptable use policies and legal terms that govern Bhagwan Parshuram Institute of Technology digital services.'
};

export default async function TermsOfServicePage() {
	const { lastUpdated, intro, sections } = await getTermsOfServiceData(TERMS_OF_SERVICE_PAGE_SLUG);

	return (
		<main className='bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-16 sm:py-24'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl'>
				<div className='bg-slate-900/70 border border-slate-700/60 rounded-3xl shadow-xl p-6 sm:p-10 lg:p-14'>
					<section className='mb-10 sm:mb-12 text-center'>
						<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
							Terms of Service
						</h1>
						<p className='text-sm sm:text-base text-slate-300'>
							Last updated {lastUpdated}
						</p>
						<p className='mt-4 text-base sm:text-lg text-slate-200'>
							{intro}
						</p>
					</section>

					<div className='space-y-10'>
						{sections.map(section => (
							<section
								key={section.title}
								className='rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 sm:p-8'>
								<h2 className='text-xl sm:text-2xl font-semibold text-white mb-3'>
									{section.title}
								</h2>
								<p className='text-slate-200 text-sm sm:text-base leading-relaxed'>
									{section.description}
								</p>
								{section.points.length > 0 ? (
									<ul className='mt-4 space-y-2 text-sm sm:text-base text-slate-300 list-disc list-inside'>
										{section.points.map(point => (
											<li key={point}>{point}</li>
										))}
									</ul>
								) : null}
							</section>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
