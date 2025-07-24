import React, { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Trash2, ViewIcon, X } from "lucide-react";
import { useCreateProjectPhoto } from "@/zustand/hooks/useProject";

type Props = {
    open: boolean;
    onClose: () => void;
    projectId: string;
};

export const ProjectPhotosUploadDialog: React.FC<Props> = ({ open, onClose, projectId }) => {
    const [files, setFiles] = useState<File[]>([]);
    const createPhotoZ = useCreateProjectPhoto(projectId);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
    }, []);

    const handleRemove = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        for (const file of files) {
            const formData = new FormData();
            formData.append("photos[]", file);
            await createPhotoZ.mutateAsync(formData);
        }
        setFiles([]);
        onClose();
    };

    const handlePreview = (file: File) => {
        const url = URL.createObjectURL(file);
        window.open(url, "_blank");
        URL.revokeObjectURL(url);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: true,
    });

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Upload foto's</DialogTitle>
                </DialogHeader>

                <div
                    {...getRootProps()}
                    className="border-2 border-dashed rounded-md h-40 flex flex-col items-center justify-center cursor-pointer text-sm text-muted-foreground"
                >
                    <input {...getInputProps()} />
                    {isDragActive ? "Laat hier los..." : "Sleep hier je foto's heen of klik om te uploaden"}
                </div>

                {files.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {files.map((file, idx) => (
                            <Card key={idx} className="relative overflow-hidden group p-0">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handlePreview(file)}
                                        >
                                            <ViewIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleRemove(idx)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onClose}>Annuleer</Button>
                    <Button onClick={handleUpload} disabled={files.length === 0 || createPhotoZ.isPending}>
                        Uploaden
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};