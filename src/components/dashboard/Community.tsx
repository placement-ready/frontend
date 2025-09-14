"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaQuestionCircle, FaBuilding, FaUsers } from "react-icons/fa";
import "../../styles/community-animations.css";

// Type definitions
interface UpcomingInterview {
  id: number;
  company: string;
  position: string;
  dateTime: string;
}

interface SharedQuestion {
  id: number;
  user: string;
  company: string;
  question: string;
  dateShared: string;
}

// Sample data
const upcomingInterviews: UpcomingInterview[] = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    dateTime: "Tomorrow, 2:00 PM",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Frontend Developer",
    dateTime: "Dec 25, 10:00 AM",
  },
  {
    id: 3,
    company: "Amazon",
    position: "Full Stack Developer",
    dateTime: "Dec 28, 3:30 PM",
  },
];

const latestSharedQuestions: SharedQuestion[] = [
  {
    id: 1,
    user: "Alex Johnson",
    company: "Google",
    question: "Explain the difference between call, apply, and bind in JavaScript.",
    dateShared: "2 hours ago",
  },
  {
    id: 2,
    user: "Sarah Chen",
    company: "Meta",
    question: "How would you implement a LRU cache?",
    dateShared: "5 hours ago",
  },
  {
    id: 3,
    user: "Michael Davis",
    company: "Netflix",
    question: "Design a system to handle millions of concurrent users.",
    dateShared: "1 day ago",
  },
  {
    id: 4,
    user: "Emma Wilson",
    company: "Spotify",
    question: "What are the key principles of React component optimization?",
    dateShared: "2 days ago",
  },
];

// Interview Card Component (NO hover, neutral bg, green border)
const InterviewCard = ({
  interview,
  index,
}: {
  interview: UpcomingInterview;
  index: number;
}) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`
      bg-white dark:bg-gray-900 
      border border-emerald-500 dark:border-emerald-600 
      rounded-xl p-6 shadow-sm 
      transition-all duration-300 
      relative overflow-hidden
    `}
  >
    <div className="absolute top-4 right-4">
      <FaBuilding className="text-emerald-500 dark:text-emerald-400 text-lg" />
    </div>
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-emerald-800 mb-2 dark:text-emerald-300">
        {interview.company}
      </h3>
      <p className="text-emerald-700 font-medium mb-4 dark:text-emerald-400">
        {interview.position}
      </p>
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
        <FaCalendarAlt className="text-sm" />
        <span className="text-sm font-medium">{interview.dateTime}</span>
      </div>
    </div>
  </motion.li>
);

// Question Card Component (NO hover)
const QuestionCard = ({
  question,
  index,
}: {
  question: SharedQuestion;
  index: number;
}) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-all duration-300 cursor-pointer relative overflow-hidden"
  >
    <div className="absolute top-4 right-4">
      <FaQuestionCircle className="text-blue-500 dark:text-blue-400 text-lg" />
    </div>
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <FaBuilding className="text-blue-600 dark:text-blue-300 text-sm" />
          </div>
          <div>
            <h3 className="text-gray-800 dark:text-gray-200">{question.company}</h3>
            <p className="text-xs text-gray-500 dark:text-blue-300">{question.dateShared}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 italic leading-relaxed dark:text-gray-300">
          &quot;{question.question}&quot;
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <FaUsers className="text-green-500 text-sm" />
        <span className="text-green-600 font-medium dark:text-green-400">
          Shared by {question.user}
        </span>
      </div>
    </div>
  </motion.li>
);

const NotificationsCommunity: React.FC = () => {
  return (
    <section className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-200 to-green-100 rounded-full mix-blend-multiply dark:from-emerald-900 dark:to-green-900 filter blur-xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-100 rounded-full mix-blend-multiply dark:from-blue-900 dark:to-purple-900 filter blur-xl"
        />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Community{" "}
            <span className="
      bg-gradient-to-r from-green-400 via-green-500 to-emerald-600
      bg-clip-text text-transparent
      font-extrabold
      relative
    ">
              Hub
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-500 rounded" />
            </span>
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-600 dark:text-gray-300">
            Stay connected with your interview journey and learn from the community.
          </p>
        </motion.div>
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Upcoming Interviews */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center dark:bg-emerald-800">
                <FaCalendarAlt className="text-emerald-500 dark:text-emerald-300" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                Upcoming Interviews
              </h2>
            </div>
            {upcomingInterviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-emerald-50 rounded-xl border border-emerald-100 dark:bg-emerald-900 dark:border-emerald-700"
              >
                <FaCalendarAlt className="text-emerald-300 dark:text-emerald-600 text-6xl mb-4 mx-auto" />
                <p className="text-emerald-700 dark:text-emerald-300 text-lg">
                  No upcoming interviews scheduled.
                </p>
                <p className="text-emerald-500 dark:text-emerald-400 mt-2">
                  Book your next interview to get started!
                </p>
              </motion.div>
            ) : (
              <ul className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <InterviewCard key={interview.id} interview={interview} index={index} />
                ))}
              </ul>
            )}
          </motion.div>
          {/* Right Column: Latest Shared Questions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center dark:bg-blue-900">
                <FaQuestionCircle className="text-blue-500 dark:text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                Latest Questions
              </h2>
            </div>
            {latestSharedQuestions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-blue-50 rounded-xl border border-blue-100 dark:bg-blue-900 dark:border-blue-700"
              >
                <FaQuestionCircle className="text-blue-300 dark:text-blue-600 text-6xl mb-4 mx-auto" />
                <p className="text-blue-700 dark:text-blue-300 text-lg">
                  No questions shared recently.
                </p>
                <p className="text-blue-500 dark:text-blue-400 mt-2">
                  Be the first to share your interview experience!
                </p>
              </motion.div>
            ) : (
              <ul className="space-y-4">
                {latestSharedQuestions.map((question, index) => (
                  <QuestionCard key={question.id} question={question} index={index} />
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NotificationsCommunity;
