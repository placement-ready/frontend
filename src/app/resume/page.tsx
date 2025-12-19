'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const initialResume = {
  name: 'Nora Jensen',
  role: 'Product Manager',
  summary:
    'Product leader focused on zero-to-one launches and measurable growth. Previously scaled B2B workflows that improved activation by 18% and automated reporting for 40+ customer teams.',
  skills: 'Product strategy, Roadmapping, Experimentation, User research, Stakeholder alignment',
  experience:
    'Senior Product Manager — Lumen Analytics\nGrew self-serve onboarding funnel from 22% to 35% completion in two quarters by simplifying activation loops and partnering closely with design research.\n\nProduct Manager — SummitOS\nLaunched a collaborative planning tool used weekly by 70% of enterprise accounts and reduced planning cycle time by 24%.',
  projects:
    'Growth Targeting Revamp\nDefined scoring signals for account propensity and led roll-out that drove a 14% uplift in qualified pipeline.\n\nSignal Playbooks\nPartnered with RevOps to package customer insights into modular playbooks consumed across GTM teams.',
};

export default function ResumePage() {
  const [formData, setFormData] = useState(initialResume);

  const handleInputChange =
    (field: keyof typeof initialResume) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSaveDraft = () => {
    console.info('Mock save', formData);
  };

  const handleExport = () => {
    console.info('Mock export', formData);
  };

  const parsedSkills = formData.skills
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-0">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
            Resume builder
          </p>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Resume Builder</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Capture your story on the left and preview the outcome instantly on the right. No
              templates, no exports—just a simple workspace to keep your narrative sharp.
            </p>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white">
            <CardHeader className="border-b border-slate-100/70">
              <CardTitle className="flex items-center justify-between text-base">
                <span className="text-slate-900">Profile details</span>
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                  90% neutral · 10% accent
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="name"
                    className="text-xs uppercase tracking-[0.3em] text-slate-500"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    className="border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="role"
                    className="text-xs uppercase tracking-[0.3em] text-slate-500"
                  >
                    Role / title
                  </Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange('role')}
                    className="border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="summary"
                  className="text-xs uppercase tracking-[0.3em] text-slate-500"
                >
                  Summary
                </Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={handleInputChange('summary')}
                  rows={4}
                  className="border-slate-200 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="skills"
                  className="text-xs uppercase tracking-[0.3em] text-slate-500"
                >
                  Skills (comma separated)
                </Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={handleInputChange('skills')}
                  className="border-slate-200 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="experience"
                  className="text-xs uppercase tracking-[0.3em] text-slate-500"
                >
                  Experience
                </Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={handleInputChange('experience')}
                  rows={6}
                  className="border-slate-200 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="projects"
                  className="text-xs uppercase tracking-[0.3em] text-slate-500"
                >
                  Projects
                </Label>
                <Textarea
                  id="projects"
                  value={formData.projects}
                  onChange={handleInputChange('projects')}
                  rows={5}
                  className="border-slate-200 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                <Button
                  type="button"
                  onClick={handleSaveDraft}
                  className="bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  Save Draft
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExport}
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  Export Resume
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-100/70">
            <CardHeader>
              <CardTitle className="text-base text-slate-800">Live preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-1 text-slate-900">
                <h2 className="text-2xl font-semibold">{formData.name || 'Your Name'}</h2>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  {formData.role || 'Role / Title'}
                </p>
              </section>

              <section className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Summary
                </p>
                <p className="text-sm leading-relaxed text-slate-700">
                  {formData.summary || 'Add a short overview that highlights your impact.'}
                </p>
              </section>

              <section className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {parsedSkills.length ? (
                    parsedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-300/80 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      Add skills above to populate this row.
                    </span>
                  )}
                </div>
              </section>

              <PreviewBlock label="Experience" body={formData.experience} />
              <PreviewBlock label="Projects" body={formData.projects} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface PreviewBlockProps {
  label: string;
  body: string;
}

function PreviewBlock({ label, body }: PreviewBlockProps) {
  return (
    <section className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <div
        className={cn(
          'rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700',
          body ? 'whitespace-pre-line' : 'text-slate-400',
        )}
      >
        {body || 'Use the form to add details and they will appear here automatically.'}
      </div>
    </section>
  );
}
