import { mainApi } from "@/utils/axios";
import { CompanyRes, CompanyRoleRes } from "../types/companyT";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { TeamMemberReq, TeamReq, TeamRes } from "../types/teamT";
import { IntentRes, PackageReq, PackageRes, PaymentReq, PaymentRes, TrialRes } from "../types/stripeT";
import { EmployeeReq, EmployeeRes, EmployeeWorkdaysRes } from "../types/employeeT";
import { AgendaSettingReq, AgendaSettingRes, AgendaSettingColorReq, AgendaSettingColorRes } from "../types/agendaT";

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
export const getMyTeamsService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<TeamRes>> => {
    const { data } = await mainApi.get("/setting/team", { params });
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
    const { data } = await mainApi.put(`/setting/team/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteMyTeamService = async (id: string): Promise<ApiSuccess<TeamRes>> => {
    const { data } = await mainApi.delete(`/setting/team/${id}`);
    if (!data.success) throw data;
    return data;
};

export const addMemberMyTeamService = async (id: string, formData: TeamMemberReq): Promise<ApiSuccess<EmployeeRes>> => {
    const { data } = await mainApi.post(`/setting/team/${id}/employee`, formData);
    if (!data.success) throw data;
    return data;
};

// Employee
export const getMyEmployeesService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<EmployeeRes>> => {
    const { data } = await mainApi.get("/setting/company/employee", { params });
    if (!data.success) throw data;
    return data;
}

export const getMyEmployeeService = async (id: string): Promise<ApiSuccess<EmployeeRes>> => {
    const { data } = await mainApi.get(`/setting/company/employee/${id}`);
    if (!data.success) throw data;
    return data;
}

export const updateMyEmployeeService = async (id: string, formData: EmployeeReq): Promise<ApiSuccess<EmployeeRes>> => {
    const { data } = await mainApi.put(`/setting/company/employee/${id}`, formData);
    if (!data.success) throw data;
    return data;
}

export const deleteMyEmployeeService = async (id: string): Promise<ApiSuccess<EmployeeRes>> => {
    const { data } = await mainApi.delete(`/setting/company/employee/${id}`);
    if (!data.success) throw data;
    return data;
}

// Employee Invitation
export const getInvitedEmployeesService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<EmployeeRes>> => {
    const { data } = await mainApi.get("/setting/company/invitation/employee", { params });
    if (!data.success) throw data;
    return data;
}
export const inviteEmployeeService = async (formData: EmployeeReq): Promise<ApiSuccess<EmployeeRes>> => {
    const { data } = await mainApi.post("/setting/company/invitation/employee", formData);
    if (!data.success) throw data;
    return data;
}
export const cancelInvitedEmployeeService = async (id: string): Promise<ApiSuccess<EmployeeRes>> => {
    const { data } = await mainApi.delete(`/setting/company/invitation/employee/${id}`);
    if (!data.success) throw data;
    return data;
}
export const resendInviteEmployeeService = async (id: string): Promise<ApiSuccess<EmployeeRes>> => {
    const { data } = await mainApi.put(`/setting/company/invitation/employee/${id}`);
    if (!data.success) throw data;
    return data;
}

// Role 
export const getCompanyRolesService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<CompanyRoleRes>> => {
    const { data } = await mainApi.get("/setting/company/roles", { params });
    if (!data.success) throw data;
    return data;
}

// WorkDays 
export const getMyWorkDaysService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<EmployeeWorkdaysRes>> => {
    const { data } = await mainApi.get("/setting/company/work-days", { params });
    if (!data.success) throw data;
    return data;
}

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

// Agenda
export const getMyAgendaSettingsService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<AgendaSettingRes>> => {
    const { data } = await mainApi.get("/setting/agenda/list", { params });
    if (!data.success) throw data;
    return data;
}

export const updateMyAgendaSettingsService = async (formData: AgendaSettingReq[]): Promise<ApiSuccess<AgendaSettingRes>> => {
    const { data } = await mainApi.post("/setting/agenda/create", formData);
    if (!data.success) throw data;
    return data;
}

// Agenda Color
export const getMyAgendaColorSettingsService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<AgendaSettingColorRes>> => {
    const { data } = await mainApi.get("/setting/agenda/color/list", { params });
    if (!data.success) throw data;
    return data;
}

export const updateMyAgendaColorSettingsService = async (formData: AgendaSettingColorReq[]): Promise<ApiSuccess<AgendaSettingColorRes>> => {
    const { data } = await mainApi.put("/setting/agenda/color/update", formData);
    if (!data.success) throw data;
    return data;
};  