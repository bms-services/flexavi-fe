
import React, { useState } from "react";
import { Note } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, MessageSquare } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";

interface NotesTabProps {
  notes: Note[];
  leadId: string;
}

export const NotesTab: React.FC<NotesTabProps> = ({ notes, leadId }) => {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    // In a real app, this would send the note to a backend
    alert("Notitie toevoegen functionaliteit moet nog worden geïmplementeerd");
    setNewNote("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nieuwe Notitie</CardTitle>
          <CardDescription>
            Voeg een nieuwe notitie toe aan deze lead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Typ hier je notitie..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={4}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleAddNote}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Notitie Toevoegen
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notitiegeschiedenis</h3>
        {notes.length === 0 ? (
          <p className="text-muted-foreground">
            Nog geen notities voor deze lead.
          </p>
        ) : (
          <div className="space-y-4">
            {notes
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((note) => (
                <Card key={note.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(note.createdAt), {
                            addSuffix: true,
                            locale: nl,
                          })}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(note.createdAt), "d MMMM yyyy HH:mm", {
                          locale: nl,
                        })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
