'use client';

import React from 'react';
import { Form } from '@/components/auth/AuthForm';
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
    <Form.Root onSubmit={handleSubmit}>
      <Form.Header title="Create Account" subtitle="Join HireMind today" />

      <Form.Error />

      <Form.EmailField placeholder="Enter your email" />

      <Form.PasswordField placeholder="Create a password" />

      <Form.SubmitButton loadingText="Creating account...">Sign Up</Form.SubmitButton>

      <Form.FooterLink text="Already have an account?" linkText="Sign in" linkHref="/auth/login" />

      <Form.Separator />

      <Form.GoogleButton onGoogleSignIn={handleGoogleSignIn} text="Sign up with Google" />

      <Form.TermsFooter />
    </Form.Root>
  );
}
