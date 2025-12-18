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
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
            <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="flex-1 text-lg font-medium leading-relaxed text-foreground">{question}</p>
        </div>
      </div>
    </div>
  );
}
