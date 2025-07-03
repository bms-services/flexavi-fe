import { AddressReq, AddressRes } from "./addressT";
import { LeadRes } from "./leadT";
import { ProductRes } from "./productT";

export type InvoiceReq = {
    id?: string;
    leads: string[] | { value: string; label: string }[];
    title: string;
    description: string;
    notes: string;
    expiration_date: string;
    payment_date: string;
    status: InvoiceStatus;
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
    expiration_date: string;
    status: InvoiceStatus;
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
export type InvoiceStatus = "concept" | "sent" | "paid" | "expired" | "cancelled" | "with_bailiff" | "lawsuit";

export const InvoiceStatusMap: Record<
    InvoiceStatus,
    { label: string; variant: "primary" | "default" | "success" | "destructive" | "secondary" | "warning" }
> = {
    concept: { label: "Concept", variant: "primary" },
    sent: { label: "Verzonden", variant: "default" },
    paid: { label: "Betaald", variant: "success" },
    expired: { label: "Verlopen", variant: "destructive" },
    cancelled: { label: "Geannuleerd", variant: "secondary" },
    with_bailiff: { label: "Bij deurwaarder", variant: "warning" },
    lawsuit: { label: "Rechtszaak", variant: "destructive" },
};  