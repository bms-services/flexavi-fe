import React, { forwardRef, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropzoneInnerProps {
    value?: File | File[]
    onChange: (value: File | File[]) => void
    previewUrl?: string
    accept?: string
    multiple?: boolean
    text?: string
    dropText?: string
    icon?: React.ReactNode
    className?: string
    onDrop?: (files: File[] | File) => void
    isCircle?: boolean
    errorMessage?: string
}

const DropzoneInner = forwardRef<HTMLInputElement, DropzoneInnerProps>(
    (
        {
            value,
            previewUrl,
            onChange,
            accept = "image/*",
            multiple = false,
            text,
            dropText,
            icon = <UploadCloud className="w-6 h-6 text-blue-600" />,
            className,
            onDrop,
            isCircle = false,
            errorMessage,
        },
        _ref
    ) => {
        const handleDrop = (acceptedFiles: File[]) => {
            const result = multiple ? acceptedFiles : acceptedFiles[0]
            onChange(result)
            onDrop?.(result)
        }

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: handleDrop,
            accept: { [accept]: [] },
        })

        const preview = useMemo(() => {
            if (value instanceof File) return URL.createObjectURL(value);
            if (Array.isArray(value) && value[0] instanceof File)
                return URL.createObjectURL(value[0]);
            return previewUrl;
        }, [value, previewUrl]);

        return (
            <div
            >
                <div
                    {...getRootProps()}
                    className={cn(
                        "flex min-h-36 flex-col items-center justify-center border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 hover:border-dotted transition cursor-pointer px-6 py-8 text-center",
                        isDragActive && "bg-blue-100",
                        isCircle ? "rounded-full w-32 h-32" : "rounded-md",
                        className
                    )}
                    style={{
                        backgroundImage: `url(${preview})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <input {...getInputProps()} />
                    {!preview && (
                        <div className="flex flex-col items-center">
                            {icon}
                            <p className="mt-2 text-sm text-muted-foreground">
                                {isDragActive ? dropText : text}
                            </p>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
                    )}
                </div>
            </div >
        )
    }
)

DropzoneInner.displayName = "DropzoneInner"

export default DropzoneInner
