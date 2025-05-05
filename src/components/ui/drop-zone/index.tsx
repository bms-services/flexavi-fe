import React, { useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import {
    Controller,
    Control,
    FieldErrors,
    FieldValues,
    RegisterOptions,
} from "react-hook-form"
import { UploadCloud } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface DropzoneProps {
    id?: string
    label?: string
    accept?: string
    multiple?: boolean
    dropTitle?: string
    dropDescription?: string
    className?: string
    icon?: React.ReactNode
    onDrop?: (files: File[] | File) => void
    rules?: {
        name: string
        control: Control<FieldValues>
        options?: RegisterOptions
        errors: FieldErrors<FieldValues>
    }
}

export default function Dropzone({
    id,
    label,
    accept = "image/*",
    multiple = false,
    dropTitle = "Laat hier je bestand los...",
    dropDescription = "Sleep hierheen of klik om te uploaden.",
    icon = <UploadCloud className="w-6 h-6 text-blue-600" />,
    className,
    onDrop,
    rules,
}: DropzoneProps) {
    const [localValue, setLocalValue] = useState<File[] | File | null>(null)

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const result = multiple ? acceptedFiles : acceptedFiles[0]
            if (rules?.control) {
                rules.control.setValue(rules.name, result)
            }
            onDrop?.(result)
            setLocalValue(result)
        },
        [multiple, onDrop, rules]
    )

    const dropzoneOptions = useMemo(
        () => ({
            onDrop: handleDrop,
            accept: { [accept]: [] },
            multiple,
        }),
        [handleDrop, accept, multiple]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions)

    const currentValue = localValue

    return (
        <div className="relative space-y-1">
            {label && <Label htmlFor={id}>{label}</Label>}

            <div
                {...getRootProps()}
                className={cn(
                    "flex flex-col items-center justify-center border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 transition rounded-md cursor-pointer px-6 py-8 text-center",
                    isDragActive && "bg-blue-100",
                    className
                )}
            >
                <input {...getInputProps()} />
                {icon}
                <p className="mt-2 text-sm text-muted-foreground">
                    {isDragActive ? dropTitle : dropDescription}
                </p>
                {currentValue && (
                    <div className="mt-2 text-sm text-blue-800">
                        {multiple
                            ? `${(currentValue as File[]).length} bestand(en) geselecteerd`
                            : `Bestand: ${(currentValue as File)?.name}`}
                    </div>
                )}
            </div>

            {rules?.errors[rules.name] && (
                <div className="text-red-500 text-sm mt-1">
                    {rules.errors[rules.name]?.message as string}
                </div>
            )}
        </div>
    )
}