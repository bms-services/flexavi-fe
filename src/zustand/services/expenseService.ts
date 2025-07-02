import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { ExpenseReq, ExpenseRes } from "../types/expenseT";

export const getExpensesService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<ExpenseRes>> => {
    const { data } = await mainApi.get("/expenses", { params });
    if (!data.success) throw data;
    return data;
};

export const getExpenseService = async (id: string): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.get(`/expenses/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createExpenseService = async (formData: ExpenseReq): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.post("/expenses", formData);
    if (!data.success) throw data;
    return data;
};

export const updateExpenseService = async ({ id, formData }: { id: string, formData: Partial<ExpenseReq> }): Promise<ApiSuccess<ExpenseRes>> => {
    const { data } = await mainApi.patch(`/expenses/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteExpenseService = async (ids: string[], force: boolean): Promise<ApiSuccess<ExpenseRes[]>> => {
    const { data } = await mainApi.delete(`/expenses`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};
