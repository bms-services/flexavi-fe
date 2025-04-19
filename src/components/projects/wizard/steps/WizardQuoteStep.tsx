
import React, { useState, useEffect } from 'react';
import { Quote } from '@/types';
import { WizardData } from '../useProjectWizard';
import { mockQuotes } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WizardQuoteStepProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const WizardQuoteStep: React.FC<WizardQuoteStepProps> = ({
  wizardData,
  setWizardData
}) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const navigate = useNavigate();

  // Get quotes for selected lead
  useEffect(() => {
    if (wizardData.leadId) {
      const leadQuotes = mockQuotes.filter(q => q.leadId === wizardData.leadId);
      setQuotes(leadQuotes);
      
      // If wizardData has a quoteId, select that quote
      if (wizardData.quoteId) {
        const quote = leadQuotes.find(q => q.id === wizardData.quoteId);
        if (quote) setSelectedQuote(quote);
      }
    }
  }, [wizardData.leadId, wizardData.quoteId]);

  const handleQuoteSelect = (quote: Quote) => {
    setSelectedQuote(quote);
    setWizardData({
      ...wizardData,
      quoteId: quote.id
    });
  };

  const handleSkip = () => {
    // Clear quote selection
    setSelectedQuote(null);
    setWizardData({
      ...wizardData,
      quoteId: undefined
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Selecteer een offerte (optioneel)</h2>
        <p className="text-muted-foreground mb-4">
          Kies een bestaande offerte voor de lead of maak een nieuwe aan
        </p>

        {quotes.length > 0 ? (
          <div className="border rounded-md max-h-[320px] overflow-y-auto divide-y">
            {quotes.map(quote => (
              <div
                key={quote.id}
                className={`p-3 cursor-pointer hover:bg-accent ${selectedQuote?.id === quote.id ? 'bg-accent' : ''}`}
                onClick={() => handleQuoteSelect(quote)}
              >
                <div className="font-medium">Offerte #{quote.id}</div>
                <div className="text-sm text-muted-foreground">€{quote.amount.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center border rounded-md">
            <p className="text-muted-foreground mb-4">
              Er zijn geen offertes voor deze lead
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
              navigate('/quotes/create');
            }}
          >
            Nieuwe offerte maken
          </Button>
        </div>
      </div>
    </div>
  );
};
