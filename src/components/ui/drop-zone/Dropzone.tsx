import React from "react"
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
} from "react-hook-form"
import { UploadCloud } from "lucide-react"
import { Label } from "@/components/ui/label"

import DropzoneInner from "./DropzoneInner"
import { DropzoneInputProps, DropzoneProps, DropzoneRootProps } from "react-dropzone"


interface DropProps<T extends FieldValues> {
    id?: string
    label?: string
    accept?: string
    multiple?: boolean
    text?: string
    dropText?: string
    icon?: React.ReactNode
    className?: string
    onDrop?: (files: File[] | File) => void
    rules?: {
        name: Path<T>;
        control: Control<T>;
        options?: RegisterOptions<T>;
        errors: FieldErrors<T>;

    }
    isCircle?: boolean
    previewUrl?: string
    onChange?: (value: File | File[]) => void
}

export function Dropzone<T extends FieldValues>({
    id,
    label,
    accept = "image/*",
    multiple = false,
    text,
    dropText,
    icon = <UploadCloud className="w-6 h-6 text-blue-600" />,
    className,
    onDrop,
    rules,
    isCircle = false,
    previewUrl,
    onChange,
    ...props
}: DropProps<T>) {
    return (
        <div>
            {rules?.control ? (
                <Controller
                    control={rules.control}
                    name={rules.name}
                    rules={rules.options}
                    render={({ field }) => (
                        <div className="relative space-y-1">
                            {label && <Label htmlFor={id}>{label}</Label>}
                            <DropzoneInner
                                {...field}
                                accept={accept}
                                multiple={multiple}
                                text={text}
                                dropText={dropText}
                                previewUrl={previewUrl}
                                icon={icon}
                                className={className}
                                onDrop={onDrop}
                                isCircle={isCircle}
                                errorMessage={rules.errors?.[rules.name]?.message as string}
                            />
                        </div>
                    )}
                />
            ) : (
                <DropzoneInner
                    accept={accept}
                    multiple={multiple}
                    text={text}
                    dropText={dropText}
                    previewUrl={previewUrl}
                    icon={icon}
                    className={className}
                    onDrop={onDrop}
                    isCircle={isCircle}
                    onChange={onChange ?? (() => { })}
                    {...props}
                />
            )}
            {rules?.errors?.[rules.name] && (
                <div className="text-red-500 text-sm mt-1">
                    {rules.errors[rules.name]?.message as string}
                </div>
            )}
        </div>
    )
}
