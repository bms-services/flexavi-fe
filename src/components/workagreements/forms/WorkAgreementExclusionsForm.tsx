import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { WorkAgreementReq } from "@/zustand/types/workAgreementT";

interface WorkAgreementExclusionsFormProps {
  disabled?: boolean;
}

export const WorkAgreementExclusionsForm: React.FC<WorkAgreementExclusionsFormProps> = ({
  disabled = false
}) => {
  const [newExclusion, setNewExclusion] = useState("");

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<WorkAgreementReq>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exclusions",
  });

  const handleAddExclusion = () => {
    const trimmed = newExclusion.trim();
    if (trimmed) {
      append({ description: trimmed });
      setNewExclusion("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
            disabled={disabled}
          />
        </div>
        <Button type="button" onClick={handleAddExclusion} disabled={disabled || !newExclusion.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Toevoegen
        </Button>
      </div>

      <div className="border rounded-md divide-y">
        {fields.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Geen uitsluitingen toegevoegd
          </div>
        ) : (
          fields.map((field, index) => (
            <div
              key={field.id}
              className="p-3 flex justify-between items-center"
            >
              <div className="w-full">
                <Input
                  defaultValue={field.description}
                  className="w-full"
                  disabled={disabled}
                  rules={{
                    register,
                    name: `exclusions.${index}.description`,
                    options: {
                      required: "Uitsluiting is verplicht",
                    },
                    errors,
                  }}
                />
              </div>
              {!disabled && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};