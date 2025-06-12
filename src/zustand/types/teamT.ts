export type TeamReq = {
    name: string;
    description: string;
    color: string;
    type: string;
}

export type TeamRes = {
    id: string;
    name: string;
    description: string;
    color: string;
    type: string;
    created_at: string;
    updated_at: string;
}
