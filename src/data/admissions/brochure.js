module.exports = {
	slug: 'admissions-brochure',
	title: 'Admissions - Brochure',
	components: {
		HERO: {
			title: 'Information Brochure',
			subtitle: 'Access official brochure links with direct download and view support.',
			backgroundImage: null,
			gradient: 'from-blue-600 to-blue-800'
		},
		BROCHURE_CONFIG: {
			heroBadge: 'Admissions Brochure',
			heroTitle: 'Brochure',
			heroSubtitle: 'Official brochure links with direct download and view support.',
			autoDetectEnabled: true,
			emptyStateTitle: 'No brochure items configured',
			emptyStateDescription: 'Please add brochure items from admin.'
		},
		BROCHURE_ITEMS: [
			{
				id: 'undergraduate',
				title: 'Undergraduate Admissions Brochure',
				description: 'Complete information about undergraduate programs and admissions.',
				icon: 'GraduationCap',
				url: 'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
				lastUpdated: ''
			},
			{
				id: 'postgraduate',
				title: 'Postgraduate Admissions Brochure',
				description: 'Complete information about postgraduate programs and admissions.',
				icon: 'FileText',
				url: 'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf',
				lastUpdated: ''
			}
		]
	}
};
