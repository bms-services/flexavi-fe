
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PipelineItem } from "@/types/pipeline";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Eye, FilePlus, FileMinus, Shield, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Info cards:
import { LeadInfoCard } from "./item-modal/LeadInfoCard";
import { QuoteInfoCard } from "./item-modal/QuoteInfoCard";
import { InvoiceInfoCard } from "./item-modal/InvoiceInfoCard";
import { ProjectInfoCard } from "./item-modal/ProjectInfoCard";
import { LeadCallbackInfoCard } from "./item-modal/LeadCallbackInfoCard";

// Dummy NAW details (in praktijk via API laden)
const demoLeads = [
  {
    objectId: "lead-1",
    name: "Niels de Vries",
    address: "Vijzelstraat 12, 1017 HK Amsterdam",
    phone: "06-12345678",
    email: "niels@voorbeeldbedrijf.nl",
  },
  {
    objectId: "lead-2",
    name: "Marco Jansen",
    address: "Bloemgracht 55, 1016 KE Amsterdam",
    phone: "06-87654321",
    email: "marco@voorbeeld.nl",
  }
];

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Brede modal!
  const modalWidth = "max-w-3xl w-full"; // Extra breed

  // ACTIES, direct zichtbaar in de modal
  const handleCreateQuote = () => {
    window.location.assign("/quotes/create?leadId=" + item.objectId.split("-")[1]);
  };
  const handleCreateInvoice = () => {
    window.location.assign("/invoices/create?leadId=" + item.objectId.split("-")[1]);
  };
  const handleCreateWorkOrder = () => {
    window.location.assign("/projects?leadId=" + item.objectId.split("-")[1]);
  };

  // Zoek NAW voor demo-lead
  const leadNAW =
    demoLeads.find(l => l.objectId === item.objectId) || demoLeads[0];

  // Content cards op basis van type
  const renderInfoCard = () => {
    switch (item.objectType) {
      case "lead":
        if (item.pipelineId === "pipeline-callbacks") {
          // Terugbel-lijst: uitgebreide card
          return <LeadCallbackInfoCard lead={leadNAW} />;
        }
        return <LeadInfoCard />;
      case "quote":
        return <QuoteInfoCard item={item} />;
      case "invoice":
        return <InvoiceInfoCard item={item} />;
      case "project":
        return <ProjectInfoCard item={item} />;
      default:
        return null;
    }
  };

  // Titel, label, kleur etc
  const getTypeIcon = () => {
    switch (item.objectType) {
      case "lead":    return <User className="h-5 w-5 text-blue-600" />;
      case "quote":   return <FilePlus className="h-5 w-5 text-purple-600" />;
      case "invoice": return <FileMinus className="h-5 w-5 text-amber-600" />;
      case "project": return <Shield className="h-5 w-5 text-green-600" />;
      default:        return <User className="h-5 w-5" />;
    }
  };
  const getTypeLabel = () => {
    switch (item.objectType) {
      case "lead":    return "Klant";
      case "quote":   return "Offerte";
      case "invoice": return "Factuur";
      case "project": return "Garantie";
      default:        return "Item";
    }
  };
  const getTypeColor = () => {
    switch (item.objectType) {
      case "lead":    return "bg-blue-100 text-blue-800";
      case "quote":   return "bg-purple-100 text-purple-800";
      case "invoice": return "bg-amber-100 text-amber-800";
      case "project": return "bg-green-100 text-green-800";
      default:        return "bg-gray-100 text-gray-800";
    }
  };
  const getTypeHeading = () => {
    switch (item.objectType) {
      case "lead": return item.pipelineId === "pipeline-callbacks"
        ? "Klantdetails & Opdrachtinschatting" : "Klant Informatie";
      case "quote": return "Offerte Details";
      case "invoice": return "Factuur Details";
      case "project": return "Garantie Details";
      default: return "Details";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${modalWidth} rounded-lg p-0 overflow-hidden`}>
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
                <DialogTitle className="text-xl">{leadNAW.name ?? item.name}</DialogTitle>
                <DialogDescription className="text-xs mt-1">
                  Laatst bijgewerkt: {formatDate(item.updatedAt)}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>
        {/* Content */}
        <div className="p-6 pt-4">
          <h3 className="text-sm font-medium mb-3">{getTypeHeading()}</h3>
          <div className="space-y-6 mb-6">{renderInfoCard()}</div>

          <Separator className="my-6" />

          <h3 className="text-sm font-medium mb-3">Acties</h3>
          <div className="flex flex-wrap gap-3 mb-2">
            <Button onClick={onAddNote} variant="outline" className="min-w-[140px] flex gap-2">
              <FileText className="h-4 w-4" />
              Notitie toevoegen
            </Button>
            <Button onClick={onSchedule} variant="outline" className="min-w-[140px] flex gap-2">
              <Calendar className="h-4 w-4" />
              Afspraak maken
            </Button>
            <Button onClick={onGoToDetail} variant="default" className="min-w-[140px] flex gap-2">
              <Eye className="h-4 w-4" />
              Ga naar details
            </Button>
            {item.objectType === "lead" && item.pipelineId === "pipeline-callbacks" && (
              <>
                <Button onClick={handleCreateQuote} variant="outline" className="min-w-[140px] flex gap-2">
                  <FilePlus className="h-4 w-4" />
                  Offerte maken
                </Button>
                <Button onClick={handleCreateInvoice} variant="outline" className="min-w-[140px] flex gap-2">
                  <FileMinus className="h-4 w-4" />
                  Factuur maken
                </Button>
                <Button onClick={handleCreateWorkOrder} variant="outline" className="min-w-[140px] flex gap-2">
                  <Shield className="h-4 w-4" />
                  Werkopdracht
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
