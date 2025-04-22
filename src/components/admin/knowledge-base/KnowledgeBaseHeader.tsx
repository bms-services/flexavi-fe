
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface KnowledgeBaseHeaderProps {
  onCreateEntry: () => void;
  onCreateCategory: () => void;
}

export function KnowledgeBaseHeader({ onCreateEntry, onCreateCategory }: KnowledgeBaseHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Kennisbank Beheer</h1>
        <p className="text-muted-foreground">
          Maak en beheer veelgestelde vragen en antwoorden voor klanten
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onCreateCategory}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe Categorie
        </Button>
        <Button onClick={onCreateEntry}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe FAQ
        </Button>
      </div>
    </div>
  );
}
