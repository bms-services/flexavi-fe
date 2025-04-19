
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 karakters bevatten"),
  email: z.string().email("Ongeldig email adres"),
  phone: z.string().min(10, "Ongeldig telefoonnummer"),
  postcode: z.string().regex(/^[1-9][0-9]{3} ?[A-Z]{2}$/i, "Ongeldige postcode"),
  huisnummer: z.string().min(1, "Huisnummer is verplicht"),
});

interface CreateLeadFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

export const CreateLeadForm: React.FC<CreateLeadFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      postcode: "",
      huisnummer: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naam</FormLabel>
              <FormControl>
                <Input placeholder="Volledige naam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email adres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefoonnummer</FormLabel>
              <FormControl>
                <Input placeholder="Telefoonnummer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input placeholder="Bijv. 1234 AB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="huisnummer"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Huisnummer</FormLabel>
                <FormControl>
                  <Input placeholder="Nr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Annuleren
          </Button>
          <Button type="submit">Lead Toevoegen</Button>
        </div>
      </form>
    </Form>
  );
};
