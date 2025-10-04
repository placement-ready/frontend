'use client';

import React from 'react';

const studyPlan = [
  {
    subject: 'DBMS',
    topics: ['ER Models', 'Normalization', 'Transactions', 'SQL', 'Indexes'],
    resources: ['DBMS by Raghu Ramakrishnan', 'GFG DBMS section', 'LeetCode DB'],
  },
  {
    subject: 'OOPS',
    topics: ['Principles', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Design Patterns'],
    resources: ['GFG OOPs', 'JavaTpoint OOPs', 'Refactoring.Guru'],
  },
  {
    subject: 'DCN',
    topics: ['Network Models', 'TCP/IP', 'Routing Algorithms', 'Protocols'],
    resources: ['NPTEL DCN lectures', 'Forouzan DCN book', 'GFG Networking'],
  },
  {
    subject: 'System Design',
    topics: ['Scalability', 'Databases', 'APIs', 'Caching', 'Load Balancing'],
    resources: ['Grokking System Design', 'System Design Primer', 'Exponent'],
  },
  {
    subject: 'Operating System',
    topics: ['Processes', 'Threads', 'Memory/CPU Management', 'Deadlocks'],
    resources: ['Galvin OS book', 'GFG Operating System', 'Neso Academy OS'],
  },
];

const codingResources = [
  'LeetCode (Top Interview 150)',
  'HackerRank',
  'Codeforces',
  'InterviewBit',
];

const motivationalLines = [
  'Consistency and focused effort are the keys to acing your dream interview. Every day counts!',
  'You don’t have to be perfect to get started, but you have to get started to be perfect.',
];

const timetable = [
  {
    day: 'Monday',
    morning: 'DBMS Theory',
    midday: 'Coding Platform Practice',
    evening: 'Behavioral Q&A',
  },
  {
    day: 'Tuesday',
    morning: 'OOPS Principles',
    midday: 'Coding Platform Practice',
    evening: 'Mock Coding/Review',
  },
  {
    day: 'Wednesday',
    morning: 'DCN Concepts',
    midday: 'Coding Platform Practice',
    evening: 'Resume Review/Projects',
  },
  {
    day: 'Thursday',
    morning: 'OS Concepts',
    midday: 'Coding Platform Practice',
    evening: 'Behavioral/HR Questions',
  },
  {
    day: 'Friday',
    morning: 'System Design Overview',
    midday: 'Coding Platform Practice',
    evening: 'Whiteboard Practice',
  },
  {
    day: 'Saturday',
    morning: 'Mixed Problem Solving',
    midday: 'System Design Deep Dive',
    evening: 'Mock Interview',
  },
  {
    day: 'Sunday',
    morning: 'Review & Adjustments',
    midday: 'Coding Test (Timed)',
    evening: 'Rest/Motivation',
  },
];

const StudyPlan: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans py-10 flex flex-col items-center px-4">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg max-w-5xl w-full">
      <div className="w-14 h-14 bg-green-100/30 dark:bg-green-900/20 rounded-full mx-auto flex items-center justify-center mb-6">
        <span role="img" aria-label="study" className="text-3xl">
          📚
        </span>
      </div>
      <h2 className="text-center font-extrabold text-gray-900 dark:text-white mb-4 text-2xl">
        Interview Study Plan
      </h2>
      {motivationalLines.map((line, idx) => (
        <div
          key={idx}
          className="text-green-700 dark:text-green-400 font-semibold text-center mb-3"
        >
          {line}
        </div>
      ))}
      <h3 className="text-green-600 dark:text-green-400 font-semibold mb-3">Core Subjects</h3>
      {studyPlan.map((item) => (
        <div
          key={item.subject}
          className="bg-green-50/20 dark:bg-green-900/20 rounded-lg p-5 mb-5 shadow-sm border border-green-200/30 dark:border-green-700/30"
        >
          <strong className="text-gray-900 dark:text-gray-100 text-lg">{item.subject}</strong>
          <div className="mt-2 mb-1 font-medium text-gray-700 dark:text-gray-300">
            Topics: {item.topics.join(', ')}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Resources:
            <ul className="list-disc list-inside mt-1">
              {item.resources.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <h3 className="text-green-600 dark:text-green-400 font-semibold mt-8 mb-3">
        Coding Platforms
      </h3>
      <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-400">
        {codingResources.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <h3 className="text-green-600 dark:text-green-400 font-semibold mb-3">
        Sample Weekly Timetable
      </h3>
      <table className="w-full bg-green-50/20 dark:bg-green-900/20 rounded-lg text-sm mb-6 border border-green-200/30 dark:border-green-700/30">
        <thead>
          <tr className="text-green-800 dark:text-green-300">
            <th className="py-2 px-3 border-b border-green-200/30 dark:border-green-700/30 text-left">
              Day
            </th>
            <th className="py-2 px-3 border-b border-green-200/30 dark:border-green-700/30 text-left">
              Morning
            </th>
            <th className="py-2 px-3 border-b border-green-200/30 dark:border-green-700/30 text-left">
              Midday
            </th>
            <th className="py-2 px-3 border-b border-green-200/30 dark:border-green-700/30 text-left">
              Evening
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 dark:text-gray-200">
          {timetable.map((row) => (
            <tr
              key={row.day}
              className="hover:bg-green-100/20 dark:hover:bg-green-800/20 transition-colors"
            >
              <td className="py-2 px-3 border-b border-green-200/30 dark:border-green-700/30 font-semibold">
                {row.day}
              </td>
              <td className="py-2 px-3 border-b border-green-200/30 dark:border-green-700/30">
                {row.morning}
              </td>
              <td className="py-2 px-3 border-b border-green-200/30 dark:border-green-700/30">
                {row.midday}
              </td>
              <td className="py-2 px-3 border-b border-green-200/30 dark:border-green-700/30">
                {row.evening}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center text-green-600 dark:text-green-400 font-semibold text-base leading-relaxed mt-6">
        Track progress weekly, review weak spots, and adjust your plan as needed.
        <br />
        Every effort invested today builds the skills for tomorrow’s success!
      </div>
    </div>
  </div>
);

export default StudyPlan;
