import React from 'react';
import { X } from 'lucide-react';

interface AchievementsSectionProps {
  achievements: string[];
  newAchievement: string;
  setNewAchievement: (achievement: string) => void;
  addAchievement: () => void;
  removeAchievement: (index: number) => void;
}

export const AchievementsSection = React.memo<AchievementsSectionProps>(
  ({ achievements, newAchievement, setNewAchievement, addAchievement, removeAchievement }) => (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input
          value={newAchievement}
          onChange={(e) => setNewAchievement(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addAchievement()}
          placeholder="e.g., Won 'Best Project' award"
          className="flex-grow px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors caret-green-600"
        />
        <button
          type="button"
          onClick={addAchievement}
          className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          Add
        </button>
      </div>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {achievements.map((ach, i) => (
          <li key={`achievement-${i}`} className="flex justify-between items-center text-sm">
            <span>{ach}</span>
            <button
              type="button"
              onClick={() => removeAchievement(i)}
              className="text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </li>
        ))}
        {achievements.length === 0 && (
          <p className="text-sm text-gray-500 italic">No achievements added yet.</p>
        )}
      </ul>
    </div>
  ),
);
AchievementsSection.displayName = 'AchievementsSection';
