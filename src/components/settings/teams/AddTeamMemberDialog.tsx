
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Control, FieldValues, FormProvider, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { SelectSearchAsync, Option } from "@/components/ui/select-search-async";
import { TeamMemberReq } from "@/zustand/types/teamT";
import { getMyEmployeesService } from "@/zustand/services/settingService";

interface AddTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (employee: TeamMemberReq) => void;
}

const defaultValues = {
  company_user_id: "",
}

export const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const { t } = useTranslation("dashboard");

  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  });
  // const myEmployeeService = getMyEmployeesService(params);

  const form = useForm<TeamMemberReq>({
    defaultValues: defaultValues,
  });

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    try {
      const myEmployeeServiceZ = await getMyEmployeesService({
        ...params,
        search: inputValue,
      });

      return myEmployeeServiceZ.result.data.map((emp) => ({
        label: emp.name,
        value: emp.id,
      }));
    } catch (error) {
      console.error("Failed to load employees:", error);
      return [];
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nieuwe medewerker toevoegen</DialogTitle>
          <DialogDescription>
            Vul de gegevens van de nieuwe medewerker in.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SelectSearchAsync
              label="Employee"
              rules={{
                control: form.control as unknown as Control<FieldValues>,
                name: "company_user_id",
                options: {
                  required: 'Dit veld is verplicht'
                },
                errors: form.formState.errors,
              }}
              placeholder="Zoek medewerker..."
              loadOptions={loadOptions}
              defaultOptions
            />
            <DialogFooter>
              <Button type="submit">Medewerker toevoegen</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
