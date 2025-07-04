import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiSuccess } from "@/zustand/types/apiT";
import { SignatureRes } from "../types/signatureT";
import {
    createSignatureTemplateService,
    deleteSignatureTemplateService,
    getSignatureTemplateService,
    updateSignatureTemplateService,
} from "../services/signatureService";


export const useGetSignatureTemplate = () => {
    return useQuery<ApiSuccess<SignatureRes>, ApiError>({
        queryKey: ['signature'],
        queryFn: () => getSignatureTemplateService(),
    });
};

export const useCreateSignatureTemplate = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<SignatureRes>, ApiError, FormData>({
        mutationFn: createSignatureTemplateService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['signatures'] });
        },
    });
};

export const useUpdateSignatureTemplate = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<SignatureRes>, ApiError, { formData: FormData }>({
        mutationFn: updateSignatureTemplateService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['signatures'] });
        },
    });
};

export const useDeleteSignatureTemplate = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiSuccess<SignatureRes[]>, ApiError, { ids: string[]; force: boolean }>({
        mutationFn: ({ ids, force }) => deleteSignatureTemplateService(ids, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['signatures'] });
        },
    });
};
