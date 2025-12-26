'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Mic2 } from 'lucide-react';
import { NoInterviewsState } from '@/components/empty-states/NoInterviewsState';
import { DashboardCard } from './DashboardCard';
import { staggerContainer, subtleListItem } from './motion';

interface InterviewItem {
  id: string;
  company: string;
  role: string;
  date: string;
  status: 'Completed' | 'Scheduled' | 'Draft';
  score?: number;
}

const interviews: InterviewItem[] = [
  {
    id: '1',
    company: 'Acme Robotics',
    role: 'Frontend Engineer',
    date: '16 Dec 2025',
    status: 'Completed',
    score: 82,
  },
  {
    id: '2',
    company: 'Nimbus AI',
    role: 'Product Manager',
    date: '18 Dec 2025',
    status: 'Scheduled',
  },
  {
    id: '3',
    company: 'Strive Labs',
    role: 'Data Analyst',
    date: '22 Dec 2025',
    status: 'Draft',
  },
];

const statusStyles: Record<InterviewItem['status'], string> = {
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Scheduled: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Draft: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
};

const RecentInterviews = () => {
  const hasInterviews = interviews.length > 0;

  return (
    <DashboardCard
      heading="Recent interviews"
      subheading="Review outcomes and prepare for what is coming next."
    >
      {hasInterviews ? (
        <>
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {interviews.map((interview) => (
              <motion.div
                key={interview.id}
                variants={subtleListItem}
                className="flex items-center justify-between gap-4 rounded-lg border border-transparent bg-background px-4 py-3 transition-colors duration-200 hover:border-border/60"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/40 text-muted-foreground">
                    {interview.status === 'Completed' ? (
                      <BadgeCheck className="h-5 w-5" />
                    ) : (
                      <Mic2 className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground sm:text-base">
                      {interview.company}
                    </p>
                    <p className="text-xs text-muted-foreground sm:text-sm">{interview.role}</p>
                    <p className="text-xs text-muted-foreground/80">{interview.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[interview.status]}`}
                  >
                    {interview.status}
                  </span>
                  {interview.score ? (
                    <span className="hidden text-sm font-semibold text-emerald-600 sm:inline dark:text-emerald-400">
                      {interview.score}%
                    </span>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Interviews are automatically summarised so you can revisit takeaways anytime.
            </p>
            <Link
              href="/dashboard/interview"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors duration-200 hover:text-emerald-500 dark:text-emerald-400"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      ) : (
        <NoInterviewsState />
      )}
    </DashboardCard>
  );
};

export default RecentInterviews;
