"use client";

import React, { useState } from "react";

const companyQuestions: Record<string, string[]> = {
  Google: [
    "Describe a time you solved a complex problem.",
    "How do you approach learning a technology?",
    "What is your experience with scalable systems?",
  ],
  Amazon: [
    "Tell me about a time you disagreed with a teammate.",
    "How do you prioritize under deadlines?",
    "How would you improve our service?",
  ],
  Microsoft: [
    "Example of working on a diverse team.",
    "What motivates you to join Microsoft?",
    "Describe a time you handled feedback.",
  ],
};

const companies = Object.keys(companyQuestions);

const CompanyQuestions: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>(companies[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center font-sans py-10 px-4">
      <div className="mt-14 bg-white dark:bg-gray-800 rounded-2xl px-8 py-10 max-w-lg w-full shadow-lg">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <span role="img" aria-label="company-question" className="text-3xl">
            💼
          </span>
        </div>
        <h2 className="text-center text-2xl font-extrabold mb-2 text-gray-900 dark:text-gray-100">
          Company Interview Questions
        </h2>
        <p className="text-center text-green-700 dark:text-green-400 font-semibold mb-6">
          Prepare with real questions from top companies.
        </p>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="block mx-auto w-2/3 text-base px-4 py-3 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none transition duration-200 mb-6"
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-4">
          {companyQuestions[selectedCompany].map((q, idx) => (
            <div
              key={idx}
              className="bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-300 px-5 py-4 rounded-lg text-left text-lg border border-green-200 dark:border-green-700 shadow-sm"
            >
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyQuestions;
