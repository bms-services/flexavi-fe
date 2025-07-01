
import React from "react";
import { Button } from "@/components/ui/button";
import { FileSignature, ArrowLeft, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface WorkAgreementHeaderProps {
  isEditing: boolean;
  isReadOnly: boolean;
  handleDelete?: () => void;
}

export const WorkAgreementHeader: React.FC<WorkAgreementHeaderProps> = ({
  isEditing,
  isReadOnly,
  handleDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileSignature className="h-8 w-8 text-primary" />
          {isEditing ? "Werkovereenkomst bewerken" : "Nieuwe werkovereenkomst"}
        </h1>
        <p className="text-muted-foreground">
          {isReadOnly
            ? "Deze werkovereenkomst is ondertekend en kan niet meer worden bewerkt"
            : isEditing
              ? "Bewerk de details van deze werkovereenkomst"
              : "Maak een nieuwe werkovereenkomst aan na acceptatie van een offerte"}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button variant="outline" onClick={() => navigate("/workagreements")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug
        </Button>

        {handleDelete && (
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Verwijderen
          </Button>
        )}

        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Opslaan
        </Button>
      </div>
    </div>
  );
};
