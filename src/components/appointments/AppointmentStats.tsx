
import React from "react";
import { Appointment, TeamType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { parseISO, format, isToday } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Users, 
  Calendar,
  AlertCircle
} from "lucide-react";

interface AppointmentStatsProps {
  appointments: Appointment[];
  selectedDate: string;
}

export const AppointmentStats: React.FC<AppointmentStatsProps> = ({
  appointments,
  selectedDate,
}) => {
  // Filter appointments for the selected date
  const appointmentsForDate = appointments.filter(
    (a) => a.date === selectedDate
  );

  // Get counts by team type
  const teamCounts = {
    sales: appointmentsForDate.filter(a => a.teamType === "sales").length,
    installation: appointmentsForDate.filter(a => a.teamType === "installation").length,
    repair: appointmentsForDate.filter(a => a.teamType === "repair").length,
    maintenance: appointmentsForDate.filter(a => a.teamType === "maintenance").length
  };

  // Get counts by status
  const statusCounts = {
    quote_request: appointmentsForDate.filter(a => a.status === "quote_request").length,
    warranty: appointmentsForDate.filter(a => a.status === "warranty").length,
    new_assignment: appointmentsForDate.filter(a => a.status === "new_assignment").length,
    extra_assignment: appointmentsForDate.filter(a => a.status === "extra_assignment").length
  };
  
  // Calculate total appointments
  const totalAppointments = appointmentsForDate.length;
  
  // Define time slots and check availability
  const timeSlots = [
    { label: "Ochtend (9:00-12:00)", available: true, count: 0 },
    { label: "Middag (12:00-17:00)", available: true, count: 0 },
    { label: "Avond (17:00-21:00)", available: true, count: 0 }
  ];
  
  // Count appointments in each time slot
  appointmentsForDate.forEach(appointment => {
    const hour = parseInt(appointment.startTime.split(":")[0]);
    if (hour >= 9 && hour < 12) {
      timeSlots[0].count++;
      if (timeSlots[0].count >= 3) timeSlots[0].available = false;
    } else if (hour >= 12 && hour < 17) {
      timeSlots[1].count++;
      if (timeSlots[1].count >= 3) timeSlots[1].available = false;
    } else if (hour >= 17 && hour < 21) {
      timeSlots[2].count++;
      if (timeSlots[2].count >= 3) timeSlots[2].available = false;
    }
  });

  const formatDateLabel = () => {
    const date = parseISO(selectedDate);
    if (isToday(date)) {
      return "Vandaag";
    }
    return format(date, "EEEE d MMMM yyyy", { locale: nl });
  };

  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          {/* Date Overview Section */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{formatDateLabel()}</h2>
              <p className="text-gray-500">Overzicht van beschikbaarheid en planning</p>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </div>

          {/* Availability Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeSlots.map((slot, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  slot.available ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Clock className={`h-5 w-5 ${slot.available ? 'text-emerald-600' : 'text-red-600'}`} />
                  <Badge variant={slot.available ? "success" : "destructive"}>
                    {slot.count} / 3
                  </Badge>
                </div>
                <h3 className="font-medium text-gray-900">{slot.label}</h3>
                <p className={`text-sm ${slot.available ? 'text-emerald-600' : 'text-red-600'}`}>
                  {slot.available ? 'Beschikbaar' : 'Vol gepland'}
                </p>
              </div>
            ))}
          </div>

          {/* Team Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-bold text-blue-600">{teamCounts.sales}</span>
              </div>
              <h3 className="font-medium text-gray-900">Verkoop</h3>
              <p className="text-sm text-blue-600">Team planning</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-lg font-bold text-green-600">{teamCounts.installation}</span>
              </div>
              <h3 className="font-medium text-gray-900">Installatie</h3>
              <p className="text-sm text-green-600">Team planning</p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-red-600" />
                <span className="text-lg font-bold text-red-600">{teamCounts.repair}</span>
              </div>
              <h3 className="font-medium text-gray-900">Reparatie</h3>
              <p className="text-sm text-red-600">Team planning</p>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-amber-600" />
                <span className="text-lg font-bold text-amber-600">{teamCounts.maintenance}</span>
              </div>
              <h3 className="font-medium text-gray-900">Onderhoud</h3>
              <p className="text-sm text-amber-600">Team planning</p>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-4 border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="h-5 w-5 text-gray-600" />
                <span className="text-lg font-bold text-gray-600">{statusCounts.quote_request}</span>
              </div>
              <h3 className="font-medium text-gray-900">Offerte aanvraag</h3>
            </div>
            
            <div className="rounded-lg p-4 border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="h-5 w-5 text-gray-600" />
                <span className="text-lg font-bold text-gray-600">{statusCounts.warranty}</span>
              </div>
              <h3 className="font-medium text-gray-900">Garantie</h3>
            </div>
            
            <div className="rounded-lg p-4 border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="h-5 w-5 text-gray-600" />
                <span className="text-lg font-bold text-gray-600">{statusCounts.new_assignment}</span>
              </div>
              <h3 className="font-medium text-gray-900">Nieuwe opdracht</h3>
            </div>
            
            <div className="rounded-lg p-4 border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="h-5 w-5 text-gray-600" />
                <span className="text-lg font-bold text-gray-600">{statusCounts.extra_assignment}</span>
              </div>
              <h3 className="font-medium text-gray-900">Extra opdracht</h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
