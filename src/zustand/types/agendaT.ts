export type AgendaSettingReq = {
    id?: string;
    title: string;
    start_time: string;
    end_time: string;
    sales_appointment: number;
    executor_appointment: number;
}


export type AgendaSettingRes = {
    id: string;
    company_id: string;
    title: string;
    start_time: string;
    end_time: string;
    sales_appointment: number;
    executor_appointment: number;
}

export type AgendaSettingColorReq = {
    id: string;
    color: string;
}

export type AgendaSettingColorRes = {
    id: string;
    company_id: string;
    title: string;
    color: string;
    created_at: string;
    updated_at: string;
}
