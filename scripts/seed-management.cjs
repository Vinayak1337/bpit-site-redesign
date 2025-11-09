const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedManagement() {
	try {
		console.log('Seeding management data...');

		// Create or update the management page
		const page = await prisma.page.upsert({
			where: { slug: 'management' },
			update: {},
			create: {
				slug: 'management',
				title: 'Management',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});

		// Default management data
		const managementData = {
			title: 'Management Team',
			leaders: [
				{
					id: '1',
					name: 'Shri Vinod Vats',
					position: 'Chairman',
					description: [
						'Shri Vinod Vats is the Chairman of Bhagwan Parshuram Institute of Technology and also the President of Bhartiya Brahmin Charitable Trust. Being a visionary and a true social leader, he has played a vital role in the development of the institute.',
						'His endeavour for inclusivity and championing the cause of excellence in students are hallmarks that have helped the institute to paint the canvas of creative thoughts and brightest tales. As an active social worker, he has played different roles in the functioning and management of various social organizations and samagams in Delhi and NCR.',
						'In the past, he has held many honorary offices including the general secretary of Gaur Vidya Pracharini Sabha, President of its disciplinary committee, and member of Gaur Brahmin College of Education, Rohtak. He is also a member of the Advisory Committee of Deen Dayal Upadhyay Hospital, Government of NCT of Delhi, member of Tika Ram Shiksha Sansthan, Sonepat and member of North-Ex Blind Welfare and Educational Society Delhi.',
						'An eminent professional, educationist and nationalist, Shri Vinod Vats has gained a prominent position in society due to his exemplary social work. His rise to prominence in such a short span can be attributed to his strong will power, calibre, conviction, dedication and leadership quality.'
					],
					delay: 0.2
				},
				{
					id: '2',
					name: 'Shri Surender Sharma',
					position: 'Vice President',
					description: [
						'Padma Shri, Surender Sharma is the Vice President of Bhagwan Parshuram Institute of Technology as well as Bhartiya Brahmin Charitable Trust. He is a popular renowned Hindi poet (Hasyakavi) across the globe.',
						'He received Padma Shri Award from the government of India in 2013. He at times uses Marwari language to express rendezvous of thoughts and feelings with humour in his renditions. He is celebrated literati in literary circles across India.',
						'He is known to have caused many laugh riots and a notable fact is that he seldom laughs and maintains a poker face while telling the most hilarious jokes. This demeanour is particularly liked by a lot of people, who find it very amusing.',
						'In 2004, FM radio station, Red FM 93.5, started a daily show titled "Sharmaji Se Poocho" (Ask Mr Sharma) featuring Surender Sharma. In this show, he gave prompt and humorous answers to callers\' questions.'
					],
					delay: 0.4
				},
				{
					id: '3',
					name: 'Shri Ram Babu Sharma',
					position: 'General Secretary',
					description: [
						'Shri Ram Babu Sharma is the General Secretary of Bhagwan Parshuran Institute of Technology and Bhartiya Brahmin Charitable Trust. He has been associated with various social, religious and sports organizations.',
						'He was a member of the Delhi Executive of Archery Association of India. He is the president of Shiv Shakti Parishad, a social organization engaged in providing dress, books and free coaching to underprivileged children.',
						'He is also in the executive body of Shakti Mandir situated at Tiraha Bairam Khan in Dariyaganj Delhi. His dedication to social causes and organizational excellence has been instrumental in the institute\'s growth.'
					],
					delay: 0.6
				},
				{
					id: '4',
					name: 'Shri Shambhu Sharma',
					position: 'Secretary',
					description: [
						'Shri Shambhu Sharma is the Secretary of Bhagwan Parshuram Institute of Technology. He is the General Secretary of Akhil Bhartiya Brahmin Mahasabha and is revered as the son of his renowned father Late Pandit Madanlal Sharma, former national President of Akhil Bhartiya Brahmin Mahasabha.',
						'He is the Director of Brahm Shakti Sanjeevani and MLS hospitals. As the Director of two notable hospitals, he ensures overall regulation of all medical facets. He is the trustee of Yuvashakti Educational Society and an eminent member of Bhartiya Brahmin Charitable Trust.',
						'Shri Shambhu Sharma is a philanthropist, an active social worker and the President of MLS Charitable Trust. He has also served with distinction as Delhi municipal corporation councillor from Budh Vihar ward.'
					],
					delay: 0.8
				},
				{
					id: '5',
					name: 'Shri Sanjeev Sharma',
					position: 'Treasurer',
					description: [
						'Shri Sanjeev Sharma is the Treasurer of Bhagwan Parshuram Institute of Technology. "An investment in knowledge pays the best interest." - Benjamin Franklin. I firmly believe that education is an all-encompassing process that leads to the accomplishment of the student\'s full potential.',
						'At BPIT, we train our students to think creatively and engulf articulation, novelty and teamwork. To educate professional courses and develop a student\'s career and personality, BPIT offers devoted and knowledgeable experts.',
						'Besides a wonderful infrastructure, the students live in an aura that has been greatly enriched by a dedicated teaching faculty. The motive of our institute is to develop a worldwide perspective to cope-up with the fast-changing technological scenario.',
						'In addition, values with discipline are the hallmark of our college. His financial stewardship ensures the institute\'s sustainable growth and development.'
					],
					delay: 1.0
				}
			],
			vision: {
				title: 'Our Leadership Vision',
				quote: 'To build a world-class institution that nurtures innovative minds, fosters cutting-edge research, and produces skilled engineers who contribute meaningfully to society and industry.',
				delay: 0.6
			}
		};

		// Create or update the management component
		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 1
				}
			},
			update: {
				data: managementData,
				key: 'MANAGEMENT_DATA'
			},
			create: {
				pageId: page.id,
				data: managementData,
				order: 1,
				key: 'MANAGEMENT_DATA'
			}
		});

		console.log('Management data seeded successfully!');
	} catch (error) {
		console.error('Error seeding management data:', error);
	} finally {
		await prisma.$disconnect();
	}
}

seedManagement();