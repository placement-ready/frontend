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
  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium text-foreground">Your Answer</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Type your answer here...'}
        className="min-h-50 resize-y text-base"
      />
      <p className="text-xs text-muted-foreground">{value.length} characters</p>
    </div>
  );
}
