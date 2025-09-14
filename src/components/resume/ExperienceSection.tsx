import React from "react";
import { Plus, X } from "lucide-react";
import { Input, Textarea } from "./FormComponents";
import { ResumeExperience } from "./types";

interface ExperienceSectionProps {
	experience: ResumeExperience[];
	updateExperience: (id: number, field: keyof ResumeExperience, value: string | boolean) => void;
	addExperience: () => void;
	removeExperience: (id: number) => void;
	generateAISuggestion: (type: "summary" | "description") => string;
}

export const ExperienceSection = React.memo<ExperienceSectionProps>(
	({ experience, updateExperience, addExperience, removeExperience, generateAISuggestion }) => (
		<div className="space-y-6">
			{experience.map((exp) => (
				<div
					key={exp.id}
					className="bg-white rounded-lg p-5 border border-gray-200 relative space-y-4"
				>
					{experience.length > 1 && (
						<button
							onClick={() => removeExperience(exp.id)}
							className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
						>
							<X size={18} />
						</button>
					)}
					<Input
						label="Job Title *"
						value={exp.jobTitle}
						onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
						placeholder="Software Engineer"
					/>
					<Input
						label="Company *"
						value={exp.company}
						onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
						placeholder="Tech Solutions Inc."
					/>
					<Input
						label="Location"
						value={exp.location}
						onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
						placeholder="San Francisco, CA"
					/>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<Input
							label="Start Date"
							type="month"
							value={exp.startDate}
							onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
						/>
						<Input
							label="End Date"
							type="month"
							value={exp.endDate}
							onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
							disabled={exp.current}
						/>
					</div>
					<label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
						<input
							type="checkbox"
							checked={exp.current}
							onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
							className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
						/>
						Currently work here
					</label>
					<Textarea
						label="Description & Achievements"
						value={exp.description}
						onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
						placeholder="Describe your responsibilities and achievements..."
						rows={5}
						aiClick={() =>
							updateExperience(exp.id, "description", generateAISuggestion("description"))
						}
					/>
				</div>
			))}
			<button
				onClick={addExperience}
				className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
			>
				<Plus size={16} /> Add Experience
			</button>
		</div>
	)
);
ExperienceSection.displayName = "ExperienceSection";
