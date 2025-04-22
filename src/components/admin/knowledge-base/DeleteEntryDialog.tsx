
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { KnowledgeBaseEntry } from "@/types/knowledge-base";

interface DeleteEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  entry: KnowledgeBaseEntry | null;
}

export function DeleteEntryDialog({
  open,
  onOpenChange,
  onConfirm,
  entry,
}: DeleteEntryDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kennisbank item verwijderen</AlertDialogTitle>
          <AlertDialogDescription>
            Weet je zeker dat je dit kennisbank item wilt verwijderen?
            <div className="mt-2 p-3 bg-muted rounded-md">
              <p className="font-medium">{entry?.question}</p>
            </div>
            <p className="mt-2">
              Deze actie kan niet ongedaan worden gemaakt.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuleren</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Verwijderen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
