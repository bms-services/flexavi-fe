
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { WorkAgreementStatus, Quote } from "@/types";
import { mockQuotes } from "@/data/mockData";
import { QuoteSelector } from "./quote-selector/QuoteSelector";
import { WorkDetails } from "./work-details/WorkDetails";
import { StatusSelect } from "./status-select/StatusSelect";

interface WorkAgreementDetailsFormProps {
  quote: Quote | null;
  description: string;
  workDescription: string;
  warranty: string;
  startDate: string;
  status: WorkAgreementStatus;
  onFieldChange: (field: string, value: string) => void;
  onQuoteSelect: (quote: Quote | null) => void;
  disabled?: boolean;
}

export const WorkAgreementDetailsForm: React.FC<WorkAgreementDetailsFormProps> = ({
  quote,
  description,
  workDescription,
  warranty,
  startDate,
  status,
  onFieldChange,
  onQuoteSelect,
  disabled = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availableQuotes, setAvailableQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const acceptedQuotes = mockQuotes.filter(q => q.status === "accepted");
    setAvailableQuotes(acceptedQuotes);
  }, []);

  const filteredQuotes = availableQuotes.filter(q => 
    q.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <Label>Gekoppelde offerte</Label>
        <QuoteSelector
          quote={quote}
          filteredQuotes={filteredQuotes}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onQuoteSelect={onQuoteSelect}
          disabled={disabled}
        />
      </div>

      <WorkDetails
        description={description}
        workDescription={workDescription}
        warranty={warranty}
        startDate={startDate}
        onFieldChange={onFieldChange}
        disabled={disabled}
      />

      <StatusSelect
        status={status}
        onStatusChange={(value) => onFieldChange("status", value)}
        disabled={disabled}
      />
    </div>
  );
};
