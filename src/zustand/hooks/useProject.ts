import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import {
    ProjectOverviewRes,
    ProjectRes,
    ProjectSummaryRes,
    ProjectTaskRes,
    ProjectTaskReq,
    ProjectNoteRes,
    ProjectNoteReq,
    ProjectEmployeeRes,
    ProjectEmployeeReq,
    ProjectDocumentRes,
    ProjectAttachmentType,
    ProjectPhotoRes,
    ProjectAppointmentRes,
    ProjectLeadRes,
    ProjectProfitRes,
    ProjectLeadReq,
    ProjectCostRes,
    ProjectCostReq,
    ProjectAppointmentReq,
} from "../types/projectT";
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
    createProjectEmployeeService,
    deleteProjectEmployeesService,
    getProjectDocumentsService,
    createProjectDocumentService,
    deleteProjectDocumentsService,
    getProjectPhotosService,
    createProjectPhotoService,
    deleteProjectPhotosService,
    getProjectAppointmentsService,
    createProjectAppointmentService,
    deleteProjectAppointmentsService,
    getProjectCostsService,
    createProjectCostService,
    deleteProjectCostsService,
    getProjectLeadsService,
    createProjectLeadService,
    deleteProjectLeadsService,
    getProjectProfitService,
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

export const useDeleteProjectEmployees = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectEmployeeRes[]>, ApiError, { employeeIds: string[] }>({
        mutationFn: ({ employeeIds }) => deleteProjectEmployeesService({ id, employeeIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectEmployees', id] });
        },
    });
};

// Project Documents Hooks
export const useGetProjectDocuments = (
    id: string,
    params: ParamGlobal,
    type: ProjectAttachmentType
) => {
    return useQuery<ApiSuccessPaginated<ProjectDocumentRes>, ApiError>({
        queryKey: ['projectDocuments', id, type, params],
        queryFn: () => getProjectDocumentsService(id, params, type),
        enabled: !!id,
    });
};

export const useCreateProjectDocument = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectDocumentRes>, ApiError, FormData>({
        mutationFn: (formData) => createProjectDocumentService(id, formData),
        onSuccess: (_data, formData) => {
            queryClient.invalidateQueries({ queryKey: ['projectDocuments', id, formData.get('type')] });
        },
    });
};

export const useDeleteProjectDocuments = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectDocumentRes[]>, ApiError, { documentIds: string[] }>({
        mutationFn: ({ documentIds }) => deleteProjectDocumentsService({ id, documentIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectDocuments', id] });
        },
    });
};

// Project Photos Hooks
export const useGetProjectPhotos = (id: string, params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProjectPhotoRes>, ApiError>({
        queryKey: ['projectPhotos', id],
        queryFn: () => getProjectPhotosService(id, params),
        enabled: !!id,
    });
}

export const useCreateProjectPhoto = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectPhotoRes>, ApiError, FormData>({
        mutationFn: (formData) => createProjectPhotoService(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectPhotos', id] });
        },
    });
};

export const useDeleteProjectPhotos = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectPhotoRes[]>, ApiError, { photoIds: string[] }>({
        mutationFn: ({ photoIds }) => deleteProjectPhotosService({ id, photoIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectPhotos', id] });
        },
    });
};

// Project Appointments Hooks
export const useGetProjectAppointments = (id: string, params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProjectAppointmentRes>, ApiError>({
        queryKey: ['projectAppointments', id],
        queryFn: () => getProjectAppointmentsService(id, params),
        enabled: !!id,
    });
}

export const useCreateProjectAppointment = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectAppointmentRes>, ApiError, ProjectAppointmentReq>({
        mutationFn: (formData) => createProjectAppointmentService(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectAppointments', id] });
        },
    });
};

export const useDeleteProjectAppointments = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectAppointmentRes[]>, ApiError, { appointmentIds: string[] }>({
        mutationFn: ({ appointmentIds }) => deleteProjectAppointmentsService({ id, appointmentIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectAppointments', id] });
        },
    });
};

// Project Costs Hooks
export const useGetProjectCosts = (id: string, params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProjectCostRes>, ApiError>({
        queryKey: ['projectCosts', id],
        queryFn: () => getProjectCostsService(id, params),
        enabled: !!id,
    });
}

export const useCreateProjectCost = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectCostRes>, ApiError, ProjectCostReq>({
        mutationFn: (formData) => createProjectCostService(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectCosts', id] });
        },
    });
};

export const useDeleteProjectCosts = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectCostRes[]>, ApiError, { costIds: string[] }>({
        mutationFn: ({ costIds }) => deleteProjectCostsService({ id, costIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectCosts', id] });
        },
    });
};

// Project Leads Hooks
export const useGetProjectLeads = (id: string, params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProjectLeadRes>, ApiError>({
        queryKey: ['projectLeads', id],
        queryFn: () => getProjectLeadsService(id, params),
        enabled: !!id,
    });
}

export const useCreateProjectLead = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectLeadRes>, ApiError, ProjectLeadReq>({
        mutationFn: (formData) => createProjectLeadService(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectLeads', id] });
        },
    });
};

export const useDeleteProjectLeads = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProjectLeadRes[]>, ApiError, { leadIds: string[] }>({
        mutationFn: ({ leadIds }) => deleteProjectLeadsService({ id, leadIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectLeads', id] });
        },
    });
};

// Project Profit Hooks
export const useGetProjectProfit = (id: string) => {
    return useQuery<ApiSuccess<ProjectProfitRes>, ApiError>({
        queryKey: ['projectProfit', id],
        queryFn: () => getProjectProfitService(id),
        enabled: !!id,
    });
}

