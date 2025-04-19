
import React from "react";
import { FileImage, FilePdf } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AttachmentsProps {
  attachments?: File[];
  defaultAttachments?: { name: string; url: string }[];
}

export const Attachments: React.FC<AttachmentsProps> = ({
  attachments = [],
  defaultAttachments = []
}) => {
  const allAttachments = [...Array.from(attachments || []), ...defaultAttachments];
  
  const imageAttachments = allAttachments.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test((file as any).name)
  );
  
  const pdfAttachments = allAttachments.filter(file => 
    /\.pdf$/i.test((file as any).name)
  );

  if (!allAttachments.length) return null;

  return (
    <div className="space-y-6">
      {pdfAttachments.length > 0 && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <FilePdf className="h-4 w-4" />
            Documenten
          </h3>
          <div className="space-y-2">
            {pdfAttachments.map((attachment, index) => {
              const isDefault = 'url' in attachment;
              const name = isDefault ? (attachment as any).name : (attachment as File).name;
              const url = isDefault ? (attachment as any).url : '#';
              
              return (
                <div key={`pdf-${index}`} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <FilePdf className="h-4 w-4 text-muted-foreground" />
                  {isDefault ? (
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-sm hover:underline"
                    >
                      {name}
                    </a>
                  ) : (
                    <span className="flex-1 text-sm">{name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {imageAttachments.length > 0 && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            Foto's
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imageAttachments.map((attachment, index) => {
              const isDefault = 'url' in attachment;
              const name = isDefault ? (attachment as any).name : (attachment as File).name;
              const url = isDefault ? (attachment as any).url : '#';
              
              return (
                <div key={`img-${index}`} className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                  {isDefault ? (
                    <img 
                      src={url} 
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileImage className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};
