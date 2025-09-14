"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useGetTemplates } from "@/lib/queries/resume";

export default function TemplatesPage() {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [sort, setSort] = useState("az");
	const router = useRouter();

	const { data: templatesData, isLoading, error } = useGetTemplates();

	// temp
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading templates</div>;

	// Filter & sort templates
	const filteredTemplates = templatesData?.data
		.filter((template) => template.title.toLowerCase().includes(search.toLowerCase()))
		.filter((template) => (filter === "All" ? true : template.preferredBy.includes(filter)))
		.sort((a, b) => {
			if (sort === "az") return a.title.localeCompare(b.title);
			if (sort === "za") return b.title.localeCompare(a.title);
			return 0;
		});

	return (
		<div className="flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
			<div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="mb-6">
						<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent">
							Choose a Resume Template
						</h1>
						<p className="text-gray-600 mt-2">
							Select from our collection of professionally designed templates
						</p>
					</div>
					<div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-200">
						<div className="flex flex-col lg:flex-row gap-4">
							{/* Search */}
							<div className="relative flex-1">
								<FaSearch className="h-5 w-5 text-green-500 absolute top-3.5 left-4 z-10" />
								<input
									type="text"
									placeholder="Search templates..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
								/>
							</div>
							{/* Filters */}
							<select
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
								className="border-2 border-green-200 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-w-[160px]"
							>
								<option value="All">All Categories</option>
								<option value="Professional">Professional</option>
								<option value="Creative">Creative</option>
								<option value="Simple">Simple</option>
							</select>
							{/* Sort */}
							<select
								value={sort}
								onChange={(e) => setSort(e.target.value)}
								className="border-2 border-green-200 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-w-[140px]"
							>
								<option value="az">Sort A–Z</option>
								<option value="za">Sort Z–A</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			{/* Template Grid */}
			<div className="flex-1 overflow-y-auto bg-white/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{filteredTemplates && filteredTemplates.length > 0 ? (
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
							{filteredTemplates.map((template) => (
								<div
									key={template._id}
									className="group bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-green-300 overflow-hidden"
								>
									{/* Image */}
									<div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
										<Image
											src={template.link}
											alt={template.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-100"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.src = "/default-template.png"; // fallback image
											}}
										/>
									</div>

									{/* Info & Button */}
									<div className="p-5">
										<h2 className="font-bold text-lg">{template.title}</h2>
										<p className="text-sm text-gray-600 mb-4">{template.description}</p>
										<button
											onClick={() =>
												router.push(`/dashboard/resume/create?templateId=${template._id}`)
											}
											className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg font-semibold"
										>
											Use Template
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-20 text-center bg-white/60 backdrop-blur-sm border-2 border-dashed border-green-300 rounded-2xl">
							<div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
								<svg
									className="w-10 h-10 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-800 mb-2">No templates found</h3>
							<p className="text-gray-600 mb-6 max-w-md">
								Try adjusting your search criteria or filters to find templates.
							</p>
							<button
								onClick={() => {
									setSearch("");
									setFilter("All");
								}}
								className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl"
							>
								Clear All Filters
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
