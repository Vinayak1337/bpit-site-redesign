module.exports = {
	slug: 'admissions-faqs',
	title: 'Admissions - FAQs',
	components: {
		HERO: {
			title: 'Admissions FAQs',
			subtitle: 'Find quick answers to common questions about admissions, scholarships, and campus access.',
			backgroundImage: null,
			gradient: 'from-blue-600 to-blue-800'
		},
		FAQ_INTRO: {
			badge: 'Admissions FAQs',
			title: 'Frequently Asked Questions',
			subtitle:
				'Find answers to common questions about BPIT admissions, programs, scholarships, and campus life.',
			browseTitle: 'Browse by Category'
		},
		FAQ_ITEMS: [
			{
				id: 1,
				question: 'What is the medium of instruction at BPIT?',
				answer: 'The medium of instruction at BPIT is English.',
				category: 'General'
			},
			{
				id: 2,
				question: 'What is the eligibility criteria for engineering admissions?',
				answer: 'Please refer to the Admissions Process section for the latest program-wise eligibility criteria.',
				category: 'Admissions'
			},
			{
				id: 3,
				question: 'How can we reach BPIT?',
				answer:
					'BPIT is located at PSP-4, Dr. K. N. Katju Marg, Sector-17 Rohini, New Delhi-110089.',
				category: 'Contact'
			},
			{
				id: 4,
				question: 'What placement opportunities are available?',
				answer: 'BPIT has a dedicated placement cell with strong recruiter participation and career support.',
				category: 'Placements'
			},
			{
				id: 5,
				question: 'What scholarship schemes are available?',
				answer: 'Scholarships are available through university, state, and national portals.',
				category: 'Scholarships'
			}
		],
		FAQ_CONTACT: {
			title: 'Need More Help?',
			description: "Can't find what you're looking for? Contact the admissions team directly.",
			phone: '+91-11-27574635',
			email: 'chairman@bpitindia.com',
			address: 'PSP-4, Dr. K. N. Katju Marg, Sector-17 Rohini, New Delhi-110089'
		}
	}
};
