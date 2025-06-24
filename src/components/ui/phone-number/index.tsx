import PhoneInput, { Value } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import "./style.css"
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    RegisterOptions,
} from "react-hook-form";
import { Label } from '../label';
import { cn } from '@/utils/format';

interface PhoneNumberProps<T extends FieldValues> extends React.ComponentProps<"input"> {
    id?: string
    label?: string
    rules?: {
        name: import("react-hook-form").Path<T>;
        control: Control<T>;
        options?: Omit<RegisterOptions<T, import("react-hook-form").Path<T>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
        errors: FieldErrors<T>;
    };
    className?: string;
    disabled?: boolean;
}

export default function PhoneNumber<T extends FieldValues = FieldValues>({
    id,
    label,
    rules,
    className,
    disabled,
    onChange,
    value,
}: PhoneNumberProps<T> & { value?: Value }) {
    return (
        <div className='relative space-y-1'>
            {label && (
                <Label htmlFor={id} className="text-right">
                    {label}
                </Label>
            )}
            {rules ? (
                <Controller
                    control={rules.control}
                    name={rules.name}
                    rules={rules.options}
                    render={({ field }) => (
                        <PhoneInput
                            id={id}
                            placeholder="Enter phone number"
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                if (onChange) {
                                    onChange(value as never);
                                }
                            }}
                            defaultCountry="NL"
                            countries={["NL"]}
                            international
                            disabled={disabled}
                            className={
                                cn("ContainerPhoneInputInput flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed md:text-sm col-span-3",
                                    className,
                                    disabled && "opacity-50 cursor-not-allowed"
                                )
                            }
                        />
                    )}
                />
            ) : (
                <PhoneInput
                    id={id}
                    placeholder="Enter phone number"
                    value={value}
                    onChange={onChange as never}
                    defaultCountry="NL"
                    countries={["NL"]}
                    international
                    disabled={disabled}
                    className={cn("ContainerPhoneInputInput flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3",
                        className
                    )}
                />
            )}
            {rules?.errors?.[rules.name]?.message && (
                <div className="text-red-500 text-sm mt-1">{rules.errors[rules.name]?.message as string}</div>
            )}
        </div>
    )
}