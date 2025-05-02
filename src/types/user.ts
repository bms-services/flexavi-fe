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
}
