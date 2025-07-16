
import React from 'react';
import { cn } from '@/utils/format';
import { Users, Box, Truck, FileText, CircleDollarSign, Image, Users2, Projector } from 'lucide-react';

interface Step {
  icon: React.ElementType;
  label: string;
}

const steps: Step[] = [
  { icon: Projector, label: 'Detail' },
  { icon: Users2, label: 'Lead' },
  { icon: FileText, label: 'Offerte' },
  { icon: FileText, label: 'Werkopdracht' },
  { icon: CircleDollarSign, label: 'Factuur' },
  { icon: Users, label: 'Personeel' },
  { icon: Box, label: 'Materiaal' },
  { icon: Truck, label: 'Transport' },
  { icon: Image, label: "Foto's" },
];

interface ProjectWizardStepsProps {
  currentStep: number;
}

export const ProjectWizardSteps: React.FC<ProjectWizardStepsProps> = ({
  currentStep,
}) => {
  return (
    <div className="w-64 bg-muted/50 p-6 border-r">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={step.label}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md",
                isActive && "bg-accent",
                !isActive && "opacity-50"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isCompleted ? "bg-primary text-primary-foreground" : "bg-muted",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className={
                cn(
                  "text-sm font-medium",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )
              }>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
