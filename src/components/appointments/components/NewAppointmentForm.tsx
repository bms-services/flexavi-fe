
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
      type: "new_assignment" as AppointmentStatus,
      description: "",
    },
  });

  const handleSubmit = (data: any) => {
    if (!selectedCustomer) {
      return;
    }
    onSubmit({
      ...data,
      customer: selectedCustomer,
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
