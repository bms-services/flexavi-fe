import axios from "axios";
import { toast } from "sonner";

const postCodeUrl = import.meta.env.VITE_POST_CODE_API_URL;
const postCodeKey = import.meta.env.VITE_POST_CODE_API_KEY;

interface PostCodeParams {
  postalCode: string;
  streetNumber: string;
  premise: string;
}

export const getAddressDetailByPostalCode =
  ({ postalCode, streetNumber, premise }: PostCodeParams) =>
  async () => {
    try {
      const response = await axios.get(`${postCodeUrl}/v2/autocomplete/nl`, {
        params: {
          authKey: postCodeKey,
          postalCode,
          streetNumber,
          premise,
        },
      });

      return response.data;
    } catch (error) {
      toast.error("Er is iets misgegaan, probeer het opnieuw");
    }
  };

export const getPostalCodeAutoComplete = (postalCode: string) => async () => {
  try {
    const response = await axios.get(
      `${postCodeUrl}/v2/suggest/nl/postalCode`,
      {
        params: {
          authKey: postCodeKey,
          postalCode,
        },
      }
    );

    return response.data;
  } catch (error) {
    toast.error("Er is iets misgegaan, probeer het opnieuw");
  }
};
