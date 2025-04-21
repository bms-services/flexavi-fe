
import React, { useState } from "react";
import { PipelineItem } from "@/types/pipeline";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PipelineItemModal } from "./PipelineItemModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Eye, Calendar, FileText, User, FileMinus, FilePlus, Shield } from "lucide-react";

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
    <>
      <Card
        className={`shadow-sm transition-all cursor-pointer ${
          isDragging ? "shadow-md bg-accent/30" : "hover:shadow-md"
        }`}
        onClick={() => setModalOpen(true)}
      >
        <CardContent className="p-3">
          <div className="space-y-2">
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
                  className={`transition-transform ${modalOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </div>
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
