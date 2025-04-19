
import { z } from "zod";

export const postcodeSchema = z
  .string()
  .trim()
  .regex(/^[1-9][0-9]{3}\s?[A-Z]{2}$/i, {
    message: "Vul een geldige postcode in (bijv. 1234 AB)",
  })
  .transform((val) => {
    // Format postcode consistently (e.g., "1234 AB")
    const cleaned = val.toUpperCase().replace(/\s+/g, "");
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  });

export const huisnummerSchema = z
  .string()
  .trim()
  .regex(/^[1-9][0-9]*([a-zA-Z]|-[1-9][0-9]*)?$/, {
    message: "Vul een geldig huisnummer in (bijv. 42, 12A of 12-1)",
  });

export const createLeadSchema = z.object({
  name: z
    .string()
    .min(2, "Naam moet minimaal 2 karakters bevatten")
    .max(100, "Naam mag maximaal 100 karakters bevatten"),
  email: z
    .string()
    .email("Ongeldig emailadres")
    .max(100, "Email mag maximaal 100 karakters bevatten"),
  phone: z
    .string()
    .regex(/^(?:0|(?:\+|00)31)[1-9][0-9]{8}$/, {
      message: "Vul een geldig Nederlands telefoonnummer in",
    })
    .transform((val) => {
      // Format phone number consistently
      return val.startsWith("+31")
        ? val
        : val.startsWith("0031")
        ? "+31" + val.slice(4)
        : val.startsWith("0")
        ? "+31" + val.slice(1)
        : val;
    }),
  postcode: postcodeSchema,
  huisnummer: huisnummerSchema,
});

export type CreateLeadFormData = z.infer<typeof createLeadSchema>;
