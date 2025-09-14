"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Animated Number Hook
const useAnimatedNumber = (target: number, duration = 1.5, shouldAnimate = true) => {
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!shouldAnimate) {
			setValue(target);
			return;
		}
		let startTime: number;
		let animationId: number;
		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime;
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / (duration * 1000), 1);
			const easeOutCubic = 1 - Math.pow(1 - progress, 3);
			setValue(Math.floor(target * easeOutCubic));
			if (progress < 1) animationId = requestAnimationFrame(animate);
		};
		animationId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationId);
	}, [target, duration, shouldAnimate]);

	return value;
};

// Progress Bar
const ProgressBar = ({
	percent,
	color = "from-green-400 to-green-600",
	height = "h-3",
}: {
	percent: number;
	color?: string;
	height?: string;
}) => (
	<div className="space-y-1">
		<div className={`w-full ${height} bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner`}>
			<motion.div
				initial={{ width: 0 }}
				animate={{ width: `${percent}%` }}
				transition={{ duration: 1.2, ease: "easeOut" }}
				className={`${height} rounded-full bg-gradient-to-r ${color} shadow-sm`}
			/>
		</div>
	</div>
);

// Card Component
const Card = ({
	children,
	icon,
	highlight,
	className = "",
}: {
	children: React.ReactNode;
	icon?: React.ReactNode;
	highlight?: React.ReactNode;
	className?: string;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		whileHover={{
			scale: 1.02,
			boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.03)",
			y: -2,
		}}
		transition={{
			type: "spring",
			stiffness: 300,
			damping: 20,
			duration: 0.2,
		}}
		className={`
      bg-white dark:bg-gray-900 rounded-2xl p-6 text-center relative 
      border border-gray-200 dark:border-gray-700 
      shadow-lg hover:shadow-xl transition-all duration-300 ease-out 
      backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95
      hover:border-green-500 dark:hover:border-green-400
      ${className}
    `}
	>
		{/* Icon Container */}
		<div className="flex justify-center mb-4">
			<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-800 dark:to-green-900 flex items-center justify-center text-2xl shadow-md border border-green-200 dark:border-green-700">
				{icon}
			</div>
		</div>
		{/* Content */}
		<div className="space-y-3">
			<div className="font-semibold text-gray-700 dark:text-gray-200 text-sm lg:text-base leading-tight">{children}</div>
			{highlight && <div className="space-y-2">{highlight}</div>}
		</div>
	</motion.div>
);

// Company Logo
const CompanyLogo = ({ name }: { name: string }) => (
	<div className="relative">
		<span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-2 border-blue-200 dark:border-blue-700 shadow-md text-blue-700 dark:text-blue-300 font-bold text-lg">
			{name[0]}
		</span>
		<div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
	</div>
);

// Countdown Timer
function CountdownTimer({ target }: { target: Date }) {
	const [remaining, setRemaining] = useState(
		Math.max(Math.floor((target.getTime() - Date.now()) / 1000), 0)
	);
	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining(Math.max(Math.floor((target.getTime() - Date.now()) / 1000), 0));
		}, 1000);
		return () => clearInterval(interval);
	}, [target]);
	if (remaining <= 0) {
		return (
			<span className="inline-flex items-center gap-1 text-red-500 font-bold text-sm bg-red-50 dark:bg-red-900 px-2 py-1 rounded-lg">
				<span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
				Live Now
			</span>
		);
	}
	const h = Math.floor(remaining / 3600);
	const m = Math.floor((remaining % 3600) / 60);
	const s = remaining % 60;
	return (
		<div className="flex items-center justify-center gap-1 text-sm font-mono">
			<div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-md font-bold min-w-[32px]">
				{h.toString().padStart(2, "0")}
			</div>
			<span className="text-gray-400 dark:text-gray-500">:</span>
			<div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-md font-bold min-w-[32px]">
				{m.toString().padStart(2, "0")}
			</div>
			<span className="text-gray-400 dark:text-gray-500">:</span>
			<div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-md font-bold min-w-[32px]">
				{s.toString().padStart(2, "0")}
			</div>
		</div>
	);
}

export const StatsCards = () => {
	const [isInView, setIsInView] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => setIsInView(true), 300);
		return () => clearTimeout(timer);
	}, []);

	const readiness = useAnimatedNumber(78, 1.5, isInView);
	const lastScore = useAnimatedNumber(64, 1.2, isInView);
	const streak = useAnimatedNumber(12, 1.0, isInView);
	const dsaDone = useAnimatedNumber(48, 1.3, isInView);
	const dsaTotal = 80;
	const offers = useAnimatedNumber(1, 0.8, isInView);
	const interviewsGiven = useAnimatedNumber(5, 1.1, isInView);

	const interviewTime = new Date(Date.now() + 25 * 3600 * 1000);
	const company = "Google";

	const formatDate = (date: Date) =>
		`${date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		})} at ${date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})}`;

	const cards = [
		{
			icon: "🎯",
			title: "Last Mock Score",
			highlight: (
				<div className="space-y-2">
					<div className="text-2xl font-bold text-green-600 dark:text-green-400">{lastScore}%</div>
					<ProgressBar percent={lastScore} color="from-green-400 to-emerald-500" />
				</div>
			),
		},
		{
			icon: <CompanyLogo name={company} />,
			title: "Target Company",
			highlight: (
				<div className="space-y-1">
					<div className="text-lg font-semibold text-gray-700 dark:text-gray-200">{company}</div>
					<div className="text-xs text-green-600 dark:text-green-300 bg-green-50 dark:bg-green-900 px-2 py-1 rounded-full inline-block">
						Interview Prep
					</div>
				</div>
			),
		},
		{
			icon: "🔥",
			title: "Practice Streak",
			highlight: (
				<div className="space-y-1">
					<div className="text-2xl font-bold text-orange-500 dark:text-orange-400">{streak}</div>
					<div className="text-sm text-gray-500 dark:text-gray-400">days strong</div>
				</div>
			),
		},
		{
			icon: "💡",
			title: "Overall Readiness",
			highlight: (
				<div className="space-y-2">
					<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{readiness}%</div>
					<ProgressBar percent={readiness} color="from-blue-400 to-blue-600" />
				</div>
			),
		},
		{
			icon: "⏰",
			title: "Next Interview",
			highlight: (
				<div className="space-y-2">
					<div className="text-xs text-gray-600 dark:text-gray-300 font-medium">{formatDate(interviewTime)}</div>
					<CountdownTimer target={interviewTime} />
				</div>
			),
		},
		{
			icon: "🧩",
			title: "DSA Progress",
			highlight: (
				<div className="space-y-2">
					<div className="flex items-baseline justify-center gap-1">
						<span className="text-lg font-bold text-purple-600 dark:text-purple-400">{dsaDone}</span>
						<span className="text-sm text-gray-400 dark:text-gray-500">/</span>
						<span className="text-sm text-gray-500 dark:text-gray-300">{dsaTotal}</span>
					</div>
					<ProgressBar
						percent={Math.round((dsaDone / dsaTotal) * 100)}
						color="from-purple-400 to-purple-600"
					/>
				</div>
			),
		},
		{
			icon: "🏆",
			title: "Job Offers",
			highlight: (
				<div className="space-y-1">
					<div className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">{offers}</div>
					<div className="text-xs text-gray-500 dark:text-gray-400">received</div>
				</div>
			),
		},
		{
			icon: "🎤",
			title: "Interviews Given",
			highlight: (
				<div className="space-y-1">
					<div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{interviewsGiven}</div>
					<div className="text-xs text-gray-500 dark:text-gray-400">completed</div>
				</div>
			),
		},
	];

	return (
		<div className="relative z-10 mt-8 px-4 sm:px-6 lg:px-8 py-8">
			{/* Header */}
			<div className="text-center mb-8">
				<h2 className="text-2xl lg:text-5xl font-bold mb-4 mt-6 text-center">
					<span className="text-gray-800 dark:text-gray-100">Your Progress </span>
					<span
						className="
      bg-gradient-to-r from-green-400 via-green-500 to-emerald-600
      bg-clip-text text-transparent
      font-extrabold
      relative
    "
					>
						Dashboard
						<span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-500 rounded" />
					</span>
				</h2>
				<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					Track your interview preparation journey and see how you&apos;re performing across different areas.
				</p>
			</div>
			{/* Cards Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
				{cards.map((card, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: i * 0.1,
							ease: "easeOut",
						}}
					>
						<Card icon={card.icon}>{card.title}{card.highlight}</Card>
					</motion.div>
				))}
			</div>
			{/* Background decorative elements */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-20 left-10 w-32 h-32 bg-green-100 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-100 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-2000"></div>
			</div>
		</div>
	);
};

export default StatsCards;
