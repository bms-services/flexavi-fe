
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { PipelineItem } from "@/types/pipeline";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Eye } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: PipelineItem;
  onGoToDetail: () => void;
  onAddNote: () => void;
  onSchedule: () => void;
}

export const PipelineItemModal: React.FC<Props> = ({
  open,
  onOpenChange,
  item,
  onGoToDetail,
  onAddNote,
  onSchedule,
}) => {
  if (!item) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full rounded-lg p-6">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription className="text-xs mb-4">
            Type: {item.objectType}<br />
            Laatst bijgewerkt: {new Date(item.updatedAt).toLocaleString("nl")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Button onClick={onAddNote} variant="outline" className="w-full flex gap-2 justify-start">
            <FileText className="h-4 w-4" />
            Notitie toevoegen
          </Button>
          <Button onClick={onSchedule} variant="outline" className="w-full flex gap-2 justify-start">
            <Calendar className="h-4 w-4" />
            Afspraak maken
          </Button>
          <Button onClick={onGoToDetail} variant="outline" className="w-full flex gap-2 justify-start">
            <Eye className="h-4 w-4" />
            Ga naar details
          </Button>
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="w-full mt-4">Sluiten</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
