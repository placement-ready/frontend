'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaQuestionCircle,
  FaCode,
  FaMicrophone,
  FaCalendarAlt,
  FaChartLine,
  FaShareAlt,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface FeatureCard {
  icon: IconType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  pillText?: string;
  href?: string;
}

const features: FeatureCard[] = [
  {
    icon: FaQuestionCircle,
    iconBg: 'from-emerald-50 to-green-50 dark:from-emerald-900 dark:to-green-900',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    title: 'Company-wise Questions',
    description:
      'Explore top company interview questions from the past 5 years, filtered by company and role for targeted prep.',
    pillText: 'Trending',
    href: '/dashboard/questions',
  },
  {
    icon: FaCode,
    iconBg: 'from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
    title: 'Start DSA Practice',
    description:
      'Sharpen your Data Structures & Algorithms skills with curated practice sheets and timed challenges',
    pillText: 'Practice',
    href: '/dashboard/dsa',
  },
  {
    icon: FaMicrophone,
    iconBg: 'from-purple-50 to-violet-50 dark:from-purple-900 dark:to-violet-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
    title: 'Start Mock Interview',
    description:
      'Simulate a real interview with AI-powered mock sessions. Get instant feedback on your answers and confidence.',
    pillText: 'In Progress',
    href: '/dashboard/mock-interview',
  },
  {
    icon: FaCalendarAlt,
    iconBg: 'from-orange-50 to-amber-50 dark:from-orange-900 dark:to-amber-900',
    iconColor: 'text-orange-600 dark:text-orange-400',
    title: 'Schedule Interview',
    description:
      'Plan and book your mock interview sessions. Set reminders and sync with your calendar.',
    pillText: 'Scheduled',
    href: '/dashboard/schedule',
  },
  {
    icon: FaChartLine,
    iconBg: 'from-teal-50 to-cyan-50 dark:from-teal-900 dark:to-cyan-900',
    iconColor: 'text-teal-600 dark:text-teal-400',
    title: 'View Performance Report',
    description:
      'Track your progress with detailed performance analytics. Identify strengths, weaknesses, and readiness level.',
    pillText: 'Updated',
    href: '/dashboard/reports',
  },
  {
    icon: FaShareAlt,
    iconBg: 'from-pink-50 to-rose-50 dark:from-pink-900 dark:to-rose-900',
    iconColor: 'text-pink-600 dark:text-pink-400',
    title: 'Share Your Experience',
    description:
      'Contribute by adding your interview experiences, unique questions, and feedback to help the community.',
    pillText: 'New',
    href: '/dashboard/share',
  },
];

const QuickActions: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (href?: string) => {
    if (href) {
      console.log(`Navigate to: ${href}`);
    }
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-emerald-100 to-green-50 dark:from-emerald-800 dark:to-green-900 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-50 dark:from-blue-800 dark:to-cyan-900 rounded-full mix-blend-multiply filter blur-xl opacity-60"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-50"
        />
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
          Take Quick{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Actions
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full origin-left"
            />
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Streamline your interview preparation with these powerful tools and features designed to
          boost your success rate.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon as React.ComponentType<React.ComponentProps<'svg'>>;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.3,
                ease: 'easeOut',
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl p-6 lg:p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleCardClick(feature.href)}
            >
              {/* Pill Badge */}
              {feature.pillText && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  className="absolute top-4 right-4 text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-800 dark:to-green-800 text-emerald-700 dark:text-emerald-300 rounded-full font-semibold shadow-sm"
                >
                  {feature.pillText}
                </motion.span>
              )}

              {/* Icon Container */}
              <div className="mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                >
                  <IconComponent
                    className={`text-2xl ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 transition-colors duration-300 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute bottom-6 right-6 text-emerald-500 dark:text-emerald-400 text-xl font-bold"
              >
                →
              </motion.div>

              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-green-50/0 dark:from-emerald-900/0 dark:to-green-900/0 transition-all duration-300 rounded-2xl pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center mt-12"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Ready to accelerate your interview preparation journey?
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-700 dark:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <span>Get Started</span>
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            →
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
};

export default QuickActions;
