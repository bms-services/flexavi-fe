import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { CompanyEmployeeReq, CompanyEmployeeRes, CompanyRes, CompanyRoleRes } from "../types/companyT";
import { TeamMemberReq, TeamReq, TeamRes } from "../types/teamT";
import { EmployeeInvitationRes, EmployeeReq, EmployeeRes, EmployeeWorkdaysRes } from "../types/employeeT";
import { AgendaSettingReq, AgendaSettingRes, AgendaSettingColorReq, AgendaSettingColorRes } from "../types/agendaT";
import { AttachmentRes, AttachmentType } from "../types/attachmentT";


import {
    PaymentReq,
    PaymentRes,
    PackageReq,
    PackageRes,
    IntentRes,
    TrialRes
} from "../types/stripeT";
import {
    createMyCompanyService,
    showMyCompanyService,
    updateMyCompanyService,
    deleteMyCompanyService,
    getMyTeamService,
    getMyTeamsService,
    createMyTeamService,
    deleteMyTeamService,
    updateMyTeamService,
    updateMyPaymentService,
    updateMyPackageService,
    createMyTrialService,
    createMyIntentService,
    inviteEmployeeService,
    getInvitedEmployeesService,
    resendInviteEmployeeService,
    cancelInvitedEmployeeService,
    getCompanyRolesService,
    getMyEmployeeService,
    getMyEmployeesService,
    deleteMyEmployeeService,
    updateMyEmployeeService,
    addMemberMyTeamService,
    getMyWorkDaysService,
    getMyAgendaSettingsService,
    updateMyAgendaSettingsService,
    getMyAgendaColorSettingsService,
    updateMyAgendaColorSettingsService,
    getMyAttachmentsService,
    createMyAttachmentsService,
    deleteMyAttachmentsService,
    getMailTemplatesService,
    updateMailTemplatesService,
    getMySignatureService,
    updateMySignatureService
} from "../services/settingService";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { UseFormReturn } from "react-hook-form";
import { MailRes } from "../types/mailT";
import { SignatureRes } from "../types/signatureT";

// ------ Company ------ \\
export const useShowMyCompany = () => {
    return useQuery<ApiSuccess<CompanyRes>, ApiError>({
        queryKey: ['my-company'],
        queryFn: showMyCompanyService,
    });
};

export const useCreateMyCompany = () => {
    return useMutation<ApiSuccess<CompanyRes>, ApiError, FormData>({
        mutationFn: createMyCompanyService,
    });
};

export const useUpdateMyCompany = () => {
    return useMutation<ApiSuccess<CompanyRes>, ApiError, FormData>({
        mutationFn: updateMyCompanyService,
    });
}

export const useDeleteMyCompany = () => {
    return useMutation<ApiSuccess<CompanyRes>, ApiError, string>({
        mutationFn: deleteMyCompanyService,
    });
}

// ------ Team ------ \\
export const useGetMyTeams = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<TeamRes>>({
        queryKey: ['my-teams', params],
        queryFn: () => getMyTeamsService(params),
    });
};

export const useGetMyTeam = (id: string) => {
    return useQuery<ApiSuccess<TeamRes>>({
        queryKey: ['my-team', id],
        queryFn: () => getMyTeamService(id),
        enabled: !!id,
    });
};

export const useCreateMyTeam = () => {
    return useMutation<ApiSuccess<TeamRes>, ApiError, TeamReq>({
        mutationFn: createMyTeamService,
    });
};

export const useUpdateMyTeam = () => {
    return useMutation<ApiSuccess<TeamRes>, ApiError, { id: string, formData: TeamReq }>({
        mutationFn: ({ id, formData }) => updateMyTeamService(id, formData),
    });
};

export const useDeleteMyTeam = () => {
    return useMutation<ApiSuccess<TeamRes>, ApiError, string>({
        mutationFn: deleteMyTeamService,
    });
};

export const useAddMemberMyTeam = () => {
    return useMutation<ApiSuccess<EmployeeRes>, ApiError, { id: string, formData: TeamMemberReq }>({
        mutationFn: ({ id, formData }) => addMemberMyTeamService(id, formData),
    });
};

// ------ Employee ------ \\
export const useGetMyEmployees = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<CompanyEmployeeRes>, ApiError>({
        queryKey: ['my-employees', params],
        queryFn: () => getMyEmployeesService(params),
        retry: false,
    });
};

export const useGetMyEmployee = (id: string) => {
    return useQuery<ApiSuccess<CompanyEmployeeRes>, ApiError>({
        queryKey: ['my-employee', id],
        queryFn: () => getMyEmployeeService(id),
        enabled: !!id,
    });
};

export const useUpdateMyEmployee = () => {
    return useMutation<ApiSuccess<CompanyEmployeeRes>, ApiError, { id: string, formData: CompanyEmployeeReq }>({
        mutationFn: ({ id, formData }) => updateMyEmployeeService(id, formData),
    });
};

export const useDeleteMyEmployee = () => {
    return useMutation<ApiSuccess<CompanyEmployeeRes>, ApiError, string>({
        mutationFn: deleteMyEmployeeService,
    });
};

// ------ Employee Invitation ------ \\
export const useGetInvitedEmployees = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<EmployeeInvitationRes>, ApiError>({
        queryKey: ['invited-employees', params],
        queryFn: () => getInvitedEmployeesService(params),
    });
};

export const useInviteEmployee = (methods: UseFormReturn<EmployeeReq, ApiError, EmployeeReq>) => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<EmployeeRes>, ApiError, EmployeeReq>({
        mutationFn: inviteEmployeeService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invited-employees'] });
            methods.reset();
        },
        onError: (error) => {
            mapApiErrorsToForm(error.errors, methods.setError);
        }
    });
};

export const useResendInviteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<EmployeeRes>, ApiError, string>({
        mutationFn: resendInviteEmployeeService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invited-employees'] });
        },
    });
};

export const useCancelInvitedEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<EmployeeRes>, ApiError, string>({
        mutationFn: cancelInvitedEmployeeService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invited-employees'] });
        },
    });
};

// Company Roles 
export const useGetCompanyRoles = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<CompanyRoleRes>, ApiError>({
        queryKey: ['company-roles', params],
        queryFn: () => getCompanyRolesService(params),
        retry: false,
        retryOnMount: false,
    });
};

// Company Work Days
export const useGetMyWorkDays = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<EmployeeWorkdaysRes>, ApiError>({
        queryKey: ['my-work-days'],
        queryFn: () => getMyWorkDaysService(params),
        retry: false,
        retryOnMount: false,
    });
};


// ------ Payment ------ \\
export const useUpdateMyPayment = () => {
    return useMutation<ApiSuccess<PaymentRes>, ApiError, PaymentReq>({
        mutationFn: updateMyPaymentService,
    });
}

// ------ Package ------ \\
export const useCreateMyPackage = () => {
    return useMutation<ApiSuccess<PackageRes>, ApiError, PackageReq>({
        mutationFn: updateMyPackageService,
    });
}

// ------ Intent ------ \\
export const useCreateMyIntent = () => {
    return useMutation<ApiSuccess<IntentRes>, ApiError>({
        mutationFn: createMyIntentService,
    });
}

// ------ Trial ------ \\
export const useCreateMyTrial = () => {
    return useMutation<ApiSuccess<TrialRes>, ApiError>({
        mutationFn: createMyTrialService,
    });
}


// ------ Agenda Settings ------ \\
export const useGetMyAgendaSettings = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<AgendaSettingRes>, ApiError>({
        queryKey: ['my-agenda-settings', params],
        queryFn: () => getMyAgendaSettingsService(params),
        retry: false,
        retryOnMount: false,
    });
}

export const useUpdateMyAgendaSettings = () => {
    return useMutation<ApiSuccess<AgendaSettingRes>, ApiError, AgendaSettingReq[]>({
        mutationFn: updateMyAgendaSettingsService,
    });
};


// ------ Agenda Color ------ \\
export const useGetMyAgendaColorSettings = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<AgendaSettingColorRes>, ApiError>({
        queryKey: ['my-agenda-color-settings', params],
        queryFn: () => getMyAgendaColorSettingsService(params),
        retry: false,
        retryOnMount: false,
    });
}

export const useUpdateMyAgendaColorSettings = () => {
    const queryClient = useQueryClient();

    return useMutation<
        ApiSuccess<AgendaSettingColorRes>,
        ApiError,
        AgendaSettingColorReq[]
    >({
        mutationFn: updateMyAgendaColorSettingsService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-agenda-color-settings'] });
        },
    });
};

export const useGetMyAttachments = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<AttachmentRes>, ApiError>({
        queryKey: ['my-attachments', params],
        queryFn: () => getMyAttachmentsService(params),
        retry: false,
        retryOnMount: false,
    });
};

export const useCreateMyAttachments = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiSuccess<AttachmentRes>, ApiError, FormData>({
        mutationFn: createMyAttachmentsService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-attachments'] });
        },
    });
};

export const useDeleteMyAttachment = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<AttachmentRes[]>, ApiError, { ids: string[]; force: boolean; type: AttachmentType }>({
        mutationFn: ({ ids, force, type }) => deleteMyAttachmentsService(ids, force, type),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-attachments'] });
        },
    });
};

// Mail Templates
export const useGetMailTemplates = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<MailRes>, ApiError>({
        queryKey: ['mail-templates', params],
        queryFn: () => getMailTemplatesService(params),
        retry: false,
        retryOnMount: false,
    });
}

export const useUpdateMailTemplates = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<MailRes>, ApiError, FormData>({
        mutationFn: updateMailTemplatesService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mail-templates'] });
        },
    });
};

// Signature
export const useGetMySignature = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<SignatureRes>, ApiError>({
        queryKey: ['my-signature', params],
        queryFn: () => getMySignatureService(),
        retry: false,
        retryOnMount: false,
    });
}

export const useUpdateMySignature = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<SignatureRes>, ApiError, FormData>({
        mutationFn: updateMySignatureService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-signature'] });
        },
    });
};
