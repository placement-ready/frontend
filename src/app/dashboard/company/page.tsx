'use client';

import React, { useState } from 'react';
import { Building2, ChevronDown } from 'lucide-react';

const companyQuestions: Record<string, string[]> = {
  Google: [
    'Describe a time you solved a complex problem.',
    'How do you approach learning a technology?',
    'What is your experience with scalable systems?',
  ],
  Amazon: [
    'Tell me about a time you disagreed with a teammate.',
    'How do you prioritize under deadlines?',
    'How would you improve our service?',
  ],
  Microsoft: [
    'Example of working on a diverse team.',
    'What motivates you to join Microsoft?',
    'Describe a time you handled feedback.',
  ],
};

const companies = Object.keys(companyQuestions);

const CompanyQuestions: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>(companies[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center font-sans py-12 px-4">
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl px-8 py-10 max-w-2xl w-full shadow-2xl relative">
        {/* Company logo with animated ring */}
        <div className="relative w-fit mx-auto mb-5">
          <div className="absolute inset-0 w-[64px] h-[64px] rounded-full bg-gradient-to-tr from-green-200 via-emerald-300 to-green-400 dark:from-green-900 dark:via-green-600 dark:to-green-700 opacity-30 blur-lg animate-pulse z-0"></div>
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center relative z-10 border-4 border-green-200 dark:border-green-700 shadow">
            <span role="img" aria-label="company-question" className="text-3xl">
              💼
            </span>
          </div>
        </div>

        <h2 className="text-center text-2xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-wide">
          Company Interview Questions
        </h2>
        <p className="text-center text-green-700 dark:text-green-400 font-semibold mb-7">
          Prepare with real questions from top companies.
        </p>

        {/* Dropdown label and select */}
        <label
          className="block text-sm text-gray-700 dark:text-gray-300 font-medium mb-1 text-left"
          htmlFor="company-select"
        >
          <span className="flex gap-2 items-center mb-1">
            <Building2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            Change company
          </span>
        </label>
        <div className="relative mb-8">
          <select
            id="company-select"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="block w-full text-base px-4 py-3 rounded-xl border border-green-300 dark:border-green-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none outline-none pr-10 focus:ring-2 focus:ring-green-400 transition duration-200 font-medium shadow-sm"
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none" />
        </div>

        <div className="flex flex-col gap-6">
          {companyQuestions[selectedCompany].map((q, idx) => (
            <div
              key={idx}
              className="group bg-green-50/20 dark:bg-green-900/20 text-green-900 dark:text-green-300 px-6 py-5 rounded-xl text-left text-[1.08rem] border border-green-200/40 dark:border-green-700/40 shadow-sm transition-all relative hover:scale-[1.03] hover:border-green-400 focus-within:ring-2 focus-within:ring-green-300"
              tabIndex={0}
              aria-label={'Interview question'}
            >
              <span className="relative">
                <span className="absolute -left-6 top-[11px] w-2 h-2 rounded-full bg-green-400/80 dark:bg-green-600/80 group-hover:bg-green-500 transition"></span>
                {q}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyQuestions;
