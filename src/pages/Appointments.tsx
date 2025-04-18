
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { DailyAppointments } from "@/components/appointments/DailyAppointments";
import { AppointmentStats } from "@/components/appointments/AppointmentStats";
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
import { AppointmentSettings, ScheduleSettings } from "@/components/appointments/AppointmentSettings";

const Appointments = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTeamType, setSelectedTeamType] = useState<TeamType | "all">("all");
  
  // Define default schedule settings
  const [scheduleSettings, setScheduleSettings] = useState<ScheduleSettings>({
    salesMorningSlots: 2,
    salesAfternoonSlots: 2,
    salesEveningSlots: 2,
    installationMorningSlots: 2,
    installationAfternoonSlots: 2,
    installationEveningSlots: 1,
    defaultJobDuration: "medium"
  });

  const filteredAppointments = mockAppointments.filter(appointment => {
    if (selectedTeamType !== "all" && appointment.teamType !== selectedTeamType) {
      return false;
    }
    return true;
  });

  const appointmentsForSelectedDate = filteredAppointments.filter(
    (a) => a.date === selectedDate
  );

  const handleSettingsChange = (newSettings: ScheduleSettings) => {
    setScheduleSettings(newSettings);
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Afspraken</h1>
            <p className="text-gray-500">
              Planning & beschikbaarheid overzicht
            </p>
          </div>
          <div className="flex gap-2">
            <AppointmentSettings 
              settings={scheduleSettings} 
              onSettingsChange={handleSettingsChange} 
            />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Teams
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Filter Afspraken</h4>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700">Team Type</h5>
                    <Select 
                      value={selectedTeamType} 
                      onValueChange={(value) => setSelectedTeamType(value as TeamType | "all")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecteer een team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Teams</SelectItem>
                        <SelectItem value="sales">Verkoop Teams</SelectItem>
                        <SelectItem value="installation">Uitvoerende Ploegen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nieuwe Afspraak
            </Button>
          </div>
        </div>

        <AppointmentStats 
          appointments={filteredAppointments} 
          selectedDate={selectedDate}
          scheduleSettings={scheduleSettings}
        />

        <div className="grid gap-6 lg:grid-cols-2">
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
      </div>
    </Layout>
  );
};

export default Appointments;
