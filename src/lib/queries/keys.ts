import type { PaginationParams } from '@/types/api/common';

// Minimal query keys scoped to the features we actually ship today
export const queryKeys = {
  // Auth
  auth: () => ['auth'] as const,
  authUser: () => ['auth', 'user'] as const,
  authCheckUser: (email: string) => ['auth', 'check-user', email] as const,
  authEmailVerification: (email: string) => ['auth', 'email-verified', email] as const,

  // Users
  users: () => ['users'] as const,
  usersList: (params?: PaginationParams) => ['users', 'list', params ?? {}] as const,
  user: (id: string) => ['users', 'detail', id] as const,
  profile: () => ['users', 'profile'] as const,

  // Resumes
  resumes: () => ['resumes'] as const,
  resume: (id: string) => ['resumes', 'detail', id] as const,
  resumeTemplates: () => ['resumes', 'templates'] as const,
  resumeTemplate: (id: string) => ['resumes', 'templates', id] as const,

  // Mentor
  mentorQuestions: () => ['mentor', 'questions'] as const,
};
