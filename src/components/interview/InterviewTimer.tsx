'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clock } from 'lucide-react';

interface InterviewTimerProps {
  initialMinutes?: number;
  onTimeUp?: () => void;
}

export function InterviewTimer({ initialMinutes = 30, onTimeUp }: InterviewTimerProps) {
  const totalSeconds = initialMinutes * 60;
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const lowTime = seconds < 300;
  const percent = useMemo(
    () => Math.round((seconds / totalSeconds) * 100),
    [seconds, totalSeconds],
  );

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur dark:border-emerald-500/40 dark:bg-slate-950/60 dark:text-emerald-100">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
          lowTime
            ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300'
            : 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300'
        }`}
      >
        <Clock className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-emerald-200/70">
          Time left
        </p>
        <p className="font-mono text-base">
          {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
        </p>
      </div>
      <div className="ml-auto text-right text-[11px] uppercase tracking-[0.2em] text-emerald-500 dark:text-emerald-300">
        {percent}%
        <div className="mt-1 h-1 w-20 rounded-full bg-emerald-100 dark:bg-slate-800">
          <div
            className={`h-full rounded-full ${lowTime ? 'bg-red-400' : 'bg-emerald-400'}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
