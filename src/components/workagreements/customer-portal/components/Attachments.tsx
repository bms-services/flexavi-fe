
import React from "react";
import { FileText, FileImage, Image } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AttachmentsProps {
  attachments: (File | { name: string; url: string })[];
  defaultAttachments: { name: string; url: string }[];
}

const isImageFile = (filename: string) => {
  const lowerFilename = filename.toLowerCase();
  return lowerFilename.endsWith('.jpg') || 
         lowerFilename.endsWith('.jpeg') || 
         lowerFilename.endsWith('.png') || 
         lowerFilename.endsWith('.gif') || 
         lowerFilename.endsWith('.webp');
};

const isPdfFile = (filename: string) => {
  return filename.toLowerCase().endsWith('.pdf');
};

const getFileIcon = (filename: string) => {
  if (isPdfFile(filename)) {
    return <FileText className="h-4 w-4 text-red-500" />;
  } else if (isImageFile(filename)) {
    return <FileImage className="h-4 w-4 text-blue-500" />;
  } else {
    return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

export const Attachments: React.FC<AttachmentsProps> = ({ 
  attachments = [], 
  defaultAttachments = [] 
}) => {
  const allAttachments = [...defaultAttachments, ...Array.from(attachments || [])];
  
  const documentAttachments = allAttachments.filter(file => 
    !isImageFile((file as any).name)
  );
  
  const imageAttachments = allAttachments.filter(file => 
    isImageFile((file as any).name)
  );

  const hasDocuments = documentAttachments.length > 0;
  const hasImages = imageAttachments.length > 0;

  if (!hasDocuments && !hasImages) return null;

  return (
    <>
      {hasDocuments && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documenten
          </h3>
          <div className="space-y-2">
            {documentAttachments.map((attachment, index) => {
              const isDefault = 'url' in attachment;
              const name = isDefault ? attachment.name : (attachment as File).name;
              const url = isDefault ? attachment.url : '#';
              
              return (
                <div key={`doc-${index}`} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  {getFileIcon(name)}
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
                  {isDefault && (
                    <span className="text-xs text-muted-foreground">Standaard bijlage</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {hasImages && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <Image className="h-4 w-4" />
            Foto's
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {imageAttachments.map((attachment, index) => {
              const isDefault = 'url' in attachment;
              const name = isDefault ? attachment.name : (attachment as File).name;
              const url = isDefault ? attachment.url : '#';
              
              return (
                <div key={`img-${index}`} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                  {isDefault ? (
                    <div className="flex flex-col h-full">
                      <div className="aspect-square overflow-hidden bg-gray-100 relative">
                        <img 
                          src={url} 
                          alt={name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-2 flex items-center justify-between">
                        <span className="text-xs font-medium truncate">{name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">Bijlage</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="aspect-square overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
                        <FileImage className="h-10 w-10" />
                      </div>
                      <div className="p-2">
                        <span className="text-xs font-medium truncate">{name}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
};
