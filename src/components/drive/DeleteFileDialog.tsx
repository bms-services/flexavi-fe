
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DriveFile } from "@/types/drive";
import { AlertTriangle } from "lucide-react";

interface DeleteFileDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  file?: DriveFile;
}

export const DeleteFileDialog: React.FC<DeleteFileDialogProps> = ({
  open,
  onClose,
  onDelete,
  file,
}) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  if (!file) return null;

  const isFolder = file.type === "folder";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verwijderen bevestigen</DialogTitle>
        </DialogHeader>
        
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Waarschuwing</AlertTitle>
          <AlertDescription>
            {isFolder 
              ? "Deze map en alle inhoud zullen permanent worden verwijderd."
              : `Dit ${file.type === "document" ? "document" : "rekenblad"} zal permanent worden verwijderd.`
            }
          </AlertDescription>
        </Alert>
        
        <p className="text-sm text-gray-500">
          Deze actie kan niet ongedaan worden gemaakt.
        </p>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuleren
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Verwijderen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
