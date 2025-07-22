import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { ProjectOverviewRes, ProjectReq, ProjectRes, ProjectSummaryRes, ProjectTaskRes, ProjectTaskReq, ProjectNoteRes, ProjectNoteReq, ProjectEmployeeRes, ProjectEmployeeReq } from "../types/projectT";
import {
    createProjectService,
    deleteProjectService,
    getProjectsService,
    getProjectService,
    updateProjectService,
    getProjectOverviewService,
    getProjectSummaryService,
    getProjectTasksService,
    createProjectTaskService,
    updateProjectTaskService,
    deleteProjectTasksService,
    getProjectNotesService,
    createProjectNoteService,
    updateProjectNoteService,
    deleteProjectNotesService,
    getProjectEmployeesService,
    createProjectEmployeeService
} from "../services/projectService";
import { useNavigate } from "react-router-dom";

// Project Hooks
export const useGetProjects = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProjectRes>, ApiError>({
        queryKey: ['projects', params],
        queryFn: () => getProjectsService(params),
    });
};

export const useGetProject = (id: string) => {
    return useQuery<ApiSuccess<ProjectRes>, ApiError>({
        queryKey: ['project', id],
        queryFn: () => getProjectService(id),
        enabled: !!id,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<ApiSuccess<ProjectRes>, ApiError, FormData>({
        mutationFn: createProjectService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            navigate('/projects');
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectRes>, ApiError, { id: string; formData: Partial<FormData> }>({
        mutationFn: updateProjectService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectRes[]>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteProjectService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};


// Project Overview and Summary Hooks
export const useGetProjectOverview = (id: string) => {
    return useQuery<ApiSuccess<ProjectOverviewRes>, ApiError>({
        queryKey: ['projectOverview', id],
        queryFn: () => getProjectOverviewService(id),
        enabled: !!id,
    });
}

// Project Summary Hook
export const useGetProjectSummary = (id: string) => {
    return useQuery<ApiSuccess<ProjectSummaryRes>, ApiError>({
        queryKey: ['projectSummary', id],
        queryFn: () => getProjectSummaryService(id),
        enabled: !!id,
    });
};

// Project Tasks Hooks
export const useGetProjectTasks = (id: string, params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProjectTaskRes>, ApiError>({
        queryKey: ['projectTasks', id],
        queryFn: () => getProjectTasksService(id, params),
        enabled: !!id,
    });
}

export const useCreateProjectTask = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectTaskRes>, ApiError, ProjectTaskReq>({
        mutationFn: (formData) => createProjectTaskService(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectTasks', id] });
        },
    });
};

export const useUpdateProjectTask = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectTaskRes>, ApiError, { taskId: string; formData: ProjectTaskReq }>({
        mutationFn: ({ taskId, formData }) => updateProjectTaskService({ id, taskId, formData }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectTasks', id] });
        },
    });
};

export const useDeleteProjectTasks = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectTaskRes[]>, ApiError, { taskIds: string[] }>({
        mutationFn: ({ taskIds }) => deleteProjectTasksService({ id, taskIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectTasks', id] });
        },
    });
};


// Project Notes Hooks
export const useGetProjectNotes = (id: string, params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProjectNoteRes>, ApiError>({
        queryKey: ['projectNotes', id],
        queryFn: () => getProjectNotesService(id, params),
        enabled: !!id,
    });
}

export const useCreateProjectNote = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectNoteRes>, ApiError, ProjectNoteReq>({
        mutationFn: (formData) => createProjectNoteService(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectNotes', id] });
        },
    });
};

export const useUpdateProjectNote = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectNoteRes>, ApiError, { noteId: string; formData: ProjectNoteReq }>({
        mutationFn: ({ noteId, formData }) => updateProjectNoteService({ id, noteId, formData }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectNotes', id] });
        },
    });
};

export const useDeleteProjectNotes = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectNoteRes[]>, ApiError, { noteIds: string[] }>({
        mutationFn: ({ noteIds }) => deleteProjectNotesService({ id, noteIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectNotes', id] });
        },
    });
};

// Project Employees Hooks
export const useGetProjectEmployees = (id: string, params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProjectEmployeeRes>, ApiError>({
        queryKey: ['projectEmployees', id],
        queryFn: () => getProjectEmployeesService(id, params),
        enabled: !!id,
    });
}

export const useCreateProjectEmployee = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectEmployeeRes>, ApiError, ProjectEmployeeReq>({
        mutationFn: (formData) => createProjectEmployeeService(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectEmployees', id] });
        },
    });
};