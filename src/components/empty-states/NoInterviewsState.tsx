import Link from 'next/link';
import { Mic2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { EmptyState } from './EmptyState';

interface NoInterviewsStateProps {
  actionHref?: string;
}

export function NoInterviewsState({
  actionHref = '/dashboard/interview/schedule',
}: NoInterviewsStateProps) {
  return (
    <EmptyState
      title="No interviews yet"
      description="Once you schedule a mock interview, we will store the debrief, score, and follow-up notes here."
      icon={<Mic2 className="h-5 w-5" />}
      action={
        <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-500">
          <Link href={actionHref}>
            <Plus className="mr-2 h-4 w-4" /> Schedule interview
          </Link>
        </Button>
      }
    />
  );
}
