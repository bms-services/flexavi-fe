
import React, { useState } from "react";
import { PipelineItem } from "@/types/pipeline";
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

  const handleAddNote = () => {
    toast.success("Notitie toevoegen functionaliteit zal hier komen");
  };

  const handleScheduleAppointment = () => {
    toast.success("Afspraak maken functionaliteit zal hier komen");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    });
  };

  return (
    <>
      <div
        className={`rounded-lg shadow border bg-white overflow-hidden hover:shadow-md cursor-pointer transition-all ${isDragging ? "shadow-lg scale-95 bg-accent/40" : ""}`}
        onClick={() => setModalOpen(true)}
      >
        <div className="p-3 space-y-2">
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
        </div>
      </div>
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
