import React, { } from "react";
import { Button } from "@/components/ui/button";
import { Save, XCircle } from "lucide-react";

import { ReceiptSection } from "./form-sections/ReceiptSection";
import { ExpenseReq, ExpenseRes, ExpenseStatusMap } from "@/zustand/types/expenseT";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="">
                <Label htmlFor="type">Type uitgave</Label>
                <Select
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ExpenseStatusMap).map(([value, option]) => (
                      <SelectItem key={value} value={value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
          </div>
        </CardContent>
      </Card>
      <ReceiptSection isEditing={isEditing} />
    </div>
  );
};
