import Link from 'next/link';
import {
  Globe2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users2,
  Workflow,
} from 'lucide-react';

const milestones = [
  { label: 'Candidates coached', value: '28,000+' },
  { label: 'Mock interviews completed', value: '210,000+' },
  { label: 'Offer rate increase', value: '3.4×' },
  { label: 'Mentors worldwide', value: '180+' },
];

const values = [
  {
    name: 'Empathy first',
    description:
      'We build tools that listen before advising. Every feature is designed to understand the human behind the interview answers.',
    icon: HeartHandshake,
  },
  {
    name: 'Science-backed growth',
    description:
      'Our coaching engine blends IO psychology research with real hiring rubrics to help you build durable interview skills.',
    icon: Workflow,
  },
  {
    name: 'Trust above all',
    description:
      'We protect your data and prep materials with enterprise-grade security so you can share candidly and prepare confidently.',
    icon: ShieldCheck,
  },
];

const leadership = [
  {
    name: 'Jasmine Patel',
    title: 'Co-founder & CEO',
    focus:
      'Former hiring manager at scale-ups who believes equitable interview prep unlocks opportunity for everyone.',
  },
  {
    name: 'Oscar Ramírez',
    title: 'Co-founder & Chief Product Officer',
    focus:
      'Product leader focused on blending machine learning with accessible design to reduce interview anxiety.',
  },
  {
    name: 'Mina Chen',
    title: 'Head of Mentor Network',
    focus:
      'Built global mentorship programs and ensures every learner has a relatable guide in their corner.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/40 to-white dark:from-gray-950 dark:via-emerald-950/30 dark:to-gray-950">
      <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
            Our story
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-50">
            We help candidates show up as their strongest selves
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            HireMind was founded by former hiring managers, career coaches, and product builders
            determined to make interview prep equitable, data-driven, and empowering.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.label}
              className="rounded-3xl border border-emerald-200/70 bg-white/80 p-6 text-center shadow-lg shadow-emerald-500/10 dark:border-emerald-500/20 dark:bg-gray-900/70"
            >
              <p className="text-3xl font-semibold text-emerald-600 dark:text-emerald-300">
                {milestone.value}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{milestone.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">Why we exist</h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Interviews should showcase potential, not polish. Yet too often, talented candidates
              are overlooked because they lack insider coaching. HireMind brings world-class prep
              within reach through thoughtful technology and empathetic mentorship.
            </p>
            <div className="space-y-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.name}
                    className="flex gap-4 rounded-2xl border border-emerald-200/60 bg-white/70 p-5 shadow-md shadow-emerald-500/5 dark:border-emerald-500/20 dark:bg-gray-900/70"
                  >
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {value.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {value.description}
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
                <Globe2 className="h-4 w-4" />
                Global impact
              </div>
              <p className="text-lg font-semibold">Building equitable access to career mobility</p>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  72% of the HireMind community are first-generation professionals entering
                  competitive industries.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  Our mentor network spans 14 countries, bringing localized insights to global
                  candidates.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  We reinvest 1% of revenue into scholarships for underrepresented talent pursuing
                  tech careers.
                </li>
              </ul>
            </div>
            <div
              className="absolute -bottom-10 -left-12 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl"
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Users2 className="h-4 w-4" />
              Leadership team
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-gray-900 dark:text-gray-50">
              Humans behind the platform
            </h2>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Our team blends recruiting, behavioral science, and product design experience to craft
              preparation that feels personal.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {leadership.map((leader) => (
              <div
                key={leader.name}
                className="rounded-3xl border border-emerald-200/70 bg-white/80 p-6 shadow-lg shadow-emerald-500/10 dark:border-emerald-500/20 dark:bg-gray-900/70"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {leader.name}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
                      {leader.title}
                    </p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Lightbulb className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{leader.focus}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 rounded-3xl border border-emerald-200/70 bg-white/80 p-10 text-center shadow-2xl shadow-emerald-500/10 backdrop-blur dark:border-emerald-500/20 dark:bg-gray-900/80">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <Trophy className="h-4 w-4" />
            Join our mission
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-gray-900 dark:text-gray-50">
            Help us create the future of interview prep
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            We&apos;re growing the team with humans who care about creating equitable access to
            opportunity. If that sounds like you, we&apos;d love to meet.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              Join the community
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-400"
            >
              View open roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
