'use client';

import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-800/60 bg-slate-950/60 p-8 text-center shadow-[0_40px_120px_rgba(2,6,23,0.65)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80">
          <AlertTriangle className="h-6 w-6 text-amber-400" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Something went wrong</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">We could not load this view</h1>
          <p className="mt-2 text-sm text-slate-400">
            {error.message ||
              'An unexpected error occurred. Try reloading the page or head back to the dashboard.'}
          </p>
          {error.digest ? (
            <p className="mt-1 text-xs text-slate-600">Error reference: {error.digest}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <Home className="h-4 w-4" />
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
