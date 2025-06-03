import { mainApi } from "@/utils/axios";
import handleErrorAxios from "@/utils/errorHandler";
import { PaymentMethod } from "@stripe/stripe-js";

export const createSetupIntent = async () => {
    try {
        const response = await mainApi.post("/setting/intent");
        return response.data;
    } catch (error) {
        throw handleErrorAxios(error);
    }
};

export const updatePayment = async (
    payment_method_id: string,
    billing_address?: {
        street?: string;
        city?: string;
        postal_code?: string;
        country?: string;
    }
) => {
    try {
        // BE endpoint: PUT /setting/payment
        const response = await mainApi.put("/setting/payment", {
            payment_method_id,
            billing_address,
        });
        return response.data;
    } catch (error) {
        throw handleErrorAxios(error);
    }
};
