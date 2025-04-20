
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomerSearch } from "./CustomerSearch";
import { DateTimeSelection } from "./form/DateTimeSelection";
import { AppointmentTypeSelection } from "./form/AppointmentTypeSelection";
import { TeamSelection } from "./form/TeamSelection";
import { DescriptionField } from "./form/DescriptionField";
import { Lead, AppointmentStatus } from "@/types";
import { addDays, format } from "date-fns";

interface NewAppointmentFormProps {
  onSubmit: (data: any) => void;
  teams: Array<{ id: string; name: string; type: string }>;
}

export const NewAppointmentForm = ({ onSubmit, teams }: NewAppointmentFormProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Lead | null>(null);
  
  const form = useForm({
    defaultValues: {
      date: new Date(),
      startTime: "09:00",
      teamId: "",
      type: "quote_request" as AppointmentStatus,
      description: "",
      additionalDateRanges: [],
    },
  });

  const handleSubmit = (data: any) => {
    if (!selectedCustomer) {
      return;
    }
    
    // Create array of all appointments (main + additional dates)
    const appointments = [
      {
        date: data.date,
        startTime: data.startTime,
        teamId: data.teamId,
        type: data.type,
        description: data.description,
        customer: selectedCustomer,
      }
    ];
    
    // Add additional date ranges if present
    if (data.additionalDateRanges && data.additionalDateRanges.length > 0) {
      data.additionalDateRanges.forEach((range: any) => {
        if (range.startDate && range.endDate) {
          // Get all dates between start and end (inclusive)
          let currentDate = new Date(range.startDate);
          const endDate = new Date(range.endDate);
          
          while (currentDate <= endDate) {
            appointments.push({
              date: new Date(currentDate),
              startTime: range.time || data.startTime, // Use main time as fallback
              teamId: data.teamId,
              type: data.type,
              description: data.description,
              customer: selectedCustomer,
            });
            currentDate = addDays(currentDate, 1);
          }
        }
      });
    }
    
    onSubmit({
      appointments,
      mainAppointment: {
        ...data,
        customer: selectedCustomer,
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <CustomerSearch
            selectedCustomer={selectedCustomer}
            onSelectCustomer={setSelectedCustomer}
          />
        </div>

        <DateTimeSelection form={form} />
        <AppointmentTypeSelection form={form} />
        <TeamSelection form={form} teams={teams} />
        <DescriptionField form={form} />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="submit" disabled={!selectedCustomer}>
            Afspraak Inplannen
          </Button>
        </div>
      </form>
    </Form>
  );
};
