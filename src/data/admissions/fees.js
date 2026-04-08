const feesData = require('../admissions-fees.json');

module.exports = {
	slug: 'admissions-fees',
	title: 'Admissions - Fees',
	components: {
		HERO: {
			title: 'Fee Structure',
			subtitle: 'Review official annual totals, account heads, and support details for each program.',
			backgroundImage: null,
			gradient: 'from-blue-600 to-blue-800'
		},
		FEES_META: {
			...feesData.meta,
			selectorEyebrow: 'Programs',
			selectorTitle: 'Choose a course to inspect the full fee ledger',
			selectorDescription:
				'Select a program card to move into the yearly fee view and head-wise breakup.',
			overviewEyebrow: 'Program summary',
			programTotalLabel: 'Program total',
			annualViewsLabel: 'Annual views',
			breakdownPanelsLabel: 'Breakdown panels',
			paymentNoteTitle: 'Payment note',
			snapshotEyebrow: 'Annual snapshot',
			snapshotTitle: 'Yearly totals before you open the breakdowns',
			snapshotDescription:
				'Review the year-wise totals first, then open individual annual cards only when deeper detail is needed.',
			yearSectionsLabel: 'sections',
			yearTotalLabel: 'Annual total',
			breakdownEyebrow: 'Detailed breakdown',
			breakdownTitle: 'Open any annual card to inspect the detailed fee ledger',
			breakdownDescription:
				'All annual cards stay collapsed by default so the page remains readable even with dense fee data.',
			annualHeadsEyebrow: 'Annual account heads',
			annualHeadsTitle: 'How this year total is made up',
			annualHeadsDescription:
				'Each fee head appears once here, while the small chips above remain high-level billing section totals.',
			importantNotesEyebrow: 'Important notes',
			importantNotesTitle: 'Before you compare fee totals',
			supportEyebrow: 'Support',
			supportTitle: 'Need help with fee clarification?',
			supportCardTitle: 'Fee design principle',
			supportCardDescription:
				'This page prioritizes clarity: annual totals stay visible at a glance and detailed account heads open only when someone needs them.'
		},
		FEES_PROGRAMS: feesData.programs
	}
};
