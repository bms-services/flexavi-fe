import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { KnowledgeBaseEntry, KnowledgeBaseCategory, KnowledgeBaseEntryType } from "@/types/knowledge-base";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface KnowledgeBaseEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entryData: Omit<KnowledgeBaseEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  entry?: KnowledgeBaseEntry;
  categories: KnowledgeBaseCategory[];
}

export function KnowledgeBaseEntryDialog({
  open,
  onOpenChange,
  onSave,
  entry,
  categories
}: KnowledgeBaseEntryDialogProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [type, setType] = useState<KnowledgeBaseEntryType>("text");
  const [mediaUrl, setMediaUrl] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (entry) {
      setQuestion(entry.question);
      setAnswer(entry.answer);
      setType(entry.type);
      setMediaUrl(entry.mediaUrl || "");
      setCategoryId(entry.categoryId);
      setPublished(entry.published);
    } else {
      // Reset form when creating a new entry
      setQuestion("");
      setAnswer("");
      setType("text");
      setMediaUrl("");
      setCategoryId(undefined);
      setPublished(false);
    }
  }, [entry]);

  const handleSave = () => {
    if (!question || !answer) {
      toast.error("Vraag en antwoord zijn verplicht");
      return;
    }

    const entryData: Omit<KnowledgeBaseEntry, 'id' | 'createdAt' | 'updatedAt'> = {
      question,
      answer,
      type,
      mediaUrl: isMediaType(type) ? mediaUrl : undefined,
      categoryId,
      published
    };
    
    onSave(entryData);
    onOpenChange(false);
  };

  const isMediaType = (type: KnowledgeBaseEntryType) => 
    type === "image" || type === "video";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{entry ? "Bewerk FAQ" : "Nieuwe FAQ"}</DialogTitle>
          <DialogDescription>
            Maak of bewerk een veelgestelde vraag.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              Vraag
            </Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="answer" className="text-right">
              Antwoord
            </Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={type} onValueChange={(value) => setType(value as KnowledgeBaseEntryType)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecteer een type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Tekst</SelectItem>
                <SelectItem value="image">Afbeelding</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isMediaType(type) && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mediaUrl" className="text-right">
                Media URL
              </Label>
              <Input
                id="mediaUrl"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoryId" className="text-right">
              Categorie
            </Label>
            <Select
              value={categoryId || ""}
              onValueChange={(value) => setCategoryId(value === "" ? undefined : value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecteer een categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Geen categorie</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="published" className="text-right">
              Gepubliceerd
            </Label>
            <div className="col-span-3 flex items-center">
              <Switch
                id="published"
                checked={published}
                onCheckedChange={(checked) => setPublished(checked)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button type="submit" onClick={handleSave}>Opslaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
