
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

interface WorkAgreementExclusionsFormProps {
  exclusions: string[];
  onChange: (exclusions: string[]) => void;
}

export const WorkAgreementExclusionsForm: React.FC<WorkAgreementExclusionsFormProps> = ({
  exclusions,
  onChange,
}) => {
  const [newExclusion, setNewExclusion] = useState("");

  const handleAddExclusion = () => {
    if (newExclusion.trim()) {
      const updatedExclusions = [...exclusions, newExclusion.trim()];
      onChange(updatedExclusions);
      setNewExclusion("");
    }
  };

  const handleRemoveExclusion = (index: number) => {
    const updatedExclusions = exclusions.filter((_, i) => i !== index);
    onChange(updatedExclusions);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddExclusion();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label htmlFor="newExclusion">Nieuwe uitsluiting</Label>
          <Input
            id="newExclusion"
            value={newExclusion}
            onChange={(e) => setNewExclusion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Voeg een nieuwe uitsluiting toe"
          />
        </div>
        <Button type="button" onClick={handleAddExclusion}>
          <Plus className="h-4 w-4 mr-2" />
          Toevoegen
        </Button>
      </div>

      <div className="border rounded-md divide-y">
        {exclusions.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Geen uitsluitingen toegevoegd
          </div>
        ) : (
          exclusions.map((exclusion, index) => (
            <div key={index} className="p-3 flex justify-between items-center">
              <span>{exclusion}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveExclusion(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
