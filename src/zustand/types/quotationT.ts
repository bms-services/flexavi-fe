import { AddressReq, AddressRes } from "./addressT";
import { LeadRes } from "./leadT";
import { ProductRes } from "./productT";

export type QuotationReq = {
    id?: string;
    leads: string[] | { value: string; label: string }[];
    title: string;
    description: string;
    notes: string;
    planned_start_date: string;
    status: string;
    address: AddressReq;
    items: QuotationItemReq[];
    subtotal: number;
    discount_amount: number;
    discount_type: string;
    total_amount: number;
};

export type QuotationRes = {
    id: string;
    leads: LeadRes[];
    title: string;
    description: string;
    notes: string;
    planned_start_date: string;
    status: string | {
        value: QuotationStatus;
        label: string;
    }
    address: AddressRes;
    items: QuotationItemRes[];
    subtotal: number;
    discount_amount: number;
    discount_type: string;
    total_amount: number;
    created_at: string;
    updated_at: string;
};

export type QuotationItemReq = {
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


export type QuotationItemRes = {
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
export type QuotationStatus =
    | "draft"
    | "sent"
    | "viewed"
    | "accepted"
    | "rejected"
    | "revised"
    | "expired"
    | "converted"
    | "concept";

export const quotationStatusMap: Record<
    QuotationStatus,
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
