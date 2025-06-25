export type ProductReq = {
    id?: string;
    title: string;
    description: string;
    category_id: string | { value: string; label: string };
    unit: string;
    price: string;
    btw_percentage: string;
}


export type ProductRes = {
    id: string;
    title: string;
    description: string;
    category_id: string | { value: string; label: string };
    category: ProductCategoryRes;
    unit: string;
    price: string;
    btw_percentage: string;
    created_at: string;
    updated_at: string;
}

export type ProductCategoryReq = {
    id?: string;
    name: string;
    description: string;
}

export type ProductCategoryRes = {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}