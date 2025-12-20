'use client';

import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  className?: string;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  className,
}: QuestionCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Question {questionNumber}
        </div>
        <p className="text-xs font-medium text-muted-foreground">
          {questionNumber} / {totalQuestions}
        </p>
      </div>

      <div className="mt-5 flex items-start gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
          <HelpCircle className="h-5 w-5" />
        </span>
        <p className="flex-1 text-lg font-semibold leading-relaxed text-foreground">{question}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
          Highlight wins
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
          Quantify impact
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
          Close with learning
        </span>
      </div>
    </div>
  );
}
