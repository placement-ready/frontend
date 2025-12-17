export type UserRole = 'student' | 'admin' | 'recruiter';

export interface AppUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | string | null;
  role: UserRole;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
