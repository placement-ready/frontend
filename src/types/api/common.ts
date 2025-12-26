// Common API types used across the application

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null | undefined;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
