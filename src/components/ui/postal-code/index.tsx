import { useState } from "react";
import { Input } from "../input";
import { useDebouncedCallback } from "use-debounce";
import { UseFormRegister, FieldErrors, Control, UseFormWatch, UseFormSetValue, FieldValues, Path } from "react-hook-form";
import { SelectSearchAsync, Option } from "../react-select/select-search-async";
import { OptionsOrGroups, GroupBase } from "react-select";
import axios from "axios";
import { get } from "lodash";

interface PostalCodeProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    fieldPrefix?: string;
    errors: FieldErrors<T>;
    control: Control<T>;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
}

const postalCodeUrl = import.meta.env.VITE_POSTAL_CODE_API_URL;
const postalCodeKey = import.meta.env.VITE_POSTAL_CODE_API_KEY;

export default function PostalCode<T extends FieldValues>({ register, errors, watch, setValue, control, fieldPrefix }: PostalCodeProps<T>) {
    const prefix = (field: string) => (fieldPrefix ? `${fieldPrefix}.${field}` : field);

    const getPrefixedErrors = (): FieldErrors<T> => {
        const result: Record<string, unknown> = {};
        const fields = ["postal_code", "house_number", "house_number_addition", "street", "city", "province"];
        fields.forEach((field) => {
            const fullKey = prefix(field);
            const error = get(errors, fullKey);
            if (error) {
                result[fullKey] = error;
            }
        });
        return result as FieldErrors<T>;
    };

    const [zipCodeResults, setZipCodeResults] = useState<Array<{ postalCode: string; street: string; municipality: string; province: string }>>([]);

    const rawPostalCode = watch(prefix("postal_code") as Path<T>);
    const houseNumber = watch(prefix("house_number") as Path<T>);
    const houseNumberAddition = watch(prefix("house_number_addition") as Path<T>);

    const normalizePostalCode = (val: unknown): Option | null => {
        if (val && typeof val === "object" && "value" in val && "label" in val) {
            return val as Option;
        }
        if (typeof val === "string") {
            return { label: val, value: val };
        }
        return null;
    };

    const set = (field: string, val: string) => {
        setValue(prefix(field) as Path<T>, val as never, { shouldValidate: true });
    };

    const setPostalCode = (val: Option | string) => {
        setValue(prefix("postal_code") as Path<T>, val as never, { shouldValidate: true });
    };

    const debouncedLookupAddress = useDebouncedCallback((zipCode: string, houseNumber: string, suffix?: string) => {
        lookupAddress(zipCode, houseNumber, suffix);
    }, 600);

    const searchZipAction = async (value: string) => {
        const { data } = await axios.get(`${postalCodeUrl}/v2/suggest/nl/postalCode`, {
            params: { authKey: postalCodeKey, postalCode: value },
        });
        setZipCodeResults(data);
        return data.map((item: { postalCode: string }) => ({ label: item.postalCode, value: item.postalCode }));
    };

    const loadOptions = async (inputValue: string): Promise<OptionsOrGroups<Option, GroupBase<Option>>> => {
        return await searchZipAction(inputValue);
    };

    const clearAddressFields = () => {
        set("street", "");
        set("city", "");
        set("province", "");
    };

    const lookupAddress = async (postalCode: string, streetNumber: string, premise?: string) => {
        if (!postalCode || typeof postalCode !== "string") {
            clearAddressFields();
            return;
        }
        try {
            const { data } = await axios.get(`${postalCodeUrl}/v2/autocomplete/nl`, {
                params: { authKey: postalCodeKey, postalCode, streetNumber, premise },
            });
            set("province", data.province || "");
            set("city", data.municipality || "");
            set("street", data.street || "");
        } catch (error) {
            clearAddressFields();
        }
    };

    const handleHouseNumberChange = (val: string) => {
        set("house_number", val);
        if (rawPostalCode) {
            debouncedLookupAddress(rawPostalCode.value ?? rawPostalCode, val, houseNumberAddition as string);
        } else {
            clearAddressFields();
        }
    };

    const handleSuffixChange = (suffix: string) => {
        set("house_number_addition", suffix);
        if (rawPostalCode) {
            debouncedLookupAddress(rawPostalCode.value ?? rawPostalCode, houseNumber as string, suffix);
        } else {
            clearAddressFields();
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SelectSearchAsync
                label="Post Code"
                rules={{
                    control,
                    name: prefix("postal_code") as Path<T>,
                    options: { required: "Dit veld is verplicht" },
                    errors: getPrefixedErrors(),
                }}
                placeholder="Typing a postal code"
                loadOptions={loadOptions}
                defaultOptions={zipCodeResults.map((item) => ({ label: item.postalCode, value: item.postalCode }))}
                // value={normalizePostalCode(rawPostalCode) as Option | null}
                onChange={(newValue, _actionMeta) => {
                    if (!newValue || Array.isArray(newValue)) {
                        setPostalCode("");
                        clearAddressFields();
                    } else {
                        setPostalCode(newValue as Option | string);
                        lookupAddress(
                            (newValue as Option).value,
                            houseNumber as string,
                            houseNumberAddition as string
                        );
                    }
                }}
            />

            <Input
                label="Huisnummer"
                id="house_number"
                type="text"
                rules={{ register, name: prefix("house_number") as Path<T>, options: { required: "Dit veld is verplicht" }, errors: getPrefixedErrors() }}
                onChange={(e) => handleHouseNumberChange(e.target.value)}
            />

            <Input
                label="Toevoeging (optioneel)"
                id="house_number_addition"
                type="text"
                rules={{ register, name: prefix("house_number_addition") as Path<T>, options: {}, errors: getPrefixedErrors() }}
                onChange={(e) => handleSuffixChange(e.target.value)}
            />

            <Input
                label="Straat"
                id="street"
                type="text"
                disabled
                placeholder="Auto fill based on postal code"
                rules={{ register, name: prefix("street") as Path<T>, options: { required: "Dit veld is verplicht" }, errors: getPrefixedErrors() }}
            />

            <Input
                label="Plaats"
                id="city"
                type="text"
                disabled
                placeholder="Auto fill based on postal code"
                rules={{ register, name: prefix("city") as Path<T>, options: { required: "Dit veld is verplicht" }, errors: getPrefixedErrors() }}
            />

            <Input
                label="Provincie"
                id="province"
                type="text"
                disabled
                placeholder="Auto fill based on postal code"
                rules={{ register, name: prefix("province") as Path<T>, options: { required: "Dit veld is verplicht" }, errors: getPrefixedErrors() }}
            />
        </div>
    );
}