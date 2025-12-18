'use client';

import { motion } from 'framer-motion';
import { Bot, FileText, Sparkle, TimerReset } from 'lucide-react';

import { fadeUp, fadeUpStagger } from './motion';
import { SectionShell } from './section-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'AI interview coach',
    description: 'Adaptive prompts with speaking pace, eye-contact, and filler word tracking.',
    icon: Bot,
    bullets: [
      'Role-specific prep decks',
      'Moment-to-moment transcript notes',
      'Focus cues while you speak',
    ],
  },
  {
    title: 'Resume builder',
    description: 'Structure outcome-driven bullet points and export a tidy PDF instantly.',
    icon: FileText,
    bullets: [
      'ATS-friendly templates',
      'Auto-suggested impact verbs',
      'One-click formatting tweaks',
    ],
  },
];

const CoreFeatures = () => {
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
          Core kit
        </motion.span>
        <motion.h2
          className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          variants={fadeUp}
        >
          Two pillars, one workspace
        </motion.h2>
        <motion.p
          className="max-w-2xl text-sm text-muted-foreground sm:text-base"
          variants={fadeUp}
        >
          Focus on practice and outcomes. The interview coach and resume builder stay in sync, so
          feedback becomes bullet points.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        variants={fadeUpStagger}
      >
        {features.map(({ title, description, icon: Icon, bullets }) => (
          <motion.div key={title} variants={fadeUp}>
            <Card className="h-full border-border/70 bg-card/80">
              <CardHeader className="flex flex-row items-start justify-between gap-3 border-none pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6 pt-0">
                <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Sparkle className="mt-0.5 h-4 w-4 text-primary" strokeWidth={1.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div
          variants={fadeUp}
          className="relative min-h-80 overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="relative flex h-full flex-col justify-between p-8">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Session snapshot
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Timeline and actions stay paired
              </h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                Capture highlights during interviews and send them straight into bullets without
                rewriting.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="rounded-xl border border-border/60 bg-background/80 p-4">
                <div className="flex items-center gap-2 text-foreground">
                  <TimerReset className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span className="font-medium">Live prompts</span>
                </div>
                <p className="mt-2 text-sm">Time-bound follow-ups keep you on track.</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/80 p-4">
                <div className="flex items-center gap-2 text-foreground">
                  <FileText className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span className="font-medium">Resume sync</span>
                </div>
                <p className="mt-2 text-sm">Accepted notes flow into your resume draft.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};

export default CoreFeatures;
