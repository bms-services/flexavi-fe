export type ApiSuccess<T> = {
    success: true;
    code: number;
    message: string;
    result: T;
    errors: null;
};

export type ApiError = {
    success: false;
    code: number;
    message: string;
    result: null;
    errors: string[] | Record<string, string[]>;
};

export type ApiSuccessPaginated<T> = {
    success: true;
    code: number;
    message: string;
    result: Paginated<T>;
    errors: null;
};

export type Paginated<T> = {
    data: T[];
    links: Links;
    meta: Meta;
};

export type Links = {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
};

export type Meta = {
    current_page: number;
    per_page: number;
    first_page_url: string | null;
    from: number | null;
    last_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};

export type ParamGlobal = {
    page?: number;
    per_page?: number;
    search?: string;
    filters?: FiltersGlobal;
    sorts?: SortsGlobal;
}

export type FiltersGlobal = Record<string, string | number>;
export type SortsGlobal = Record<string, "asc" | "desc">;
