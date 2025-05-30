import { PostalCode } from "./postal-code";

export interface Company {
  id?: string;
  name?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  image?: File;
  logo?: string;
  logo_url?: string;
  logo_public_id?: string;
  kvk_number?: string;
  vat_number?: string;
  postal_code?: {
    value: string;
    label: string;
  };
  address: CompanyAddress;
  created_at?: string;
  updated_at?: string;
}


export interface CompanyAddress {
  postal_code?: PostalCode | string;
  house_number?: string;
  house_number_addition?: string;
  street?: string;
  city?: string;
  province?: string;
  country?: string;
}


export interface CompanyTeam {
  id?: string;
  name?: string;
  description?: string;
  color?: string;
  type?: string;
  members?: string[];
  created_at?: string;
  updated_at?: string;
  company_users?: CompanyTeamUser[];
}

export interface CompanyTeamUser {
  id?: string;
  company_id?: string;
  user_id?: string;
  company_user_role_id?: string | null;
  status?: "active" | "inactive";
  is_owner?: boolean;
  is_main?: boolean;
  joined_at?: string;
  created_at?: string;
  updated_at?: string;
}


export type CompanyTeamType = "sales" | "executive";
export enum CompanyTeamTypeEnum {
  SALES = "sales",
  EXECUTIVE = "executive",
}
