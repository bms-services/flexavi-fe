import { AddressReq, AddressRes } from "./address";

export type LeadStatus =
    | "new"
    | "in_progress"
    | "converted"
    | "lost"
    | "archived"
    | "follow_up"
    | "not_interested"
    | "contacted"
    | "qualified"
    | "unqualified"
    | "pending"
    | "closed"
    | "accepted"
    | "rejected";



export type LeadReq = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: AddressReq;
};

export type LeadRes = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: AddressRes;
    status: LeadStatus;
    status_label: string;
    created_at: string;
    updated_at: string;
}


export const leadStatusMap: Record<
    LeadStatus,
    { label: string; variant: "primary" | "secondary" | "warning" | "danger" | "success" }
> = {
    new: { label: "New", variant: "primary" },
    in_progress: { label: "In Progress", variant: "secondary" },
    converted: { label: "Converted", variant: "success" },
    lost: { label: "Lost", variant: "danger" },
    archived: { label: "Archived", variant: "secondary" },
    follow_up: { label: "Follow Up", variant: "warning" },
    not_interested: { label: "Not Interested", variant: "danger" },
    contacted: { label: "Contacted", variant: "primary" },
    qualified: { label: "Qualified", variant: "success" },
    unqualified: { label: "Unqualified", variant: "danger" },
    pending: { label: "Pending", variant: "warning" },
    closed: { label: "Closed", variant: "success" },
    accepted: { label: "Accepted", variant: "success" },
    rejected: { label: "Rejected", variant: "danger" },

};