const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const governanceStructureData = {
	hero: {
		icon: 'Building2',
		title: 'Governance Structure',
		subtitle: 'Organizational Framework for Excellence',
		gradient: 'from-green-50 to-green-100',
		iconColor: 'bg-green-600',
		textColor: 'text-green-600'
	},
	sections: [
		{
			id: 'board-of-governors',
			title: 'Board of Governors',
			icon: 'Award',
			iconColor: 'text-green-600',
			description:
				'The Board of Governors provides strategic oversight and policy direction for the institution. Comprising eminent personalities from academia, industry, and public service, the board ensures BPIT maintains its commitment to excellence.',
			cards: [
				{
					title: 'Key Responsibilities',
					bgColor: 'bg-green-50',
					textColor: 'text-green-800',
					listColor: 'text-green-700',
					items: [
						'Strategic planning and policy formulation',
						'Financial oversight and budget approval',
						'Academic quality assurance',
						'Institutional development initiatives'
					]
				},
				{
					title: 'Composition',
					bgColor: 'bg-green-50',
					textColor: 'text-green-800',
					listColor: 'text-green-700',
					items: [
						'Chairman (Industry Leader)',
						'Academic Representatives',
						'Government Nominees',
						'Alumni Representatives'
					]
				}
			]
		},
		{
			id: 'academic-council',
			title: 'Academic Council',
			icon: 'Users',
			iconColor: 'text-blue-600',
			description:
				'The Academic Council is the primary academic decision-making body, responsible for maintaining and enhancing the quality of education, research, and academic programs.',
			cards: [
				{
					title: 'Functions',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Curriculum development and review',
						'Faculty recruitment and promotion',
						'Research policy formulation',
						'Academic calendar planning'
					]
				},
				{
					title: 'Members',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Principal (Chairperson)',
						'Heads of Departments',
						'Senior Faculty Members',
						'External Academic Experts'
					]
				}
			]
		},
		{
			id: 'administrative-structure',
			title: 'Administrative Structure',
			icon: 'Shield',
			iconColor: 'text-blue-600',
			description:
				'The administrative structure ensures efficient day-to-day operations and supports the academic mission through well-defined hierarchies and responsibilities.',
			cards: [
				{
					title: 'Administrative Hierarchy',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Principal & Director',
						'Deputy Director',
						'Administrative Officer',
						'Department Coordinators'
					]
				},
				{
					title: 'Support Services',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Finance & Accounts',
						'Human Resources',
						'IT Services',
						'Student Affairs'
					]
				}
			]
		}
	]
};

const policiesProceduresData = {
	hero: {
		icon: 'Shield',
		title: 'Policies & Procedures',
		subtitle: 'Framework for Institutional Excellence',
		gradient: 'from-blue-50 to-blue-100',
		iconColor: 'bg-blue-600',
		textColor: 'text-blue-600'
	},
	policyCategories: [
		{
			id: 'academic-policies',
			title: 'Academic Policies',
			icon: 'BookOpen',
			iconColor: 'text-blue-600',
			bulletColor: 'bg-blue-600',
			policies: [
				'Admission Policy & Procedures',
				'Examination & Evaluation Policy',
				'Anti-Ragging Policy',
				'Student Grievance Redressal',
				'Research & Publication Policy'
			]
		},
		{
			id: 'faculty-policies',
			title: 'Faculty Policies',
			icon: 'Users',
			iconColor: 'text-green-600',
			bulletColor: 'bg-green-600',
			policies: [
				'Faculty Recruitment Policy',
				'Performance Evaluation System',
				'Professional Development Policy',
				'Leave & Attendance Policy',
				'Code of Conduct'
			]
		},
		{
			id: 'quality-assurance',
			title: 'Quality Assurance',
			icon: 'Award',
			iconColor: 'text-purple-600',
			bulletColor: 'bg-purple-600',
			policies: [
				'IQAC Guidelines & Procedures',
				'NBA Accreditation Compliance',
				'NAAC Assessment Framework',
				'Continuous Improvement Process',
				'External Quality Audit'
			]
		},
		{
			id: 'administrative-policies',
			title: 'Administrative Policies',
			icon: 'Briefcase',
			iconColor: 'text-orange-600',
			bulletColor: 'bg-orange-600',
			policies: [
				'Financial Management Policy',
				'Procurement & Purchase Policy',
				'IT Security & Data Protection',
				'Infrastructure Development',
				'Safety & Security Protocols'
			]
		}
	],
	implementationFramework: {
		title: 'Policy Implementation Framework',
		steps: [
			{
				id: 'review',
				title: 'Review',
				description: 'Regular policy review and updates',
				icon: 'Eye',
				iconColor: 'bg-blue-100',
				iconTextColor: 'text-blue-600'
			},
			{
				id: 'approval',
				title: 'Approval',
				description: 'Stakeholder consultation and approval',
				icon: 'UserCheck',
				iconColor: 'bg-green-100',
				iconTextColor: 'text-green-600'
			},
			{
				id: 'communication',
				title: 'Communication',
				description: 'Policy dissemination and training',
				icon: 'BookOpen',
				iconColor: 'bg-purple-100',
				iconTextColor: 'text-purple-600'
			},
			{
				id: 'monitoring',
				title: 'Monitoring',
				description: 'Compliance monitoring and evaluation',
				icon: 'Target',
				iconColor: 'bg-orange-100',
				iconTextColor: 'text-orange-600'
			}
		]
	}
};

async function seedGovernanceAndPolicies() {
	try {
		console.log('🌱 Seeding governance structure and policies data...');

		// Seed Governance Structure
		let governancePage = await prisma.page.findUnique({
			where: { slug: 'governance-structure' }
		});

		if (!governancePage) {
			governancePage = await prisma.page.create({
				data: {
					slug: 'governance-structure',
					title: 'Governance Structure',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: governancePage.id,
					order: 1
				}
			},
			update: {
				data: governanceStructureData,
				key: 'GOVERNANCE_STRUCTURE_DATA'
			},
			create: {
				pageId: governancePage.id,
				data: governanceStructureData,
				order: 1,
				key: 'GOVERNANCE_STRUCTURE_DATA'
			}
		});

		console.log('✅ Governance structure data seeded successfully');

		// Seed Policies & Procedures
		let policiesPage = await prisma.page.findUnique({
			where: { slug: 'policies-procedures' }
		});

		if (!policiesPage) {
			policiesPage = await prisma.page.create({
				data: {
					slug: 'policies-procedures',
					title: 'Policies & Procedures',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: policiesPage.id,
					order: 1
				}
			},
			update: {
				data: policiesProceduresData,
				key: 'POLICIES_PROCEDURES_DATA'
			},
			create: {
				pageId: policiesPage.id,
				data: policiesProceduresData,
				order: 1,
				key: 'POLICIES_PROCEDURES_DATA'
			}
		});

		console.log('✅ Policies & procedures data seeded successfully');

	} catch (error) {
		console.error('❌ Error seeding governance and policies data:', error);
		throw error;
	}
}

async function main() {
	await seedGovernanceAndPolicies();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});