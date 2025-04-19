
import React, { useState, useEffect } from 'react';
import { WorkAgreement } from '@/types';
import { WizardData } from '../useProjectWizard';
import { mockWorkAgreements } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WizardWorkAgreementStepProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const WizardWorkAgreementStep: React.FC<WizardWorkAgreementStepProps> = ({
  wizardData,
  setWizardData
}) => {
  const [workAgreements, setWorkAgreements] = useState<WorkAgreement[]>([]);
  const [selectedWorkAgreement, setSelectedWorkAgreement] = useState<WorkAgreement | null>(null);
  const navigate = useNavigate();

  // Get work agreements for selected lead
  useEffect(() => {
    if (wizardData.leadId) {
      const leadWorkAgreements = mockWorkAgreements.filter(w => w.leadId === wizardData.leadId);
      setWorkAgreements(leadWorkAgreements);
      
      // If wizardData has a workAgreementId, select that work agreement
      if (wizardData.workAgreementId) {
        const workAgreement = leadWorkAgreements.find(w => w.id === wizardData.workAgreementId);
        if (workAgreement) setSelectedWorkAgreement(workAgreement);
      }
    }
  }, [wizardData.leadId, wizardData.workAgreementId]);

  const handleWorkAgreementSelect = (workAgreement: WorkAgreement) => {
    setSelectedWorkAgreement(workAgreement);
    setWizardData({
      ...wizardData,
      workAgreementId: workAgreement.id
    });
  };

  const handleSkip = () => {
    // Clear work agreement selection
    setSelectedWorkAgreement(null);
    setWizardData({
      ...wizardData,
      workAgreementId: undefined
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een werkopdracht (optioneel)</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande werkopdracht voor de lead of maak een nieuwe aan
        </p>

        {workAgreements.length > 0 ? (
          <div className="border rounded-md max-h-[320px] overflow-y-auto divide-y">
            {workAgreements.map(workAgreement => (
              <div
                key={workAgreement.id}
                className={`p-3 cursor-pointer hover:bg-accent ${selectedWorkAgreement?.id === workAgreement.id ? 'bg-accent' : ''}`}
                onClick={() => handleWorkAgreementSelect(workAgreement)}
              >
                <div className="font-medium">Werkopdracht #{workAgreement.id}</div>
                <div className="text-sm text-muted-foreground">€{workAgreement.totalAmount?.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(workAgreement.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center border rounded-md">
            <p className="text-muted-foreground mb-4">
              Er zijn geen werkopdrachten voor deze lead
            </p>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleSkip}
          >
            Overslaan
          </Button>
          
          <Button 
            onClick={() => {
              // Store current state in localStorage
              localStorage.setItem('wizardState', JSON.stringify(wizardData));
              navigate('/workagreements/create');
            }}
          >
            Nieuwe werkopdracht maken
          </Button>
        </div>
      </div>
    </div>
  );
};
