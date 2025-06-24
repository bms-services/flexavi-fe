export type ProfileReq = {
    name: string;
    email: string;
    phone: string;
};

export type ProfileRes = {
    id: string;
    name: string;
    email: string;
    phone: string;
    has_verified_email: boolean;
    has_payment_method: boolean;
    address: ProfileAddressRes;
    status_subscription: StatusSubscriptionType;
    created_at: string;
    updated_at: string;
}

export type ProfileAddressReq = {
    street: string;
    postal_code: { label: string; value: string };
    house_number: string;
    house_number_addition?: string;
    city: string;
    province?: string;
}

export type ProfileAddressRes = {
    street: string;
    postal_code: string;
    house_number: string;
    house_number_addition?: string;
    city: string;
    province?: string;
    created_at: string;
    updated_at: string;
}

export type StatusSubscriptionType = 'trialing' | 'active' | 'canceled' | 'incomplete' | 'past_due' | 'unpaid';

export enum StatusSubscriptionEnum {
    TRIALING = 'trialing',
    ACTIVE = 'active',
    CANCELED = 'canceled',
    INCOMPLETE = 'incomplete',
}