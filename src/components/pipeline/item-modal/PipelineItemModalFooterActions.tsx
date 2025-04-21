
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Eye, FilePlus, FileMinus, Shield, Calendar, FileImage } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FooterActionsProps {
  onAddNote: () => void;
  onSchedule: () => void;
  onGoToDetail: () => void;
  onCreateQuote: () => void;
  onCreateInvoice: () => void;
  onCreateWorkOrder: () => void;
  onUploadPhotos: () => void;
}

export const PipelineItemModalFooterActions: React.FC<FooterActionsProps> = ({
  onAddNote,
  onSchedule,
  onGoToDetail,
  onCreateQuote,
  onCreateInvoice,
  onCreateWorkOrder,
  onUploadPhotos,
}) => (
  <div className="px-6 py-6 flex flex-wrap gap-3 justify-start bg-white shrink-0">
    <Button onClick={onAddNote} variant="outline" className="min-w-[140px] flex gap-2">
      <FileText className="h-4 w-4" />
      Notitie toevoegen
    </Button>
    <Button onClick={onSchedule} variant="outline" className="min-w-[140px] flex gap-2">
      <Calendar className="h-4 w-4" />
      Afspraak maken
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[140px] flex gap-2">
          <FilePlus className="h-4 w-4" />
          Document maken
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[1400]"> {/* increased z-index */}
        <DropdownMenuItem onClick={onCreateQuote}>
          <FilePlus className="h-4 w-4 mr-2" />
          Maak offerte
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCreateInvoice}>
          <FileMinus className="h-4 w-4 mr-2" />
          Maak factuur
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCreateWorkOrder}>
          <Shield className="h-4 w-4 mr-2" />
          Maak werkopdracht
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onUploadPhotos}>
          <FileImage className="h-4 w-4 mr-2" />
          Upload foto's
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Button onClick={onGoToDetail} variant="default" className="min-w-[140px] flex gap-2">
      <Eye className="h-4 w-4" />
      Ga naar details
    </Button>
  </div>
);
