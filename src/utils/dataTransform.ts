import { AddressReq } from "@/zustand/types/addressT";
import { InvoiceAttachmentsRes, InvoiceReq } from "@/zustand/types/invoiceT";
import { QuotationAttachmentsRes, QuotationReq } from "@/zustand/types/quotationT";
import { WorkAgreementAttachmentsRes, WorkAgreementReq } from "@/zustand/types/workAgreementT";
import { formatNormalizeCurrency } from "./format";

export const flattenAddressToObject = (address: AddressReq): AddressReq => {
    const { postal_code, street, house_number, house_number_addition } = address;

    const postalCodeValue =
        typeof postal_code === 'object' && postal_code !== null && 'value' in postal_code
            ? postal_code.value
            : '';

    return {
        postal_code: postalCodeValue,
        street: street || '',
        house_number: house_number || '',
        house_number_addition: house_number_addition || '',
        city: address.city || '',
        province: address.province || '',
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

export const appendIfExists = (formData: FormData, key: string, value: string | number | undefined) => {
    if (value !== undefined && value !== null && value !== '') {
        formData.append(key, String(value));
    }
};

export const appendLeads = (formData: FormData, leads: (string | { value: string; label: string })[]) => {
    leads.forEach(lead => {
        if (typeof lead === "string") {
            formData.append("leads[]", lead);
        } else if (lead && typeof lead.value === "string") {
            formData.append("leads[]", lead.value);
        }
    });
}

export const appendQuotes = (formData: FormData, quotes: (string | { value: string; label: string })[]) => {
    quotes.forEach(quote => {
        if (typeof quote === "string") {
            formData.append("quotes[]", quote);
        } else if (quote && typeof quote.value === "string") {
            formData.append("quotes[]", quote.value);
        }
    });
}

export const appendAddress = (formData: FormData, address: AddressReq) => {
    formData.append("address[street]", address.street || "");
    formData.append("address[postal_code]", typeof address.postal_code === "object"
        ? address.postal_code.value
        : address.postal_code || "");
    formData.append("address[house_number]", address.house_number || "");
    formData.append("address[house_number_addition]", address.house_number_addition || "");
    formData.append("address[city]", address.city || "");
    formData.append("address[province]", address.province || "");
};

export const appendItems = (
    formData: FormData,
    data: Partial<WorkAgreementReq> | Partial<QuotationReq> | Partial<InvoiceReq>) => {
    data?.items?.forEach((item, idx) => {
        appendIfExists(formData, `items[${idx}][quantity]`, item.quantity);
        appendIfExists(formData, `items[${idx}][unit]`, item.unit);
        appendIfExists(formData, `items[${idx}][unit_price]`, formatNormalizeCurrency(item.unit_price));
        appendIfExists(formData, `items[${idx}][vat_amount]`, formatNormalizeCurrency(item.vat_amount) ?? 0);
        appendIfExists(formData, `items[${idx}][total]`, formatNormalizeCurrency(item.total));

        appendIfExists(formData, `items[${idx}][product_id]`, item.product_id);
        appendIfExists(formData, `items[${idx}][title]`, item.title);
        appendIfExists(formData, `items[${idx}][description]`, item.description);
    });

    appendIfExists(formData, "subtotal", formatNormalizeCurrency(data.subtotal));
    appendIfExists(formData, "discount_amount", formatNormalizeCurrency(data.discount_amount));
    appendIfExists(formData, "discount_type", data.discount_type || "percentage");
    appendIfExists(formData, "total_amount", formatNormalizeCurrency(data.total_amount));
}

export const appendAttachments = (formData: FormData, attachments: File[] | WorkAgreementAttachmentsRes[] | QuotationAttachmentsRes[] | InvoiceAttachmentsRes[]) => {
    if (attachments?.length === 0) {
        return;
    }

    attachments.forEach(file => {
        if (file instanceof File) {
            formData.append("attachments[]", file);
        } else if (typeof file === "object" && file !== null && 'url' in file) {
            formData.append("attachments[]", file.url || "");
        }
    });
}

export const appendExclusions = (formData: FormData, exclusions: { description: string }[]) => {
    exclusions?.forEach(exclusion => {
        formData.append("exclusions[]", exclusion.description);
    });
}


export const appendPayment = (formData: FormData, payment: {
    payment_method?: string;
    total_cash?: number;
    terms?: { description: string; status: string; percentage: number; total_price: number }[];
}) => {
    appendIfExists(formData, "payment[payment_method]", payment.payment_method);
    appendIfExists(formData, "payment[total_cash]", payment.total_cash);

    payment.terms?.forEach((term, idx) => {
        appendIfExists(formData, `payment[terms][${idx}][description]`, term.description);
        appendIfExists(formData, `payment[terms][${idx}][status]`, term.status);
        appendIfExists(formData, `payment[terms][${idx}][percentage]`, term.percentage);
        appendIfExists(formData, `payment[terms][${idx}][total_price]`, term.total_price);
    });
};