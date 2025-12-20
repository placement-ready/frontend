'use client';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function AnswerInput({ value, onChange, placeholder, className }: AnswerInputProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
            Answer Draft
          </p>
          <p className="text-sm text-muted-foreground">Structure responses with the STAR method.</p>
        </div>
        <span className="rounded-full border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
          {wordCount} words
        </span>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Take a breath and start outlining your answer...'}
        className="mt-4 min-h-48 resize-y border-slate-200 bg-white text-base dark:border-slate-800 dark:bg-slate-950/60"
      />

      <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-muted-foreground">
        <span>Shift + Enter to add a new line</span>
        <span>{value.length} characters</span>
      </div>
    </div>
  );
}
