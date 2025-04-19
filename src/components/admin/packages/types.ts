
export interface PackageDiscount {
  percentage: string;
  validDays: string;
}

export interface PackageData {
  name: string;
  monthly: string;
  yearly: string;
  trialDays: string;
  discount: PackageDiscount;
}

export interface PackageFeature {
  id: string;
  name: string;
  starter: boolean;
  professional: boolean;
  enterprise: boolean;
}
