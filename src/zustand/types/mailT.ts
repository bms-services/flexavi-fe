
export type MailReq = {
    type: MailType;
    subject: string;
    content: string;
};


export type MailRes = {
    id: string;
    type: MailType;
    subject: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export type MailType = "agreement" | "invoice" | "quotation" | "appointment";

export const MailTypeMap: Record<MailType, string> = {
    agreement: "Agreement",
    invoice: "Invoice",
    quotation: "Quotation",
    appointment: "Appointment",
};