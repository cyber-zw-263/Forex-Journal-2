// Ensure DATABASE_URL is available for Prisma during dev without relying solely on .env.local
// This is a small shim to avoid PrismaClientInitializationError when .env.local isn't picked up early
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./prisma/dev.db';

/** @type {import('next').NextConfig} */
module.exports = {};
