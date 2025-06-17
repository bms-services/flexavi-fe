import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiError, ApiSuccess } from "@/zustand/types/apiT";
import { requestEmailVerificationMyProfileService, showMyProfileService, updateMyProfileService, verifyEmailMyProfileService } from "../services/profileService";
import { ProfileRes } from "../types/profileT";

export const useShowMyProfile = () => {
    return useQuery<ApiSuccess<ProfileRes>, ApiError>({
        queryKey: ['my-profile'],
        queryFn: showMyProfileService,
    });
}

export const useUpdateMyProfile = () => {
    return useMutation<ApiSuccess<ProfileRes>, ApiError, { id: string; formData: FormData }>({
        mutationFn: updateMyProfileService,
    });
};

export const useRequestEmailVerificationMyProfile = () => {
    return useMutation<ApiSuccess<ProfileRes>, ApiError>({
        mutationFn: requestEmailVerificationMyProfileService,
    });
};

export const useVerifyEmailMyProfile = () => {
    return useMutation<ApiSuccess<ProfileRes>, ApiError, string>({
        mutationFn: verifyEmailMyProfileService,
    });
};