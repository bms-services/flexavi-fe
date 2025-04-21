
import React, { useState } from "react";
import { PipelineItem } from "@/types/pipeline";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PipelineItemModal } from "./PipelineItemModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { User, Calendar, FileText, FileMinus, FilePlus, Shield, Phone, Mail, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PipelineItemCardProps {
  item: PipelineItem;
  isDragging: boolean;
}

export const PipelineItemCard: React.FC<PipelineItemCardProps> = ({
  item,
  isDragging,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

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

  // Get the appropriate color based on object type
  const getTypeColor = () => {
    switch (item.objectType) {
      case "lead":
        return "bg-blue-100 text-blue-800";
      case "quote":
        return "bg-purple-100 text-purple-800";
      case "invoice":
        return "bg-amber-100 text-amber-800";
      case "project":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get the appropriate type label
  const getTypeLabel = () => {
    switch (item.objectType) {
      case "lead":
        return "Klant";
      case "quote":
        return "Offerte";
      case "invoice":
        return "Factuur";
      case "project":
        return "Garantie";
      default:
        return "Item";
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

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    });
  };

  return (
    <>
      <Card
        className={`shadow-sm transition-all cursor-pointer hover:shadow-md ${
          isDragging ? "shadow-md bg-accent/30" : ""
        }`}
        onClick={() => setModalOpen(true)}
      >
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {getIcon()}
              <span className="font-medium text-sm line-clamp-1">{item.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={e => {
                e.stopPropagation();
                setModalOpen(v => !v);
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <Badge variant="outline" className={`text-xs font-normal ${getTypeColor()}`}>
              {getTypeLabel()}
            </Badge>
            <span className="text-muted-foreground">
              {formatDate(item.updatedAt)}
            </span>
          </div>
          
          <div className="pt-1 text-xs text-muted-foreground">
            {/* Show context-specific info based on item type */}
            {item.objectType === "lead" && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>Bel klant</span>
              </div>
            )}
            {item.objectType === "quote" && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>Volg op</span>
              </div>
            )}
            {item.objectType === "invoice" && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Betaaltermijn</span>
              </div>
            )}
            {item.objectType === "project" && (
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Garantie</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <PipelineItemModal
        open={modalOpen}
        item={item}
        onOpenChange={setModalOpen}
        onGoToDetail={navigateToDetail}
        onAddNote={handleAddNote}
        onSchedule={handleScheduleAppointment}
      />
    </>
  );
};
