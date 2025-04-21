
import React, { useState } from "react";
import { PipelineItem } from "@/types/pipeline";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Calendar, FileText, User, FileMinus, FilePlus, Shield, Phone } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PipelineItemCardProps {
  item: PipelineItem;
  isDragging: boolean;
}

export const PipelineItemCard: React.FC<PipelineItemCardProps> = ({
  item,
  isDragging,
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Get the appropriate icon based on object type
  const getIcon = () => {
    switch (item.objectType) {
      case "lead":
        return <User className="h-4 w-4" />;
      case "quote":
        return <FilePlus className="h-4 w-4" />;
      case "invoice":
        return <FileMinus className="h-4 w-4" />;
      case "project":
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  // Navigate to the appropriate detail page
  const navigateToDetail = () => {
    switch (item.objectType) {
      case "lead":
        navigate(`/leads/${item.objectId}`);
        break;
      case "quote":
        navigate(`/quotes/${item.objectId}`);
        break;
      case "invoice":
        navigate(`/invoices/${item.objectId}`);
        break;
      case "project":
        navigate(`/projects/${item.objectId}`);
        break;
    }
  };

  // Handle actions
  const handleAddNote = () => {
    toast.success("Notitie toevoegen functionaliteit zal hier komen");
  };

  const handleScheduleAppointment = () => {
    toast.success("Afspraak maken functionaliteit zal hier komen");
  };

  return (
    <Card
      className={`shadow-sm transition-all ${
        isDragging ? "shadow-md bg-accent/30" : "hover:shadow-md"
      } ${isExpanded ? "mb-3" : ""}`}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {getIcon()}
              <span className="font-medium text-sm line-clamp-1">{item.name}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsExpanded(!isExpanded)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </div>
          
          {isExpanded && (
            <div className="pt-2 space-y-2">
              <div className="text-xs text-muted-foreground">
                Laatst bijgewerkt: {new Date(item.updatedAt).toLocaleString("nl")}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleAddNote} variant="outline" size="sm" className="h-8">
                  <FileText className="h-4 w-4 mr-1" />
                  Notitie
                </Button>
                <Button onClick={handleScheduleAppointment} variant="outline" size="sm" className="h-8">
                  <Calendar className="h-4 w-4 mr-1" />
                  Afspraak
                </Button>
                <Button onClick={navigateToDetail} variant="outline" size="sm" className="h-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Bekijk
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
