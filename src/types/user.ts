import { PackageItem } from "./package";

export interface User {
  user_id?: string;
  name?: string;
  password?: string;
  password_confirmation?: string;
  email?: string;
  phone?: string;
  language?: string;
  is_on_trial?: boolean;
  trial_ends_at?: string | null;
  subscription_ends_at?: string | null;
  has_payment_method?: boolean;
  has_active_subscription?: boolean;
  has_verified_email?: boolean;
  subscription?: {
    selected_package_item: UserPackageItem;
  };
}

export interface UserPackageItem {
  id?: string;
  user_id?: string;
  package_item_id?: string;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
  package_item?: PackageItem;
}
