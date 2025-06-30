import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { InvoiceReq, InvoiceRes } from "../types/invoiceT";

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

export const createInvoiceService = async (formData: InvoiceReq): Promise<ApiSuccess<InvoiceRes>> => {
    const { data } = await mainApi.post("/invoices", formData);
    if (!data.success) throw data;
    return data;
};

export const updateInvoiceService = async ({ id, formData }: { id: string, formData: Partial<InvoiceReq> }): Promise<ApiSuccess<InvoiceRes>> => {
    const { data } = await mainApi.patch(`/invoices/${id}`, formData);
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
