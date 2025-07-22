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
import { wrap } from "module";

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
    containerClassName?: string;
    rules?: {
        name: FieldPath<T>;
        control: Control<T>;
        options?: RegisterOptions<T>;
        errors: FieldErrors<T>;
    };
    wrapperClassName?: string;
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
    containerClassName,
    wrapperClassName,
    ...props
}: DateRangePickerProps<T>) => {
    return (
        <div className={cn("relative space-y-1", containerClassName)}>
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
                            dateFormat={dateFormat ?? "dd/MM/yyyy"}
                            className={cn("w-full px-3 py-2 border rounded text-sm focus-visible:outline-none focus-visible:border-primary", className)}
                            placeholderText={`${placeholder[0]} - ${placeholder[1]}`}
                            isClearable
                            wrapperClassName={wrapperClassName}
                            {...props}
                        />
                    )}
                />
            ) : (
                <DatePicker
                    id={id}
                    selectsRange
                    startDate={value?.[0] || null}
                    endDate={value?.[1] || null}
                    onChange={onChange}
                    disabled={disabled}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat={dateFormat ?? "dd/MM/yyyy"}
                    className={cn("w-full min-h-[40px] rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)}
                    placeholderText={`${placeholder[0]} - ${placeholder[1]}`}
                    isClearable
                    wrapperClassName={wrapperClassName}
                    {...props}
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