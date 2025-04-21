
import React from "react";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Appointment } from "@/types";
import { AppointmentActions } from "./AppointmentActions";

interface AppointmentsTableProps {
  appointments: Appointment[];
  getLead: (leadId: string) => any;
  onAppointmentClick: (appointment: Appointment) => void;
  onCreateQuote: (leadId: string) => void;
  onUploadQuote: (appointmentId: string) => void;
  onCreateInvoice: (leadId: string) => void;
  onUploadInvoice: (appointmentId: string) => void;
  onCreateAgreement: (leadId: string) => void;
  onUploadAgreement: (appointmentId: string) => void;
  onReschedule: (appointmentId: string) => void;
  onProcess: (appointmentId: string) => void;
}

export const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  getLead,
  onAppointmentClick,
  onCreateQuote,
  onUploadQuote,
  onCreateInvoice,
  onUploadInvoice,
  onCreateAgreement,
  onUploadAgreement,
  onReschedule,
  onProcess,
}) => {
  return (
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
        {appointments.map((appointment) => {
          const lead = getLead(appointment.leadId);
          const hasQuote = false;
          const isRescheduled = false;
          
          return (
            <TableRow 
              key={appointment.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onAppointmentClick(appointment)}
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
                <AppointmentActions
                  leadId={appointment.leadId}
                  appointmentId={appointment.id}
                  onCreateQuote={onCreateQuote}
                  onUploadQuote={onUploadQuote}
                  onCreateInvoice={onCreateInvoice}
                  onUploadInvoice={onUploadInvoice}
                  onCreateAgreement={onCreateAgreement}
                  onUploadAgreement={onUploadAgreement}
                  onReschedule={onReschedule}
                  onProcess={onProcess}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
