import { LeadRes } from "./leadT";
import { QuotationItemReq } from "./quotationT";

export type WorkAgreementReq = {
    leads: string[] | { value: string; label: string }[];
    quotes: string[];
    description: string;
    description_work: string;
    warranty: number;
    start_date: string;
    status: WorkAgreementStatus;
    general_term_conditions: string;
    items: QuotationItemReq[];
    subtotal: number;
    discount_amount: number;
    discount_type: string;
    total_amount: number;
    payment: WorkAgreementPaymentReq;
    exclusions: string[];
    attachments: File[];
};

export type WorkAgreementRes = {
    id: string;
    leads: LeadRes[];
    quotes: string[];
    description: string;
    description_work: string;
    warranty: number;
    start_date: string;
    status: string | {
        value: WorkAgreementStatus;
        label: string;
    };
    general_term_conditions: string;
    sub_total: number;
    discount_amount: number;
    discount_type: string;
    total_amount: number;
    payment: WorkAgreementPaymentRes;
    exclusions: string[];
    attachments: File[];
    created_at: string;
    updated_at: string;
};

export type WorkAgreementPaymentReq = {
    payment_method: WorkAgreementPaymentMethod;
    total_cash: number;
    terms: WorkAgreementPaymentTermReq[];
};

export type WorkAgreementPaymentRes = {
    payment_method: string;
    total_percentage: number;
    total_amount: number;
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
    | "draft"
    | "sent"
    | "viewed"
    | "accepted"
    | "rejected"
    | "revised"
    | "expired"
    | "converted"
    | "concept";

export const WorkAgreementStatusMap: Record<
    WorkAgreementStatus,
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


export type WorkAgreementPaymentMethod = "bank" | "cash" | "both";
export const WorkAgreementPaymentMethodMap: Record<
    WorkAgreementPaymentMethod,
    {
        label: string;
        value: WorkAgreementPaymentMethod;
    }
> = {
    bank: { label: "Bankoverschrijving", value: "bank" },
    cash: { label: "Contant", value: "cash" },
    both: { label: "Bank en contant", value: "both" },
};

export type WorkAgreementDueType =
    | "upfront"
    | "start"
    | "during"
    | "completion"
    | "milestone";

export const WorkAgreementDueTypeMap: Record<
    WorkAgreementDueType,
    {
        label: string;
        value: WorkAgreementDueType;
    }
> = {
    upfront: { label: "Bij opdracht", value: "upfront" },
    start: { label: "Bij aanvang", value: "start" },
    during: { label: "Tijdens werk", value: "during" },
    completion: { label: "Bij oplevering", value: "completion" },
    milestone: { label: "Mijlpaal", value: "milestone" },
};