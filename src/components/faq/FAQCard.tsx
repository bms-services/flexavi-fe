
import React from "react";
import { KnowledgeBaseEntry } from "@/types/knowledge-base";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Video } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface FAQCardProps {
  entry: KnowledgeBaseEntry;
  onClick: (entry: KnowledgeBaseEntry) => void;
}

export function FAQCard({ entry, onClick }: FAQCardProps) {
  const renderTypeIcon = () => {
    switch (entry.type) {
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer h-full flex flex-col"
      onClick={() => onClick(entry)}
    >
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {renderTypeIcon()}
          <Badge variant="outline" className="capitalize">
            {entry.type}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">{entry.question}</CardTitle>
        <CardDescription className="line-clamp-3">
          {entry.answer}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {entry.type === 'image' && entry.mediaUrl && (
          <div className="mt-2 rounded-md overflow-hidden bg-muted flex items-center justify-center h-40">
            <img 
              src={entry.mediaUrl} 
              alt={entry.question} 
              className="max-h-full max-w-full object-cover" 
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Bijgewerkt op {format(new Date(entry.updatedAt), 'd MMMM yyyy', { locale: nl })}
      </CardFooter>
    </Card>
  );
}
