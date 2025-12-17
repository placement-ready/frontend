import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';
import type { UserRole } from '@/types/auth';

const inMemoryStore: Record<string, Array<Record<string, unknown>>> = {
  user: [],
  account: [],
  session: [],
  verification: [],
  rateLimit: [],
};

const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const baseURL =
  process.env.AUTH_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const auth = betterAuth({
  appName: 'HireMind',
  baseURL,
  secret: requiredEnv('AUTH_SECRET'),
  database: memoryAdapter(inMemoryStore),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'student' as UserRole,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: requiredEnv('GOOGLE_CLIENT_ID'),
      clientSecret: requiredEnv('GOOGLE_CLIENT_SECRET'),
    },
  },
});
