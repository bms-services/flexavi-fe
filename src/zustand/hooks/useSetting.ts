import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiSuccess } from "@/zustand/types/apiT";
import { CompanyRes } from "../types/companyT";
import { createMyCompanyService, showMyCompanyService, updateMyCompanyService, deleteMyCompanyService, getMyTeamService, getMyTeamsService, createMyTeamService, deleteMyTeamService, updateMyTeamService, updateMyPaymentService, updateMyPackageService, createMyTrialService, createMyIntentService } from "../services/settingService";
import { TeamReq, TeamRes } from "../types/teamT";
import { PaymentReq, PaymentRes, PackageReq, PackageRes, IntentRes, TrialRes } from "../types/stripeT";

// ------ Company ------ \\
export const useShowMyCompany = () => {
    return useMutation<ApiSuccess<CompanyRes>, ApiError>({
        mutationFn: showMyCompanyService,
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
export const useGetMyTeams = () => {
    return useMutation<ApiSuccess<TeamRes[]>, ApiError>({
        mutationFn: getMyTeamsService,
    });
}

export const useGetMyTeam = () => {
    return useMutation<ApiSuccess<TeamRes>, ApiError, string>({
        mutationFn: getMyTeamService,
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