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