import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@vulnara/db-schema';

export const auth = betterAuth({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
