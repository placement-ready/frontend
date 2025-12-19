import { Skeleton, SkeletonLine } from './Skeleton';

export function InterviewSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-12 pt-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-44 rounded-3xl border border-slate-800/80 bg-slate-900/60" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <Skeleton className="h-40 rounded-3xl border border-slate-800/80 bg-slate-900/60" />
            <Skeleton className="h-64 rounded-3xl border border-slate-800/80 bg-slate-900/60" />
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SkeletonLine className="h-3 w-32 bg-slate-800" />
                <SkeletonLine className="h-3 w-20 bg-slate-800" />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {[0, 1, 2].map((chip) => (
                  <Skeleton key={chip} className="h-10 w-32 rounded-2xl bg-slate-800/80" />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64 rounded-3xl border border-slate-800/80 bg-slate-900/60" />
            <Skeleton className="h-40 rounded-3xl border border-slate-800/80 bg-slate-900/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
