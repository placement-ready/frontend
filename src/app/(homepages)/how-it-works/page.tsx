import Link from 'next/link';
import {
  BrainCircuit,
  CalendarClock,
  Compass,
  Flashlight,
  Goal,
  GraduationCap,
  Handshake,
  Rocket,
} from 'lucide-react';

const steps = [
  {
    title: 'Create your adaptive profile',
    description:
      'Tell us about your experience, target roles, and companies so HireMind can calibrate skills and expectations instantly.',
    icon: Compass,
    badge: 'Step 01',
  },
  {
    title: 'Run your diagnostics',
    description:
      'Complete a guided baseline interview and skill assessment powered by AI interviewers to surface strengths and gaps.',
    icon: BrainCircuit,
    badge: 'Step 02',
  },
  {
    title: 'Follow the learning path',
    description:
      'Receive a curated weekly schedule with lessons, drills, and mentor prompts that adapt as you progress.',
    icon: GraduationCap,
    badge: 'Step 03',
  },
  {
    title: 'Show up prepared and confident',
    description:
      'Simulate the real interview setting, collect actionable feedback, and refine every answer before it matters.',
    icon: Rocket,
    badge: 'Step 04',
  },
];

const pillars = [
  {
    title: 'Personalized to your goal role',
    description:
      'Every learning path maps directly to the competencies hiring managers expect for your target companies, from entry-level to leadership.',
    icon: Goal,
  },
  {
    title: 'Live mentor collaboration',
    description:
      'Book 1:1 mentor sessions, get annotated scorecards, and rehearse high-stakes interviews with industry experts.',
    icon: Handshake,
  },
  {
    title: 'Always-on accountability',
    description:
      'Smart nudges, milestone tracking, and weekly recaps keep you aligned with your prep plan even on busy weeks.',
    icon: CalendarClock,
  },
];

const resources = [
  {
    title: 'Real interview question bank',
    description:
      'Practice with prompts surfaced from recent interview loops across top tech companies.',
    icon: Flashlight,
  },
  {
    title: 'Structured feedback engine',
    description:
      'Capture every improvement opportunity with detailed rubrics and actionable revisions.',
    icon: BrainCircuit,
  },
  {
    title: 'Offer accelerator playbook',
    description:
      'Navigate negotiations and closing conversations confidently with scripts and mentor coaching.',
    icon: Handshake,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/40 to-white dark:from-gray-950 dark:via-emerald-950/30 dark:to-gray-950">
      <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
            <Flashlight className="h-4 w-4" />
            Inside the HireMind experience
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-50">
            A guided journey from first assessment to offer letter
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            We combine AI precision with human mentorship so you know exactly what to practice, when
            to practice, and how to improve.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex h-full flex-col gap-6 rounded-3xl border border-emerald-200/70 bg-white/80 p-8 shadow-xl shadow-emerald-500/10 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl dark:border-emerald-500/20 dark:bg-gray-900/70"
              >
                <span className="inline-flex w-max items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {step.badge}
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h2>
                </div>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
              What makes HireMind different
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Every workflow is rooted in real hiring rubrics. We align your preparation with the
              exact expectations of interviewers so you can convert conversations into offers.
            </p>
            <div className="space-y-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex gap-4 rounded-2xl border border-emerald-200/60 bg-white/70 p-5 shadow-md shadow-emerald-500/5 dark:border-emerald-500/20 dark:bg-gray-900/70"
                  >
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-linear-to-br from-emerald-500/20 via-emerald-500/5 to-transparent p-10 shadow-2xl shadow-emerald-500/20 dark:border-emerald-500/20 dark:from-emerald-500/20 dark:via-emerald-500/10">
            <div className="space-y-6 text-gray-900 dark:text-emerald-100">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 shadow dark:bg-gray-950">
                <Rocket className="h-4 w-4" />
                Launch checklist
              </div>
              <p className="text-lg font-semibold">Your prep plan in the first 30 days</p>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  Submit your background for instant calibration and get a personalized dashboard.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  Complete targeted drills each week with AI interviewers tuned to your role.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  Reserve mentor sessions before high-stakes rounds and refine your story.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  Track confidence metrics and celebrate milestones as you unlock new streaks.
                </li>
              </ul>
            </div>
            <div
              className="absolute -bottom-10 -right-12 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl"
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-24 rounded-3xl border border-emerald-200/70 bg-white/80 p-10 shadow-2xl shadow-emerald-500/10 backdrop-blur dark:border-emerald-500/20 dark:bg-gray-900/80">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <BrainCircuit className="h-4 w-4" />
                Resources included
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
                Everything you need to keep momentum
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your dashboard evolves with every session, surfacing the resources, reminders, and
                accountability prompts that matter most right now.
              </p>
            </div>
            <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={resource.title}
                    className="rounded-2xl border border-emerald-200/60 bg-white/70 p-6 shadow-md shadow-emerald-500/5 dark:border-emerald-500/20 dark:bg-gray-900/70"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-gray-900 dark:text-gray-100">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {resource.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 text-center sm:flex-row sm:justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              Start prepping today
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-400"
            >
              View pricing plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
