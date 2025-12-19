'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Compass, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-slate-800/60 bg-slate-950/60 p-8 shadow-[0_40px_120px_rgba(2,6,23,0.65)] md:flex-row">
        <section className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300/80">Not found</p>
          <div>
            <span className="text-7xl font-semibold text-white md:text-8xl">404</span>
            <p className="mt-4 text-2xl font-semibold text-white">We could not find that page.</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              The link might be outdated or the page may have moved. Double-check the URL or pick
              one of the next actions to continue working.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <Home className="h-4 w-4" />
              Back to homepage
            </Link>
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </div>
        </section>

        <section className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            <Compass className="h-4 w-4 text-emerald-300" />
            Try this
          </div>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Search
              </p>
              <p className="mt-2">
                Use the main nav to jump into dashboard, interviews, or resume builder.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Shortcut
              </p>
              <p className="mt-2">
                If you saved a link earlier, refresh it from the dashboard quick actions panel.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
