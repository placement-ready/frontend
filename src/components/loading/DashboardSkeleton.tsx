import { Skeleton, SkeletonLine, SkeletonCircle } from './Skeleton';

export function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 lg:px-8">
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <SkeletonLine className="h-4 w-32 bg-slate-200/70 dark:bg-slate-800" />
        <SkeletonLine className="h-8 w-3/4 bg-slate-200/70 dark:bg-slate-800" />
        <SkeletonLine className="h-4 w-1/2 bg-slate-200/70 dark:bg-slate-800" />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Skeleton className="h-80 rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/60" />
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/60" />
          <Skeleton className="h-40 rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/60" />
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex items-center gap-3">
          <SkeletonCircle className="h-12 w-12" />
          <div className="flex-1 space-y-2">
            <SkeletonLine className="w-1/3" />
            <SkeletonLine className="w-2/3" />
          </div>
        </div>
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <SkeletonLine className="w-2/3" />
              <SkeletonLine className="w-1/2" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
