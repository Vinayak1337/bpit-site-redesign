/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	// Values sourced from src/data/header.ts (accreditation intentionally omitted)
	const contacts = [
		{
			type: 'PHONE',
			value: '011-27571080',
			displayValue: '011-2757 1080'
		},
		{
			type: 'PHONE',
			value: '011-27572900',
			displayValue: '011-2757 2900'
		},
		{
			type: 'EMAIL',
			value: 'bpitindia@yahoo.com',
			displayValue: 'bpitindia@yahoo.com'
		},
		{
			type: 'ADDRESS',
			value: 'PSP-4, Sector-17, Rohini, New Delhi',
			displayValue: 'PSP-4, Sector-17, Rohini, New Delhi'
		}
	];

	for (const contact of contacts)
		await prisma.contact.deleteMany({ where: { type: contact.type } });

	for (const contact of contacts)
		await prisma.contact.create({ data: contact });

	console.log('Seeded contacts successfully.');
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
