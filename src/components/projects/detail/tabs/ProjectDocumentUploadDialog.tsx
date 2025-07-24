import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm, FormProvider } from 'react-hook-form';
import { useCreateProjectDocument } from '@/zustand/hooks/useProject';
import { Button } from '@/components/ui/button';
import { DropZoneAlpha } from '@/components/ui/drop-zone-alpha/DropZoneAlpha';
import { ProjectAttachmentType } from '@/zustand/types/projectT';
import { AttachmentType } from '@/zustand/types/attachmentT';

interface ProjectDocumentUploadDialogProps {
    open: boolean;
    onClose: () => void;
    projectId: string;
    defaultType: ProjectAttachmentType;
}

export const ProjectDocumentUploadDialog: React.FC<ProjectDocumentUploadDialogProps> = ({ open, onClose, projectId, defaultType }) => {
    const methods = useForm({
        defaultValues: {
            documents: [] as File[],
            type: defaultType,
        },
    });

    const createProjectDocumentZ = useCreateProjectDocument(projectId || "");

    const onSubmit = (data: { documents: File[]; type: string }) => {
        const formData = new FormData();
        data.documents.forEach((file) => formData.append('documents[]', file));
        formData.append('type', defaultType);

        createProjectDocumentZ.mutate(formData, {
            onSuccess: () => {
                onClose();
                methods.reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload {defaultType}</DialogTitle>
                </DialogHeader>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                        <DropZoneAlpha
                            label="Upload bestanden"
                            type={defaultType as AttachmentType}
                            multiple
                            maxFiles={5}
                            maxSize={5 * 1024 * 1024}
                            accept={{
                                "image/*": [".jpg", ".jpeg", ".png", ".webp"],
                                "application/pdf": [".pdf"],
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                                "application/vnd.ms-excel": [".xls", ".xlsx"],
                                "text/plain": [".txt"],
                            }}
                            rules={{
                                name: "documents",
                                control: methods.control,
                                options: {},
                                errors: methods.formState.errors,
                            }}
                        />
                        <Button type="submit" disabled={createProjectDocumentZ.isPending}>
                            Uploaden
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
