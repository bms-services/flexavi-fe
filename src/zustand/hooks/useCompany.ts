import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiError, ParamGlobal } from "@/zustand/types/apiT";
import { CompanyReq, CompanyRes } from "../types/companyT";
import {
    createCompanyService,
    deleteCompanyService,
    getCompaniesService,
    getCompanyService,
    updateCompanyService,
} from "../services/companyService";

export const useCompanies = (params?: ParamGlobal) => {
    return useQuery({
        queryKey: ['companies', params],
        queryFn: () => getCompaniesService(params),
    });
};

export const useCompany = (id: string) => {
    return useQuery({
        queryKey: ['company', id],
        queryFn: () => getCompanyService(id),
        enabled: !!id,
    });
};

export const useCreateCompany = () => {
    return useMutation<CompanyRes, ApiError, CompanyReq>({
        mutationFn: createCompanyService,
    });
};

export const useUpdateCompany = () => {
    return useMutation<CompanyRes, ApiError, { id: string; formData: Partial<CompanyReq> }>({
        mutationFn: updateCompanyService,
    });
};

export const useDeleteCompany = () => {
    return useMutation<CompanyRes, ApiError, string>({
        mutationFn: deleteCompanyService,
    });
};