import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import {
    ProjectOverviewRes,
    ProjectRes,
    ProjectSummaryRes,
    ProjectTaskReq,
    ProjectTaskRes,
    ProjectNoteReq,
    ProjectNoteRes,
    ProjectEmployeeReq,
    ProjectEmployeeRes,
    ProjectDocumentReq,
    ProjectDocumentRes
} from "../types/projectT";
import { AttachmentType } from "../types/attachmentT";

// Project Service Functions
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

// Project Overview
export const getProjectOverviewService = async (id: string): Promise<ApiSuccess<ProjectOverviewRes>> => {
    const { data } = await mainApi.get(`/projects/overview/${id}`);
    if (!data.success) throw data;
    return data;
}

// Project Summary
export const getProjectSummaryService = async (id: string): Promise<ApiSuccess<ProjectSummaryRes>> => {
    const { data } = await mainApi.get(`/projects/detail-summary/${id}`);
    if (!data.success) throw data;
    return data;
};

// Project Tasks
export const getProjectTasksService = async (id: string, params: ParamGlobal): Promise<ApiSuccessPaginated<ProjectTaskRes>> => {
    const { data } = await mainApi.get(`/projects/list/${id}/tasks`, { params });
    if (!data.success) throw data;
    return data;
}

export const createProjectTaskService = async (id: string, formData: ProjectTaskReq): Promise<ApiSuccess<ProjectTaskRes>> => {
    const { data } = await mainApi.post(`/projects/create/${id}/tasks`, formData);
    if (!data.success) throw data;
    return data;
}

export const updateProjectTaskService = async ({ id, taskId, formData }: { id: string; taskId: string; formData: ProjectTaskReq }): Promise<ApiSuccess<ProjectTaskRes>> => {
    const { data } = await mainApi.post(`/projects/update/${id}/tasks/${taskId}`, formData);
    if (!data.success) throw data;
    return data;
}
export const deleteProjectTasksService = async ({ id, taskIds }: { id: string; taskIds: string[] }): Promise<ApiSuccess<ProjectTaskRes[]>> => {
    const { data } = await mainApi.delete(`/projects/delete/${id}/tasks`, {
        data: { ids: taskIds }
    });
    if (!data.success) throw data;
    return data;
};

// Project Notes
export const getProjectNotesService = async (id: string, params: ParamGlobal): Promise<ApiSuccessPaginated<ProjectNoteRes>> => {
    const { data } = await mainApi.get(`/projects/list/${id}/notes`, { params });
    if (!data.success) throw data;
    return data;
}

export const createProjectNoteService = async (id: string, formData: ProjectNoteReq): Promise<ApiSuccess<ProjectNoteRes>> => {
    const { data } = await mainApi.post(`/projects/create/${id}/notes`, formData);
    if (!data.success) throw data;
    return data;
}

export const updateProjectNoteService = async ({ id, noteId, formData }: { id: string; noteId: string; formData: ProjectNoteReq }): Promise<ApiSuccess<ProjectNoteRes>> => {
    const { data } = await mainApi.post(`/projects/update/${id}/notes/${noteId}`, formData);
    if (!data.success) throw data;
    return data;
}

export const deleteProjectNotesService = async ({ id, noteIds }: { id: string; noteIds: string[] }): Promise<ApiSuccess<ProjectNoteRes[]>> => {
    const { data } = await mainApi.delete(`/projects/delete/${id}/notes`, {
        data: { ids: noteIds }
    });
    if (!data.success) throw data;
    return data;
};

// Project Employees
export const getProjectEmployeesService = async (id: string, params: ParamGlobal): Promise<ApiSuccessPaginated<ProjectEmployeeRes>> => {
    const { data } = await mainApi.get(`/projects/list/${id}/users`, { params });
    if (!data.success) throw data;
    return data;
}

export const createProjectEmployeeService = async (id: string, formData: ProjectEmployeeReq): Promise<ApiSuccess<ProjectEmployeeRes>> => {
    const { data } = await mainApi.post(`/projects/create/${id}/users`, formData);
    if (!data.success) throw data;
    return data;
}

export const deleteProjectEmployeesService = async ({ id, employeeIds }: { id: string; employeeIds: string[] }): Promise<ApiSuccess<ProjectEmployeeRes[]>> => {
    const { data } = await mainApi.delete(`/projects/delete/${id}/users`, {
        data: { ids: employeeIds }
    });
    if (!data.success) throw data;
    return data;
}

// Project Documents
export const getProjectDocumentsService = async (id: string, params: ParamGlobal, type: AttachmentType): Promise<ApiSuccessPaginated<ProjectDocumentRes>> => {
    const { data } = await mainApi.get(`/projects/list/${id}/documents`, { params: { ...params, type } });
    if (!data.success) throw data;
    return data;
}

export const createProjectDocumentService = async (id: string, formData: FormData): Promise<ApiSuccess<ProjectDocumentRes>> => {
    const { data } = await mainApi.post(`/projects/create/${id}/documents`, formData);
    if (!data.success) throw data;
    return data;
}

export const deleteProjectDocumentsService = async ({ id, documentIds }: { id: string; documentIds: string[] }): Promise<ApiSuccess<ProjectDocumentRes[]>> => {
    const { data } = await mainApi.delete(`/projects/delete/${id}/documents`, {
        data: { ids: documentIds }
    });
    if (!data.success) throw data;
    return data;
};