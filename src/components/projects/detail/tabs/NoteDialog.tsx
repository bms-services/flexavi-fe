
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { Option } from "@/components/ui/react-select/select-search-async-creatable";
import { getLeadsService } from "@/zustand/services/leadService";
import { LeadRes } from "@/zustand/types/leadT";
import { SelectSearchAsync } from "@/components/ui/react-select/select-search-async";
import { ProjectNoteReq } from "@/zustand/types/projectT";


interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleStore: FormEventHandler<HTMLFormElement>
}

export const NoteDialog: React.FC<NoteDialogProps> = ({
  open,
  onOpenChange,
  handleStore
}) => {

  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<ProjectNoteReq>();

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
                name: "notes",
                options: {
                  required: "Taak beschrijving is verplicht",
                },
                errors,
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
