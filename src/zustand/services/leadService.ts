import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { LeadReq, LeadRes } from "../types/leadT";

export const getLeadsService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<LeadRes>> => {
    const { data } = await mainApi.get("/lead", { params });
    if (!data.success) throw data;
    return data;
};

export const getLeadService = async (id: string): Promise<ApiSuccess<LeadRes>> => {
    const { data } = await mainApi.get(`/lead/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createLeadService = async (formData: LeadReq): Promise<ApiSuccess<LeadRes>> => {
    const { data } = await mainApi.post("/lead", formData);
    if (!data.success) throw data;
    return data;
};

export const updateLeadService = async ({ id, formData }: { id: string, formData: Partial<LeadReq> }): Promise<ApiSuccess<LeadRes>> => {
    const { data } = await mainApi.put(`/lead/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteLeadService = async (ids: string[], force: boolean): Promise<ApiSuccess<LeadRes[]>> => {
    const { data } = await mainApi.delete(`/lead`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};