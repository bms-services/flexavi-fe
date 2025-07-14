import { AddressReq, AddressRes } from "./addressT";
import { EmployeeRes, EmployeeRole, EmployeeStatus, EmployeeWorkdaysRes } from "./employeeT";

export type CompanyReq = {
    name: string;
    description: string;
    vat_number: string;
    kvk_number: string;
    website: string;
    email: string;
    phone: string;
    logo_url?: string;
    logo_public_id?: string;
    address: AddressReq;
    image: File;
};

export type CompanyRes = {
    id: string;
    name: string;
    description: string;
    vat_number: string;
    kvk_number: string;
    website: string;
    email: string;
    phone: string;
    logo_url?: string;
    logo_public_id?: string;
    address: AddressRes;
    created_at: string;
    updated_at: string;
}


export type CompanyRoleReq = {
    name: string;
    description: string;
    permissions: string[];
};

export type CompanyRoleRes = {
    id: string;
    name: EmployeeRole;
    description: string;
    permissions: string[];
    created_at: string;
    updated_at: string;
};

export type CompanyEmployeeReq = {
    name?: string;
    email?: string;
    phone?: string;
    company_user_role_id?: string;
    work_days?: string[];
    start_time?: string;
    end_time?: string;
    status?: EmployeeStatus;
};

export type CompanyEmployeeRes = {
    id: string;
    joined_at: string;
    is_owner: boolean;
    is_main: boolean;
    status: EmployeeStatus;
    user: EmployeeRes;
    company: CompanyRes;
    workdays: EmployeeWorkdaysRes;
    created_at: string;
    updated_at: string;
}