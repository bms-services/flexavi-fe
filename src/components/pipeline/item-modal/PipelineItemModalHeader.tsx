
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  objectId: string;
  name: string;
  updatedAt: string;
}

export const PipelineItemModalHeader: React.FC<HeaderProps> = ({ objectId, name, updatedAt }) => (
  <DialogHeader>
    <div className="flex items-center justify-between mb-2">
      <Badge variant="outline" className="font-normal bg-blue-100 text-blue-800">
        Klant
      </Badge>
      <span className="text-xs text-muted-foreground">
        ID: {objectId.substring(0, 8)}
      </span>
    </div>
    <div className="flex items-start gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
        <span className="text-blue-800 font-bold text-lg">{name[0]}</span>
      </span>
      <div>
        <DialogTitle className="text-xl">{name}</DialogTitle>
        <DialogDescription className="text-xs mt-1">
          Laatst bijgewerkt: {(new Date(updatedAt)).toLocaleDateString("nl", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </DialogDescription>
      </div>
    </div>
  </DialogHeader>
);
