// components/AttachmentDropzone.tsx
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useFormContext, useController } from "react-hook-form";

type FileWithPreview = File & { preview: string };

interface Props {
    name: string; // name in RHF
    defaultUrls?: string[];
}

const AttachmentDropzone = ({ name, defaultUrls = [] }: Props) => {
    const { control, setValue } = useFormContext();
    const { field } = useController({ name, control });
    const [previews, setPreviews] = useState<(string | FileWithPreview)[]>([
        ...defaultUrls,
    ]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        onDrop: (acceptedFiles) => {
            const withPreview = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            const updated = [...previews, ...withPreview];
            setPreviews(updated);
            setValue(name, updated);
        },
    });

    const handleRemove = (item: string | File) => {
        const updated = previews.filter((i) => i !== item);
        setPreviews(updated);
        setValue(name, updated);
    };

    useEffect(() => {
        // cleanup previews
        return () => {
            previews.forEach((file) => {
                if (file instanceof File) {
                    URL.revokeObjectURL((file as FileWithPreview).preview);
                }
            });
        };
    }, [previews]);

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className="p-4 border-2 border-dashed rounded-md text-center cursor-pointer"
            >
                <input {...getInputProps()} />
                <p className="text-sm text-muted-foreground">
                    Sleep je afbeeldingen hier of klik om te uploaden.
                </p>
            </div>

            <div className="flex flex-wrap gap-3">
                {previews.map((item, idx) => (
                    <div key={idx} className="relative w-32 h-32 border rounded">
                        <img
                            src={typeof item === "string" ? item : item.preview}
                            alt="attachment"
                            className="object-cover w-full h-full rounded"
                        />
                        <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5"
                            onClick={() => handleRemove(item)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttachmentDropzone;