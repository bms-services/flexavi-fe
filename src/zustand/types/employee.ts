import { AddressReq, AddressRes } from "./address";

export type EmployeeReq = {
    name: string;
    email: string;
    phone: string;
    start_date: string;
    rates: EmployeeRate;
    working_days: EmployeeWorkingDays;
    working_hours: EmployeeWorkingHours;
    available_days: string[];
    active: boolean;
    team_ids: string[];
};

export type EmployeeRes = {
    id: string;
    name: string;
    email: string;
    phone: string;
    start_date: string;
    rates: EmployeeRate;
    working_days: EmployeeWorkingDays;
    working_hours: EmployeeWorkingHours;
    available_days: string[];
    active: boolean;
    team_ids: string[];
    role: EmployeeRole;
    created_at: string;
    updated_at: string;
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