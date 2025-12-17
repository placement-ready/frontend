'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Download,
  Play,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { resumeApi } from '@/features/resume/api';
import type { ResumeData } from '@/types/api/common';
import {
  PersonalInfoSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  AchievementsSection,
  PreviewPlaceholder,
} from '@/features/resume/components';
import type { ResumeExperience, ResumeEducation } from '@/features/resume/components/types';

// Unique ID generator
const generateUniqueId = (() => {
  let counter = 1;
  return () => counter++;
})();

type PageId = 'personal' | 'experience' | 'education' | 'skills' | 'achievements';

// Header component for resume name and status
const ResumeHeader = React.memo<{
  name: string;
  status: 'draft' | 'complete';
  updateName: (name: string) => void;
  updateStatus: (status: 'draft' | 'complete') => void;
}>(({ name, status, updateName, updateStatus }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200">
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex-grow">
        <label className="block text-sm font-medium text-gray-700 mb-2">Resume Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => updateName(e.target.value)}
          placeholder="My Software Engineer Resume"
          className="w-full max-w-md px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors caret-green-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => updateStatus(e.target.value as 'draft' | 'complete')}
          className="px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
        >
          <option value="draft">Draft</option>
          <option value="complete">Complete</option>
        </select>
      </div>
    </div>
  </div>
));
ResumeHeader.displayName = 'ResumeHeader';

const ResumeBuilder: React.FC = () => {
  let { resumeId } = useParams();
  resumeId = Array.isArray(resumeId) ? resumeId[0] : resumeId;

  const [currentPage, setCurrentPage] = useState<PageId>('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const [resumeDetails, setResumeDetails] = useState<ResumeData>({
    _id: resumeId || '',
    name: 'Untitled Resume',
    status: 'draft',
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
    experience: [
      {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    education: [
      {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
      },
    ],
    skills: [],
    achievements: [],
    template: '',
  });

  const [experienceList, setExperienceList] = useState<ResumeExperience[]>([
    {
      id: generateUniqueId(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ]);

  const [educationList, setEducationList] = useState<ResumeEducation[]>([
    {
      id: generateUniqueId(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
    },
  ]);

  const [newSkill, setNewSkill] = useState<string>('');
  const [newAchievement, setNewAchievement] = useState<string>('');

  const pages = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ] as const;

  const currentPageIndex = pages.findIndex((page) => page.id === currentPage);
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pages.length - 1;

  const goToNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(pages[currentPageIndex + 1].id);
    }
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      setCurrentPage(pages[currentPageIndex - 1].id);
    }
  };

  useEffect(() => {
    if (!resumeId) {
      setIsLoading(false);
      setLoadError('Missing resume identifier.');
      return;
    }

    let active = true;

    const fetchResume = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await resumeApi.getResumeById(resumeId);
        if (!active) return;
        setResumeDetails(response.data);
      } catch (err) {
        if (!active) return;
        console.error('Failed to load resume details', err);
        setLoadError(err instanceof Error ? err.message : 'Failed to load resume');
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchResume();

    return () => {
      active = false;
    };
  }, [resumeId]);

  const compileResume = useCallback(async () => {
    if (!resumeId) return;
    setIsCompiling(true);
    try {
      await resumeApi.updateResume(resumeDetails);
      const result = await resumeApi.compileResume(resumeDetails);
      setHtmlPreview(result.data);
      setShowPreview(true);
    } catch (error) {
      console.error('Error compiling resume:', error);
    } finally {
      setIsCompiling(false);
    }
  }, [resumeDetails, resumeId]);

  const downloadPDF = useCallback(() => {
    if (!showPreview || !htmlPreview) return;

    // Create a new window with the HTML content for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
			<!DOCTYPE html>
			<html>
				<head>
					<title>${resumeDetails.fullName || resumeDetails.name || 'Resume'}</title>
					<style>
						@media print {
							body { margin: 0; }
							@page { margin: 0.5in; }
						}
						body { font-family: Arial, sans-serif; }
					</style>
				</head>
				<body>
					${htmlPreview}
				</body>
			</html>
		`);

    printWindow.document.close();
    printWindow.focus();

    // Trigger print dialog
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }, [showPreview, htmlPreview, resumeDetails]);

  // Update functions
  const updateField = useCallback((field: string, value: string) => {
    setResumeDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateName = useCallback((name: string) => {
    setResumeDetails((prev) => ({
      ...prev,
      name: name,
    }));
  }, []);

  const updateStatus = useCallback((status: 'draft' | 'complete') => {
    setResumeDetails((prev) => ({
      ...prev,
      status: status,
    }));
  }, []);

  const updateExperience = useCallback(
    (id: number, field: keyof ResumeExperience, value: string | boolean) => {
      setExperienceList((prev) =>
        prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
      );

      // Update the main resume data
      setResumeDetails((prev) => ({
        ...prev,
        experience: experienceList.map((exp) =>
          exp.id === id
            ? {
                jobTitle: field === 'jobTitle' ? (value as string) : exp.jobTitle,
                company: field === 'company' ? (value as string) : exp.company,
                location: field === 'location' ? (value as string) : exp.location,
                startDate: field === 'startDate' ? (value as string) : exp.startDate,
                endDate: field === 'endDate' ? (value as string) : exp.endDate,
                description: field === 'description' ? (value as string) : exp.description,
              }
            : {
                jobTitle: exp.jobTitle,
                company: exp.company,
                location: exp.location,
                startDate: exp.startDate,
                endDate: exp.endDate,
                description: exp.description,
              },
        ),
      }));
    },
    [experienceList],
  );

  const addExperience = useCallback(() => {
    const newExp = {
      id: generateUniqueId(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setExperienceList((prev) => [...prev, newExp]);

    setResumeDetails((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  }, []);

  const removeExperience = useCallback(
    (id: number) => {
      setExperienceList((prev) => prev.filter((e) => e.id !== id));
      setResumeDetails((prev) => ({
        ...prev,
        experience: prev.experience.filter((_, index) => experienceList[index]?.id !== id),
      }));
    },
    [experienceList],
  );

  const updateEducation = useCallback(
    (id: number, field: keyof ResumeEducation, value: string) => {
      setEducationList((prev) =>
        prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
      );

      // Update the main resume data
      setResumeDetails((prev) => ({
        ...prev,
        education: educationList.map((edu) =>
          edu.id === id
            ? {
                institution: field === 'institution' ? value : edu.institution,
                degree: field === 'degree' ? value : edu.degree,
                fieldOfStudy: field === 'fieldOfStudy' ? value : edu.fieldOfStudy,
                startDate: field === 'startDate' ? value : edu.startDate,
                endDate: field === 'endDate' ? value : edu.endDate,
              }
            : {
                institution: edu.institution,
                degree: edu.degree,
                fieldOfStudy: edu.fieldOfStudy,
                startDate: edu.startDate,
                endDate: edu.endDate,
              },
        ),
      }));
    },
    [educationList],
  );

  const addEducation = useCallback(() => {
    const newEdu = {
      id: generateUniqueId(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    setEducationList((prev) => [...prev, newEdu]);

    setResumeDetails((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
        },
      ],
    }));
  }, []);

  const removeEducation = useCallback(
    (id: number) => {
      setEducationList((prev) => prev.filter((e) => e.id !== id));
      setResumeDetails((prev) => ({
        ...prev,
        education: prev.education.filter((_, index) => educationList[index]?.id !== id),
      }));
    },
    [educationList],
  );

  const addSkill = useCallback(() => {
    if (newSkill.trim()) {
      setResumeDetails((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  }, [newSkill]);

  const removeSkill = useCallback((index: number) => {
    setResumeDetails((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  }, []);

  const addAchievement = useCallback(() => {
    if (newAchievement.trim()) {
      setResumeDetails((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }));
      setNewAchievement('');
    }
  }, [newAchievement]);

  const removeAchievement = useCallback((index: number) => {
    setResumeDetails((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  }, []);
  const generateAISuggestion = useCallback((type: 'summary' | 'description') => {
    const suggestions = {
      summary:
        'Results-driven professional with over 5 years of experience in software development, specializing in creating high-impact solutions and optimizing user experiences. Proven ability to lead cross-functional teams and exceed project targets.',
      description:
        '• Spearheaded the development of a new client-facing feature, resulting in a 15% increase in user engagement.\n• Implemented agile methodologies that improved team productivity by 25%.\n• Mentored junior developers, fostering a culture of continuous learning and growth.',
    };
    return suggestions[type];
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{loadError}</p>
      </div>
    );
  }

  return (
    <main className="max-w-screen-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-2 text-gray-600">
              Create your professional resume with our intuitive builder
            </p>
            {/* {templateData?.data && (
							<p className="text-sm text-green-600 font-medium">
								Using template: {templateData.data[0]?.title || "Selected Template"}
							</p>
						)} */}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={compileResume}
              disabled={isCompiling}
              className="flex items-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 transition-colors"
            >
              {isCompiling ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Compiling...
                </>
              ) : (
                <>
                  <Play size={16} /> Compile Resume
                </>
              )}
            </button>
            <button
              onClick={downloadPDF}
              disabled={!showPreview}
              className="flex items-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              <Download size={16} /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Resume Header */}
      <ResumeHeader
        name={resumeDetails.name}
        status={resumeDetails.status}
        updateName={updateName}
        updateStatus={updateStatus}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        {/* Form Editor */}
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg mb-8 lg:mb-0">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                {React.createElement(pages[currentPageIndex].icon, { size: 20 })}
                {pages[currentPageIndex].label}
              </h2>
              <div className="text-sm text-gray-500">
                Page {currentPageIndex + 1} of {pages.length}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="mb-8">
            {currentPage === 'personal' && (
              <PersonalInfoSection
                fullName={resumeDetails.fullName}
                email={resumeDetails.email}
                phone={resumeDetails.phone}
                location={resumeDetails.location}
                website={resumeDetails.website}
                summary={resumeDetails.summary}
                updateField={updateField}
                generateAISuggestion={generateAISuggestion}
              />
            )}
            {currentPage === 'experience' && (
              <ExperienceSection
                experience={experienceList}
                updateExperience={updateExperience}
                addExperience={addExperience}
                removeExperience={removeExperience}
                generateAISuggestion={generateAISuggestion}
              />
            )}
            {currentPage === 'education' && (
              <EducationSection
                education={educationList}
                updateEducation={updateEducation}
                addEducation={addEducation}
                removeEducation={removeEducation}
              />
            )}
            {currentPage === 'skills' && (
              <SkillsSection
                skills={resumeDetails.skills}
                newSkill={newSkill}
                setNewSkill={setNewSkill}
                addSkill={addSkill}
                removeSkill={removeSkill}
              />
            )}
            {currentPage === 'achievements' && (
              <AchievementsSection
                achievements={resumeDetails.achievements}
                newAchievement={newAchievement}
                setNewAchievement={setNewAchievement}
                addAchievement={addAchievement}
                removeAchievement={removeAchievement}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              onClick={goToPreviousPage}
              disabled={isFirstPage}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex gap-2">
              {pages.map((page, index) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPageIndex ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={page.label}
                />
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={isLastPage}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="hidden lg:block">
          <div className="lg:sticky top-24">
            <div className="h-[calc(100vh-120px)] w-full bg-white rounded-2xl shadow-lg overflow-y-auto border border-gray-200 p-6">
              {showPreview ? (
                <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
              ) : (
                <PreviewPlaceholder compileResume={compileResume} isCompiling={isCompiling} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Section */}
      <div className="lg:hidden mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Resume Preview</h2>
          </div>
          <div className="min-h-[400px]">
            {showPreview ? (
              <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
            ) : (
              <PreviewPlaceholder compileResume={compileResume} isCompiling={isCompiling} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;
