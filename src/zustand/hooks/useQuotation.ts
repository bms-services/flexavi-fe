import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { QuotationReq, QuotationRes } from "../types/quotationT";
import {
    createQuotationService,
    deleteQuotationService,
    getQuotationsService,
    getQuotationService,
    updateQuotationService
} from "../services/quotationService";
import { useNavigate } from "react-router-dom";

export const useGetQuotations = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<QuotationRes>, ApiError>({
        queryKey: ['quotations', params],
        queryFn: () => getQuotationsService(params),
    });
};

export const useGetQuotation = (id: string) => {
    return useQuery<ApiSuccess<QuotationRes>, ApiError>({
        queryKey: ['quotation', id],
        queryFn: () => getQuotationService(id),
        enabled: !!id,
    });
};

export const useCreateQuotation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<ApiSuccess<QuotationRes>, ApiError, FormData>({
        mutationFn: createQuotationService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
            navigate('/quotes');
        },
    });
};

export const useUpdateQuotation = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<QuotationRes>, ApiError, { id: string; formData: Partial<FormData> }>({
        mutationFn: updateQuotationService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
        },
    });
};

export const useDeleteQuotation = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<QuotationRes[]>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteQuotationService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
        },
    });
};
