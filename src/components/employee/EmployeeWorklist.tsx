
import React from "react";
import { Appointment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

interface EmployeeWorklistProps {
  appointments: Appointment[];
  dayLabel: string;
}

export const EmployeeWorklist: React.FC<EmployeeWorklistProps> = ({ appointments, dayLabel }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold px-6 pt-6">{dayLabel} - Werklijst</h2>
      {appointments.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">Geen afspraken gepland voor deze dag.</div>
      ) : (
        <div className="px-6 py-4 space-y-4">
          {appointments.map((app) => (
            <Card key={app.id} className="mb-2">
              <CardHeader>
                <CardTitle className="text-base leading-tight">{app.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="text-sm"><strong>Beschrijving:</strong> {app.description}</div>
                <div className="text-sm"><strong>Datum:</strong> {format(parseISO(app.date), "d MMM yyyy")}</div>
                <div className="text-sm"><strong>Tijd:</strong> {app.startTime} - {app.endTime}</div>
                <div className="text-sm"><strong>Locatie:</strong> {app.location}</div>
                {/* Later: acties om deze afspraak af te handelen */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
