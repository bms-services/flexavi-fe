import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import "./style.css"
import {
    Control,
    Controller,
    FieldErrors,
    RegisterOptions,
} from "react-hook-form";
import { Label } from '../label';
import { cn } from '@/lib/utils';

interface PhoneNumberProps<T> extends React.ComponentProps<"input"> {
    id?: string
    label?: string
    rules?: {
        name: string;
        control: Control<T>;
        options?: RegisterOptions;
        errors: FieldErrors<T>;
    };
    className?: string;
    disabled?: boolean;
}

export default function PhoneNumber({ id, label, rules, className }: PhoneNumberProps<T>) {
    return (
        <div className='relative space-y-1'>
            {label && (
                <Label htmlFor={id} className="text-right">
                    {label}
                </Label>
            )}
            <Controller
                control={rules.control}
                name={rules.name}
                rules={rules.options}
                render={({ field }) => (
                    <PhoneInput
                        id={id}
                        placeholder="Enter phone number"
                        value={field.value}
                        onChange={field.onChange}
                        defaultCountry="NL"
                        countries={["NL"]}
                        international
                        disabled
                        className={
                            cn("ContainerPhoneInputInput flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3",
                                className
                            )
                        }
                    />
                )}
            />
            {rules?.errors[rules.name] && (
                <div className="text-red-500 text-sm mt-1">{rules.errors[rules.name].message as string}</div>
            )}
        </div>
    )
}