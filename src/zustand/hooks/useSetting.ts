import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { CompanyRes } from "../types/companyT";
import { createMyCompanyService, showMyCompanyService, updateMyCompanyService, deleteMyCompanyService, getMyTeamService, getMyTeamsService, createMyTeamService, deleteMyTeamService, updateMyTeamService, updateMyPaymentService, updateMyPackageService, createMyTrialService, createMyIntentService } from "../services/settingService";
import { TeamReq, TeamRes } from "../types/teamT";
import { PaymentReq, PaymentRes, PackageReq, PackageRes, IntentRes, TrialRes } from "../types/stripeT";

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
export const useGetMyTeams = (params?: ParamGlobal) => {
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