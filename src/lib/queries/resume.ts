import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "@/lib/api/resume";
import { ResumeData } from "@/types/api/common";

export const useGetResumes = () => {
	return useQuery({
		queryKey: ["resumes"],
		queryFn: async () => resumeApi.getResumes(),
		staleTime: 1000 * 60 * 5,
	});
};

export const useGetResumeById = (id: string) => {
	return useQuery({
		queryKey: ["resume", id],
		queryFn: async () => resumeApi.getResumeById(id),
		staleTime: 1000 * 60 * 5,
	});
};

export const useUpdateResume = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (resumeData: ResumeData) => resumeApi.updateResume(resumeData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["resume"] });
		},
	});
};

export const useGetTemplates = () => {
	return useQuery({
		queryKey: ["resume-templates"],
		queryFn: () => resumeApi.getTemplates(),
		staleTime: 1000 * 60 * 60,
	});
};

export const useGetTemplateById = (id: string, enabled = true) => {
	return useQuery({
		queryKey: ["resume-template", id],
		queryFn: () => resumeApi.getTemplateById(id),
		enabled: enabled && !!id,
		staleTime: 1000 * 60 * 60,
	});
};

export const useCompileResume = () => {
	return useMutation({
		mutationFn: async (data: ResumeData) => resumeApi.compileResume(data),
	});
};
