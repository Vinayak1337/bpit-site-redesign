// Seed an example admin user using Prisma Client
require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@bpit.ac.in';
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin already exists:', email);
  } else {
    await prisma.adminUser.create({
      data: {
        email,
        name: 'Site Admin',
        passwordHash,
        role: 'ADMIN'
      }
    });
    console.log('Seeded admin:', email);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
