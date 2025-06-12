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


export type ParamGlobal = {
    page?: number;
    per_page?: number;
    search?: string;
    filters?: FiltersGlobal;
    sorts?: SortsGlobal;
}

export type FiltersGlobal = Record<string, string | number>;
export type SortsGlobal = Record<string, "asc" | "desc">;
