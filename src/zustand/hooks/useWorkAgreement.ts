import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { WorkAgreementReq, WorkAgreementRes } from "../types/workAgreementT";
import {
    createWorkAgreementService,
    deleteWorkAgreementService,
    getWorkAgreementsService,
    getWorkAgreementService,
    updateWorkAgreementService
} from "../services/workAgreementService";
import { useNavigate } from "react-router-dom";

export const useGetWorkAgreements = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<WorkAgreementRes>, ApiError>({
        queryKey: ['workAgreements', params],
        queryFn: () => getWorkAgreementsService(params),
    });
};

export const useGetWorkAgreement = (id: string) => {
    return useQuery<ApiSuccess<WorkAgreementRes>, ApiError>({
        queryKey: ['workAgreement', id],
        queryFn: () => getWorkAgreementService(id),
        enabled: !!id,
    });
};

export const useCreateWorkAgreement = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<ApiSuccess<WorkAgreementRes>, ApiError, FormData>({
        mutationFn: createWorkAgreementService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workAgreements'] });
            navigate('/quotes');
        },
    });
};

export const useUpdateWorkAgreement = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<WorkAgreementRes>, ApiError, { id: string; formData: Partial<FormData> }>({
        mutationFn: updateWorkAgreementService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workAgreements'] });
        },
    });
};

export const useDeleteWorkAgreement = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<WorkAgreementRes[]>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteWorkAgreementService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workAgreements'] });
        },
    });
};
