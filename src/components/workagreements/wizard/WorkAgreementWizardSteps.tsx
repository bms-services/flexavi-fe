
import React from 'react';
import { cn } from '@/lib/utils';
import { Users, FileText, CircleDollarSign, FileSignature, ClipboardList } from 'lucide-react';

interface Step {
  icon: React.ElementType;
  label: string;
}

const steps: Step[] = [
  { icon: Users, label: 'Klant' },
  { icon: FileText, label: 'Offerte' },
  { icon: ClipboardList, label: 'Werkzaamheden' },
  { icon: CircleDollarSign, label: 'Betaling' },
  { icon: FileSignature, label: 'Voorwaarden' },
];

interface WorkAgreementWizardStepsProps {
  currentStep: number;
}

export const WorkAgreementWizardSteps: React.FC<WorkAgreementWizardStepsProps> = ({
  currentStep,
}) => {
  return (
    <div className="w-72 bg-white border-r shadow-lg">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Werkovereenkomst</h2>
        <div className="space-y-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.label}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  isActive && "bg-primary text-primary-foreground",
                  isCompleted && "text-muted-foreground",
                  !isActive && !isCompleted && "opacity-50"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    isCompleted && "bg-primary/20",
                    isActive && "bg-primary-foreground text-primary",
                    !isActive && !isCompleted && "bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
