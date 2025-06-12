import { mainApi } from "@/utils/axios";
import { CompanyRes } from "../types/companyT";
import { ProfileRes } from "../types/profileT";
import { ApiSuccess } from "../types/apiT";

export const showMyProfileService = async (): Promise<ApiSuccess<ProfileRes>> => {
    const { data } = await mainApi.get("/profile");
    if (!data.success) throw data;
    return data;
};

export const updateMyProfileService = async ({ id, formData }: { id: string, formData: FormData }): Promise<ApiSuccess<ProfileRes>> => {
    const { data } = await mainApi.patch(`/profile/${id}`, formData);
    if (!data.success) throw data;
    return data;
};

export const requestEmailVerificationMyProfileService = async (): Promise<ApiSuccess<ProfileRes>> => {
    const { data } = await mainApi.post("/profile/email");
    if (!data.success) throw data;
    return data;
}

export const verifyEmailMyProfileService = async (email_verification_code: string): Promise<ApiSuccess<ProfileRes>> => {
    const { data } = await mainApi.put(`/profile/email`, { email_verification_code });
    if (!data.success) throw data;
    return data;
}
