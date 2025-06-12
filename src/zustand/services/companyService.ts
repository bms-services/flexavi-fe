import { mainApi } from "@/utils/axios";
import { ParamGlobal } from "../types/apiT";
import { CompanyReq } from "../types/companyT";

export const getCompaniesService = async (params: ParamGlobal) => {
    const { data } = await mainApi.get("/company", { params });
    if (!data.success) throw data;
    return data;
};

export const getCompanyService = async (id: string) => {
    const { data } = await mainApi.get(`/company/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createCompanyService = async (formData: CompanyReq) => {
    const { data } = await mainApi.post("/company", formData);
    if (!data.success) throw data;
    return data;
};

export const updateCompanyService = async ({ id, formData }: { id: string, formData: Partial<CompanyReq> }) => {
    const { data } = await mainApi.patch(`/company/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteCompanyService = async (id: string) => {
    const { data } = await mainApi.delete(`/company/${id}`);
    if (!data.success) throw data;
    return data;
};