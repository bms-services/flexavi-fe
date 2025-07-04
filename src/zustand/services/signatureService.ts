import { mainApi } from "@/utils/axios";
import { ApiSuccess } from "../types/apiT";
import { SignatureRes } from "../types/signatureT";


export const getSignatureTemplateService = async (): Promise<ApiSuccess<SignatureRes>> => {
    const { data } = await mainApi.get('/setting/signatures/');
    if (!data.success) throw data;
    return data;
};

export const createSignatureTemplateService = async (formData: FormData): Promise<ApiSuccess<SignatureRes>> => {
    const { data } = await mainApi.post('/setting/signatures', formData);
    if (!data.success) throw data;
    return data;
};

export const updateSignatureTemplateService = async ({ formData }: { formData: Partial<FormData> }): Promise<ApiSuccess<SignatureRes>> => {
    const { data } = await mainApi.patch('setting/signatures/', formData);
    if (!data.success) throw data;
    return data;
};

export const deleteSignatureTemplateService = async (ids: string[], force: boolean): Promise<ApiSuccess<SignatureRes[]>> => {
    const { data } = await mainApi.delete('/setting/signatures', {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};
