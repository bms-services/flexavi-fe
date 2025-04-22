
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { KnowledgeBaseCategory } from "@/types/knowledge-base";
import { useForm } from "react-hook-form";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (category: Omit<KnowledgeBaseCategory, 'id'>) => void;
  category?: KnowledgeBaseCategory;
}

export function CategoryDialog({ 
  open, 
  onOpenChange, 
  onSave, 
  category 
}: CategoryDialogProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<KnowledgeBaseCategory, 'id'>>({
    defaultValues: category ? {
      name: category.name,
      description: category.description || ""
    } : {
      name: "",
      description: ""
    }
  });

  React.useEffect(() => {
    if (open) {
      reset(category ? {
        name: category.name,
        description: category.description || ""
      } : {
        name: "",
        description: ""
      });
    }
  }, [open, category, reset]);

  const onSubmit = (data: Omit<KnowledgeBaseCategory, 'id'>) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category ? "Categorie bewerken" : "Nieuwe categorie"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                {...register("name", { required: "Naam is verplicht" })}
                placeholder="Naam van de categorie"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Beschrijving</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Beschrijving van de categorie (optioneel)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuleren
            </Button>
            <Button type="submit">Opslaan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
