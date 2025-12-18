import { createAuthClient } from 'better-auth/react';
import { env } from '@/config';

export const authClient = createAuthClient({
  baseURL: env.apiUrl ?? 'http://localhost:4000',
  fetchOptions: {
    credentials: 'include',
  },
});
