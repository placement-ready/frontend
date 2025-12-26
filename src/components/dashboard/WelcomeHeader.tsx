'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarCheck, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { DashboardCard, DashboardCardSection } from './DashboardCard';
import { fadeInUp } from './motion';

const focusHighlights = [
  {
    label: 'Next mock interview',
    value: 'Tomorrow, 10:30 AM',
    icon: CalendarCheck,
  },
  {
    label: 'Weekly practice time',
    value: '6 hours tracked',
    icon: Clock,
  },
  {
    label: 'Confidence trend',
    value: '+12% this month',
    icon: TrendingUp,
  },
];

const WelcomeHeader = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <DashboardCard
      heading={`Welcome back, ${firstName}`}
      subheading="Pick up where you left off and keep your momentum."
      variants={fadeInUp}
      action={
        <Button asChild size="lg">
          <Link href="/dashboard/interview">Start interview</Link>
        </Button>
      }
    >
      <DashboardCardSection>
        <p className="text-sm text-muted-foreground">
          Your personalised dashboard keeps track of interviews, resume updates, and milestones so
          you always know the next best step.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {focusHighlights.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -2 }}
              className="flex items-start gap-3 rounded-lg bg-muted/30 px-4 py-3 text-sm"
            >
              <span className="mt-1 text-muted-foreground">
                <item.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground/80">
                  {item.label}
                </p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardCardSection>
    </DashboardCard>
  );
};

export default WelcomeHeader;
