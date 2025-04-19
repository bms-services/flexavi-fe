
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WizardData } from '../useProjectWizard';
import { ProjectExpense } from '@/types/project';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface WizardTransportStepProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const WizardTransportStep: React.FC<WizardTransportStepProps> = ({
  wizardData,
  setWizardData
}) => {
  const [transport, setTransport] = useState<ProjectExpense[]>(
    wizardData.expenses?.filter(e => e.type === 'transport') || []
  );
  const [newTransport, setNewTransport] = useState({
    description: '',
    amount: 0
  });

  const handleAddTransport = () => {
    if (!newTransport.description || newTransport.amount <= 0) {
      toast("Vul alle verplichte velden in");
      return;
    }

    const transportExpense: ProjectExpense = {
      id: `exp-${Date.now()}`,
      projectId: wizardData.projectId || '',
      description: newTransport.description,
      amount: newTransport.amount,
      date: new Date().toISOString(),
      type: 'transport',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedTransport = [...transport, transportExpense];
    setTransport(updatedTransport);
    
    const otherExpenses = wizardData.expenses?.filter(e => e.type !== 'transport') || [];
    setWizardData({
      ...wizardData,
      expenses: [...otherExpenses, ...updatedTransport]
    });

    setNewTransport({
      description: '',
      amount: 0
    });
    
    toast("Transport toegevoegd");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Transport (optioneel)</h2>
        <p className="text-muted-foreground mb-4">
          Voeg transportkosten toe aan het project
        </p>

        <div className="grid gap-4 mb-4">
          <Textarea
            placeholder="Beschrijving"
            value={newTransport.description}
            onChange={(e) => setNewTransport({ ...newTransport, description: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Bedrag"
            value={newTransport.amount || ''}
            onChange={(e) => setNewTransport({ ...newTransport, amount: parseFloat(e.target.value) })}
          />
          <Button onClick={handleAddTransport}>
            <Plus className="h-4 w-4 mr-2" />
            Toevoegen
          </Button>
        </div>

        {transport.length > 0 ? (
          <div className="space-y-2">
            {transport.map((item) => (
              <div key={item.id} className="p-4 border rounded-md">
                <div className="font-medium">{item.description}</div>
                <div className="text-sm text-muted-foreground">
                  €{item.amount}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground p-4">
            Nog geen transport toegevoegd
          </p>
        )}
      </div>
    </div>
  );
};
