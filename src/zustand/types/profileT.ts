export type ProfileReq = {
    name: string;
    description: string;
    vat_number: string;
    kvk_number: string;
    website: string;
    email: string;
    phone: string;
    logo_url?: string;
    logo_public_id?: string;
    address: ProfileAddressReq;
    image: File;
};

export type ProfileRes = {
    id: string;
    has_verified_email: boolean;
    has_payment_method: boolean;
    address: ProfileAddressRes;
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