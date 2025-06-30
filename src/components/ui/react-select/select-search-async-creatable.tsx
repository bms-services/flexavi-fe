import "./style.css"
import AsyncCreatableSelect, { AsyncCreatableProps } from "react-select/async-creatable";
import { GroupBase, SingleValue, MultiValue, ActionMeta, OptionsOrGroups } from "react-select";
import { Path, Control, Controller, FieldValues, FieldErrors, RegisterOptions } from "react-hook-form";
import { Label } from "../label";
import { selectStyles } from "./style";
import { useEffect, useRef } from "react";
export interface Option {
    readonly label: string;
    readonly value: string;
}

interface SelectSearchAsyncCreatableProps<T extends FieldValues>
    extends Omit<AsyncCreatableProps<Option, boolean, GroupBase<Option>>, 'name' | 'value' | 'onChange'> {
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
    onChange?: (
        newValue: SingleValue<Option> | MultiValue<Option>,
        actionMeta: ActionMeta<Option>
    ) => void;
    onCreateOption?: (inputValue: string) => void;
    debounceTime?: number;
}

const SelectSearchAsyncCreatable = <T extends FieldValues>({
    id,
    label,
    rules,
    isLoading = false,
    isDisabled = false,
    onChange,
    onCreateOption,
    loadOptions,
    debounceTime = 500,
    ...props
}: SelectSearchAsyncCreatableProps<T>) => {
    const originalLoadOptions = useRef(loadOptions);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        originalLoadOptions.current = loadOptions;
    }, [loadOptions]);

    const debouncedLoadOptions = (
        inputValue: string,
        callback: (options: OptionsOrGroups<Option, GroupBase<Option>>) => void
    ) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            try {
                if (originalLoadOptions.current) {
                    const result = await originalLoadOptions.current(inputValue, callback);
                    if (Array.isArray(result)) {
                        callback(result as Option[]);
                    } else if (result && typeof result === "object" && "options" in result) {
                        const optionsOrGroups = result as unknown as { options: Option[] }[];
                        const options: Option[] = optionsOrGroups.flatMap(group =>
                            Array.isArray(group.options) ? group.options : []
                        );
                        callback(options);
                    } else {
                        callback([]);
                    }
                }

            } catch (error) {
                console.error("Failed to load options", error);
                callback([]);
            }

        }, debounceTime);
    };

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
                        <AsyncCreatableSelect
                            isClearable
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            value={field.value}
                            className="text-sm"
                            styles={selectStyles}
                            onChange={(newValue, actionMeta) => {
                                field.onChange(newValue);
                                if (onChange) {
                                    onChange(newValue, actionMeta);
                                }
                            }}
                            onCreateOption={(inputValue) => {
                                if (onCreateOption) {
                                    onCreateOption(inputValue);
                                }
                            }}
                            loadOptions={debouncedLoadOptions}
                            {...props}
                        />
                    )}
                />
            ) : (
                <AsyncCreatableSelect
                    id={id}
                    isClearable
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    className="text-sm"
                    styles={selectStyles}
                    onChange={onChange}
                    onCreateOption={onCreateOption}
                    loadOptions={debouncedLoadOptions}
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

export { SelectSearchAsyncCreatable };