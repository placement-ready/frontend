'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { buttonHover, fadeUp, fadeUpStagger } from './motion';
import { SectionShell } from './section-shell';
import { Button } from '@/components/ui/button';

const MotionButton = motion.create(Button);

const CtaBanner = () => {
  const router = useRouter();

  return (
    <SectionShell className="py-24">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-12 sm:px-10"
        variants={fadeUpStagger}
      >
        <div className="absolute inset-y-0 right-[-30%] hidden w-1/2 rounded-full bg-primary/15 blur-3xl sm:block" />
        <motion.div
          className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          variants={fadeUp}
        >
          <div className="max-w-xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
              Ready when you are
            </span>
            <h3 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
              Run your next mock interview and ship a sharper resume tonight.
            </h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              One dashboard to rehearse, review, and keep your story tight—no extra tabs required.
            </p>
          </div>
          <MotionButton
            variants={buttonHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            size="lg"
            className="mt-4 w-full sm:mt-0 sm:w-auto"
            onClick={() => router.push('/dashboard')}
          >
            Join the next session
            <ArrowRight className="ml-2 h-4 w-4" />
          </MotionButton>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};

export default CtaBanner;
