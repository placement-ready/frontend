'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface InterviewTimerProps {
  initialMinutes?: number;
  onTimeUp?: () => void;
}

export function InterviewTimer({ initialMinutes = 30, onTimeUp }: InterviewTimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

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
  const isLowTime = seconds < 300; // Less than 5 minutes

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
        isLowTime
          ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          : 'bg-muted text-muted-foreground'
      }`}
    >
      <Clock className="h-4 w-4" />
      <span className="font-mono text-sm font-medium">
        {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
      </span>
    </div>
  );
}
