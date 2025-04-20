
import React from "react";
import { PipelineItem } from "@/types/pipeline";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, FileText, Briefcase } from "lucide-react";

interface PipelineItemCardProps {
  item: PipelineItem;
  isDragging: boolean;
}

export const PipelineItemCard: React.FC<PipelineItemCardProps> = ({
  item,
  isDragging,
}) => {
  const getItemIcon = () => {
    switch (item.objectType) {
      case "lead":
        return <User className="h-4 w-4" />;
      case "project":
        return <Briefcase className="h-4 w-4" />;
      case "quote":
        return <FileText className="h-4 w-4" />;
      case "invoice":
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`
        ${isDragging ? 'opacity-70 rotate-3 scale-105' : ''} 
        hover:bg-accent hover:-translate-y-0.5 
        transition-all duration-200 
        cursor-move
      `}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {getItemIcon()}
          </span>
          <span className="text-sm font-medium truncate">{item.name}</span>
        </div>
      </CardContent>
    </Card>
  );
};
