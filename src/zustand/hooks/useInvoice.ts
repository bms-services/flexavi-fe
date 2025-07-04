import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { InvoiceReq, InvoiceRes, InvoiceSummaryRes, InvoiceSendRes, InvoiceCreditRes } from "../types/invoiceT";
import {
    createInvoiceService,
    deleteInvoiceService,
    getInvoicesService,
    getInvoiceService,
    updateInvoiceService,
    getInvoiceSummaryService,
    creditInvoiceService,
    sendInvoiceService
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

export const useGetInvoiceSummary = () => {
    return useQuery<ApiSuccess<InvoiceSummaryRes>, ApiError>({
        queryKey: ['invoiceSummary'],
        queryFn: getInvoiceSummaryService,
    });
};

export const useCreditInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<InvoiceCreditRes>, ApiError, { id: string; type: "full" | "partial" }>({
        mutationFn: creditInvoiceService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
        },
    });
};

export const useSendInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<InvoiceSendRes>, ApiError, { id: string; email: string; subject: string; message: string }>({
        mutationFn: sendInvoiceService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
        },
    });
};


