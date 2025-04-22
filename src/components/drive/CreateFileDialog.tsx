
import React, { useState } from "react";
import { FileType } from "@/types/drive";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Table, Folder } from "lucide-react";

interface CreateFileDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, type: FileType) => void;
}

export const CreateFileDialog: React.FC<CreateFileDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<FileType>("document");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name, type);
      setName("");
      setType("document");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nieuw bestand maken</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Naam</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Voer een naam in"
              autoFocus
              required
            />
          </div>
          
          <RadioGroup value={type} onValueChange={(value) => setType(value as FileType)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="document" id="document" />
              <Label htmlFor="document" className="flex items-center gap-2 cursor-pointer">
                <FileText className="h-4 w-4 text-blue-500" />
                Document
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spreadsheet" id="spreadsheet" />
              <Label htmlFor="spreadsheet" className="flex items-center gap-2 cursor-pointer">
                <Table className="h-4 w-4 text-green-500" />
                Rekenblad
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="folder" id="folder" />
              <Label htmlFor="folder" className="flex items-center gap-2 cursor-pointer">
                <Folder className="h-4 w-4 text-yellow-500" />
                Map
              </Label>
            </div>
          </RadioGroup>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuleren
            </Button>
            <Button type="submit">Maken</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
