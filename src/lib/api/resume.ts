import { api } from "./client";
import { ResumeData, ResumeResponse, TemplateResponse } from "@/types/api/common";

// Resume API endpoints
export const resumeApi = {
	// Get all resumes for the user
	getResumes: () => api.get<{ data: ResumeData[]; message: string }>(`/resume`),

	// Get resume by ID
	getResumeById: (id: string) => api.get<ResumeResponse>(`/resume/${id}`),

	// Update or create resume
	updateResume: (resumeData: Partial<ResumeData>) =>
		api.post<ResumeResponse>(`/resume`, resumeData),

	// Get all templates
	getTemplates: () => api.get<TemplateResponse>(`/templates`),

	// Get template by ID
	getTemplateById: (id: string) => api.get<TemplateResponse>(`/templates/${id}`),

	// Compile resume to HTML
	compileResume: (data: ResumeData) => api.post<{ html: string }>(`/resume/compile`, data),
};
