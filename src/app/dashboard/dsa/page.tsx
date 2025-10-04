"use client";

import React from "react";
import {
  BookOpen,
  ListOrdered,
  Search,
  Type,
  RefreshCw,
  Link as LinkIcon,
  ActivitySquare,
  Layers3,
  ArrowUpRight,
  Columns as Columns2,
  TrendingUp,
  TreePine,
  TreeDeciduous,
  Share2,
  Repeat,
  Calculator,
  KeyRound,
  SplitSquareVertical,
  MapPinned,
} from "lucide-react";

const topicIcons: Record<string, React.ReactNode> = {
  basic: <BookOpen size={32} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400" />,
  arrays: <ListOrdered size={32} strokeWidth={2} className="text-green-600 dark:text-green-400" />,
  "binary-search": <Search size={32} strokeWidth={2} className="text-emerald-500 dark:text-emerald-400" />,
  strings: <Type size={32} strokeWidth={2} className="text-green-500 dark:text-green-400" />,
  recursion: <RefreshCw size={32} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400" />,
  linkedlist: <LinkIcon size={32} strokeWidth={2} className="text-green-600 dark:text-green-400" />,
  bit: <ActivitySquare size={32} strokeWidth={2} className="text-green-700 dark:text-green-400" />,
  "stack-queue": <Layers3 size={32} strokeWidth={2} className="text-teal-600 dark:text-teal-400" />,
  "two-pointers": <ArrowUpRight size={32} strokeWidth={2} className="text-emerald-700 dark:text-emerald-400" />,
  "sliding-window": <Columns2 size={32} strokeWidth={2} className="text-lime-600 dark:text-lime-400" />,
  heaps: <TrendingUp size={32} strokeWidth={2} className="text-green-800 dark:text-green-400" />,
  greedy: <TrendingUp size={32} strokeWidth={2} className="text-emerald-800 dark:text-emerald-400" />,
  trees: <TreeDeciduous size={32} strokeWidth={2} className="text-green-800 dark:text-green-400" />,
  bst: <TreePine size={32} strokeWidth={2} className="text-emerald-800 dark:text-emerald-400" />,
  graphs: <Share2 size={32} strokeWidth={2} className="text-blue-600 dark:text-blue-400" />,
  dp: <Repeat size={32} strokeWidth={2} className="text-green-700 dark:text-green-400" />,
  math: <Calculator size={32} strokeWidth={2} className="text-green-700 dark:text-green-400" />,
  trie: <KeyRound size={32} strokeWidth={2} className="text-teal-800 dark:text-teal-400" />,
  dsu: <SplitSquareVertical size={32} strokeWidth={2} className="text-green-800 dark:text-green-400" />,
  backtracking: <MapPinned size={32} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400" />,
};

interface Topic {
  key: string;
  name: string;
  icon: string;
  count: number;
  completed: number;
}

const dsaTopics: Topic[] = [
  { key: "basic", name: "Basic Concepts", icon: "basic", count: 10, completed: 0 },
  { key: "arrays", name: "Arrays", icon: "arrays", count: 40, completed: 0 },
  { key: "binary-search", name: "Binary Search", icon: "binary-search", count: 22, completed: 0 },
  { key: "strings", name: "Strings", icon: "strings", count: 35, completed: 0 },
  { key: "recursion", name: "Recursion", icon: "recursion", count: 18, completed: 0 },
  { key: "linkedlist", name: "Linked List", icon: "linkedlist", count: 25, completed: 0 },
  { key: "bit", name: "Bit Manipulation", icon: "bit", count: 12, completed: 0 },
  { key: "stack-queue", name: "Stack & Queues", icon: "stack-queue", count: 23, completed: 0 },
  { key: "two-pointers", name: "Two Pointers", icon: "two-pointers", count: 17, completed: 0 },
  { key: "sliding-window", name: "Sliding Window", icon: "sliding-window", count: 19, completed: 0 },
  { key: "heaps", name: "Heaps", icon: "heaps", count: 14, completed: 0 },
  { key: "greedy", name: "Greedy Algorithms", icon: "greedy", count: 24, completed: 0 },
  { key: "trees", name: "Trees", icon: "trees", count: 33, completed: 0 },
  { key: "bst", name: "Binary Search Tree (BST)", icon: "bst", count: 14, completed: 0 },
  { key: "graphs", name: "Graphs", icon: "graphs", count: 25, completed: 0 },
  { key: "dp", name: "Dynamic Programming", icon: "dp", count: 40, completed: 0 },
  { key: "math", name: "Math & Number Theory", icon: "math", count: 10, completed: 0 },
  { key: "trie", name: "Trie", icon: "trie", count: 8, completed: 0 },
  { key: "dsu", name: "Disjoint Set / Union Find", icon: "dsu", count: 6, completed: 0 },
  { key: "backtracking", name: "Backtracking", icon: "backtracking", count: 10, completed: 0 },
];

type DifficultyStats = {
  easy: { count: number; completed: number };
  medium: { count: number; completed: number };
  hard: { count: number; completed: number };
};

const difficulty: DifficultyStats = {
  easy: { count: 132, completed: 0 },
  medium: { count: 186, completed: 0 },
  hard: { count: 136, completed: 0 },
};

export default function DsaUi() {
  const totalQuestions = dsaTopics.reduce((sum, t) => sum + t.count, 0);
  const totalCompleted = dsaTopics.reduce((sum, t) => sum + t.completed, 0);
  const totalPercent = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen pb-12">
      {/* Total Progress Card */}
      <div className="
        max-w-7xl mx-auto mb-14 px-6
        rounded-[38px] shadow-xl
        bg-gradient-to-br from-green-400 via-green-400 to-emerald-500
        dark:from-emerald-900 dark:via-green-900 dark:to-emerald-900
        border border-green-300/20
        flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-8
        py-10
      ">
        {/* Progress Main */}
        <div className="flex-1 flex flex-col items-center justify-center text-white px-2">
          <div className="text-xl font-semibold mb-2">Total Progress</div>
          <div className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            {totalCompleted} <span className="opacity-80 font-bold">/ {totalQuestions}</span>
          </div>
          <div className="my-2 flex justify-center items-center">
            <div className="w-24 h-24 rounded-full bg-white/90 shadow-inner flex items-center justify-center border-4 border-green-200 dark:bg-gray-900">
              <span className="text-2xl text-green-600 font-black">{totalPercent}%</span>
            </div>
          </div>
        </div>

        {/* Easy/Medium/Hard Columns */}
        <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 w-full items-center gap-6 px-2">
          {["easy", "medium", "hard"].map((level) => {
            const label = level.charAt(0).toUpperCase() + level.slice(1);
            const { completed, count } = difficulty[level as keyof DifficultyStats];
            const percent = count > 0 ? Math.round((completed / count) * 100) : 0;
            return (
              <div key={level} className="flex flex-col items-center">
                <div className="font-semibold text-lg mb-2 text-white">{label}</div>
                <div className="text-2xl font-extrabold mb-2 text-white">
                  {completed} <span className="opacity-80 font-bold">/ {count}</span>
                </div>
                <div
                  className={`
                    w-56 h-2 rounded overflow-hidden mb-2
                    ${level === "easy" ? "bg-emerald-200 dark:bg-emerald-800" : ""}
                    ${level === "medium" ? "bg-green-300 dark:bg-green-900" : ""}
                    ${level === "hard" ? "bg-emerald-400 dark:bg-emerald-900" : ""}
                  `}
                >
                  <div
                    className={`
                      h-2 rounded transition-all
                      ${level === "easy" ? "bg-emerald-400 dark:bg-emerald-400" : ""}
                      ${level === "medium" ? "bg-green-500 dark:bg-green-500" : ""}
                      ${level === "hard" ? "bg-emerald-600 dark:bg-emerald-700" : ""}
                    `}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-white text-sm font-medium">completed</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-9 px-4 max-w-7xl mx-auto">
        {dsaTopics.map((topic) => {
          const percent = topic.count > 0 ? Math.round((topic.completed / topic.count) * 100) : 0;
          return (
            <div
              key={topic.key}
              className="
  flex flex-col items-center justify-start
  rounded-[26px] p-7 bg-white dark:bg-gray-900
  border border-green-100 dark:border-emerald-800
  shadow-md hover:scale-[1.035] hover:shadow-2xl hover:border-emerald-500 transition-all duration-200
  cursor-pointer relative
"
              style={{
                minHeight: "190px",
              }}
            >
              <span
                className="mb-4 flex items-center justify-center w-16 h-16 rounded-xl drop-shadow-lg bg-white dark:bg-gray-900"
                aria-label={topic.name}
                style={{
                  boxShadow: "0 4px 20px #00c87116, 0 1.5px 7px #00c85114",
                }}
              >
                {topicIcons[topic.icon]}
              </span>
              <h3 className="font-black text-lg mb-2 text-green-700 dark:text-green-400 text-center tracking-tight leading-tight">
                {topic.name}
              </h3>
              <div className="mb-2 text-green-900 font-semibold text-base dark:text-green-200">
                {topic.completed} / {topic.count} solved
              </div>
              <div className="w-11/12 mx-auto bg-green-100 dark:bg-green-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="text-xs text-green-700 opacity-80 mt-2 font-bold tracking-wide dark:text-green-400">
                {percent}% completed
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
