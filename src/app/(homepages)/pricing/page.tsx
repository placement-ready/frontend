import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BadgeCheck, Check, Crown, Gem, ShieldCheck, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    tagline: 'Get interview ready with the essentials.',
    price: {
      monthly: '$0',
      yearly: '$0',
    },
    highlight: 'Perfect for candidates exploring HireMind.',
    features: [
      'AI resume review snapshots',
      'Two mock interviews per month',
      'Baseline skill diagnostics',
      'Access to curated prep library',
    ],
    ctaLabel: 'Start for free',
    popular: false,
  },
  {
    name: 'Pro',
    tagline: 'Level up with unlimited practice and insights.',
    price: {
      monthly: '$29',
      yearly: '$24',
    },
    highlight: 'Most popular with job seekers targeting top roles.',
    features: [
      'Unlimited AI mock interviews',
      'Deep-dive resume diagnostics',
      'Personalized weekly learning path',
      'Behavioral and technical question bank',
      'Priority access to mentor feedback',
    ],
    ctaLabel: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Elite',
    tagline: 'Collaborate directly with seasoned mentors.',
    price: {
      monthly: '$79',
      yearly: '$66',
    },
    highlight: 'Best for candidates preparing for executive and FAANG roles.',
    features: [
      'Dedicated mentor matching',
      'Live whiteboard interview sessions',
      'Custom interview scorecards',
      'Exclusive leadership content vault',
      'Post-interview strategy reviews',
    ],
    ctaLabel: 'Apply for Elite',
    popular: false,
  },
];

const valueProps = [
  {
    name: 'AI precision coaching',
    description:
      'Get real-time scoring and structured feedback powered by role-specific AI models built for technical, product, and leadership interviews.',
    icon: ShieldCheck,
  },
  {
    name: 'Mentor network access',
    description:
      'Book 1:1 sessions with mentors from high-growth companies and receive actionable tactics tailored to your target companies.',
    icon: BadgeCheck,
  },
  {
    name: 'Career-long support',
    description:
      'Stay sharp beyond your next role with continuous learning paths, accountability nudges, and community challenges.',
    icon: Gem,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/40 to-white dark:from-gray-950 dark:via-emerald-950/30 dark:to-gray-950">
      <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
            Pricing built for career momentum
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-50">
            Invest in the interview prep partner that grows with you
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Choose a plan that meets you where you are. Seamlessly switch or cancel at any time.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.popular ? Crown : Sparkles;
            return (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-3xl border bg-white/70 p-8 shadow-xl shadow-emerald-500/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl dark:border-emerald-500/20 dark:bg-gray-900/70',
                  plan.popular &&
                    'border-emerald-400/80 bg-linear-to-b from-emerald-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/5',
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-600 shadow-md dark:border-emerald-500/30 dark:bg-gray-950 dark:text-emerald-300">
                    <Crown className="h-4 w-4" />
                    Most popular
                  </span>
                ) : null}
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                      {plan.name}
                    </h2>
                    <p className="text-sm text-emerald-600 dark:text-emerald-300">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">
                    {plan.price.monthly}
                    <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Save 20% when billed yearly ({plan.price.yearly}/month)
                  </p>
                  <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-300">
                    {plan.highlight}
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <Check className="h-4 w-4" />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/auth/signup"
                  className={cn(
                    'mt-10 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500',
                    plan.popular
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400'
                      : 'border border-emerald-200 bg-emerald-500/10 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-500/20 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-400',
                  )}
                >
                  {plan.ctaLabel}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {valueProps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="rounded-3xl border border-emerald-200/70 bg-white/80 p-8 shadow-lg shadow-emerald-500/10 backdrop-blur dark:border-emerald-500/20 dark:bg-gray-900/70"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-emerald-200/50 bg-white/80 py-16 dark:border-emerald-500/20 dark:bg-gray-950/90">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            Trusted by thousands of candidates
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">
            Ready to accelerate your interview prep?
          </h2>
          <p className="max-w-2xl text-base text-gray-600 dark:text-gray-400">
            Join a community of ambitious candidates turning preparation into offers. HireMind gives
            you the structure, coaching, and accountability to stay confident through every
            conversation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              Create your account
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-400"
            >
              Explore the platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
