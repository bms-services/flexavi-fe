
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { DailyAppointments } from "@/components/appointments/DailyAppointments";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import { format } from "date-fns";

const Appointments = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);

  const appointmentsForSelectedDate = mockAppointments.filter(
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
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nieuwe Afspraak
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AppointmentCalendar
            appointments={mockAppointments}
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
