
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, FileText, X } from "lucide-react";


interface DefaultAttachment {
  id: string;
  name: string;
  url: string;
}

interface DefaultAttachmentsPanelProps {
  title: string;
  description: string;
  attachments: DefaultAttachment[];
  onAttachmentsChange: (attachments: DefaultAttachment[]) => void;
}

export const DefaultAttachmentsPanel = ({
  title,
  description,
  attachments,
  onAttachmentsChange,
}: DefaultAttachmentsPanelProps) => {
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you would upload these files to storage and get URLs back
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    onAttachmentsChange([...attachments, ...newAttachments]);
   
  };

  const removeAttachment = (id: string) => {
    onAttachmentsChange(attachments.filter(att => att.id !== id));
    
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById(`default-file-upload-${title}`)?.click()}
            className="gap-2"
          >
            <Paperclip className="h-4 w-4" />
            Bestand toevoegen
          </Button>
          <Input
            id={`default-file-upload-${title}`}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>

        {attachments.length > 0 && (
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 p-2 bg-muted rounded-md"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm">{attachment.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
