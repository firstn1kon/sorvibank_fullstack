import { PrismaClient } from '@prisma/client';

// Один инстанс на всё приложение — важно при dev hot-reload (tsx watch),
// иначе каждый рестарт модуля плодит новые подключения к Postgres.
export const prisma = new PrismaClient();
