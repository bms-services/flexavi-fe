import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { QuotationReq, QuotationRes } from "../types/quotationT";

export const getQuotationsService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<QuotationRes>> => {
    const { data } = await mainApi.get("/quotes", { params });
    if (!data.success) throw data;
    return data;
};

export const getQuotationService = async (id: string): Promise<ApiSuccess<QuotationRes>> => {
    const { data } = await mainApi.get(`/quotes/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createQuotationService = async (formData: QuotationReq): Promise<ApiSuccess<QuotationRes>> => {
    const { data } = await mainApi.post("/quotes", formData);
    if (!data.success) throw data;
    return data;
};

export const updateQuotationService = async ({ id, formData }: { id: string, formData: Partial<QuotationReq> }): Promise<ApiSuccess<QuotationRes>> => {
    const { data } = await mainApi.patch(`/quotes/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteQuotationService = async (ids: string[], force: boolean): Promise<ApiSuccess<QuotationRes[]>> => {
    const { data } = await mainApi.delete(`/quotes`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};
