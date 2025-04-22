
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { KnowledgeBaseEntry } from "@/types/knowledge-base";
import { FileText, Image, Video } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface FAQDetailDialogProps {
  entry: KnowledgeBaseEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FAQDetailDialog({ entry, open, onOpenChange }: FAQDetailDialogProps) {
  if (!entry) return null;

  const renderTypeIcon = () => {
    switch (entry.type) {
      case 'text':
        return <FileText className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (entry.type) {
      case 'text':
        return (
          <div className="mt-4 prose prose-sm max-w-none">
            {entry.answer.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        );
      
      case 'image':
        return (
          <div className="mt-4">
            <div className="prose prose-sm max-w-none mb-4">
              {entry.answer.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {entry.mediaUrl && (
              <div className="mt-4 rounded-md overflow-hidden bg-muted w-full flex items-center justify-center">
                <img 
                  src={entry.mediaUrl} 
                  alt={entry.question} 
                  className="max-w-full h-auto" 
                />
              </div>
            )}
          </div>
        );
      
      case 'video':
        return (
          <div className="mt-4">
            <div className="prose prose-sm max-w-none mb-4">
              {entry.answer.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {entry.mediaUrl && (
              <div className="mt-4 rounded-md overflow-hidden w-full aspect-video">
                <iframe
                  src={entry.mediaUrl}
                  title={entry.question}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {renderTypeIcon()}
            <span className="text-sm text-muted-foreground">
              Bijgewerkt op {format(new Date(entry.updatedAt), 'd MMMM yyyy', { locale: nl })}
            </span>
          </div>
          <DialogTitle className="text-2xl">{entry.question}</DialogTitle>
          <DialogDescription>
            {renderContent()}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
