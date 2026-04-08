const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const leadershipTeamData = {
	hero: {
		icon: 'UserCheck',
		title: 'Our Leadership Team',
		subtitle: 'Experienced Leaders Driving Excellence',
		gradient: 'from-blue-50 to-blue-100',
		iconColor: 'bg-blue-600',
		textColor: 'text-blue-600'
	},
	leaders: [
		{
			id: 'principal',
			name: 'Dr. Rajesh Kumar',
			position: 'Principal',
			icon: 'Building2',
			iconColor: 'bg-blue-100',
			iconTextColor: 'text-blue-600',
			textColor: 'text-blue-600',
			details: [
				{
					icon: 'GraduationCap',
					text: 'Ph.D. in Computer Science, IIT Delhi'
				},
				{
					icon: 'Calendar',
					text: '20+ years of experience'
				},
				{
					icon: 'Mail',
					text: 'principal@bpitindia.com'
				}
			],
			description: 'Leading the institution with a vision for academic excellence and innovation in engineering education. Dr. Kumar has been instrumental in establishing BPIT as a premier technical institution in Delhi.'
		},
		{
			id: 'vice-principal',
			name: 'Dr. Priya Sharma',
			position: 'Vice Principal',
			icon: 'Users',
			iconColor: 'bg-green-100',
			iconTextColor: 'text-green-600',
			textColor: 'text-green-600',
			details: [
				{
					icon: 'GraduationCap',
					text: 'Ph.D. in Electronics Engineering, Delhi University'
				},
				{
					icon: 'Calendar',
					text: '15+ years of experience'
				},
				{
					icon: 'Mail',
					text: 'viceprincipal@bpitindia.com'
				}
			],
			description: 'Supporting academic initiatives and fostering a culture of continuous improvement. Dr. Sharma oversees student affairs and faculty development programs.'
		},
		{
			id: 'dean-academics',
			name: 'Dr. Amit Verma',
			position: 'Dean (Academics)',
			icon: 'BookOpen',
			iconColor: 'bg-purple-100',
			iconTextColor: 'text-purple-600',
			textColor: 'text-purple-600',
			details: [
				{
					icon: 'GraduationCap',
					text: 'Ph.D. in Mechanical Engineering, IIT Bombay'
				},
				{
					icon: 'Calendar',
					text: '18+ years of experience'
				},
				{
					icon: 'Mail',
					text: 'dean.academics@bpitindia.com'
				}
			],
			description: 'Overseeing academic programs and ensuring quality education delivery. Dr. Verma is responsible for curriculum development and academic policy implementation.'
		},
		{
			id: 'dean-admin',
			name: 'Dr. Sunita Gupta',
			position: 'Dean (Administration)',
			icon: 'Settings',
			iconColor: 'bg-orange-100',
			iconTextColor: 'text-orange-600',
			textColor: 'text-orange-600',
			details: [
				{
					icon: 'GraduationCap',
					text: 'Ph.D. in Management, MDU Rohtak'
				},
				{
					icon: 'Calendar',
					text: '16+ years of experience'
				},
				{
					icon: 'Mail',
					text: 'dean.admin@bpitindia.com'
				}
			],
			description: 'Managing administrative operations and institutional policies. Dr. Gupta ensures smooth functioning of all administrative processes and compliance.'
		}
	]
};

async function main() {
	console.log('Seeding leadership team data...');

	// Ensure page exists
	let page = await prisma.page.findUnique({
		where: { slug: 'leadership-team' }
	});

	if (!page) {
		page = await prisma.page.create({
			data: {
				slug: 'leadership-team',
				title: 'Leadership Team',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});
	}

	// Create or update component
	const existingComponent = await prisma.component.findFirst({
		where: {
			pageId: page.id,
			key: 'LEADERSHIP_TEAM_DATA'
		}
	});

	if (existingComponent) {
		await prisma.component.update({
			where: { id: existingComponent.id },
			data: {
				data: leadershipTeamData,
			}
		});
	} else {
		await prisma.component.create({
			data: {
				pageId: page.id,
				key: 'LEADERSHIP_TEAM_DATA',
				data: leadershipTeamData,
				order: 0
			}
		});
	}

	console.log('Leadership team data seeded successfully!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});