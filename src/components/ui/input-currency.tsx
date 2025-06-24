import React from "react";
import { Label } from "./label";
import CurrencyInputCore, { CurrencyInputProps } from "react-currency-input-field";
import {
  FieldValues,
  FieldErrors,
  Path,
  RegisterOptions,
  FieldError,
  Control,
  Controller,
} from "react-hook-form";
import { cn } from "@/utils/format";

interface CurrencyInputC<T extends FieldValues> extends Omit<CurrencyInputProps, "name" | "value" | "onValueChange"> {
  label?: string;
  icon?: React.ReactNode;
  rules?: {
    name: Path<T>;
    control: Control<T>;
    options?: RegisterOptions<T>;
    errors: FieldErrors<T>;
  };
  isPercent?: boolean;
  error?: FieldError;
}

const InputCurrency = React.forwardRef(<T extends FieldValues,>(
  { className, label, icon, rules, error, isPercent = false, ...props }: CurrencyInputC<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <div className="relative space-y-1">
      {label && (
        <Label htmlFor={props.id} className="text-right">{label}</Label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-muted-foreground">{icon}</span>
        )}

        {rules?.control ? (
          <Controller
            control={rules.control}
            name={rules.name}
            rules={rules.options}
            render={({ field }) => (
              <CurrencyInputCore
                id={props.id}
                defaultValue={0}
                prefix={!isPercent ? "€ " : undefined}
                suffix={isPercent ? " %" : undefined}
                decimalScale={2}
                decimalsLimit={2}
                allowNegativeValue={false}
                allowDecimals={true}
                groupSeparator="."
                decimalSeparator=","
                intlConfig={!isPercent ? { locale: 'nl-NL', currency: 'EUR' } : undefined}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  icon ? "pl-10" : "pl-4",
                  className
                )}
                value={field.value ?? ""}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                {...props}
                ref={ref}
              />
            )}
          />
        ) : (
          <CurrencyInputCore
            id={props.id}
            defaultValue={0}
            {...props}
            ref={ref}
          />
        )}
      </div>
      {rules?.errors[rules.name] && (
        <div className="text-red-500 text-sm mt-1">
          {rules.errors[rules.name]?.message as string}
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error.message as string}
        </div>
      )}
    </div>
  );
}) as <T extends FieldValues>(
  props: CurrencyInputC<T> & { ref?: React.Ref<HTMLInputElement> }
) => JSX.Element;

export { InputCurrency };