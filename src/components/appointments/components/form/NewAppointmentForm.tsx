
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CustomerSelection } from "./CustomerSelection";
import { DateRangeField, type DateRange } from "./DateRangeField";
import { AppointmentTypeField, type AppointmentType } from "./AppointmentTypeField";
import { RelatedDocumentsField } from "./RelatedDocumentsField";
import { Lead } from "@/types";

interface NewAppointmentFormProps {
  onSubmit: (data: any) => void;
}

export const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  onSubmit,
}) => {
  const [selectedCustomer, setSelectedCustomer] = React.useState<Lead | null>(null);
  const [dateRanges, setDateRanges] = React.useState<DateRange[]>([
    { startDate: undefined, timeBlock: undefined },
  ]);
  const [description, setDescription] = React.useState("");
  const [appointmentType, setAppointmentType] = React.useState<AppointmentType>("quote");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!selectedCustomer) {
      
      return;
    }
    
    const invalidDates = dateRanges.some(range => !range.startDate || !range.timeBlock);
    if (invalidDates) {
     
      return;
    }
    
    onSubmit({
      customer: selectedCustomer,
      dateRanges,
      description,
      appointmentType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CustomerSelection
        selectedCustomer={selectedCustomer}
        onSelectCustomer={setSelectedCustomer}
      />

      <DateRangeField 
        dateRanges={dateRanges}
        onDateRangesChange={setDateRanges}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Omschrijving</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Voer een omschrijving in..."
          className="min-h-[100px]"
        />
      </div>

      <AppointmentTypeField
        value={appointmentType}
        onChange={setAppointmentType}
      />

      <RelatedDocumentsField customer={selectedCustomer} />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit">Afspraak inplannen</Button>
      </div>
    </form>
  );
};
