"use client";

import React, { useState, useCallback, useRef } from "react";
import ReactFlow, { Controls, MiniMap, Node, Edge, Background } from "reactflow";
import "reactflow/dist/style.css";
import { Search, FileImage, FileText, Globe, Smartphone, Brain } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

// Mock roadmap data for different fields
const roadmapData: Record<
	string,
	{ title: string; description: string; icon: React.ReactNode; nodes: Node[]; edges: Edge[] }
> = {
	"web-development": {
		title: "Web Development",
		description: "Frontend & Backend Development Path",
		icon: <Globe className="w-5 h-5" />,
		nodes: [
			{
				id: "start",
				data: { label: "Web Development Journey" },
				position: { x: 400, y: 50 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					border: "2px solid #059669",
					borderRadius: 12,
					fontWeight: 700,
					minWidth: 200,
					padding: 12,
					fontSize: 16,
				},
				type: "input",
			},
			{
				id: "basics",
				data: { label: "Web Basics" },
				position: { x: 400, y: 180 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "html",
				data: { label: "HTML5" },
				position: { x: 200, y: 300 },
				style: {
					background: "#e34c26",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "css",
				data: { label: "CSS3" },
				position: { x: 350, y: 300 },
				style: {
					background: "#1572b6",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "javascript",
				data: { label: "JavaScript" },
				position: { x: 500, y: 300 },
				style: {
					background: "#f7df1e",
					color: "#323330",
					borderRadius: 8,
					padding: 6,
					fontWeight: 600,
				},
			},
			{
				id: "git",
				data: { label: "Git & GitHub" },
				position: { x: 650, y: 300 },
				style: {
					background: "#f05032",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "frontend",
				data: { label: "Frontend Frameworks" },
				position: { x: 250, y: 450 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "backend",
				data: { label: "Backend Development" },
				position: { x: 550, y: 450 },
				style: {
					background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "react",
				data: { label: "React.js" },
				position: { x: 150, y: 580 },
				style: {
					background: "#61dafb",
					color: "#20232a",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "vue",
				data: { label: "Vue.js" },
				position: { x: 300, y: 580 },
				style: {
					background: "#4fc08d",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "node",
				data: { label: "Node.js" },
				position: { x: 450, y: 580 },
				style: {
					background: "#339933",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "python",
				data: { label: "Python" },
				position: { x: 600, y: 580 },
				style: {
					background: "#3776ab",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "database",
				data: { label: "Databases" },
				position: { x: 400, y: 720 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "deployment",
				data: { label: "Deployment & DevOps" },
				position: { x: 400, y: 850 },
				style: {
					background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
		],
		edges: [
			{
				id: "e1",
				source: "start",
				target: "basics",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{
				id: "e2",
				source: "basics",
				target: "html",
				type: "smoothstep",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e3",
				source: "basics",
				target: "css",
				type: "smoothstep",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e4",
				source: "basics",
				target: "javascript",
				type: "smoothstep",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e5",
				source: "basics",
				target: "git",
				type: "smoothstep",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e6",
				source: "javascript",
				target: "frontend",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e7",
				source: "javascript",
				target: "backend",
				animated: true,
				style: { stroke: "#059669", strokeWidth: 2 },
			},
			{ id: "e8", source: "frontend", target: "react", type: "smoothstep" },
			{ id: "e9", source: "frontend", target: "vue", type: "smoothstep" },
			{ id: "e10", source: "backend", target: "node", type: "smoothstep" },
			{ id: "e11", source: "backend", target: "python", type: "smoothstep" },
			{
				id: "e12",
				source: "backend",
				target: "database",
				animated: true,
				style: { stroke: "#059669", strokeWidth: 2 },
			},
			{
				id: "e13",
				source: "database",
				target: "deployment",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
		],
	},
	"mobile-development": {
		title: "Mobile Development",
		description: "iOS & Android Development Path",
		icon: <Smartphone className="w-5 h-5" />,
		nodes: [
			{
				id: "mobile-start",
				data: { label: "Mobile Development" },
				position: { x: 400, y: 50 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					border: "2px solid #059669",
					borderRadius: 12,
					fontWeight: 700,
					minWidth: 200,
					padding: 12,
				},
				type: "input",
			},
			{
				id: "native",
				data: { label: "Native Development" },
				position: { x: 250, y: 200 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "cross-platform",
				data: { label: "Cross Platform" },
				position: { x: 550, y: 200 },
				style: {
					background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "android",
				data: { label: "Android (Kotlin)" },
				position: { x: 150, y: 350 },
				style: { background: "#3ddc84", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "ios",
				data: { label: "iOS (Swift)" },
				position: { x: 350, y: 350 },
				style: { background: "#007aff", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "react-native",
				data: { label: "React Native" },
				position: { x: 450, y: 350 },
				style: { background: "#61dafb", color: "#20232a", borderRadius: 8, padding: 6 },
			},
			{
				id: "flutter",
				data: { label: "Flutter" },
				position: { x: 600, y: 350 },
				style: { background: "#02569b", color: "white", borderRadius: 8, padding: 6 },
			},
		],
		edges: [
			{
				id: "me1",
				source: "mobile-start",
				target: "native",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{
				id: "me2",
				source: "mobile-start",
				target: "cross-platform",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{ id: "me3", source: "native", target: "android", type: "smoothstep" },
			{ id: "me4", source: "native", target: "ios", type: "smoothstep" },
			{ id: "me5", source: "cross-platform", target: "react-native", type: "smoothstep" },
			{ id: "me6", source: "cross-platform", target: "flutter", type: "smoothstep" },
		],
	},
	"data-science": {
		title: "Data Science",
		description: "AI/ML & Data Analysis Path",
		icon: <Brain className="w-5 h-5" />,
		nodes: [
			{
				id: "ds-start",
				data: { label: "Data Science Journey" },
				position: { x: 400, y: 50 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					border: "2px solid #059669",
					borderRadius: 12,
					fontWeight: 700,
					minWidth: 200,
					padding: 12,
				},
				type: "input",
			},
			{
				id: "python-ds",
				data: { label: "Python Programming" },
				position: { x: 200, y: 200 },
				style: { background: "#3776ab", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "statistics",
				data: { label: "Statistics & Math" },
				position: { x: 400, y: 200 },
				style: { background: "#ff6b6b", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "sql",
				data: { label: "SQL & Databases" },
				position: { x: 600, y: 200 },
				style: { background: "#4ecdc4", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "ml",
				data: { label: "Machine Learning" },
				position: { x: 300, y: 350 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "dl",
				data: { label: "Deep Learning" },
				position: { x: 500, y: 350 },
				style: {
					background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
		],
		edges: [
			{
				id: "dse1",
				source: "ds-start",
				target: "python-ds",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{
				id: "dse2",
				source: "ds-start",
				target: "statistics",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{
				id: "dse3",
				source: "ds-start",
				target: "sql",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{ id: "dse4", source: "python-ds", target: "ml", type: "smoothstep" },
			{ id: "dse5", source: "statistics", target: "ml", type: "smoothstep" },
			{
				id: "dse6",
				source: "ml",
				target: "dl",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
		],
	},
};

const RoadmapPlatform: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedRoadmap, setSelectedRoadmap] = useState<keyof typeof roadmapData>("web-development");
	const flowRef = useRef<HTMLDivElement>(null);

	const filteredRoadmaps = Object.entries(roadmapData).filter(
		([key, roadmap]) =>
			roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			key.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const currentRoadmap = roadmapData[selectedRoadmap];

	const downloadImage = useCallback(async (format: "png" | "pdf") => {
		if (!flowRef.current) return;

		const dataUrl = await toPng(flowRef.current, { cacheBust: true });
		if (format === "png") {
			const a = document.createElement("a");
			a.href = dataUrl;
			a.download = `${selectedRoadmap}-roadmap.png`;
			a.click();
		} else { // pdf
			const pdf = new jsPDF({
				orientation: "landscape",
				unit: "px",
				format: [flowRef.current.offsetWidth, flowRef.current.offsetHeight],
			});
			pdf.addImage(
				dataUrl,
				"PNG",
				0,
				0,
				flowRef.current.offsetWidth,
				flowRef.current.offsetHeight
			);
			pdf.save(`${selectedRoadmap}-roadmap.pdf`);
		}
	}, [selectedRoadmap]);

	const isVisible = true;

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-gray-800">
			<div className="max-w-7xl mx-auto px-4 py-6">
				<header className="mb-10 text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight text-center">
						<span className="relative inline-block">
							<span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-200 bg-clip-text text-transparent">
								Learning Roadmaps
							</span>
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: isVisible ? 1 : 0 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 to-green-200 rounded-full origin-left"
							/>
						</span>
					</h1>
					<p className="mt-2 text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
						Interactive roadmaps to guide your learning journey in various tech fields
					</p>
				</header>

				<div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
					<div className="relative w-full md:w-1/3">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
						<input
							type="text"
							placeholder="Search roadmaps..."
							className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="flex gap-3 justify-center md:justify-start">
						<button
							onClick={() => downloadImage("png")}
							className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg px-4 py-2 shadow-lg hover:from-green-600 hover:to-emerald-700 transition"
						>
							<FileImage size={16} />
							<span>Download PNG</span>
						</button>
						<button
							onClick={() => downloadImage("pdf")}
							className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg px-4 py-2 shadow-lg hover:from-emerald-600 hover:to-green-700 transition"
						>
							<FileText size={16} />
							<span>Download PDF</span>
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
					{filteredRoadmaps.map(([key, roadmap]) => (
						<button
							key={key}
							onClick={() => setSelectedRoadmap(key as keyof typeof roadmapData)}
							className={`p-6 rounded-lg shadow-lg transition transform ${selectedRoadmap === key
									? "bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105 shadow-2xl"
									: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700"
								}`}
							aria-pressed={selectedRoadmap === key}
						>
							<div className="mb-4 flex justify-center">{roadmap.icon}</div>
							<h3 className="text-lg font-semibold">{roadmap.title}</h3>
							<p className="mt-1 text-sm">{roadmap.description}</p>
						</button>
					))}
				</div>

				<section className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden max-w-full mx-auto">
					<header className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 flex items-center gap-4">
						{currentRoadmap.icon}
						<h2 className="text-2xl font-bold">{currentRoadmap.title} Roadmap</h2>
					</header>

					<div ref={flowRef} className="h-[600px] md:h-[700px]">
						<ReactFlow
							nodes={currentRoadmap.nodes}
							edges={currentRoadmap.edges}
							fitView
							nodesDraggable={false}
							nodesConnectable={false}
							zoomOnScroll={true}
							panOnDrag={true}
							className="bg-white dark:bg-gray-900"
						>
							<Background color={currentRoadmap.nodes.length > 0 ? "#e2e8f0" : undefined} gap={20} />
							<Controls className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700" />
							<MiniMap
								nodeColor="#10b981"
								maskColor="rgba(16, 185, 129, 0.1)"
								className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
								style={{ width: 150, height: 100 }}
							/>
						</ReactFlow>
					</div>
				</section>

				<section className="mt-10 max-w-7xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-700 text-gray-700 dark:text-gray-300">
					<h3 className="text-xl font-semibold mb-5">💡 Learning Tips</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<article className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
							<h4 className="font-semibold mb-2">🎯 Follow the Path</h4>
							<p>Follow the roadmap sequentially for best results.</p>
						</article>
						<article className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
							<h4 className="font-semibold mb-2">🛠️ Practice Projects</h4>
							<p>Build projects at each milestone to reinforce learning.</p>
						</article>
						<article className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
							<h4 className="font-semibold mb-2">📚 Additional Resources</h4>
							<p>Use

								documentation, tutorials, and courses as supplements.</p>
						</article>
					</div>
				</section>
			</div>
		</div>
	);
};

export default RoadmapPlatform;
