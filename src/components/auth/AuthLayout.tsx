'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthLayout = ({ title, subtitle, children, footer }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-transparent flex items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="hidden lg:flex lg:flex-col lg:gap-4">
          <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold">
            <Image
              src="/logo.png"
              alt="HireMind"
              width={32}
              height={32}
              className="object-contain"
            />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">HireMind</h2>
          </Link>
          <p className="max-w-sm text-sm text-gray-600 dark:text-gray-400">
            Purpose-built tools to help you prepare with confidence. Sign in to pick up where you
            left off.
          </p>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mx-auto w-full max-w-md"
        >
          <div className="space-y-6 rounded-3xl border border-gray-200/70 bg-white/90 p-8 shadow-lg shadow-emerald-900/5 backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/80 dark:shadow-black/40 sm:p-10">
            <header className="space-y-3 text-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
                {subtitle ? (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
                ) : null}
              </div>
            </header>

            {children}

            {footer ? (
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">{footer}</div>
            ) : null}
          </div>
        </motion.section>
      </div>
    </div>
  );
};
