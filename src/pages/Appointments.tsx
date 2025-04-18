
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { DailyAppointments } from "@/components/appointments/DailyAppointments";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import { format } from "date-fns";
import { TeamType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Appointments = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTeamType, setSelectedTeamType] = useState<TeamType | "all">("all");
  const [activeTab, setActiveTab] = useState<"calendar" | "list">("calendar");

  const filteredAppointments = mockAppointments.filter(appointment => {
    if (selectedTeamType !== "all" && appointment.teamType !== selectedTeamType) {
      return false;
    }
    return true;
  });

  const appointmentsForSelectedDate = filteredAppointments.filter(
    (a) => a.date === selectedDate
  );

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Afspraken</h1>
            <p className="text-muted-foreground">
              Beheer al je afspraken op de kalender.
            </p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Afspraken</h4>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Team Type</h5>
                    <Select 
                      value={selectedTeamType} 
                      onValueChange={(value) => setSelectedTeamType(value as TeamType | "all")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Teams</SelectItem>
                        <SelectItem value="sales">Verkoop Teams</SelectItem>
                        <SelectItem value="installation">Installatie Teams</SelectItem>
                        <SelectItem value="repair">Reparatie Teams</SelectItem>
                        <SelectItem value="maintenance">Onderhoud Teams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nieuwe Afspraak
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "calendar" | "list")}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="calendar">Kalender</TabsTrigger>
              <TabsTrigger value="list">Lijst</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="calendar" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <AppointmentCalendar
                appointments={filteredAppointments}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
              <DailyAppointments
                date={selectedDate}
                appointments={appointmentsForSelectedDate}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <div className="bg-white rounded-md shadow">
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium">Alle Afspraken</h3>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="pb-3 pl-4">Datum</th>
                      <th className="pb-3">Tijd</th>
                      <th className="pb-3">Titel</th>
                      <th className="pb-3">Team</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-muted-foreground">
                          Geen afspraken gevonden.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments
                        .sort((a, b) => {
                          const dateA = new Date(`${a.date}T${a.startTime}`);
                          const dateB = new Date(`${b.date}T${b.startTime}`);
                          return dateB.getTime() - dateA.getTime();
                        })
                        .map((appointment) => (
                          <tr key={appointment.id} className="border-t hover:bg-muted/50">
                            <td className="py-3 pl-4">{format(new Date(appointment.date), "dd-MM-yyyy")}</td>
                            <td className="py-3">{appointment.startTime}</td>
                            <td className="py-3">{appointment.title}</td>
                            <td className="py-3">
                              {appointment.teamType === "sales" ? "Verkoop" : 
                               appointment.teamType === "installation" ? "Installatie" :
                               appointment.teamType === "repair" ? "Reparatie" : "Onderhoud"}
                            </td>
                            <td className="py-3">
                              {appointment.status === "scheduled" ? "Gepland" :
                               appointment.status === "completed" ? "Voltooid" :
                               appointment.status === "canceled" ? "Geannuleerd" :
                               appointment.status === "rescheduled" ? "Verzet" :
                               appointment.status === "quote_request" ? "Offerte aanvraag" :
                               appointment.status === "warranty" ? "Garantie" :
                               appointment.status === "new_assignment" ? "Nieuwe opdracht" :
                               "Extra opdracht"}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Appointments;
