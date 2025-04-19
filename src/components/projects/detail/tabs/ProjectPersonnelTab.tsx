
import React, { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project, ProjectPersonnel } from "@/types/project";
import { Plus, User } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProjectPersonnelTabProps {
  project: Project;
}

export const ProjectPersonnelTab: React.FC<ProjectPersonnelTabProps> = ({ project }) => {
  const [personnel, setPersonnel] = useState<ProjectPersonnel[]>(project.personnel);
  const [isAddPersonnelOpen, setIsAddPersonnelOpen] = useState(false);
  const [newPersonnel, setNewPersonnel] = useState<Partial<ProjectPersonnel>>({
    name: "",
    role: "",
    dailyRate: 0,
    days: 0,
  });

  const calculateTotalCost = (dailyRate: number, days: number) => {
    return dailyRate * days;
  };

  const addPersonnel = () => {
    if (!newPersonnel.name || !newPersonnel.role || newPersonnel.dailyRate <= 0 || newPersonnel.days <= 0) {
      toast.error("Vul alle verplichte velden in");
      return;
    }

    const totalCost = calculateTotalCost(newPersonnel.dailyRate || 0, newPersonnel.days || 0);

    const person: ProjectPersonnel = {
      id: `pers-${Date.now()}`,
      projectId: project.id,
      name: newPersonnel.name,
      role: newPersonnel.role,
      dailyRate: newPersonnel.dailyRate || 0,
      days: newPersonnel.days || 0,
      totalCost: totalCost,
    };

    setPersonnel([...personnel, person]);
    setIsAddPersonnelOpen(false);
    setNewPersonnel({
      name: "",
      role: "",
      dailyRate: 0,
      days: 0,
    });
    toast.success("Personeel toegevoegd");
  };

  const totalPersonnelCost = personnel.reduce((sum, person) => sum + person.totalCost, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Personeel
          <span className="ml-2 text-muted-foreground">
            Totaal: {formatCurrency(totalPersonnelCost)}
          </span>
        </h2>
        <Button onClick={() => setIsAddPersonnelOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Personeel toevoegen
        </Button>
      </div>

      {personnel.length > 0 ? (
        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naam</TableHead>
                  <TableHead>Functie</TableHead>
                  <TableHead className="text-right">Dagtarief</TableHead>
                  <TableHead className="text-right">Dagen</TableHead>
                  <TableHead className="text-right">Totaal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnel.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>{person.role}</TableCell>
                    <TableCell className="text-right">{formatCurrency(person.dailyRate)}</TableCell>
                    <TableCell className="text-right">{person.days}</TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(person.totalCost)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">Totaal</TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(totalPersonnelCost)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Er is nog geen personeel toegevoegd aan dit project.
            </p>
            <Button className="mt-4" onClick={() => setIsAddPersonnelOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Personeel toevoegen
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={isAddPersonnelOpen} onOpenChange={setIsAddPersonnelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personeel toevoegen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Naam</Label>
              <Input 
                id="name" 
                value={newPersonnel.name}
                onChange={(e) => setNewPersonnel({...newPersonnel, name: e.target.value})}
                placeholder="Naam medewerker"
              />
            </div>
            <div>
              <Label htmlFor="role">Functie</Label>
              <Input 
                id="role" 
                value={newPersonnel.role}
                onChange={(e) => setNewPersonnel({...newPersonnel, role: e.target.value})}
                placeholder="Functie medewerker"
              />
            </div>
            <div>
              <Label htmlFor="dailyRate">Dagtarief</Label>
              <Input 
                id="dailyRate" 
                type="number" 
                min="0" 
                step="0.01" 
                value={newPersonnel.dailyRate}
                onChange={(e) => setNewPersonnel({...newPersonnel, dailyRate: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="days">Aantal dagen</Label>
              <Input 
                id="days" 
                type="number" 
                min="0" 
                step="1" 
                value={newPersonnel.days}
                onChange={(e) => setNewPersonnel({...newPersonnel, days: parseInt(e.target.value)})}
                placeholder="0"
              />
            </div>
            {(newPersonnel.dailyRate || 0) > 0 && (newPersonnel.days || 0) > 0 && (
              <div>
                <Label>Totaal</Label>
                <p className="text-lg font-bold mt-1">
                  {formatCurrency(calculateTotalCost(newPersonnel.dailyRate || 0, newPersonnel.days || 0))}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={addPersonnel}>Toevoegen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
