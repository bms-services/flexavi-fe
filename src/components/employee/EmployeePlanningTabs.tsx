
import React, { useState } from "react";
import { Appointment } from "@/types";
import { format, addDays, subDays } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LeadInfoCard } from "./LeadInfoCard";
import { mockLeads } from "@/data/mockLeads";
import { Badge } from "@/components/ui/badge";
import { PlanningHeader } from "./planning/PlanningHeader";
import { AppointmentsTable } from "./planning/AppointmentsTable";

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
    fixedTabs.findIndex(tab => tab.id === activeTab) - 1
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
      <PlanningHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

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

        {fixedTabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <div className="w-full overflow-x-auto">
              <AppointmentsTable
                appointments={filteredAppointments}
                getLead={getLead}
                onAppointmentClick={handleAppointmentClick}
                onCreateQuote={handleCreateQuote}
                onUploadQuote={handleUploadQuote}
                onCreateInvoice={handleCreateInvoice}
                onUploadInvoice={handleUploadInvoice}
                onCreateAgreement={handleCreateAgreement}
                onUploadAgreement={handleUploadAgreement}
                onReschedule={handleReschedule}
                onProcess={handleProcessAppointment}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Completely redesigned appointment modal */}
      <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
        <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedAppointment?.title}
              <Badge variant="outline" className="ml-2 capitalize">
                {selectedAppointment?.status}
              </Badge>
            </DialogTitle>
            <p className="text-gray-600 mt-1">
              {selectedAppointment && format(new Date(selectedAppointment.date), "EEEE d MMMM yyyy")} • {selectedAppointment?.startTime} - {selectedAppointment?.endTime}
            </p>
          </DialogHeader>
          
          {selectedAppointment && selectedAppointment.leadId && (
            <div className="mt-4">
              <LeadInfoCard 
                lead={getLead(selectedAppointment.leadId) || {
                  name: "Unknown Customer",
                  address: "Unknown Address",
                  phone: "Unknown Phone",
                  email: "Unknown Email"
                }}
                historyEntries={[
                  {
                    type: "Bezichtiging",
                    description: "Eerste bezichtiging voltooid",
                    date: "21 April 2025"
                  },
                  {
                    type: "Contact",
                    description: "Telefonisch contact gehad over offerte",
                    date: "20 April 2025"
                  }
                ]}
                notes={[
                  "Klant heeft specifiek gevraagd naar zonnepanelen op het schuine dak",
                  "Let op: er is een hond aanwezig die in de tuin loopt"
                ]}
                isRescheduled={selectedAppointment.status === "rescheduled"}
                rescheduleReason="Klant was niet beschikbaar op de oorspronkelijke datum"
                showMapButton={true}
                description={selectedAppointment.description}
                wozValue={780000}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
