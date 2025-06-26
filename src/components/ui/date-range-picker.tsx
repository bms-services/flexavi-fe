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

interface DateRangePickerProps<T extends FieldValues> {
    id?: string;
    label?: string;
    placeholder?: [string, string];
    className?: string;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    dateFormat?: string;
    value?: [Date | null, Date | null];
    onChange?: (range: [Date | null, Date | null]) => void;
    rules?: {
        name: FieldPath<T>;
        control: Control<T>;
        options?: RegisterOptions<T>;
        errors: FieldErrors<T>;
    };
}

export const DateRangePicker = <T extends FieldValues>({
    id,
    label,
    placeholder = ["Start date", "End date"],
    className,
    minDate,
    maxDate,
    disabled = false,
    dateFormat = "dd-MM-yyyy",
    value,
    onChange,
    rules,
}: DateRangePickerProps<T>) => {
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
                            selectsRange
                            startDate={field.value?.[0] ? new Date(field.value[0]) : null}
                            endDate={field.value?.[1] ? new Date(field.value[1]) : null}
                            onChange={(range) => field.onChange(range)}
                            disabled={disabled}
                            minDate={minDate}
                            maxDate={maxDate}
                            dateFormat={dateFormat}
                            className={cn("w-full px-3 py-2 border rounded text-sm", className)}
                            placeholderText={`${placeholder[0]} - ${placeholder[1]}`}
                            isClearable
                        />
                    )}
                />
            ) : (
                <DatePicker
                    id={id}
                    selectsRange
                    startDate={value?.[0] || null}
                    endDate={value?.[1] || null}
                    onChange={(range) => onChange?.(range as [Date | null, Date | null])}
                    disabled={disabled}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat={dateFormat}
                    className={cn("w-full px-3 py-2 border rounded text-sm", className)}
                    placeholderText={`${placeholder[0]} - ${placeholder[1]}`}
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