// Exports all repositories
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
export * from './User';
export * from './Cookie';
