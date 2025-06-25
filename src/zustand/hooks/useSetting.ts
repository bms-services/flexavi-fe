import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { CompanyRes, CompanyRoleRes } from "../types/companyT";
import { TeamMemberReq, TeamReq, TeamRes } from "../types/teamT";
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
    updateMyAgendaSettingsService
} from "../services/settingService";
import { EmployeeReq, EmployeeRes, EmployeeWorkdaysRes } from "../types/employeeT";
import { AgendaSettingReq, AgendaSettingRes } from "../types/agendaT";

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
    return useQuery<ApiSuccessPaginated<EmployeeRes>, ApiError>({
        queryKey: ['my-employees', params],
        queryFn: () => getMyEmployeesService(params),
        retry: false,
    });
};

export const useGetMyEmployee = (id: string) => {
    return useQuery<ApiSuccess<EmployeeRes>, ApiError>({
        queryKey: ['my-employee', id],
        queryFn: () => getMyEmployeeService(id),
        enabled: !!id,
    });
};

export const useUpdateMyEmployee = () => {
    return useMutation<ApiSuccess<EmployeeRes>, ApiError, { id: string, formData: EmployeeReq }>({
        mutationFn: ({ id, formData }) => updateMyEmployeeService(id, formData),
    });
};

export const useDeleteMyEmployee = () => {
    return useMutation<ApiSuccess<EmployeeRes>, ApiError, string>({
        mutationFn: deleteMyEmployeeService,
    });
};

// ------ Employee Invitation ------ \\
export const useGetInvitedEmployees = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<EmployeeRes>, ApiError>({
        queryKey: ['invited-employees', params],
        queryFn: () => getInvitedEmployeesService(params),
    });
};
export const useInviteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<EmployeeRes>, ApiError, EmployeeReq>({
        mutationFn: inviteEmployeeService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invited-employees'] });
        },
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

