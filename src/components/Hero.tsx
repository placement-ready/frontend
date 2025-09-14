"use client";

import React from "react";
import Image from "next/image";
import "../styles/hero.css";
import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeContext"; // still imported, use if needed for logic

const Hero: React.FC = () => {
    const router = useRouter();

    return (
        <section
            className="
                relative min-h-screen w-full flex flex-col justify-between 
                bg-gradient-to-br from-green-50 via-emerald-50 to-green-100
                dark:from-gray-900 dark:via-gray-800 dark:to-gray-900   
                pt-22 md:pt-24
            "
        >
            {/* Centered main content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center px-2 sm:px-4">
                {/* Logo / Icon */}
                <div
                    className="
                        mx-auto rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg
                        bg-gradient-to-tr from-emerald-500 to-green-400
                        dark:from-emerald-600 dark:to-green-500
                    "
                >
                    <Image
                        src="/brain.png"
                        alt="Brain Logo"
                        width={36}
                        height={36}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Headline */}
                <h1
                    className="
                        text-4xl sm:text-6xl lg:text-5xl font-bold leading-tight mb-2 max-w-3xl
                        text-gray-900 dark:text-white
                    "
                >
                    From nervous to natural{" "}
                    <span
                        className="
                            text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600
                            dark:from-emerald-400 dark:to-green-300
                        "
                    >
                        — transform your interview skills.
                    </span>
                </h1>

                {/* Subhead */}
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-15 max-w-1xl">
                    Instant SkilledAI feedback and personalized practice plans to help you ace your interviews!!
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 w-full sm:w-auto">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="
                            bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold
                            py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition w-full sm:w-auto
                            dark:from-green-500 dark:to-emerald-500
                        "
                    >
                        Start Practicing
                    </button>
                    <button
                        onClick={() => router.push("/about")}
                        className="
                            border border-gray-300 font-semibold py-3 px-8 rounded-lg bg-white hover:bg-gray-50
                            dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700
                            w-full sm:w-auto
                        "
                    >
                        About Us
                    </button>
                </div>

                {/* Trust / tagline */}
                <div
                    className="
                        bg-green-100 border border-green-200 rounded-md py-2 px-4 sm:px-6
                        text-sm sm:text-base text-green-700 font-medium typewriter
                        dark:bg-gray-700 dark:border-gray-600 dark:text-green-300
                    "
                >
                    "Master Your Interviews with HireMind's Expert Insights."
                </div>
            </div>

            {/* Stats section with icons */}
            <div
                className="
                    w-full bg-white/60 backdrop-blur-sm py-8
                    dark:bg-gray-900/60
                "
            >
                <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 px-6">
                    <StatCard value="500+" label="Practice Questions" icon={clipboardIcon} />
                    <StatCard value="3" label="AI Models" icon={boltIcon} />
                    <StatCard value="50+" label="Companies" icon={buildingIcon} />
                    <StatCard value="8" label="Study Plans" icon={bookIcon} />
                </div>
            </div>
        </section>
    );
};


// ALL ICONS use currentColor for fill AND correct text colors
const clipboardIcon = (
    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
        <rect width="16" height="20" x="4" y="2" rx="2" />
    </svg>
);

const boltIcon = (
    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const buildingIcon = (
    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4" />
    </svg>
);

const bookIcon = (
    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 7v11a2 2 0 002 2h6a2 2 0 002-2V7H2zm18 0v11a2 2 0 01-2 2h-6a2 2 0 01-2-2V7h10zM12 3v4"
        />
    </svg>
);

const StatCard = ({
    value,
    label,
    icon,
}: {
    value: string;
    label: string;
    icon: React.ReactNode;
}) => (
    <div
        className="
            group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6
            hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden
            dark:bg-gray-800 dark:border-gray-700
        "
    >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-gray-700/30 dark:to-gray-700/20"></div>
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-bl-2xl opacity-60 dark:from-gray-600 dark:to-gray-600"></div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
                <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg mr-2 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-700 transition-colors duration-300">
                    {icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-300 bg-clip-text text-transparent">
                    {value}
                </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm font-medium text-center group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                {label}
            </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 group-hover:w-3/4 transition-all duration-300 rounded-t-full dark:from-emerald-400 dark:to-green-400"></div>
    </div>
);

export default Hero;
