'use client';

import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumePreviewProps {
  data?: {
    fullName?: string;
    email?: string;
    phone?: string;
    summary?: string;
    skills?: string[];
  };
  className?: string;
}

export function ResumePreview({ data, className }: ResumePreviewProps) {
  const hasData = data && (data.fullName || data.email || data.summary);

  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-emerald-600" />
        <h3 className="font-semibold text-foreground">Preview</h3>
      </div>

      {hasData ? (
        <div className="space-y-4 text-sm">
          {data.fullName && (
            <div>
              <h4 className="text-xl font-bold text-foreground">{data.fullName}</h4>
            </div>
          )}

          {(data.email || data.phone) && (
            <div className="flex flex-wrap gap-3 text-muted-foreground">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
            </div>
          )}

          {data.summary && (
            <div>
              <h5 className="mb-1 font-semibold text-foreground">Summary</h5>
              <p className="text-muted-foreground">{data.summary}</p>
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div>
              <h5 className="mb-2 font-semibold text-foreground">Skills</h5>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-emerald-100 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="mb-3 h-12 w-12 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Fill in the form to see your resume preview
          </p>
        </div>
      )}
    </div>
  );
}
