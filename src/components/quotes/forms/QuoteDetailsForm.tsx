
import React from "react";
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
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { QuotationReq, QuotationStatusOptions } from "@/zustand/types/quotationT";
import PostalCode from "@/components/ui/postal-code";

export const QuoteDetailsForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<QuotationReq>();

  return (
    <div className="space-y-4">
      <Textarea
        id="description"
        label="Omschrijving"
        placeholder="Bijv. Dakrenovatie en isolatie"
        rules={{
          register,
          name: "description",
          options: {
            required: t('quotation.error.required.description'),
          },
          errors,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="plannedStartDate"
          label="Geplande startdatum"
          type="date"
          rules={{
            register,
            name: "planned_start_date",
            options: {
              required: t('quotation.error.required.plannedStartDate'),
            },
            errors,
          }}
        />
        <div>
          <Label htmlFor="status">Status</Label>
          <Controller
            control={control}
            name="status"
            rules={{ required: t('quotation.error.required.status') }}
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
                  {QuotationStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.status && (
            <p className="text-red-500 text-sm mt-1">
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
        placeholder="Interne notities voor deze offerte"
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
