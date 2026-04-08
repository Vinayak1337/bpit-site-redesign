import type { Metadata } from 'next';

const lastUpdated = 'November 2025';

const termsSections: Array<{
	title: string;
	description: string;
	points: string[];
}> = [
	{
		title: 'Acceptance of Terms',
		description:
			'By accessing the BPIT website, portals, or digital services you agree to comply with these terms of service and all applicable policies referenced here.',
		points: [
			'These terms apply to students, faculty, alumni, applicants, and external visitors.',
			'If you do not agree with any part of these terms, please discontinue use of BPIT online services.'
		]
	},
	{
		title: 'Use of Website Content',
		description:
			'All academic resources, media, logos, and written content are protected intellectual property of BPIT or its partners.',
		points: [
			'Content may be used for personal, non-commercial academic purposes only.',
			'Any reproduction, republication, or distribution requires written permission from BPIT.',
			'Unauthorised modification of content or materials is strictly prohibited.'
		]
	},
	{
		title: 'User Responsibilities',
		description:
			'You are responsible for maintaining the confidentiality of your portal credentials and ensuring proper usage of online resources.',
		points: [
			'Provide accurate and current information when completing forms or registrations.',
			'Do not engage in activities that disrupt or compromise the security of BPIT systems.',
			'Report suspected misuse or security issues to the BPIT IT Team immediately.'
		]
	},
	{
		title: 'Third-Party Services',
		description:
			'BPIT may reference third-party platforms for placements, payments, or academic resources. Each service maintains its own policies.',
		points: [
			'BPIT is not responsible for the content or practices of external websites.',
			'Use third-party services at your discretion and review their respective terms.',
			'Any concerns with third-party services should be directed to the respective provider.'
		]
	},
	{
		title: 'Changes to These Terms',
		description:
			'BPIT may update these terms to reflect regulatory changes or improvements to our services. Continued use after updates signifies acceptance.',
		points: [
			'We recommend revisiting this page periodically.',
			'Major updates will be communicated through official BPIT channels when necessary.'
		]
	},
	{
		title: 'Contact Information',
		description:
			'For queries about these terms or requests for permissions, contact legal@bpitindia.ac.in or write to: Bhagwan Parshuram Institute of Technology, Rohini Sector-17, New Delhi - 110089.',
		points: []
	}
];

export const metadata: Metadata = {
	title: 'Terms of Service | BPIT',
	description:
		'Understand the acceptable use policies and legal terms that govern Bhagwan Parshuram Institute of Technology digital services.'
};

export default function TermsOfServicePage() {
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
							These terms outline the policies and responsibilities that govern
							the use of BPIT&apos;s digital platforms, portals, and published
							content.
						</p>
					</section>

					<div className='space-y-10'>
						{termsSections.map(section => (
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
