
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useFormContext } from "react-hook-form";
import { Option } from "@/components/ui/react-select/select-search-async-creatable";
import { SelectSearchAsync } from "@/components/ui/react-select/select-search-async";
import { getMyEmployeesService } from "@/zustand/services/settingService";
import { CompanyEmployeeRes } from "@/zustand/types/companyT";
import { ProjectEmployeeReq } from "@/zustand/types/projectT";


interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleStore: FormEventHandler<HTMLFormElement>
}

export const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
  open,
  onOpenChange,
  handleStore
}) => {

  const {
    register,
    control,
    watch,
    formState: { errors }
  } = useFormContext<ProjectEmployeeReq>();

  const [defaultOptions, setDefaultOptions] = useState<Option[]>([]);

  useEffect(() => {
    loadOptions("").then(setDefaultOptions);
  }, []);

  const loadOptions = async (search: string): Promise<Option[]> => {
    const response = await getMyEmployeesService({
      page: 1,
      per_page: 20,
      search,
      filters: {},
      sorts: {},
    });

    return response.result.data.map((user: CompanyEmployeeRes) => ({
      label: `${user.user.name} (${user.user.email})`,
      value: user.id,
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
                name: "staffs",
                control,
                options: {
                  required: "Selecteer ten minste één medewerker",
                },
                errors
              }}
            />

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
