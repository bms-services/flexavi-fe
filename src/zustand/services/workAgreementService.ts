import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { WorkAgreementRes, WorkAgreementTemplateReq, WorkAgreementTemplateRes } from "../types/workAgreementT";

export const getWorkAgreementsService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<WorkAgreementRes>> => {
    const { data } = await mainApi.get("/agreements", { params });
    if (!data.success) throw data;
    return data;
};

export const getWorkAgreementService = async (id: string): Promise<ApiSuccess<WorkAgreementRes>> => {
    const { data } = await mainApi.get(`/agreements/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createWorkAgreementService = async (formData: FormData): Promise<ApiSuccess<WorkAgreementRes>> => {
    const { data } = await mainApi.post("/agreements", formData);
    if (!data.success) throw data;
    return data;
};

export const updateWorkAgreementService = async ({ id, formData }: { id: string, formData: Partial<FormData> }): Promise<ApiSuccess<WorkAgreementRes>> => {
    const { data } = await mainApi.post(`/agreements/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteWorkAgreementService = async (ids: string[], force: boolean): Promise<ApiSuccess<WorkAgreementRes[]>> => {
    const { data } = await mainApi.delete(`/agreements`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};


export const getWorkAgreementTemplateService = async (): Promise<ApiSuccess<WorkAgreementTemplateRes>> => {
    const { data } = await mainApi.get('/setting/work-agreement');
    if (!data.success) throw data;
    return data;
};

export const updateWorkAgreementTemplateService = async (formData: Partial<WorkAgreementTemplateReq>): Promise<ApiSuccess<WorkAgreementTemplateRes>> => {
    const { data } = await mainApi.post('/setting/work-agreement/', formData);
    if (!data.success) throw data;
    return data;
};