
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, ListTodo } from "lucide-react";

interface AppointmentProcessModalProps {
  open: boolean;
  reason: string;
  onReasonChange: (val: string) => void;
  taskChecked: boolean;
  onTaskCheckedChange: (val: boolean) => void;
  taskDescription: string;
  onTaskDescriptionChange: (val: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  loading?: boolean;
}

export const AppointmentProcessModal: React.FC<AppointmentProcessModalProps> = ({
  open,
  reason,
  onReasonChange,
  taskChecked,
  onTaskCheckedChange,
  taskDescription,
  onTaskDescriptionChange,
  onCancel,
  onSubmit,
  loading = false,
}) => (
  <Dialog open={open} onOpenChange={o => { if (!o) onCancel(); }}>
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-[#0EA5E9]" />
          Afspraak verwerken
        </DialogTitle>
        <DialogDescription>
          Geef aan waarom er geen offerte, factuur of werkovereenkomst is aangemaakt.<br />
          Optioneel: Maak een taak aan om deze lead later nogmaals op te volgen.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 pt-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reden</label>
          <textarea
            className="w-full border rounded-md p-3 text-sm min-h-[80px] focus:border-[#0EA5E9] focus:ring focus:ring-[#E5DEFF] transition"
            placeholder="Vul hier de reden in..."
            value={reason}
            onChange={e => onReasonChange(e.target.value)}
            maxLength={300}
            autoFocus
          />
        </div>
        <div className="flex items-center mb-1">
          <input
            id="process-task-checkbox"
            type="checkbox"
            checked={taskChecked}
            onChange={e => onTaskCheckedChange(e.target.checked)}
            className="accent-[#0EA5E9] h-4 w-4 rounded border-gray-300 focus:ring-[#0EA5E9]"
          />
          <label htmlFor="process-task-checkbox" className="ml-2 text-sm text-gray-800 select-none flex gap-1">
            <ListTodo className="h-4 w-4 text-[#0EA5E9]" /> Taak maken voor opvolgen
          </label>
        </div>
        {taskChecked && (
          <div>
            <input
              type="text"
              className="w-full border rounded-md p-2 text-sm focus:border-[#0EA5E9] focus:ring focus:ring-[#E5DEFF] transition"
              placeholder="Wat moet er worden opgevolgd? (optioneel)"
              value={taskDescription}
              onChange={e => onTaskDescriptionChange(e.target.value)}
              maxLength={150}
            />
          </div>
        )}
      </div>
      <DialogFooter className="mt-4 flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-2">
        <Button variant="outline" type="button" onClick={onCancel} className="sm:mr-2">Annuleren</Button>
        <Button 
          className="w-full sm:w-auto bg-[#0EA5E9] hover:bg-[#0A6DBC] text-white font-semibold"
          disabled={!reason.trim() || loading}
          onClick={onSubmit}
        >
          {loading ? "Even wachten..." : "Verwerking opslaan"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
