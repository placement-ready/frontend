"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import {
  MdTrendingUp,
  MdPlayArrow,
  MdAssignment,
  MdBusiness,
  MdStars,
  MdCheckCircle,
  MdSchool,
  MdTimeline,
} from "react-icons/md";

// Types
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  color?: "green" | "blue" | "purple" | "orange";
}

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

// Quick Stats Data
const getUserStats = (userId?: string) => ({
  problemsSolved: 87,
  practiceStreak: 12,
  interviewsCompleted: 5,
  skillLevel: "Expert",
  weeklyProgress: 23,
  upcomingDeadlines: 3,
});

// Achievement data
const getRecentAchievements = () => [
  {
    id: 1,
    title: "Problem Solver",
    description: "Solved 50+ coding problems",
    icon: "🏆",
    isNew: true,
  },
  {
    id: 2,
    title: "Consistent Learner",
    description: "10-day practice streak",
    icon: "🔥",
    isNew: false,
  },
  {
    id: 3,
    title: "Mock Master",
    description: "Completed 5 mock interviews",
    icon: "⭐",
    isNew: true,
  },
];

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  trend,
  color = "green",
}) => {
  const colorClasses = {
  green: "bg-green-50 text-green-700 border-green-200 shadow-md dark:bg-green-800/30 dark:text-green-200 dark:border-green-800 dark:shadow-lg",
  blue: "bg-blue-50 text-blue-700 border-blue-200 shadow-md dark:bg-blue-800/30 dark:text-blue-200 dark:border-blue-800 dark:shadow-lg",
  purple: "bg-purple-50 text-purple-700 border-purple-200 shadow-md dark:bg-purple-800/30 dark:text-purple-200 dark:border-purple-800 dark:shadow-lg",
  orange: "bg-orange-50 text-orange-700 border-orange-200 shadow-md dark:bg-orange-800/30 dark:text-orange-200 dark:border-orange-800 dark:shadow-lg",
};


  return (
    <div
      className={`p-4 rounded-xl border ${colorClasses[color]} transition-all duration-200 hover:shadow-md dark:hover:shadow-lg`}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{value}</span>
            {trend && (
              <MdTrendingUp
                className={`text-sm ${
                  trend === "up"
                    ? "text-green-500 dark:text-green-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
            )}
          </div>
          <p className="text-sm font-medium opacity-80 dark:opacity-90 text-gray-800 dark:text-gray-200">{title}</p>
          {subtitle && (
            <p className="text-xs opacity-60 dark:opacity-75 text-gray-700 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Quick Action Component
const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  title,
  description,
  onClick,
  variant = "secondary",
}) => {
  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
      : "bg-white border border-green-200 dark:bg-gray-800 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 hover:border-green-300 dark:hover:border-green-500";

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl transition-all duration-200 text-left w-full ${variantClasses}`}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-1">{icon}</div>
        <div>
          <h3 className="font-semibold text-sm mb-1 dark:text-gray-200">{title}</h3>
          <p className="text-xs opacity-75 dark:text-white/80">{description}</p>
        </div>
      </div>
    </button>
  );
};

const Banner: React.FC = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const userStats = getUserStats(user?.id);
  const achievements = getRecentAchievements();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // Handle navigation or actions here
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-green-100 dark:border-green-700 shadow-sm dark:shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Welcome Section */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {getGreeting()}, {user?.name || "User"}! 👋
                </h1>
                <p className="text-green-600 dark:text-green-400 font-medium">Ready to level up your placement game?</p>
              </div>
            </div>

            {/* Progress Insight */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <MdTimeline className="text-green-600 dark:text-green-400 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    You&apos;re on a {userStats.practiceStreak}-day streak! 🔥
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Keep going to maintain your momentum</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 lg:w-80">
            <StatCard
              icon={<MdSchool />}
              title="Problems Solved"
              value={userStats.problemsSolved}
              trend="up"
              color="green"
            />
            <StatCard
              icon={<MdStars />}
              title="Skill Level"
              value={userStats.skillLevel}
              color="blue"
            />
            <StatCard
              icon={<MdCheckCircle />}
              title="Interviews"
              value={userStats.interviewsCompleted}
              subtitle="Completed"
              color="purple"
            />
            <StatCard
              icon={<MdTrendingUp />}
              title="Weekly Progress"
              value={`${userStats.weeklyProgress}%`}
              trend="up"
              color="orange"
            />
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-t border-green-100/50 dark:border-green-700/50 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Quick Actions */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <MdPlayArrow className="text-green-600 dark:text-green-400" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <QuickAction
                icon={<MdPlayArrow />}
                title="Start Practice"
                description="Solve coding problems"
                onClick={() => handleQuickAction("practice")}
                variant="primary"
              />
              <QuickAction
                icon={<MdAssignment />}
                title="Mock Interview"
                description="Practice with AI interviewer"
                onClick={() => handleQuickAction("mock-interview")}
              />
              <QuickAction
                icon={<MdBusiness />}
                title="Company Prep"
                description="Research target companies"
                onClick={() => handleQuickAction("company-prep")}
              />
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="lg:w-80">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <MdStars className="text-yellow-500" />
              Recent Achievements
            </h2>
            <div className="space-y-3">
              {getRecentAchievements().slice(0, 3).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">{achievement.title}</h3>
                      {achievement.isNew && (
                        <span className="bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
