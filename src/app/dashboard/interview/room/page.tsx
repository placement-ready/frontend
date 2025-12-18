'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, RotateCcw, Check } from 'lucide-react';
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
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Interview Complete!</h2>
          <p className="mb-6 text-muted-foreground">
            You answered {Object.keys(answers).length} of {INTERVIEW_QUESTIONS.length} questions.
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mock Interview</h1>
          <p className="text-sm text-muted-foreground">
            Practice your responses and get instant feedback
          </p>
        </div>
        <InterviewTimer initialMinutes={30} onTimeUp={handleComplete} />
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Left Column - Question & Answer */}
        <div className="space-y-6">
          <QuestionCard
            question={INTERVIEW_QUESTIONS[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={INTERVIEW_QUESTIONS.length}
          />

          <AnswerInput
            value={currentAnswer}
            onChange={handleAnswerChange}
            placeholder="Take your time to craft a thoughtful response..."
          />

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <Button onClick={handlePrevious} disabled={currentIndex === 0} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!currentAnswer.trim()}
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            >
              Get Feedback
            </Button>

            {currentIndex === INTERVIEW_QUESTIONS.length - 1 ? (
              <Button onClick={handleComplete}>
                Complete Interview
                <Check className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Column - Feedback */}
        <div className="rounded-lg border border-border bg-card p-6">
          {feedback[currentIndex] ? (
            <FeedbackPanel feedback={feedback[currentIndex]} />
          ) : (
            <div className="flex h-full items-center justify-center text-center">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Answer the question to receive feedback
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
