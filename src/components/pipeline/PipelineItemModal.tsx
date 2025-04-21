import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PipelineItem } from "@/types/pipeline";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Eye, FilePlus, FileMinus, Shield, User, DollarSign, Phone, Mail, Info, Home, Map, 
  CreditCard, FileImage, BadgeEuro, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { mockAppointments } from "@/data/mockAppointments";
import { mockQuotes } from "@/data/mockQuotes";
import { mockInvoices } from "@/data/mockInvoices";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { LeadLocationMap } from "@/components/leads/components/LeadLocationMap";
import { formatEuro } from "@/lib/utils";

const demoLeads = [
  {
    objectId: "lead-1",
    name: "Niels de Vries",
    address: "Vijzelstraat 12, 1017 HK Amsterdam",
    phone: "06-12345678",
    email: "niels@voorbeeldbedrijf.nl",
    requestReason: "Dakgoot vervanging en lekkage reparatie",
    wozValue: 780000,
    estimatedProjectValue: 7800,
  },
  {
    objectId: "lead-2",
    name: "Marco Jansen",
    address: "Bloemgracht 55, 1016 KE Amsterdam",
    phone: "06-87654321",
    email: "marco@voorbeeld.nl",
    requestReason: "Zonnepanelen installatie en dakisolatie",
    wozValue: 650000,
    estimatedProjectValue: 16500,
  }
];

const demoGuarantees = [
  {
    id: "guarantee-1",
    objectId: "lead-1",
    title: "Dakgoot Installatie",
    description: "10 jaar fabrieksgarantie op materialen, 5 jaar op arbeid",
    startDate: "2024-01-15",
    endDate: "2034-01-15",
    status: "active"
  },
  {
    id: "guarantee-2",
    objectId: "lead-1",
    title: "Lekkage Reparatie",
    description: "2 jaar garantie op waterdichtheid",
    startDate: "2024-02-10",
    endDate: "2026-02-10",
    status: "active"
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
  const [activeDocTab, setActiveDocTab] = useState("quotes");
  
  if (!item) return null;

  const modalWidth = "w-full max-w-7xl md:max-w-6xl sm:max-w-full";
  const modalMaxHeight = "max-h-[98vh]";
  const modalClass = `${modalWidth} ${modalMaxHeight} flex flex-col rounded-lg p-0 overflow-hidden`;

  const leadNAW = demoLeads.find(l => l.objectId === item.objectId) || demoLeads[0];

  const appointments = mockAppointments
    .filter(a => a.leadId === item.objectId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const quotes = mockQuotes.filter(q => q.leadId === item.objectId);
  const invoices = mockInvoices.filter(i => i.leadId === item.objectId);
  const workAgreements = mockWorkAgreements.filter(w => w.leadId === item.objectId);
  
  const guarantees = demoGuarantees.filter(g => g.objectId === item.objectId);

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      draft: "bg-gray-100 text-gray-800",
      sent: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      paid: "bg-green-100 text-green-800",
      overdue: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800",
      active: "bg-green-100 text-green-800",
      expired: "bg-gray-100 text-gray-800",
    };
    return colorMap[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={modalClass}>
        <div className="bg-slate-50 p-6 border-b shrink-0">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className={`font-normal bg-blue-100 text-blue-800`}>
                Klant
              </Badge>
              <span className="text-xs text-muted-foreground">
                ID: {item.objectId.substring(0, 8)}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <DialogTitle className="text-xl">{leadNAW.name}</DialogTitle>
                <DialogDescription className="text-xs mt-1">
                  Laatst bijgewerkt: {(new Date(item.updatedAt)).toLocaleDateString("nl", {
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
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Klantinformatie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-medium">{leadNAW.name}</p>
                        <p className="text-sm text-muted-foreground">{leadNAW.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${leadNAW.phone}`} className="text-sm hover:underline">
                        {leadNAW.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${leadNAW.email}`} className="text-sm hover:underline">
                        {leadNAW.email}
                      </a>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm font-medium">Reden van aanvraag</p>
                        <p className="text-sm">{leadNAW.requestReason}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">WOZ Waarde</p>
                        <p className="text-sm">{formatEuro(leadNAW.wozValue)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <BadgeEuro className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Geschatte opdrachtwaarde (AI)</p>
                        <p className="text-sm font-semibold text-green-600">{formatEuro(leadNAW.estimatedProjectValue)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <LeadLocationMap address={leadNAW.address} />
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Garanties
                </CardTitle>
              </CardHeader>
              <CardContent>
                {guarantees.length > 0 ? (
                  <div className="space-y-4">
                    {guarantees.map(guarantee => (
                      <div key={guarantee.id} className="bg-slate-50 rounded-md p-3 border">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{guarantee.title}</h4>
                          <Badge className={getStatusColor(guarantee.status)}>
                            {guarantee.status === "active" ? "Actief" : "Verlopen"}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{guarantee.description}</p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Geldig tot: {new Date(guarantee.endDate).toLocaleDateString("nl")}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground italic text-sm">
                    Geen lopende garanties gevonden voor deze klant.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recente Afspraken
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map(appointment => (
                      <div key={appointment.id} className="bg-slate-50 rounded-md p-3 border">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{appointment.title}</h4>
                          <Badge variant="outline" className={
                            appointment.status === "completed" ? "bg-green-100 text-green-800" :
                            appointment.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                            appointment.status === "canceled" ? "bg-red-100 text-red-800" :
                            "bg-orange-100 text-orange-800"
                          }>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {appointment.date} {appointment.startTime}-{appointment.endTime}
                        </div>
                        <p className="text-sm mt-2">{appointment.description}</p>
                        
                        {(appointment.status === "new_assignment" || appointment.status === "extra_assignment") && (
                          <div className="flex items-center gap-1 mt-2 text-sm">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-600">Prijs: €750</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground italic text-sm">
                    Geen recente afspraken gevonden voor deze klant.
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Documenten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="quotes" value={activeDocTab} onValueChange={setActiveDocTab}>
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="quotes">Offertes ({quotes.length})</TabsTrigger>
                    <TabsTrigger value="invoices">Facturen ({invoices.length})</TabsTrigger>
                    <TabsTrigger value="workorders">Werkopdrachten ({workAgreements.length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="quotes" className="mt-0">
                    {quotes.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Omschrijving</TableHead>
                            <TableHead>Bedrag</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {quotes.map(quote => (
                            <TableRow key={quote.id}>
                              <TableCell className="font-medium truncate max-w-[200px]">{quote.description}</TableCell>
                              <TableCell>{formatEuro(quote.amount)}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-muted-foreground italic text-sm">
                        Geen offertes gevonden voor deze klant.
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="invoices" className="mt-0">
                    {invoices.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Omschrijving</TableHead>
                            <TableHead>Bedrag</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices.map(invoice => (
                            <TableRow key={invoice.id}>
                              <TableCell className="font-medium truncate max-w-[200px]">{invoice.description}</TableCell>
                              <TableCell>{formatEuro(invoice.amount)}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-muted-foreground italic text-sm">
                        Geen facturen gevonden voor deze klant.
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="workorders" className="mt-0">
                    {workAgreements.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Omschrijving</TableHead>
                            <TableHead>Bedrag</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {workAgreements.map(agreement => (
                            <TableRow key={agreement.id}>
                              <TableCell className="font-medium truncate max-w-[200px]">{agreement.description}</TableCell>
                              <TableCell>{formatEuro(agreement.totalAmount)}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(agreement.status)}>{agreement.status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-muted-foreground italic text-sm">
                        Geen werkopdrachten gevonden voor deze klant.
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-0" />
        
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
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCreateQuote}>
                <FilePlus className="h-4 w-4 mr-2" />
                Maak offerte
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateInvoice}>
                <FileMinus className="h-4 w-4 mr-2" />
                Maak factuur
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateWorkOrder}>
                <Shield className="h-4 w-4 mr-2" />
                Maak werkopdracht
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleUploadPhotos}>
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
      </DialogContent>
    </Dialog>
  );
};
