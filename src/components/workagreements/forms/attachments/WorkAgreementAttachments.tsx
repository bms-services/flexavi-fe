import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Paperclip, FileText, X, Eye } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import FilePreview from "reactjs-file-preview";
import {
  WorkAgreementAttachmentsRes,
  WorkAgreementReq,
} from "@/zustand/types/workAgreementT";

interface WorkAgreementAttachmentsProps {
  defaultAttachments?: { name: string; url: string }[];
  disabled?: boolean;
}

export const WorkAgreementAttachments: React.FC<WorkAgreementAttachmentsProps> = ({
  defaultAttachments = [],
  disabled = false,
}) => {
  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<WorkAgreementReq>();

  const rawAttachments = useWatch<WorkAgreementReq>({ name: "attachments" });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const attachments = useMemo(() => {
    return Array.isArray(rawAttachments) ? rawAttachments : [];
  }, [rawAttachments]);

  const blobURLs = useMemo(() => {
    return attachments
      .map((file) => (file instanceof File ? URL.createObjectURL(file) : null))
      .filter(Boolean) as string[];
  }, [attachments]);

  useEffect(() => {
    return () => {
      blobURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [blobURLs]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => file instanceof File);

    if (validFiles.length > 0) {
      const existingFromBackend = attachments.filter(
        (item) => !(item instanceof File)
      );
      const existingFromFrontend = attachments.filter(
        (item) => item instanceof File
      );

      const newFiles = [
        ...existingFromBackend,
        ...existingFromFrontend,
        ...validFiles,
      ];

      if (newFiles.every((item) => item instanceof File)) {
        setValue("attachments", newFiles as File[], { shouldValidate: true });
      } else {
        setValue("attachments", newFiles as WorkAgreementAttachmentsRes[], {
          shouldValidate: true,
        });
      }
      trigger("attachments");
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);

    if (newAttachments.every((item) => item instanceof File)) {
      setValue("attachments", newAttachments as File[], {
        shouldValidate: true,
      });
    } else {
      setValue("attachments", newAttachments as WorkAgreementAttachmentsRes[], {
        shouldValidate: true,
      });
    }
    trigger("attachments");
  };

  const handlePreview = (
    file: File | WorkAgreementAttachmentsRes,
    blobUrl?: string
  ) => {
    if (file instanceof File && blobUrl) {
      setPreviewUrl(blobUrl);
    } else if ("url" in file) {
      setPreviewUrl(file.url);
    }
  };

  let blobIndex = 0;

  return (
    <div className="space-y-4">
      {/* Upload */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
          className="gap-2"
          disabled={disabled}
        >
          <Paperclip className="h-4 w-4" />
          Bestand toevoegen
        </Button>
        <Input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.csv,.txt"
          disabled={disabled}
        />
      </div>

      {/* Daftar File */}
      {(defaultAttachments.length > 0 || attachments.length > 0) && (
        <div className="space-y-2">
          {/* Default (static) */}
          {defaultAttachments.map((attachment, index) => (
            <div
              key={`default-${index}`}
              className="flex items-center gap-2 p-2 bg-muted rounded-md"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm text-blue-600">{attachment.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setPreviewUrl(attachment.url)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground">Standaard bijlage</span>
            </div>
          ))}

          {/* Attachments */}
          {attachments.map((file, index) => {
            const isFile = file instanceof File;
            const href = isFile ? blobURLs[blobIndex++] : (file as WorkAgreementAttachmentsRes).url;
            const filename = isFile ? file.name : (file as WorkAgreementAttachmentsRes).name;

            return (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm text-blue-600 truncate">{filename}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (file instanceof File || (file && typeof file === "object" && "name" in file && "url" in file)) {
                      handlePreview(file as File | WorkAgreementAttachmentsRes, href);
                    }
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {!disabled && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Error */}
      {errors.attachments && (
        <p className="text-sm text-red-500 mt-1">
          {errors.attachments?.message}
        </p>
      )}

      {/* Preview dialog (only backend URL) */}
      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogContent className="h-[90vh] overflow-auto">
          {previewUrl && <FilePreview preview={previewUrl} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};