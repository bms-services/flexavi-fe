import { AddressReq, AddressRes } from "./addressT";
import { LeadRes } from "./leadT";
import { ProductRes } from "./productT";

export type InvoiceReq = {
    id?: string;
    leads: string[] | { value: string; label: string }[];
    title: string;
    description: string;
    notes: string;
    due_date: string;
    paid_at: string;
    status: string;
    address: AddressReq;
    items: InvoiceItemReq[];
    subtotal: number;
    discount_amount: number;
    discount_type: string;
    total_amount: number;
};

export type InvoiceRes = {
    id: string;
    invoice_number: string;
    leads: LeadRes[];
    title: string;
    description: string;
    notes: string;
    planned_start_date: string;
    status: string | {
        value: InvoiceStatus;
        label: string;
    }
    address: AddressRes;
    items: InvoiceItemRes[];
    subtotal: number;
    discount_amount: number;
    discount_type: string;
    total_amount: number;
    created_at: string;
    updated_at: string;
};

export type InvoiceItemReq = {
    id?: string;
    quantity: number;
    unit: string;
    title: string;
    description: string;
    unit_price: number;
    vat_amount: number;
    total: number;
    product_id?: string;
    product_title: string;
};


export type InvoiceItemRes = {
    id: string;
    title: string;
    quantity: number;
    unit: string;
    description: string;
    unit_price: number;
    vat_amount: number;
    total: number;
    product_id?: string;
    product?: ProductRes;
    created_at: string;
    updated_at: string;
};
export type InvoiceStatus =
    | "draft"
    | "sent"
    | "viewed"
    | "accepted"
    | "rejected"
    | "revised"
    | "expired"
    | "converted"
    | "concept";

export const InvoiceStatusMap: Record<
    InvoiceStatus,
    {
        label: string;
        variant: "primary" | "secondary" | "warning" | "danger" | "success";
    }
> = {
    draft: { label: "Concept", variant: "secondary" },
    sent: { label: "Verzonden", variant: "primary" },
    viewed: { label: "Bekeken", variant: "primary" },
    accepted: { label: "Geaccepteerd", variant: "success" },
    rejected: { label: "Afgewezen", variant: "danger" },
    revised: { label: "Herzien", variant: "warning" },
    expired: { label: "Verlopen", variant: "danger" },
    converted: { label: "Geconverteerd", variant: "success" },
    concept: { label: "Concept", variant: "secondary" },
};
