import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/utils/format";
import {
    Control,
    Controller,
    FieldErrors,
    FieldPath,
    FieldValues,
    RegisterOptions,
} from "react-hook-form";
import { Label } from "./label";

interface DateSinglePickerProps<T extends FieldValues> {
    id?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    dateFormat?: string;
    value?: string | Date | null;
    onChange?: (val: Date | null) => void;
    rules?: {
        name: FieldPath<T>;
        control: Control<T>;
        options?: RegisterOptions<T>;
        errors: FieldErrors<T>;
    };
}

export const DateSinglePicker = <T extends FieldValues>({
    id,
    label,
    placeholder = "Select date",
    className,
    minDate,
    maxDate,
    disabled = false,
    dateFormat = "dd-MM-yyyy",
    value,
    onChange,
    rules,
}: DateSinglePickerProps<T>) => {
    return (
        <div className="relative space-y-1">
            {label && (
                <Label htmlFor={id} className="text-right">
                    {label}
                </Label>
            )}
            {rules?.control ? (
                <Controller
                    control={rules.control}
                    name={rules.name}
                    rules={rules.options}
                    render={({ field }) => (
                        <DatePicker
                            id={id}
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date)}
                            disabled={disabled}
                            minDate={minDate}
                            maxDate={maxDate}
                            dateFormat={dateFormat}
                            className={cn("w-full px-3 py-2 border rounded text-sm", className)}
                            placeholderText={placeholder}
                            isClearable
                        />
                    )}
                />
            ) : (
                <DatePicker
                    id={id}
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
                    disabled={disabled}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat={dateFormat}
                    className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)}
                    placeholderText={placeholder}
                    isClearable
                />
            )}
            {rules?.errors?.[rules.name] && (
                <div className="text-red-500 text-sm mt-1">
                    {rules.errors[rules.name]?.message as string}
                </div>
            )}
        </div>
    );
};