
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectTaskReq } from "@/zustand/types/projectT";
import { useFormContext } from "react-hook-form";
import { Option } from "@/components/ui/react-select/select-search-async-creatable";
import { getLeadsService } from "@/zustand/services/leadService";
import { LeadRes } from "@/zustand/types/leadT";
import { SelectSearchAsync } from "@/components/ui/react-select/select-search-async";


interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleStore: FormEventHandler<HTMLFormElement>
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onOpenChange,
  handleStore
}) => {

  const {
    register,
    control,
    watch,
    formState: { errors }
  } = useFormContext<ProjectTaskReq>();


  const [defaultOptions, setDefaultOptions] = useState<Option[]>([]);

  useEffect(() => {
    loadOptions("").then(setDefaultOptions);
  }, []);

  const loadOptions = async (search: string): Promise<Option[]> => {
    const response = await getLeadsService({
      page: 1,
      per_page: 20,
      search,
      filters: {},
      sorts: {},
    });

    return response.result.data.map((lead: LeadRes) => ({
      label: `${lead.name} (${lead.email})`,
      value: lead.id,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nieuwe taak toevoegen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleStore}>
          <div className="space-y-4 py-4">
            <SelectSearchAsync
              isMulti
              isClearable
              defaultOptions={defaultOptions}
              loadOptions={loadOptions}
              rules={{
                name: "assign_to",
                control,
                options: {
                  required: "Selecteer ten minste één klant",
                },
                errors
              }}
            />

            <Textarea
              label="Taak beschrijving *"
              rows={3}
              rules={{
                register,
                name: "description",
                options: {
                },
                errors,
              }}
            />

            {/* Start date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Startdatum"
                rules={{
                  register,
                  name: "start_date",
                  options: {
                    required: "Startdatum is verplicht",
                    validate: (value) => {
                      const endDate = watch("end_date");
                      if (endDate && new Date(value as string) > new Date(endDate)) {
                        return "Startdatum kan niet na de vervaldatum liggen";
                      }
                      return true;
                    }
                  },
                  errors,
                }}
              />
              <Input
                type="date"
                label="Vervaldatum"
                rules={{
                  register,
                  name: "end_date",
                  options: {
                    required: "Vervaldatum is verplicht",
                    // end cannot be before start date
                    validate: (value) => {
                      const startDate = watch("start_date");
                      if (startDate && new Date(value as string) < new Date(startDate)) {
                        return "Vervaldatum kan niet voor de startdatum liggen";
                      }
                      return true;
                    }
                  },
                  errors,
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Annuleren</Button>
            <Button type="submit">Taak toevoegen</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
