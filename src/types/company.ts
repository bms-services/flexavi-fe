export interface Company {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  kvk?: string;
  website?: string;
  logo?: string;
  postal_code?: {
    value: string;
  };
  house_number?: string;
  house_number_addition?: string;
  street?: string;
  city?: string;
  province?: string;
  created_at?: string;
  updated_at?: string;
}
