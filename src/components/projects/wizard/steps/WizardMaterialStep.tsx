
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WizardData } from '../useProjectWizard';
import { ProjectExpense } from '@/types/project';
import { Plus } from 'lucide-react';


interface WizardMaterialStepProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const WizardMaterialStep: React.FC<WizardMaterialStepProps> = ({
  wizardData,
  setWizardData
}) => {
  const [materials, setMaterials] = useState<ProjectExpense[]>(
    wizardData.expenses?.filter(e => e.type === 'material') || []
  );
  const [newMaterial, setNewMaterial] = useState({
    description: '',
    amount: 0
  });

  const handleAddMaterial = () => {
    if (!newMaterial.description || newMaterial.amount <= 0) {
      return;
    }

    const material: ProjectExpense = {
      id: `exp-${Date.now()}`,
      projectId: wizardData.projectId || '',
      description: newMaterial.description,
      amount: newMaterial.amount,
      date: new Date().toISOString(),
      type: 'material',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedMaterials = [...materials, material];
    setMaterials(updatedMaterials);
    
    const otherExpenses = wizardData.expenses?.filter(e => e.type !== 'material') || [];
    setWizardData({
      ...wizardData,
      expenses: [...otherExpenses, ...updatedMaterials]
    });

    setNewMaterial({
      description: '',
      amount: 0
    });
    
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Materiaal inkoop (optioneel)</h2>
        <p className="text-muted-foreground mb-4">
          Voeg materiaalkosten toe aan het project
        </p>

        <div className="grid gap-4 mb-4">
          <Textarea
            placeholder="Beschrijving"
            value={newMaterial.description}
            onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Bedrag"
            value={newMaterial.amount || ''}
            onChange={(e) => setNewMaterial({ ...newMaterial, amount: parseFloat(e.target.value) })}
          />
          <Button onClick={handleAddMaterial}>
            <Plus className="h-4 w-4 mr-2" />
            Toevoegen
          </Button>
        </div>

        {materials.length > 0 ? (
          <div className="space-y-2">
            {materials.map((material) => (
              <div key={material.id} className="p-4 border rounded-md">
                <div className="font-medium">{material.description}</div>
                <div className="text-sm text-muted-foreground">
                  €{material.amount}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground p-4">
            Nog geen materialen toegevoegd
          </p>
        )}
      </div>
    </div>
  );
};
