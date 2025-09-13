"use client";

import React, { useState } from "react";

const practiceQuestions = [
  "Tell me about yourself.",
  "Describe a challenging project and how you handled it.",
  "How do you stay updated with industry trends?",
  "Give an example of a conflict at work and how you resolved it.",
  "Why do you want to work with us?",
];

const InterviewPractice: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState("");

  const handleNext = () => {
    if (userAnswer.trim()) {
      const updated = [...answered];
      updated[currentIndex] = userAnswer;
      setAnswered(updated);
      setUserAnswer("");
      if (currentIndex < practiceQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer(answered[currentIndex - 1] || "");
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswered([]);
    setUserAnswer("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center font-sans p-10">
      <div className="mt-14 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <span role="img" aria-label="practice" className="text-3xl">
            🎤
          </span>
        </div>
        <h2 className="text-center font-extrabold text-gray-900 dark:text-white mb-6 text-xl">
          Interview Practice
        </h2>
        <p className="text-center text-green-700 dark:text-green-400 font-medium mb-6">
          Practice answering key interview questions aloud or in writing.
        </p>
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6 text-left text-lg font-medium text-gray-900 dark:text-green-300 min-h-[54px]">
          {practiceQuestions[currentIndex]}
        </div>
        <textarea
          className="w-full rounded-lg border border-green-300 dark:border-green-700 p-4 mb-3 resize-y focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors caret-green-600"
          placeholder="Type your answer here or practice aloud..."
          rows={5}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <div className="flex gap-3 justify-center mb-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              currentIndex === 0
                ? "bg-green-100 text-green-400 cursor-not-allowed"
                : "bg-white dark:bg-gray-700 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 cursor-pointer"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition shadow-md"
          >
            {currentIndex === practiceQuestions.length - 1 ? "Finish" : "Next"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 font-semibold transition hover:bg-red-100 dark:hover:bg-red-900"
          >
            Reset
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Question {currentIndex + 1} of {practiceQuestions.length}
        </p>
      </div>
    </div>
  );
};

export default InterviewPractice;
