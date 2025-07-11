import React, { useCallback, useEffect, useState } from "react";
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
import { cn, formatBytes } from "@/utils/format";
import FileViewer from "../file-viewer/FileViewer";
import { UseQueryResult } from "@tanstack/react-query";
import { ApiError, ApiSuccessPaginated } from "@/zustand/types/apiT";
import { AttachmentRes, AttachmentType } from "@/zustand/types/attachmentT";
import { ConfirmDialog } from "../confirm-dialog";
import { useDeleteMyAttachment } from "@/zustand/hooks/useSetting";

interface ListFileItemProps {
    file: File;
    onRemove: () => void;
    onPreview: () => void;
}

interface ListUrlItemProps {
    name: string;
    onRemove: () => void;
    onPreview: () => void;
    disabled: boolean;
}

interface PreviewFileType {
    uri: string;
    fileType?: string;
};

const getIconByType = (filename: string) => {
    switch (true) {
        case filename.endsWith(".jpg") || filename.endsWith(".jpeg") || filename.endsWith(".png") || filename.endsWith(".gif"):
            return <Image className="text-muted-foreground w-5 h-5" />;
        case filename.endsWith(".mp4") || filename.endsWith(".avi") || filename.endsWith(".mov"):
            return <Video className="text-muted-foreground w-5 h-5" />;
        case filename.endsWith(".mp3") || filename.endsWith(".wav"):
            return <Music2 className="text-muted-foreground w-5 h-5" />;
        case filename.endsWith(".zip") || filename.endsWith(".rar"):
            return <FileArchive className="text-muted-foreground w-5 h-5" />;
        case filename.endsWith(".pdf"):
            return <FileText className="text-muted-foreground w-5 h-5" />;
        default:
            return <FileType className="text-muted-foreground w-5 h-5" />;
    }
};


export const ListFileItem: React.FC<ListFileItemProps> = ({ file, onRemove, onPreview }) => {
    return (
        <div className="flex items-center justify-between bg-muted rounded-md p-2 text-sm shadow-sm">
            <div className="flex items-center gap-2 overflow-hidden">
                {getIconByType(file.name)}
                <span className={`truncate max-w-[200px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[1000px] text-ellipsis ${file instanceof Blob && "name" in file ? "text-muted-foreground" : "text-blue-600 hover:text-blue-800 cursor-pointer"}`}
                    onClick={() => {
                        if (file instanceof Blob && "name" in file) {
                            return;
                        }
                        onPreview();
                    }}
                    role={file instanceof Blob && "name" in file ? undefined : "button"}
                    tabIndex={0}
                >
                    {file.name}
                </span>
                {file.size > 0 &&
                    <span className="text-muted-foreground text-xs">{formatBytes(file.size)}</span>
                }
            </div>

            <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export const ListUrlItem: React.FC<ListUrlItemProps> = ({ name, onRemove, onPreview, disabled = false }) => {
    return (
        <div className="flex items-center justify-between bg-muted rounded-md p-2 text-sm shadow-sm">
            <div className="flex items-center gap-2 overflow-hidden">
                {getIconByType(name)}
                <span className="truncate max-w-[200px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[1000px] text-ellipsis text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={onPreview}
                    role="button"
                    tabIndex={0}
                >
                    {name}
                </span>
            </div>

            {disabled &&
                <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                </button>
            }
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
    listUploaded?: UseQueryResult<ApiSuccessPaginated<AttachmentRes>, ApiError>;
    deleteUploaded?: ReturnType<typeof useDeleteMyAttachment>;
    type: AttachmentType;
    // onRemoveUploaded: (id: string) => void;
    isTemplate?: boolean;
};


export const DropZoneAlpha = <T extends FieldValues>({
    rules,
    label,
    accept,
    maxFiles = 5,
    maxSize = 2 * 1024 * 1024,
    multiple = true,
    className,
    disabled = false,
    buttonUpload,
    listUploaded,
    deleteUploaded,
    type,
    // onRemoveUploaded,
    isTemplate = false,
}: DropZoneAlphaProps<T>) => {
    const { trigger } = useFormContext();
    const [previewFiles, setPreviewFiles] = useState<PreviewFileType | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [modal, setModal] = useState({
        delete: false,
    });
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const {
        field: { value = [], onChange, ...rest },
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

    const handlePreview = (file: File | AttachmentRes) => {
        let previewFile: { uri: string; fileType: string | undefined };
        const isFileInstance = typeof window !== "undefined" && file instanceof Blob && "name" in file;

        if (isFileInstance) {
            previewFile = {
                uri: URL.createObjectURL(file as File),
                fileType: (file as File).name.split(".").pop(),
            };

            return;
        } else if ("url" in file && "name" in file) {
            previewFile = {
                uri: file.url,
                fileType: file.name.split(".").pop(),
            };
        } else {
            console.error("Invalid file type for preview");
            return;
        }

        setPreviewFiles(previewFile);
        setIsPreview(true);
    };


    const handleModalRemove = (id: string) => {
        setModal((prev) => ({ ...prev, delete: true }));
        setSelectedFile(id);
    }


    const handleRemove = async () => {
        await deleteUploaded?.mutateAsync({
            ids: [selectedFile ?? ""],
            force: false,
            type,
        });
    }

    useEffect(() => {
        if (deleteUploaded?.isSuccess) {
            setModal((prev) => ({ ...prev, delete: false }));
            setSelectedFile(null);
        }
    }, [deleteUploaded?.isSuccess]);

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

                    {accept && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Allowed file types: {getAllowedFormattedFileTypes()}
                        </p>
                    )}

                    <p className="text-xs text-muted-foreground mt-1">
                        {getMaxSizeText()}, {getMaxFilesText()}
                    </p>
                </div>
            </div>

            {listUploaded && listUploaded.isSuccess && listUploaded.data.result.data.map((item, index) => (
                <ListUrlItem
                    key={index}
                    name={item.name}
                    onRemove={() => {
                        handleModalRemove(item.id);
                    }}
                    onPreview={() => handlePreview(item)}
                    disabled={isTemplate}
                />
            ))}

            {value.length > 0 && (
                <div className="space-y-2">
                    {value.map((file: File, index: number) => (
                        <ListFileItem key={index} file={file} onRemove={() => removeFile(index)}
                            onPreview={() => {
                                handlePreview(file);
                            }}
                        />
                    ))}
                </div>
            )}


            {/* {error && <p className="text-sm text-red-500">{error.message}</p>} */}
            {/* {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>} */}

            <FileViewer
                documents={previewFiles ? [previewFiles] : []}
                open={isPreview}
                onOpen={setIsPreview}
            />

            <ConfirmDialog
                open={modal.delete}
                onCancel={() => setModal((prev) => ({ ...prev, delete: false }))}
                onConfirm={() => handleRemove()}
                title="Annuleren uitnodiging"
                description="Ben je zeker dat je deze uitnodiging wilt annuleren? Deze actie kan niet ongedaan worden gemaakt."
                loading={deleteUploaded?.isPending}
            />
        </div>
    );
};