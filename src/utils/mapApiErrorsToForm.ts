import { ApiError } from "@/zustand/types/apiT";
import { Path, UseFormSetError } from "react-hook-form";

/**
 * Maps API validation errors to React Hook Form errors
 * 
 * @param errors - Error object from API response
 * @param setError - React Hook Form's setError function
 */
export function mapApiErrorsToForm<T>(
    errors: ApiError["errors"],
    setError: UseFormSetError<T>
): void {
    if (!errors) return;

    Object.entries(errors).forEach(([field, messages]) => {
        setError(field as Path<T>, {
            type: 'manual',
            message: Array.isArray(messages) ? messages[0] : messages,
        });
    });
}