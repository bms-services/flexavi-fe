import { AddressReq, AddressRes } from "./address";
import { EmployeeRole } from "./employeeT";

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