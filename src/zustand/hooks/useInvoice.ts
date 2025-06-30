import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { InvoiceReq, InvoiceRes } from "../types/invoiceT";
import {
    createInvoiceService,
    deleteInvoiceService,
    getInvoicesService,
    getInvoiceService,
    updateInvoiceService
} from "../services/invoiceService";
import { useNavigate } from "react-router-dom";

export const useGetInvoices = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<InvoiceRes>, ApiError>({
        queryKey: ['invoices', params],
        queryFn: () => getInvoicesService(params),
    });
};

export const useGetInvoice = (id: string) => {
    return useQuery<ApiSuccess<InvoiceRes>, ApiError>({
        queryKey: ['invoice', id],
        queryFn: () => getInvoiceService(id),
        enabled: !!id,
    });
};

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<ApiSuccess<InvoiceRes>, ApiError, InvoiceReq>({
        mutationFn: createInvoiceService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            navigate('/invoices');
        },
    });
};

export const useUpdateInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<InvoiceRes>, ApiError, { id: string; formData: Partial<InvoiceReq> }>({
        mutationFn: updateInvoiceService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
        },
    });
};

export const useDeleteInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<InvoiceRes[]>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteInvoiceService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
        },
    });
};
