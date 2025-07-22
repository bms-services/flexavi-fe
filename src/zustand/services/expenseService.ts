import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { ExpenseAttachmentRes, ExpenseReq, ExpenseRes } from "../types/expenseT";

export const getExpensesService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<ExpenseRes>> => {
    const { data } = await mainApi.get("/costs", { params });
    if (!data.success) throw data;
    return data;
};

export const getExpenseService = async (id: string): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.get(`/costs/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createExpenseService = async (formData: FormData): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.post("/costs", formData);
    if (!data.success) throw data;
    return data;
};

export const updateExpenseService = async ({ id, formData }: { id: string, formData: Partial<FormData> }): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.post(`/costs/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteExpenseService = async (ids: string[], force: boolean): Promise<ApiSuccess<ExpenseRes[]>> => {
    const { data } = await mainApi.delete(`/costs`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};

export const exportExpensesService = async (params: ParamGlobal): Promise<Blob> => {
    const response = await mainApi.get("/costs/export", {
        params,
        responseType: 'blob',
    });

    return response.data;
};

export const uploadExpenseReceiptService = async (formData: FormData): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.post('/costs/receipt', formData);
    if (!data.success) throw data;
    return data;
};

export const getExpenseReceiptService = async (id: string): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.get(`/costs/${id}/receipt`);
    if (!data.success) throw data;
    return data;
};

export const uploadExpenseAttachmentService = async (id: string, formData: FormData): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.post(`/costs/attachments/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const getExpenseAttachmentsService = async (id: string, params: ParamGlobal): Promise<ApiSuccessPaginated<ExpenseAttachmentRes>> => {
    const { data } = await mainApi.get(`/costs/attachments/${id}`, { params });
    if (!data.success) throw data;
    return data;
};
