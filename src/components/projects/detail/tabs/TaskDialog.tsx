
import React, { useState } from "react";
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
import { ProjectNote } from "@/types/project";
import { toast } from "sonner";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: ProjectNote) => void;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddTask 
}) => {
  const [newTask, setNewTask] = useState<Partial<ProjectNote>>({
    note: "",
    createdBy: "",
    createdFor: "",
    type: "task",
    status: "open",
    dueDate: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!newTask.note || !newTask.createdBy || !newTask.createdFor || !newTask.dueDate) {
      toast.error("Vul alle verplichte velden in");
      return;
    }

    onAddTask({
      id: "task-" + Date.now(),
      createdAt: new Date().toISOString(),
      createdBy: newTask.createdBy!,
      createdFor: newTask.createdFor!,
      note: newTask.note!,
      type: "task",
      status: "open",
      dueDate: newTask.dueDate
    });

    // Reset form
    setNewTask({
      note: "",
      createdBy: "",
      createdFor: "",
      type: "task",
      status: "open",
      dueDate: ""
    });
    
    onOpenChange(false);
    toast.success("Taak toegevoegd");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nieuwe taak toevoegen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input 
              name="createdBy" 
              value={newTask.createdBy} 
              onChange={handleChange} 
              placeholder="Gemaakt door *" 
            />
          </div>
          <div className="space-y-2">
            <Input 
              name="createdFor" 
              value={newTask.createdFor} 
              onChange={handleChange} 
              placeholder="Gemaakt voor *" 
            />
          </div>
          <div className="space-y-2">
            <Textarea 
              name="note" 
              value={newTask.note} 
              onChange={handleChange} 
              placeholder="Taak beschrijving *" 
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Vervaldatum *</label>
            <Input 
              name="dueDate" 
              type="date" 
              value={newTask.dueDate} 
              onChange={handleChange} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuleren</Button>
          <Button onClick={handleSubmit}>Taak toevoegen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
