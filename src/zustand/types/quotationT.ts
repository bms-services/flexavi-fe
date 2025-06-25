import { AddressReq } from "./addressT";

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
    quantity: number;
    unit: string;
    description: string;
    unit_price: number;
    vat_amount: number;
    total: number;
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
    quantity: number;
    unit: string;
    description: string;
    unit_price: number;
    vat_amount: number;
    total: number;
    created_at: string;
    updated_at: string;
};

