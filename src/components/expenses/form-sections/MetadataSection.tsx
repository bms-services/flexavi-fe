
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ExpenseType } from "@/types/expenses";
import { getTypeLabel } from "@/utils/expenseUtils";
import { mockProjects } from "@/data/mockData";

interface MetadataSectionProps {
  date: string;
  type: ExpenseType;
  projectId?: string;
  notes?: string;
  onDateSelect: (date: Date | undefined) => void;
  onSelectChange: (name: string, value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({
  date,
  type,
  projectId,
  notes,
  onDateSelect,
  onSelectChange,
  onInputChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">
          Datum <span className="text-red-500">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !date ? "text-muted-foreground" : ""
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(new Date(date), "P", { locale: nl })
              ) : (
                <span>Selecteer datum</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date ? new Date(date) : undefined}
              onSelect={onDateSelect}
              initialFocus
              locale={nl}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type uitgave</Label>
        <Select
          value={type}
          onValueChange={(value) => onSelectChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecteer type" />
          </SelectTrigger>
          <SelectContent>
            {[
              "material",
              "transport",
              "equipment",
              "subcontractor",
              "office",
              "software",
              "marketing",
              "training",
              "maintenance",
              "utilities",
              "insurance",
              "other",
            ].map((expenseType) => (
              <SelectItem key={expenseType} value={expenseType}>
                {getTypeLabel(expenseType as ExpenseType)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectId">Project (optioneel)</Label>
        <Select
          value={projectId || "none"}
          onValueChange={(value) =>
            onSelectChange("projectId", value === "none" ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Koppel aan project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Geen project</SelectItem>
            {mockProjects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notities</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          value={notes || ""}
          onChange={onInputChange}
          placeholder="Aanvullende notities voor deze uitgave..."
        />
      </div>
    </div>
  );
};
