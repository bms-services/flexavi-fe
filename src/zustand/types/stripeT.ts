export type PaymentReq = {
    setup_intent_id: string;
}

export type PaymentRes = {
    id: string;
    object: string;
    allow_redisplay: string;
    billing_details: {
        address: {
            city: string | null;
            country: string;
            line1: string | null;
            line2: string | null;
            postal_code: string | null;
            state: string | null;
        };
        email: string | null;
        name: string | null;
        phone: string | null;
        tax_id: string | null;
    };
    card: {
        brand: string;
        checks: {
            address_line1_check: string | null;
            address_postal_code_check: string | null;
            cvc_check: string;
        };
        country: string;
        display_brand: string;
        exp_month: number;
        exp_year: number;
        fingerprint: string;
        funding: string;
        generated_from: string | null;
        last4: string;
        networks: {
            available: string[];
            preferred: string | null;
        };
        regulated_status: string;
        three_d_secure_usage: {
            supported: boolean;
        };
        wallet: string | null;
    };
    created: number;
    customer: string;
    livemode: boolean;
    metadata: Record<string, string>;
    type: string;
}



export type IntentRes = {
    client_secret: string;
    id: string;
    object: string;
    amount: number;
    amount_capturable: number;
    amount_received: number;
}


export type TrialRes = {
    success: boolean;
}


export type PackageReq = {
    package_item_id: string;
}

export type PackageRes = {
    id: string;
    name: string;
    description: string;
    price: number;
    interval: string;
    currency: string;
}