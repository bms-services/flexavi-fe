import { useEffect } from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  WorkAgreementDueTypeMap,
  WorkAgreementPaymentMethod,
  WorkAgreementPaymentMethodMap,
  WorkAgreementReq,
} from "@/zustand/types/workAgreementT";
import { InputCurrency } from "@/components/ui/input-currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatEuro } from "@/utils/format";
import { useTranslation } from "react-i18next";
import { useGetWorkAgreementTemplate } from "@/zustand/hooks/useWorkAgreement";

interface PaymentTermsFormProps {
  disabled?: boolean;
  isWorkContractCreate?: boolean;
}

export const PaymentTermsForm: React.FC<PaymentTermsFormProps> = ({
  disabled = false,
  isWorkContractCreate = false,
}) => {
  const { t } = useTranslation();
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<WorkAgreementReq>();

  const getWorkAgreementTemplateZ = useGetWorkAgreementTemplate(isWorkContractCreate);

  const paymentMethod = watch("payment.payment_method");
  const totalAmount = watch("total_amount");
  const terms = watch("payment.terms") || [];

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "payment.terms",
  });

  const handleMethodChange = (value: WorkAgreementPaymentMethod) => {
    setValue("payment.payment_method", value);
  };

  const handleAddInstallment = () => {
    append({
      percentage: 0,
      description: "Betaling",
      status: "by_order",
      total_price: 0,
    });
  };

  const totalPercentage = terms.reduce(
    (sum, term) => sum + Number(term.percentage || 0),
    0
  );

  // Sync total_price dan total_percentage
  useEffect(() => {
    fields.forEach((field, index) => {
      const percentage = watch(`payment.terms.${index}.percentage`) || 0;
      const calculatedTotal = (Number(totalAmount) * Number(percentage)) / 100;

      setValue(`payment.terms.${index}.total_price`, calculatedTotal, {
        shouldDirty: true,
        shouldValidate: false,
      });
    });

    setValue("payment.total_percentage", totalPercentage, {
      shouldValidate: true,
    });
  }, [fields, totalAmount, totalPercentage, setValue, watch]);


  useEffect(() => {
    if (getWorkAgreementTemplateZ.isSuccess && getWorkAgreementTemplateZ.data?.result) {
      const data = getWorkAgreementTemplateZ.data.result;

      setValue("warranty", Number(data.warranty ?? 0));
      setValue("exclusions", data.exclusions.map((e) => ({ description: e.description })));
      setValue("payment.payment_method", data.payment.payment_method as WorkAgreementPaymentMethod);
      setValue("payment.total_cash", Number(data.payment.total_cash ?? 0));
      setValue("payment.total_percentage", 0);

      replace(
        (data.payment.terms ?? []).map((term) => ({
          ...term,
          id: term.id || `${Date.now()}-${Math.random()}`, // fallback id
          percentage: Number(term.percentage),
          total_price: Number(term.total_price),
        }))
      );
    }
  }, [getWorkAgreementTemplateZ.isSuccess, getWorkAgreementTemplateZ.data, setValue, replace]);

  return (
    <div className="space-y-4">
      <Label>Betaalmethode</Label>

      <Controller
        control={control}
        name="payment.payment_method"
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(val) => {
              field.onChange(val);
              handleMethodChange(val as WorkAgreementPaymentMethod);
            }}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer betaalmethode" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(WorkAgreementPaymentMethodMap).map(
                ([_, method]) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        )}
      />

      {(paymentMethod === "cash" || paymentMethod === "bank_cash") && (
        <InputCurrency
          id="total_cash"
          label="Contant te betalen bij oplevering"
          rules={{
            control,
            name: "payment.total_cash",
            options: { required: "Contant bedrag is verplicht" },
            errors,
          }}
        />
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Betaaltermijnen</Label>
          {!disabled && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddInstallment}
            >
              <Plus className="h-4 w-4 mr-1" /> Termijn toevoegen
            </Button>
          )}
        </div>

        {fields.length > 0 ? (
          <>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-2 items-start py-2 border-b last:border-0"
              >
                <div className="col-span-5">
                  <Input
                    placeholder="Omschrijving"
                    disabled={disabled}
                    rules={{
                      register,
                      name: `payment.terms.${index}.description`,
                      options: {
                        required: t("product.error.required.description"),
                      },
                      errors,
                    }}
                  />
                  {errors.payment?.terms?.[index]?.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.payment.terms[index].description.message}
                    </p>
                  )}
                </div>
                <div className="col-span-3">
                  <Controller
                    control={control}
                    name={`payment.terms.${index}.status`}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(WorkAgreementDueTypeMap).map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <InputCurrency
                    id={`percentage-${index}`}
                    isPercent
                    rules={{
                      control,
                      name: `payment.terms.${index}.percentage`,
                      options: {
                        required: t("product.error.required.vat"),
                        validate: {
                          range: value => {
                            const numValue = parseFloat(value as string);
                            return (numValue >= 0 && numValue <= 100) || t('product.error.range.vat');
                          }
                        },
                      },
                      errors,
                    }}
                  />
                  {errors.payment?.terms?.[index]?.percentage && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.payment.terms[index].percentage.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {formatEuro(
                      (totalAmount *
                        (Number(watch(`payment.terms.${index}.percentage`)) || 0)) /
                      100
                    )}
                  </span>
                  {!disabled && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-between text-sm mt-2">
              <span>Totaal percentage:</span>
              <span
                className={`font-medium ${totalPercentage !== 100 ? "text-red-500" : "text-green-500"
                  }`}
              >
                {totalPercentage}%
              </span>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span>Totaal bedrag:</span>
              <span className="font-medium">{formatEuro(totalAmount)}</span>
            </div>

            {totalPercentage !== 100 && !disabled && (
              <p className="text-sm text-red-500 mt-1">
                Het totaal moet {100 - totalPercentage}% zijn om de termijnen compleet te maken.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Geen betaaltermijnen toegevoegd. Klik op de knop om een
            betaaltermijn toe te voegen.
          </p>
        )}

        <input
          type="hidden"
          {...register("payment.total_percentage", {
            validate: (value) => {
              const numeric = Number(value);
              if (numeric === 0 || numeric === 100) return true;
              return "Totaal percentage moet 100% of 0% zijn";
            },
          })}
        />

        {errors.payment?.total_percentage && (
          <p className="text-sm text-red-500 mt-1">
            {errors.payment.total_percentage.message}
          </p>
        )}
      </div>
    </div>
  );
};