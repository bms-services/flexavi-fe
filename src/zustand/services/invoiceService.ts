import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { InvoiceRes, InvoiceSummaryRes, InvoiceCreditRes, InvoiceSendRes } from "../types/invoiceT";

export const getInvoicesService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<InvoiceRes>> => {
    const { data } = await mainApi.get("/invoices", { params });
    if (!data.success) throw data;
    return data;
};

export const getInvoiceService = async (id: string): Promise<ApiSuccess<InvoiceRes>> => {
    const { data } = await mainApi.get(`/invoices/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createInvoiceService = async (formData: FormData): Promise<ApiSuccess<InvoiceRes>> => {
    const { data } = await mainApi.post("/invoices", formData);
    if (!data.success) throw data;
    return data;
};

export const updateInvoiceService = async ({ id, formData }: { id: string, formData: FormData }): Promise<ApiSuccess<InvoiceRes>> => {
    const { data } = await mainApi.post(`/invoices/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteInvoiceService = async (ids: string[], force: boolean): Promise<ApiSuccess<InvoiceRes[]>> => {
    const { data } = await mainApi.delete(`/invoices`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};

export const getInvoiceSummaryService = async (): Promise<ApiSuccess<InvoiceSummaryRes>> => {
    const { data } = await mainApi.get("/invoices/summary");
    if (!data.success) throw data;
    return data;
};

export const creditInvoiceService = async ({ id, type }: { id: string, type: "full" | "partial" }): Promise<ApiSuccess<InvoiceCreditRes>> => {
    const { data } = await mainApi.post(`/invoices/${id}/credit`, { type });
    if (!data.success) throw data;
    return data;
};

export const sendInvoiceService = async (data: { id: string, email: string, subject: string, message: string }): Promise<ApiSuccess<InvoiceSendRes>> => {
    const { data: response } = await mainApi.post(`/invoices/${data.id}/send`, data);
    if (!response.success) throw response;
    return response;
};