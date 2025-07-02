export type ExpenseReq = {
    company_name: string;
    description: string;
    subtotal: number;
    vat_percentage: number;
    vat_amount: number;
    total: number;
    start_date: string;
    issue: string;
    projects: string[];
    notes: string;
    voucher?: File;
};

export type ExpenseRes = {
    id: string;
    company_name: string;
    description: string;
    subtotal: number;
    vat_percentage: number;
    vat_amount: number;
    total: number;
    start_date: string;
    issue: string;
    projects: string[];
    notes: string;
    status: ExpenseStatus;
    voucher_url?: string;
    created_at: string;
    updated_at: string;
};


export type ExpenseStatus =
    | "concept"
    | "submitted"
    | "approved"
    | "rejected"
    | "paid"
    | "cancelled";

export const ExpenseStatusMap: Record<
    ExpenseStatus,
    {
        label: string;
        variant: "primary" | "secondary" | "warning" | "danger" | "success";
    }
> = {
    concept: { label: "Concept", variant: "secondary" },
    submitted: { label: "Ingediend", variant: "primary" },
    approved: { label: "Goedgekeurd", variant: "success" },
    rejected: { label: "Afgewezen", variant: "danger" },
    paid: { label: "Betaald", variant: "success" },
    cancelled: { label: "Geannuleerd", variant: "danger" },
};
