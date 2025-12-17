'use client';

import React, { createContext, useContext, useState, FormEvent } from 'react';
import Image from 'next/image';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Spinner } from '@/components/ui/spinner';

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
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdf4] via-[#ecfdf5] to-[#d1fae5] p-4 ${className}`}
      >
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {children}
          </form>
        </div>
      </div>
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
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-105 transition-transform duration-200">
        <Image src={icon} alt="Icon" width={40} height={40} className="object-contain" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
    </div>
  );
};

// Error Display Component
const FormError = () => {
  const { error } = useFormContext();

  if (!error) return null;

  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-600">{error}</p>
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
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-2">
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
          className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 text-black border-gray-200 rounded-xl focus:border-green-400 focus:ring-0 focus:outline-none bg-gray-50 hover:bg-white hover:border-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        />
        <EnvelopeIcon className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
          className="w-full pl-10 pr-12 py-3 sm:py-4 border-2 text-black border-gray-200 rounded-xl focus:border-green-400 focus:ring-0 focus:outline-none bg-gray-50 hover:bg-white hover:border-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        />
        <LockClosedIcon className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
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

const FormSubmitButton = ({ children, loadingText = 'Loading...' }: FormSubmitButtonProps) => {
  const { isLoading, email, password } = useFormContext();

  return (
    <button
      type="submit"
      disabled={isLoading || !email || !password}
      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transform hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base cursor-pointer"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner className="text-white" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
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
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-gray-500">{text}</span>
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
    <button
      type="button"
      onClick={handleClick}
      disabled={processing}
      className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 font-medium text-gray-700 hover:border-green-300 hover:bg-green-50 hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
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
      {processing ? 'Signing in...' : text}
    </button>
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
    <div className="text-center">
      <p className="text-sm text-gray-500">
        {text}{' '}
        <a
          href={linkHref}
          className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
        >
          {linkText}
        </a>
      </p>
    </div>
  );
};

// Terms Footer Component
const FormTermsFooter = () => {
  return (
    <div className="text-center">
      <p className="text-xs sm:text-sm text-gray-500">
        By continuing, you agree to our{' '}
        <a href="#" className="text-green-600 hover:text-green-700 font-medium">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-green-600 hover:text-green-700 font-medium">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

// Forgot Password Link Component
const FormForgotPassword = () => {
  return (
    <div className="text-right">
      <a
        href="#"
        className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
      >
        Forgot password?
      </a>
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
