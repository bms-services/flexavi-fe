export type SignatureReq = {
    mail_signature: string | null;
    attachments: string | File | null;
    blob: string;
}

export type SignatureRes = SignatureReq & {
    id: string;
    company_id: string;
    name: string;
    url: string;
    path: string;
    mail_signature: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}