
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { PipelineItem } from "@/types/pipeline";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Eye, Clock, User, Phone, Mail, MapPin, FilePlus, FileMinus, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  
  // Get appropriate icon for object type
  const getTypeIcon = () => {
    switch (item.objectType) {
      case "lead":
        return <User className="h-5 w-5 text-blue-600" />;
      case "quote":
        return <FilePlus className="h-5 w-5 text-purple-600" />;
      case "invoice":
        return <FileMinus className="h-5 w-5 text-amber-600" />;
      case "project":
        return <Shield className="h-5 w-5 text-green-600" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };
  
  // Get appropriate heading for object type
  const getTypeHeading = () => {
    switch (item.objectType) {
      case "lead": return "Klant Informatie";
      case "quote": return "Offerte Details";
      case "invoice": return "Factuur Details";
      case "project": return "Garantie Details";
      default: return "Details";
    }
  };

  // Get the appropriate type label
  const getTypeLabel = () => {
    switch (item.objectType) {
      case "lead": return "Klant";
      case "quote": return "Offerte";
      case "invoice": return "Factuur";
      case "project": return "Garantie";
      default: return "Item";
    }
  };
  
  // Get color for the type badge
  const getTypeColor = () => {
    switch (item.objectType) {
      case "lead": return "bg-blue-100 text-blue-800";
      case "quote": return "bg-purple-100 text-purple-800";
      case "invoice": return "bg-amber-100 text-amber-800";
      case "project": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full rounded-lg p-0 overflow-hidden">
        <div className="bg-slate-50 p-6 pb-4">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className={`font-normal ${getTypeColor()}`}>
                {getTypeLabel()}
              </Badge>
              <span className="text-xs text-muted-foreground">
                ID: {item.objectId.substring(0, 8)}
              </span>
            </div>
            <div className="flex items-start gap-3">
              {getTypeIcon()}
              <div>
                <DialogTitle className="text-xl">{item.name}</DialogTitle>
                <DialogDescription className="text-xs mt-1">
                  Laatst bijgewerkt: {formatDate(item.updatedAt)}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>
        
        <div className="p-6 pt-4">
          <h3 className="text-sm font-medium mb-3">{getTypeHeading()}</h3>
          
          <div className="space-y-3 mb-6">
            {item.objectType === "lead" && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>06-12345678</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>contact@voorbeeld.nl</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Amsterdam, Nederland</span>
                </div>
              </>
            )}
            
            {item.objectType === "quote" && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Klant: {item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FilePlus className="h-4 w-4 text-muted-foreground" />
                  <span>Offerte #OFR-{Math.floor(Math.random() * 1000)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Verstuurd op: {formatDate(item.createdAt)}</span>
                </div>
              </>
            )}
            
            {item.objectType === "invoice" && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Klant: {item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileMinus className="h-4 w-4 text-muted-foreground" />
                  <span>Factuur #INV-{Math.floor(Math.random() * 1000)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Betaaltermijn: {formatDate(new Date(new Date(item.createdAt).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString())}</span>
                </div>
              </>
            )}
            
            {item.objectType === "project" && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Klant: {item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Garantie: Dakwerk</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Project datum: {formatDate(item.createdAt)}</span>
                </div>
              </>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="text-sm font-medium mb-3">Acties</h3>
          <div className="space-y-2">
            <Button onClick={onAddNote} variant="outline" className="w-full flex gap-2 justify-start">
              <FileText className="h-4 w-4" />
              Notitie toevoegen
            </Button>
            <Button onClick={onSchedule} variant="outline" className="w-full flex gap-2 justify-start">
              <Calendar className="h-4 w-4" />
              Afspraak maken
            </Button>
            <Button onClick={onGoToDetail} variant="default" className="w-full flex gap-2 justify-start">
              <Eye className="h-4 w-4" />
              Ga naar details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
