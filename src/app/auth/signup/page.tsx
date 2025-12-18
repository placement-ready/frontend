'use client';

import React from 'react';
import { Form } from '@/components/auth/AuthForm';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';

export default function SignupForm() {
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    await register(email, password, email.split('@')[0]);
    router.push('/dashboard');
  };

  const handleGoogleSignIn = async () => {
    console.log('Google Sign-In clicked');
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
