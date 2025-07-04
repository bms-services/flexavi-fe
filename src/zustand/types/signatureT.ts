export type SignatureReq = {
    document_signature: string | null;
    company_logo: string | null;
}

export type SignatureRes = SignatureReq & {
    id: string;
    created_at: string;
    updated_at: string;
}