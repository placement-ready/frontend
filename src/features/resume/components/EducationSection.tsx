import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from './FormComponents';
import { ResumeEducation } from './types';

interface EducationSectionProps {
  education: ResumeEducation[];
  updateEducation: (id: number, field: keyof ResumeEducation, value: string) => void;
  addEducation: () => void;
  removeEducation: (id: number) => void;
}

export const EducationSection = React.memo<EducationSectionProps>(
  ({ education, updateEducation, addEducation, removeEducation }) => (
    <div className="space-y-6">
      {education.map((edu) => (
        <div
          key={edu.id}
          className="bg-white rounded-lg p-5 border border-gray-200 relative space-y-4"
        >
          {education.length > 1 && (
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          )}
          <Input
            label="Degree/Qualification *"
            value={edu.degree}
            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
            placeholder="B.Sc. in Computer Science"
          />
          <Input
            label="School/University *"
            value={edu.institution}
            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
            placeholder="University of Technology"
          />
          <Input
            label="Field of Study"
            value={edu.fieldOfStudy}
            onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
            placeholder="Computer Science"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
            />
            <Input
              label="End Date"
              type="month"
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
            />
          </div>
          <Input
            label="GPA (Optional)"
            value={edu.gpa}
            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
            placeholder="3.8 / 4.0"
          />
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
      >
        <Plus size={16} /> Add Education
      </button>
    </div>
  ),
);
EducationSection.displayName = 'EducationSection';
