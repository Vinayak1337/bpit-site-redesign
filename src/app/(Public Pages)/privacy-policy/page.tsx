import type { Metadata } from 'next';

const lastUpdated = 'November 2025';

const privacySections: Array<{
	title: string;
	description: string;
	points: string[];
}> = [
	{
		title: 'Information We Collect',
		description:
			'We only gather information that helps us respond to enquiries, deliver academic updates, and improve the BPIT digital experience.',
		points: [
			'Contact information submitted through enquiry, admission, or newsletter forms.',
			'Usage data such as pages visited, device information, and browser type collected through analytics tools.',
			'Any additional details you voluntarily provide when communicating with BPIT.'
		]
	},
	{
		title: 'How We Use Your Information',
		description:
			'Collected data allows us to provide timely academic communication and maintain secure campus services.',
		points: [
			'Respond to admission, placement, or academic queries.',
			'Deliver newsletters and institutional announcements when you opt in.',
			'Maintain accurate records for statutory and accreditation reporting.',
			'Improve website performance and user experience.'
		]
	},
	{
		title: 'Data Sharing and Retention',
		description:
			'We respect your privacy and only share your information in strictly limited situations.',
		points: [
			'Access is restricted to authorised BPIT departments and trusted service partners that meet our security standards.',
			'We never sell personal information to third parties.',
			'Information is retained only for as long as necessary to provide services or comply with regulations.'
		]
	},
	{
		title: 'Your Rights',
		description:
			'You are in control of your information and can contact us at any time to exercise the following rights:',
		points: [
			'Request a copy of the personal information we hold about you.',
			'Ask for corrections or updates to inaccurate or incomplete data.',
			'Withdraw consent for marketing communications or newsletter subscriptions.',
			'Request deletion of your data, subject to legal or contractual obligations.'
		]
	},
	{
		title: 'Contact Us',
		description:
			'If you have questions about this privacy policy or how your information is handled, write to us at privacy@bpitindia.ac.in or by post at Bhagwan Parshuram Institute of Technology, Rohini Sector-17, New Delhi - 110089.',
		points: []
	}
];

export const metadata: Metadata = {
	title: 'Privacy Policy | BPIT',
	description:
		'Learn how Bhagwan Parshuram Institute of Technology collects, uses, and protects your personal information.'
};

export default function PrivacyPolicyPage() {
	return (
		<main className='bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-16 sm:py-24'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl'>
				<div className='bg-slate-900/70 border border-slate-700/60 rounded-3xl shadow-xl p-6 sm:p-10 lg:p-14'>
					<section className='mb-10 sm:mb-12 text-center'>
						<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>
							Privacy Policy
						</h1>
						<p className='text-sm sm:text-base text-slate-300'>
							Last updated {lastUpdated}
						</p>
						<p className='mt-4 text-base sm:text-lg text-slate-200'>
							BPIT is committed to safeguarding the personal information of our
							students, parents, faculty, alumni, and partners. The following
							sections explain how we collect, use, and protect the data shared
							with us.
						</p>
					</section>

					<div className='space-y-10'>
						{privacySections.map(section => (
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
