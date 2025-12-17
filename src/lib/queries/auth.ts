// Auth-related React Query hooks
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { queryKeys } from './keys';
import { useAuth } from '@/lib/auth/context';
import { useAppQuery } from './useAppQuery';
import type {
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  LoginResponse,
  RegisterResponse,
} from '@/types/api/common';

// Check if user exists query
export const useCheckUserExists = (email: string, enabled = true) =>
  useAppQuery({
    queryKey: queryKeys.authCheckUser(email),
    queryFn: () => authApi.checkUserExists(email),
    enabled: enabled && !!email,
    staleTime: 1000 * 60 * 2,
    errorMessage: 'Unable to verify if user exists',
  });

// Check if email is verified query
export const useCheckEmailVerified = (email: string, enabled = true) =>
  useAppQuery({
    queryKey: queryKeys.authEmailVerification(email),
    queryFn: () => authApi.isEmailVerified(email),
    enabled: enabled && !!email,
    staleTime: 1000 * 60 * 2,
    errorMessage: 'Unable to check email verification',
  });

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      await login(credentials.email, credentials.password);
      return { user: queryClient.getQueryData(queryKeys.authUser()) } as LoginResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth() });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: (data: RegisterResponse) => {
      if (data.user) {
        queryClient.setQueryData(queryKeys.authUser(), data.user);
      }
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

// Create verification token mutation
export const useCreateVerificationToken = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.createVerificationToken(email),
  });
};

// Verify email mutation
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
    onError: () => {
      // Even if logout fails on server, clear local cache
      queryClient.clear();
    },
  });
};

// Request password reset mutation
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.requestPasswordReset(email),
  });
};

// Reset password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.resetPassword(token, password),
  });
};

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => authApi.changePassword(currentPassword, newPassword),
  });
};
