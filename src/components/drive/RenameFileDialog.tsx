
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DriveFile } from "@/types/drive";

interface RenameFileDialogProps {
  open: boolean;
  onClose: () => void;
  onRename: (newName: string) => void;
  file?: DriveFile;
}

export const RenameFileDialog: React.FC<RenameFileDialogProps> = ({
  open,
  onClose,
  onRename,
  file,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (file) {
      setName(file.name);
    }
  }, [file]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onRename(name);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hernoemen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rename">Nieuwe naam</Label>
            <Input
              id="rename"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Voer een naam in"
              autoFocus
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuleren
            </Button>
            <Button type="submit">Hernoemen</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
