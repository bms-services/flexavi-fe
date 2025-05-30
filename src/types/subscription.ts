export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'unpaid';

export interface Subscription {
  id: string;
  customerName: string;
  email: string;
  plan: string;
  status: SubscriptionStatus;
  startDate: string;
  nextBilling: string;
  amount: number;
}
