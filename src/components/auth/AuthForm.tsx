'use client';

import React, { createContext, useContext, useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, EasingDefinition } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

// Context for form state management
interface FormContextType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within Form.Root');
  }
  return context;
};

// Root Form Component
interface FormRootProps {
  children: React.ReactNode;
  onSubmit: (email: string, password: string) => void | Promise<void>;
  className?: string;
}

const FormRoot = ({ children, onSubmit, className = '' }: FormRootProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        setIsLoading,
        error,
        setError,
        showPassword,
        setShowPassword,
      }}
    >
      <form onSubmit={handleSubmit} className={cn('space-y-5', className)}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Header Component
interface FormHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}

const FormHeader = ({ title, subtitle, icon = '/brain.png' }: FormHeaderProps) => {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
        <Image src={icon} alt="Icon" width={28} height={28} className="object-contain" />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
  );
};

// Error Display Component
const FormError = () => {
  const { error } = useFormContext();

  if (!error) return null;

  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200"
      role="alert"
    >
      {error}
    </div>
  );
};

// Label Component
interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const FormLabel = ({ htmlFor, children }: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {children}
    </label>
  );
};

// Email Field Component
interface FormEmailFieldProps {
  placeholder?: string;
  required?: boolean;
}

const FormEmailField = ({
  placeholder = 'Enter your email',
  required = true,
}: FormEmailFieldProps) => {
  const { email, setEmail, isLoading } = useFormContext();

  return (
    <div>
      <FormLabel htmlFor="email">Email address</FormLabel>
      <div className="relative">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={isLoading}
          className="w-full rounded-xl border border-gray-200 bg-white px-10 py-3 text-sm text-gray-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
        />
        <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
};

// Password Field Component
interface FormPasswordFieldProps {
  placeholder?: string;
  required?: boolean;
  showToggle?: boolean;
}

const FormPasswordField = ({
  placeholder = 'Enter your password',
  required = true,
  showToggle = true,
}: FormPasswordFieldProps) => {
  const { password, setPassword, isLoading, showPassword, setShowPassword } = useFormContext();

  return (
    <div>
      <FormLabel htmlFor="password">Password</FormLabel>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={isLoading}
          className="w-full rounded-xl border border-gray-200 bg-white px-10 py-3 text-sm text-gray-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
        />
        <LockClosedIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-200 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

// Submit Button Component
interface FormSubmitButtonProps {
  children: React.ReactNode;
  loadingText?: string;
}

const submitButtonVariants = {
  idle: { scale: 1 },
  loading: {
    scale: [1, 0.98, 1],
    transition: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' as EasingDefinition },
  },
};

const FormSubmitButton = ({ children, loadingText = 'Loading...' }: FormSubmitButtonProps) => {
  const { isLoading, email, password } = useFormContext();

  return (
    <motion.button
      type="submit"
      variants={submitButtonVariants}
      animate={isLoading ? 'loading' : 'idle'}
      disabled={isLoading || !email || !password}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-600/60 disabled:text-white/80 dark:bg-emerald-500 dark:hover:bg-emerald-400"
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Spinner className="h-4 w-4 text-white" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

// Separator Component
interface FormSeparatorProps {
  text?: string;
}

const FormSeparator = ({ text = 'or' }: FormSeparatorProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-800" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        <span className="bg-white px-3 text-[0.7rem] font-medium dark:bg-gray-900">{text}</span>
      </div>
    </div>
  );
};

// Google Sign In Component
interface FormGoogleButtonProps {
  onGoogleSignIn: () => void | Promise<void>;
  text?: string;
}

const FormGoogleButton = ({
  onGoogleSignIn,
  text = 'Continue with Google',
}: FormGoogleButtonProps) => {
  const [processing, setProcessing] = useState(false);

  const handleClick = async () => {
    setProcessing(true);
    try {
      await onGoogleSignIn();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={processing}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-emerald-400 dark:hover:bg-gray-800"
      whileTap={{ scale: processing ? 1 : 0.98 }}
      aria-busy={processing}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M17.64 9.2045c0-.638-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.842 2.078-1.795 2.717v2.258h2.908c1.703-1.57 2.683-3.885 2.683-6.615z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.258c-.806.54-1.838.86-3.048.86-2.345 0-4.33-1.584-5.037-3.711H.957v2.332C2.438 15.983 5.481 18 9 18z"
          fill="#34A853"
        />
        <path
          d="M3.963 10.711a5.408 5.408 0 0 1 0-3.422V4.957H.957a8.998 8.998 0 0 0 0 8.086l3.006-2.332z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.542c1.319 0 2.506.454 3.44 1.343l2.58-2.58C13.463.906 11.426 0 9 0 5.481 0 2.438 2.017.957 4.957l3.006 2.332C4.67 5.126 6.655 3.542 9 3.542z"
          fill="#EA4335"
        />
      </svg>
      {processing ? (
        <span className="flex items-center gap-2">
          <Spinner className="h-4 w-4 text-gray-500 dark:text-gray-300" />
          Signing in...
        </span>
      ) : (
        text
      )}
    </motion.button>
  );
};

// Footer Link Component
interface FormFooterLinkProps {
  text: string;
  linkText: string;
  linkHref: string;
}

const FormFooterLink = ({ text, linkText, linkHref }: FormFooterLinkProps) => {
  return (
    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
      {text}{' '}
      <Link
        href={linkHref}
        className="font-medium text-emerald-600 transition-colors duration-200 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        {linkText}
      </Link>
    </p>
  );
};

// Terms Footer Component
const FormTermsFooter = () => {
  return (
    <p className="text-center text-xs text-gray-500 dark:text-gray-500">
      By continuing, you agree to our{' '}
      <a
        href="#"
        className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        Terms of Service
      </a>{' '}
      and{' '}
      <a
        href="#"
        className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        Privacy Policy
      </a>
    </p>
  );
};

// Forgot Password Link Component
const FormForgotPassword = () => {
  return (
    <div className="text-right">
      <Link
        href="#"
        className="text-sm font-medium text-emerald-600 transition-colors duration-200 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        Forgot password?
      </Link>
    </div>
  );
};

// Export all components
export const Form = {
  Root: FormRoot,
  Header: FormHeader,
  Error: FormError,
  EmailField: FormEmailField,
  PasswordField: FormPasswordField,
  SubmitButton: FormSubmitButton,
  Separator: FormSeparator,
  GoogleButton: FormGoogleButton,
  FooterLink: FormFooterLink,
  TermsFooter: FormTermsFooter,
  ForgotPassword: FormForgotPassword,
};
