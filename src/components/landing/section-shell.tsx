'use client';

import { type ReactNode } from 'react';
import { motion, type MotionProps } from 'framer-motion';

import { fadeUp } from './motion';
import { cn } from '@/lib/utils';

interface SectionShellProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export function SectionShell({ children, className, ...props }: SectionShellProps) {
  return (
    <motion.section
      className={cn('w-full px-4 py-20 sm:px-6 lg:px-8', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">{children}</div>
    </motion.section>
  );
}
