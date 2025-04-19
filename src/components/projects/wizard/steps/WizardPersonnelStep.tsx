
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WizardData } from '../useProjectWizard';
import { ProjectPersonnel } from '@/types/project';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface WizardPersonnelStepProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const WizardPersonnelStep: React.FC<WizardPersonnelStepProps> = ({
  wizardData,
  setWizardData
}) => {
  const [personnel, setPersonnel] = useState<ProjectPersonnel[]>(wizardData.personnel || []);
  const [newPerson, setNewPerson] = useState({
    name: '',
    role: '',
    dailyRate: 0,
    days: 0
  });

  const handleAddPerson = () => {
    if (!newPerson.name || !newPerson.role || newPerson.dailyRate <= 0 || newPerson.days <= 0) {
      toast("Vul alle verplichte velden in");
      return;
    }

    const person: ProjectPersonnel = {
      id: `pers-${Date.now()}`,
      projectId: wizardData.projectId || '',
      name: newPerson.name,
      role: newPerson.role,
      dailyRate: newPerson.dailyRate,
      days: newPerson.days,
      totalCost: newPerson.dailyRate * newPerson.days
    };

    const updatedPersonnel = [...personnel, person];
    setPersonnel(updatedPersonnel);
    setWizardData({
      ...wizardData,
      personnel: updatedPersonnel
    });

    setNewPerson({
      name: '',
      role: '',
      dailyRate: 0,
      days: 0
    });
    
    toast("Personeelslid toegevoegd");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Personeel toevoegen (optioneel)</h2>
        <p className="text-muted-foreground mb-4">
          Voeg medewerkers toe aan het project
        </p>

        <div className="grid gap-4 mb-4">
          <Input
            placeholder="Naam"
            value={newPerson.name}
            onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
          />
          <Input
            placeholder="Rol"
            value={newPerson.role}
            onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Dagtarief"
            value={newPerson.dailyRate || ''}
            onChange={(e) => setNewPerson({ ...newPerson, dailyRate: parseFloat(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Aantal dagen"
            value={newPerson.days || ''}
            onChange={(e) => setNewPerson({ ...newPerson, days: parseInt(e.target.value) })}
          />
          <Button onClick={handleAddPerson}>
            <Plus className="h-4 w-4 mr-2" />
            Toevoegen
          </Button>
        </div>

        {personnel.length > 0 ? (
          <div className="space-y-2">
            {personnel.map((person) => (
              <div key={person.id} className="p-4 border rounded-md">
                <div className="font-medium">{person.name}</div>
                <div className="text-sm text-muted-foreground">{person.role}</div>
                <div className="text-sm text-muted-foreground">
                  €{person.dailyRate}/dag × {person.days} dagen = €{person.totalCost}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground p-4">
            Nog geen personeel toegevoegd
          </p>
        )}
      </div>
    </div>
  );
};
