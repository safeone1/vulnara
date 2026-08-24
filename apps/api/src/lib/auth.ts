import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@vulnara/db-schema';

export const auth = betterAuth({
  baseURL: process.env.PUBLIC_URL! ?? 'http://localhost:3022',
  trustedOrigins: [
    process.env.WEB_URL ?? 'http://localhost:3000',
    'http://10.149.109.96:3000',
  ],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  advanced: {
    // The session cookie must survive plain cross-site fetch() calls (the
    // web app calling the API on a different origin), not just top-level
    // navigations. The default SameSite=Lax is never sent on those, so the
    // frontend saw sessions as missing even though they existed server-side.
    // defaultCookieAttributes: {
    //   sameSite: 'none',
    //   secure: true,
    // },
  },

  account: {
    // The web app and this API sit on different origins (the API is only
    // reachable via the ngrok tunnel), so the OAuth state-binding cookie
    // can't round-trip. The state token itself is still validated
    // server-side (single-use, time-limited DB record), so this only
    // drops the extra same-browser binding check.
    skipStateCookieCheck: true,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
