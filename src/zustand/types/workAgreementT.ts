import { AddressReq, AddressRes } from "./addressT";
import { LeadRes } from "./leadT";
import { QuotationItemRes, QuotationRes } from "./quotationT";

export type WorkAgreementReq = {
    leads: string[] | { value: string; label: string }[];
    quotes: string[];
    description: string;
    description_work: string;
    warranty: number;
    start_date: string;
    status: WorkAgreementStatus;
    general_term_conditions: string;
    items: WorkAgreementItemReq[];
    address: AddressReq;
    subtotal: number;
    vat_amount: number;
    discount_amount: number;
    discount_type: WorkAgreementDiscountType;
    total_amount: number;
    payment: WorkAgreementPaymentReq;
    exclusions: WorkAgreementsExclusionsReq[];
    attachments: WorkAgreementAttachmentsRes[] | File[];
};

export type WorkAgreementRes = {
    id: string;
    leads: LeadRes[];
    quotes: QuotationRes[];
    description: string;
    description_work: string;
    warranty: number;
    start_date: string;
    status: WorkAgreementStatus;
    general_term_conditions: string;
    items: QuotationItemRes[];
    address: AddressRes;
    subtotal: number;
    vat_amount: number;
    discount_amount: number;
    discount_type: WorkAgreementDiscountType;
    total_amount: number;
    payment: WorkAgreementPaymentRes;
    exclusions: WorkContractExclusionsRes[];
    attachments: WorkAgreementAttachmentsRes[] | File[];
    created_at: string;
    updated_at: string;
};

export type WorkAgreementTemplateReq = {
    warranty: number;
    total_amount: number;
    payment: WorkAgreementPaymentReq;
    exclusions?: WorkAgreementsExclusionsReq[];
}

export type WorkAgreementTemplateRes = {
    id: string;
    warranty: number;
    payment: WorkAgreementPaymentRes;
    exclusions: WorkContractExclusionsRes[];
    created_at: string;
    updated_at: string;
}


export type WorkAgreementsExclusionsReq = {
    description: string;
};

export type WorkContractExclusionsRes = {
    id: string;
    description: string;
    created_at: string;
    updated_at: string;
};


export type WorkAgreementItemReq = {
    id?: string;
    product_id?: string;
    unit?: string;
    title: string;
    description?: string;
    unit_price: number;
    vat_amount?: number;
    total: number;
};

export type WorkAgreementPaymentReq = {
    payment_method: WorkAgreementPaymentMethod;
    total_cash: number;
    terms?: WorkAgreementPaymentTermReq[];
    total_percentage: number;
};


export type WorkAgreementAttachmentsRes = {
    id: string;
    name: string;
    agreement_id: string;
    url: string;
    path: string;
    created_at: string;
    updated_at: string;
};

export type WorkAgreementPaymentRes = {
    payment_method: string;
    total_cash: number;
    terms: WorkAgreementPaymentTermRes[];
};

export type WorkAgreementPaymentTermReq = {
    description: string;
    percentage: number;
    status: WorkAgreementDueType;
    total_price: number;
};

export type WorkAgreementPaymentTermRes = WorkAgreementPaymentTermReq & {
    id: string;
    created_at: string;
    updated_at: string;
};


export type WorkAgreementStatus =
    | "concept"
    | "sent"
    | "revision"
    | "signed"
    | "refused"
    | "expired"
    | "completed"
    | "cancelled";

export const WorkAgreementStatusMap: Record<
    WorkAgreementStatus,
    {
        label: string;
        variant: "primary" | "secondary" | "warning" | "danger" | "success";
    }
> = {
    concept: { label: "Concept", variant: "secondary" },
    sent: { label: "Verzonden", variant: "primary" },
    revision: { label: "Herzien", variant: "warning" },
    signed: { label: "Getekend", variant: "success" },
    refused: { label: "Geweigerd", variant: "danger" },
    expired: { label: "Verlopen", variant: "danger" },
    completed: { label: "Voltooid", variant: "success" },
    cancelled: { label: "Geannuleerd", variant: "danger" },
};


export type WorkAgreementPaymentMethod = "bank_transfer" | "cash" | "bank_cash";
export const WorkAgreementPaymentMethodMap: Record<
    WorkAgreementPaymentMethod,
    {
        label: string;
        value: WorkAgreementPaymentMethod;
    }
> = {
    bank_transfer: { label: "Bankoverschrijving", value: "bank_transfer" },
    cash: { label: "Contant", value: "cash" },
    bank_cash: { label: "Bank en contant", value: "bank_cash" },
};

export type WorkAgreementDueType =
    | "by_order"
    | "at_the_start"
    | "during_work"
    | "upon_delivery"

export const WorkAgreementDueTypeMap: Record<
    WorkAgreementDueType,
    {
        label: string;
        value: WorkAgreementDueType;
    }
> = {
    by_order: { label: "Bij opdracht", value: "by_order" },
    at_the_start: { label: "Bij aanvang", value: "at_the_start" },
    during_work: { label: "Tijdens werk", value: "during_work" },
    upon_delivery: { label: "Bij oplevering", value: "upon_delivery" },
};

export type WorkAgreementDiscountType = "percentage" | "fixed";
