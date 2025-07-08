import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { ExpenseReq, ExpenseRes } from "../types/expenseT";
import {
    createExpenseService,
    deleteExpenseService,
    getExpensesService,
    getExpenseService,
    updateExpenseService
} from "../services/expenseService";
import { useNavigate } from "react-router-dom";

export const useGetExpenses = (params: ParamGlobal) => {
    return useQuery<ApiSuccessPaginated<ExpenseRes>, ApiError>({
        queryKey: ['expenses', params],
        queryFn: () => getExpensesService(params),
    });
};

export const useGetExpense = (id: string) => {
    return useQuery<ApiSuccess<ExpenseRes>, ApiError>({
        queryKey: ['expense', id],
        queryFn: () => getExpenseService(id),
        enabled: !!id,
    });
};

export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<ApiSuccess<ExpenseRes>, ApiError, FormData>({
        mutationFn: createExpenseService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            navigate('/expenses');
        },
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ExpenseRes>, ApiError, { id: string; formData: Partial<FormData> }>({
        mutationFn: updateExpenseService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<ExpenseRes[]>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteExpenseService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};
