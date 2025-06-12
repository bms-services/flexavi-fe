export type AddressReq = {
    street: string;
    postal_code: { label: string; value: string };
    house_number: string;
    house_number_addition?: string;
    city: string;
    province?: string;
}

export type AddressRes = {
    street: string;
    postal_code: string;
    house_number: string;
    house_number_addition?: string;
    city: string;
    province?: string;
    created_at: string;
    updated_at: string;
}