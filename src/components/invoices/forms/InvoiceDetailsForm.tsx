import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { InvoiceReq, InvoiceStatusMap } from "@/zustand/types/invoiceT";
import PostalCode from "@/components/ui/postal-code";

export const InvoiceDetailsForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<InvoiceReq>();

  return (
    <div className="space-y-4">
      <Textarea
        id="description"
        label="Omschrijving"
        placeholder="Bijv. Factuur dakrenovatie"
        rules={{
          register,
          name: "description",
          options: {
            required: t("invoice.error.required.description"),
          },
          errors,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="dueDate"
          type="date"
          label="Vervaldatum"
          rules={{
            register,
            name: "expiration_date",
            options: {
              required: t("invoice.error.required.dueDate"),
            },
            errors,
          }}
        />
        <Input
          id="paymentDate"
          type="date"
          label="Betaaldatum"
          rules={{
            register,
            name: "payment_date",
            options: {
              required: t("invoice.error.required.paymentDate"),
            },
            errors,
          }}
        />

        <div>
          <Label htmlFor="status">Status</Label>
          <Controller
            control={control}
            name="status"
            rules={{
              required: t("invoice.error.required.status"),
            }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(InvoiceStatusMap).map(([key, item]) => (
                    <SelectItem key={key} value={key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.status && (
            <p className="text-sm text-red-500 mt-1">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      <PostalCode
        register={register}
        fieldPrefix="address"
        errors={errors}
        control={control}
        watch={watch}
        setValue={setValue}
      />


      <Textarea
        id="notes"
        label="Notities"
        placeholder="Interne notities voor deze factuur"
        rows={3}
        rules={{
          register,
          name: "notes",
          options: {},
          errors,
        }}
      />
    </div>
  );
};