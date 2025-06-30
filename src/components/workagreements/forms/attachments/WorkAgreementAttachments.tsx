import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, FileText, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { WorkAgreementReq } from "@/zustand/types/workAgreementT";

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
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<WorkAgreementReq>();

  const attachments = watch("attachments") ?? [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => file instanceof File);
    if (validFiles.length > 0) {
      const newFiles = [...attachments, ...validFiles];
      setValue("attachments", newFiles, { shouldValidate: true });
      trigger("attachments"); // Trigger validation manually
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setValue("attachments", newAttachments, { shouldValidate: true });
    trigger("attachments");
  };

  return (
    <div className="space-y-4">
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
          accept=".pdf,.jpg,.jpeg,.png"
          disabled={disabled}
        />
      </div>

      {(defaultAttachments.length > 0 || attachments.length > 0) && (
        <div className="space-y-2">
          {/* Default Attachments */}
          {defaultAttachments.map((attachment, index) => (
            <div
              key={`default-${index}`}
              className="flex items-center gap-2 p-2 bg-muted rounded-md"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm">{attachment.name}</span>
              <span className="text-xs text-muted-foreground">Standaard bijlage</span>
            </div>
          ))}

          {/* New Attachments */}
          {attachments.map((file, index) =>
            file instanceof File ? (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-muted rounded-md"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm">{file.name}</span>
                {!disabled && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ) : null
          )}
        </div>
      )}

      {errors.attachments && (
        <p className="text-sm text-red-500 mt-1">
          {errors.attachments?.message}
        </p>
      )}
    </div>
  );
};