import React, { useEffect, useState } from "react";

import { ExpenseReq, ExpenseStatusMap, ExpenseTypeMap } from "@/zustand/types/expenseT";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTranslation } from "react-i18next";
import { Control, Controller, FieldErrors, FieldValues, useFormContext, useWatch } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { InputCurrency } from "../ui/input-currency";
import { DropZoneAlpha } from "../ui/drop-zone-alpha/DropZoneAlpha";
import { InputTags } from "../ui/input-tags";

interface ExpenseFormProps {
  isEditing?: boolean;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  isEditing = false,
}) => {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ExpenseReq>();

  const watchedAmount = useWatch({ name: "amount", control });
  const watchedPercentage = useWatch({ name: "percentage", control });

  useEffect(() => {
    const amount = parseFloat(String(watchedAmount));
    const percentage = parseFloat(String(watchedPercentage));

    if (!isNaN(amount) && !isNaN(percentage)) {
      const vat = (amount * percentage) / 100;
      const total = amount + vat;

      setValue("vat_amount", parseFloat(vat.toFixed(2)));
      setValue("total_amount", parseFloat(total.toFixed(2)));
    }
  }, [watchedAmount, watchedPercentage, setValue]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Uitgave bewerken" : "Nieuwe uitgave toevoegen"}
          </CardTitle>
          <CardDescription>
            {isEditing ? "Wijzig uitgave" : "Nieuwe uitgave toevoegen"}
            <span className="text-sm text-muted-foreground">
              Vul de details van de uitgave in om deze toe te voegen of te bewerken.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Bedrijf"
                id="company"
                name="company"
                rules={{
                  register,
                  name: "company",
                  options: {
                    required: t('expense.error.required.company'),
                  },
                  errors,
                }}
              />
              <Input
                id="due_date"
                label="Geplande startdatum"
                type="date"
                rules={{
                  register,
                  name: "due_date",
                  options: {
                    required: t('expense.error.required.dueDate'),
                  },
                  errors,
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <InputCurrency
                id="amount"
                label="Bedrag (excl. BTW)"
                rules={{
                  control,
                  name: "amount",
                  options: { required: t('expense.error.required.amount') },
                  errors,
                }}
              />
              <InputCurrency
                id="percentage"
                label="BTW percentage"
                isPercent
                rules={{
                  control,
                  name: "percentage",
                  options: {
                    required: t('expense.error.required.vatPercentage'),
                    validate: {
                      range: value => {
                        const numValue = parseFloat(value as string);
                        return (numValue >= 0 && numValue <= 100) || t('expense.error.range.vat');
                      }
                    }
                  },
                  errors,
                }}
              />
              <InputCurrency
                id="vat_amount"
                label="BTW bedrag"
                disabled={true}
                rules={{
                  control,
                  name: "vat_amount",
                  options: { required: t('expense.error.required.vat') },
                  errors,
                }}
              />
              <InputCurrency
                id="total_amount"
                label="Totaalbedrag (incl. BTW)"
                disabled={true}
                rules={{
                  control,
                  name: "total_amount",
                  options: { required: t('expense.error.required.total') },
                  errors,
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="">
                <Label htmlFor="projectId">Project (optioneel)</Label>
                <Select
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Koppel aan project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Geen project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Type uitgave</Label>
                <Select
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ExpenseTypeMap).map(([value, option]) => (
                      <SelectItem key={value} value={value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                        {Object.entries(ExpenseStatusMap).map(([value, option]) => (
                          <SelectItem key={value} value={value}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Textarea
                label="Omschrijving"
                id="description"
                name="description"
                rules={{
                  register,
                  name: "description",
                  options: {
                  },
                  errors,
                }}
              />

              <Textarea
                label="Notities"
                id="notes"
                name="notes"
                rows={3}
                placeholder="Aanvullende notities voor deze uitgave..."
                rules={{
                  register,
                  name: "notes",
                  options: {},
                  errors,
                }}
              />
            </div>

            <InputTags
              label="Tags"
              name="tags"
              control={control}
            />

            <DropZoneAlpha
              label="Upload Files"
              multiple={true}
              accept={{
                "image/*": [".jpg", ".jpeg", ".png", ".webp"],
                "application/pdf": [".pdf"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                "application/vnd.ms-excel": [".xls", ".xlsx"],
                "text/plain": [".txt"],
              }}
              maxFiles={2}
              maxSize={2 * 1024 * 1024}
              rules={{
                name: "attachments",
                control: control as unknown as Control<FieldValues>,
                options: {
                  required: t('expense.error.required.attachments'),
                  validate: {
                    maxFiles: (value) => {
                      const files = value as File[];
                      return files.length <= 2 || t('expense.error.maxFiles.attachments');
                    },
                  },
                },
                errors: errors as FieldErrors<FieldValues>,
              }}
            />
          </div>
        </CardContent>
      </Card>
      {/* <ReceiptSection isEditing={isEditing} /> */}
    </div>
  );
};
