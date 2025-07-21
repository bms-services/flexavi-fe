import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { ProjectOverviewRes, ProjectReq, ProjectRes } from "../types/projectT";
import {
    createProjectService,
    deleteProjectService,
    getProjectsService,
    getProjectService,
    updateProjectService,
    getProjectOverviewService
} from "../services/projectService";
import { useNavigate } from "react-router-dom";

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


export const useGetProjectOverview = (id: string) => {
    return useQuery<ApiSuccess<ProjectOverviewRes>, ApiError>({
        queryKey: ['projectOverview', id],
        queryFn: () => getProjectOverviewService(id),
        enabled: !!id,
    });
}
