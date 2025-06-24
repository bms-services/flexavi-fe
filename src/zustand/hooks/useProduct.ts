import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { ProductReq, ProductRes, ProductCategoryReq, ProductCategoryRes } from "../types/productT";
import {
    createProductService,
    deleteProductService,
    getProductsService,
    getProductService,
    updateProductService,
    getProductCategoriesService,
    getProductCategoryService,
    createProductCategoryService,
    updateProductCategoryService,
    deleteProductCategoryService
} from "../services/productService";

export const useGetProducts = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProductRes>, ApiError>({
        queryKey: ['products', params],
        queryFn: () => getProductsService(params),
    });
};

export const useGetProduct = (id: string) => {
    return useQuery<ApiSuccess<ProductRes>, ApiError>({
        queryKey: ['product', id],
        queryFn: () => getProductService(id),
        enabled: !!id,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProductRes>, ApiError, ProductReq>({
        mutationFn: createProductService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProductRes>, ApiError, { id: string; formData: Partial<ProductReq> }>({
        mutationFn: updateProductService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProductRes[]>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteProductService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};


// Product Category
export const useGetProductCategories = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ProductCategoryRes>, ApiError>({
        queryKey: ['product-categories', params],
        queryFn: () => getProductCategoriesService(params),
    });
};

export const useGetProductCategory = (id: string) => {
    return useQuery<ApiSuccess<ProductCategoryRes>, ApiError>({
        queryKey: ['product-category', id],
        queryFn: () => getProductCategoryService(id),
        enabled: !!id,
    });
};

export const useCreateProductCategory = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProductCategoryRes>, ApiError, ProductCategoryReq>({
        mutationFn: createProductCategoryService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-categories'] });
        },
    });
};

export const useUpdateProductCategory = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProductCategoryRes>, ApiError, { id: string; formData: Partial<ProductCategoryReq> }>({
        mutationFn: updateProductCategoryService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-categories'] });
        },
    });
};

export const useDeleteProductCategory = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ProductCategoryRes[]>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteProductCategoryService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-categories'] });
        },
    });
};
