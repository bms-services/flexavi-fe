import { AddressReq } from "./addressT";
import { LeadRes } from "./leadT";

export interface ProjectReq {
    name: string;
    description: string;
    status: ProjectStatus;
    start_date: string;
    end_date: string;
    budget: number;
    // profit: number;
    address: AddressReq;
    leads: string[] | { value: string; label: string }[];
    quotes: string[] | { value: string; label: string }[];
    agreements: string[] | { value: string; label: string }[];
    invoices: string[] | { value: string; label: string }[];
    staffs: string[] | { value: string; label: string }[];
    materials: ProjectMaterialReq[];
    transports: ProjectTransportReq[];
    photos: ProjectPhotoReq[];
}

export interface ProjectRes {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    start_date: string;
    end_date: string;
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
    photos: ProjectPhotoRes[];
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
    | "onhold"
    | "cancelled";

export const projectStatusMap: Record<ProjectStatus, { label: string; variant: "primary" | "secondary" | "warning" | "danger" | "success" }> = {
    active: { label: "Actief", variant: "success" },
    inactive: { label: "Inactief", variant: "secondary" },
    completed: { label: "Voltooid", variant: "success" },
    onhold: { label: "In de wacht", variant: "warning" },
    cancelled: { label: "Geannuleerd", variant: "danger" },
};

export type ProjectPhotoReq = {
    name: string;
    description: string;
    file: File;
    url: string;
};

export type ProjectPhotoRes = {
    id: string;
    url: string;
    created_at: string;
    updated_at: string;
};


export type ProjectOverviewRes = {
    id: string;
    company_id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    start_date: string;
    end_date: string;
    budget: number;
    profit: number;
    total_document_quote: number;
    total_document_agreement: number;
    total_document_invoice: number;
    created_at: string;
    updated_at: string;
    address: AddressReq;
    project_leads: LeadRes[];
}

export type ProjectSummaryRes = {
    budget: number;
    income: number;
    costs: number;
    profit: number;
}

export type ProjectTaskReq = {
    assign_to: string[] | { value: string; label: string }[];
    description: string;
    start_date: string;
    end_date: string;
    status: ProjectTaskStatus;
};

export type ProjectTaskRes = {
    id: string;
    assign_to: string;
    description: string;
    start_date: string;
    end_date: string;
    status: ProjectTaskStatus;
}


export type ProjectTaskStatus = "open" | "completed" | "onhold";
export const projectTaskStatusMap: Record<ProjectTaskStatus, { label: string; variant: "primary" | "secondary" | "warning" | "danger" | "success" }> = {
    open: { label: "Open", variant: "primary" },
    completed: { label: "Voltooid", variant: "success" },
    onhold: { label: "In de wacht", variant: "warning" },
};


export type ProjectNoteReq = {
    notes: string;
    assign_to: string[] | { value: string; label: string }[];
};

export type ProjectNoteRes = {
    id: string;
    notes: string;
    assign_to: string[] | { value: string; label: string }[];
    created_at: string;
    created_by: string;
    updated_at: string;
};

export type ProjectEmployeeReq = {
    staffs: string[] | { value: string; label: string }[];
}

export type ProjectEmployeeRes = {
    id: string;
    name: string;
    role: string;
    day_rate: number | null;
    number_of_day: number | null;
    created_at: string;
    updated_at: string;
}