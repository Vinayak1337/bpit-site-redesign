import 'server-only';
import { PrismaClient } from '@prisma/client';
import { MongoClient } from 'mongodb';

// Prevent multiple instances during dev HMR by caching on globalThis
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
	throw new Error('MONGO_URI environment variable is not set');
}
const mongoClient = new MongoClient(mongoUri);

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter: mongoClient as unknown as never,
		log:
			process.env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error']
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
