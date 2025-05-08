import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import * as RadixSelect from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface SelectProps extends RadixSelect.SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  rules?: {
    name: string;
    control?: Control<FieldValues>;
    options?: RegisterOptions;
    errors: FieldErrors<FieldValues>;
  };
  id?: string;
  placeholder?: string;
  triggerClassname?: string;
  selectClassname?: string;
  valueClassname?: string;
  contentClassname?: string;
  itemClassname?: string;
}

const SelectPrimary: React.FC<SelectProps> = ({
  id,
  placeholder,
  label,
  options,
  rules,
  triggerClassname,
  selectClassname,
  valueClassname,
  contentClassname,
  itemClassname,
  ...props
}) => {
  return (
    <div className="relative space-y-1">
      {label && <Label htmlFor={id}>{label}</Label>}

      {rules?.control ?
        (
          <Controller
            control={rules.control}
            name={rules.name}
            rules={{ ...rules.options }}
            render={({ field }) => (
              <RadixSelect.Root
                onValueChange={(value) => {
                  field.onChange(value);
                  field.onBlur();
                }}
                value={field.value || ""}
              >
                <SelectTrigger id={id}
                  className={cn(triggerClassname, '!rounded-[6px] !ring-0 !outline-none !shadow-none focus-within:border-primary')}>
                  <SelectValue placeholder={placeholder ?? "Selecteer..."} className={valueClassname} />
                </SelectTrigger>
                <SelectContent className={contentClassname}>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className={itemClassname}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </RadixSelect.Root>
            )}
          />
        ) : (
          <RadixSelect.Root {...props}>
            <SelectTrigger id={id} className={cn(triggerClassname, '!rounded-[6px] !ring-0 !outline-none !shadow-none focus-within:border-primary')}>
              <SelectValue placeholder={placeholder ?? "Selecteer..."} className={valueClassname} />
            </SelectTrigger>
            <SelectContent className={contentClassname}>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className={itemClassname}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </RadixSelect.Root>
        )}

      {rules?.errors?.[rules.name] && (
        <div className="text-red-500 text-sm mt-1">
          {rules.errors[rules.name]?.message as string}
        </div>
      )}
    </div>
  );
};

export { SelectPrimary };
