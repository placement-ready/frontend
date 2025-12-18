'use client';

import React from 'react';
import { Form } from '@/components/auth/AuthForm';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    await authClient.signIn.email(
      { email, password, callbackURL: '/dashboard' },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (ctx) => {
          console.error('Login error:', ctx.error);
        },
      },
    );
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/auth/login',
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to HireMind"
      footer={
        <>
          <Form.FooterLink
            text="Don't have an account?"
            linkText="Sign up"
            linkHref="/auth/signup"
          />
          <Form.TermsFooter />
        </>
      }
    >
      <Form.Root onSubmit={handleSubmit} className="space-y-6">
        <Form.Error />

        <Form.EmailField placeholder="Enter your email" />

        <div className="space-y-2">
          <Form.PasswordField placeholder="Enter your password" />
          <Form.ForgotPassword />
        </div>

        <Form.SubmitButton loadingText="Signing in...">Sign In</Form.SubmitButton>

        <Form.Separator />

        <Form.GoogleButton onGoogleSignIn={handleGoogleSignIn} />
      </Form.Root>
    </AuthLayout>
  );
}
