'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Edit, Trash2, FileText, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { resumeApi } from '@/features/resume/api';
import type { ResumeData } from '@/types/api/common';

export default function ResumeDashboardPage() {
  const [search, setSearch] = useState('');
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const fetchResumes = async () => {
      setIsLoading(true);
      try {
        // const response = await resumeApi.getResumes();
        if (!active) return;
        // setResumes(response.data ?? []);
        setError(null);
      } catch (err) {
        if (!active) return;
        console.error('Failed to load resumes', err);
        setError(err instanceof Error ? err.message : 'Failed to load resumes');
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchResumes();

    return () => {
      active = false;
    };
  }, []);

  // Handlers
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this resume?')) {
      setDeletingId(id);
      try {
        // await resumeApi.deleteResume(id);
        setResumes((prev) => prev.filter((resume) => resume._id !== id));
      } catch (err) {
        console.error('Failed to delete resume', err);
        setError('Failed to delete resume. Please try again.');
      } finally {
        setDeletingId((prev) => (prev === id ? null : prev));
      }
    }
  };

  const filteredResumes = resumes.filter(
    (resume) =>
      resume.fullName.toLowerCase().includes(search.toLowerCase()) ||
      resume.name.toLowerCase().includes(search.toLowerCase()) ||
      resume.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase())),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <span className="ml-2 text-muted-foreground">Loading resumes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Resumes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and organize your professional resumes
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push('/dashboard/templates')}>
            Browse Templates
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => router.push('/dashboard/resume/create')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Resume
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-lg border border-border bg-card p-4">
        <Input
          type="text"
          placeholder="Search resumes by name or skills..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Resume List */}
      {filteredResumes.length > 0 ? (
        <div className="grid gap-4">
          {filteredResumes.map((resume) => (
            <div
              key={resume._id}
              className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <FileText className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{resume.name}</h3>
                    <p className="text-sm text-muted-foreground">{resume.fullName}</p>
                    {resume.skills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {resume.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-emerald-100 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          >
                            {skill}
                          </span>
                        ))}
                        {resume.skills.length > 4 && (
                          <span className="text-xs text-muted-foreground">
                            +{resume.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/dashboard/resume/${resume._id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(resume._id)}
                    disabled={deletingId === resume._id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <FileText className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-foreground">No resumes found</h3>
          <p className="mb-6 max-w-md text-muted-foreground">
            {search
              ? 'Try adjusting your search criteria.'
              : 'Start by creating your first professional resume.'}
          </p>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => router.push('/dashboard/templates')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Resume
          </Button>
        </div>
      )}
    </div>
  );
}
