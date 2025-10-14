/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
	const jsonPath = path.join(__dirname, 'seed-data', 'home-hero.json');
	const raw = fs.readFileSync(jsonPath, 'utf-8');
	const data = JSON.parse(raw);
	await prisma.homepage.upsert({
		where: { id: 'homepage' },
		update: { hero: data },
		create: { id: 'homepage', hero: data }
	});
	console.log('Seeded homepage hero');
}

main().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });



