'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const timezoneOptions = ['UTC-08:00', 'UTC-05:00', 'UTC+00:00', 'UTC+05:30', 'UTC+10:00'];

const notificationPresets = [
  { id: 'updates', label: 'Product updates', helper: 'Release highlights and new features.' },
  { id: 'reminders', label: 'Interview reminders', helper: 'Session reminders 24h & 1h prior.' },
  { id: 'summaries', label: 'Weekly summaries', helper: 'Digest of practice sessions + feedback.' },
] as const;

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: 'Nora Jensen',
    email: 'nora@hiremind.com',
    role: 'Product Manager',
  });
  const [preferences, setPreferences] = useState({
    timezone: 'UTC+05:30',
    meetingLink: 'https://meet.google.com/example',
    notes: '',
  });
  const [notifications, setNotifications] = useState({
    updates: true,
    reminders: true,
    summaries: false,
  });

  const handleProfileChange = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: keyof typeof preferences, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const toggleNotification = (field: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    // Wire up API call here
    console.info('Saving settings', { profile, preferences, notifications });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 text-slate-100">
      <header className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-[0_30px_120px_rgba(2,6,23,0.55)]">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
          Workspace settings
        </p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Control how Hiremind works for you
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Update your profile, notification preferences, and workspace defaults without leaving
              the dashboard.
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="self-start rounded-2xl bg-white px-6 py-3 text-slate-900 hover:bg-slate-100"
          >
            Save changes
          </Button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Profile details</h2>
            <p className="text-sm text-slate-400">Control what mentors see before your sessions.</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                className="text-xs uppercase tracking-[0.3em] text-slate-500"
              >
                Full name
              </Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) => handleProfileChange('fullName', e.target.value)}
                className="mt-2 border-slate-800 bg-slate-900 text-white"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="mt-2 border-slate-800 bg-slate-900 text-white"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Role / focus
              </Label>
              <Input
                id="role"
                value={profile.role}
                onChange={(e) => handleProfileChange('role', e.target.value)}
                className="mt-2 border-slate-800 bg-slate-900 text-white"
              />
            </div>
          </div>
        </article>

        <article className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Session defaults</h2>
            <p className="text-sm text-slate-400">
              Applies to new interview bookings and resume critiques.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="timezone"
                className="text-xs uppercase tracking-[0.3em] text-slate-500"
              >
                Time zone
              </Label>
              <select
                id="timezone"
                value={preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
              >
                {timezoneOptions.map((zone) => (
                  <option key={zone} value={zone} className="bg-slate-900 text-white">
                    {zone}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label
                htmlFor="meetingLink"
                className="text-xs uppercase tracking-[0.3em] text-slate-500"
              >
                Preferred meeting link
              </Label>
              <Input
                id="meetingLink"
                value={preferences.meetingLink}
                onChange={(e) => handlePreferenceChange('meetingLink', e.target.value)}
                className="mt-2 border-slate-800 bg-slate-900 text-white"
              />
            </div>
            <div>
              <Label htmlFor="notes" className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Prep note for mentors
              </Label>
              <Textarea
                id="notes"
                value={preferences.notes}
                rows={4}
                onChange={(e) => handlePreferenceChange('notes', e.target.value)}
                placeholder="E.g. focus on PM craft rounds and behavioural loops."
                className="mt-2 border-slate-800 bg-slate-900 text-white"
              />
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
            <p className="text-sm text-slate-400">Choose what lands in your inbox.</p>
          </div>
          <div className="space-y-3">
            {notificationPresets.map((pref) => (
              <label
                key={pref.id}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-white">{pref.label}</p>
                  <p className="text-xs text-slate-400">{pref.helper}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[pref.id]}
                  onChange={() => toggleNotification(pref.id)}
                  className="h-5 w-10 cursor-pointer appearance-none rounded-full border border-slate-700 bg-slate-800 transition peer data-[state=on]:bg-emerald-400"
                  data-state={notifications[pref.id] ? 'on' : 'off'}
                  style={{
                    backgroundColor: notifications[pref.id] ? 'rgb(52, 211, 153)' : '',
                  }}
                />
              </label>
            ))}
          </div>
        </article>

        <article className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Data & privacy</h2>
            <p className="text-sm text-slate-400">
              Export transcripts or clean up practice history.
            </p>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
              <p className="font-medium text-white">Download coaching history</p>
              <p className="mt-1 text-xs text-slate-400">
                Receive a zip with transcripts, scores, and resume versions.
              </p>
              <Button
                variant="outline"
                className="mt-3 border-slate-700 text-white hover:bg-slate-900"
              >
                Export data
              </Button>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
              <p className="font-medium text-white">Deactivation</p>
              <p className="mt-1 text-xs text-slate-400">
                Freeze your workspace temporarily. You can reactivate anytime from support.
              </p>
              <Button variant="ghost" className="mt-3 text-amber-400 hover:text-amber-300">
                Request deactivation
              </Button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
