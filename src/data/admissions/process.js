const processPrograms = require('../admissions-process-programs.json');

module.exports = {
	slug: 'admissions-process',
	title: 'Admissions - Process',
	components: {
		HERO: {
			title: 'Admission Process',
			subtitle: 'Review program eligibility, intake, and the admission path before you apply.',
			backgroundImage: null,
			gradient: 'from-blue-600 to-blue-800'
		},
		PROCESS_META: {
			headerTitle: 'Admission Criteria & Eligibility',
			headerSubtitle: 'Explore undergraduate and postgraduate programs with category-wise guidance.',
			emptyStateTitle: 'Select a Program Category',
			defaultCategoryDescription:
				'Choose a category from the sidebar to inspect the program cards and eligibility details.',
			emptyStateDescription: 'Choose a category from the sidebar to explore available programs.',
			listCopy: {
				sidebarTitle: 'Program Categories',
				mobileBackLabel: 'Back to Categories',
				breadcrumbRootLabel: 'Programs',
				noProgramsMessage: 'No programs are configured for this category yet.',
				durationLabel: 'Duration',
				intakeLabel: 'Intake',
				cardCtaLabel: 'View Details'
			},
			detailCopy: {
				backButtonLabel: 'Back to all programs',
				sidebarTitle: 'Program Details',
				tabLabels: {
					offering: 'Content Offering',
					eligibility: 'Eligibility & Selection Criteria',
					structure: 'Programme Structure',
					careers: 'Career Opportunities',
					faculty: 'Faculty'
				},
				durationLabel: 'Duration',
				intakeLabel: 'Intake',
				offeringTitle: 'Content Offering Statement',
				keyAreasTitle: 'Key Areas of Study',
				eligibilityTitle: 'Eligibility Criteria & Selection Process',
				academicQualificationTitle: 'Academic Qualification',
				minimumMarksTitle: 'Minimum Marks Required',
				entranceExamTitle: 'Entrance Examination',
				selectionProcessTitle: 'Selection Process',
				structureTitle: 'Programme Structure',
				totalSemestersLabel: 'Total Semesters',
				totalCreditsLabel: 'Total Credits',
				durationCardLabel: 'Duration',
				semesterCurriculumTitle: 'Semester-wise Curriculum',
				subjectsLabelSuffix: 'Subjects',
				careersTitle: 'Career Opportunities',
				facultyTitle: 'Faculty Members'
			},
			categories: [
				{
					id: 'undergraduate',
					title: 'Undergraduate',
					description:
						'Explore undergraduate programs designed to build strong academic foundations and career readiness.',
					subcategories: [
						{
							id: 'engineering',
							title: 'Engineering and Technology',
							description:
								'Explore engineering programs designed to build strong technical foundations and industry readiness.',
							breadcrumbLabel: 'Engineering & Technology'
						},
						{
							id: 'ugManagement',
							title: 'Management',
							description:
								'Build a strong base in business and management through structured undergraduate study.',
							breadcrumbLabel: 'Management'
						}
					]
				},
				{
					id: 'postgraduate',
					title: 'Postgraduate',
					description:
						'Advance your academic and professional goals through specialized postgraduate programs.',
					subcategories: [
						{
							id: 'pgManagement',
							title: 'Management',
							description:
								'Advance your career with focused postgraduate management education and applied learning.',
							breadcrumbLabel: 'Management'
						}
					]
				}
			],
			supportCard: {
				title: 'Admission Support',
				description: 'Need help choosing the right admission route? Our counselors can guide you.',
				primaryCtaLabel: 'Apply Now',
				primaryCtaHref: '/admissions/process',
				secondaryCtaLabel: 'Download Brochure',
				secondaryCtaHref: '/admissions/brochure'
			}
		},
		PROGRAM_CATALOG: processPrograms
	}
};
