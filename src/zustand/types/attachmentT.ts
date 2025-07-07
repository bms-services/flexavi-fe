export type AttachmentReq = {
    attachments: File[];
    type: AttachmentType;
}

export type AttachmentRes = {
    company_id: string;
    created_at: string;
    id: string;
    name: string;
    path: string;
    updated_at: string;
    url: string;
    type: AttachmentType;
}

export type AttachmentType = "agreement" | "invoice" | "quotation"

export const AttachmentTypesMap: Record<AttachmentType, string> = {
    agreement: "Werkovereenkomsten",
    invoice: "Facturen",
    quotation: "Offertes"
}