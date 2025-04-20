
import React, { useState, useEffect } from 'react';
import { Lead } from '@/types';
import { Button } from '@/components/ui/button';
import { WizardData } from '../useProjectWizard';
import { mockLeads } from '@/data/mockData';
import { CreateLeadDialog } from '@/components/leads/CreateLeadDialog';
import { CreateLeadFormData } from '@/utils/validations';
import { toast } from 'sonner';

interface WizardLeadStepProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const WizardLeadStep: React.FC<WizardLeadStepProps> = ({ 
  wizardData, 
  setWizardData 
}) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isCreateLeadOpen, setIsCreateLeadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  
  // Load selected lead if exists
  useEffect(() => {
    if (wizardData.leadId) {
      const lead = mockLeads.find(l => l.id === wizardData.leadId);
      if (lead) setSelectedLead(lead);
    }
  }, [wizardData.leadId]);

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setWizardData({
      ...wizardData,
      leadId: lead.id
    });
  };

  const handleCreateLead = (data: CreateLeadFormData) => {
    // Simulate creating a new lead
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: `${data.postcode} ${data.huisnummer}`,
      status: 'new_lead', // Changed from "new" to "new_lead"
      source: 'Manual Entry',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to leads and select
    setLeads([newLead, ...leads]);
    handleLeadSelect(newLead);
    setIsCreateLeadOpen(false);
    toast("De lead is succesvol toegevoegd aan het project");
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een bestaande lead</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande lead of maak een nieuwe aan voor dit project
        </p>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Zoek op naam of email..."
            className="flex-1 px-3 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setIsCreateLeadOpen(true)}>Nieuwe Lead</Button>
        </div>

        <div className="border rounded-md max-h-[320px] overflow-y-auto">
          {filteredLeads.length > 0 ? (
            <div className="divide-y">
              {filteredLeads.map(lead => (
                <div 
                  key={lead.id} 
                  className={`p-3 cursor-pointer hover:bg-accent ${selectedLead?.id === lead.id ? 'bg-accent' : ''}`}
                  onClick={() => handleLeadSelect(lead)}
                >
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-sm text-muted-foreground">{lead.email}</div>
                  <div className="text-sm text-muted-foreground">{lead.phone}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Geen leads gevonden
            </div>
          )}
        </div>
      </div>

      <CreateLeadDialog 
        isOpen={isCreateLeadOpen}
        onOpenChange={setIsCreateLeadOpen}
        onSubmit={handleCreateLead}
      />
    </div>
  );
};
