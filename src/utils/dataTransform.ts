import { AddressReq, AddressRes } from "@/zustand/types/addressT";

export const flattenAddressToObject = (address: AddressReq): AddressReq => {
    const { postal_code, ...rest } = address;

    const postalCodeValue =
        typeof postal_code === 'object' && postal_code !== null && 'value' in postal_code
            ? postal_code.value
            : '';

    return {
        ...rest,
        postal_code: postalCodeValue,
    };
};

export const flattenAddressToFormData = (address: AddressReq): FormData => {
    const flat = flattenAddressToObject(address);
    const fd = new FormData();

    Object.entries(flat).forEach(([key, value]) => {
        if (key === 'postal_code' && typeof value === 'object') {
            fd.append(`address[postal_code]`, value.value);
        } else {
            fd.append(`address[${key}]`, String(value));
        }
    });

    return fd;
};

export const objectToFormData = (obj: Record<string, unknown>, form: FormData = new FormData(), namespace?: string): FormData => {
    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
        const value = obj[key];
        const formKey = namespace ? `${namespace}[${key}]` : key;

        if (
            typeof value === 'object' &&
            value !== null &&
            !(value instanceof File) &&
            !(value instanceof Date)
        ) {
            if (Object.prototype.toString.call(value) === '[object Object]') {
                objectToFormData(value as Record<string, unknown>, form, formKey);
            }
        } else if (value !== undefined && value !== null) {
            form.append(formKey, String(value));
        }
    }
    return form;
};
