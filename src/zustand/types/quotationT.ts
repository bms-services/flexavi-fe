import { AddressReq } from "./addressT";
import { ProductRes } from "./productT";

export type QuotationReq = {
    id?: string;
    leads: string[];
    title: string;
    description: string;
    notes: string;
    planned_start_date: string;
    status: string;
    address: AddressReq;
    items: QuotationItemReq[];
    sub_total: number;
    discount_amount: number;
    discount_type: string;
    total_amount: number;
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


export type QuotationRes = {
    id: string;
    leads: string[];
    title: string;
    description: string;
    notes: string;
    planned_start_date: string;
    status: string;
    address: AddressReq;
    items: QuotationItemRes[];
    sub_total: number;
    discount_amount: number;
    discount_type: string;
    total_amount: number;
    created_at: string;
    updated_at: string;
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
    | "accepted"
    | "rejected"
    | "revised";

export const QuotationStatusOptions: { value: QuotationStatus; label: string }[] = [
    { value: "draft", label: "Concept" },
    { value: "sent", label: "Verzonden" },
    { value: "accepted", label: "Geaccepteerd" },
    { value: "rejected", label: "Afgewezen" },
    { value: "revised", label: "Herzien" },
];
