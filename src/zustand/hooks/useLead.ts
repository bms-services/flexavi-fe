import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, Paginated, ParamGlobal } from "@/zustand/types/apiT";
import { LeadReq, LeadRes } from "../types/leadT";
import {
    createLeadService,
    deleteLeadService,
    getLeadsService,
    getLeadService,
    updateLeadService,
} from "../services/leadService";

export const useGetLeads = (params?: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<LeadRes>>({
        queryKey: ['leads', params],
        queryFn: () => getLeadsService(params),
    });
};

export const useGetLead = (id: string) => {
    return useQuery<ApiSuccess<LeadRes>>({
        queryKey: ['lead', id],
        queryFn: () => getLeadService(id),
        enabled: !!id,
    });
};

export const useCreateLead = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<LeadRes>, ApiError, LeadReq>({
        mutationFn: createLeadService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        },
    });
};

export const useUpdateLead = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<LeadRes>, ApiError, { id: string; formData: Partial<LeadReq> }>({
        mutationFn: updateLeadService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        },
    });
};

export const useDeleteLead = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<LeadRes>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteLeadService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        },
    });
};
