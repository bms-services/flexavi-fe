
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkAgreementAttachmentsProps {
  attachments: File[];
  onAttachmentsChange: (attachments: File[]) => void;
  defaultAttachments?: { name: string; url: string }[];
}

export const WorkAgreementAttachments: React.FC<WorkAgreementAttachmentsProps> = ({
  attachments,
  onAttachmentsChange,
  defaultAttachments = [],
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onAttachmentsChange([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    onAttachmentsChange(newAttachments);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
          className="gap-2"
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
        />
      </div>

      {(defaultAttachments.length > 0 || attachments.length > 0) && (
        <div className="space-y-2">
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
          
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-muted rounded-md"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeAttachment(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
