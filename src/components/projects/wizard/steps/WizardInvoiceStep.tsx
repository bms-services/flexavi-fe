
import React, { useState, useEffect } from 'react';
import { Invoice } from '@/types';
import { WizardData } from '../useProjectWizard';
import { mockInvoices } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WizardInvoiceStepProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const WizardInvoiceStep: React.FC<WizardInvoiceStepProps> = ({
  wizardData,
  setWizardData
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const navigate = useNavigate();

  // Get invoices for selected lead
  useEffect(() => {
    if (wizardData.leadId) {
      const leadInvoices = mockInvoices.filter(i => i.leadId === wizardData.leadId);
      setInvoices(leadInvoices);
      
      // If wizardData has an invoiceId, select that invoice
      if (wizardData.invoiceId) {
        const invoice = leadInvoices.find(i => i.id === wizardData.invoiceId);
        if (invoice) setSelectedInvoice(invoice);
      }
    }
  }, [wizardData.leadId, wizardData.invoiceId]);

  const handleInvoiceSelect = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setWizardData({
      ...wizardData,
      invoiceId: invoice.id
    });
  };

  const handleSkip = () => {
    // Clear invoice selection
    setSelectedInvoice(null);
    setWizardData({
      ...wizardData,
      invoiceId: undefined
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een factuur (optioneel)</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande factuur voor de lead of maak een nieuwe aan
        </p>

        {invoices.length > 0 ? (
          <div className="border rounded-md max-h-[320px] overflow-y-auto divide-y">
            {invoices.map(invoice => (
              <div
                key={invoice.id}
                className={`p-3 cursor-pointer hover:bg-accent ${selectedInvoice?.id === invoice.id ? 'bg-accent' : ''}`}
                onClick={() => handleInvoiceSelect(invoice)}
              >
                <div className="font-medium">Factuur #{invoice.id}</div>
                <div className="text-sm text-muted-foreground">€{invoice.amount.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center border rounded-md">
            <p className="text-muted-foreground mb-4">
              Er zijn geen facturen voor deze lead
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
              navigate('/invoices/create');
            }}
          >
            Nieuwe factuur maken
          </Button>
        </div>
      </div>
    </div>
  );
};
