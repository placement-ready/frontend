'use client';

import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackPanelProps {
  feedback?: {
    strengths?: string[];
    improvements?: string[];
    tips?: string[];
  };
  className?: string;
}

const sectionConfig = {
  strengths: {
    title: 'What worked',
    icon: CheckCircle2,
    border: 'border-emerald-200 dark:border-emerald-900/50',
    background: 'bg-emerald-50/70 dark:bg-emerald-950/40',
    text: 'text-emerald-900 dark:text-emerald-200',
  },
  improvements: {
    title: 'Tighten up',
    icon: AlertCircle,
    border: 'border-amber-200 dark:border-amber-900/50',
    background: 'bg-amber-50/70 dark:bg-amber-950/40',
    text: 'text-amber-900 dark:text-amber-200',
  },
  tips: {
    title: 'Next attempt',
    icon: Lightbulb,
    border: 'border-sky-200 dark:border-sky-900/50',
    background: 'bg-sky-50/70 dark:bg-sky-950/40',
    text: 'text-sky-900 dark:text-sky-200',
  },
} as const;

export function FeedbackPanel({ feedback, className }: FeedbackPanelProps) {
  if (!feedback) {
    return (
      <div
        className={cn(
          'flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300/70 bg-white/30 p-6 text-center text-sm text-muted-foreground dark:border-slate-700 dark:bg-slate-900/30',
          className,
        )}
      >
        <p>Answer the current question and request feedback to see real-time insights.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/60',
        className,
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
          Live feedback
        </p>
        <h3 className="text-base font-semibold text-foreground">Refine your response</h3>
      </div>

      {(['strengths', 'improvements', 'tips'] as const).map((key) => {
        const items = feedback[key];
        if (!items || items.length === 0) return null;
        const cfg = sectionConfig[key];
        const Icon = cfg.icon;
        return (
          <div
            key={key}
            className={cn('space-y-2 rounded-xl border p-4', cfg.border, cfg.background, cfg.text)}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Icon className="h-4 w-4" />
              {cfg.title}
            </div>
            <ul className="space-y-1 text-sm">
              {items.map((item, idx) => (
                <li key={`${key}-${idx}`}>• {item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
