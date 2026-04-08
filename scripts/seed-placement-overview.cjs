require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedPlacementOverviewData() {
	try {
		const placementOverviewData = {
			hero: {
				icon: 'Briefcase',
				title: 'Placement Cell Overview',
				subtitle: 'Bridging the gap between academic excellence and industry requirements',
				gradient: 'from-blue-900 via-blue-800 to-blue-900',
				iconColor: 'bg-white/10',
				textColor: 'text-blue-200'
			},
			stats: [
				{ icon: 'TrendingUp', value: '96%', label: 'Placement Rate', iconColor: 'bg-gradient-to-r from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ icon: 'Building2', value: '500+', label: 'Partner Companies', iconColor: 'bg-gradient-to-r from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ icon: 'Users', value: '2000+', label: 'Students Placed', iconColor: 'bg-gradient-to-r from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ icon: 'Award', value: '₹9.07 LPA', label: 'Average Package', iconColor: 'bg-gradient-to-r from-blue-500 to-blue-700', textColor: 'text-gray-900' }
			],
			missionTitle: 'Our Mission',
			missionDescription: 'Our mission is to foster overall student development through blended learning approaches, preparing ambitious, goal-oriented students with rational understanding for evolving industry demands.',
			missionContent: {
				paragraph1: 'The Training & Placement Cell at BPIT focuses on imparting knowledge through blended learning approaches, combining theoretical and practical knowledge integration. We provide early exposure to industry requirements and in-house competency development.',
				paragraph2: 'Our comprehensive approach includes technical training from renowned institutions, guest lectures by industry professionals, industrial visits, and holistic skill development to create industry-ready graduates.',
				features: ['Industry Partnerships', 'Skill Development', 'Career Guidance', 'Mock Interviews'],
				objectives: ['Overall student development', 'Blended learning approach', 'Early industry exposure', 'Technical & soft skills integration', 'Industry-ready graduate preparation']
			},
			servicesTitle: 'Our Services',
			servicesDescription: 'Comprehensive placement services designed to maximize student success',
			features: [
				{ id: 'career-guidance', icon: 'Target', title: 'Career Guidance', description: 'Comprehensive career counseling and guidance sessions to help students choose the right career path.', color: 'blue', iconColor: 'from-blue-500 to-cyan-600', textColor: 'text-gray-900' },
				{ id: 'industry-training', icon: 'Users', title: 'Industry Training', description: 'Regular training sessions, workshops, and seminars conducted by industry experts.', color: 'purple', iconColor: 'from-purple-500 to-violet-600', textColor: 'text-gray-900' },
				{ id: 'mock-interviews', icon: 'Briefcase', title: 'Mock Interviews', description: 'Practice sessions with mock interviews to prepare students for real placement interviews.', color: 'green', iconColor: 'from-green-500 to-emerald-600', textColor: 'text-gray-900' },
				{ id: 'skill-development', icon: 'Star', title: 'Skill Development', description: 'Soft skills and technical skills development programs to enhance employability.', color: 'orange', iconColor: 'from-orange-500 to-red-600', textColor: 'text-gray-900' }
			],
			teamTitle: 'Meet Our Team',
			teamDescription: 'Dedicated professionals committed to your career success',
			teamMembers: [
				{ id: 'achal-kausik', name: 'Prof. Achal Kausik', position: 'Dean of Academics, Head of CSE, Head of T&P', email: 'placement@bpit.ac.in', initials: 'AK', gradientColor: 'from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ id: 'sanjay-dureja', name: 'Mr. Sanjay Dureja', position: 'Sr. Manager T&P', email: 'sanjay.placement@bpit.ac.in', initials: 'SD', gradientColor: 'from-blue-500 to-blue-700', textColor: 'text-gray-900' }
			],
			trainingTitle: 'Technical Training Areas',
			trainingDescription: 'Comprehensive training programs to prepare students for evolving industry demands',
			trainingAreas: [
				{ id: 'programming', title: 'Programming & Development', skills: ['Data Structures & Algorithms', 'Web & Mobile Development', 'System Design', 'SQL & Database'], icon: 'Users', iconColor: 'from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ id: 'core-technical', title: 'Core Technical Skills', skills: ['Quantitative Aptitude', 'Logical Reasoning', 'Programming Fundamentals', 'Linux Administration'], icon: 'Target', iconColor: 'from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ id: 'engineering', title: 'Specialized Engineering', skills: ['Digital Hardware Design', 'Embedded System Design', 'ASIC Development', 'PCB Board Design'], icon: 'Briefcase', iconColor: 'from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ id: 'signal-processing', title: 'Signal Processing', skills: ['MATLAB Programming', 'Signal Processing', 'Image Processing', 'Antenna Design'], icon: 'Star', iconColor: 'from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ id: 'industry-exposure', title: 'Industry Exposure', skills: ['Guest Lectures by Experts', 'Industrial Visits', 'Live Project Training', 'Hands-on Workshops'], icon: 'Building2', iconColor: 'from-blue-500 to-blue-700', textColor: 'text-gray-900' },
				{ id: 'professional-dev', title: 'Professional Development', skills: ['Communication Skills', 'Technical Presentations', 'Interview Preparation', 'Career Guidance'], icon: 'Award', iconColor: 'from-blue-500 to-blue-700', textColor: 'text-gray-900' }
			],
			achievementsTitle: 'Stars of BPIT',
			achievementsDescription: 'Celebrating exceptional achievements and academic excellence of our students',
			achievements: [
				{ id: 'ujjawal', title: 'Ujjawal Chaudhary (IT)', description: 'Received Gold Medal at 17th GGSIPU Convocation for outstanding academic performance', icon: 'Award', highlight: 'Gold Medal', category: 'Academic Excellence', department: 'Information Technology', iconColor: 'from-blue-500 to-blue-700', categoryColor: 'bg-blue-100 text-blue-800', highlightColor: 'text-blue-600' },
				{ id: 'pavneet', title: 'Pavneet Singh (CSE)', description: 'Received Gold Medal at 17th GGSIPU Convocation for exceptional achievements', icon: 'Award', highlight: 'Gold Medal', category: 'Academic Excellence', department: 'Computer Science', iconColor: 'from-blue-500 to-blue-700', categoryColor: 'bg-blue-100 text-blue-800', highlightColor: 'text-blue-600' },
				{ id: 'codeblooded', title: 'Team "codeBlooded"', description: 'BPIT students secured 2nd position in prestigious hackDUCS hackathon', icon: 'Target', highlight: '2nd Position', category: 'Competition Win', department: 'Multi-Department', iconColor: 'from-blue-500 to-blue-700', categoryColor: 'bg-green-100 text-green-800', highlightColor: 'text-green-600' }
			],
			highlightsTitle: 'Placement Highlights',
			highlightsDescription: 'Department-wise placement achievements showcasing our academic excellence',
			highlights: [
				{ id: 'cse', department: 'Computer Science', maxPackage: '₹51 LPA', avgPackage: '₹8.55 LPA', color: 'from-blue-500 to-blue-700', initials: 'CS' },
				{ id: 'it', department: 'Information Technology', maxPackage: '₹51 LPA', avgPackage: '₹6.77 LPA', color: 'from-green-500 to-green-700', initials: 'IT' },
				{ id: 'ece', department: 'Electronics & Communication', maxPackage: '₹13.23 LPA', avgPackage: '₹5.00 LPA', color: 'from-purple-500 to-purple-700', initials: 'EC' },
				{ id: 'eee', department: 'Electrical & Electronics', maxPackage: '₹4.5 LPA', avgPackage: '₹4.17 LPA', color: 'from-orange-500 to-orange-700', initials: 'EE' }
			],
			contactTitle: 'Get in Touch',
			contactDescription: 'Ready to start your career journey? Connect with our placement team today.',
			contacts: [
				{ icon: 'Phone', title: 'Phone', value: '+91-11-27850086', iconColor: 'bg-white/10', textColor: 'text-blue-200' },
				{ icon: 'Mail', title: 'Email', value: 'placement@bpit.ac.in', iconColor: 'bg-white/10', textColor: 'text-blue-200' },
				{ icon: 'MapPin', title: 'Location', value: 'BPIT Campus, Rohini', iconColor: 'bg-white/10', textColor: 'text-blue-200' }
			],
			contactButtonText: 'Contact Placement Cell'
		};

		// Create or find the page
		const page = await prisma.page.upsert({
			where: { slug: 'placement-overview' },
			update: {},
			create: {
				slug: 'placement-overview',
				title: 'Placement Overview',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});

		// Create or update the component with the data
		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 0
				}
			},
			update: {
				data: placementOverviewData,
				key: 'PLACEMENT_OVERVIEW'
			},
			create: {
				pageId: page.id,
				key: 'PLACEMENT_OVERVIEW',
				data: placementOverviewData,
				order: 0
			}
		});

		console.log('✅ Placement overview data seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding placement overview data:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

if (require.main === module) {
	seedPlacementOverviewData()
		.then(() => {
			console.log('🌱 Seeding placement overview data...');
			process.exit(0);
		})
		.catch((error) => {
			console.error('Seeding failed:', error);
			process.exit(1);
		});
}

module.exports = { seedPlacementOverviewData };