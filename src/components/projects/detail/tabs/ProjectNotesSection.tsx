
import React, { useState } from "react";
import { ProjectNote } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CheckCircle, Clock } from "lucide-react";

interface ProjectNotesSectionProps {
  notes: ProjectNote[];
  onAddNote: (note: ProjectNote) => void;
}

export const ProjectNotesSection: React.FC<ProjectNotesSectionProps> = ({ notes, onAddNote }) => {
  const [newNote, setNewNote] = useState<Partial<ProjectNote>>({ note: "", createdBy: "", createdFor: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newNote.note || !newNote.createdBy || !newNote.createdFor) {
      return;
    }
    onAddNote({
      id: "note-" + Date.now(),
      createdAt: new Date().toISOString(),
      createdBy: newNote.createdBy!,
      createdFor: newNote.createdFor!,
      note: newNote.note!,
      type: "note"
    });
    setNewNote({ note: "", createdBy: "", createdFor: "" });
  };

  // Filter voor alleen notities (geen taken)
  const filteredNotes = notes.filter(n => n.type !== "task");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projectnotities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input name="createdBy" value={newNote.createdBy} onChange={handleChange} placeholder="Gemaakt door" />
            <Input name="createdFor" value={newNote.createdFor} onChange={handleChange} placeholder="Gemaakt voor" />
            <Textarea name="note" value={newNote.note} onChange={handleChange} placeholder="Voeg een notitie toe..." />
            <Button size="sm" onClick={handleAdd}>Toevoegen</Button>
          </div>
          <div className="mt-6 space-y-3">
            {filteredNotes.length === 0 ? (
              <div className="text-muted-foreground">Nog geen notities voor dit project.</div>
            ) : (
              filteredNotes.slice().reverse().map((n) => (
                <div key={n.id} className="border-t pt-2">
                  <div className="text-xs text-muted-foreground mb-1">
                    {new Date(n.createdAt).toLocaleString()} | Door: {n.createdBy} · Voor: {n.createdFor}
                  </div>
                  <div className="text-sm">{n.note}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
