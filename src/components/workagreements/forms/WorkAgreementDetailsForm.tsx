
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { QuoteStatus, WorkAgreementStatus, Quote } from "@/types";
import { mockQuotes } from "@/data/mockData";
import { Search } from "lucide-react";

interface WorkAgreementDetailsFormProps {
  quote: Quote | null;
  description: string;
  workDescription: string;
  warranty: string;
  startDate: string;
  status: WorkAgreementStatus;
  onFieldChange: (field: string, value: string) => void;
  onQuoteSelect: (quote: Quote | null) => void;
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
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availableQuotes, setAvailableQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    // Filter quotes that are accepted
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
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoek geaccepteerde offertes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="border rounded-md h-32 overflow-y-auto">
            {filteredQuotes.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Geen geaccepteerde offertes gevonden
              </div>
            ) : (
              <div className="divide-y">
                {filteredQuotes.map((q) => (
                  <div 
                    key={q.id} 
                    className={`p-2 hover:bg-gray-50 cursor-pointer ${quote?.id === q.id ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                    onClick={() => onQuoteSelect(q)}
                  >
                    <div className="font-medium">
                      {q.id.replace("quote-", "OF-")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {q.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Omschrijving</Label>
        <Input
          id="description"
          value={description}
          onChange={e => onFieldChange("description", e.target.value)}
          placeholder="Bijv. Dakrenovatie en isolatie - Werkovereenkomst"
        />
      </div>
      
      <div>
        <Label htmlFor="workDescription">Beschrijving werkzaamheden</Label>
        <Textarea
          id="workDescription"
          value={workDescription}
          onChange={e => onFieldChange("workDescription", e.target.value)}
          placeholder="Beschrijf de uit te voeren werkzaamheden"
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="warranty">Garantie (jaren)</Label>
          <Input
            id="warranty"
            type="number"
            min="0"
            max="30"
            value={warranty}
            onChange={e => onFieldChange("warranty", e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="startDate">Startdatum</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate ? new Date(startDate).toISOString().split('T')[0] : ''}
            onChange={e => onFieldChange("startDate", new Date(e.target.value).toISOString())}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(value: WorkAgreementStatus) => onFieldChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecteer een status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Concept</SelectItem>
            <SelectItem value="sent">Verzonden</SelectItem>
            <SelectItem value="signed">Ondertekend</SelectItem>
            <SelectItem value="completed">Afgerond</SelectItem>
            <SelectItem value="cancelled">Geannuleerd</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
