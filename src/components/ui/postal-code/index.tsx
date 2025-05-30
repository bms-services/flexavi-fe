import { useState } from "react";
import { Input } from "../input";
import { useDebouncedCallback } from "use-debounce";
import { UseFormRegister, FieldErrors, Control, UseFormWatch, UseFormSetValue, FieldValue, FieldValues, Path, PathValue } from "react-hook-form";
import SelectSearchAsync, { Option } from "../select-search-async";
import { OptionsOrGroups, GroupBase } from "react-select";
import axios from "axios";
import { get } from "lodash";

interface PostalCodeProps<T> {
    register: UseFormRegister<T>;
    fieldPrefix?: string
    errors: FieldErrors<T>;
    control: Control<T>;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
}

const postalCodeUrl = import.meta.env.VITE_POSTAL_CODE_API_URL;
const postalCodeKey = import.meta.env.VITE_POSTAL_CODE_API_KEY;

export default function PostalCode<T>({ register, errors, watch, setValue, control, fieldPrefix }: PostalCodeProps<T>) {
    const prefix = (field: string) => fieldPrefix ? `${fieldPrefix}.${field}` : field;
    const getPrefixedErrors = (): FieldErrors => {
        const result: FieldErrors = {};
        const fields = [
            "postal_code",
            "house_number",
            "house_number_addition",
            "street",
            "city",
            "province",
        ];

        fields.forEach((field) => {
            const fullKey = prefix(field);
            const error = get(errors, fullKey);
            if (error) {
                result[fullKey] = error;
            }
        });

        return result;
    };


    const [zipCodeResults, setZipCodeResults] = useState<{
        postalCode: string;
        street: string;
        municipality: string;
        province: string;
    }[]>([]);

    const postalCode = watch(prefix("postal_code") as Path<T>);
    const houseNumber = watch(prefix("house_number") as Path<T>);
    const houseNumberAddition = watch(prefix("house_number_addition") as Path<T>);

    const set = (field: string, val: FieldValue<FieldValues>) => {
        setValue(prefix(field) as Path<T>, val as PathValue<T, Path<T>>, { shouldValidate: true });
    }

    const debouncedLookupAddress = useDebouncedCallback(
        (zipCode: string, houseNumber: string, suffix?: string) => {
            lookupAddress(zipCode, houseNumber, suffix);
        }, 1000
    );

    const searchZipAction = async (value: string) => {
        const results = await axios.get(
            `${postalCodeUrl}/v2/suggest/nl/postalCode`,
            {
                params: {
                    authKey: postalCodeKey,
                    postalCode: value,
                },
            }
        );

        setZipCodeResults(results.data);

        return results.data.map((item) => ({
            label: item.postalCode,
            value: item.postalCode,
        }));
    }

    const loadOptions = async (
        inputValue: string
    ): Promise<OptionsOrGroups<unknown, GroupBase<unknown>>> => {
        return await searchZipAction(inputValue);
    };

    const clearAddressFields = () => {
        set("street", "");
        set("city", "");
        set("province", "");
    };

    const lookupAddress = async (
        postalCode: string,
        streetNumber: string,
        premise?: string
    ) => {
        if (!postalCode) {
            clearAddressFields();
            return;
        }

        try {
            const { data } = await axios.get(`${postalCodeUrl}/v2/autocomplete/nl`, {
                params: {
                    authKey: postalCodeKey,
                    postalCode,
                    streetNumber,
                    premise,
                },
            });

            set("province", data.province);
            set("city", data.municipality);
            set("street", data.street);
        } catch (error) {
            clearAddressFields();
        }
    };

    const handleHouseNumberChange = (houseNumber: string) => {
        setValue(prefix("house_number") as Path<T>, houseNumber as PathValue<T, Path<T>>, { shouldValidate: true });
        if (postalCode) {
            debouncedLookupAddress(String(postalCode), houseNumber, String(houseNumberAddition ?? ""));
        } else {
            clearAddressFields();
        }
    };

    const handleSuffixChange = (suffix: string) => {
        setValue(prefix("house_number_addition") as Path<T>, suffix as PathValue<T, Path<T>>, { shouldValidate: true });
        if (postalCode) {
            debouncedLookupAddress(String(postalCode), houseNumber as string, String(suffix ?? ""));
        } else {
            clearAddressFields();
        }
    };

    const onSelectZipCode = (item: Option) => {
        lookupAddress(item.value, houseNumber as string, houseNumberAddition as string);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SelectSearchAsync
                label="Post Code"
                rules={{
                    control: control as Control<FieldValues>,
                    name: prefix("postal_code"),
                    options: {
                        required: 'Dit veld is verplicht'
                    },
                    errors: getPrefixedErrors(),
                }}
                placeholder="Typing a postal code"
                loadOptions={loadOptions}
                defaultOptions={zipCodeResults.map((item) => ({
                    label: item.postalCode,
                    value: item.postalCode,
                }))}
                onChange={(newValue: Option, actionMeta) => {
                    if (actionMeta.action === 'clear') {
                        clearAddressFields();
                    }
                    if (newValue) {
                        onSelectZipCode(newValue.value);
                    }
                }}
            />

            <Input
                label='Huisnummer'
                id={'house_number'}
                type="text"
                rules={{
                    register,
                    name: prefix("house_number"),
                    options: {
                        required: 'Dit veld is verplicht',
                    },
                    errors: getPrefixedErrors(),

                }}
                onChange={(e) => {
                    handleHouseNumberChange(e.target.value);
                }}

            />
            <Input
                label='Toevoeging (optioneel)'
                id={'house_number_addition'}
                type="text"
                rules={{
                    register,
                    name: prefix("house_number_addition"),
                    options: {
                    },
                    errors: getPrefixedErrors(),
                }}
                onChange={(e) => {
                    handleSuffixChange(e.target.value);
                }}
            />

            {/* Street */}
            <Input
                label='Straat'
                id={'street'}
                type="text"
                placeholder="Auto fill based on postal code"
                disabled
                rules={{
                    register,
                    name: prefix("street"),
                    options: {
                        required: 'Dit veld is verplicht',
                    },
                    errors: getPrefixedErrors(),
                }}
            />

            {/* City */}
            <Input
                label='Plaats'
                id={'city'}
                type="text"
                disabled
                placeholder="Auto fill based on postal code"
                rules={{
                    register,
                    name: prefix("city"),
                    options: {
                        required: 'Dit veld is verplicht',
                    },
                    errors: getPrefixedErrors(),
                }}
            />

            {/* Province */}
            <Input
                label='Provincie'
                id={'province'}
                type="text"
                disabled
                placeholder="Auto fill based on postal code"
                rules={{
                    register,
                    name: prefix("province"),
                    options: {
                        required: 'Dit veld is verplicht',
                    },
                    errors: getPrefixedErrors(),
                }}
            />
        </div>
    )
}
