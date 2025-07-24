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
    ProjectDocumentRes,
    ProjectAttachmentType,
    ProjectPhotoRes,
    ProjectProfitRes,
    ProjectAppointmentReq,
    ProjectAppointmentRes,
    ProjectCostReq,
    ProjectCostRes,
    ProjectLeadReq,
    ProjectLeadRes
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
    const { data } = await mainApi.delete(`/projects/destroy/${id}/tasks`, {
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
    const { data } = await mainApi.delete(`/projects/destroy/${id}/notes`, {
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
    const { data } = await mainApi.delete(`/projects/destroy/${id}/users`, {
        data: { ids: employeeIds }
    });
    if (!data.success) throw data;
    return data;
}

// Project Documents
export const getProjectDocumentsService = async (id: string, params: ParamGlobal, type: ProjectAttachmentType): Promise<ApiSuccessPaginated<ProjectDocumentRes>> => {
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
    const { data } = await mainApi.delete(`/projects/destroy/${id}/documents`, {
        data: { ids: documentIds }
    });
    if (!data.success) throw data;
    return data;
};

// Project Photos
export const getProjectPhotosService = async (id: string, params: ParamGlobal): Promise<ApiSuccessPaginated<ProjectPhotoRes>> => {
    const { data } = await mainApi.get(`/projects/list/${id}/photos`, { params });
    if (!data.success) throw data;
    return data;
}

export const createProjectPhotoService = async (id: string, formData: FormData): Promise<ApiSuccess<ProjectPhotoRes>> => {
    const { data } = await mainApi.post(`/projects/create/${id}/photos`, formData);
    if (!data.success) throw data;
    return data;
}

export const deleteProjectPhotosService = async ({ id, photoIds }: { id: string; photoIds: string[] }): Promise<ApiSuccess<ProjectPhotoRes[]>> => {
    const { data } = await mainApi.delete(`/projects/destroy/${id}/photos`, {
        data: { ids: photoIds }
    });
    if (!data.success) throw data;
    return data;
};

// Project Profit
export const getProjectProfitService = async (id: string): Promise<ApiSuccess<ProjectProfitRes>> => {
    const { data } = await mainApi.get(`/projects/profit-calculation/${id}`);
    if (!data.success) throw data;
    return data;
};

// Project Appointments
export const getProjectAppointmentsService = async (id: string, params: ParamGlobal): Promise<ApiSuccessPaginated<ProjectAppointmentRes>> => {
    const { data } = await mainApi.get(`/projects/list/${id}/appointments`, { params });
    if (!data.success) throw data;
    return data;
}

export const createProjectAppointmentService = async (id: string, formData: ProjectAppointmentReq): Promise<ApiSuccess<ProjectAppointmentRes>> => {
    const { data } = await mainApi.post(`/projects/create/${id}/appointments`, formData);
    if (!data.success) throw data;
    return data;
}

export const deleteProjectAppointmentsService = async ({ id, appointmentIds }: { id: string; appointmentIds: string[] }): Promise<ApiSuccess<ProjectAppointmentRes[]>> => {
    const { data } = await mainApi.delete(`/projects/destroy/${id}/appointments`, {
        data: { ids: appointmentIds }
    });
    if (!data.success) throw data;
    return data;
};

// Project Costs
export const getProjectCostsService = async (id: string, params: ParamGlobal): Promise<ApiSuccessPaginated<ProjectCostRes>> => {
    const { data } = await mainApi.get(`/projects/list/${id}/costs`, { params });
    if (!data.success) throw data;
    return data;
}

export const createProjectCostService = async (id: string, formData: ProjectCostReq): Promise<ApiSuccess<ProjectCostRes>> => {
    const { data } = await mainApi.post(`/projects/create/${id}/costs`, formData);
    if (!data.success) throw data;
    return data;
}

export const deleteProjectCostsService = async ({ id, costIds }: { id: string; costIds: string[] }): Promise<ApiSuccess<ProjectCostRes[]>> => {
    const { data } = await mainApi.delete(`/projects/destroy/${id}/costs`, {
        data: { ids: costIds }
    });
    if (!data.success) throw data;
    return data;
};

// Project Leads
export const getProjectLeadsService = async (id: string, params: ParamGlobal): Promise<ApiSuccessPaginated<ProjectLeadRes>> => {
    const { data } = await mainApi.get(`/projects/list/${id}/leads`, { params });
    if (!data.success) throw data;
    return data;
}
export const createProjectLeadService = async (id: string, formData: ProjectLeadReq): Promise<ApiSuccess<ProjectLeadRes>> => {
    const { data } = await mainApi.post(`/projects/create/${id}/leads`, formData);
    if (!data.success) throw data;
    return data;
}

export const deleteProjectLeadsService = async ({ id, leadIds }: { id: string; leadIds: string[] }): Promise<ApiSuccess<ProjectLeadRes[]>> => {
    const { data } = await mainApi.delete(`/projects/destroy/${id}/leads`, {
        data: { ids: leadIds }
    });
    if (!data.success) throw data;
    return data;
};