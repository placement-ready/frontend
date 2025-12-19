'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, RotateCcw, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InterviewTimer } from '@/components/interview/InterviewTimer';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { AnswerInput } from '@/components/interview/AnswerInput';
import { FeedbackPanel } from '@/components/interview/FeedbackPanel';

const INTERVIEW_QUESTIONS = [
  'Tell me about yourself and your background.',
  'Describe a challenging project you worked on and how you handled it.',
  'How do you prioritize tasks when working on multiple projects?',
  'Tell me about a time you had to work with a difficult team member.',
  'Where do you see yourself in 5 years?',
];

interface FeedbackData {
  strengths: string[];
  improvements: string[];
  tips: string[];
}

export default function InterviewRoomPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, FeedbackData>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentAnswer = answers[currentIndex] || '';
  const answeredCount = Object.values(answers).filter((answer) => answer?.trim()).length;
  const remaining = Math.max(0, INTERVIEW_QUESTIONS.length - answeredCount);

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: value }));
  };

  const handleNext = () => {
    if (currentIndex < INTERVIEW_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate feedback generation
    const newFeedback = {
      strengths: ['Clear communication', 'Good structure'],
      improvements: ['Add more specific examples', 'Quantify achievements'],
      tips: ['Use the STAR method', 'Practice your delivery'],
    };
    setFeedback((prev) => ({ ...prev, [currentIndex]: newFeedback }));
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setFeedback({});
    setIsComplete(false);
  };

  const progress = ((currentIndex + 1) / INTERVIEW_QUESTIONS.length) * 100;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-slate-950/60 p-10 text-center text-white">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <Check className="h-8 w-8 text-emerald-400" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
            Session Saved
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-emerald-50">Interview Complete</h2>
          <p className="mt-3 text-sm text-emerald-100/80">
            You answered {Object.keys(answers).length} of {INTERVIEW_QUESTIONS.length} prompts.
            Review the feedback or loop again to sharpen delivery.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={handleReset} variant="outline" className="border-white/30 text-white">
              <RotateCcw className="mr-2 h-4 w-4" />
              Restart Session
            </Button>
            <Button
              className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              onClick={() => router.push('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-12 pt-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="rounded-3xl border border-slate-800/80 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.6)]">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Mock Interview
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Product Manager · Leadership Loop
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Focus on strategy communication, conflict navigation, and measurable impact.
              </p>
            </div>
            <InterviewTimer initialMinutes={30} onTimeUp={handleComplete} />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span>Progress</span>
              <span className="text-emerald-300">{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-linear-to-r from-emerald-500 to-green-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {INTERVIEW_QUESTIONS.map((_, idx) => {
                const status =
                  idx === currentIndex ? 'current' : idx < answeredCount ? 'done' : 'upcoming';
                return (
                  <span
                    key={`marker-${idx}`}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      status === 'current'
                        ? 'border border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
                        : status === 'done'
                          ? 'border border-emerald-500/30 bg-transparent text-emerald-400'
                          : 'border border-slate-800 text-slate-500'
                    }`}
                  >
                    Q{idx + 1}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <QuestionCard
              question={INTERVIEW_QUESTIONS[currentIndex]}
              questionNumber={currentIndex + 1}
              totalQuestions={INTERVIEW_QUESTIONS.length}
            />

            <AnswerInput
              value={currentAnswer}
              onChange={handleAnswerChange}
              placeholder="Outline the situation, then highlight what you actually delivered."
            />

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Navigation
                  </p>
                  <p className="text-sm text-muted-foreground">Stay in flow—no tab switching.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>{remaining} remaining</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  variant="outline"
                  className="flex-1 min-w-35 border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-100"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!currentAnswer.trim()}
                  className="flex-1 min-w-35 border border-emerald-500 bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed"
                >
                  Get Feedback
                </Button>
                {currentIndex === INTERVIEW_QUESTIONS.length - 1 ? (
                  <Button
                    onClick={handleComplete}
                    className="flex-1 min-w-35 bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Complete
                    <Check className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="flex-1 min-w-35 border border-slate-200 bg-white text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <FeedbackPanel feedback={feedback[currentIndex]} />

            {/* <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Session stats
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-foreground">
                  <span>Answers logged</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    {answeredCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Awaiting feedback</span>
                  <span>{Math.max(0, answeredCount - Object.keys(feedback).length)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Total questions</span>
                  <span>{INTERVIEW_QUESTIONS.length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-5 text-sm text-slate-300">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Focus cues
              </p>
              <ul className="mt-4 space-y-3">
                <li>• Pause 2s before responding; own the silence.</li>
                <li>• Lead with the measurable result, then rewind.</li>
                <li>• Close answers with what changed because of you.</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
