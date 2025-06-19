import { l } from "node_modules/framer-motion/dist/types.d-CQt5spQA";

export type EmployeeReq = {
    name: string;
    email: string;
    phone: string;
    company_user_role_id: string;
    work_days: string[]
    start_time: string;
    end_time: string;
};

export type EmployeeRes = {
    id: string;
    name: string;
    email: string;
    phone: string;
    company_user_role_id: string;
    work_days: string[];
    start_time: string;
    end_time: string;
    created_at: string;
    status: EmployeeInvitationStatus;
    updated_at: string;
    company_user_role: {
        id: string;
        name: string;
    }
}


export type EmployeeRate = {
    hourly_rate: number;
    daily_rate: number;
};

export type EmployeeRole = "sales" | "installation";


export type EmployeeWorkingDays = {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
};

export type EmployeeWorkingHours = {
    start: string;
    end: string;
};


export type EmployeeWorkdaysRes = {
    id: string;
    name: string;
}

export const EmployeeInvitationStatusMap = {
    invited: { label: "Invited", variant: "primary" },
    accepted: { label: "Accepted", variant: "success" },
    rejected: { label: "Rejected", variant: "light" },
    cancelled: { label: "Cancelled", variant: "destructive" },
    resent: { label: "Resent", variant: "warning" },
} as const;

export type EmployeeInvitationStatus = "invited" | "accepted" | "cancelled" | "rejected" | "resent";