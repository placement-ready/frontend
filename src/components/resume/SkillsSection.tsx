import React from "react";
import { X } from "lucide-react";

interface SkillsSectionProps {
	skills: string[];
	newSkill: string;
	setNewSkill: (skill: string) => void;
	addSkill: () => void;
	removeSkill: (index: number) => void;
}

export const SkillsSection = React.memo<SkillsSectionProps>(
	({ skills, newSkill, setNewSkill, addSkill, removeSkill }) => (
		<div>
			<div className="flex items-center gap-2 mb-4">
				<input
					value={newSkill}
					onChange={(e) => setNewSkill(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && addSkill()}
					placeholder="e.g., JavaScript"
					className="flex-grow px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors caret-green-600"
				/>
				<button
					type="button"
					onClick={addSkill}
					className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
				>
					Add
				</button>
			</div>
			<div className="flex flex-wrap gap-2 pt-2">
				{skills.map((skill, i) => (
					<span
						key={`skill-${i}`}
						className="flex items-center gap-1.5 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
					>
						{skill}
						<button
							type="button"
							onClick={() => removeSkill(i)}
							className="text-green-600 hover:text-red-500"
						>
							<X size={14} />
						</button>
					</span>
				))}
				{skills.length === 0 && (
					<p className="text-sm text-gray-500 italic">No skills added yet.</p>
				)}
			</div>
		</div>
	)
);
SkillsSection.displayName = "SkillsSection";
