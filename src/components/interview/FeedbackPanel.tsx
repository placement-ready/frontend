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

export function FeedbackPanel({ feedback, className }: FeedbackPanelProps) {
  if (!feedback) return null;

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-base font-semibold text-foreground">Feedback</h3>

      {feedback.strengths && feedback.strengths.length > 0 && (
        <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-900/10">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Strengths</span>
          </div>
          <ul className="space-y-1 text-sm text-emerald-900 dark:text-emerald-300">
            {feedback.strengths.map((strength, idx) => (
              <li key={idx}>• {strength}</li>
            ))}
          </ul>
        </div>
      )}

      {feedback.improvements && feedback.improvements.length > 0 && (
        <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-900/10">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Areas for Improvement</span>
          </div>
          <ul className="space-y-1 text-sm text-amber-900 dark:text-amber-300">
            {feedback.improvements.map((improvement, idx) => (
              <li key={idx}>• {improvement}</li>
            ))}
          </ul>
        </div>
      )}

      {feedback.tips && feedback.tips.length > 0 && (
        <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/50 dark:bg-blue-900/10">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <Lightbulb className="h-4 w-4" />
            <span className="text-sm font-medium">Tips</span>
          </div>
          <ul className="space-y-1 text-sm text-blue-900 dark:text-blue-300">
            {feedback.tips.map((tip, idx) => (
              <li key={idx}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
