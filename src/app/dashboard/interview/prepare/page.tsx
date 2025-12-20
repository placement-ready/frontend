'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { AnswerInput } from '@/components/interview/AnswerInput';

const PRACTICE_QUESTIONS = [
  'Tell me about yourself.',
  'Describe a challenging project and how you handled it.',
  'How do you stay updated with industry trends?',
  'Give an example of a conflict at work and how you resolved it.',
  'Why do you want to work with us?',
];

export default function InterviewPracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentAnswer = answers[currentIndex] || '';

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: value }));
  };

  const handleNext = () => {
    if (currentIndex < PRACTICE_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
  };

  const progress = ((currentIndex + 1) / PRACTICE_QUESTIONS.length) * 100;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Interview Practice</h1>
        <p className="text-sm text-muted-foreground">
          Practice answering common interview questions
        </p>
      </div>

      {/* Progress */}
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

      {/* Question */}
      <QuestionCard
        question={PRACTICE_QUESTIONS[currentIndex]}
        questionNumber={currentIndex + 1}
        totalQuestions={PRACTICE_QUESTIONS.length}
      />

      {/* Answer */}
      <AnswerInput
        value={currentAnswer}
        onChange={handleAnswerChange}
        placeholder="Type your answer here or practice aloud..."
      />

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button onClick={handlePrevious} disabled={currentIndex === 0} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <Button onClick={handleNext} disabled={currentIndex === PRACTICE_QUESTIONS.length - 1}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
