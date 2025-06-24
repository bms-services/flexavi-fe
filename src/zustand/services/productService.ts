import { mainApi } from "@/utils/axios";
import { ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "../types/apiT";
import { ProductReq, ProductRes, ProductCategoryReq, ProductCategoryRes } from "../types/productT";

export const getProductsService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<ProductRes>> => {
    const { data } = await mainApi.get("/products/list", { params });
    if (!data.success) throw data;
    return data;
};

export const getProductService = async (id: string): Promise<ApiSuccess<ProductRes>> => {
    const { data } = await mainApi.get(`/products/show/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createProductService = async (formData: ProductReq): Promise<ApiSuccess<ProductRes>> => {
    const { data } = await mainApi.post("/products/create", formData);
    if (!data.success) throw data;
    return data;
};

export const updateProductService = async ({ id, formData }: { id: string, formData: Partial<ProductReq> }): Promise<ApiSuccess<ProductRes>> => {
    const { data } = await mainApi.put(`/products/update/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteProductService = async (ids: string[], force: boolean): Promise<ApiSuccess<ProductRes[]>> => {
    const { data } = await mainApi.delete(`/products/delete`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};

// Product Category
export const getProductCategoriesService = async (params: ParamGlobal): Promise<ApiSuccessPaginated<ProductCategoryRes>> => {
    const { data } = await mainApi.get("/products/category/list", { params });
    if (!data.success) throw data;
    return data;
};

export const getProductCategoryService = async (id: string): Promise<ApiSuccess<ProductCategoryRes>> => {
    const { data } = await mainApi.get(`/products/category/${id}`);
    if (!data.success) throw data;
    return data;
};

export const createProductCategoryService = async (formData: ProductCategoryReq): Promise<ApiSuccess<ProductCategoryRes>> => {
    const { data } = await mainApi.post("/products/category/create", formData);
    if (!data.success) throw data;
    return data;
};

export const updateProductCategoryService = async ({ id, formData }: { id: string, formData: Partial<ProductCategoryReq> }): Promise<ApiSuccess<ProductCategoryRes>> => {
    const { data } = await mainApi.patch(`/products/category/update/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const deleteProductCategoryService = async (ids: string[], force: boolean): Promise<ApiSuccess<ProductCategoryRes[]>> => {
    const { data } = await mainApi.delete(`/products/category/delete`, {
        params: { force },
        data: { ids }
    });
    if (!data.success) throw data;
    return data;
};
