import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useController, Control, FieldValues, Path, useFormContext, RegisterOptions, FieldErrors } from "react-hook-form"; import {
    FileText,
    Image,
    Video,
    Music2,
    FileArchive,
    FileType,
    X,
} from "lucide-react";
import { cn } from "@/utils/format";
import FileViewer from "../file-viewer/FileViewer";
import { UseQueryResult } from "@tanstack/react-query";
import { ApiError, ApiSuccessPaginated } from "@/zustand/types/apiT";

interface ListFileItemProps {
    file: File;
    onRemove: () => void;
    onPreview: () => void;
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

export const ListFileItem: React.FC<ListFileItemProps> = ({ file, onRemove }) => {
    return (
        <div className="flex items-center justify-between bg-muted rounded-md p-2 text-sm shadow-sm">
            <div className="flex items-center gap-2 overflow-hidden">
                {getIconByType(file)}
                <span className="truncate max-w-[200px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[1000px] text-ellipsis"
                >{file.name}</span>
                <span className="text-muted-foreground text-xs">{formatBytes(file.size)}</span>
            </div>

            <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export const ListUrlItem: React.FC<{ name: string; onRemove: () => void; onPreview: () => void }> = ({ name, onRemove, onPreview }) => {
    return (
        <div className="flex items-center justify-between bg-muted rounded-md p-2 text-sm shadow-sm">
            <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="text-blue-500 w-5 h-5" />
                <span className="truncate max-w-[200px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[1000px] text-ellipsis text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={onPreview}
                    role="button"
                    tabIndex={0}
                >
                    {name}
                </span>
            </div>

            <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

interface DropZoneAlphaProps<T extends FieldValues = FieldValues> {
    rules?: {
        name: Path<T>;
        control: Control<T>;
        options?: RegisterOptions<T>;
        errors: FieldErrors<T>;
    };
    label?: string;
    helperText?: string;
    accept?: Accept | undefined;
    maxFiles?: number;
    maxSize?: number;
    multiple?: boolean;
    className?: string;
    disabled?: boolean;
    buttonUpload?: JSX.Element;
    listUploaded?: UseQueryResult<ApiSuccessPaginated<T>, ApiError>
    onRemoveUploaded?: (id: string) => void;
}

export const DropZoneAlpha = <T extends FieldValues>({
    rules,
    label,
    helperText,
    accept,
    maxFiles = 5,
    maxSize = 2 * 1024 * 1024,
    multiple = true,
    className,
    disabled = false,
    buttonUpload,
    listUploaded,
    onRemoveUploaded,
}: DropZoneAlphaProps<T>) => {
    const { trigger } = useFormContext();
    const [previewFiles, setPreviewFiles] = useState<{ uri: string; fileType?: string }[]>([]);
    const [isPreview, setIsPreview] = useState(false);

    const {
        field: { value = [], onChange, ...rest },
        fieldState: { error },
    } = useController({
        name: rules?.name as Path<T>,
        control: rules?.control,
        rules: rules?.options,
    });

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = multiple ? [...value, ...acceptedFiles] : acceptedFiles;
            const limitedFiles = newFiles.slice(0, maxFiles);
            onChange(limitedFiles);
            trigger(rules?.name as Path<T>);
        },
        [onChange, value, maxFiles, multiple, trigger, rules]
    );

    const removeFile = (index: number) => {
        const newFiles = [...value];
        newFiles.splice(index, 1);
        onChange(newFiles);
        trigger(rules?.name as Path<T>);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple,
        accept,
        maxFiles,
        maxSize,
        disabled,
    });

    // get allowed file types from accept prop and format, like jpg, png, pdf
    const getAllowedFormattedFileTypes = () => {
        if (!accept) return "";
        return Object.keys(accept)
            .map((key) => {
                const types = accept[key];
                if (Array.isArray(types)) {
                    return types.map((type) => type.replace(/^\./, "")).join(", ");
                }
                return key.replace(/^\./, "");
            })
            .join(", ");
    };

    const getMaxFilesText = () => {
        if (maxFiles === 1) return "1 file";
        return `${maxFiles} files`;
    };

    const getMaxSizeText = () => {
        const maxSize = 10 * 1024 * 1024; // 10
        return `Max: ${formatBytes(maxSize)}`;
    };

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center justify-between">
                {label && <label className="text-sm font-medium">{label}</label>}
                {buttonUpload}
            </div>
            <div
                {...getRootProps()}
                className={cn(
                    "border border-dashed rounded-md p-4 flex items-center justify-center text-muted-foreground cursor-pointer bg-muted/30 hover:bg-muted",
                    isDragActive && "bg-muted",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <input  {...rest} {...getInputProps()} />
                <div className="text-center">
                    <p>{isDragActive ? "Drop the files here ..." : "Drag & drop files here, or click to browse."}</p>

                    {/* Rules what file types are allowed */}
                    {accept && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Allowed file types: {getAllowedFormattedFileTypes()}
                        </p>
                    )}
                    {/* Rules what is the max size allowed */}
                    <p className="text-xs text-muted-foreground mt-1">
                        {getMaxSizeText()}, {getMaxFilesText()}
                    </p>
                </div>
            </div>

            {value.length > 0 && (
                <div className="space-y-2">
                    {value.map((file: File, index: number) => (
                        <ListFileItem key={index} file={file} onRemove={() => removeFile(index)}
                            onPreview={() => {
                                const docFile = {
                                    uri: URL.createObjectURL(file),
                                    fileType: file.type.split("/")[1],
                                };
                                setPreviewFiles([docFile]);
                                setIsPreview(true);
                            }}
                        />
                    ))}
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error.message}</p>}
            {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}

            {listUploaded && listUploaded.isSuccess ? listUploaded.data.result.data.map((item, index) => (
                <ListUrlItem
                    key={index}
                    name={item.name}
                    onRemove={() => {
                        if (!onRemoveUploaded) return;
                        onRemoveUploaded(item.id);
                    }}
                    onPreview={() => {
                        const docFile = {
                            uri: item.url,
                            fileType: item.type,
                        };
                        setPreviewFiles([docFile]);
                        setIsPreview(true);
                    }}
                />
            )) : (
                <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
            )}

            <FileViewer documents={previewFiles}
                open={isPreview}
                onOpenChange={setIsPreview}
            />
        </div>
    );
};