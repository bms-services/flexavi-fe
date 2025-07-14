import { AddressReq } from "./addressT";

export interface ProjectReq {
    name: string;
    description: string;
    status: ProjectStatus;
    start_date: string;
    budget: number;
    profit: number;
    address: AddressReq;
    leads: string[] | { value: string; label: string }[];
    quotes: string[] | { value: string; label: string }[];
    agreements: string[] | { value: string; label: string }[];
    invoices: string[] | { value: string; label: string }[];
    staffs: ProjectStaffReq[];
    materials: ProjectMaterialReq[];
    transports: ProjectTransportReq[];
}

export interface ProjectRes {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    start_date: string;
    budget: number;
    profit: number;
    address: AddressReq;
    leads: { value: string; label: string }[];
    quotes: { value: string; label: string }[];
    agreements: { value: string; label: string }[];
    invoices: { value: string; label: string }[];
    staffs: ProjectStaffRes[];
    materials: ProjectMaterialRes[];
    transports: ProjectTransportRes[];
    created_at: string;
    updated_at: string;
}

export interface ProjectStaffReq {
    user_id: string;
    role: string;
    day_rate: number;
    number_of_day: number;
}

export interface ProjectStaffRes {
    id: string;
    user_id: string;
    role: string;
    day_rate: number;
    number_of_day: number;
    user: { id: string; name: string; email: string };
}

export interface ProjectMaterialReq {
    description: string;
    amount: number;
}

export interface ProjectMaterialRes {
    id: string;
    description: string;
    amount: number;
}

export interface ProjectTransportReq {
    description: string;
    amount: number;
}

export interface ProjectTransportRes {
    id: string;
    description: string;
    amount: number;
    transport: { id: string; name: string; type: string };
    transport_type: string;
    transport_amount: number;
    transport_unit: string;
}


export type ProjectStatus =
    | "active"
    | "inactive"
    | "completed"
    | "on_hold"
    | "cancelled";