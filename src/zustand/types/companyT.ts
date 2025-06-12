export type CompanyReq = {
    name: string;
    description: string;
    vat_number: string;
    kvk_number: string;
    website: string;
    email: string;
    phone: string;
    logo_url?: string;
    logo_public_id?: string;
    address: CompanyAddressReq;
    image: File;
};

export type CompanyRes = {
    id: string;
    name: string;
    description: string;
    vat_number: string;
    kvk_number: string;
    website: string;
    email: string;
    phone: string;
    logo_url?: string;
    logo_public_id?: string;
    address: CompanyAddressRes;
    created_at: string;
    updated_at: string;
}

export type CompanyAddressReq = {
    street: string;
    postal_code: { label: string; value: string };
    house_number: string;
    house_number_addition?: string;
    city: string;
    province?: string;
}

export type CompanyAddressRes = {
    street: string;
    postal_code: string;
    house_number: string;
    house_number_addition?: string;
    city: string;
    province?: string;
    created_at: string;
    updated_at: string;
}