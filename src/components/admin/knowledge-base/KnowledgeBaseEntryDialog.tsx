
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { KnowledgeBaseEntry, KnowledgeBaseCategory } from "@/types/knowledge-base";
import { useForm, Controller } from "react-hook-form";

interface KnowledgeBaseEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entry: Omit<KnowledgeBaseEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  entry?: KnowledgeBaseEntry;
  categories: KnowledgeBaseCategory[];
}

type FormValues = Omit<KnowledgeBaseEntry, 'id' | 'createdAt' | 'updatedAt'>;

export function KnowledgeBaseEntryDialog({ 
  open, 
  onOpenChange, 
  onSave, 
  entry,
  categories 
}: KnowledgeBaseEntryDialogProps) {
  const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: entry ? {
      question: entry.question,
      answer: entry.answer,
      type: entry.type,
      mediaUrl: entry.mediaUrl || "",
      categoryId: entry.categoryId || "",
      published: entry.published
    } : {
      question: "",
      answer: "",
      type: "text",
      mediaUrl: "",
      categoryId: "",
      published: false
    }
  });

  const entryType = watch("type");

  React.useEffect(() => {
    if (open) {
      reset(entry ? {
        question: entry.question,
        answer: entry.answer,
        type: entry.type,
        mediaUrl: entry.mediaUrl || "",
        categoryId: entry.categoryId || "",
        published: entry.published
      } : {
        question: "",
        answer: "",
        type: "text",
        mediaUrl: "",
        categoryId: "",
        published: false
      });
    }
  }, [open, entry, reset]);

  const onSubmit = (data: FormValues) => {
    // If type is text, remove mediaUrl
    if (data.type === 'text') {
      data.mediaUrl = undefined;
    }
    
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{entry ? "Kennisbank item bewerken" : "Nieuw kennisbank item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Vraag</Label>
              <Input
                id="question"
                {...register("question", { required: "Vraag is verplicht" })}
                placeholder="Stel een veelgestelde vraag"
              />
              {errors.question && (
                <p className="text-sm text-destructive">{errors.question.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Type antwoord</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Kies het type antwoord" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Tekst</SelectItem>
                      <SelectItem value="image">Afbeelding</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="answer">Antwoord</Label>
              <Textarea
                id="answer"
                {...register("answer", { required: "Antwoord is verplicht" })}
                placeholder="Geef een antwoord op de vraag"
                rows={4}
              />
              {errors.answer && (
                <p className="text-sm text-destructive">{errors.answer.message}</p>
              )}
            </div>
            
            {entryType !== 'text' && (
              <div className="grid gap-2">
                <Label htmlFor="mediaUrl">
                  {entryType === 'image' ? 'Afbeelding URL' : 'Video URL'}
                </Label>
                <Input
                  id="mediaUrl"
                  {...register("mediaUrl", { 
                    required: entryType !== 'text' ? `${entryType === 'image' ? 'Afbeelding' : 'Video'} URL is verplicht` : false 
                  })}
                  placeholder={entryType === 'image' 
                    ? 'https://voorbeeld.com/afbeelding.jpg' 
                    : 'https://www.youtube.com/embed/video-id'
                  }
                />
                {errors.mediaUrl && (
                  <p className="text-sm text-destructive">{errors.mediaUrl.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {entryType === 'image' 
                    ? 'Voer de URL in van een afbeelding (JPG, PNG of GIF)' 
                    : 'Voer een embed URL in van YouTube, Vimeo of een andere videodienst'
                  }
                </p>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="categoryId">Categorie</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="categoryId">
                      <SelectValue placeholder="Kies een categorie (optioneel)" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch 
                    id="published"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="published">Gepubliceerd</Label>
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
