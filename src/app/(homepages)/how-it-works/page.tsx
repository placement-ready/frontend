'use client';
import React, { useEffect, useState } from "react";


// ===== SVG icons (existing + new) =====
const ExploreIcon = () => (
	<svg width="38" height="38" viewBox="0 0 24 24" fill="none" className="icon">
		<rect x="6" y="13" width="12" height="3" rx="1" fill="#3b82f6" />
		<rect x="4" y="7" width="16" height="6" rx="2.5" fill="#2563eb" />
		<rect x="10" y="16" width="4" height="2" rx="0.7" fill="#7dd3fc" />
	</svg>
);
const AIIcon = () => (
	<svg width="38" height="38" viewBox="0 0 24 24" fill="none" className="icon">
		<ellipse cx="12" cy="12" rx="9" ry="8" fill="#10b981" />
		<rect x="8" y="8" width="8" height="4" rx="2" fill="#a7f3d0" />
		<circle cx="10" cy="10" r="1.3" fill="#fff" />
		<circle cx="14" cy="10" r="1.3" fill="#fff" />
		<rect x="10.5" y="14" width="3" height="1.2" rx="0.5" fill="#fff" />
	</svg>
);
const LiveIcon = () => (
	<svg width="38" height="38" viewBox="0 0 24 24" fill="none" className="icon">
		<rect x="7" y="9" width="10" height="7" rx="3.5" fill="#14b8a6" />
		<rect x="15" y="12.5" width="2.2" height="2.2" rx="0.6" fill="#34d399" />
		<rect x="8.8" y="12.3" width="6.4" height="1.8" rx="0.7" fill="#a7f3d0" />
	</svg>
);
const AnalyzeIcon = () => (
	<svg width="38" height="38" viewBox="0 0 24 24" fill="none" className="icon">
		<rect x="7" y="16" width="3" height="4" rx="1" fill="#8b5cf6" />
		<rect x="12" y="11" width="3" height="9" rx="1" fill="#22d3ee" />
		<rect x="17" y="14" width="3" height="6" rx="1" fill="#34d399" />
		<rect x="7" y="12" width="13" height="1.2" rx="0.5" fill="#a5b4fc" />
	</svg>
);
const NetworkIcon = () => (
	<svg width="38" height="38" viewBox="0 0 24 24" fill="none" className="icon">
		<circle cx="6" cy="12" r="3" fill="#f59e0b" />
		<circle cx="18" cy="12" r="3" fill="#fbbf24" />
		<circle cx="12" cy="6" r="3" fill="#fde68a" />
		<path d="M6 12 L12 6 L18 12 L12 18 Z" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
	</svg>
);


// ===== Steps =====
const steps = [
	{
		title: 'Explore & Prepare',
		icon: <ExploreIcon />,
		main: "Access company question banks, DSA sheets, and quick time-based drills.",
		items: [
			"Latest company-wise questions",
			"Core subject prep",
			"Quick drills (time/question limit)",
		],
	},
	{
		title: 'AI Practice',
		icon: <AIIcon />,
		main: "Instant AI-generated questions, mock video interviews, unlimited follow-ups.",
		items: [
			"Ask Interviewer for new questions",
			"AI-powered video mock sessions",
			"Unlimited practice rounds",
		],
	},
	{
		title: 'Live Experience',
		icon: <LiveIcon />,
		main: "Mentor-led video interviews, weekly contests, robust scheduling & reminders.",
		items: [
			"Live video mocks guided by mentors",
			"GD contests & rounds",
			"Automated reminders, easy rescheduling",
		],
	},
	{
		title: 'Analyze & Improve',
		icon: <AnalyzeIcon />,
		main: "Session analysis, readiness badges, personalized improvement paths.",
		items: [
			"Performance & session summary",
			"Readiness badge achievement",
			"Direct links to improvement modules",
		],
	},
];


// ===== Benefits =====
const benefits = [
	{
		headline: "Fresh Questions, Real Insights",
		content: "Monthly-updated questions from top companies guaranteed to be relevant for interviews.",
	},
	{
		headline: "Smart, Adaptive Prep",
		content: "Practice sets, quizzes, and feedback that adapt to your strengths and weaknesses.",
	},
	{
		headline: "Expert Mentorship",
		content: "Schedule video mock interviews and GD contests, get actionable mentor feedback.",
	},
	{
		headline: "Personalized Analytics",
		content: "Track your performance, earn badges, and unlock improvement paths with AI-powered analytics.",
	},
	{
		headline: "Integrated Scheduler",
		content: "One-click booking for mocks and contests, with automated reminders and rescheduling.",
	},
	{
		headline: "Company-Wise Archives",
		content: "Browse interview questions from hundreds of companies, categorized by role & difficulty.",
	},
	{
		headline: "Gamified Learning",
		content: "Earn badges and climb leaderboards to keep your motivation high throughout preparation.",
	},
	{
		headline: "Cross-Platform Access",
		content: "Practice seamlessly on web or mobile—your progress syncs across all devices.",
	},
];


// ===== Stats =====
const stats = [
	{ stat: "5,000+", label: "Mocks Completed" },
	{ stat: "100+", label: "Companies Covered" },
	{ stat: "4.8/5", label: "Avg. User Rating" },
	{ stat: "24x7", label: "Prep Access" },
	{ stat: "20k+", label: "Active Users" },
	{ stat: "1,200+", label: "Mentor Hours Delivered" },
];


// ===== Testimonials (What Our Users Say) =====
const testimonials = [
	{
		name: "Anita R.",
		role: "Software Engineer",
		quote: "HireMind transformed my interview prep. The AI mocks feel almost like real interviews, and the mentor feedback is invaluable.",
	},
	{
		name: "Jay K.",
		role: "Data Analyst",
		quote: "The blend of online practice and live sessions helped me gain confidence and land my dream job.",
	},
	{
		name: "Meera S.",
		role: "Product Manager",
		quote: "The readiness badges and analytics kept me motivated. It's like having a personal coach 24/7.",
	},
];


// ===== Dark mode detection hook =====
const useDarkMode = (): boolean => {
	const [isDark, setIsDark] = useState(
		typeof window !== "undefined" ? document.documentElement.classList.contains("dark") : false
	);
	useEffect(() => {
		const check = () => setIsDark(document.documentElement.classList.contains("dark"));
		check();
		const obs = new MutationObserver(check);
		obs.observe(document.documentElement, { attributes: true });
		return () => obs.disconnect();
	}, []);
	return isDark;
};


// ===== Main Component =====
const HowItWorksPage: React.FC = () => {
	const isDark = useDarkMode();
	const [selected, setSelected] = useState<number>(1);


	const getCardStyle = (idx: number) => {
		const highlight = selected === idx;
		return {
			borderWidth: 2,
			borderRadius: "24px",
			borderColor: highlight ? "#22d3ee" : "#34d399",
			background: highlight
				? "radial-gradient(circle at 60% 80%, #22d3ee55 20%, #10b9811c 80%, transparent), #17233e"
				: isDark ? "#17233e" : "#fff",
			boxShadow: highlight
				? "0 0 36px 8px #22d3ee30"
				: "0 6px 32px #1a3c2922",
			cursor: "pointer"
		};
	};


	const Arrow = () => (
		<svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
			<path d="M6 12h12" />
			<path d="M12 7l6 5-6 5" fill="none" />
		</svg>
	);


	return (
		<div
			className="min-h-screen w-full font-sans transition-colors duration-300"
			style={{
				background: isDark
					? "linear-gradient(180deg,#182235 8%,#101828 97%)"
					: "linear-gradient(180deg,#f1fcfa 0%,#e6fdf4 99%)",
				color: isDark ? "#e3faf1" : "#174233",
			}}
		>
			{/* Hero */}
			<section className="max-w-3xl mx-auto text-center pt-20 pb-10">
				<h1 className="font-extrabold text-3xl md:text-5xl mb-5 tracking-tight"
					style={{ color: isDark ? "#5fffb0" : "#168844" }}>
					Practice every part of your interview journey—on one smart platform.
				</h1>
				<p className="text-lg md:text-2xl font-medium mb-8"
					style={{ color: isDark ? "#a7e6c6" : "#327f50" }}>
					AI tools + real interview formats + live mentor sessions help you get fully ready.
				</p>
				<a
					href="/signup"
					className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-green-400 to-teal-400 text-white font-bold text-lg shadow-lg transition hover:scale-105"
				>
					Start Practicing Free
				</a>
			</section>


			{/* Steps */}
			<section className="max-w-7xl mx-auto px-4 pt-10 pb-14">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{steps.map((step, idx) => {
						const highlight = idx === selected;
						return (
							<button
								key={step.title}
								type="button"
								aria-label={step.title}
								onClick={() => setSelected(idx)}
								className={`
          flex flex-col items-center p-6 rounded-3xl shadow transition duration-300 overflow-hidden border
          ${highlight
										? "border-emerald-500 bg-white ring-4 ring-emerald-200/60 ring-offset-2 text-green-700"
										: "border-green-400 bg-white"
									}
          dark:${highlight
										? "bg-[#193d35] border-emerald-400 ring-2 ring-emerald-400/30 text-emerald-200"
										: "bg-[#17233e] border-green-700"
									}
          text-left min-h-[420px] h-full hover:scale-[1.03] hover:shadow-xl
        `}
								style={{
									boxShadow: highlight
										? "0 4px 28px 0 rgba(16,185,129,0.12)"
										: "0 2px 20px 0 rgba(44,178,125,0.07)"
								}}
							>
								<div className="mb-4">{step.icon}</div>
								<h3 className={`text-xl font-bold mb-2 ${highlight ? "text-emerald-700 dark:text-emerald-200" : "text-green-700 dark:text-green-400"}`}>
									{step.title}
								</h3>
								<div className={`mb-4 text-base font-medium flex items-center justify-center text-center
          ${highlight ? "text-gray-800 dark:text-emerald-100" : "text-gray-800 dark:text-gray-300"}`}
									style={{ minHeight: 60 }}
								>
									{step.main}
								</div>
								<ul className={`space-y-2 w-full ${highlight ? "text-gray-700 dark:text-emerald-100" : "text-gray-600 dark:text-gray-400"} text-base`}>
									{step.items.map(pt => (
										<li
											key={pt}
											className="flex gap-2 items-center ml-2"
										>
											<span className={`text-emerald-500`}>
												➤
											</span>
											<span>{pt}</span>
										</li>
									))}
								</ul>
							</button>
						);
					})}
				</div>

			</section>



			{/* Benefits */}
			<section className="max-w-7xl mx-auto px-4 pb-10 mt-2">
				<h2 className="text-xl md:text-5xl font-bold text-center mb-7 mt-10" style={{ color: isDark ? "#5fffb0" : "#168844" }}>
					Why Choose HireMind?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{benefits.map(b => (
						<div
							key={b.headline}
							className={`rounded-xl shadow-md border-2 p-8 flex flex-col items-start
                ${isDark ? "bg-[#162236] border-teal-800 text-green-100" : "bg-white border-green-100 text-green-900"}
              `}
						>
							<div className="font-bold text-green-400 text-lg mb-2">{b.headline}</div>
							<div className="text-base text-green-200">{b.content}</div>
						</div>
					))}
				</div>
			</section>


			{/* Testimonials (What Our Users Say) */}
			<section className="max-w-6xl mx-auto px-4 pb-16">
				<h2 className="text-2xl font-bold text-center mb-8" style={{ color: isDark ? "#5fffb0" : "#168844" }}>
					What Our Users Say
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map(({ name, role, quote }) => (
						<div
							key={name}
							className={`border-2 rounded-xl p-6 shadow-md flex flex-col items-start 
                ${isDark ? "bg-[#162236] border-teal-800 text-green-100" : "bg-white border-green-100 text-green-900"}
              `}
						>
							<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#5fffb0" : "#22d3ee"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
								<path d="M5 13h4v-2H5v2z" />
								<path d="M15 13h4v-2h-4v2z" />
								<circle cx="7" cy="15" r="2" />
								<circle cx="17" cy="15" r="2" />
							</svg>
							<p className="mb-4 text-lg font-semibold italic">"{quote}"</p>
							<div className="font-bold">{name}</div>
							<div className="text-green-400">{role}</div>
						</div>
					))}
				</div>
			</section>


			{/* Stats */}
			<section className="max-w-4xl mx-auto px-2 pb-10 mt-4">
				<div className="flex flex-row flex-wrap items-center justify-center gap-8">
					{stats.map(s => (
						<div key={s.label}
							className={`flex flex-col items-center px-6 py-4 rounded-2xl shadow border
                ${isDark ? "bg-[#141f32] border-green-700 text-green-100" : "bg-white border-green-100 text-green-900"}`}
						>
							<span className="font-extrabold text-2xl text-green-400 mb-1">{s.stat}</span>
							<span className="text-base">{s.label}</span>
						</div>
					))}
				</div>
			</section>


			{/* Community & Resources */}
			<section className="max-w-6xl mx-auto px-4 pb-16">
				<div className="text-center mb-6">
					<h3 className="text-2xl font-bold text-green-400">Community & Resources</h3>
					<p className="text-green-200 mt-2">
						Join a vibrant network of learners and mentors. Access blogs, success stories,
						upcoming webinars and recorded sessions.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-[#162236] p-6 rounded-xl text-green-100 shadow-md">
						<h4 className="font-semibold mb-2 text-green-400">Blogs & Guides</h4>
						<p>Step-by-step interview preparation articles and strategy write-ups.</p>
					</div>
					<div className="bg-[#162236] p-6 rounded-xl text-green-100 shadow-md">
						<h4 className="font-semibold mb-2 text-green-400">Success Stories</h4>
						<p>Read how fellow candidates cracked FAANG and top product companies.</p>
					</div>
					<div className="bg-[#162236] p-6 rounded-xl text-green-100 shadow-md">
						<h4 className="font-semibold mb-2 text-green-400">Upcoming Events</h4>
						<p>Weekly webinars, peer discussions, and live Q&A with experts.</p>
					</div>
				</div>
			</section>


			{/* Demo Video */}
			<section className="max-w-4xl mx-auto mb-16 px-4">
				<div className="rounded-2xl shadow-xl border-4 border-green-400 bg-[#17233e] flex flex-col items-center py-8 px-6">
					<h3 className="text-2xl font-bold mb-2 text-green-400">See the Platform in Action</h3>
					<p className="mb-4 text-green-200 text-lg text-center">
						Watch a quick demo walkthrough showing every step—company questions, practice, mentoring, and analytics.
					</p>
					<video
						src="/demo.mp4"
						poster="/demo-poster.png"
						controls
						className="w-full rounded-xl max-w-2xl border-2 border-green-300"
					/>
				</div>
			</section>


			{/* Call to Action */}
			<section className="py-10 text-center">
				<a
					href="/signup"
					className="inline-block px-9 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold text-xl shadow-lg transition hover:scale-105"
				>
					Start Practicing Free
				</a>
				<div className="mt-3 text-green-400 font-semibold">Book your first mock interview now!</div>
			</section>


			{/* Mobile CTA */}
			<div className="fixed left-0 bottom-0 w-full md:hidden z-40">
				<a
					href="/signup"
					className="block w-full text-center py-4 font-bold text-lg bg-green-600 text-white shadow-xl"
				>
					Start Practicing Free
				</a>
			</div>
		</div>
	);
};

export default HowItWorksPage;
