import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeApi } from '@/lib/api/resume';
import { ResumeData } from '@/types/api/common';
import { queryKeys } from './keys';
import { useAppQuery } from './useAppQuery';

export const useGetResumes = () =>
  useAppQuery({
    queryKey: queryKeys.resumes(),
    queryFn: () => resumeApi.getResumes(),
    staleTime: 1000 * 60 * 5,
    errorMessage: 'Unable to load resumes',
  });

export const useGetResumeById = (id: string) =>
  useAppQuery({
    queryKey: queryKeys.resume(id),
    queryFn: () => resumeApi.getResumeById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    errorMessage: 'Unable to load resume',
  });

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ResumeData) => resumeApi.createResume(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes() });
    },
  });
};

export const useUpdateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ResumeData & { id: string }) => resumeApi.updateResume(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resume(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes() });
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => resumeApi.deleteResume(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes() });
      if (id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.resume(id) });
      }
    },
  });
};

export const useGetTemplates = () =>
  useAppQuery({
    queryKey: queryKeys.resumeTemplates(),
    queryFn: () => resumeApi.getTemplates(),
    staleTime: 1000 * 60 * 60,
    errorMessage: 'Unable to load resume templates',
  });

export const useGetTemplateById = (id: string, enabled = true) =>
  useAppQuery({
    queryKey: queryKeys.resumeTemplate(id),
    queryFn: () => resumeApi.getTemplateById(id),
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 60,
    errorMessage: 'Unable to load template',
  });

export const useCompileResume = () => {
  return useMutation({
    mutationFn: async (data: ResumeData) => resumeApi.compileResume(data),
  });
};
