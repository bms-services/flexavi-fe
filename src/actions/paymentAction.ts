import { mainApi } from "@/utils/axios";
import handleErrorAxios from "@/utils/errorHandler";
import { PaymentMethod } from "@stripe/stripe-js";

// Without Redux
// export const createSetupIntent = async () => {
//   try {
//     const response = await mainApi.post("/payment/setup-intent");
//     return response.data;
//   } catch (error) {
//     throw handleErrorAxios(error);
//   }
// };

// export const updatePayment = async (
//   setup_intent_id: string | PaymentMethod
// ) => {
//   try {
//     const response = await mainApi.put("/profile/payment", {
//       setup_intent_id,
//     });
//     return response.data;
//   } catch (error) {
//     throw handleErrorAxios(error);
//   }
// };
