module.exports = {
	slug: 'admissions-scholarship',
	title: 'Admissions - Scholarship',
	components: {
		HERO: {
			title: 'Scholarships',
			subtitle: 'Review financial aid options and jump directly to the relevant official portal.',
			backgroundImage: null,
			gradient: 'from-blue-600 to-blue-800'
		},
		SCHOLARSHIP_INTRO: {
			badge: 'Scholarships & Financial Aid',
			title: 'Scholarship Opportunities',
			subtitle: 'Detailed scholarship options from university, Delhi Government, and national portals.',
			beforeApplyTitle: 'Before You Apply',
			beforeApplyDescription:
				'Check eligibility criteria, required documents, portal deadlines, and renewal rules before you apply.'
		},
		SCHOLARSHIP_CATEGORIES: [
			{
				title: 'From University (GGSIPU)',
				icon: 'GraduationCap',
				badge: 'University',
				accent: 'text-blue-700 bg-blue-100',
				scholarships: ['EWS Scholarship'],
				portal: 'University Portal',
				portalUrl: 'https://ipu.ac.in/dsw_ews.php'
			},
			{
				title: 'From Delhi Government (E-District Portal)',
				icon: 'Globe',
				badge: 'State',
				accent: 'text-cyan-700 bg-cyan-100',
				scholarships: [
					'Merit-cum-Means Income Linked Financial Assistance Scheme',
					'B.R. Ambedkar State Toppers Award (SC/ST/OBC)',
					'Merit Scholarship for Minority students in professional courses'
				],
				portal: 'E-District Portal',
				portalUrl: 'https://edistrict.delhigovt.nic.in/'
			},
			{
				title: 'From National Scholarship Portal (NSP Portal 2.0)',
				icon: 'Award',
				badge: 'National',
				accent: 'text-indigo-700 bg-indigo-100',
				scholarships: [
					"Prime Minister's Scholarship Scheme",
					'Merit-Cum-Means Scholarship for Professional Courses',
					'Central Sector Scheme of Scholarships for University Students'
				],
				portal: 'NSP Portal 2.0',
				portalUrl: 'https://scholarships.gov.in/'
			}
		],
		SCHOLARSHIP_NOTES: {
			title: 'Important notes',
			description:
				'Students should verify the official scheme rules before submitting any scholarship application.',
			items: [
				'Apply only through the official portal relevant to your scheme.',
				'Verify eligibility, deadlines, and documents before submission.',
				'Keep acknowledgement and submitted form copies for records.',
				'Contact admissions support if you need help understanding portal requirements.'
			]
		},
		SCHOLARSHIP_SUPPORT: {
			title: 'Need Help With Applications?',
			description: 'The admissions team can guide you through scholarship options and portal readiness.',
			email: 'scholarships@bpit.ac.in',
			phone: '+91-11-2757-1101'
		}
	}
};
