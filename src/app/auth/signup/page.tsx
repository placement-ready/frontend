'use client';

import React from 'react';
import { Form } from '@/components/auth/AuthForm';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function SignupForm() {
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    await authClient.signUp.email(
      {
        email,
        password,
        name: email.split('@')[0],
        callbackURL: '/dashboard',
      },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (ctx) => {
          console.error('Signup error:', ctx.error);
        },
      },
    );
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/auth/signup',
    });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join HireMind and start preparing with confidence"
      footer={
        <>
          <Form.FooterLink
            text="Already have an account?"
            linkText="Sign in"
            linkHref="/auth/login"
          />
          <Form.TermsFooter />
        </>
      }
    >
      <Form.Root onSubmit={handleSubmit} className="space-y-6">
        <Form.Error />

        <Form.EmailField placeholder="Enter your email" />

        <Form.PasswordField placeholder="Create a password" />

        <Form.SubmitButton loadingText="Creating account...">Sign Up</Form.SubmitButton>

        <Form.Separator />

        <Form.GoogleButton onGoogleSignIn={handleGoogleSignIn} text="Sign up with Google" />
      </Form.Root>
    </AuthLayout>
  );
}
