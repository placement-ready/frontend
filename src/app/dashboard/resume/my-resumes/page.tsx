"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Eye,
	Edit,
	Trash2,
	Search,
	Download,
	Plus,
	Calendar,
	Filter,
	SortAsc,
	FileText,
	Loader2,
} from "lucide-react";
import { useGetResumes, useDeleteResume } from "@/lib/queries";

export default function ResumeDashboardPage() {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<"All" | "Draft" | "Complete">("All");
	const [sort, setSort] = useState<"recent" | "az">("recent");
	const router = useRouter();
	const { data: resumesResponse, isLoading, isError } = useGetResumes();
	const resumes = resumesResponse?.data || [];
	const deleteResume = useDeleteResume();

	// Handlers
	const handleDelete = async (id?: string) => {
		if (!id) return;
		if (confirm("Are you sure you want to delete this resume?")) {
			await deleteResume.mutateAsync(id);
		}
	};

	// Render loading, error states

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<Loader2 className="animate-spin h-8 w-8 text-green-600" />
				<span className="ml-2 text-gray-600">Loading resumes...</span>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex items-center justify-center h-64">
				<p className="text-red-500">Failed to load resumes. Please try again later.</p>
			</div>
		);
	}

	const filteredResumes = resumes
		.filter(
			(resume) =>
				resume.fullName.toLowerCase().includes(search.toLowerCase()) ||
				resume.name.toLowerCase().includes(search.toLowerCase()) ||
				resume.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
		)
		.filter((resume) => filter === "All" || resume.status === filter.toLowerCase())
		.sort((a, b) => {
			if (sort === "recent") {
				return new Date(b.updatedAt ?? "").getTime() - new Date(a.updatedAt ?? "").getTime();
			}
			return a.fullName.localeCompare(b.fullName);
		});

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-6">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Header */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
					<div>
						<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent">
							My Resumes
						</h1>
						<p className="text-gray-600 mt-2">Manage and organize all your professional resumes</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-3">
						<button
							onClick={() => router.push("/dashboard/resume/create")}
							className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
						>
							<Plus size={20} />
							Create New Resume
						</button>
						<button
							onClick={() => router.push("/dashboard/resume/templates")}
							className="px-6 py-3 border-2 border-green-200 text-green-700 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-300 font-semibold backdrop-blur-sm bg-white/70"
						>
							Browse Templates
						</button>
					</div>
				</div>

				{/* Statistics */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Total Resumes</p>
								<p className="text-3xl font-bold text-green-600">{resumes.length}</p>
							</div>
							<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
								<FileText className="w-6 h-6 text-green-600" />
							</div>
						</div>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Complete</p>
								<p className="text-3xl font-bold text-green-600">
									{resumes.filter((r) => r.status === "complete").length}
								</p>
							</div>
							<div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
								<Eye className="w-6 h-6 text-green-600" />
							</div>
						</div>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Draft</p>
								<p className="text-3xl font-bold text-yellow-600">
									{resumes.filter((r) => r.status === "draft").length}
								</p>
							</div>
							<div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
								<Edit className="w-6 h-6 text-yellow-600" />
							</div>
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="h-5 w-5 text-green-500 absolute top-3.5 left-4 z-10" />
							<input
								type="text"
								placeholder="Search resumes by name or skills..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
							/>
						</div>
						<div className="flex gap-4">
							<div className="relative">
								<Filter className="h-4 w-4 text-green-600 absolute top-3.5 left-3 z-10" />
								<select
									value={filter}
									onChange={(e) => setFilter(e.target.value as "All" | "Draft" | "Complete")}
									className="appearance-none border-2 border-green-200 rounded-xl pl-10 pr-8 py-3 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-w-[140px]"
								>
									<option value="All">All Status ({resumes.length})</option>
									<option value="draft">
										Draft ({resumes.filter((r) => r.status === "draft").length})
									</option>
									<option value="complete">
										Complete ({resumes.filter((r) => r.status === "complete").length})
									</option>
								</select>
							</div>
							<div className="relative">
								<SortAsc className="h-4 w-4 text-green-600 absolute top-3.5 left-3 z-10" />
								<select
									value={sort}
									onChange={(e) => setSort(e.target.value as "recent" | "az")}
									className="appearance-none border-2 border-green-200 rounded-xl pl-10 pr-8 py-3 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-w-[160px]"
								>
									<option value="recent">Most Recent</option>
									<option value="az">A-Z</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Resume Table */}
				{filteredResumes.length > 0 ? (
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<p className="text-sm text-gray-600">
								Showing{" "}
								<span className="font-semibold text-green-600">{filteredResumes.length}</span> of{" "}
								<span className="font-semibold">{resumes.length}</span> resumes
							</p>
						</div>
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200 overflow-hidden">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
										<tr>
											<th className="px-6 py-4 text-left text-sm font-semibold">Resume Name</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">Skills</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">Last Updated</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-green-100">
										{filteredResumes.map((resume, index) => (
											<tr
												key={resume._id}
												className={`hover:bg-green-50/50 transition-colors duration-200 ${
													index % 2 === 0 ? "bg-white/50" : "bg-green-50/20"
												}`}
											>
												<td className="px-6 py-4">
													<div className="flex items-center gap-3">
														<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
															<FileText className="w-5 h-5 text-green-600" />
														</div>
														<div>
															<div className="font-semibold text-gray-900">{resume.name}</div>
															<div className="text-sm text-gray-500">{resume.fullName}</div>
															<div className="text-xs text-gray-400">{resume.email}</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="flex flex-wrap gap-1">
														{resume.skills.slice(0, 3).map((skill, skillIndex) => (
															<span
																key={skillIndex}
																className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
															>
																{skill}
															</span>
														))}
														{resume.skills.length > 3 && (
															<span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
																+{resume.skills.length - 3}
															</span>
														)}
													</div>
												</td>
												<td className="px-6 py-4">
													<span
														className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
															resume.status === "draft"
																? "bg-yellow-100 text-yellow-800 border border-yellow-200"
																: "bg-green-100 text-green-800 border border-green-200"
														}`}
													>
														<div
															className={`w-2 h-2 rounded-full mr-2 ${
																resume.status === "draft" ? "bg-yellow-500" : "bg-green-500"
															}`}
														></div>
														{resume.status}
													</span>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-2 text-sm text-gray-600">
														<Calendar className="w-4 h-4" />
														{formatDate(resume.updatedAt ?? "")}
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-2">
														<button
															onClick={() =>
																router.push(`/dashboard/resume/create?resumeId=${resume._id}`)
															}
															className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
															title="Edit Resume"
														>
															<Edit className="w-4 h-4" />
														</button>
														<button
															className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
															title="Preview Resume"
														>
															<Eye className="w-4 h-4" />
														</button>
														<button
															className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors duration-200"
															title="Download Resume"
														>
															<Download className="w-4 h-4" />
														</button>
														<button
															onClick={() => handleDelete(resume._id)}
															className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
															title="Delete Resume"
														>
															<Trash2 className="w-4 h-4" />
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				) : (
					// Empty State
					<div className="flex flex-col items-center justify-center py-20 text-center bg-white/60 backdrop-blur-sm border-2 border-dashed border-green-300 rounded-2xl">
						<div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
							<FileText className="w-10 h-10 text-green-600" />
						</div>
						<h3 className="text-xl font-bold text-gray-800 mb-2">No resumes found</h3>
						<p className="text-gray-600 mb-6 max-w-md">
							{search || filter !== "All"
								? "Try adjusting your search criteria or filters to find resumes."
								: "Start by creating your first professional resume with our easy-to-use builder."}
						</p>
						<button
							onClick={() => router.push("/dashboard/resume/create")}
							className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
						>
							<Plus size={20} />
							Create Your First Resume
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
