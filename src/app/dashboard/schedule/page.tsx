"use client";

import React, { useState } from "react";

const ScheduleInterview: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); // for demo, replace with actual API call
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 flex items-center justify-center font-sans p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 max-w-xl w-full text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <span role="img" aria-label="schedule" className="text-4xl">
            🗓️
          </span>
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Schedule Your Interview
        </h2>
        <p className="text-green-600 dark:text-green-400 font-semibold mb-8">
          Seamless. Personalized. Effective.
        </p>
        {submitted ? (
          <div className="text-green-600 dark:text-green-400 font-bold text-xl select-text">
            🎉 Interview Scheduled!<br />
            Check your email for details.
          </div>
        ) : (
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 transition transform hover:scale-[1.02]"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 transition transform hover:scale-[1.02]"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 transition transform hover:scale-[1.02]"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 transition transform hover:scale-[1.02]"
            />
            <button
              type="submit"
              disabled={!name || !email || !date || !time}
              className="mt-6 py-5 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white text-xl tracking-wide font-extrabold shadow-lg  disabled:cursor-not-allowed transition transform hover:scale-105"
            >
              Schedule Interview
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ScheduleInterview;
