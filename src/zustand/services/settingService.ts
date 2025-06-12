import { mainApi } from "@/utils/axios";
import { CompanyReq, CompanyRes } from "../types/companyT";
import { ApiSuccess } from "../types/apiT";
import { TeamReq, TeamRes } from "../types/teamT";
import { IntentRes, PackageReq, PackageRes, PaymentReq, PaymentRes, TrialRes } from "../types/stripeT";

// Company
export const createMyCompanyService = async (formData: FormData): Promise<ApiSuccess<CompanyRes>> => {
    const { data } = await mainApi.post("/setting/company", formData);
    if (!data.success) throw data;
    return data;
};

export const showMyCompanyService = async (): Promise<ApiSuccess<CompanyRes>> => {
    const { data } = await mainApi.get("/setting/company");
    if (!data.success) throw data;
    return data;
};

export const updateMyCompanyService = async (formData: FormData): Promise<ApiSuccess<CompanyRes>> => {
    const { data } = await mainApi.post("/setting/company", formData);
    if (!data.success) throw data;
    return data;
};

export const deleteMyCompanyService = async (id: string): Promise<ApiSuccess<CompanyRes>> => {
    const { data } = await mainApi.delete(`/setting/company/${id}`);
    if (!data.success) throw data;
    return data;
};


// Team
export const getMyTeamsService = async (): Promise<ApiSuccess<TeamRes[]>> => {
    const { data } = await mainApi.get("/setting/team");
    if (!data.success) throw data;
    return data;
};

export const getMyTeamService = async (id: string): Promise<ApiSuccess<TeamRes>> => {
    const { data } = await mainApi.get(`/setting/team/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createMyTeamService = async (formData: TeamReq): Promise<ApiSuccess<TeamRes>> => {
    const { data } = await mainApi.post("/setting/team", formData);
    if (!data.success) throw data;
    return data;
};

export const updateMyTeamService = async (id: string, formData: TeamReq): Promise<ApiSuccess<TeamRes>> => {
    const { data } = await mainApi.patch(`/setting/team/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteMyTeamService = async (id: string): Promise<ApiSuccess<TeamRes>> => {
    const { data } = await mainApi.delete(`/setting/team/${id}`);
    if (!data.success) throw data;
    return data;
};

// Payment
export const updateMyPaymentService = async (formData: PaymentReq): Promise<ApiSuccess<PaymentRes>> => {
    const { data } = await mainApi.put("/setting/payment", formData);
    if (!data.success) throw data;
    return data;
}

// Intent
export const createMyIntentService = async (): Promise<ApiSuccess<IntentRes>> => {
    const { data } = await mainApi.post("/setting/intent");
    if (!data.success) throw data;
    return data;
}

// Trial
export const createMyTrialService = async (): Promise<ApiSuccess<TrialRes>> => {
    const { data } = await mainApi.post("/setting/trial");
    if (!data.success) throw data;
    return data;
}

// Package
export const updateMyPackageService = async (formData: PackageReq): Promise<ApiSuccess<PackageRes>> => {
    const { data } = await mainApi.post("/setting/package", formData);
    if (!data.success) throw data;
    return data;
}