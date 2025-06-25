import "./style.css"
import AsyncSelect, { AsyncProps } from "react-select/async";
import { GroupBase, SingleValue, MultiValue } from 'react-select';
import { Path } from "react-hook-form";
import { Label } from '../label';
import { ActionMeta } from "react-select";
import { selectStyles } from "./style";
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    RegisterOptions,
} from "react-hook-form";

export interface Option {
    readonly label: string;
    readonly value: string;
}

interface SelectSearchAsyncProps<T extends FieldValues> extends Omit<AsyncProps<Option, boolean, GroupBase<Option>>, 'name' | 'value' | 'onChange'> {
    id?: string;
    label?: string;
    rules?: {
        name: Path<T>;
        control: Control<T>;
        options?: RegisterOptions<T>;
        errors: FieldErrors<T>;
    };
    isLoading?: boolean;
    isDisabled?: boolean;
    onChange?: (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
}

const SelectSearchAsync = <T extends FieldValues>({
    id,
    label,
    rules,
    isLoading = false,
    isDisabled = false,
    onChange,
    ...props
}: SelectSearchAsyncProps<T>) => {
    return (
        <div className='relative space-y-1'>
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
                        <AsyncSelect
                            isClearable
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            value={field.value}
                            className='text-sm'
                            styles={selectStyles}
                            onChange={(newValue, actionMeta) => {
                                field.onChange(newValue);
                                if (onChange) {
                                    onChange(newValue as Option | null, actionMeta as ActionMeta<Option>);
                                }
                            }}
                            {...props}
                        />
                    )}
                />
            ) : (
                <AsyncSelect
                    id={id}
                    isClearable
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    className='text-sm'
                    styles={selectStyles}
                    onChange={onChange}
                    {...props}
                />
            )}
            {rules?.errors?.[rules.name] && (
                <div className="text-red-500 text-sm mt-1">{rules.errors[rules.name]?.message as string}</div>
            )}
        </div>
    )
}

export { SelectSearchAsync };