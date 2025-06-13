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
    type: TeamType;
    created_at: string;
    updated_at: string;
}

export type TeamType = "sales" | "executive";

export enum TeamTypeEnum {
    SALES = "sales",
    EXECUTIVE = "executive",
}