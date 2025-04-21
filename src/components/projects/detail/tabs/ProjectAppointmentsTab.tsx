
import React, { useState } from "react";
import { Project } from "@/types/project";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ProjectAppointmentsTabProps {
  project: Project;
}

interface ProjectAppointment {
  id: string;
  projectId: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  createdBy: string;
}

const initialAppointments: ProjectAppointment[] = [
  // Dummy: vervang door echte data
];

export const ProjectAppointmentsTab: React.FC<ProjectAppointmentsTabProps> = ({ project }) => {
  const [appointments, setAppointments] = useState<ProjectAppointment[]>(project.appointments ?? initialAppointments);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newAppointment, setNewAppointment] = useState<Partial<ProjectAppointment>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
    createdBy: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAppointment = () => {
    if (!newAppointment.title || !newAppointment.date || !newAppointment.startTime || !newAppointment.endTime) {
      toast.error("Vul alle verplichte velden in");
      return;
    }
    const appointment: ProjectAppointment = {
      id: `appt-${Date.now()}`,
      projectId: project.id,
      title: newAppointment.title!,
      description: newAppointment.description || "",
      date: newAppointment.date!,
      startTime: newAppointment.startTime!,
      endTime: newAppointment.endTime!,
      createdBy: newAppointment.createdBy || "Medewerker",
    };
    setAppointments([...appointments, appointment]);
    setIsAddOpen(false);
    setNewAppointment({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      createdBy: "",
    });
    toast.success("Afspraak toegevoegd");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Afspraken</h2>
        <Button onClick={() => setIsAddOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Afspraak toevoegen
        </Button>
      </div>
      {appointments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground py-4">Nog geen afspraken vastgelegd voor dit project.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((appt) => (
            <Card key={appt.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{appt.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {appt.date && format(parseISO(appt.date), "d MMMM yyyy", { locale: nl })} &bull; {appt.startTime} - {appt.endTime}
                    </p>
                    <p className="text-xs text-muted-foreground">Door: {appt.createdBy}</p>
                  </div>
                  <div className="text-sm">{appt.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe afspraak</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input name="title" placeholder="Titel" value={newAppointment.title} onChange={handleInputChange} />
            <Input name="description" placeholder="Beschrijving" value={newAppointment.description} onChange={handleInputChange} />
            <Input name="date" type="date" value={newAppointment.date} onChange={handleInputChange} />
            <div className="flex gap-2">
              <Input name="startTime" type="time" value={newAppointment.startTime} onChange={handleInputChange} placeholder="Starttijd" />
              <Input name="endTime" type="time" value={newAppointment.endTime} onChange={handleInputChange} placeholder="Eindtijd" />
            </div>
            <Input name="createdBy" placeholder="Aangemaakt door (optioneel)" value={newAppointment.createdBy} onChange={handleInputChange} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Annuleren</Button>
            <Button onClick={handleAddAppointment}>Toevoegen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
