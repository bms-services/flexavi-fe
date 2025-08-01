export type ExpenseReq = {
    company: string;
    //project_id:xxx
    due_date: string;
    description: string;
    amount: number;
    percentage: number;
    vat_amount: number;
    total_amount: number;
    notes: string;
    voucher: string;
    type: ExpenseType;
    status: ExpenseStatus;
    tags: string[] | {
        text: string;
    }[];
    attachments?: File[] | string[]; // File or string paths
};

export type ExpenseRes = {
    id: string;
    project_id: string | null;
    company: string;
    due_date: string;
    description: string;
    type: ExpenseType;
    amount: number;
    percentage: number;
    vat_amount: number;
    total_amount: number;
    status: ExpenseStatus;
    notes: string;
    tags: string[];
    receipt_url: string | null;
    created_at: string;
    updated_at: string;
};


export type ExpenseStatus =
    | "concept"
    | "intreatment"
    | "approved"
    | "rejected"
    | "submitted"
    | "incorporated";

export const ExpenseStatusMap: Record<
    ExpenseStatus,
    {
        label: string;
        variant: "primary" | "secondary" | "warning" | "danger" | "success";
    }
> = {
    concept: { label: "Concept", variant: "secondary" },
    intreatment: { label: "In behandeling", variant: "warning" },
    approved: { label: "Goedgekeurd", variant: "success" },
    rejected: { label: "Afgewezen", variant: "danger" },
    submitted: { label: "Ingediend", variant: "primary" },
    incorporated: { label: "Opgenomen", variant: "primary" },
};

export enum ExpenseStatusEnum {
    Concept = "concept",
    InTreatment = "intreatment",
    Approved = "approved",
    Rejected = "rejected",
    Submitted = "submitted",
    Incorporated = "incorporated",
}


export type ExpenseType =
    | "material"
    | "transport"
    | "tools"
    | "subcontractor"
    | "office"
    | "software"
    | "marketing"
    | "training"
    | "maintenance"
    | "utilities"
    | "insurance"
    | "other";

export const ExpenseTypeMap: Record<
    ExpenseType,
    {
        label: string;
        color: string;
    }
> = {
    material: { label: "Materiaal", color: "#FFA500" },
    transport: { label: "Transport", color: "#00BFFF" },
    tools: { label: "Gereedschap", color: "#8B4513" },
    subcontractor: { label: "Onder aannemer", color: "#6A5ACD" },
    office: { label: "Kantoor", color: "#4682B4" },
    software: { label: "Software", color: "#20B2AA" },
    marketing: { label: "Marketing", color: "#FF69B4" },
    training: { label: "Training", color: "#FFD700" },
    maintenance: { label: "Onderhoud", color: "#708090" },
    utilities: { label: "Nutsvoorzieningen", color: "#32CD32" },
    insurance: { label: "Verzekering", color: "#DC143C" },
    other: { label: "Overig", color: "#A9A9A9" },
};

export type ExpenseAttachmentRes = {
    id: string;
    cost_id: string | null;
    name: string;
    url: string;
    path: string;
    created_at: string;
    updated_at: string;
}