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
};

export type FiltersGlobal = Record<string, string | number | [string, string]>;
export type SortsGlobal = Record<string, "asc" | "desc">;

export type FilterOption =
    | {
        label: string;
        type: FilterType.SELECT;
        options: { value: string; label: string }[];
    }
    | {
        placeholder: string;
        type: FilterType.DATE;
    }
    | {
        label: string;
        type: FilterType.DATE_RANGE;
    };

export type FilterOptionsMap = Record<string, FilterOption>;

export type FilterDefinition = {
    label: string;
    type: FilterType;
    options?: FilterOption[];
};

export enum FilterType {
    SELECT = "select",
    DATE = "date",
    DATE_RANGE = "date-range",
}