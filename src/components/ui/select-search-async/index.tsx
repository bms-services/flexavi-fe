import "./style.css"
import AsyncSelect from 'react-select/async';

import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    RegisterOptions,
} from "react-hook-form";

import { Label } from '../label';
import { ActionMeta } from "react-select";

interface SelectSearchAsyncProps extends React.ComponentProps<typeof AsyncSelect> {
    id?: string
    label?: string
    rules?: {
        name: string;
        control: Control<FieldValues>;
        options?: RegisterOptions;
        errors: FieldErrors<FieldValues>;
    };
    // defaultOptions: Option[];
    isLoading?: boolean;
    isDisabled?: boolean;
    onChange?: (newValue: Option | null, actionMeta: ActionMeta<Option>) => void;
    // loadOptions: (inputValue: string, callback: (options: OptionsOrGroups<Option, GroupBase<Option>>) => void) => void;
}

export interface Option {
    readonly label: string;
    readonly value: string;
}

export default function SelectSearchAsync({ id, label, rules, isLoading, isDisabled, ...props }: SelectSearchAsyncProps) {
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
                    <AsyncSelect
                        isClearable
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        // cacheOptions
                        // loadOptions={loadOptions}
                        // defaultOptions={defaultOptions}
                        value={field.value}
                        className='text-sm'
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: state.isFocused ? "1px solid hsl(var(--primary))" : "1px solid hsl(var(--input))",
                                borderRadius: "6px",
                                outline: "none",
                                backgroundColor: "hsl(210 50% 98%)",
                                boxShadow: "none",
                                "&:hover": {
                                    border: "1px solid hsl(var(--input))",
                                },
                            }),
                            menu: (provided, state) => ({
                                ...provided,
                                borderRadius: "6px",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? "hsl(var(--primary))" : "white",
                                color: state.isSelected ? "white" : "black",
                                "&:hover": {
                                    backgroundColor: "hsl(var(--primary))",
                                    color: "white",
                                },
                            }),
                            input: (provided) => ({
                                ...provided,
                                padding: "6px 0px",
                            }),
                        }}
                        {...props}
                        onChange={(newValue: Option, actionMeta: ActionMeta<Option>) => {
                            field.onChange(newValue);
                            if (props.onChange) {
                                props.onChange(newValue, actionMeta);
                            }
                        }}
                    />
                )}
            />
            {rules?.errors?.[rules.name] && (
                <div className="text-red-500 text-sm mt-1">{rules.errors[rules.name].message as string}</div>
            )}
        </div>
    )
}