
import React, { useState } from "react";
import { Appointment } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, FileText, Upload, Calendar, CalendarPlus, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LeadInfoCard } from "./LeadInfoCard";
import { mockLeads } from "@/data/mockLeads";

interface DayTab {
  label: string;
  offset: number;
}

interface EmployeePlanningTabsProps {
  days: DayTab[];
  getAppointmentsForDay: (offset: number) => Appointment[];
}

export const EmployeePlanningTabs: React.FC<EmployeePlanningTabsProps> = ({
  days,
  getAppointmentsForDay,
}) => {
  const [activeTab, setActiveTab] = useState<string>("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

  // Define fixed tabs for yesterday, today, and tomorrow
  const fixedTabs = [
    { id: "yesterday", label: "Gisteren", date: subDays(new Date(), 1) },
    { id: "today", label: "Vandaag", date: new Date() },
    { id: "tomorrow", label: "Morgen", date: addDays(new Date(), 1) }
  ];

  const getDateForTab = (tabId: string) => {
    const tab = fixedTabs.find(t => t.id === tabId);
    return tab?.date || new Date();
  };

  const currentAppointments = getAppointmentsForDay(
    fixedTabs.findIndex(tab => tab.id === activeTab) - 1 // Convert to offset (-1 for yesterday, 0 for today, 1 for tomorrow)
  );

  const filteredAppointments = currentAppointments.filter(
    app => app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentDialogOpen(true);
  };

  const handleCreateQuote = (leadId: string) => {
    console.log("Create quote for lead:", leadId);
    // Navigation logic would go here
  };

  const handleUploadQuote = (appointmentId: string) => {
    console.log("Upload quote for appointment:", appointmentId);
  };

  const handleCreateInvoice = (leadId: string) => {
    console.log("Create invoice for lead:", leadId);
  };

  const handleUploadInvoice = (appointmentId: string) => {
    console.log("Upload invoice for appointment:", appointmentId);
  };

  const handleCreateAgreement = (leadId: string) => {
    console.log("Create work agreement for lead:", leadId);
  };

  const handleUploadAgreement = (appointmentId: string) => {
    console.log("Upload work agreement for appointment:", appointmentId);
  };

  const handleReschedule = (appointmentId: string) => {
    console.log("Reschedule appointment:", appointmentId);
  };

  const handleProcessAppointment = (appointmentId: string) => {
    console.log("Process appointment:", appointmentId);
  };

  const getLead = (leadId: string) => mockLeads.find(l => l.id === leadId);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      {/* Header with search and filters */}
      <div className="p-4 border-b flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Zoeken in afspraken"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button>Nieuwe Afspraak</Button>
        </div>
      </div>

      {/* Tab navigation for days */}
      <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start px-4 py-1 bg-gray-50 border-b">
          {fixedTabs.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="px-4 py-2 data-[state=active]:bg-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab content - same table view for all tabs */}
        {fixedTabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tijd</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Klantnaam</TableHead>
                    <TableHead>Adres</TableHead>
                    <TableHead>Telefoon</TableHead>
                    <TableHead>Omschrijving</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => {
                    const lead = getLead(appointment.leadId);
                    const hasQuote = false; // You can implement this logic based on your data
                    const isRescheduled = false; // You can implement this logic based on your data
                    
                    return (
                      <TableRow 
                        key={appointment.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <TableCell>{appointment.startTime} - {appointment.endTime}</TableCell>
                        <TableCell>
                          {format(new Date(appointment.date), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell>{lead?.name || "Onbekend"}</TableCell>
                        <TableCell>{lead?.address || "Onbekend"}</TableCell>
                        <TableCell>{lead?.phone || "Onbekend"}</TableCell>
                        <TableCell className="max-w-md">
                          <div>
                            <p className="text-gray-900">{appointment.description}</p>
                            {isRescheduled && (
                              <p className="text-orange-600 text-sm mt-1">
                                ⚠️ Deze afspraak is verzet
                              </p>
                            )}
                            {hasQuote && (
                              <p className="text-green-600 text-sm mt-1">
                                ✓ Er is een offerte aanwezig
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-muted-foreground"
                                >
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="12" cy="5" r="1" />
                                  <circle cx="12" cy="19" r="1" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleCreateQuote(appointment.leadId);
                              }}>
                                <FileText className="mr-2 h-4 w-4" /> Offerte maken
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleUploadQuote(appointment.id);
                              }}>
                                <Upload className="mr-2 h-4 w-4" /> Offerte uploaden
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleCreateInvoice(appointment.leadId);
                              }}>
                                <FileText className="mr-2 h-4 w-4" /> Factuur maken
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleUploadInvoice(appointment.id);
                              }}>
                                <Upload className="mr-2 h-4 w-4" /> Factuur uploaden
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleCreateAgreement(appointment.leadId);
                              }}>
                                <FileText className="mr-2 h-4 w-4" /> Werkopdracht maken
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleUploadAgreement(appointment.id);
                              }}>
                                <Upload className="mr-2 h-4 w-4" /> Werkopdracht uploaden
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleReschedule(appointment.id);
                              }}>
                                <CalendarPlus className="mr-2 h-4 w-4" /> Afspraak verzetten
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleProcessAppointment(appointment.id);
                              }}>
                                <Info className="mr-2 h-4 w-4" /> Verwerk afspraak
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {filteredAppointments.length} afspraken gevonden
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Vorige</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="default" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Volgende</Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Appointment Detail Dialog */}
      <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
        <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Afspraak Details</DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedAppointment.title}</h2>
                  <p className="text-gray-600">
                    {format(new Date(selectedAppointment.date), "EEEE d MMMM yyyy")} • {selectedAppointment.startTime} - {selectedAppointment.endTime}
                  </p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {selectedAppointment.status}
                </Badge>
              </div>
              
              <div className="border-t pt-4">
                {/* Display lead information if available */}
                {selectedAppointment.leadId && (
                  <LeadInfoCard 
                    lead={getLead(selectedAppointment.leadId) || {
                      name: "Unknown Customer",
                      address: "Unknown Address",
                      phone: "Unknown Phone",
                      email: "Unknown Email"
                    }}
                    historyEntries={[]}
                    notes={[]}
                    showMapButton={true}
                    description={selectedAppointment.description}
                  />
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setAppointmentDialogOpen(false)}>
                  Sluiten
                </Button>
                <Button onClick={() => handleCreateQuote(selectedAppointment.leadId)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Offerte Maken
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
