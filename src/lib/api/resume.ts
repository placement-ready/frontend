import { api } from "./client";
import { ResumeData, ResumeResponse, TemplateResponse } from "@/types/api/common";

// Resume API endpoints
export const resumeApi = {
	// Get all resumes for the user
	getResumes: () => api.get<{ data: ResumeData[]; message: string }>(`/resume`),

	// Get resume by ID
	getResumeById: (id: string) => api.get<ResumeResponse>(`/resume/${id}`),

	// Create resume
	createResume: (resumeData: Partial<ResumeData>) =>
		api.post<ResumeResponse>(`/resume`, resumeData),

	// Update resume
	updateResume: (resumeData: Partial<ResumeData>) => api.put<ResumeResponse>(`/resume`, resumeData),

	// Delete resume
	deleteResume: (id: string) => api.delete<{ message: string }>(`/resume/${id}`),

	// Get all templates
	getTemplates: () => api.get<TemplateResponse>(`/templates`),

	// Get template by ID
	getTemplateById: (id: string) => api.get<TemplateResponse>(`/templates/${id}`),

	// Compile resume to HTML
	compileResume: (data: ResumeData) =>
		api.post<{ message: string; data: string }>(`/resume/compile`, { data }),
};
