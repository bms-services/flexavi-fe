export interface Package {
  id: string;
  name?: string;
  description?: string;
  items?: PackageItem[];
  features?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PackageItem {
  id?: string;
  stripe_price_id?: string;
  stripe_product_id?: string;
  unit_amount?: number;
  trial_period?: number;
  currency?: string;
  interval?: string;
  discount_amount?: number;
  discount_valid_at?: string;
  package?: Package;
  created_at?: string;
  updated_at?: string;
}

export enum PackageTypeEnum {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export type PackageTypeT = "monthly" | "yearly";
