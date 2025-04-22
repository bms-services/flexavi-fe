
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
}

export function FormActions({ onCancel }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button 
        type="button" 
        variant="outline"
        onClick={onCancel}
      >
        Annuleren
      </Button>
      <Button type="submit">
        Bericht plaatsen
      </Button>
    </div>
  );
}
