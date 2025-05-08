import { useState } from "react";
import { Input } from "../input";
import { useDebouncedCallback } from "use-debounce";
import { UseFormRegister, FieldErrors, Control, UseFormWatch, UseFormSetValue, FieldValue, FieldValues } from "react-hook-form";
import SelectSearchAsync, { Option } from "../select-search-async";
import { OptionsOrGroups, GroupBase } from "react-select";
import axios from "axios";

interface PostalCodeProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    control: Control<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
}

const postalCodeUrl = import.meta.env.VITE_POSTAL_CODE_API_URL;
const postalCodeKey = import.meta.env.VITE_POSTAL_CODE_API_KEY;


export default function PostalCode({ register, errors, watch, setValue, control }: PostalCodeProps) {
    const [zipCodeResults, setZipCodeResults] = useState<{
        postalCode: string;
        street: string;
        municipality: string;
        province: string;
    }[]>([]);
    const postalCode = watch("postal_code");
    const houseNumber = watch("house_number");
    const houseNumberAddition = watch("house_number_addition");

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
        setValue("street", "", { shouldValidate: true });
        setValue("city", "", { shouldValidate: true });
        setValue("province", "", { shouldValidate: true });
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

            setValue("province", data.province, { shouldValidate: true });
            setValue("city", data.municipality, { shouldValidate: true });
            setValue("street", data.street, { shouldValidate: true });
        } catch (error) {
            clearAddressFields();
        }
    };

    const handleHouseNumberChange = (houseNumber: string) => {
        setValue("house_number", houseNumber, { shouldValidate: true });
        if (postalCode) {
            debouncedLookupAddress(postalCode.value, houseNumber, houseNumberAddition);
        } else {
            clearAddressFields();
        }
    };

    const handleSuffixChange = (suffix: string) => {
        setValue("house_number_addition", suffix, { shouldValidate: true });
        if (postalCode) {
            debouncedLookupAddress(postalCode.value, houseNumber, suffix);
        } else {
            clearAddressFields();
        }
    };

    const onSelectZipCode = (item: Option) => {
        lookupAddress(item.value, houseNumber, houseNumberAddition);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SelectSearchAsync
                label="Post Code"
                rules={{
                    control,
                    name: "postal_code",
                    options: {
                        required: 'Dit veld is verplicht'
                    },
                    errors,
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
                        onSelectZipCode(newValue);
                    }
                }}
            />

            <Input
                label='Huisnummer'
                id={'house_number'}
                type="text"
                rules={{
                    register,
                    name: "house_number",
                    options: {
                        required: 'Dit veld is verplicht',
                    },
                    errors,
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
                    name: "house_number_addition",
                    options: {
                    },
                    errors,
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
                    name: "street",
                    options: {
                        required: 'Dit veld is verplicht',
                    },
                    errors,
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
                    name: "city",
                    options: {
                        required: 'Dit veld is verplicht',
                    },
                    errors,
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
                    name: "province",
                    options: {
                        required: 'Dit veld is verplicht',
                    },
                    errors,
                }}
            />
        </div>
    )
}
