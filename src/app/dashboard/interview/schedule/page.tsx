'use client';

import React, { useMemo, useState } from 'react';

const steps = [
  { label: 'Candidate Details', detail: 'Confirm who we are meeting with.' },
  { label: 'Availability', detail: 'Pick a slot that works for you.' },
  { label: 'Interview Brief', detail: 'We send prep materials instantly.' },
];

const focusTips = [
  'Use a quiet space with reliable internet.',
  'Have your resume and role description nearby.',
  'Keep answers concise and structured.',
];

const availabilityWindows = [
  { day: 'Today', slot: '2:00 PM – 3:00 PM' },
  { day: 'Tomorrow', slot: '10:00 AM – 11:00 AM' },
  { day: 'Friday', slot: '4:00 PM – 5:00 PM' },
];

const ScheduleInterview: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const completion = useMemo(() => {
    const completedFields = [name, email, date, time].filter(Boolean).length;
    return Math.round((completedFields / 4) * 100);
  }, [name, email, date, time]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); // for demo, replace with actual API call
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-16">
      <div className="bg-linear-to-b from-emerald-100/20 via-transparent to-transparent dark:from-emerald-900/20">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-10 pt-12 text-white sm:px-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Interview Setup
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight text-emerald-50 sm:text-4xl">
                Line up your next session in under two minutes
              </h1>
              <p className="max-w-2xl text-base text-emerald-100/90">
                Share your availability, and we will lock in the right mentor with the right brief.
                No distractions, only the essentials.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-emerald-200">
              <span className="rounded-full border border-emerald-400/30 px-3 py-1">
                Live mock CIO interviews
              </span>
              <span className="rounded-full border border-emerald-400/30 px-3 py-1">
                Structured feedback
              </span>
              <span className="rounded-full border border-emerald-400/30 px-3 py-1">
                Calendar ready invite
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        {/* Form Column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300/70">
                  Step 1 of 2
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">Confirm interview details</h2>
              </div>
              <div className="rounded-full border border-emerald-500/40 px-4 py-1 text-xs font-medium text-emerald-200">
                GMT +05:30 · Google Meet
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span>Progress</span>
                <span className="text-emerald-300">{completion}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-linear-to-r from-emerald-500 to-green-400 transition-[width] duration-300"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center text-sm text-emerald-100">
                <p className="text-base font-semibold text-emerald-200">Interview scheduled</p>
                <p className="mt-2 text-emerald-100/90">
                  We sent the calendar invite and prep notes to <strong>{email}</strong>. Feel free
                  to adjust the slot anytime.
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Nora Jensen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="nora@hiremind.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200" htmlFor="date">
                      Preferred Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200" htmlFor="time">
                      Time Window
                    </label>
                    <input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/20 p-5 text-sm text-slate-300">
                  <p className="font-medium text-emerald-200">What happens next?</p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-400">
                    <li>• We pair you with the best mentor for the role.</li>
                    <li>• You get a calendar invite, prep doc, and reminders.</li>
                    <li>• Join a distraction-free room with built-in timer + notes.</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={!name || !email || !date || !time}
                  className="w-full rounded-2xl bg-linear-to-r from-emerald-500 to-green-400 px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:shadow-[0_20px_35px_rgba(34,197,94,0.25)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Lock Interview Slot
                </button>
              </form>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Focus tips
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {focusTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secondary Column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-500/30 bg-linear-to-b from-emerald-700/10 via-slate-900 to-slate-950 p-5 text-sm text-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Setup flow
            </p>
            <ul className="mt-4 space-y-4">
              {steps.map((step, index) => (
                <li key={step.label} className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/60 text-[11px] font-semibold text-emerald-200">
                      {index + 1}
                    </span>
                    {index !== steps.length - 1 && <span className="my-1 h-6 w-px bg-slate-700" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                    <p className="text-xs text-slate-400">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
              <span>Quick picks</span>
              <span className="text-emerald-300">Fastest</span>
            </div>
            <div className="mt-4 space-y-3">
              {availabilityWindows.map((slot) => (
                <div
                  key={`${slot.day}-${slot.slot}`}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3 text-sm text-slate-200"
                >
                  <div>
                    <p className="font-medium text-white">{slot.day}</p>
                    <p className="text-xs text-slate-400">{slot.slot}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-emerald-500/50 px-4 py-1 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/10"
                  >
                    Autofill
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5 text-xs text-slate-400">
            <p className="text-sm font-semibold text-white">Need a different format?</p>
            <p className="mt-2">
              Chat with our coordinator for panel interviews, presentation-based loops, or niche
              roles. We reply in under 10 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterview;
