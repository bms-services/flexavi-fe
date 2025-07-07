import React, { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useController, Control, FieldValue, FieldValues, Path } from "react-hook-form";
import {
    FileText,
    Image,
    Video,
    Music2,
    FileArchive,
    FileType,
    X
} from "lucide-react";
import { cn } from "@/utils/format";

interface FilePreviewItemProps {
    file: File;
    onRemove: () => void;
}

const getIconByType = (file: File) => {
    const type = file.type;
    if (type.startsWith("image/")) return <Image className="text-blue-500 w-5 h-5" />;
    if (type.startsWith("video/")) return <Video className="text-purple-500 w-5 h-5" />;
    if (type.startsWith("audio/")) return <Music2 className="text-pink-500 w-5 h-5" />;
    if (type.includes("zip")) return <FileArchive className="text-yellow-500 w-5 h-5" />;
    if (type.includes("pdf")) return <FileText className="text-red-500 w-5 h-5" />;
    return <FileType className="text-muted-foreground w-5 h-5" />;
};

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const FilePreviewItem: React.FC<FilePreviewItemProps> = ({ file, onRemove }) => {
    return (
        <div className="flex items-center justify-between bg-muted rounded-md p-2 text-sm shadow-sm">
            <div className="flex items-center gap-2 overflow-hidden">
                {getIconByType(file)}
                <span className="truncate max-w-[200px] text-ellipsis">{file.name}</span>
                <span className="text-muted-foreground text-xs">{formatBytes(file.size)}</span>
            </div>
            <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

interface DropZoneAlphaProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    helperText?: string;
    accept?: Accept | undefined;
    maxFiles?: number;
    multiple?: boolean;
    className?: string;
    disabled?: boolean;
}

export const DropZoneAlpha = <T extends FieldValues>({
    name,
    control,
    label,
    helperText,
    accept,
    maxFiles = 5,
    multiple = true,
    className,
    disabled = false,
}: DropZoneAlphaProps<T>) => {
    const {
        field: { value = [], onChange, ...rest },
        fieldState: { error },
    } = useController({ name, control });

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = multiple ? [...value, ...acceptedFiles] : acceptedFiles;
            const limitedFiles = newFiles.slice(0, maxFiles);
            onChange(limitedFiles);
        },
        [onChange, value, maxFiles, multiple]
    );

    const removeFile = (index: number) => {
        const newFiles = [...value];
        newFiles.splice(index, 1);
        onChange(newFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple,
        accept,
        disabled,
    });

    return (
        <div className={cn("space-y-2", className)}>
            {label && <label className="text-sm font-medium">{label}</label>}
            <div
                {...getRootProps()}
                className={cn(
                    "border border-dashed rounded-md p-4 flex items-center justify-center text-muted-foreground cursor-pointer bg-muted/30 hover:bg-muted",
                    isDragActive && "bg-muted",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <input {...getInputProps()} {...rest} />
                <p>{isDragActive ? "Drop the files here ..." : "Drag & drop files here, or click to browse."}</p>
            </div>

            {value.length > 0 && (
                <div className="space-y-2">
                    {value.map((file: File, index: number) => (
                        <FilePreviewItem key={index} file={file} onRemove={() => removeFile(index)} />
                    ))}
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error.message}</p>}
            {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
        </div>
    );
};