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
  package_
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

export interface CompanyPackageItem {
  id?: string;
  package_item_id?: string;
  company_id?: string;
  stripe_subscription_id?: string;
}

export enum PackageTypeEnum {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export type PackageTypeT = "monthly" | "yearly";
