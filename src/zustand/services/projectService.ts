import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { ProjectOverviewRes, ProjectRes } from "../types/projectT";

export const getProjectsService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<ProjectRes>> => {
    const { data } = await mainApi.get("/projects", { params });
    if (!data.success) throw data;
    return data;
};

export const getProjectService = async (id: string): Promise<ApiSuccess<ProjectRes>> => {
    const { data } = await mainApi.get(`/projects/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createProjectService = async (formData: FormData): Promise<ApiSuccess<ProjectRes>> => {
    const { data } = await mainApi.post("/projects", formData);
    if (!data.success) throw data;
    return data;
};

export const updateProjectService = async ({ id, formData }: { id: string, formData: Partial<FormData> }): Promise<ApiSuccess<ProjectRes>> => {
    const { data } = await mainApi.post(`/projects/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteProjectService = async (ids: string[], force: boolean): Promise<ApiSuccess<ProjectRes[]>> => {
    const { data } = await mainApi.delete(`/projects`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};


export const getProjectOverviewService = async (id: string): Promise<ApiSuccess<ProjectOverviewRes>> => {
    const { data } = await mainApi.get(`/projects/overview/${id}`);
    if (!data.success) throw data;
    return data;
}