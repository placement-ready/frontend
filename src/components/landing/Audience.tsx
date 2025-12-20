'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, UserRoundCheck } from 'lucide-react';

import { fadeUp, fadeUpStagger } from './motion';
import { SectionShell } from './section-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const personas = [
  {
    title: 'Students and fresh grads',
    description:
      'Practice core interviews, record progress, and see where to focus between rounds.',
    Icon: GraduationCap,
  },
  {
    title: 'Career switchers',
    description:
      'Use tailored question sets and resume prompts to translate past experience quickly.',
    Icon: Briefcase,
  },
  {
    title: 'Busy professionals',
    description:
      'Run short daily drills, log takeaways, and keep a living resume without context switching.',
    Icon: UserRoundCheck,
  },
];

const Audience = () => {
  return (
    <SectionShell className="py-24">
      <motion.div
        className="flex flex-col items-start gap-3 text-left sm:items-center sm:text-center"
        variants={fadeUpStagger}
      >
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary"
          variants={fadeUp}
        >
          Who it&apos;s for
        </motion.span>
        <motion.h2
          className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          variants={fadeUp}
        >
          Built for any stage of job prep
        </motion.h2>
        <motion.p
          className="max-w-2xl text-sm text-muted-foreground sm:text-base"
          variants={fadeUp}
        >
          Quick sessions fit into daily routines, whether you&apos;re preparing for your first panel
          or your next promotion.
        </motion.p>
      </motion.div>

      <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-3" variants={fadeUpStagger}>
        {personas.map(({ title, description, Icon }) => (
          <motion.div key={title} variants={fadeUp}>
            <Card className="h-full border-border/70 bg-card/80">
              <CardHeader className="border-none pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3 px-6 pb-6 pt-0">
                <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
};

export default Audience;
