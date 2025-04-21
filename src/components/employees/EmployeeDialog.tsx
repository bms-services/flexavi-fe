
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Employee } from "@/types/employee-management";
import { BasicInfoForm } from "./forms/BasicInfoForm";
import { WorkScheduleForm } from "./forms/WorkScheduleForm";
import { TeamSelectionForm } from "./forms/TeamSelectionForm";

interface EmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee | null;
  onSubmit: (data: Employee) => void;
}

export const EmployeeDialog = ({ isOpen, onClose, employee, onSubmit }: EmployeeDialogProps) => {
  const form = useForm<Employee>({
    defaultValues: employee || {
      id: crypto.randomUUID(),
      firstName: "",
      lastName: "",
      email: "",
      role: "sales",
      startDate: new Date().toISOString().split('T')[0],
      rates: {
        hourlyRate: 0,
        dailyRate: 0
      },
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
      },
      workingHours: {
        start: "09:00",
        end: "17:00"
      },
      availableDays: ["1", "2", "3", "4", "5"],
      active: true,
      teamIds: []
    }
  });

  const handleSubmit = (data: Employee) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Medewerker bewerken" : "Nieuwe medewerker"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <BasicInfoForm form={form} />
            <WorkScheduleForm form={form} />
            <TeamSelectionForm form={form} />

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Annuleren
              </Button>
              <Button type="submit">
                {employee ? "Opslaan" : "Toevoegen"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
