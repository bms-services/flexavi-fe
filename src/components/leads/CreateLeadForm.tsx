
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createLeadSchema, type CreateLeadFormData } from "@/utils/validations";

interface CreateLeadFormProps {
  onSubmit: (values: CreateLeadFormData) => void;
  onCancel: () => void;
}

export const CreateLeadForm: React.FC<CreateLeadFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const form = useForm<CreateLeadFormData>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      postcode: "",
      huisnummer: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  const handleSubmit = (data: CreateLeadFormData) => {
    // The data is already transformed by Zod
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naam</FormLabel>
              <FormControl>
                <Input
                  placeholder="Volledige naam"
                  {...field}
                  autoComplete="name"
                />
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
                <Input
                  type="email"
                  placeholder="Email adres"
                  {...field}
                  autoComplete="email"
                />
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
                <Input
                  placeholder="+31612345678"
                  {...field}
                  autoComplete="tel"
                  type="tel"
                />
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
                  <Input
                    placeholder="1234 AB"
                    {...field}
                    autoComplete="postal-code"
                  />
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
                  <Input
                    placeholder="42"
                    {...field}
                    autoComplete="address-line1"
                  />
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
