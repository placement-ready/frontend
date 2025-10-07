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
    resources: ['Galvin OS book', 'GFG Operating System', 'Neso Academy'],
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
  'You don’t have to be perfect to start, but you have to start to be perfect.',
];

const timetable = [
  { day: 'Monday', morning: 'DBMS Theory', midday: 'Coding Practice', evening: 'Behavioral Q&A' },
  {
    day: 'Tuesday',
    morning: 'OOPS Principles',
    midday: 'Coding Practice',
    evening: 'Mock Coding/Review',
  },
  {
    day: 'Wednesday',
    morning: 'DCN Concepts',
    midday: 'Coding Practice',
    evening: 'Resume Review',
  },
  {
    day: 'Thursday',
    morning: 'OS Concepts',
    midday: 'Coding Practice',
    evening: 'Behavioral Questions',
  },
  {
    day: 'Friday',
    morning: 'System Design',
    midday: 'Coding Practice',
    evening: 'Whiteboard Practice',
  },
  {
    day: 'Saturday',
    morning: 'Mixed Practice',
    midday: 'System Design Deep Dive',
    evening: 'Mock Interview',
  },
  {
    day: 'Sunday',
    morning: 'Review & Adjust',
    midday: 'Timed Tests',
    evening: 'Rest & Motivation',
  },
];

const StudyPlan: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-emerald-50/30 to-green-100/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans py-10 flex flex-col items-center px-4">
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-10 max-w-5xl w-full shadow-lg backdrop-blur-sm">
      <div className="w-14 h-14 bg-green-100/50 dark:bg-green-900/50 rounded-full mx-auto flex items-center justify-center">
        <span role="img" aria-label="study" className="text-3xl">
          📚
        </span>
      </div>
      <h2 className="text-center font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-2xl">
        Interview Study Plan
      </h2>

      {motivationalLines.map((line, idx) => (
        <p
          key={idx}
          className="text-green-700/60 dark:text-green-400/60 font-semibold text-center mb-4"
        >
          {line}
        </p>
      ))}

      <h3 className="text-green-600/70 dark:text-green-400/70 font-semibold mb-4">Core Subjects</h3>
      {studyPlan.map((item) => (
        <div
          key={item.subject}
          className="bg-green-50/30 dark:bg-green-900/30 rounded-lg p-5 mb-6 shadow-sm border border-green-200/30 dark:border-green-700/30 backdrop-blur"
        >
          <strong className="text-gray-900 dark:text-gray-100 text-lg">{item.subject}</strong>
          <div className="mt-2 mb-1 font-medium text-gray-700 dark:text-gray-300">
            Topics: {item.topics.join(', ')}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Resources:
            <ul className="list-disc list-inside mt-1">
              {item.resources.map((res) => (
                <li key={res}>{res}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <h3 className="text-green-600/70 dark:text-green-400/70 font-semibold mb-4">
        Coding Platforms
      </h3>
      <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-400">
        {codingResources.map((site) => (
          <li key={site}>{site}</li>
        ))}
      </ul>

      <h3 className="text-green-600/70 dark:text-green-400/70 font-semibold mb-4">
        Sample Weekly Timetable
      </h3>
      <table className="w-full bg-green-50/30 dark:bg-green-900/30 rounded-lg text-sm backdrop-blur mb-6 border border-green-200/30 dark:border-green-700/30">
        <thead>
          <tr className="text-green-800/60 dark:text-green-300/60">
            <th className="py-3 px-4 border-b border-green-200/30 dark:border-green-700/30 text-left">
              Day
            </th>
            <th className="py-3 px-4 border-b border-green-200/30 dark:border-green-700/30 text-left">
              Morning
            </th>
            <th className="py-3 px-4 border-b border-green-200/30 dark:border-green-700/30 text-left">
              Midday
            </th>
            <th className="py-3 px-4 border-b border-green-200/30 dark:border-green-700/30 text-left">
              Evening
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800/70 dark:text-gray-300/70">
          {timetable.map((row) => (
            <tr
              key={row.day}
              className="hover:bg-green-100/30 dark:hover:bg-green-800/30 transition-colors"
            >
              <td className="py-3 px-4 border-b border-green-200/30 dark:border-green-700/30 font-semibold">
                {row.day}
              </td>
              <td className="py-3 px-4 border-b border-green-200/30 dark:border-green-700/30">
                {row.morning}
              </td>
              <td className="py-3 px-4 border-b border-green-200/30 dark:border-green-700/30">
                {row.midday}
              </td>
              <td className="py-3 px-4 border-b border-green-200/30 dark:border-green-700/30">
                {row.evening}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center text-green-600/50 dark:text-green-400/50 font-semibold leading-relaxed mt-6">
        Track progress weekly, review weak spots, and adjust your plan as needed.
        <br />
        Every effort invested today builds the skills for tomorrow’s success.
      </div>
    </div>
  </div>
);

export default StudyPlan;
